import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { oceanViewR3IssueTreePath } from './ocean-view-base';

/**
 * Ocean View Resort - Round 3 - Wide Parity variant.
 *
 * Source: SME "Round 3" doc, Conversation 1 (Wide Parity). In a Wide
 * market the AM may proactively ask Camila to match her direct-website
 * rates on Booking.com. The learner must counter the reverse-billboard
 * belief with how travelers actually search, then land a base-rate
 * alignment paired with fenced member-only site deals so she keeps her
 * direct incentive. The risky distractors break the ranking-threat and
 * dictate-external-strategy bans.
 */

// ───────── Step 1 - Data reveal + probe her strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ov-r3-wide-step1-correct',
    label: 'Credit the conversion, name the visibility collapse, probe the strategy',
    description:
      "SME-prescribed reveal: acknowledge she converts well once seen, surface the -61% page views / -48% bookings visibility problem, then ask her to walk you through the rate strategy before recommending anything.",
    playerDialogue:
      "You're right. Once travelers reach your page, your portfolio converts well - but there's a visibility problem: your page views are down 61% versus your peer group and your bookings are 48% behind. Can you walk me through the strategy behind the rates you've listed with us?",
    partnerResponse:
      "Based on my experience, we keep your platform marked up by about 5.5% versus our website on purpose. We want guests to discover us on Booking.com, realize it's cheaper to book directly with our agency, and then complete on our site.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-wide-step1-prescribe',
    label: 'Prescribe a rate cut before understanding her strategy',
    description:
      "Names the data but jumps straight to the fix - drop the price - without understanding how she runs her channels. An experienced manager reads that as being sold to.",
    playerDialogue:
      "Your bookings are down 48% - the fix is to bring your Booking.com rates down so travelers stop skipping you. Can we get that set up?",
    partnerResponse:
      "You're prescribing a rate cut before you understand a thing about how we run our channels.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -5,
  },
  {
    id: 'ov-r3-wide-step1-fluff',
    label: 'Sympathise with no data behind it',
    description:
      'Warm but empty - no numbers, no diagnosis. The wrong register for an evidence-led operator.',
    playerDialogue:
      "That's a shame to hear - I'm sure it'll pick up. How's the team doing otherwise?",
    partnerResponse:
      "If you don't have data behind that, I'm not sure what we're solving today.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

const step1: BranchingStep = {
  id: 'probe',
  label: 'Reveal the visibility collapse and probe',
  partnerPrompt:
    "Hello Javier. Our direct website traffic is steady, which is our primary goal - but I've noticed our total booking volume from your platform has been quieter than last year.",
  options: step1Options,
};

// ───────── Step 2 - Counter the reverse-billboard belief ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ov-r3-wide-step2-correct',
    label: 'Explain how travelers actually search',
    description:
      "SME-prescribed counter to the reverse-billboard belief: a traveler who sees a higher price here doesn't hunt for an unknown direct site - they book a cheaper local competitor on the same page. Then probe how she weighs that risk.",
    playerDialogue:
      "I understand the intent. But when a traveler sees a higher price here, they rarely go hunting for a direct site they don't know yet - they just book a cheaper local competitor on the same search page. How do you weigh the risk of losing those guests to local properties entirely?",
    partnerResponse:
      "Some might book elsewhere, but we believe our repeat guests and brand strength capture the serious bookers. Why should we lower our base rate here and risk revenue on our direct channel?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-wide-step2-concede',
    label: 'Half-agree with the billboard theory',
    description:
      "Concedes the flawed premise - that the markup is fine and the exposure does the job - and offers only a token nudge. It never corrects the belief driving the whole problem.",
    playerDialogue:
      "You're right that the exposure helps - maybe a small discount just at the margin would be enough to nudge a few more over.",
    partnerResponse:
      "So you agree the markup is fine? Then what are we actually fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ov-r3-wide-step2-lecture',
    label: 'Call her strategy a myth',
    description:
      "Dismiss the direct-booking belief as a myth and travelers as lazy. Condescending to an experienced operator - it shuts the conversation instead of reframing it.",
    playerDialogue:
      "Honestly, the 'they'll book direct' idea is a myth - travelers are lazy, they just book whatever's cheapest in front of them.",
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
    "Based on my experience, we keep your platform marked up by about 5.5% versus our website on purpose. We want guests to discover us on Booking.com, realize it's cheaper to book directly with our agency, and then complete on our site.",
  options: step2Options,
};

// ───────── Step 3 - The ask: match direct-website rates ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ov-r3-wide-step3-correct',
    label: 'Ask her to match her direct-website rates, backed by data',
    description:
      "SME-prescribed ask: an uncompetitive rate lowers her search placement and the chance a guest ever reaches her site. Quantify the upside, ask her to match her direct-website rates here to restore visibility, and probe the blocker.",
    playerDialogue:
      "Valid concern - but an uncompetitive rate lowers your search placement and the chance a guest ever reaches your website. Improving price competitiveness by 10% here generates on average 25% more revenue. That's why we'd ask you to match your direct-website rates on Booking.com and restore your visibility. What's the main blocker you foresee?",
    partnerResponse:
      "If I match the rates, my direct channel loses its competitive pricing advantage. I have to protect our margin.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-wide-step3-general-drop',
    label: 'Ask for an across-the-board rate drop',
    description:
      "Right that competitiveness matters, wrong tool - a blanket public cut erodes ADR across her whole portfolio and her owners' returns. The SME guidance is explicit: don't ask for a general rate drop.",
    playerDialogue:
      "The simplest move is to bring your public rates down across the board here so you're competitive again.",
    partnerResponse:
      "An across-the-board cut is exactly what erodes my owners' ADR. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
  {
    id: 'ov-r3-wide-step3-ranking-threat',
    label: 'Threaten her ranking over the markup',
    description:
      'Pressure her with an automated ranking penalty tied to how she prices her own site. Threatening ranking/visibility over external prices is banned in every regime.',
    playerDialogue:
      "If you keep pricing higher than your own site, our system will keep pushing you down the rankings until you fix it.",
    partnerResponse:
      "Threatening my ranking over how I price my own website isn't a partnership conversation.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step3: BranchingStep = {
  id: 'match-ask',
  label: 'Ask her to match her direct-website rates',
  partnerPrompt:
    "Some might book elsewhere, but we believe our repeat guests and brand strength capture the serious bookers. Why should we lower our base rate here and risk revenue on our direct channel?",
  options: step3Options,
};

// ───────── Step 4 - The solution: align + member-only deals ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ov-r3-wide-step4-correct',
    label: 'Align public rates; protect her direct incentive with member-only deals',
    description:
      "SME-prescribed solution: align public rates to restore search ranking, while she runs closed, member-only deals on her own site to keep the direct incentive. She keeps the loyalty lever without the public undercut that buries her. Propose a test.",
    playerDialogue:
      "I respect that. What if we aligned your public rates to restore your search ranking, while you run closed, member-only deals on your website to drive direct bookings? You keep your direct incentive without the public undercut that's burying you in search. Base alignment is the most effective lever to restore search power - shall we start a test this week?",
    partnerResponse:
      "Your perspective on search and visibility is logical. Let's align the rates as a test for exactly three weeks. If the revenue doesn't justify it, we'll pivot to targeted promotions we've used before.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-wide-step4-no-protection',
    label: 'Ask her to align and drop the direct advantage',
    description:
      "Asks for the public alignment but offers nothing to protect her direct incentive - the exact concern she just raised - so it reads as asking her to simply give up her advantage.",
    playerDialogue:
      "Just align your public rates with your website and you'll recover the visibility - the direct discount was costing you more than it earned anyway.",
    partnerResponse:
      "You keep asking me to give up my direct advantage without protecting it. That's a non-starter.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ov-r3-wide-step4-dictate',
    label: 'Tell her to stop keeping her site cheaper at all',
    description:
      "Direct her to abandon her cheaper-direct strategy and make Booking.com her main channel. Dictating her external and direct-channel strategy oversteps.",
    playerDialogue:
      "Honestly, the cleanest fix is to stop keeping your website cheaper at all - just make Booking.com your main channel and the problem goes away.",
    partnerResponse:
      "You don't get to tell me to give up my direct channel. We're done if that's the pitch.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step4: BranchingStep = {
  id: 'solution',
  label: 'Align rates while protecting her direct incentive',
  partnerPrompt:
    "If I match the rates, my direct channel loses its competitive pricing advantage. I have to protect our margin.",
  options: step4Options,
};

// ───────── Step 5 - Lock the test + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ov-r3-wide-step5-correct',
    label: 'Lock the test, the metric and the review',
    description:
      "SME-prescribed close: confirm the base alignment plus member-only deals, agree what you're measuring, and book the three-week review so the test actually lands.",
    playerDialogue:
      "Perfect - let's do exactly that. I'll set up the base alignment and the member-only deals with you, agree what we're measuring, and I'm already booking a call in three weeks to review the impact together.",
    partnerResponse:
      "Sounds good. Let's define the metric now, and review the traffic and revenue in three weeks.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ov-r3-wide-step5-vague',
    label: 'Agree, but leave it vague',
    description:
      "Takes the win but pins no metric and no review date. An evidence-led operator will let a vague plan drift.",
    playerDialogue:
      "Great, I'll get it set up on our side and check in at some point to see how it's going.",
    partnerResponse:
      "'At some point'? Give me the review date and what we're measuring, or this just drifts.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ov-r3-wide-step5-overreach',
    label: 'Push a deeper cut on top',
    description:
      "Overreach past the fenced test - a further public cut and every discount switched on. Straight back to the across-the-board ADR erosion she ruled out.",
    playerDialogue:
      "Perfect - and let's also drop your public rates a bit further and switch on every discount to really move volume.",
    partnerResponse:
      "That's the across-the-board move I just ruled out. Stick to the test.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Lock the test and close',
  partnerPrompt:
    "Your perspective on search and visibility is logical. Let's align the rates as a test for exactly three weeks. If the revenue doesn't justify it, we'll pivot to targeted promotions we've used before.",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const oceanViewWideR3: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'ocean-view-wide',
  round: 3,
  issueTreePath: oceanViewR3IssueTreePath,
  openingAm:
    'Hi Camila, thank you so much for joining today. Based on your years in the vacation-rental market, what trends have you been noticing in your overall search volume lately?',
  steps: [step1, step2, step3, step4, step5],
};
