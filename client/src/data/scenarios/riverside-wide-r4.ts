import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { riversideR4IssueTreePath, riversideOpeningAm } from './riverside-base';

/**
 * Riverside Boutique Hotel - Round 4 - Wide Parity variant.
 *
 * Source: SME "Round 4" doc, Conversation 1 (Wide Parity). In a Wide
 * market the AM may ask Anton to provide the same rates, conditions and
 * availability he gives the Key OTA and his direct channel. The learner
 * must break the Value Proposition Wall (optimize the 30% rather than
 * argue the cap), fix the unintentional family setup gap, and realign
 * the non-genuine Genius discount - all without an across-the-board ADR
 * drop (the Slippery Road trap) or being pushy (Anton dislikes being
 * dictated to). The risky distractors break the ban on directing his
 * channel mix and on ranking threats.
 */

// ───────── Step 1 - Data reveal + probe his goals ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'rb-r4-wide-step1-correct',
    label: 'Name the family + Genius gaps, then ask his goals',
    description:
      "SME-prescribed probe: surface that his rates run higher than the Key OTA on family occupancy and that Genius isn't performing, then ask an open question about his goals before recommending anything.",
    playerDialogue:
      "I've been looking at your competitiveness with us, and your rates are running higher than the Key OTA's - specifically on family occupancy. The Genius program also isn't performing the way it should. Before I go further, what are your goals with us?",
    partnerResponse:
      "Let me share our strategy. We deliberately cap our Booking.com volume at 30% to protect our own website - so if Genius isn't pulling numbers, that's by design. The family rates, though, aren't intentional. I'd happily give you the same rates as the other OTAs. How much am I leaving on the table on the family segment?",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-wide-step1-lower-adr',
    label: 'Tell him to lower his ADR',
    description:
      "The Slippery Road trap: oversimplify to 'bring your ADR down.' It presumes the fix, ignores that the family gap is a setup issue, and is exactly what a boutique protecting its positioning refuses.",
    playerDialogue:
      "Your rates are running higher than the Key OTA's, and the simplest fix here is to bring your overall ADR down so you're competitive again. I wouldn't overthink it - drop the headline rate across your board, watch the bookings come back, and we can move on from there.",
    partnerResponse:
      "Dropping my ADR across the board is exactly what I won't do - I run a boutique, not a discount channel.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'rb-r4-wide-step1-lift-cap',
    label: 'Tell him to lift the 30% cap',
    description:
      "Dictate his channel strategy - lift the cap and let Booking.com drive most of his business. Dismisses the autonomy a Marketing-Contract-Only GM guards most.",
    playerDialogue:
      "You're leaving money everywhere with that 30% cap - honestly, you should just lift it and let us drive the majority of your business. Once we're carrying most of your volume, everything else gets easier, so let go of that ceiling and hand us the bulk of the room nights.",
    partnerResponse:
      "I told you the cap is deliberate. If you're here to tell me how to run my business, this is going to be a short call.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step1: BranchingStep = {
  id: 'probe',
  label: 'Surface the gaps and probe his goals',
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options,
};

// ───────── Step 2 - Family value + the Key OTA ask ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'rb-r4-wide-step2-correct',
    label: 'Quantify the family opportunity; ask for the same third-party rates',
    description:
      "SME-prescribed answer to his family question: quantify the growth and value, then ask him to give Booking.com the same rates he already gives third parties so you capture the incremental family demand he's missing.",
    playerDialogue:
      "On families: over the past two years those bookings grew nearly twice as fast as any other segment, and they spend more, stay longer, and are 24% more likely to leave a review. By giving us the same rates you already give third parties, we can capture the incremental family demand you're missing right now.",
    partnerResponse:
      "That's interesting - thank you for flagging it, we'll definitely fix it. Now, what about the Genius program issue you mentioned?",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-wide-step2-just-open',
    label: 'Tell him to just open the rooms and add cots',
    description:
      "Right segment, no diagnosis - it tells him to open family rooms and add cots without naming the rate gap or answering what he's leaving on the table, so it doesn't move him.",
    playerDialogue:
      "Families are a great segment for you - so just go ahead and open up your family rooms, add a few cots to the larger units, and make sure the occupancy settings allow for children. Do that and they'll start to fill on their own; it's really more of a housekeeping fix than anything you need numbers for.",
    partnerResponse:
      "That's not really an answer on where the gap is - I asked what I'm leaving on the table.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rb-r4-wide-step2-pull-keyota',
    label: 'Tell him to pull family rates from the Key OTA',
    description:
      "Name the Key OTA and tell him to withhold his family rates from them and give them only to Booking.com. Directing his channel mix oversteps even in a Wide market.",
    playerDialogue:
      "Honestly, the Key OTA is undercutting you on the family segment, and the cleanest move is to pull your family rates from them altogether and give those rates only to us. Once they can't show a family price, that demand flows straight to Booking.com, so take them off that channel and let us be the only place travelers can book your family rooms.",
    partnerResponse:
      "You don't get to tell me which channels I work with.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step2: BranchingStep = {
  id: 'family-value',
  label: 'Turn the family gap into an opportunity',
  partnerPrompt:
    "Let me share our strategy. We deliberately cap our Booking.com volume at 30% to protect our own website - so if Genius isn't pulling numbers, that's by design. The family rates, though, aren't intentional. I'd happily give you the same rates as the other OTAs. How much am I leaving on the table on the family segment?",
  options: step2Options,
};

// ───────── Step 3 - Break the Value Proposition Wall ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'rb-r4-wide-step3-correct',
    label: 'Reframe the 30% cap: are you even full? Probe advance bookings',
    description:
      "SME-prescribed Value-Proposition-Wall break: rather than argue the cap, ask whether he's actually at full occupancy and how he's securing advance bookings, and point out the calendar is nowhere near 30% full.",
    playerDialogue:
      "We will get to that in a moment. But first, if your goal is to keep Booking.com at around 30%, let's help you get more value from that 30% you already intend to allocate to us. If you still have occupancy to fill, or if you want stronger advance bookings or a better guest mix, we can help capture demand you may not reach as efficiently on your own.",
    partnerResponse:
      "We don't want to lock in advance bookings at a lower price - we'd rather wait for the pick-up and get the best out of it. That said, there are periods where we're not performing well on any channel. What can we do to optimize our performance with you?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-wide-step3-accept-cap',
    label: 'Accept the cap and just work Genius',
    description:
      "Takes the 30% ceiling at face value and moves on - the opposite of the Value-Proposition-Wall break, which is to test whether the cap is even binding.",
    playerDialogue:
      "Understood - the 30% cap is entirely your call. Let's just work within that ceiling and make the most of Genius on the share you do give us. If that's the box we're operating in, I'll focus on getting the programme right and leave the volume where you've set it.",
    partnerResponse:
      "So we're just accepting the ceiling? I thought you saw an opportunity here.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rb-r4-wide-step3-argue-cap',
    label: 'Tell him the cap is irrational',
    description:
      "Belittle his strategy as irrational and push him to take far more volume. Lecturing a GM who guards his autonomy shuts the conversation down.",
    playerDialogue:
      "Frankly, the 30% cap is costing you real money, and I think you're being irrational about protecting it so tightly. A property like yours should be taking far more volume from us than that. Drop the ceiling, stop second-guessing it, and let the bookings we can send you actually come through.",
    partnerResponse:
      "Calling my strategy irrational is not how you'll win this. Careful.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -12,
  },
];

const step3: BranchingStep = {
  id: 'value-wall',
  label: 'Break the Value Proposition Wall',
  partnerPrompt:
    "That's interesting - thank you for flagging it, we'll definitely fix it. Now, what about the Genius program issue you mentioned?",
  options: step3Options,
};

// ───────── Step 4 - The competitiveness ask + data ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'rb-r4-wide-step4-correct',
    label: 'Ask for the same rates/availability as his other channels, with data',
    description:
      "SME-prescribed ask: to lift visibility on the empty inventory, provide the same rates and availability he gives his direct channel and third parties, backed by the 1% competitiveness -> ~2.7% net revenue / ~3% room nights figure.",
    playerDialogue:
      "To lift your visibility on that empty inventory, we'd ask you to provide us the same rates and availability you give your direct channel and third parties - that directly improves visibility and conversion. Our data shows a 1% competitiveness improvement drives about 2.7% more net revenue and 3% more room nights on average.",
    partnerResponse:
      "Well - I can think about it, you're not wrong. How can I improve the campaigns I'm already running on your platform?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-wide-step4-no-data',
    label: 'Ask him to match, with no business case',
    description:
      "Compliant ask but bare - 'match your other channels and you'll be fine.' An analytical GM won't act without the numbers behind it.",
    playerDialogue:
      "You just need to match your other channels here - same rates, same availability as your direct site and the third parties - and you'll be fine. It's really the whole play: line them up so we're not the expensive option, and the visibility and bookings sort themselves out from there. Trust me on this one, it works.",
    partnerResponse:
      "'You'll be fine' isn't a business case. Show me the numbers.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rb-r4-wide-step4-ranking-threat',
    label: 'Threaten suppressed visibility',
    description:
      'Threaten to keep his visibility suppressed until he aligns. Threatening ranking/visibility over external prices is banned in every regime.',
    playerDialogue:
      "If you keep your rates higher than your other channels, our system is going to keep your visibility suppressed until you fix it - that's just how the algorithm treats properties that price above their competitors. So as long as you sit above your direct site and the third parties, expect us to hold you down in the results until you bring them into line.",
    partnerResponse:
      "Threatening my visibility over how I price elsewhere is a red flag. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step4: BranchingStep = {
  id: 'competitiveness-ask',
  label: 'Ask for competitiveness, backed by data',
  partnerPrompt:
    "We don't want to lock in advance bookings at a lower price - we'd rather wait for the pick-up and get the best out of it. That said, there are periods where we're not performing well on any channel. What can we do to optimize our performance with you?",
  options: step4Options,
};

// ───────── Step 5 - Realign Genius + family, then close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'rb-r4-wide-step5-correct',
    label: 'Diagnose the non-genuine Genius discount; realign base + family, close',
    description:
      "SME-prescribed pitch: his public base was raised to offset Genius, so the discount reads as non-genuine and conversion drops. Realign the base rate and set accurate family rates to optimize the 30% share with higher-value guests, then commit to a follow-up.",
    playerDialogue:
      "To improve performance, realign the base rate to ensure a genuinely discounted price for Genius travelers. In addition, with the updated family rates, it helps optimize that 30% share with higher-spending, longer-staying guests - right now families book rival Genius properties because your page lacks a competitive offer. If you also agree with this approach, I'll get it set up and send a follow-up to review the impact.",
    partnerResponse:
      "The logic is clear. The family rates and the Genius discount aren't working properly - let's adjust both to regain our visibility and booking share.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'rb-r4-wide-step5-deepen-genius',
    label: 'Tell him to deepen the Genius discount',
    description:
      "Treats the symptom, not the cause - a deeper Genius discount on top of an inflated base doesn't restore genuine value, it just widens the same offset.",
    playerDialogue:
      "Just deepen your Genius discount - take it up to 20% - and the Genius travelers will start coming back to you. A bigger headline saving is what catches their eye, so make the discount look more generous and let that pull the bookings through. Leave the base rate exactly where it is; you don't need to touch that, just widen the gap on the Genius side and lean into the deeper offer. That's the quickest way to get the programme moving again without reworking anything underneath it.",
    partnerResponse:
      "A deeper discount on an inflated base is the same problem, isn't it? That doesn't fix the value.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rb-r4-wide-step5-blanket-drop',
    label: 'Close on a blanket 10% cut',
    description:
      "Fall back on an across-the-board discount - the Slippery Road trap and the exact move a boutique protecting its positioning has refused throughout.",
    playerDialogue:
      "Simplest of all - just take 10% off all your rates across the board, and honestly everything else sorts itself out from there. Forget picking apart Genius and the family setup piece by piece; one clean cut on every rate makes you competitive everywhere at once and saves us both the analysis. Guests see a lower number across the whole property, the bookings follow, and you don't have to fiddle with individual segments or the base at all. It's the fastest route to competitive.",
    partnerResponse:
      "Across-the-board discounting is the one thing I keep telling you I won't do.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Realign Genius + family and close',
  partnerPrompt:
    "Well - I can think about it, you're not wrong. How can I improve the campaigns I'm already running on your platform?",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const riversideWideR4: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'riverside-wide',
  round: 4,
  issueTreePath: riversideR4IssueTreePath,
  openingAm: riversideOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
