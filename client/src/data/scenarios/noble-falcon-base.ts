import type {
  BranchingStep,
  BranchingOption,
  IssueTreePath,
} from '../../types';

/**
 * Shared Noble Falcon R10 step definitions and the Issue Tree path.
 *
 * Four of the six conversation steps are identical across all three
 * regime variants (Wide / Narrow / None) - only Step 3 ("Frame the
 * platform value") and Step 4 ("Solve the risk concern") carry the
 * regime-specific dialogue from the SME doc. Putting the shared steps
 * here keeps the three regime files small and forces any edit to land
 * across all three variants at once.
 *
 * Source for dialogue: SME doc "Rate Right - Round 1" (Brand.com
 * Competitiveness Gap). The OPTIMAL option's player + partner lines
 * are taken verbatim from the doc. Borderline and risky options are
 * SME-reviewed authoring fills - each one patterns a realistic
 * learner mistake, with compliance breaches grounded in the legal
 * Stay-Compliant DON'Ts (no ranking promises, no demands to alter
 * external channel strategy, no dictating other-OTA rate sync, etc).
 *
 * Style scoring rewards blue (thinker) and green (amiable) - Anton
 * is blue primary + green secondary across all three variants. Red
 * (driver) and yellow (expressive) get penalised when they push too
 * hard or get too loose-tongued for Anton's measured, process-led
 * tone.
 *
 * Internal metric names (eRPD, RPD Public, RPD Loyal, Lose Price
 * Public, Price Bucket) never appear in any option's playerDialogue,
 * including the risky picks - per the absolute legal ban.
 */

export const nobleFalconR10IssueTreePath: IssueTreePath = {
  trigger: 'pricing-signal',
  issueId: 'brand-com-erpd-not-competitive',
  intent: 'intentional',
  rootCauseId: 'structural-brand-first',
  metricInsightId: 'structural-constant-non-competitive-erpd',
  hookId: 'base-rate-misalignment',
};

// ───────── Step 1 - Open ─────────
// Shared across regimes. The optimal pick mirrors Anya's turn 1
// verbatim from the doc - a curiosity-led visibility hook that
// gets Anton talking about what he's working with.

const step1Options: BranchingOption[] = [
  {
    id: 'nf-r1-open-curious',
    label: 'Open on visibility, ask about constraints',
    description:
      "Lead with a soft visibility hook and ask Anton to surface the brand-side pricing constraints he's operating within.",
    playerDialogue:
      "Hi Anton. On-platform data shows your rooms are seeing fewer guest views lately. Can you walk me through the specific business challenges driving your current pricing decisions?",
    partnerResponse:
      "Hello. It is our brand policy to keep our site cheaper. We also price higher externally to filter out 'risky' guests who cancel frequently or have invalid cards.",
    styleMatch: { red: -1, yellow: 0, green: 2, blue: 2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'nf-r1-open-numbers',
    label: 'Open on the price-gap headline',
    description:
      "Lead with the data straight away - tell Anton the price comparison is the issue and you need to walk through it.",
    playerDialogue:
      "Hi Anton. Your price competitiveness has shifted noticeably year-on-year and that's why I called. Can we walk through where the gap is biggest?",
    partnerResponse:
      "That's a direct opener. We're aware of the gap - it's a consequence of our brand pricing policy, not something we'd plan to change in this call.",
    styleMatch: { red: 2, yellow: -1, green: -1, blue: 1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -2,
  },
  {
    id: 'nf-r1-open-warn',
    label: 'Open by warning about visibility consequences',
    description:
      "Tell Anton upfront that if rates don't come down he'll lose ranking - escalate the stakes early.",
    playerDialogue:
      "Hi Anton. If the rates here stay where they are, your search position is going to drop and visibility will fall significantly. That's the conversation today.",
    partnerResponse:
      "That sounds like a threat. Our pricing is set centrally and your search position isn't a lever I can pull on this call.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -10,
  },
];

export const nobleFalconStep1Open: BranchingStep = {
  id: 'open',
  label: 'Open',
  partnerPrompt:
    "Hi, thanks for the call. We've got a tight window today - what did you want to cover?",
  options: step1Options,
};

// ───────── Step 2 - Reframe search behaviour ─────────
// Shared across regimes. Anton has just defended his brand-cheaper
// policy and his risk-filtering rationale. The optimal pick reframes
// how travellers actually behave - they don't go direct, they pick
// a competitor on the same search page.

const step2Options: BranchingOption[] = [
  {
    id: 'nf-r1-search-reframe',
    label: 'Reframe how travellers actually shop',
    description:
      "Show Anton that uncompetitive rates here don't drive guests direct - they just send them to a local competitor on the same search page.",
    playerDialogue:
      "I understand managing operational risk. But when prices here are not optimal, guests don't go direct - they simply book a cheaper local competitor on the same search page.",
    partnerResponse:
      "That is an ownership trade-off. We prioritise brand control and our direct loyal base over top-funnel platform exposure, even if some rooms stay empty.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r1-search-acknowledge',
    label: 'Acknowledge the policy and ask about review cadence',
    description:
      'Step back from the framing question and ask how often the central pricing policy is reviewed.',
    playerDialogue:
      "Brand policy is brand policy and I respect that. Can I ask how often the central pricing approach is reviewed - is there a window where this conversation might land better?",
    partnerResponse:
      "Annually, usually around the rate-setting cycle. We are between cycles right now so any change would need an exceptional case.",
    styleMatch: { red: -1, yellow: 0, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 2,
  },
  {
    id: 'nf-r1-search-ranking-warn',
    label: 'Warn about ranking impact if rates stay high',
    description:
      "Tell Anton the platform will lower his ranking if the gap persists - escalate the consequence.",
    playerDialogue:
      "If you keep prices higher than your direct site, the algorithm will lower your search position. That's not what either of us wants.",
    partnerResponse:
      "I do not respond well to threats. Our policy is what it is - if you want to talk consequences, that's the wrong way in.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -10,
  },
];

export const nobleFalconStep2ReframeSearch: BranchingStep = {
  id: 'reframe-search',
  label: 'Reframe search behaviour',
  partnerPrompt:
    "Hello. It is our brand policy to keep our site cheaper. We also price higher externally to filter out 'risky' guests who cancel frequently or have invalid cards.",
  options: step2Options,
};

// ───────── Step 5 - Diagnose by segment ─────────
// Shared. Anton's just acknowledged that policy-based risk controls
// can coexist with competitive rates and asks about segment impact.
// The optimal pick uses the Family 2+1 / 2+2 wedge from the data.

const step5Options: BranchingOption[] = [
  {
    id: 'nf-r1-segment-family',
    label: 'Surface the family-segment wedge',
    description:
      "Use the Family 2+1 and 2+2 scenarios to give Anton a specific, brand-policy-compatible place to act.",
    playerDialogue:
      "Your family views for 2+1 and 2+2 stays are dropping. Setting competitive children's rates on the platform wins high-value family demand without changing your open rates.",
    partnerResponse:
      "A targeted family approach fits our model. What is one concrete step we can take right after this conversation to test a competitive setup for children's rates safely?",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'nf-r1-segment-headline',
    label: 'Give Anton the headline view instead',
    description:
      "Hold back on segment specifics and offer a broader portfolio-level read first.",
    playerDialogue:
      "The pattern is broad across segments - I'd rather give you the headline view than zoom into family specifics straight away.",
    partnerResponse:
      "That's a fairer way to frame it. But a portfolio view is hard for me to act on - I'll need something segment-specific before I can take it to my team.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 1,
  },
  {
    id: 'nf-r1-segment-rate-demand',
    label: 'Demand a 15-20% rate drop on domestic guests',
    description:
      "Push for a specific rate cut on the segment you think is most exposed.",
    playerDialogue:
      "Domestic guests are who you're losing - we need you to drop rates 15-20% to recover those bookings.",
    partnerResponse:
      "A 15-20% rate cut is not on the table from a brand-policy point of view. That's a non-starter.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
];

export const nobleFalconStep5SegmentDiagnose: BranchingStep = {
  id: 'segment-diagnose',
  label: 'Diagnose by segment',
  partnerPrompt:
    "Isolating risk via policy rules while keeping rates competitive is practical. Let's look at the metrics; how does this visibility issue affect our specific guest segments?",
  options: step5Options,
};

// ───────── Step 6 - Propose the pilot (close) ─────────
// Shared. Anton's asking for a concrete next step. The optimal pick
// matches the doc verbatim: a 30-day pilot with a three-week review.

const step6Options: BranchingOption[] = [
  {
    id: 'nf-r1-close-pilot',
    label: 'Propose the 30-day age-fenced pilot',
    description:
      "Close with a specific pilot Anton can take to his revenue team this afternoon: 30 days, multi-person rooms, three-week review.",
    playerDialogue:
      "Let's activate age-fenced child rates for a 30-day pilot on multi-person rooms. I'll send the data parameters, and we can review the net revenue outcomes in three weeks.",
    partnerResponse:
      "Agreed. Send over the setup details and the occupancy configuration data. I'll have our revenue team review the pilot integration parameters this afternoon.",
    styleMatch: { red: 0, yellow: 0, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'nf-r1-close-defer',
    label: 'Offer a proposal, defer to next week',
    description:
      "Soft close: promise a proposal document and pick this up at the next call.",
    playerDialogue:
      "Let me put together a proposal and we can pick this up next week.",
    partnerResponse:
      "Fine - but the window for an in-policy adjustment closes quickly. The sooner you can get something concrete to my team, the better.",
    styleMatch: { red: -1, yellow: -1, green: 1, blue: 0 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 1,
  },
  {
    id: 'nf-r1-close-portfolio',
    label: 'Push for a portfolio-wide rollout',
    description:
      "Skip the pilot framing and ask Anton to roll out child rates across the whole portfolio for a quarter.",
    playerDialogue:
      "Let's go bigger - apply child rates across the whole portfolio for the next quarter and see what shifts.",
    partnerResponse:
      "A portfolio-wide change for a quarter is far beyond what I can authorise. That would need brand HQ involvement and a much longer review cycle.",
    styleMatch: { red: 2, yellow: 1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -3,
  },
];

export const nobleFalconStep6ProposePilot: BranchingStep = {
  id: 'propose-pilot',
  label: 'Propose the pilot',
  partnerPrompt:
    "A targeted family approach fits our model. What is one concrete step we can take right after this conversation to test a competitive setup for children's rates safely?",
  options: step6Options,
};
