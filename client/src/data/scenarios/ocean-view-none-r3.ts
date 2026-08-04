import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { oceanViewR3IssueTreePath } from './ocean-view-base';

/**
 * Ocean View Resort - Round 3 - No Parity variant.
 *
 * Source: SME "Round 3" doc, Conversation 3 (No Parity). In a No Parity
 * market the AM cannot ask for parity or matching and cannot require a
 * lower price; the compliant ask is for her best available price,
 * framed reactively and neutrally with autonomy preserved. Camila
 * pushes back with the Segmented Pricing objection (a mobile rate /
 * limited promotion first); the learner holds best-price as the primary
 * lever while leaving the door open. The word "parity"/"match" never
 * appears, and violations are taught via ranking threats and pressure
 * to be cheapest, not parity language.
 */

// ───────── Step 1 - Data reveal + probe her strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ov-r3-none-step1-correct',
    label: 'Credit the conversion, name the downward trend, probe neutrally',
    description:
      "SME-prescribed reveal: credit her strong on-page conversion (+39% vs peer), note that page views and future bookings are trending down and her prices read as consistently higher here, then ask - neutrally - about her strategy.",
    playerDialogue:
      "On your performance with us: it's very positive that once a traveler lands on your page, your conversion is 39% higher than your competitors. But both your page views and your future bookings are trending down, and we can see your prices here are consistently higher than on other channels. Can you tell me more about the strategy?",
    partnerResponse:
      "It's about channel costs. We intentionally keep our website prices lower to stimulate travelers to leave the OTAs and book directly with us. We see your search results as a powerful 'window' to get our name out - but we want the transaction on our website.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-none-step1-prescribe',
    label: 'Prescribe a price cut before understanding her strategy',
    description:
      "Jumps to a public price cut without understanding her channel strategy - and pressuring a lower price is off-limits in a No Parity market.",
    playerDialogue:
      "Your bookings are down - the quickest fix is to drop your public price here so you're competitive again.",
    partnerResponse:
      "You're prescribing a price cut before you understand our channel strategy at all.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -5,
  },
  {
    id: 'ov-r3-none-step1-fluff',
    label: 'Sympathise with no data behind it',
    description:
      'Warm but empty - no numbers, no diagnosis. The wrong register for an evidence-led operator.',
    playerDialogue:
      "That's a shame to hear - I'm sure things will pick up. How's the team otherwise?",
    partnerResponse:
      "No data behind that? Then what are we solving today?",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

const step1: BranchingStep = {
  id: 'probe',
  label: 'Credit conversion, surface the trend, probe',
  partnerPrompt:
    "Good morning, Javier. We're focusing heavily on operational efficiency and, above all, maximizing profitability - which means driving as much volume as possible through our own website.",
  options: step1Options,
};

// ───────── Step 2 - Counter the reverse-billboard belief ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ov-r3-none-step2-correct',
    label: 'Explain search behavior; keep autonomy, surface her concern',
    description:
      "SME-prescribed counter: travelers don't open a new window to find her direct site - they pick a better-value alternative on the same page. Her strategy is hers, but her best price protects those bookings. Then ask for her biggest concern.",
    playerDialogue:
      "Thank you for sharing. But when your prices aren't competitive here, travelers don't open a new window to find your direct site - they gravitate to better-value alternatives on the same search page. Your pricing strategy is entirely up to you, but offering your best price ensures you don't lose those bookings. What's your biggest concern?",
    partnerResponse:
      "My main concern is that if I offer my lowest public price on Booking.com, I'm giving up my unique commercial advantage.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-none-step2-concede',
    label: 'Half-agree with the billboard theory',
    description:
      "Concedes the flawed premise that the exposure alone does the job, offering only a token nudge - never correcting the belief driving the problem.",
    playerDialogue:
      "You're right that the exposure helps - maybe a small discount at the margin would nudge a few more over.",
    partnerResponse:
      "So the markup's fine, then? What are we actually fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ov-r3-none-step2-lecture',
    label: 'Call her strategy a myth',
    description:
      "Dismiss the direct-booking belief as a myth and travelers as lazy. Condescending to an experienced operator.",
    playerDialogue:
      "The 'they'll book direct' idea is honestly a myth - travelers just book whatever's cheapest in front of them.",
    partnerResponse:
      "Calling my strategy a myth isn't the way to have this conversation.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step2: BranchingStep = {
  id: 'billboard-counter',
  label: 'Counter the reverse-billboard belief',
  partnerPrompt:
    "It's about channel costs. We intentionally keep our website prices lower to stimulate travelers to leave the OTAs and book directly with us. We see your search results as a powerful 'window' to get our name out - but we want the transaction on our website.",
  options: step2Options,
};

// ───────── Step 3 - The best-price ask ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ov-r3-none-step3-correct',
    label: 'Ask for her best price; the billboard only works if she is seen',
    description:
      "SME-prescribed ask: because the platform is a search engine, if she loses most of her traffic the billboard doesn't work at all - it hurts both channels. Her best available price improves ranking and leverages visibility at zero upfront cost.",
    playerDialogue:
      "That's a valid concern. But because our platform is a search engine, if you're losing most of your potential traffic, that 'billboard' effect doesn't work at all - it hurts both channels. By making your best competitive price available to us, you improve your search ranking and leverage our visibility at zero upfront cost to fill empty rooms.",
    partnerResponse:
      "How about a limited-time promotion or a mobile rate for a couple of months, to see if that works first?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-none-step3-general-discount',
    label: 'Push a general public discount',
    description:
      "Falls back on a blanket discount across her rooms - the ADR erosion she's protecting, and pressure to lower prices a No Parity market doesn't permit.",
    playerDialogue:
      "Simplest is to put a general discount across your rooms here and you'll climb back up the results.",
    partnerResponse:
      "A blanket discount is me giving up my whole advantage - that's my exact worry.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
  {
    id: 'ov-r3-none-step3-ranking-threat',
    label: 'Threaten her ranking to force a cut',
    description:
      'Threaten an automated ranking penalty tied to how she prices her own site. In a No Parity market you cannot require lower prices or threaten visibility over external prices.',
    playerDialogue:
      "If your price here stays above your own site, our system keeps burying you - you'll have to lower it to recover.",
    partnerResponse:
      "Threatening my ranking to force a cut is not a conversation I'll have.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step3: BranchingStep = {
  id: 'best-price-ask',
  label: 'Ask for her best available price',
  partnerPrompt:
    "My main concern is that if I offer my lowest public price on Booking.com, I'm giving up my unique commercial advantage.",
  options: step3Options,
};

// ───────── Step 4 - Hold best price vs the segmented pushback ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ov-r3-none-step4-correct',
    label: 'Hold best price as primary; keep the door open to alternatives',
    description:
      "SME-prescribed handling of the Segmented Pricing pushback: acknowledge the targeted promotion feels safer and name the shared goal, but the best price is the most powerful action to recover visibility - and if it underdelivers, you'll investigate alternatives together.",
    playerDialogue:
      "I understand a targeted promotion feels like the safer move, and I think we share the same goal. To genuinely recover your visibility, offering your best price is the most powerful action. If it doesn't generate the revenue you need, we can absolutely investigate the alternatives together.",
    partnerResponse:
      "You've given me a lot of data to think about. A big drop in page views means we're losing guests right at the start. Let's do this: I'll commit to a three-week trial offering our best competitive base rate here, and we'll review the traffic data to make sure the total portfolio improves.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-none-step4-fold',
    label: 'Fold to the mobile rate and drop the best-price ask',
    description:
      "Capitulates to a mobile rate only, abandoning the best-price action the SME identifies as the primary lever for visibility - it hands her the weaker plan.",
    playerDialogue:
      "Sure, let's just run the mobile rate for now and skip the base price.",
    partnerResponse:
      "If even you don't back the best price, why did you raise it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ov-r3-none-step4-force-cheapest',
    label: 'Push her to be the cheapest everywhere',
    description:
      "Pressure her to price below her own site so she's the best deal anywhere. Requiring a partner to undercut and be cheapest is exactly what a No Parity market forbids.",
    playerDialogue:
      "To really win, make your Booking.com price the lowest anywhere - below your own site - and you'll lock in the volume.",
    partnerResponse:
      "Pricing below my own site to be cheapest everywhere is off the table.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step4: BranchingStep = {
  id: 'hold-best-price',
  label: 'Hold best price against the segmented pushback',
  partnerPrompt:
    "How about a limited-time promotion or a mobile rate for a couple of months, to see if that works first?",
  options: step4Options,
};

// ───────── Step 5 - Lock the trial + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ov-r3-none-step5-correct',
    label: 'Confirm the trial, the metric and the follow-up',
    description:
      "SME-prescribed close: confirm the three-week best-price trial, agree you'll review the traffic and revenue, and book the follow-up so it lands.",
    playerDialogue:
      "Great, Camila - let's do exactly that. We'll agree what we're reviewing, and I'm sending a calendar invite for our follow-up to share the results in three weeks.",
    partnerResponse:
      "Perfect. Let's review the traffic and revenue together in three weeks.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ov-r3-none-step5-vague',
    label: 'Agree, but leave it vague',
    description:
      "Takes the win but pins no metric and no review date - a plan an evidence-led operator will let drift.",
    playerDialogue:
      "Great, I'll get it set up and check in at some point to see how it's going.",
    partnerResponse:
      "'At some point'? Give me the review date and what we're measuring, or this drifts.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ov-r3-none-step5-overreach',
    label: 'Push to be the lowest everywhere on top',
    description:
      "Overreach past the trial - pressure her to also undercut her own site so she's cheapest anywhere. Requiring her to be the cheapest is off-limits in a No Parity market.",
    playerDialogue:
      "Perfect - and to be safe, let's make sure your price here is the lowest anywhere, below your own site, so you lock in the volume.",
    partnerResponse:
      "Being cheapest everywhere, below my own site, is not something I'll do. Let's keep to the trial.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -12,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Lock the trial and close',
  partnerPrompt:
    "You've given me a lot of data to think about. A big drop in page views means we're losing guests right at the start. Let's do this: I'll commit to a three-week trial offering our best competitive base rate here, and we'll review the traffic data to make sure the total portfolio improves.",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const oceanViewNoneR3: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'ocean-view-none',
  round: 3,
  issueTreePath: oceanViewR3IssueTreePath,
  openingAm:
    'Good morning, Camila. Thank you for taking my call. How are you and your team balancing your portfolio priorities as we head into peak season?',
  steps: [step1, step2, step3, step4, step5],
};
