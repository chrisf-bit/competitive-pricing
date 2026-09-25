/**
 * Audit: does the hard-coded priority partner each round maximise
 * eRPD x Partner Value (ABRN) across its three portfolio cards?
 * Irene's stated prioritisation rule. Levels 1 (r1-10) and 2 (r11-20),
 * all three standard regimes + Cross-Regional (KAM).
 *
 * Resolves each card's effective metrics exactly as the app does
 * (applyRoundBaseline), so decoys read their healthy round state.
 */
import { initialPartners } from '../src/data/partners';
import { applyRoundBaseline } from '../src/engine/gameEngine';
import { getPortfolioForRound } from '../src/data/portfolioByRound';
import { getCorrectPartnerForRound } from '../src/data/correctPartnerPerRound';
import { kamCorrectId } from '../src/data/kamLayout';
import type { ParityRegime, PartnerState } from '../src/types';

const byId = new Map<string, PartnerState>();
for (const p of initialPartners) byId.set(p.persona.id, p);

interface Card {
  id: string;
  erpd: number | undefined;
  pv: number | undefined;
  product: number; // erpd * pv (Irene's rule, verbatim)
}

function resolveCard(id: string, round: number): Card {
  const rec = byId.get(id);
  if (!rec) return { id, erpd: undefined, pv: undefined, product: NaN };
  const m = applyRoundBaseline(rec, round).metrics;
  const erpd = m.erpd;
  const pv = m.partnerValueAbrn;
  return { id, erpd, pv, product: (erpd ?? NaN) * (pv ?? NaN) };
}

function n(x: number | undefined): string {
  return x === undefined || Number.isNaN(x) ? '  -  ' : String(x).padStart(5);
}

const regimes: { label: string; regime: ParityRegime; priority: (r: number) => string | null }[] = [
  { label: 'No Parity', regime: 'none', priority: (r) => getCorrectPartnerForRound('none', r) },
  { label: 'Narrow', regime: 'narrow', priority: (r) => getCorrectPartnerForRound('narrow', r) },
  { label: 'Wide', regime: 'wide', priority: (r) => getCorrectPartnerForRound('wide', r) },
  { label: 'Cross-Regional (KAM)', regime: 'cross-regional', priority: (r) => kamCorrectId(r) },
];

let fails = 0;
let onlyBecauseSign = 0; // priority wins but ONLY because a decoy eRPD <= 0 (the x-value part is moot)

for (const { label, regime, priority } of regimes) {
  console.log(`\n============================================================`);
  console.log(` ${label}`);
  console.log(`============================================================`);
  for (let round = 1; round <= 20; round++) {
    const ids = getPortfolioForRound(regime, round);
    if (!ids) { console.log(`R${round}: no portfolio`); continue; }
    const priId = priority(round);
    const cards = ids.map((id) => resolveCard(id, round));
    const winner = cards.reduce((a, b) => (b.product > a.product ? b : a));
    const pri = cards.find((c) => c.id === priId);
    const pass = winner.id === priId;
    if (!pass) fails++;

    // Would the priority still top the field on the FULL rule if every decoy
    // had positive eRPD? i.e. is the win carried by "x Partner Value", or is
    // it really just "priority has positive eRPD and decoys don't"?
    const decoyMaxPosProduct = Math.max(
      0,
      ...cards.filter((c) => c.id !== priId).map((c) => Math.max(c.erpd ?? 0, 0) * (c.pv ?? 0)),
    );
    const priPosProduct = Math.max(pri?.erpd ?? 0, 0) * (pri?.pv ?? 0);
    const carriedByValue = priPosProduct >= decoyMaxPosProduct;
    if (pass && !carriedByValue) onlyBecauseSign++;

    const lvl = round <= 10 ? 'L1' : 'L2';
    const tag = pass ? (carriedByValue ? 'PASS' : 'PASS*') : 'FAIL';
    const detail = cards
      .map((c) => `${c.id.replace(`-${regime}`, '').replace('-cross-regional', '')}[eRPD ${n(c.erpd)} x PV ${n(c.pv)} = ${String(Math.round(c.product)).padStart(7)}]`)
      .join('  ');
    if (!pass) {
      // For failing rounds, show the sim's designed tells (eRPD MoM change +
      // Lose Price Public) so we can see if the round is still solvable on a
      // different signal than eRPD x Partner Value.
      const tells = ids
        .map((id) => {
          const m = applyRoundBaseline(byId.get(id)!, round).metrics;
          const base = id.replace(`-${regime}`, '').replace('-cross-regional', '');
          const isPri = id === priId;
          return `${isPri ? '>' : ' '}${base}[dERPD ${n(m.erpdChange)} LosePrice ${n(m.losePricePublic)}]`;
        })
        .join('  ');
      console.log(`        tells: ${tells}`);
    }
    console.log(
      `${lvl} R${String(round).padStart(2)} ${tag}  priority=${(priId ?? '?').replace(`-${regime}`, '').replace('-cross-regional', '')}  winner=${winner.id.replace(`-${regime}`, '').replace('-cross-regional', '')}`,
    );
    console.log(`        ${detail}`);
  }
}

// ── Secondary check: could a learner reading a DIFFERENT visible card
//    metric (eRPD alone, or Lose Price) be led to a decoy instead of the
//    priority? These are the other two numbers on the portfolio card.
console.log(`\n============================================================`);
console.log(` SECONDARY: decoy out-reads priority on a visible card metric?`);
console.log(`============================================================`);
let erpdConfusions = 0;
let loseConfusions = 0;
for (const { label, regime, priority } of regimes) {
  for (let round = 1; round <= 20; round++) {
    const ids = getPortfolioForRound(regime, round);
    if (!ids) continue;
    const priId = priority(round);
    const rows = ids.map((id) => {
      const m = applyRoundBaseline(byId.get(id)!, round).metrics;
      return { id, erpd: m.erpd, lose: m.losePricePublic };
    });
    const pri = rows.find((r) => r.id === priId)!;
    const erpdBeaten = rows.filter((r) => r.id !== priId && r.erpd >= pri.erpd);
    const loseBeaten = rows.filter((r) => r.id !== priId && r.lose >= pri.lose);
    const strip = (s: string) => s.replace(`-${regime}`, '').replace('-cross-regional', '');
    if (erpdBeaten.length) {
      erpdConfusions++;
      console.log(`  [${label} R${round}] eRPD: priority ${strip(priId ?? '?')} (${pri.erpd}) NOT highest - ${erpdBeaten.map((r) => `${strip(r.id)} ${r.erpd}`).join(', ')}`);
    }
    if (loseBeaten.length) {
      loseConfusions++;
      console.log(`  [${label} R${round}] LosePrice: priority ${strip(priId ?? '?')} (${pri.lose}) NOT highest - ${loseBeaten.map((r) => `${strip(r.id)} ${r.lose}`).join(', ')}`);
    }
  }
}
console.log(`  eRPD-alone confusions: ${erpdConfusions} | Lose-Price confusions: ${loseConfusions}`);

console.log(`\n============================================================`);
console.log(` SUMMARY: ${fails} round(s) where priority is NOT the max eRPD x Partner Value.`);
console.log(` PASS* = priority wins, but only because decoy eRPD <= 0 (the "x value" part`);
console.log(`         does not decide it): ${onlyBecauseSign} round(s).`);
console.log(`============================================================`);
