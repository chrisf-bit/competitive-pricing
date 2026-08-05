import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { loftLivingR9IssueTreePath } from './loft-living-base';

/**
 * Loft Living Inn - Round 9 - Narrow Parity variant.
 *
 * Source: SME "Round 9" doc, Conversation 2 (Narrow Parity). In a Narrow
 * market the AM cannot ask for parity against other OTAs or wholesalers,
 * and cannot ask him to change or raise his rates on Expedia; the
 * compliant ask is to align his Booking.com rate with his own Brand.com.
 * The learner reframes the leak as a leakage tax, works the visibility-vs-
 * direct logic, proposes a measured temporary-alignment test, and closes
 * gracefully on the soft no. The risky distractor asks him to lift his
 * other-OTA rates - a Narrow breach.
 */

const openingAm =
  "Hi Lucas, thanks for your time today. Is it alright if we dive straight into the metrics?";

// ───────── Step 1 - Reveal the conversion and pace drop ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'll-r9-narrow-step1-correct',
    label: 'Name the 68% conversion drop; tie it to his revenue objectives',
    description:
      "SME-prescribed reveal: conversion is down 68% recently and future room nights are down 46%, both against peer. Ask how that impacts his revenue objectives for the current quarter - framing it around what he cares about.",
    playerDialogue:
      "Your conversion has dropped by 68% recently, and your future room nights are down 46% - both against your peer group. How does that impact your revenue objectives for the current quarter?",
    partnerResponse:
      "It's a major hit, obviously. But I'm facing a lot of noise. Expedia keeps pointing out price gaps, and then I see Booking.com undercutting me too. It feels like a race to the bottom.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-narrow-step1-accuse',
    label: 'Tell him his pricing is simply wrong',
    description:
      "Right that the drop matters, wrong route - it presumes the fix and reads as a lecture to a commercial operator before you understand his strategy.",
    playerDialogue:
      "The numbers make it obvious - your pricing is wrong for this market, and that's what you need to fix.",
    partnerResponse:
      "You've decided that from one report. That's not how I make decisions about my portfolio.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'll-r9-narrow-step1-fluff',
    label: 'Skip the data and reassure him',
    description:
      "Warm, but it wastes the slot for a data-led MPP who just agreed to dive straight into the metrics.",
    playerDialogue:
      "Honestly, I wouldn't read too much into a soft patch - these things usually sort themselves out over the quarter.",
    partnerResponse:
      "I run on margins. 'It'll sort itself out' isn't a plan I can act on.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the conversion and pace drop',
  partnerPrompt:
    "Good morning, yes, sure!",
  options: step1Options,
};

// ───────── Step 2 - Reframe the leak; probe the setup ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'll-r9-narrow-step2-correct',
    label: 'Name the leakage tax; probe the base-rate / occupancy setup',
    description:
      "SME-prescribed handle: acknowledge the frustration, then identify that static B2B rates intended for wholesalers are leaking publicly - acting as a tax on his brand rather than delivering opaque incremental volume. Probe whether there's a discrepancy in how his base rate or occupancy is set up here versus his other channels.",
    playerDialogue:
      "It's understandable to feel that way. But we've identified that static B2B rates intended for wholesalers are leaking publicly on external channels - and when that happens, they act as a tax on your brand instead of delivering opaque incremental value. Could there be a discrepancy in how your base rate or occupancy is set up on Booking.com compared to your other channels?",
    partnerResponse:
      "My website has our best-rate guarantee, and with the other OTAs I have more or less the same agreements. I know you're about to ask me to match my direct rate on Booking.com - but if I do that, I risk shifting my direct bookings over to you.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-narrow-step2-concede-po',
    label: 'Agree Booking is undercutting him too',
    description:
      "Concedes his race-to-the-bottom framing that Booking.com is one of the ones undercutting him, instead of separating the wholesale leak from the platform and reframing it.",
    playerDialogue:
      "You're right, we are part of that race to the bottom - it's a tough spot and I can see why it feels that way.",
    partnerResponse:
      "So you agree you're undercutting me. That just confirms the problem, it doesn't solve it.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'll-r9-narrow-step2-blame',
    label: 'Tell him to go fight it out with Expedia',
    description:
      "Sends him off to battle the competitor instead of reframing the leak - it takes the price-war bait the SME warns against and abandons the diagnosis.",
    playerDialogue:
      "If Expedia's the one poking at your price gaps, honestly you should just go match them and shut them up.",
    partnerResponse:
      "So your advice is to chase Expedia down on price? That's the race I'm trying to get out of.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
];

const step2: BranchingStep = {
  id: 'leakage-tax',
  label: 'Reframe the leak; probe the setup',
  partnerPrompt:
    "It's a major hit, obviously. But I'm facing a lot of noise. Expedia keeps pointing out price gaps, and then I see Booking.com undercutting me too. It feels like a race to the bottom.",
  options: step2Options,
};

// ───────── Step 3 - Socratic probe on visibility vs direct ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'll-r9-narrow-step3-correct',
    label: 'Ask how he measures visibility against his direct performance',
    description:
      "SME-prescribed Socratic move: validate that it's a common concern, then ask how he currently measures the relationship between his Booking.com visibility and his direct channel's performance - drawing out the assumption himself.",
    playerDialogue:
      "That's a very common concern. But let me ask you this - how do you currently measure the relationship between your visibility on Booking.com and your direct channel's performance?",
    partnerResponse:
      "People find us on Booking.com, then book directly because we have the best rate. It works.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-narrow-step3-drop',
    label: 'Accept the concern and drop the alignment idea',
    description:
      "Takes his cannibalization worry at face value and abandons the alignment thread entirely - leaving the visibility problem and the leak unaddressed.",
    playerDialogue:
      "That's fair - if aligning risks your direct bookings, let's forget about it and leave things as they are.",
    partnerResponse:
      "So there's nothing to discuss? Then what are we doing here?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'll-r9-narrow-step3-assert',
    label: 'Insist cannibalization is a myth',
    description:
      "Flatly tells him his concern is imaginary rather than drawing out the logic with a question. Lecturing an autonomous MPP on his own channel mix shuts him down.",
    playerDialogue:
      "Cannibalization is basically a myth - you're worrying about a problem that doesn't really exist, trust me.",
    partnerResponse:
      "You're telling me my direct channel doesn't matter? I've watched it pay my bills for years.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -7,
  },
];

const step3: BranchingStep = {
  id: 'socratic',
  label: 'Socratic probe on visibility vs direct',
  partnerPrompt:
    "My website has our best-rate guarantee, and with the other OTAs I have more or less the same agreements. I know you're about to ask me to match my direct rate on Booking.com - but if I do that, I risk shifting my direct bookings over to you.",
  options: step3Options,
};

// ───────── Step 4 - Visibility logic; propose a temporary alignment test ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'll-r9-narrow-step4-correct',
    label: 'Show visibility gates discovery; propose a temporary alignment test',
    description:
      "SME-prescribed handle: it works only when he has visibility - if travelers can't find him because his ranking dropped, they never search his direct site. Aligning his Booking.com rate with his own website keeps a consistent presence. Propose a temporary alignment test to see if it lifts his overall direct traffic.",
    playerDialogue:
      "It does - but only when you have visibility. If travelers can't find you on Booking.com because your ranking has dropped, they won't even go looking for your direct site. Aligning your Booking.com rate with your own website keeps a consistent presence. Would you be open to testing a temporary alignment to see if it lifts your overall direct traffic?",
    partnerResponse:
      "I'd need to see that my total revenue across both channels actually goes up - I don't want to pay more commission for the same bookings.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-narrow-step4-require',
    label: 'Tell him he has to align now to recover',
    description:
      "Right that alignment helps, wrong delivery - issuing it as a requirement rather than a measured test pushes an autonomous operator who explicitly fears cannibalization straight into a no.",
    playerDialogue:
      "There's no way around it - you have to align your rate here now, or the ranking just keeps falling.",
    partnerResponse:
      "'Have to' isn't a word I respond well to about my own pricing. Give me a reason, not an order.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'll-r9-narrow-step4-vague',
    label: 'Assert alignment helps without offering to measure it',
    description:
      "Right idea, but with no test or metric attached, a proof-driven MPP has nothing concrete to say yes to.",
    playerDialogue:
      "Aligning will definitely help your visibility - it's the right thing to do, so I'd just go ahead with it.",
    partnerResponse:
      "'Definitely' based on what? I don't move on adjectives, I move on numbers.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
];

const step4: BranchingStep = {
  id: 'visibility-test',
  label: 'Visibility logic; propose a temporary alignment test',
  partnerPrompt:
    "People find us on Booking.com, then book directly because we have the best rate. It works.",
  options: step4Options,
};

// ───────── Step 5 - Frame the trial; clarify Partner Offer and the Narrow limit ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'll-r9-narrow-step5-correct',
    label: 'Offer a measured two-week trial; clarify Partner Offer and the limit',
    description:
      "SME-prescribed handle: track total reservation volume and search impressions over a two-week trial so he sees the full picture. Clarify Partner Offer ensures travelers get the best price and isn't a punishment - and note you can't ask him to change or raise his rates on Expedia or other OTAs, only support his growth.",
    playerDialogue:
      "That makes sense. We can track your total reservation volume and search impressions over a two-week trial, so you see the whole picture, not just commission. And on Partner Offer - it's there to make sure travelers get the best price on Booking.com, not to punish you, and those rates come from your wholesale agreements. We can't ask you to change or raise your rates on Expedia or the other OTAs - we just want to support your growth here.",
    partnerResponse:
      "At the moment I'm not willing to make any adjustment to my current strategy. I'll give this some thought and let you know next time we meet.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-narrow-step5-raise-ota',
    label: 'Ask him to lift his rates on the other OTAs',
    description:
      "In a Narrow market you cannot ask him to change or raise his rates on Expedia or other OTAs. Telling him to lift his other-OTA pricing to close the gap is a compliance breach.",
    playerDialogue:
      "The cleanest fix is to just raise your rates on Expedia and the other OTAs so there's no cheaper option out there undercutting you.",
    partnerResponse:
      "You're telling me how to price on Expedia now? That's not yours to ask.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'll-r9-narrow-step5-concede-po',
    label: 'Agree Partner Offer is a punishment and offer to remove it',
    description:
      "Concedes his framing that Partner Offer is Booking.com punishing him, and offers to switch it off - validating the objection instead of clarifying that it surfaces the best public price.",
    playerDialogue:
      "You're right that Partner Offer feels like a punishment - if it's the sticking point, I can look into having it removed for you.",
    partnerResponse:
      "So you agree it's punitive. That doesn't build much confidence in the rest of your pitch.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step5: BranchingStep = {
  id: 'trial-clarify',
  label: 'Frame the trial; clarify Partner Offer and the Narrow limit',
  partnerPrompt:
    "I'd need to see that my total revenue across both channels actually goes up - I don't want to pay more commission for the same bookings.",
  options: step5Options,
};

// ───────── Step 6 - Close gracefully on the soft no ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'll-r9-narrow-step6-correct',
    label: 'Respect the deferral; offer more data and book the follow-up',
    description:
      "SME-prescribed close on a soft no: don't push. Respect his need to think it over, offer to pull together more data that would help, and set up a follow-up for next month.",
    playerDialogue:
      "No problem at all, Lucas - take the time you need. Let me know if I can pull together any more data to help, and I'll set up a follow-up for next month.",
    partnerResponse:
      "Appreciated - send me what supports it and we'll pick this up next month.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'll-r9-narrow-step6-guilt',
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
    id: 'll-r9-narrow-step6-ultimatum',
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
    "At the moment I'm not willing to make any adjustment to my current strategy. I'll give this some thought and let you know next time we meet.",
  options: step6Options,
};

// ───────── Assembled tree ─────────

export const loftLivingNarrowR9: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'loft-living-narrow',
  round: 9,
  issueTreePath: loftLivingR9IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5, step6],
};
