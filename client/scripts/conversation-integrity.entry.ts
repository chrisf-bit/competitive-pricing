/**
 * Sanity guard after the decoy-metric change: every portfolio card in
 * every round x regime (+ KAM) must resolve to a real partner record AND
 * a playable branching conversation, with the round's priority present.
 * Proves no "Begin Conversation" dead-ends were introduced.
 */
import { initialPartners } from '../src/data/partners';
import { getPortfolioForRound } from '../src/data/portfolioByRound';
import { getCorrectPartnerForRound } from '../src/data/correctPartnerPerRound';
import { kamCorrectId } from '../src/data/kamLayout';
import { getBranchingScenario } from '../src/data/branchingScenarios';
import type { ParityRegime, PartnerState } from '../src/types';

const byId = new Map<string, PartnerState>();
for (const p of initialPartners) byId.set(p.persona.id, p);

const regimes: { label: string; regime: ParityRegime; priority: (r: number) => string | null }[] = [
  { label: 'none', regime: 'none', priority: (r) => getCorrectPartnerForRound('none', r) },
  { label: 'narrow', regime: 'narrow', priority: (r) => getCorrectPartnerForRound('narrow', r) },
  { label: 'wide', regime: 'wide', priority: (r) => getCorrectPartnerForRound('wide', r) },
  { label: 'cross-regional', regime: 'cross-regional', priority: (r) => kamCorrectId(r) },
];

let problems = 0;
let checked = 0;
for (const { label, regime, priority } of regimes) {
  for (let round = 1; round <= 20; round++) {
    const ids = getPortfolioForRound(regime, round);
    if (!ids || ids.length !== 3) {
      console.log(`[${label} R${round}] portfolio not 3 cards: ${ids?.length ?? 'null'}`);
      problems++;
      continue;
    }
    const priId = priority(round);
    if (!priId || !ids.includes(priId)) {
      console.log(`[${label} R${round}] priority ${priId} not in portfolio ${ids.join(', ')}`);
      problems++;
    }
    for (const id of ids) {
      checked++;
      if (!byId.get(id)) {
        console.log(`[${label} R${round}] no record for card ${id}`);
        problems++;
      }
      if (!getBranchingScenario(id, round)) {
        console.log(`[${label} R${round}] no conversation for card ${id}`);
        problems++;
      }
    }
  }
}

console.log(
  `\nChecked ${checked} cards across 80 rounds. ${problems === 0 ? 'ALL OK - every card has a record + conversation, priority present.' : `${problems} PROBLEM(S).`}`,
);
