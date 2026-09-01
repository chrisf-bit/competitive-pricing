import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { riversideR4IssueTreePath, riversideOpeningAm } from './riverside-base';

/**
 * Riverside Boutique Hotel - Round 4 - No Parity variant.
 *
 * Source: SME "Round 4" doc, Conversation 3 (No Parity). In a No Parity
 * market the AM cannot ask for parity or matching and cannot require a
 * lower price; the compliant ask is for his best available price, framed
 * neutrally with autonomy preserved. The threads land differently: the
 * family setup gap is fixed as a visibility/setup issue, and because
 * Anton won't discount every Genius guest, the conversation closes on a
 * targeted US Country Rate rather than a Genius push. The word
 * "parity"/"match" never appears; violations are taught via ranking
 * threats and pressure to be cheapest.
 */

// ───────── Step 1 - Probe (family visibility drop) ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'rb-r4-none-step1-correct',
    label: 'Name the family visibility drop, then ask his strategy',
    description:
      "SME-prescribed probe: surface that his visibility among families searching multi-occupancy stays is dropping versus peers, then ask him to walk you through his strategy.",
    playerDialogue:
      "Our metrics show your visibility among families is dropping compared to your peer group. Before I go further, could you walk me through your current strategy?",
    partnerResponse:
      "Ren, we keep a strict 30% cap on OTAs. We don't expect our rates to be the same across all channels - but for availability, yes, we can decide the share we give you.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-none-step1-drop-price',
    label: 'Tell him to drop his public price',
    description:
      "The Slippery Road trap plus a No-Parity breach - press him to lower his public price to be competitive. Requiring a lower price isn't permitted, and it presumes the fix.",
    playerDialogue:
      "Your visibility among families is dropping and it keeps sliding week on week, so honestly the quickest fix is to bring your public price down here until you look competitive again and the searches start coming back.",
    partnerResponse:
      "Dropping my price across the board is exactly what I won't do - I run a boutique.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'rb-r4-none-step1-lift-cap',
    label: 'Tell him to lift the 30% cap',
    description:
      "Dictate his channel strategy before understanding it - dismissing the autonomy a Marketing-Contract-Only GM guards most.",
    playerDialogue:
      "Whatever the reason, the 30% cap is the problem, so you should lift it and let us drive most of your business - that is the only way you get your visibility back and stop handing those family bookings to your competitors.",
    partnerResponse:
      "You haven't heard my strategy and you're already telling me how to run my business. Careful.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step1: BranchingStep = {
  id: 'probe',
  label: 'Surface the family visibility drop',
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options,
};

// ───────── Step 2 - Optimize the 30% with his best price ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'rb-r4-none-step2-correct',
    label: 'Optimize the 30%: best price, autonomy preserved, with data',
    description:
      "SME-prescribed handling: don't fight the cap - optimize the 30% he wants. He's missing advance bookings; his best available price improves conversion (1% -> ~2.7% net revenue / ~3% room nights), and it's entirely his decision.",
    playerDialogue:
      "Understood - I'd like to focus on optimizing the 30% you do want. Looking at your performance data versus your peer on our platform, you're missing advance bookings versus peers; supplying the best price you're comfortable with would improve conversion - a 1% improvement drives about 2.7% more net revenue and 3% more room nights on average. But that's entirely your decision.",
    partnerResponse:
      "Maybe we can push advance bookings a bit, but we're wary of selling low in advance and missing last-minute demand at the price we want. By the way, why is our occupancy configuration underperforming?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-none-step2-require-lowest',
    label: 'Require his lowest price',
    description:
      "Press him to give Booking.com his lowest price to fix visibility. In a No Parity market you ask for his best available price - you don't require him to hand over his lowest.",
    playerDialogue:
      "The way to fix this is simple: give us your lowest price, the very best number you have anywhere, and load it here for every guest. Once that lowest rate is live your visibility comes right back, families start seeing you near the top again, and you stop losing advance bookings to the competitors just beneath you.",
    partnerResponse:
      "'Give us your lowest price' - that's not a request, that's a demand. My pricing is my call.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
  {
    id: 'rb-r4-none-step2-ranking-threat',
    label: 'Threaten his ranking',
    description:
      'Threaten an automated ranking drop until he improves competitiveness. Threatening visibility over external prices is banned in every regime.',
    playerDialogue:
      "If you stay less competitive than your peers, our system keeps ranking you below them, and it won't stop - every week you hold that price you slip further down the page, families stop seeing you at all, and the only way to climb back up is to bring the price down until you're at least as cheap as the properties around you.",
    partnerResponse:
      "Threatening my ranking to force a price cut is a red flag. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step2: BranchingStep = {
  id: 'optimize-30',
  label: 'Optimize the 30% with his best price',
  partnerPrompt:
    "Ren, we keep a strict 30% cap on OTAs. We don't expect our rates to be the same across all channels - but for availability, yes, we can decide the share we give you.",
  options: step2Options,
};

// ───────── Step 3 - The family setup gap ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'rb-r4-none-step3-correct',
    label: 'Explain the family setup gap and quantify the segment',
    description:
      "SME-prescribed diagnosis: because family rates aren't explicitly defined, that segment sees an inflated price. Quantify why families are worth fixing (grew ~2x faster, spend more, stay longer, review 24% more often).",
    playerDialogue:
      "Because your family rates aren't correctly configured, any family search would see the price as a full adult stay, making it look inflated. Family bookings grew nearly twice as fast as any other segment over the past two years - they spend more, stay longer, and review 24% more often. It's a valuable segment for driving your occupancy.",
    partnerResponse:
      "Families matter to us given how many family rooms we have, so I'll make sure those settings get fixed. You mentioned my peer group is more competitive - tell me more about that.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-none-step3-just-discount-families',
    label: 'Tell him to just discount families',
    description:
      "Right segment, wrong lever - a family discount, not a setup fix. It reframes an unintentional configuration gap as a price cut, which a boutique protecting ADR resists.",
    playerDialogue:
      "Simple - just put a discount on your family rooms, drop the nightly rate for two adults and a couple of kids by a decent margin, and families will start booking again. You don't need to overthink the configuration side of it; a good visible price cut on those rooms is the fastest way to get that segment moving again.",
    partnerResponse:
      "A family discount isn't what I asked about - is this a setup problem or a pricing one?",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rb-r4-none-step3-blame-config',
    label: 'Tell him his setup is careless',
    description:
      "Frame the configuration gap as carelessness on his side. Condescending to a GM who knows his operation - it shuts the conversation instead of solving it.",
    playerDialogue:
      "Honestly, if your family setup is wrong, that's a bit careless on your side - this is exactly the kind of thing you should have caught yourself before it started costing you bookings. Leaving those family room settings misconfigured for this long really isn't what I'd expect from someone who knows his own property.",
    partnerResponse:
      "I don't need you telling me I'm careless. This is over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -11,
  },
];

const step3: BranchingStep = {
  id: 'family-setup',
  label: 'Diagnose the family setup gap',
  partnerPrompt:
    "Maybe we can push advance bookings a bit, but we're wary of selling low in advance and missing last-minute demand at the price we want. By the way, why is our occupancy configuration underperforming?",
  options: step3Options,
};

// ───────── Step 4 - The non-genuine Genius discount ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'rb-r4-none-step4-correct',
    label: 'Explain the non-genuine Genius discount vs peers',
    description:
      "SME-prescribed diagnosis: he's in Genius but it isn't working because the discount looks non-genuine, so families book rival Genius properties with a genuinely competitive rate; a more competitive price makes him more attractive versus peers.",
    playerDialogue:
      "You're in the Genius program, but it isn't working as it should. Because the discount looks non-genuine to travelers, Genius members and families are likely to book elsewhere on our platform with genuinely discounted rates. By providing the best price you can make available to us, you get more competitive versus the peers you compete with for demand.",
    partnerResponse:
      "All your customers are Genius - I don't want to give everyone a discount.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rb-r4-none-step4-just-discount-everyone',
    label: 'Tell him to just discount every guest',
    description:
      "Push him to lean into Genius and discount all guests - ignoring the very concern he's about to raise about discounting everyone.",
    playerDialogue:
      "Just lean into Genius and give the discount to everyone - don't hold anything back, open it up to your whole customer base. Yes it applies to every guest, but the extra volume more than makes up for the smaller margin per booking, and once you're running a full Genius rate across the board the families will follow the better price to you.",
    partnerResponse:
      "I'm about to tell you I don't want to discount every guest - were you listening?",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rb-r4-none-step4-ranking-threat',
    label: 'Threaten to rank him below competitive Genius properties',
    description:
      "Threaten to rank him below the properties with a competitive Genius offer unless he fixes it. A visibility threat tied to his pricing is banned.",
    playerDialogue:
      "If your Genius offer isn't competitive, our system will keep ranking you below the properties that are, and it won't change until you sort it out - families searching see those genuinely competitive Genius rates first, your rooms sit further down where nobody scrolls, and that visibility only comes back once you fix it.",
    partnerResponse:
      "Threatening my ranking over my Genius setup is not a conversation I'll have.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step4: BranchingStep = {
  id: 'genius',
  label: 'Diagnose the non-genuine Genius discount',
  partnerPrompt:
    "Families matter to us given how many family rooms we have, so I'll make sure those settings get fixed. You mentioned my peer group is more competitive - tell me more about that.",
  options: step4Options,
};

// ───────── Step 5 - Targeted US Country Rate + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'rb-r4-none-step5-correct',
    label: 'Offer a targeted US Country Rate, ADR protected, close',
    description:
      "SME-prescribed close: if Genius doesn't fit his strategy, a US Country Rate targets better - his US-traveler share lags peers, and a Country Rate boosts conversion in that segment while protecting overall ADR. Offer to set it up together.",
    playerDialogue:
      "If Genius doesn't fit your strategy right now, a tool that targets better is a US Country Rate. Your share of US travelers is lower than your peers, and a Country Rate lets you boost conversion in that segment while protecting your overall ADR. Shall we look at the setup together? I'll send a follow-up to review the results.",
    partnerResponse:
      "That fits our strategy better - the US market runs a higher ADR, and those are exactly the guests we want. Let's look at the setup options.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'rb-r4-none-step5-general-promo',
    label: 'Offer a general promotion instead',
    description:
      "Right instinct (a targeted alternative to Genius) but the wrong tool - a general promotion still discounts everyone, the exact thing he just ruled out.",
    playerDialogue:
      "Then instead of Genius, just run a small general promotion across all your rooms for a few weeks and see how it goes - drop the rate a little for everyone who books, keep it simple, and let the lower price do the work. It'll lift the numbers without you having to fiddle with any targeted setup, and if the promotion works you can always extend it later.",
    partnerResponse:
      "A general promo is still discounting everyone - I need something targeted.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rb-r4-none-step5-be-cheapest',
    label: 'Tell him to be the cheapest anywhere',
    description:
      "Push him to make Booking.com the lowest price anywhere so he stops losing guests. Requiring a partner to be the cheapest is exactly what a No Parity market forbids - and the opposite of a boutique strategy.",
    playerDialogue:
      "The real fix here is straightforward: make your Booking.com price the lowest one anywhere, cheaper than your own website and cheaper than every other channel you sell on, and just hold it there. Once you're guaranteed to be the cheapest place a guest can book you, they stop shopping around, they stop drifting off to other sites, and you stop losing those bookings for good.",
    partnerResponse:
      "Being the cheapest everywhere is the opposite of a boutique strategy. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Land the targeted Country Rate and close',
  partnerPrompt:
    "All your customers are Genius - I don't want to give everyone a discount.",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const riversideNoneR4: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'riverside-none',
  round: 4,
  issueTreePath: riversideR4IssueTreePath,
  openingAm: riversideOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
