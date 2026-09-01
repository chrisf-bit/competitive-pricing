import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { oceanViewR3IssueTreePath } from './ocean-view-base';

/**
 * Ocean View Resort - Round 3 - Narrow Parity variant.
 *
 * Source: SME "Round 3" doc, Conversation 2 (Narrow Parity). In a
 * Narrow market the AM may ask Camila to align her public base rates
 * with her Brand.com (only), and recommends fenced member-only rates on
 * her own site to keep the direct incentive. Camila pushes back with
 * the Segmented Pricing objection (targeted audiences vs a general
 * drop); the learner holds base-rate alignment as the primary action.
 * The risky distractors break the other-OTA and ranking-threat bans.
 */

// ───────── Step 1 - Data reveal + probe her strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ov-r3-narrow-step1-correct',
    label: 'Acknowledge profitability, name the visibility collapse',
    description:
      "SME-prescribed reveal: validate the profitability focus, then surface the hard problem - travelers aren't even seeing her, with page views 61% below peer and next-30-day room nights 48% behind.",
    playerDialogue:
      "Maximizing profitability is a good strategy. But your data on our platform shows a problem getting travelers to see your properties at all: your page views are 61% below your peer group, and your on-the-books room nights for the next 30 days are 48% behind.",
    partnerResponse:
      "Oh - I didn't realize we were losing that much with you. Other channels are probably taking that share; we're not seeing a major drop in overall revenue. But I am concerned about that visibility gap versus our peer group. How do we reverse it?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-narrow-step1-prescribe',
    label: 'Prescribe a rate cut before understanding her strategy',
    description:
      "Jumps straight to a price cut without understanding how she runs her channels - an experienced manager reads that as being sold to.",
    playerDialogue:
      "Your bookings are down 48%, so the quickest fix here is straightforward - let's just drop your Booking.com prices so you stop losing travelers, and I can have that set up for you within the hour. Once the lower rates are live you'll see those bookings come back. Shall we get it going?",
    partnerResponse:
      "You're prescribing a cut before you understand how we run our channels.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -5,
  },
  {
    id: 'ov-r3-narrow-step1-fluff',
    label: 'Sympathise with no data behind it',
    description:
      'Warm but empty - no numbers, no diagnosis. The wrong register for an evidence-led operator.',
    playerDialogue:
      "That's a real shame to hear, but honestly I wouldn't worry too much about it - these things tend to ebb and flow, and I'm sure it'll pick back up before long. You've built such a lovely reputation that the guests always find their way back. How's the team getting on otherwise?",
    partnerResponse:
      "If there's no data behind that, what are we actually solving?",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

const step1: BranchingStep = {
  id: 'probe',
  label: 'Reveal the visibility collapse',
  partnerPrompt:
    "Good morning! It's been busy, but the pace is good. Our main focus this year is driving guests directly to our own site to maximize returns - so we keep our direct website about 5.5% cheaper to 'redirect' some guests from you. We want travelers to see us on your platform, realize they can save by booking direct, and then click away to book on our website.",
  options: step1Options,
};

// ───────── Step 2 - Counter the reverse-billboard belief ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ov-r3-narrow-step2-correct',
    label: 'Explain how travelers actually search',
    description:
      "SME-prescribed counter: because the platform works like a search engine, a traveler who discovers her but doesn't find a competitive price just books a cheaper local competitor on the same page - they don't switch tabs to find her brand. Probe how she mitigates that.",
    playerDialogue:
      "Think of our platform like a search engine: a traveler who discovers you but doesn't find a competitive price just books elsewhere on our platform. They rarely switch tabs to search your brand - they click a cheaper local competitor on the same page. How do you mitigate the risk of losing those bookings to your neighbors?",
    partnerResponse:
      "We believe our brand awareness is strong enough to bring them over. If they really want one of our properties, they'll look for our name online.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-narrow-step2-concede',
    label: 'Half-agree with the billboard theory',
    description:
      "Concedes the flawed premise that the exposure alone does the job, and offers only a token nudge - never correcting the belief driving the problem.",
    playerDialogue:
      "You're right that the exposure alone probably does most of the work for you - people see you on our platform and that visibility is genuinely valuable, so I don't want to overstate this. Maybe all it really needs is a small discount on the margin to nudge a few more of them over the line, and your brand is likely doing the heavier lifting anyway.",
    partnerResponse:
      "So the markup's fine, then? What are we actually fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ov-r3-narrow-step2-lecture',
    label: 'Call her strategy a myth',
    description:
      "Dismiss the direct-booking belief as a myth and travelers as lazy. Condescending to an experienced operator.",
    playerDialogue:
      "The whole 'they'll just book direct' idea is honestly a bit of a myth, and I think you're giving travelers far too much credit here - they're lazy, they don't hunt around for your brand, they simply book whatever happens to be the cheapest option sitting right in front of them on the page. Clinging to that belief is exactly what's costing you all this visibility.",
    partnerResponse:
      "Calling my strategy a myth isn't how to have this conversation.",
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
    "Oh - I didn't realize we were losing that much with you. Other channels are probably taking that share; we're not seeing a major drop in overall revenue. But I am concerned about that visibility gap versus our peer group. How do we reverse it?",
  options: step2Options,
};

// ───────── Step 3 - Align Brand.com + fenced member deals ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ov-r3-narrow-step3-correct',
    label: 'Recommend fenced member rates; align public base rates with Brand.com',
    description:
      "SME-prescribed ask: to protect her direct loyalty incentive, use fenced member-only rates on her own site rather than a cheaper public rate; and align her public base rates with her Brand.com here, which is what lifts search discovery.",
    playerDialogue:
      "If your goal is to drive direct bookings, we'd recommend fenced, member-only rates on your website rather than a cheaper public rate - that protects your direct loyalty incentive. Meanwhile, aligning your public base rates with your Brand.com here helps attract more guests to you on our platform.",
    partnerResponse:
      "If I match my website rates on your channel, I lose the public incentive that drives direct business - fenced rates or not. Why don't we focus on specific targeted audiences instead of a general rate drop?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-narrow-step3-no-protection',
    label: 'Ask her to align and drop the direct advantage',
    description:
      "Asks for the public alignment but offers nothing to protect her direct incentive - the exact thing she's protecting - so it reads as asking her to simply give it up.",
    playerDialogue:
      "Honestly, the simplest path is to just align your public rates with your website rates here, and once you do that you'll recover the visibility you've lost. The direct discount you're running is costing you far more in missed bookings than it's actually earning you, so bringing the two into line here is really the sensible move.",
    partnerResponse:
      "You keep asking me to give up my public incentive without protecting it. No.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ov-r3-narrow-step3-other-otas',
    label: 'Tell her to also undercut the other OTAs',
    description:
      "Ask her to make sure she isn't pricier than the other OTAs and match them here. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue:
      "And while we're at it, make sure you're not sitting pricier than the other OTAs either - go and check what they're charging and match them here so you're never the most expensive option anywhere a traveler looks. If any of them are undercutting you, bring your rates on those channels down too so you stay competitive right across the board.",
    partnerResponse:
      "Policing my other-OTA pricing isn't your call in this market.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step3: BranchingStep = {
  id: 'align-ask',
  label: 'Align Brand.com; protect the direct incentive with member rates',
  partnerPrompt:
    "We believe our brand awareness is strong enough to bring them over. If they really want one of our properties, they'll look for our name online.",
  options: step3Options,
};

// ───────── Step 4 - Hold base alignment vs the segmented pushback ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ov-r3-narrow-step4-correct',
    label: 'Hold base alignment as primary; targeted options as the fallback',
    description:
      "SME-prescribed handling of the Segmented Pricing pushback: acknowledge why targeted feels safer, but base-rate alignment is the action most likely to restore visibility and ranking - keep targeted options as the fallback if alignment underdelivers.",
    playerDialogue:
      "I understand why a targeted promotion feels safer. But base-rate alignment is the action most likely to restore your visibility. If aligning the base rate doesn't deliver the revenue you need, we can look at targeted options then. The opportunity to recover this lost visibility is significant.",
    partnerResponse:
      "Your explanation makes a lot of sense, and a loss in traffic this big is too important to ignore. Let's try the base-rate alignment for exactly three weeks as a test - can we set a follow-up to see results?",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r3-narrow-step4-fold',
    label: 'Fold to targeted-only and drop the base alignment',
    description:
      "Capitulates to targeted promotions only, abandoning the base-rate alignment the SME identifies as the primary lever for visibility - it hands her the weaker plan.",
    playerDialogue:
      "Sure, that's completely fair - let's just run some targeted promotions for now and set the base-rate alignment aside for the time being. Targeted deals give you far more control over exactly who gets the price, so let's start there and keep it simple, and we can always revisit the wider rate question another time.",
    partnerResponse:
      "If even you don't think the base alignment matters, why did you raise it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ov-r3-narrow-step4-ranking-threat',
    label: 'Make the base alignment "not optional"',
    description:
      "Frame alignment as compulsory with a ranking penalty if she refuses. Threatening ranking to force a price move is banned.",
    playerDialogue:
      "I'll be straight with you - if you don't align the base rate, our system is simply going to keep dropping your ranking lower and lower until you do, and there's nothing I can do to stop that happening. This really isn't optional at this point, so the sensible thing is to align now before your placement slips further and it gets harder to claw back.",
    partnerResponse:
      "Framing it as 'not optional' with a ranking threat is exactly the wrong approach.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step4: BranchingStep = {
  id: 'hold-alignment',
  label: 'Hold base alignment against the segmented pushback',
  partnerPrompt:
    "If I match my website rates on your channel, I lose the public incentive that drives direct business - fenced rates or not. Why don't we focus on specific targeted audiences instead of a general rate drop?",
  options: step4Options,
};

// ───────── Step 5 - Lock the test + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ov-r3-narrow-step5-correct',
    label: 'Confirm the test, the metric and the follow-up',
    description:
      "SME-prescribed close: confirm the three-week base-alignment test, agree what you're measuring, and book the follow-up so it lands.",
    playerDialogue:
      "Absolutely, Camila - I'll set that up shortly. Let's agree the metric now and book our follow-up so we review it properly in three weeks.",
    partnerResponse:
      "Good. Let's agree the metric and review it in three weeks.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ov-r3-narrow-step5-vague',
    label: 'Agree, but leave it vague',
    description:
      "Takes the win but pins no metric and no review date - a plan an evidence-led operator will let drift.",
    playerDialogue:
      "Great, I'll get that all set up on our end and then I'll circle back at some point down the line to see how the whole thing is coming along for you.",
    partnerResponse:
      "'At some point'? Give me the review date and the metric, or this drifts.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ov-r3-narrow-step5-overreach',
    label: 'Push a deeper cut on top',
    description:
      "Overreach past the agreed test with a further public cut and every discount on - the across-the-board ADR erosion she ruled out.",
    playerDialogue:
      "Perfect - and while we're at it, let's also bring your public rates down a bit further and switch on every discount you've got to really move some volume.",
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
    "Your explanation makes a lot of sense, and a loss in traffic this big is too important to ignore. Let's try the base-rate alignment for exactly three weeks as a test - can we set a follow-up to see results?",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const oceanViewNarrowR3: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'ocean-view-narrow',
  round: 3,
  issueTreePath: oceanViewR3IssueTreePath,
  openingAm:
    'Good morning, Camila. Thank you for scheduling this performance review. How is your portfolio progressing?',
  steps: [step1, step2, step3, step4, step5],
};
