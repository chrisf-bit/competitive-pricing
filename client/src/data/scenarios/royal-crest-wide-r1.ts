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
 * Royal Crest Hotel - Round 1 - Wide Parity variant.
 *
 * Source: SME "Round 1" doc, Conversation 1 (Wide Parity). Liam
 * protects his direct channel and caps OTA share at 30%. In a Wide
 * market the AM may proactively ask him to provide the same rates,
 * conditions and availability he gives Brand.com and key OTAs, so the
 * optimal ask is to mirror his competing-OTA mobile promotion here.
 *
 * Compliance (Wide): the AM may ask for the same rates/conditions, and
 * may cite fact-based competitiveness effects, but must NOT threaten
 * ranking/visibility penalties based on external prices. The risky
 * distractor at Step 2 breaks exactly that ranking-threat ban.
 */

const liamWhyRisk =
  "The mobile and international segments matter, but I'm not willing to take any action that impacts revenue. If I start offering discounts on your platform, even targeted ones, while a mobile promotion is already active elsewhere as a calculated move, I worry it cannibalizes the guests already willing to pay full price on our website. Why should we risk compromising our direct strategy for a lift - in theory?";

// ───────── Step 2 - The segmented ask ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'rc-r1-wide-step2-correct',
    label: 'Respect the strategy; mirror his OTA mobile promo here',
    description:
      "SME-prescribed ask: no general rate drop. Name the competing-OTA mobile promotion and ask him to provide those same conditions on Booking.com via the Mobile Rate to recapture mobile and international demand.",
    playerDialogue:
      "I respect your strategy, and I'm not asking for a general rate drop. We can see you're running a mobile promotion on a competing OTA. There's an opportunity for you to convert better on mobile and with international guests on our platform, so we'd ask you to provide those same conditions here using our Mobile Rate.",
    partnerResponse: liamWhyRisk,
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r1-wide-step2-general-drop',
    label: 'Ask for an across-the-board rate drop',
    description:
      "Right instinct (improve competitiveness) but the wrong tool - a blanket public rate cut lowers his ADR everywhere, the exact thing his margin-first strategy protects. The SME guidance is explicit: don't ask for a general rate drop.",
    playerDialogue:
      "Honestly, the cleanest fix here is just to bring your overall public rates down by a few percent so you're sitting competitively across the board on our platform. If your headline prices come down everywhere, the whole portfolio looks sharper to travelers and we stop losing them on price.",
    partnerResponse:
      "Dropping my ADR across the board is the one thing I won't do. Next idea.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
  {
    id: 'rc-r1-wide-step2-ranking-threat',
    label: 'Threaten a visibility cut if he doesn\'t mirror the deal',
    description:
      'Pressure him with an automated visibility/ranking penalty tied to his external prices. Breaks the ban on threatening ranking or visibility consequences based on prices elsewhere.',
    playerDialogue:
      "You're running a sharper mobile deal on a competing OTA right now, and our system watches that closely. If you don't bring that exact same deal onto our platform, the algorithm reads you as uncompetitive against your comp set and automatically starts cutting your visibility until you fall in line.",
    partnerResponse:
      "So it's a threat now - lower my visibility if I don't fall in line? We're done here.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
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
    id: 'rc-r1-wide-step3-correct',
    label: 'Lead with the empty-room cost and the competitiveness data, offer a fenced test',
    description:
      "SME-prescribed handling: acknowledge the risk, quantify the upside with the competitiveness stat, and de-risk it as a controlled test on a fenced segment rather than a blanket change.",
    playerDialogue:
      "I understand, but an empty room is lost revenue. Data shows improving price competitiveness by 10% on our platform yields, on average, 30% more bookings and 25% more revenue. By providing those same conditions here you leverage our visibility to convert new travelers into loyal guests. Would you be open to testing it on one fenced segment?",
    partnerResponse: liamControlledExperiment,
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r1-wide-step3-full-commit',
    label: 'Cite the data but push for a full switch-on now',
    description:
      "Right data, wrong ask - it brushes past his cannibalization worry and pushes an all-segments switch-on instead of the fenced test that would actually earn his yes.",
    playerDialogue:
      "The numbers here are clear: improving how competitively you're priced by 10% on our platform drives around 30% more bookings and 25% more revenue. There's no reason to move cautiously on this. Let's switch those same conditions on across every segment today, watch the bookings come in, and not overthink the details - the upside is too big to test in a corner.",
    partnerResponse:
      "You just breezed straight past my concern about cannibalization. I'm not flipping a switch on everything.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'rc-r1-wide-step3-dismiss',
    label: 'Dismiss his concern and tell him to trust you',
    description:
      "Wave away the cannibalization worry as a myth and ask him to take it on faith. The opposite of what an evidence-driven partner wants.",
    playerDialogue:
      "Honestly, this cannibalization worry is a bit of a myth that partners tell themselves - I hear it all the time and it rarely plays out the way people fear. The guests booking through us mostly aren't the ones who'd have found your direct site anyway. Just trust me on this one, turn those same conditions on, and you'll see it was the right call. What would you have to lose? All that will happen is increased business.",
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

export const royalCrestWideR1: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'royal-crest-wide',
  round: 1,
  issueTreePath: royalCrestR1IssueTreePath,
  openingAm: royalCrestOpeningAm,
  steps: [royalCrestStep1Probe, step2, step3, royalCrestStep4Close],
};
