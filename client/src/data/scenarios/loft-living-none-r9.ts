import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { loftLivingR9IssueTreePath } from './loft-living-base';

/**
 * Loft Living Inn - Round 9 - No Parity variant.
 *
 * Source: SME "Round 9" doc, Conversation 3 (No Parity). The AM cannot
 * ask for parity or matching and cannot require a lower price; the
 * compliant ask is for his best available price, with his autonomy
 * preserved, and any discrepancy is raised reactively and neutrally. The
 * learner reframes the leak, keeps his pricing autonomy explicit, and
 * pivots to a fenced mobile-rate fix that targets segments not
 * overlapping his direct audience, then closes gracefully on the soft no.
 * Violations are taught via required matching / cheapest and ranking
 * threats, never parity language.
 */

const openingAm =
  "Hi Lucas, great to connect. Is it ok if we dive straight into the metrics?";

// ───────── Step 1 - Reveal the volume gap and probe the plan ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'll-r9-none-step1-correct',
    label: 'Name the 68% conversion drop; ask how he plans to address it',
    description:
      "SME-prescribed reveal: conversion is down 68%, so future room nights are falling behind by 46% versus peer. Given his focus on maximizing revenue across channels, ask how he's planning to address the volume gap.",
    playerDialogue:
      "I wanted to focus on your recent performance. We've seen a 68% drop in conversion, which means your future room nights are falling behind by 46% - both against your peer group. Given your focus on maximizing revenue across channels, how are you planning to address this volume gap?",
    partnerResponse:
      "We've raised our base rates to increase revenue per room. But yes, the empty rooms are starting to hurt. I just don't like how Booking.com uses Partner Offers to discount my rooms without my explicit consent - it feels like I'm losing control.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-none-step1-accuse',
    label: 'Tell him his rates are simply too high',
    description:
      "Right that the gap matters, wrong route - it presumes the fix and reads as a price lecture to an autonomous operator before you understand his strategy.",
    playerDialogue:
      "The issue is plain - you've priced yourself out of the market, so the rates have to come down.",
    partnerResponse:
      "You've decided that in thirty seconds. That's not how I run my portfolio.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'll-r9-none-step1-fluff',
    label: 'Skip the data and reassure him',
    description:
      "Warm, but it wastes the slot for a data-led MPP who just agreed to dive straight into the metrics.",
    playerDialogue:
      "Honestly, I wouldn't overthink one slow stretch - it tends to even out across a quarter.",
    partnerResponse:
      "I run on margins. 'It'll even out' isn't a plan I can use.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the volume gap and probe the plan',
  partnerPrompt:
    "Good morning, yes, sure!",
  options: step1Options,
};

// ───────── Step 2 - Explain the leak; keep his autonomy explicit ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'll-r9-none-step2-correct',
    label: 'Explain the B2B leak; affirm his pricing autonomy',
    description:
      "SME-prescribed handle: look at why those Partner Offers appear - some of his B2B rates are escaping into public B2C search, so travelers buy his rooms at wholesale prices. He has complete freedom over his pricing, but addressing the leak internally will help his performance.",
    playerDialogue:
      "I hear you - but let's look at why those Partner Offers appear. Some of your B2B rates are escaping into public B2C search results, so travelers end up buying your rooms at wholesale prices. You have complete freedom over your pricing, but addressing that leak internally will really help your performance here.",
    partnerResponse:
      "Every wholesaler points fingers at the other. And in the meantime, I can't just lower my prices on Booking.com to chase volume.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-none-step2-concede-po',
    label: 'Agree Booking discounts him without consent',
    description:
      "Concedes his framing that Partner Offer is Booking.com discounting his rooms without permission, instead of explaining that it surfaces a leaked wholesale rate he can address at source.",
    playerDialogue:
      "You're right, we are discounting your rooms through Partner Offer without asking you first - I understand why that feels like lost control.",
    partnerResponse:
      "So you admit you're doing it to me. That's exactly my problem.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'll-r9-none-step2-blame',
    label: 'Tell him the leak is his problem to solve alone',
    description:
      "Right that the source is his B2B setup, wrong tone - dumping it on him abandons the acknowledgment and turns a commercial ally into an adversary.",
    playerDialogue:
      "That's a supplier problem you created, so honestly it's on you to go sort it out with them.",
    partnerResponse:
      "I called to look at performance, not to be told it's all my fault. Careful.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -8,
  },
];

const step2: BranchingStep = {
  id: 'leak-autonomy',
  label: 'Explain the leak; keep his autonomy explicit',
  partnerPrompt:
    "We've raised our base rates to increase revenue per room. But yes, the empty rooms are starting to hurt. I just don't like how Booking.com uses Partner Offers to discount my rooms without my explicit consent - it feels like I'm losing control.",
  options: step2Options,
};

// ───────── Step 3 - Unsold rooms; best price without a blanket cut ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'll-r9-none-step3-correct',
    label: 'Frame unsold rooms as unrecoverable; offer best price as the lever',
    description:
      "SME-prescribed handle: it isn't about lowering prices across the board, but an unsold room is revenue he can never recover. With conversion this slow he's leaving money on the table. While his pricing is entirely his choice, offering his best competitive price is the most direct lever to recover visibility.",
    playerDialogue:
      "It's not about lowering your prices across the board - but an unsold room is revenue you can never recover. With conversion this slow, you're leaving real money on the table. Your pricing is entirely your choice, but offering your best competitive price is the most direct lever to recover that visibility.",
    partnerResponse:
      "If I offer a better price on Booking.com, my direct bookers might migrate over. That's a net loss for my margin.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-none-step3-require-cheapest',
    label: 'Tell him he must be the cheapest to recover',
    description:
      "In a No Parity market you cannot require a lower price or matching. Telling him he has to be the cheapest on Booking.com pressures a rate reduction and is a compliance breach.",
    playerDialogue:
      "Realistically, to turn this around you'll need to make Booking.com the cheapest place to book you - that's what recovers the volume.",
    partnerResponse:
      "So the ask is that I have to be the cheapest? I didn't think that was something you could require.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'll-r9-none-step3-concede',
    label: 'Accept that there is nothing he can safely do',
    description:
      "Takes his margin worry as the end of the conversation and offers no lever - leaving the unsold rooms and the leak unaddressed.",
    playerDialogue:
      "That's fair - if a better price risks your direct margin, then there's probably not much we can do here.",
    partnerResponse:
      "So we're stuck? That's a disappointing place to land.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step3: BranchingStep = {
  id: 'unsold-bestprice',
  label: 'Unsold rooms; best price without a blanket cut',
  partnerPrompt:
    "Every wholesaler points fingers at the other. And in the meantime, I can't just lower my prices on Booking.com to chase volume.",
  options: step3Options,
};

// ───────── Step 4 - Target a fenced segment; propose the mobile test ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'll-r9-none-step4-correct',
    label: 'Target non-overlapping segments; propose optimizing the mobile rate',
    description:
      "SME-prescribed handle: avoid direct-channel cannibalization by targeting segments that don't overlap with his direct audience. His mobile competitiveness is very low, so he's missing that segment. Propose optimizing his mobile-rate setup as a targeted test.",
    playerDialogue:
      "We can avoid that by targeting specific segments that don't overlap with your direct audience. Your mobile competitiveness is very low right now, so you're missing that segment entirely. What if we optimize your mobile-rate setup to make it competitive? How would you feel about running a targeted test like that?",
    partnerResponse:
      "I already have the mobile rate active. Are you asking me to increase the discount, or what?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-none-step4-blanket',
    label: 'Suggest a blanket price drop instead',
    description:
      "Abandons the fenced, segment-targeted approach for an across-the-board cut - the very cannibalization he just flagged, and the price war the SME warns against.",
    playerDialogue:
      "The simplest thing is to just drop your prices across the board here for a while and let the volume come back.",
    partnerResponse:
      "That's the blanket cut I said I won't do - it feeds my direct bookers to you and torches my margin.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
  {
    id: 'll-r9-none-step4-dismiss',
    label: 'Dismiss his cannibalization worry outright',
    description:
      "Waves away a real commercial concern rather than engineering around it with a fenced segment. Lecturing an autonomous MPP on his own channel mix shuts him down.",
    playerDialogue:
      "Honestly, that migration worry is in your head - it just doesn't happen the way you think, so don't let it stop you.",
    partnerResponse:
      "You're telling me my own numbers are imaginary? That's not going to land.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -7,
  },
];

const step4: BranchingStep = {
  id: 'fenced-mobile',
  label: 'Target a fenced segment; propose the mobile test',
  partnerPrompt:
    "If I offer a better price on Booking.com, my direct bookers might migrate over. That's a net loss for my margin.",
  options: step4Options,
};

// ───────── Step 5 - Fix the mobile setup; clarify Partner Offer ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'll-r9-none-step5-correct',
    label: 'Explain the misconfigured mobile setup; clarify Partner Offer',
    description:
      "SME-prescribed handle: not necessarily a bigger discount - a 10% mobile discount triggers mobile search badges and improves ranking, but he's excluded all weekends and longer booking windows, so it isn't moving revenue; and because his base rates rose, the setup is no longer competitive. Clarify Partner Offer is a consumer-focused tool, not a punishment, and offering his best competitive price minimizes the leak's impact.",
    playerDialogue:
      "Not necessarily a bigger discount. A 10% mobile discount triggers our mobile search badges and improves your ranking - but you've excluded all weekends and longer booking windows, so it isn't moving revenue the way it should. And because your base rates went up, your current mobile setup is no longer competitive. On Partner Offer - it's a consumer-focused tool to help travelers get the best price, not a punishment. While you fully control your pricing, offering your best competitive price minimizes the impact of those unauthorized leaks.",
    partnerResponse:
      "At the moment I'm not willing to share any more data or adjust my strategy. Thanks for all these inputs - I'll give this some thought and let you know next time we meet.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-none-step5-crank',
    label: 'Tell him to crank the mobile discount and cut his base rate',
    description:
      "Answers a configuration problem with a blanket discount-and-cut, which pressures a lower price and misses the actual fix - the excluded weekends and long windows on an otherwise-live mobile rate.",
    playerDialogue:
      "Just push that mobile discount way up and take your base rate down while you're at it - that'll force the competitiveness back.",
    partnerResponse:
      "So the answer is discount harder and cut my base? That's the opposite of protecting my margin.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -9,
  },
  {
    id: 'll-r9-none-step5-concede-po',
    label: 'Agree Partner Offer is a punishment and offer to remove it',
    description:
      "Concedes his framing that Partner Offer is punitive and offers to switch it off - validating the objection instead of clarifying that it surfaces the best public price.",
    playerDialogue:
      "You're right that Partner Offer feels like a punishment - if it's the blocker, I can look into having it removed for you.",
    partnerResponse:
      "So you agree it's punitive. That doesn't build my confidence in the rest of this.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step5: BranchingStep = {
  id: 'mobile-fix',
  label: 'Fix the mobile setup; clarify Partner Offer',
  partnerPrompt:
    "I already have the mobile rate active. Are you asking me to increase the discount, or what?",
  options: step5Options,
};

// ───────── Step 6 - Close gracefully on the soft no ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'll-r9-none-step6-correct',
    label: 'Respect the deferral; offer support and book the follow-up',
    description:
      "SME-prescribed close on a soft no: don't push. Respect his need to think it over, offer to support him further, and set up a follow-up for next month.",
    playerDialogue:
      "No problem at all, Lucas - take the time you need. Let me know if I can support you further or pull any more data together, and I'll set up a follow-up for next month.",
    partnerResponse:
      "Appreciated - send me what supports it and we'll pick this up next month.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'll-r9-none-step6-guilt',
    label: 'Warn him about the revenue he loses by waiting',
    description:
      "Turns his reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue:
      "Alright, but every week you wait is real money walking out the door - I'd hate for you to look back on that.",
    partnerResponse:
      "I told you I'd think it over. Pushing me now just makes me less inclined.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'll-r9-none-step6-ultimatum',
    label: 'Give him a deadline or lose more visibility',
    description:
      "Attaches a visibility ultimatum to his timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue:
      "Just so you know - if this isn't sorted by next month, expect your visibility to keep dropping in the meantime.",
    partnerResponse:
      "So it's act now or get buried? That's not the partnership I thought this was.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step6: BranchingStep = {
  id: 'close',
  label: 'Close gracefully on the soft no',
  partnerPrompt:
    "At the moment I'm not willing to share any more data or adjust my strategy. Thanks for all these inputs - I'll give this some thought and let you know next time we meet.",
  options: step6Options,
};

// ───────── Assembled tree ─────────

export const loftLivingNoneR9: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'loft-living-none',
  round: 9,
  issueTreePath: loftLivingR9IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5, step6],
};
