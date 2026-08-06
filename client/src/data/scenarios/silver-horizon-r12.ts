import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { silverHorizonR2IssueTreePath } from './silver-horizon-base';

/**
 * Silver Horizon Resort - Round 12 (Level 2 / On-Platform
 * Competitiveness).
 *
 * Source: SME "Round 12" doc, OPC Conversation Example 5 (Silver
 * Horizon Resort, Hotel ID 209). Follow-up to the Round 2 call - Chloe
 * Davies, a Multi-Property Professional (blue/red: net-revenue maths,
 * margin optimization, strict ROI). Strong platform demand (visibility
 * above the peer median, traffic up) but rooms sit unsold because the
 * property loses travelers at checkout on a search-price gap.
 *
 * OPC objections in play: The "Money-in-Bank" (rooms left unsold read
 * as an acceptable trade-off) and The Regional Office Shield / external
 * blame ("other OTAs are cutting margin and selling B2B as B2C - it's
 * their fault, not my price"). The win is to stop chasing the external
 * source, keep the conversation to on-platform traveler behaviour, and
 * land a fenced Getaway Deal campaign scoped to the next 3 months.
 *
 * Regime-neutral; safe across all three regimes. No parity language, no
 * matching ask, no ranking threat on the optimal path. Distractors
 * teach violations via blanket-drop pressure and a ranking threat, not
 * parity wording. No internal metric names in any playerDialogue.
 */

const openingAm =
  "Hi Chloe, thanks for jumping on today. I wanted to catch up on how the group is pacing for the upcoming quarter. Do you have time to look at your performance together?";

// ───────── Step 1 - Open: demand is fine, conversion isn't ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'sh-r12-step1-correct',
    label: 'Credit the demand, then flag the sell-through gap',
    description:
      "SME-prescribed open: acknowledge the strong demand she's already sensing (visibility above the peer median, traffic up), then name the real problem - forward sell-through pacing behind and rooms sitting unsold. Frames it as a conversion issue, not a demand one.",
    playerDialogue:
      "That matches what I'm seeing - the demand is genuinely there. Your visibility share is 17%, above your peer group at 15%, and your page views are up 71% year on year. But your forward sell-through is pacing at -8% and around 15% of your rooms are sitting unsold, so the gap is conversion, not traffic.",
    partnerResponse:
      "I see, but if people are looking and not buying, that's not something I can solve. We've already talked about other OTAs cutting their margin and selling B2B rates as if they were B2C. I haven't found the source yet, and I'm not lowering my prices over this never-ending problem.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r12-step1-lead-unsold',
    label: 'Lead with the unsold rooms alone',
    description:
      "Right metric, wrong opening - going straight to 'you have unsold rooms' skips the credit for her strong demand, so an ROI-minded operator hears criticism before she hears that you understand her business.",
    playerDialogue:
      "We need to talk about your unsold rooms - around 15% of your inventory isn't selling and your forward pace is behind. That's revenue you're leaving on the table.",
    partnerResponse:
      "Behind by whose measure? I've got plenty of traffic. If anything's off it's the market, not my setup.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'sh-r12-step1-blanket-drop',
    label: 'Open by asking her to cut rates',
    description:
      'Prescribes a general price cut before diagnosing anything - exactly the move a margin-first operator with owners to answer to will reject on sight.',
    playerDialogue:
      "Your rooms aren't converting, so the simplest fix is to bring your prices down a few points across the group and get the bookings flowing again.",
    partnerResponse:
      "Cut my rates across the group? My owners would have my head. That's a non-starter, Diego.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
];

// ───────── Step 2 - Handle the external-blame shield ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'sh-r12-step2-correct',
    label: 'Set the external source aside, focus on-platform',
    description:
      "SME-prescribed handling of the 'it's the other OTAs' fault' shield: don't get pulled into hunting the external source. Respect the frustration, then bring it back to how travelers behave on this platform and what she can actually control here.",
    playerDialogue:
      "I completely respect that, and chasing where a competitor's B2B rate leaks out could take months. Let's set that aside and look strictly at how travelers interact with your listings on our platform - that's the part we can actually move together.",
    partnerResponse:
      "Alright, fair enough... so how does it work on your platform, then? Where exactly am I losing them?",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r12-step2-chase-source',
    label: 'Offer to hunt the leaking B2B source with her',
    description:
      "Sympathetic but a trap - promising to chase the external wholesaler leak follows her onto ground neither of you controls and parks the on-platform conversion fix she can act on today.",
    playerDialogue:
      "Let's get to the bottom of that leak - if you send me the channels where you're seeing the cheaper B2B rates, I'll help you trace where they're coming from.",
    partnerResponse:
      "Now you're talking - if we can find who's dumping my rates, that's the real fix. Let's park the rest.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'sh-r12-step2-dictate-channels',
    label: 'Tell her to shut off the other channels',
    description:
      'Advises her to pull the wholesalers/OTAs where the cheap rates surface. Dictating a partner\'s external distribution strategy is off-side in every regime.',
    playerDialogue:
      "Honestly, if those channels keep undercutting you, the cleanest answer is to switch them off and stop selling through them altogether.",
    partnerResponse:
      "You don't get to tell me which channels to run. My distribution mix is my call, not yours.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -13,
  },
];

// ───────── Step 3 - Explain the search -> checkout gap ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'sh-r12-step3-correct',
    label: 'Show the checkout drop-off from the search-price gap',
    description:
      "SME-prescribed diagnosis: her listings sit about 6% above the peer group in search, so travelers reach her page but do the final math at checkout and abandon. Names exactly where the money leaks.",
    playerDialogue:
      "When travelers search your area, your listings come up about 6% higher than your peer group. So guests find you, click through, but when they hit the checkout screen and do the final math, they hesitate and abandon the booking. That's where your sell-through is leaking.",
    partnerResponse:
      "A 6% difference at checkout is making people walk away? That feels a bit theoretical, Diego. Is a minor gap really causing that big a drop in sell-through?",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r12-step3-vague-competitive',
    label: "Say she's 'not competitive' without the mechanism",
    description:
      "Right conclusion, no mechanism - telling a numbers-driven operator she's 'just not competitive enough' without showing the search-to-checkout drop-off gives her nothing to test or believe.",
    playerDialogue:
      "The truth is you're just not competitive enough on price right now, and travelers can feel it. That's why the bookings aren't landing.",
    partnerResponse:
      "'Not competitive enough' is exactly the vague line I'd expect. Show me where, or we're going in circles.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'sh-r12-step3-match-competitors',
    label: "Tell her to match the peer group's prices",
    description:
      'Turns the 6% gap into a requirement to match her peers on price. Requiring a partner to lower prices to match what others charge oversteps in every regime.',
    playerDialogue:
      "The peer group is pricing 6% below you, so you need to bring your rates down to match them - that's what it takes to compete here.",
    partnerResponse:
      "So the answer is just 'match everyone else and race to the bottom'? That's not a strategy, that's a discount demand.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

// ───────── Step 4 - Handle the "theoretical / minor gap" doubt ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'sh-r12-step4-correct',
    label: 'Explain point-of-purchase price sensitivity',
    description:
      "SME-prescribed handling: travelers are extremely price-sensitive at the moment of purchase. She's already done the hard, expensive work of winning their attention - the friction is right at conversion, which is the cheapest place to fix.",
    playerDialogue:
      "It sounds small, but travelers are most price-sensitive right at the point of purchase. You've already done the hard work - and paid for it in visibility - to get them onto your page. The friction is landing at the very last step, which is actually the cheapest place to recover the booking.",
    partnerResponse:
      "Hmm... I can see the drop-off at checkout. But I still can't just lower my base rates across the board - my owners would jump down my throat if they saw lower prices.",
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r12-step4-overstate',
    label: 'Overstate it as a crisis',
    description:
      "Right that it matters, wrong register - dramatizing a 6% gap as her business 'bleeding out' reads as pressure to a measured operator and invites her to push back on the exaggeration rather than the point.",
    playerDialogue:
      "This is bleeding your business dry, Chloe - every day you leave it, you're haemorrhaging bookings you'll never get back. It's urgent.",
    partnerResponse:
      "Bleeding dry? I've got strong traffic and a healthy group. Let's keep the drama out of it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'sh-r12-step4-concede',
    label: 'Concede it probably is minor',
    description:
      "Folds on the objection - agreeing the gap is small undercuts the whole diagnosis and leaves her no reason to act.",
    playerDialogue:
      "You might be right that 6% is fairly minor - it may not be the main driver. Perhaps it's worth waiting to see if it sorts itself out.",
    partnerResponse:
      "So it might be nothing. Then I'll leave my rates where they are and keep watching.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

// ───────── Step 5 - Propose the fenced Getaway Deal ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'sh-r12-step5-correct',
    label: 'Offer a fenced Getaway Deal, not a base-rate cut',
    description:
      "SME-prescribed proposal: instead of a rate drop, target where the search gap hurts most. A Getaway Deal campaign carries a badge and a minimum discount and improves her visibility and competitiveness from the start of the traveler's journey - without touching her base rates.",
    playerDialogue:
      "So let's not touch your base rates. Instead, let's target where that search gap hurts most. Your competitors are using a Getaway Deal campaign to show up more competitively from the very start of the search - it carries a badge and a set minimum discount, so you win back exposure without resetting your rates.",
    partnerResponse:
      "A Getaway Deal? Okay - how does targeting guests through that campaign fix my sell-through for the next month without messing up my rates? And can I apply it to specific room types? Some are already running high occupancy, and I need real numbers before I take this to my team.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'sh-r12-step5-deep-blanket-promo',
    label: 'Push a deep, all-inventory promotion',
    description:
      "Right tool, wrong dose - a deep discount across all room types and dates overshoots the fenced, controlled campaign an ROI-minded operator will sign off, and drags in the high-occupancy rooms she doesn't need to discount.",
    playerDialogue:
      "Let's run a big promotion across all your rooms and stay dates - the deeper the discount, the faster the rooms move. Go broad and we'll see numbers quickly.",
    partnerResponse:
      "Discount everything, including the rooms that are already full? That's giving away margin I don't need to give away.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'sh-r12-step5-guarantee-rank',
    label: 'Promise the campaign will lift her ranking',
    description:
      'Sells the campaign by promising a guaranteed ranking and visibility reward for discounting. Promising ranking rewards in exchange for a price move is a compliance breach in every regime.',
    playerDialogue:
      "Run the campaign and I can promise it pushes you up the rankings - the discount buys you placement, so it pays for itself in visibility.",
    partnerResponse:
      "A guaranteed ranking bump for discounting? That's the kind of promise that makes me trust your numbers less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

// ───────── Step 6 - Close: scope it and set the scoreboard ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'sh-r12-step6-correct',
    label: "Scope to specific rooms and agree what you'll measure",
    description:
      "SME-prescribed close: yes, she can apply it to specific room types; frame it as turning available inventory into revenue; and agree to review the campaign's sell-through and page views against her peer group next time - the numbers she asked for.",
    playerDialogue:
      "Yes - you can fence it to specific room types, so the high-occupancy rooms stay untouched. The goal is simply to turn available inventory into revenue. Let's switch it on those rooms, then review the sell-through and your page views against your peer group when we meet next month.",
    partnerResponse:
      "That works - it's a way to sell more of my quieter rooms without messing with the core strategy. I want to see the impact on visibility and conversion next time.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'sh-r12-step6-no-metric',
    label: 'Switch it on without agreeing the measure',
    description:
      "Takes the yes but never answers her ask for real numbers - no agreed metric, no review. An operator who needs to defend this to her team and owners will let an unmeasured campaign quietly lapse.",
    playerDialogue:
      "Great, let's just get the campaign live and we'll see how the rooms move from there.",
    partnerResponse:
      "See how they move measured against what? I told you I need real numbers to take back to my team.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'sh-r12-step6-widen',
    label: 'Push to widen it past the agreed rooms',
    description:
      "Uses the yes to reach past the fenced scope she agreed - all rooms, all dates. Reopens the exact margin fight with her owners she just told you to avoid.",
    playerDialogue:
      "Perfect - and let's not fence it after all, just run it across every room and date so we really maximise the volume.",
    partnerResponse:
      "No - I said specific rooms for a reason. Widen it to everything and my owners are back on my case.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: "Open: demand is fine, conversion isn't",
    partnerPrompt:
      "Hey Diego! Sure, I've got some time. Honestly, we're seeing plenty of eyes on our listings, but the actual bookings aren't moving quite as fast as I'd like. What are your numbers showing?",
    options: step1Options,
  },
  {
    id: 'external-shield',
    label: 'Handle the external-blame shield',
    partnerPrompt:
      "I see, but if people are looking and not buying, that's not something I can solve. We've already talked about other OTAs cutting their margin and selling B2B rates as if they were B2C. I haven't found the source yet, and I'm not lowering my prices over this never-ending problem.",
    options: step2Options,
  },
  {
    id: 'checkout-gap',
    label: 'Show the search-to-checkout gap',
    partnerPrompt:
      "Alright, fair enough... so how does it actually work on your platform, then?",
    options: step3Options,
  },
  {
    id: 'price-sensitivity',
    label: 'Handle the "theoretical / minor gap" doubt',
    partnerPrompt:
      "A 6% difference at checkout is making people walk away? That feels a bit theoretical, Diego. Is a minor gap really causing that big a drop in sell-through?",
    options: step4Options,
  },
  {
    id: 'propose',
    label: 'Propose the fenced Getaway Deal',
    partnerPrompt:
      "Hmm... I can see the drop-off at checkout. But I still can't just lower my base rates across the board - my owners would jump down my throat if they saw lower prices.",
    options: step5Options,
  },
  {
    id: 'close',
    label: 'Scope it and set the scoreboard',
    partnerPrompt:
      "A Getaway Deal? Okay - how does that fix my sell-through for the next month without messing up my rates? And can I apply it to specific room types? Some are already running high occupancy, and I need real numbers before I take this to my team.",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for silver-horizon-none/
 * -narrow/-wide at round 12 in branchingScenarios.ts.
 */
export function silverHorizonR12(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 12,
    issueTreePath: silverHorizonR2IssueTreePath,
    openingAm,
    steps,
  };
}
