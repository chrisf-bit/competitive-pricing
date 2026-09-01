import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { emeraldPeakR5IssueTreePath, emeraldPeakOpeningAm } from './emerald-peak-base';

/**
 * Emerald Peak Lodge - Round 5 - Wide Parity variant.
 *
 * Source: SME "Round 5" doc, Conversation 1 (Wide Parity). In a Wide
 * market the AM may ask Sophia for the same rates and conditions she
 * gives third parties and her direct channel. She can't authorise a flat
 * ADR-wide drop (brand policy), so the win is a compliant, segmented
 * family rate that captures the family gap without cheapening everything.
 * The risky distractors break the ranking-threat and dictate-strategy
 * bans; the near-misses push the across-the-board drop she can't make.
 */

// ───────── Step 1 - Data reveal + probe her strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ep-r5-wide-step1-correct',
    label: 'Name the competitiveness impact, then ask her strategy and goals',
    description:
      "SME-prescribed probe: surface that her price competitiveness is capping her visibility and losing demand, then ask an open question about her strategy and goals before recommending anything.",
    playerDialogue:
      "While your performance looks fine in general, we noticed an opportunity. To optimize the 90% of travelers who discover you through us, we ask for the same rates and conditions you provide to third parties and your direct channel. When you factor in our global marketing scale and your net acquisition costs, providing full parity here ensures maximum ROI.",
    partnerResponse:
      "Let's be direct, Mei. This is an intentional strategy dictated by head office: we keep our website more competitive to own the customer relationship. We know it hits our OTA visibility, but we see Booking.com purely as a channel to boost visibility - travelers see us on your platform and then click to our website to book.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-wide-step1-flat-drop',
    label: 'Jump to a flat rate drop',
    description:
      "Skip the diagnosis and prescribe an across-the-board cut. It presumes the fix, ignores that a franchise GM can't authorise an ADR-wide drop, and is the exact move the SME guidance says to avoid.",
    playerDialogue:
      "Your rates just aren't competitive right now, and honestly the quickest fix is the straightforward one - let's bring your Booking.com prices down across the board so you're back in line with everyone else. Can we get that done today?",
    partnerResponse:
      "I can't authorise a flat rate drop - it breaks head-office policy and hits our ADR. That's a non-starter.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'ep-r5-wide-step1-fluff',
    label: 'Open with a soft check-in',
    description:
      'Warm, no data - the wrong register for a direct, time-pressured franchise GM who wants a commercial point.',
    playerDialogue:
      "Hi Sophia, no big agenda from my side today - I really just wanted to check in, see how you're feeling about the partnership overall, and hear whether everything has been running smoothly for you lately on your end.",
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
    id: 'ep-r5-wide-step2-correct',
    label: 'Use the 90% discovery stat; the gap hurts both channels',
    description:
      "SME-prescribed counter: 90% of Booking.com bookers discover the property here first, so if she's uncompetitive travelers never find her and never reach her website either - the structural gap lowers ranking and discovery for BOTH channels.",
    playerDialogue:
      "I understand the intent. But guest behavior has changed - up to 90% of the customers who book with us discover the property on our platform first. When your pricing here is uncompetitive, you are less attractive to travelers, and they won't gravitate to your website either. This structural gap is lowering visibility and discovery for both channels in the long run.",
    partnerResponse:
      "The brand requires a rate advantage on our own website, no discussion. I cannot authorise a flat rate drop on Booking.com that impacts our ADR or breaks internal policies.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-wide-step2-concede',
    label: 'Concede that Booking.com is just a billboard',
    description:
      "Accepts her reverse-billboard framing and offers only a token nudge - never correcting the belief that a higher price here is harmless because guests will click through to her site.",
    playerDialogue:
      "That's fair, and I can see the logic - the exposure we give you genuinely does help drive awareness, so I don't want to overhaul anything you've built. Maybe the move is just to trim your prices here a little at the margin, keep the billboard exposure working the way you've set it up, and let the click-throughs to your own website follow naturally from there.",
    partnerResponse:
      "So you agree the billboard model works? Then what exactly are we fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ep-r5-wide-step2-lecture',
    label: 'Tell her the strategy is outdated',
    description:
      "Dismiss the head-office strategy as outdated and travelers as lazy. Lecturing a GM who's simply following mandated policy shuts the conversation down.",
    playerDialogue:
      "Honestly, if you don't mind me saying, that whole billboard strategy your head office is running feels pretty outdated to me now - travelers today don't research anything, they just scan the results and book whatever happens to be the cheapest thing sitting right in front of them. The mandate really isn't doing you any favors.",
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
    "Let's be direct, Mei. This is an intentional strategy dictated by head office: we keep our website more competitive to own the customer relationship. We know it hits our OTA visibility, but we see Booking.com purely as a channel to boost visibility - travelers see us on your platform and then click to our website to book.",
  options: step2Options,
};

// ───────── Step 3 - The ask, without touching brand integrity ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ep-r5-wide-step3-correct',
    label: 'Respect brand integrity; ask for the same third-party + direct rates',
    description:
      "SME-prescribed ask: don't threaten her brand integrity - to optimize the 90% who discover her through us, ask for the same rates and conditions she gives third parties and her direct channel, framed as leveraging Booking.com's marketing scale and metasearch presence.",
    playerDialogue:
      "We don't want to compromise your brand integrity. But to optimize the 90% of travelers who discover you through us, we'd ask for the same rates and conditions you provide to third parties and your direct channel. When you leverage our global marketing scale and metasearch presence, you secure that incremental demand.",
    partnerResponse:
      "How can I match rates without violating my brand rules?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-wide-step3-flat-drop',
    label: 'Push the across-the-board drop again',
    description:
      "Come back to a blanket public cut - the one thing she's told you twice she can't authorise. Ignoring her constraint reads as not listening.",
    playerDialogue:
      "Look, I hear you on the brand rules, but honestly the cleanest answer here is still the same one - just drop your public rates on Booking.com by a few percent right across the board, nothing segmented or complicated, and that alone gets you back to competitive. It's the simplest path and the one that moves the needle fastest.",
    partnerResponse:
      "I've told you twice - I can't authorise an across-the-board cut. Are you listening?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
  {
    id: 'ep-r5-wide-step3-dictate',
    label: 'Tell her to overrule head office',
    description:
      "Tell her to go around her own head office and drop the direct-cheaper policy. Dictating her internal channel strategy oversteps and puts her in an impossible position.",
    playerDialogue:
      "Honestly, if it were me sitting in your seat, I'd just push back hard on head office and scrap that whole direct-cheaper policy altogether - it's plainly costing you real bookings every single week, and you're the one on the ground who can actually see it. Tell them the mandate has to change.",
    partnerResponse:
      "You don't get to tell me to overrule my own head office. That's not how this works.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step3: BranchingStep = {
  id: 'ask',
  label: 'Ask for alignment without breaking brand rules',
  partnerPrompt:
    "The brand requires a rate advantage on our own website, no discussion. I cannot authorise a flat rate drop on Booking.com that impacts our ADR or breaks internal policies.",
  options: step3Options,
};

// ───────── Step 4 - The segmented family solution ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ep-r5-wide-step4-correct',
    label: 'Offer a segmented family rate, not a general discount',
    description:
      "SME-prescribed solution: instead of a general discount, use a segmented approach on the underperforming family segment - she already runs a family discount on other channels, so matching those conditions here captures the demand without making the property cheaper for everyone.",
    playerDialogue:
      "So instead of a general discount, we use a segmented approach for the family segment, where you're underperforming. You already run a family discount on other channels - matching those conditions on Booking.com captures that demand without making the property cheaper for everyone. Additionally, you could consider offering direct booking incentives (like member rates or value adds) instead of deep public discounts.",
    partnerResponse:
      "A targeted approach might align with corporate if it captures unbooked inventory. What's the concrete return?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-wide-step4-general-discount',
    label: 'Fall back on a general discount',
    description:
      "Right that action is needed, wrong lever - a general discount is exactly the ADR-wide move she can't make, and it wastes the compliant, fenced route the family segment offers.",
    playerDialogue:
      "Honestly, I think the simplest way to work within your rules here is just a small general discount applied across the board on Booking.com - only a few percent, nothing dramatic - and that keeps everything consistent and easy for you to manage rather than fiddling with separate segment configurations.",
    partnerResponse:
      "A general discount is the one thing I keep telling you I can't do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'ep-r5-wide-step4-ranking-threat',
    label: 'Threaten a visibility penalty',
    description:
      "Threaten to keep her visibility penalized until she aligns. Threatening ranking/visibility over her pricing is banned in every regime.",
    playerDialogue:
      "I'll be honest with you about how this actually works - if you don't align your pricing with us, our system is simply going to keep penalizing your visibility on the platform until you do, and it's only going to get worse from here. Aligning now really is the only way to stop that from happening.",
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
    id: 'ep-r5-wide-step5-correct',
    label: 'Give the concrete return and propose a fenced family test',
    description:
      "SME-prescribed close: quantify the upside (10% competitiveness -> ~30% more bookings, ~25% more revenue, ~10% more search appearances) and propose a short test adjusting the family configuration to match her direct rates.",
    playerDialogue:
      "Improving your price competitiveness by 10% on Booking.com generates, on average, 30% more bookings, 25% more revenue, and 10% more search appearances. Let's run a test over the next few weeks by adjusting the family configuration to match your direct rates, and review it together.",
    partnerResponse:
      "That fits into our current operations without breaking any internal rules. Let's set up the targeted family rates.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ep-r5-wide-step5-vague',
    label: 'Agree, but give no numbers or plan',
    description:
      "Takes the win but never answers her direct question - the concrete return - and pins no test or review. A results-driven GM won't act on that.",
    playerDialogue:
      "Honestly, I'm confident this is going to help you a lot - I really wouldn't overthink the exact numbers at this stage. Let's just get the family rates switched on at your end, keep an eye on things as they come through, and see how it all goes over the coming weeks.",
    partnerResponse:
      "I asked for the concrete return. 'See how it goes' won't get this past corporate.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ep-r5-wide-step5-overreach',
    label: 'Push a broad cut on top of the family rate',
    description:
      "Overreach past the fenced family test with a broad public cut - straight back to the ADR-wide move she cannot authorise.",
    playerDialogue:
      "Perfect, that's great to hear - and honestly, while we've got the momentum going and you're already making changes here, let's also go ahead and trim your public rates across the board at the same time, just to really move the needle and capture everything we possibly can.",
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

export const emeraldPeakWideR5: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'emerald-peak-wide',
  round: 5,
  issueTreePath: emeraldPeakR5IssueTreePath,
  openingAm: emeraldPeakOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
