import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { emeraldPeakR5IssueTreePath } from './emerald-peak-base';

/**
 * Emerald Peak Lodge - Round 15 (Level 2 / On-Platform
 * Competitiveness). Ends on a NO.
 *
 * Source: SME "Round 15" doc, OPC Conversation Example 7 (Emerald Peak
 * Lodge, Hotel ID 11) - "no from the partner". Follow-up to the Round 5
 * call - Sophia Chen, a franchise GM (red/blue: decisive, value-led,
 * brand-first). She runs a deliberate strategy of keeping her own site
 * cheaper to "own the guest" and inflates her public price to fund the
 * Genius discount - a Fake Value pattern that leaves her search price
 * ~10% uncompetitive and her visibility well below peers. She hears the
 * whole case out and still declines: no changes, no decisions.
 *
 * Because the outcome is scripted (she says no regardless), the star
 * grading is on the PROCESS - a compliant, well-diagnosed, trust-
 * preserving conversation that leaves the door open for next month. The
 * optimal close does not capitulate and does not push harder; it offers
 * support and keeps the relationship intact.
 *
 * OPC objections in play: The "Traveler-Centric" Pivot and The "Fake
 * Value" Trap (Genius Inflation).
 *
 * Regime-neutral; safe across all three regimes. Stating that a less
 * competitive search price reduces visibility is fact-based (an allowed
 * DO), not a threat. Distractors teach violations via a ranking threat
 * and a push to dictate her direct-site pricing. No internal metric
 * names in any playerDialogue.
 */

const openingAm =
  "Good afternoon, Sophia. Thanks for taking the time. Following up on your targeted occupancy setups, I've looked at your performance for the next few months. Do you have a moment to go through it together?";

// ───────── Step 1 - Open on the forward sell-through ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ep-r15-step1-correct',
    label: 'Name the forward sell-through gap',
    description:
      "SME-prescribed open: point to the one forward metric that needs attention - sell-through pacing about 8% behind her peer group over the next 90 days.",
    playerDialogue:
      "Looking at the next 90 days, there's one metric worth your attention: your forward sell-through is pacing about 8% behind your peer group.",
    partnerResponse:
      "Well, that doesn't concern me a great deal - we still have time to sell. If our volume on third-party channels is lower, that's a calculated trade-off. We accept lower conversion on external platforms to safeguard our direct channel. How does that 8% compare against our historical data?",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'ep-r15-step1-alarm',
    label: 'Open by raising the alarm',
    description:
      "Right metric, wrong pitch - dramatizing an 8% forward gap as a crisis to a decisive, data-led GM reads as spin and hands her an easy reason to discount your whole read.",
    playerDialogue:
      "We've got a real problem for next quarter, Sophia - your sell-through is falling off a cliff and you're going to be left with a lot of empty rooms if we don't act now.",
    partnerResponse:
      "Falling off a cliff? Let's not be dramatic. We still have plenty of runway to sell. What are the actual figures?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ep-r15-step1-cut-price',
    label: 'Open by asking her to cut rates',
    description:
      "Prescribes a price cut before any diagnosis - the one move a brand-first franchise defending its direct channel will reject immediately.",
    playerDialogue:
      "Your pace is behind, so the fastest fix is to bring your public rates down and get more competitive across the board.",
    partnerResponse:
      "Lower our public rates? That undercuts the entire reason we protect our direct channel. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
];

// ───────── Step 2 - Historical context + visibility gap ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ep-r15-step2-correct',
    label: 'Give the history, then the visibility gap',
    description:
      "SME-prescribed handling: honour her ask for history - room nights sold up 40% vs peers over the last 30 days - but flag the missed opportunity in the 12% left unsold, and that her visibility sits at 17% against peers at 26%.",
    playerDialogue:
      "Happy to. Historically you're strong - room nights sold are up 40% versus your peers over the last 30 days. But there's a missed opportunity in the 12% of rooms that went unsold, and traveler search behaviour is driving it: your visibility share is sitting at 17%, while your peers average 26%.",
    partnerResponse:
      "Mmh, okay... so what's actually happening at the searching stage that drives that difference?",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r15-step2-only-bad-news',
    label: 'Skip the strong history, lead with the miss',
    description:
      "Right that the gap matters, wrong framing - withholding the genuinely strong 40% room-nights history and leading only with the unsold rooms reads as a one-sided case to a numbers-led GM who asked for the full picture.",
    playerDialogue:
      "The history doesn't really change the picture - the point is you left 12% of your rooms unsold and your visibility is well behind your peers. That's the headline.",
    partnerResponse:
      "I asked how it compares historically and you skipped straight to the bad news. Give me the whole picture.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ep-r15-step2-vague-visibility',
    label: 'Cite falling visibility with no numbers',
    description:
      "Right direction, missing the evidence - telling a data-led GM her visibility is 'slipping' without the 17%-vs-26% comparison gives her nothing concrete to weigh.",
    playerDialogue:
      "The short version is your visibility has been slipping lately - travelers just aren't seeing you as much as they used to, and that's dragging on your bookings.",
    partnerResponse:
      "'Slipping' by how much, against whom? I don't act on vague impressions.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 3 - The search-price gap and visibility debt ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ep-r15-step3-correct',
    label: 'Explain the search-price gap factually',
    description:
      "SME-prescribed diagnosis, framed as fact not threat: her search price is on average 10% higher than peers, which reduces how often she appears and builds a visibility debt - travelers pick an alternative before they ever reach her page.",
    playerDialogue:
      "At the search stage, your price comes up on average 10% higher than your peers. Less competitive prices simply appear less often, which builds up a visibility debt over time - travelers select an alternative before they even reach your page.",
    partnerResponse:
      "Our price positioning reflects our value. We do not adjust our rates across the board just to match minor competitors.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r15-step3-ranking-threat',
    label: 'Warn the platform will down-rank her',
    description:
      "Turns the factual visibility point into a threat - keep your price high and we push you down the results. Threatening a ranking penalty based on her prices is off-side in every regime.",
    playerDialogue:
      "Put simply, if you stay 10% above your peers the platform will keep pushing you further down the rankings until you bring the price into line.",
    partnerResponse:
      "So that's a threat now - drop my price or you'll bury me. That tells me everything I need to know about this conversation.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -15,
  },
  {
    id: 'ep-r15-step3-concede-value',
    label: 'Concede her price reflects her value',
    description:
      "Accepts 'our price reflects our value' as the end of it - which forfeits the diagnosis and lets a decisive GM close the topic before the real cause surfaces.",
    playerDialogue:
      "That's fair - if the price reflects the value you offer, then perhaps the search gap is just the cost of holding your positioning.",
    partnerResponse:
      "Exactly. So we're agreed there's nothing to change here.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
];

// ───────── Step 4 - The Fake Value trap (Genius inflation) ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ep-r15-step4-correct',
    label: 'Name the inflate-to-discount pattern',
    description:
      "SME-prescribed handling of the Fake Value trap: acknowledge her strategy of keeping her own site cheaper to own the guest, then show the cost - inflating the public price to fund the Genius discount is what makes her search price 10% uncompetitive, which drops her share to 17% and costs a 60% fall in last-minute mobile conversions.",
    playerDialogue:
      "I understand the strategy is to keep your own site cheaper to own the guest. But raising your public price to fund the Genius discount is exactly what's making your search price 10% uncompetitive. That's what drops your share to 17% - and it's costing you around a 60% fall in last-minute mobile conversions.",
    partnerResponse:
      "Down 60%, specifically on mobile searches? Why would that be? I've made sure our Genius programme is correctly set up and shown to your users.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ep-r15-step4-attack-strategy',
    label: 'Call her direct-site strategy a mistake',
    description:
      "Right that the inflation hurts her, wrong framing - labelling her own-the-guest strategy a mistake attacks a deliberate brand decision and dictates how she should run her direct channel.",
    playerDialogue:
      "Honestly, this whole 'keep our website cheaper' strategy is the mistake - you should be stopping that and leading with your best price here instead.",
    partnerResponse:
      "How I price my own website is my decision, not yours. This is exactly why I keep OTAs at arm's length.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'ep-r15-step4-generic-competitive',
    label: 'Say she just needs to be more competitive',
    description:
      "Right conclusion, missing the mechanism - 'you need to be more competitive' skips the specific inflate-to-fund-Genius insight, so a sharp GM hears a generic discount nudge and tunes out.",
    playerDialogue:
      "The bottom line is you just need to be more competitive on price here - that's what's holding your visibility and your mobile bookings back.",
    partnerResponse:
      "'Be more competitive' is code for 'discount', and we've been over why I won't.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 5 - Non-logged-in mobile + Genius coverage ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ep-r15-step5-correct',
    label: 'Explain non-logged-in mobile and partial Genius coverage',
    description:
      "SME-prescribed handling: the Genius programme is set up, but non-logged-in mobile searchers don't see the Genius discount at first glance, so they drift to competitors showing a mobile badge. And Genius is active on only one room type, so it covers a slice of inventory - a mobile rate would cover it all and lift visibility.",
    playerDialogue:
      "Your Genius setup is fine - the gap is non-logged-in mobile searchers. They don't see the Genius discount at first glance, so they gravitate to a local competitor showing a mobile badge. And Genius is active on just one of your room types, so it only reaches a slice of your inventory. A mobile rate would reach all of it and lift your visibility at the same time.",
    partnerResponse:
      "I see. But since all our guests are loyal, at some point they log in and take the extra 10% anyway. Right now I don't want to invest so much in this segment. And honestly, 12% unsold in the last 30 days isn't a concern for me - I know you'd like that extra share, but I'll focus on my website.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 5,
    optimal: true,
  },
  {
    id: 'ep-r15-step5-just-genius-more',
    label: 'Tell her to deepen the Genius discount',
    description:
      "Right that the discount isn't reaching enough travelers, wrong lever - pushing a deeper Genius discount doubles down on the very inflate-to-fund pattern that caused the problem, and still misses the non-logged-in mobile audience.",
    playerDialogue:
      "The simplest answer is to increase your Genius discount - go from one tier to the next so more travelers see a better price.",
    partnerResponse:
      "Discount my loyal members even harder? That's the opposite of protecting my margin. No thank you.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ep-r15-step5-guarantee-mobile',
    label: 'Promise the mobile rate guarantees the share back',
    description:
      "Oversells the mobile rate with a guaranteed visibility/share return for discounting - a promise of ranking or visibility reward in exchange for a price move, which breaches compliance in every regime.",
    playerDialogue:
      "Switch on a mobile rate and I can guarantee you win that 60% back and climb straight up the mobile rankings - it's a sure thing.",
    partnerResponse:
      "Nothing's a 'sure thing'. Guaranteeing me a ranking climb just makes me trust the rest of your numbers less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -11,
  },
];

// ───────── Step 6 - Close on the no, door open ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'ep-r15-step6-correct',
    label: 'Offer more data and keep the door open',
    description:
      "SME-prescribed close on a no: don't push and don't capitulate. Neutrally offer whatever data would help her make a decision on her own terms, respect the call, and agree to bring fresh insight next month. The outcome is a no, but the relationship - and the next conversation - is preserved.",
    playerDialogue:
      "Understood, Sophia - it's your call and I respect it. Is there any particular data I could pull together that would help if you ever want to revisit it? Either way, I'll keep an eye on the segment and bring you anything useful when we speak next month.",
    partnerResponse:
      "No, that's all for now - we already have our strategy set, so no changes or decisions to make. But thank you for the analysis, it was thorough.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 4,
    optimal: true,
  },
  {
    id: 'ep-r15-step6-press',
    label: 'Make one more push to change her mind',
    description:
      "She's clearly declined - pressing again to 'just try the mobile rate' after a firm no reads as not listening, and spends the goodwill that would have kept the door open for next time.",
    playerDialogue:
      "I really do think you're leaving money on the table here - can't I at least get you to trial the mobile rate for a few weeks before you decide?",
    partnerResponse:
      "I've given you my answer, Mei. Pushing after that isn't going to change it - if anything it makes me less inclined next time.",
    styleMatch: { red: -1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'ep-r15-step6-give-up',
    label: 'Accept the no and close it down',
    description:
      "Takes the no and quietly closes the door - no offer of support, no follow-up. A red/blue partner reads the flat retreat as disengagement, and there's no hook for the next conversation.",
    playerDialogue:
      "No problem at all - I'll leave it there then. Sorry to have taken up your time today.",
    partnerResponse:
      "Right. Well, thanks for stopping by, I suppose.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -3,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: 'Open on the forward sell-through',
    partnerPrompt:
      "Good afternoon, Mei. Yes, let's go! What trends are you seeing in the extranet for this upcoming quarter?",
    options: step1Options,
  },
  {
    id: 'history-visibility',
    label: 'Historical context + visibility gap',
    partnerPrompt:
      "Well, it doesn't concern me a lot - we still have time to sell. If our volume on third-party channels is lower, that's a calculated trade-off: we accept lower conversion on external platforms to safeguard our direct channel. How does that 8% figure compare against our historical data?",
    options: step2Options,
  },
  {
    id: 'search-gap',
    label: 'The search-price gap and visibility debt',
    partnerPrompt:
      "Mmh, okay... so what's actually happening at the searching stage that drives that difference?",
    options: step3Options,
  },
  {
    id: 'fake-value',
    label: 'The Fake Value trap (Genius inflation)',
    partnerPrompt:
      "Our price positioning reflects our value. We do not adjust our rates across the board just to match minor competitors.",
    options: step4Options,
  },
  {
    id: 'mobile-genius',
    label: 'Non-logged-in mobile + Genius coverage',
    partnerPrompt:
      "Down 60%, specifically on mobile searches? Why would that be? I've made sure our Genius programme is correctly set up and shown to your users.",
    options: step5Options,
  },
  {
    id: 'close',
    label: 'Close on the no, door open',
    partnerPrompt:
      "I see. But since all our guests are loyal, at some point they log in and take the extra 10% anyway. Right now I don't want to invest so much in this segment. And honestly, 12% unsold in the last 30 days isn't a concern for me - I know you'd like that extra share, but I'll focus on my website.",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for emerald-peak-none/
 * -narrow/-wide at round 15 in branchingScenarios.ts. Ends on a no -
 * grading is on the process, not the scripted outcome.
 */
export function emeraldPeakR15(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 15,
    issueTreePath: emeraldPeakR5IssueTreePath,
    openingAm,
    steps,
  };
}
