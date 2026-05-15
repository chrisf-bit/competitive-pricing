import type { PartnerState } from '../types';

export const initialPartners: PartnerState[] = [
  // ── Marina - Boutique City Hotel (Blue/Thinker) ──
  {
    persona: {
      id: 'marina',
      name: 'Marina Alvarez',
      propertyName: 'Hotel & Suites Castellana',
      propertyType: 'Boutique City Hotel',
      roomCount: 35,
      location: 'Madrid, Spain',
      parityRegime: 'none',
      avatar: 'MA',
      propertyImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop',
      style: 'blue',
      styleSecondary: 'green',
      description:
        'Meticulous owner-operator who tracks every metric. Respects data-driven conversations and detailed reasoning. Will test your logic before committing.',
      commercialGoal: 'Grow bookings without eroding ADR',
      profileNotes: [
        'Prefers scheduled calls over spontaneous check-ins',
        'Has asked for written proposals in the past',
        'References competitor data when making decisions',
        'Takes 24–48 hours to respond to recommendations',
      ],
    },
    metrics: {
      // New KPI structure
      erpd: 6.3,
      erpdChange: 1.2,
      rpdPublic: 7.5,
      rpdLoyal: 4.8,
      losePricePublic: 68,
      activeScenarios: 1,
      competitor: 'brand',
      // Story: moderate YoY decline across volume + revenue, ADR
      // essentially flat. Consistent with a small mobile-traffic
      // gap that's been bleeding bookings without changing rate
      // strategy. Not a crisis (compare with John); slow leak.
      pace: {
        period: 'Jun-Dec 2026',
        roomnights: { current: 4180, lastYear: 4720, relativeChange: -11.44 },
        revenue: {
          current: 587000,
          lastYear: 670000,
          relativeChange: -12.39,
          currency: 'EUR',
        },
        adr: {
          current: 140,
          lastYear: 142,
          relativeChange: -1.41,
          currency: 'EUR',
        },
      },
      // Legacy
      experiencedRPD: 58,
      visibility: 62,
      conversion: 45,
      revenue: 55,
      discountQuality: 40,
      rateParity: 'clean',
    },
    metricHistory: [],
    trust: 55,
    relationship: 'neutral',
    discounts: [
      { id: 'genius', label: 'Genius Programme', status: 'active' },
      { id: 'mobile-rate', label: 'Mobile Rate', status: 'inactive' },
      { id: 'country-rate', label: 'Country Rate', status: 'inactive' },
      { id: 'last-minute', label: 'Last-Minute Deal', status: 'inactive' },
      { id: 'early-booker', label: 'Early Booker Deal', status: 'inactive' },
    ],
    conversationLog: [],
    pendingActions: [],
  },

  // ── John - Brand-first Boutique Hotel (Red/Driver) ──
  // No-Parity scenario, branching conversation shape. Replaces
  // Stavros as the R1 target in the No-Parity rotation.
  {
    persona: {
      id: 'john',
      name: 'John Marston',
      propertyName: 'Marston House',
      propertyType: 'Boutique Hotel',
      roomCount: 60,
      location: 'York, England',
      parityRegime: 'none',
      avatar: 'JM',
      propertyImage:
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop',
      style: 'red',
      styleSecondary: 'green',
      description:
        "Owner-operator who prioritises his direct channel and treats Booking.com as a necessary tail. Acts on emotion when it comes to OTAs - has a hard 30% rule in his head. Needs reframing, not numbers, to shift his view.",
      commercialGoal: 'Grow direct bookings while keeping a brand-led identity',
      profileNotes: [
        'Believes OTAs erode his brand and direct channel',
        'Runs sponsored campaigns on meta-search via an XML provider',
        'PACE Jun-Dec: roomnights -43% YoY, revenue -37% YoY, ADR +10% YoY',
        'Three million Booking.com impressions in the last 90 days',
      ],
    },
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
    metricHistory: [],
    trust: 45,
    relationship: 'neutral',
    discounts: [
      { id: 'genius', label: 'Genius Programme', status: 'inactive' },
      { id: 'mobile-rate', label: 'Mobile Rate', status: 'inactive' },
      { id: 'country-rate', label: 'Country Rate', status: 'inactive' },
      { id: 'last-minute', label: 'Last-Minute Deal', status: 'inactive' },
      { id: 'early-booker', label: 'Early Booker Deal', status: 'inactive' },
    ],
    conversationLog: [],
    pendingActions: [],
  },

  // ── Carlos - City Apartment Complex (Yellow/Socialiser) ──
  {
    persona: {
      id: 'carlos',
      name: 'Carlos Rivera',
      propertyName: 'Barceloneta Living',
      propertyType: 'City Apartments',
      roomCount: 45,
      location: 'Barcelona, Spain',
      parityRegime: 'none',
      avatar: 'CR',
      propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop',
      style: 'yellow',
      styleSecondary: 'red',
      description:
        'Energetic apartment operator who loves innovation and new trends. Makes quick decisions but sometimes acts before thinking. Relationship-first communicator who thrives on enthusiasm.',
      commercialGoal: 'Aggressive growth - maximise bookings across all channels',
      profileNotes: [
        'Loves talking about trends and innovation',
        'Makes quick decisions but sometimes regrets them',
        'Responds to success stories from similar properties',
        'Prefers casual, high-energy communication',
      ],
    },
    metrics: {
      erpd: 3.4,
      erpdChange: -1.2,
      rpdPublic: 4.1,
      rpdLoyal: 2.5,
      losePricePublic: 48,
      activeScenarios: 1,
      competitor: 'brand',
      // Story: slight YoY growth on roomnights + revenue, ADR
      // basically flat. Surface picture looks healthy and matches
      // his "aggressive growth" goal. The Country Rate misconfig
      // hasn't bitten PACE yet - that's the trap: nothing in this
      // card flags him as the priority, even though the misconfig
      // is compounding silently and surfaces by R3.
      pace: {
        period: 'Jun-Dec 2026',
        roomnights: { current: 6820, lastYear: 6540, relativeChange: 4.28 },
        revenue: {
          current: 728000,
          lastYear: 695000,
          relativeChange: 4.75,
          currency: 'EUR',
        },
        adr: {
          current: 107,
          lastYear: 106,
          relativeChange: 0.94,
          currency: 'EUR',
        },
      },
      experiencedRPD: 65,
      visibility: 70,
      conversion: 55,
      revenue: 62,
      discountQuality: 60,
      rateParity: 'minor',
    },
    metricHistory: [],
    trust: 60,
    relationship: 'neutral',
    discounts: [
      { id: 'genius', label: 'Genius Programme', status: 'active' },
      { id: 'mobile-rate', label: 'Mobile Rate', status: 'active' },
      { id: 'country-rate', label: 'Country Rate', status: 'misconfigured' },
      { id: 'last-minute', label: 'Last-Minute Deal', status: 'active' },
      { id: 'early-booker', label: 'Early Booker Deal', status: 'inactive' },
    ],
    conversationLog: [],
    pendingActions: [],
  },

];

/**
 * Partners parked until their parity regimes go live in Market Select.
 * Kept here so the persona data and the conversation trees in
 * conversations-*.ts stay easy to re-merge - just splice these back
 * into initialPartners when Narrow / Wide / Cross Regional become
 * selectable. Not exported into the active roster today, so the
 * portfolio filter has nothing to surface even if a future bug were
 * to bypass it.
 */
export const pendingPartners: PartnerState[] = [
  // ── Stavros - Large Resort Hotel (Red/Director) ──
  // Was the No-Parity R1 target before John replaced him in May 2026.
  // Persona + 3-phase conversation trees (rounds 1-3) are still on
  // disk in conversations.ts; can be brought back into the active
  // roster later if needed for a different scenario.
  {
    persona: {
      id: 'stavros',
      name: 'Stavros Papadopoulos',
      propertyName: 'Aegean Grand Resort & Spa',
      propertyType: 'Large Resort Hotel',
      roomCount: 180,
      location: 'Kos, Greece',
      parityRegime: 'none',
      avatar: 'SP',
      propertyImage:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
      style: 'red',
      styleSecondary: 'red',
      description:
        'High-volume operator under revenue pressure. Wants fast answers and clear ROI. Will challenge you if your reasoning is weak - but acts decisively once convinced.',
      commercialGoal: 'Recover declining occupancy and revenue fast',
      profileNotes: [
        'Impatient with preamble - gets straight to business',
        'Compares Booking.com performance against Expedia weekly',
        'Has blamed the platform for poor results in previous calls',
        'Responds well to competitive benchmarks and revenue projections',
      ],
    },
    metrics: {
      erpd: 17.2,
      erpdChange: 6.8,
      rpdPublic: 18.5,
      rpdLoyal: 14.2,
      losePricePublic: 96,
      activeScenarios: 3,
      competitor: 'expedia',
      experiencedRPD: 38,
      visibility: 40,
      conversion: 32,
      revenue: 42,
      discountQuality: 25,
      rateParity: 'clean',
    },
    metricHistory: [],
    trust: 40,
    relationship: 'cool',
    discounts: [
      { id: 'genius', label: 'Genius Programme', status: 'active' },
      { id: 'mobile-rate', label: 'Mobile Rate', status: 'active' },
      { id: 'country-rate', label: 'Country Rate', status: 'inactive' },
      { id: 'last-minute', label: 'Last-Minute Deal', status: 'misconfigured' },
      { id: 'early-booker', label: 'Early Booker Deal', status: 'inactive' },
    ],
    conversationLog: [],
    pendingActions: [],
  },

  // ── Hannah - Country Guesthouse (Green/Nurturer) - Narrow regime ──
  {
    persona: {
      id: 'hannah',
      name: 'Hannah Whitfield',
      propertyName: 'Meadow Lane Guesthouse',
      propertyType: 'Country Guesthouse',
      roomCount: 8,
      location: 'Cotswolds, England',
      parityRegime: 'narrow',
      avatar: 'HW',
      propertyImage: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&h=250&fit=crop',
      style: 'green',
      styleSecondary: 'yellow',
      description:
        'Passionate host who values guest experience above volume. Sees discounting as potentially cheapening her brand. Needs reassurance and a gentle approach.',
      commercialGoal: 'Maintain reputation while improving off-peak bookings',
      profileNotes: [
        'Mentions guest reviews and personal touches frequently',
        'Uncomfortable with aggressive sales language',
        'Has turned down discount recommendations before',
        'Responds to stories about similar properties that succeeded',
      ],
    },
    metrics: {
      erpd: 14.8,
      erpdChange: 4.5,
      rpdPublic: 15.6,
      rpdLoyal: 12.8,
      losePricePublic: 91,
      activeScenarios: 2,
      competitor: 'brand',
      experiencedRPD: 42,
      visibility: 35,
      conversion: 28,
      revenue: 38,
      discountQuality: 0,
      rateParity: 'clean',
    },
    metricHistory: [],
    trust: 50,
    relationship: 'neutral',
    discounts: [
      { id: 'genius', label: 'Genius Programme', status: 'inactive' },
      { id: 'mobile-rate', label: 'Mobile Rate', status: 'inactive' },
      { id: 'country-rate', label: 'Country Rate', status: 'inactive' },
      { id: 'last-minute', label: 'Last-Minute Deal', status: 'inactive' },
      { id: 'early-booker', label: 'Early Booker Deal', status: 'inactive' },
    ],
    conversationLog: [],
    pendingActions: [],
  },

  // ── Priya - Budget Hotel Chain (Red/Director) - Wide regime ──
  {
    persona: {
      id: 'priya',
      name: 'Priya Sharma',
      propertyName: 'The Grand Residency',
      propertyType: 'Budget Hotel Chain',
      roomCount: 120,
      location: 'Mumbai, India',
      parityRegime: 'wide',
      avatar: 'PS',
      propertyImage: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=250&fit=crop',
      style: 'red',
      styleSecondary: 'blue',
      description:
        'Sharp, results-focused GM who manages by numbers. Expects structured conversations with clear action items. Benchmarks obsessively against her chain\'s other properties.',
      commercialGoal: 'Rapid revenue recovery - RPD is critically low',
      profileNotes: [
        'Expects structured agendas and clear action items',
        'Challenges weak reasoning with sharp questions',
        'Benchmarks everything against her hotel chain\'s other properties',
        'Values efficiency and hates wasting time',
      ],
    },
    metrics: {
      erpd: 12.5,
      erpdChange: 3.8,
      rpdPublic: 13.8,
      rpdLoyal: 10.2,
      losePricePublic: 88,
      activeScenarios: 2,
      competitor: 'expedia',
      experiencedRPD: 30,
      visibility: 28,
      conversion: 22,
      revenue: 32,
      discountQuality: 15,
      rateParity: 'major',
    },
    metricHistory: [],
    trust: 35,
    relationship: 'cool',
    discounts: [
      { id: 'genius', label: 'Genius Programme', status: 'active' },
      { id: 'mobile-rate', label: 'Mobile Rate', status: 'misconfigured' },
      { id: 'country-rate', label: 'Country Rate', status: 'inactive' },
      { id: 'last-minute', label: 'Last-Minute Deal', status: 'inactive' },
      { id: 'early-booker', label: 'Early Booker Deal', status: 'inactive' },
    ],
    conversationLog: [],
    pendingActions: [],
  },

  // ── Yuki - Luxury Ryokan (Green/Nurturer) - Narrow regime ──
  {
    persona: {
      id: 'yuki',
      name: 'Yuki Tanaka',
      propertyName: 'Ryokan Komorebi',
      propertyType: 'Luxury Ryokan',
      roomCount: 12,
      location: 'Kyoto, Japan',
      parityRegime: 'narrow',
      avatar: 'YT',
      propertyImage: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&h=250&fit=crop',
      style: 'green',
      styleSecondary: 'blue',
      description:
        'Thoughtful owner of a traditional luxury inn. Deeply protective of her brand and guest experience. Moves at a measured pace and consults her team before any changes.',
      commercialGoal: 'Improve visibility without compromising premium positioning',
      profileNotes: [
        'Values harmony and consensus in business relationships',
        'Worried that discounting will attract the wrong type of guest',
        'Makes decisions slowly after consulting with her team',
        'Responds well to case studies of other luxury properties',
      ],
    },
    metrics: {
      erpd: 5.6,
      erpdChange: 0.8,
      rpdPublic: 6.2,
      rpdLoyal: 4.5,
      losePricePublic: 64,
      activeScenarios: 1,
      competitor: 'expedia',
      experiencedRPD: 48,
      visibility: 38,
      conversion: 35,
      revenue: 45,
      discountQuality: 0,
      rateParity: 'clean',
    },
    metricHistory: [],
    trust: 50,
    relationship: 'neutral',
    discounts: [
      { id: 'genius', label: 'Genius Programme', status: 'inactive' },
      { id: 'mobile-rate', label: 'Mobile Rate', status: 'inactive' },
      { id: 'country-rate', label: 'Country Rate', status: 'inactive' },
      { id: 'last-minute', label: 'Last-Minute Deal', status: 'inactive' },
      { id: 'early-booker', label: 'Early Booker Deal', status: 'inactive' },
    ],
    conversationLog: [],
    pendingActions: [],
  },
];
