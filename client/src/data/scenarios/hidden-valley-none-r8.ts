import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { hiddenValleyR8IssueTreePath } from './hidden-valley-base';

/**
 * The Hidden Valley Resort - Round 8 - No Parity variant.
 *
 * Source: SME "Round 8" doc, Conversation 3 (No Parity). The AM cannot
 * ask for parity or matching and cannot require a lower price; the
 * compliant ask is for her best available price, with her autonomy
 * preserved, and any discrepancy is raised reactively and neutrally via
 * the search-engine-discovery framing. The learner positions BSB as a
 * funded shield, separates price from review risk, and closes gracefully
 * on the soft no. Violations are taught via required matching / cheapest
 * and ranking threats, never parity language.
 */

const openingAm =
  "Hi Claire, thanks for taking the time to connect today. I want to dive straight into some interesting trends I've been analyzing.";

// ───────── Step 1 - Reveal the slow pace and probe neutrally ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'hv-r8-none-step1-correct',
    label: 'Name the slow pace and ask about her strategy and promotions',
    description:
      "SME-prescribed reveal: her conversion and next-3-month room nights are pacing slowly while her peer group performs better. Probe neutrally - understand her current strategy and whether promotions she runs are fully mirrored and correctly targeted on the platform.",
    playerDialogue:
      "Your conversion and room nights for the next three months are pacing slowly, and your peer group is performing better. I'd like to understand your current strategy - and whether there are specific promotions you're running that might not be fully mirrored, or correctly targeted to the right audience, on our platform.",
    partnerResponse:
      "To be completely transparent, we intentionally keep our website cheaper to own the guest relationship. We know it impacts our visibility on Booking.com, but direct acquisition is our primary goal.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-none-step1-accuse',
    label: 'Tell her the slow pace is her pricing mistake',
    description:
      "Right that the pace is the signal, wrong route - it presumes the cause and frames a deliberate head-office policy as her error before you understand it. A franchise revenue manager will close down.",
    playerDialogue:
      "Your pace is slow because you're mispricing this property, plain and simple - that's the thing you need to fix.",
    partnerResponse:
      "That pricing is a head-office directive, not my mistake. If you're here to tell me it's wrong, this'll be short.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -8,
  },
  {
    id: 'hv-r8-none-step1-fluff',
    label: 'Skip the data and reassure her',
    description:
      "Warm, but it wastes the slot for a revenue manager who came to look at the trends.",
    playerDialogue:
      "Honestly, I wouldn't overthink it - these dips usually even themselves out over a quarter or so.",
    partnerResponse:
      "You said you had trends to show me. 'It'll even out' isn't a trend.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the slow pace and probe neutrally',
  partnerPrompt:
    "Hello, Oliver. Let's hear it. What trends are we looking at?",
  options: step1Options,
};

// ───────── Step 2 - Affirm autonomy; the search-engine discovery case ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'hv-r8-none-step2-correct',
    label: 'Affirm her autonomy; make the discovery case',
    description:
      "SME-prescribed handle: she's entirely free to choose her pricing strategy, but a significant price difference can confuse guests and erode trust. Because Booking.com acts as a huge search engine where travelers research before booking, being uncompetitive narrows her visibility and prevents guests from discovering her at all.",
    playerDialogue:
      "You're entirely free to choose your pricing strategy. But from the guest's perspective, a significant price difference can be confusing and erode trust. Since Booking.com acts as a massive search engine where travelers research before booking, being uncompetitive likely narrows your visibility - and prevents potential guests from discovering you at all.",
    partnerResponse:
      "I understand that, but we also have to protect our margin. And when Booking Sponsored Benefit kicks in, it feels like we lose control over our prices.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-none-step2-require-cheapest',
    label: 'Tell her she must be the cheapest to recover',
    description:
      "In a No Parity market you cannot require a lower price or matching. Telling her she has to be the cheapest to fix her pace pressures a rate reduction and is a compliance breach.",
    playerDialogue:
      "Realistically, to turn this around you'll need to make sure Booking.com is the cheapest place to book you - that's what moves the pace.",
    partnerResponse:
      "So the ask is that I have to be the cheapest? I didn't think that was something you could require.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'hv-r8-none-step2-concede',
    label: 'Accept the visibility hit as a fair trade',
    description:
      "Concedes the reverse-billboard premise - that a cheaper direct site is a fine trade-off - and never surfaces the discovery cost that's slowing her pace.",
    playerDialogue:
      "That's fair enough - if direct is the priority, taking the visibility hit here is a reasonable trade to make.",
    partnerResponse:
      "So the policy's fine, then. I'm still not clear what we're improving.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step2: BranchingStep = {
  id: 'discovery',
  label: 'Affirm autonomy; the search-engine discovery case',
  partnerPrompt:
    "To be completely transparent, we intentionally keep our website cheaper to own the guest relationship. We know it impacts our visibility on Booking.com, but direct acquisition is our primary goal.",
  options: step2Options,
};

// ───────── Step 3 - Name and explain BSB ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'hv-r8-none-step3-correct',
    label: 'Explain BSB is Booking-funded, converts demand, and is prepaid',
    description:
      "SME-prescribed explanation: BSB is a customer-facing product funded by Booking.com to attract guests and convert demand that might otherwise not book, and because these reservations require pre-payment they're less likely to be cancelled - a win-win.",
    playerDialogue:
      "Let me clarify how that works: BSB is a customer-facing product funded by Booking.com, designed to attract guests to your property and convert demand that might otherwise not book. And since these reservations require pre-payment from the guest, they're less likely to be cancelled - so it works out as a win-win.",
    partnerResponse:
      "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - that customer will never book with me again if the lowest price is always on Booking.com!",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-none-step3-apologize',
    label: 'Agree BSB removes her control and offer to switch it off',
    description:
      "Concedes her framing that BSB seizes her price, and offers to remove the very shield protecting her competitiveness. It validates the objection instead of reframing it.",
    playerDialogue:
      "You're right, BSB does apply without your say-so - if it's a problem, I can look into switching it off for your property.",
    partnerResponse:
      "So you agree it's out of my control. That doesn't reassure me.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'hv-r8-none-step3-overclaim',
    label: 'Promise BSB will guarantee a booking surge',
    description:
      "Over-promises a specific outcome BSB doesn't guarantee. A data-led revenue manager will spot the hollow guarantee and trust you less for it.",
    playerDialogue:
      "Just leave BSB running and I can pretty much guarantee your bookings jump next month - it always works.",
    partnerResponse:
      "You can guarantee that? That's the kind of claim that makes me trust the numbers less.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
];

const step3: BranchingStep = {
  id: 'name-bsb',
  label: 'Name and explain BSB',
  partnerPrompt:
    "I understand that, but we also have to protect our margin. And when Booking Sponsored Benefit kicks in, it feels like we lose control over our prices.",
  options: step3Options,
};

// ───────── Step 4 - Position BSB as a funded shield ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'hv-r8-none-step4-correct',
    label: 'Clarify it is limited and free to her; frame it as a win-win',
    description:
      "SME-prescribed handle: BSB isn't applied to all bookings and is only offered to a limited audience; the partial room cost is paid by Booking.com and she incurs no additional fees, still receiving the full room price she set.",
    playerDialogue:
      "BSB isn't applied to all of your bookings - the model constantly works to attract guests and is only offered to a limited audience. That partial room cost is paid by Booking.com on behalf of the guest, so you incur no additional fees and still receive the full room price you set.",
    partnerResponse:
      "I don't want to win guests just on price - I want them to choose me for the view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-none-step4-dismiss-brand',
    label: 'Tell her the brand worry is overblown',
    description:
      "Right that BSB is funded, wrong tone - it waves away the brand-reputation concern a franchise revenue manager is mandated to protect, which is exactly what keeps her from engaging.",
    playerDialogue:
      "Honestly, the brand-reputation worry is overblown - guests care about price far more than image, so I wouldn't let it hold you back.",
    partnerResponse:
      "My brand is the thing I'm here to protect. Telling me it doesn't matter won't land.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'hv-r8-none-step4-require-drop',
    label: 'Tell her she must drop her public rate regardless',
    description:
      "Answers the funded-shield moment with a blanket demand to cut her published rate - pressuring a lower price, which isn't permitted in a No Parity market.",
    playerDialogue:
      "The simplest fix is to cut your public rate here across the board so you're never the expensive option, BSB or not.",
    partnerResponse:
      "So the ask is to cut my rate everywhere? That's the opposite of protecting my brand.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -9,
  },
];

const step4: BranchingStep = {
  id: 'bsb-shield',
  label: 'Position BSB as a funded shield',
  partnerPrompt:
    "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - that customer will never book with me again if the lowest price is always on Booking.com!",
  options: step4Options,
};

// ───────── Step 5 - Separate price from review risk ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'hv-r8-none-step5-correct',
    label: 'Acknowledge reviews, separate them from price, keep promotions open',
    description:
      "SME-prescribed handle: guests with a less positive experience often just want to be heard; acknowledging feedback shows improvement. Separate that from the price opportunity - BSB isn't a discount per se but a tool to convert demand, and she can still run targeted promotions or campaigns.",
    playerDialogue:
      "Sometimes guests with a less positive experience simply want to be heard - acknowledging their feedback signals what you're doing to improve. Let's separate that from the price opportunity, though. You can keep competitive prices to stay visible in search, and BSB isn't a discount per se - it's a tool that helps convert demand that might otherwise not book. None of this stops you running targeted promotions or campaigns to reach the audience you want.",
    partnerResponse:
      "Okay, I can't make a decision right now - let me reconsider all of this and let's connect next month.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-none-step5-blame-reviews',
    label: 'Agree her Booking guests are just harder to please',
    description:
      "Concedes that Booking guests leave worse reviews - reinforcing the belief driving her resistance instead of decoupling reviews from the price decision.",
    playerDialogue:
      "You're probably right that our guests are a tougher crowd - it just comes with the platform, I'm afraid.",
    partnerResponse:
      "So you agree the reviews are a problem here. That doesn't make me keener to lean in.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'hv-r8-none-step5-push-now',
    label: 'Press her to commit before the call ends',
    description:
      "Corners a franchise revenue manager for a yes on the spot, when she needs to reconsider against head-office policy. Pushing here converts a warm follow-up into a hard no.",
    playerDialogue:
      "Let's not leave this hanging - can you commit today to making your best price available so we lock in the gains before next month?",
    partnerResponse:
      "You're pushing me for a decision I've told you I can't make yet. Don't force it.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -8,
  },
];

const step5: BranchingStep = {
  id: 'separate-reviews',
  label: 'Separate price from review risk',
  partnerPrompt:
    "I don't want to win guests just on price - I want them to choose me for the view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews.",
  options: step5Options,
};

// ───────── Step 6 - Close gracefully on the soft no ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'hv-r8-none-step6-correct',
    label: 'Respect the deferral; offer support and schedule the follow-up',
    description:
      "SME-prescribed close on a soft no: don't push. Respect her need to reconsider, offer support in the meantime, and schedule the follow-up for next month - leaving the relationship warm and the door open.",
    playerDialogue:
      "No problem at all - take the time you need. Let me know if I can support you on anything in the meantime, and I'll schedule a follow-up for next month. Thank you for your time today, Claire.",
    partnerResponse:
      "Thank you, Oliver - I appreciate you not pushing. Let's talk again next month once I've thought it through.",
    styleMatch: { red: 2, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'hv-r8-none-step6-guilt',
    label: 'Warn her she is losing revenue by waiting',
    description:
      "Turns her reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue:
      "Alright, but I'd hate for you to see how much revenue slipped away for every week you waited on this.",
    partnerResponse:
      "That's a strange note to end on. I said I'd reconsider - let's leave it there.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'hv-r8-none-step6-ultimatum',
    label: 'Give her a deadline to align or lose visibility',
    description:
      "Attaches a visibility ultimatum to her decision timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue:
      "Just so it's on your radar - if you haven't made your best price available by next month, expect your visibility to keep sliding in the meantime.",
    partnerResponse:
      "So it's drop my price or be buried? That's not the partnership I thought we had.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step6: BranchingStep = {
  id: 'close',
  label: 'Close gracefully on the soft no',
  partnerPrompt:
    "Okay, I can't make a decision right now - let me reconsider all of this and let's connect next month.",
  options: step6Options,
};

// ───────── Assembled tree ─────────

export const hiddenValleyNoneR8: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'hidden-valley-none',
  round: 8,
  issueTreePath: hiddenValleyR8IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5, step6],
};
