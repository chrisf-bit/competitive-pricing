import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { velvetSkyR2IssueTreePath } from './velvet-sky-base';

/**
 * Velvet Sky Boutique Hotel - Round 2 - Wide Parity variant.
 *
 * Source: SME-approved dialogue (Wide Parity column) for the
 * Brand.com Competitiveness Gap scenario. John runs cheaper public
 * rates on his Brand.com to drive direct bookings. The OPTIMAL lines
 * for each step are taken verbatim from the SME doc.
 *
 * Wide-Parity compliance rules followed:
 *   - The AM may proactively ask John for the same rates and
 *     conditions across his Brand.com AND third-party channels.
 *   - Direct-booking incentives are framed as fenced member rates or
 *     unique value-adds rather than deeper public discounts.
 *   - The AM may NOT promise / threaten ranking rewards or penalties
 *     based on external pricing decisions, may NOT instruct John to
 *     stop working with other OTAs or wholesalers.
 *
 * John's communication style is red (driver) primary + blue (thinker)
 * secondary - same scoring shape as the No-Parity / Narrow variants.
 *
 * Internal metric names do not appear in any option's playerDialogue,
 * including the risky picks.
 */

// ───────── Step 1 - Frame the discovery cost of cheaper public rates ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'vs-r2-wide-step1-correct',
    label: 'Validate the margin worry, frame the discovery cost',
    description:
      "Use the doc-prescribed opener: respect the margin protection goal, then surface the 90% discovery dynamic and explain how cheaper public rates elsewhere hurt his on-platform ranking and discovery for both channels.",
    playerDialogue:
      "I understand wanting to protect your margins, but remember that up to 90% of guests who book through Booking.com discover your property on our platform first. When you display cheaper public rates elsewhere, it affects your ranking and discovery on our channel - meaning both channels lose out on potential eyes.",
    partnerResponse:
      "But I still want to give people a reason to book directly with me instead of an OTA.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'vs-r2-wide-step1-penalty-warn',
    label: "Threaten an active account penalty if he doesn't match",
    description:
      'Tell John the platform will actively penalise his account, drop his positioning score, and restrict his traffic if he doesn\'t match rates. Breaks the ban on threatening explicit penalties.',
    playerDialogue:
      "I understand, but by pushing public discounts elsewhere, you are undercutting us. If you don't match our rate immediately, our system will actively penalise your account, drop your positioning score, and restrict your traffic footprint.",
    partnerResponse:
      "Threatening to throttle my traffic if I don't comply is not a commercial conversation. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
  {
    id: 'vs-r2-wide-step1-shame',
    label: 'Tell him cheap public discounts are destroying his brand',
    description:
      "Open with a moralising lecture - accuse him of destroying his boutique positioning to save on a fee. Aggressive, condescending, and ignores the commercial logic John brought to the call.",
    playerDialogue:
      "John, maximising volume through cheap public discounts is a losing strategy. You are destroying your property's premium boutique positioning just to save on a fee. Let's scrap those external discounts today before you do permanent damage.",
    partnerResponse:
      "Telling me my strategy is destroying my brand isn't going to land. I called you for a commercial discussion.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -12,
  },
];

const step1Open: BranchingStep = {
  id: 'open',
  label: 'Frame the discovery cost',
  partnerPrompt:
    "We're aggressively pushing public discounts on our site to bypass commissions. Volume is up, so it feels like a win.",
  options: step1Options,
};

// ───────── Step 2 - Position fenced direct incentives ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'vs-r2-wide-step2-correct',
    label: 'Affirm the direct goal, pitch fenced incentives + value-adds',
    description:
      "Use the doc-prescribed pivot: confirm he can still incentivise direct, ask for public rate alignment across channels (the Wide-Parity ask), and reframe direct incentives as fenced member rates or value-adds like a welcome drink or early check-in.",
    playerDialogue:
      "Absolutely, and you can still do that. Under wide parity, we ask for public rate alignment across all channels. However, instead of public discounts on your site, we recommend using fenced direct incentives - like a closed member rate or value-adds like a free welcome drink.",
    partnerResponse:
      "That protects my public pricing footprint while still giving direct bookers a perk.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'vs-r2-wide-step2-shut-down-otas',
    label: 'Tell him to shut down his other OTAs and wholesalers',
    description:
      "Recommend that John stop working with wholesalers and shut down his other third-party accounts. Breaks the general ban on instructing a partner to stop working with other OTAs / wholesalers - applies in every regime.",
    playerDialogue:
      "You definitely can, but under wide parity rules, we ask for rate alignment. To make your direct channel more attractive than other OTAs, I strongly recommend that you completely stop working with wholesalers and shut down your other third-party accounts.",
    partnerResponse:
      "Telling me to shut down my distribution accounts is well outside this call. I'm not entertaining that.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'vs-r2-wide-step2-attack-stance',
    label: 'Attack his mindset and tell him to drop direct entirely',
    description:
      "Lecture John on a 'bad mindset', call partners competition vs partner thinking a path to failure, and tell him to focus 100% on Booking.com and drop direct-booking incentives entirely. Patronising and dictates his channel strategy.",
    playerDialogue:
      "That is a bad mindset, John. If you treat global platforms as your competition rather than your partners, you are never going to succeed. You need to focus 100% on our platform's distribution and drop the direct-booking incentives entirely.",
    partnerResponse:
      "Calling my mindset bad and telling me to abandon direct distribution is not how you build a partnership. We're done.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step2Fenced: BranchingStep = {
  id: 'fenced-incentives',
  label: 'Position fenced direct incentives',
  partnerPrompt:
    "But I still want to give people a reason to book directly with me instead of an OTA.",
  options: step2Options,
};

// ───────── Step 3 - Close with a targeted Mobile Rate ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'vs-r2-wide-step3-correct',
    label: 'Close with a targeted Mobile Rate to recover visibility',
    description:
      "Use the doc-prescribed close: activate a targeted Mobile Rate to capture high-converting mobile searchers while keeping the base ADR intact. Pairs the Wide-Parity rate alignment with a concrete on-platform action that recovers visibility safely.",
    playerDialogue:
      "Exactly. And to safely build back your visibility on our platform, we can activate a targeted Mobile Rate. This lets you capture high-converting mobile searchers while keeping your base ADR intact. Shall we align the public rates and set that up?",
    partnerResponse:
      "That makes sense. Let's clean up the public rates and test the mobile segment.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'vs-r2-wide-step3-ranking-reward',
    label: 'Personally guarantee a top-3 ranking slot for a month',
    description:
      'Promise John a personally guaranteed top-3 search slot for a month as a reward for aligning rates. Breaks the ban on promising explicit ranking rewards / fixed placement.',
    playerDialogue:
      "Exactly. And as a direct reward for aligning your rates with us today, I will personally guarantee that our algorithm pushes your property into the top 3 slot positions on our destination search pages for the next month.",
    partnerResponse:
      "Personally guaranteed ranking slots aren't a credible commitment. Don't make promises your algorithm doesn't underwrite.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'vs-r2-wide-step3-flood',
    label: 'Activate every discount product at once',
    description:
      "Push for Mobile Rates, Country Rates, and Flash Deals all turned on at once to flood the calendar regardless of ADR. Wrecks the segmented framing John just agreed to and ignores his stated margin focus.",
    playerDialogue:
      "Exactly, it shuts down your website's leak. Now let's go a step further and activate Mobile Rates, Country Rates, and Flash Deals all at once to flood your calendar with bookings, regardless of what happens to your average daily rate.",
    partnerResponse:
      "Flooding my calendar regardless of ADR is the opposite of what I've been protecting in this whole call. We're not doing that.",
    styleMatch: { red: -1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -12,
  },
];

const step3Close: BranchingStep = {
  id: 'close-mobile-rate',
  label: 'Close with a targeted Mobile Rate',
  partnerPrompt:
    "That protects my public pricing footprint while still giving direct bookers a perk.",
  options: step3Options,
};

// ───────── Assembled tree ─────────

export const velvetSkyWideR2: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'velvet-sky-wide',
  round: 2,
  issueTreePath: velvetSkyR2IssueTreePath,
  // SME-prescribed AM opener (Wide Parity column). Set in stone -
  // John's Step 1 partnerPrompt is his response to this.
  openingAm:
    "Hi John! I noticed your direct website rates are consistently lower than what you have listed with us, and it's stalling your visibility. How are you currently calculating the true cost of driving those direct bookings?",
  steps: [step1Open, step2Fenced, step3Close],
};
