import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { palaceGrandR7IssueTreePath } from './palace-grand-base';

/**
 * Palace Grand Resort - Round 7 - Wide Parity variant.
 *
 * Source: SME "Round 7" doc, Conversation 1 (Wide Parity). In a Wide
 * market the AM may ask Ethan for the same rates, conditions, and
 * availability he gives the Key OTA and his direct channel, and may name
 * the third party leaking the rate - but cannot instruct him to stop
 * working with them. The learner must refuse the price war, reframe the
 * Same Net logic to ROI and brand value, open the family segment, and
 * de-risk the mobile + family fix. The risky distractors break the
 * ranking-threat and dictate-strategy bans.
 */

const openingAm =
  "Hi Ethan. Thank you for taking the time to meet me today. How is the business going?";

// ───────── Step 1 - Reveal the Key OTA gap ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'pg-r7-wide-step1-correct',
    label: 'Credit the conversion, then name where the gap is concentrated',
    description:
      "SME-prescribed reveal: acknowledge conversion is 45% above peer, then surface page views down 53% and the pattern - his property appears uncompetitive 66% of the time versus other channels, specifically on mobile and family searches.",
    playerDialogue:
      "Let's have a look. Your conversion rate is actually 45% above your peer group, but your page views are down 53%. Over the past month there's been a shift - your property appears uncompetitive around 66% of the time compared with other channels, and it's concentrated specifically in mobile and family searches.",
    partnerResponse:
      "Diego, we apply the same rates across all online channels to keep things simple. If another platform decides to cut its own margin to lower the public price, that's their choice. If Booking.com wants to compete, you should just do the same.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-wide-step1-flat-drop',
    label: 'Jump to an across-the-board rate cut',
    description:
      "Right that he's uncompetitive, wrong route - prescribe a blanket cut before diagnosing anything. It presumes the fix and hands an ROI-minded operator nothing to weigh, exactly the move he'll push back on.",
    playerDialogue:
      "Your page views are down because you're simply too expensive - the fix is to drop your Booking.com rates across the board and the traffic comes back.",
    partnerResponse:
      "You're telling me to cut everything before you've explained a single thing. Walk me through the actual problem first.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -5,
  },
  {
    id: 'pg-r7-wide-step1-fluff',
    label: 'Open with a soft reassurance',
    description:
      'Warm, no data - the wrong register for an operator who opened by asking exactly what the data shows.',
    playerDialogue:
      "Honestly, I wouldn't read too much into one slower month - these things tend to even out. How's everything else going?",
    partnerResponse:
      "I asked what the data shows. If it's just a slow month, tell me that; if it isn't, show me.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the Key OTA gap',
  partnerPrompt:
    "Hi Diego. We're busy, but our volume via Booking.com has declined over the past month. What does the data show? Why are our visitor numbers on your platform dropping?",
  options: step1Options,
};

// ───────── Step 2 - Handle the Same Net Mindset ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'pg-r7-wide-step2-correct',
    label: 'Refuse the price war; reframe to ROI and brand value',
    description:
      "SME-prescribed handle: don't agree to burn margin. Inconsistent pricing across third-party channels confuses guests and devalues his public brand. He can't control other distributors' margin cuts, but he can keep his own base rates and promotions aligned with Booking.com.",
    playerDialogue:
      "I get your point, but inconsistent pricing across third-party channels causes customer confusion, weakens trust, and devalues your public brand. We'd recommend prioritizing long-term brand value and net revenue. You can't control another distributor cutting its margin, but you can make sure the base rates and promotions you set stay aligned with Booking.com.",
    partnerResponse:
      "I'll grant you that inconsistent public pricing looks messy to a guest. But what about the family segment? We purposely restrict our larger rooms on third-party channels because they're difficult to manage and we prefer to keep them for our direct guests.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-wide-step2-match',
    label: 'Agree to match the competitor promotions',
    description:
      "Sounds accommodating, but it concedes the Same Net trap - promising to burn margin whenever a competitor discounts. It rewards the race to the bottom instead of reframing to value, and gives away platform margin for nothing.",
    playerDialogue:
      "That's fair - I'll take it back to my team and we'll look at matching those competitor promotions so you're always covered on price here.",
    partnerResponse:
      "Good, that's the kind of partnership I want. So you'll just keep pace with whoever's cheapest?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r7-wide-step2-threat',
    label: 'Warn his ranking will keep dropping',
    description:
      "Threaten a further visibility slide unless he aligns. Threatening ranking over how he prices is banned in every regime, and it torches the collaboration this operator responds to.",
    playerDialogue:
      "I'll be straight with you - if you keep chasing the discounters instead of aligning with us, our system will keep pushing your property further down the results.",
    partnerResponse:
      "Threatening my ranking over how I run my pricing is not how you'll get me on side.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step2: BranchingStep = {
  id: 'same-net',
  label: 'Handle the Same Net Mindset',
  partnerPrompt:
    "Diego, we apply the same rates across all online channels to keep things simple. If another platform decides to cut its own margin to lower the public price, that's their choice. If Booking.com wants to compete, you should just do the same.",
  options: step2Options,
};

// ───────── Step 3 - Open the family segment ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'pg-r7-wide-step3-correct',
    label: 'Pitch the family segment as an opportunity',
    description:
      "SME-prescribed Family Ready value: keeping family rates higher or less available here misses a growing segment. Families spend more, stay longer, and grow nearly two times faster than other traveler segments - a lever for occupancy and higher ADR.",
    playerDialogue:
      "By keeping those family rates higher or less available on our platform, you're missing out on a fast-growing segment. Families tend to spend more, stay longer, and have grown nearly two times faster than other traveler segments over the last two years. They're a valuable segment that can help you maximize occupancy and drive a higher ADR.",
    partnerResponse:
      "The point about them staying longer and spending more is compelling. But how do I fix this without creating an operational nightmare for my front desk?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-wide-step3-discount',
    label: 'Ask him to simply lower his family rates here',
    description:
      "Right segment, wrong lever - it turns a setup opportunity into a discount ask, and it walks straight into the operational fear he'll raise next. The win is availability and configuration, not a price cut.",
    playerDialogue:
      "It's simple, really - just lower your family rates on Booking.com so they're the cheapest option and the family bookings will follow.",
    partnerResponse:
      "Cutting my family prices is the opposite of protecting that inventory. Give me a commercial reason, not a discount.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r7-wide-step3-dictate',
    label: 'Tell him to open all family rooms to you now',
    description:
      "Direct him to hand over his full family inventory immediately. Dictating his distribution strategy oversteps, and pushing an autonomous operator this hard gets a fast no.",
    playerDialogue:
      "Frankly, your direct-only family strategy is a mistake - you should open all your family rooms to us right now and stop holding them back.",
    partnerResponse:
      "You don't get to tell me how to allocate my own inventory. That's my call, not yours.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -10,
  },
];

const step3: BranchingStep = {
  id: 'family-value',
  label: 'Open the family segment',
  partnerPrompt:
    "I'll grant you that inconsistent public pricing looks messy to a guest. But what about the family segment? We purposely restrict our larger rooms on third-party channels because they're difficult to manage and we prefer to keep them for our direct guests.",
  options: step3Options,
};

// ───────── Step 4 - De-risk the fix + surface the mobile setup ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'pg-r7-wide-step4-correct',
    label: 'Reassure it is easy, then flag the misconfigured mobile rate',
    description:
      "SME-prescribed close of the diagnosis: it's an easy fix and you'll support him. Then surface the concrete lever - his Mobile Rate on Booking.com is active but has many dates and two rate plans excluded, which is where the competitor is undercutting.",
    playerDialogue:
      "It's actually an easy fix, and I can support you through it - it won't add load to your front desk. And to close the mobile gap where other channels are undercutting you, we can re-evaluate the mobile rate you already have set with us. I can see there are a lot of dates and two rate plans excluded on it right now.",
    partnerResponse:
      "Ah - I haven't touched that setup in a while, thank you for flagging it. So if we add family rates and expand the mobile rate coverage, that gives us a structured way to recover those page views?",
    styleMatch: { red: 1, yellow: 0, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-wide-step4-cold',
    label: 'List the fix without addressing the operational worry',
    description:
      "The right two actions, but delivered flat - it skips the reassurance an operations manager asked for outright. Correct content, wrong read of the partner: he needs to hear it won't burden his team.",
    playerDialogue:
      "You'd add family rates and clear the exclusions on your mobile rate. That's the fix.",
    partnerResponse:
      "That tells me what to change, not whether it lands on my front desk. That's the part I asked about.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
  {
    id: 'pg-r7-wide-step4-blame',
    label: 'Put the broken mobile rate back on him',
    description:
      "Frame the misconfigured mobile rate as his oversight to sort out. Blaming an operator you're trying to bring on side burns the collaboration and answers none of his operational concern.",
    playerDialogue:
      "Well, your mobile rate has been misconfigured on your side for months - that's really on you to go in and sort out.",
    partnerResponse:
      "If your pitch is that this is all my fault, you can see why I'd rather just leave it as it is.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -8,
  },
];

const step4: BranchingStep = {
  id: 'derisk-fix',
  label: 'De-risk the fix and surface the mobile setup',
  partnerPrompt:
    "The point about them staying longer and spending more is compelling. But how do I fix this without creating an operational nightmare for my front desk?",
  options: step4Options,
};

// ───────── Step 5 - Close on a shared setup session ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'pg-r7-wide-step5-correct',
    label: 'Offer to set it up together in the extranet now',
    description:
      "SME-prescribed close: confirm the plan and move on it collaboratively - open the extranet together right now to set up the mobile and family adjustments while you have him.",
    playerDialogue:
      "Exactly - that's the structured path back. Shall we open your extranet together right now and set up these specific mobile and family adjustments while we're on the call?",
    partnerResponse:
      "Let's do it, Diego. Let's get these settings aligned and see if we can get bookings moving again.",
    styleMatch: { red: 2, yellow: 1, green: 2, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'pg-r7-wide-step5-defer',
    label: 'Send him instructions to do it later',
    description:
      "Right plan, lost momentum - handing an operator a to-do for whenever he gets a chance drops the collaborative, do-it-now energy that just got him to yes, and the exclusions will likely sit untouched.",
    playerDialogue:
      "Great - I'll have my team email you the steps and you can update the mobile and family settings whenever you get a chance.",
    partnerResponse:
      "Sure, though realistically that'll sit in my inbox for a while - you know how it is.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: 0 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'pg-r7-wide-step5-exclusive',
    label: 'Tell him to keep family rooms exclusive to Booking.com',
    description:
      "Direct him to pull the family rooms from the other OTAs and give them only to you. Instructing an operator on his external channel mix oversteps even in a Wide market.",
    playerDialogue:
      "And to really lock this in, stop giving those family rooms to the other OTAs - keep them exclusive to us.",
    partnerResponse:
      "You don't get to decide which channels I work with. That's my call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Close on a shared setup session',
  partnerPrompt:
    "Ah - I haven't touched that setup in a while, thank you for flagging it. So if we add family rates and expand the mobile rate coverage, that gives us a structured way to recover those page views?",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const palaceGrandWideR7: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'palace-grand-wide',
  round: 7,
  issueTreePath: palaceGrandR7IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5],
};
