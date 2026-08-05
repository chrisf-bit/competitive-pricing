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
 *   Round 1  - John in a brand-first crisis: pushing direct rates,
 *              losing OTA volume. eRPD 9.5, lose-price 81%.
 *              Marina mid-pack with a slow mobile gap; Carlos is
 *              broadly OK with a misconfigured Country Rate
 *              quietly compounding (the R3 trap).
 *
 *   Round 2  - Marina's slow mobile gap has escalated - Public RPD
 *              jumped, Lose Price Public over 80%. Marina is now
 *              clearest worst. Carlos still mild but starting to
 *              drift.
 *
 *   Round 3  - The Noble Falcon Inn (Anton Müller) in a structural
 *              Brand.com competitiveness gap. eRPD 17.0% with a
 *              +21.42 percentage-point YoY spike, Lose Price 93%,
 *              four active scenarios including the Brand Scenario.
 *              Same partner story across all three regime variants;
 *              the regulatory framing of the conversation differs
 *              by parity regime. The pre-R3 No-Parity Carlos arc
 *              (his misconfigured Country Rate compounding) will be
 *              re-housed in a different round when SME content for
 *              R4+ lands.
 *
 * Rounds 4-10 are not yet baselined. They'll be filled in alongside
 * the conversation-tree drop for those rounds; until then the
 * partners simply retain their last baseline state.
 */
export interface PartnerStateBaseline {
  metrics: PartnerMetrics;
}

/**
 * Round 3 baseline metrics for The Noble Falcon Inn. Shared verbatim
 * across all three regime variants (Wide / Narrow / None) because the
 * scenario data is identical - only the dialogue and compliance
 * shape of the conversation differ by regime. Returns a fresh object
 * per call so each partner-round entry owns its own data and the
 * engine can mutate without cross-contaminating siblings.
 *
 * Numbers map verbatim to the SME "Brand.com Competitiveness Gap"
 * Data Set table for Hotel ID 101.
 */
function nobleFalconR3Metrics(): PartnerMetrics {
  return {
    erpd: 17.0,
    erpdChange: 21.42,
    rpdPublic: 20.0,
    rpdLoyal: 5.9,
    losePricePublic: 93,
    activeScenarios: 4,
    activeScenarioNames: [
      'Brand Scenario',
      'Family 2+1',
      'Family 2+2',
      'App',
    ],
    competitor: 'brand',
    secondaryMetrics: {
      last30dAbrn: { value: 1306, deltaPct: -18 },
      last30dRoomNights: { value: 1113, deltaPct: 49 },
      last30dAdr: { value: 70, deltaPct: -17 },
      last90dPageViews: { value: 74948, deltaPct: 26 },
      last90dConversion: { value: 1.4, deltaPct: -17 },
      next3mRoomNights: { value: 1515, deltaPct: 81 },
    },
    // Encoded relative to the authoring date of 2026-06-04 - 22
    // days behind. Renders as `today - 22 days` so the gap stays
    // constant across replays.
    lastPricingContactDaysAgo: 22,
    pricingCoverageQTD: 64,
    experiencedRPD: 35,
    visibility: 42,
    conversion: 28,
    revenue: 32,
    discountQuality: 30,
    rateParity: 'major',
  };
}

export const partnerStateByRound: Record<
  string,
  Record<number, PartnerStateBaseline>
> = {
  marina: {
    1: {
      metrics: {
        // R1 distractor profile: clearly milder than Crystal Water
        // (eRPD 5.2% / Bucket 4 / Lose Price 99%). Marina reads
        // as a healthy boutique - Bucket 3, Lose Price 42% - so
        // the priority signal points unambiguously at Crystal
        // Water. The mobile-gap story stays in R2 where she
        // becomes the placeholder priority at sharper numbers.
        erpd: 2.4,
        erpdChange: 0.5,
        rpdPublic: 2.8,
        rpdLoyal: 1.6,
        losePricePublic: 42,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 820 },
          last30dRoomNights: { value: 520 },
          last30dAdr: { value: 145, deltaPct: -1 },
          last90dPageViews: { value: -2 },
          last90dConversion: { value: 1.8, deltaPct: -1 },
          next3mRoomNights: { value: 89, deltaPct: -3 },
        },
        lastPricingContactDaysAgo: 110,
        pricingCoverageQTD: 32,
        experiencedRPD: 68,
        visibility: 70,
        conversion: 55,
        revenue: 60,
        discountQuality: 50,
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
        activeScenarioNames: ['Brand.com', 'Mobile'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 740 },
          last30dRoomNights: { value: 460 },
          last30dAdr: { value: 148, deltaPct: 0 },
          last90dPageViews: { value: -5 },
          last90dConversion: { value: 1.5, deltaPct: -3 },
          next3mRoomNights: { value: 78, deltaPct: -7 },
        },
        lastPricingContactDaysAgo: 110,
        pricingCoverageQTD: 32,
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
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 880 },
          last30dRoomNights: { value: 540 },
          last30dAdr: { value: 144, deltaPct: -1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.0, deltaPct: 1 },
          next3mRoomNights: { value: 92, deltaPct: 2 },
        },
        lastPricingContactDaysAgo: 94,
        pricingCoverageQTD: 38,
        experiencedRPD: 64,
        visibility: 68,
        conversion: 52,
        revenue: 60,
        discountQuality: 55,
        rateParity: 'clean',
      },
    },
    // R4 decoy profile: healthy Bucket 3 so Riverside Boutique's sharp
    // +6.56 eRPD spike and family gap read as the clear R4 priority.
    4: {
      metrics: {
        erpd: 2.0,
        erpdChange: -1.2,
        rpdPublic: 3.2,
        rpdLoyal: -0.8,
        losePricePublic: 30,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 910, deltaPct: 3 },
          last30dRoomNights: { value: 560, deltaPct: 4 },
          last30dAdr: { value: 146, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.2, deltaPct: 2 },
          next3mRoomNights: { value: 98, deltaPct: 3 },
        },
        lastPricingContactDaysAgo: 40,
        pricingCoverageQTD: 42,
        experiencedRPD: 66,
        visibility: 70,
        conversion: 54,
        revenue: 62,
        discountQuality: 58,
        rateParity: 'clean',
      },
    },
    // R5 decoy profile: healthy Bucket 3 against Emerald Peak's Bucket 6
    // / 100% Lose Price, so the priority is unmistakable.
    5: {
      metrics: {
        erpd: 1.8,
        erpdChange: -0.9,
        rpdPublic: 3.0,
        rpdLoyal: -1.0,
        losePricePublic: 28,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 930, deltaPct: 4 },
          last30dRoomNights: { value: 575, deltaPct: 5 },
          last30dAdr: { value: 147, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.3, deltaPct: 2 },
          next3mRoomNights: { value: 101, deltaPct: 4 },
        },
        lastPricingContactDaysAgo: 36,
        pricingCoverageQTD: 44,
        experiencedRPD: 68,
        visibility: 72,
        conversion: 56,
        revenue: 64,
        discountQuality: 60,
        rateParity: 'clean',
      },
    },
    // R6 decoy profile: healthy Bucket 3 against Oceanfront Bliss's
    // Bucket 6 / visibility-debt collapse, so the priority is clear.
    6: {
      metrics: {
        erpd: 2.1,
        erpdChange: -0.7,
        rpdPublic: 3.1,
        rpdLoyal: -0.9,
        losePricePublic: 31,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 940, deltaPct: 3 },
          last30dRoomNights: { value: 580, deltaPct: 4 },
          last30dAdr: { value: 148, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.3, deltaPct: 2 },
          next3mRoomNights: { value: 102, deltaPct: 3 },
        },
        lastPricingContactDaysAgo: 34,
        pricingCoverageQTD: 45,
        experiencedRPD: 68,
        visibility: 74,
        conversion: 56,
        revenue: 65,
        discountQuality: 60,
        rateParity: 'clean',
      },
    },
    7: {
      metrics: {
        erpd: 2.3,
        erpdChange: -0.5,
        rpdPublic: 3.3,
        rpdLoyal: -0.7,
        losePricePublic: 33,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 955, deltaPct: 3 },
          last30dRoomNights: { value: 590, deltaPct: 4 },
          last30dAdr: { value: 149, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.3, deltaPct: 2 },
          next3mRoomNights: { value: 104, deltaPct: 3 },
        },
        lastPricingContactDaysAgo: 29,
        pricingCoverageQTD: 48,
        experiencedRPD: 68,
        visibility: 75,
        conversion: 57,
        revenue: 66,
        discountQuality: 61,
        rateParity: 'clean',
      },
    },
    8: {
      metrics: {
        erpd: 2.0,
        erpdChange: -0.4,
        rpdPublic: 3.0,
        rpdLoyal: -0.8,
        losePricePublic: 30,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 960, deltaPct: 3 },
          last30dRoomNights: { value: 595, deltaPct: 4 },
          last30dAdr: { value: 150, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.4, deltaPct: 2 },
          next3mRoomNights: { value: 106, deltaPct: 3 },
        },
        lastPricingContactDaysAgo: 26,
        pricingCoverageQTD: 50,
        experiencedRPD: 69,
        visibility: 76,
        conversion: 58,
        revenue: 67,
        discountQuality: 62,
        rateParity: 'clean',
      },
    },
    9: {
      metrics: {
        erpd: 2.4,
        erpdChange: -0.3,
        rpdPublic: 3.4,
        rpdLoyal: -0.6,
        losePricePublic: 32,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 970, deltaPct: 3 },
          last30dRoomNights: { value: 600, deltaPct: 4 },
          last30dAdr: { value: 151, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.4, deltaPct: 2 },
          next3mRoomNights: { value: 108, deltaPct: 3 },
        },
        lastPricingContactDaysAgo: 22,
        pricingCoverageQTD: 52,
        experiencedRPD: 70,
        visibility: 77,
        conversion: 59,
        revenue: 68,
        discountQuality: 63,
        rateParity: 'clean',
      },
    },
  },
  // John's baselines are retained even though John moved to
  // pendingPartners in June 2026 - keeps the data on disk in case
  // John is re-spliced back into the active roster. applyRoundBaseline
  // is a no-op for partners that aren't in initialPartners, so this
  // is harmless dead data.
  john: {
    1: {
      metrics: {
        erpd: 9.5,
        erpdChange: 0.4,
        rpdPublic: 10.8,
        rpdLoyal: 7.2,
        losePricePublic: 81,
        activeScenarios: 2,
        activeScenarioNames: ['Brand.com', 'App'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1500 },
          last30dRoomNights: { value: 750 },
          last30dAdr: { value: 129, deltaPct: 5 },
          last90dConversion: { value: 2, deltaPct: -3 },
          next3mRoomNights: { value: 67, deltaPct: -8 },
        },
        lastPricingContactDaysAgo: 126,
        pricingCoverageQTD: 24,
        experiencedRPD: 42,
        visibility: 48,
        conversion: 36,
        revenue: 38,
        discountQuality: 30,
        rateParity: 'clean',
      },
    },
  },
  // The Noble Falcon Inn - same baseline metrics across all three
  // regime variants (Wide / Narrow / None). The regime changes the
  // dialogue and compliance shape of the conversation, not the
  // partner data. nobleFalconR1 is defined below and re-used per
  // partner id - if SME updates a number, it lands in all three
  // variants automatically.
  'noble-falcon-wide': { 3: { metrics: nobleFalconR3Metrics() } },
  'noble-falcon-narrow': { 3: { metrics: nobleFalconR3Metrics() } },
  'noble-falcon-none': { 3: { metrics: nobleFalconR3Metrics() } },
  carlos: {
    1: {
      metrics: {
        // R1 distractor profile: drop to Bucket 3 so Crystal Water
        // (Bucket 4) sits visibly higher on the eRPD strip. The
        // misconfigured Country Rate is still the discoverable
        // trap that compounds across rounds - it's the only red
        // flag in his otherwise healthy R1 picture and pays off
        // at R3 (where the legacy Carlos R3 baseline ramps eRPD).
        erpd: 1.8,
        erpdChange: -0.4,
        rpdPublic: 2.3,
        rpdLoyal: 1.1,
        losePricePublic: 36,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1180, deltaPct: 3 },
          last30dRoomNights: { value: 680, deltaPct: 2 },
          last30dAdr: { value: 118, deltaPct: 2 },
          last90dPageViews: { value: 1, deltaPct: 1 },
          last90dConversion: { value: 2.1, deltaPct: 0 },
          next3mRoomNights: { value: 95, deltaPct: 2 },
        },
        lastPricingContactDaysAgo: 102,
        pricingCoverageQTD: 41,
        experiencedRPD: 72,
        visibility: 76,
        conversion: 62,
        revenue: 68,
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
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1150, deltaPct: 2 },
          last30dRoomNights: { value: 665, deltaPct: 1 },
          last30dAdr: { value: 120, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.0, deltaPct: -1 },
          next3mRoomNights: { value: 93, deltaPct: 1 },
        },
        lastPricingContactDaysAgo: 102,
        pricingCoverageQTD: 41,
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
        activeScenarioNames: ['Brand.com', 'Country Rate'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1080, deltaPct: -1 },
          last30dRoomNights: { value: 610, deltaPct: -3 },
          last30dAdr: { value: 122, deltaPct: 1 },
          last90dPageViews: { value: -3 },
          last90dConversion: { value: 1.7, deltaPct: -4 },
          next3mRoomNights: { value: 86, deltaPct: -6 },
        },
        lastPricingContactDaysAgo: 84,
        pricingCoverageQTD: 39,
        experiencedRPD: 48,
        visibility: 52,
        conversion: 40,
        revenue: 46,
        discountQuality: 42,
        rateParity: 'minor',
      },
    },
    // R4 decoy profile: healthy Bucket 3, clearly less urgent than
    // Riverside Boutique's spike + family/Genius gaps.
    4: {
      metrics: {
        erpd: 2.6,
        erpdChange: 0.4,
        rpdPublic: 3.6,
        rpdLoyal: -0.4,
        losePricePublic: 36,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1120, deltaPct: 2 },
          last30dRoomNights: { value: 640, deltaPct: 3 },
          last30dAdr: { value: 124, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 1.9, deltaPct: 1 },
          next3mRoomNights: { value: 94, deltaPct: 2 },
        },
        lastPricingContactDaysAgo: 46,
        pricingCoverageQTD: 40,
        experiencedRPD: 54,
        visibility: 60,
        conversion: 46,
        revenue: 52,
        discountQuality: 48,
        rateParity: 'clean',
      },
    },
    // R5 decoy profile: healthy Bucket 3, clearly less urgent than
    // Emerald Peak's Bucket 6 / 100% Lose Price.
    5: {
      metrics: {
        erpd: 2.4,
        erpdChange: 0.2,
        rpdPublic: 3.4,
        rpdLoyal: -0.6,
        losePricePublic: 34,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1140, deltaPct: 3 },
          last30dRoomNights: { value: 650, deltaPct: 3 },
          last30dAdr: { value: 125, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.0, deltaPct: 1 },
          next3mRoomNights: { value: 96, deltaPct: 2 },
        },
        lastPricingContactDaysAgo: 42,
        pricingCoverageQTD: 41,
        experiencedRPD: 56,
        visibility: 62,
        conversion: 48,
        revenue: 54,
        discountQuality: 50,
        rateParity: 'clean',
      },
    },
    // R6 decoy profile: healthy Bucket 3, clearly less urgent than
    // Oceanfront Bliss's Bucket 6 gap.
    6: {
      metrics: {
        erpd: 2.7,
        erpdChange: 0.3,
        rpdPublic: 3.7,
        rpdLoyal: -0.3,
        losePricePublic: 37,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1130, deltaPct: 2 },
          last30dRoomNights: { value: 645, deltaPct: 3 },
          last30dAdr: { value: 125, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 1.9, deltaPct: 1 },
          next3mRoomNights: { value: 95, deltaPct: 2 },
        },
        lastPricingContactDaysAgo: 44,
        pricingCoverageQTD: 42,
        experiencedRPD: 55,
        visibility: 61,
        conversion: 47,
        revenue: 53,
        discountQuality: 49,
        rateParity: 'clean',
      },
    },
    7: {
      metrics: {
        erpd: 2.9,
        erpdChange: 0.2,
        rpdPublic: 3.9,
        rpdLoyal: -0.1,
        losePricePublic: 38,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1150, deltaPct: 2 },
          last30dRoomNights: { value: 655, deltaPct: 3 },
          last30dAdr: { value: 126, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 1.9, deltaPct: 1 },
          next3mRoomNights: { value: 97, deltaPct: 2 },
        },
        lastPricingContactDaysAgo: 39,
        pricingCoverageQTD: 44,
        experiencedRPD: 55,
        visibility: 62,
        conversion: 48,
        revenue: 54,
        discountQuality: 50,
        rateParity: 'clean',
      },
    },
    8: {
      metrics: {
        erpd: 2.6,
        erpdChange: 0.2,
        rpdPublic: 3.6,
        rpdLoyal: -0.2,
        losePricePublic: 36,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1160, deltaPct: 2 },
          last30dRoomNights: { value: 660, deltaPct: 3 },
          last30dAdr: { value: 127, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.0, deltaPct: 1 },
          next3mRoomNights: { value: 98, deltaPct: 2 },
        },
        lastPricingContactDaysAgo: 35,
        pricingCoverageQTD: 46,
        experiencedRPD: 56,
        visibility: 63,
        conversion: 49,
        revenue: 55,
        discountQuality: 51,
        rateParity: 'clean',
      },
    },
    9: {
      metrics: {
        erpd: 2.8,
        erpdChange: 0.2,
        rpdPublic: 3.8,
        rpdLoyal: -0.1,
        losePricePublic: 37,
        activeScenarios: 1,
        activeScenarioNames: ['Brand.com'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1170, deltaPct: 2 },
          last30dRoomNights: { value: 665, deltaPct: 3 },
          last30dAdr: { value: 128, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.0, deltaPct: 1 },
          next3mRoomNights: { value: 99, deltaPct: 2 },
        },
        lastPricingContactDaysAgo: 31,
        pricingCoverageQTD: 47,
        experiencedRPD: 57,
        visibility: 64,
        conversion: 50,
        revenue: 56,
        discountQuality: 52,
        rateParity: 'clean',
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
  const direct = partnerStateByRound[partnerId]?.[round];
  if (direct) return direct;
  // Per-regime distractor variants (marina-narrow, carlos-wide, etc.)
  // alias back to their base partner's baselines so we don't need to
  // duplicate per-round metric scripts for each country variant.
  const baseId = partnerId.replace(/-(none|narrow|wide)$/, '');
  if (baseId === partnerId) return null;
  return partnerStateByRound[baseId]?.[round] ?? null;
}
