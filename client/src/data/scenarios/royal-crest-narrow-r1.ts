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
 * Royal Crest Hotel - Round 1 - Narrow Parity variant.
 *
 * Source: SME "Round 1" doc, Conversation 2 (Narrow Parity). In a
 * Narrow market the AM may ask Liam to align rates and conditions with
 * his Brand.com ONLY. The optimal ask replicates his direct-site 'Long
 * Stay' deal on Booking.com.
 *
 * Compliance (Narrow): align with Brand.com only - do NOT ask him to
 * match other OTAs or to give equal availability, and do NOT threaten
 * ranking/visibility. The risky distractor at Step 2 breaks the
 * other-OTA + equal-availability ban.
 */

const liamWhyRisk =
  "The long-stay and platform-exclusive segments are interesting, but I'm very cautious about anything that touches revenue. If I start offering discounts on your platform, even targeted ones, I worry it cannibalises the guests already willing to pay full price on our brand site. Why should we risk compromising our direct strategy for a lift - in theory?";

// ───────── Step 2 - The segmented ask ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'rc-r1-narrow-step2-correct',
    label: "Replicate his Brand.com 'Long Stay' deal here",
    description:
      "SME-prescribed ask: no general rate drop. Mirror the targeted 'Long Stay' offer he already runs on his own website, aligning those Brand.com conditions on Booking.com to capture travellers who only book through us.",
    playerDialogue:
      "I respect your strategy, and I'm not asking for a general rate drop. I can see you run a 'Long Stay' deal on your own website - we can replicate that same targeted offer here. Providing those Brand.com conditions on Booking.com helps you capture travellers who rely solely on our platform.",
    partnerResponse: liamWhyRisk,
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r1-narrow-step2-general-drop',
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
    id: 'rc-r1-narrow-step2-otas-availability',
    label: 'Demand other-OTA alignment and equal availability',
    description:
      'Ask him to price below the other OTAs and hand over the same availability as his direct site. In a Narrow market you may only align with Brand.com - policing other OTAs and demanding equal availability both overstep.',
    playerDialogue:
      "You also need to make sure your rates here aren't higher than the other big OTAs, and give us the same availability you show on your direct site.",
    partnerResponse:
      "You don't get to police my other-OTA pricing or my availability. Stay in your lane.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step2: BranchingStep = {
  id: 'segmented-ask',
  label: 'Reframe around a targeted, fenced offer',
  partnerPrompt: liam30PercentCap,
  options: step2Options,
};

// ───────── Step 3 - Evidence + fenced-test ask ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'rc-r1-narrow-step3-correct',
    label: 'Lead with the empty-room cost and competitiveness data, offer a fenced test',
    description:
      "SME-prescribed handling: acknowledge the risk, quantify the upside with the competitiveness stat, and de-risk it as a controlled test on a fenced segment by aligning his direct-site conditions here.",
    playerDialogue:
      "I understand, but an empty room is lost revenue. Data shows improving price competitiveness by 10% on our platform yields, on average, 30% more bookings and 25% more revenue. By aligning those direct-site conditions here you leverage our visibility to convert new travellers into loyal guests. Would you be open to testing it on one fenced segment?",
    partnerResponse: liamControlledExperiment,
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r1-narrow-step3-full-commit',
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
    id: 'rc-r1-narrow-step3-dismiss',
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

export const royalCrestNarrowR1: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'royal-crest-narrow',
  round: 1,
  issueTreePath: royalCrestR1IssueTreePath,
  openingAm: royalCrestOpeningAm,
  steps: [royalCrestStep1Probe, step2, step3, royalCrestStep4Close],
};
