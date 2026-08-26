import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import {
  silverHorizonR2IssueTreePath,
  silverHorizonOpeningAm,
} from './silver-horizon-base';

/**
 * Silver Horizon Resort - Round 2 - Wide Parity variant.
 *
 * Source: SME "Round 2" doc, Conversation 1 (Wide Parity). In a Wide
 * market the AM may explicitly ask Chloe for the same rates, conditions
 * and availability she provides the Key OTA, and may name the
 * third party - but may NOT instruct her to stop working with them, and
 * may NOT threaten ranking/visibility as a penalty. The learner must
 * refuse the price war (Same Net), pivot to unsold rooms and the
 * family/international upside, then land a fenced solution (MLOS +
 * international targeting).
 */

// ───────── Step 1 - Probe the YoY drop ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'sh-r2-wide-step1-correct',
    label: 'Name the YoY drop against strong forward volume, probe the cause',
    description:
      "SME-prescribed probe: contrast the strong forward volume with the 32% YoY room-night drop and ask an open question about cancellations or a shifting distribution mix before recommending anything.",
    playerDialogue:
      "I've been reviewing your portfolio. Forward volume for the next three months is strong, but room nights in the last 30 days are down 32% year-on-year. Have you seen more cancellations from our platform, or a shift in your distribution mix?",
    partnerResponse:
      "Yes, I've seen the drop, and other OTAs have gained share this month. The Key OTA keeps calling to point out that you're more expensive. I checked - it's because they're cutting their own margin. I give everyone the same rate. If they want to cut margin to lower the final price, that's on them. Why don't you do the same?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-wide-step1-jump-cheapest',
    label: 'Jump to being the cheapest',
    description:
      "Skip the diagnosis and prescribe: tell her to drop her Booking.com price to be the cheapest option. Presumes the fix and invites the exact race-to-the-bottom an ROI-driven professional refuses.",
    playerDialogue:
      "Your last-30-day room nights are down 32%. The quickest fix is to bring your Booking.com price down so you're the cheapest option on the page - shall we set that up?",
    partnerResponse:
      "Dropping my price to be the cheapest is exactly the race to the bottom I avoid. Do better.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'sh-r2-wide-step1-hand-wave',
    label: 'Wave the drop away as seasonal',
    description:
      'Open by dismissing the drop as market softness. A numbers-first partner reads that as sloppy and disengages.',
    playerDialogue:
      "We've noticed a small dip, but honestly it's probably just seasonal softness in the market - nothing to worry about.",
    partnerResponse:
      "If you're going to tell me it's 'just seasonal,' this call is a waste of my time.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

const step1: BranchingStep = {
  id: 'probe',
  label: 'Probe the year-on-year drop',
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options,
};

// ───────── Step 2 - Handle Competitive Aggression / Same Net ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'sh-r2-wide-step2-correct',
    label: 'Refuse the price war; reframe to brand value and unsold demand',
    description:
      "SME-prescribed handling: acknowledge the frustration but don't match a margin cut. Reframe inconsistent pricing as brand/trust erosion she can control, and steer to the high-value demand she's not capturing.",
    playerDialogue:
      "I understand that's frustrating. But rate inconsistencies across platforms devalue your brand, confuse customers and weaken trust. You can't control a third party's margin cut, but you can keep your own base rates and promotions aligned and competitive here. Let's focus on the high-value demand where you currently lack visibility.",
    partnerResponse:
      "Visibility is fine on our end. If a customer is confused, they book elsewhere. How does that affect my margin today?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-wide-step2-burn-margin',
    label: 'Offer to fund a discount to match the Key OTA',
    description:
      "Capitulate to the 'burn margin too' ask and fund a matching discount. It engages the price war the SME guidance says to avoid, and it rewards her Same Net logic instead of reframing it.",
    playerDialogue:
      "You're right - let me see if we can fund a discount on our side to match the Key OTA's public price for you.",
    partnerResponse:
      "So now you'll burn your own margin? That doesn't fix my problem - it just proves my point.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'sh-r2-wide-step2-drop-keyota',
    label: 'Tell her to drop the Key OTA',
    description:
      'Name the Key OTA as the problem and tell her to stop giving them rates and go exclusive with Booking.com. In a Wide market you may name the third party but you cannot instruct the partner to stop working with them.',
    playerDialogue:
      "Honestly, the Key OTA is the problem here. You should stop giving them rates and just work with us exclusively - that ends the whole issue.",
    partnerResponse:
      "You don't get to tell me who I distribute with. Stay in your lane.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step2: BranchingStep = {
  id: 'same-net',
  label: 'Handle the Competitive Aggression / Same Net objection',
  partnerPrompt:
    "Yes, I've seen the drop, and other OTAs have gained share this month. The Key OTA keeps calling to point out that you're more expensive. I checked - it's because they're cutting their own margin. I give everyone the same rate. If they want to cut margin to lower the final price, that's on them. Why don't you do the same?",
  options: step2Options,
};

// ───────── Step 3 - The Key OTA ask + pivot to segments ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'sh-r2-wide-step3-correct',
    label: 'Ask for the same rates/conditions as the Key OTA, pivot to family + international',
    description:
      "SME-prescribed ask: explain the lost-checkout dynamic, ask her to provide the same rates and conditions she gives other third-party channels, then pivot to how she's capturing the family and international segments behind the volume drop.",
    playerDialogue:
      "When we show a higher price, travelers buy from a cheaper competitor on our search page instead of booking with you. To maximize traffic, we'd ask you to provide the same rates and conditions you already give other third-party channels. And how are you capturing the family and international segments that are driving the drop?",
    partnerResponse:
      "Families are a headache for vacation rentals. We restrict our double rooms from family searches and don't offer free cots - we prefer to sell those larger units directly, where we control the guest risk. For international bookers we're not running any specific campaigns.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-wide-step3-just-match',
    label: 'Just ask her to match the Key OTA and stop there',
    description:
      "Compliant ask (same conditions as the Key OTA) but it stops at protecting the status quo - it never opens the family/international growth that actually answers her 'what's in it for my margin' question.",
    playerDialogue:
      "The simplest move is to give us the same conditions you give the Key OTA - match that here and we're done.",
    partnerResponse:
      "Matching the Key OTA just protects the status quo. Where's the upside for my margin?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'sh-r2-wide-step3-starve-channel',
    label: 'Demand she beat the Key OTA and starve their inventory',
    description:
      "Tell her to price below the Key OTA and pull her best inventory from them. Instructing a partner to withhold from or stop feeding another channel oversteps even in a Wide market.",
    playerDialogue:
      "You need to give us a better rate than the Key OTA and stop feeding them your best inventory - that's the only way to fix this.",
    partnerResponse:
      "Telling me to starve another channel is not your call. We're done.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step3: BranchingStep = {
  id: 'segment-pivot',
  label: 'Ask for Key OTA alignment and pivot to segments',
  partnerPrompt:
    "Visibility is fine on our end. If a customer is confused, they book elsewhere. How does that affect my margin today?",
  options: step3Options,
};

// ───────── Step 4 - Family Ready value pitch ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'sh-r2-wide-step4-correct',
    label: 'Pitch the family segment as a growth opportunity',
    description:
      "SME-prescribed Family Ready pitch: name the missed opportunity and quantify it - family bookings grew ~2x faster, spend more, stay longer, and review 24% more often.",
    playerDialogue:
      "That may be a missed opportunity. Over the past two years, family bookings on our platform grew nearly twice as fast as any other segment. They spend more, stay longer, and are 24% more likely to leave a review - it's a strong lever for occupancy and ADR.",
    partnerResponse:
      "Well - if we can guarantee a minimum three-night stay for those family bookings, I might consider it.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-wide-step4-ignore-risk',
    label: 'Push families without addressing her operational risk',
    description:
      "Right segment, wrong handling - it tells her to open the rooms and add cots while ignoring the operational-risk concern she just raised, so it earns a no.",
    playerDialogue:
      "Just open your double rooms to family searches and offer free cots - it'll fill those units and lift your numbers.",
    partnerResponse:
      "You just ignored everything I said about operational risk. No.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'sh-r2-wide-step4-lecture',
    label: 'Lecture her that restricting families is bad business',
    description:
      "Tell her her segmentation is simply wrong. Condescending to an owner who knows her own operation - the opposite of the ROI framing that would land.",
    playerDialogue:
      "Restricting families is honestly bad business - you're leaving money on the table and hurting your own reviews.",
    partnerResponse:
      "I don't need a lecture on how to run my own business. This is over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step4: BranchingStep = {
  id: 'family-value',
  label: 'Turn the family pushback into an opportunity',
  partnerPrompt:
    "Families are a headache for vacation rentals. We restrict our double rooms from family searches and don't offer free cots - we prefer to sell those larger units directly, where we control the guest risk. For international bookers we're not running any specific campaigns.",
  options: step4Options,
};

// ───────── Step 5 - Land the fenced solution + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'sh-r2-wide-step5-correct',
    label: 'Set the MLOS, add international targeting, agree to measure',
    description:
      "SME-prescribed close: accept the minimum-stay guardrail she asked for, combine it with international-booker targeting for net-revenue upside, and commit to monitoring and sharing the impact.",
    playerDialogue:
      "We can easily set a minimum length of stay on family rooms to protect your margins. Combine that with targeting international bookers, and you grow net revenue through high-value guests. If you're happy, I'll monitor the impact and share the results in two weeks.",
    partnerResponse:
      "Okay, that's a fair compromise. Set up the three-night minimum for families and the targeted international rates, and I'll align my rates to what's showing on the Key OTA. Let's see if the revenue actually moves.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'sh-r2-wide-step5-half-close',
    label: 'Set the minimum stay and leave it there',
    description:
      "Takes the guardrail but drops the international lever and never agrees a measure or follow-up - a soft close a data-led partner will let evaporate.",
    playerDialogue:
      "Great, I'll set up the three-night minimum on family rooms and we'll see how it goes.",
    partnerResponse:
      "Just the minimum stay? What about the international demand you mentioned - and how are we measuring this?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'sh-r2-wide-step5-overreach',
    label: 'Push a blanket discount on top',
    description:
      "Overreach past the fenced deal she agreed to - a general public discount to 'match the Key OTA everywhere.' Straight back into the price war and the ADR erosion she protects.",
    playerDialogue:
      "Perfect - and let's also bring your public rates down across the board to match the Key OTA everywhere and really move volume.",
    partnerResponse:
      "Across-the-board discounting is the opposite of what I just agreed to. Stick to the plan.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Land the fenced solution and close',
  partnerPrompt:
    "Well - if we can guarantee a minimum three-night stay for those family bookings, I might consider it.",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const silverHorizonWideR2: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'silver-horizon-wide',
  round: 2,
  issueTreePath: silverHorizonR2IssueTreePath,
  openingAm: silverHorizonOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
