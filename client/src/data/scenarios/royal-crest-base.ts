import type {
  IssueTreePath,
  BranchingStep,
  BranchingOption,
} from '../../types';

/**
 * Royal Crest Hotel - Round 1 - shared pieces across all three regime
 * variants.
 *
 * Source: SME "Round 1" scenario doc, Conversation Example 4 (Royal
 * Crest Hotel, Hotel ID 16). Liam O'Connell is a Property Manager /
 * vacation-rental agency running many owners' properties with high
 * commercial autonomy, fiercely protecting his direct channel ("no OTA
 * above 30%"). Objection assigned: The Segmented Pricing Conversation
 * (main) + Brand.com Loyalty (support).
 *
 * The opener (Anya's greeting), the diagnostic probe (Step 1) and the
 * close (Step 4) are identical across regimes in the SME script, so
 * they live here. Steps 2 and 3 - the segmented ask and the
 * evidence/objection-handling - carry the regime-specific dialogue and
 * live in the per-regime files.
 *
 * Liam's style is red (driver) primary + blue (analytical) secondary:
 * "let's get right to the point," profit-first, but wants proof and a
 * controlled experiment before he commits. Scoring rewards red + blue
 * and penalises green/yellow fluff without commercial substance.
 *
 * The OPTIMAL line at each step is taken from the SME script; the two
 * distractors per step are authored to the sim's "close but not quite"
 * rule (one plausible near-miss, one clearer miss). No internal metric
 * names (eRPD, Lose Price, RPD, Price Bucket) appear in any
 * playerDialogue, including the distractors.
 */

export const royalCrestR1IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'brand-com-erpd-not-competitive',
  intent: 'intentional',
  rootCauseId: 'structural-brand-first',
  metricInsightId: 'structural-constant-non-competitive-erpd',
  hookId: 'base-rate-misalignment',
};

// SME-prescribed AM opener (identical across regimes). Liam's Step 1
// partnerPrompt is his reply to this.
export const royalCrestOpeningAm =
  'Hi Liam! I hope you are doing great. I would like to share some insights on your performance - do you have a few minutes?';

// Liam's reply after the OPTIMAL Step 1 probe - it becomes Step 2's
// partnerPrompt in every regime file.
export const liam30PercentCap =
  "Let's get right to the point. Profitability is my priority and I heavily safeguard our direct channel - it generates our main margins. I keep a strict policy that no OTA captures more than 30% of our business, otherwise we risk losing control of our brand.";

// Liam's reply after the OPTIMAL Step 3 evidence line - it is the
// OPTIMAL Step 3 partnerResponse AND Step 4's partnerPrompt.
export const liamControlledExperiment =
  'You have a point that an empty room is revenue lost. If we can strictly isolate this to a specific segment where we currently have no direct marketing presence, it makes sense as a controlled experiment.';

// ───────── Step 1 - Diagnostic probe (regime-identical) ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'rc-r1-step1-correct',
    label: 'Frame the anomaly, then ask him to walk you through his strategy',
    description:
      "SME-prescribed opener: lead with the specific data anomaly (traffic up, forward room nights down) and ask an open question about his pricing strategy before recommending anything.",
    playerDialogue:
      'I know revenue is your top priority. Your page views are 20% up on your peer group, but your future room nights are tracking 20% behind. Can you walk me through the strategic considerations behind your current pricing approach?',
    partnerResponse: liam30PercentCap,
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r1-step1-jump-to-fix',
    label: 'Jump straight to the fix',
    description:
      "Skip the diagnosis and presume the answer - tell him to bring his public price down to close the gap. Plausible on the surface (it names the data) but it prescribes before understanding his strategy, which a driver like Liam reads as being sold to.",
    playerDialogue:
      "Your page views are strong but your conversion here is weak, so let's just bring your public price down a little to close the gap. Can we get that set up today?",
    partnerResponse:
      "You're telling me to drop my price before you understand a thing about my business. That's not how I operate.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rc-r1-step1-rapport-fluff',
    label: 'Open with a no-agenda rapport check-in',
    description:
      'Warm, agenda-free check-in with no data. The wrong register for a time-pressured, profit-first property manager who wants a commercial point.',
    playerDialogue:
      "Hi Liam, no agenda today - I just wanted to see how you're feeling about the partnership and whether you're happy with how things are going overall.",
    partnerResponse:
      "I'm a busy man. If there's a commercial point, make it - otherwise I'll jump off.",
    styleMatch: { red: -2, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

export const royalCrestStep1Probe: BranchingStep = {
  id: 'probe',
  label: 'Open with the anomaly and probe his strategy',
  partnerPrompt: 'Hello! Nice to hear from you. Sure, tell me.',
  options: step1Options,
};

// ───────── Step 4 - Close and land next steps (regime-identical) ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'rc-r1-step4-correct',
    label: 'Lock the fenced test, the metric and a follow-up',
    description:
      "SME-prescribed close: accept his controlled-experiment framing and pin down the segment, what you'll measure, and a review date - so the agreement actually lands.",
    playerDialogue:
      "Perfect, Liam - let's do exactly that. We'll fence it to those segments where you've no direct presence, agree what we're measuring, and I'll bring the impact to our follow-up in a month.",
    partnerResponse:
      "Sounds good. Let's define the segments and the metric now, and review the numbers together in a month.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'rc-r1-step4-vague',
    label: 'Agree, but leave it vague',
    description:
      "Accept the win but don't pin the segment, the metric, or a review date. A soft close that a data-led partner will let evaporate.",
    playerDialogue:
      "Great, I'll get that set up on our side and let you know how it goes.",
    partnerResponse:
      "Set what up, exactly? If we don't agree on the segment and what we're measuring, this goes nowhere.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rc-r1-step4-overreach',
    label: 'Overreach past the agreed test',
    description:
      "Push beyond the controlled experiment he just agreed to - a blanket public rate drop and every discount switched on. Blows up the exact ADR discipline he protects.",
    playerDialogue:
      "Perfect - and while we're at it, let's bring your public rates down across the board and switch on every discount to really move the needle.",
    partnerResponse:
      "That is exactly the across-the-board move I told you I won't make. Stick to the test, or we're done.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
];

export const royalCrestStep4Close: BranchingStep = {
  id: 'close',
  label: 'Close and land next steps',
  partnerPrompt: liamControlledExperiment,
  options: step4Options,
};
