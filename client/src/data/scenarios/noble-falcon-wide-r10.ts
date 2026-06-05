import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import {
  nobleFalconR10IssueTreePath,
  nobleFalconStep1Open,
  nobleFalconStep2ReframeSearch,
  nobleFalconStep5SegmentDiagnose,
  nobleFalconStep6ProposePilot,
} from './noble-falcon-base';

/**
 * The Noble Falcon Inn - Round 10 - Wide Parity variant.
 *
 * Source: SME doc "Rate Right - Round 1" (Brand.com Competitiveness
 * Gap). The OPTIMAL lines for Step 3 and Step 4 are taken verbatim
 * from the Wide-Parity column of the SME's regime-specific dialogue
 * table.
 *
 * Wide-Parity compliance rules followed (per the legal Stay-Compliant
 * doc):
 *   - The AM can proactively ask for the same rates and availability
 *     across Brand.com AND third parties - that's the full Wide
 *     mandate and used verbatim in the optimal pick.
 *   - Risk solutions stay anchored to platform-side controls
 *     (prepayment policies, deposits per segment) rather than
 *     dictating that Anton change his external-channel approach.
 *   - The risky options break general DON'Ts that apply to all
 *     regimes: threatening visibility / search position and
 *     instructing the partner to switch off external OTAs.
 *
 * Internal metric names (eRPD, Lose Price Public, Price Bucket) do
 * not appear in any option's playerDialogue, including the risky
 * picks.
 */

// ───────── Step 3 - Frame the platform value (Wide Parity) ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'nf-r1-wide-frame-full-ask',
    label: 'Ask for rates and availability across all channels',
    description:
      "Use the doc-prescribed Wide opener: ask Anton to provide the same rates and availability he offers third parties and direct channels.",
    playerDialogue:
      "We ask that you provide the same rates and availability you offer third parties and direct channels here. This captures global demand at zero upfront cost.",
    partnerResponse:
      "Incremental global volume sounds beneficial. But how do I open up that demand without increasing our exposure to high-risk bookings and payment fraud?",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'nf-r1-wide-frame-segment-first',
    label: 'Skip the strategic ask, open on segment data',
    description:
      "Move to a segment-level dive before making the parity ask. Right intent later in the call, wrong moment.",
    playerDialogue:
      "Your price competitiveness has shifted noticeably since last year - it's the biggest signal in your portfolio. Can we look at where the gap is biggest by segment?",
    partnerResponse:
      "I'd prefer you set the strategic ask first. Segments without a framing position are hard for me to take to my team.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 0,
  },
  {
    id: 'nf-r1-wide-frame-ranking-threat',
    label: 'Threaten search-position drop if rates stay misaligned',
    description:
      "Pair the parity ask with a ranking-loss threat. Breaks the general DON'T on promising / threatening ranking changes.",
    playerDialogue:
      "If you don't sync rates across all your channels, your search position will drop and visibility will fall significantly.",
    partnerResponse:
      "Threatening my ranking isn't a constructive way to ask for parity. I respond to commercial logic, not to consequences.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
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

// ───────── Step 4 - Solve the risk concern (Wide Parity) ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'nf-r1-wide-risk-segment-policies',
    label: 'Apply prepayment policies per segment',
    description:
      "Use the doc-prescribed Wide risk solution: apply strict prepayment policies or deposits for specific segments without raising the baseline rate.",
    playerDialogue:
      "We can apply strict prepayment policies or deposits for specific segments here without artificially raising your baseline rate. A 10% optimal shift yields 30% more bookings.",
    partnerResponse:
      "Isolating risk via policy rules while keeping rates competitive is practical. Let's look at the metrics; how does this visibility issue affect our specific guest segments?",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'nf-r1-wide-risk-mirror-direct',
    label: 'Mirror his direct-site cancellation policy here',
    description:
      "Offer to copy the cancellation policy from Anton's direct site rather than authoring fresh per-segment controls. Workable but less targeted than the optimal pick.",
    playerDialogue:
      "Let's take risk off the table - we can mirror your direct site's cancellation policy here.",
    partnerResponse:
      "A blanket mirror is broader than I'd ideally start with, but the principle is sound. I'd want to see segment-level options before committing.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 0 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 1,
  },
  {
    id: 'nf-r1-wide-risk-switch-off-otas',
    label: 'Suggest he switch off the high-risk OTAs',
    description:
      "Tell Anton he should turn off any OTA that's a fraud source. Dictates external channel strategy - hard general DON'T across every regime.",
    playerDialogue:
      "You can also switch off the high-risk OTAs entirely - that protects you better than rate adjustments.",
    partnerResponse:
      "Telling me to switch off other channels is well beyond what I'd expect from this call. That is not a recommendation I can act on.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -10,
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

export const nobleFalconWideR10: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'noble-falcon-wide',
  round: 10,
  issueTreePath: nobleFalconR10IssueTreePath,
  steps: [
    nobleFalconStep1Open,
    nobleFalconStep2ReframeSearch,
    step3FrameValue,
    step4RiskSolution,
    nobleFalconStep5SegmentDiagnose,
    nobleFalconStep6ProposePilot,
  ],
};
