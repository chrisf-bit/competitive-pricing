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

console.log(`\n${fail === 0 ? 'PASS' : 'FAIL'} - progression test: ${fail} failure(s)`);
if (fail > 0) process.exit(1);
