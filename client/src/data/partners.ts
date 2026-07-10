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
          'Maximise resort revenue while protecting margin and reducing OTA commission cost',
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
        // Only Genius Programme is active out of 11 products in the
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
      // Programme is the only active product. Everything else
      // (public-pricing levers, Genius tiers, base rate plan,
      // family rates, payments) is inactive. The sparse pattern
      // is the visual cue that Sarah's not using Booking.com's
      // tools - she's pricing through her direct brand site.
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'inactive', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'inactive', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'inactive', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Programme', status: 'active', category: 'genius-pricing' },
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
        { id: 'genius-programme', label: 'Genius Programme', status: 'inactive', category: 'genius-pricing' },
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
      // running only the base programme (no 15/20/Dynamic tiers),
      // Family Rates and Payments active in Foundations but no
      // Base Rate Plan (the partner's pricing is centrally
      // controlled - they're not setting their own base plan).
      discounts: [
        { id: 'mobile-rate', label: 'Mobile Rates', status: 'active', category: 'public-pricing' },
        { id: 'country-rate', label: 'Country Rates', status: 'active', category: 'public-pricing' },
        { id: 'portfolio-deals', label: 'Portfolio Deals', status: 'active', category: 'public-pricing' },
        { id: 'campaigns', label: 'Campaigns', status: 'active', category: 'public-pricing' },
        { id: 'genius-programme', label: 'Genius Programme', status: 'active', category: 'genius-pricing' },
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
      { id: 'genius-programme', label: 'Genius Programme', status: 'active', category: 'genius-pricing' },
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
      commercialGoal: 'Aggressive growth - maximise bookings across all channels',
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
      { id: 'genius-programme', label: 'Genius Programme', status: 'active', category: 'genius-pricing' },
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
      { id: 'genius-programme', label: 'Genius Programme', status: 'active', category: 'genius-pricing' },
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
      { id: 'genius-programme', label: 'Genius Programme', status: 'active', category: 'genius-pricing' },
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

export const initialPartners: PartnerState[] = [
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
        "Owner-operator who prioritises his direct channel and treats Booking.com as a necessary tail. Acts on emotion when it comes to OTAs - has a hard 30% rule in his head. Needs reframing, not numbers, to shift his view.",
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
      { id: 'genius-programme', label: 'Genius Programme', status: 'active', category: 'genius-pricing' },
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
