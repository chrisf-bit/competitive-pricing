/**
 * Full pre-send harness (granular ON).
 *
 * 1. Drives the REAL xAPI emitters (window/fetch/localStorage shimmed) and
 *    asserts every emitted statement is a conformant xAPI 1.0.2 statement.
 * 2. Replays a full 20-round playthrough's emission and counts the trail
 *    (initialized + clearance items + round-started + per-decision +
 *    round-completed + milestones + completed), proving the granular wiring
 *    produces the expected volume with distinct, well-formed statements.
 * 3. Grades the OPTIMAL path for every regime x round via the real grader
 *    and asserts 3 stars everywhere (no winnable round regressed).
 *
 * Run: bundled to scripts/xapi-harness.mjs then `node`.
 */

import type { ParityRegime, CommunicationStyle } from '../src/types';

// ---- shims MUST exist before xapi.ts module-load (it reads window) ----
type Cap = { url: string; headers: Record<string, string>; stmt: Record<string, unknown> };
const captured: Cap[] = [];
const actorParam = encodeURIComponent(
  JSON.stringify({ name: ['Daria Nyrkova'], mbox: ['mailto:daria@example.com'] }),
);
const g = globalThis as unknown as Record<string, unknown>;
let n = 0;
g.window = {
  location: {
    search:
      `?endpoint=${encodeURIComponent('https://lrs.example/')}` +
      `&auth=${encodeURIComponent('Basic Zm9vOmJhcg==')}` +
      `&registration=reg-123&activity_id=${encodeURIComponent('https://booking.com/xapi/rate-right')}` +
      `&actor=${actorParam}`,
  },
  crypto: { randomUUID: () => `uuid-${(n++).toString(16).padStart(8, '0')}` },
};
g.localStorage = (() => {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
  };
})();
g.fetch = (url: string, opts: { headers: Record<string, string>; body: string }) => {
  try {
    const parsed = JSON.parse(opts.body);
    const stmt = Array.isArray(parsed) ? parsed[0] : parsed;
    captured.push({ url, headers: opts.headers, stmt });
  } catch {
    /* ignore */
  }
  return Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve('') });
};

// ---- dynamic imports AFTER shims (value imports only; types are erased) ----
const xapi = await import('../src/util/xapi');
const { getBranchingScenario } = await import('../src/data/branchingScenarios');
const { getCorrectPartnerForRound } = await import('../src/data/correctPartnerPerRound');
const { kamCorrectId } = await import('../src/data/kamLayout');
const { initialPartners } = await import('../src/data/partners');
const { gradeBranchingRound } = await import('../src/engine/grading');
const { runAutopilot } = await import('../src/util/autopilot');

const partnerById = new Map(initialPartners.map((p) => [p.persona.id, p]));
let fail = 0;
const bad = (m: string) => {
  console.log('  FAIL ' + m);
  fail++;
};

// ───────────────── PART 1 - optimal-path grading (all 80) ─────────────────
const regimes: { label: string; regime: ParityRegime; pri: (r: number) => string | null }[] = [
  { label: 'none', regime: 'none', pri: (r) => getCorrectPartnerForRound('none', r) },
  { label: 'narrow', regime: 'narrow', pri: (r) => getCorrectPartnerForRound('narrow', r) },
  { label: 'wide', regime: 'wide', pri: (r) => getCorrectPartnerForRound('wide', r) },
  { label: 'cross-regional', regime: 'cross-regional', pri: (r) => kamCorrectId(r) },
];

let graded = 0;
for (const { label, regime, pri } of regimes) {
  for (let round = 1; round <= 20; round++) {
    const priId = pri(round);
    if (!priId) {
      bad(`[${label} R${round}] no priority id`);
      continue;
    }
    const tree = getBranchingScenario(priId, round);
    if (!tree) {
      bad(`[${label} R${round}] no tree for ${priId}`);
      continue;
    }
    const partner = partnerById.get(priId);
    if (!partner) {
      bad(`[${label} R${round}] no record for ${priId}`);
      continue;
    }
    // Optimal path: pick the optimal option at each step.
    const choices = tree.steps.map((s) => {
      const o = s.options.find((x) => x.optimal) ?? s.options[0];
      return o.id;
    });
    const res = gradeBranchingRound({
      tree,
      choices,
      selectedPartnerId: priId,
      regime,
      partnerPrimaryStyle: partner.persona.style as CommunicationStyle,
    });
    graded++;
    if (res.stars !== 3) bad(`[${label} R${round}] optimal path scored ${res.stars} stars, expected 3`);
  }
}
console.log(`Optimal-path grading: ${graded} combos checked, ${fail} failure(s)`);

// ───────────────── PART 2 - emit a full playthrough (none regime) ─────────
captured.length = 0;
xapi.xapiInitialized();

// Clearance knowledge-check items (representative count).
const clearanceItems = [
  ...Array.from({ length: 14 }, (_, i) => `A${i + 1}`),
  ...['di1', 'di2', 'di3'],
  ...['ca1', 'ca2', 'ca3', 'ca4', 'ca5'],
  ...['mini-scenario-mobile-gap-signal', 'mini-scenario-mobile-gap-diagnose', 'mini-scenario-mobile-gap-narrative', 'mini-scenario-mobile-gap-next'],
];
clearanceItems.forEach((id, i) => xapi.xapiClearanceItem(id, i % 5 !== 0));
xapi.xapiClearancePassed(88);
xapi.xapiLevelMilestone('L0', { roundsCompleted: 0 });

let expectedDecisions = 0;
for (let round = 1; round <= 20; round++) {
  const level = round > 10 ? 'L2' : 'L1';
  const priId = getCorrectPartnerForRound('none', round)!;
  const tree = getBranchingScenario(priId, round)!;
  const partner = partnerById.get(priId)!;
  xapi.xapiRoundStarted(round, level);
  for (const step of tree.steps) {
    const opt = step.options.find((o) => o.optimal) ?? step.options[0];
    expectedDecisions++;
    xapi.xapiDecision({
      round,
      level,
      partnerId: priId,
      stepId: step.id,
      optionId: opt.id,
      compliance: opt.compliance,
      styleMatch: opt.styleMatch[partner.persona.style as CommunicationStyle] ?? 0,
      optimal: !!opt.optimal,
    });
  }
  xapi.xapiRoundCompleted(round, level, 3);
  if (round === 10) xapi.xapiLevelMilestone('L1', { roundsCompleted: 10, totalStars: 30 });
  if (round === 20) xapi.xapiLevelMilestone('L2', { roundsCompleted: 10, totalStars: 60 });
}
xapi.xapiCompleted(100);

// ───────────────── PART 3 - conformance of every captured statement ───────
const verbCount: Record<string, number> = {};
for (const c of captured) {
  const s = c.stmt as Record<string, unknown>;
  const verb = s.verb as { id?: string; display?: unknown } | undefined;
  const object = s.object as { id?: string; objectType?: string } | undefined;
  const actor = s.actor as { name?: unknown; mbox?: unknown } | undefined;
  const ctx = s.context as { extensions?: Record<string, unknown> } | undefined;
  const vword = typeof verb?.id === 'string' ? verb.id.split('/').pop()! : '?';
  verbCount[vword] = (verbCount[vword] ?? 0) + 1;

  if (c.headers['X-Experience-API-Version'] !== '1.0.2') bad(`version header != 1.0.2 (${vword})`);
  if (typeof s.id !== 'string' || !s.id) bad(`missing id (${vword})`);
  if (typeof s.timestamp !== 'string') bad(`missing timestamp (${vword})`);
  if (!verb?.id || !verb.id.startsWith('http')) bad(`verb id not IRI (${vword})`);
  if (!object?.id || !object.id.startsWith('http')) bad(`object id not IRI (${vword})`);
  if (object?.objectType !== 'Activity') bad(`object not Activity (${vword})`);
  if (!actor) bad(`missing actor (${vword})`);
  if (Array.isArray(actor?.name)) bad(`actor.name still array (${vword})`);
  if (Array.isArray(actor?.mbox)) bad(`actor.mbox still array (${vword})`);
  // Extension keys must be absolute IRIs.
  if (ctx?.extensions) {
    for (const k of Object.keys(ctx.extensions)) {
      if (!k.startsWith('http')) bad(`extension key not IRI: ${k} (${vword})`);
    }
  }
  // Decision statements: verb `answered` carrying a step-id extension
  // (clearance `answered` has no step-id; rounds are attempted/completed).
  // Decisions now target the /round-N object (the LRS-accepted id), with
  // all per-pick detail in the extensions.
  const decExt = ctx?.extensions ?? {};
  const isDecisionStmt = vword === 'answered' && Object.keys(decExt).some((k) => k.endsWith('/step-id'));
  if (isDecisionStmt) {
    const has = (suffix: string) => Object.keys(decExt).some((k) => k.endsWith('/' + suffix));
    if (!has('compliance')) bad(`decision missing compliance ext (${object?.id})`);
    if (!has('optimal')) bad(`decision missing optimal ext (${object?.id})`);
    if (!has('partner-id')) bad(`decision missing partner-id ext (${object?.id})`);
    if (!String(object?.id ?? '').includes('/round-'))
      bad(`decision object should be /round-N (LRS-accepted), got ${object?.id}`);
  }
}

// Distinct object ids for the 20 round-started (one per round).
const startedIds = new Set(
  captured.filter((c) => (c.stmt.verb as { id: string }).id.endsWith('/attempted')).map((c) => (c.stmt.object as { id: string }).id),
);

const decisionCount = captured.filter((c) => {
  const v = (c.stmt.verb as { id: string }).id;
  const ext = (c.stmt.context as { extensions?: Record<string, unknown> }).extensions ?? {};
  return v.endsWith('/answered') && Object.keys(ext).some((k) => k.endsWith('/step-id'));
}).length;

const total = captured.length;
const expectedTotal =
  1 /*init*/ +
  clearanceItems.length +
  1 /*clearance passed*/ +
  1 /*L0 milestone*/ +
  20 /*round-started*/ +
  expectedDecisions +
  20 /*round-completed*/ +
  2 /*L1+L2 milestones*/ +
  1 /*completed*/;

console.log('\nStatement breakdown (full playthrough, granular ON):');
console.log('  by verb:', JSON.stringify(verbCount));
console.log(`  clearance items emitted: ${clearanceItems.length}`);
console.log(`  round-started (distinct rounds): ${startedIds.size} (expect 20)`);
console.log(`  decision statements: ${decisionCount} (one per step across 20 rounds)`);
console.log(`  TOTAL: ${total}  (expected ${expectedTotal})`);

if (startedIds.size !== 20) bad(`round-started distinct rounds ${startedIds.size} != 20`);
if (decisionCount !== expectedDecisions) bad(`decision count ${decisionCount} != ${expectedDecisions}`);
if (total !== expectedTotal) bad(`total ${total} != expected ${expectedTotal}`);
if (!xapi.granularEnabled()) bad('granularEnabled() is false with no ?granular=0');

// ───────────────── PART 4 - Option B tier spread (synthetic) ─────────────
// Prove the softened grader: a compliant, right-partner, optimal-PITCH call
// earns partial credit (1-2 stars) when the diagnosis/style aren't optimal,
// instead of the old all-or-nothing 0. Compliance breach / wrong pitch still 0.
const priId1 = getCorrectPartnerForRound('none', 1)!;
type Opt = { id: string; optimal?: boolean; compliance: string; blue: number };
const mkOpt = (o: Opt) => ({
  id: o.id,
  label: o.id,
  description: '',
  playerDialogue: '',
  partnerResponse: '',
  styleMatch: { red: o.blue, yellow: o.blue, green: o.blue, blue: o.blue },
  compliance: o.compliance,
  trustChange: 0,
  optimal: o.optimal,
});
const mkTree = (steps: Opt[][]) =>
  ({
    round: 1,
    steps: steps.map((opts, i) => ({ id: `s${i + 1}`, partnerPrompt: '', options: opts.map(mkOpt) })),
  } as unknown as Parameters<typeof gradeBranchingRound>[0]['tree']);

const grade = (tree: ReturnType<typeof mkTree>, choices: string[]) =>
  gradeBranchingRound({ tree, choices, selectedPartnerId: priId1, regime: 'none', partnerPrimaryStyle: 'blue' }).stars;

// Tree where alternates are strong-style + safe.
const strongAlt = mkTree([
  [mkOpt2('o', true, 'safe', 2), mkOpt2('a', false, 'safe', 2), mkOpt2('r', false, 'borderline', 2), mkOpt2('x', false, 'risky', 2)],
  [mkOpt2('o', true, 'safe', 2), mkOpt2('a', false, 'safe', 2), mkOpt2('r', false, 'borderline', 2), mkOpt2('x', false, 'risky', 2)],
  [mkOpt2('o', true, 'safe', 2), mkOpt2('a', false, 'safe', 2), mkOpt2('r', false, 'borderline', 2), mkOpt2('x', false, 'risky', 2)],
] as unknown as Opt[][]);
// Tree where alternates are weak-style + safe.
const weakAlt = mkTree([
  [mkOpt2('o', true, 'safe', 2), mkOpt2('a', false, 'safe', 0)],
  [mkOpt2('o', true, 'safe', 2), mkOpt2('a', false, 'safe', 0)],
  [mkOpt2('o', true, 'safe', 2), mkOpt2('a', false, 'safe', 0)],
] as unknown as Opt[][]);

function mkOpt2(id: string, optimal: boolean, compliance: string, blue: number): Opt {
  return { id, optimal, compliance, blue };
}

const expect = (label: string, got: number, want: number) => {
  if (got !== want) bad(`tier: ${label} -> ${got} stars, expected ${want}`);
};
expect('all-optimal', grade(strongAlt, ['o', 'o', 'o']), 3);
expect('non-optimal diagnosis, strong style, optimal pitch', grade(strongAlt, ['a', 'a', 'o']), 2);
expect('non-optimal diagnosis, weak style, optimal pitch', grade(weakAlt, ['a', 'a', 'o']), 1);
expect('wrong pitch but compliant (now passes at 1)', grade(strongAlt, ['o', 'o', 'a']), 1);
expect('borderline pick now passes at 1 (no forced retake)', grade(strongAlt, ['r', 'o', 'o']), 1);
expect('risky pick (legal breach) still 0', grade(strongAlt, ['x', 'o', 'o']), 0);
expect('wrong partner still 0', gradeBranchingRound({ tree: strongAlt, choices: ['o', 'o', 'o'], selectedPartnerId: 'not-the-priority', regime: 'none', partnerPrimaryStyle: 'blue' }).stars, 0);
console.log('\nTier spread: optimal=3, ok=2, weak=1, wrong-pitch=1, borderline=1, risky=0, wrong-partner=0');

// ───────────────── PART 5 - autopilot test-run dataset ───────────────────
// The hidden autopilot must produce a full, MIXED, sequentially-sent dataset.
captured.length = 0;
const ap = await runAutopilot('none', undefined, 0);
const apDecisions = captured.filter((c) => {
  const v = (c.stmt.verb as { id: string }).id;
  const ext = (c.stmt.context as { extensions?: Record<string, unknown> }).extensions ?? {};
  return v.endsWith('/answered') && Object.keys(ext).some((k) => k.endsWith('/step-id'));
}).length;
const apStars = Object.values(ap.roundStars);
const apMixed = apStars.includes(3) && apStars.some((s) => s < 3);
for (const c of captured) {
  const o = c.stmt.object as { id?: string };
  if (!o?.id || !o.id.startsWith('http')) bad('autopilot stmt object not an IRI');
}
console.log(`\nAutopilot: ${ap.total} statements sent, ${apDecisions} decisions, round stars ${JSON.stringify(ap.roundStars)}`);
if (ap.total < 100) bad(`autopilot emitted only ${ap.total} statements (expected ~180+)`);
if (apDecisions < 50) bad(`autopilot decisions ${apDecisions} too few`);
if (!apMixed) bad(`autopilot stars should be a MIX of 3 and <3, got ${apStars.join(',')}`);
if (apStars.some((s) => s === 0)) bad(`autopilot produced a failed (0-star) round: ${apStars.join(',')}`);
if (apStars.length !== 20) bad(`autopilot graded ${apStars.length} rounds (expected 20)`);
if (captured.length !== ap.total) bad(`autopilot sent ${captured.length} but reported ${ap.total}`);

console.log(`\n${fail === 0 ? 'PASS' : 'FAIL'} - xAPI harness: ${fail} failure(s)`);
if (fail > 0) process.exit(1);
