import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { crystalWaterR1IssueTreePath } from './crystal-water-base';

/**
 * Crystal Water Resort - Round 1 - No Parity variant.
 *
 * Source: SME-approved dialogue (No Parity column) for the Brand.com
 * Competitiveness Gap scenario. Sarah is "Marketing Contract Only"
 * (independent property with brand affiliation) running cheaper rates
 * on her direct brand site to dodge Booking.com commission and shift
 * share. The OPTIMAL lines for each step are taken verbatim from the
 * SME doc.
 *
 * No-Parity compliance rules followed (per the legal Stay-Compliant
 * doc):
 *   - The AM never uses "parity" or "match" anywhere in the
 *     conversation, including in the borderline / risky picks.
 *   - The AM never demands rate alignment or threatens visibility /
 *     ranking penalties on the basis of external prices.
 *   - The pitch reframes the ask as "your strategy is your choice"
 *     followed by targeted on-platform tools (Country Rate, Family
 *     rate) that capture incremental segments without forcing a
 *     public rate drop.
 *
 * Sarah's communication style is red (driver) primary + yellow
 * (expressive) secondary. Style scoring rewards red and yellow -
 * direct, energetic, results-focused. Penalises green / blue when
 * the option drifts into passive empathy or methodical exposition
 * without commercial bite.
 *
 * Internal metric names (eRPD, Lose Price Public, Price Bucket) do
 * not appear in any option's playerDialogue - including the risky
 * picks. The "page views up 202%" framing is partner-facing and
 * comes straight from the SME doc.
 */

// ───────── Step 1 - Acknowledge the conversion gap ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'cw-r1-none-step1-correct',
    label: "Mirror Sarah's pricing autonomy, name the conversion cap",
    description:
      "Use the doc-prescribed opener: validate that pricing is her call, but surface the consumer-behaviour read that's capping conversion on-platform.",
    playerDialogue:
      "That data perfectly explains the trend on our end. Your pricing strategy is completely up to you, but from a consumer behaviour standpoint, travellers are noticing the difference, which is capping your conversion here.",
    partnerResponse:
      "Yeah, we intentionally keep Booking.com rates higher because we view it as a premium acquisition channel. We prefer to drive the lower-priced volume elsewhere.",
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'cw-r1-none-step1-ranking-warn',
    label: 'Warn that external rates will hurt ranking',
    description:
      'Tell Sarah her cheaper external rates will trigger an automated ranking drop. Breaks the No-Parity ban on threatening visibility / ranking penalties based on external prices.',
    playerDialogue:
      "That explains the trend. Your pricing strategy is your choice, but because your external rates are cheaper, it causes our system to lower your ranking and reduce your visibility on the platform.",
    partnerResponse:
      "If you're telling me Booking.com is going to penalise my ranking because of how I price elsewhere, that's not a partnership conversation. That's a threat.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -10,
  },
  {
    id: 'cw-r1-none-step1-condescend',
    label: 'Lecture her on prioritising other channels',
    description:
      'Call her strategy a dangerous gamble and threaten algorithmic traffic withdrawal. Aggressive, condescending, and breaks the No-Parity ban on visibility-based threats.',
    playerDialogue:
      "Sarah, prioritising other channels over us is a dangerous gamble. If you keep starving our platform of competitive pricing, your conversion will drop so low that our algorithm will stop sending traffic to your resort entirely.",
    partnerResponse:
      "I think we're going to need to end this call. Telling me my business is going to collapse if I don't pay Booking.com more attention is not how this works.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step1Open: BranchingStep = {
  id: 'open',
  label: 'Acknowledge the conversion gap',
  partnerPrompt:
    "Hi! Wow, that's great to hear. Though I have to admit, our actual room nights on Booking.com aren't growing at that same explosive rate. We've been prioritising other channels with sharper pricing.",
  options: step1Options,
};

// ───────── Step 2 - Reframe the opportunity around targeted tools ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'cw-r1-none-step2-correct',
    label: 'Validate her autonomy, pitch targeted on-platform tools',
    description:
      "Use the doc-prescribed pivot: respect her business choice, then surface the under-converted traffic and propose Country Rate / Family rate as a targeted, segment-specific lever - no public rate change required.",
    playerDialogue:
      "That is a completely valid business choice. The unique opportunity here, though, is that you are sitting on a goldmine of traffic on our platform that isn't fully converting. You don't have to change your public strategy across the board - instead, you could use a targeted tool like a localised Country Rate or targeted Family rates to selectively capture this high traffic.",
    partnerResponse:
      "How does that help my bottom line if the price drops for those segments?",
    styleMatch: { red: 2, yellow: 2, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'cw-r1-none-step2-parity-slip',
    label: 'Ask her to match direct rates to restore parity',
    description:
      'Tell Sarah the fix is to match her direct channel price so the account is "back into rate parity". Breaks the No-Parity hard ban on the words "parity" and "match".',
    playerDialogue:
      "That makes sense. But to capture this traffic, you don't need a public strategy change. You just need to match your direct channel's price on our backend so we can bring your account back into rate parity.",
    partnerResponse:
      "You just told me a minute ago that my pricing is my choice. Now you're asking me to match my direct site. Which is it?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'cw-r1-none-step2-bully',
    label: 'Tell her she has to drop public rates or lose traffic',
    description:
      "Pressure her on public rates as the only way to keep the 202% traffic lead. Breaks the No-Parity ban on threatening visibility consequences for external price gaps and ignores her stated strategy.",
    playerDialogue:
      "Treating us as just a 'premium acquisition channel' means you're leaving money on the table. If you want us to keep delivering 202% more page views than your peers, you need to treat us fairly and lower your public base rates immediately.",
    partnerResponse:
      "I'm going to stop you there. You don't get to decide whether you 'keep delivering' traffic based on my pricing decisions elsewhere. That's not a partner conversation.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step2Reframe: BranchingStep = {
  id: 'reframe-targeted-tools',
  label: 'Reframe around targeted tools',
  partnerPrompt:
    "Yeah, we intentionally keep Booking.com rates higher because we view it as a premium acquisition channel. We prefer to drive the lower-priced volume elsewhere.",
  options: step2Options,
};

// ───────── Step 3 - Close on the segmented pilot ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'cw-r1-none-step3-correct',
    label: 'Close on segmented capture without a public drop',
    description:
      "Lock in the targeted-tools pitch: a competitive price only on high-yield segments, no change to her public base. Honours her stated autonomy and converts the 202% traffic surplus.",
    playerDialogue:
      "It prevents money from being left on the table. Instead of a public rate drop, you use our targeted tools to offer a competitive price only to high-yield segments who are ready to book right now. You maintain total control over your base distribution pricing, but you stop letting that 202% traffic surplus go to waste.",
    partnerResponse:
      "I like the idea of targeting specific segments without altering my public strategy. Let's look at setting up a localised promotion to capture that traffic.",
    styleMatch: { red: 2, yellow: 2, green: 0, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'cw-r1-none-step3-flash-sale',
    label: 'Offer a 10% public flash sale instead',
    description:
      "Drop the targeted-tools framing and pitch a public 10% flash sale across the board. Weak close that distorts the SME's segment-specific pitch into an unsegmented public drop - the opposite of what Sarah's red / yellow style wants (control + smart targeting).",
    playerDialogue:
      "It helps because dropping the price for these targets will make your overall listing look better. We can set up a general 10% flash sale for everyone right now, and then review your net revenue analytics next month to see if it worked.",
    partnerResponse:
      "I don't want a public flash sale - that's the opposite of what I just told you. If we can't keep this targeted, I'd rather walk away.",
    styleMatch: { red: -1, yellow: 0, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'cw-r1-none-step3-fire-sale',
    label: 'Push every discount lever to fill rooms',
    description:
      "Tell her empty rooms are worse than discounted rooms and propose turning on every available discount product at once. Reckless commercial advice, distorts the segmented pitch into a fire sale, and ignores her stated business model.",
    playerDialogue:
      "Look, if you don't drop the price for these segments, your rooms are just going to stay empty anyway. A lower margin booking is always better than a completely vacant room, so let's just turn on every discount we have and see what sticks.",
    partnerResponse:
      "Sarah Bennett doesn't 'see what sticks'. We've talked enough. Send me something in writing only when you have a real proposal.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -10,
  },
];

const step3Close: BranchingStep = {
  id: 'close-segmented-pilot',
  label: 'Close on the segmented pilot',
  partnerPrompt:
    "How does that help my bottom line if the price drops for those segments?",
  options: step3Options,
};

// ───────── Assembled tree ─────────

export const crystalWaterNoneR1: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'crystal-water-none',
  round: 1,
  issueTreePath: crystalWaterR1IssueTreePath,
  // SME-prescribed AM opener (No Parity column). Set in stone -
  // Sarah's Step 1 partnerPrompt is her response to this.
  openingAm:
    "Hi Sarah! I was analysing the peak-season data for Crystal Water Resort. Your property is attracting an immense amount of interest - your page views are tracking at 202% above your peer group, which is phenomenal.",
  steps: [step1Open, step2Reframe, step3Close],
};
