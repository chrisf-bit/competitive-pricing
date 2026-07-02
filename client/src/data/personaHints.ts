/**
 * Persona-driven pre-call hints surfaced on the Partner Detail screen.
 *
 * Each entry maps a partner x round x persona to a single one-line
 * lens on the partner. The chip that reads this on Partner Detail is
 * intentionally short - it's a pre-call cue, not a briefing document.
 * The persona picks *which* one line the learner sees; the same
 * partner reads differently depending on who's looking.
 *
 * Themes per persona (consistent across all partner-rounds):
 *   Conversation Architect - how to approach the conversation
 *   Objection Navigator    - the pushback most likely to derail
 *   Storyteller            - the story the numbers add up to
 *   Data Detective         - the biggest anomaly hiding in the data
 *
 * Coverage today: R1 for Marina, John, Carlos, plus the parked
 * Stavros kept in sync for reuse. R1 for Crystal Water Resort
 * across all three regime variants; R2 for Velvet Sky Boutique
 * Hotel across all three variants; R3 for The Noble Falcon Inn
 * across all three variants. R4+ blocked on SME content.
 */

export interface PersonaHint {
  /**
   * The single line rendered in the Partner Detail persona chip.
   * Keep it terse - one sentence, present tense, distills the
   * persona's angle on this specific partner-round.
   */
  oneLiner: string;
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
 * Sarah's character is constant; only the regulatory framing of the
 * conversation differs by regime.
 */
const crystalWaterR1Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'Sarah moves fast: open with the data, name the meta-search leak, land on a concrete next step.',
  },
  'objection-navigator': {
    oneLiner:
      'Expect resistance to a public rate drop; pitch targeted tools (Country Rate, Family) that protect her direct-first strategy.',
  },
  storyteller: {
    oneLiner:
      'Billboard without checkout: her 202% traffic spike converts elsewhere because her direct site undercuts Booking.',
  },
  'data-detective': {
    oneLiner:
      "Anomaly: Page Views +202% vs peer while Conversion -52% and Lose Price 99% - she's seen, not chosen.",
  },
};

/**
 * Shared persona hint content for Velvet Sky Boutique Hotel R2,
 * applied verbatim across all three regime variants. John's
 * character + metrics + objection types are constant.
 */
const velvetSkyR2Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'John is red/blue: open with the 90% discovery dynamic and let him do the maths - skip the rapport.',
  },
  'objection-navigator': {
    oneLiner:
      'Expect pushback on losing his direct edge; pitch fenced platform tools (Country/Mobile Rate) that keep his base intact.',
  },
  storyteller: {
    oneLiner:
      'Boutique with no Booking.com strategy: aggressive direct discounts, zero platform tools, 99% Lose Price on a mild 5% eRPD.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: zero active Booking.com pricing tools and Coverage QTD 0% - switch on Mobile Rate to capture demand without touching ADR.',
  },
};

/**
 * Shared persona hint content for The Noble Falcon Inn R3, applied
 * verbatim across all three regime variants. Anton's character +
 * metrics + objections are constant.
 */
const nobleFalconR3Hints: Partial<Record<PersonaId, PersonaHint>> = {
  'conversation-architect': {
    oneLiner:
      'Anton works inside brand policy: lead with curiosity about his constraints, then steer toward pilots that fit his frame.',
  },
  'objection-navigator': {
    oneLiner:
      'Expect a brand-policy defence; reframe around incremental demand and isolate risk via prepayment, not rate.',
  },
  storyteller: {
    oneLiner:
      'Structural Brand.com lockstep: visibility climbing, conversion collapsing, family scenarios flagging - brand policy costs volume.',
  },
  'data-detective': {
    oneLiner:
      'Anomaly: Page Views +26% vs peer while Conversion -17% and Lose Price 93% - Family 2+1/2+2 scenarios are your wedge.',
  },
};

export const personaHints: PersonaHintsByRound = {
  marina: {
    1: {
      'conversation-architect': {
        oneLiner:
          'Marina tests your logic - open with a specific numeric observation, not a rapport check-in.',
      },
      'objection-navigator': {
        oneLiner:
          "Expect a methodology challenge; have your source ready or she'll stall the call in process.",
      },
      storyteller: {
        oneLiner:
          'Marina reads healthy for R1 (Bucket 3, Lose Price 42%). The quieter story is that the Genius discount barely creates any gap between her Public and Loyal RPD.',
      },
      'data-detective': {
        oneLiner:
          'Anomaly: RPD Loyal (1.6%) sits close to RPD Public (2.8%). The Genius discount should be creating a ~10-point gap, not 1 point. Otherwise she reads healthy at R1.',
      },
    },
  },
  stavros: {
    1: {
      'conversation-architect': {
        oneLiner:
          'Stavros wants issue, impact, fix - in that order. Skip warmth; lead with the headline and a clear recommendation.',
      },
      'objection-navigator': {
        oneLiner:
          'Expect a platform-blame opener; redirect fast to the misconfigured Last-Minute Deal before it becomes a complaint session.',
      },
      storyteller: {
        oneLiner:
          'Price-competitiveness crisis: 96% Lose Price, eRPD up 6.8 points in a week, root cause a misconfigured Last-Minute Deal in plain sight.',
      },
      'data-detective': {
        oneLiner:
          'Anomaly: Last-Minute Deal flagged misconfigured alongside a 6.8-point eRPD jump - almost certainly the root cause.',
      },
    },
  },
  john: {
    1: {
      'conversation-architect': {
        oneLiner:
          "Don't lead with numbers - John reads OTA reps as upsellers. Open by asking how he drives direct traffic and let him talk.",
      },
      'objection-navigator': {
        oneLiner:
          "Expect '18% commission is too much' and 'never let any OTA above 30%' - reframe commission as one acquisition cost among several.",
      },
      storyteller: {
        oneLiner:
          "Brand-first crisis he can't see yet: rates pushed 10% higher to defend direct, roomnights -43% YoY, no maths on true direct acquisition cost.",
      },
      'data-detective': {
        oneLiner:
          'Anomaly: ADR +10% YoY while roomnights -43% and revenue -37% - strategy, not misconfig; reframe the channel, don\'t fix a discount.',
      },
    },
  },
  carlos: {
    1: {
      'conversation-architect': {
        oneLiner:
          'Carlos opens warm and fast - match his energy for 30 seconds, then move to the data.',
      },
      'objection-navigator': {
        oneLiner:
          "Expect a fast 'sounds great, let's try it' half-commit; pin him to a specific action and follow-up date before you close.",
      },
      storyteller: {
        oneLiner:
          'Not a crisis, a slow leak: visibility fine, eRPD even improving, but a misconfigured Country Rate compounding quietly.',
      },
      'data-detective': {
        oneLiner:
          "Anomaly: Country Rate flagged misconfigured despite Carlos's improving eRPD - the only red flag on the row and worth treating.",
      },
    },
  },
  // Crystal Water Resort R1 - same persona hint content across all
  // three regime variants (Wide / Narrow / None). Sarah's character,
  // the metrics, and the objection types are identical; only the
  // regulatory framing of the conversation differs by regime.
  'crystal-water-wide': { 1: crystalWaterR1Hints },
  'crystal-water-narrow': { 1: crystalWaterR1Hints },
  'crystal-water-none': { 1: crystalWaterR1Hints },
  // Velvet Sky Boutique Hotel R2 - same persona hint content across
  // all three regime variants.
  'velvet-sky-wide': { 2: velvetSkyR2Hints },
  'velvet-sky-narrow': { 2: velvetSkyR2Hints },
  'velvet-sky-none': { 2: velvetSkyR2Hints },
  // Noble Falcon Inn R3 - same persona hint content across all three
  // regime variants.
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
  const direct = personaHints[partnerId]?.[round]?.[personaId as PersonaId];
  if (direct) return direct;
  // Per-regime distractor variants (marina-narrow, carlos-wide, etc.)
  // alias back to their base partner's hints so we don't duplicate
  // per-regime hint content for each country variant.
  const baseId = partnerId.replace(/-(none|narrow|wide)$/, '');
  if (baseId === partnerId) return null;
  return personaHints[baseId]?.[round]?.[personaId as PersonaId] ?? null;
}
