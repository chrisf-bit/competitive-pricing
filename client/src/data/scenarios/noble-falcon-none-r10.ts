import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { nobleFalconR10IssueTreePath } from './noble-falcon-r10-base';

/**
 * The Noble Falcon Inn - Round 10 - No Parity variant.
 *
 * Source: SME "Round 10" doc, Conversation 3 (No Parity). The AM cannot
 * ask for parity or matching and cannot require a lower price; the
 * compliant ask is for his best available price, with his autonomy
 * preserved. The learner works the empty-room-vs-commission logic, the
 * global-reach net-new value, the family setup fix, and the Risky Guest
 * handle, then closes professionally on the strong no. Violations are
 * taught via required matching / cheapest and ranking threats, never
 * parity language.
 */

const openingAm =
  "Hi Adam, thanks for taking the time today. I wanted to look at your performance - are you ok if we align a bit on the strategy?";

// ───────── Step 1 - Reveal the conversion hit; probe what changed ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'nf-r10-none-step1-correct',
    label: 'Name the page-views-up / conversion-down split; probe the change',
    description:
      "SME-prescribed reveal: page views have increased versus peer, but conversion is taking a hit. Ask what has changed in his pricing strategy that might be influencing this, rather than presuming.",
    playerDialogue:
      "Reports show that your page views have increased versus your peer group, but conversion is taking a hit. What has changed in terms of pricing strategy that might be influencing this?",
    partnerResponse:
      "Our focus has shifted from a general 'revenue' goal to getting exactly how much we want from each channel. We're intentionally driving traffic away from third-party channels to reduce acquisition costs. We accept lower conversion on your platform as a necessary trade-off.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-none-step1-accuse',
    label: 'Tell him his pricing is the problem',
    description:
      "Right that the split matters, wrong route - it presumes the cause and reads as a lecture to a brand-managed manager before you understand his strategy.",
    playerDialogue:
      "Your conversion's tanking because you've priced yourself out of it - that's the issue you need to fix.",
    partnerResponse:
      "You've decided that in seconds. That's not how we run this brand.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'nf-r10-none-step1-fluff',
    label: 'Skip the data and reassure him',
    description:
      "Warm, but it wastes the slot for a process-led revenue manager who agreed to align on strategy.",
    playerDialogue:
      "Honestly, I wouldn't overthink one slow stretch - it tends to even out across a quarter.",
    partnerResponse:
      "I made time to align on strategy. 'It'll even out' isn't that.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the conversion hit; probe what changed',
  partnerPrompt:
    "Hi Mark, yes, let's do that!",
  options: step1Options,
};

// ───────── Step 2 - Probe the cost of an empty room ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'nf-r10-none-step2-correct',
    label: 'Ask him to weigh an empty room against acquisition cost',
    description:
      "SME-prescribed probe: acknowledge it makes sense to look at the distribution mix, then ask how he calculates the true cost of an empty room versus the commission cost of a new guest acquisition - drawing out the trade-off himself.",
    playerDialogue:
      "Thank you for sharing - it makes sense to look at the distribution mix. But let me ask: how do you calculate the true cost of an empty room versus the commission cost of a new guest acquisition?",
    partnerResponse:
      "An empty room is a loss, obviously. But high commission eats our margins. We need to keep our website always more competitive than yours or the other third-party channels.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-none-step2-concede',
    label: 'Agree commission makes his direct-first plan right',
    description:
      "Concedes that keeping his website cheaper is simply the smart call, instead of surfacing the cost of the empty rooms that plan is creating.",
    playerDialogue:
      "That's fair - with commission where it is, keeping your own site cheaper is probably the smart play.",
    partnerResponse:
      "So we agree. Then I'm not sure what you're here to change.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'nf-r10-none-step2-dismiss',
    label: 'Tell him commission worries are overblown',
    description:
      "Waves away a core commercial concern rather than reframing it through the empty-room cost. Dismissing a brand-managed manager's margin logic shuts him down.",
    playerDialogue:
      "Honestly, everyone frets about commission far too much - it's a rounding error next to the volume we bring.",
    partnerResponse:
      "A rounding error? You clearly don't run the P&L I run.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
];

const step2: BranchingStep = {
  id: 'empty-room',
  label: 'Probe the cost of an empty room',
  partnerPrompt:
    "Our focus has shifted from a general 'revenue' goal to getting exactly how much we want from each channel. We're intentionally driving traffic away from third-party channels to reduce acquisition costs. We accept lower conversion on your platform as a necessary trade-off.",
  options: step2Options,
};

// ───────── Step 3 - Best price + autonomy; probe his biggest worry ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'nf-r10-none-step3-correct',
    label: 'Show empty rooms eat margin too; ask for his best price and his worry',
    description:
      "SME-prescribed handle: growing empty rooms eat his margins too, and when his prices aren't competitive travelers gravitate to better-value alternatives on the same page. His pricing is entirely his choice, but offering his best price takes the most from the platform's traffic. Ask what his biggest worry is about giving his best price.",
    playerDialogue:
      "If empty rooms grow, that eats your margins too. When your prices aren't competitive, travelers gravitate to better-value alternatives on the same search page. While your pricing strategy is entirely up to you, offering your best price ensures you take the most out of the traffic our platform drives. What's your biggest worry about giving us your best price?",
    partnerResponse:
      "My main worry is revenue dilution - paying commission for a guest who would have booked directly anyway.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-none-step3-require-cheapest',
    label: 'Tell him he must be cheaper than his own site to recover',
    description:
      "In a No Parity market you cannot require a lower price or matching. Telling him he has to undercut his own website pressures a rate reduction and is a compliance breach.",
    playerDialogue:
      "Realistically, to turn this around you'll need to make Booking.com cheaper than your own website - that's what recovers the conversion.",
    partnerResponse:
      "So the ask is that I have to be the cheapest? I didn't think that was something you could require.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'nf-r10-none-step3-concede',
    label: 'Accept the trade-off and drop the point',
    description:
      "Takes the accepted-lower-conversion trade-off at face value and offers no lever - leaving the empty rooms and the gap unaddressed.",
    playerDialogue:
      "Fair enough - if you've accepted lower conversion here as a trade-off, we can leave it there.",
    partnerResponse:
      "So there's nothing to discuss. Disappointing use of the slot.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step3: BranchingStep = {
  id: 'best-price',
  label: 'Best price + autonomy; probe his biggest worry',
  partnerPrompt:
    "An empty room is a loss, obviously. But high commission eats our margins. We need to keep our website always more competitive than yours or the other third-party channels.",
  options: step3Options,
};

// ───────── Step 4 - Global reach; the net-new international value ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'nf-r10-none-step4-correct',
    label: 'Frame global reach as net-new international demand',
    description:
      "SME-prescribed handle: a large share of the platform's bookers are international travelers who'd never have found his brand otherwise. Making his best price available leverages that visibility at zero cost to fill empty rooms, which he can then convert into loyal direct guests. Ask how that fits his long-term plan.",
    playerDialogue:
      "That's where our global reach adds value. A large share of our bookers are international travelers who'd never have found your brand otherwise. By making your best price available to us, you leverage that visibility at zero cost to fill your empty rooms - and once they stay with you, you can convert them into loyal direct guests. How does that fit into your long-term plan?",
    partnerResponse:
      "It makes sense for international guests, but our brand restrictions are very tight right now.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-none-step4-overclaim',
    label: 'Guarantee a flood of new bookings',
    description:
      "Over-promises a specific outcome the platform can't guarantee. A process-led revenue manager will spot the hollow guarantee and trust you less for it.",
    playerDialogue:
      "Give us your best price and I can pretty much guarantee your empty rooms fill up next month - it always works.",
    partnerResponse:
      "You can guarantee that? That's the kind of promise that makes me trust the pitch less.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'nf-r10-none-step4-dismiss',
    label: 'Brush aside his brand restrictions',
    description:
      "Waves away the brand rules a fully-managed manager is bound by. Telling him his own constraints don't matter is exactly what closes him down.",
    playerDialogue:
      "Brand restrictions are usually more flexible than people think - I wouldn't let them stop you here.",
    partnerResponse:
      "You don't get to decide how flexible my brand rules are. I do.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
];

const step4: BranchingStep = {
  id: 'global-reach',
  label: 'Global reach; the net-new international value',
  partnerPrompt:
    "My main worry is revenue dilution - paying commission for a guest who would have booked directly anyway.",
  options: step4Options,
};

// ───────── Step 5 - Pivot to the family setup fix ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'nf-r10-none-step5-correct',
    label: 'Pivot to family searches; frame it as a setup fix, not a price drop',
    description:
      "SME-prescribed handle: if the broader move isn't allowed, look at targeted opportunities like family searches. Because family rates aren't set correctly, children are priced as adults. His pricing is completely up to him, but correcting the family settings lets families accurately find and book. Offer a low-risk experiment on that segment.",
    playerDialogue:
      "If that's not allowed, let's look at targeted opportunities like family searches. Because your family rates aren't set correctly, children are being priced as adults. While your pricing strategy is completely up to you, correcting those settings just ensures families can accurately find and book your rooms - no base-rate change. Would you be open to a low-risk experiment to optimize that one segment?",
    partnerResponse:
      "Well, we're family-friendly, but that doesn't mean all children pay less than adults. And these family bookings are often high-risk ones - invalid cards, short-notice cancellations if children get sick, and rooms left in a very poor state after they leave.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-none-step5-price-drop',
    label: 'Frame it as dropping the family price',
    description:
      "Right segment, wrong framing - it turns a setup correction into a price cut, which reads as another discount ask to a manager guarding his ADR, and misses the 'no base-rate change' angle.",
    playerDialogue:
      "You just need to drop your family prices here to be competitive and the family bookings will come.",
    partnerResponse:
      "So more discounting. That's the opposite of what I can do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'nf-r10-none-step5-blame',
    label: 'Tell him he should have caught the family setup',
    description:
      "Frames the family mispricing as his oversight rather than a shared setup check. Blaming a brand-managed manager for a config gap ends the collaboration.",
    playerDialogue:
      "Your family rates are wrong on your side - honestly you should have caught this yourself by now.",
    partnerResponse:
      "So now it's my fault as well. This isn't going the way I hoped.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
];

const step5: BranchingStep = {
  id: 'family-pivot',
  label: 'Pivot to the family setup fix',
  partnerPrompt:
    "It makes sense for international guests, but our brand restrictions are very tight right now.",
  options: step5Options,
};

// ───────── Step 6 - Handle the family risk; close professionally on the strong no ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'nf-r10-none-step6-correct',
    label: 'Offer prepayment on family rooms; offer to implement together',
    description:
      "SME-prescribed handle: replicate the strict cancellation or prepayment conditions he uses for high-risk periods on family rooms too, while keeping the base rate competitive - and offer to implement it together on the call. He still ends the call without committing; the win is the compliant, supportive offer that keeps the door open.",
    playerDialogue:
      "Then let's replicate the strict cancellation or prepayment conditions you use for high-risk periods on family rooms too, while keeping the base rate competitive. I'm here to support your occupancy and revenue goals - if there are settings in the way, take the chance of having me on the call and we can implement it together.",
    partnerResponse:
      "This isn't enough to prevent the risks from actually happening, and I don't want to change all the settings again - this isn't the way I want to cooperate. Thank you very much for the opportunity, but I really have to take off the phone. Speak to you soon.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'nf-r10-none-step6-dismiss-risk',
    label: 'Tell him the family risk barely happens',
    description:
      "Waves away a real operational concern instead of engineering around it with prepayment. Dismissing the Risky Guest worry is exactly what hardens his no.",
    playerDialogue:
      "Honestly, that family-risk stuff barely happens - I wouldn't let a few bad bookings hold up a whole segment.",
    partnerResponse:
      "You clearly haven't cleaned the rooms afterward. We're done here.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -8,
  },
  {
    id: 'nf-r10-none-step6-ultimatum',
    label: 'Warn his ranking suffers if he does nothing',
    description:
      "Attaches a visibility threat to his hesitation. Threatening ranking is banned in every regime, and it's the surest way to turn a strong no into a closed door.",
    playerDialogue:
      "Just know that if you do nothing here, your ranking is only going to keep sliding.",
    partnerResponse:
      "Threatening my ranking is exactly why this call is over. Goodbye.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step6: BranchingStep = {
  id: 'close',
  label: 'Handle the family risk; close professionally on the strong no',
  partnerPrompt:
    "Well, we're family-friendly, but that doesn't mean all children pay less than adults. And these family bookings are often high-risk ones - invalid cards, short-notice cancellations if children get sick, and rooms left in a very poor state after they leave.",
  options: step6Options,
};

// ───────── Assembled tree ─────────

export const nobleFalconNoneR10: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'noble-falcon-none',
  round: 10,
  issueTreePath: nobleFalconR10IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5, step6],
};
