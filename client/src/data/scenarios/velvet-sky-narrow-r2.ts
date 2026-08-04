import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { velvetSkyR2IssueTreePath } from './velvet-sky-base';

/**
 * Velvet Sky Boutique Hotel - Round 2 - Narrow Parity variant.
 *
 * Source: SME-approved dialogue (Narrow Parity column) for the
 * Brand.com Competitiveness Gap scenario. John runs cheaper public
 * rates on his Brand.com to drive direct bookings and save on
 * commission. The OPTIMAL lines for each step are taken verbatim
 * from the SME doc.
 *
 * Narrow-Parity compliance rules followed:
 *   - The AM may ask John to align rates with his Brand.com only.
 *   - The AM may NOT compare against other OTAs, may NOT ask for
 *     equal availability, and may NOT promise / threaten ranking
 *     rewards or penalties based on external pricing.
 *   - Direct-booking incentives are framed as fenced member rates
 *     rather than deeper public discounts on his direct site.
 *
 * John's communication style is red (driver) primary + blue (thinker)
 * secondary - same scoring shape as the No-Parity / Wide variants.
 *
 * Internal metric names do not appear in any option's playerDialogue,
 * including the risky picks.
 */

// ───────── Step 1 - Reframe the visibility cost of cheaper external rates ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'vs-r2-narrow-step1-correct',
    label: 'Respect the direct goal, name the platform-visibility cost',
    description:
      "Use the doc-prescribed opener: validate the direct-brand goal, then explain the 90% discovery-on-Booking.com dynamic that makes his cheaper-external strategy hurt his on-platform baseline visibility.",
    playerDialogue:
      "I completely respect the goal of growing direct business. However, since 90% of your guests use our platform as a search engine to discover you first, an uncompetitive public price hurts your baseline visibility.",
    partnerResponse:
      "If I match the rates, I lose my direct booking edge.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'vs-r2-narrow-step1-other-otas',
    label: 'Compare him against other OTAs on meta-search',
    description:
      "Tell John his cheaper website makes him uncompetitive against other OTAs on meta-search. Breaks the Narrow Parity ban on referencing or comparing against other OTAs.",
    playerDialogue:
      "I understand the strategy, but keeping public rates cheaper means you are also uncompetitive against other third-party OTAs on meta-search. To fix your visibility, your rates shouldn't be more expensive than those other channels.",
    partnerResponse:
      "My pricing against other OTAs is none of your business in this market. Stay in your lane.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -10,
  },
  {
    id: 'vs-r2-narrow-step1-aggressive',
    label: 'Tell him he\'s overcharging and his visibility will tank',
    description:
      "Accuse John of trying to avoid commission by overcharging on Booking.com and threaten that his visibility will tank and stay there. Aggressive, condescending tone that alienates a red-driver partner.",
    playerDialogue:
      "John, trying to avoid commission by overcharging our users is a terrible business model. If you keep using our platform for free advertising while undercutting us, your visibility is going to tank and stay there.",
    partnerResponse:
      "Calling me a freeloader and threatening my visibility is exactly the kind of pitch I don't engage with. Done here.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step1Open: BranchingStep = {
  id: 'open',
  label: 'Reframe the visibility cost',
  partnerPrompt:
    "That's intentional. I use cheaper public rates on Brand.com to shift the share away from OTAs and save on commission fees.",
  options: step1Options,
};

// ───────── Step 2 - Position fenced member rates on Brand.com ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'vs-r2-narrow-step2-correct',
    label: 'Pitch fenced member rates as the direct-edge wedge',
    description:
      "Use the doc-prescribed pivot: align public Booking.com rates with his Brand.com to fix discovery, and run fenced member rates on his website to preserve his direct-booking edge - private incentives, not public discounts.",
    playerDialogue:
      "Not necessarily. Instead of keeping your public rates cheaper - which actively suppresses your discovery on our platform - you can use fenced, private member rates on your website to incentivize direct bookings. That keeps your public face perfectly aligned.",
    partnerResponse:
      "Okay, I see how that protects my ranking. But I'm still hesitant to have the same price everywhere if I'm trying to boost specific slow periods.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'vs-r2-narrow-step2-availability',
    label: 'Ask for equal availability alongside the rate ask',
    description:
      "Tell John he also needs to open the same room availability to Booking.com as his direct site. Narrow Parity covers the rate ask but NOT availability - this overreaches the regime's permission.",
    playerDialogue:
      "You won't lose your edge. If you align your public rates with us today, I will also need you to ensure you open up the exact same room availability on Booking.com that you feature on your direct site to balance it out.",
    partnerResponse:
      "Availability is mine to allocate. You don't get to ask for that in this market.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -10,
  },
  {
    id: 'vs-r2-narrow-step2-shut-direct',
    label: 'Tell him to stop running direct marketing entirely',
    description:
      "Suggest John should stop spending on direct website ads and let Booking.com handle 100% of distribution. Dictates his direct-channel strategy and oversteps the AM remit.",
    playerDialogue:
      "If you want to keep your edge, you should stop wasting money on direct website ads altogether. Since our global market share is significantly higher, you should just let us handle 100% of your distribution instead.",
    partnerResponse:
      "Telling me to shut down my own marketing is well outside what I called you about. We're done.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step2Member: BranchingStep = {
  id: 'member-rates',
  label: 'Position fenced member rates',
  partnerPrompt:
    "If I match the rates, I lose my direct booking edge.",
  options: step2Options,
};

// ───────── Step 3 - Close on a segment-targeted discount for slow periods ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'vs-r2-narrow-step3-correct',
    label: 'Offer targeted segment / period discounts, not a base drop',
    description:
      "Use the doc-prescribed close: rule out an across-the-board rate drop, propose period- or segment-specific discounts that capture incremental volume without touching the base ADR.",
    playerDialogue:
      "You don't have to lower your rates across the board. We can target specific periods or users to offer a discount only to underperforming traveler segments. You protect your base website ADR while capturing incremental volume you're currently missing.",
    partnerResponse:
      "That's a fair compromise. Let's shift the direct site to member-only discounts and test a targeted discount with you.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'vs-r2-narrow-step3-ranking-reward',
    label: 'Promise a top-tier ranking boost during slow periods',
    description:
      'Tell John he\'ll get an immediate top-tier ranking boost for the slow periods if he aligns rates today. Breaks the Narrow Parity ban on promising fixed ranking rewards for price alignment.',
    playerDialogue:
      "You don't have to change everything. If you match your website rates on our platform right now, our system will reward you by immediately boosting your organic ranking position into the top tier for those slow periods.",
    partnerResponse:
      "Promised ranking boosts aren't a commercial pitch I can take seriously. That's not how I make decisions.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'vs-r2-narrow-step3-slash',
    label: 'Tell him a low-margin booking beats an empty room',
    description:
      "Push him to slash base rates with a 'low margin beats zero revenue' argument. Forces an unsegmented base-rate cut and attacks the red-driver partner's margin focus head-on.",
    playerDialogue:
      "Well, if you refuse to offer a competitive price during your slow periods, your rooms are just going to stay empty anyway. A low-margin booking is always better than zero revenue, so let's just slash your base rates.",
    partnerResponse:
      "Slashing base rates to fill rooms isn't a strategy. I expected better from this call.",
    styleMatch: { red: -1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -12,
  },
];

const step3Close: BranchingStep = {
  id: 'close-targeted-discounts',
  label: 'Close on targeted segment discounts',
  partnerPrompt:
    "Okay, I see how that protects my ranking. But I'm still hesitant to have the same price everywhere if I'm trying to boost specific slow periods.",
  options: step3Options,
};

// ───────── Assembled tree ─────────

export const velvetSkyNarrowR2: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'velvet-sky-narrow',
  round: 2,
  issueTreePath: velvetSkyR2IssueTreePath,
  // SME-prescribed AM opener (Narrow Parity column). Set in stone -
  // John's Step 1 partnerPrompt is his response to this.
  openingAm:
    "Hi John! Why don't we go through the performance? I've noticed the property has great organic appeal, but your conversion here is decreasing because your public website pricing is cheaper than your Booking.com rate.",
  steps: [step1Open, step2Member, step3Close],
};
