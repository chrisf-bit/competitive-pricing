import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { riversideR4IssueTreePath } from './riverside-base';

/**
 * Riverside Boutique Hotel - Round 14 (Level 2 / On-Platform
 * Competitiveness).
 *
 * Source: SME "Round 14" doc, OPC Conversation Example 3 (Riverside
 * Boutique Hotel, Hotel ID 202). Follow-up to the Round 4 call - Anton
 * Müller, a premium-boutique General Manager (blue/green: guest
 * quality, brand positioning, collaborative but won't be dictated to on
 * rate). He refuses the algorithm's comp-set as "too unique" and waves
 * off platform averages. The unlock is to stop arguing the comp-set and
 * connect the gap to one specific high-value segment he actively wants:
 * US couples booking 30+ days out, whom he's losing to peers. The fix
 * is a targeted, fenced US Country Rate - no across-the-board ADR reset.
 *
 * OPC objections in play: The "Too Unique" Comp-Set Refusal, The
 * "Global Stat" Credibility Gap, The "Peer Group" Credibility Gap,
 * Connect the Metrics Gap, Internal vs External Data.
 *
 * Regime-neutral; safe across all three regimes. No parity language, no
 * matching ask, no ranking threat on the optimal path - the fenced
 * Country Rate is framed as his voluntary choice. Distractors teach
 * violations via a "match the comp-set" price demand and a ranking
 * threat. No internal metric names in any playerDialogue.
 */

const openingAm =
  "Good morning, Anton. Nice to speak with you again. I've been analysing your performance for the next 90 days to spot a couple of opportunities. Do you have a moment to look at the data?";

// ───────── Step 1 - Open briefly on the signal ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'rv-r14-step1-correct',
    label: 'Name the friction concisely',
    description:
      "SME-prescribed open, matched to a time-pressured GM: state the friction plainly - revenue left on the table, roughly a quarter of rooms unsold last month, forward sell-through pacing behind the local set.",
    playerDialogue:
      "I'll keep it tight. There's a clear friction over the next quarter: the property is leaving revenue on the table - around 24% of rooms went unsold last month and your forward sell-through is pacing about 8% behind your local market set.",
    partnerResponse:
      "24% unsold rooms? Look, Ren, we've talked about this. We are a premium boutique hotel. I'm not going to panic and start dropping rates to match the standard three-star hotels your algorithm decided to make my competitors. Our product is far too unique for those comparisons, and discounting damages our positioning.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rv-r14-step1-soft-preamble',
    label: 'Ease in with a long preamble',
    description:
      "Warm, but wrong for the room - a slow, relationship-first wind-up wastes the time of a GM who explicitly asked you to keep it brief, before you've earned it with a point.",
    playerDialogue:
      "Before we get into anything, I'd love to hear how the events season is shaping up and how the team's feeling - it's been a while since we really caught up properly.",
    partnerResponse:
      "Ren, I asked you to keep it brief - I'm mid-preparation. What's the actual situation with the numbers?",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rv-r14-step1-match-comp',
    label: 'Tell him to match the comp-set',
    description:
      "Opens by telling him to price in line with the comparison set - the exact 'become a three-star' move his brand refuses, and a requirement to match others on price that oversteps in every regime.",
    playerDialogue:
      "Your rooms aren't moving because you're priced above your comparison set - you'll need to bring your rates into line with them to compete.",
    partnerResponse:
      "Match the three-star set? Absolutely not. That's the fastest way to destroy everything this property stands for.",
    styleMatch: { red: -1, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

// ───────── Step 2 - Handle the "too unique" refusal ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'rv-r14-step2-correct',
    label: "Reframe via the traveler's journey",
    description:
      "SME-prescribed handling of the 'too unique' refusal: respect the position, then reframe - travelers don't know his brand or his competitors, they search by destination and amenities, so it's the market, not the algorithm, that sets the comparison.",
    playerDialogue:
      "I completely respect that, Anton. But think about the traveler's journey: they don't know you, and they don't know your competitors. They search for a destination, similar amenities, a similar stay. So in the end it's the market that sets the comparison, not us - and it's worth seeing it through the guest's eyes.",
    partnerResponse:
      "I take the point, but I'd want guests to get some sense of the uniqueness of our property right from the very beginning of their journey on your platform.",
    styleMatch: { red: 0, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rv-r14-step2-concede-unique',
    label: "Agree he's in a category of one",
    description:
      "Concedes the 'too unique' framing wholesale - if he really has no comparators, there's no competitiveness case to make, and the conversation stalls.",
    playerDialogue:
      "You're right, honestly - a property like yours is really in a category of its own, so those peer comparisons probably don't apply to you.",
    partnerResponse:
      "Exactly my point. So there's not much to discuss on the pricing front, is there?",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rv-r14-step2-insist-data',
    label: 'Insist the comp-set is simply correct',
    description:
      "Right that the comparison is real, wrong move - telling him the algorithm's comp-set is correct and he should accept it meets his identity objection with a flat contradiction, hardening him.",
    playerDialogue:
      "The comp-set the system built is accurate, Anton - those really are your competitors whether you like it or not, so it's best to just work with it.",
    partnerResponse:
      "Don't tell me a piece of software understands my property better than I do. We're not the same as those hotels.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
];

// ───────── Step 3 - Uniqueness lives in content; show the gap ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'rv-r14-step3-correct',
    label: 'Point uniqueness to content, then show the visibility gap',
    description:
      "SME-prescribed handling: his uniqueness comes through in strong photos and descriptions - that's where it belongs. Then surface the gap: visibility share down to 12% against a peer group at 21%, with his search price about 7% above peers.",
    playerDialogue:
      "That uniqueness absolutely comes through - in strong photography and a rich description, which is exactly where it should land. But alongside that, your visibility share has dropped to 12% while your peer group sits at 21%, and when travelers search your area your search price is running about 7% above them.",
    partnerResponse:
      "A 7% difference doesn't concern me if those travelers aren't our target audience. Our guests value exclusivity over price.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rv-r14-step3-lead-number-only',
    label: 'Lead with the 7% gap on its own',
    description:
      "Right data, missing the bridge - opening with 'your price is 7% too high' before honouring where his uniqueness shows lets him dismiss it as just another generic average.",
    playerDialogue:
      "The headline is this: your search price is 7% above your peer group. That gap is why your visibility is down - it really is that simple.",
    partnerResponse:
      "There it is - another platform average telling me to drop my price. I don't buy it, Ren.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rv-r14-step3-global-stat',
    label: 'Lean on a global platform statistic',
    description:
      "Reaches for a sweeping platform-wide stat to prove the point - exactly the 'global stat' a proud operator distrusts. It invites a credibility fight instead of grounding the gap in his own listing.",
    playerDialogue:
      "Across our entire platform, properties priced above their peers see far lower conversion - it's a universal pattern, and you're no exception to it.",
    partnerResponse:
      "Platform-wide averages mean nothing to a property like mine. Show me something that's actually about us, not everyone.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 4 - Connect the metric to his ideal segment ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'rv-r14-step4-correct',
    label: 'Tie the gap to the exact guests he wants',
    description:
      "SME-prescribed handling of the 'not our audience' objection: look at who's actually shopping the listing. For US couples booking 30+ days out - a high-spending, long-stay segment - he's losing 15% visibility share directly to his peer group.",
    playerDialogue:
      "That's fair for your repeaters. But look at who's actually shopping your listing right now. For US couples booking 30 or more days ahead - a high-spending, long-stay segment - you're losing 15% visibility share directly to your peer group. They're viewing you, then choosing a competitor.",
    partnerResponse:
      "Hmm... US couples booking a month out are exactly the guest profile we want. They spend heavily on extra services...",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'rv-r14-step4-generalise',
    label: 'Argue every segment is affected',
    description:
      "Right that the gap costs him, wrong angle - widening it to 'you're losing bookings everywhere' abandons the one high-value segment that would actually make him lean in, and sounds like the blanket case he keeps rejecting.",
    playerDialogue:
      "It's not just one segment, Anton - you're losing bookings right across the board because of that price gap. Everyone's affected.",
    partnerResponse:
      "'Everyone' again. If it's that broad, it's just the discount argument dressed up differently.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rv-r14-step4-shame',
    label: 'Suggest his exclusivity is costing him',
    description:
      "Frames his positioning as the problem - a jab at the brand identity he's proud of, which pushes a relationship-led GM to defend rather than engage.",
    playerDialogue:
      "Honestly, this 'exclusivity over price' stance is what's costing you the bookings - you can't afford to be precious about it when rooms are empty.",
    partnerResponse:
      "'Precious'? That exclusivity is the entire business, Ren. I won't be lectured on it.",
    styleMatch: { red: -1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -10,
  },
];

// ───────── Step 5 - Propose the fenced US Country Rate ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'rv-r14-step5-correct',
    label: 'Offer a fenced US Country Rate, no ADR reset',
    description:
      "SME-prescribed proposal: this is about winning the exact high-value travelers he wants, not competing with three-star hotels. A Country Rate fenced to US travelers applies a closed incentive only to that segment - improving sell-through without an across-the-board ADR reset or brand compromise.",
    playerDialogue:
      "So this isn't about competing with three-star properties - it's about winning the exact high-value travelers you want. We'd use a targeted tool: a Country Rate fenced specifically to travelers searching from the US. It applies a closed incentive to that segment only, so you recover those bookings without an across-the-board rate reset or touching your brand elsewhere.",
    partnerResponse:
      "A targeted Country Rate for the US market... What kind of concrete return does that actually give us? And does it show a badge on the results? How does it interact with the Genius programme - I fixed that setup last time and I don't want a huge stacked discount for US travelers.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'rv-r14-step5-broad-discount',
    label: 'Offer a general discount instead',
    description:
      "Right that he needs to be more competitive, wrong instrument - a general public discount is exactly the across-the-board ADR hit he refuses, when a fenced segment offer would have won his yes.",
    playerDialogue:
      "Let's just put a modest discount on your public rates for the next quarter - broad enough to lift the bookings and simple to run.",
    partnerResponse:
      "A public discount across the board is precisely what I told you I won't do. Weren't you listening?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'rv-r14-step5-guarantee',
    label: 'Promise a visibility guarantee',
    description:
      'Sells the tool with a guaranteed visibility/ranking return for discounting. Promising ranking or visibility rewards in exchange for a price move is a compliance breach in every regime.',
    playerDialogue:
      "Set up the US rate and I can guarantee your visibility jumps straight back up - the incentive buys you the placement, so it pays for itself.",
    partnerResponse:
      "A guaranteed jump? Nothing's guaranteed. That kind of promise makes me trust the rest of your pitch less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

// ───────── Step 6 - Answer the mechanics and close ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'rv-r14-step6-correct',
    label: 'Answer the badge/Genius questions honestly, then close',
    description:
      "SME-prescribed close: it's an opaque promotion and it does stack with Genius on the programme's room types; and since around 60% of users aren't logged in when they land, the more attractive desktop price makes a real first-glance difference. Let him own the setup.",
    playerDialogue:
      "Straight answers: it's an opaque promotion, and yes, it does stack with the Genius discount on the room types in the programme. But bear in mind roughly 60% of users aren't logged in when they land on the platform, so that more attractive price on desktop is what makes the difference at first glance. You set the stay dates and any exceptions.",
    partnerResponse:
      "Fair enough. Let's set the US Country Rate up - I'll implement it myself so I can check the stay dates and apply a few exceptions.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'rv-r14-step6-dodge-genius',
    label: 'Gloss over the Genius-stacking question',
    description:
      "He asked a direct, specific question about discount stacking - brushing past it ('don't worry about the detail') erodes trust with a partner who fixed that setup deliberately and is watching for exactly this.",
    playerDialogue:
      "Don't get too bogged down in the Genius mechanics - it'll all sort itself out once it's live. The important thing is just to switch it on.",
    partnerResponse:
      "I asked a direct question because I fixed that setup on purpose. 'Don't worry about it' is not an answer.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rv-r14-step6-widen-scope',
    label: 'Push to widen it beyond the US',
    description:
      "Uses the yes to reach past the fenced US segment he agreed - rolling it out to more markets 'while we're at it'. Reopens the ADR and brand worry he only just set aside.",
    playerDialogue:
      "Great - and while we're setting it up, let's extend the same rate to a few more source markets so we really maximise the reach.",
    partnerResponse:
      "No. I agreed to a fenced US rate for a reason. Widen it and we're back to eroding the brand everywhere.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: 'Open briefly on the signal',
    partnerPrompt:
      "Morning, Ren. Yes, keep it brief - we're right in the middle of preparations for some major events. As you know, my focus is protecting our revenue and maintaining brand standards. What's the situation?",
    options: step1Options,
  },
  {
    id: 'too-unique',
    label: 'Handle the "too unique" refusal',
    partnerPrompt:
      "24% unsold rooms? Look, Ren, we've talked about this. We are a premium boutique hotel. I'm not going to panic and start dropping rates to match the standard three-star hotels your algorithm decided to make my competitors. Our product is far too unique for those comparisons, and discounting damages our positioning.",
    options: step2Options,
  },
  {
    id: 'content-and-gap',
    label: 'Uniqueness in content; show the gap',
    partnerPrompt:
      "I take the point, but I'd want guests to get some sense of the uniqueness of our property right from the very beginning of their journey on your platform.",
    options: step3Options,
  },
  {
    id: 'connect-segment',
    label: 'Tie the gap to his ideal segment',
    partnerPrompt:
      "A 7% difference doesn't concern me if those travelers aren't our target audience. Our guests value exclusivity over price.",
    options: step4Options,
  },
  {
    id: 'propose',
    label: 'Propose the fenced US Country Rate',
    partnerPrompt:
      "Hmm... US couples booking a month out are exactly the guest profile we want. They spend heavily on extra services...",
    options: step5Options,
  },
  {
    id: 'close',
    label: 'Answer the mechanics and close',
    partnerPrompt:
      "A targeted Country Rate for the US market... What kind of concrete return does that give us? And does it show a badge on the results? How does it interact with the Genius programme - I don't want a huge stacked discount for US travelers.",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for riverside-none/-narrow/
 * -wide at round 14 in branchingScenarios.ts.
 */
export function riversideR14(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 14,
    issueTreePath: riversideR4IssueTreePath,
    openingAm,
    steps,
  };
}
