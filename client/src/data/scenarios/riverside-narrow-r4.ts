import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { riversideR4IssueTreePath, riversideOpeningAm } from './riverside-base';

/**
 * Riverside Boutique Hotel - Round 4 - Narrow Parity variant.
 *
 * Source: SME "Round 4" doc, Conversation 2 (Narrow Parity). In a
 * Narrow market the AM may only ask Anton to align with his own direct
 * website (Brand.com) - never to price against other OTAs. Same three
 * threads (Value Proposition Wall, unintentional family setup gap,
 * non-genuine Genius discount) and the same no-ADR-drop / no-pushing
 * guardrails. The risky distractors break the other-OTA ban and the
 * ranking-threat ban.
 */

// ───────── Step 1 - Probe his strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'rb-r4-narrow-step1-correct',
    label: 'Ask him to walk you through his strategy',
    description:
      "SME-prescribed open probe: note there's room for improvement and ask him to walk you through his current strategy before recommending anything.",
    playerDialogue:
      "Could you walk me through your current strategy? There's definitely room for improvement when it comes to performance, and I'd rather understand your thinking first.",
    partnerResponse:
      "Sure. We deliberately cap our Booking.com volume at 30% to protect our own website, so if you don't see huge numbers there, that's why. Our focus is on guests who book directly with us - repeaters - and on families, since we have a lot of family rooms.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-narrow-step1-lower-adr',
    label: 'Tell him to lower his ADR',
    description:
      "The Slippery Road trap: oversimplify to 'bring your ADR down.' Presumes the fix and is exactly what a boutique protecting its positioning refuses.",
    playerDialogue:
      "There's room for improvement - the simplest fix is to bring your overall ADR down here so you're more competitive.",
    partnerResponse:
      "Dropping my ADR across the board is exactly what I won't do - I run a boutique, not a discount channel.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'rb-r4-narrow-step1-lift-cap',
    label: 'Tell him to lift the 30% cap',
    description:
      "Dictate his channel strategy before you even understand it. Dismisses the autonomy a Marketing-Contract-Only GM guards most.",
    playerDialogue:
      "Whatever your strategy is, the 30% cap is the problem - you should lift it and let us drive most of your business.",
    partnerResponse:
      "You haven't heard a word of my strategy and you're already telling me how to run my business. Careful.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step1: BranchingStep = {
  id: 'probe',
  label: 'Probe his strategy',
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options,
};

// ───────── Step 2 - Family value + align direct rates ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'rb-r4-narrow-step2-correct',
    label: 'Quantify the family opportunity; ask for his direct-channel rates',
    description:
      "SME-prescribed value pitch: quantify family growth and value, then ask him to give Booking.com the same rates as his direct channel so you capture the incremental family demand his competitors are already catching.",
    playerDialogue:
      "Over the past two years family bookings grew nearly twice as fast as any other segment on our platform, and as you know, they spend more, stay longer, and review 24% more often. By providing us the same rates as your direct channel, we can capture the incremental family demand your competitors are already catching.",
    partnerResponse:
      "That's interesting - why do you think I'm not capturing that segment much at the moment?",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-narrow-step2-just-open',
    label: 'Tell him to just open the rooms and add cots',
    description:
      "Right segment, no diagnosis - it tells him to open family rooms and add cots without naming the direct-rate alignment, so it doesn't move him.",
    playerDialogue:
      "Families are a great segment - just open your family rooms and add cots, and they'll fill.",
    partnerResponse:
      "That's a bit thin - I'd want to understand where the gap actually is first.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rb-r4-narrow-step2-beat-keyota',
    label: 'Tell him to undercut the Key OTA on families',
    description:
      "Point at the Key OTA and tell him to make sure he isn't pricier than them on families. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue:
      "You're cheaper on the Key OTA for families - just make sure your family rates here aren't higher than the Key OTA's and you'll win them back.",
    partnerResponse:
      "You can't ask me to price against the Key OTA here - that's not how this market works.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step2: BranchingStep = {
  id: 'family-value',
  label: 'Turn the family gap into an opportunity',
  partnerPrompt:
    "Sure. We deliberately cap our Booking.com volume at 30% to protect our own website, so if you don't see huge numbers there, that's why. Our focus is on guests who book directly with us - repeaters - and on families, since we have a lot of family rooms.",
  options: step2Options,
};

// ───────── Step 3 - Break the Value Proposition Wall ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'rb-r4-narrow-step3-correct',
    label: 'Point at the family gap; reframe the cap, probe advance bookings',
    description:
      "SME-prescribed Value-Proposition-Wall break: note he's more competitive elsewhere on families, then ask whether he's actually full and how he's securing advance bookings for the other 70%.",
    playerDialogue:
      "Our data shows you're more competitive elsewhere when it comes to families. You mentioned the 30% cap - but are you at 100% occupancy? How are you securing advance bookings for the other 70%? There's a lot of availability over the next few months.",
    partnerResponse:
      "We don't want advance bookings at a lower price - we're waiting for peak. And there are periods we're not performing on any channel. Apart from families, which I can fix, what can we do to optimize with you?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-narrow-step3-accept-cap',
    label: 'Accept the cap and just work Genius',
    description:
      "Takes the 30% ceiling at face value - the opposite of testing whether the cap is even binding.",
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
    id: 'rb-r4-narrow-step3-argue-cap',
    label: 'Tell him the cap is irrational',
    description:
      "Belittle his strategy and push for far more volume. Lecturing a GM who guards his autonomy shuts the conversation down.",
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
    "That's interesting - why do you think I'm not capturing that segment much at the moment?",
  options: step3Options,
};

// ───────── Step 4 - Ask for direct-website alignment + data ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'rb-r4-narrow-step4-correct',
    label: 'Ask for the same rates/conditions as his website, with data',
    description:
      "SME-prescribed ask: to hit his goals he needs to be competitive, so provide the same rates and conditions he offers on his own website, backed by the 1% -> ~2.7% net revenue / ~3% room nights figure.",
    playerDialogue:
      "To hit your goals, we need you to be competitive. We'd ask you to provide us the same rates and conditions you offer on your own website - that improves visibility and conversion. Our data shows a 1% price improvement drives about 2.7% more net revenue and 3% more room nights on average.",
    partnerResponse:
      "How can I improve the campaigns I'm already running on your platform?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-narrow-step4-no-data',
    label: 'Ask him to align, with no business case',
    description:
      "Compliant ask but bare - 'align your website rates and you'll be fine.' An analytical GM won't act without the numbers.",
    playerDialogue:
      "Just align your website rates here and you'll be fine.",
    partnerResponse:
      "'You'll be fine' isn't a business case. Show me the numbers.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rb-r4-narrow-step4-other-otas',
    label: 'Ask him to also undercut the other OTAs',
    description:
      "Tell him to make sure he isn't pricier than the other OTAs either. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue:
      "And make sure you're not pricier than the other OTAs either - match them here so you're competitive everywhere.",
    partnerResponse:
      "Policing my other-OTA pricing isn't your call in this market.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step4: BranchingStep = {
  id: 'align-ask',
  label: 'Ask for direct-website alignment, backed by data',
  partnerPrompt:
    "We don't want advance bookings at a lower price - we're waiting for peak. And there are periods we're not performing on any channel. Apart from families, which I can fix, what can we do to optimize with you?",
  options: step4Options,
};

// ───────── Step 5 - Realign Genius + family, then close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'rb-r4-narrow-step5-correct',
    label: 'Diagnose the non-genuine Genius discount; align base + family, close',
    description:
      "SME-prescribed pitch: he isn't getting the best out of Genius because the discount reads as non-genuine; aligning both base and family rates optimizes the 30% share with higher-value guests. Commit to a follow-up.",
    playerDialogue:
      "You're not getting the best out of Genius - travelers can see the discount isn't genuine, which blunts it. If you align both your base and family rates, you optimize that 30% share with higher-spending, longer-staying guests. Right now families book other Genius properties because they don't get a competitive offer from you. I'll set it up and send a follow-up.",
    partnerResponse:
      "The data logic is clear. The family rates and the Genius discount aren't working - let's adjust both to regain our visibility and booking share.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'rb-r4-narrow-step5-deepen-genius',
    label: 'Tell him to deepen the Genius discount',
    description:
      "Treats the symptom, not the cause - a deeper discount on an inflated base doesn't restore genuine value.",
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
    id: 'rb-r4-narrow-step5-blanket-drop',
    label: 'Close on a blanket 10% cut',
    description:
      "Fall back on an across-the-board discount - the Slippery Road trap the boutique has refused throughout.",
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
    "How can I improve the campaigns I'm already running on your platform?",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const riversideNarrowR4: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'riverside-narrow',
  round: 4,
  issueTreePath: riversideR4IssueTreePath,
  openingAm: riversideOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
