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
      "Your rates are higher than the Key OTA's - the simplest fix is to bring your overall ADR down here so you're competitive again.",
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
      "You're leaving money everywhere with that 30% cap - honestly you should lift it and let us drive most of your business.",
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
      "Families are a great segment - just open up your family rooms and add cots, and they'll fill.",
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
      "Honestly, the Key OTA is undercutting you on families - you should pull your family rates from them and give them only to us.",
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
      "Let me ask you something first. You mentioned the deliberate 30% cap - but are you actually at 100% occupancy? And how are you securing advance bookings for peak season? Looking at your calendar, there's a lot of availability - we're nowhere near that 30%.",
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
      "Understood - 30% is your call. Let's just make the most of Genius within that.",
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
      "Frankly the 30% cap is costing you - you're being irrational about it. You should be taking far more volume from us.",
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
      "You just need to match your other channels here and you'll be fine.",
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
      "If you keep your rates higher than your other channels, our system will keep your visibility suppressed until you fix it.",
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
      "I'd start with Genius. It looks like your public base was raised to offset the Genius discount, so travelers see a non-genuine discount and conversion drops. Realign the base and set accurate family rates, and you optimize that 30% share with higher-spending, longer-staying guests - right now families book rival Genius properties because your page lacks a competitive offer. I'll get it set up and send a follow-up to review the impact.",
    partnerResponse:
      "The data logic is clear. The family rates and the Genius discount aren't working properly - let's adjust both to regain our visibility and booking share.",
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
      "Just deepen your Genius discount - make it 20% - and the Genius travelers will come back.",
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
      "Simplest of all - just take 10% off all your rates across the board and everything sorts itself out.",
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
