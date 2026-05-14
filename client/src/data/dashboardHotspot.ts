/**
 * Data & Insights content for clearance.
 *
 * Sample partner data with the actual KPIs PFRs have access to (eRPD,
 * eRPD change, Public/Loyal RPD, Lose Price Public, active scenarios,
 * competitor). The activity tests whether the learner can READ the
 * data - not navigate any specific dashboard layout (they use multiple
 * tools in real life with different layouts).
 *
 * Sourced from KPI spec shared by Chris on 2026-05-08.
 */

export type CompetitorTag = 'brand' | 'expedia';

export interface SamplePartnerRow {
  id: string;
  hotelName: string;
  /** Last pricing contact date string (display only). */
  lastContact: string;
  hasActiveScenario: boolean;
  /** eRPD percentage (positive = uncompetitive, lower is better). */
  erpd: number;
  /** Change in eRPD vs prior period; positive = worsening, negative = improving. */
  erpdChange: number;
  /** Public RPD percentage. */
  rpdPublic: number;
  /** Loyal (Genius) RPD percentage. */
  rpdLoyal: number;
  /** "Lose Price Public" - share of public traffic where the partner loses price. */
  losePricePublic: number;
  /** Count of currently active pricing scenarios for this partner. */
  activeScenarios: number;
  /** Top competitor for this partner. */
  competitor: CompetitorTag;
  /** Which specific scenario types are flagged (boolean flags). */
  scenarios: {
    family21: boolean;
    mdot: boolean;
    international: boolean;
    app: boolean;
    brandcom: boolean;
    wholesaler: boolean;
    family22: boolean;
    deepDiscount: boolean;
  };
}

export const samplePartnerData: SamplePartnerRow[] = [
  {
    id: 'hotel-valle',
    hotelName: 'Hotel Valle',
    lastContact: '30 Apr 2026',
    hasActiveScenario: true,
    erpd: 7.7,
    erpdChange: 11.65,
    rpdPublic: 10.3,
    rpdLoyal: 0.7,
    losePricePublic: 66,
    activeScenarios: 3,
    competitor: 'brand',
    scenarios: {
      family21: true,
      mdot: false,
      international: false,
      app: false,
      brandcom: true,
      wholesaler: false,
      family22: true,
      deepDiscount: false,
    },
  },
  {
    id: 'city-hotel',
    hotelName: 'City Hotel',
    lastContact: '26 Nov 2025',
    hasActiveScenario: true,
    erpd: 4.3,
    erpdChange: 3.97,
    rpdPublic: 10.1,
    rpdLoyal: 0.6,
    losePricePublic: 93,
    activeScenarios: 3,
    competitor: 'expedia',
    scenarios: {
      family21: false,
      mdot: true,
      international: true,
      app: true,
      brandcom: false,
      wholesaler: false,
      family22: false,
      deepDiscount: false,
    },
  },
  {
    id: 'park-one',
    hotelName: 'Park One Hotel',
    lastContact: '27 Feb 2026',
    hasActiveScenario: true,
    erpd: 15.6,
    erpdChange: 8.07,
    rpdPublic: 15.6,
    rpdLoyal: 15.7,
    losePricePublic: 93,
    activeScenarios: 1,
    competitor: 'brand',
    scenarios: {
      family21: false,
      mdot: false,
      international: false,
      app: false,
      brandcom: true,
      wholesaler: false,
      family22: false,
      deepDiscount: false,
    },
  },
  {
    id: 'attic-hotel',
    hotelName: 'Attic Hotel',
    lastContact: '15 Apr 2026',
    hasActiveScenario: true,
    erpd: 18.1,
    erpdChange: 5.54,
    rpdPublic: 19.4,
    rpdLoyal: 14.7,
    losePricePublic: 100,
    activeScenarios: 1,
    competitor: 'expedia',
    scenarios: {
      family21: false,
      mdot: false,
      international: true,
      app: false,
      brandcom: false,
      wholesaler: false,
      family22: false,
      deepDiscount: false,
    },
  },
  {
    id: 'the-maze',
    hotelName: 'The Maze Hotel',
    lastContact: '27 Mar 2026',
    hasActiveScenario: true,
    erpd: 6.3,
    erpdChange: 1.11,
    rpdPublic: 6.3,
    rpdLoyal: 6.3,
    losePricePublic: 81,
    activeScenarios: 1,
    competitor: 'brand',
    scenarios: {
      family21: false,
      mdot: false,
      international: false,
      app: false,
      brandcom: true,
      wholesaler: false,
      family22: false,
      deepDiscount: false,
    },
  },
  {
    id: 'paradise-beach',
    hotelName: 'Paradise Beach Hotel',
    lastContact: '21 Apr 2026',
    hasActiveScenario: true,
    erpd: 13.0,
    erpdChange: 7.41,
    rpdPublic: 13.0,
    rpdLoyal: 13.0,
    losePricePublic: 84,
    activeScenarios: 1,
    competitor: 'expedia',
    scenarios: {
      family21: false,
      mdot: true,
      international: false,
      app: false,
      brandcom: false,
      wholesaler: false,
      family22: false,
      deepDiscount: false,
    },
  },
  {
    id: 'uphill-hotel',
    hotelName: 'UpHill Hotel',
    lastContact: '03 Dec 2025',
    hasActiveScenario: true,
    erpd: 3.8,
    erpdChange: -8.15,
    rpdPublic: 6.5,
    rpdLoyal: -3.2,
    losePricePublic: 52,
    activeScenarios: 3,
    competitor: 'brand',
    scenarios: {
      family21: false,
      mdot: true,
      international: true,
      app: false,
      brandcom: true,
      wholesaler: false,
      family22: false,
      deepDiscount: false,
    },
  },
];

// ───────────────────────── Challenges ─────────────────────────

export interface DataInsightsChallenge {
  id: string;
  prompt: string;
  /** Hotel id of the correct row (highlighted on answer). */
  correctHotelId: string;
  options: { hotelId: string; label: string }[];
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export const dataInsightsChallenges: DataInsightsChallenge[] = [
  {
    id: 'priority',
    prompt:
      "You can only call ONE partner today. Based on the data, which one needs your attention most?",
    correctHotelId: 'attic-hotel',
    options: [
      { hotelId: 'hotel-valle', label: 'Hotel Valle' },
      { hotelId: 'attic-hotel', label: 'Attic Hotel' },
      { hotelId: 'uphill-hotel', label: 'UpHill Hotel' },
      { hotelId: 'the-maze', label: 'The Maze Hotel' },
    ],
    feedback: {
      correct:
        "Right. Attic Hotel has the worst eRPD in the portfolio (18.1%), it's still trending up, and 100% of public traffic is losing price. That combination - high eRPD + losing every public bid + still worsening - is the textbook priority signal.",
      incorrect:
        "Attic Hotel is the strongest signal here: worst eRPD (18.1%), still trending up, and 100% Lose Price Public. When eRPD is high AND Lose Price Public is high AND the trend is still rising, that's the partner who needs the call first.",
    },
  },
  {
    id: 'improving',
    prompt:
      "Which partner's pricing is actually improving (eRPD trending DOWN)?",
    correctHotelId: 'uphill-hotel',
    options: [
      { hotelId: 'hotel-valle', label: 'Hotel Valle' },
      { hotelId: 'park-one', label: 'Park One Hotel' },
      { hotelId: 'paradise-beach', label: 'Paradise Beach Hotel' },
      { hotelId: 'uphill-hotel', label: 'UpHill Hotel' },
    ],
    feedback: {
      correct:
        "Yep. UpHill Hotel is the only one in the table with a downward arrow on eRPD change (-8.15). Lower eRPD is what we want, so a downward trend means improving competitiveness - probably not the priority call this week.",
      incorrect:
        "UpHill is the only row with a downward arrow on the eRPD change column (-8.15). Lower eRPD = more competitive, so down is good. The others are all trending up.",
    },
  },
  {
    id: 'public-vs-loyal',
    prompt:
      "Hotel Valle's Public RPD is 10.3% but Loyal RPD is only 0.7%. What's the most likely story here?",
    correctHotelId: 'b',
    options: [
      { hotelId: 'a', label: 'The Genius programme is misconfigured' },
      {
        hotelId: 'b',
        label: 'The base price is uncompetitive; the Genius discount is masking it',
      },
      { hotelId: 'c', label: 'Conversion is the issue, not pricing' },
      { hotelId: 'd', label: 'Visibility is the bottleneck' },
    ],
    feedback: {
      correct:
        "Spot on. Public RPD is what non-logged-in travellers see; Loyal RPD is what Genius members see. The gap means Genius is doing its job - travellers using it get a competitive price - but the underlying public price is weak. The take-away here is that loyal price is masking the underneath issue and the partner is using Genius rate as base price.",
      incorrect:
        "It's the base-price-masked-by-Genius story. Non-logged-in travellers (Public RPD) see Booking.com as 10.3% off-pitch, but Genius members (Loyal RPD) get a near-perfect 0.7% - because the Genius discount lowers what they actually see. The internal read is that the public price is the problem; whether and how to raise that with the partner is a separate compliance question.",
    },
  },
];
