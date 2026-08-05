import type { PartnerState, ParityRegime } from '../types';

/**
 * Build the avatar initials from a contact's full name. Takes the
 * first letter of the first name + first letter of the surname.
 * Used by the partner-record helpers so each regime variant's
 * avatar matches the regime-specific contact surname.
 */
function initialsFromName(name: string): string {
  const [first, ...rest] = name.split(' ');
  const last = rest[rest.length - 1] ?? '';
  return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();
}

/**
 * Builds a Noble Falcon Inn partner record. The same hotel brand,
 * contact (Anton Müller), profile, and metrics show up in all three
 * regime variants - only location, parityRegime, the property image,
 * and the partner id differ. Wrapping the shared content in a helper
 * keeps the three variants in sync if SME edits the profile or the
 * metrics later. Returns an array so the call site can spread the
 * record into `initialPartners` inline.
 *
 * Anton's role title is "Brand Revenue Lead" (SME-confirmed).
 * Pricing Coverage QTD is 64% (SME-confirmed in 2026-06).
 */
/**
 * Builds a Crystal Water Resort partner record. Same hotel brand,
 * contact (Sarah Bennett, Hotel Manager), profile, and metrics in
 * all three regime variants - only location, parityRegime, the
 * property image, and the partner id differ. Wrapping the shared
 * content in a helper keeps the three variants in sync if SME edits
 * the profile or the metrics later. Returns an array so the call
 * site can spread the record into `initialPartners` inline.
 *
 * Data: SME spreadsheet row 9 (Hotel ID 9, "List examples only
 * Brand.com" sheet). Property type sits under the SME's "Marketing
 * Contract Only" profile - independent operation with brand
 * affiliation only.
 */
function crystalWaterBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  /** Regime-specific full contact name. First name 'Sarah' stays
   *  constant across variants so the SME dialogue (which addresses
   *  her by first name) still reads correctly; only the surname
   *  shifts to match the country. */
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Crystal Water Resort',
        propertyType: 'Resort',
        roomCount: 142,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'red',
        styleSecondary: 'yellow',
        description:
          "Hotel Manager at a brand-affiliated resort that operates under a marketing contract only - no central pricing control. Direct, results-focused, and watches the daily ABRN and ADR numbers herself. Energetic and no-fluff; expects clear commercial logic and a concrete next step before she agrees to anything.",
        commercialGoal:
          'Maximize resort revenue while protecting margin and reducing OTA commission cost',
      },
      // Metrics map verbatim to the SME spreadsheet row 9 (Hotel ID 9
      // - Crystal Water Resort). Same baseline across all three
      // regime variants; the regime only changes the regulatory
      // framing of the conversation, not the data. The 202% page
      // view spike vs peer is the headline the SME dialogue
      // references directly.
      metrics: {
        erpd: 5.2,
        erpdChange: 3.27,
        rpdPublic: 6.6,
        rpdLoyal: 0.6,
        losePricePublic: 99,
        activeScenarios: 1,
        activeScenarioNames: ['Brand Scenario'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 514, deltaPct: -15 },
          last30dRoomNights: { value: 320, deltaPct: -28 },
          last30dAdr: { value: 145, deltaPct: 4 },
          last90dPageViews: { value: 32100, deltaPct: 202 },
          last90dConversion: { value: 1.1, deltaPct: -52 },
          next3mRoomNights: { value: 240, deltaPct: -18 },
        },
        // SME spreadsheet showed 2026-05-12 against an authoring
        // date of 2026-06-09 - that's 28 days back. Stored as an
        // offset so the gap stays constant across replays.
        lastPricingContactDaysAgo: 28,
        // Only Genius Program is active out of 11 products in the
        // R2 taxonomy - sparse adoption that matches Sarah's
        // direct-first stance. Rendered as a low % to flag headroom.
        pricingCoverageQTD: 12,
        // Partner Data Set 46, Sheet 7 row 5 (Crystal Water Resort,
        // Round 1). Full-year 2025 ABRN.
        partnerValueAbrn: 6061,
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 55,
        visibility: 88,
        conversion: 28,
        revenue: 42,
        discountQuality: 30,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Adoption mirrors the SME spreadsheet row 9: Genius
      // Program is the only active product. Everything else
      // (public-pricing levers, Genius tiers, base rate plan,
      // family rates, payments) is inactive. The sparse pattern
      // is the visual cue that Sarah's not using Booking.com's
      // tools - she's pricing through her direct brand site.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'inactive', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'inactive', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

/**
 * Builds a Velvet Sky Boutique Hotel partner record. Same hotel
 * brand, contact (John Whitford, Hotel Manager), profile, and metrics
 * across all three regime variants - only location, parityRegime,
 * the property image, and the partner id differ. Wrapping the shared
 * content in a helper keeps the three variants in sync.
 *
 * Data: SME spreadsheet row 34 (Hotel ID 34, "List examples only
 * Brand.com" sheet). Mild eRPD change (+0.53 YoY) but a chronic 99%
 * Lose Price - the gap is structural, not freshly escalating. Zero
 * Booking.com pricing products active on this partner: he's leaning
 * entirely on his direct brand site's discount strategy.
 */
function velvetSkyBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  /** Regime-specific contact name. First name 'John' stays constant
   *  so SME dialogue still reads correctly; surname shifts to match
   *  the country. */
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Velvet Sky Boutique Hotel',
        propertyType: 'Boutique Hotel',
        roomCount: 38,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'red',
        styleSecondary: 'blue',
        description:
          "Owner-manager at an independent boutique who treats his direct brand site as his lowest-priced channel by design. Talks in commercial terms - margins, commission, ROI - and weighs every trade-off before agreeing. Direct and pragmatic; not warm, but rewards a tight commercial case.",
        commercialGoal:
          'Grow direct bookings via aggressive on-site discounting while keeping ADR protected',
      },
      // Metrics map verbatim to the SME spreadsheet row 34 (Hotel
      // ID 34 - Velvet Sky Boutique Hotel). Same baseline across all
      // three regime variants; the regime only changes the regulatory
      // framing. The flat Public-vs-Loyal RPD (both 5.0%) reflects
      // that Genius isn't active for this partner.
      metrics: {
        erpd: 5.0,
        erpdChange: 0.53,
        rpdPublic: 5.0,
        rpdLoyal: 5.0,
        losePricePublic: 99,
        activeScenarios: 1,
        activeScenarioNames: ['Brand Scenario'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 351, deltaPct: -8 },
          last30dRoomNights: { value: 220, deltaPct: -18 },
          last30dAdr: { value: 162, deltaPct: 2 },
          last90dPageViews: { value: 18500, deltaPct: 45 },
          last90dConversion: { value: 1.3, deltaPct: -38 },
          next3mRoomNights: { value: 165, deltaPct: -12 },
        },
        // SME spreadsheet showed 2026-05-12 against an authoring
        // date of 2026-06-09 - 28 days back.
        lastPricingContactDaysAgo: 28,
        // Zero Booking.com pricing products active on this partner;
        // the SME spreadsheet showed all 11 inactive. Rendered as
        // 0% to flag the empty toolkit explicitly.
        pricingCoverageQTD: 0,
        // Partner Data Set 46, Sheet 7 row 8 (Velvet Sky Boutique
        // Hotel, Round 2). Full-year 2025 ABRN.
        partnerValueAbrn: 4137,
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 52,
        visibility: 60,
        conversion: 30,
        revenue: 38,
        discountQuality: 20,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Sparse adoption: nothing active. Reinforces the story that
      // John relies entirely on his direct brand site's discount
      // strategy and hasn't engaged any Booking.com pricing tool -
      // even Genius is off.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'inactive', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'inactive', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

function nobleFalconBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  /** Regime-specific contact name. First name 'Anton' stays constant
   *  so SME dialogue still reads correctly; surname shifts to match
   *  the country. */
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'The Noble Falcon Inn',
        propertyType: 'Branded Mid-Scale Hotel',
        roomCount: 288,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'blue',
        styleSecondary: 'red',
        description:
          'Brand Revenue Lead for a fully-managed-by-brand property. Operates within a centrally controlled pricing model with limited local autonomy. Process-led and measured in tone; values consistency, brand standards, and guest experience over local commercial flexibility.',
        commercialGoal:
          'Hit brand-set commercial KPIs without compromising brand consistency or guest experience',
      },
      // Metrics map verbatim to the SME PDF Data Set table for
      // The Noble Falcon Inn (Hotel ID 101). Same baseline across
      // all three regime variants - the regime only changes the
      // regulatory framing of the conversation, not the data.
      metrics: {
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
        // Stored as a relative offset so the gap between today and
        // the last contact stays constant across replays. The PDF
        // showed 2026-05-13 against an authoring date of 2026-06-04
        // - that's 22 days back, so we encode 22 here. Render time
        // resolves it to "today - 22 days" in PartnerDetailScreen.
        lastPricingContactDaysAgo: 22,
        pricingCoverageQTD: 64,
        // Partner Data Set 46, Sheet 7 row 39 (The Noble Falcon Inn).
        // Sheet 7 places this at Round 10 (its target home). It's
        // pulled forward to R3 in the current sim as a deliberate
        // pedagogical stretch - lets testers see a genuinely complex
        // partner (eRPD 17%, +21pp YoY, four active scenarios) inside
        // the playable window while R4-R9 SME content is still
        // pending. Noble Falcon moves back to Round 10 as the
        // remaining rounds get authored. Full-year 2025 ABRN,
        // unchanged by round placement.
        partnerValueAbrn: 13957,
        // Legacy fields - kept for type compatibility and the old
        // conversation system; not surfaced on the R2 Partner Detail.
        experiencedRPD: 35,
        visibility: 42,
        conversion: 28,
        revenue: 32,
        discountQuality: 30,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Discount adoption mirrors the SME PDF Public/Genius/
      // Foundations grids. Public Pricing fully active, Genius
      // running only the base program (no 15/20/Dynamic tiers),
      // Family Rates and Payments active in Foundations but no
      // Base Rate Plan (the partner's pricing is centrally
      // controlled - they're not setting their own base plan).
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'active', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'active', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'active', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'active', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'active', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

// ─── Distractor partner helpers ─────────────────────────────────
// Each base helper builds one distractor record per regime variant
// (No Parity / Narrow / Wide). The Narrow + Wide variants alias back
// to the base id ('marina', 'carlos', etc.) for conversation tree,
// per-round baseline, and persona-hint lookups via the suffix-strip
// fallback in conversations.ts / partnerStateByRound.ts /
// personaHints.ts. Country groupings: Spain for No Parity, UK for
// Narrow, US for Wide - matches the priority partner per regime.

function marinaBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  /** Regime-specific contact name. First name 'Marina' stays
   *  constant so existing 3-phase dialogue still reads correctly;
   *  surname shifts per regime. */
  contactName: string;
}): PartnerState[] {
  return [{
    persona: {
      id: args.id,
      name: args.contactName,
      propertyName: 'Hotel & Suites Castellana',
      propertyType: 'Boutique City Hotel',
      roomCount: 35,
      location: args.location,
      parityRegime: args.parityRegime,
      avatar: initialsFromName(args.contactName),
      propertyImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop',
      style: 'blue',
      styleSecondary: 'green',
      description:
        'Meticulous owner-operator who tracks every metric. Respects data-driven conversations and detailed reasoning. Will test your logic before committing.',
      commercialGoal: 'Grow bookings without eroding ADR',
    },
    metrics: {
      erpd: 6.3,
      erpdChange: 1.2,
      rpdPublic: 7.5,
      rpdLoyal: 4.8,
      losePricePublic: 68,
      activeScenarios: 1,
      competitor: 'brand',
      // Claude-authored Partner Value (2025 ABRN). Sized so Marina
      // reads as a plausibly-larger distractor than the R1 priority
      // (Crystal Water at 6,061) - teaches "size alone isn't enough,
      // read the pricing signals". Same partner value applies on
      // R3 too (Marina reappears as R3 distractor against Noble
      // Falcon at 13,957, where she's noticeably smaller). Not in
      // Sheet 7's Partner Data Set 46.
      partnerValueAbrn: 8200,
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
      { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
      { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
      { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
      { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
      { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
      { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
      { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
      { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
      { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'active', category: 'foundations-payments' },
      { id: 'family-rates', label: 'Family rates', status: 'inactive', category: 'foundations-payments' },
      { id: 'payments', label: 'Payments', status: 'inactive', category: 'foundations-payments' },
    ],
    conversationLog: [],
    pendingActions: [],
  }];
}

function carlosBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  /** Regime-specific contact name. First name 'Carlos' stays
   *  constant; surname shifts per regime. */
  contactName: string;
}): PartnerState[] {
  return [{
    persona: {
      id: args.id,
      name: args.contactName,
      propertyName: 'Barceloneta Living',
      propertyType: 'City Apartments',
      roomCount: 45,
      location: args.location,
      parityRegime: args.parityRegime,
      avatar: initialsFromName(args.contactName),
      propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop',
      style: 'yellow',
      styleSecondary: 'red',
      description:
        'Energetic apartment operator who loves innovation and new trends. Makes quick decisions but sometimes acts before thinking. Relationship-first communicator who thrives on enthusiasm.',
      commercialGoal: 'Aggressive growth - maximize bookings across all channels',
    },
    metrics: {
      erpd: 3.4,
      erpdChange: -1.2,
      rpdPublic: 4.1,
      rpdLoyal: 2.5,
      losePricePublic: 48,
      activeScenarios: 1,
      competitor: 'brand',
      // Claude-authored Partner Value (2025 ABRN). Sized as a
      // smaller distractor across R1 and R3 - reads as "worth
      // engaging but not the top call this week". Not in Sheet 7's
      // Partner Data Set 46.
      partnerValueAbrn: 3400,
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
      { id: 'mobile-rate', label: 'Mobile Rates', status: 'active', category: 'public-pricing' },
      { id: 'country-rate', label: 'Country Rates', status: 'misconfigured', category: 'public-pricing' },
      { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'active', category: 'public-pricing' },
      { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
      { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
      { id: 'genius-15', label: 'Genius 15%', status: 'active', category: 'genius-pricing' },
      { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
      { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
      { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'active', category: 'foundations-payments' },
      { id: 'family-rates', label: 'Family rates', status: 'inactive', category: 'foundations-payments' },
      { id: 'payments', label: 'Payments', status: 'active', category: 'foundations-payments' },
    ],
    conversationLog: [],
    pendingActions: [],
  }];
}

function ravenInnBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  /** Regime-specific contact name. First name 'Emily' stays
   *  constant; surname shifts per regime. */
  contactName: string;
}): PartnerState[] {
  return [{
    persona: {
      id: args.id,
      name: args.contactName,
      propertyName: 'Raven Inn',
      propertyType: 'Boutique Hotel',
      roomCount: 52,
      location: args.location,
      parityRegime: args.parityRegime,
      avatar: initialsFromName(args.contactName),
      propertyImage:
        'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=400&h=250&fit=crop',
      style: 'green',
      styleSecondary: 'blue',
      description:
        'Hotel Manager at a steady boutique with a strong Key OTA position. Collaborative, analytical, and likes to weigh changes carefully against her own dashboards before committing. Treats Booking.com as a partner she actively co-plans with.',
      commercialGoal: 'Maintain steady occupancy and continue refining margin',
    },
    metrics: {
      erpd: 1.3,
      erpdChange: 2.66,
      rpdPublic: 5.2,
      rpdLoyal: -2.3,
      losePricePublic: 35,
      activeScenarios: 3,
      activeScenarioNames: ['International', 'Family 2+1', 'Family 2+2'],
      competitor: 'expedia',
      secondaryMetrics: {
        last30dAbrn: { value: 785, deltaPct: 6 },
        last30dRoomNights: { value: 540, deltaPct: 4 },
        last30dAdr: { value: 168, deltaPct: 1 },
        last90dPageViews: { value: 21200, deltaPct: 12 },
        last90dConversion: { value: 2.4, deltaPct: 8 },
        next3mRoomNights: { value: 410, deltaPct: 7 },
      },
      lastPricingContactDaysAgo: 28,
      pricingCoverageQTD: 38,
      // Claude-authored Partner Value (2025 ABRN). Raven Inn is a
      // R2 distractor; sized bigger than Velvet Sky (4,137) so the
      // round teaches "biggest isn't automatically the call - read
      // the pricing". Not in Sheet 7's Partner Data Set 46.
      partnerValueAbrn: 5800,
      experiencedRPD: 72,
      visibility: 78,
      conversion: 65,
      revenue: 70,
      discountQuality: 60,
      rateParity: 'clean',
    },
    metricHistory: [],
    trust: 60,
    relationship: 'warm',
    discounts: [
      { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
      { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
      { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
      { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
      { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
      { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
      { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
      { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
      { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
      { id: 'family-rates', label: 'Family rates', status: 'inactive', category: 'foundations-payments' },
      { id: 'payments', label: 'Payments', status: 'inactive', category: 'foundations-payments' },
    ],
    conversationLog: [],
    pendingActions: [],
  }];
}

function driftwoodBayBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  /** Regime-specific contact name. First name 'Daniel' stays
   *  constant; surname shifts per regime. */
  contactName: string;
}): PartnerState[] {
  return [{
    persona: {
      id: args.id,
      name: args.contactName,
      propertyName: 'Driftwood Bay Resort',
      propertyType: 'Resort',
      roomCount: 86,
      location: args.location,
      parityRegime: args.parityRegime,
      avatar: initialsFromName(args.contactName),
      propertyImage:
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop',
      style: 'yellow',
      styleSecondary: 'green',
      description:
        "Energetic resort manager who loves talking about the property and runs multiple pricing scenarios in parallel. Quick to engage, decisive once excited, and prefers conversational calls with concrete next steps over methodical exposition.",
      commercialGoal: 'Grow incremental volume while keeping the brand premium',
    },
    metrics: {
      erpd: 3.4,
      erpdChange: 1.37,
      rpdPublic: 5.3,
      rpdLoyal: -1.5,
      losePricePublic: 99,
      activeScenarios: 4,
      activeScenarioNames: ['Brand Scenario', 'App', 'Family 2+1', 'Family 2+2'],
      competitor: 'brand',
      secondaryMetrics: {
        last30dAbrn: { value: 343, deltaPct: 2 },
        last30dRoomNights: { value: 260, deltaPct: -2 },
        last30dAdr: { value: 155, deltaPct: 3 },
        last90dPageViews: { value: 14800, deltaPct: 18 },
        last90dConversion: { value: 1.9, deltaPct: -8 },
        next3mRoomNights: { value: 200, deltaPct: -4 },
      },
      lastPricingContactDaysAgo: 28,
      pricingCoverageQTD: 15,
      // Claude-authored Partner Value (2025 ABRN). Driftwood Bay
      // is a R2 distractor; sized smaller than Velvet Sky (4,137)
      // so the round triad has one big-good, one similar-mediocre,
      // one small-average distractor mix. Not in Sheet 7's Partner
      // Data Set 46.
      partnerValueAbrn: 2900,
      experiencedRPD: 60,
      visibility: 68,
      conversion: 48,
      revenue: 55,
      discountQuality: 45,
      rateParity: 'minor',
    },
    metricHistory: [],
    trust: 55,
    relationship: 'neutral',
    discounts: [
      { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
      { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
      { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
      { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
      { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
      { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
      { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
      { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
      { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
      { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
      { id: 'payments', label: 'Payments', status: 'inactive', category: 'foundations-payments' },
    ],
    conversationLog: [],
    pendingActions: [],
  }];
}

/**
 * Builds a Royal Crest Hotel partner record (SME Round 1 priority,
 * Hotel ID 16). Liam O'Connell is a Property Manager / vacation-rental
 * agency protecting his direct channel ("no OTA above 30%"). Same
 * brand, contact, profile and metrics across all three regime variants
 * - only location, parityRegime, image and id differ. The contact name
 * stays 'Liam O'Connell' across regimes (the SME script addresses him
 * by first name in every regime column).
 *
 * Data: SME "Round 1" doc data set - Brand.com Competitiveness Gap.
 * eRPD 5.2% (Bucket 4), Lose Price 99%, page views +20% vs peer but
 * conversion -4% and Next-3M room nights -20%. Public and Loyal RPD
 * both sit at 5.2% (no Genius active). Three RPD scenarios flagged
 * (App, Mdot, Brand); the only foundation product active is Family
 * Rates. OPC layer (locked until Level 2) carried on `opcMetrics`.
 */
function royalCrestBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Royal Crest Hotel',
        propertyType: 'Hotel',
        roomCount: 120,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'red',
        styleSecondary: 'blue',
        description:
          "Property Manager running several owners' properties with highly delegated commercial autonomy. Profit-first and protective of the direct channel - keeps a strict policy that no OTA takes more than 30% of the business. Direct and time-pressured, but evidence-driven: he wants proof and a controlled experiment before he commits, and rewards a tight ROI case.",
        commercialGoal:
          'Protect direct-channel margin and portfolio-wide RevPAR while filling unsold rooms',
      },
      // Metrics map to the SME Round 1 data set (Hotel ID 16). Same
      // baseline across all three regime variants; the regime only
      // changes the regulatory framing of the conversation.
      metrics: {
        erpd: 5.2,
        erpdChange: 0.62,
        rpdPublic: 5.2,
        rpdLoyal: 5.2,
        losePricePublic: 99,
        activeScenarios: 3,
        activeScenarioNames: ['App', 'Mdot', 'Brand Scenario'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 283, deltaPct: -22 },
          last30dRoomNights: { value: 325, deltaPct: 8 },
          last30dAdr: { value: 145, deltaPct: 5 },
          last90dPageViews: { value: 17518, deltaPct: 20 },
          last90dConversion: { value: 2.7, deltaPct: -4 },
          next3mRoomNights: { value: 259, deltaPct: -20 },
        },
        // SME doc showed 2026-05-12; against an authoring date of
        // 2026-08-03 that's 83 days back. Stored as an offset so the
        // gap stays constant across replays. The long gap fits the
        // low (20%) pricing coverage - an under-steered partner.
        lastPricingContactDaysAgo: 83,
        pricingCoverageQTD: 20,
        // Not in Sheet 7's roster; annualised from the 283 Last-30D
        // ABRN and sized to sit below Marina's 8,200 so "biggest
        // value" pattern-matching fails - Royal Crest is the R1 call
        // on pricing risk (99% Lose Price / Bucket 4), not size.
        partnerValueAbrn: 4200,
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM), so it
        // is invisible at Round 1 but ready for the future round.
        opcMetrics: {
          unsoldRooms: { value: 50 },
          sellThroughRate: { value: -10 },
          visibilityShare: { value: 10.3, deltaPct: -43 },
          searchPrice: { value: 7 },
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 52,
        visibility: 82,
        conversion: 27,
        revenue: 40,
        discountQuality: 25,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Adoption mirrors the SME data set: only Family Rates is active.
      // No Genius, no public-pricing levers - he prices through his
      // direct brand site, which is exactly the gap.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'inactive', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

/**
 * Builds a Silver Horizon Resort partner record (SME Round 2 priority,
 * Hotel ID 209). Chloe Davies is a Multi-Property Professional running
 * a portfolio of vacation-rental units - net-revenue maths, margin
 * optimization and ROI. Same brand, contact, profile and metrics across
 * all three regime variants; only location, parityRegime, image and id
 * differ. The contact name stays 'Chloe Davies' across regimes.
 *
 * Data: SME "Round 2" doc data set - a KEY OTA competitiveness gap
 * (Expedia undercutting via margin cuts on International + Family
 * segments). eRPD 1.9% (Bucket 3) but a sharp +4.71 MoM spike, Lose
 * Price 42%, Public RPD 3.9% / Loyal RPD -3.0%. Strong platform demand
 * (room nights +119% vs peer, forward pace +81%) but ABRN -32% YoY and
 * ADR -7% - value leaking on the high-value segments. Genius Program
 * and Family Rates active; three RPD scenarios (International, Family
 * 2+1, Family 2+2). OPC layer carried on `opcMetrics`.
 */
function silverHorizonBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Silver Horizon Resort',
        propertyType: 'Vacation Rental',
        roomCount: 64,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'blue',
        styleSecondary: 'red',
        description:
          "Multi-Property Professional running a portfolio of vacation-rental units as an entrepreneurial business, with full commercial autonomy. Leads with net-revenue maths, margin optimization and strict ROI when balancing channels. Fields aggressive competitor calls (Expedia) and won't be drawn into a platform price war - she wants the ROI case, not a gross-rate argument.",
        commercialGoal:
          'Maximize net revenue and margin across the portfolio while balancing a mix of distribution channels',
      },
      // Metrics map to the SME Round 2 data set (Hotel ID 209). The
      // headline is the sharp +4.71 MoM spike in Key OTA eRPD against
      // otherwise strong platform demand - value leaking on the
      // International and Family segments.
      metrics: {
        erpd: 1.9,
        erpdChange: 4.71,
        rpdPublic: 3.9,
        rpdLoyal: -3.0,
        losePricePublic: 42,
        activeScenarios: 3,
        activeScenarioNames: ['International', 'Family 2+1', 'Family 2+2'],
        competitor: 'expedia',
        secondaryMetrics: {
          last30dAbrn: { value: 389, deltaPct: -32 },
          last30dRoomNights: { value: 333, deltaPct: 119 },
          last30dAdr: { value: 128, deltaPct: -7 },
          last90dPageViews: { value: 16880, deltaPct: 71 },
          last90dConversion: { value: 4.2, deltaPct: 28 },
          next3mRoomNights: { value: 445, deltaPct: 81 },
        },
        // SME doc showed 2026-05-12; against an authoring date of
        // 2026-08-03 that's 83 days back. Stored as an offset.
        lastPricingContactDaysAgo: 83,
        pricingCoverageQTD: 14,
        // Not in Sheet 7's roster; sized to sit below Raven Inn's
        // 5,800 so "biggest value" pattern-matching picks the wrong
        // partner at R2 - Silver Horizon is the call on the sharp
        // eRPD spike and segment leakage, not size.
        partnerValueAbrn: 5200,
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        opcMetrics: {
          unsoldRooms: { value: 15 },
          sellThroughRate: { value: -8 },
          visibilityShare: { value: 13, deltaPct: -13 },
          searchPrice: { value: 6 },
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 48,
        visibility: 90,
        conversion: 42,
        revenue: 45,
        discountQuality: 35,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Two products active per the SME data set: Genius Program and
      // Family Rates. Everything else inactive - the gap is the Key OTA
      // undercutting the International and Family scenarios, not a bare
      // toolkit.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'inactive', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

/**
 * Builds an Ocean View Resort partner record (SME Round 3 priority,
 * Hotel ID 60). Camila Ross is a Property Manager / vacation-rental
 * agency who deliberately keeps Booking.com marked up ~5.5% vs her own
 * website to push guests to book direct - the "Billboard Effect in
 * Reverse." Same brand, contact, profile and metrics across all three
 * regime variants; only location, parityRegime, image and id differ.
 *
 * Data: SME "Round 3" doc data set - an intentional Brand.com
 * competitiveness gap. eRPD 5.5% (Bucket 4), Lose Price Brand 97%,
 * Public = Loyal RPD 5.5% (no Genius). The signature is visibility
 * debt: conversion +39% vs peer once seen, but page views -61% and
 * bookings -48% because the markup buries her in search. Base Rate
 * Plan, Family Rates and Payments active; two RPD scenarios (Brand,
 * App); 0% pricing coverage (completely un-actioned). OPC layer carried
 * on `opcMetrics` (the child-rate config gap, indexing families +8%).
 */
function oceanViewBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Ocean View Resort',
        propertyType: 'Resort',
        roomCount: 110,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'blue',
        styleSecondary: 'red',
        description:
          "Property Manager for a vacation-rental agency running several owners' properties with highly delegated commercial autonomy. Values owner satisfaction and portfolio-wide RevPAR, and fiercely protects the agency's profitable direct channel - she deliberately keeps Booking.com marked up to push guests to book direct. Experienced and evidence-led: she changes course when the search-behavior logic and the data stack up, and commits to structured tests.",
        commercialGoal:
          "Protect the agency's direct-channel margin and owner satisfaction while recovering portfolio-wide RevPAR",
      },
      // Metrics map to the SME Round 3 data set (Hotel ID 60). The
      // signature is visibility debt: strong on-page conversion but a
      // collapse in page views / bookings driven by a deliberate 5.5%
      // Brand.com markup.
      metrics: {
        erpd: 5.5,
        erpdChange: 0.19,
        rpdPublic: 5.5,
        rpdLoyal: 5.5,
        losePricePublic: 97,
        activeScenarios: 2,
        activeScenarioNames: ['Brand Scenario', 'App'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 1, deltaPct: -100 },
          last30dRoomNights: { value: 132, deltaPct: -50 },
          last30dAdr: { value: 136, deltaPct: 4 },
          last90dPageViews: { value: 4140, deltaPct: -61 },
          last90dConversion: { value: 4.3, deltaPct: 39 },
          next3mRoomNights: { value: 123, deltaPct: -48 },
        },
        // SME doc showed 2025-10-28; against an authoring date of
        // 2026-08-03 that's 279 days back - a ~9-month gap that fits
        // the 0% pricing coverage (completely un-actioned).
        lastPricingContactDaysAgo: 279,
        pricingCoverageQTD: 0,
        // Not in Sheet 7's roster; sized to sit below Marina's 8,200
        // so "biggest value" pattern-matching picks the wrong partner
        // at R3 - Ocean View is the call on visibility debt (97% Lose
        // Price, page views -61%), not size.
        partnerValueAbrn: 7000,
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM). Note the
        // headline search price is actually -3% vs peers; the real leak
        // is families indexing +8% from missing child rates.
        opcMetrics: {
          unsoldRooms: { value: 45 },
          sellThroughRate: { value: -18 },
          visibilityShare: { value: 20, deltaPct: -33 },
          searchPrice: { value: -3 },
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 55,
        visibility: 30,
        conversion: 62,
        revenue: 35,
        discountQuality: 30,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Three products active per the SME data set: Base Rate Plan,
      // Family Rates and Payments. No Genius, no targeted public-pricing
      // levers - she relies entirely on a flat base rate, which is the
      // gap.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'active', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'active', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

/**
 * Builds a Riverside Boutique Hotel partner record (SME Round 4
 * priority, Hotel ID 202). Anton Müller is the GM of a
 * "Marketing Contract Only" boutique - local autonomy, values guest
 * quality and boutique positioning, dislikes being dictated to. Same
 * brand, contact, profile and metrics across all three regime variants.
 *
 * Data: SME "Round 4" doc data set - a KEY OTA competitiveness gap with
 * a sharp +6.56 MoM eRPD spike. eRPD 3.3% (Bucket 4) but Lose Price 47%,
 * and the tell is Public RPD 6.0% vs Loyal RPD 0.3% (a non-genuine
 * Genius discount: public base raised to offset Genius) plus family RPD
 * running above couple RPD (an unintentional family setup gap). Strong
 * demand and forward pace (room nights +40% vs peer, Next-3M +271%) but
 * ABRN -59% YoY. Genius Program and Family Rates active; three RPD
 * scenarios (App, Family 2+1, Family 2+2); high eRPD x Partner Value.
 * OPC layer carried on `opcMetrics`.
 */
function riversideBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Riverside Boutique Hotel',
        propertyType: 'Boutique Hotel',
        roomCount: 42,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'blue',
        styleSecondary: 'green',
        description:
          "General Manager of a boutique on a Marketing-Contract-Only deal - significant local autonomy, a soft-brand affiliation used mainly for marketing and loyalty reach. Values guest quality, boutique positioning and building direct relationships, and won't be dictated to on daily rate strategy. Inquisitive and data-led: he changes course when the logic is sound and delivered as a partnership, not a demand.",
        commercialGoal:
          'Grow high-quality occupancy and ADR while protecting boutique positioning and the direct channel',
      },
      // Metrics map to the SME Round 4 data set (Hotel ID 202). The
      // tells are the +6.56 MoM Key OTA eRPD spike, the Public 6.0% /
      // Loyal 0.3% split (non-genuine Genius discount), and family RPD
      // above couple RPD (unintentional family setup gap).
      metrics: {
        erpd: 3.3,
        erpdChange: 6.56,
        rpdPublic: 6.0,
        rpdLoyal: 0.3,
        losePricePublic: 47,
        activeScenarios: 3,
        activeScenarioNames: ['App', 'Family 2+1', 'Family 2+2'],
        competitor: 'expedia',
        secondaryMetrics: {
          last30dAbrn: { value: 271, deltaPct: -59 },
          last30dRoomNights: { value: 300, deltaPct: 40 },
          last30dAdr: { value: 141, deltaPct: 8 },
          last90dPageViews: { value: 13239, deltaPct: 39 },
          last90dConversion: { value: 3.2, deltaPct: -3 },
          next3mRoomNights: { value: 608, deltaPct: 271 },
        },
        // SME doc showed 2026-05-12; against an authoring date of
        // 2026-08-03 that's 83 days back.
        lastPricingContactDaysAgo: 83,
        pricingCoverageQTD: 13,
        // Not in Sheet 7's roster; the SME flags eRPD x Partner Value as
        // high, so this sits mid-high - but below Marina's 8,200 so the
        // R4 decoy Marina reads as "bigger" and "biggest value" fails.
        partnerValueAbrn: 6500,
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        opcMetrics: {
          unsoldRooms: { value: 24 },
          sellThroughRate: { value: -8 },
          visibilityShare: { value: 12, deltaPct: -43 },
          searchPrice: { value: 7 },
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 50,
        visibility: 78,
        conversion: 44,
        revenue: 46,
        discountQuality: 30,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Two products active per the SME data set: Genius Program and
      // Family Rates. But both are mis-tuned - the Genius discount is
      // non-genuine and the family setup is incomplete, which is the gap.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'inactive', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

/**
 * Builds an Emerald Peak Lodge partner record (SME Round 5 priority,
 * Hotel ID 11). Sophia Chen is the GM of a FRANCHISE - limited local
 * autonomy, bound by central brand rules; head office keeps the direct
 * site cheaper by policy ("Direct-is-Cheaper"). Same brand, contact,
 * profile and metrics across all three regime variants.
 *
 * Data: SME "Round 5" doc data set - an intentional Brand.com
 * competitiveness gap. eRPD 10.2% (Bucket 6), Lose Price 100%, Public
 * RPD 12.7% vs Loyal RPD 3.6% (a Fake-Value Genius markup: base inflated
 * to offset the Genius discount). Yet the property WINS on demand (room
 * nights +110% vs peer, conversion +42%, premium ADR +31%) - premium
 * demand, not distressed. Genius Program, Family Rates and Payments
 * active; two RPD scenarios (Brand Scenario, Family 2+1); 0% pricing
 * coverage. OPC layer carried on `opcMetrics`.
 */
function emeraldPeakBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Emerald Peak Lodge',
        propertyType: 'Lodge',
        roomCount: 88,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'red',
        styleSecondary: 'blue',
        description:
          "General Manager of a franchise lodge operating under chain brand standards with limited local autonomy. Values brand compliance and franchise standing, and is bound by central rules on rate parity and loyalty pricing - head office keeps the direct site cheaper by policy. Direct, decisive and ROI-focused, but can't authorise anything that breaks internal rules; she'll move on a targeted, compliant solution, not a flat rate drop.",
        commercialGoal:
          'Hit revenue and occupancy targets while staying fully compliant with head-office rate policy',
      },
      // Metrics map to the SME Round 5 data set (Hotel ID 11). The tell
      // is an intentional Brand.com gap (Lose Price 100%, eRPD 10.2% /
      // Bucket 6) sitting behind exceptional demand performance - the
      // problem is policy, not appeal.
      metrics: {
        erpd: 10.2,
        erpdChange: 3.4,
        rpdPublic: 12.7,
        rpdLoyal: 3.6,
        losePricePublic: 100,
        activeScenarios: 2,
        activeScenarioNames: ['Brand Scenario', 'Family 2+1'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 444, deltaPct: 6 },
          last30dRoomNights: { value: 381, deltaPct: 110 },
          last30dAdr: { value: 158, deltaPct: 31 },
          last90dPageViews: { value: 14050, deltaPct: 72 },
          last90dConversion: { value: 5.0, deltaPct: 42 },
          next3mRoomNights: { value: 402, deltaPct: 98 },
        },
        // SME doc showed 2026-03-12; against an authoring date of
        // 2026-08-03 that's 144 days back - a ~5-month gap that fits the
        // 0% pricing coverage (completely un-actioned).
        lastPricingContactDaysAgo: 144,
        pricingCoverageQTD: 0,
        // Not in Sheet 7's roster; sits mid-high but below Marina's
        // 8,200 so the R5 decoy Marina reads as "bigger" and "biggest
        // value" fails - Emerald Peak is the call on Bucket 6 / 100%
        // Lose Price.
        partnerValueAbrn: 7000,
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        opcMetrics: {
          unsoldRooms: { value: 12 },
          sellThroughRate: { value: -9 },
          visibilityShare: { value: 17, deltaPct: -35 },
          searchPrice: { value: 10 },
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 58,
        visibility: 88,
        conversion: 60,
        revenue: 52,
        discountQuality: 34,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Three products active per the SME data set: Genius Program,
      // Family Rates and Payments. But the Genius discount is
      // Fake-Value (base inflated to offset it) and the family setup is
      // misaligned - the gap sits inside "active" products.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'active', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

/**
 * Builds an Oceanfront Bliss Lodge partner record (SME Round 6 priority,
 * Hotel ID 132). Priya Singh is the owner of an INDEPENDENT lodge - full
 * local autonomy, values simple ROI and occupancy, quick to act on a
 * clear commercial incentive. Same brand, contact, profile and metrics
 * across all three regime variants.
 *
 * Data: SME "Round 6" doc data set - an intentional Brand.com
 * competitiveness gap. eRPD 9.6% (Bucket 6), Lose Price 66%, Public =
 * Loyal RPD 9.6% (no Genius; consistent direct-first). The signature is
 * visibility debt from a deliberate ~10% direct-cheaper play: conversion
 * +17% vs peer once seen, but page views -89% and ABRN -84% YoY. Family
 * Rates and Payments active; one RPD scenario (Brand Scenario); 0%
 * pricing coverage. OPC layer carried on `opcMetrics`.
 */
function oceanfrontBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Oceanfront Bliss Lodge',
        propertyType: 'Lodge',
        roomCount: 58,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'blue',
        styleSecondary: 'red',
        description:
          "Owner of an independent lodge with full local autonomy - she sets rates and distribution herself, values simple ROI and occupancy, and is quick to act on a clear commercial incentive. Protects her direct channel and caps OTA share at 30%, but she's persuadable: land the acquisition-cost math and she'll move fast.",
        commercialGoal:
          'Maximize ROI and occupancy across channels while protecting the direct-booking base',
      },
      // Metrics map to the SME Round 6 data set (Hotel ID 132). The tell
      // is a deliberate ~10% direct-cheaper Brand.com gap (Lose Price
      // 66%, eRPD 9.6% / Bucket 6) sitting behind a visibility collapse -
      // strong conversion, almost no page views.
      metrics: {
        erpd: 9.6,
        erpdChange: -2.69,
        rpdPublic: 9.6,
        rpdLoyal: 9.6,
        losePricePublic: 66,
        activeScenarios: 1,
        activeScenarioNames: ['Brand Scenario'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 13, deltaPct: -84 },
          last30dRoomNights: { value: 71, deltaPct: -34 },
          last30dAdr: { value: 159, deltaPct: 23 },
          last90dPageViews: { value: 2448, deltaPct: -89 },
          last90dConversion: { value: 4.8, deltaPct: 17 },
          next3mRoomNights: { value: 113, deltaPct: -56 },
        },
        // SME doc showed 2026-03-12; against an authoring date of
        // 2026-08-05 that's 146 days back - a ~5-month gap that fits the
        // 0% pricing coverage (completely un-actioned).
        lastPricingContactDaysAgo: 146,
        pricingCoverageQTD: 0,
        // Not in Sheet 7's roster; sits mid but below Marina's 8,200 so
        // the R6 decoy Marina reads as "bigger" and "biggest value"
        // fails - Oceanfront is the call on Bucket 6 / visibility debt.
        partnerValueAbrn: 6000,
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        opcMetrics: {
          unsoldRooms: { value: 17 },
          sellThroughRate: { value: -12 },
          visibilityShare: { value: 17, deltaPct: -32 },
          searchPrice: { value: 4 },
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 58,
        visibility: 20,
        conversion: 62,
        revenue: 40,
        discountQuality: 28,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Two products active per the SME data set: Family Rates and
      // Payments. No Genius, no base rate plan, no targeted public
      // pricing - a lean, direct-first setup.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'active', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

function palaceGrandBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Palace Grand Resort',
        propertyType: 'Resort',
        roomCount: 184,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'green',
        styleSecondary: 'blue',
        description:
          "Operations Manager at an independent resort with full local autonomy - practical, ROI-minded, and collaborative. He gives every channel the same net rate to keep things simple, and he weighs every recommendation against the operational load on his front desk. Persuade him it's an easy, low-friction fix backed by the numbers and he'll set it up with you on the spot.",
        commercialGoal:
          'Recover on-platform visibility and occupancy through low-friction setup fixes, without a price war',
      },
      // Metrics map to the SME Round 7 data set (Hotel ID 304). A KEY OTA
      // gap with a sharp +10.95 MoM eRPD spike (eRPD 7.2% / Bucket 5,
      // Lose Price 60%), concentrated in mobile (Mdot) and family (2+1 /
      // 2+2) scenarios. Strong conversion (+45%) and bookings (+49%) but
      // page views -53% and ABRN -46% YoY. His Mobile Rate is active but
      // misconfigured (excluded dates + two rate plans).
      metrics: {
        erpd: 7.2,
        erpdChange: 10.95,
        rpdPublic: 8.9,
        rpdLoyal: -1.3,
        losePricePublic: 60,
        activeScenarios: 3,
        activeScenarioNames: ['Mdot', 'Family 2+1', 'Family 2+2'],
        competitor: 'expedia',
        secondaryMetrics: {
          last30dAbrn: { value: 267, deltaPct: -46 },
          last30dRoomNights: { value: 349, deltaPct: 49 },
          last30dAdr: { value: 216, deltaPct: 6 },
          last90dPageViews: { value: 6553, deltaPct: -53 },
          last90dConversion: { value: 4.0, deltaPct: 45 },
          next3mRoomNights: { value: 435, deltaPct: -9 },
        },
        // SME doc showed 2026-02-11; against an authoring date of
        // 2026-08-05 that's 175 days back - a ~6-month gap that fits the
        // 0% pricing coverage despite the huge +10.95 MoM spike.
        lastPricingContactDaysAgo: 175,
        pricingCoverageQTD: 0,
        // Not in Sheet 7's roster; sits below Marina's 8,200 so the R7
        // decoy Marina reads as "bigger" and "biggest value" fails -
        // Palace Grand is the call on Bucket 5 / +10.95 spike.
        partnerValueAbrn: 6800,
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        // Visibility is holding (17% vs 16% peer) but search price runs
        // +4% and conversion is weak, driving 21% unsold rooms.
        opcMetrics: {
          unsoldRooms: { value: 21 },
          sellThroughRate: { value: -13 },
          visibilityShare: { value: 17, deltaPct: 6 },
          conversion: { value: 0.53 },
          searchPrice: { value: 4 },
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 52,
        visibility: 42,
        conversion: 66,
        revenue: 50,
        discountQuality: 44,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Four products active per the SME data set: Mobile Rates (active
      // but misconfigured - excluded dates + two rate plans), Genius
      // Program, Family Rates and Payments.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'active', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'active', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

function hiddenValleyBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'The Hidden Valley Resort',
        propertyType: 'Resort',
        roomCount: 96,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'blue',
        styleSecondary: 'red',
        description:
          "Revenue Manager at a franchise property with limited local autonomy - she works to a central, brand-mandated policy and leads with the data. Head office keeps the direct site cheaper by design to 'own' the guest, and she reads Booking Sponsored Benefit as Booking.com taking control of her price. She guards her brand reputation closely and won't be rushed into a decision.",
        commercialGoal:
          'Protect brand reputation and direct-booking share while staying compliant with head-office pricing policy',
      },
      // Metrics map to the SME Round 8 data set (Hotel ID 39). A
      // structural Brand.com gap (eRPD 7.3% / Bucket 5, +1.38 MoM) where
      // Public RPD and Loyal RPD are both 7.3% - no Genius gap, she leans
      // on BSB to equalize price. Page views hold near peer and ABRN is
      // +65% YoY, but next-3M room nights pace -50%. Lose Price 50% per
      // the SME Data Insight + Value Pitch (the raw table shows 99%).
      metrics: {
        erpd: 7.3,
        erpdChange: 1.38,
        rpdPublic: 7.3,
        rpdLoyal: 7.3,
        losePricePublic: 50,
        activeScenarios: 3,
        activeScenarioNames: ['Family 2+1', 'Family 2+2', 'Brand Scenario'],
        competitor: 'brand',
        secondaryMetrics: {
          last30dAbrn: { value: 255, deltaPct: 65 },
          last30dRoomNights: { value: 324, deltaPct: -8 },
          last30dAdr: { value: 165, deltaPct: 5 },
          last90dPageViews: { value: 13668, deltaPct: 2 },
          last90dConversion: { value: 3.4, deltaPct: -6 },
          next3mRoomNights: { value: 222, deltaPct: -50 },
        },
        // SME doc showed 2025-12-19; against an authoring date of
        // 2026-08-05 that's 229 days back - a ~7.5-month gap that fits the
        // 0% pricing coverage (her uncompetitive setup has been missed).
        lastPricingContactDaysAgo: 229,
        pricingCoverageQTD: 0,
        // Not in Sheet 7's roster; sits below Marina's 8,200 so the R8
        // decoy Marina reads as "bigger" and "biggest value" fails -
        // Hidden Valley is the call on Bucket 5 / structural Brand gap.
        partnerValueAbrn: 7100,
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM). Search
        // price +10% vs peer with visibility share 21% vs 28% median.
        opcMetrics: {
          unsoldRooms: { value: 24 },
          sellThroughRate: { value: -8 },
          visibilityShare: { value: 21, deltaPct: -25 },
          clickThroughRate: { value: 5.4 },
          conversion: { value: 1.2 },
          searchPrice: { value: 10 },
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 52,
        visibility: 46,
        conversion: 58,
        revenue: 48,
        discountQuality: 40,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Three products active per the SME data set: Portfolio Deals,
      // Family Rates and Payments. No Genius (Public RPD = Loyal RPD,
      // consistent with no Genius discount running); BSB / Payments is
      // the shield she relies on.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'active', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'active', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

function loftLivingBase(args: {
  id: string;
  parityRegime: ParityRegime;
  location: string;
  propertyImage: string;
  contactName: string;
}): PartnerState[] {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: 'Loft Living Inn',
        propertyType: 'Vacation Rental',
        roomCount: 46,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: 'red',
        styleSecondary: 'blue',
        description:
          "PMC Revenue Manager running a portfolio of vacation-rental units as a commercially minded business with strong autonomy. He responds to revenue impact, margin logic, and ROI across channels, and he wants proof before he moves. He's frustrated that his B2B / wholesale rates are leaking into public search and blames Booking.com for surfacing them - lead with the commercial case, not a price cut.",
        commercialGoal:
          'Protect ADR and margin while recovering lost visibility and demand across channels',
      },
      // Metrics map to the SME Round 9 data set (Hotel ID 301). A SEVERE
      // Key OTA gap (eRPD 31.7% / Bucket 7, +30.75 MoM) from B2B /
      // wholesale rates leaking into public B2C. ADR is +88% above peer
      // but room nights -44%, conversion -68%, next-3M pace -46%. His
      // mobile rate is active but misconfigured (weekends + long booking
      // windows excluded, base rate outran the discount).
      metrics: {
        erpd: 31.7,
        erpdChange: 30.75,
        rpdPublic: 35.4,
        rpdLoyal: 29.9,
        losePricePublic: 97,
        activeScenarios: 3,
        activeScenarioNames: ['Wholesaler', 'App', 'Brand Scenario'],
        competitor: 'expedia',
        secondaryMetrics: {
          last30dAbrn: { value: 170, deltaPct: -28 },
          last30dRoomNights: { value: 88, deltaPct: -44 },
          last30dAdr: { value: 64, deltaPct: 88 },
          last90dPageViews: { value: 23115, deltaPct: 65 },
          last90dConversion: { value: 0.7, deltaPct: -68 },
          next3mRoomNights: { value: 25, deltaPct: -46 },
        },
        // SME doc showed 2026-04-12; against an authoring date of
        // 2026-08-05 that's 115 days back - a ~3.8-month gap.
        lastPricingContactDaysAgo: 115,
        pricingCoverageQTD: 20,
        // Not in Sheet 7's roster; the SME notes its prioritization index
        // (eRPD x Partner Value) is on the higher end, but Bucket 7 alone
        // makes it the obvious call - kept below Marina's 8,200 so the
        // "biggest value wins" shortcut still fails.
        partnerValueAbrn: 7500,
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM). Search
        // price +12% vs peer, visibility 8% vs 23% median.
        opcMetrics: {
          unsoldRooms: { value: 33 },
          sellThroughRate: { value: -7 },
          visibilityShare: { value: 8, deltaPct: -65 },
          clickThroughRate: { value: 3.2 },
          conversion: { value: 0.84 },
          searchPrice: { value: 12 },
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 85,
        visibility: 22,
        conversion: 28,
        revenue: 44,
        discountQuality: 30,
        rateParity: 'major',
      },
      metricHistory: [],
      trust: 50,
      relationship: 'neutral',
      // Heavily-tooled MPP per the SME data set: Mobile Rates, Country
      // Rates, Portfolio Deals, Campaigns, Genius Program, Family Rates
      // and Payments all active. The mobile rate is active but
      // misconfigured (weekends + long windows excluded) - the fenced fix.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'active', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'active', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'active', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'active', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
        { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
        { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
        { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'inactive', category: 'foundations-payments' },
        { id: 'family-rates', label: 'Family rates', status: 'active', category: 'foundations-payments' },
        { id: 'payments', label: 'Payments', status: 'active', category: 'foundations-payments' },
      ],
      conversationLog: [],
      pendingActions: [],
    },
  ];
}

export const initialPartners: PartnerState[] = [
  // ── Loft Living Inn (SME Round 9 priority, all three regimes) ──
  // SEVERE Key OTA gap (eRPD 31.7% / Bucket 7, +30.75 MoM) from a B2B /
  // wholesale rate leak into public B2C via Partner Offer. High ADR (+88%
  // vs peer) masks a collapse in room nights (-44%) and conversion
  // (-68%). Objection: The Wholesaler Leak + Competitive Aggression. Ends
  // on a SOFT NO - the win is a compliant, trust-preserving conversation
  // that reframes B2B as a leakage tax and offers a fenced mobile fix.
  ...loftLivingBase({
    id: 'loft-living-wide',
    parityRegime: 'wide',
    location: 'Austin, USA',
    contactName: 'Lucas Silva',
    propertyImage:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop',
  }),
  ...loftLivingBase({
    id: 'loft-living-narrow',
    parityRegime: 'narrow',
    location: 'Manchester, UK',
    contactName: 'Lucas Silva',
    propertyImage:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop',
  }),
  ...loftLivingBase({
    id: 'loft-living-none',
    parityRegime: 'none',
    location: 'Seville, Spain',
    contactName: 'Lucas Silva',
    propertyImage:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop',
  }),

  // ── The Hidden Valley Resort (SME Round 8 priority, all three regimes) ──
  // Structural Brand.com gap (eRPD 7.3% / Bucket 5), Public RPD = Loyal
  // RPD = 7.3% (no Genius gap - leaning on BSB to equalize). Objection:
  // BSB / Payments Shield + Direct-Is-Cheaper + Family Ready. Ends on a
  // SOFT NO - the win is a compliant, trust-preserving conversation that
  // reframes BSB as a shield and earns a follow-up, not a same-call yes.
  ...hiddenValleyBase({
    id: 'hidden-valley-wide',
    parityRegime: 'wide',
    location: 'Aspen, USA',
    contactName: 'Claire Thornton',
    propertyImage:
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400&h=250&fit=crop',
  }),
  ...hiddenValleyBase({
    id: 'hidden-valley-narrow',
    parityRegime: 'narrow',
    location: 'Lake District, UK',
    contactName: 'Claire Thornton',
    propertyImage:
      'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=400&h=250&fit=crop',
  }),
  ...hiddenValleyBase({
    id: 'hidden-valley-none',
    parityRegime: 'none',
    location: 'Sierra Nevada, Spain',
    contactName: 'Claire Thornton',
    propertyImage:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop',
  }),

  // ── Palace Grand Resort (SME Round 7 priority, all three regimes) ──
  // Key OTA gap with a sharp +10.95 MoM eRPD spike (Bucket 5, Lose Price
  // 60%), concentrated in mobile (Mdot) and family (2+1 / 2+2) searches
  // where the competitor undercuts. Strong conversion (+45%) but page
  // views -53%. Objection: The Same Net Mindset + Competitive Aggression
  // + Family Ready. The win is refusing the price war, opening the family
  // segment, and fixing the misconfigured mobile rate - not a rate cut.
  ...palaceGrandBase({
    id: 'palace-grand-wide',
    parityRegime: 'wide',
    location: 'Orlando, USA',
    contactName: 'Ethan Nkosi',
    propertyImage:
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=250&fit=crop',
  }),
  ...palaceGrandBase({
    id: 'palace-grand-narrow',
    parityRegime: 'narrow',
    location: 'London, UK',
    contactName: 'Ethan Nkosi',
    propertyImage:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
  }),
  ...palaceGrandBase({
    id: 'palace-grand-none',
    parityRegime: 'none',
    location: 'Marbella, Spain',
    contactName: 'Ethan Nkosi',
    propertyImage:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop',
  }),

  // ── Oceanfront Bliss Lodge (SME Round 6 priority, all three regimes) ──
  // Intentional Brand.com gap from a deliberate ~10% direct-cheaper play
  // (Brand.com Loyalty + reverse-billboard) - Lose Price 66%, Bucket 6,
  // page views -89% despite strong conversion. Objection: Brand.com
  // Loyalty + Billboard Effect in Reverse. The win is the
  // acquisition-cost math, not a flat rate drop.
  ...oceanfrontBase({
    id: 'oceanfront-wide',
    parityRegime: 'wide',
    location: 'San Diego, USA',
    contactName: 'Priya Singh',
    propertyImage:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop',
  }),
  ...oceanfrontBase({
    id: 'oceanfront-narrow',
    parityRegime: 'narrow',
    location: 'Cornwall, UK',
    contactName: 'Priya Singh',
    propertyImage:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=250&fit=crop',
  }),
  ...oceanfrontBase({
    id: 'oceanfront-none',
    parityRegime: 'none',
    location: 'Málaga, Spain',
    contactName: 'Priya Singh',
    propertyImage:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=250&fit=crop',
  }),

  // ── Emerald Peak Lodge (SME Round 5 priority, all three regimes) ──
  // Intentional Brand.com gap driven by a franchise "Direct-is-Cheaper"
  // head-office policy - Lose Price 100%, Bucket 6, yet winning on demand
  // (+110% room nights vs peer). Objection: Direct-is-Cheaper + Segmented
  // Pricing + Family Ready. The win is a compliant, fenced family rate.
  ...emeraldPeakBase({
    id: 'emerald-peak-wide',
    parityRegime: 'wide',
    location: 'Aspen, USA',
    contactName: 'Sophia Chen',
    propertyImage:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
  }),
  ...emeraldPeakBase({
    id: 'emerald-peak-narrow',
    parityRegime: 'narrow',
    location: 'Lake District, UK',
    contactName: 'Sophia Chen',
    propertyImage:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop',
  }),
  ...emeraldPeakBase({
    id: 'emerald-peak-none',
    parityRegime: 'none',
    location: 'Sierra Nevada, Spain',
    contactName: 'Sophia Chen',
    propertyImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop',
  }),

  // ── Riverside Boutique Hotel (SME Round 4 priority, all three regimes) ──
  // Key OTA gap with a sharp +6.56 MoM eRPD spike, an unintentional
  // family setup gap and a non-genuine Genius discount, behind a "Value
  // Proposition Wall" (deliberate 30% volume cap). Objection: Value
  // Proposition Wall + Slippery Road + Segmented Pricing + Family Ready.
  ...riversideBase({
    id: 'riverside-wide',
    parityRegime: 'wide',
    location: 'Charleston, USA',
    contactName: 'Anton Müller',
    propertyImage:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop',
  }),
  ...riversideBase({
    id: 'riverside-narrow',
    parityRegime: 'narrow',
    location: 'Bath, UK',
    contactName: 'Anton Müller',
    propertyImage:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop',
  }),
  ...riversideBase({
    id: 'riverside-none',
    parityRegime: 'none',
    location: 'Seville, Spain',
    contactName: 'Anton Müller',
    propertyImage:
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&h=250&fit=crop',
  }),

  // ── Ocean View Resort (SME Round 3 priority, all three regimes) ──
  // Brand.com Competitiveness Gap driven by the Billboard Effect in
  // Reverse - Camila keeps Booking.com marked up 5.5% to push direct
  // bookings; the result is visibility debt (converts +39% vs peer but
  // page views -61%). Objection: Billboard Effect in Reverse + Segmented
  // Pricing. Retires Noble Falcon as the R3 priority.
  ...oceanViewBase({
    id: 'ocean-view-wide',
    parityRegime: 'wide',
    location: 'San Diego, USA',
    contactName: 'Camila Ross',
    propertyImage:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop',
  }),
  ...oceanViewBase({
    id: 'ocean-view-narrow',
    parityRegime: 'narrow',
    location: 'Brighton, UK',
    contactName: 'Camila Ross',
    propertyImage:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop',
  }),
  ...oceanViewBase({
    id: 'ocean-view-none',
    parityRegime: 'none',
    location: 'Alicante, Spain',
    contactName: 'Camila Ross',
    propertyImage:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=250&fit=crop',
  }),

  // ── Silver Horizon Resort (SME Round 2 priority, all three regimes) ──
  // Key OTA Competitiveness Gap - Expedia undercutting via margin cuts
  // on the International and Family segments. Strong platform demand but
  // ABRN -32% YoY. Objection: Competitive Aggression + Same Net Mindset
  // + Family Ready. Retires Velvet Sky as the R2 priority.
  ...silverHorizonBase({
    id: 'silver-horizon-wide',
    parityRegime: 'wide',
    location: 'Orlando, USA',
    contactName: 'Chloe Davies',
    propertyImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop',
  }),
  ...silverHorizonBase({
    id: 'silver-horizon-narrow',
    parityRegime: 'narrow',
    location: 'Lake District, UK',
    contactName: 'Chloe Davies',
    propertyImage:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=250&fit=crop',
  }),
  ...silverHorizonBase({
    id: 'silver-horizon-none',
    parityRegime: 'none',
    location: 'Costa Brava, Spain',
    contactName: 'Chloe Davies',
    propertyImage:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=250&fit=crop',
  }),

  // ── Royal Crest Hotel (SME Round 1 priority, all three regimes) ──
  // Brand.com Competitiveness Gap - Liam O'Connell protects his direct
  // channel; page views +20% vs peer but conversion and forward pace
  // lag because his own site undercuts Booking.com. Objection: The
  // Segmented Pricing Conversation + Brand.com Loyalty. Retires Crystal
  // Water as the R1 priority.
  ...royalCrestBase({
    id: 'royal-crest-wide',
    parityRegime: 'wide',
    location: 'Miami Beach, USA',
    contactName: "Liam O'Connell",
    propertyImage:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
  }),
  ...royalCrestBase({
    id: 'royal-crest-narrow',
    parityRegime: 'narrow',
    location: 'Cotswolds, UK',
    contactName: "Liam O'Connell",
    propertyImage:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop',
  }),
  ...royalCrestBase({
    id: 'royal-crest-none',
    parityRegime: 'none',
    location: 'Costa del Sol, Spain',
    contactName: "Liam O'Connell",
    propertyImage:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop',
  }),

  // ── Crystal Water Resort (Wide Parity / Miami) ──
  // SME-approved R1 priority - Brand.com Competitiveness Gap caused
  // by Sarah's promotional rate on her direct brand site undercutting
  // Booking.com. Same hotel brand + contact (Sarah Bennett) shows up
  // in all three regime variants - only location, parityRegime, the
  // property image, and the partner id differ. Data sourced from SME
  // spreadsheet row 9. Country groupings (Spain / UK / US for No /
  // Narrow / Wide) match the rest of the regime's portfolio so the
  // tester reads a single market per regime.
  ...crystalWaterBase({
    id: 'crystal-water-wide',
    parityRegime: 'wide',
    location: 'Miami Beach, USA',
    contactName: 'Sarah Mitchell',
    propertyImage:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop',
  }),

  // ── Crystal Water Resort (Narrow Parity / Cornwall) ──
  ...crystalWaterBase({
    id: 'crystal-water-narrow',
    parityRegime: 'narrow',
    location: 'Cornwall, UK',
    contactName: 'Sarah Bennett',
    propertyImage:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop',
  }),

  // ── Crystal Water Resort (No Parity / Marbella) ──
  // The No-Parity R1 priority partner today.
  ...crystalWaterBase({
    id: 'crystal-water-none',
    parityRegime: 'none',
    location: 'Marbella, Spain',
    contactName: 'Sarah Beltrán',
    propertyImage:
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&h=250&fit=crop',
  }),

  // ── Velvet Sky Boutique Hotel (Wide Parity / New York) ──
  // SME-approved R2 priority - Brand.com Competitiveness Gap caused
  // by John's aggressive public discounting on his direct brand
  // site. Same hotel brand + contact (John Whitford) across all
  // three regime variants - only location, parityRegime, the
  // property image, and the partner id differ. Data sourced from
  // SME spreadsheet row 34. Country groupings match the rest of
  // the regime's portfolio (Spain / UK / US for No / Narrow / Wide).
  ...velvetSkyBase({
    id: 'velvet-sky-wide',
    parityRegime: 'wide',
    location: 'New York, USA',
    contactName: 'John Whitfield',
    propertyImage:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
  }),

  // ── Velvet Sky Boutique Hotel (Narrow Parity / Edinburgh) ──
  ...velvetSkyBase({
    id: 'velvet-sky-narrow',
    parityRegime: 'narrow',
    location: 'Edinburgh, UK',
    contactName: 'John Whitford',
    propertyImage:
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=400&h=250&fit=crop',
  }),

  // ── Velvet Sky Boutique Hotel (No Parity / Madrid) ──
  // The No-Parity R2 priority partner today.
  ...velvetSkyBase({
    id: 'velvet-sky-none',
    parityRegime: 'none',
    location: 'Madrid, Spain',
    contactName: 'John Vela',
    propertyImage:
      'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=400&h=250&fit=crop',
  }),

  // ── Raven Inn - R2 distractor across all three regimes ──
  // Healthy Key OTA gap profile (Bucket 3, Lose Price 35%). Data
  // mapped from SME spreadsheet Key OTA sheet row 14 (White Cliffs
  // Hotel) with a made-up partner name. Reads as not the priority
  // vs Velvet Sky Boutique Hotel at R2. Country grouped per regime:
  // Spain (No) / UK (Narrow) / US (Wide). Narrow + Wide variants
  // alias back to the base `raven-inn` for conversation + baseline
  // lookups via the regime-suffix fallback.
  ...ravenInnBase({ id: 'raven-inn', parityRegime: 'none', location: 'Valencia, Spain', contactName: 'Emily Castro' }),
  ...ravenInnBase({ id: 'raven-inn-narrow', parityRegime: 'narrow', location: 'Bath, UK', contactName: 'Emily Carter' }),
  ...ravenInnBase({ id: 'raven-inn-wide', parityRegime: 'wide', location: 'Boston, USA', contactName: 'Emily Carter' }),

  // ── Driftwood Bay Resort - R2 distractor across all three regimes ──
  // Moderate Brand gap profile (Bucket 4, eRPD 3.4%). Data mapped
  // from SME spreadsheet mix sheet row 43 (The Oasis Palms Resort)
  // with a made-up partner name. Reads as not the priority vs
  // Velvet Sky Boutique Hotel at R2. Country grouped per regime.
  ...driftwoodBayBase({ id: 'driftwood-bay', parityRegime: 'none', location: 'Mallorca, Spain', contactName: 'Daniel Cruz' }),
  ...driftwoodBayBase({ id: 'driftwood-bay-narrow', parityRegime: 'narrow', location: 'Brighton, UK', contactName: 'Daniel Crawford' }),
  ...driftwoodBayBase({ id: 'driftwood-bay-wide', parityRegime: 'wide', location: 'Newport Beach, USA', contactName: 'Daniel Cruz' }),

  // ── Marina - Boutique City Hotel (Blue/Thinker) ──
  // Three regime variants. The conversations / persona hints / per-
  // round baselines registered against the base id `marina` are
  // reused by the `-narrow` and `-wide` variants via the regime-
  // suffix alias fallback in getConversationTree / getPartnerBaseline
  // / getPersonaHint. Contact + property name stay constant; only
  // location, parityRegime, and id differ across variants.
  ...marinaBase({ id: 'marina', parityRegime: 'none', location: 'Madrid, Spain', contactName: 'Marina Alvarez' }),
  ...marinaBase({ id: 'marina-narrow', parityRegime: 'narrow', location: 'London, UK', contactName: 'Marina Ashworth' }),
  ...marinaBase({ id: 'marina-wide', parityRegime: 'wide', location: 'New York, USA', contactName: 'Marina Brown' }),

  // ── The Noble Falcon Inn (Wide Parity / New York) ──
  // Brand.com Competitiveness Gap scenario. Same hotel brand and
  // contact (Anton Müller) shows up in all three regime variants -
  // only location + parityRegime + the regime-specific dialogue
  // change. Sourced from the SME "Brand.com Competitiveness Gap"
  // doc and slotted at Round 3 across all three variants (see
  // branchingScenarios.ts and partnerStateByRound.ts). John holds
  // R1 as a placeholder priority pending the SME-approved Crystal
  // Water Resort drop.
  ...nobleFalconBase({
    id: 'noble-falcon-wide',
    parityRegime: 'wide',
    location: 'New York, USA',
    contactName: 'Anton Müller',
    propertyImage:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=250&fit=crop',
  }),

  // ── The Noble Falcon Inn (Narrow Parity / London) ──
  ...nobleFalconBase({
    id: 'noble-falcon-narrow',
    parityRegime: 'narrow',
    location: 'London, UK',
    contactName: 'Anton Walters',
    propertyImage:
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=250&fit=crop',
  }),

  // ── The Noble Falcon Inn (No Parity / Seville) ──
  // The No-Parity R3 priority partner.
  ...nobleFalconBase({
    id: 'noble-falcon-none',
    parityRegime: 'none',
    location: 'Seville, Spain',
    contactName: 'Anton Vega',
    propertyImage:
      'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=400&h=250&fit=crop',
  }),

  // ── Carlos - City Apartment Complex - distractor across all regimes ──
  // Surface-healthy KPIs at R1 with a misconfigured Country Rate
  // hiding in the discount list (the R3 trap). Country grouped per
  // regime; Narrow + Wide alias back to `carlos` for trees/baselines.
  ...carlosBase({ id: 'carlos', parityRegime: 'none', location: 'Barcelona, Spain', contactName: 'Carlos Rivera' }),
  ...carlosBase({ id: 'carlos-narrow', parityRegime: 'narrow', location: 'Manchester, UK', contactName: 'Carlos Reeves' }),
  ...carlosBase({ id: 'carlos-wide', parityRegime: 'wide', location: 'Los Angeles, USA', contactName: 'Carlos Rivera' }),

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
  // ── John - Brand-first Boutique Hotel (Red/Driver) ──
  // Was the No-Parity R1 placeholder priority until June 2026, when
  // SME-approved R1 content (Crystal Water Resort) landed and John
  // moved here. His branching scenario (data/scenarios/john-r1.ts)
  // and persona hints are intact - splice back into initialPartners
  // if a future round repurposes the brand-first crisis profile.
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
        "Owner-operator who prioritizes his direct channel and treats Booking.com as a necessary tail. Acts on emotion when it comes to OTAs - has a hard 30% rule in his head. Needs reframing, not numbers, to shift his view.",
      commercialGoal: 'Grow direct bookings while keeping a brand-led identity',
    },
    metrics: {
      erpd: 9.5,
      erpdChange: 0.4,
      rpdPublic: 10.8,
      rpdLoyal: 7.2,
      losePricePublic: 81,
      activeScenarios: 2,
      competitor: 'brand',
      // Claude-authored Partner Value (2025 ABRN). Small-to-medium
      // boutique in York; sized to sit below Crystal Water's 6061
      // if John ever comes back to the R1 slot.
      partnerValueAbrn: 3800,
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
      { id: 'mobile-rate', label: 'Mobile Rates', status: 'active', category: 'public-pricing' },
      { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
      { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
      { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
      { id: 'genius-programme', label: 'Genius Program', status: 'active', category: 'genius-pricing' },
      { id: 'genius-15', label: 'Genius 15%', status: 'inactive', category: 'genius-pricing' },
      { id: 'genius-20', label: 'Genius 20%', status: 'inactive', category: 'genius-pricing' },
      { id: 'genius-dynamic', label: 'Genius dynamic pricing', status: 'inactive', category: 'genius-pricing' },
      { id: 'base-rate-plan', label: 'Base Rate Plan', status: 'active', category: 'foundations-payments' },
      { id: 'family-rates', label: 'Family rates', status: 'inactive', category: 'foundations-payments' },
      { id: 'payments', label: 'Payments', status: 'inactive', category: 'foundations-payments' },
    ],
    conversationLog: [],
    pendingActions: [],
  },

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
    },
    metrics: {
      erpd: 17.2,
      erpdChange: 6.8,
      rpdPublic: 18.5,
      rpdLoyal: 14.2,
      losePricePublic: 96,
      activeScenarios: 3,
      competitor: 'expedia',
      // Claude-authored Partner Value (2025 ABRN). Large 180-room
      // Greek resort with high volume; sized above Noble Falcon's
      // 13957 to reflect the higher room count.
      partnerValueAbrn: 15200,
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
      { id: 'genius', label: 'Genius Program', status: 'active' },
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
    },
    metrics: {
      erpd: 14.8,
      erpdChange: 4.5,
      rpdPublic: 15.6,
      rpdLoyal: 12.8,
      losePricePublic: 91,
      activeScenarios: 2,
      competitor: 'brand',
      // Claude-authored Partner Value (2025 ABRN). Small country
      // guesthouse; sized to reflect low room count and quiet
      // regional demand.
      partnerValueAbrn: 1200,
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
      { id: 'genius', label: 'Genius Program', status: 'inactive' },
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
    },
    metrics: {
      erpd: 12.5,
      erpdChange: 3.8,
      rpdPublic: 13.8,
      rpdLoyal: 10.2,
      losePricePublic: 88,
      activeScenarios: 2,
      competitor: 'expedia',
      // Claude-authored Partner Value (2025 ABRN). Budget chain
      // property with strong volume; sized around the larger end
      // of the distractor pool.
      partnerValueAbrn: 9600,
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
      { id: 'genius', label: 'Genius Program', status: 'active' },
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
    },
    metrics: {
      erpd: 5.6,
      erpdChange: 0.8,
      rpdPublic: 6.2,
      rpdLoyal: 4.5,
      losePricePublic: 64,
      activeScenarios: 1,
      competitor: 'expedia',
      // Claude-authored Partner Value (2025 ABRN). Small luxury
      // ryokan with low room count and premium positioning; sized
      // low to reflect boutique scale rather than mass volume.
      partnerValueAbrn: 1800,
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
      { id: 'genius', label: 'Genius Program', status: 'inactive' },
      { id: 'mobile-rate', label: 'Mobile Rate', status: 'inactive' },
      { id: 'country-rate', label: 'Country Rate', status: 'inactive' },
      { id: 'last-minute', label: 'Last-Minute Deal', status: 'inactive' },
      { id: 'early-booker', label: 'Early Booker Deal', status: 'inactive' },
    ],
    conversationLog: [],
    pendingActions: [],
  },
];
