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
 * and cannot ask him to change or raise his rates on the Key OTA; the
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
      "It's a major hit, obviously. But I'm facing a lot of noise. The Key OTA keeps pointing out price gaps, and then I see Booking.com undercutting me too. It feels like a race to the bottom.",
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
      "The numbers make it obvious - your pricing is simply wrong for this market, and that's the thing you need to fix. There's not much to diagnose here; the report has already told us where the problem is.",
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
      "Honestly, I really wouldn't read too much into a soft patch like this - these things tend to sort themselves out over the course of the quarter, and I'd hate for you to over-react to a couple of quiet weeks.",
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
      "It's understandable to feel that way. But we've identified that static B2B rates intended for wholesalers are leaking publicly on external channels. Could there be a discrepancy in how your base rate is set up on Booking.com compared to your other channels?",
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
      "You're right, and I'll be honest with you - we are part of that race to the bottom you're describing, and Booking.com is one of the channels undercutting you. It's a genuinely tough spot to be in, and I completely see why it feels like everyone is pulling your price down at once. I don't think it's fair on you either, and I understand why the whole thing is so frustrating right now.",
    partnerResponse:
      "So you agree you're undercutting me. That just confirms the problem, it doesn't solve it.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'll-r9-narrow-step2-blame',
    label: 'Tell him to go fight it out with the Key OTA',
    description:
      "Sends him off to battle the competitor instead of reframing the leak - it takes the price-war bait the SME warns against and abandons the diagnosis.",
    playerDialogue:
      "If the Key OTA is the one constantly poking at your price gaps, then honestly the simplest thing is to go straight at them - match whatever they're showing and undercut them back until they stop flagging it. Once you've beaten them on price and shut them up, the noise goes away and you can stop worrying about all these comparisons people keep throwing at you.",
    partnerResponse:
      "So your advice is to chase the Key OTA down on price? That's the race I'm trying to get out of.",
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
    "It's a major hit, obviously. But I'm facing a lot of noise. The Key OTA keeps pointing out price gaps, and then I see Booking.com undercutting me too. It feels like a race to the bottom.",
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
      "That's fair enough - if aligning your rate here genuinely risks your direct bookings, then let's just forget about the whole idea and leave things exactly as they are for now.",
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
      "Cannibalization is basically a myth - you're worrying yourself about a problem that doesn't really exist in practice. Trust me on this, I've seen the numbers plenty of times.",
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
      "It does - but only when you have visibility. If travelers find you less attractive on Booking.com, they won't even go looking for your direct site. Aligning your Booking.com rate with your own website keeps a consistent presence. Would you be open to testing a temporary alignment to see if it lifts your overall direct traffic?",
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
      "There's really no way around this one - you have to align your rate here, and you have to do it now, otherwise your ranking simply keeps falling and the situation gets harder to recover from. I know it's blunt, but this isn't something we can test our way into slowly; it needs to happen straight away if you want the position back.",
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
      "Aligning will definitely help your visibility here - it's genuinely the right thing to do, so my honest advice is to just go ahead and do it. You don't really need to overthink it or set up some elaborate measurement around it; it's a sound move and it'll work in your favour. Trust that it's the correct call and put it in place, and I'm confident you'll be glad you did.",
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
      "SME-prescribed handle: track total reservation volume and search impressions over a two-week trial so he sees the full picture. Clarify Partner Offer ensures travelers get the best price and isn't a punishment - and note you can't ask him to change or raise his rates on the Key OTA or other OTAs, only support his growth.",
    playerDialogue:
      "That makes sense. We can track your total reservation volume and search impressions over a two-week trial, so you see the whole picture, not just commission. And on Partner Offer - it's a tool we use to ensure travelers get a great price on Booking.com, it is not a punishment, and those rates are actually coming from your wholesale agreements.",
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
      "In a Narrow market you cannot ask him to change or raise his rates on the Key OTA or other OTAs. Telling him to lift his other-OTA pricing to close the gap is a compliance breach.",
    playerDialogue:
      "The cleanest fix here is honestly just to raise your rates on the Key OTA and on the other OTAs across the board, so there's simply no cheaper option sitting out there undercutting what you show on Booking.com. Once you've lifted those external rates and closed the gap yourself, the comparisons stop hurting you and the whole leak problem goes away on its own. Push your prices up on those channels and the noise you've been dealing with disappears.",
    partnerResponse:
      "You're telling me how to price on the Key OTA now? That's not yours to ask.",
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
      "You know, you're right that Partner Offer does feel like a punishment from where you're sitting - it drops a cheaper rate in front of travelers and makes it look like we're working against you. If that's genuinely the sticking point for you here, then I can go away and look into having it switched off or removed from your account entirely, so it stops getting in the way of the rest of what we're trying to do together. I'd rather clear that obstacle than have it sour the whole conversation.",
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
      "Alright, but I have to be honest - every week you sit on this is real money walking straight out the door, and I'd genuinely hate for you to look back and regret waiting.",
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
      "Just so you know going into next month - if this isn't sorted by then, you should fully expect your visibility to keep dropping away in the meantime, and that's on you.",
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
