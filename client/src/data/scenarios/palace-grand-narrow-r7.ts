import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { palaceGrandR7IssueTreePath } from './palace-grand-base';

/**
 * Palace Grand Resort - Round 7 - Narrow Parity variant.
 *
 * Source: SME "Round 7" doc, Conversation 2 (Narrow Parity). In a Narrow
 * market the AM cannot ask for parity against other OTAs and cannot ask
 * Ethan to change or raise his rates on other platforms; the compliant
 * ask is to keep Booking.com in line with his own direct website. If a
 * discrepancy is observed it can be discussed reactively and neutrally.
 * The learner refuses the price war, aligns to Brand.com, lands the
 * family + billboard case, probes the unsold rooms, and closes on working
 * together. The risky distractor asks for other-OTA parity - a Narrow
 * breach.
 */

const openingAm =
  "Hi Ethan, thanks for connecting today. I know you've been reviewing the performance, so let's look at the data together to see how we can optimize the property's visibility this quarter.";

// ───────── Step 1 - Reveal the gap from a revenue angle ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'pg-r7-narrow-step1-correct',
    label: 'Acknowledge the friction, then frame it as a revenue issue',
    description:
      "SME-prescribed reveal: acknowledge the frustration, then reframe to revenue - he converts very well once guests find him, but page views are down 53% because his prices appear uncompetitive in most searches, concentrated in mobile traffic and family configurations.",
    playerDialogue:
      "I understand how frustrating that is, but let's look at it from a revenue perspective. You convert very well once guests find you, but your page views are down 53% because your prices appear uncompetitive in the majority of searches. That gap is concentrated in your mobile traffic and your family configurations.",
    partnerResponse:
      "The other platform is telling us we need to drop our rates or let them run exclusive campaigns to fix it. If they're cutting margins to win the guest, we expect Booking.com to just match their actions.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-narrow-step1-validate-war',
    label: 'Agree the other OTAs are the problem',
    description:
      "Warm and sympathetic, but it validates the competitor-noise framing instead of steering to his own performance - it lets the price-war logic stand rather than reframing to revenue and visibility.",
    playerDialogue:
      "You're right, and honestly it's really unfair - those other OTAs are undercutting everyone and making your life so much harder than it needs to be. It's a brutal market out there right now, and the fact that they keep pinging you about competitive prices while you're giving everyone the same rates just proves they're the ones stirring all this up.",
    partnerResponse:
      "So we agree they're the problem. Then what are you actually going to do about it?",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r7-narrow-step1-flat-drop',
    label: 'Prescribe an across-the-board cut',
    description:
      "Right that he's uncompetitive, wrong route - a blanket cut before any diagnosis presumes the fix and gives an ROI-minded operator nothing to weigh.",
    playerDialogue:
      "Honestly, the quickest fix here is just to drop your Booking.com rates across the board so you look competitive again in every search - once the price comes down the traffic will follow almost immediately, so I'd get those numbers lowered now and we can worry about the finer details of mobile and families later.",
    partnerResponse:
      "You want me to cut everything before you've explained the actual problem. Slow down.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the gap from a revenue angle',
  partnerPrompt:
    "I have to tell you, I'm facing a lot of friction. Other OTAs keep reaching out saying they've noticed more competitive prices on your platform, while I'm giving everyone the same rates. Why are they telling me this, and why are we seeing these visibility drops if our conversion is better than our competitors?",
  options: step1Options,
};

// ───────── Step 2 - Refuse the price war; align to Brand.com ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'pg-r7-narrow-step2-correct',
    label: 'No price war; align Booking.com with his direct website',
    description:
      "SME-prescribed handle: you don't want a price war, you can't prevent other OTAs cutting margins, and you can't ask him to change his rates on other platforms. To maximize Booking.com performance, keep Booking.com in line with his own direct website prices.",
    playerDialogue:
      "We can't prevent other OTAs cutting their margins - nor would we ask you to change or raise your rates on other platforms. But to maximize your Booking.com performance and support your overall revenue goals, we'd recommend keeping Booking.com in line with your own direct website prices.",
    partnerResponse:
      "But from a distribution standpoint, our brand strategy limits booking from OTAs, especially families. We prefer families to book directly so we can manage the room inventory and bed configurations better.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-narrow-step2-match',
    label: 'Agree to match the competitor promotions',
    description:
      "Sounds accommodating, but it concedes the Same Net trap - promising to burn margin whenever a competitor discounts - instead of anchoring him to his own direct website prices.",
    playerDialogue:
      "That's fair - I'll take this straight back to my team, and what we'll do is look at matching those competitor campaigns whenever they run one, so you're always covered on price here and never sitting above whoever happens to be cheapest that week. If they cut, we'll move with them, and you won't have to worry about being undercut on our platform again.",
    partnerResponse:
      "Good. So you'll just keep pace with whoever's cheapest that week?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r7-narrow-step2-ota-parity',
    label: 'Ask him to match the other OTAs',
    description:
      "In a Narrow market you cannot ask for parity against other OTAs, only alignment with his own direct website. Asking him to level his rates with the other platforms is a compliance breach.",
    playerDialogue:
      "The cleanest fix here is really just to give us the exact same rates you're giving the other OTAs, so that you're perfectly level right across every platform and none of them can claim they've got a better deal than we do. Once your rates line up identically everywhere, all this noise about who's cheaper simply goes away and everyone's on the same footing.",
    partnerResponse:
      "You're asking me to line my rates up with the other OTAs? I didn't think that was something you could ask.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

const step2: BranchingStep = {
  id: 'same-net',
  label: 'Refuse the price war; align to Brand.com',
  partnerPrompt:
    "The other platform is telling us we need to drop our rates or let them run exclusive campaigns to fix it. If they're cutting margins to win the guest, we expect Booking.com to just match their actions.",
  options: step2Options,
};

// ───────── Step 3 - Family segment via the billboard effect ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'pg-r7-narrow-step3-correct',
    label: 'Use the discovery journey; ask him to match his website family rates',
    description:
      "SME-prescribed handle: 90% of travelers discover properties on the platform first. When families see an uncompetitive price they book a competitor right next door, not his direct site. Ask him to match the family rates and conditions of his own website so families can find him.",
    playerDialogue:
      "Consider the traveler's discovery journey - around 90% of travelers discover properties on our platform first. When families see an uncompetitive price here, they don't jump to your direct site; they book a competitor right next to you. That's why we'd ask you to match the family rates and conditions of your own website here, so families can actually find you. Similarly for mobile channel traffic.",
    partnerResponse:
      "What's the specific return if I adjust the family and mobile setup to match our website?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-narrow-step3-discount',
    label: 'Ask him to simply undercut on family rates',
    description:
      "Right segment, wrong lever - it becomes a discount ask rather than an alignment-to-his-own-website ask, and it walks into the operational fear he'll raise. The move is matching his direct family rates, not cutting them.",
    playerDialogue:
      "It's really simple when you think about it - just make your family rates on Booking.com the cheapest around, cheaper than anywhere else a guest could look, and the bookings will follow almost on their own. Families always chase the lowest number they can see, so if you're consistently the cheapest option for them here, they'll pick you first every single time and the volume takes care of itself.",
    partnerResponse:
      "Undercutting my own family pricing is the opposite of what I want. Give me the commercial case.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r7-narrow-step3-dictate',
    label: 'Tell him to open all family rooms to you now',
    description:
      "Direct him to hand over his full family inventory immediately. Dictating his distribution strategy oversteps, and pushing an autonomous operator this hard gets a fast no.",
    playerDialogue:
      "Honestly, your direct-only family strategy is a real mistake and it's costing you - you should open up all of your family rooms to us right now, the full inventory, and let us handle that segment for you properly. Keeping those rooms locked to your own website is exactly what's holding this property back, so the move is to hand the whole family allocation over to us today and stop protecting it.",
    partnerResponse:
      "You don't get to tell me how to allocate my own inventory. That's my decision.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -10,
  },
];

const step3: BranchingStep = {
  id: 'family-billboard',
  label: 'Family segment via the billboard effect',
  partnerPrompt:
    "But from a distribution standpoint, our brand strategy limits booking from OTAs, especially families. We prefer families to book directly so we can manage the room inventory and bed configurations better.",
  options: step3Options,
};

// ───────── Step 4 - Quantify the family value and probe ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'pg-r7-narrow-step4-correct',
    label: 'Give the family value, then probe his setup and unsold rooms',
    description:
      "SME-prescribed collaborative probe: families grow nearly twice as fast, stay longer, and spend more. Then ask how he attracts families to his own website today and what his share of unsold family rooms is - the questions that surface the opportunity together.",
    playerDialogue:
      "Families grow nearly twice as fast as other segments, stay longer, and spend more during their stay. How are you attracting families to your own website today, and what's your share of unsold family rooms on average?",
    partnerResponse:
      "We offer a great price, but it's hard to compare our own traffic with the amount you generate - just looking at your search results view, it's a powerful way to be discovered first. And in low-occupancy periods those big family rooms often stay unsold.",
    styleMatch: { red: 0, yellow: 0, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-narrow-step4-stats-only',
    label: 'Recite the family stats without a question',
    description:
      "The right numbers, but no probe - it states the value and stops, missing the collaborative discovery an operator responds to. He never gets asked about his own unsold rooms, so the opportunity stays abstract.",
    playerDialogue:
      "Families grow nearly twice as fast as other segments, they stay longer, and they spend noticeably more once they're on site - so it's clearly worth doing and the numbers make the case on their own. That's the return you'd be looking at here.",
    partnerResponse:
      "That's the theory. It still doesn't tell me what it does for my property specifically.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
  {
    id: 'pg-r7-narrow-step4-presume',
    label: 'Presume he is deliberately starving the segment',
    description:
      "Frame his family setup as a deliberate choice to leave money on the table. It presumes intent and turns a collaborative probe into an accusation - the wrong register for this operator.",
    playerDialogue:
      "Let's just be honest with each other here - you're deliberately starving a segment that would clearly make you real money, and if we're being straight about it, that choice is the whole problem we're sitting here trying to untangle today.",
    partnerResponse:
      "I came to you with the data and asked for help. Telling me I'm the problem isn't help.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -9,
  },
];

const step4: BranchingStep = {
  id: 'family-probe',
  label: 'Quantify the family value and probe',
  partnerPrompt:
    "What's the specific return if I adjust the family and mobile setup to match our website?",
  options: step4Options,
};

// ───────── Step 5 - Close on optimizing occupancy together ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'pg-r7-narrow-step5-correct',
    label: 'Offer incremental demand and a joint fix',
    description:
      "SME-prescribed close: the platform's value is incremental demand in the low season. Improving the family setup and mobile rate targets a larger audience; an unsold family room is a loss, so propose working together to optimize occupancy.",
    playerDialogue:
      "That's exactly our value - we can help generate incremental demand during the low season. By improving the family room setup and the mobile rate, we target a much larger audience of guests. An unsold family room is a loss, so why don't we work together to optimize your occupancy?",
    partnerResponse:
      "That's a smart way to approach it. I'll have a look at matching our direct website rates for the mobile and family setups.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'pg-r7-narrow-step5-defer',
    label: 'Send him instructions to do it later',
    description:
      "Right plan, lost momentum - handing an operator a to-do for whenever he gets a chance drops the do-it-together energy that just got him to yes.",
    playerDialogue:
      "Great - I'll have my team put together an email with all the steps laid out clearly, and then you can go in and update the family and mobile settings whenever it happens to suit you. There's no rush on our end, so just work through it at your own pace once it lands in your inbox.",
    partnerResponse:
      "Sure, though realistically that'll sit in my inbox for a while.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: 0 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'pg-r7-narrow-step5-cheapest',
    label: 'Tell him he must be the cheapest to recover',
    description:
      "Answer his openness with a requirement to be the lowest price - which pressures a rate reduction and abandons the align-to-his-own-website framing the whole call was built on.",
    playerDialogue:
      "To really recover from where you are now, you'll need to make sure Booking.com is always the single cheapest place anyone can book you - lower than your own website, lower than everyone - because honestly that's the only thing that actually moves the needle here and everything else is just detail around the edges.",
    partnerResponse:
      "So after all that, the ask is just 'be the cheapest'? That's not what I signed up to discuss.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Close on optimizing occupancy together',
  partnerPrompt:
    "We offer a great price, but it's hard to compare our own traffic with the amount you generate - just looking at your search results view, it's a powerful way to be discovered first. And in low-occupancy periods those big family rooms often stay unsold.",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const palaceGrandNarrowR7: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'palace-grand-narrow',
  round: 7,
  issueTreePath: palaceGrandR7IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5],
};
