import type { PartnerMetrics } from '../types';

/**
 * Scripted per-round partner state baselines.
 *
 * The simulation's "spot the partner who needs you most" mechanic only
 * works if the data the learner reads on the portfolio actually
 * changes between rounds - otherwise the same partner is always
 * worst and the mechanic collapses to "click the same name every
 * round."
 *
 * The engine's conversation outcomes only nudge a few legacy metric
 * fields by a couple of points and never touch the headline KPIs the
 * learner reads (eRPD, RPD Public/Loyal, Lose Price Public, etc).
 * So we hand-author each partner's state per round, applied as a
 * baseline overlay on advanceRound and startPracticeRound.
 *
 * The narrative arc the baselines tell for No-Parity partners:
 *
 *   Round 1 - John is in a structural brand-first crisis. Booking.com
 *             roomnights -43% YoY, revenue -37%, ADR +10% (the
 *             classic signature of a partner who's pushed rates up
 *             and lost OTA volume on purpose). eRPD 9.5, lose-price
 *             81%. Marina is mid-pack with a slow mobile gap.
 *             Carlos is broadly OK and even improving.
 *
 *   Round 2 - John not yet baselined (R2 conversation content TBD;
 *             see correctPartnerPerRound.ts). Marina's slow mobile
 *             gap has now escalated - Public RPD jumped, Lose Price
 *             Public is over 80%. Marina is now clearest worst.
 *             Carlos still mild but starting to drift.
 *
 *   Round 3 - Marina improving (mobile addressed). Carlos's
 *             misconfigured Country Rate has been compounding
 *             silently - he's now the worst with a 10.8 eRPD
 *             trending sharply up.
 *
 * Rounds 4-10 are not yet baselined. They'll be filled in alongside
 * the conversation-tree drop for those rounds; until then the
 * partners simply retain their last baseline state.
 */
export interface PartnerStateBaseline {
  metrics: PartnerMetrics;
}

export const partnerStateByRound: Record<
  string,
  Record<number, PartnerStateBaseline>
> = {
  marina: {
    1: {
      metrics: {
        erpd: 6.3,
        erpdChange: 1.2,
        rpdPublic: 7.5,
        rpdLoyal: 4.8,
        losePricePublic: 68,
        activeScenarios: 1,
        competitor: 'brand',
        experiencedRPD: 58,
        visibility: 62,
        conversion: 45,
        revenue: 55,
        discountQuality: 40,
        rateParity: 'clean',
      },
    },
    2: {
      metrics: {
        erpd: 9.4,
        erpdChange: 3.1,
        rpdPublic: 11.2,
        rpdLoyal: 6.4,
        losePricePublic: 82,
        activeScenarios: 2,
        competitor: 'brand',
        experiencedRPD: 52,
        visibility: 56,
        conversion: 38,
        revenue: 48,
        discountQuality: 38,
        rateParity: 'clean',
      },
    },
    3: {
      metrics: {
        erpd: 5.1,
        erpdChange: -4.3,
        rpdPublic: 5.8,
        rpdLoyal: 4.0,
        losePricePublic: 58,
        activeScenarios: 1,
        competitor: 'brand',
        experiencedRPD: 64,
        visibility: 68,
        conversion: 52,
        revenue: 60,
        discountQuality: 55,
        rateParity: 'clean',
      },
    },
  },
  john: {
    1: {
      metrics: {
        erpd: 9.5,
        erpdChange: 0.4,
        rpdPublic: 10.8,
        rpdLoyal: 7.2,
        losePricePublic: 81,
        activeScenarios: 2,
        competitor: 'brand',
        pace: {
          period: 'Jun-Dec 2026',
          roomnights: { current: 876, lastYear: 1546, relativeChange: -43.34 },
          revenue: {
            current: 244679,
            lastYear: 391585,
            relativeChange: -37.52,
            currency: 'EUR',
          },
          adr: {
            current: 279,
            lastYear: 253,
            relativeChange: 10.27,
            currency: 'EUR',
          },
        },
        experiencedRPD: 42,
        visibility: 48,
        conversion: 36,
        revenue: 38,
        discountQuality: 30,
        rateParity: 'clean',
      },
    },
  },
  carlos: {
    1: {
      metrics: {
        erpd: 3.4,
        erpdChange: -1.2,
        rpdPublic: 4.1,
        rpdLoyal: 2.5,
        losePricePublic: 48,
        activeScenarios: 1,
        competitor: 'brand',
        experiencedRPD: 65,
        visibility: 70,
        conversion: 55,
        revenue: 62,
        discountQuality: 60,
        rateParity: 'minor',
      },
    },
    2: {
      metrics: {
        erpd: 5.6,
        erpdChange: 2.2,
        rpdPublic: 6.8,
        rpdLoyal: 4.0,
        losePricePublic: 61,
        activeScenarios: 1,
        competitor: 'brand',
        experiencedRPD: 60,
        visibility: 64,
        conversion: 50,
        revenue: 58,
        discountQuality: 52,
        rateParity: 'minor',
      },
    },
    3: {
      metrics: {
        erpd: 10.8,
        erpdChange: 5.2,
        rpdPublic: 12.4,
        rpdLoyal: 8.6,
        losePricePublic: 84,
        activeScenarios: 2,
        competitor: 'brand',
        experiencedRPD: 48,
        visibility: 52,
        conversion: 40,
        revenue: 46,
        discountQuality: 42,
        rateParity: 'minor',
      },
    },
  },
};

/**
 * Returns the baseline state for a given partner at a given round, or
 * null if no baseline is defined (which means: leave the partner's
 * current state untouched).
 */
export function getPartnerBaseline(
  partnerId: string,
  round: number,
): PartnerStateBaseline | null {
  return partnerStateByRound[partnerId]?.[round] ?? null;
}
