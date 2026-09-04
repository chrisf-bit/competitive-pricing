import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import {
  silverHorizonR2IssueTreePath,
  silverHorizonOpeningAm,
} from './silver-horizon-base';

/**
 * Silver Horizon Resort - Round 2 - No Parity variant.
 *
 * Source: SME "Round 2" doc, Conversation 3 (No Parity). In a No
 * Parity market the AM cannot ask for parity or matching and cannot
 * require lower prices; the compliant ask is for her best available
 * price, framed reactively and neutrally, with autonomy preserved. The
 * value is carried by targeted segments (international + family) rather
 * than a general discount. The word "parity"/"match" never appears,
 * including in the distractors, and violations are taught via ranking
 * threats and pressure to discount, not parity language.
 */

// ───────── Step 1 - Probe the YoY drop ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'sh-r2-none-step1-correct',
    label: 'Name the YoY drop and ask what strategy is in place',
    description:
      "SME-prescribed probe: contrast strong forward volume with the 32% YoY room-night drop and ask, open-endedly, what she's currently doing to turn the trend around.",
    playerDialogue:
      "I've been reviewing your portfolio. Forward volume for the next three months is strong, but room nights in the last 30 days are down 32% year-on-year. What strategies do you have in place right now to turn that trend around?",
    partnerResponse:
      "Honestly, we're focusing on the channels that give us the highest margin. Some platforms are cutting their own margins to offer cheaper prices, and I'm fine with that. I'm not looking to lower my rates on Booking just to chase volume.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-none-step1-jump-cheapest',
    label: 'Jump to being the cheapest',
    description:
      "Skip the diagnosis and prescribe a public price cut to be the cheapest option - pressure to lower prices a No Parity market doesn't permit, and it presumes the fix.",
    playerDialogue:
      "Your room nights are down 32%, so let's not overthink this - the quickest fix is to bring your Booking.com price down until you're the cheapest option on the page, and the volume should follow pretty fast.",
    partnerResponse:
      "I'm not chasing volume with a price cut. That's not the business I run. Do better.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'sh-r2-none-step1-hand-wave',
    label: 'Wave the drop away as seasonal',
    description:
      'Open by dismissing the drop as market softness. A numbers-first operator reads that as sloppy and disengages.',
    playerDialogue:
      "We've noticed a small dip in the last 30 days, but honestly I wouldn't read too much into it - it's probably just seasonal softness, and these things tend to even out on their own over the coming weeks, so it's really nothing to worry about.",
    partnerResponse:
      "'Seasonal'? If that's your analysis, this call is a waste of my time.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

const step1: BranchingStep = {
  id: 'probe',
  label: 'Probe the year-on-year drop',
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options,
};

// ───────── Step 2 - Best price + surface her concern ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'sh-r2-none-step2-correct',
    label: 'Preserve autonomy; frame best price as recoverable lost demand',
    description:
      "SME-prescribed handling: her strategy is her call, but a higher price here sends the traveler to a competitor - an unrecoverable unsold room. Her best available price is the fastest way to regain visibility, and you surface her concern before pushing.",
    playerDialogue:
      "Your pricing strategy is entirely your decision. From the customer's side, though, a higher price here sends the traveler to a competitor's property - that's an unrecoverable unsold room. Your best available price on our platform is the fastest way to regain lost visibility and fill empty nights. What's your main concern about adjusting your position here?",
    partnerResponse:
      "My worry is that if I offer a discount on Booking, customers just complete the booking there instead of finding me and booking on our own website.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-none-step2-general-discount',
    label: 'Push a general public discount',
    description:
      "Tell her to lower her public price across the board to stop losing the comparison. It pressures a general price cut a No Parity market doesn't allow, and it walks straight into her cannibalization worry.",
    playerDialogue:
      "The fix here is pretty direct - lower your public price on our platform across the board so you stop losing the comparison to the cheaper competitors on the page. Once your headline rate comes down for everyone, you'll start winning back the travelers you're losing today, your visibility climbs, and those empty nights fill in. I'd get that blanket reduction in place and let it run.",
    partnerResponse:
      "A blanket discount is exactly what I'm worried about. That's not an answer.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
  {
    id: 'sh-r2-none-step2-ranking-threat',
    label: 'Threaten her ranking to force a cut',
    description:
      'Threaten an automated ranking drop tied to how she prices elsewhere. In a No Parity market you cannot require lower prices or threaten visibility over a partner\'s prices on other channels.',
    playerDialogue:
      "Here's the reality - if your price on our platform stays higher than the price on your own site, our system keeps reading you as uncompetitive and it will keep pushing your ranking down the page. The longer that gap sits there, the further you slide and the harder it is to climb back. If you want that visibility to recover, you'll need to lower your price here until it's no higher than your direct site.",
    partnerResponse:
      "Threatening my ranking to force a price cut is not a conversation I'll have. Done.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step2: BranchingStep = {
  id: 'best-price',
  label: 'Best available price; surface her concern',
  partnerPrompt:
    "Honestly, we're focusing on the channels that give us the highest margin. Some platforms are cutting their own margins to offer cheaper prices, and I'm fine with that. I'm not looking to lower my rates on Booking just to chase volume.",
  options: step2Options,
};

// ───────── Step 3 - Target segments; probe family restriction ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'sh-r2-none-step3-correct',
    label: 'Reframe to targeted segments; probe the family restriction',
    description:
      "SME-prescribed pivot: the platform is an acquisition tool, so instead of a general discount, target high-value segments - international and family. Then probe the reason behind her family-room restriction rather than assuming it.",
    playerDialogue:
      "That's a common concern - but our platform is a powerful acquisition tool. Rather than a general discount, we can target high-value segments: international bookers and families. We can see you're currently restricting double rooms from family searches - what's the main reason behind that?",
    partnerResponse:
      "Families are operationally expensive - cots, extra linen, higher risk of damage. I'd rather keep those rooms for couples, and I don't want one-night weekend bookings blocking longer stays.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-none-step3-general-discount',
    label: 'Fall back on a small general discount',
    description:
      "Right that action is needed, wrong lever - a general discount across her rooms is the cannibalization she just flagged, and it skips the targeted-segment opportunity entirely.",
    playerDialogue:
      "Let's keep this simple and just put a small discount across all of your rooms - that gets you competitive on the page again and starts moving some of that unsold inventory right away. Once the bookings pick back up and those empty nights are filling, we can always revisit the exact number later.",
    partnerResponse:
      "A general discount is exactly the cannibalization I just told you I'm worried about.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'sh-r2-none-step3-second-guess',
    label: 'Second-guess her family restriction',
    description:
      "Tell her the restriction is short-sighted before understanding it. Condescending to an operator who knows her own risk - it shuts the conversation instead of opening the segment.",
    playerDialogue:
      "Restricting families is honestly costing you more than you realize - it's a pretty short-sighted call, and it's dragging your numbers down every single week you leave it in place. You've got real demand from that segment sitting right there and you're just turning it away at the door.",
    partnerResponse:
      "I don't need you second-guessing how I run my rooms. Done.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -11,
  },
];

const step3: BranchingStep = {
  id: 'segment-pivot',
  label: 'Target segments; probe the family restriction',
  partnerPrompt:
    "My worry is that if I offer a discount on Booking, customers just complete the booking there instead of finding me and booking on our own website.",
  options: step3Options,
};

// ───────── Step 4 - Family Ready value pitch ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'sh-r2-none-step4-correct',
    label: 'Quantify the family growth and the fill-the-nights case',
    description:
      "SME-prescribed value pitch: family bookings grew ~2x faster, stay longer, spend more and review 24% more often - using search visibility to attract that high-spending segment would fill the empty nights.",
    playerDialogue:
      "I hear you on the risk. But look at the revenue: over the last two years family bookings grew nearly twice as fast as other segments on our platform - they stay longer, spend more, and leave reviews 24% more often. Using our search visibility to attract that high-spending segment would likely fill those empty nights.",
    partnerResponse:
      "If I can restrict it to a minimum of three nights, then yes - that mitigates our operational risk.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'sh-r2-none-step4-ignore-risk',
    label: 'Push families and skip the operational risk',
    description:
      "Right segment, wrong handling - it tells her to open the rooms because the growth outweighs the hassle, ignoring the operational risk she just named, so it earns a no.",
    playerDialogue:
      "Honestly, just open those rooms up to families and let the bookings come - the growth on that segment clearly outweighs whatever extra hassle it creates for you. The numbers on family demand are strong enough that a bit of extra cleaning or the odd cot really shouldn't be the thing holding you back.",
    partnerResponse:
      "You skipped straight past the operational risk. No.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'sh-r2-none-step4-dismiss',
    label: 'Dismiss her costs as the cost of doing business',
    description:
      "Wave away cots and linen as a cost she should just absorb. Dismissive of a real operational concern - it ends the conversation instead of de-risking it.",
    playerDialogue:
      "Cots and linen are just a cost of doing business, the same as it is for every property that takes family bookings - if a bit of extra setup like that is genuinely what's stopping you here, then honestly that's on your operations to sort out, not a reason to keep the segment switched off.",
    partnerResponse:
      "Telling me my operations are the problem ends this call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step4: BranchingStep = {
  id: 'family-value',
  label: 'Turn the family pushback into an opportunity',
  partnerPrompt:
    "Families are operationally expensive - cots, extra linen, higher risk of damage. I'd rather keep those rooms for couples, and I don't want one-night weekend bookings blocking longer stays.",
  options: step4Options,
};

// ───────── Step 5 - MLOS + Country Rates + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'sh-r2-none-step5-correct',
    label: 'Set the MLOS, add Country Rates for international, agree both',
    description:
      "SME-prescribed close: set the minimum-night guardrail she asked for, and pair it with Country Rates targeting international bookers - a zero-marketing-cost way to lift discoverability. Ask her to implement both.",
    playerDialogue:
      "Absolutely - we can set a minimum-night stay on those rooms. And to maximize the impact, we'd pair that with Country Rates targeting international bookers. Are you okay implementing both to lift performance?",
    partnerResponse:
      "My domestic demand is solid, but I haven't been paying much attention on strategy for international - so this could be a zero-marketing-cost way to boost discoverability through your platform. Let's give it a try!",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'sh-r2-none-step5-mlos-only',
    label: 'Set the minimum stay and leave it there',
    description:
      "Takes the guardrail but drops the international lever and never agrees how to measure it - a soft close a data-led operator will let evaporate.",
    playerDialogue:
      "Great, we'll go ahead and set the minimum-night stay on those rooms, and then we can just see how that performs over the next few weeks before deciding whether we need to do anything else on top of it.",
    partnerResponse:
      "Just the minimum stay? You mentioned international demand - what's the actual tool, and how do we measure it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'sh-r2-none-step5-force-cheapest',
    label: 'Push her to be the cheapest everywhere',
    description:
      "Overreach - pressure her to price below her own site so she's the best deal anywhere. Requiring a partner to undercut and be cheapest is exactly what a No Parity market forbids.",
    playerDialogue:
      "And to really be safe, bring your public price on our platform down below your own site so you come out as the best deal anywhere a traveler looks and you lock in all that volume for good.",
    partnerResponse:
      "Pricing below my own site to be cheapest everywhere is not something I'll do. Let's keep this to the segments.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Land the MLOS + Country Rates and close',
  partnerPrompt:
    "If I can restrict it to a minimum of three nights, then yes - that mitigates our operational risk.",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const silverHorizonNoneR2: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'silver-horizon-none',
  round: 2,
  issueTreePath: silverHorizonR2IssueTreePath,
  openingAm: silverHorizonOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
