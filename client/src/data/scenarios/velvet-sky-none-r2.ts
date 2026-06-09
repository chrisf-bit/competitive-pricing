import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { velvetSkyR2IssueTreePath } from './velvet-sky-base';

/**
 * Velvet Sky Boutique Hotel - Round 2 - No Parity variant.
 *
 * Source: SME-approved dialogue (No Parity column) for the Brand.com
 * Competitiveness Gap scenario. John Whitford runs deep public
 * discounts on his direct brand site to keep direct as his lowest
 * channel and dodge OTA commission. He has zero Booking.com pricing
 * tools active. The OPTIMAL lines for each step are taken verbatim
 * from the SME doc.
 *
 * No-Parity compliance rules followed:
 *   - The AM never uses "parity" or "match" anywhere, including in
 *     the borderline / risky picks.
 *   - The AM never threatens visibility / ranking penalties based on
 *     external pricing.
 *   - The pitch reframes the ask as "your strategy is your choice"
 *     and lands on targeted tools (Country Rate aimed at high-yield
 *     international segments) rather than a public rate drop.
 *
 * John's communication style is red (driver) primary + blue (thinker)
 * secondary. He talks in commercial terms - margins, commission,
 * ROI - and weighs trade-offs before agreeing. Style scoring rewards
 * red and blue; penalises green / yellow when the option drifts into
 * relational warmth or expressive looseness without commercial bite.
 *
 * Internal metric names do not appear in any option's playerDialogue,
 * including the risky picks.
 */

// ───────── Step 1 - Reframe the price-gap behaviour ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'vs-r2-none-step1-correct',
    label: "Mirror John's autonomy, name the consumer-search reality",
    description:
      "Use the doc-prescribed opener: respect his pricing autonomy, then explain the side-by-side search behaviour that's losing him the booking on Booking.com regardless of his direct strategy.",
    playerDialogue:
      "You are entirely free to price your property however you choose. Most travellers compare properties side-by-side on Booking.com, though. If a partner is uncompetitive, the traveller doesn't go to their direct site - they simply book a cheaper competitor on Booking.com. By making your best price available to us, you instantly improve your discovery, which lifts your overall business.",
    partnerResponse:
      "I get that, but a rate drop across the board on Booking.com just doesn't work for my margin targets.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'vs-r2-none-step1-ranking-warn',
    label: 'Tell him external rates trigger an automatic ranking drop',
    description:
      "Claim that cheaper external rates cause Booking.com's system to lower his ranking. Breaks the No-Parity ban on linking external price gaps to platform penalties.",
    playerDialogue:
      "I understand your choice, but because your external rates are cheaper, our platform is forced to lower your organic visibility and drop your destination search ranking as an automated consequence.",
    partnerResponse:
      "If your platform is going to punish me automatically for how I price elsewhere, that's not a partnership. That's an ultimatum.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'vs-r2-none-step1-condescend',
    label: 'Lecture him on wasting the platform reach',
    description:
      "Open with a sharp lecture - accuse him of wasting platform reach and threaten the algorithm will stop optimising his account. Patronising tone that hits red-driver partners particularly hard.",
    playerDialogue:
      "John, you are completely wasting our platform's reach. Overcharging our users just to protect your website is a terrible strategy. If you keep ignoring our traffic, we will stop optimising your account entirely.",
    partnerResponse:
      "Accusing me of overcharging and threatening to stop optimising my account is the wrong tone. I'm done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step1Open: BranchingStep = {
  id: 'open',
  label: 'Reframe the price-gap behaviour',
  partnerPrompt:
    "Yes, we choose to offer deep public discounts on our own site. We prefer to keep our direct channel as our lowest-priced option.",
  options: step1Options,
};

// ───────── Step 2 - Position a targeted tool, not a public drop ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'vs-r2-none-step2-correct',
    label: 'Decouple the ask from a public drop',
    description:
      "Use the doc-prescribed pivot: explicitly say no public drop, respect his pricing autonomy, and surface Country Rate as the targeted lever for high-spending international travellers.",
    playerDialogue:
      "I'm definitely not suggesting a general rate drop. Your pricing strategy remains 100% your decision. Instead of an across-the-board reduction, you can decide to target your public better - for example using a Country Rate, aimed at catching high-spending international travellers.",
    partnerResponse:
      "So I keep my public pricing exactly as it is, but open a backdoor for specific guests?",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'vs-r2-none-step2-parity-slip',
    label: 'Ask him to match his website price to "restore parity"',
    description:
      'Use the forbidden words "match" and "parity" in a No-Parity market. Hard compliance violation.',
    playerDialogue:
      "We don't need a public drop. But to keep your account active, I just need you to match your website's exact price on our platform today so we can restore proper rate parity.",
    partnerResponse:
      "I'm in a No-Parity market specifically so I can keep that flexibility. You don't get to ask me to match anything here.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'vs-r2-none-step2-ultimatum',
    label: 'Hand him a take-it-or-leave-it ultimatum',
    description:
      "Tell him if he won't drop the rate, his competitors will take all his revenue. Ultimatum-style close that abandons the consultation and pressures a rate drop.",
    playerDialogue:
      "Well, if you aren't willing to protect your margins on our platform, then there is nothing else I can do to fix your conversion. If you won't drop the rate, your competitors are just going to steal all your revenue.",
    partnerResponse:
      "Threatening that competitors will steal my revenue if I don't comply isn't a commercial conversation. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -12,
  },
];

const step2Targeted: BranchingStep = {
  id: 'targeted-tool',
  label: 'Position a targeted tool',
  partnerPrompt:
    "I get that, but a rate drop across the board on Booking.com just doesn't work for my margin targets.",
  options: step2Options,
};

// ───────── Step 3 - Close on the targeted Country Rate ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'vs-r2-none-step3-correct',
    label: 'Land it as a pro-competitive segment-capture tool',
    description:
      "Use the doc-prescribed close: position the Country Rate as a pro-competitive lever that captures high-value segments without changing his public distribution strategy. Mirrors his red / blue framing: targeted, ROI-clear, control retained.",
    playerDialogue:
      "Exactly. It's a pro-competitive tool that lets you capture specific, high-value segments without altering your public distribution strategy.",
    partnerResponse:
      "I like that I retain full control without a public drop. Let's set up a targeted country rate and see how it performs.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'vs-r2-none-step3-ranking-reward',
    label: 'Promise a top-3 ranking reward for setting it up',
    description:
      'Tell John he\'ll get an automated top-3 search position for the next month as a reward. Breaks the No-Parity ban on promising ranking rewards.',
    playerDialogue:
      "Exactly. And because you are setting this up today, our system will automatically reward you by boosting your property into a top-3 search position on our platform for the next month.",
    partnerResponse:
      "I don't operate on promised algorithmic rewards. That's not how a serious commercial conversation works.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'vs-r2-none-step3-fire-sale',
    label: 'Push for Country + Mobile + Flash Sale all at once',
    description:
      "Distort the targeted-tools pitch into a fire-sale: flip on every discount product at once to underbid his own website. Wrecks the segmented framing John just agreed to and ignores his stated control preference.",
    playerDialogue:
      "Yes, exactly. It's a clever trick to hide lower rates from your direct team. Let's turn on Country Rates, Mobile Rates, and Flash Sales all at once to completely underbid your own website.",
    partnerResponse:
      "I just told you I want control. Suggesting I 'trick' my direct team and turn on everything at once is the opposite of that. We're done.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -12,
  },
];

const step3Close: BranchingStep = {
  id: 'close-country-rate',
  label: 'Close on the targeted Country Rate',
  partnerPrompt:
    "So I keep my public pricing exactly as it is, but open a backdoor for specific guests?",
  options: step3Options,
};

// ───────── Assembled tree ─────────

export const velvetSkyNoneR2: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'velvet-sky-none',
  round: 2,
  issueTreePath: velvetSkyR2IssueTreePath,
  steps: [step1Open, step2Targeted, step3Close],
};
