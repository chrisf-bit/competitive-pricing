import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { emeraldPeakR5IssueTreePath, emeraldPeakOpeningAm } from './emerald-peak-base';

/**
 * Emerald Peak Lodge - Round 5 - No Parity variant.
 *
 * Source: SME "Round 5" doc, Conversation 3 (No Parity). More
 * collaborative in tone: Sophia openly explains the head-office
 * direct-cheaper policy and her hands are tied. The AM asks for her best
 * available price (never parity/matching), breaks the reverse-billboard
 * belief, and lands a fenced family rate corporate won't police. The
 * word "parity"/"match" never appears; violations are taught via ranking
 * threats and pressure to be cheapest / drop broadly.
 */

// ───────── Step 1 - Probe (search visibility drop) ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ep-r5-none-step1-correct',
    label: 'Name the visibility drop, ask her strategy and how to help',
    description:
      "SME-prescribed probe: acknowledge her strong demand, neutrally note that her prices here sit higher than on her own direct site, then ask - collaboratively - about her strategy and how Booking.com can support her goals.",
    playerDialogue:
      "Your overall performance here actually looks strong - your demand and conversion are well up on your peer group. The one thing we notice is that your prices on Booking.com sit consistently higher than on your own direct site. Could you share your current strategy, and how Booking.com can best support your goals?",
    partnerResponse:
      "Yeah, I know what's going on. It's tricky for me - head office has a super strict policy that our direct channel stays cheaper than anyone else. We love working with you, but we've basically been told to treat Booking.com as a 'window' and accept lower visibility as a trade-off.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-none-step1-flat-drop',
    label: 'Jump to a flat rate drop',
    description:
      "Skip the diagnosis and prescribe a public cut - which a franchise GM can't authorise, and which pressures a lower price a No Parity market doesn't permit.",
    playerDialogue:
      "Your prices here just aren't competitive and I don't think we need to overthink it - the quickest fix is to bring your public price on our platform down a good amount so you're competitive again and the bookings come back.",
    partnerResponse:
      "I can't authorise a flat rate drop - it breaks head-office policy. That's a non-starter.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'ep-r5-none-step1-fluff',
    label: 'Open with a soft check-in',
    description:
      'Warm, no data - the wrong register for a direct, policy-bound franchise GM.',
    playerDialogue:
      "Hi Sophia, honestly no big agenda today - I just wanted to check in and see how you're feeling about the partnership overall, whether things are running smoothly on your end and if anything's on your mind.",
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
  label: 'Surface the visibility drop and probe',
  partnerPrompt: "Hello! Yes, sure, let's dive in!",
  options: step1Options,
};

// ───────── Step 2 - Collaborate; ask for her best price ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ep-r5-none-step2-correct',
    label: 'Collaborate; best price improves ranking, autonomy preserved',
    description:
      "SME-prescribed handling: ask how you can collaborate around the roadblock, acknowledge she follows internal guidelines and is free to price how she chooses, and explain that her best available price improves ranking and discovery for her whole business.",
    playerDialogue:
      "How can we collaborate to find a way around that roadblock? I know you have to follow your internal guidelines, and you're completely free to price how you choose. But by making your best price available to our platform, it could make your property more attractive to travelers and benefit your overall business.",
    partnerResponse:
      "So you're basically saying this visibility drop on your platform is hitting our website too... I get it, but my hands are tied. My bosses will lose their minds if our base rate on Booking.com matches our website rate.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-none-step2-require-lowest',
    label: 'Require her lowest price',
    description:
      "Press her to hand over her lowest price to fix visibility. In a No Parity market you ask for her best available price - you don't require her lowest, and she can't give it anyway.",
    playerDialogue:
      "The way to fix this is honestly pretty simple, and I don't want to overcomplicate it for you: just give us your single lowest price, the one you'd never normally share, and put it live on our platform. The moment you do that the visibility comes right back and you'll be sitting where you want to be in the results again.",
    partnerResponse:
      "'Give us your lowest' - I literally can't, that's the policy. Were you listening?",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
  {
    id: 'ep-r5-none-step2-fight-hq',
    label: 'Tell her to push back on head office',
    description:
      "Tell her to fight her own head office and drop the policy. Dictating her internal strategy puts her in an impossible position.",
    playerDialogue:
      "Honestly, I think head office has got this completely wrong, and someone needs to say it to them. You should push back hard on this policy - go to your bosses, lay out what it's costing you, and get that direct-cheaper rule dropped once and for all. Until you challenge them on it directly, nothing here is going to change for you.",
    partnerResponse:
      "Telling me to fight my own head office isn't help.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -13,
  },
];

const step2: BranchingStep = {
  id: 'collaborate',
  label: 'Collaborate and ask for her best price',
  partnerPrompt:
    "Yeah, I know what's going on. It's tricky for me - head office has a super strict policy that our direct channel stays cheaper than anyone else. We love working with you, but we've basically been told to treat Booking.com as a 'window' and accept lower visibility as a trade-off.",
  options: step2Options,
};

// ───────── Step 3 - Break the reverse-billboard belief ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ep-r5-none-step3-correct',
    label: 'Explain the reverse billboard effect + 90% discovery',
    description:
      "SME-prescribed counter: yes, it creates a reverse billboard effect - if travelers can't find her on the platform they won't hunt for her website, they'll book competitors. 90% of bookers discover the property here first.",
    playerDialogue:
      "I hear you - but yes, it does create a reverse 'billboard effect': if travelers can't find you on our platform, they won't go looking for your website, they'll book your competitors instead. Up to 90% of the customers who book with us discover the property here first - that's a powerful window for your entire visibility.",
    partnerResponse:
      "Well... it's true. How can we improve this without causing friction with our internal policies?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-none-step3-concede',
    label: 'Concede that Booking.com is just a billboard',
    description:
      "Accepts the billboard framing with only a token nudge - never correcting the belief that a higher price here is harmless.",
    playerDialogue:
      "That's fair enough, honestly - the exposure you get from being listed with us really does help your name travel, so I wouldn't lose sleep over the gap. Maybe just trim a little at the margin whenever it suits you and the click-throughs should follow on their own over time. The wider model you've got here is basically sound, so there's no need to force anything.",
    partnerResponse:
      "So the model's fine, then? What are we actually solving here?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ep-r5-none-step3-ranking-threat',
    label: 'Threaten a further ranking drop',
    description:
      'Threaten to drop her ranking further until she fixes her price. Threatening visibility over pricing is banned in every regime.',
    playerDialogue:
      "Let me be straight with you about how this works: if travelers genuinely can't find you near the top, our system reads that as a weak listing and it will keep dropping your ranking further, week after week, until you go in and fix the price. That slide won't stop on its own, and the longer the price stays where it is, the harder it gets to climb back up again.",
    partnerResponse:
      "Threatening my ranking over a policy I don't control is not a conversation I'll have.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

const step3: BranchingStep = {
  id: 'billboard-counter',
  label: 'Break the reverse-billboard belief',
  partnerPrompt:
    "So you're basically saying this visibility drop on your platform is hitting our website too... I get it, but my hands are tied. My bosses will lose their minds if our base rate on Booking.com matches our website rate.",
  options: step3Options,
};

// ───────── Step 4 - The segmented family workaround ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ep-r5-none-step4-correct',
    label: 'Offer a fenced family rate, autonomy preserved',
    description:
      "SME-prescribed solution: a policy-safe workaround - her family-traveler share lags peers, so instead of a general rate drop she can voluntarily use a family rate. The choice of strategy stays entirely hers.",
    playerDialogue:
      "We don't want to cause any friction - let's find something that aligns with your revenue goal without breaking policy. Our data shows your share of family travelers is lower than your peers. Instead of a general rate drop, you can use a family rate. Of course, the choice of distribution and pricing strategy stays entirely yours.",
    partnerResponse:
      "Oh, that's a brilliant workaround! Corporate doesn't monitor opaque segment rates. What kind of traction can we get from that?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r5-none-step4-general-discount',
    label: 'Fall back on a general discount',
    description:
      "A general discount is the ADR-wide friction she's trying to avoid, and it wastes the compliant, fenced family route.",
    playerDialogue:
      "Honestly, I'd keep this really simple - just run a small general discount across the board here on our platform and let it lift everything at once, rather than fiddling with individual segments. A modest cut applied to all your rates is the cleanest way to move the needle, it's easy to switch on, and the whole listing responds together at the same time.",
    partnerResponse:
      "A general discount is exactly the friction I'm trying to avoid.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -6,
  },
  {
    id: 'ep-r5-none-step4-be-cheapest',
    label: 'Tell her to be the cheapest anywhere',
    description:
      "Push her to price below her own site so she's the cheapest anywhere. Requiring a partner to be the cheapest is forbidden in a No Parity market - and it directly breaks her head-office policy.",
    playerDialogue:
      "The real fix here, if you want the visibility to genuinely come flooding back, is to make sure you're the cheapest option travelers can find anywhere - and yes, that means going below your own direct site, not just level with it. Undercut everyone, including your website, put that price live with us, and you'll shoot straight back up the results where you belong.",
    partnerResponse:
      "Cheaper than our own site would get me fired. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step4: BranchingStep = {
  id: 'segmented',
  label: 'Land the fenced family workaround',
  partnerPrompt:
    "Well... it's true. How can we improve this without causing friction with our internal policies?",
  options: step4Options,
};

// ───────── Step 5 - Quantify + close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ep-r5-none-step5-correct',
    label: 'Quantify the family upside and close',
    description:
      "SME-prescribed close: quantify it (10% competitiveness -> ~30% more bookings, ~25% more revenue) and note families spend more and stay longer, so it's a big revenue lift without cheapening the property for everyone else.",
    playerDialogue:
      "It's massive, Sophia. On average, improving price competitiveness by 10% on Booking.com generates about 30% more bookings and 25% more revenue. And because family bookings spend more and stay longer, this is a real revenue lift without making the property cheaper for everyone else. Let's set it up and I'll book a follow-up to review.",
    partnerResponse:
      "This is exactly the kind of support that's most valuable for us - it lets me hit my revenue targets while keeping the auditors perfectly happy. Let's set up that targeted family rate today!",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ep-r5-none-step5-vague',
    label: 'Agree, but give no numbers',
    description:
      "Never answers her question - the traction - and pins no review. A results-driven GM needs the numbers for corporate.",
    playerDialogue:
      "It'll help a lot, honestly, I'm really confident about that - the family angle is exactly the kind of thing that tends to work well for properties like yours. Let's just get the family rate switched on, keep it nice and simple for now, and then see how it goes over the coming weeks. I think you'll be pleased with the direction it takes.",
    partnerResponse:
      "I asked for the traction - I need the numbers to take back to corporate.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ep-r5-none-step5-overreach',
    label: 'Push a public base cut on top',
    description:
      "Overreach past the fenced family rate to a public base cut - the exact ADR-wide, policy-breaking move she can't touch.",
    playerDialogue:
      "Perfect, let's do the family rate - and honestly, while we've got the momentum going, let's also bring your public base price down just a little at the same time to really push the whole thing along. If the family rate is going to lift things, a small trim on the main rate on top of it will accelerate the visibility even faster.",
    partnerResponse:
      "That's the base-rate move I can't touch. Family rate only.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Quantify the family upside and close',
  partnerPrompt:
    "Oh, that's a brilliant workaround! Corporate doesn't monitor opaque segment rates. What kind of traction can we get from that?",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const emeraldPeakNoneR5: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'emerald-peak-none',
  round: 5,
  issueTreePath: emeraldPeakR5IssueTreePath,
  openingAm: emeraldPeakOpeningAm,
  steps: [step1, step2, step3, step4, step5],
};
