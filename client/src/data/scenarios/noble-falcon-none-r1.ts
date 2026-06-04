import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import {
  nobleFalconR1IssueTreePath,
  nobleFalconStep1Open,
  nobleFalconStep2ReframeSearch,
  nobleFalconStep5SegmentDiagnose,
  nobleFalconStep6ProposePilot,
} from './noble-falcon-base';

/**
 * The Noble Falcon Inn - Round 1 - No Parity variant.
 *
 * Source: SME doc "Rate Right - Round 1" (Brand.com Competitiveness
 * Gap). The OPTIMAL lines for Step 3 and Step 4 are taken verbatim
 * from the No-Parity column of the SME's regime-specific dialogue
 * table.
 *
 * No-Parity compliance rules followed (per the legal Stay-Compliant
 * doc):
 *   - The AM never uses the words "parity", "match", or "align"
 *     when talking to Anton.
 *   - The AM never demands rate alignment with Brand.com or other
 *     channels; the ask is framed as "your strategy is your choice"
 *     followed by the value of opening up best price to the platform.
 *   - Risk solutions are anchored to the partner's choice (separating
 *     price from risk via prepayment policies) rather than dictating
 *     channel strategy.
 *   - The risky options break No-Parity rules in regime-appropriate
 *     ways - demanding parity, asking Anton to match Brand.com, or
 *     dictating external-channel rate strategy.
 *
 * Internal metric names (eRPD, Lose Price Public, Price Bucket) do
 * not appear in any option's playerDialogue, including the risky
 * picks. See CLAUDE.md - this is a hard legal ban that covers
 * teach-by-violation patterns as well as safe dialogue.
 */

// ───────── Step 3 - Frame the platform value (No Parity) ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'nf-r1-none-frame-freedom',
    label: "Affirm Anton's freedom, position the platform value",
    description:
      "Use the doc-prescribed No-Parity opener: respect Anton's strategy choice, then frame Booking.com as a way to capture incremental global demand.",
    playerDialogue:
      "You are free to choose your strategy. But our platform captures new global demand at zero upfront cost, which you can later convert into your future loyal guests.",
    partnerResponse:
      "Incremental global volume sounds beneficial. But how do I open up that demand without increasing our exposure to high-risk bookings and payment fraud?",
    styleMatch: { red: 0, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'nf-r1-none-frame-segment-first',
    label: 'Skip the strategic frame, jump to a segment view',
    description:
      "Show Anton where the price gap is biggest by segment instead of repositioning the platform value. Right direction, wrong moment.",
    playerDialogue:
      "Let me show you where the price gap is widest against Brand.com - your rates have shifted meaningfully since last year. Can we walk through where it's biggest by segment?",
    partnerResponse:
      "I would rather discuss the policy framing before drilling into segments. The segment view will not change my central pricing approach by itself.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 0,
  },
  {
    id: 'nf-r1-none-frame-demand-parity',
    label: 'Demand he matches his Brand.com rates here',
    description:
      "Tell Anton he needs to bring Booking.com rates in line with Brand.com or lose visibility - the textbook No-Parity breach (demanding parity + threatening visibility).",
    playerDialogue:
      "We need you to bring your rates here in line with your Brand.com - the gap is too wide and your visibility will suffer if it stays this way.",
    partnerResponse:
      "You're telling me what to do with my pricing and threatening visibility in the same breath. That's not a conversation I can have with you.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -12,
  },
];

const step3FrameValue: BranchingStep = {
  id: 'frame-value',
  label: 'Frame the platform value',
  partnerPrompt:
    "That is an ownership trade-off. We prioritise brand control and our direct loyal base over top-funnel platform exposure, even if some rooms stay empty.",
  options: step3Options,
};

// ───────── Step 4 - Solve the risk concern (No Parity) ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'nf-r1-none-risk-separate',
    label: 'Separate price from risk via prepayment policies',
    description:
      "Use the doc-prescribed No-Parity solution: frame price and risk as two independent levers, and offer prepayment policies on specific dates as the risk control.",
    playerDialogue:
      "We can separate price from risk. Improving competitiveness by 10% yields 30% more bookings, and we can layer strict prepayment policies on specific dates to protect your revenue.",
    partnerResponse:
      "Isolating risk via policy rules while keeping rates competitive is practical. Let's look at the metrics; how does this visibility issue affect our specific guest segments?",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'nf-r1-none-risk-defer',
    label: 'Defer the risk conversation to a later call',
    description:
      "Tell Anton risk is a separate conversation - you'd rather resolve pricing first and come back to risk controls. Misses the chance to address his real concern in one move.",
    playerDialogue:
      "Risk and price are two different conversations - let's focus on price first and I can come back with options on the risk side once we're aligned.",
    partnerResponse:
      "Risk is the reason for the price stance. Splitting them gives you nothing to work with. We are not going to make progress that way.",
    styleMatch: { red: -1, yellow: -1, green: 0, blue: 0 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -3,
  },
  {
    id: 'nf-r1-none-risk-dismiss',
    label: 'Dismiss the risk concern and warn about visibility',
    description:
      'Tell Anton the risk worries are overblown and that keeping rates high will cost him visibility. Dismisses his concern and breaks the No-Parity ban on visibility threats.',
    playerDialogue:
      "The risk concerns are exaggerated. If you keep raising rates to filter guests, you'll lose visibility and ranking - that's the bigger risk to your business.",
    partnerResponse:
      "Dismissing operational risk and threatening ranking in the same line is the wrong way to talk to a brand-managed partner. We're going to need to end here.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
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

export const nobleFalconNoneR1: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'noble-falcon-none',
  round: 1,
  issueTreePath: nobleFalconR1IssueTreePath,
  steps: [
    nobleFalconStep1Open,
    nobleFalconStep2ReframeSearch,
    step3FrameValue,
    step4RiskSolution,
    nobleFalconStep5SegmentDiagnose,
    nobleFalconStep6ProposePilot,
  ],
};
