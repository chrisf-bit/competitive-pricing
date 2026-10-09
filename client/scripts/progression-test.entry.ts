/**
 * Round-progression regression test (the Adriana lockout + the full loop).
 *
 * Drives the REAL engine, not mocks:
 *   1. Lockout reproduction: with all three Round-1 cards engaged and the
 *      round unpassed, the CORRECT partner must stay engageable (the bug was
 *      every card locking -> stuck at 0 stars with no way forward). Decoys
 *      stay locked. Once the round is passed, the correct partner locks too.
 *   2. Full happy path: clear Round 1 on the optimal path -> >= 1 star ->
 *      advanceRound actually moves to Round 2.
 *   3. Gate: a 0-star round does NOT advance.
 *
 * Run: bundled to scripts/progression-test.mjs then `node`.
 */

import type { ParityRegime, GameState } from '../src/types';
import {
  createInitialState,
  startConversation,
  processConversationChoice,
  endConversation,
  resetRoundForRetake,
  advanceRound,
  isAlreadyEngaged,
} from '../src/engine/gameEngine';
import { getCorrectPartnerForRound } from '../src/data/correctPartnerPerRound';
import { getPortfolioForRound } from '../src/data/portfolioByRound';
import { getBranchingScenario } from '../src/data/branchingScenarios';

let fail = 0;
const bad = (m: string) => {
  console.log('  FAIL ' + m);
  fail++;
};
const ok = (m: string) => console.log('  ok   ' + m);

const regime: ParityRegime = 'none';
const profile = {
  market: { parityRegime: regime, country: 'Spain', countryCode: 'ES', flag: '', city: '' },
  strengths: [],
  archetype: null,
  avatarId: null,
  playerName: 'Tester',
  completedLevels: [],
  xp: 0,
} as unknown as GameState['learnerProfile'];

const base = createInitialState({ learnerProfile: profile, level0Cleared: true, disclaimerAcknowledged: true });
const round = 1;
const correctId = getCorrectPartnerForRound(regime, round)!;
const cardIds = getPortfolioForRound(regime, round)!;
const decoyIds = cardIds.filter((id) => id !== correctId);

// ── 0. EXHAUSTIVE no-lockout check across ALL 80 round/regime combos ──
// Worst case per combo: every card flagged engaged AND the round unpassed.
// The correct partner must stay callable; decoys stay locked; once the round
// is passed the correct partner locks too. If this holds everywhere, no
// sequence of actions can produce a lockout.
const ALL_REGIMES: ParityRegime[] = ['none', 'narrow', 'wide', 'cross-regional'];
let combos = 0;
for (const rg of ALL_REGIMES) {
  for (let r = 1; r <= 20; r++) {
    const cid = getCorrectPartnerForRound(rg, r);
    const cards = getPortfolioForRound(rg, r);
    if (!cid || !cards || cards.length !== 3) {
      bad(`[${rg} R${r}] no correct partner / 3-card portfolio`);
      continue;
    }
    combos++;
    const decoys = cards.filter((id) => id !== cid);
    const prof = {
      ...(profile as Record<string, unknown>),
      market: { parityRegime: rg, country: 'X', countryCode: 'X', flag: '', city: '' },
    } as unknown as GameState['learnerProfile'];
    const stuckAll = {
      ...base,
      learnerProfile: prof,
      currentRound: r,
      actionsThisRound: [cid],
      previouslyEngagedThisRound: [...decoys],
      roundStars: {},
    } as GameState;
    if (isAlreadyEngaged(stuckAll, cid))
      bad(`[${rg} R${r}] correct partner LOCKED OUT while round unpassed`);
    for (const d of decoys)
      if (!isAlreadyEngaged(stuckAll, d)) bad(`[${rg} R${r}] decoy ${d} not locked`);
    const passedAll = { ...stuckAll, roundStars: { [r]: 2 } } as GameState;
    if (!isAlreadyEngaged(passedAll, cid))
      bad(`[${rg} R${r}] correct partner not locked after the round is passed`);
  }
}
console.log(
  `Exhaustive no-lockout check: ${combos} round/regime combos - correct partner always callable while unpassed, decoys locked, correct locks after pass`,
);

// ── 1. Lockout reproduction ──
// Simulate "engaged every card this round, still 0 stars": correct partner
// sitting in actionsThisRound, decoys flagged as wrong picks.
const stuck = {
  ...base,
  currentRound: round,
  actionsThisRound: [correctId],
  previouslyEngagedThisRound: [...decoyIds],
  roundStars: {},
} as GameState;

if (isAlreadyEngaged(stuck, correctId))
  bad(`LOCKOUT: correct partner ${correctId} is locked while round unpassed (the bug)`);
else ok('correct partner stays engageable when round unpassed (not locked out)');

for (const d of decoyIds) {
  if (!isAlreadyEngaged(stuck, d)) bad(`decoy ${d} should stay locked after a wrong pick`);
}
if (decoyIds.every((d) => isAlreadyEngaged(stuck, d))) ok('wrong-pick decoys stay locked (retake not wasted)');

// Once the round is passed, the correct partner locks like everyone else.
const passed = { ...stuck, roundStars: { [round]: 2 } } as GameState;
if (!isAlreadyEngaged(passed, correctId)) bad('correct partner should lock once the round is passed');
else ok('correct partner locks after the round is passed');

// ── 2. Full happy path through the real engine ──
let s = { ...base, currentRound: round, hasOpenedIssueTreeHelper: true } as GameState;
s = startConversation(s, correctId);
if (!s.conversationInProgress) bad('startConversation did not begin a conversation for the correct partner');
const tree = getBranchingScenario(correctId, round)!;
const optimalChoices = tree.steps.map((st) => (st.options.find((o) => o.optimal) ?? st.options[0]).id);
for (const choiceId of optimalChoices) s = processConversationChoice(s, choiceId);
const stars = s.roundStars[round] ?? 0;
if (stars < 1) bad(`optimal Round ${round} path scored ${stars} stars (expected >= 1)`);
else ok(`optimal path cleared Round ${round} (${stars} stars)`);

const advanced = advanceRound(s);
if (advanced.currentRound !== round + 1)
  bad(`advanceRound stayed on round ${advanced.currentRound} after a pass (expected ${round + 1})`);
else ok('advanceRound moves to the next round after a pass');

// ── 3. Gate: a 0-star round must not advance ──
const zero = { ...base, currentRound: round, roundStars: { [round]: 0 } } as GameState;
const noAdvance = advanceRound(zero);
if (noAdvance.currentRound !== round) bad('advanceRound advanced a 0-star round (gate broken)');
else ok('0-star round correctly does NOT advance');

// ── 4. Start a call then BACK OUT - the correct partner must stay callable ──
// (engagement is only recorded at the last step, so backing out mid-call
// must not lock the partner; and isAlreadyEngaged keeps the correct partner
// callable regardless while the round is unpassed).
let bo = { ...base, currentRound: round, hasOpenedIssueTreeHelper: true } as GameState;
bo = startConversation(bo, correctId);
const boTree = getBranchingScenario(correctId, round)!;
if (boTree.steps.length > 1) {
  // make one NON-final pick, then bail before completing
  const firstOpt = boTree.steps[0].options.find((o) => o.optimal) ?? boTree.steps[0].options[0];
  bo = processConversationChoice(bo, firstOpt.id);
}
bo = endConversation(bo); // back out (no grade yet)
if (bo.conversationInProgress) bad('backing out left a conversation in progress');
if (bo.actionsThisRound.includes(correctId)) bad('backing out mid-call wrongly recorded engagement');
if (isAlreadyEngaged(bo, correctId)) bad('correct partner LOCKED OUT after starting a call then backing out');
else ok('start a call then back out -> correct partner stays callable');
const reopened = startConversation(bo, correctId);
if (!reopened.conversationInProgress) bad('could not re-start the call after backing out');
else ok('can re-start the call with the correct partner after backing out');

// ── 5. Complete with the RIGHT partner but score 0 - must NOT lock out ──
// (the exact Adriana scenario). Force a 0 by injecting a RISKY pick into an
// otherwise-optimal path, then confirm the correct partner stays callable and
// a retake fully clears the engagement.
let z = { ...base, currentRound: round, hasOpenedIssueTreeHelper: true } as GameState;
z = startConversation(z, correctId);
const zTree = getBranchingScenario(correctId, round)!;
const zChoices = zTree.steps.map((s) => (s.options.find((o) => o.optimal) ?? s.options[0]).id);
let injectedRisky = false;
for (let i = 0; i < zTree.steps.length; i++) {
  const risky = zTree.steps[i].options.find((o) => o.compliance === 'risky');
  if (risky) { zChoices[i] = risky.id; injectedRisky = true; break; }
}
if (injectedRisky) {
  for (const cid of zChoices) z = processConversationChoice(z, cid);
  // A 0-star round leaves roundStars unset (stars only go up), so read the
  // actual grade from lastConversationGrade.
  const zStars = z.lastConversationGrade?.stars ?? -1;
  if (zStars !== 0) bad(`right-partner call with a risky pick expected 0 stars, got ${zStars}`);
  else ok('right partner + a risky pick scores 0 (as designed)');
  if (!z.actionsThisRound.includes(correctId)) bad('completing a call did not record engagement');
  if (isAlreadyEngaged(z, correctId)) bad('right partner LOCKED OUT after completing with 0 stars');
  else ok('right partner + 0 stars -> stays callable (NOT locked out)');
  const retaken = resetRoundForRetake(z);
  if (retaken.actionsThisRound.includes(correctId)) bad('retake did not clear engagement for the right partner');
  else ok('retake clears engagement -> right partner fully re-engageable');
} else {
  console.log(`  (skip) round ${round} tree has no risky option to force a 0`);
}

console.log(`\n${fail === 0 ? 'PASS' : 'FAIL'} - progression test: ${fail} failure(s)`);
if (fail > 0) process.exit(1);
