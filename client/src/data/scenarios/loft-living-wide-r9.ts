import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { loftLivingR9IssueTreePath } from './loft-living-base';

/**
 * Loft Living Inn - Round 9 - Wide Parity variant.
 *
 * Source: SME "Round 9" doc, Conversation 1 (Wide Parity). In a Wide
 * market the AM may ask for the same rates, conditions, and availability
 * Lucas provides to the Key OTA and his direct channel, and may name the
 * third party leaking the rate - but cannot instruct him to stop working
 * with the wholesaler. The learner acknowledges the leakage, reframes B2B
 * as a leakage tax, clarifies Booking.com is not the source, makes the
 * alignment ask, offers a mobile fix, and closes gracefully on the soft
 * no. The risky distractor tells him to drop the wholesaler - a Wide
 * breach.
 */

const openingAm =
  "Hi Lucas, thanks for taking my call. I've been looking at your performance - would you like to go straight to the data points?";

// ───────── Step 1 - Reveal the volume drop behind a high ADR ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'll-r9-wide-step1-correct',
    label: 'Contrast the high ADR with the room-night drop; probe the approach',
    description:
      "SME-prescribed reveal: his ADR is well above peer, but past and future room nights are dropping severely - around 45% versus peers. Surface it and ask him to help you understand his current pricing approach rather than presuming.",
    playerDialogue:
      "Your average daily rate is well above your peer group, but your past and future room nights are dropping severely versus peers - around 45%. Did you notice this volume drop, and could you help me understand your current pricing approach?",
    partnerResponse:
      "I've noticed it, but frankly I'm frustrated. Booking.com keeps applying those 'Partner Offers' and undercutting my direct rates. It's hurting my price integrity.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-wide-step1-accuse',
    label: 'Tell him his ADR is simply too high',
    description:
      "Right that the gap matters, wrong route - it presumes the fix and reads as a price lecture to a commercial operator who hasn't told you his strategy yet. He'll dig in.",
    playerDialogue:
      "The problem is obvious - your ADR is far too high for this market, so you'll need to bring it down if you want the volume back.",
    partnerResponse:
      "You've looked at one number and decided I'm overpriced. That's not a diagnosis, that's a guess.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'll-r9-wide-step1-fluff',
    label: 'Open with reassurance and no data',
    description:
      "Warm, but it wastes the slot for a data-led MPP who just agreed to go straight to the numbers.",
    playerDialogue:
      "Honestly, your ADR looks strong, so I wouldn't worry too much - the volume tends to catch up over time.",
    partnerResponse:
      "I run a portfolio on margins. 'It'll catch up' isn't something I can take to my owners.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the volume drop behind a high ADR',
  partnerPrompt:
    "Hello! Yes, let's do it.",
  options: step1Options,
};

// ───────── Step 2 - Acknowledge the leak; reframe B2B as a leakage tax ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'll-r9-wide-step2-correct',
    label: 'Reframe B2B as a leakage tax; ask for the same rates',
    description:
      "SME-prescribed handle: acknowledge the frustration - B2B distribution is built for opaque volume, but the moment it leaks into B2C it becomes a leakage tax on his brand. In a Wide market you can ask for the same rates he makes available to third parties and his direct channel, so his direct offering isn't undercut.",
    playerDialogue:
      "I understand this leakage is frustrating. B2B distribution is designed for opaque volume - but the moment it leaks into the B2C space, it becomes a leakage tax on your brand. To stop your direct offering being undercut, we'd ask that you provide us the same rates you make available to third parties and your direct channel.",
    partnerResponse:
      "But these 'offers' are displayed on your platform. How am I even supposed to understand where they come from?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-wide-step2-concede-po',
    label: 'Agree Partner Offer is Booking undercutting him',
    description:
      "Concedes his framing that Partner Offer is Booking.com discounting his rooms, and offers to switch it off - validating the objection instead of reframing where the leak actually comes from.",
    playerDialogue:
      "You're right, Partner Offer is us undercutting you - if it's causing this much grief, I can look into having it removed from your property.",
    partnerResponse:
      "So you admit it's you doing it. That doesn't fix my price integrity, it just confirms my problem.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'll-r9-wide-step2-blame',
    label: 'Tell him the leak is his own mess to clean up',
    description:
      "Right that the source is his B2B setup, wrong tone - dumping it on him as his mess abandons the acknowledgment step and turns a commercial ally into an adversary.",
    playerDialogue:
      "Look, you signed those wholesale deals - the leak is your mess, and it's on you to go and clean it up.",
    partnerResponse:
      "I called to look at performance, not to be told my business is a mess. Watch your tone.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -8,
  },
];

const step2: BranchingStep = {
  id: 'leakage-tax',
  label: 'Acknowledge the leak; reframe B2B as a leakage tax',
  partnerPrompt:
    "I've noticed it, but frankly I'm frustrated. Booking.com keeps applying those 'Partner Offers' and undercutting my direct rates. It's hurting my price integrity.",
  options: step2Options,
};

// ───────── Step 3 - Clarify Booking is not the source; probe monitoring ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'll-r9-wide-step3-correct',
    label: 'Clarify the source is his wholesale agreements; probe how he monitors it',
    description:
      "SME-prescribed clarification: Booking.com displays the rate to protect his sales volume but isn't the source - these rates come from his own wholesale agreements. Ask how he currently monitors where his wholesale rates end up.",
    playerDialogue:
      "We display them to protect your sales volume, but we're not the source - these rates are actually coming from your own wholesale agreements. Instead of delivering opaque incremental value, they've broken into a space where you run a different pricing strategy. How do you currently monitor where your wholesale rates end up?",
    partnerResponse:
      "We sign contracts with those distributors for a reason. If they leak them, it's a breach - but matching them publicly just makes it harder for me to manage my revenue.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-wide-step3-defensive',
    label: 'Get defensive about Booking.com',
    description:
      "Deflects onto his suppliers without giving him the useful clarification - that the rate is his wholesale rate, not Booking's. It reads as dodging rather than diagnosing.",
    playerDialogue:
      "It's really not our fault - this is entirely a supplier problem, so you should go take it up with them, not us.",
    partnerResponse:
      "That's a lot of 'not us' and not much help. Where does that leave me?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'll-r9-wide-step3-concede',
    label: 'Accept that matching just makes his job harder',
    description:
      "Concedes his objection and drops the alignment ask entirely - leaving the leak in place and the visibility problem unaddressed.",
    playerDialogue:
      "That's a fair point - if aligning makes your revenue management harder, let's just leave your rates as they are.",
    partnerResponse:
      "So we agree there's nothing to do? Then I'm not sure why we're on the call.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

const step3: BranchingStep = {
  id: 'clarify-source',
  label: 'Clarify Booking is not the source; probe monitoring',
  partnerPrompt:
    "But these 'offers' are displayed on your platform. How am I even supposed to understand where they come from?",
  options: step3Options,
};

// ───────── Step 4 - Link the leak to conversion; re-ask alignment ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'll-r9-wide-step4-correct',
    label: 'Connect the leak to the 68% conversion drop; re-ask for the same rates',
    description:
      "SME-prescribed link: travelers are buying those opaque rates instead of the platform's, which is why conversion is down 68% versus peers. To stop the leakage eroding his revenue, re-ask for the same rates and conditions he makes available to other third parties and his direct website.",
    playerDialogue:
      "Right now travelers are buying those opaque rates instead of yours - and that's why your conversion is down 68% versus peers. To stop the leakage eroding your revenue, we ask that you provide us the same rates and conditions you make available to other third parties and your direct website.",
    partnerResponse:
      "If I match those rates on your end, I'm just giving away more margin on Booking.com.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-wide-step4-pricewar',
    label: 'Tell him to undercut the leaked rate everywhere',
    description:
      "Right that the leaked rate is the problem, wrong route - telling him to go lower than the wholesale rate across the board is the price war the SME warns against, and it torches the ADR he's protecting.",
    playerDialogue:
      "The fastest fix is to just price below that leaked wholesale rate everywhere - undercut it and the leak stops mattering.",
    partnerResponse:
      "So your answer is a race to the bottom that kills the ADR I've worked to hold? No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
  {
    id: 'll-r9-wide-step4-vague',
    label: 'Restate the problem without the data',
    description:
      "Names the leak again but never connects it to the conversion number, so a proof-driven MPP has nothing concrete to weigh.",
    playerDialogue:
      "The leak is really hurting you - it's a big problem and it's something we should sort out soon.",
    partnerResponse:
      "You keep saying it's a problem. Show me the number that proves it.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
];

const step4: BranchingStep = {
  id: 'link-conversion',
  label: 'Link the leak to conversion; re-ask alignment',
  partnerPrompt:
    "We sign contracts with those distributors for a reason. If they leak them, it's a breach - but matching them publicly just makes it harder for me to manage my revenue.",
  options: step4Options,
};

// ───────── Step 5 - Unsold rooms + mobile fix; do not dictate the wholesaler ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'll-r9-wide-step5-correct',
    label: 'Frame the unsold-room risk and offer the mobile-rate fix',
    description:
      "SME-prescribed handle: if visibility keeps dropping, those rooms sit empty and hurt him more than any margin trade. His mobile rate is uncompetitive because the rate rise outpaced the discount. You can't tell him to stop working with the wholesaler, but you can align his base rates so he stays attractive and recover demand.",
    playerDialogue:
      "If your visibility keeps sliding, those rooms will likely sit empty - which costs you far more than the margin you're protecting. Your mobile rate is also uncompetitive right now, probably because your rate increase outpaced the discount. I can't tell you to stop working with those wholesalers, but what if we align your base rates so you stay an attractive option and start recovering that demand?",
    partnerResponse:
      "Ok, I get your point, but I can't take any action right now. I'll look at it by the end of the week - thanks for bringing this up.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'll-r9-wide-step5-drop-wholesaler',
    label: 'Tell him to drop the wholesaler',
    description:
      "In a Wide market you may name the third party leaking the rate, but you cannot instruct the partner to stop working with the wholesaler. Telling him to cut them off oversteps.",
    playerDialogue:
      "Honestly, the clean fix is to just stop working with that wholesaler altogether - cut the contract and the leak disappears.",
    partnerResponse:
      "You don't get to tell me which distributors I work with. That's my commercial decision, not yours.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'll-r9-wide-step5-slash-base',
    label: 'Tell him to slash his base rate across the board',
    description:
      "Answers the margin worry with a blanket base-rate cut - reintroducing the price war and giving up the ADR premium instead of the targeted alignment and mobile fix.",
    playerDialogue:
      "Simplest thing is to cut your base rate across the board here so you're never the expensive option - the volume comes straight back.",
    partnerResponse:
      "That's the everything-off approach again. It torches my ADR and I can't measure it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
];

const step5: BranchingStep = {
  id: 'unsold-mobile',
  label: 'Unsold rooms + mobile fix; do not dictate the wholesaler',
  partnerPrompt:
    "If I match those rates on your end, I'm just giving away more margin on Booking.com.",
  options: step5Options,
};

// ───────── Step 6 - Close gracefully on the soft no ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'll-r9-wide-step6-correct',
    label: 'Respect the deferral; offer more data and book the follow-up',
    description:
      "SME-prescribed close on a soft no: don't push. Respect that he'll look at it by the end of the week, offer to pull together any more data that would help, and set up a follow-up for next month.",
    playerDialogue:
      "No problem at all, Lucas - take the time you need. Let me know if I can pull together any more data to help you build the case, and I'll set up a follow-up for next month.",
    partnerResponse:
      "Appreciated - send me whatever supports it and we'll pick this up next month once I've dug into it.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'll-r9-wide-step6-guilt',
    label: 'Warn him about the revenue he loses by waiting',
    description:
      "Turns his reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue:
      "Alright, but every week you wait on this is real money walking out the door - I'd hate for you to look back on that.",
    partnerResponse:
      "I said I'd look at it by Friday. Pushing me now just makes me less inclined.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'll-r9-wide-step6-ultimatum',
    label: 'Give him a deadline or lose more visibility',
    description:
      "Attaches a visibility ultimatum to his timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue:
      "Just so you know - if this isn't sorted by next month, expect your visibility to keep dropping in the meantime.",
    partnerResponse:
      "So it's act now or get buried? That's not the partnership I thought this was.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step6: BranchingStep = {
  id: 'close',
  label: 'Close gracefully on the soft no',
  partnerPrompt:
    "Ok, I get your point, but I can't take any action right now. I'll look at it by the end of the week - thanks for bringing this up.",
  options: step6Options,
};

// ───────── Assembled tree ─────────

export const loftLivingWideR9: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'loft-living-wide',
  round: 9,
  issueTreePath: loftLivingR9IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5, step6],
};
