import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import {
  nobleFalconR3IssueTreePath,
  nobleFalconStep1Open,
  nobleFalconStep2ReframeSearch,
  nobleFalconStep5SegmentDiagnose,
  nobleFalconStep6ProposePilot,
} from './noble-falcon-base';

/**
 * The Noble Falcon Inn - Round 3 - Narrow Parity variant.
 *
 * Source: SME doc "Rate Right - Round 1" (Brand.com Competitiveness
 * Gap). The OPTIMAL lines for Step 3 and Step 4 are taken verbatim
 * from the Narrow-Parity column of the SME's regime-specific
 * dialogue table.
 *
 * Narrow-Parity compliance rules followed (per the legal Stay-
 * Compliant doc):
 *   - The AM can proactively ask for rate alignment with Brand.com,
 *     but not with other OTAs / wholesalers.
 *   - "Parity with your Brand.com" is the SME-approved phrasing -
 *     used verbatim in the optimal pick.
 *   - The risky option pushes for cross-channel sync (alignment with
 *     other OTAs as well as Brand.com) - that overreaches Narrow's
 *     mandate and reads as Wide-parity behaviour in a Narrow context.
 *
 * Internal metric names (eRPD, Lose Price Public, Price Bucket) do
 * not appear in any option's playerDialogue, including the risky
 * picks.
 */

// ───────── Step 3 - Frame the platform value (Narrow Parity) ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'nf-r1-narrow-frame-parity-ask',
    label: 'Ask for price parity with Brand.com',
    description:
      "Use the doc-prescribed Narrow opener: ask Anton for price parity with his Brand.com so the platform can win the shoppers it sees.",
    playerDialogue:
      "We ask for price parity with your Brand.com so we can win those shoppers. Our platform captures new global demand at zero upfront cost, which you can later convert into your loyal guests.",
    partnerResponse:
      "Incremental global volume sounds beneficial. But how do I open up that demand without increasing our exposure to high-risk bookings and payment fraud?",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'nf-r1-narrow-frame-family-first',
    label: 'Skip the parity ask, jump to family segment',
    description:
      "Open on the Family 2+1 and 2+2 scenarios instead of asking for parity. Right wedge later in the call, wrong moment to use it.",
    playerDialogue:
      "Your Family 2+1 and 2+2 scenarios are flagging - could we jump into the family segment first and look at the gap there?",
    partnerResponse:
      "We can come to segments shortly, but I expect a clearer ask on the policy framing before I pull my revenue team in.",
    styleMatch: { red: 0, yellow: 1, green: 0, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 0,
  },
  {
    id: 'nf-r1-narrow-frame-all-channel-align',
    label: 'Demand cross-channel rate sync with all OTAs',
    description:
      "Push Anton to align rates with Brand.com AND every other OTA. Narrow parity allows the Brand.com ask but not the cross-OTA one - this is Wide-parity overreach in a Narrow market.",
    playerDialogue:
      "We need you to align rates across Brand.com and your other OTAs - Booking.com should match the cheapest external price you offer anywhere.",
    partnerResponse:
      "Dictating my pricing with other partners is outside what I would expect from you. That part of the ask is not appropriate for this market.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -10,
  },
];

const step3FrameValue: BranchingStep = {
  id: 'frame-value',
  label: 'Frame the platform value',
  partnerPrompt:
    "That is an ownership trade-off. We prioritise brand control and our direct loyal base over top-funnel platform exposure, even if some rooms stay empty.",
  options: step3Options,
};

// ───────── Step 4 - Solve the risk concern (Narrow Parity) ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'nf-r1-narrow-risk-replicate',
    label: 'Mirror his Brand.com cancellation conditions here',
    description:
      "Use the doc-prescribed Narrow risk solution: replicate the strict cancellation / prepayment conditions Anton already uses on his direct site to keep rates competitive and protect revenue.",
    playerDialogue:
      "We can replicate the strict cancellation or prepayment conditions you use on your site here. Improving competitiveness by 10% yields 30% more bookings while fully protecting your revenue.",
    partnerResponse:
      "Isolating risk via policy rules while keeping rates competitive is practical. Let's look at the metrics; how does this visibility issue affect our specific guest segments?",
    styleMatch: { red: 0, yellow: 0, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'nf-r1-narrow-risk-deflect',
    label: 'Tell him the gap matters more than the risk',
    description:
      "Acknowledge the risk concern but suggest the bigger issue is the price gap itself. Sidesteps Anton's actual concern.",
    playerDialogue:
      "Risk is a real concern, but the bigger issue is the gap itself. Let's focus on closing the gap first.",
    partnerResponse:
      "If you don't address the risk side, the gap is not a conversation I can take forward. They are linked, not sequential.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -2,
  },
  {
    id: 'nf-r1-narrow-risk-channel-mix',
    label: 'Offer to adjust his other-OTA rates as well',
    description:
      "Tell Anton you can extend the same parity ask to his other OTAs to keep him 'consistent'. Wide-parity overreach + dictating external channel strategy.",
    playerDialogue:
      "We can adjust your other-OTA rates too if you're worried about consistency - we want you protected across all channels.",
    partnerResponse:
      "My other-OTA pricing is not yours to adjust. You have overstepped what I can engage with on this call.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -12,
  },
];

const step4RiskSolution: BranchingStep = {
  id: 'risk-solution',
  label: 'Solve the risk concern',
  partnerPrompt:
    "Incremental global volume sounds beneficial. But how do I open up that demand without increasing our exposure to high-risk bookings and payment fraud?",
  options: step4Options,
};

// ───────── Assembled tree ─────────

export const nobleFalconNarrowR3: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'noble-falcon-narrow',
  round: 3,
  issueTreePath: nobleFalconR3IssueTreePath,
  steps: [
    nobleFalconStep1Open,
    nobleFalconStep2ReframeSearch,
    step3FrameValue,
    step4RiskSolution,
    nobleFalconStep5SegmentDiagnose,
    nobleFalconStep6ProposePilot,
  ],
};
