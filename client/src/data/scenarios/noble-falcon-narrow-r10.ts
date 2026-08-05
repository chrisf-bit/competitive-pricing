import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { nobleFalconR10IssueTreePath } from './noble-falcon-r10-base';

/**
 * The Noble Falcon Inn - Round 10 - Narrow Parity variant.
 *
 * Source: SME "Round 10" doc, Conversation 2 (Narrow Parity). In a Narrow
 * market the AM may ask Adam to align his public rates and conditions with
 * his own Brand.com - but cannot ask for parity against other OTAs or tell
 * him to change his other-channel pricing. The learner works the
 * search-behavior logic, the net-new-traveler value, the family setup fix,
 * and the Risky Guest handle, then closes professionally on the strong no.
 * The risky distractor asks for other-OTA parity - a Narrow breach.
 */

const openingAm =
  "Good morning, Adam. I was reviewing your performance this morning - can I share some insights with you?";

// ───────── Step 1 - Reveal the gap; probe the strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'nf-r10-narrow-step1-correct',
    label: 'Name the 20%-higher gap and ask him to walk you through it',
    description:
      "SME-prescribed reveal: bookings have slowed, and it seems to be because his prices here are around 20% higher than his own website. Ask him to walk you through the strategy behind the setup rather than presuming.",
    playerDialogue:
      "I've noticed your bookings have slowed down, and it seems to be because prices on our platform are currently around 20% higher than the rates on your website. Can you walk me through the strategy behind this setup?",
    partnerResponse:
      "Morning, Mark. It's simple: we want direct conversion. If a traveler sees it's cheaper on our site, they leave your platform and book with us.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-narrow-step1-accuse',
    label: 'Tell him the gap is simply a mistake',
    description:
      "Right that the gap matters, wrong route - it presumes the fix and frames a deliberate strategy as his error before you understand it. A brand-managed manager will close down.",
    playerDialogue:
      "Your prices here are 20% too high - that's just wrong, and it's why the bookings dried up. You need to fix it.",
    partnerResponse:
      "That's a deliberate strategy, not a mistake. If that's your pitch, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'nf-r10-narrow-step1-fluff',
    label: 'Skip the data and reassure him',
    description:
      "Warm, but it wastes the slot for a process-led revenue manager who just agreed to look at the insights.",
    playerDialogue:
      "Honestly, I wouldn't read too much into a slow patch - these things usually sort themselves out over the quarter.",
    partnerResponse:
      "I set aside this time for the numbers. 'It'll sort itself out' isn't insight.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the gap; probe the strategy',
  partnerPrompt:
    "Good morning, yes, sure, let's go ahead!",
  options: step1Options,
};

// ───────── Step 2 - Search behavior; probe the risk of losing the guest ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'nf-r10-narrow-step2-correct',
    label: 'Show they click a competitor, not his site; probe the lost-customer risk',
    description:
      "SME-prescribed handle: guest search behavior shows a different pattern - when travelers see a higher price here than on his website, they don't jump to his site, they click a cheaper competitor on the same search page. Ask how he evaluates that risk of losing the customer entirely.",
    playerDialogue:
      "I understand the logic. But guest search behavior on our platform shows a different pattern - when travelers see a higher price here than on your website, they don't jump to your site, they usually just click a cheaper competitor on the same search page. How do you evaluate that risk of losing the customer entirely?",
    partnerResponse:
      "Our data suggests our brand pull is strong enough to capture them directly.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-narrow-step2-concede',
    label: 'Agree his brand pull will carry it',
    description:
      "Concedes the direct-channel premise - that guests will always find their way to his site - instead of surfacing the competitor-click behavior that loses the guest entirely.",
    playerDialogue:
      "That's fair - your brand's strong enough that most of those guests will find their way to you directly anyway.",
    partnerResponse:
      "So we agree the strategy works. Then what are we fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'nf-r10-narrow-step2-dismiss',
    label: 'Tell him his brand pull is wishful thinking',
    description:
      "Flatly contradicts his read of his own brand rather than drawing out the search behavior. Lecturing a brand-managed manager shuts him down.",
    playerDialogue:
      "Honestly, that brand-pull idea is wishful thinking - nobody's loyal enough to hunt you down when a competitor is right there and cheaper.",
    partnerResponse:
      "You're telling me my brand means nothing? That's a strange way to win me over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -8,
  },
];

const step2: BranchingStep = {
  id: 'search-behavior',
  label: 'Search behavior; probe the risk of losing the guest',
  partnerPrompt:
    "Morning, Mark. It's simple: we want direct conversion. If a traveler sees it's cheaper on our site, they leave your platform and book with us.",
  options: step2Options,
};

// ───────── Step 3 - Net-new travelers; align public rates with Brand.com ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'nf-r10-narrow-step3-correct',
    label: 'Name the net-new value; ask to align public rates with his website',
    description:
      "SME-prescribed handle: for loyal guests his brand pull works, but net-new travelers who don't know his brand are the value the platform brings. Ask him to align his public rates and conditions with his own direct website here, so he doesn't lose the guests who start their journey on Booking.com.",
    playerDialogue:
      "For your loyal guests, absolutely. But what about the net-new travelers who don't know your brand yet? That's the value we bring - and it's why we ask that you align your public rates and conditions with your direct website here, so you don't lose the guests who start their journey on our platform.",
    partnerResponse:
      "If I align the public rates, I only dilute our ADR and compromise our selling proposition.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-narrow-step3-ota-parity',
    label: 'Ask him to match the other OTAs too',
    description:
      "In a Narrow market you can ask him to align with his own Brand.com, but not to match other OTAs. Asking him to level his rates with the other platforms is a compliance breach.",
    playerDialogue:
      "The cleanest fix is to give us the same rates you give the other OTAs, so you're level across every platform.",
    partnerResponse:
      "You're asking me to line my rates up with the other OTAs? I didn't think that was something you could ask.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'nf-r10-narrow-step3-concede',
    label: 'Accept the ADR worry and drop the ask',
    description:
      "Takes his dilution concern as the end of it and abandons the alignment thread - leaving the net-new travelers, and the gap, unaddressed.",
    playerDialogue:
      "That's a fair point - if aligning dilutes your ADR, let's leave your public rates as they are.",
    partnerResponse:
      "So there's nothing to do? Then I'm not sure why we're talking.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step3: BranchingStep = {
  id: 'net-new-align',
  label: 'Net-new travelers; align public rates with Brand.com',
  partnerPrompt:
    "Our data suggests our brand pull is strong enough to capture them directly.",
  options: step3Options,
};

// ───────── Step 4 - Member rates + ranking; surface the family gap ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'nf-r10-narrow-step4-correct',
    label: 'Offer fenced member rates; surface the family visibility gap',
    description:
      "SME-prescribed handle: he can still use fenced, closed member rates on his site to reward loyalty, while aligned public rates keep his organic ranking healthy. Then surface that his family-specific search visibility is dropping significantly.",
    playerDialogue:
      "Not necessarily - you can still use fenced, closed member rates on your own site to reward loyalty. But keeping your public rates aligned keeps your organic ranking healthy. And while reviewing this, I noticed a gap in your family occupancy - your family-specific search visibility is dropping significantly.",
    partnerResponse:
      "That's odd. We're a family-friendly brand - our occupancy settings should be fine.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-narrow-step4-cut-public',
    label: 'Tell him to just cut his public rates',
    description:
      "Right that competitiveness matters, wrong lever - it makes it a public discount ask rather than the align-with-your-own-website + fenced-member-rate structure, and walks straight into his ADR-dilution fear.",
    playerDialogue:
      "Simplest thing is to cut your public rates here so you're the cheaper option - the ranking follows the price.",
    partnerResponse:
      "Cutting my public rate is exactly the ADR dilution I just flagged. That's a no.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'nf-r10-narrow-step4-dismiss-family',
    label: 'Brush past the family signal',
    description:
      "Drops the family visibility gap rather than surfacing it, missing the one setup lever that could move without touching his ADR.",
    playerDialogue:
      "The family stuff is probably nothing - let's not get distracted by it and stay on the public rates.",
    partnerResponse:
      "You raised it, then waved it off. Which is it?",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
];

const step4: BranchingStep = {
  id: 'member-family',
  label: 'Member rates + ranking; surface the family gap',
  partnerPrompt:
    "If I align the public rates, I only dilute our ADR and compromise our selling proposition.",
  options: step4Options,
};

// ───────── Step 5 - Explain the child-rate mispricing; the family value ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'nf-r10-narrow-step5-correct',
    label: 'Explain children priced as adults; frame it as a setup fix',
    description:
      "SME-prescribed handle: his settings are optimized on his website, but here the family rates aren't set correctly, so the system prices children as full adults - making family stays look artificially expensive. Note families grew nearly two times faster and are 24% more likely to review, and offer to correct the configuration.",
    playerDialogue:
      "They're optimized on your website, but on our platform your family rates aren't set correctly - our system is pricing children as full adults, which makes the stay look artificially expensive for families. Given families grew nearly two times faster than other segments and are 24% more likely to leave a review, would you like to correct this configuration?",
    partnerResponse:
      "Well, being family-friendly doesn't mean all children pay less than adults. And these family bookings are often high-risk ones - invalid cards, short-notice cancellations if children get sick, and rooms left in a very poor state after they leave.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-narrow-step5-price-drop',
    label: 'Frame it as dropping the family price',
    description:
      "Right segment, wrong framing - it turns a setup correction into a price cut, which reads as another discount ask to a manager guarding his ADR, and misses the 'without touching your base rate' angle.",
    playerDialogue:
      "You just need to drop your family prices here to be competitive and the family bookings will come.",
    partnerResponse:
      "So more discounting. That's the opposite of what I told you I can do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'nf-r10-narrow-step5-blame',
    label: 'Tell him he misconfigured it and should have caught it',
    description:
      "Frames the family mispricing as his oversight rather than a shared extranet check. Blaming a brand-managed manager for a config gap ends the collaboration.",
    playerDialogue:
      "Your family rates are set up wrong on your side - honestly you should have caught this yourself by now.",
    partnerResponse:
      "So now it's my fault too. This is not going the way I hoped.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
];

const step5: BranchingStep = {
  id: 'child-rate',
  label: 'Explain the child-rate mispricing; the family value',
  partnerPrompt:
    "That's odd. We're a family-friendly brand - our occupancy settings should be fine.",
  options: step5Options,
};

// ───────── Step 6 - Handle the family risk; close professionally on the strong no ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'nf-r10-narrow-step6-correct',
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
    id: 'nf-r10-narrow-step6-dismiss-risk',
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
    id: 'nf-r10-narrow-step6-ultimatum',
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
    "Well, being family-friendly doesn't mean all children pay less than adults. And these family bookings are often high-risk ones - invalid cards, short-notice cancellations if children get sick, and rooms left in a very poor state after they leave.",
  options: step6Options,
};

// ───────── Assembled tree ─────────

export const nobleFalconNarrowR10: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'noble-falcon-narrow',
  round: 10,
  issueTreePath: nobleFalconR10IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5, step6],
};
