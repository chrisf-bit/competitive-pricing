/**
 * Persona-driven pre-call hints surfaced on the Partner Detail screen.
 *
 * Each entry maps a partner x round x persona to:
 *   - unlocked: the strength card content (the persona's superpower
 *     applied to *this* partner-round, shown at full prominence)
 *   - mutedTeaser: the one-line teaser shown on the dimmed/collapsed
 *     blind-spot card before the learner expands it
 *   - mutedFull: the full content shown once they tap to expand. After
 *     they've expanded once, the card hides on subsequent visits to
 *     this partner-round (per Chris's "hide when seen once" call).
 *
 * Themes per persona (consistent across all partner-rounds):
 *   Conversation Architect - unlocks how-to-approach; mutes anomaly callout
 *   Objection Navigator    - unlocks likely-objections; mutes relationship tone
 *   Storyteller            - unlocks one-line narrative; mutes raw-trend detail
 *   Data Detective         - unlocks biggest anomaly + read; mutes style cue
 *
 * Coverage today: R1 for the active No-Parity roster (Marina, John,
 * Carlos) plus the parked Stavros entry kept in sync for reuse. R3
 * for The Noble Falcon Inn across all three regime variants (Wide /
 * Narrow / None). R2 to follow once SME content lands; R4+ blocked
 * on SME content for those rounds.
 */

export interface PersonaHint {
  unlocked: string;
  mutedTeaser: string;
  mutedFull: string;
}

type PersonaId =
  | 'conversation-architect'
  | 'objection-navigator'
  | 'storyteller'
  | 'data-detective';

export type PersonaHintsByRound = Record<
  string,
  Record<number, Partial<Record<PersonaId, PersonaHint>>>
>;

/**
 * Shared persona hint content for Crystal Water Resort R1, applied
 * verbatim across all three regime variants (Wide / Narrow / None).
 * Sarah's character is constant across markets; the metrics + the
 * four objections are the same; the only thing that changes by
 * regime is the regulatory framing of the conversation - which
 * doesn't move the persona's read of the partner.
 */
const crystalWaterR1Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    unlocked:
      "Sarah is red / yellow. Lead with the data observation, get to the point fast, and connect each step to a concrete commercial number. Skip the warmth - she reads 'understanding' without a next step as filler. Open by mirroring her direct-first strategy, then surface the meta-search leak so she sees the cost in her own terms.",
    mutedTeaser: 'A counter-intuitive anomaly is sitting in the traffic data.',
    mutedFull:
      "Page Views are up 202% vs peer but Conversion is down 52% and Lose Price is at 99%. She's being seen massively - she's just not being chosen, because her direct site is cheaper. The headline number to hold in your head is the meta-search leak: travellers see her here, compare, and book the lower price elsewhere (often a third-party OTA, not her direct site).",
  },
  'objection-navigator': {
    unlocked:
      "Expect three flavours of pushback: (1) 'we're shifting share to direct intentionally', (2) 'commission costs are the reason', and (3) 'a public rate drop is non-negotiable'. The wedge is to keep her public base intact and pitch targeted tools - Country Rate, Family rate, or matching the brand promo specifically - so she stays in control while you capture the 202% traffic surplus.",
    mutedTeaser: 'Her relational tempo is faster than the numbers suggest.',
    mutedFull:
      "Sarah moves quickly and dislikes long preambles. She'll cut you off if you spend more than 20 seconds on context before getting to the ask. Open with the observation, pivot fast, and close on a concrete next step with a review date she can take to her revenue team this afternoon.",
  },
  storyteller: {
    unlocked:
      "Crystal Water is a billboard-without-the-checkout story. Sarah's promotional rate on her direct brand site is undercutting Booking.com, so the 202% page-view spike vs peer turns into traffic that converts elsewhere. The leak is to meta-search third parties as much as to her own site - she doesn't yet see that part of the picture, which is the wedge.",
    mutedTeaser: 'The supporting detail behind the 202% headline matters here.',
    mutedFull:
      "eRPD 5.2% (Bucket 4) with a +3.27 YoY change, Public RPD 6.6% vs Loyal RPD 0.6% (her Genius members see a competitive rate, the general public doesn't). Lose Price Public 99%. Only Genius Programme active out of 11 pricing products - pricing coverage QTD 12%. Last 30D ABRN 514 (-15%), Room Nights -28% vs peer, Conversion 1.1% (-52%). Last pricing contact 28 days back.",
  },
  'data-detective': {
    unlocked:
      "Headline anomaly: Page Views +202% vs peer while Conversion is -52% and Lose Price sits at 99%. She's being seen but losing the price comparison almost every time. Pair that with Public RPD 6.6% and Loyal RPD 0.6% - the gap is on the public-traveller side specifically, not on Genius. That's the leverage point: a targeted tool or a brand-rate alignment without disturbing her Genius pricing.",
    mutedTeaser: "You may not have read on Sarah's communication style yet.",
    mutedFull:
      "Sarah is red / driver primary with yellow / expressive secondary. She wants speed, energy, and a clear commercial logic. Mirror her pace - state the observation, get to the ask, close on a concrete pilot with a review date. Methodical exposition or warm-and-amiable openers will lose her in the first 30 seconds.",
  },
};

/**
 * Shared persona hint content for The Noble Falcon Inn R3, applied
 * verbatim across all three regime variants (Wide / Narrow / None).
 * Anton's character is constant across markets; the metrics + the
 * four objections are the same; the only thing that changes by
 * regime is the regulatory framing of the conversation - which
 * doesn't move the persona's read of the partner.
 */
const nobleFalconR3Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    unlocked:
      "Anton operates inside brand policy. If you open by leading with the price gap, he'll quote brand directives and the call stalls. Lead with curiosity about the constraints he's working within, then steer toward pilots that fit inside his frame - he'll meet you there.",
    mutedTeaser: 'The metric pattern hides a counter-intuitive anomaly.',
    mutedFull:
      "Page Views vs peer are up 26% but Conversion is down 17%, with Lose Price at 93%. He's being seen, just not chosen - and the Brand scenario is the structural lock, not a behavioural miss. Approaches that respect the brand frame will move faster than direct challenges to the headline price gap.",
  },
  'objection-navigator': {
    unlocked:
      "Expect four overlapping pushbacks: (1) brand policy keeps Brand.com cheaper, (2) higher rates here filter 'risky' guests, (3) direct guests are the loyal base he protects, (4) brand control trumps platform volume. Don't argue the rule - reframe around incremental demand and isolate risk via prepayment policies, not via the rate.",
    mutedTeaser: 'His relational tone is steadier than the numbers make it look.',
    mutedFull:
      "Anton is measured and defers to brand HQ - he won't commit in-call. Expect 'I'll have our revenue team review' as a yes-with-process, not a no. Anchor each ask to a specific pilot with a review date (30-day test, three-week review) and you'll close cleanly.",
  },
  storyteller: {
    unlocked:
      'Noble Falcon is in a structural Brand.com lockstep. Brand-managed pricing pushed Booking.com price competitiveness sharply down vs last year while visibility climbed and conversion collapsed against peer. Anton sees this as brand policy doing its job; the data says it costs volume at the moment family scenarios start flagging.',
    mutedTeaser: 'You may be smoothing the supporting detail.',
    mutedFull:
      'eRPD 17.0% (+21.42 YoY), Public RPD 20.0%, Loyal RPD 5.9%, Lose Price Public 93%. Four active scenarios with Brand alongside Family 2+1 and Family 2+2. Last 30D Page Views 74,948 (+26% vs peer), Conversion 1.4% (-17%), ABRN 1,306 (-18% YoY). Last pricing contact 2026-05-13. Price bucket 7.',
  },
  'data-detective': {
    unlocked:
      "Headline anomaly: Page Views +26% vs peer while Conversion -17% and Lose Price at 93%. He's getting the impressions but losing the price comparison nearly every time. Pair that with Family 2+1 and 2+2 scenarios flagged - the family segment is your wedge into the brand-policy conversation.",
    mutedTeaser: "You may not have a read on Anton's style yet.",
    mutedFull:
      'Anton is blue/thinker primary with red/driver secondary. He responds to structured, substantive asks that respect his time - lead with the data interpretation, get to the point, and close on concrete pilot parameters with a review date. Fluffy small talk or open-ended exploration will lose him; so will theatrics or hard-sell energy.',
  },
};

export const personaHints: PersonaHintsByRound = {
  marina: {
    1: {
      'conversation-architect': {
        unlocked:
          "Bring the numbers up front. Marina will test your logic before she agrees with you; rapport without evidence reads as a sales pitch. Open with a specific observation, not a check-in.",
        mutedTeaser: 'You may be glossing over a numeric anomaly on this partner.',
        mutedFull:
          'Lose Price Public is sitting at 68% with a 1.2-point eRPD rise. Visibility is slipping faster than her headline eRPD suggests. The story is in the public/loyal gap, not the headline number.',
      },
      'objection-navigator': {
        unlocked:
          "Expect a methodology challenge. Marina will ask 'how did you measure that?' before agreeing with the diagnosis. Have the source ready or she'll stall the conversation in process.",
        mutedTeaser: 'You may be missing the relational tone going into this call.',
        mutedFull:
          'Relationship is neutral and Marina prefers scheduled, written exchanges. A cold push into pricing will feel transactional. Open with respect for her process, then move to data.',
      },
      storyteller: {
        unlocked:
          "Marina's visibility is slipping quietly. Genius bookings are holding the average up, but on non-Genius traffic her base rate is sitting just above the market and she's losing two-thirds of public price comparisons.",
        mutedTeaser: 'You may be smoothing over the trend detail.',
        mutedFull:
          'eRPD is up 1.2 points week-on-week with Lose Price Public at 68%. RPD Public 7.5 vs RPD Loyal 4.8 - a 2.7-point Genius-masking gap. Mobile Rate is inactive and most of Madrid is mobile traffic.',
      },
      'data-detective': {
        unlocked:
          'The headline anomaly: a 2.7-point gap between RPD Public (7.5%) and RPD Loyal (4.8%). Combined with an inactive Mobile Rate, this points at non-Genius mobile traffic - where most of Madrid sits.',
        mutedTeaser: "You may not have a read on Marina's style yet.",
        mutedFull:
          "Marina is a blue/analytical primary with a green/amiable secondary. She wants methodology, takes 24-48 hours to respond, and prefers written follow-ups. Skip jokes and rapport-led openers - they don't land with her.",
      },
    },
  },
  stavros: {
    1: {
      'conversation-architect': {
        unlocked:
          "Skip the small talk. Stavros wants the issue, the impact, and the fix - in that order. Open with the headline problem and a clear recommendation; he'll respect speed over warmth.",
        mutedTeaser: "Stavros's headline anomaly may not be on your radar.",
        mutedFull:
          'eRPD 17.2 (up 6.8 points), Lose Price Public 96%, and Last-Minute Deal flagged as misconfigured. The discount product is almost certainly the root cause behind the spike.',
      },
      'objection-navigator': {
        unlocked:
          "Stavros will blame the platform first - 'Booking.com is the problem, not my pricing.' Be ready to redirect to the specific misconfigured Last-Minute Deal before he turns the call into a complaint session.",
        mutedTeaser: "Stavros's relational context may shape how he opens.",
        mutedFull:
          'Relationship is cool and trust is low (40/100). He has previously blamed the platform on calls. A defensive opening from him is likely; an over-confident pitch will harden it.',
      },
      storyteller: {
        unlocked:
          "Stavros is in a price-competitiveness crisis. 96% of public traffic is losing on price, eRPD has spiked nearly 7 points in a week, and the root cause is sitting in plain sight: his Last-Minute Deal is misconfigured.",
        mutedTeaser: 'You may be smoothing over the underlying detail.',
        mutedFull:
          'eRPD 17.2, eRPD change +6.8, Lose Price Public 96%, active scenarios 3, top competitor Expedia. Last-Minute Deal status: misconfigured. Country Rate inactive. Genius and Mobile Rate both active.',
      },
      'data-detective': {
        unlocked:
          'The biggest anomaly by far: Last-Minute Deal flagged as misconfigured, paired with a 6.8-point eRPD jump in a week. Almost certainly the root cause. Cross-check the deal configuration before the call.',
        mutedTeaser: "You may not have a read on Stavros's style yet.",
        mutedFull:
          "Stavros is red/driver primary AND secondary - he wants speed, decisions, and ROI. He'll interrupt long preambles and respond to competitor benchmarks. Match his pace or he'll lose the thread.",
      },
    },
  },
  john: {
    1: {
      'conversation-architect': {
        unlocked:
          "Don't lead with numbers - John reads OTA reps as upsellers and will harden if you open with a pitch. Start by asking how he's driving direct traffic and let him talk. The opening you want is curiosity about his strategy, not a challenge to it.",
        mutedTeaser: 'A counter-intuitive anomaly may be hiding in his data.',
        mutedFull:
          "His PACE shows roomnights -43% YoY but ADR up 10%. He's pushed Booking.com rates higher to defend his direct channel - the headline isn't a pricing miss, it's a deliberate brand-first stance. Walk in knowing the strategy before challenging the maths.",
      },
      'objection-navigator': {
        unlocked:
          "Expect two hard pushbacks: '18% commission is too much' and 'I never let any OTA above 30% of my business.' Acknowledge the rule rather than taking it on directly. Reframe commission as one acquisition cost among several, and ask him to price his direct guest before agreeing on which is cheaper.",
        mutedTeaser: 'His relational tone may be testier than the numbers suggest.',
        mutedFull:
          "Relationship is neutral but John has strong opinions and acts on emotion when OTAs come up. He'll hear cross-channel framing as adversarial unless he raises it first. Open with respect for his brand-first logic, not a critique of it.",
      },
      storyteller: {
        unlocked:
          "John is in a brand-first crisis he doesn't yet see. He's pushed Booking.com rates 10% higher to protect his direct channel, lost 43% of room-nights, and hasn't done the maths on what a direct guest actually costs him once campaigns and meta-search fees are added in.",
        mutedTeaser: 'You may be smoothing over the supporting detail.',
        mutedFull:
          'eRPD 9.5 (up 0.4), Lose Price Public 81%, two active scenarios, top competitor Brand.com. PACE Jun-Dec: roomnights -43.34%, revenue -37.52%, ADR +10.27%. Three million Booking.com impressions in the last 90 days against a 60-room property.',
      },
      'data-detective': {
        unlocked:
          "The headline anomaly: ADR up 10% YoY while roomnights are down 43% and revenue down 37%. He's holding rates aggressively while volume collapses - that's strategy, not misconfiguration. Pair that with Lose Price Public at 81% and the call is about reframing the channel, not fixing a discount.",
        mutedTeaser: "You may not have a read on John's style yet.",
        mutedFull:
          "John is red/driver primary with a green/amiable secondary. He wants control and quick decisions, but he also values trust and a relationship that respects his judgement. Aggressive benchmarking or hard data-only pitches will harden him; offering choices and reframing options will move him.",
      },
    },
  },
  carlos: {
    1: {
      'conversation-architect': {
        unlocked:
          "Carlos opens warm and fast. Match his energy in the first 30 seconds, then move to the data once he's engaged. Cold or formal openings will feel transactional and he'll disengage emotionally.",
        mutedTeaser: 'A quiet anomaly on this partner is easy to miss.',
        mutedFull:
          "Carlos's eRPD is fine (3.4%, improving) but Country Rate is flagged as misconfigured. A silent compounding issue that will surface in 2-3 weeks if untreated.",
      },
      'objection-navigator': {
        unlocked:
          "Carlos jumps to 'sounds great, let's try it' but tends to half-commit. Pin him down on the specific action and a follow-up date before you close, or you'll re-have this conversation next round.",
        mutedTeaser: 'You may be missing his relational tempo on this call.',
        mutedFull:
          "Carlos is warm and energetic with a neutral relationship. He'll respond to enthusiasm and stories of similar properties. A heavy data-led opener will deflate the call before you've started.",
      },
      storyteller: {
        unlocked:
          "Carlos is broadly fine on visibility and his eRPD is even improving. But his Country Rate is misconfigured - a quiet drag that will compound if left alone. The story isn't a crisis, it's a slow leak.",
        mutedTeaser: 'You may be smoothing over the supporting detail.',
        mutedFull:
          'eRPD 3.4, eRPD change -1.2 (improving), Lose Price Public 48%, active scenarios 1. Country Rate status: misconfigured. Mobile Rate and Last-Minute Deal both active. Top competitor Brand.com.',
      },
      'data-detective': {
        unlocked:
          "The anomaly: Country Rate flagged as misconfigured despite Carlos's improving eRPD. It's a quiet compounding issue, not a crisis - but it's the only red flag on the row and worth treating.",
        mutedTeaser: "You may not have a read on Carlos's style yet.",
        mutedFull:
          "Carlos is yellow/expressive primary with a red/driver secondary. He thrives on enthusiasm and quick rapport, makes decisions fast (sometimes too fast), and dislikes long detailed analysis. Lead with energy, not numbers.",
      },
    },
  },
  // Crystal Water Resort R1 - same persona hint content across all
  // three regime variants (Wide / Narrow / None). Sarah's character,
  // the metrics, and the objection types are identical; only the
  // regulatory framing of the conversation differs by regime.
  // Sharing the hints via crystalWaterR1Hints keeps SME edits in
  // sync across all three variants.
  'crystal-water-wide': { 1: crystalWaterR1Hints },
  'crystal-water-narrow': { 1: crystalWaterR1Hints },
  'crystal-water-none': { 1: crystalWaterR1Hints },
  // Noble Falcon Inn R3 - same persona hint content across all three
  // regime variants (Wide / Narrow / None). Anton's character, the
  // metrics, the four objection types, and the partner profile are
  // identical; only the regulatory framing of the conversation
  // differs by regime. Sharing the hints via nobleFalconR3Hints
  // keeps SME edits in sync across all three variants.
  'noble-falcon-wide': { 3: nobleFalconR3Hints },
  'noble-falcon-narrow': { 3: nobleFalconR3Hints },
  'noble-falcon-none': { 3: nobleFalconR3Hints },
};

export function getPersonaHint(
  partnerId: string,
  round: number,
  personaId: string | null,
): PersonaHint | null {
  if (!personaId) return null;
  return personaHints[partnerId]?.[round]?.[personaId as PersonaId] ?? null;
}
