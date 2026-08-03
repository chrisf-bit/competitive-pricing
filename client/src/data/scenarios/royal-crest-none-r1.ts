import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import {
  royalCrestR1IssueTreePath,
  royalCrestOpeningAm,
  royalCrestStep1Probe,
  royalCrestStep4Close,
  liam30PercentCap,
  liamControlledExperiment,
} from './royal-crest-base';

/**
 * Royal Crest Hotel - Round 1 - No Parity variant.
 *
 * Source: SME "Round 1" doc, Conversation 3 (No Parity). In a No
 * Parity market the AM cannot ask for parity or matching; instead the
 * optimal ask offers Liam a voluntary Country Rate for the US segment
 * where his share lags, with the choice of strategy left entirely to
 * him.
 *
 * Compliance (No Parity):
 *   - The word "parity" and the ask to "match" never appear anywhere,
 *     including in the distractors.
 *   - The AM does not require lower prices and does not threaten
 *     ranking/visibility. The Step 2 risky distractor teaches the
 *     violation via a ranking threat, not via parity language.
 *   - The optimal ask is framed reactively and neutrally, with
 *     autonomy explicitly preserved.
 */

const liamWhyRisk =
  "The international target is a valid angle, but I'm very cautious about anything that touches revenue. If I start offering discounts on your platform, even targeted ones, I worry it cannibalises the guests already willing to pay full price on our website. Why should we risk compromising our direct strategy for a lift - in theory?";

// ───────── Step 2 - The segmented ask ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'rc-r1-none-step2-correct',
    label: 'Offer a voluntary US Country Rate, autonomy preserved',
    description:
      "SME-prescribed ask: no general rate drop. Surface the lagging US-traveller share and offer a Country Rate he can choose to run for that segment, protecting his overall ADR - with the choice of strategy explicitly left to him.",
    playerDialogue:
      "I respect that. Our data does show your share of US travellers is lower than your peer group. Rather than a general rate drop, you could choose to run a Country Rate aimed only at the US market - that lifts conversion in that segment while protecting your overall ADR. The choice of pricing and distribution strategy stays entirely yours.",
    partnerResponse: liamWhyRisk,
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r1-none-step2-general-drop',
    label: 'Ask for an across-the-board rate drop',
    description:
      "Right instinct, wrong tool - a blanket public rate cut lowers his ADR everywhere, the exact thing his margin-first strategy protects. The SME guidance is explicit: don't ask for a general rate drop.",
    playerDialogue:
      "The cleanest fix is to bring your overall public rates down a few percent so you're competitive across the board here.",
    partnerResponse:
      "Dropping my ADR across the board is the one thing I won't do. Next idea.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
  {
    id: 'rc-r1-none-step2-ranking-threat',
    label: 'Pressure him with a ranking threat over his direct price',
    description:
      'Point at his cheaper direct site and threaten an automated ranking drop unless he brings the price down. In a No Parity market you cannot require lower prices or threaten visibility based on his prices elsewhere.',
    playerDialogue:
      "Your own site is clearly the cheaper option. Bring your public price here down to that level, or the system keeps reading you as uncompetitive and pushing you down the rankings.",
    partnerResponse:
      "Threatening my ranking over how I price on my own site is exactly the conversation I won't have. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step2: BranchingStep = {
  id: 'segmented-ask',
  label: 'Reframe around a targeted, voluntary offer',
  partnerPrompt: liam30PercentCap,
  options: step2Options,
};

// ───────── Step 3 - Evidence + fenced-test ask ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'rc-r1-none-step3-correct',
    label: 'Lead with lost visibility and the competitiveness data, offer a fenced test',
    description:
      "SME-prescribed handling: frame the gap as visibility he isn't earning with unique audiences, quantify the upside with the competitiveness stat, and de-risk it as a controlled test on a fenced segment.",
    playerDialogue:
      "Right now your property isn't visible to unique audiences who wouldn't otherwise find you. Data shows improving price competitiveness by 10% on our platform generates, on average, 30% more bookings and 25% more revenue. By leveraging our visibility you can turn those new travellers into loyal guests. Based on your goals, would you be open to testing it on one fenced segment?",
    partnerResponse: liamControlledExperiment,
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r1-none-step3-full-commit',
    label: 'Cite the data but push for a full switch-on now',
    description:
      "Right data, wrong ask - it brushes past his cannibalisation worry and pushes an all-segments switch-on instead of the fenced test that would earn his yes.",
    playerDialogue:
      "The numbers are clear: 10% more competitive is 30% more bookings. Let's switch it on across every segment today and not overthink it.",
    partnerResponse:
      "You just breezed straight past my concern about cannibalisation. I'm not flipping a switch on everything.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'rc-r1-none-step3-dismiss',
    label: 'Dismiss his concern and tell him to trust you',
    description:
      "Wave away the cannibalisation worry as a myth and ask him to take it on faith. The opposite of what an evidence-driven partner wants.",
    playerDialogue:
      "Honestly, cannibalisation is a bit of a myth partners tell themselves. Just trust me on this one and turn it on.",
    partnerResponse:
      "Telling me my concern is a myth and to 'just trust you' is not a data conversation. This is over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -12,
  },
];

const step3: BranchingStep = {
  id: 'evidence',
  label: 'Handle the risk with data and a fenced test',
  partnerPrompt: liamWhyRisk,
  options: step3Options,
};

// ───────── Assembled tree ─────────

export const royalCrestNoneR1: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'royal-crest-none',
  round: 1,
  issueTreePath: royalCrestR1IssueTreePath,
  openingAm: royalCrestOpeningAm,
  steps: [royalCrestStep1Probe, step2, step3, royalCrestStep4Close],
};
