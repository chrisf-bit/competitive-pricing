import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { oceanfrontR6IssueTreePath, oceanfrontOpeningAm } from './oceanfront-base';

/**
 * Oceanfront Bliss Lodge - Round 6 - Wide Parity variant.
 *
 * Source: SME "Round 6" doc, Conversation 1 (Wide Parity). In a Wide
 * market the AM may ask Priya for the same rates and availability she
 * gives third parties and her direct channel. The learner must reframe
 * the Brand.com Loyalty / reverse-billboard belief, land the
 * acquisition-cost math, and make the alignment ask - never a flat rate
 * drop. The risky distractors break the ranking-threat and
 * dictate-strategy bans.
 */

// ───────── Step 1 - Reveal the visibility collapse ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ob-r6-wide-step1-correct',
    label: 'Credit the conversion, then name the visibility collapse',
    description:
      "SME-prescribed reveal: acknowledge her conversion is 17% above peer, then surface the hard numbers - page views down 89% vs peers and room nights down 84% year-on-year for the same window.",
    playerDialogue:
      "That's exactly what I want to address. Your conversion rate is actually 17% higher than your peer group. But your page views are down 89% versus your peers, and your room nights are down 84% year-on-year for the same 30-day window.",
    partnerResponse:
      "A drop of 89% in page views is significant. Why is the visibility failing so drastically if our conversion is that high?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-wide-step1-flat-drop',
    label: 'Jump to a flat rate drop',
    description:
      "Skip the diagnosis and prescribe an across-the-board cut. It presumes the fix and hands an ROI-driven owner nothing to weigh - exactly the move she'll ask you to justify later.",
    playerDialogue:
      "Your numbers are down because you're too expensive - the fix is to drop your Booking.com rates across the board and the traffic comes back.",
    partnerResponse:
      "You're telling me to cut all my rates before you've explained a thing. Walk me through the actual problem first.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -5,
  },
  {
    id: 'ob-r6-wide-step1-fluff',
    label: 'Open with a soft check-in',
    description:
      'Warm, no data - the wrong register for an owner who opened by asking exactly what the data shows.',
    playerDialogue:
      "Honestly, I wouldn't read too much into one slow month - how are things going for you otherwise?",
    partnerResponse:
      "I asked what the data shows. If it's just a slow month, tell me; if it isn't, show me.",
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
    "Hello Zara. Thanks for doing that. I can see our production on your platform is dropping. What exactly does the data show? Our direct channel is holding strong - that's our primary focus - but I've noticed our room nights with you are down.",
  options: step1Options,
};

// ───────── Step 2 - Explain the search-price gap ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ob-r6-wide-step2-correct',
    label: 'Connect visibility to the Brand.com price gap',
    description:
      "SME-prescribed explanation: it's about how appealing the offer looks in search - her Booking.com price runs almost 10% higher than her website 65% of the time, which hammers how attractive she looks on the results page and on meta.",
    playerDialogue:
      "It connects to how appealing your offer looks during the search. There's a structural pattern where your Booking.com price is almost 10% higher than your website 65% of the time. That severely affects how attractive your property looks in the results - especially when travelers compare on meta, or against your competitors on our platform.",
    partnerResponse:
      "That is entirely intentional. Booking.com is a direct competitor for us, so we will never let third-party platforms capture more than 30% of our total business. I'd honestly rather leave a room empty during certain windows than compromise our brand.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-wide-step2-concede',
    label: 'Agree the markup drives direct bookings',
    description:
      "Concedes the reverse-billboard premise - that a higher price here is fine because it pushes guests to book direct - and never corrects the belief driving the visibility loss.",
    playerDialogue:
      "That's fair - keeping your Booking.com price higher does push some guests to book direct, so the strategy is basically working.",
    partnerResponse:
      "So the markup is fine? Then I'm not sure what you're here to fix.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ob-r6-wide-step2-lecture',
    label: 'Call the 30% cap a mistake',
    description:
      "Tell her the cap and the direct-cheaper play are simply wrong. Lecturing an owner who just told you the strategy is deliberate shuts the conversation down.",
    playerDialogue:
      "Honestly, the 30% cap and keeping your site cheaper is just a mistake - you're leaving money on the table and you should stop.",
    partnerResponse:
      "I just told you it's deliberate. If you're here to tell me my strategy is a mistake, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step2: BranchingStep = {
  id: 'search-gap',
  label: 'Explain the search-price gap',
  partnerPrompt:
    "A drop of 89% in page views is significant. Why is the visibility failing so drastically if our conversion is that high?",
  options: step2Options,
};

// ───────── Step 3 - Probe the acquisition cost ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ob-r6-wide-step3-correct',
    label: 'Frame it as allies; probe the acquisition cost of the 70%',
    description:
      "SME-prescribed probe: position it as a shared goal, then ask how she's capturing the other 70% and what the acquisition cost is - the question that sets up the ROI math.",
    playerDialogue:
      "We should be allies here - we want the same thing. How are you capturing the remaining 70% of your guests, and what's the acquisition cost for that?",
    partnerResponse:
      "We run marketing campaigns and sponsored ads, and we have a solid reputation with US and Canadian guests. I don't know the exact cost - probably around 10% of the room price on our website.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-wide-step3-push-cap',
    label: 'Push her to lift the 30% cap',
    description:
      "Argue the cap directly instead of probing the economics. Telling an autonomous owner to hand you more volume, before you've earned it with the numbers, gets a fast no.",
    playerDialogue:
      "The real issue is that 30% cap - you should lift it and let us drive a lot more of your business.",
    partnerResponse:
      "The cap isn't up for debate. Give me a reason that isn't just 'give Booking.com more.'",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -7,
  },
  {
    id: 'ob-r6-wide-step3-ranking-threat',
    label: 'Threaten her ranking',
    description:
      "Threaten a further visibility drop unless she aligns. Threatening ranking over her pricing is banned in every regime.",
    playerDialogue:
      "If you keep pricing higher than your own site, our system will keep dropping your visibility until you fix it.",
    partnerResponse:
      "Threatening my ranking over how I price my own website is not how you'll win me over.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step3: BranchingStep = {
  id: 'probe-cost',
  label: 'Probe the acquisition cost',
  partnerPrompt:
    "That is entirely intentional. Booking.com is a direct competitor for us, so we will never let third-party platforms capture more than 30% of our total business. I'd honestly rather leave a room empty during certain windows than compromise our brand.",
  options: step3Options,
};

// ───────── Step 4 - Land the acquisition-cost math + reframe ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ob-r6-wide-step4-correct',
    label: 'Run the acquisition-cost math; reframe to net-new guests',
    description:
      "SME-prescribed reframe: if her rates are ~10% cheaper direct and her acquisition cost is ~10%, her direct acquisition cost is higher than your commission. And this isn't about stealing direct guests - it's finding net-new ones who'd never discover the property.",
    playerDialogue:
      "Look at it from a revenue perspective. If your rates are around 10% cheaper direct and your acquisition cost is also around 10%, then your acquisition cost is actually higher than the commission you pay us. And this isn't about stealing your direct guests - it's about finding new guests who would otherwise never discover the property.",
    partnerResponse:
      "I understand that being more competitive on your platform could be a win for our overall strategy. But how can I measure the impact if we just reduce all the rates at once?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-wide-step4-just-cheaper',
    label: 'Argue you should simply be cheaper than direct',
    description:
      "Right that competitiveness matters, wrong framing - it makes it a discount argument ('be cheaper here') rather than the acquisition-cost case, and it walks straight into her fear of eroding direct.",
    playerDialogue:
      "It's simple, really - you just need your Booking.com price to be lower than your direct site so travelers pick you here.",
    partnerResponse:
      "Undercutting my own website is the opposite of what I want. Give me the commercial case, not a discount.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ob-r6-wide-step4-guilt',
    label: 'Tell her she is losing loyal guests by being stubborn',
    description:
      "Frame her strategy as stubbornness costing her loyal guests. Emotive and accusatory - it burns the ally framing you need with an autonomous owner.",
    playerDialogue:
      "Frankly, you're being stubborn here, and it's costing you the loyal guests you say you care about.",
    partnerResponse:
      "Calling me stubborn about my own business is a strange way to build an alliance.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step4: BranchingStep = {
  id: 'roi-math',
  label: 'Land the acquisition-cost math',
  partnerPrompt:
    "We run marketing campaigns and sponsored ads, and we have a solid reputation with US and Canadian guests. I don't know the exact cost - probably around 10% of the room price on our website.",
  options: step4Options,
};

// ───────── Step 5 - The alignment ask + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ob-r6-wide-step5-correct',
    label: 'Ask for the same rates/availability as her other channels; propose a test',
    description:
      "SME-prescribed ask: frame the platform as a zero-marketing-cost global search engine, ask for the same rates and availability she gives third parties and her direct channel as the first step, and propose starting this week with a measured window.",
    playerDialogue:
      "Our platform is a global search engine at zero marketing cost, reaching audiences who'd never search your site directly. To attract them, we'd ask for the same rates and availability you offer third parties and your direct channel as an effective first step. Could we begin implementing this by the end of the week and monitor the lift?",
    partnerResponse:
      "The math makes sense and the visibility drop is too large to ignore. Let's align the rates to match our direct site today and monitor the traffic lift over the next 14 days.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ob-r6-wide-step5-drop-all',
    label: 'Tell her to reduce all her rates now',
    description:
      "Answer her measurement question with the blanket cut she was worried about - reduce everything at once - which erodes the ADR premium she carries and gives her nothing to measure cleanly.",
    playerDialogue:
      "Simplest thing is to just reduce all your rates now by 10% and watch the volume come back.",
    partnerResponse:
      "That's the 'reduce everything at once' move I just flagged - I can't measure that, and it torches my ADR.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
  {
    id: 'ob-r6-wide-step5-drop-keyota',
    label: 'Tell her to pull rates from her other OTAs',
    description:
      "Direct her to stop feeding the other OTAs and give the good rates only to Booking.com. Instructing an owner on her external channel mix oversteps even in a Wide market.",
    playerDialogue:
      "And to really fix it, stop giving your best rates to the other OTAs - keep them exclusive to us.",
    partnerResponse:
      "You don't get to tell me which channels I work with. That's my call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Make the alignment ask and close',
  partnerPrompt:
    "I understand that being more competitive on your platform could be a win for our overall strategy. But how can I measure the impact if we just reduce all the rates at once?",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const oceanfrontWideR6: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'oceanfront-wide',
  round: 6,
  issueTreePath: oceanfrontR6IssueTreePath,
  openingAm: oceanfrontOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
