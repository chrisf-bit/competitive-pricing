import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { crystalWaterR1IssueTreePath } from './crystal-water-base';

/**
 * Crystal Water Resort - Round 1 - Narrow Parity variant.
 *
 * Source: SME-approved dialogue (Narrow Parity column) for the
 * Brand.com Competitiveness Gap scenario. Sarah is running cheaper
 * public rates on her direct brand site to drive direct bookings.
 * The OPTIMAL lines for each step are taken verbatim from the SME doc.
 *
 * Narrow-Parity compliance rules followed (per the legal Stay-
 * Compliant doc):
 *   - The AM may ask Sarah to align rates with her Brand.com only.
 *   - The AM may NOT ask for parity / alignment with other OTAs, may
 *     NOT ask for equal availability, and may NOT threaten ranking
 *     or visibility penalties on the basis of external prices.
 *   - Direct-booking incentives are framed as fenced member rates,
 *     not deeper public discounts on the partner's direct site.
 *
 * Sarah's communication style is red (driver) primary + yellow
 * (expressive) secondary - same scoring shape as the No-Parity
 * variant; the regime only changes the regulatory framing.
 *
 * Internal metric names do not appear in any option's playerDialogue,
 * including the risky picks.
 */

// ───────── Step 1 - Acknowledge the conversion gap ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'cw-r1-narrow-step1-correct',
    label: 'Validate the direct-brand goal, name the cost on Booking.com',
    description:
      "Use the doc-prescribed opener: respect Sarah's direct-brand strategy, then surface the free-billboard dynamic created by the Brand.com price gap on Booking.com specifically.",
    playerDialogue:
      "It makes total sense to build your direct brand. But let's look at the actual cost of that strategy. Right now, your public base rate on Booking.com is higher compared to your brand site. Because of that gap, travelers use us as a free billboard, but then leave to book directly with you.",
    partnerResponse:
      "Exactly, that's the goal! It saves us the commission fee.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'cw-r1-narrow-step1-other-otas',
    label: 'Compare her against other OTAs on meta-search',
    description:
      'Tell Sarah she also has to make sure she\'s not pricier than the other major OTAs. Breaks the Narrow Parity ban on referencing or comparing against other OTAs.',
    playerDialogue:
      "I understand, but this strategy means you are also uncompetitive against other major OTAs on meta-search. To fix your conversion, you need to make sure your rates aren't more expensive than those third-party channels.",
    partnerResponse:
      "We're not in a market where you get to tell me what to do about my other OTA pricing. Stay in your lane.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -10,
  },
  {
    id: 'cw-r1-narrow-step1-condescend',
    label: 'Tell her the loyalty strategy is short-sighted',
    description:
      "Open with a sharp lecture - call her strategy short-sighted, accuse her of cheating the system, threaten her account's long-term momentum.",
    playerDialogue:
      "Sarah, that loyalty strategy is short-sighted. You are using our platform for free advertising and trying to cheat the system. If you keep capping your volume, your account is going to lose all momentum permanently.",
    partnerResponse:
      "Accusing me of cheating the system is not how I want this call going. I think we're done here.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step1Open: BranchingStep = {
  id: 'open',
  label: 'Acknowledge the conversion gap',
  partnerPrompt:
    "Hi! Yes, we love the visibility, but we are intentionally capping our OTA volume. We've put our best rates exclusively on our direct brand website to drive loyalty.",
  options: step1Options,
};

// ───────── Step 2 - Reframe the commission saving ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'cw-r1-narrow-step2-correct',
    label: 'Surface the friction; pitch Genius + Family segment unlock',
    description:
      "Use the doc-prescribed pivot: align Booking.com rates with her Brand.com so she stops fighting the platform's flow, and unlock the Genius / Family segments who only book through Booking.com.",
    playerDialogue:
      "It feels like a win, but look at the friction: if you align your Booking.com rates with your website, you stop fighting the platform's natural flow and instead unlock our high-value Genius and Family segments who only book through us.",
    partnerResponse:
      "But if I give you the same rate, I'm paying commission on a booking I might have gotten for free.",
    styleMatch: { red: 2, yellow: 2, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'cw-r1-narrow-step2-availability',
    label: 'Ask for equal availability alongside parity',
    description:
      "Tell Sarah she needs to give Booking.com the same availability as her direct site - Narrow Parity covers the rate ask but NOT availability, so this overreaches the regime's permission.",
    playerDialogue:
      "Saving on commission sounds great, but you also need to ensure you provide us with the exact same room availability featured on your direct site. Equal rate parity and equal availability will instantly bring your conversion back up.",
    partnerResponse:
      "Availability is mine to allocate. You don't get to ask for that here.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -10,
  },
  {
    id: 'cw-r1-narrow-step2-attack-direct',
    label: "Attack her direct website's economics",
    description:
      "Tell her she should shut down her website ads and let Booking.com handle 100% of distribution. Dictates her direct-channel strategy, well outside what's appropriate.",
    playerDialogue:
      "You aren't actually saving money, Sarah. Running a direct site has massive hidden tracking costs. You should stop pouring cash into website ads and just let us handle 100% of your distribution since our market share is higher.",
    partnerResponse:
      "You don't get to tell me how to run my own website. We're not doing this anymore.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step2Reframe: BranchingStep = {
  id: 'reframe-genius-family',
  label: 'Reframe the commission saving',
  partnerPrompt:
    "Exactly, that's the goal! It saves us the commission fee.",
  options: step2Options,
};

// ───────── Step 3 - Close on incremental volume ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'cw-r1-narrow-step3-correct',
    label: 'Reframe "free" bookings as incremental volume',
    description:
      "Use the doc-prescribed close: only a guest who was 100% committed counts as 'free' - everyone else is incremental volume she'd otherwise lose to a competitor on Booking.com.",
    playerDialogue:
      "Only if that guest was 100% committed to your site. Many global travelers will simply book a competitor if your price is not competitive. By giving us the same rate as your website, you could turn that traffic into incremental bookings from guests you would otherwise lose entirely.",
    partnerResponse:
      "You have a point about the travelers who stick exclusively to one channel. Let's bring the base rates into parity for the next 30 days and see if total revenue increases.",
    styleMatch: { red: 2, yellow: 2, green: 0, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'cw-r1-narrow-step3-ranking-threat',
    label: 'Threaten an organic visibility drop if she delays',
    description:
      'Pair the close with a ranking-loss threat. Breaks the Narrow Parity ban on threatening visibility penalties for price gaps.',
    playerDialogue:
      "They aren't free bookings. Plus, if you don't match your direct brand site's price on our platform immediately, your overall organic visibility and ranking index will be severely lowered as a consequence. Let's align them today to avoid that drop.",
    partnerResponse:
      "Threatening ranking penalties is exactly the kind of conversation we walked away from with other OTAs. You just lost me.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
  {
    id: 'cw-r1-narrow-step3-ultimatum',
    label: 'Hand her an ultimatum and threaten the traffic surplus',
    description:
      "Tell her the 202% traffic lead disappears unless she gives Booking.com the same rate. Threatening, ultimatum-style close that also implies platform-driven traffic withdrawal.",
    playerDialogue:
      "Well, if you only want 'free' bookings, then maybe you shouldn't be listed on global platforms at all. If you refuse to offer the same rate, we will just let your competitors capture that 202% traffic surplus instead while your rooms sit empty.",
    partnerResponse:
      "Implying you'll redirect traffic to my competitors if I don't comply is the wrong way to end a call. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step3Close: BranchingStep = {
  id: 'close-incremental-volume',
  label: 'Close on incremental volume',
  partnerPrompt:
    "But if I give you the same rate, I'm paying commission on a booking I might have gotten for free.",
  options: step3Options,
};

// ───────── Assembled tree ─────────

export const crystalWaterNarrowR1: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'crystal-water-narrow',
  round: 1,
  issueTreePath: crystalWaterR1IssueTreePath,
  // SME-prescribed AM opener (Narrow Parity column). Set in stone -
  // Sarah's Step 1 partnerPrompt is her response to this.
  openingAm:
    "Hi Sarah! I wanted to follow up on your current distribution strategy. Crystal Water Resort is getting a huge amount of traffic on our platform right now - your page views are outperforming your peers by over 200%.",
  steps: [step1Open, step2Reframe, step3Close],
};
