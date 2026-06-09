import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { crystalWaterR1IssueTreePath } from './crystal-water-base';

/**
 * Crystal Water Resort - Round 1 - Wide Parity variant.
 *
 * Source: SME-approved dialogue (Wide Parity column) for the
 * Brand.com Competitiveness Gap scenario. Sarah is running cheaper
 * public rates on her direct brand site to dodge commission. The
 * OPTIMAL lines for each step are taken verbatim from the SME doc.
 *
 * Wide-Parity compliance rules followed (per the legal Stay-Compliant
 * doc):
 *   - The AM may proactively ask for the same rates and conditions
 *     across Brand.com AND third-party channels.
 *   - The AM may use cross-channel data (RPD, EPO) to illustrate
 *     opportunities, including the meta-search leakage angle.
 *   - The AM may NOT instruct Sarah to switch off other OTAs / drop
 *     external prices, and may NOT promise / threaten ranking
 *     rewards or penalties solely on the basis of external prices.
 *
 * Sarah's communication style is red (driver) primary + yellow
 * (expressive) secondary - same scoring shape as the No-Parity /
 * Narrow variants; the regime only changes the regulatory framing
 * of what the AM is permitted to ask for.
 *
 * Internal metric names do not appear in any option's playerDialogue,
 * including the risky picks.
 */

// ───────── Step 1 - Name the conversion wall ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'cw-r1-wide-step1-correct',
    label: 'Mirror the data: traffic up, conversion stuck on price',
    description:
      "Use the doc-prescribed opener: validate the volume signal, then explain the meta-search behaviour pattern that's capping conversion - travellers compare on Booking.com and book the cheaper rate elsewhere.",
    playerDialogue:
      "That aligns exactly with what the data is showing. Your traffic here is massive, but conversion is hitting a wall, so travellers are finding you on Booking.com, doing a quick meta-search comparison, and booking the cheaper rate elsewhere.",
    partnerResponse:
      "Right, and honestly, that saves us on commission. We have to look at our margins.",
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'cw-r1-wide-step1-passive',
    label: 'Agree with her and move on',
    description:
      "Mirror her words and signal you don't intend to challenge the strategy. Misses the chance to surface the meta-search dynamic. Sarah's red/yellow style reads this as a wasted call.",
    playerDialogue:
      "That's exactly right. I understand that you would like to keep things as they are and don't want to change your strategy.",
    partnerResponse:
      "If you're just here to agree with me, this is going to be a short call.",
    styleMatch: { red: -2, yellow: -1, green: 1, blue: 0 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'cw-r1-wide-step1-threat',
    label: 'Tell her shifting share to direct will collapse her business',
    description:
      "Open with a doom-laden ranking warning - claim her traffic will drop to zero if she keeps shifting share. Threatens platform consequences for an external pricing strategy.",
    playerDialogue:
      "Well Sarah, shifting share away from us right now is actually a huge mistake. If you keep ignoring our platform, your traffic will eventually drop to zero and your brand site won't be able to replace that lost volume.",
    partnerResponse:
      "Telling me my business is going to collapse if I don't prioritise you is the wrong opener.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -12,
  },
];

const step1Open: BranchingStep = {
  id: 'open',
  label: 'Name the conversion wall',
  partnerPrompt:
    "Hi! Yes, we've noticed the traffic bump. But to be transparent, our actual bookings on your platform aren't matching that spike. We're actively trying to shift share to our direct brand site right now.",
  options: step1Options,
};

// ───────── Step 2 - Surface the meta-search leak ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'cw-r1-wide-step2-correct',
    label: 'Acknowledge the margin worry, surface the meta-search leak',
    description:
      "Use the doc-prescribed pivot: honour the margin concern, then surface that the price gap is leaking to third-party OTAs on meta-search (not just her direct site), and pitch matching the rate to capture the 202% traffic surplus.",
    playerDialogue:
      "I completely understand protecting your margins. But right now, that gap is causing a leak to third-party OTAs on meta-search, not just your direct site. If you match that rate on Booking.com, you would benefit from that 202% traffic vs peer group from a channel that handles all the global marketing costs for you.",
    partnerResponse:
      "I didn't realise third-party OTAs were undercutting us on meta.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'cw-r1-wide-step2-review-score',
    label: 'Pivot to her review score',
    description:
      "Redirect onto guest review scores as the lever, claim visibility will improve organically next season. Off-topic for the pricing call and dodges the meta-search story.",
    playerDialogue:
      "I get that margins are tight, but have you looked at your guest review scores instead? If we fix your rate discrepancy, your visibility score will improve over time, which helps your long-term organic presence next season.",
    partnerResponse:
      "Review score isn't what I called about. Can we stay on the pricing question?",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
  {
    id: 'cw-r1-wide-step2-lecture',
    label: 'Lecture her on the cost of doing business',
    description:
      "Tell her commission is just the cost of doing business and warn her conversion metrics will fall into a hole. Patronising tone that hits Sarah's red / yellow style hard.",
    playerDialogue:
      "Commission is just the cost of doing business, Sarah. You have to spend money to make money. If you keep overcharging our customers to save on a fee, your conversion metrics are going to fall into a hole you can't climb out of.",
    partnerResponse:
      "If I wanted a lecture I'd call my accountant. Move on.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -10,
  },
];

const step2MetaLeak: BranchingStep = {
  id: 'reframe-meta-leak',
  label: 'Surface the meta-search leak',
  partnerPrompt:
    "Right, and honestly, that saves us on commission. We have to look at our margins.",
  options: step2Options,
};

// ───────── Step 3 - Close with a rate-alignment pilot ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'cw-r1-wide-step3-correct',
    label: 'Align the Booking.com rate with the promotional brand rate',
    description:
      "Use the doc-prescribed close: connect the ADR dilution to a concrete pilot - align Booking.com with her promotional brand rate today, review the conversion lift in two weeks.",
    playerDialogue:
      "They are, and it's diluting your ADR. Let's align your Booking.com rate with that promotional brand rate today. We can capture that high-volume traffic directly on our platform and review the conversion lift in two weeks.",
    partnerResponse:
      "Fair point. If third parties are undercutting us anyway, I'd rather secure the volume safely. Let's align the rates.",
    styleMatch: { red: 2, yellow: 2, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'cw-r1-wide-step3-delegate',
    label: 'Send her off to audit her wholesale contracts',
    description:
      "Push the work back to her: tell her to audit her wholesale contracts tonight. Misreads the root cause (Crystal Water's brand.com promotional rate is the leak source, not a wholesaler) and ends the call without a Booking.com-side action.",
    playerDialogue:
      "They are undercutting you, which is a big issue. I recommend you log into your channel manager tonight, audit your wholesale contracts, and see if you can track down where that rate is leaking from.",
    partnerResponse:
      "I called you because the gap shows up on your platform. Sending me off to do homework alone isn't the help I was after.",
    styleMatch: { red: -1, yellow: 0, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'cw-r1-wide-step3-slash',
    label: 'Slash her rates 15% across all room types',
    description:
      'Propose an across-the-board 15% rate cut to "punish" the meta-leaking OTAs. Reckless commercial advice, dramatic margin hit, and reads as Booking.com unilaterally tanking her ADR.',
    playerDialogue:
      "Exactly, they are completely stealing your business. It makes no sense to let them win. Let's dramatically slash your rates on our backend right now by 15% across all room types to completely punish those OTAs and take back control.",
    partnerResponse:
      "Cutting 15% across the board is the opposite of what I asked for. We're not doing that.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -12,
  },
];

const step3Close: BranchingStep = {
  id: 'close-rate-alignment',
  label: 'Close with a rate-alignment pilot',
  partnerPrompt:
    "I didn't realise third-party OTAs were undercutting us on meta.",
  options: step3Options,
};

// ───────── Assembled tree ─────────

export const crystalWaterWideR1: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'crystal-water-wide',
  round: 1,
  issueTreePath: crystalWaterR1IssueTreePath,
  steps: [step1Open, step2MetaLeak, step3Close],
};
