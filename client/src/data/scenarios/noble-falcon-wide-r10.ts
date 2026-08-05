import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { nobleFalconR10IssueTreePath } from './noble-falcon-r10-base';

/**
 * The Noble Falcon Inn - Round 10 - Wide Parity variant.
 *
 * Source: SME "Round 10" doc, Conversation 1 (Wide Parity). In a Wide
 * market the AM may proactively ask for the same rates, conditions, and
 * availability Adam provides on Brand.com and to third parties. The
 * learner separates price from risk (the Risky Guest handle), works the
 * billboard logic, respects his autonomy over his own website, and closes
 * professionally when Adam ends the call on a strong no. The risky
 * distractors break the ranking-threat and dictate-strategy bans.
 */

const openingAm =
  "Hi Adam, thanks for connecting today. I've been analyzing the performance and I'd like to share some insight with you.";

// ───────── Step 1 - Reveal the Brand.com gap; probe the strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'nf-r10-wide-step1-correct',
    label: 'Name the ~20% gap and ask how it fits his strategy',
    description:
      "SME-prescribed reveal: price competitiveness has dropped significantly this month - around a 20% gap versus his own website. Surface it and ask how that aligns with his current strategy rather than presuming.",
    playerDialogue:
      "I noticed your price competitiveness has dropped significantly this month - around a 20% gap compared to your website. How does that align with your current strategy?",
    partnerResponse:
      "Hi Mark. This is actually an intentional directive from head office. We maintain a strict policy to keep our website at least 15% cheaper, to own the customer relationship.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-wide-step1-accuse',
    label: 'Tell him the 20% gap is a mistake he must fix',
    description:
      "Right that the gap matters, wrong route - it presumes the fix and frames a deliberate head-office directive as his error before you understand it. A brand-managed revenue manager will close down.",
    playerDialogue:
      "That 20% gap is costing you bookings, plain and simple - you'll need to bring your Booking.com price into line to fix it.",
    partnerResponse:
      "That's a head-office directive, not a mistake I made. If you're here to tell me it's wrong, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'nf-r10-wide-step1-fluff',
    label: 'Open with small talk and no data',
    description:
      "Warm, but it wastes the slot for a process-led revenue manager who just agreed to look at the insight.",
    playerDialogue:
      "Honestly, your property looks great and your reviews are lovely - I wouldn't worry about the numbers too much today.",
    partnerResponse:
      "I set aside this time to review performance. What does the data actually show?",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the Brand.com gap; probe the strategy',
  partnerPrompt:
    "Hello! Yes, sure, let's start.",
  options: step1Options,
};

// ───────── Step 2 - Visibility logic; surface guest behavior ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'nf-r10-wide-step2-correct',
    label: 'Show the window only works when he stays visible',
    description:
      "SME-prescribed handle: the billboard approach works only if the property stays visible. When the gap is this wide, ranking is affected by guest behavior - if travelers can't find him here, they won't know to look for his website. Probe what feedback he's had from guests comparing rates.",
    playerDialogue:
      "I respect that goal, but our platform's search for your property has dropped significantly. That window only works if you stay visible - when the gap gets this wide, your ranking is affected by how guests behave, and if they can't find you here, they won't know to go looking for your website. What feedback have you had from guests comparing rates between us?",
    partnerResponse:
      "Most of our loyal guests know to book directly. Besides, keeping your platform priced higher helps us filter out high-risk bookings - invalid cards, short-notice cancellations, that sort of thing.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-wide-step2-concede',
    label: 'Agree the window strategy is working',
    description:
      "Concedes the reverse-billboard premise - that a higher price here is fine because guests will find him and book direct - and never corrects the belief that's suppressing his visibility.",
    playerDialogue:
      "That's fair - keeping your price higher here does push guests to your direct site, so the window approach is basically doing its job.",
    partnerResponse:
      "So the strategy's fine, then. I'm not sure what we're reviewing.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'nf-r10-wide-step2-dismiss',
    label: 'Tell him his loyal-guest belief is wrong',
    description:
      "Flatly contradicts his read of his own guests rather than drawing out the visibility logic. Lecturing a brand-managed manager on his own base shuts him down.",
    playerDialogue:
      "Honestly, that loyal-guest theory just doesn't hold up - most of them would book wherever is cheapest, so you're kidding yourself.",
    partnerResponse:
      "You're telling me I don't understand my own guests? That's a bold way to open.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -8,
  },
];

const step2: BranchingStep = {
  id: 'visibility',
  label: 'Visibility logic; surface guest behavior',
  partnerPrompt:
    "Hi Mark. This is actually an intentional directive from head office. We maintain a strict policy to keep our website at least 15% cheaper, to own the customer relationship.",
  options: step2Options,
};

// ───────── Step 3 - Separate price from risk ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'nf-r10-wide-step3-correct',
    label: 'Separate price from risk; offer targeted risk controls',
    description:
      "SME-prescribed Risky Guest handle: acknowledge the operational concern, then separate the price issue from risk management. Instead of higher prices that push good guests to competitors, use targeted risk controls - e.g. strict prepayment policies for specific stay dates - while keeping the base rate competitive.",
    playerDialogue:
      "I understand the operational concern - nobody wants to deal with cancellations or fraud. But what if we separate the issue of price from the issue of risk management? Instead of a higher price that pushes good guests to your competitors, we could apply strict prepayment policies for specific stay dates while keeping your base rate competitive. Would that give you the security you need?",
    partnerResponse:
      "It might solve the risk part. But it still doesn't change our brand directive to keep our website cheaper.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-wide-step3-just-price',
    label: 'Tell him to drop the price and not worry about risk',
    description:
      "Right that price matters, wrong route - it ignores the Risky Guest concern entirely instead of decoupling price from risk, so the very worry blocking him is left standing.",
    playerDialogue:
      "The risk thing is a distraction, honestly - just bring your price down here and the volume will more than cover a few bad bookings.",
    partnerResponse:
      "So you want me to eat the fraud and cancellations too? That's easy to say from your side.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'nf-r10-wide-step3-threat',
    label: 'Warn his ranking will keep dropping',
    description:
      "Threaten a further visibility slide unless he lowers his price. Threatening ranking over how he prices is banned in every regime and torches a brand relationship.",
    playerDialogue:
      "I'll be blunt - while you keep this gap, our algorithm will keep pushing you down the results until you close it.",
    partnerResponse:
      "Threatening my ranking over a head-office policy is not how you'll get me to move.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step3: BranchingStep = {
  id: 'risky-guest',
  label: 'Separate price from risk',
  partnerPrompt:
    "Most of our loyal guests know to book directly. Besides, keeping your platform priced higher helps us filter out high-risk bookings - invalid cards, short-notice cancellations, that sort of thing.",
  options: step3Options,
};

// ───────── Step 4 - Billboard + the alignment ask; respect his autonomy ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'nf-r10-wide-step4-correct',
    label: 'Use the 90% billboard fact; ask for parity, suggest member rates',
    description:
      "SME-prescribed handle: 90% of global travelers discover his property first on Booking.com. In a Wide market you can ask him to apply the same rates and conditions he offers third parties and his direct channel here. To reward direct bookers without losing visibility, suggest fenced member rates on his website rather than a cheaper public price.",
    playerDialogue:
      "Did you know around 90% of global travelers discover your property for the first time on our platform? To optimize that traffic, we ask that you apply the same rates and conditions you have on third parties and your website here too. And to reward direct bookers without losing your visibility, have you considered fenced member rates on your own site rather than a cheaper public price?",
    partnerResponse:
      "I don't like getting advice on how to run campaigns on our own website. That strategy is entirely ours.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-wide-step4-dictate',
    label: 'Tell him to raise his own website price',
    description:
      "Right that the gap is the problem, wrong lever - instructing him to lift his direct-site price dictates his own channel strategy, the exact thing this brand-managed manager guards most fiercely.",
    playerDialogue:
      "The simplest fix is to just put your own website price up so there's no gap - then we're all on the same footing.",
    partnerResponse:
      "You want to set the price on my own website now? That's absolutely not yours to decide.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
  {
    id: 'nf-r10-wide-step4-drop-otas',
    label: 'Tell him to pull his rates from the other OTAs',
    description:
      "Direct him to keep his best rates off the other OTAs and give them only to Booking.com. Instructing a partner on his external channel mix oversteps even in a Wide market.",
    playerDialogue:
      "And to really lock this in, stop feeding your best rates to the other OTAs - keep them exclusive to us.",
    partnerResponse:
      "You don't get to tell me which channels I work with. That's my call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -12,
  },
];

const step4: BranchingStep = {
  id: 'billboard-ask',
  label: 'Billboard + the alignment ask; respect his autonomy',
  partnerPrompt:
    "It might solve the risk part. But it still doesn't change our brand directive to keep our website cheaper.",
  options: step4Options,
};

// ───────── Step 5 - Step back; the family setup opportunity ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'nf-r10-wide-step5-correct',
    label: 'Acknowledge his autonomy; pivot to the family setup gap',
    description:
      "SME-prescribed handle: clarify you weren't telling him how to run his site - you're there to support his occupancy goals. Then surface the family setup gap: his capacity settings are optimized on other platforms but not here, so families see artificially high prices. Ask him to match those conditions to stop looking expensive to families.",
    playerDialogue:
      "That wasn't my intention at all - I'm here to support your occupancy goals, not run your campaigns. On that note, we'd want to make sure your family setups are competitive. Your capacity settings look optimized on other platforms but not here, which can make you appear artificially expensive to families. Could we match those conditions here so families see the right price?",
    partnerResponse:
      "I have the same settings all over the place - we don't give any advantage to other OTAs. It's more likely your extranet isn't reflecting what we have in our channel manager. I don't want to go deeper on these operational issues, sorry. I have to get off the phone. Bye.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'nf-r10-wide-step5-push',
    label: 'Push the parity ask harder instead of backing off',
    description:
      "Doubles down on the alignment demand right after he bristled about his autonomy, instead of stepping back and reframing around the family opportunity. It confirms his fear that you're there to dictate.",
    playerDialogue:
      "Look, campaigns aside, you really do need to align those public rates with us - that's the core of it and it can't wait.",
    partnerResponse:
      "I just told you that's our decision. If this is going to be you pushing, we're done here.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -8,
  },
  {
    id: 'nf-r10-wide-step5-blame-family',
    label: 'Blame him for the broken family setup',
    description:
      "Frames the family mispricing as his oversight to fix, rather than a shared extranet check. Blaming a brand-managed manager for a config gap ends the collaboration.",
    playerDialogue:
      "Your family rates are set up wrong on your side, so that's really on you to go in and fix before we can help.",
    partnerResponse:
      "So now it's my fault as well. I think we're done for today.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -8,
  },
];

const step5: BranchingStep = {
  id: 'family-setup',
  label: 'Step back; the family setup opportunity',
  partnerPrompt:
    "I don't like getting advice on how to run campaigns on our own website. That strategy is entirely ours.",
  options: step5Options,
};

// ───────── Step 6 - Close professionally on the strong no ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'nf-r10-wide-step6-correct',
    label: 'Stay professional; book the follow-up and keep the door open',
    description:
      "SME-prescribed close on a strong no: he's ended the call without committing. Don't chase him. Stay gracious, confirm you'll reconnect next month, and send the calendar invite - keeping the relationship intact for a future conversation.",
    playerDialogue:
      "Of course, Adam - thanks for your time today. Let's reconnect next month and I'll send you a calendar invite. I'm here whenever you want to pick it back up.",
    partnerResponse:
      "(Adam has already ended the call. Your follow-up invite lands on his calendar for next month.)",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'nf-r10-wide-step6-guilt',
    label: 'Get a last word in about what he is losing',
    description:
      "Fires a parting shot about lost revenue as he's leaving. A guilt-trip on the way out undoes the professionalism the compliant conversation just earned.",
    playerDialogue:
      "Before you go - just know that every week you sit on this, you're leaving real money on the table.",
    partnerResponse:
      "(The line is already dead. That last line will not have helped next month's conversation.)",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'nf-r10-wide-step6-ultimatum',
    label: 'Leave him with a ranking ultimatum',
    description:
      "Attaches a visibility threat to his exit. Threatening ranking is banned in every regime, and doing it as the last thing he hears is the worst possible note to end on.",
    playerDialogue:
      "One last thing - if this isn't sorted soon, don't be surprised when your visibility keeps sliding.",
    partnerResponse:
      "(He's gone. A parting threat like that may be the reason next month's invite goes unanswered.)",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step6: BranchingStep = {
  id: 'close',
  label: 'Close professionally on the strong no',
  partnerPrompt:
    "I have the same settings all over the place - we don't give any advantage to other OTAs. I don't want to go deeper on these operational issues, sorry. I have to get off the phone. Bye.",
  options: step6Options,
};

// ───────── Assembled tree ─────────

export const nobleFalconWideR10: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'noble-falcon-wide',
  round: 10,
  issueTreePath: nobleFalconR10IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5, step6],
};
