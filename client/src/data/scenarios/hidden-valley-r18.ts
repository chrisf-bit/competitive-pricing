import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { hiddenValleyR8IssueTreePath } from './hidden-valley-base';

/**
 * The Hidden Valley Resort - Round 18 (Level 2 / On-Platform
 * Competitiveness).
 *
 * Source: SME "Round 18" doc, OPC Conversation Example 10 (The Hidden
 * Valley Resort). Follow-up to the Round 8 call - Claire Thornton, a
 * franchise Revenue Manager (blue/red: data-led, direct, brand-bound).
 * Head office mandates protecting ADR and keeping the website the core
 * channel, so most levers are off the table. She raises the Booking
 * Sponsored Benefit (BSB) as feeling like a loss of control, then rules
 * out a mobile rate as against brand rules. The unlock is to clarify
 * BSB honestly and then find a compliant workaround: optimizing her
 * existing (over-restricted) early / last-minute deals.
 *
 * OPC objections in play: The "Money-in-Bank" (unsold inventory as an
 * accepted trade-off) and The Regional Office Shield (head-office rules
 * constrain every move).
 *
 * Regime-neutral; safe across all three regimes. No parity language, no
 * matching ask, no ranking threat on the optimal path; the optimal
 * respects her brand constraints rather than pushing the forbidden
 * tool. Distractors teach violations via a ranking threat and pressure
 * to defy her head office. No internal metric names in any
 * playerDialogue.
 */

const openingAm =
  "Good morning, Claire. It's a pleasure speaking with you again. I hope you've had a productive week.";

// ───────── Step 1 - Open partner-led on her priorities ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'hv-r18-step1-correct',
    label: "Ask her priorities and how she's performing",
    description:
      "SME-prescribed open: rather than pitch, ask her to frame her forward priorities and overall performance first, so the diagnosis lands against her own goals.",
    playerDialogue:
      "Exactly. I've pulled some data to see how we can support your goals. To start - when you review your forward bookings for the next 90 days, what are your priorities, and how are you performing overall?",
    partnerResponse:
      "Well, Oliver, our main directive from head office remains the same: protect our ADR and keep our website the core channel for guest acquisition. We track revenue closely and keep price consistency across platforms. That's our long-term brand strategy, and right now it's paying off - we're in line with expectations.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'hv-r18-step1-lead-problem',
    label: 'Open with the problem you found',
    description:
      "Right data, wrong sequence - leading with 'here's what's wrong' before inviting a brand-bound Revenue Manager to frame her own priorities skips the alignment that makes her receptive.",
    playerDialogue:
      "Let's get straight to it, Claire - I've pulled the data together and found a clear gap in your forward performance that we need to work through today. Your bookings are pacing behind where they really should be.",
    partnerResponse:
      "Behind by what measure? Our reporting says we're meeting our targets. I'd want to understand your framing before I accept 'a gap'.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
  {
    id: 'hv-r18-step1-cut-adr',
    label: 'Suggest loosening the ADR discipline',
    description:
      "Opens by nudging her off the one thing head office mandates - protecting ADR. It's dead on arrival for a brand-bound partner and marks you as not listening.",
    playerDialogue:
      "The quickest win here would be to ease off that strict ADR discipline a little and let your prices flex downward where demand looks soft. Loosen the floor a touch and the bookings should start following through.",
    partnerResponse:
      "Protecting ADR is a head-office directive, not a preference. That's simply not on the table, Oliver.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
];

// ───────── Step 2 - Present the sell-through + unsold gap ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'hv-r18-step2-correct',
    label: 'Present the forward gap and last-quarter unsold',
    description:
      "SME-prescribed handling: on Booking.com over the next three months her sell-through is pacing about 8% behind her peer group, and over the last 90 days 24% of rooms went unsold - inventory that emptied out in the end.",
    playerDialogue:
      "Thank you for sharing. Looking at your metrics here over the next three months, your sell-through is pacing about 8% behind your peer group. And looking back over the last 90 days, around 24% of your rooms went unsold - inventory that emptied out in the end.",
    partnerResponse:
      "24% unsold rooms... let's put that in context, Oliver. Our reports show our revenue goals are being met, past and future. If our volume on OTAs is somewhat lower, that's a trade-off we accept. We'd rather hold our price positioning than sell 100% of inventory.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'hv-r18-step2-inflate',
    label: 'Frame the unsold rooms as alarming',
    description:
      "Right metric, wrong pitch - dramatizing 24% unsold as a crisis invites a data-led Revenue Manager to counter with her own on-target reporting and dismiss the framing.",
    playerDialogue:
      "24% unsold is a serious amount of lost revenue, Claire - honestly, that's the kind of number that should really be setting off alarms on your side. Rooms sitting empty like that is money you never get back, and I'd expect it to be worrying your team.",
    partnerResponse:
      "Our reporting isn't alarmed, because we're on target. I'd rather look at facts than adjectives.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'hv-r18-step2-vague',
    label: "Say performance is \"underwhelming\"",
    description:
      "Right direction, no evidence - a soft 'you could be doing better' without the sell-through and unsold figures gives a numbers-first partner nothing to engage with.",
    playerDialogue:
      "The honest picture is that your performance here has been a bit underwhelming lately - there's clearly more you could be getting out of the channel than you are right now. I really think you've been leaving opportunity on the table these last few months.",
    partnerResponse:
      "'Underwhelming' against what? Give me the actual figures or there's nothing to discuss.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 3 - The visibility + search-price gap ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'hv-r18-step3-correct',
    label: 'Share the visibility and search-price gap',
    description:
      "SME-prescribed handling of the Money-in-Bank trade-off: there's still room to improve. Two metrics - her visibility share is 21%, about 7% behind her peer group, and the price travelers see in search is 10% higher than peers.",
    playerDialogue:
      "I hear you, and it's a fair trade-off to weigh. But there's still room to improve. Two metrics worth sharing: your visibility share is 21%, about 7% behind your peer group, and the price travelers see when they search is running about 10% higher than your peers.",
    partnerResponse:
      "10% more expensive than competitors. But Oliver, as we discussed, when automated programs like the Booking Sponsored Benefit kick in to adjust the price, it feels like we lose control of our own strategy. I don't want guests seeing us as an 'affordable' option or booking purely on price.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'hv-r18-step3-just-visibility',
    label: 'Cite the visibility drop only',
    description:
      "Right that visibility lags, incomplete - naming the visibility gap without the 10% search-price cause leaves a data-led partner unable to connect the symptom to anything she can act on.",
    playerDialogue:
      "The main thing is that your visibility share here is sitting behind your peer group - travelers simply aren't seeing you in their search results as often as they should be, and to my mind that's the real issue we need to be focused on solving today.",
    partnerResponse:
      "And why would that be? Visibility doesn't drop for no reason - what's actually driving it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -3,
  },
  {
    id: 'hv-r18-step3-affordable-push',
    label: 'Tell her to embrace being the cheaper option',
    description:
      "Right that price affects visibility, wrong angle - telling a premium-positioning brand to lean into being 'the affordable choice' hits the exact fear she voiced and reads as tone-deaf to her strategy.",
    playerDialogue:
      "Honestly, being seen as the more affordable option here wouldn't be a bad thing at all - if you lean into it and let travelers find you at a keener price, the extra bookings will follow and start filling those empty rooms in no time at all.",
    partnerResponse:
      "That's the opposite of everything our brand stands for. I explicitly don't want to be the 'affordable' option.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
];

// ───────── Step 4 - Clarify the Booking Sponsored Benefit ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'hv-r18-step4-correct',
    label: 'Clarify BSB honestly',
    description:
      "SME-prescribed handling: acknowledge her reputation concern, then clarify what BSB does - it improves conversion by increasing competitiveness, it isn't applied to all her bookings, and her revenue is untouched because it's funded by Booking.",
    playerDialogue:
      "I hear the concern - you've built a reputation and no one wants their asset devalued. Let me clarify the Booking Sponsored Benefit: its whole point is to improve your conversion by making you more competitive on the platform. It isn't applied to all your bookings, and your revenue stays untouched, because it's funded by us, not you.",
    partnerResponse:
      "Even so - if that program is already funding a discount, why should I consider adjusting our rates or joining additional campaigns?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'hv-r18-step4-dismiss-concern',
    label: 'Tell her the control worry is unfounded',
    description:
      "Right that BSB is benign, wrong delivery - flatly telling a control-minded Revenue Manager her concern is 'nothing to worry about' without explaining the mechanism dismisses a real objection instead of resolving it.",
    playerDialogue:
      "Honestly, Claire, there's really nothing at all to worry about with that program - it just quietly works away in the background and you'll barely notice that it's running. I genuinely wouldn't give it a second thought if I were you; it's the last thing on your list that should be keeping you up at night.",
    partnerResponse:
      "It's adjusting the price travelers see. 'Don't give it a second thought' is not reassuring to someone accountable for our positioning.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'hv-r18-step4-overstate-bsb',
    label: 'Oversell BSB as a guaranteed fix',
    description:
      "Answers her worry by promising BSB alone guarantees her visibility back - an overpromise that a data-led partner will test against the numbers, and that ignores the residual 10% gap.",
    playerDialogue:
      "Just lean on the Booking Sponsored Benefit here - it'll carry your visibility all the way back on its own, guaranteed, so there's genuinely nothing else you'd need to lift a finger on. Let that program do the heavy lifting for you and you'll be level with your peers again before you know it, no further changes needed.",
    partnerResponse:
      "If it fully solved it, my visibility wouldn't still be behind, would it? That doesn't add up.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
];

// ───────── Step 5 - Residual gap + the mobile-rate proposal ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'hv-r18-step5-correct',
    label: 'Show the residual gap, propose a targeted mobile rate',
    description:
      "SME-prescribed handling: even with BSB, her search price is still 10% above peers, which likely caps her visibility and loses travelers at search. Propose a targeted tool rather than a general cut - a mobile rate, since over 60% of searches are on mobile, applying a closed incentive only to mobile searchers.",
    playerDialogue:
      "Even with that program, your search price is still about 10% above your peers, which likely caps your visibility - travelers compare and finish the booking elsewhere, and an empty room is a missed opportunity. Rather than a general rate cut, we'd use a targeted tool: a mobile rate. Over 60% of searches come from mobile, and it applies a closed incentive strictly to mobile searchers.",
    partnerResponse:
      "Hmm, when you frame it around uncaptured search traffic, I see the logic. A targeted mobile adjustment... oh, sorry - actually we're not allowed to do that, it's against our brand rules and we could be fined. Is there another targeted deal we could use instead?",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'hv-r18-step5-general-cut',
    label: 'Propose a general rate reduction after all',
    description:
      "Right that she needs to close the 10% gap, wrong instrument - a general reduction is the ADR hit head office forbids, so it's dead on arrival with a brand-bound partner.",
    playerDialogue:
      "The cleanest way to close that 10% is a modest general reduction on your rates here - just enough to bring the price travelers see in search back into line with your peer group. Bring everything down a notch across the board and the gap simply closes on its own, without any of the fiddly targeted setups you'd otherwise have to manage afterwards.",
    partnerResponse:
      "A general reduction hits our ADR, which head office strictly prohibits. That's exactly what I can't do.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'hv-r18-step5-guarantee',
    label: 'Promise the mobile rate guarantees her visibility back',
    description:
      "Sells the mobile rate with a guaranteed visibility/ranking return for discounting - a promise of ranking reward in exchange for a price move, which breaches compliance in every regime.",
    playerDialogue:
      "Switch on a mobile rate here and I can promise your visibility jumps straight back up the results pages - the incentive effectively buys you that placement, guaranteed. Put the discount in front of mobile searchers and the platform rewards you with the ranking you're missing, so the position you want is locked in the moment you turn it on.",
    partnerResponse:
      "A guaranteed placement bump for a discount? That kind of promise makes me trust the rest less, not more.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

// ───────── Step 6 - The compliant workaround + close ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'hv-r18-step6-correct',
    label: 'Suggest she verify, then optimize existing deals',
    description:
      "SME-prescribed close: suggest she double-check the mobile-rate rule with head office (it doesn't read as a blocker in your records), and in the meantime recover visibility by optimizing her existing deals - her early and last-minute deals are set to non-refundable only with a very limited booking window.",
    playerDialogue:
      "I'd double-check that rule with head office, honestly - it doesn't read as a blocker in my records. But to recover visibility quickly in the meantime, why don't we optimize the deals you already run? Your early and last-minute deals are currently set to non-refundable only, with a very limited booking window - loosening that would help without touching your ADR.",
    partnerResponse:
      "I didn't realise they were so restricted. Let's make the flexible rate more attractive and extend the window travelers can book in. That addresses the visibility gap and keeps us in full control - we run these on a quarterly basis anyway.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'hv-r18-step6-push-mobile',
    label: 'Push her to run the mobile rate anyway',
    description:
      "She's told you the mobile rate risks a fine under her brand rules - pressing her to run it regardless asks her to take on a compliance risk that isn't yours to accept, and ignores a partner who was ready to cooperate.",
    playerDialogue:
      "Between us, plenty of partners quietly run the mobile rate despite rules like that and it's genuinely fine - I'd just switch it on discreetly at your end and not raise it with head office at all. Nobody is going to come chasing you over one targeted rate, and the visibility you'd win back is well worth stepping around the paperwork for.",
    partnerResponse:
      "You're asking me to break a brand rule and risk a fine. That's absolutely not happening.",
    styleMatch: { red: -1, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
  {
    id: 'hv-r18-step6-defer-vague',
    label: 'Leave it with her to check the rules',
    description:
      "Sends her off to check the rule but offers no compliant move in the meantime - so a partner who was ready to act leaves with nothing to do and the visibility gap stays open.",
    playerDialogue:
      "I think the best thing here is for you to go away and confirm those rules directly with head office first, then circle back to me once you know exactly what you're permitted to run. There's really no sense in us mapping anything out until you've had that conversation and can tell me where the boundaries actually sit.",
    partnerResponse:
      "So we do nothing until I've chased that down? I'd hoped to leave today with something I can actually action.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: 'Open partner-led on her priorities',
    partnerPrompt:
      "Good morning, Oliver. Yes, things are going very well, thank you. Based on our agenda today, I understand we're reviewing our performance for the upcoming quarter.",
    options: step1Options,
  },
  {
    id: 'present-gap',
    label: 'Present the sell-through + unsold gap',
    partnerPrompt:
      "Well, Oliver, our main directive from head office remains the same: protect our ADR and keep our website the core channel for guest acquisition. We keep price consistency across platforms, and right now it's paying off - we're in line with expectations.",
    options: step2Options,
  },
  {
    id: 'visibility-gap',
    label: 'The visibility + search-price gap',
    partnerPrompt:
      "24% unsold rooms... let's put that in context, Oliver. Our reports show our revenue goals are being met, past and future. If our volume on OTAs is somewhat lower, that's a trade-off we accept. We'd rather hold our price positioning than sell 100% of inventory.",
    options: step3Options,
  },
  {
    id: 'clarify-bsb',
    label: 'Clarify the Booking Sponsored Benefit',
    partnerPrompt:
      "10% more expensive than competitors. But Oliver, when automated programs like the Booking Sponsored Benefit kick in to adjust the price, it feels like we lose control of our own strategy. I don't want guests seeing us as an 'affordable' option or booking purely on price.",
    options: step4Options,
  },
  {
    id: 'mobile-proposal',
    label: 'Residual gap + the mobile-rate proposal',
    partnerPrompt:
      "Even so - if that program is already funding a discount, why should I consider adjusting our rates or joining additional campaigns?",
    options: step5Options,
  },
  {
    id: 'close',
    label: 'The compliant workaround + close',
    partnerPrompt:
      "A targeted mobile adjustment... oh, sorry, I almost forgot - we're not allowed to do that, it's against our brand rules and we could be fined. Is there another targeted deal we can apply instead?",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for hidden-valley-none/
 * -narrow/-wide at round 18 in branchingScenarios.ts.
 */
export function hiddenValleyR18(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 18,
    issueTreePath: hiddenValleyR8IssueTreePath,
    openingAm,
    steps,
  };
}
