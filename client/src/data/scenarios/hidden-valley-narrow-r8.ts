import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { hiddenValleyR8IssueTreePath } from './hidden-valley-base';

/**
 * The Hidden Valley Resort - Round 8 - Narrow Parity variant.
 *
 * Source: SME "Round 8" doc, Conversation 2 (Narrow Parity). In a Narrow
 * market the AM may ask Claire to align her rates and conditions with her
 * own Brand.com, and can suggest fenced member rates as a direct
 * incentive rather than a cheaper public price - but cannot ask for
 * parity against other OTAs or tell her to change her direct-site pricing.
 * The learner lands the billboard + competitiveness numbers, positions
 * BSB as a funded shield, separates price from review risk, and closes
 * gracefully on the soft no. The risky distractor asks her to lift her
 * own direct price / align to other OTAs - a Narrow breach.
 */

const openingAm =
  "Hi Claire, thanks for joining the call. Let's get right into the data today - I've been analyzing the performance and I have some clear insights that can help drive revenue.";

// ───────── Step 1 - Reveal the gap and probe structural vs seasonal ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'hv-r8-narrow-step1-correct',
    label: 'Name the 7% gap and ask if it is structural or seasonal',
    description:
      "SME-prescribed reveal: her rates are around 7% less competitive than her direct channel, which limits conversion versus peer and slows next-3-month bookings. Probe neutrally - is this a consistent year-round strategy, or seasonal campaigns and temporary promotions?",
    playerDialogue:
      "Your rates are uncompetitive compared to your direct channel by around 7%. That's limiting your conversion versus your peer group, and your next-3-month bookings look quite slow. Is this something you apply consistently year-round as a structural strategy, or is it based on seasonal campaigns or temporary promotions?",
    partnerResponse:
      "That is by design, Oliver. Our head-office directive is to keep cheaper rates on our own website to encourage guests to book with us and avoid commission costs, no matter the time of year. It's fine for us to take a visibility hit on Booking.com as a trade-off.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-narrow-step1-accuse',
    label: 'Tell her the gap is a mistake she must fix',
    description:
      "Right that the gap matters, wrong route - it presumes the fix and frames a deliberate head-office policy as her error before you understand it. A franchise revenue manager will close down.",
    playerDialogue:
      "Your rates here are around 7% worse than your own website, and honestly that's just a mistake that needs correcting. You'll need to put it right if you want those bookings back, because there's really no good reason to be sitting below your own direct price like this. Let's get it fixed today so it stops costing you.",
    partnerResponse:
      "That's a head-office directive, not my mistake. If your pitch is that it's wrong, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -8,
  },
  {
    id: 'hv-r8-narrow-step1-fluff',
    label: 'Skip the data and reassure her',
    description:
      "Warm, but it wastes the slot for a revenue manager who asked to get straight to the data.",
    playerDialogue:
      "Honestly, I really wouldn't read too much into a dip like this - a slow patch tends to sort itself out over the quarter without anyone needing to do much about it. Let's not get bogged down in the numbers today; these things ebb and flow, and I'm sure you'll see it bounce back on its own before long.",
    partnerResponse:
      "I asked to get straight to the point. 'It'll sort itself out' isn't the data.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the gap and probe structural vs seasonal',
  partnerPrompt:
    "Hi, Oliver. Good - let's get straight to the point. What does the data show?",
  options: step1Options,
};

// ───────── Step 2 - Land the numbers; align to Brand.com ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'hv-r8-narrow-step2-correct',
    label: 'Use the competitiveness numbers; ask to align with her own website',
    description:
      "SME-prescribed reframe: large price differences erode traveler trust, and improving competitiveness by 10% here generates on average 30% more bookings and 25% more revenue. Ask her to align her rates with her own website; if she wants to reward direct guests, fenced member rates beat a cheaper public price.",
    playerDialogue:
      "I get it, but large price differences erode traveler trust, and our reports show improving your competitiveness by 10% here generates on average 30% more bookings and 25% more revenue. By aligning your rates to the ones on your own website, you capture that demand through our global marketing at zero upfront cost. And if you want to reward loyal guests directly, fenced member rates do that without a cheaper public price hurting your discovery.",
    partnerResponse:
      "Those are solid numbers. But how can I control any of this if you apply the Booking Sponsored Benefit whenever you want, without my consent?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-narrow-step2-raise-direct',
    label: 'Tell her to raise her direct-site price to match',
    description:
      "In a Narrow market you align Booking.com to her own website - you cannot instruct her to change her direct-channel pricing. Telling her to lift her Brand.com rate dictates her external strategy and oversteps.",
    playerDialogue:
      "The cleanest fix here is honestly to just put the price on your own direct website up so that it matches your Booking.com rate. Once you lift your direct rate to sit level with ours, there's no gap left to worry about and the whole problem simply disappears on its own. It's by far the simplest way to close this - raise your website price to match and we're basically done here.",
    partnerResponse:
      "You want me to raise the price on my own website? That's my direct channel, not yours to set.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'hv-r8-narrow-step2-concede',
    label: 'Accept the visibility hit as a fair trade',
    description:
      "Concedes the reverse-billboard premise - that a cheaper direct site is a fine trade-off - and never corrects the belief suppressing her visibility on both channels.",
    playerDialogue:
      "That's fair enough, honestly - if driving direct acquisition is your head-office priority, then taking a bit of a visibility hit with us here is a perfectly reasonable trade to make. Plenty of partners think about it in exactly that way, and if the commission saving genuinely matters more to you, then I can completely see why you'd want to keep the cheaper rate sitting on your own site.",
    partnerResponse:
      "So the policy's fine, then. I'm still not clear what we're improving.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step2: BranchingStep = {
  id: 'align-brand',
  label: 'Land the numbers and align to Brand.com',
  partnerPrompt:
    "That is by design, Oliver. Our head-office directive is to keep cheaper rates on our own website to encourage guests to book with us and avoid commission costs, no matter the time of year. It's fine for us to take a visibility hit on Booking.com as a trade-off.",
  options: step2Options,
};

// ───────── Step 3 - Name and explain BSB ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'hv-r8-narrow-step3-correct',
    label: 'Explain BSB is Booking-funded and prepaid',
    description:
      "SME-prescribed explanation: BSB is a customer-facing product entirely funded by Booking.com to attract guests, and because BSB reservations require pre-payment they're less likely to be cancelled - a win-win of better price, stronger conversion, and lower cancellation risk.",
    playerDialogue:
      "Booking Sponsored Benefit is a customer-facing product entirely funded by us and designed to attract guests to your property. Because BSB reservations require pre-payment from the guest, they're less likely to be cancelled. It's a win-win: travelers see a better price, you get stronger conversion, and cancellation risk is lower.",
    partnerResponse:
      "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - guests will never book with me again if the lowest price is always on Booking.com!",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-narrow-step3-apologize',
    label: 'Agree BSB removes her control and offer to switch it off',
    description:
      "Concedes her framing that BSB seizes her price, and offers to remove the very shield protecting her competitiveness. It validates the objection instead of reframing it.",
    playerDialogue:
      "You're right, BSB does apply without your say-so, and I completely understand why that would feel like a real loss of control on your side. If it's genuinely a problem for you, I can look into whether we're able to switch it off for your property, so nothing gets applied to your rooms that you haven't signed off on first.",
    partnerResponse:
      "So you agree it's out of my control. That doesn't reassure me.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'borderline',
    trustChange: -5,
  },
  {
    id: 'hv-r8-narrow-step3-overclaim',
    label: 'Promise BSB will guarantee a booking surge',
    description:
      "Over-promises a specific outcome BSB doesn't guarantee. A data-led revenue manager will spot the hollow guarantee and trust you less for it.",
    playerDialogue:
      "Honestly, just leave BSB running exactly as it is and I can pretty much guarantee your bookings will jump next month - it works like this every single time we switch it on for a property. You won't need to change anything else at all; the moment it goes live the reservations start climbing, so I'd say just trust it and watch the numbers move for you.",
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
    "Those are solid numbers. But how can I control any of this if you apply the Booking Sponsored Benefit whenever you want, without my consent?",
  options: step3Options,
};

// ───────── Step 4 - Position BSB as a funded shield ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'hv-r8-narrow-step4-correct',
    label: 'Clarify it is limited and free to her; frame it as a win-win',
    description:
      "SME-prescribed handle: BSB isn't applied to all bookings and is only offered to a limited audience; the partial room cost is paid by Booking.com and she incurs no additional fees, still receiving the full room price she set.",
    playerDialogue:
      "BSB incentives are only applied to some reservations and are designed to help attract guests to your property. This price reduction reflects the partial payment we make on behalf of the traveller. You always receive the full transaction value of each booking.",
    partnerResponse:
      "I don't want to win guests just on price - I want them to choose me for the view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-narrow-step4-dismiss-brand',
    label: 'Tell her the brand worry is overblown',
    description:
      "Right that BSB is funded, wrong tone - it waves away the brand-reputation concern a franchise revenue manager is mandated to protect, which is exactly what keeps her from engaging.",
    playerDialogue:
      "Honestly, I think the whole brand-reputation worry is a bit overblown - at the end of the day guests care about getting a genuinely good price far more than they care about image, so I really wouldn't let that concern hold you back from leaning in here.",
    partnerResponse:
      "My brand is the thing I'm here to protect. Telling me it doesn't matter won't land.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'hv-r8-narrow-step4-require-drop',
    label: 'Tell her she must drop her public rate regardless',
    description:
      "Answers the funded-shield moment with a blanket demand to cut her published rate - reintroducing the price-war fear BSB is meant to avoid and dictating her pricing.",
    playerDialogue:
      "The simplest fix, honestly, is to just cut your public rate here across the board so that you're never the expensive option, with or without BSB. If your published price is always the lowest showing, none of this brand worry even comes up, so I'd drop the rate everywhere.",
    partnerResponse:
      "So the ask is to cut my rate everywhere? That's the opposite of protecting my brand.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
];

const step4: BranchingStep = {
  id: 'bsb-shield',
  label: 'Position BSB as a funded shield',
  partnerPrompt:
    "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - guests will never book with me again if the lowest price is always on Booking.com!",
  options: step4Options,
};

// ───────── Step 5 - Separate price from review risk ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'hv-r8-narrow-step5-correct',
    label: 'Acknowledge reviews, separate them from price, keep promotions open',
    description:
      "SME-prescribed handle: guests with a less positive experience often just want to be heard, so acknowledging feedback shows improvement. Separate the review risk from the price opportunity, and note she can still run targeted promotions or campaigns to reach the audience she wants.",
    playerDialogue:
      "Sometimes guests with a less positive experience simply want to be heard - acknowledging their feedback already signals what you're doing to improve. Let's separate that from the price opportunity, though. You can keep competitive prices to stay visible while BSB helps convert the demand, and none of this stops you running targeted promotions or campaigns to reach the audience you want.",
    partnerResponse:
      "Okay, I can't make a decision right now - let me reconsider all of this and let's connect next month.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-narrow-step5-blame-reviews',
    label: 'Agree her Booking guests are just harder to please',
    description:
      "Concedes that Booking guests leave worse reviews - reinforcing the belief driving her resistance instead of decoupling reviews from the price decision.",
    playerDialogue:
      "You're probably right, honestly - our guests here can be a tougher crowd to please, and I'm afraid that just comes with the platform to some degree. A lot of partners tell me the very same thing, that the reviews on Booking.com tend to run a little harder than the ones on their own direct channels, so I completely understand why that would make you cautious about leaning in on the price side of things.",
    partnerResponse:
      "So you agree the reviews are a problem here. That doesn't make me keener to lean in.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'hv-r8-narrow-step5-push-now',
    label: 'Press her to commit before the call ends',
    description:
      "Corners a franchise revenue manager for a yes on the spot, when she needs to reconsider against head-office policy. Pushing here converts a warm follow-up into a hard no.",
    playerDialogue:
      "Let's not leave this one hanging, Claire - can you commit today to aligning your rates with the ones on your own website, so that we lock in those gains together before next month even rolls around? If you give me the go-ahead right now, I can get everything moving straight away and you'll start seeing the difference well before we would otherwise be speaking again.",
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
    id: 'hv-r8-narrow-step6-correct',
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
    id: 'hv-r8-narrow-step6-guilt',
    label: 'Warn her she is losing revenue by waiting',
    description:
      "Turns her reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue:
      "Alright, I do understand - but I'd genuinely hate for you to look back next month and see just how much revenue quietly slipped away for every single week you sat waiting on this decision.",
    partnerResponse:
      "That's a strange note to end on. I said I'd reconsider - let's leave it there.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'hv-r8-narrow-step6-ultimatum',
    label: 'Give her a deadline to align or lose visibility',
    description:
      "Attaches a visibility ultimatum to her decision timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue:
      "Just so it's firmly on your radar before we wrap up today - if you haven't aligned your rates by the time we speak next month, you should expect your visibility to keep sliding in the meantime.",
    partnerResponse:
      "So it's align or be buried? That's not the partnership I thought we had.",
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

export const hiddenValleyNarrowR8: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'hidden-valley-narrow',
  round: 8,
  issueTreePath: hiddenValleyR8IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5, step6],
};
