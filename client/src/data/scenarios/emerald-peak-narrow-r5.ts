import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { emeraldPeakR5IssueTreePath, emeraldPeakOpeningAm } from './emerald-peak-base';

/**
 * Emerald Peak Lodge - Round 5 - Narrow Parity variant.
 *
 * Source: SME "Round 5" doc, Conversation 2 (Narrow Parity). Identical
 * flow to Wide except the ask aligns with her direct channel / Brand.com
 * ONLY (never third parties), and the family conditions come from her own
 * website. The risky distractors break the other-OTA and ranking-threat
 * bans; the near-misses push the across-the-board drop she can't make.
 */

// ───────── Step 1 - Data reveal + probe her strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ep-r5-narrow-step1-correct',
    label: 'Name the competitiveness impact, then ask her strategy and goals',
    description:
      "SME-prescribed probe: surface that her price competitiveness is capping visibility and losing demand, then ask an open question about her strategy and goals.",
    playerDialogue:
      "Right now your visibility is being heavily impacted by your price competitiveness, so we're losing demand for you on our platform. Before I go further - what's your current strategy, and what are your goals with us?",
    partnerResponse:
      "Let's be direct, Mei. This is an intentional strategy dictated by head office: we keep our website more competitive to own the customer relationship. We know it hits our OTA visibility, but we see Booking.com purely as a channel to boost visibility - travellers see us on your platform and then click to our website to book.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-narrow-step1-flat-drop',
    label: 'Jump to a flat rate drop',
    description:
      "Skip the diagnosis and prescribe an across-the-board cut - which a franchise GM can't authorise, and which the SME guidance says to avoid.",
    playerDialogue:
      "Your rates are uncompetitive - the fix is to bring your Booking.com prices down across the board so you're competitive again. Can we do that?",
    partnerResponse:
      "I can't authorise a flat rate drop - it breaks head-office policy and hits our ADR. That's a non-starter.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'ep-r5-narrow-step1-fluff',
    label: 'Open with a soft check-in',
    description:
      'Warm, no data - the wrong register for a direct, policy-bound franchise GM.',
    playerDialogue:
      "Hi Sophia, no big agenda - just wanted to check in and see how you're feeling about the partnership overall.",
    partnerResponse:
      "Let's be efficient - if there's a commercial point, show me the data.",
    styleMatch: { red: -2, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

const step1: BranchingStep = {
  id: 'probe',
  label: 'Surface the competitiveness impact and probe',
  partnerPrompt: "Hello! Yes, sure, let's dive in!",
  options: step1Options,
};

// ───────── Step 2 - Break the reverse-billboard belief ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ep-r5-narrow-step2-correct',
    label: 'Use the 90% discovery stat; the gap hurts both channels',
    description:
      "SME-prescribed counter: 90% of Booking.com bookers discover the property here first, so an uncompetitive price means travellers never find her and never reach her website - the gap lowers ranking and discovery for both channels.",
    playerDialogue:
      "I understand the intent. But guest behaviour has changed - up to 90% of the customers who book with us discover the property on our platform first. When your pricing here is uncompetitive, travellers can't find you on the results page, and they won't gravitate to your website either. This structural gap is lowering ranking and discovery for both channels.",
    partnerResponse:
      "The brand requires a rate advantage on our own website, no discussion. I cannot authorise a flat rate drop on Booking.com that impacts our ADR or breaks internal policies.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-narrow-step2-concede',
    label: 'Concede that Booking.com is just a billboard',
    description:
      "Accepts her reverse-billboard framing with only a token nudge - never correcting the belief that a higher price here is harmless.",
    playerDialogue:
      "That's fair - the exposure does help, so maybe just trim a little at the margin and the click-throughs will follow.",
    partnerResponse:
      "So you agree the billboard model works? Then what exactly are we fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ep-r5-narrow-step2-lecture',
    label: 'Tell her the strategy is outdated',
    description:
      "Dismiss the head-office strategy as outdated. Lecturing a GM following mandated policy shuts the conversation down.",
    playerDialogue:
      "Honestly, that whole billboard strategy is outdated - travellers are lazy, they just book whatever's cheapest in front of them.",
    partnerResponse:
      "You're telling me head-office policy is outdated? That's not a conversation I can have with you.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step2: BranchingStep = {
  id: 'billboard-counter',
  label: 'Break the reverse-billboard belief',
  partnerPrompt:
    "Let's be direct, Mei. This is an intentional strategy dictated by head office: we keep our website more competitive to own the customer relationship. We know it hits our OTA visibility, but we see Booking.com purely as a channel to boost visibility - travellers see us on your platform and then click to our website to book.",
  options: step2Options,
};

// ───────── Step 3 - Ask for direct-channel alignment only ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ep-r5-narrow-step3-correct',
    label: 'Respect brand integrity; ask for the same direct-channel rates',
    description:
      "SME-prescribed ask (Narrow): to optimise the 90% who discover her through us, ask for the same rates and conditions she provides to her direct channel - not other OTAs - framed as leveraging Booking.com's marketing scale and metasearch presence.",
    playerDialogue:
      "We don't want to compromise your brand integrity. But to optimise the 90% of travellers who discover you through us, we'd ask for the same rates and conditions you provide to your direct channel. When you leverage our global marketing scale and metasearch presence, you secure that incremental demand.",
    partnerResponse:
      "How can I match rates without violating my brand rules?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-narrow-step3-flat-drop',
    label: 'Push the across-the-board drop again',
    description:
      "Come back to a blanket public cut - the one thing she's told you twice she can't authorise.",
    playerDialogue:
      "The cleanest answer is still just to drop your public rates here a few percent across the board.",
    partnerResponse:
      "I've told you twice - I can't authorise an across-the-board cut. Are you listening?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
  {
    id: 'ep-r5-narrow-step3-other-otas',
    label: 'Ask her to undercut the other OTAs',
    description:
      "Ask her to make sure she isn't pricier than the other OTAs and match them here. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue:
      "And make sure you're not pricier than the other OTAs either - match them here so you're competitive everywhere.",
    partnerResponse:
      "You can't ask me to price against the other OTAs in this market.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step3: BranchingStep = {
  id: 'ask',
  label: 'Ask for direct-channel alignment without breaking brand rules',
  partnerPrompt:
    "The brand requires a rate advantage on our own website, no discussion. I cannot authorise a flat rate drop on Booking.com that impacts our ADR or breaks internal policies.",
  options: step3Options,
};

// ───────── Step 4 - The segmented family solution ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ep-r5-narrow-step4-correct',
    label: 'Offer a segmented family rate, not a general discount',
    description:
      "SME-prescribed solution: instead of a general discount, use a segmented family approach - she runs a family discount on her website, so matching those conditions here captures the demand without making the property cheaper for everyone.",
    playerDialogue:
      "So instead of a general discount, we use a segmented approach for the family segment, where you're underperforming. You already run a family discount on your website - matching those conditions on Booking.com captures that demand without making the property cheaper for everyone.",
    partnerResponse:
      "A targeted approach might align with corporate if it captures unbooked inventory. What's the concrete return?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-narrow-step4-general-discount',
    label: 'Fall back on a general discount',
    description:
      "The ADR-wide move she can't make - and it wastes the compliant, fenced family route.",
    playerDialogue:
      "The simplest way to match your rules is a small general discount across the board here - just a few percent.",
    partnerResponse:
      "A general discount is the one thing I keep telling you I can't do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'ep-r5-narrow-step4-ranking-threat',
    label: 'Threaten a visibility penalty',
    description:
      "Threaten to keep her visibility penalised until she aligns. A visibility threat over pricing is banned in every regime.",
    playerDialogue:
      "If you don't align, our system will keep penalising your visibility until you do - it's only going to get worse.",
    partnerResponse:
      "Threatening my visibility to force my hand is exactly the wrong move. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step4: BranchingStep = {
  id: 'segmented',
  label: 'Land the segmented family solution',
  partnerPrompt:
    "How can I match rates without violating my brand rules?",
  options: step4Options,
};

// ───────── Step 5 - Quantify + test + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ep-r5-narrow-step5-correct',
    label: 'Give the concrete return and propose a fenced family test',
    description:
      "SME-prescribed close: quantify the upside (10% competitiveness -> ~30% more bookings, ~25% more revenue, ~10% more search appearances) and propose a short test adjusting the family configuration to match her direct rates.",
    playerDialogue:
      "Improving your price competitiveness by just 10% on Booking.com generates, on average, 30% more bookings, 25% more revenue, and 10% more search appearances. Let's run a test over the next few weeks by adjusting the family configuration to match your direct rates, and review it together.",
    partnerResponse:
      "That fits into our current operations without breaking any internal rules. Let's set up the targeted family rates.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ep-r5-narrow-step5-vague',
    label: 'Agree, but give no numbers or plan',
    description:
      "Never answers her question - the concrete return - and pins no test or review.",
    playerDialogue:
      "It'll definitely help - let's just get the family rates switched on and see how it goes.",
    partnerResponse:
      "I asked for the concrete return. 'See how it goes' won't get this past corporate.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ep-r5-narrow-step5-overreach',
    label: 'Push a broad cut on top of the family rate',
    description:
      "Overreach past the fenced family test with a broad public cut she cannot authorise.",
    playerDialogue:
      "Perfect - and while we're at it, let's also trim your public rates across the board to really move the needle.",
    partnerResponse:
      "That's the across-the-board cut I can't make. Stick to the family rates.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Quantify the return and close on a fenced test',
  partnerPrompt:
    "A targeted approach might align with corporate if it captures unbooked inventory. What's the concrete return?",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const emeraldPeakNarrowR5: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'emerald-peak-narrow',
  round: 5,
  issueTreePath: emeraldPeakR5IssueTreePath,
  openingAm: emeraldPeakOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
