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
 * Carlos) plus the parked Stavros entry kept in sync for reuse.
 * R2/R3 to follow once the R1 UI is reviewed; R4+ blocked on SME
 * content for those rounds.
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
          "Expect two hard pushbacks: '18% commission is too much' and 'I never let any OTA above 30% of my business.' Don't fight the rule head-on. Reframe commission as one acquisition cost among several, and ask him to price his direct guest before agreeing on which is cheaper.",
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
};

export function getPersonaHint(
  partnerId: string,
  round: number,
  personaId: string | null,
): PersonaHint | null {
  if (!personaId) return null;
  return personaHints[partnerId]?.[round]?.[personaId as PersonaId] ?? null;
}
