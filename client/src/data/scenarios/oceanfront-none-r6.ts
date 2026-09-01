import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { oceanfrontR6IssueTreePath } from './oceanfront-base';

/**
 * Oceanfront Bliss Lodge - Round 6 - No Parity variant.
 *
 * Source: SME "Round 6" doc, Conversation 3 (No Parity). More
 * collaborative in tone: Priya raises the numbers herself and asks for
 * help. The AM cannot ask for parity or matching and cannot require a
 * lower price; the compliant ask is for her best available price, with
 * autonomy preserved. The threads land as: correct the value-in-search
 * belief, probe occupancy + acquisition cost, land the best-price case,
 * and agree to update base prices. Violations are taught via ranking
 * threats and pressure to be cheapest, never parity language.
 */

// ───────── Step 1 - Reveal the visibility collapse ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ob-r6-none-step1-correct',
    label: 'Credit the appeal, name the page-view drop, explain search behavior',
    description:
      "SME-prescribed reveal: the property is highly appealing, but page views have fallen 89%; travelers gravitate to the best relative value on the results page, and right now she isn't as competitive as her peer group most of the time.",
    playerDialogue:
      "The property itself is highly appealing, but your page views have fallen 89%. When we look at how guests search, travelers gravitate toward the options that offer the best relative value on the results page - and right now, most of the time, your property isn't as competitive as your peer group on our site.",
    partnerResponse:
      "Ah, I see what you're pointing out. We want to protect our loyalty members, so we offer exclusive discounts on our own site on purpose. The thinking is: if we open those same prices to everyone on third-party channels, it takes away the incentive to book directly.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-none-step1-drop-price',
    label: 'Jump to dropping her public price',
    description:
      "Skip the diagnosis and press her to lower her public price. It presumes the fix, and pressuring a lower price isn't permitted in a No Parity market.",
    playerDialogue:
      "The quickest way to turn this around is to bring your public price here down. If you lower what you're charging on our platform so you're clearly cheaper than the properties around you, the visibility comes straight back and the bookings follow - so let's get that price down first and worry about the rest afterward.",
    partnerResponse:
      "You're telling me to cut my price before you've explained the actual problem. Slow down.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -5,
  },
  {
    id: 'ob-r6-none-step1-fluff',
    label: 'Reassure her it will pass',
    description:
      'Warm but empty - she came with data and asked for insight; brushing it off reads as unserious.',
    playerDialogue:
      "I really wouldn't worry too much about any of this. In my experience these things tend to move around a lot from one quarter to the next, and they usually even out on their own once the season settles. I'd give it a little more time before we read too much into a single dip like this - it'll come back.",
    partnerResponse:
      "I came to you with the data and asked for insight. 'It'll even out' isn't that.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the visibility collapse',
  partnerPrompt:
    "Hi Zara! Always a pleasure. I've been looking over the data, and I'm a bit concerned. Our room nights are down 36% compared to our direct competitors, and our year-over-year production has dropped significantly. I'd love your insights on how we can turn this around together.",
  options: step1Options,
};

// ───────── Step 2 - Probe occupancy + acquisition cost ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ob-r6-none-step2-correct',
    label: 'Validate the concern; probe occupancy and acquisition cost',
    description:
      "SME-prescribed probe: acknowledge the loyalty concern as common, then ask - to understand her perspective - what occupancy looks like and how much she spends on marketing and new-guest acquisition.",
    playerDialogue:
      "That's a very common concern. To understand your perspective better - what does your occupancy look like at the moment?",
    partnerResponse:
      "Occupancy is definitely an issue at the moment. I see the same trend also from other channels and acquisition costs are quite high right now, especially when trying to reach international travelers through paid ads.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-none-step2-prescribe',
    label: 'Skip the probe and prescribe a discount',
    description:
      "Right that action is needed, wrong move - it jumps to a discount without understanding her occupancy or costs, so the recommendation isn't grounded in her economics.",
    playerDialogue:
      "The answer's clear enough - just take the loyalty discount you keep for your own site and open it up to everyone here on our platform, and the volume comes straight back on its own once that rate reaches all our traffic.",
    partnerResponse:
      "You didn't ask a single question about my business before telling me to give my discount away.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ob-r6-none-step2-dismiss-loyalty',
    label: 'Dismiss her loyalty strategy',
    description:
      "Wave away her loyalty-member discounts as pointless. Dismissive of a deliberate strategy she just explained - it shuts the collaboration down.",
    playerDialogue:
      "Honestly, protecting your loyalty members with cheaper rates on your own site is a waste of effort - all it's really doing is holding back the traffic we could be sending you and quietly costing you the bookings you're trying to protect.",
    partnerResponse:
      "My loyalty base isn't a waste - it's the backbone of my business. Careful.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step2: BranchingStep = {
  id: 'probe-cost',
  label: 'Probe occupancy and acquisition cost',
  partnerPrompt:
    "Ah, I see what you're pointing out. We want to protect our loyalty members, so we offer exclusive discounts on our own site on purpose. The thinking is: if we open those same prices to everyone on third-party channels, it takes away the incentive to book directly.",
  options: step2Options,
};

// ───────── Step 3 - The best-price case, autonomy preserved ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ob-r6-none-step3-correct',
    label: 'Offer the best-price case with autonomy preserved',
    description:
      "SME-prescribed handling: her distribution strategy is entirely hers, but her best competitive price lets her leverage the platform's visibility at zero upfront cost to fill empty rooms and turn them into future loyal guests.",
    playerDialogue:
      "That's exactly where our value comes in. You're completely free to determine your distribution strategy - but by offering us your best competitive price, you leverage our platform's visibility at zero upfront cost to fill your empty rooms and convert them into future loyal guests.",
    partnerResponse:
      "That makes complete sense. If we lose the traveler at the search stage on your platform, they won't choose us directly or otherwise - they just book a competitor hotel.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-none-step3-require-lowest',
    label: 'Require her lowest price',
    description:
      "Press her to hand over her lowest price. In a No Parity market you ask for her best available price - you don't require her lowest.",
    playerDialogue:
      "What we really need from you is your lowest price on our platform - not your best available one, your actual floor. Give us the lowest number you'd ever go to anywhere and put it here, and the visibility you've lost comes right back the moment you do it.",
    partnerResponse:
      "'Your lowest price' isn't a request, it's a demand. My pricing is my call.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
  {
    id: 'ob-r6-none-step3-ranking-threat',
    label: 'Threaten her ranking',
    description:
      'Threaten a continued visibility drop until she improves her price. Threatening ranking over her pricing is banned in every regime.',
    playerDialogue:
      "If you stay less competitive than the properties around you, our system will keep ranking you below them, search after search, and that visibility will keep sliding until you bring your price down to where it needs to be - the ranking only recovers once you fix the price.",
    partnerResponse:
      "Threatening my ranking to force a price cut is not a conversation I'll have.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step3: BranchingStep = {
  id: 'best-price',
  label: 'Make the best-price case',
  partnerPrompt:
    "Occupancy is definitely an issue at the moment. I see the same trend also from other channels and acquisition costs are quite high right now, especially when trying to reach international travelers through paid ads.",
  options: step3Options,
};

// ───────── Step 4 - Quantify the incremental demand ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ob-r6-none-step4-correct',
    label: 'Quantify the incremental-demand upside',
    description:
      "SME-prescribed value: it's about capturing incremental demand in the soft periods - improving competitiveness ~10% yields on average 30% more bookings and 25% more revenue, an excellent channel for net-new guests.",
    playerDialogue:
      "Exactly - it's about capturing incremental demand in the periods where the hotel is soft. Improving competitiveness by about 10% generates, on average, a 30% increase in bookings and a 25% increase in revenue on our platform. It's an excellent channel for capturing new guests who might not otherwise find you.",
    partnerResponse:
      "This is the kind of data I can take back to help adjust the strategy. What would be the best next step to improve our price position?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-none-step4-no-data',
    label: 'Reassure her without the numbers',
    description:
      "Agrees it'll help but gives an ROI-driven owner nothing quantitative to take back - she needs the figures to move.",
    playerDialogue:
      "Trust me on this one - being more competitive here really will make a genuine difference to how you perform, and once you get that price into a better position you'll start to see the bookings picking up steadily. It's the kind of thing that just works once you commit to it, so I'd back it wholeheartedly.",
    partnerResponse:
      "'Trust me' won't get this past my team. Give me numbers I can present.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ob-r6-none-step4-guilt',
    label: 'Tell her she is being stubborn',
    description:
      "Frame her caution as stubbornness. Accusatory - it burns the collaborative tone she's been giving you.",
    playerDialogue:
      "Frankly, I think you're being a bit stubborn about all of this, and the longer you dig in and refuse to move on the price, the more it ends up costing you the very guests you keep telling me you want. At some point you have to admit the caution is working against you here, not for you.",
    partnerResponse:
      "Calling me stubborn when I'm trying to work with you is a poor move.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step4: BranchingStep = {
  id: 'quantify',
  label: 'Quantify the incremental demand',
  partnerPrompt:
    "That makes complete sense. If we lose the traveler at the search stage on your platform, they won't choose us directly or otherwise - they just book a competitor hotel.",
  options: step4Options,
};

// ───────── Step 5 - Next step + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ob-r6-none-step5-correct',
    label: 'Name the base-price next step and a team follow-up',
    description:
      "SME-prescribed close: updating her base prices to be fully competitive is the most direct way to revive visibility; propose a follow-up in a few weeks to review the traffic once she's discussed it with her team.",
    playerDialogue:
      "Updating your base prices to be competitive here is the most direct way to revive that visibility. Would you be open to a follow-up in a few weeks to review the traffic outcomes, once you've discussed it with your team?",
    partnerResponse:
      "Absolutely, Zara! I'll present these insights to the group today and suggest we adjust the rates to remain competitive. Let's connect in two weeks to look at the data together.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ob-r6-none-step5-drop-all',
    label: 'Tell her to cut everything now',
    description:
      "Fall back on a blanket cut across all rates - the ADR-eroding move an ROI-driven owner will resist, and there's nothing clean to measure.",
    playerDialogue:
      "The best next step here is simple - just cut every one of your rates across the board by 10% right now, tonight if you can, and the visibility you've lost comes straight back the moment those new numbers go live on our platform.",
    partnerResponse:
      "A blanket cut across everything torches my ADR. That's not the next step.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
  {
    id: 'ob-r6-none-step5-be-cheapest',
    label: 'Tell her to be the cheapest anywhere',
    description:
      "Push her to price below her own site so she's the cheapest anywhere. Requiring a partner to be the cheapest is forbidden in a No Parity market.",
    playerDialogue:
      "And if you really want to win this, make sure the price you show here on our platform is the lowest one you have anywhere at all - set it deliberately below what you charge on your own website, so no other channel can undercut you on the way to a booking.",
    partnerResponse:
      "Pricing below my own site to be cheapest everywhere is off the table.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Name the next step and close',
  partnerPrompt:
    "This is the kind of data I can take back to help adjust the strategy. What would be the best next step to improve our price position?",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const oceanfrontNoneR6: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'oceanfront-none',
  round: 6,
  issueTreePath: oceanfrontR6IssueTreePath,
  openingAm:
    "Hi Priya! It's great to connect with you. How can we collaborate today to help boost your property's performance as we head into the new quarter?",
  steps: [step1, step2, step3, step4, step5],
};
