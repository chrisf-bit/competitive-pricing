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
  "The international target is a valid angle, but I'm very cautious about anything that touches revenue. If I start offering discounts on your platform, even targeted ones, I worry it cannibalizes the guests already willing to pay full price on our website. Why should we risk compromising our direct strategy for a lift - in theory?";

// ───────── Step 2 - The segmented ask ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'rc-r1-none-step2-correct',
    label: 'Offer a voluntary US Country Rate, autonomy preserved',
    description:
      "SME-prescribed ask: no general rate drop. Surface the lagging US-traveler share and offer a Country Rate he can choose to run for that segment, protecting his overall ADR - with the choice of strategy explicitly left to him.",
    playerDialogue:
      "I respect that. From Booker Insights dashboard in the extranet, it does show your share of US travelers is lower than your peer group. Rather than a general rate drop, you could choose to run a Country Rate aimed only at the US market - that lifts conversion in that segment while protecting your overall ADR. The choice of pricing and distribution strategy stays entirely yours.",
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
      "Honestly, the cleanest fix here is to bring your overall public rates down a few percent so you're competitive across the board on our platform. If the headline price is lower everywhere, you stop losing the price comparison and your listing looks sharper, so the bookings should follow. I'd take the whole rate down rather than fiddling with one segment at a time.",
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
      "Let's be straight about it - your own website is clearly the cheaper option, and our system can see that gap plainly. You need to bring your public price here down to at least that level. If you don't, the algorithm keeps reading you as uncompetitive, your visibility gets throttled, and you'll slide further down the rankings every week until you fix the price.",
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
      "Right now your property isn't visible to unique audiences who wouldn't otherwise find you. Data shows improving price competitiveness by 10% on our platform generates, on average, 30% more bookings and 25% more revenue. You already attract strong traffic on Booking.com, improving conversion can help capture more of that demand, while some travellers may later choose to book directly. Based on your goals, would you be open to testing it on one fenced segment?",
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
      "Right data, wrong ask - it brushes past his cannibalization worry and pushes an all-segments switch-on instead of the fenced test that would earn his yes.",
    playerDialogue:
      "The numbers here are clear: improving your price competitiveness by 10% is worth 30% more bookings and 25% more revenue on average. That's a big lift and it's sitting right there for you. Rather than carving out one small test, let's switch it on across every segment today so you capture the full upside straight away. You're overthinking the risk - the data speaks for itself.",
    partnerResponse:
      "You just breezed straight past my concern about cannibalization. I'm not flipping a switch on everything.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'rc-r1-none-step3-dismiss',
    label: 'Dismiss his concern and tell him to trust you',
    description:
      "Wave away the cannibalization worry as a myth and ask him to take it on faith. The opposite of what an evidence-driven partner wants.",
    playerDialogue:
      "Honestly, cannibalization is a bit of a myth that partners tell themselves to avoid trying anything new. In my experience it just doesn't play out the way people fear, and the guests you'd win here aren't the same ones booking direct anyway. I've seen this work plenty of times, so you don't need to run the numbers yourself - just trust me on this one and turn it on.",
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
