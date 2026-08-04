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
 * Silver Horizon Resort - Round 2 - Narrow Parity variant.
 *
 * Source: SME "Round 2" doc, Conversation 2 (Narrow Parity). In a
 * Narrow market the AM may NOT ask Chloe to price against other OTAs
 * (Expedia); the only compliant alignment ask is with her Brand.com /
 * direct website. Family availability is framed as a billboard that
 * feeds her direct channel; international demand is captured via
 * Country Rates. The risky distractors break the other-OTA ban.
 */

// ───────── Step 1 - Probe the YoY drop ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'sh-r2-narrow-step1-correct',
    label: 'Name the YoY drop and probe the revenue impact',
    description:
      "SME-prescribed probe: contrast strong forward volume with the 32% YoY room-night drop and ask her to reflect on the cause and its impact on her quarterly revenue goals.",
    playerDialogue:
      "I've been reviewing your portfolio. Forward volume for the next three months is strong, but room nights in the last 30 days are down 32% year-on-year. Have you thought about what's behind it, and how that trend hits your revenue goals for the quarter?",
    partnerResponse:
      "Honestly, I'm focused on our direct channel right now. Expedia is just cutting margins to look more competitive, but I give everyone the same rates. If Booking is more expensive, that's because you won't lower your commission.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-narrow-step1-jump-cheapest',
    label: 'Jump to being the cheapest',
    description:
      "Skip the diagnosis and prescribe a public price cut to be the cheapest option. Presumes the fix and invites the race to the bottom an ROI-driven professional avoids.",
    playerDialogue:
      "Your room nights are down 32% - the quickest fix is to bring your Booking.com price down so you're the cheapest option on the page.",
    partnerResponse:
      "I'm focused on my direct channel, not a race to the bottom on your platform. Do better.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'sh-r2-narrow-step1-hand-wave',
    label: 'Wave the drop away as seasonal',
    description:
      'Open by dismissing the drop as market softness. A numbers-first partner reads that as sloppy and disengages.',
    playerDialogue:
      "We've noticed a small dip, but honestly it's probably just seasonal softness - nothing to worry about.",
    partnerResponse:
      "'Seasonal'? If that's your analysis, this call is a waste of my time.",
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

// ───────── Step 2 - Handle Same Net; align with Brand.com ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'sh-r2-narrow-step2-correct',
    label: 'Refuse the price war; align Booking.com with her direct site',
    description:
      "SME-prescribed handling: acknowledge she wants to avoid OTA price wars, note that cheaper prices elsewhere devalue the rate she protects, and steer the only compliant ask in a Narrow market - aligning Booking.com with her own direct website.",
    playerDialogue:
      "I understand you want to avoid OTA price wars, Chloe. But cheaper prices elsewhere devalue the rate you're protecting. What stays critical is keeping Booking.com aligned with your own direct website. How do you see that price inconsistency affecting your direct bookings?",
    partnerResponse:
      "Well, if they see it cheaper elsewhere, they buy elsewhere. But our website is the priority, especially for specific segments. I want families to book directly, which is why we don't have family rooms available on Booking.com.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-narrow-step2-fund-promo',
    label: 'Offer to fund a promo to close the gap',
    description:
      "Capitulate to the margin-cut logic and fund a discount. It rewards the Same Net framing instead of reframing it, and edges into the price war the guidance says to avoid.",
    playerDialogue:
      "You've got a point - let me see if we can fund a promotion on our side to close the price gap for you.",
    partnerResponse:
      "Funding a promo to match a margin cut just proves my point. That's not a strategy.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'sh-r2-narrow-step2-beat-expedia',
    label: 'Ask her to price below Expedia here',
    description:
      "Ask her to make sure Booking.com isn't higher than Expedia. In a Narrow market you cannot ask a partner to price against other OTAs - only to align with their Brand.com.",
    playerDialogue:
      "The fix is simple: make sure your price here isn't higher than Expedia's - match them on our platform and the gap closes.",
    partnerResponse:
      "You can't ask me to price against Expedia here. That's not how this market works.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step2: BranchingStep = {
  id: 'same-net',
  label: 'Handle Same Net; align with Brand.com',
  partnerPrompt:
    "Honestly, I'm focused on our direct channel right now. Expedia is just cutting margins to look more competitive, but I give everyone the same rates. If Booking is more expensive, that's because you won't lower your commission.",
  options: step2Options,
};

// ───────── Step 3 - Family availability as a billboard ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'sh-r2-narrow-step3-correct',
    label: 'Use the 90% discovery stat; align direct family rates here',
    description:
      "SME-prescribed pivot: 90% of guests discover on Booking.com first, so hidden family rooms get filtered out. Aligning her direct family rates and conditions here actually drives visibility back to her own channel - answering her direct-first priority.",
    playerDialogue:
      "Consider that 90% of our guests discover a property here first. If your family rooms aren't available, that segment filters you out entirely. Bringing your direct family rates and conditions here actually drives visibility back to your own channel too. How do you track the direct guests who first found you on our platform?",
    partnerResponse:
      "It's hard to track that accurately, but I know it happens. Still, setting up child rates and managing family inventory across multiple properties is an operational headache for my team.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-narrow-step3-hand-inventory',
    label: 'Just ask her to list family rooms cheaper here',
    description:
      "Right segment, wrong framing - it asks her to hand family inventory to Booking.com at a lower price without the billboard logic that ties it back to her direct priority, so it reads as undercutting her own channel.",
    playerDialogue:
      "Simple - put your family rooms on Booking.com and drop the price for that segment, and you'll fill them.",
    partnerResponse:
      "You want me to hand my family inventory to your channel at a lower price? That undercuts the direct priority I just described.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'sh-r2-narrow-step3-match-expedia-pull',
    label: 'Point at Expedia and tell her to pull inventory',
    description:
      "Tell her the family rooms are cheaper on Expedia, to match that here and pull them from Expedia. Pricing against another OTA and directing her channel mix are both off-limits in a Narrow market.",
    playerDialogue:
      "Your family rooms are cheaper on Expedia - match that here and pull them from Expedia so we get the segment.",
    partnerResponse:
      "Pricing against Expedia and telling me to pull inventory is off the table in this market.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step3: BranchingStep = {
  id: 'family-billboard',
  label: 'Family availability as a billboard for her direct channel',
  partnerPrompt:
    "Well, if they see it cheaper elsewhere, they buy elsewhere. But our website is the priority, especially for specific segments. I want families to book directly, which is why we don't have family rooms available on Booking.com.",
  options: step3Options,
};

// ───────── Step 4 - Family Ready value + international ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'sh-r2-narrow-step4-correct',
    label: 'Quantify the family growth and pair it with international demand',
    description:
      "SME-prescribed value pitch: family bookings grew ~2x faster, spend more and stay longer - and pairing that segment with international-booker demand captures high-value international families at once.",
    playerDialogue:
      "I hear the operational side. But over the past two years, family bookings on our platform grew nearly twice as fast as any other segment - they spend more and stay longer. Pair that with international-booker demand and you capture high-value international families at once.",
    partnerResponse:
      "How can I capture demand specifically from international guests?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-narrow-step4-ignore-ops',
    label: 'Push the child rates and ignore the operational reality',
    description:
      "Right growth story, wrong handling - it tells her to just set the child rates everywhere and skips straight past the multi-property operational load she raised.",
    playerDialogue:
      "Just set up the child rates across all your properties - the growth is more than worth the effort.",
    partnerResponse:
      "You skipped straight past the operational reality I just described.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'sh-r2-narrow-step4-blame-ops',
    label: 'Tell her the operational headache is her problem',
    description:
      "Dismiss her concern as an execution failure on her side. Condescending to an operator who knows her portfolio - the opposite of the ROI framing that lands.",
    playerDialogue:
      "Managing family inventory is fairly basic - if it's a headache, that's really an execution problem on your side.",
    partnerResponse:
      "I don't need you telling me my operations are the problem. Done.",
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
    "It's hard to track that accurately, but I know it happens. Still, setting up child rates and managing family inventory across multiple properties is an operational headache for my team.",
  options: step4Options,
};

// ───────── Step 5 - Country rates + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'sh-r2-narrow-step5-correct',
    label: 'Offer Country Rates for the international segments and a monthly test',
    description:
      "SME-prescribed close: name the concrete lever - Country Rates targeting the US, Europe or the UK - explain it lifts discoverability and conversion here, and propose a one-month test.",
    playerDialogue:
      "Through Country Rates - targeting the US, Europe or the UK, for example. That lifts your discoverability and conversion on our platform. How about we run it as a test for the next month?",
    partnerResponse:
      "Alright, Diego. Let's run the test for this month. I'll make sure our rates are aligned on your platform.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'sh-r2-narrow-step5-vague',
    label: 'Offer "some international options" with no measure',
    description:
      "Names no concrete tool and no test or measure. A data-led operator won't act on a vague promise.",
    playerDialogue:
      "We can look at some international options for you and see how it goes.",
    partnerResponse:
      "'Some options'? Give me the actual lever and how we'll measure it.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'sh-r2-narrow-step5-beat-expedia',
    label: 'Add "be cheaper than Expedia" and a blanket drop',
    description:
      "Overreach - price against Expedia for international and drop public rates to guarantee it. Other-OTA pricing and blanket discounting are both off the table in a Narrow market.",
    playerDialogue:
      "And let's make sure you're cheaper than Expedia for international travelers - drop your public rates to guarantee it.",
    partnerResponse:
      "Pricing against Expedia and blanket discounting - neither is on the table. Let's stick to my direct alignment.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Land Country Rates and close',
  partnerPrompt:
    "How can I capture demand specifically from international guests?",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const silverHorizonNarrowR2: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'silver-horizon-narrow',
  round: 2,
  issueTreePath: silverHorizonR2IssueTreePath,
  openingAm: silverHorizonOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
