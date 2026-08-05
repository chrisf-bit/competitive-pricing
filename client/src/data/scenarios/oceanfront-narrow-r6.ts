import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { oceanfrontR6IssueTreePath, oceanfrontOpeningAm } from './oceanfront-base';

/**
 * Oceanfront Bliss Lodge - Round 6 - Narrow Parity variant.
 *
 * Source: SME "Round 6" doc, Conversation 2 (Narrow Parity). In a Narrow
 * market the AM may only ask Priya to align with her own direct website
 * (Brand.com) - never to price against other OTAs. Same beats: reveal the
 * visibility collapse, correct the reverse-billboard belief, land the
 * acquisition-cost math, and land a direct-rate alignment. The risky
 * distractors break the other-OTA and ranking-threat bans.
 */

// ───────── Step 1 - Reveal the visibility collapse ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ob-r6-narrow-step1-correct',
    label: 'Credit the conversion, then name the visibility collapse',
    description:
      "SME-prescribed reveal: her conversion is outstanding - 17% above her local peer group - but page views are down 89%, and the likely root cause is a Booking.com price running ~10% higher than her website 66% of the time.",
    playerDialogue:
      "Let's look at the data together. When guests find your property, your conversion rate is outstanding - beating your local peer group by 17%. But your page views are down 89%. The likely root cause is that your Booking.com price is consistently around 10% higher than your website 66% of the time.",
    partnerResponse:
      "Let's be honest, Zara. That's entirely by design. I want travelers to find us on Booking.com, see the higher price, and think, 'let me go to their direct website for a better deal.' It's a practical tool to drive direct bookings and save on costs.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-narrow-step1-flat-drop',
    label: 'Jump to a flat rate drop',
    description:
      "Skip the diagnosis and prescribe an across-the-board cut - it presumes the fix and hands an ROI-driven owner nothing to weigh.",
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
    id: 'ob-r6-narrow-step1-fluff',
    label: 'Open with a soft check-in',
    description:
      'Warm, no data - the wrong register for an owner who just asked what is going on with her visibility.',
    playerDialogue:
      "Honestly, I wouldn't read too much into one slow month - how are things going for you otherwise?",
    partnerResponse:
      "I asked what's going on with my visibility. If it's just a slow month, tell me; if it isn't, show me.",
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
    "Well, Zara, we're seeing traction locally, but our volume through you has slowed down significantly compared to last year. What's going on with our visibility on your platform?",
  options: step1Options,
};

// ───────── Step 2 - Correct the reverse-billboard belief ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ob-r6-narrow-step2-correct',
    label: 'Explain how travelers actually search; probe the website cost',
    description:
      "SME-prescribed counter: when travelers compare side-by-side and her offer isn't attractive, they click a cheaper competitor rather than hunting for her website. Then probe how her direct site is doing and what it costs.",
    playerDialogue:
      "I understand the strategy, but search behavior works a bit differently. When travelers compare properties side-by-side on our platform and your offer isn't attractive, they click a cheaper competitor instead of searching for your website. How is your direct website doing, and how much does it cost to maintain?",
    partnerResponse:
      "We run campaigns and ads on our side, so we can't tell exactly where the traffic comes from, but visibility on our direct website is increasing and that's what we aim for. There's a cost, of course - on average about 10% of our website price.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-narrow-step2-concede',
    label: 'Agree the markup drives direct bookings',
    description:
      "Concedes the reverse-billboard premise and never corrects the belief driving the visibility loss.",
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
    id: 'ob-r6-narrow-step2-lecture',
    label: 'Call her strategy a gimmick',
    description:
      "Dismiss the direct-cheaper play as a gimmick that doesn't work. Lecturing an owner who just told you it's deliberate shuts the conversation down.",
    playerDialogue:
      "Honestly, that 'see it higher, book direct' idea is a gimmick - it doesn't actually work, and you should drop it.",
    partnerResponse:
      "You calling my strategy a gimmick isn't going to get us anywhere.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step2: BranchingStep = {
  id: 'billboard-counter',
  label: 'Correct the reverse-billboard belief',
  partnerPrompt:
    "Let's be honest, Zara. That's entirely by design. I want travelers to find us on Booking.com, see the higher price, and think, 'let me go to their direct website for a better deal.' It's a practical tool to drive direct bookings and save on costs.",
  options: step2Options,
};

// ───────── Step 3 - Ask for direct-rate alignment ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ob-r6-narrow-step3-correct',
    label: 'Ask her to match her direct rates to protect discoverability',
    description:
      "SME-prescribed ask: if visibility is fine on her website, improve it here too - matching her direct rates wins the guests who start on our platform and protects her ranking and discoverability.",
    playerDialogue:
      "If visibility is fine on your website, why not improve it on our platform too? What would help is matching your direct rates here, so you win the guests who start their journey with us and protect your ranking and discoverability.",
    partnerResponse:
      "I see your point about losing them to the guy down the street before they even know who we are. But how does this affect my overall revenue mix if I bring the rates into alignment?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-narrow-step3-undercut',
    label: 'Ask her to price below her own website',
    description:
      "Right that competitiveness matters, wrong ask - undercutting her own site is the opposite of what she wants and skips the neutral direct-alignment framing.",
    playerDialogue:
      "The clean fix is to make your Booking.com price lower than your direct site, so travelers just pick you here.",
    partnerResponse:
      "Undercutting my own website is the opposite of what I want. That's a non-starter.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ob-r6-narrow-step3-other-otas',
    label: 'Tell her to also undercut the other OTAs',
    description:
      "Ask her to make sure she isn't pricier than the other OTAs and match them here. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue:
      "And make sure you're not pricier than the other OTAs either - match them here so you're competitive everywhere.",
    partnerResponse:
      "You can't ask me to price against the other OTAs in this market.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step3: BranchingStep = {
  id: 'align-ask',
  label: 'Ask for direct-rate alignment',
  partnerPrompt:
    "We run campaigns and ads on our side, so we can't tell exactly where the traffic comes from, but visibility on our direct website is increasing and that's what we aim for. There's a cost, of course - on average about 10% of our website price.",
  options: step3Options,
};

// ───────── Step 4 - Land the acquisition-cost math ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ob-r6-narrow-step4-correct',
    label: 'Run the acquisition-cost math; reframe to incremental demand',
    description:
      "SME-prescribed reframe: if she's ~10% cheaper direct and her acquisition cost is ~10%, her direct acquisition cost is higher than your commission - and this is about incremental demand, not stealing her direct guests.",
    playerDialogue:
      "If your rates are around 10% cheaper than Booking.com and the acquisition cost for your direct guests is around 10%, then your acquisition cost is higher than the commission you pay us. This isn't about stealing your direct guests - it's about finding incremental demand.",
    partnerResponse:
      "It's about total revenue stability at the end of the day, isn't it? If I can get some revenue from those empty rooms, it's worth a trial.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ob-r6-narrow-step4-just-cheaper',
    label: 'Make it a discount argument',
    description:
      "Turns the reframe into a plain 'be cheaper here' pitch rather than the acquisition-cost case, and walks into her fear of eroding direct.",
    playerDialogue:
      "Look, the bottom line is you just need to be cheaper on our platform - that's what moves the volume.",
    partnerResponse:
      "'Just be cheaper' isn't a revenue case. Give me the actual economics.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ob-r6-narrow-step4-guilt',
    label: 'Tell her she is being stubborn',
    description:
      "Frame her strategy as stubbornness. Accusatory - it burns the collaborative tone an autonomous owner responds to.",
    playerDialogue:
      "Frankly, you're being stubborn here, and it's costing you the guests you say you care about.",
    partnerResponse:
      "Calling me stubborn about my own business isn't the way to work together.",
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
    "I see your point about losing them to the guy down the street before they even know who we are. But how does this affect my overall revenue mix if I bring the rates into alignment?",
  options: step4Options,
};

// ───────── Step 5 - Confirm the alignment + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ob-r6-narrow-step5-correct',
    label: 'Confirm direct-rate alignment and a monthly review',
    description:
      "SME-prescribed close: confirm matching her rates across both channels so she stops losing those bookings, and propose reviewing the rates now with a month-out check-in.",
    playerDialogue:
      "Exactly. Let's make sure your rates match your direct site so you stop losing those bookings. Why don't we look at the rates now and review the results in a month?",
    partnerResponse:
      "Let's do it, Zara. Let's align the rates and see if we can get those search views back.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ob-r6-narrow-step5-drop-all',
    label: 'Tell her to reduce all her rates now',
    description:
      "Fall back on the blanket cut - reduce everything at once - which erodes her ADR premium and gives her nothing clean to measure.",
    playerDialogue:
      "Simplest thing is to just reduce all your rates now by 10% and watch the volume come back.",
    partnerResponse:
      "An across-the-board cut torches my ADR - that's exactly what I don't want.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
  {
    id: 'ob-r6-narrow-step5-ranking-threat',
    label: 'Threaten a further visibility drop',
    description:
      "Close with a ranking threat if she doesn't align. Threatening visibility over her pricing is banned in every regime.",
    playerDialogue:
      "And to be clear - if you don't align, our system will keep pushing your visibility down until you do.",
    partnerResponse:
      "Ending on a threat about my ranking is the fastest way to lose me. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Confirm the alignment and close',
  partnerPrompt:
    "It's about total revenue stability at the end of the day, isn't it? If I can get some revenue from those empty rooms, it's worth a trial.",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const oceanfrontNarrowR6: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'oceanfront-narrow',
  round: 6,
  issueTreePath: oceanfrontR6IssueTreePath,
  openingAm: oceanfrontOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
