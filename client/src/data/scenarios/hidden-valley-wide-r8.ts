import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { hiddenValleyR8IssueTreePath } from './hidden-valley-base';

/**
 * The Hidden Valley Resort - Round 8 - Wide Parity variant.
 *
 * Source: SME "Round 8" doc, Conversation 1 (Wide Parity). In a Wide
 * market the AM may proactively ask for the same rates, conditions, and
 * availability Claire provides on Brand.com. The learner reframes the
 * Direct-Is-Cheaper belief with the billboard logic, positions BSB as a
 * funded shield rather than a loss of control, separates the price
 * opportunity from her review-risk worry, and - because she won't commit
 * today - closes gracefully on a follow-up. The risky distractors break
 * the ranking-threat and dictate-strategy bans.
 */

const openingAm =
  "Good morning, Claire. It's always a pleasure speaking with you - I hope things are running smoothly.";

// ───────── Step 1 - Reveal the Brand.com gap and probe the strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'hv-r8-wide-step1-correct',
    label: 'Name the 7% gap and ask about the strategy behind it',
    description:
      "SME-prescribed reveal: note that Booking.com is displaying prices around 7% less competitive than her direct channel, and open it up neutrally - ask about the strategy behind it rather than presuming.",
    playerDialogue:
      "I've pulled some metrics to help us look at how we can support your revenue goals. To start, I noticed our platform is currently displaying prices around 7% less competitive than your direct channel. I'd like to explore the strategy behind that with you.",
    partnerResponse:
      "Ah, yes. Our head office mandates a strict policy to keep our website cheaper to own the guest relationship. We're fully aware this means lower visibility on Booking.com, but it's a trade-off we accept because we want our loyal guests booking directly.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-wide-step1-accuse',
    label: 'Tell her the 7% gap is costing her and must change',
    description:
      "Right that the gap matters, wrong route - it presumes the fix and frames a deliberate head-office policy as her error before you understand it. A franchise revenue manager will close down.",
    playerDialogue:
      "I've been through the numbers before this call, and the headline is simple: your prices here are running about 7% worse than your own direct site, and frankly that gap is costing you bookings every week. I really think you'll need to bring them into line so you stop losing out.",
    partnerResponse:
      "That's a head-office policy, not a mistake I made. If you're here to tell me it's wrong, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -8,
  },
  {
    id: 'hv-r8-wide-step1-fluff',
    label: 'Open with small talk and no data',
    description:
      "Warm, but it wastes the slot for a revenue manager who came to review performance and wants the numbers.",
    playerDialogue:
      "Honestly, before we get lost in spreadsheets, I just want to say your property looks fantastic and your recent reviews have been lovely to read. You're clearly doing a lot right, so I really wouldn't stress about the numbers too much today - let's keep this relaxed and just catch up.",
    partnerResponse:
      "I appreciate that, but I set aside this time to review performance. What does the data actually show?",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the Brand.com gap and probe the strategy',
  partnerPrompt:
    "Good morning, Oliver. Yes, we're busy but managing. Based on your agenda, I understand we're reviewing our performance today?",
  options: step1Options,
};

// ───────── Step 2 - Reframe Direct-Is-Cheaper with the billboard logic ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'hv-r8-wide-step2-correct',
    label: 'Use the billboard logic; ask for the same rates as Brand.com',
    description:
      "SME-prescribed reframe: up to 90% of travelers who book with Booking.com discover the property here first, so an uncompetitive price means they discover competitors nearby - which hurts her direct discovery too. In a Wide market you can ask for the same rates and conditions she gives Brand.com.",
    playerDialogue:
      "The billboard effect is real, but up to 90% of travelers who book with us discover your property on our platform first. When your rates here aren't competitive, they're more likely to discover another property nearby - which actually dents your direct-channel discovery as well. To optimize that, we'd ask for the same rates and conditions you provide your direct channel.",
    partnerResponse:
      "Hmm. I see the logic, but the policies are strict about this. If we match prices, we worry about third parties cutting their margins. And your guests already get a great price when they get that discount... how do you call it?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-wide-step2-member-rate',
    label: 'Concede she should just keep the site cheaper',
    description:
      "Accepts the reverse-billboard premise - that a cheaper direct site is a fine trade-off - and never corrects the belief that's suppressing her visibility on both channels.",
    playerDialogue:
      "That's fair enough, honestly - keeping your own website a bit cheaper does clearly bring a good share of guests straight to you, and there's real value in owning that direct relationship the way your head office wants. If that trade-off is working and your loyal guests keep booking with you directly, then I don't think there's much here you need to change - it sounds like the policy is doing its job for you.",
    partnerResponse:
      "So the policy's fine, then? I'm not sure what we're reviewing.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'hv-r8-wide-step2-threat',
    label: 'Warn her ranking will keep dropping',
    description:
      "Threaten a further visibility slide unless she aligns. Threatening ranking over how she prices is banned in every regime and torches a franchise relationship.",
    playerDialogue:
      "I'll be honest with you - as long as your own site keeps undercutting the price you show here, our ranking algorithm is going to read you as uncompetitive and keep pushing your property further down the search results. That slide won't stop until you align your rates with us, so the longer this head-office policy stays in place, the harder it becomes to climb back up where you should be.",
    partnerResponse:
      "Threatening my ranking over a head-office pricing policy is not going to move me.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step2: BranchingStep = {
  id: 'billboard',
  label: 'Reframe Direct-Is-Cheaper with the billboard logic',
  partnerPrompt:
    "Ah, yes. Our head office mandates a strict policy to keep our website cheaper to own the guest relationship. We're fully aware this means lower visibility on Booking.com, but it's a trade-off we accept because we want our loyal guests booking directly.",
  options: step2Options,
};

// ───────── Step 3 - Name and explain BSB ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'hv-r8-wide-step3-correct',
    label: 'Name BSB and explain it is Booking-funded and prepaid',
    description:
      "SME-prescribed explanation: that's the Booking Sponsored Benefit - a customer-facing product entirely funded by Booking.com to attract guests, and BSB reservations require pre-payment, so they're less likely to be cancelled.",
    playerDialogue:
      "You mean the Booking Sponsored Benefit. It's a customer-facing product entirely funded by us and designed to help attract guests to your property. And because BSB reservations require pre-payment from the guest, they're less likely to be cancelled.",
    partnerResponse:
      "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - guests will never book with me again if the lowest price is always on Booking.com!",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-wide-step3-apologize',
    label: 'Agree BSB takes control away and offer to switch it off',
    description:
      "Concedes her framing that BSB is Booking.com seizing her price, and offers to remove the very shield protecting her competitiveness. It validates the objection instead of reframing it.",
    playerDialogue:
      "You're right that BSB does take some of the control over your pricing out of your hands. If it's genuinely bothering you and getting in the way, I can absolutely look into having it switched off for your property so you're back in full control of what guests see.",
    partnerResponse:
      "So you agree it's taking control from me. That doesn't reassure me at all.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'borderline',
    trustChange: -5,
  },
  {
    id: 'hv-r8-wide-step3-overclaim',
    label: 'Promise BSB will guarantee a booking surge',
    description:
      "Over-promises a specific outcome BSB doesn't guarantee. A data-led revenue manager will spot the hollow guarantee and trust you less for it.",
    playerDialogue:
      "Honestly, my advice is to just leave BSB running exactly as it is and let it do the work - it'll flood your property with bookings before you know it. I can pretty much guarantee you'll see your numbers jump next month, so there's really nothing here for you to worry about.",
    partnerResponse:
      "You can guarantee that? That's exactly the kind of claim that makes me trust the number less, not more.",
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
    "Hmm. I see the logic, but the policies are strict about this. If we match prices, we worry about third parties cutting their margins. And your guests already get a great price when they get that discount... how do you call it?",
  options: step3Options,
};

// ───────── Step 4 - Position BSB as a funded shield ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'hv-r8-wide-step4-correct',
    label: 'Clarify you still get your full rate; frame it as a win-win',
    description:
      "SME-prescribed handle: BSB isn't applied to all bookings, the partial room cost is paid by Booking.com on the guest's behalf, and she incurs no additional fees. Position it as a win-win: travelers see a better price, she gets stronger conversion, and prepaid bookings carry lower cancellation risk.",
    playerDialogue:
      "BSB does not make you lose revenue or incur any additional fees - the partial room cost is paid by Booking.com on behalf of the guests. This is also not something we apply to all of your bookings. We position it as a win-win: travelers see a better price, you get stronger conversion, and because these bookings are paid in advance, cancellation risk is lower.",
    partnerResponse:
      "I don't want to win guests just on price - I want them to choose me for the outstanding view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews. Given you're already discounting my rate, why should I join any of your programmes or campaigns?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-wide-step4-dismiss-brand',
    label: 'Tell her the brand worry is overblown',
    description:
      "Right that BSB is funded, wrong tone - it waves away the brand-reputation concern a franchise revenue manager is mandated to protect, which is exactly what keeps her from engaging.",
    playerDialogue:
      "Honestly, I think the whole brand-reputation worry is a bit overblown here - when it comes down to it, guests care about getting a good price far more than most owners expect them to, and a slightly lower rate on our platform really isn't going to change how they feel about your property. I genuinely wouldn't let that concern hold you back from something that could grow your bookings.",
    partnerResponse:
      "My brand is the thing I'm here to protect. Telling me it doesn't matter isn't going to land.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'hv-r8-wide-step4-require-drop',
    label: 'Tell her she must drop her public rate regardless',
    description:
      "Answers the funded-shield moment with a blanket demand to cut her published rate - which reintroduces the price-war fear BSB is meant to avoid and dictates her pricing.",
    playerDialogue:
      "Honestly, the simplest fix here is to just cut your public rate across the board so that you're never the expensive option on our platform, BSB or not. If you bring your published price down far enough that nobody can undercut you, then all of this back-and-forth about shields and discounts goes away and you'll simply always be the cheapest choice a traveler sees.",
    partnerResponse:
      "So after all that, the ask is to cut my rate everywhere? That's the opposite of protecting my brand.",
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
    id: 'hv-r8-wide-step5-correct',
    label: 'Acknowledge the review worry, then separate it from price',
    description:
      "SME-prescribed handle: guests with a less positive experience often just want to be heard, so acknowledging feedback shows you're improving. Then separate the two threads - she can stay competitive to attract guests while BSB helps convert the demand.",
    playerDialogue:
      "Sometimes guests with a less positive experience simply want to be heard - acknowledging their feedback already signals what you're doing to improve. But let's separate the price opportunity from the bad-review risk. You can keep competitive prices to stay visible and attract guests, while BSB remains a tool that helps convert that demand to support your goals.",
    partnerResponse:
      "I understand that, but at the moment I can't make a decision - let me reconsider all of this and let's connect next month.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'hv-r8-wide-step5-blame-reviews',
    label: 'Agree her guests are just harder to please',
    description:
      "Concedes that Booking guests leave worse reviews - reinforcing the belief driving her resistance instead of decoupling reviews from the price decision.",
    playerDialogue:
      "You're probably right, if I'm honest - our guests can be a tougher crowd to please, and they do tend to be quicker to leave a critical review than the ones who book with you directly. It's just one of those things that comes with the territory of being on a big platform like ours, and I don't think there's a huge amount either of us can really do to change that side of it.",
    partnerResponse:
      "So you agree the reviews are a problem here. That doesn't make me any keener to lean in.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'hv-r8-wide-step5-push-now',
    label: 'Press her to commit before the call ends',
    description:
      "Corners a franchise revenue manager for a yes on the spot, when she needs to reconsider against head-office policy. Pushing here converts a warm follow-up into a hard no.",
    playerDialogue:
      "Let's not leave this hanging open until next month - I'd really like us to nail it down today. Can you commit right now to aligning your rates with what you offer direct, so we can lock in these gains straight away rather than losing another few weeks? I honestly think a quick decision here is the right call, and there's no real reason to wait on it.",
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
    "I don't want to win guests just on price - I want them to choose me for the outstanding view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews. Given you're already discounting my rate, why should I join any of your programmes or campaigns?",
  options: step5Options,
};

// ───────── Step 6 - Close gracefully on the soft no ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'hv-r8-wide-step6-correct',
    label: 'Respect the deferral; offer support and schedule the follow-up',
    description:
      "SME-prescribed close on a soft no: don't push. Respect her need to reconsider, offer to support her in the meantime, and schedule the follow-up for next month - leaving the relationship warm and the door open.",
    playerDialogue:
      "No problem at all - take the time you need. Let me know if I can support you on anything in the meantime, and I'll schedule a follow-up for next month. Thank you for your time today, Claire.",
    partnerResponse:
      "Thank you, Oliver - I appreciate you not pushing. Let's talk again next month once I've had a chance to think it through.",
    styleMatch: { red: 2, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'hv-r8-wide-step6-guilt',
    label: 'Warn her she is leaving money on the table by waiting',
    description:
      "Turns her reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue:
      "Alright, I'll leave it there for now - but honestly, I'd hate for you to look back in a few months and realize just how much revenue you left sitting on the table for every single week that you waited to act on this.",
    partnerResponse:
      "That's a strange note to end on. I said I'd reconsider - let's leave it there.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'hv-r8-wide-step6-ultimatum',
    label: 'Give her a deadline to align or lose visibility',
    description:
      "Attaches a visibility ultimatum to her decision timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue:
      "Just so it's on your radar before we wrap up - if you still haven't aligned your rates by the time we speak next month, then you should expect your visibility on our platform to keep sliding lower in the meantime.",
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
    "I understand that, but at the moment I can't make a decision - let me reconsider all of this and let's connect next month.",
  options: step6Options,
};

// ───────── Assembled tree ─────────

export const hiddenValleyWideR8: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'hidden-valley-wide',
  round: 8,
  issueTreePath: hiddenValleyR8IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5, step6],
};
