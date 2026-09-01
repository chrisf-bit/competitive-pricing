import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { royalCrestR1IssueTreePath } from './royal-crest-base';

/**
 * Royal Crest Hotel - Round 11 (Level 2 / On-Platform Competitiveness).
 *
 * Source: SME "Round 11" doc, OPC Conversation Example 4 (Royal Crest
 * Hotel, Hotel ID 16). This is the follow-up call to the Round 1
 * conversation - same partner (Liam O'Connell, red/blue Property
 * Manager, brand-first, protects his direct channel), now seen through
 * the OPC lens the learner has unlocked. The data is the same partner
 * snapshot; the tab and the objections are new.
 *
 * OPC objections in play: The "Traveler-Centric" Pivot, The "Global
 * Stat" Credibility Gap, The "Peer Group" Credibility Gap, Internal vs
 * External Data. Liam disputes the platform's numbers ("the market is
 * soft", "I don't buy generic averages") and defends a premium
 * position; the win is a performance-led conversation that lands a
 * targeted, controlled mobile test - not a blanket rate drop.
 *
 * Regime-neutral: the OPC conversation is identical across Wide /
 * Narrow / No Parity (the parity-specific talking points in the doc
 * belong to the Level 1 XPC recap, not this call). The factory stamps
 * the engaged partner's regime-suffixed id so the same steps serve all
 * three portfolios.
 *
 * Compliance: safe across all three regimes. No parity language, no
 * matching ask, no ranking threat on the optimal path. The learner is
 * steered to targeted, opaque tools (mobile / country rates) framed as
 * the partner's choice. Distractors teach the violations through
 * ranking threats and blanket-drop pressure - never through parity
 * wording (which would break No Parity). No internal metric names
 * (eRPD, Lose Price, RPD, Price Bucket) appear in any playerDialogue.
 *
 * Distractors follow the "close but not quite" rule: each triad has one
 * plausible near-miss (right instinct, wrong framing / tool / timing)
 * and one clearer miss.
 */

const openingAm =
  'Hi Liam, thanks for taking the time to reconnect. Following up on our last conversation, I wanted to review your latest performance. Do you have a quick moment to look into it together?';

// ───────── Step 1 - Open on the OPC signal ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'rc-r11-step1-correct',
    label: 'Lead with the unsold-rooms and forward sell-through signal',
    description:
      'SME-prescribed open: name the forward-looking OPC signal - half the rooms unsold and sell-through pacing behind peers - and tie it to revenue he already senses is soft.',
    playerDialogue:
      "Looking at the next 90 days, there's a trend that needs attention: your property is showing 50% unsold rooms and your forward sell-through is pacing at -10% against your peer group. That lines up with the softer revenue you're feeling.",
    partnerResponse:
      "50% unsold? That sounds a bit high. Look, the market is just soft right now, every manager in town is feeling it. And last month wasn't even peak season - bad weather, a lot of late cancellations. I'm not going to panic over what happened last month.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r11-step1-history-only',
    label: "Open on last month's historical miss",
    description:
      "Right data, wrong window - leading with what already happened hands Liam the 'that was a one-off month' escape. The forward pace is the sharper, less-arguable angle.",
    playerDialogue:
      "Last month your numbers came in on the weaker side - occupancy dipped and you left a good number of rooms sitting empty. Before we look at anything ahead, I wanted to walk back through what actually happened there and what drove that softer month.",
    partnerResponse:
      "Last month was an anomaly - off-peak, bad weather, late cancellations. You can't read much into one soft month, Anya.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rc-r11-step1-blanket-drop',
    label: 'Jump to a blanket rate cut',
    description:
      'Skips the diagnosis and prescribes the one move his margin-first strategy exists to prevent - an across-the-board price drop. A driver reads it as being sold to.',
    playerDialogue:
      "Your rooms simply aren't selling right now, so the quickest and cleanest fix here is to bring your rates down across the board until occupancy climbs back to where you want it. We can get that lower pricing set up together today and start filling those empty nights.",
    partnerResponse:
      "Dropping my rates across the board is exactly what I will not do. That protects nothing and trains guests to wait for a discount. Next idea.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
];

// ───────── Step 2 - Reframe past -> forward demand ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'rc-r11-step2-correct',
    label: 'Pivot from last month to live traveler demand',
    description:
      'SME-prescribed handling of the "market is soft / one bad month" objection: accept that past data guides planning, then move to what live demand is doing now - visibility share below the peer median and a search-price gap that loses travelers at the search stage.',
    playerDialogue:
      "Past months guide our planning, agreed. But look at what live demand is doing right now: your visibility share is 10.3% while your peer group averages 17.9%. Travelers are searching, but your search price is running about 7% above your peers on key dates, so many drop off before they ever reach your page.",
    partnerResponse:
      "A 7% difference in search price? We offer a premium experience, Anya. Our repeat guests know our value. I don't buy into these generic platform averages that tell me to drop prices for everyone.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r11-step2-concede-soft',
    label: 'Agree the market is soft and wait it out',
    description:
      "Concedes his framing entirely - if it really is just a soft market, there's nothing to do. Plausibly empathetic, but it forfeits the forward signal that shows the gap is his competitiveness, not the market.",
    playerDialogue:
      "You're probably right that this is just a soft patch - honestly, a lot of properties in your area are telling me the same thing right now. There may not be much worth changing while the whole market is this quiet. Maybe the sensible move is to hold where you are, give it another month, and see whether demand picks back up on its own.",
    partnerResponse:
      "Fine by me - I'd rather hold my rates and ride it out than start chasing occupancy with discounts.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rc-r11-step2-ranking-threat',
    label: 'Warn the algorithm will bury him',
    description:
      'Turns the visibility gap into a threat - keep your prices here and the system pushes you down the rankings. Pressuring ranking as a consequence of his pricing is off-side in every regime.',
    playerDialogue:
      "I'll be straight with you - if you keep sitting well above your peers on price like this, the algorithm is going to keep reading your listing as uncompetitive and quietly pushing you further down the rankings. Every week you leave it, you slip lower and get harder to find, and that only reverses once you bring your prices back into line.",
    partnerResponse:
      "So this is a 'lower your price or we bury you' conversation. That's not a partnership. We're done here.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
];

// ───────── Step 3 - The Traveler-Centric pivot ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'rc-r11-step3-correct',
    label: "Put it in the traveler's shoes",
    description:
      'SME-prescribed handling of the "premium / generic averages" objection: respect his value, then shift to the traveler deciding in search - the 7% gap makes over half of searchers pick a competitor before they ever read about his amenities.',
    playerDialogue:
      "I respect your experience and what the property is worth. But picture the traveler in the search results: what makes them click 'book' on your listing versus the one next to it? Right now that 7% gap means more than half of those searchers choose a competitor before they even see your amenities.",
    partnerResponse:
      "Well... when you frame it around lost conversion like that, it's concerning. But what are you actually proposing? I've made my position clear - I can't lower our base rates across the board.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'rc-r11-step3-argue-data',
    label: 'Defend the platform numbers head-on',
    description:
      "Right that the data holds, wrong move - meeting 'I don't trust your averages' by insisting the averages are correct pulls him into a battle of data. The traveler's-eye reframe sidesteps that fight.",
    playerDialogue:
      "These aren't generic averages at all, Liam - they're your actual peer group on our platform, the properties travelers put you side by side with, measured on exactly the same dates you are. The methodology is sound and the numbers are solid, and they're telling us your pricing is sitting too high.",
    partnerResponse:
      "And I'm telling you my guests aren't your 'peer group'. We're not going to agree on whose numbers are right.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rc-r11-step3-dismiss-premium',
    label: 'Dismiss the premium positioning',
    description:
      "Tells him the premium story is in his head and travelers only care about price. Belittles the exact positioning he's proud of - the fastest way to lose a driver.",
    playerDialogue:
      "I'll be honest with you, Liam - the whole 'premium experience' angle is mostly in your own head at this point. Travelers landing on our platform compare one listing against the next purely on price, full stop, and none of that story about your value registers with them. Yours is simply too high, and that's the whole problem.",
    partnerResponse:
      "Did you just tell me my product is all in my head? This conversation is over.",
    styleMatch: { red: -1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -13,
  },
];

// ───────── Step 4 - Propose the targeted approach ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'rc-r11-step4-correct',
    label: 'Offer a targeted mobile segment, not a blanket cut',
    description:
      "SME-prescribed proposal: an empty room earns nothing, so capture demand through a fenced segment. Name the mobile surge in his area and his near-zero mobile conversion, and recall he only tested country rates last time - not a general drop.",
    playerDialogue:
      "An empty room earns nothing, so instead of touching your base rates, let's capture demand where you're losing it. There's a 40% rise in mobile searches for your area, yet your conversion on mobile is almost zero. Last time we spoke I suggested pairing mobile and country rates, but you tested only country rates.",
    partnerResponse:
      "Yes, we went with the country rates - I've never been a fan of that green badge on mobile. But how does that protect us from cannibalizing guests who'd have booked at full price anyway?",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'rc-r11-step4-all-segments',
    label: 'Switch on every targeted tool at once',
    description:
      "Right toolkit, wrong dose - flipping on mobile, country and campaigns together to 'move fast' overshoots the controlled test a cautious, margin-first partner will actually agree to.",
    playerDialogue:
      "Let's not overthink this one, Liam - the fastest way through it is to switch on your mobile rates, your country rates and a campaign all at the same time, so we're covering every possible angle at once. Turning them all on together is really the quickest route to moving those numbers and getting your empty rooms filling again this month.",
    partnerResponse:
      "That's a lot of discounting at once for a property that's supposedly premium. You're moving faster than I'm comfortable with.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'rc-r11-step4-match-external',
    label: 'Tell him to match the cheaper prices elsewhere',
    description:
      "Points at his rates on other channels and tells him to bring Booking.com down to match them. Requiring a partner to match external prices oversteps in every regime and breaks No Parity outright.",
    playerDialogue:
      "I've had a look, and your rooms are clearly cheaper on a couple of your other channels than they are with us, so the fix here is really quite simple - just bring your prices on Booking.com down until they match exactly what you're already offering everywhere else. Get them lined up with your other channels and this competitiveness gap closes on its own.",
    partnerResponse:
      "How I price on my other channels is my business, and being told to match it here is exactly the conversation I won't have.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -14,
  },
];

// ───────── Step 5 - Handle the cannibalization worry ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'rc-r11-step5-correct',
    label: 'Frame mobile as an incremental last-minute segment',
    description:
      "SME-prescribed handling of the cannibalization worry: mobile bookers are a distinct, high-intent, last-minute segment. Being 10% more competitive there drives on average 30% more bookings and 25% more revenue, lifting sell-through without changing his wider strategy.",
    playerDialogue:
      "Mobile bookers are a specific segment - often last-minute, with high intent to actually stay. They're largely incremental, not the full-price guest you already have. Being 10% more competitive to them generates, on average, 30% more bookings and 25% more revenue, so it lifts your sell-through without touching your overall strategy.",
    partnerResponse:
      "Hmm... a controlled discount aimed at last-minute mobile guests, to be more competitive against my peers. That's not a bad idea, actually.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'rc-r11-step5-reassure-vague',
    label: "Reassure him it won't cannibalize, without the why",
    description:
      "Right conclusion, missing the proof - telling a blue/analytical partner 'trust me, it won't cannibalize' without the segment logic or the numbers gives him nothing to act on.",
    playerDialogue:
      "Honestly, I wouldn't worry about cannibalization on this one - it really won't turn out to be an issue for a property like yours. In my experience this kind of targeted move just tends to work out fine once it's live, and the guests you picture losing at full price don't usually behave that way. I'd say switch it on and give it a proper go.",
    partnerResponse:
      "'It tends to work out' isn't the evidence I need before I discount anything. Give me the actual reasoning.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rc-r11-step5-guarantee',
    label: 'Promise the discount will lift his ranking',
    description:
      'Sells the mobile rate by promising a ranking and visibility reward for discounting. Promising ranking rewards in exchange for a price move is a compliance breach in every regime.',
    playerDialogue:
      "Here's the part that makes it worth it - the moment you switch on that mobile rate, I can promise you it'll push you straight back up the rankings and win back all of that visibility you've been losing to your peers. The discount genuinely pays for itself in placement, because the system rewards the more competitive price with a higher position.",
    partnerResponse:
      "So now there's a guaranteed ranking bump if I discount? That's the kind of promise that makes me trust the rest of your numbers less, not more.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

// ───────── Step 6 - Close on a measured test ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'rc-r11-step6-correct',
    label: 'Lock the metric and a follow-up',
    description:
      "SME-prescribed close: agree to track the incremental demand and revenue from the mobile rate plus the sell-through, and set a review in a month - so the test has a clear scoreboard and a next step.",
    playerDialogue:
      "Let's do exactly that. We'll track the incremental demand and revenue the mobile rate brings in, plus your sell-through, and reconnect in a month to review the numbers and decide the next step together.",
    partnerResponse:
      "Ok, we can do that. But if it doesn't work and I don't see a positive impact on my revenue, we turn it off.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'rc-r11-step6-vague-close',
    label: 'Set it live and leave it open',
    description:
      "Takes the yes but pins nothing - no agreed metric, no review date. A measurement-minded partner will let an untracked test quietly lapse.",
    playerDialogue:
      "Great, that's settled then - I'll go ahead and get the mobile rate switched on at our end, and from there we can just keep an eye on things and see how it all plays out over the coming weeks.",
    partnerResponse:
      "See how it goes measured by what, exactly? If we don't agree what success looks like, this just drifts.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'rc-r11-step6-upsell',
    label: 'Push to widen the discount immediately',
    description:
      "Uses the yes to reach for more - deepen the discount and extend it to every segment now. Blows past the controlled test he just agreed to and reopens the ADR fight.",
    playerDialogue:
      "Perfect - and honestly, while we're already in there setting it up, let's go a step further, deepen that discount and roll it out across all of your segments too, so we really move the needle and see a proper impact this month.",
    partnerResponse:
      "That's the across-the-board move I told you I won't make. Stick to the mobile test or forget it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -8,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: 'Open on the OPC signal',
    partnerPrompt:
      "Let's dive in, Anya. We're keeping our prices the same to protect our profits, but I'll admit revenue is lower than I'd like. What's your data showing?",
    options: step1Options,
  },
  {
    id: 'forward-demand',
    label: 'Pivot from last month to live demand',
    partnerPrompt:
      "50% unsold? That sounds a bit high. Look, the market is just soft right now, every manager in town is feeling it. And last month wasn't even peak season - bad weather, a lot of late cancellations. I'm not going to panic over what happened last month.",
    options: step2Options,
  },
  {
    id: 'traveler-centric',
    label: "Put it in the traveler's shoes",
    partnerPrompt:
      "A 7% difference in search price? We offer a premium experience, Anya. Our repeat guests know our value. I don't buy into these generic platform averages that tell me to drop prices for everyone.",
    options: step3Options,
  },
  {
    id: 'propose',
    label: 'Propose the targeted approach',
    partnerPrompt:
      "Well... when you frame it around lost conversion like that, it's concerning. But what are you actually proposing? I've made my position clear - I can't lower our base rates across the board.",
    options: step4Options,
  },
  {
    id: 'cannibalization',
    label: 'Handle the cannibalization worry',
    partnerPrompt:
      "Yes, we went with the country rates - I've never been a fan of that green badge on mobile. But how does that protect us from cannibalizing guests who'd have booked at full price anyway?",
    options: step5Options,
  },
  {
    id: 'close',
    label: 'Close on a measured test',
    partnerPrompt:
      "Hmm... a controlled discount aimed at last-minute mobile guests, to be more competitive against my peers. That's not a bad idea, actually.",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for royal-crest-none/-narrow/
 * -wide at round 11 in branchingScenarios.ts.
 */
export function royalCrestR11(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 11,
    issueTreePath: royalCrestR1IssueTreePath,
    openingAm,
    steps,
  };
}
