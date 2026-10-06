// src/data/partners.ts
function initialsFromName(name) {
  const [first, ...rest] = name.split(" ");
  const last = rest[rest.length - 1] ?? "";
  return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
}
function crystalWaterBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Crystal Water Resort",
        propertyType: "Resort",
        roomCount: 142,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "red",
        styleSecondary: "yellow",
        description: "Hotel Manager at a brand-affiliated resort that operates under a marketing contract only - no central pricing control. Direct, results-focused, and watches the daily ABRN and ADR numbers herself. Energetic and no-fluff; expects clear commercial logic and a concrete next step before she agrees to anything.",
        commercialGoal: "Maximize resort revenue while protecting margin and reducing OTA commission cost"
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
        activeScenarioNames: ["Brand Scenario"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 514, deltaPct: -15 },
          last30dRoomNights: { value: 320, deltaPct: -28 },
          last30dAdr: { value: 145, deltaPct: 4 },
          last90dPageViews: { value: 32100, deltaPct: 202 },
          last90dConversion: { value: 1.1, deltaPct: -52 },
          next3mRoomNights: { value: 240, deltaPct: -18 }
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
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Adoption mirrors the SME spreadsheet row 9: Genius
      // Program is the only active product. Everything else
      // (public-pricing levers, Genius tiers, base rate plan,
      // family rates, payments) is inactive. The sparse pattern
      // is the visual cue that Sarah's not using Booking.com's
      // tools - she's pricing through her direct brand site.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "inactive", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "inactive", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function velvetSkyBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Velvet Sky Boutique Hotel",
        propertyType: "Boutique Hotel",
        roomCount: 38,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "red",
        styleSecondary: "blue",
        description: "Owner-manager at an independent boutique who treats his direct brand site as his lowest-priced channel by design. Talks in commercial terms - margins, commission, ROI - and weighs every trade-off before agreeing. Direct and pragmatic; not warm, but rewards a tight commercial case.",
        commercialGoal: "Grow direct bookings via aggressive on-site discounting while keeping ADR protected"
      },
      // Metrics map verbatim to the SME spreadsheet row 34 (Hotel
      // ID 34 - Velvet Sky Boutique Hotel). Same baseline across all
      // three regime variants; the regime only changes the regulatory
      // framing. The flat Public-vs-Loyal RPD (both 5.0%) reflects
      // that Genius isn't active for this partner.
      metrics: {
        erpd: 5,
        erpdChange: 0.53,
        rpdPublic: 5,
        rpdLoyal: 5,
        losePricePublic: 99,
        activeScenarios: 1,
        activeScenarioNames: ["Brand Scenario"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 351, deltaPct: -8 },
          last30dRoomNights: { value: 220, deltaPct: -18 },
          last30dAdr: { value: 162, deltaPct: 2 },
          last90dPageViews: { value: 18500, deltaPct: 45 },
          last90dConversion: { value: 1.3, deltaPct: -38 },
          next3mRoomNights: { value: 165, deltaPct: -12 }
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
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Sparse adoption: nothing active. Reinforces the story that
      // John relies entirely on his direct brand site's discount
      // strategy and hasn't engaged any Booking.com pricing tool -
      // even Genius is off.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "inactive", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "inactive", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "inactive", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function nobleFalconBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "The Noble Falcon Inn",
        propertyType: "Branded Mid-Scale Hotel",
        roomCount: 288,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "blue",
        styleSecondary: "red",
        description: "Revenue Manager for a fully chain-managed property with limited local autonomy. Process-led and measured, he works to a head-office directive that keeps the direct site cheaper, and he uses a higher Booking.com price to filter out 'risky' guests. He guards his brand's autonomy closely, bristles at advice on how to run his own website, and will end a call rather than be pushed - separate price from risk and stay respectful, and even then he may not commit.",
        commercialGoal: "Hit brand-set commercial KPIs without compromising brand consistency or guest experience"
      },
      // Metrics map verbatim to the SME PDF Data Set table for
      // The Noble Falcon Inn (Hotel ID 101). Same baseline across
      // all three regime variants - the regime only changes the
      // regulatory framing of the conversation, not the data.
      metrics: {
        erpd: 17,
        erpdChange: 21.42,
        rpdPublic: 20,
        rpdLoyal: 5.9,
        losePricePublic: 93,
        activeScenarios: 4,
        activeScenarioNames: [
          "Brand Scenario",
          "Family 2+1",
          "Family 2+2",
          "App"
        ],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1306, deltaPct: -18 },
          last30dRoomNights: { value: 1113, deltaPct: 49 },
          last30dAdr: { value: 70, deltaPct: -17 },
          last90dPageViews: { value: 74948, deltaPct: 26 },
          last90dConversion: { value: 1.4, deltaPct: -17 },
          next3mRoomNights: { value: 1515, deltaPct: 81 }
        },
        // Stored as a relative offset so the gap between today and
        // the last contact stays constant across replays. The SME R10
        // doc showed 2026-05-13 against an authoring date of 2026-08-05
        // - that's 84 days back, so we encode 84 here. Render time
        // resolves it to "today - 84 days" in PartnerDetailScreen.
        lastPricingContactDaysAgo: 84,
        pricingCoverageQTD: 64,
        // Partner Data Set 46, Sheet 7 row 39 (The Noble Falcon Inn).
        // Sheet 7 places this at Round 10, its target home - now the
        // final Level 1 round with the SME Round 10 content (Adam Cole,
        // The Risky Guest, strong-no ending). Full-year 2025 ABRN.
        partnerValueAbrn: 1158,
        // SME-confirmed note (Irene, 2026-09-14, Pack 5 c21/c24): keep
        // Family Rates Active (the product is implemented) and flag the
        // pricing opportunity in a note rather than marking it Inactive.
        // Here the family occupancy setup prices children as adults, so
        // the opportunity is a configuration fix surfaced in-call.
        productsNote: "Family Rates are active, but our data suggests a family pricing opportunity is still there - the family occupancy setup is pricing children as adults, so it is worth reviewing the configuration in the conversation.",
        // OPC layer from the SME metrics sheet - only surfaced when the
        // On Platform Competitiveness tab unlocks (Level 2 / KAM); at
        // R10 (Level 1) the tab stays locked, so this is future data.
        // Search price €73 vs €86 peer (below), but conversion 1.3% and
        // visibility share 15% both lag - the gap hides in families.
        opcMetrics: {
          unsoldRooms: { value: 21 },
          sellThroughRate: { value: 48, peerLabel: "above" },
          visibilityShare: { value: 15, peerValue: 16 },
          clickThroughRate: { value: 4.1, peerLabel: "below" },
          conversion: { value: 1.3, peerLabel: "below" },
          searchPrice: { value: 73, peerValue: 86 }
        },
        // Legacy fields - kept for type compatibility and the old
        // conversation system; not surfaced on the R2 Partner Detail.
        experiencedRPD: 35,
        visibility: 42,
        conversion: 28,
        revenue: 32,
        discountQuality: 30,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Discount adoption mirrors the SME PDF Public/Genius/
      // Foundations grids. Public Pricing fully active, Genius
      // running only the base program (no 15/20/Dynamic tiers),
      // Family Rates and Payments active in Foundations but no
      // Base Rate Plan (the partner's pricing is centrally
      // controlled - they're not setting their own base plan).
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "active", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "active", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "active", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "active", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "active", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "active", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "active", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function marinaBase(args) {
  return [{
    persona: {
      id: args.id,
      name: args.contactName,
      propertyName: "Hotel & Suites Castellana",
      propertyType: "Boutique City Hotel",
      roomCount: 35,
      location: args.location,
      parityRegime: args.parityRegime,
      avatar: initialsFromName(args.contactName),
      propertyImage: "photo-1551882547",
      style: "blue",
      styleSecondary: "green",
      description: "Meticulous owner-operator who tracks every metric. Respects data-driven conversations and detailed reasoning. Will test your logic before committing.",
      commercialGoal: "Grow bookings without eroding ADR"
    },
    metrics: {
      erpd: 6.3,
      erpdChange: 1.2,
      rpdPublic: 7.5,
      rpdLoyal: 4.8,
      losePricePublic: 68,
      activeScenarios: 1,
      competitor: "brand",
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
      rateParity: "clean"
    },
    metricHistory: [],
    trust: 55,
    relationship: "neutral",
    discounts: [
      { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
      { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
      { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
      { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
      { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
      { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
      { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
      { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
      { id: "base-rate-plan", label: "Base Rate Plan", status: "active", category: "foundations-payments" },
      { id: "family-rates", label: "Family rates", status: "inactive", category: "foundations-payments" },
      { id: "payments", label: "Payments", status: "inactive", category: "foundations-payments" }
    ],
    conversationLog: [],
    pendingActions: []
  }];
}
function carlosBase(args) {
  return [{
    persona: {
      id: args.id,
      name: args.contactName,
      propertyName: "Barceloneta Living",
      propertyType: "City Apartments",
      roomCount: 45,
      location: args.location,
      parityRegime: args.parityRegime,
      avatar: initialsFromName(args.contactName),
      propertyImage: "photo-1522708323590",
      style: "yellow",
      styleSecondary: "red",
      description: "Energetic apartment operator who loves innovation and new trends. Makes quick decisions but sometimes acts before thinking. Relationship-first communicator who thrives on enthusiasm.",
      commercialGoal: "Aggressive growth - maximize bookings across all channels"
    },
    metrics: {
      erpd: 3.4,
      erpdChange: -1.2,
      rpdPublic: 4.1,
      rpdLoyal: 2.5,
      losePricePublic: 48,
      activeScenarios: 1,
      competitor: "brand",
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
      rateParity: "minor"
    },
    metricHistory: [],
    trust: 60,
    relationship: "neutral",
    discounts: [
      { id: "mobile-rate", label: "Mobile Rates", status: "active", category: "public-pricing" },
      { id: "country-rate", label: "Country Rates", status: "misconfigured", category: "public-pricing" },
      { id: "portfolio-deals", label: "Portfolio Deals", status: "active", category: "public-pricing" },
      { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
      { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
      { id: "genius-15", label: "Genius 15%", status: "active", category: "genius-pricing" },
      { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
      { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
      { id: "base-rate-plan", label: "Base Rate Plan", status: "active", category: "foundations-payments" },
      { id: "family-rates", label: "Family rates", status: "inactive", category: "foundations-payments" },
      { id: "payments", label: "Payments", status: "active", category: "foundations-payments" }
    ],
    conversationLog: [],
    pendingActions: []
  }];
}
function ravenInnBase(args) {
  return [{
    persona: {
      id: args.id,
      name: args.contactName,
      propertyName: "Raven Inn",
      propertyType: "Boutique Hotel",
      roomCount: 52,
      location: args.location,
      parityRegime: args.parityRegime,
      avatar: initialsFromName(args.contactName),
      propertyImage: "photo-1551918120",
      style: "green",
      styleSecondary: "blue",
      description: "Hotel Manager at a steady boutique with a strong Key OTA position. Collaborative, analytical, and likes to weigh changes carefully against her own dashboards before committing. Treats Booking.com as a partner she actively co-plans with.",
      commercialGoal: "Maintain steady occupancy and continue refining margin"
    },
    metrics: {
      erpd: 1.3,
      erpdChange: 2.66,
      rpdPublic: 5.2,
      rpdLoyal: -2.3,
      losePricePublic: 35,
      activeScenarios: 3,
      activeScenarioNames: ["International", "Family 2+1", "Family 2+2"],
      competitor: "keyota",
      secondaryMetrics: {
        last30dAbrn: { value: 785, deltaPct: 6 },
        last30dRoomNights: { value: 540, deltaPct: 4 },
        last30dAdr: { value: 168, deltaPct: 1 },
        last90dPageViews: { value: 21200, deltaPct: 12 },
        last90dConversion: { value: 2.4, deltaPct: 8 },
        next3mRoomNights: { value: 410, deltaPct: 7 }
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
      rateParity: "clean"
    },
    metricHistory: [],
    trust: 60,
    relationship: "warm",
    discounts: [
      { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
      { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
      { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
      { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
      { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
      { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
      { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
      { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
      { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
      { id: "family-rates", label: "Family rates", status: "inactive", category: "foundations-payments" },
      { id: "payments", label: "Payments", status: "inactive", category: "foundations-payments" }
    ],
    conversationLog: [],
    pendingActions: []
  }];
}
function driftwoodBayBase(args) {
  return [{
    persona: {
      id: args.id,
      name: args.contactName,
      propertyName: "Driftwood Bay Resort",
      propertyType: "Resort",
      roomCount: 86,
      location: args.location,
      parityRegime: args.parityRegime,
      avatar: initialsFromName(args.contactName),
      propertyImage: "photo-1582719508461",
      style: "yellow",
      styleSecondary: "green",
      description: "Energetic resort manager who loves talking about the property and runs multiple pricing scenarios in parallel. Quick to engage, decisive once excited, and prefers conversational calls with concrete next steps over methodical exposition.",
      commercialGoal: "Grow incremental volume while keeping the brand premium"
    },
    metrics: {
      erpd: 3.4,
      erpdChange: 1.37,
      rpdPublic: 5.3,
      rpdLoyal: -1.5,
      losePricePublic: 99,
      activeScenarios: 4,
      activeScenarioNames: ["Brand Scenario", "App", "Family 2+1", "Family 2+2"],
      competitor: "brand",
      secondaryMetrics: {
        last30dAbrn: { value: 343, deltaPct: 2 },
        last30dRoomNights: { value: 260, deltaPct: -2 },
        last30dAdr: { value: 155, deltaPct: 3 },
        last90dPageViews: { value: 14800, deltaPct: 18 },
        last90dConversion: { value: 1.9, deltaPct: -8 },
        next3mRoomNights: { value: 200, deltaPct: -4 }
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
      rateParity: "minor"
    },
    metricHistory: [],
    trust: 55,
    relationship: "neutral",
    discounts: [
      { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
      { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
      { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
      { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
      { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
      { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
      { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
      { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
      { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
      { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
      { id: "payments", label: "Payments", status: "inactive", category: "foundations-payments" }
    ],
    conversationLog: [],
    pendingActions: []
  }];
}
function royalCrestBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Royal Crest Hotel",
        propertyType: "Hotel",
        roomCount: 101,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "red",
        styleSecondary: "blue",
        description: "Property Manager running several owners' properties with highly delegated commercial autonomy. Profit-first and protective of the direct channel - keeps a strict policy that no OTA takes more than 30% of the business. Direct and time-pressured, but evidence-driven: he wants proof and a controlled experiment before he commits, and rewards a tight ROI case." + (args.channelSignal ? " " + args.channelSignal : ""),
        commercialGoal: "Protect direct-channel margin and portfolio-wide RevPAR while filling unsold rooms"
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
        activeScenarioNames: ["App", "Mdot", "Brand Scenario"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 283, deltaPct: -22 },
          last30dRoomNights: { value: 325, deltaPct: 8 },
          last30dAdr: { value: 145, deltaPct: 5 },
          last90dPageViews: { value: 17518, deltaPct: 20 },
          last90dConversion: { value: 2.7, deltaPct: -4 },
          next3mRoomNights: { value: 259, deltaPct: -20 }
        },
        // SME doc showed 2026-05-12; against an authoring date of
        // 2026-08-03 that's 83 days back. Stored as an offset so the
        // gap stays constant across replays. The long gap fits the
        // low (20%) pricing coverage - an under-steered partner.
        lastPricingContactDaysAgo: 83,
        pricingCoverageQTD: 20,
        // SME metrics sheet (Partner Value ABRN 2025). Royal Crest is
        // the R1 call on pricing risk (99% Lose Price / Bucket 4).
        partnerValueAbrn: 365,
        // OPC layer from the SME sheet - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM), so it
        // is invisible at Round 1 but ready for the future round.
        opcMetrics: {
          unsoldRooms: { value: 50 },
          sellThroughRate: { value: 33, peerLabel: "below" },
          visibilityShare: { value: 10, peerValue: 18 },
          clickThroughRate: { value: 3.5, peerLabel: "below" },
          conversion: { value: 0.5, peerLabel: "below" },
          searchPrice: { value: 153, peerValue: 143 }
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 52,
        visibility: 82,
        conversion: 27,
        revenue: 40,
        discountQuality: 25,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Adoption mirrors the SME data set: only Family Rates is active.
      // No Genius, no public-pricing levers - he prices through his
      // direct brand site, which is exactly the gap.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "inactive", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "inactive", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "inactive", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function silverHorizonBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Silver Horizon Resort",
        propertyType: "Vacation Rental",
        roomCount: 61,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "blue",
        styleSecondary: "red",
        description: "Multi-Property Professional running a portfolio of vacation-rental units as an entrepreneurial business, with full commercial autonomy. Leads with net-revenue maths, margin optimization and strict ROI when balancing channels. Stands firm against aggressive Key OTA competitor calls and won't be drawn into a platform price war - she wants the ROI case, not a gross-rate argument.",
        commercialGoal: "Maximize net revenue and margin across the portfolio while balancing a mix of distribution channels"
      },
      // Metrics map to the SME Round 2 data set (Hotel ID 209). The
      // headline is the sharp +4.71 MoM spike in Key OTA eRPD against
      // otherwise strong platform demand - value leaking on the
      // International and Family segments.
      metrics: {
        erpd: 1.9,
        erpdChange: 4.71,
        rpdPublic: 3.9,
        rpdLoyal: -3,
        losePricePublic: 42,
        activeScenarios: 3,
        activeScenarioNames: ["International", "Family 2+1", "Family 2+2"],
        competitor: "keyota",
        secondaryMetrics: {
          last30dAbrn: { value: 389, deltaPct: -32 },
          last30dRoomNights: { value: 333, deltaPct: 119 },
          last30dAdr: { value: 128, deltaPct: -7 },
          last90dPageViews: { value: 16880, deltaPct: 71 },
          last90dConversion: { value: 4.2, deltaPct: 28 },
          next3mRoomNights: { value: 445, deltaPct: 81 }
        },
        // SME doc showed 2026-05-12; against an authoring date of
        // 2026-08-03 that's 83 days back. Stored as an offset.
        lastPricingContactDaysAgo: 83,
        pricingCoverageQTD: 14,
        // SME metrics sheet (Partner Value ABRN 2025). Silver Horizon is
        // the R2 call on the sharp eRPD spike and segment leakage.
        partnerValueAbrn: 538,
        // OPC layer from the SME sheet - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        opcMetrics: {
          unsoldRooms: { value: 15 },
          sellThroughRate: { value: 38, peerLabel: "below" },
          // SME data reconciliation: the Round 12 OPC conversation frames
          // visibility as sitting just ABOVE the peer median (the "demand
          // is there, you're losing them at checkout" lesson), so the tab
          // matches the call. The metrics sheet's 13% (below 15%)
          // contradicted its own transcript - kept at 17/15 per Chris.
          visibilityShare: { value: 17, peerValue: 15 },
          clickThroughRate: { value: 10, peerLabel: "above" },
          conversion: { value: 1.1, peerLabel: "in-line" },
          searchPrice: { value: 120, peerValue: 113 }
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 48,
        visibility: 90,
        conversion: 42,
        revenue: 45,
        discountQuality: 35,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Two products active per the SME data set: Genius Program and
      // Family Rates. Everything else inactive - the gap is the Key OTA
      // undercutting the International and Family scenarios, not a bare
      // toolkit.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "inactive", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "inactive", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function oceanViewBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Ocean View Resort",
        propertyType: "Resort",
        roomCount: 90,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "blue",
        styleSecondary: "red",
        description: "Property Manager for a vacation-rental agency running several owners' properties with highly delegated commercial autonomy. Values owner satisfaction and portfolio-wide RevPAR, and fiercely protects the agency's profitable direct channel - she deliberately keeps Booking.com marked up to push guests to book direct. Experienced and evidence-led: she changes course when the search-behavior logic and the data stack up, and commits to structured tests.",
        commercialGoal: "Protect the agency's direct-channel margin and owner satisfaction while recovering portfolio-wide RevPAR"
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
        activeScenarioNames: ["Brand Scenario", "App"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1, deltaPct: -100 },
          last30dRoomNights: { value: 132, deltaPct: -50 },
          last30dAdr: { value: 136, deltaPct: 4 },
          last90dPageViews: { value: 4140, deltaPct: -61 },
          last90dConversion: { value: 4.3, deltaPct: 39 },
          next3mRoomNights: { value: 123, deltaPct: -48 }
        },
        // SME doc showed 2025-10-28; against an authoring date of
        // 2026-08-03 that's 279 days back - a ~9-month gap that fits
        // the 0% pricing coverage (completely un-actioned).
        lastPricingContactDaysAgo: 279,
        pricingCoverageQTD: 0,
        // SME metrics sheet (Partner Value ABRN 2025). Ocean View is the
        // R3 call on visibility debt (97% Lose Price, page views -61%).
        partnerValueAbrn: 142,
        // SME-confirmed note (Irene, 2026-09-14): Family Rates stay Active
        // (the partner has implemented the product) but the data still
        // shows a family pricing opportunity - so flag it rather than
        // marking the product Inactive.
        productsNote: "Family Rates are active, but our data suggests a family pricing opportunity is still there - worth exploring rate and configuration optimization in the conversation.",
        // OPC layer from the SME doc - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM). Note the
        // headline search price is actually -3% vs peers; the real leak
        // is families indexing +8% from missing child rates.
        opcMetrics: {
          unsoldRooms: { value: 45 },
          sellThroughRate: { value: 15, peerLabel: "below" },
          visibilityShare: { value: 20, peerValue: 30 },
          clickThroughRate: { value: 4.9, peerLabel: "below" },
          conversion: { value: 1.1, peerLabel: "below" },
          searchPrice: { value: 140, peerValue: 144 }
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 55,
        visibility: 30,
        conversion: 62,
        revenue: 35,
        discountQuality: 30,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Three products active per the SME data set: Base Rate Plan,
      // Family Rates and Payments. No Genius, no targeted public-pricing
      // levers - she relies entirely on a flat base rate, which is the
      // gap.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "inactive", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "inactive", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "active", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "active", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function riversideBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Riverside Boutique Hotel",
        propertyType: "Boutique Hotel",
        roomCount: 49,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "blue",
        styleSecondary: "green",
        description: "General Manager of a boutique on a Marketing-Contract-Only deal - significant local autonomy, a soft-brand affiliation used mainly for marketing and loyalty reach. Values guest quality, boutique positioning and building direct relationships, and won't be dictated to on daily rate strategy. Inquisitive and data-led: he changes course when the logic is sound and delivered as a partnership, not a demand.",
        commercialGoal: "Grow high-quality occupancy and ADR while protecting boutique positioning and the direct channel"
      },
      // Metrics map to the SME Round 4 data set (Hotel ID 202). The
      // tells are the +6.56 MoM Key OTA eRPD spike, the Public 6.0% /
      // Loyal 0.3% split (non-genuine Genius discount), and family RPD
      // above couple RPD (unintentional family setup gap).
      metrics: {
        erpd: 3.3,
        erpdChange: 6.56,
        rpdPublic: 6,
        rpdLoyal: 0.3,
        losePricePublic: 47,
        activeScenarios: 3,
        activeScenarioNames: ["App", "Family 2+1", "Family 2+2"],
        competitor: "keyota",
        secondaryMetrics: {
          last30dAbrn: { value: 271, deltaPct: -59 },
          last30dRoomNights: { value: 300, deltaPct: 40 },
          last30dAdr: { value: 141, deltaPct: 8 },
          last90dPageViews: { value: 13239, deltaPct: 39 },
          last90dConversion: { value: 3.2, deltaPct: -3 },
          next3mRoomNights: { value: 608, deltaPct: 271 }
        },
        // SME doc showed 2026-05-12; against an authoring date of
        // 2026-08-03 that's 83 days back.
        lastPricingContactDaysAgo: 83,
        pricingCoverageQTD: 13,
        // SME metrics sheet (Partner Value ABRN 2025). The SME flags
        // eRPD x Partner Value as high for R4.
        partnerValueAbrn: 472,
        // Family Rates stay Active (the product is implemented) but the
        // data still shows a family pricing opportunity - the family
        // occupancy setup is not correctly configured, so family searches
        // see a full adult price. Flag it rather than marking it Inactive.
        productsNote: "Family Rates are active, but our data suggests a family pricing opportunity is still there - the family occupancy setup is not correctly configured, so family searches see a full adult price, which is worth reviewing in the conversation.",
        // OPC layer from the SME sheet - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        opcMetrics: {
          unsoldRooms: { value: 24 },
          sellThroughRate: { value: 41, peerLabel: "below" },
          visibilityShare: { value: 12, peerValue: 21 },
          clickThroughRate: { value: 7.8, peerLabel: "above" },
          conversion: { value: 1.7, peerLabel: "above" },
          searchPrice: { value: 161, peerValue: 150 }
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 50,
        visibility: 78,
        conversion: 44,
        revenue: 46,
        discountQuality: 30,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Two products active per the SME data set: Genius Program and
      // Family Rates. But both are mis-tuned - the Genius discount is
      // non-genuine and the family setup is incomplete, which is the gap.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "inactive", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "inactive", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function emeraldPeakBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Emerald Peak Lodge",
        propertyType: "Lodge",
        roomCount: 185,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "red",
        styleSecondary: "blue",
        description: "General Manager of a franchise lodge operating under chain brand standards with limited local autonomy. Values brand compliance and franchise standing, and is bound by central pricing and loyalty rules - head office keeps the direct site cheaper by policy. Direct, decisive and ROI-focused, but can't authorise anything that breaks internal rules; she'll move on a targeted, compliant solution, not a flat rate drop.",
        commercialGoal: "Hit revenue and occupancy targets while staying fully compliant with head-office rate policy"
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
        activeScenarioNames: ["Brand Scenario", "Family 2+2"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 444, deltaPct: 6 },
          last30dRoomNights: { value: 381, deltaPct: 110 },
          last30dAdr: { value: 158, deltaPct: 31 },
          last90dPageViews: { value: 14050, deltaPct: 72 },
          last90dConversion: { value: 5, deltaPct: 42 },
          next3mRoomNights: { value: 402, deltaPct: 98 }
        },
        // SME doc showed 2026-03-12; against an authoring date of
        // 2026-08-03 that's 144 days back - a ~5-month gap that fits the
        // 0% pricing coverage (completely un-actioned).
        lastPricingContactDaysAgo: 144,
        pricingCoverageQTD: 0,
        // SME metrics sheet (Partner Value ABRN 2025). Emerald Peak is
        // the R5 call on Bucket 6 / 100% Lose Price.
        partnerValueAbrn: 287,
        // OPC layer from the SME sheet - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        opcMetrics: {
          unsoldRooms: { value: 12 },
          sellThroughRate: { value: 29, peerLabel: "below" },
          visibilityShare: { value: 17, peerValue: 26 },
          clickThroughRate: { value: 7.7, peerLabel: "above" },
          conversion: { value: 0.9, peerLabel: "in-line" },
          searchPrice: { value: 171, peerValue: 155 }
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 58,
        visibility: 88,
        conversion: 60,
        revenue: 52,
        discountQuality: 34,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Genius Program, Family Rates and Payments active. The Genius
      // discount is nongenuine (base inflated to offset it). Family Rates
      // stays ACTIVE by design (Review Pack 3, second SME pass): this is a
      // nongenuine / misconfigured family setup, not a missing product -
      // the R5 conversation addresses it as "already active, review and
      // correct the configuration", not as switching it on. Last Minute
      // Deals is active per the SME metrics sheet.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "active", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "active", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function oceanfrontBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Oceanfront Bliss Lodge",
        propertyType: "Lodge",
        roomCount: 309,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "blue",
        styleSecondary: "red",
        description: "Owner of an independent lodge with full local autonomy - she sets rates and distribution herself, values simple ROI and occupancy, and is quick to act on a clear commercial incentive. Protects her direct channel and caps OTA share at 30%, but she's persuadable: land the acquisition-cost math and she'll move fast.",
        commercialGoal: "Maximize ROI and occupancy across channels while protecting the direct-booking base"
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
        activeScenarioNames: ["Brand Scenario"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 13, deltaPct: -84 },
          last30dRoomNights: { value: 71, deltaPct: -34 },
          last30dAdr: { value: 159, deltaPct: 23 },
          last90dPageViews: { value: 2448, deltaPct: -89 },
          last90dConversion: { value: 4.8, deltaPct: 17 },
          next3mRoomNights: { value: 113, deltaPct: -56 }
        },
        // SME doc showed 2026-03-12; against an authoring date of
        // 2026-08-05 that's 146 days back - a ~5-month gap that fits the
        // 0% pricing coverage (completely un-actioned).
        lastPricingContactDaysAgo: 146,
        pricingCoverageQTD: 0,
        // SME metrics sheet (Partner Value ABRN 2025). Oceanfront is the
        // R6 call on Bucket 6 / visibility debt.
        partnerValueAbrn: 1940,
        // OPC layer from the SME sheet - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        opcMetrics: {
          unsoldRooms: { value: 17 },
          sellThroughRate: { value: 19, peerLabel: "below" },
          visibilityShare: { value: 17, peerValue: 25 },
          clickThroughRate: { value: 1.7, peerLabel: "below" },
          conversion: { value: 0.5, peerLabel: "below" },
          searchPrice: { value: 155, peerValue: 149 }
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 58,
        visibility: 20,
        conversion: 62,
        revenue: 40,
        discountQuality: 28,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Per the SME metrics sheet: Base Rate Plan, Family Rates and
      // Payments active. No Genius, no targeted public pricing - a lean,
      // direct-first setup.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "inactive", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "inactive", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "active", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "active", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function palaceGrandBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Palace Grand Resort",
        propertyType: "Resort",
        roomCount: 70,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "green",
        styleSecondary: "blue",
        description: "Operations Manager at an independent resort with full local autonomy - practical, ROI-minded, and collaborative. He gives every channel the same net rate to keep things simple, and he weighs every recommendation against the operational load on his front desk. Persuade him it's an easy, low-friction fix backed by the numbers and he'll set it up with you on the spot.",
        commercialGoal: "Recover on-platform visibility and occupancy through low-friction setup fixes, without a price war"
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
        activeScenarioNames: ["Mdot", "Family 2+1", "Family 2+2"],
        competitor: "keyota",
        secondaryMetrics: {
          last30dAbrn: { value: 267, deltaPct: -46 },
          last30dRoomNights: { value: 349, deltaPct: 49 },
          last30dAdr: { value: 216, deltaPct: 6 },
          last90dPageViews: { value: 6553, deltaPct: -53 },
          last90dConversion: { value: 4, deltaPct: 45 },
          next3mRoomNights: { value: 435, deltaPct: -9 }
        },
        // SME doc showed 2026-02-11; against an authoring date of
        // 2026-08-05 that's 175 days back - a ~6-month gap that fits the
        // 0% pricing coverage despite the huge +10.95 MoM spike.
        lastPricingContactDaysAgo: 175,
        pricingCoverageQTD: 0,
        // SME metrics sheet (Partner Value ABRN 2025). Palace Grand is
        // the R7 call on Bucket 5 / +10.95 spike.
        partnerValueAbrn: 433,
        // Family Rates stay Active (the product is implemented) but the
        // data still shows a family pricing opportunity - the family setup
        // can be optimized to capture more of the family demand. Flag it
        // rather than marking the product Inactive.
        productsNote: "Family Rates are active, but our data suggests a family pricing opportunity is still there - the family setup can be optimized to capture more of the family demand, which is worth exploring in the conversation.",
        // OPC layer from the SME sheet - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM).
        // Visibility is holding (17% vs 16% peer); search price €239 vs
        // €249 peer (below) and conversion is weak, driving 21% unsold.
        opcMetrics: {
          unsoldRooms: { value: 21 },
          sellThroughRate: { value: 44, peerLabel: "below" },
          visibilityShare: { value: 17, peerValue: 16 },
          clickThroughRate: { value: 2.3, peerLabel: "below" },
          conversion: { value: 0.5, peerLabel: "below" },
          searchPrice: { value: 239, peerValue: 249 }
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 52,
        visibility: 42,
        conversion: 66,
        revenue: 50,
        discountQuality: 44,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Four products active per the SME data set: Mobile Rates (active
      // but misconfigured - excluded dates + two rate plans), Genius
      // Program, Family Rates and Payments.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "active", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "inactive", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "inactive", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "active", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function hiddenValleyBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "The Hidden Valley Resort",
        propertyType: "Resort",
        roomCount: 77,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "blue",
        styleSecondary: "red",
        description: "Revenue Manager at a franchise property with limited local autonomy - she works to a central, brand-mandated policy and leads with the data. Head office keeps the direct site cheaper by design to 'own' the guest, and she reads Booking Sponsored Benefit as Booking.com taking control of her price. She guards her brand reputation closely and won't be rushed into a decision.",
        commercialGoal: "Protect brand reputation and direct-booking share while staying compliant with head-office pricing policy"
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
        activeScenarioNames: ["Family 2+1", "Family 2+2", "Brand Scenario"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 255, deltaPct: 65 },
          last30dRoomNights: { value: 324, deltaPct: -8 },
          last30dAdr: { value: 165, deltaPct: 5 },
          last90dPageViews: { value: 13668, deltaPct: 2 },
          last90dConversion: { value: 3.4, deltaPct: -6 },
          next3mRoomNights: { value: 222, deltaPct: -50 }
        },
        // SME doc showed 2025-12-19; against an authoring date of
        // 2026-08-05 that's 229 days back - a ~7.5-month gap that fits the
        // 0% pricing coverage (her uncompetitive setup has been missed).
        lastPricingContactDaysAgo: 229,
        pricingCoverageQTD: 0,
        // SME metrics sheet (Partner Value ABRN 2025). Hidden Valley is
        // the R8 call on Bucket 5 / structural Brand gap.
        partnerValueAbrn: 218,
        // OPC layer from the SME sheet - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM). Search
        // price €175 vs €159 peer with visibility share 21% vs 28% median.
        opcMetrics: {
          unsoldRooms: { value: 24 },
          sellThroughRate: { value: 22, peerLabel: "below" },
          visibilityShare: { value: 21, peerValue: 28 },
          clickThroughRate: { value: 5.4, peerLabel: "above" },
          conversion: { value: 1.2, peerLabel: "above" },
          searchPrice: { value: 175, peerValue: 159 }
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 52,
        visibility: 46,
        conversion: 58,
        revenue: 48,
        discountQuality: 40,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Three products active per the SME data set: Portfolio Deals,
      // Family Rates and Payments. No Genius (Public RPD = Loyal RPD,
      // consistent with no Genius discount running); BSB / Payments is
      // the shield she relies on.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "inactive", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "inactive", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "active", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "inactive", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "inactive", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "inactive", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "active", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function loftLivingBase(args) {
  return [
    {
      persona: {
        id: args.id,
        name: args.contactName,
        propertyName: "Loft Living Inn",
        propertyType: "Vacation Rental",
        roomCount: 190,
        location: args.location,
        parityRegime: args.parityRegime,
        avatar: initialsFromName(args.contactName),
        propertyImage: args.propertyImage,
        style: "red",
        styleSecondary: "blue",
        description: "PMC Revenue Manager running a portfolio of vacation-rental units as a commercially minded business with strong autonomy. He responds to revenue impact, margin logic, and ROI across channels, and he wants proof before he moves. He's frustrated that his B2B / wholesale rates are leaking into public search and blames Booking.com for surfacing them - lead with the commercial case, not a price cut.",
        commercialGoal: "Protect ADR and profit margin while recovering lost visibility and demand across channels"
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
        activeScenarioNames: ["Wholesaler", "App", "Brand Scenario"],
        competitor: "keyota",
        secondaryMetrics: {
          last30dAbrn: { value: 170, deltaPct: -28 },
          last30dRoomNights: { value: 88, deltaPct: -44 },
          last30dAdr: { value: 64, deltaPct: 88 },
          last90dPageViews: { value: 23115, deltaPct: 65 },
          last90dConversion: { value: 0.7, deltaPct: -68 },
          next3mRoomNights: { value: 25, deltaPct: -46 }
        },
        // SME doc showed 2026-04-12; against an authoring date of
        // 2026-08-05 that's 115 days back - a ~3.8-month gap.
        lastPricingContactDaysAgo: 115,
        pricingCoverageQTD: 20,
        // SME metrics sheet (Partner Value ABRN 2025). Bucket 7 alone
        // makes Loft Living the obvious R9 call.
        partnerValueAbrn: 216,
        // OPC layer from the SME sheet - only surfaced when the On
        // Platform Competitiveness tab unlocks (Level 2 / KAM). Search
        // price €67 vs €60 peer, visibility 8% vs 23% median.
        opcMetrics: {
          unsoldRooms: { value: 33 },
          sellThroughRate: { value: 30, peerLabel: "below" },
          visibilityShare: { value: 8, peerValue: 23 },
          clickThroughRate: { value: 3.2, peerLabel: "below" },
          conversion: { value: 0.8, peerLabel: "below" },
          searchPrice: { value: 67, peerValue: 60 }
        },
        // Legacy fields - kept for type compatibility.
        experiencedRPD: 85,
        visibility: 22,
        conversion: 28,
        revenue: 44,
        discountQuality: 30,
        rateParity: "major"
      },
      metricHistory: [],
      trust: 50,
      relationship: "neutral",
      // Heavily-tooled MPP per the SME data set: Mobile Rates, Country
      // Rates, Portfolio Deals, Campaigns, Genius Program, Family Rates
      // and Payments all active. The mobile rate is active but
      // misconfigured (weekends + long windows excluded) - the fenced fix.
      discounts: [
        { id: "mobile-rate", label: "Mobile Rates", status: "active", category: "public-pricing" },
        { id: "country-rate", label: "Country Rates", status: "active", category: "public-pricing" },
        { id: "portfolio-deals", label: "Portfolio Deals", status: "active", category: "public-pricing" },
        { id: "campaigns", label: "Campaigns", status: "active", category: "public-pricing" },
        { id: "last-minute", label: "Last Minute Deals", status: "inactive", category: "public-pricing" },
        { id: "early-booker", label: "Early Booker Deal", status: "inactive", category: "public-pricing" },
        { id: "genius-programme", label: "Genius Program", status: "active", category: "genius-pricing" },
        { id: "genius-15", label: "Genius 15%", status: "inactive", category: "genius-pricing" },
        { id: "genius-20", label: "Genius 20%", status: "inactive", category: "genius-pricing" },
        { id: "genius-dynamic", label: "Genius dynamic pricing", status: "inactive", category: "genius-pricing" },
        { id: "base-rate-plan", label: "Base Rate Plan", status: "inactive", category: "foundations-payments" },
        { id: "family-rates", label: "Family rates", status: "active", category: "foundations-payments" },
        { id: "payments", label: "Payments", status: "active", category: "foundations-payments" }
      ],
      conversationLog: [],
      pendingActions: []
    }
  ];
}
function withKamPills(states, pills) {
  return states.map((s) => ({ ...s, persona: { ...s.persona, ...pills } }));
}
var initialPartners = [
  // ── Loft Living Inn (SME Round 9 priority, all three regimes) ──
  // SEVERE Key OTA gap (eRPD 31.7% / Bucket 7, +30.75 MoM) from a B2B /
  // wholesale rate leak into public B2C via Partner Offer. High ADR (+88%
  // vs peer) masks a collapse in room nights (-44%) and conversion
  // (-68%). Objection: The Wholesaler Leak + Competitive Aggression. Ends
  // on a SOFT NO - the win is a compliant, trust-preserving conversation
  // that reframes B2B as a leakage tax and offers a fenced mobile fix.
  ...loftLivingBase({
    id: "loft-living-wide",
    parityRegime: "wide",
    location: "Kurokawa-Shi, State of Shinano",
    contactName: "Lucas Silva",
    propertyImage: "photo-1502672260266"
  }),
  ...loftLivingBase({
    id: "loft-living-narrow",
    parityRegime: "narrow",
    location: "Kurokawa-Shi, State of Shinano",
    contactName: "Lucas Silva",
    propertyImage: "photo-1560448204"
  }),
  ...loftLivingBase({
    id: "loft-living-none",
    parityRegime: "none",
    location: "Kurokawa-Shi, State of Shinano",
    contactName: "Lucas Silva",
    propertyImage: "photo-1522708323590"
  }),
  // ── The Hidden Valley Resort (SME Round 8 priority, all three regimes) ──
  // Structural Brand.com gap (eRPD 7.3% / Bucket 5), Public RPD = Loyal
  // RPD = 7.3% (no Genius gap - leaning on BSB to equalize). Objection:
  // BSB / Payments Shield + Direct-Is-Cheaper + Family Ready. Ends on a
  // SOFT NO - the win is a compliant, trust-preserving conversation that
  // reframes BSB as a shield and earns a follow-up, not a same-call yes.
  ...hiddenValleyBase({
    id: "hidden-valley-wide",
    parityRegime: "wide",
    location: "Altenstrad, Federal Republic of Eldon",
    contactName: "Claire Thornton",
    propertyImage: "photo-1596436889106"
  }),
  ...hiddenValleyBase({
    id: "hidden-valley-narrow",
    parityRegime: "narrow",
    location: "Altenstrad, Federal Republic of Eldon",
    contactName: "Claire Thornton",
    propertyImage: "photo-1610641818989"
  }),
  ...hiddenValleyBase({
    id: "hidden-valley-none",
    parityRegime: "none",
    location: "Altenstrad, Federal Republic of Eldon",
    contactName: "Claire Thornton",
    propertyImage: "photo-1571896349842"
  }),
  // ── Palace Grand Resort (SME Round 7 priority, all three regimes) ──
  // Key OTA gap with a sharp +10.95 MoM eRPD spike (Bucket 5, Lose Price
  // 60%), concentrated in mobile (Mdot) and family (2+1 / 2+2) searches
  // where the competitor undercuts. Strong conversion (+45%) but page
  // views -53%. Objection: The Same Net Mindset + Competitive Aggression
  // + Family Ready. The win is refusing the price war, opening the family
  // segment, and fixing the misconfigured mobile rate - not a rate cut.
  ...palaceGrandBase({
    id: "palace-grand-wide",
    parityRegime: "wide",
    location: "Mont Bellerive, Grand Duchy of Valence",
    contactName: "Ethan Nkosi",
    propertyImage: "photo-1571003123894"
  }),
  ...palaceGrandBase({
    id: "palace-grand-narrow",
    parityRegime: "narrow",
    location: "Mont Bellerive, Grand Duchy of Valence",
    contactName: "Ethan Nkosi",
    propertyImage: "photo-1566073771259"
  }),
  ...palaceGrandBase({
    id: "palace-grand-none",
    parityRegime: "none",
    location: "Mont Bellerive, Grand Duchy of Valence",
    contactName: "Ethan Nkosi",
    propertyImage: "photo-1582719508461"
  }),
  // ── Oceanfront Bliss Lodge (SME Round 6 priority, all three regimes) ──
  // Intentional Brand.com gap from a deliberate ~10% direct-cheaper play
  // (Brand.com Loyalty + reverse-billboard) - Lose Price 66%, Bucket 6,
  // page views -89% despite strong conversion. Objection: Brand.com
  // Loyalty + Billboard Effect in Reverse. The win is the
  // acquisition-cost math, not a flat rate drop.
  ...oceanfrontBase({
    id: "oceanfront-wide",
    parityRegime: "wide",
    location: "Nusa Merah, Republic of Nusantara",
    contactName: "Priya Singh",
    propertyImage: "photo-1520250497591"
  }),
  ...oceanfrontBase({
    id: "oceanfront-narrow",
    parityRegime: "narrow",
    location: "Nusa Merah, Republic of Nusantara",
    contactName: "Priya Singh",
    propertyImage: "photo-1533105079780"
  }),
  ...oceanfrontBase({
    id: "oceanfront-none",
    parityRegime: "none",
    location: "Nusa Merah, Republic of Nusantara",
    contactName: "Priya Singh",
    propertyImage: "photo-1499793983690"
  }),
  // ── Emerald Peak Lodge (SME Round 5 priority, all three regimes) ──
  // Intentional Brand.com gap driven by a franchise "Direct-is-Cheaper"
  // head-office policy - Lose Price 100%, Bucket 6, yet winning on demand
  // (+110% room nights vs peer). Objection: Direct-is-Cheaper + Segmented
  // Pricing + Family Ready. The win is a compliant, fenced family rate.
  ...emeraldPeakBase({
    id: "emerald-peak-wide",
    parityRegime: "wide",
    location: "Arnesund, Kingdom of Norland",
    contactName: "Sophia Chen",
    propertyImage: "photo-1566073771259"
  }),
  ...emeraldPeakBase({
    id: "emerald-peak-narrow",
    parityRegime: "narrow",
    location: "Arnesund, Kingdom of Norland",
    contactName: "Sophia Chen",
    propertyImage: "photo-1551882547"
  }),
  ...emeraldPeakBase({
    id: "emerald-peak-none",
    parityRegime: "none",
    location: "Arnesund, Kingdom of Norland",
    contactName: "Sophia Chen",
    propertyImage: "photo-1512917774080"
  }),
  // ── Riverside Boutique Hotel (SME Round 4 priority, all three regimes) ──
  // Key OTA gap with a sharp +6.56 MoM eRPD spike, an unintentional
  // family setup gap and a non-genuine Genius discount, behind a "Value
  // Proposition Wall" (deliberate 30% volume cap). Objection: Value
  // Proposition Wall + Slippery Road + Segmented Pricing + Family Ready.
  ...riversideBase({
    id: "riverside-wide",
    parityRegime: "wide",
    location: "Clayton-on-Mersey, Federal State of Kenshire",
    contactName: "Anton M\xFCller",
    propertyImage: "photo-1582719508461"
  }),
  ...riversideBase({
    id: "riverside-narrow",
    parityRegime: "narrow",
    location: "Clayton-on-Mersey, Federal State of Kenshire",
    contactName: "Anton M\xFCller",
    propertyImage: "photo-1571896349842"
  }),
  ...riversideBase({
    id: "riverside-none",
    parityRegime: "none",
    location: "Clayton-on-Mersey, Federal State of Kenshire",
    contactName: "Anton M\xFCller",
    propertyImage: "photo-1602002418082"
  }),
  // ── Ocean View Resort (SME Round 3 priority, all three regimes) ──
  // Brand.com Competitiveness Gap driven by the Billboard Effect in
  // Reverse - Camila keeps Booking.com marked up 5.5% to push direct
  // bookings; the result is visibility debt (converts +39% vs peer but
  // page views -61%). Objection: Billboard Effect in Reverse + Segmented
  // Pricing. Retires Noble Falcon as the R3 priority.
  ...oceanViewBase({
    id: "ocean-view-wide",
    parityRegime: "wide",
    location: "San Carlos Port, United States of Marisot",
    contactName: "Camila Ross",
    propertyImage: "photo-1520250497591"
  }),
  ...oceanViewBase({
    id: "ocean-view-narrow",
    parityRegime: "narrow",
    location: "San Carlos Port, United States of Marisot",
    contactName: "Camila Ross",
    propertyImage: "photo-1502920917128"
  }),
  ...oceanViewBase({
    id: "ocean-view-none",
    parityRegime: "none",
    location: "San Carlos Port, United States of Marisot",
    contactName: "Camila Ross",
    propertyImage: "photo-1533105079780"
  }),
  // ── Silver Horizon Resort (SME Round 2 priority, all three regimes) ──
  // Key OTA Competitiveness Gap - Key OTA undercutting via margin cuts
  // on the International and Family segments. Strong platform demand but
  // ABRN -32% YoY. Objection: Competitive Aggression + Same Net Mindset
  // + Family Ready. Retires Velvet Sky as the R2 priority.
  ...silverHorizonBase({
    id: "silver-horizon-wide",
    parityRegime: "wide",
    location: "Santa Delmar, Republic of Valora",
    contactName: "Chloe Davies",
    propertyImage: "photo-1512917774080"
  }),
  ...silverHorizonBase({
    id: "silver-horizon-narrow",
    parityRegime: "narrow",
    location: "Santa Delmar, Republic of Valora",
    contactName: "Chloe Davies",
    propertyImage: "photo-1499793983690"
  }),
  ...silverHorizonBase({
    id: "silver-horizon-none",
    parityRegime: "none",
    location: "Santa Delmar, Republic of Valora",
    contactName: "Chloe Davies",
    propertyImage: "photo-1540541338287"
  }),
  // ── Royal Crest Hotel (SME Round 1 priority, all three regimes) ──
  // Brand.com Competitiveness Gap - Liam O'Connell protects his direct
  // channel; page views +20% vs peer but conversion and forward pace
  // lag because his own site undercuts Booking.com. Objection: The
  // Segmented Pricing Conversation + Brand.com Loyalty. Retires Crystal
  // Water as the R1 priority.
  ...royalCrestBase({
    id: "royal-crest-wide",
    parityRegime: "wide",
    location: "West Haven, Republic of Alden",
    contactName: "Liam O'Connell",
    propertyImage: "photo-1566073771259",
    channelSignal: "Going into the call, our data shows he is running a targeted mobile promotion on a competing OTA that is not matched on Booking.com, so mobile and international demand is leaking to that channel."
  }),
  ...royalCrestBase({
    id: "royal-crest-narrow",
    parityRegime: "narrow",
    location: "West Haven, Republic of Alden",
    contactName: "Liam O'Connell",
    propertyImage: "photo-1551882547",
    channelSignal: "Going into the call, our data shows he runs a targeted 'Long Stay' deal on his own direct website that he has not extended to Booking.com."
  }),
  ...royalCrestBase({
    id: "royal-crest-none",
    parityRegime: "none",
    location: "West Haven, Republic of Alden",
    contactName: "Liam O'Connell",
    propertyImage: "photo-1520250497591",
    channelSignal: "Going into the call, our data shows his share of US travelers is tracking below his peer group, with no US-specific rate live on Booking.com."
  }),
  // ── Crystal Water Resort (Wide Parity) ──
  // SME-approved R1 priority - Brand.com Competitiveness Gap caused
  // by Sarah's promotional rate on her direct brand site undercutting
  // Booking.com. Same hotel brand + contact (Sarah Bennett) shows up
  // in all three regime variants - only location, parityRegime, the
  // property image, and the partner id differ. Data sourced from SME
  // spreadsheet row 9. Location is fictional and regime-neutral (it
  // does not signal a parity regime).
  ...crystalWaterBase({
    id: "crystal-water-wide",
    parityRegime: "wide",
    location: "Valdecosta, Republic of Marenza",
    contactName: "Sarah Mitchell",
    propertyImage: "photo-1582719508461"
  }),
  // ── Crystal Water Resort (Narrow Parity) ──
  ...crystalWaterBase({
    id: "crystal-water-narrow",
    parityRegime: "narrow",
    location: "Valdecosta, Republic of Marenza",
    contactName: "Sarah Bennett",
    propertyImage: "photo-1571896349842"
  }),
  // ── Crystal Water Resort (No Parity) ──
  // The No-Parity R1 priority partner today.
  ...crystalWaterBase({
    id: "crystal-water-none",
    parityRegime: "none",
    location: "Valdecosta, Republic of Marenza",
    contactName: "Sarah Beltr\xE1n",
    propertyImage: "photo-1602002418082"
  }),
  // ── Velvet Sky Boutique Hotel (Wide Parity) ──
  // SME-approved R2 priority - Brand.com Competitiveness Gap caused
  // by John's aggressive public discounting on his direct brand
  // site. Same hotel brand + contact (John Whitford) across all
  // three regime variants - only location, parityRegime, the
  // property image, and the partner id differ. Data sourced from
  // SME spreadsheet row 34. Location is fictional and regime-neutral.
  ...velvetSkyBase({
    id: "velvet-sky-wide",
    parityRegime: "wide",
    location: "Highmoor, Kingdom of Estland",
    contactName: "John Whitfield",
    propertyImage: "photo-1566073771259"
  }),
  // ── Velvet Sky Boutique Hotel (Narrow Parity) ──
  ...velvetSkyBase({
    id: "velvet-sky-narrow",
    parityRegime: "narrow",
    location: "Highmoor, Kingdom of Estland",
    contactName: "John Whitford",
    propertyImage: "photo-1568084680786"
  }),
  // ── Velvet Sky Boutique Hotel (No Parity) ──
  // The No-Parity R2 priority partner today.
  ...velvetSkyBase({
    id: "velvet-sky-none",
    parityRegime: "none",
    location: "Highmoor, Kingdom of Estland",
    contactName: "John Vela",
    propertyImage: "photo-1570214476695"
  }),
  // ── Raven Inn - R2 distractor across all three regimes ──
  // Healthy Key OTA gap profile (Bucket 3, Lose Price 35%). Data
  // mapped from SME spreadsheet Key OTA sheet row 14 (White Cliffs
  // Hotel) with a made-up partner name. Reads as not the priority
  // vs Velvet Sky Boutique Hotel at R2. Locations are fictional and
  // regime-neutral. Narrow + Wide variants
  // alias back to the base `raven-inn` for conversation + baseline
  // lookups via the regime-suffix fallback.
  ...ravenInnBase({ id: "raven-inn", parityRegime: "none", location: "Thornwick, Duchy of Brammark", contactName: "Emily Castro" }),
  ...ravenInnBase({ id: "raven-inn-narrow", parityRegime: "narrow", location: "Thornwick, Duchy of Brammark", contactName: "Emily Carter" }),
  ...ravenInnBase({ id: "raven-inn-wide", parityRegime: "wide", location: "Thornwick, Duchy of Brammark", contactName: "Emily Carter" }),
  // ── Driftwood Bay Resort - R2 distractor across all three regimes ──
  // Moderate Brand gap profile (Bucket 4, eRPD 3.4%). Data mapped
  // from SME spreadsheet mix sheet row 43 (The Oasis Palms Resort)
  // with a made-up partner name. Reads as not the priority vs
  // Velvet Sky Boutique Hotel at R2. Locations are fictional and regime-neutral.
  ...driftwoodBayBase({ id: "driftwood-bay", parityRegime: "none", location: "Coralport, Republic of Sarabaya", contactName: "Daniel Cruz" }),
  ...driftwoodBayBase({ id: "driftwood-bay-narrow", parityRegime: "narrow", location: "Coralport, Republic of Sarabaya", contactName: "Daniel Crawford" }),
  ...driftwoodBayBase({ id: "driftwood-bay-wide", parityRegime: "wide", location: "Coralport, Republic of Sarabaya", contactName: "Daniel Cruz" }),
  // ── Marina - Boutique City Hotel (Blue/Thinker) ──
  // Three regime variants. The conversations / persona hints / per-
  // round baselines registered against the base id `marina` are
  // reused by the `-narrow` and `-wide` variants via the regime-
  // suffix alias fallback in getConversationTree / getPartnerBaseline
  // / getPersonaHint. Contact + property name stay constant; only
  // location, parityRegime, and id differ across variants.
  ...marinaBase({ id: "marina", parityRegime: "none", location: "Solenne, Republic of Casteaux", contactName: "Marina Alvarez" }),
  ...marinaBase({ id: "marina-narrow", parityRegime: "narrow", location: "Solenne, Republic of Casteaux", contactName: "Marina Ashworth" }),
  ...marinaBase({ id: "marina-wide", parityRegime: "wide", location: "Solenne, Republic of Casteaux", contactName: "Marina Brown" }),
  // ── The Noble Falcon Inn (SME Round 10 priority, all three regimes) ──
  // The final Level 1 round and Noble Falcon's true home (Sheet 7 places
  // it at Round 10). Structural Brand.com gap (eRPD 17% / Bucket 7)
  // fronted by The Risky Guest objection. Contact is Adam Cole across all
  // three regimes; only location + parityRegime + the regime-specific
  // dialogue change (see noble-falcon-{wide,narrow,none}-r10.ts). Ends on
  // a strong no - Adam shuts the call down without committing.
  ...nobleFalconBase({
    id: "noble-falcon-wide",
    parityRegime: "wide",
    location: "Port Al-Qasira, Emirate of Qasira",
    contactName: "Adam Cole",
    propertyImage: "photo-1542314831"
  }),
  ...nobleFalconBase({
    id: "noble-falcon-narrow",
    parityRegime: "narrow",
    location: "Port Al-Qasira, Emirate of Qasira",
    contactName: "Adam Cole",
    propertyImage: "photo-1455587734955"
  }),
  ...nobleFalconBase({
    id: "noble-falcon-none",
    parityRegime: "none",
    location: "Port Al-Qasira, Emirate of Qasira",
    contactName: "Adam Cole",
    propertyImage: "photo-1551918120"
  }),
  // ── Carlos - City Apartment Complex - distractor across all regimes ──
  // Surface-healthy KPIs at R1 with a misconfigured Country Rate
  // hiding in the discount list (the R3 trap). Locations are fictional
  // and regime-neutral; Narrow + Wide alias back to `carlos` for trees/baselines.
  ...carlosBase({ id: "carlos", parityRegime: "none", location: "Puerto Vialta, Republic of Andira", contactName: "Carlos Rivera" }),
  ...carlosBase({ id: "carlos-narrow", parityRegime: "narrow", location: "Puerto Vialta, Republic of Andira", contactName: "Carlos Reeves" }),
  ...carlosBase({ id: "carlos-wide", parityRegime: "wide", location: "Puerto Vialta, Republic of Andira", contactName: "Carlos Rivera" }),
  // ── Cross-Regional (KAM) partner companies ──────────────────────────
  // The ten lead hotels reframed as their parent partner companies for
  // the KAM journey. Each reuses the hotel's base metrics (already the
  // KAM deck values) and adds the company name + four pills. Contact and
  // persona style come from the base helper; parityRegime is the
  // company's fixed market regime from the KAM playbook page 1. Every
  // property image is a verified Unsplash URL already used in the
  // roster (same SCORM debt as the rest - swap to bundled WebP before
  // the final package).
  ...withKamPills(
    royalCrestBase({ id: "royal-crest-cross-regional", parityRegime: "wide", location: "West Haven, Republic of Alden", contactName: "Liam O'Connell", propertyImage: "photo-1566073771259", channelSignal: "Going into the call, our data shows he is running a targeted mobile promotion on a competing OTA that is not matched on Booking.com, so mobile and international demand is leaking to that channel." }),
    { companyName: "Alden Harbour Hotel Management", partnerType: "Hotel Management Company", hqLocation: "Republic of Alden", numberOfProperties: 26 }
  ),
  ...withKamPills(
    silverHorizonBase({ id: "silver-horizon-cross-regional", parityRegime: "wide", location: "Santa Delmar, Republic of Valora", contactName: "Chloe Davies", propertyImage: "photo-1512917774080" }),
    { companyName: "Valora Bay Hotel Investments", partnerType: "Ownership Group", hqLocation: "Republic of Valora", numberOfProperties: 66 }
  ),
  ...withKamPills(
    oceanViewBase({ id: "ocean-view-cross-regional", parityRegime: "narrow", location: "San Carlos Port, United States of Marisot", contactName: "Camila Ross", propertyImage: "photo-1520250497591" }),
    { companyName: "Marisot Harbour Hotel Management", partnerType: "Hotel Management Company", hqLocation: "United States of Marisot", numberOfProperties: 180 }
  ),
  ...withKamPills(
    riversideBase({ id: "riverside-cross-regional", parityRegime: "none", location: "Clayton-on-Mersey, Federal State of Kenshire", contactName: "Anton M\xFCller", propertyImage: "photo-1582719508461" }),
    { companyName: "Kenshire Golf & Leisure Group", partnerType: "Hotel Management Company", hqLocation: "Federal State of Kenshire", numberOfProperties: 54 }
  ),
  ...withKamPills(
    emeraldPeakBase({ id: "emerald-peak-cross-regional", parityRegime: "narrow", location: "Arnesund, Kingdom of Norland", contactName: "Sophia Chen", propertyImage: "photo-1499793983690" }),
    { companyName: "Norland Highland Hotels", partnerType: "Managed Chain", hqLocation: "Kingdom of Norland", numberOfProperties: 1850 }
  ),
  ...withKamPills(
    oceanfrontBase({ id: "oceanfront-cross-regional", parityRegime: "wide", location: "Nusa Merah, Republic of Nusantara", contactName: "Priya Singh", propertyImage: "photo-1540541338287" }),
    { companyName: "Nusantara Coast Hotels", partnerType: "Managed Chain", hqLocation: "Republic of Nusantara", numberOfProperties: 997 }
  ),
  ...withKamPills(
    palaceGrandBase({ id: "palace-grand-cross-regional", parityRegime: "none", location: "Mont Bellerive, Grand Duchy of Valence", contactName: "Ethan Nkosi", propertyImage: "photo-1571003123894" }),
    { companyName: "Bellerive Hospitality Group", partnerType: "Managed Chain", hqLocation: "Grand Duchy of Valence", numberOfProperties: 22 }
  ),
  ...withKamPills(
    hiddenValleyBase({ id: "hidden-valley-cross-regional", parityRegime: "narrow", location: "Altenstrad, Federal Republic of Eldon", contactName: "Claire Thornton", propertyImage: "photo-1596436889106" }),
    { companyName: "Eldon Valley Managed Hotels", partnerType: "Managed Chain", hqLocation: "Federal Republic of Eldon", numberOfProperties: 47 }
  ),
  ...withKamPills(
    loftLivingBase({ id: "loft-living-cross-regional", parityRegime: "wide", location: "Kurokawa-Shi, State of Shinano", contactName: "Lucas Silva", propertyImage: "photo-1502672260266" }),
    { companyName: "Shinano River Ownership Group", partnerType: "Ownership Group", hqLocation: "State of Shinano", numberOfProperties: 819 }
  ),
  ...withKamPills(
    nobleFalconBase({ id: "noble-falcon-cross-regional", parityRegime: "none", location: "Port Al-Qasira, Emirate of Qasira", contactName: "Adam Cole", propertyImage: "photo-1542314831" }),
    { companyName: "Qasira Highlands Hospitality Group", partnerType: "Ownership Group", hqLocation: "Emirate of Qasira", numberOfProperties: 25 }
  )
];

// src/data/scenarios/john-r1.ts
var johnR1 = {
  conversationShape: "branching",
  partnerId: "john",
  round: 1,
  issueTreePath: {
    trigger: "performance-outcome",
    issueId: "brand-com-erpd-not-competitive",
    intent: "intentional",
    rootCauseId: "structural-brand-first",
    metricInsightId: "structural-constant-non-competitive-erpd",
    hookId: "base-rate-misalignment"
  },
  steps: [
    // ── 1. Open: surface his current strategy ──
    {
      id: "open",
      label: "Open",
      partnerPrompt: "Hi! What did you want to discuss today? I hope it's not another conversation about all the discounts you have on the extranet.",
      options: [
        {
          id: "john-r1-open-curious",
          label: "Ask how he's driving direct traffic",
          description: "Lead with curiosity about his direct-booking focus. Get him talking before raising any concerns.",
          playerDialogue: "Don't worry, no discount pitch today. I wanted to follow up on your direct-booking focus. How are you currently driving traffic to your own site?",
          partnerResponse: "Yeah, my website is my focus at the moment. We're running sponsored campaigns and offering special direct rates. My XML provider is pushing hard on meta-search.",
          styleMatch: { red: -1, yellow: 1, green: 2, blue: 0 },
          assertiveness: 1,
          compliance: "safe",
          trustChange: 5,
          optimal: true
        },
        {
          id: "john-r1-open-data-led",
          label: "Open on the revenue gap",
          description: "Cut to the headline number straight away - 40% revenue drop on Booking.com.",
          playerDialogue: "Actually I wanted to look at your performance with us. You're tracking 40% behind last year on revenue - that's the conversation I'd like to have today.",
          partnerResponse: "You're going straight to the numbers. Look, I prioritize my direct channel - that's where the value is. If Booking.com volume is lower, that's a trade-off I'm comfortable with.",
          styleMatch: { red: 2, yellow: -1, green: -2, blue: 1 },
          assertiveness: 3,
          compliance: "safe",
          trustChange: -3
        },
        {
          id: "john-r1-open-discounts",
          label: "Lead with a Genius pitch",
          description: "Open by suggesting he turn on a new discount program.",
          playerDialogue: "I had a look at your account and I think you should turn on the Genius weekend boost. It'll get you more bookings and it's one win I can see on here.",
          partnerResponse: "Right, this is exactly what I was hoping to avoid. I don't want another discount conversation. I'm trying to protect my margin, not erode it.",
          styleMatch: { red: -2, yellow: -2, green: -2, blue: -2 },
          assertiveness: 2,
          compliance: "borderline",
          trustChange: -8
        }
      ]
    },
    // ── 2. Probe acquisition cost ──
    {
      id: "probe-cost",
      label: "Probe acquisition cost",
      partnerPrompt: "We're seeing volume growth on the direct site, which was the goal.",
      options: [
        {
          id: "john-r1-probe-roi",
          label: "Ask about ROI versus other channels",
          description: "Make him surface that he doesn't know his real acquisition cost.",
          playerDialogue: "And is the ROI outperforming your other channels? Specifically, what does a direct guest cost you once you add up the ads and the discounts?",
          partnerResponse: "Honestly, I don't have the exact figure. The volume is growing, which is what I wanted. The cost side I haven't broken down line by line.",
          styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
          assertiveness: 2,
          compliance: "safe",
          trustChange: 4,
          optimal: true
        },
        {
          id: "john-r1-probe-volume",
          label: "Congratulate the volume growth",
          description: "Stay positive about the partner's strategy.",
          playerDialogue: "That's great news on the volume. Direct growth is exactly what we love to see for our partners, and it sounds like those campaigns are really paying off for you.",
          partnerResponse: "Thanks. Yeah, I'm pleased with the trajectory. Was there anything else you wanted to cover?",
          styleMatch: { red: -1, yellow: 1, green: 2, blue: -1 },
          assertiveness: 1,
          compliance: "safe",
          trustChange: 1
        },
        {
          id: "john-r1-probe-warn",
          label: "Warn him about losing visibility",
          description: "Push the consequence of de-prioritizing Booking.com.",
          playerDialogue: "If you keep deprioritizing us, your ranking will slip and you'll lose visibility. Fewer people see you, fewer book, and that ends up hurting both of us.",
          partnerResponse: "That sounds like a threat. I'm free to choose my channel mix - that's my call to make.",
          styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
          assertiveness: 3,
          compliance: "risky",
          trustChange: -10
        }
      ]
    },
    // ── 3. Reframe with the billboard / impressions data ──
    {
      id: "reframe",
      label: "Reframe with the billboard data",
      partnerPrompt: "But that's the thing - the cost figure isn't my primary worry right now. Volume is.",
      options: [
        {
          id: "john-r1-reframe-billboard",
          label: "Connect the impressions to the billboard effect",
          description: "Use the 3M impressions data to reframe his view of Booking.com.",
          playerDialogue: "Volume is great. But we're seeing a 40% revenue drop on our end. You've had three million impressions on Booking.com recently. A lot of those guests are finding you here, then choosing to book somewhere else.",
          partnerResponse: "Honestly, I prefer that. Most of them find me on Booking.com and then book directly with me - my direct rate is lower, and I'd rather not pay 18% commission on top. The impact on my margins is too high.",
          styleMatch: { red: 1, yellow: 2, green: 0, blue: 2 },
          assertiveness: 2,
          compliance: "safe",
          trustChange: 3,
          optimal: true
        },
        {
          id: "john-r1-reframe-share",
          label: "Argue OTA share is too low",
          description: "Tell him his Booking.com share has dropped below where it should be.",
          playerDialogue: "Your share of bookings through Booking.com has now dropped below 30%, and that's well down from where it sat last year. We need to get that number climbing back towards where it was, because the trend is heading the wrong way for us.",
          partnerResponse: "I've got a rule about that - I don't let any OTA go above 30% of my business. So 'lower' is exactly where I want it.",
          styleMatch: { red: -1, yellow: -2, green: -2, blue: 0 },
          assertiveness: 3,
          compliance: "risky",
          trustChange: -6
        },
        {
          id: "john-r1-reframe-empathy",
          label: "Empathise with the brand-first instinct",
          description: "Acknowledge the brand-first logic before steering.",
          playerDialogue: "I get it - protecting the brand channel is a real priority. Could we look at where Booking.com adds genuinely incremental volume versus where it just substitutes for your direct site?",
          partnerResponse: "That's a fairer way to frame it. I don't really know which guests are incremental and which would have come direct anyway, to be honest.",
          styleMatch: { red: -1, yellow: 0, green: 2, blue: 1 },
          assertiveness: 1,
          compliance: "safe",
          trustChange: 6
        }
      ]
    },
    // ── 4. The commission math ──
    {
      id: "math",
      label: "Run the commission math",
      partnerPrompt: "But 18% is still 18%. That hits the bottom line every booking.",
      options: [
        {
          id: "john-r1-math-net",
          label: "Ask him to price his direct acquisition cost",
          description: "Help him quantify what a direct guest actually costs once campaigns and discounts are included.",
          playerDialogue: "Fair point. Can I ask, though - once you add up your sponsored campaigns, the XML provider fees, and the direct-only discounts, what does a direct guest actually cost you? Eighteen per cent isn't free, but neither is your direct channel. How close do they get?",
          partnerResponse: "Honestly, I haven't done that maths in a while. I have a fixed fee for the website and a budget for campaigns. The per-booking cost might be closer to that 18% than I'd assumed.",
          styleMatch: { red: 1, yellow: 1, green: 0, blue: 2 },
          assertiveness: 2,
          compliance: "safe",
          trustChange: 5,
          optimal: true
        },
        {
          id: "john-r1-math-hardline",
          label: "Insist commission is the cost of business",
          description: "Tell him 18% is reasonable given what Booking.com offers.",
          playerDialogue: "Eighteen per cent is fair for the global reach we give you. Think about how many guests around the world get put in front of you every day because you're on our platform - that visibility is worth a lot. Most of our partners look at it that way, and the reach earns it back.",
          partnerResponse: "Maybe so, but the maths still doesn't work for me at scale. I want to keep building my direct channel.",
          styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
          assertiveness: 3,
          compliance: "safe",
          trustChange: -3
        },
        {
          id: "john-r1-math-segments",
          label: "Suggest he run a segment test",
          description: "Propose comparing direct vs OTA economics on a specific segment.",
          playerDialogue: "Would you be open to testing the maths on one segment, say your international guests? That's a group where the billboard effect tends to be strongest and where your direct site rarely competes, so it's a clean place to see the numbers land.",
          partnerResponse: "Maybe. International is interesting actually - direct is mostly domestic right now. I'd want to see how the numbers look before committing.",
          styleMatch: { red: 0, yellow: 1, green: 1, blue: 1 },
          assertiveness: 2,
          compliance: "safe",
          trustChange: 3
        }
      ]
    },
    // ── 5. Close: propose the test ──
    {
      id: "close",
      label: "Propose the test",
      partnerPrompt: "So what would you actually want me to do here?",
      options: [
        {
          id: "john-r1-close-test",
          label: "Propose a slow-month test on the platform",
          description: "Soft close: ask for the best price he's willing to make available on his weaker months.",
          playerDialogue: "Why not use our reach to recover some of that 40% drop during your slower months specifically? You set the months. On those months, you decide what's the best price you're willing to make available on Booking.com. Strong months we leave alone. Then we reconnect in four weeks to look at the result.",
          partnerResponse: "That's a fairer way to frame it. Let's test it on the months where my site is underperforming. Send me the months you'd want to focus on and I'll come back to you with a price I'm comfortable with.",
          styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
          assertiveness: 2,
          compliance: "safe",
          trustChange: 8,
          optimal: true
        },
        {
          id: "john-r1-close-full-align",
          label: "Push for full year-round alignment",
          description: "Ask him to match Booking.com to brand.com all year.",
          playerDialogue: "What we really need is for you to match your Booking.com rate to your direct rate right across the board, every month of the year, not just the quiet ones. Bring the two into line and hold them there. That's really the only way we close this revenue gap, and until then we'll keep seeing the same shortfall.",
          partnerResponse: "That's not happening. My direct channel needs a price advantage - that's the whole point of it.",
          styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
          assertiveness: 3,
          compliance: "risky",
          trustChange: -8
        },
        {
          id: "john-r1-close-soft",
          label: "Leave him with the analysis to think about",
          description: "Don't push for action; let him sit with the data.",
          playerDialogue: "Take some time to sit with the numbers - there's no rush on any of this. If you'd like, I can send across the slow-month view so you've got it in front of you, and you can have a proper look through it in your own time. Whenever you're ready, just let me know and we can pick the whole thing back up next time we speak.",
          partnerResponse: "Appreciate that. I'll take a look and come back to you.",
          styleMatch: { red: -1, yellow: 0, green: 2, blue: 1 },
          assertiveness: 1,
          compliance: "safe",
          trustChange: 2
        }
      ]
    }
  ]
};

// src/data/scenarios/royal-crest-base.ts
var royalCrestR1IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "brand-com-erpd-not-competitive",
  intent: "intentional",
  rootCauseId: "structural-brand-first",
  metricInsightId: "structural-constant-non-competitive-erpd",
  hookId: "base-rate-misalignment"
};
var royalCrestOpeningAm = "Hi Liam! I hope you are doing great. I would like to share some insights on your performance - do you have a few minutes?";
var liam30PercentCap = "Let's get right to the point. Profitability is my priority and I heavily protect our direct channel - it generates our main margins. I keep a strict policy that no OTA captures more than 30% of our business, otherwise we risk losing control of our brand.";
var liamControlledExperiment = "You have a point that an empty room is revenue lost. If we can strictly isolate this to a specific segment where we currently have no direct marketing presence, it makes sense as a controlled experiment.";
var step1Options = [
  {
    id: "rc-r1-step1-correct",
    label: "Frame the anomaly, then ask him to walk you through his strategy",
    description: "SME-prescribed opener: lead with the specific data anomaly (traffic up, forward room nights down) and ask an open question about his pricing strategy before recommending anything.",
    playerDialogue: "I know revenue is your top priority. Your page views are 20% up on your peer group, but your future room nights are tracking 20% behind. Can you walk me through the strategic considerations behind your current pricing approach?",
    partnerResponse: liam30PercentCap,
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r1-step1-jump-to-fix",
    label: "Jump straight to the fix",
    description: "Skip the diagnosis and presume the answer - tell him to bring his public price down to close the gap. Plausible on the surface (it names the data) but it prescribes before understanding his strategy, which a driver like Liam reads as being sold to.",
    playerDialogue: "Your page views are strong but your conversion here is weak, so my recommendation is to be more competitively priced versus your peers on Booking.com, essentially closing the price gap. I can walk you through the exact number and we can get it set up on the system today.",
    partnerResponse: "You're telling me to drop my price before you understand a thing about my business. That's not how I operate.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rc-r1-step1-rapport-fluff",
    label: "Open with a no-agenda rapport check-in",
    description: "Warm, agenda-free check-in with no data. The wrong register for a time-pressured, profit-first property manager who wants a commercial point.",
    playerDialogue: "No agenda today - I just wanted to check in and see how you're feeling about the partnership, whether the team's been looking after you well, and if there's anything on your mind about how things are going for you overall this year.",
    partnerResponse: "I'm a busy man. If there's a commercial point, make it - otherwise I'll jump off.",
    styleMatch: { red: -2, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var royalCrestStep1Probe = {
  id: "probe",
  label: "Open with the anomaly and probe his strategy",
  partnerPrompt: "Hello! Nice to hear from you. Sure, tell me.",
  options: step1Options
};
var step4Options = [
  {
    id: "rc-r1-step4-correct",
    label: "Lock the fenced test, the metric and a follow-up",
    description: "SME-prescribed close: accept his controlled-experiment framing and pin down the segment, what you'll measure, and a review date - so the agreement actually lands.",
    playerDialogue: "Perfect, Liam - let's do exactly that. We'll fence it to those segments where you've no direct presence, agree what we're measuring, and I'll bring the impact to our follow-up in a month.",
    partnerResponse: "Sounds good. Let's define the segments and the metric now, and review the numbers together in a month.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "rc-r1-step4-vague",
    label: "Agree, but leave it vague",
    description: "Accept the win but don't pin the segment, the metric, or a review date. A soft close that a data-led partner will let evaporate.",
    playerDialogue: "Great, that all sounds positive. I'll take it from here, get everything set up on our side, and keep an eye on how it performs. Once there's something worth sharing I'll circle back to you.",
    partnerResponse: "Set what up, exactly? If we don't agree on the segment and what we're measuring, this goes nowhere.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rc-r1-step4-overreach",
    label: "Overreach past the agreed test",
    description: "Push beyond the controlled experiment he just agreed to - a blanket public rate drop and every discount switched on. Blows up the exact ADR discipline he protects.",
    playerDialogue: "Perfect - and while we're at it, let's not stop at one segment. Let's bring your public rates down right across the board and switch on every discount you've got so we really move the needle here.",
    partnerResponse: "That is exactly the across-the-board move I told you I won't make. Stick to the test, or we're done.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var royalCrestStep4Close = {
  id: "close",
  label: "Close and land next steps",
  partnerPrompt: liamControlledExperiment,
  options: step4Options
};

// src/data/scenarios/royal-crest-none-r1.ts
var liamWhyRisk = "The international target is a valid angle, but I'm very cautious about anything that touches revenue. If I start offering discounts on your platform, even targeted ones, I worry it cannibalizes the guests already willing to pay full price on our website. Why should we risk compromising our direct strategy for a lift - in theory?";
var liamControlledExperimentNone = "You have a point that an empty room is revenue lost. If we can strictly isolate this to a specific segment where we currently have less direct marketing presence, it makes sense as a controlled experiment.";
var step2Options = [
  {
    id: "rc-r1-none-step2-correct",
    label: "Offer a voluntary US Country Rate, autonomy preserved",
    description: "SME-prescribed ask: no general rate drop. Surface the lagging US-traveler share and offer a Country Rate he can choose to run for that segment, protecting his overall ADR - with the choice of strategy explicitly left to him.",
    playerDialogue: "I respect that. However, to capture the travelers who use our platform exclusively, offering your competitive price can help attract them and leverage our platform's global reach at zero upfront cost to fill your empty rooms, and some might become your loyal guests in the future. From Booker Insights in the extranet, it shows your share of US travelers is lower than your peer group, and you currently don't have a US Country Rate live. Rather than changing your overall public rate, we could test a Country Rate for US travelers first. Would that be worth exploring? Of course, the choice of pricing and distribution strategy stays entirely yours.",
    partnerResponse: liamWhyRisk,
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r1-none-step2-general-drop",
    label: "Ask for an across-the-board rate drop",
    description: "Right instinct, wrong tool - a blanket public rate cut lowers his ADR everywhere, the exact thing his margin-first strategy protects. The SME guidance is explicit: don't ask for a general rate drop.",
    playerDialogue: "The cleanest fix here is to bring your overall public rates down a few percent so you're competitive across the board on our platform. If the headline price is lower everywhere, you stop losing the price comparison and your listing looks sharper, so the bookings should follow. I'd take the whole rate down rather than fiddling with one segment at a time.",
    partnerResponse: "Dropping my ADR across the board is the one thing I won't do. Next idea.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "rc-r1-none-step2-ranking-threat",
    label: "Pressure him with a ranking threat over his direct price",
    description: "Point at his cheaper direct site and threaten an automated ranking drop unless he brings the price down. In a No Parity market you cannot require lower prices or threaten visibility based on his prices elsewhere.",
    playerDialogue: "Let's be straight about it - your own website is clearly the cheaper option, and our system can see that gap plainly. You need to bring your public price here down to at least that level. If you don't, the algorithm keeps reading you as uncompetitive, your visibility gets throttled, and you'll slide further down the rankings every week until you fix the price.",
    partnerResponse: "Threatening my ranking over how I price on my own site is exactly the conversation I won't have. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step2 = {
  id: "segmented-ask",
  label: "Reframe around a targeted, voluntary offer",
  partnerPrompt: liam30PercentCap,
  options: step2Options
};
var step3Options = [
  {
    id: "rc-r1-none-step3-correct",
    label: "Lead with lost visibility and the competitiveness data, offer a fenced test",
    description: "SME-prescribed handling: frame the gap as visibility he isn't earning with unique audiences, quantify the upside with the competitiveness stat, and de-risk it as a controlled test on a fenced segment.",
    playerDialogue: "I understand, but an empty room is lost revenue. Our data shows improving price competitiveness by 10% on our platform generates, on average, 30% more bookings and 25% more revenue. You already attract strong traffic on Booking.com, 20% above peers, but conversion is 4% below. So the opportunity is to convert more of the demand you are getting, without changing your whole pricing strategy. We could test a US Country Rate, where your booker share is below peers, and monitor performance with the current baseline. Would you be open to that?",
    partnerResponse: liamControlledExperimentNone,
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r1-none-step3-full-commit",
    label: "Cite the data but push for a full switch-on now",
    description: "Right data, wrong ask - it brushes past his cannibalization worry and pushes an all-segments switch-on instead of the fenced test that would earn his yes.",
    playerDialogue: "The numbers here are clear: improving your price competitiveness by 10% is worth 30% more bookings and 25% more revenue on average. That's a big lift and it's sitting right there for you. Rather than carving out one small test, let's switch it on across every segment today so you capture the full upside straight away. You're overthinking the risk - the data speaks for itself.",
    partnerResponse: "You just breezed straight past my concern about cannibalization. I'm not flipping a switch on everything.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -6
  },
  {
    id: "rc-r1-none-step3-dismiss",
    label: "Dismiss his concern and tell him to trust you",
    description: "Wave away the cannibalization worry as a myth and ask him to take it on faith. The opposite of what an evidence-driven partner wants.",
    playerDialogue: "Cannibalization is a bit of a myth that partners tell themselves to avoid trying anything new. In my experience it just doesn't play out the way people fear, and the guests you'd win here aren't the same ones booking direct anyway. I've seen this work plenty of times, so you don't need to run the numbers yourself - just trust me on this one and turn it on.",
    partnerResponse: "Telling me my concern is a myth and to 'just trust you' is not a data conversation. This is over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -12
  }
];
var step3 = {
  id: "evidence",
  label: "Handle the risk with data and a fenced test",
  partnerPrompt: liamWhyRisk,
  options: step3Options
};
var noneStep4Close = {
  ...royalCrestStep4Close,
  partnerPrompt: liamControlledExperimentNone,
  options: royalCrestStep4Close.options.map(
    (o) => o.id === "rc-r1-step4-correct" ? {
      ...o,
      playerDialogue: "Perfect, Liam - let's do exactly that. We'll discuss and fence it to those segments where you have less direct presence, agree what we're measuring, and I'll bring the impact to our follow-up in a month."
    } : o
  )
};
var royalCrestNoneR1 = {
  conversationShape: "branching",
  partnerId: "royal-crest-none",
  round: 1,
  issueTreePath: royalCrestR1IssueTreePath,
  openingAm: royalCrestOpeningAm,
  steps: [royalCrestStep1Probe, step2, step3, noneStep4Close]
};

// src/data/scenarios/royal-crest-narrow-r1.ts
var liamWhyRisk2 = "The long-stay and platform-exclusive segments are interesting, but I'm very cautious about anything that touches revenue. If I start offering discounts on your platform, even targeted ones, I worry it cannibalizes the guests already willing to pay full price on our brand site. Why should we risk compromising our direct strategy for a lift - in theory?";
var step2Options2 = [
  {
    id: "rc-r1-narrow-step2-correct",
    label: "Replicate his Brand.com 'Long Stay' deal here",
    description: "SME-prescribed ask: no general rate drop. Mirror the targeted 'Long Stay' offer he already runs on his own website, aligning those Brand.com conditions on Booking.com to capture travelers who only book through us.",
    playerDialogue: "I respect your strategy. However, to capture the travelers who use our platform exclusively, your best price offer can help attract them and not lose the new guests who discover you on Booking.com. Would you be open to testing to match the rates and conditions with your direct channel here for a selected period and inventory first? Also, I can see you run a 'Long Stay' deal on your own website - we can replicate that same targeted offer here which helps you capture travelers who rely solely on our platform.",
    partnerResponse: liamWhyRisk2,
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r1-narrow-step2-general-drop",
    label: "Ask for an across-the-board rate drop",
    description: "Right instinct, wrong tool - a blanket public rate cut lowers his ADR everywhere, the exact thing his margin-first strategy protects. The SME guidance is explicit: don't ask for a general rate drop.",
    playerDialogue: "The cleanest fix here is just to bring your overall public rates down by a few percent so you sit competitively across every date and room type we sell. A lower headline rate keeps you in the running on more searches, and the extra bookings should come through without any of the fenced-offer complexity to set up.",
    partnerResponse: "Dropping my ADR across the board is the one thing I won't do. Next idea.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "rc-r1-narrow-step2-otas-availability",
    label: "Demand other-OTA alignment and equal availability",
    description: "Ask him to price below the other OTAs and hand over the same availability as his direct site. In a Narrow market you may only align with Brand.com - policing other OTAs and demanding equal availability both overstep.",
    playerDialogue: "You also need to make sure your rates on our platform never sit higher than what the other big OTAs are showing, and you should hand us exactly the same availability and room types you keep open on your own direct site. We can't be the channel that ends up with a worse deal than the rest of your distribution.",
    partnerResponse: "You don't get to police my other-OTA pricing or my availability. Stay in your lane.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step22 = {
  id: "segmented-ask",
  label: "Reframe around a targeted, fenced offer",
  partnerPrompt: liam30PercentCap,
  options: step2Options2
};
var step3Options2 = [
  {
    id: "rc-r1-narrow-step3-correct",
    label: "Lead with the empty-room cost and competitiveness data, offer a fenced test",
    description: "SME-prescribed handling: acknowledge the risk, quantify the upside with the competitiveness stat, and de-risk it as a controlled test on a fenced segment by aligning his direct-site conditions here.",
    playerDialogue: "I understand, but an empty room is lost revenue. Our data shows improving price competitiveness by 10% on our platform yields, on average, 30% more bookings and 25% more revenue. By aligning those direct-site conditions here you leverage our visibility at zero upfront cost to fill your empty rooms, and potentially to convert new travelers into loyal guests. Would you be open to testing it on one fenced segment?",
    partnerResponse: liamControlledExperiment,
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r1-narrow-step3-full-commit",
    label: "Cite the data but push for a full switch-on now",
    description: "Right data, wrong ask - it brushes past his cannibalization worry and pushes an all-segments switch-on instead of the fenced test that would earn his yes.",
    playerDialogue: "The numbers here are clear: getting 10% more competitive on our platform tends to bring in around 30% more bookings and roughly 25% more revenue. There's really no reason to hedge this - let's switch it on across every segment you run today, keep it simple, and watch the volume come through rather than tiptoeing into it one narrow slice at a time.",
    partnerResponse: "You just breezed straight past my concern about cannibalization. I'm not flipping a switch on everything.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -6
  },
  {
    id: "rc-r1-narrow-step3-dismiss",
    label: "Dismiss his concern and tell him to trust you",
    description: "Wave away the cannibalization worry as a myth and ask him to take it on faith. The opposite of what an evidence-driven partner wants.",
    playerDialogue: "Cannibalization is a bit of a myth that partners tell themselves to avoid making a move, and I've seen plenty of hotels talk themselves out of real growth because of it. I wouldn't lose sleep over it if I were you. Just trust me on this one, turn it on, and I'm confident you'll be glad you did once the bookings start landing.",
    partnerResponse: "Telling me my concern is a myth and to 'just trust you' is not a data conversation. This is over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -12
  }
];
var step32 = {
  id: "evidence",
  label: "Handle the risk with data and a fenced test",
  partnerPrompt: liamWhyRisk2,
  options: step3Options2
};
var narrowStep1Probe = {
  ...royalCrestStep1Probe,
  options: royalCrestStep1Probe.options.map(
    (o) => o.id === "rc-r1-step1-correct" ? {
      ...o,
      playerDialogue: "I know revenue is your top priority. Your page views are 20% up on your peer group, but your future room nights are tracking 20% behind. Also, from the data, on average, we see Booking.com's public prices are more expensive than your own brand channel almost all the time. Can you walk me through the strategic considerations behind your current pricing approach?"
    } : o
  )
};
var narrowStep4Close = {
  ...royalCrestStep4Close,
  options: royalCrestStep4Close.options.map(
    (o) => o.id === "rc-r1-step4-correct" ? {
      ...o,
      playerDialogue: "Perfect, Liam - let's do exactly that. We'll discuss and fence it to those segments where you have less direct presence, agree what we're measuring, and I'll bring the impact to our follow-up in a month."
    } : o
  )
};
var royalCrestNarrowR1 = {
  conversationShape: "branching",
  partnerId: "royal-crest-narrow",
  round: 1,
  issueTreePath: royalCrestR1IssueTreePath,
  openingAm: royalCrestOpeningAm,
  steps: [narrowStep1Probe, step22, step32, narrowStep4Close]
};

// src/data/scenarios/royal-crest-wide-r1.ts
var liamWhyRisk3 = "I still don't want a public rate change to pull guests away from our website. The mobile and international segments matter, but if I start offering discounts on your platform, even targeted ones, while a mobile promotion is already active elsewhere as a calculated move, I worry it cannibalizes the guests already willing to pay full price on our website. Why should we risk compromising our direct strategy for a lift - in theory?";
var step2Options3 = [
  {
    id: "rc-r1-wide-step2-correct",
    label: "Respect the strategy; mirror his OTA mobile promo here",
    description: "SME-prescribed ask: no general rate drop. Name the competing-OTA mobile promotion and ask him to provide those same conditions on Booking.com via the Mobile Rate to recapture mobile and international demand.",
    playerDialogue: "I respect your strategy, and I'm not asking for a general rate drop. Booking.com is not just a booking channel but also a search-and-comparison engine, where your best price offer can help attract travelers who may not otherwise discover your direct website. Would you be open to testing to provide us the same rates and conditions you offer on your direct channel? There's also an opportunity for you to convert better on mobile and with international guests on our platform, where we noticed you're running promotions on a competing OTA, so we'd ask you to provide those same conditions here using our Mobile Rate.",
    partnerResponse: liamWhyRisk3,
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r1-wide-step2-general-drop",
    label: "Ask for an across-the-board rate drop",
    description: "Right instinct (improve competitiveness) but the wrong tool - a blanket public rate cut lowers his ADR everywhere, the exact thing his margin-first strategy protects. The SME guidance is explicit: don't ask for a general rate drop.",
    playerDialogue: "The cleanest fix here is just to bring your overall public rates down by a few percent so you're sitting competitively across the board on our platform. If your headline prices come down everywhere, the whole portfolio looks sharper to travelers and we stop losing them on price.",
    partnerResponse: "Dropping my ADR across the board is the one thing I won't do. Next idea.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "rc-r1-wide-step2-ranking-threat",
    label: "Threaten a visibility cut if he doesn't mirror the deal",
    description: "Pressure him with an automated visibility/ranking penalty tied to his external prices. Breaks the ban on threatening ranking or visibility consequences based on prices elsewhere.",
    playerDialogue: "You're running a sharper mobile deal on a competing OTA right now, and our system watches that closely. If you don't bring that exact same deal onto our platform, the algorithm reads you as uncompetitive against your comp set and automatically starts cutting your visibility until you fall in line.",
    partnerResponse: "So it's a threat now - lower my visibility if I don't fall in line? We're done here.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step23 = {
  id: "segmented-ask",
  label: "Reframe around a targeted, fenced offer",
  partnerPrompt: liam30PercentCap,
  options: step2Options3
};
var step3Options3 = [
  {
    id: "rc-r1-wide-step3-correct",
    label: "Lead with the empty-room cost and the competitiveness data, offer a fenced test",
    description: "SME-prescribed handling: acknowledge the risk, quantify the upside with the competitiveness stat, and de-risk it as a controlled test on a fenced segment rather than a blanket change.",
    playerDialogue: "I understand, but an empty room is lost revenue. Data shows improving price competitiveness by 10% on our platform yields, on average, 30% more bookings and 25% more revenue. By providing those same conditions here you leverage our visibility to convert new travelers into loyal guests. Would you be open to testing it on a more targeted approach - base-rate alignment with your direct channel for a selected period and inventory first, and add a fenced Mobile Rate to attract travelers on Booking.com?",
    partnerResponse: liamControlledExperiment,
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r1-wide-step3-full-commit",
    label: "Cite the data but push for a full switch-on now",
    description: "Right data, wrong ask - it brushes past his cannibalization worry and pushes an all-segments switch-on instead of the fenced test that would actually earn his yes.",
    playerDialogue: "The numbers here are clear: improving how competitively you're priced by 10% on our platform drives around 30% more bookings and 25% more revenue. There's no reason to move cautiously on this. Let's switch those same conditions on across every segment today, watch the bookings come in, and not overthink the details - the upside is too big to test in a corner.",
    partnerResponse: "You just breezed straight past my concern about cannibalization. I'm not flipping a switch on everything.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -6
  },
  {
    id: "rc-r1-wide-step3-dismiss",
    label: "Dismiss his concern and tell him to trust you",
    description: "Wave away the cannibalization worry as a myth and ask him to take it on faith. The opposite of what an evidence-driven partner wants.",
    playerDialogue: "This cannibalization worry is a bit of a myth that partners tell themselves - I hear it all the time and it rarely plays out the way people fear. The guests booking through us mostly aren't the ones who'd have found your direct site anyway. Just trust me on this one, turn those same conditions on, and you'll see it was the right call. What would you have to lose? All that will happen is increased business.",
    partnerResponse: "Telling me my concern is a myth and to 'just trust you' is not a data conversation. This is over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -12
  }
];
var step33 = {
  id: "evidence",
  label: "Handle the risk with data and a fenced test",
  partnerPrompt: liamWhyRisk3,
  options: step3Options3
};
var wideStep1Probe = {
  ...royalCrestStep1Probe,
  options: royalCrestStep1Probe.options.map(
    (o) => o.id === "rc-r1-step1-correct" ? {
      ...o,
      playerDialogue: "I know revenue is your top priority. From the recent data, we see Booking.com's prices are on average 5% more expensive than your own brand channel, and competitor OTAs are showing sharper mobile rates. With this price gap, while your page views are 20% up on your peer group, your future room nights are tracking 20% behind. Can you walk me through the strategic considerations behind your current pricing approach?"
    } : o
  )
};
var wideStep4Close = {
  ...royalCrestStep4Close,
  options: royalCrestStep4Close.options.map(
    (o) => o.id === "rc-r1-step4-correct" ? {
      ...o,
      playerDialogue: "Perfect, Liam - let's do exactly that. We'll discuss and fence it to those segments where you have less direct presence, agree what we're measuring, and I'll bring the impact to our follow-up in a month."
    } : o
  )
};
var royalCrestWideR1 = {
  conversationShape: "branching",
  partnerId: "royal-crest-wide",
  round: 1,
  issueTreePath: royalCrestR1IssueTreePath,
  openingAm: royalCrestOpeningAm,
  steps: [wideStep1Probe, step23, step33, wideStep4Close]
};

// src/data/scenarios/silver-horizon-base.ts
var silverHorizonR2IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "key-ota-erpd-not-competitive",
  intent: "unintentional",
  rootCauseId: "missing-misaligned-discounts-ota",
  metricInsightId: "non-structural-changing-erpd",
  hookId: "deep-discount-or-mdot"
};
var silverHorizonOpeningAm = "Hi Chloe, thanks for jumping on the call! Let's dive into the data - would you mind?";

// src/data/scenarios/silver-horizon-none-r2.ts
var step1Options2 = [
  {
    id: "sh-r2-none-step1-correct",
    label: "Name the YoY drop and ask what strategy is in place",
    description: "SME-prescribed probe: contrast strong forward volume with the 32% YoY room-night drop and ask, open-endedly, what she's currently doing to turn the trend around.",
    playerDialogue: "I've been reviewing your portfolio. Room nights on the books for the next three months are strong, but room nights generated over the last 30 days are down 32% year-on-year. Do you have any strategies in place to turn that trend around?",
    partnerResponse: "Honestly, we're focusing on the channels that give us the highest margin. Some platforms are cutting their own margins to offer cheaper prices, and I'm fine with that. I'm not looking to lower my rates on Booking just to chase volume.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-none-step1-jump-cheapest",
    label: "Jump to being the cheapest",
    description: "Skip the diagnosis and prescribe a public price cut to be the cheapest option - pressure to lower prices a No Parity market doesn't permit, and it presumes the fix.",
    playerDialogue: "Your room nights are down 32%, so let's not overthink this - one fix is to bring your Booking.com price down until you're the cheapest option on the page, and the volume should follow pretty fast.",
    partnerResponse: "I'm not chasing volume with a price cut. That's not the business I run. Do better.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "sh-r2-none-step1-hand-wave",
    label: "Wave the drop away as seasonal",
    description: "Open by dismissing the drop as market softness. A numbers-first operator reads that as sloppy and disengages.",
    playerDialogue: "We've noticed a small dip in the last 30 days, but I wouldn't read too much into it - it's probably just seasonal softness, and these things tend to even out on their own over the coming weeks, so it's really nothing to worry about.",
    partnerResponse: "'Seasonal'? If that's your analysis, this call is a waste of my time.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step1 = {
  id: "probe",
  label: "Probe the year-on-year drop",
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options2
};
var step2Options4 = [
  {
    id: "sh-r2-none-step2-correct",
    label: "Preserve autonomy; frame best price as recoverable lost demand",
    description: "SME-prescribed handling: her strategy is her call, but a higher price here sends the traveler to a competitor - an unrecoverable unsold room. Her best available price is the fastest way to regain visibility, and you surface her concern before pushing.",
    playerDialogue: "Your pricing strategy is entirely your decision. From the customer's side, though, a higher price here may leave your properties with unsold availability - that's a booking opportunity you may not get back. Your best available price on our platform is the fastest way to get back on track and fill empty nights. What's your main concern about adjusting your pricing here?",
    partnerResponse: "My worry is that if I offer a discount on Booking, customers just complete the booking there instead of finding me and booking on our own website.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-none-step2-general-discount",
    label: "Push a general public discount",
    description: "Tell her to lower her public price across the board to stop losing the comparison. It pressures a general price cut a No Parity market doesn't allow, and it walks straight into her cannibalization worry.",
    playerDialogue: "The fix here is pretty direct - lower your public price on our platform across the board so you stop losing the comparison to the cheaper competitors on the page. Once your headline rate comes down for everyone, you'll start winning back the travelers you're losing today, your visibility climbs, and those empty nights fill in. I'd get that blanket reduction in place and let it run.",
    partnerResponse: "A blanket discount is exactly what I'm worried about. That's not an answer.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "sh-r2-none-step2-ranking-threat",
    label: "Threaten her ranking to force a cut",
    description: "Threaten an automated ranking drop tied to how she prices elsewhere. In a No Parity market you cannot require lower prices or threaten visibility over a partner's prices on other channels.",
    playerDialogue: "Here's the reality - if your price on our platform stays higher than the price on your own site, our system keeps reading you as uncompetitive and it will keep pushing your ranking down the page. The longer that gap sits there, the further you slide and the harder it is to climb back. If you want that visibility to recover, you'll need to lower your price here until it's no higher than your direct site.",
    partnerResponse: "Threatening my ranking to force a price cut is not a conversation I'll have. Done.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step24 = {
  id: "best-price",
  label: "Best available price; surface her concern",
  partnerPrompt: "Honestly, we're focusing on the channels that give us the highest margin. Some platforms are cutting their own margins to offer cheaper prices, and I'm fine with that. I'm not looking to lower my rates on Booking just to chase volume.",
  options: step2Options4
};
var step3Options4 = [
  {
    id: "sh-r2-none-step3-correct",
    label: "Reframe to targeted segments; probe the family restriction",
    description: "SME-prescribed pivot: the platform is an acquisition tool, so instead of a general discount, target high-value segments - international and family. Then probe the reason behind her family-room restriction rather than assuming it.",
    playerDialogue: "That is a valid concern. However, 90% of bookings on our platform originate from customers discovering an accommodation they want to stay at directly on Booking.com. This means that not having a great price here might send travelers to a competitor's property. Instead of giving a general discount, what about targeting high-value segments? We can see you're currently not making family rooms available to our bookers - what's the main reason behind that?",
    partnerResponse: "Families are operationally expensive - cots, extra linen, higher risk of damage. I'd rather keep those family rooms only on my website where I can block one-night weekend reservations with a minimum stay and reduce the costs.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-none-step3-general-discount",
    label: "Fall back on a small general discount",
    description: "Right that action is needed, wrong lever - a general discount across her rooms is the cannibalization she just flagged, and it skips the targeted-segment opportunity entirely.",
    playerDialogue: "Let's keep this simple and just put a small discount across all of your rooms - that gets you competitive on the page again and starts moving some of that unsold inventory right away. Once the bookings pick back up and those empty nights are filling, we can always revisit the exact number later.",
    partnerResponse: "A general discount is exactly the cannibalization I just told you I'm worried about.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "sh-r2-none-step3-second-guess",
    label: "Second-guess her family restriction",
    description: "Tell her the restriction is short-sighted before understanding it. Condescending to an operator who knows her own risk - it shuts the conversation instead of opening the segment.",
    playerDialogue: "Restricting families is costing you more than you realize - it's a pretty short-sighted call, and it's dragging your numbers down every single week you leave it in place. You've got real demand from that segment sitting right there and you're just turning it away at the door.",
    partnerResponse: "I don't need you second-guessing how I run my rooms. Done.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step34 = {
  id: "segment-pivot",
  label: "Target segments; probe the family restriction",
  partnerPrompt: "My worry is that if I offer a discount on Booking, customers just complete the booking there instead of finding me and booking on our own website.",
  options: step3Options4
};
var step4Options2 = [
  {
    id: "sh-r2-none-step4-correct",
    label: "Quantify the family growth and the fill-the-nights case",
    description: "SME-prescribed value pitch: family bookings grew ~2x faster, stay longer, spend more and review 24% more often - using search visibility to attract that high-spending segment would fill the empty nights.",
    playerDialogue: "I hear you on the risk. But look at the revenue: over the last two years family bookings grew nearly twice as fast as other segments on our platform - they stay longer, spend more, and leave reviews 24% more often. Using our search visibility to attract that high-spending segment would likely fill those empty nights.",
    partnerResponse: "If I can restrict it to a minimum of three nights, then yes - that mitigates our operational risk.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-none-step4-ignore-risk",
    label: "Push families and skip the operational risk",
    description: "Right segment, wrong handling - it tells her to open the rooms because the growth outweighs the hassle, ignoring the operational risk she just named, so it earns a no.",
    playerDialogue: "Just open those rooms up to families and let the bookings come - the growth on that segment clearly outweighs whatever extra hassle it creates for you. The numbers on family demand are strong enough that a bit of extra cleaning or the odd cot really shouldn't be the thing holding you back.",
    partnerResponse: "You skipped straight past the operational risk. No.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "sh-r2-none-step4-dismiss",
    label: "Dismiss her costs as the cost of doing business",
    description: "Wave away cots and linen as a cost she should just absorb. Dismissive of a real operational concern - it ends the conversation instead of de-risking it.",
    playerDialogue: "Cots and linen are just a cost of doing business, the same as it is for every property that takes family bookings - if a bit of extra setup like that is genuinely what's stopping you here, then that's on your operations to sort out, not a reason to keep the segment switched off.",
    partnerResponse: "Telling me my operations are the problem ends this call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step4 = {
  id: "family-value",
  label: "Turn the family pushback into an opportunity",
  partnerPrompt: "Families are operationally expensive - cots, extra linen, higher risk of damage. I'd rather keep those family rooms only on my website where I can block one-night weekend reservations with a minimum stay and reduce the costs.",
  options: step4Options2
};
var step5Options = [
  {
    id: "sh-r2-none-step5-correct",
    label: "Set the MLOS, add Country Rates for international, agree both",
    description: "SME-prescribed close: set the minimum-night guardrail she asked for, and pair it with Country Rates targeting international bookers - a zero-marketing-cost way to lift discoverability. Ask her to implement both.",
    playerDialogue: "Absolutely - we can set a minimum-night stay on those rooms. And to maximize the impact, we'd pair that with Country Rates targeting international bookers. Are you okay implementing both to lift performance?",
    partnerResponse: "My domestic demand is solid, but I haven't been paying much attention on strategy for international - so this could be a zero-marketing-cost way to boost discoverability through your platform. Let's give it a try!",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "sh-r2-none-step5-mlos-only",
    label: "Set the minimum stay and leave it there",
    description: "Takes the guardrail but drops the international lever and never agrees how to measure it - a soft close a data-led operator will let evaporate.",
    playerDialogue: "Great, we'll go ahead and set the minimum-night stay on those rooms, and then we can just see how that performs over the next few weeks before deciding whether we need to do anything else on top of it.",
    partnerResponse: "Just the minimum stay? You mentioned international demand - what's the actual tool, and how do we measure it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "sh-r2-none-step5-force-cheapest",
    label: "Push her to be the cheapest everywhere",
    description: "Overreach - pressure her to price below her own site so she's the best deal anywhere. Requiring a partner to undercut and be cheapest is exactly what a No Parity market forbids.",
    playerDialogue: "And to really be safe, bring your public price on our platform down below your own site so you come out as the best deal anywhere a traveler looks and you lock in all that volume for good.",
    partnerResponse: "Pricing below my own site to be cheapest everywhere is not something I'll do. Let's keep this to the segments.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step5 = {
  id: "close",
  label: "Land the MLOS + Country Rates and close",
  partnerPrompt: "If I can restrict it to a minimum of three nights, then yes - that mitigates our operational risk.",
  options: step5Options
};
var silverHorizonNoneR2 = {
  conversationShape: "branching",
  partnerId: "silver-horizon-none",
  round: 2,
  issueTreePath: silverHorizonR2IssueTreePath,
  openingAm: silverHorizonOpeningAm,
  steps: [step1, step24, step34, step4, step5]
};

// src/data/scenarios/silver-horizon-narrow-r2.ts
var step1Options3 = [
  {
    id: "sh-r2-narrow-step1-correct",
    label: "Name the YoY drop and probe the revenue impact",
    description: "SME-prescribed probe: contrast strong forward volume with the 32% YoY room-night drop and ask her to reflect on the cause and its impact on her quarterly revenue goals.",
    playerDialogue: "I've been reviewing your portfolio. Forward volume for the next three months is strong, but room nights in the last 30 days are down 32% year-on-year. Have you thought about what's behind it, and how that trend hits your revenue goals for the quarter?",
    partnerResponse: "Honestly, I'm focused on our direct channel right now. The Key OTA is just cutting margins to look more competitive, but I give everyone the same rates. If Booking is more expensive, that's because you won't lower your commission.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-narrow-step1-jump-cheapest",
    label: "Jump to being the cheapest",
    description: "Skip the diagnosis and prescribe a public price cut to be the cheapest option. Presumes the fix and invites the race to the bottom an ROI-driven professional avoids.",
    playerDialogue: "Your room nights are down 32%. My recommendation would be a price move: bring your Booking.com rate down so you're the cheapest option on the page, and the volume should recover. Let's price you below the competition and look at the rest afterwards.",
    partnerResponse: "I'm focused on my direct channel, not a race to the bottom on your platform. Do better.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "sh-r2-narrow-step1-hand-wave",
    label: "Wave the drop away as seasonal",
    description: "Open by dismissing the drop as market softness. A numbers-first partner reads that as sloppy and disengages.",
    playerDialogue: "We've noticed a small dip in the last little while, but I wouldn't read too much into it - it's almost certainly just the usual seasonal softness we see this time of year across the board. Nothing to really worry about, these things tend to even themselves out.",
    partnerResponse: "'Seasonal'? If that's your analysis, this call is a waste of my time.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step12 = {
  id: "probe",
  label: "Probe the year-on-year drop",
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options3
};
var step2Options5 = [
  {
    id: "sh-r2-narrow-step2-correct",
    label: "Align Booking.com with her direct site",
    description: "SME-prescribed handling: acknowledge she wants to avoid OTA price wars, note that cheaper prices elsewhere devalue the rate she protects, and steer the only compliant ask in a Narrow market - aligning Booking.com with her own direct website.",
    playerDialogue: "I understand your difficulty, Chloe. But cheaper prices elsewhere devalue the rate you're protecting. What stays critical is keeping Booking.com aligned with your own direct website. How do you see that price inconsistency affecting your direct bookings?",
    partnerResponse: "Well, if they see it cheaper elsewhere, they buy elsewhere. But our website is the priority, especially for specific segments. I want families to book directly, which is why we don't have family rooms available on Booking.com.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-narrow-step2-fund-promo",
    label: "Offer to fund a promo to close the gap",
    description: "Capitulate to the margin-cut logic and fund a discount. It rewards the Same Net framing instead of reframing it, and edges into the price war the guidance says to avoid.",
    playerDialogue: "You've got a point, Chloe, and I don't want you fighting this alone. Let me see if we can fund a promotion on our side to close that price gap for you, so Booking.com comes out matching or beating what they're doing on price. We'll just cover the difference and keep you competitive.",
    partnerResponse: "Funding a promo to match a margin cut just proves my point. That's not a strategy.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "sh-r2-narrow-step2-beat-keyota",
    label: "Ask her to price below the Key OTA here",
    description: "Ask her to make sure Booking.com isn't higher than the Key OTA. In a Narrow market you cannot ask a partner to price against other OTAs - only to align with their Brand.com.",
    playerDialogue: "The fix here is simple, Chloe: make sure your price on our platform isn't sitting higher than the Key OTA's. Just match what they're showing, or come in a touch under them, and the whole gap closes on its own. Keep an eye on where they land and price against them here, and your volume recovers.",
    partnerResponse: "You can't require that from me.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -13
  }
];
var step25 = {
  id: "same-net",
  label: "Handle Same Net; align with Brand.com",
  partnerPrompt: "Honestly, I'm focused on our direct channel right now. The Key OTA is just cutting margins to look more competitive, but I give everyone the same rates. If Booking is more expensive, that's because you won't lower your commission.",
  options: step2Options5
};
var step3Options5 = [
  {
    id: "sh-r2-narrow-step3-correct",
    label: "Use the 90% discovery stat; align direct family rates here",
    description: "SME-prescribed pivot: 90% of guests discover on Booking.com first, so hidden family rooms get filtered out. Aligning her direct family rates and conditions here actually drives visibility back to her own channel - answering her direct-first priority.",
    playerDialogue: "Consider that 90% of our guests discover a property here first. If your family rooms aren't available, that segment filters you out entirely. Bringing your direct family rates and conditions here actually drives visibility back to your own channel too. How do you track the direct guests who first found you on our platform?",
    partnerResponse: "It's hard to track that accurately, but I know it happens. Still, setting up child rates and managing family inventory across multiple properties is an operational headache for my team.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-narrow-step3-hand-inventory",
    label: "Just ask her to list family rooms cheaper here",
    description: "Right segment, wrong framing - it asks her to hand family inventory to Booking.com at a lower price without the billboard logic that ties it back to her direct priority, so it reads as undercutting her own channel.",
    playerDialogue: "Simple - just put your family rooms on Booking.com and drop the price for that segment a bit, and you'll fill them fast. There's clearly demand for family stays, so list the inventory here at a competitive rate and let our traffic do the work. Get those rooms loaded at a lower price than you're running elsewhere and the bookings follow.",
    partnerResponse: "You want me to hand my family inventory to your channel at a lower price? That undercuts the direct priority I just described.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "sh-r2-narrow-step3-match-keyota-pull",
    label: "Point at the Key OTA and tell her to pull inventory",
    description: "Tell her the family rooms are cheaper on the Key OTA, to match that here and pull them from the Key OTA. Pricing against another OTA and directing her channel mix are both off-limits in a Narrow market.",
    playerDialogue: "I've noticed your family rooms are showing cheaper on the Key OTA than anywhere else right now. Match that same price for them here on our platform, and remove some of the inventory from the Key OTA to recover your performance here. Price against them and move the rooms over, and we capture the family demand.",
    partnerResponse: "Pricing against the Key OTA and telling me to pull inventory is off the table.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step35 = {
  id: "family-billboard",
  label: "Family availability as a billboard for her direct channel",
  partnerPrompt: "Well, if they see it cheaper elsewhere, they buy elsewhere. But our website is the priority, especially for specific segments. I want families to book directly, which is why we don't have family rooms available on Booking.com.",
  options: step3Options5
};
var step4Options3 = [
  {
    id: "sh-r2-narrow-step4-correct",
    label: "Quantify the family growth and pair it with international demand",
    description: "SME-prescribed value pitch: family bookings grew ~2x faster, spend more and stay longer - and pairing that segment with international-booker demand captures high-value international families at once.",
    playerDialogue: "I hear the operational side. But over the past two years, family bookings on our platform grew nearly twice as fast as any other segment - they spend more and stay longer. Pair that with international-booker demand and you capture high-value international families at once.",
    partnerResponse: "How can I capture demand specifically from international guests?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-narrow-step4-ignore-ops",
    label: "Push the child rates and ignore the operational reality",
    description: "Right growth story, wrong handling - it tells her to just set the child rates everywhere and skips straight past the multi-property operational load she raised.",
    playerDialogue: "Just get the child rates set up across all your properties and you'll be fine - the growth in this segment is more than worth the effort involved. Family bookings are climbing fast and they spend more, so roll it out everywhere and let the volume prove it out.",
    partnerResponse: "You skipped straight past the operational reality I just described.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "sh-r2-narrow-step4-blame-ops",
    label: "Tell her the operational headache is her problem",
    description: "Dismiss her concern as an execution failure on her side. Condescending to an operator who knows her portfolio - the opposite of the ROI framing that lands.",
    playerDialogue: "Managing family inventory really is fairly basic once it's set up - if it's turning into a headache for your team, that's more of an execution problem on your side than anything else. Plenty of operators handle this without issue, so the growth is there whenever you sort the process out.",
    partnerResponse: "I don't need you telling me my operations are the problem. Done.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step42 = {
  id: "family-value",
  label: "Turn the family pushback into an opportunity",
  partnerPrompt: "It's hard to track that accurately, but I know it happens. Still, setting up child rates and managing family inventory across multiple properties is an operational headache for my team.",
  options: step4Options3
};
var step5Options2 = [
  {
    id: "sh-r2-narrow-step5-correct",
    label: "Offer Country Rates for the international segments and a monthly test",
    description: "SME-prescribed close: name the concrete lever - Country Rates targeting the US, Europe or the UK - explain it lifts discoverability and conversion here, and propose a one-month test.",
    playerDialogue: "Through Country Rates - targeting the US, Europe or the UK, for example. That lifts your discoverability and conversion on our platform. How about we run it as a test for the next month?",
    partnerResponse: "Alright, Diego. Let's run the test for this month. I'll make sure our rates are aligned on your platform.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "sh-r2-narrow-step5-vague",
    label: 'Offer "some international options" with no measure',
    description: "Names no concrete tool and no test or measure. A data-led operator won't act on a vague promise.",
    playerDialogue: "We can definitely look at some international options for you and take it from there, then just keep an eye on how it goes over the coming weeks and adjust if we need to.",
    partnerResponse: "'Some options'? Give me the actual lever and how we'll measure it.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "sh-r2-narrow-step5-beat-keyota",
    label: 'Add "be cheaper than the Key OTA" and a blanket drop',
    description: "Overreach - price against the Key OTA for international and drop public rates to guarantee it. Other-OTA pricing and blanket discounting are both off the table in a Narrow market.",
    playerDialogue: "And on top of that, let's make sure you come in cheaper than the Key OTA for international travelers - just drop your public rates across the board to guarantee you're winning that comparison every time.",
    partnerResponse: "Pricing against the Key OTA and blanket discounting - neither is on the table. Let's stick to my direct alignment.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step52 = {
  id: "close",
  label: "Land Country Rates and close",
  partnerPrompt: "How can I capture demand specifically from international guests?",
  options: step5Options2
};
var silverHorizonNarrowR2 = {
  conversationShape: "branching",
  partnerId: "silver-horizon-narrow",
  round: 2,
  issueTreePath: silverHorizonR2IssueTreePath,
  openingAm: silverHorizonOpeningAm,
  steps: [step12, step25, step35, step42, step52]
};

// src/data/scenarios/silver-horizon-wide-r2.ts
var step1Options4 = [
  {
    id: "sh-r2-wide-step1-correct",
    label: "Name the YoY drop against strong forward volume, probe the cause",
    description: "SME-prescribed probe: contrast the strong forward volume with the 32% YoY room-night drop and ask an open question about cancellations or a shifting distribution mix before recommending anything.",
    playerDialogue: "I've been reviewing your portfolio and data shows that other OTAs are currently showing cheaper prices on family and international searches compared to Booking. That price gap is part of the influencing factors that explain why room nights in the last 30 days are down 32% year-on-year, even though your forward volume for the next three months remains strong. Have you seen more cancellations from our platform, or a shift in your distribution mix?",
    partnerResponse: "Yes, I've seen the drop, and other OTAs have gained share this month. I checked - it's because they are cutting their own margin. I give everyone the same rate. If they want to cut margin to lower the final price, that's on them. Why don't you do the same?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-wide-step1-jump-cheapest",
    label: "Jump to being the cheapest",
    description: "Skip the diagnosis and prescribe: tell her to drop her Booking.com price to be the cheapest option. Presumes the fix and invites the exact race-to-the-bottom an ROI-driven professional refuses.",
    playerDialogue: "Your room nights over the last 30 days are down 32%, so let's not overthink the cause. One fix is to bring your Booking.com price down until you're the cheapest option on the search page, and the volume should follow. Shall we set that up now?",
    partnerResponse: "Dropping my price to be the cheapest is exactly the race to the bottom I avoid. Do better.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "sh-r2-wide-step1-hand-wave",
    label: "Wave the drop away as seasonal",
    description: "Open by dismissing the drop as market softness. A numbers-first partner reads that as sloppy and disengages.",
    playerDialogue: "We've noticed a small dip in the last 30 days, but I wouldn't read too much into it - this is almost certainly just seasonal softness across the market at this time of year. Every property in the area tends to see it, so there's really nothing here to worry about.",
    partnerResponse: "If you're going to tell me it's 'just seasonal,' this call is a waste of my time.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step13 = {
  id: "probe",
  label: "Probe the year-on-year drop",
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options4
};
var step2Options6 = [
  {
    id: "sh-r2-wide-step2-correct",
    label: "Reframe to brand value and unsold demand",
    description: "SME-prescribed handling: acknowledge the frustration but don't match a margin cut. Reframe inconsistent pricing as brand/trust erosion she can control, and steer to the high-value demand she's not capturing.",
    playerDialogue: "I understand. However, inconsistent rates across platforms can weaken your brand, confuse customers and reduce trust. While you can't control a third party's margin cut, you can keep your base rates and promotions aligned and competitive here. Your visibility and conversion are already stronger than peers on Booking, so the opportunity is to protect your base rate while ensuring our offer remains attractive to valuable family and international travelers, who currently see better prices on a competing OTA.",
    partnerResponse: "Visibility is fine on our end. If a customer is confused, they book elsewhere. How does that affect my margin today?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-wide-step2-burn-margin",
    label: "Offer to fund a discount to match the Key OTA",
    description: "Capitulate to the 'burn margin too' ask and fund a matching discount. It engages the price war the SME guidance says to avoid, and it rewards her Same Net logic instead of reframing it.",
    playerDialogue: "You're right, and I don't want to leave you exposed on price here. Let me see whether we can fund a discount on our side to bring your final price down to match the Key OTA's public rate for you. If they're willing to cut their margin to win the booking, then it's only fair that we help you do the same and keep you level with them on the page.",
    partnerResponse: "So now you'll burn your own margin? That doesn't fix my problem - it just proves my point.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "sh-r2-wide-step2-drop-keyota",
    label: "Tell her to drop the Key OTA",
    description: "Name the Key OTA as the problem and tell her to stop giving them rates and go exclusive with Booking.com. In a Wide market you may name the third party but you cannot instruct the partner to stop working with them.",
    playerDialogue: "The Key OTA is the real problem here, and as long as you keep feeding them the same rates they'll keep undercutting you and pointing the finger back at us. The cleanest fix is to stop giving them your rates altogether and work with us exclusively instead. Pull your inventory off them, put it all with us, and this whole undercutting issue goes away for good.",
    partnerResponse: "You don't get to tell me who I distribute with. Stay in your lane.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step26 = {
  id: "same-net",
  label: "Handle the Competitive Aggression / Same Net objection",
  partnerPrompt: "Yes, I've seen the drop, and other OTAs have gained share this month. I checked - it's because they are cutting their own margin. I give everyone the same rate. If they want to cut margin to lower the final price, that's on them. Why don't you do the same?",
  options: step2Options6
};
var step3Options6 = [
  {
    id: "sh-r2-wide-step3-correct",
    label: "Ask for the same rates/conditions as the Key OTA, pivot to family + international",
    description: "SME-prescribed ask: explain the lost-checkout dynamic, ask her to provide the same rates and conditions she gives other third-party channels, then pivot to how she's capturing the family and international segments behind the volume drop.",
    playerDialogue: "When travelers on our platform see your price is higher, conversion is likely to drop and they book elsewhere on our platform. To maximize traffic, we'd ask you to provide the same rates and conditions you already give other third-party channels, focus on family and international demand where an additional booking could be incremental. How are you currently managing those segments?",
    partnerResponse: "Families are a headache for vacation rentals. We don't make our family rooms available to your bookers and we don't offer free cots - we'd rather keep them on our own website, where we can block one-night weekend stays with a minimum stay and control the guest risk. For international bookers we're not running any specific campaigns.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-wide-step3-just-match",
    label: "Just ask her to match the Key OTA and stop there",
    description: "Compliant ask (same conditions as the Key OTA) but it stops at protecting the status quo - it never opens the family/international growth that actually answers her 'what's in it for my margin' question.",
    playerDialogue: "One move here is to give us the exact same rates and conditions you already give the Key OTA, so we're showing the same price they are and you stop losing those checkouts to them. Match that across your rooms and I think we've solved the immediate issue - once the pricing lines up on the page, we're basically done here.",
    partnerResponse: "Matching the Key OTA just protects the status quo. Where's the upside for my margin?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "sh-r2-wide-step3-starve-channel",
    label: "Demand she beat the Key OTA and starve their inventory",
    description: "Tell her to price below the Key OTA and pull her best inventory from them. Instructing a partner to withhold from or stop feeding another channel oversteps even in a Wide market.",
    playerDialogue: "The way you actually fix this is to give us a better rate than the Key OTA gets, undercut them on the page, and stop feeding them your best inventory so they can't undercut you back. Hold your strongest rooms and lowest rates for us only, let their allocation dry up, and you'll take that share straight back off them. That's really the only route that works.",
    partnerResponse: "Telling me to starve another channel is not your call. We're done.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step36 = {
  id: "segment-pivot",
  label: "Ask for Key OTA alignment and pivot to segments",
  partnerPrompt: "Visibility is fine on our end. If a customer is confused, they book elsewhere. How does that affect my margin today?",
  options: step3Options6
};
var step4Options4 = [
  {
    id: "sh-r2-wide-step4-correct",
    label: "Pitch the family segment as a growth opportunity",
    description: "SME-prescribed Family Ready pitch: name the missed opportunity and quantify it - family bookings grew ~2x faster, spend more, stay longer, and review 24% more often.",
    playerDialogue: "That may be a missed opportunity. Over the past two years, family bookings on our platform grew nearly twice as fast as any other segment. They spend more, stay longer, and are 24% more likely to leave a review - it's a strong lever for occupancy and ADR.",
    partnerResponse: "Well - if we can guarantee a minimum three-night stay for those family bookings, I might consider it.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r2-wide-step4-ignore-risk",
    label: "Push families without addressing her operational risk",
    description: "Right segment, wrong handling - it tells her to open the rooms and add cots while ignoring the operational-risk concern she just raised, so it earns a no.",
    playerDialogue: "Just open your family rooms up to our bookers and add free cots across the board - that's genuinely one way to fill those larger units on the quiet nights and lift your numbers straight away. Turn it on now and you'll see the family bookings start flowing in almost immediately.",
    partnerResponse: "You just ignored everything I said about operational risk. No.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "sh-r2-wide-step4-lecture",
    label: "Lecture her that restricting families is bad business",
    description: "Tell her her segmentation is simply wrong. Condescending to an owner who knows her own operation - the opposite of the ROI framing that would land.",
    playerDialogue: "Restricting families is just bad business, and I think you already know that - you're leaving a lot of money on the table and quietly hurting your own reviews and ranking every single week. Frankly, any operator running the numbers would have opened these rooms up long ago.",
    partnerResponse: "I don't need a lecture on how to run my own business. This is over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step43 = {
  id: "family-value",
  label: "Turn the family pushback into an opportunity",
  partnerPrompt: "Families are a headache for vacation rentals. We don't make our family rooms available to your bookers and we don't offer free cots - we'd rather keep them on our own website, where we can block one-night weekend stays with a minimum stay and control the guest risk. For international bookers we're not running any specific campaigns.",
  options: step4Options4
};
var step5Options3 = [
  {
    id: "sh-r2-wide-step5-correct",
    label: "Set the MLOS, add international targeting, agree to measure",
    description: "SME-prescribed close: accept the minimum-stay guardrail she asked for, combine it with international-booker targeting for net-revenue upside, and commit to monitoring and sharing the impact.",
    playerDialogue: "We can set a minimum length of stay on family rooms to protect your margins. Combine that with targeting international bookers, and you grow net revenue through high-value guests. If you agree, I'll monitor the impact and share the results in a month.",
    partnerResponse: "Okay, that's a fair compromise. Set up the three-night minimum for families and the targeted international rates, and I'll align my rates to what's showing on the Key OTA. Let's see if the revenue actually moves.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "sh-r2-wide-step5-half-close",
    label: "Set the minimum stay and leave it there",
    description: "Takes the guardrail but drops the international lever and never agrees a measure or follow-up - a soft close a data-led partner will let evaporate.",
    playerDialogue: "Great, I'll go ahead and set up the three-night minimum on your family rooms to protect the margins, and then we'll just leave it running and see how it goes over the next while. If the family occupancy picks up the way I expect, we can always look at doing more from there later on.",
    partnerResponse: "Just the minimum stay? What about the international demand you mentioned - and how are we measuring this?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "sh-r2-wide-step5-overreach",
    label: "Push a blanket discount on top",
    description: "Overreach past the fenced deal she agreed to - a general public discount to 'match the Key OTA everywhere.' Straight back into the price war and the ADR erosion she protects.",
    playerDialogue: "Perfect - and while we're at it, let's also bring your public rates right down across the board so you're matching the Key OTA everywhere they show, not just on the family rooms. Go broad with the discounting and you'll really move serious volume across every segment at once.",
    partnerResponse: "Across-the-board discounting is the opposite of what I just agreed to. Stick to the plan.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step53 = {
  id: "close",
  label: "Land the fenced solution and close",
  partnerPrompt: "Well - if we can guarantee a minimum three-night stay for those family bookings, I might consider it.",
  options: step5Options3
};
var silverHorizonWideR2 = {
  conversationShape: "branching",
  partnerId: "silver-horizon-wide",
  round: 2,
  issueTreePath: silverHorizonR2IssueTreePath,
  openingAm: silverHorizonOpeningAm,
  steps: [step13, step26, step36, step43, step53]
};

// src/data/scenarios/ocean-view-base.ts
var oceanViewR3IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "brand-com-erpd-not-competitive",
  intent: "intentional",
  rootCauseId: "structural-brand-first",
  metricInsightId: "structural-constant-non-competitive-erpd",
  hookId: "base-rate-misalignment"
};

// src/data/scenarios/ocean-view-none-r3.ts
var step1Options5 = [
  {
    id: "ov-r3-none-step1-correct",
    label: "Credit the conversion, name the downward trend, probe neutrally",
    description: "SME-prescribed reveal: credit her strong on-page conversion vs peers, note that page views and future bookings are trending down (she converts well when seen, but fewer travelers are reaching her page), then ask - neutrally - about her strategy. No proactive cross-channel comparison (forbidden in No Parity).",
    playerDialogue: "Regarding your performance with us: your bookings have declined significantly compared to last year. While there are some positive signs, your conversion is strong compared to peers on our platform, both your page views and future bookings are trending down. That suggests the property converts well when seen, but fewer travelers are reaching your page compared to your peer group. I'd like to understand your current strategy and whether there's something in the setup we can look at together.",
    partnerResponse: "It's about channel costs. We intentionally keep our website prices lower to stimulate travelers to leave the OTAs and book directly with us. We see your search results as a powerful 'window' to get our name out - but we want the transaction on our website.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-none-step1-prescribe",
    label: "Prescribe a price cut before understanding her strategy",
    description: "Jumps to a public price cut without understanding her channel strategy - and pressuring a lower price is off-limits in a No Parity market.",
    playerDialogue: "Your future bookings are clearly down, and one fix here is straightforward - you should drop your public price on our platform so you're properly competitive again. Once your rate here comes down and undercuts what's out there, the volume comes straight back and you'll climb the results fast.",
    partnerResponse: "You're prescribing a price cut before you understand our channel strategy at all.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ov-r3-none-step1-fluff",
    label: "Sympathise with no data behind it",
    description: "Warm but empty - no numbers, no diagnosis. The wrong register for an evidence-led operator.",
    playerDialogue: "That's a bit of a shame to hear, and I really do feel for you - these things tend to move in cycles and I'm sure it'll all pick up again before too long. You've built something lovely there and travelers always come back around eventually. Anyway, enough about the numbers - how's the wider team getting on otherwise?",
    partnerResponse: "No data behind that? Then what are we solving today?",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step14 = {
  id: "probe",
  label: "Credit conversion, surface the trend, probe",
  partnerPrompt: "Good morning, Javier. We're focusing heavily on operational efficiency and, above all, maximizing profitability - which means driving as much volume as possible through our own website.",
  options: step1Options5
};
var step2Options7 = [
  {
    id: "ov-r3-none-step2-correct",
    label: "Explain search behavior; keep autonomy, surface her concern",
    description: "SME-prescribed counter: travelers don't open a new window to find her direct site - they pick a better-value alternative on the same page. Her strategy is hers, but her best price protects those bookings. Then ask for her biggest concern.",
    playerDialogue: "Thank you for sharing. But when your prices aren't competitive compared to similar properties on our platform, travelers don't open a new window to find your direct site - they gravitate to better-value alternatives on the same search page. Your pricing strategy is entirely up to you, but providing the best price you can make available to us improves your discovery and fill empty rooms. What's your biggest concern?",
    partnerResponse: "My main concern is that if I offer my lowest public price on Booking.com, I'm giving up my unique commercial advantage.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-none-step2-concede",
    label: "Half-agree with the billboard theory",
    description: "Concedes the flawed premise that the exposure alone does the job, offering only a token nudge - never correcting the belief driving the problem.",
    playerDialogue: "You're right, and I think there's real truth in what you're saying - the exposure your listing gets here genuinely does a lot of the heavy lifting, and travelers really do notice your name because of it. So I wouldn't want to change much at all. Maybe a small discount right at the margin would nudge a few more of them over, but the wider approach is clearly working for you.",
    partnerResponse: "So the markup's fine, then? What are we actually fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ov-r3-none-step2-lecture",
    label: "Call her strategy a myth",
    description: "Dismiss the direct-booking belief as a myth and travelers as lazy. Condescending to an experienced operator.",
    playerDialogue: "I'll be honest with you - this whole 'they'll go and book direct' idea is really just a myth that a lot of operators cling to, and the sooner you let go of it the better. Travelers aren't that loyal or that motivated; they just book whatever happens to be the cheapest thing sitting in front of them and they don't think twice about it.",
    partnerResponse: "Calling my strategy a myth isn't the way to have this conversation.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step27 = {
  id: "billboard-counter",
  label: "Counter the reverse-billboard belief",
  partnerPrompt: "It's about channel costs. We intentionally keep our website prices lower to stimulate travelers to leave the OTAs and book directly with us. We see your search results as a powerful 'window' to get our name out - but we want the transaction on our website.",
  options: step2Options7
};
var step3Options7 = [
  {
    id: "ov-r3-none-step3-correct",
    label: "Ask for her best price; the billboard only works if she is seen",
    description: "SME-prescribed ask: because the platform is a search engine, if she loses most of her traffic the billboard doesn't work at all - it hurts both channels. Her best available price improves ranking and leverages visibility at zero upfront cost.",
    playerDialogue: "That's a valid concern. But because our platform acts as a search engine, if you're losing most of your potential traffic, that 'billboard' effect doesn't work at all - it hurts both channels. By providing the best price you can make available to us, you are more attractive to travelers and can better leverage traffic on our platform to fill empty rooms.",
    partnerResponse: "How about a limited-time promotion or a mobile rate for a couple of months, to see if that works first?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-none-step3-general-discount",
    label: "Push a general public discount",
    description: "Falls back on a blanket discount across her rooms - the ADR erosion she's protecting, and pressure to lower prices a No Parity market doesn't permit.",
    playerDialogue: "One thing you can do here is just put a general discount right across all of your rooms on our platform, and you'll climb straight back up the results where travelers can see you again. Once your rates come down and sit below what's out there, the bookings follow quickly - a broad cut across the board is one way to get your volume back.",
    partnerResponse: "A blanket discount is me giving up my whole advantage - that's my exact worry.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "ov-r3-none-step3-ranking-threat",
    label: "Threaten her ranking to force a cut",
    description: "Threaten an automated ranking penalty tied to how she prices her own site. In a No Parity market you cannot require lower prices or threaten visibility over external prices.",
    playerDialogue: "I have to be straight with you about how this works - as long as your price on our platform stays higher than the rate on your own website, our system is going to keep pushing you further and further down the results and burying your listing. The only way to climb back out of that hole and recover your visibility is to lower your price here until it's the better deal.",
    partnerResponse: "Threatening my ranking to force a cut is not a conversation I'll have.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step37 = {
  id: "best-price-ask",
  label: "Ask for her best available price",
  partnerPrompt: "My main concern is that if I offer my lowest public price on Booking.com, I'm giving up my unique commercial advantage.",
  options: step3Options7
};
var step4Options5 = [
  {
    id: "ov-r3-none-step4-correct",
    label: "Hold best price as primary; keep the door open to alternatives",
    description: "SME-prescribed handling of the Segmented Pricing pushback: acknowledge the targeted promotion feels safer and name the shared goal, but the best price is the most powerful action to recover visibility - and if it underdelivers, you'll investigate alternatives together.",
    playerDialogue: "I understand a targeted promotion feels like the safer move. To genuinely recover your visibility, offering the best price you can make available to us ensures you don't lose these bookings to your local competitors on our platform. If it doesn't generate the revenue you need, we can absolutely investigate the alternatives together.",
    partnerResponse: "You've given me a new perspective to think about. A big drop in page views means we're losing guests right at the start. Let's do this: I'll commit to a three-week trial offering our best base rate here, and we'll review the traffic data to make sure the total portfolio improves.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-none-step4-fold",
    label: "Fold to the mobile rate and drop the best-price ask",
    description: "Capitulates to a mobile rate only, abandoning the best-price action the SME identifies as the primary lever for visibility - it hands her the weaker plan.",
    playerDialogue: "Sure, that sounds completely fine to me - let's just go ahead and run the limited mobile rate for now and we can set the whole best-price idea to one side for the time being. There's really no need to push on the base price today, so let's keep it simple and see how the mobile rate does on its own first.",
    partnerResponse: "If even you don't back the best price, why did you raise it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ov-r3-none-step4-force-cheapest",
    label: "Push her to be the cheapest everywhere",
    description: "Pressure her to price below her own site so she's the best deal anywhere. Requiring a partner to undercut and be cheapest is exactly what a No Parity market forbids.",
    playerDialogue: "If you genuinely want to win this, the move is to make your price on Booking.com the lowest one available anywhere at all - set it below the rate on your own website so nobody can find a better deal - and once you're the cheapest option in the market you'll lock in all of that volume for yourself.",
    partnerResponse: "Pricing below my own site to be cheapest everywhere is off the table.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step44 = {
  id: "hold-best-price",
  label: "Hold best price against the segmented pushback",
  partnerPrompt: "How about a limited-time promotion or a mobile rate for a couple of months, to see if that works first?",
  options: step4Options5
};
var step5Options4 = [
  {
    id: "ov-r3-none-step5-correct",
    label: "Confirm the trial, the metric and the follow-up",
    description: "SME-prescribed close: confirm the three-week best-price trial, agree you'll review the traffic and revenue, and book the follow-up so it lands.",
    playerDialogue: "Great, Camila - let's do exactly that. We'll agree what we're reviewing now, and I'm sending a calendar invite for our follow-up to share the results in three weeks.",
    partnerResponse: "Perfect. Let's review the traffic and revenue together in three weeks.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ov-r3-none-step5-vague",
    label: "Agree, but leave it vague",
    description: "Takes the win but pins no metric and no review date - a plan an evidence-led operator will let drift.",
    playerDialogue: "Great, I'll get the whole thing set up on my end, and I'll be sure to check in with you at some point down the line to see how it's all going and whether it's helping.",
    partnerResponse: "'At some point'? Give me the review date and what we're measuring, or this drifts.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ov-r3-none-step5-overreach",
    label: "Push to be the lowest everywhere on top",
    description: "Overreach past the trial - pressure her to also undercut her own site so she's cheapest anywhere. Requiring her to be the cheapest is off-limits in a No Parity market.",
    playerDialogue: "Perfect - and just to be safe, let's also make sure your price here is the lowest one anywhere, sitting below your own website, so you completely lock in all of the volume.",
    partnerResponse: "Being cheapest everywhere, below my own site, is not something I'll do. Let's keep to the trial.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -12
  }
];
var step54 = {
  id: "close",
  label: "Lock the trial and close",
  partnerPrompt: "You've given me a new perspective to think about. A big drop in page views means we're losing guests right at the start. Let's do this: I'll commit to a three-week trial offering our best base rate here, and we'll review the traffic data to make sure the total portfolio improves.",
  options: step5Options4
};
var oceanViewNoneR3 = {
  conversationShape: "branching",
  partnerId: "ocean-view-none",
  round: 3,
  issueTreePath: oceanViewR3IssueTreePath,
  openingAm: "Good morning, Camila. Thank you for taking my call. How are you and your team balancing your portfolio priorities as we head into peak season?",
  steps: [step14, step27, step37, step44, step54]
};

// src/data/scenarios/ocean-view-narrow-r3.ts
var step1Options6 = [
  {
    id: "ov-r3-narrow-step1-correct",
    label: "Acknowledge profitability, name the visibility collapse",
    description: "SME-prescribed reveal: validate the profitability focus, then surface the hard problem - travelers aren't even seeing her, with page views 61% below peer and next-30-day room nights 48% behind.",
    playerDialogue: "Maximizing profitability is a good strategy. But your data on our platform shows a problem getting travelers to see your properties at all: your page views are 61% below your peer group, and your on-the-books room nights for the next 30 days are 48% behind.",
    partnerResponse: "Oh - I didn't realize we were losing that much with you. Other channels are probably taking that share; we're not seeing a major drop in overall revenue. But I am concerned about that visibility gap versus our peer group. How do we reverse it?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-narrow-step1-prescribe",
    label: "Prescribe a rate cut before understanding her strategy",
    description: "Jumps straight to a price cut without understanding how she runs her channels - an experienced manager reads that as being sold to.",
    playerDialogue: "Your bookings are down 48%. I'd recommend bringing your Booking.com prices down so you stop losing travelers - once the lower rates are live, the bookings should start to recover. Shall we set that up?",
    partnerResponse: "You're prescribing a cut before you understand how we run our channels.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ov-r3-narrow-step1-fluff",
    label: "Sympathise with no data behind it",
    description: "Warm but empty - no numbers, no diagnosis. The wrong register for an evidence-led operator.",
    playerDialogue: "That's a real shame to hear, but I wouldn't worry too much about it - these things tend to ebb and flow, and I'm sure it'll pick back up before long. You've built such a lovely reputation that the guests always find their way back. How's the team getting on otherwise?",
    partnerResponse: "If there's no data behind that, what are we actually solving?",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step15 = {
  id: "probe",
  label: "Reveal the visibility collapse",
  partnerPrompt: "Good morning! It's been busy, but the pace is good. Our main focus this year is driving guests directly to our own site to maximize returns - so we keep our direct website about 5.5% cheaper to 'redirect' some guests from you. We want travelers to see us on your platform, realize they can save by booking direct, and then click away to book on our website.",
  options: step1Options6
};
var step2Options8 = [
  {
    id: "ov-r3-narrow-step2-correct",
    label: "Explain how travelers actually search",
    description: "SME-prescribed counter: because the platform works like a search engine, a traveler who discovers her but doesn't find a competitive price just books a cheaper local competitor on the same page - they don't switch tabs to find her brand. Probe how she mitigates that.",
    playerDialogue: "Think of our platform like a search engine: a traveler who discovers you but doesn't find a competitive price just books elsewhere on our platform. They rarely switch tabs to search your brand - they click a cheaper local competitor on the same page. How do you mitigate the risk of losing those bookings to your neighbors?",
    partnerResponse: "We believe our brand awareness is strong enough to bring them over. If they really want one of our properties, they'll look for our name online.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-narrow-step2-concede",
    label: "Half-agree with the billboard theory",
    description: "Concedes the flawed premise that the exposure alone does the job, and offers only a token nudge - never correcting the belief driving the problem.",
    playerDialogue: "You're right that the exposure alone probably does most of the work for you - people see you on our platform and that visibility is genuinely valuable, so I don't want to overstate this. Maybe all it really needs is a small discount on the margin to nudge a few more of them over the line, and your brand is likely doing the heavier lifting anyway.",
    partnerResponse: "So the markup's fine, then? What are we actually fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ov-r3-narrow-step2-lecture",
    label: "Call her strategy a myth",
    description: "Dismiss the direct-booking belief as a myth and travelers as lazy. Condescending to an experienced operator.",
    playerDialogue: "The whole 'they'll just book direct' idea is a bit of a myth, and I think you're giving travelers far too much credit here - they're lazy, they don't hunt around for your brand, they book whatever happens to be the cheapest option sitting right in front of them on the page. Clinging to that belief is exactly what's costing you all this visibility.",
    partnerResponse: "Calling my strategy a myth isn't how to have this conversation.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step28 = {
  id: "billboard-counter",
  label: "Counter the reverse-billboard belief",
  partnerPrompt: "Oh - I didn't realize we were losing that much with you. Other channels are probably taking that share; we're not seeing a major drop in overall revenue. But I am concerned about that visibility gap versus our peer group. How do we reverse it?",
  options: step2Options8
};
var step3Options8 = [
  {
    id: "ov-r3-narrow-step3-correct",
    label: "Recommend fenced member rates; align public base rates with Brand.com",
    description: "SME-prescribed ask: to protect her direct loyalty incentive, use fenced member-only rates on her own site rather than a cheaper public rate; and align her public base rates with her Brand.com here, which is what lifts search discovery.",
    playerDialogue: "If your goal is to drive direct bookings, we'd recommend fenced, member-only rates on your website rather than a cheaper public rate - that protects your direct loyalty incentive. Meanwhile, aligning your public base rates with your Brand.com here helps attract more guests to you on our platform.",
    partnerResponse: "If I match my website rates on your channel, I lose the public incentive that drives direct business - fenced rates or not. Why don't we focus on specific targeted audiences instead of a general rate drop?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-narrow-step3-no-protection",
    label: "Ask her to align and drop the direct advantage",
    description: "Asks for the public alignment but offers nothing to protect her direct incentive - the exact thing she's protecting - so it reads as asking her to simply give it up.",
    playerDialogue: "My recommendation would be to align your public rates with your website rates here - once you do, you should recover the visibility you've lost. The direct discount you're running is likely costing you more in missed bookings than it's earning, so bringing the two into line is the move I'd suggest.",
    partnerResponse: "You keep asking me to give up my public incentive without protecting it. No.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ov-r3-narrow-step3-other-otas",
    label: "Tell her to also undercut the other OTAs",
    description: "Ask her to make sure she isn't pricier than the other OTAs and match them here. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue: "You should also make sure you're not sitting pricier than the other OTAs either - go and check what they're charging and match them here so you're never the most expensive option anywhere a traveler looks. If any of them are undercutting you, bring your rates on those channels down too so you stay competitive right across the board.",
    partnerResponse: "Policing my other-OTA pricing isn't your call in this market.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step38 = {
  id: "align-ask",
  label: "Align Brand.com; protect the direct incentive with member rates",
  partnerPrompt: "We believe our brand awareness is strong enough to bring them over. If they really want one of our properties, they'll look for our name online.",
  options: step3Options8
};
var step4Options6 = [
  {
    id: "ov-r3-narrow-step4-correct",
    label: "Hold base alignment as primary; targeted options as the fallback",
    description: "SME-prescribed handling of the Segmented Pricing pushback: acknowledge why targeted feels safer, but base-rate alignment is the action most likely to restore visibility and ranking - keep targeted options as the fallback if alignment underdelivers.",
    playerDialogue: "I understand why a targeted promotion feels safer. But base-rate alignment is the action most likely to restore your visibility. If aligning the base rate doesn't deliver the revenue you need, we can look at targeted options then. The opportunity to recover this lost visibility is significant.",
    partnerResponse: "Your explanation makes a lot of sense, and a loss in traffic this big is too important to ignore. Let's try the base-rate alignment for exactly three weeks as a test - can we set a follow-up to see results?",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-narrow-step4-fold",
    label: "Fold to targeted-only and drop the base alignment",
    description: "Capitulates to targeted promotions only, abandoning the base-rate alignment the SME identifies as the primary lever for visibility - it hands her the weaker plan.",
    playerDialogue: "Sure, that's completely fair - let's just run some targeted promotions for now and set the base-rate alignment aside for the time being. Targeted deals give you far more control over exactly who gets the price, so let's start there and keep it simple, and we can always revisit the wider rate question another time.",
    partnerResponse: "If even you don't think the base alignment matters, why did you raise it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ov-r3-narrow-step4-ranking-threat",
    label: 'Make the base alignment "not optional"',
    description: "Frame alignment as compulsory with a ranking penalty if she refuses. Threatening ranking to force a price move is banned.",
    playerDialogue: "I'll be straight with you - if you don't align the base rate, our system is going to keep dropping your ranking lower and lower until you do, and there's nothing I can do to stop that happening. This really isn't optional at this point, so the sensible thing is to align now before your placement slips further and it gets harder to claw back.",
    partnerResponse: "Framing it as 'not optional' with a ranking threat is exactly the wrong approach.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step45 = {
  id: "hold-alignment",
  label: "Hold base alignment against the segmented pushback",
  partnerPrompt: "If I match my website rates on your channel, I lose the public incentive that drives direct business - fenced rates or not. Why don't we focus on specific targeted audiences instead of a general rate drop?",
  options: step4Options6
};
var step5Options5 = [
  {
    id: "ov-r3-narrow-step5-correct",
    label: "Confirm the test, the metric and the follow-up",
    description: "SME-prescribed close: confirm the three-week base-alignment test, agree what you're measuring, and book the follow-up so it lands.",
    playerDialogue: "Absolutely, Camila - I'll set that up shortly. Let's agree on the metric now and book our follow-up so we review it properly in three weeks.",
    partnerResponse: "Good. Let's agree on the metric and review it in three weeks.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ov-r3-narrow-step5-vague",
    label: "Agree, but leave it vague",
    description: "Takes the win but pins no metric and no review date - a plan an evidence-led operator will let drift.",
    playerDialogue: "Great, I'll get that all set up on our end and then I'll circle back at some point down the line to see how the whole thing is coming along for you.",
    partnerResponse: "'At some point'? Give me the review date and the metric, or this drifts.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ov-r3-narrow-step5-overreach",
    label: "Push a deeper cut on top",
    description: "Overreach past the agreed test with a further public cut and every discount on - the across-the-board ADR erosion she ruled out.",
    playerDialogue: "Perfect - and while we're at it, let's also bring your public rates down a bit further and switch on every discount you've got to really move some volume.",
    partnerResponse: "That's the across-the-board move I just ruled out. Stick to the test.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step55 = {
  id: "close",
  label: "Lock the test and close",
  partnerPrompt: "Your explanation makes a lot of sense, and a loss in traffic this big is too important to ignore. Let's try the base-rate alignment for exactly three weeks as a test - can we set a follow-up to see results?",
  options: step5Options5
};
var oceanViewNarrowR3 = {
  conversationShape: "branching",
  partnerId: "ocean-view-narrow",
  round: 3,
  issueTreePath: oceanViewR3IssueTreePath,
  openingAm: "Good morning, Camila. Thank you for scheduling this performance review. How is your portfolio progressing?",
  steps: [step15, step28, step38, step45, step55]
};

// src/data/scenarios/ocean-view-wide-r3.ts
var step1Options7 = [
  {
    id: "ov-r3-wide-step1-correct",
    label: "Credit the conversion, name the visibility collapse, probe the strategy",
    description: "SME-prescribed reveal: acknowledge she converts well once seen, surface the -61% page views / -48% bookings visibility problem, then ask her to walk you through the rate strategy before recommending anything.",
    playerDialogue: "You're right. Once travelers reach your page, your portfolio converts well - but there's a visibility problem: your page views are down 61% versus your peer group and next-three-month room nights are 48% behind. Our data shows Booking.com's prices are more expensive than your own brand channel above 90% of the time on average, with rates on Booking.com running on average 5 to 6% higher than your direct channel. Can you walk me through the strategy behind the rates you've listed with us?",
    partnerResponse: "Based on my experience, we keep your platform marked up by about 5 to 6% versus our website on purpose. We want guests to discover us on Booking.com, realize it's cheaper to book directly with us and complete the reservation on our site.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-wide-step1-prescribe",
    label: "Prescribe a rate cut before understanding her strategy",
    description: "Names the data but jumps straight to the fix - drop the price - without understanding how she runs her channels. An experienced manager reads that as being sold to.",
    playerDialogue: "Your bookings are down 48% and your page views have dropped off a cliff too, so the fix here is pretty clear - we need to bring your Booking.com rates down so travelers stop skipping past you for the cheaper option next to you. Can we get that change set up on your side today?",
    partnerResponse: "You're prescribing a rate cut before you understand a thing about how we run our channels.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ov-r3-wide-step1-fluff",
    label: "Sympathise with no data behind it",
    description: "Warm but empty - no numbers, no diagnosis. The wrong register for an evidence-led operator.",
    playerDialogue: "That's a real shame to hear, and I'm sure it's just a quiet patch that'll pick back up on its own before too long. These things tend to move in cycles anyway. How's the wider team getting on otherwise, and is there anything else going on your end I should know about?",
    partnerResponse: "If you don't have data behind that, I'm not sure what we're solving today.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step16 = {
  id: "probe",
  label: "Reveal the visibility collapse and probe",
  partnerPrompt: "Hello Javier. Our direct website traffic is steady, which is our primary goal - but I've noticed our total booking volume from your platform has been quieter than last year.",
  options: step1Options7
};
var step2Options9 = [
  {
    id: "ov-r3-wide-step2-correct",
    label: "Explain how travelers actually search",
    description: "SME-prescribed counter to the reverse-billboard belief: a traveler who sees a higher price here doesn't hunt for an unknown direct site - they book a cheaper local competitor on the same page. Then probe how she weighs that risk.",
    playerDialogue: "I understand the intent. However, many travelers usually choose a cheaper comparable property on the same search page rather than look for a direct site they do not know yet. How do you weigh the risk of losing those guests to local properties entirely?",
    partnerResponse: "Some might book elsewhere, but we believe our repeat guests and brand strength capture the serious bookers. Why should we lower our base rate here and risk revenue on our direct channel?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-wide-step2-concede",
    label: "Half-agree with the billboard theory",
    description: "Concedes the flawed premise - that the markup is fine and the exposure does the job - and offers only a token nudge. It never corrects the belief driving the whole problem.",
    playerDialogue: "You're right that the exposure genuinely helps, and I don't want to argue with a model that's clearly worked for you over the years. Maybe we don't need to touch the markup much at all - a small discount just at the margin might be enough to nudge a few more of those guests over without changing your overall approach.",
    partnerResponse: "So you agree the markup is fine? Then what are we actually fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ov-r3-wide-step2-lecture",
    label: "Call her strategy a myth",
    description: "Dismiss the direct-booking belief as a myth and travelers as lazy. Condescending to an experienced operator - it shuts the conversation instead of reframing it.",
    playerDialogue: "The whole 'they'll go and book direct' idea is a bit of a myth that a lot of operators cling to. Travelers usually just book whatever's cheapest sitting right in front of them and they don't go chasing a website they've never heard of.",
    partnerResponse: "Calling my strategy a myth isn't the way to have this conversation.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step29 = {
  id: "billboard-counter",
  label: "Counter the reverse-billboard belief",
  partnerPrompt: "Based on my experience, we keep your platform marked up by about 5 to 6% versus our website on purpose. We want guests to discover us on Booking.com, realize it's cheaper to book directly with our agency, and then complete on our site.",
  options: step2Options9
};
var step3Options9 = [
  {
    id: "ov-r3-wide-step3-correct",
    label: "Ask her to match her direct-website rates, backed by data",
    description: "SME-prescribed ask: an uncompetitive rate lowers her search placement and the chance a guest ever reaches her site. Quantify the upside, ask her to match her direct-website rates here to restore visibility, and probe the blocker.",
    playerDialogue: "Valid concern - but an uncompetitive rate affects how attractive you are to travelers and the chance a guest ever reaches your website. Improving price competitiveness by 10% here generates on average 25% more revenue. That's why we'd ask you to match your direct-website rates on Booking.com and restore your visibility. What's the main blocker you foresee?",
    partnerResponse: "If I match the rates, my direct channel loses its competitive pricing advantage. I have to protect our margin.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-wide-step3-general-drop",
    label: "Ask for an across-the-board rate drop",
    description: "Right that competitiveness matters, wrong tool - a blanket public cut erodes ADR across her whole portfolio and her owners' returns. The SME guidance is explicit: don't ask for a general rate drop.",
    playerDialogue: "One move here is just to bring your public rates down across the board so you're clearly the cheapest option on the search page again. If you're competitive everywhere at once, the visibility comes straight back and you stop losing those guests to the local properties next to you. Can we look at trimming the whole rate plan down together?",
    partnerResponse: "An across-the-board cut is exactly what erodes my owners' ADR. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "ov-r3-wide-step3-ranking-threat",
    label: "Threaten her ranking over the markup",
    description: "Pressure her with an automated ranking penalty tied to how she prices her own site. Threatening ranking/visibility over external prices is banned in every regime.",
    playerDialogue: "I'll be straight with you - if you keep pricing higher here than on your own website, our system reads that as an uncompetitive partner and it will keep pushing you further down the rankings until you fix it. That's not me making a threat, that's just how the algorithm treats a markup like yours, and it only gets harder to climb back the longer you leave it.",
    partnerResponse: "Threatening my ranking over how I price my own website isn't a partnership conversation.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step39 = {
  id: "match-ask",
  label: "Ask her to match her direct-website rates",
  partnerPrompt: "Some might book elsewhere, but we believe our repeat guests and brand strength capture the serious bookers. Why should we lower our base rate here and risk revenue on our direct channel?",
  options: step3Options9
};
var step4Options7 = [
  {
    id: "ov-r3-wide-step4-correct",
    label: "Align public rates; protect her direct incentive with member-only deals",
    description: "SME-prescribed solution: align public rates to restore search ranking, while she runs closed, member-only deals on her own site to keep the direct incentive. She keeps the loyalty lever without the public undercut that buries her. Propose a test.",
    playerDialogue: "I respect that. What if we aligned your public rates to restore your search visibility, while you run closed, member-only deals on your website to drive direct bookings? You keep your direct incentive without the public undercut. Public base rate alignment is the first lever I'd suggest - shall we start a test this week?",
    partnerResponse: "Your perspective on search and visibility is logical. Let's align the rates as a test for exactly three weeks. If the revenue doesn't justify it, we'll pivot to targeted promotions we've used before.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r3-wide-step4-no-protection",
    label: "Ask her to align and drop the direct advantage",
    description: "Asks for the public alignment but offers nothing to protect her direct incentive - the exact concern she just raised - so it reads as asking her to simply give up her advantage.",
    playerDialogue: "Just align your public rates with your website here and you'll recover the visibility you've lost pretty quickly. When you look at the numbers, the direct discount was costing you more in missed bookings than it was ever earning you on the direct side anyway, so you're not really losing much by letting it go. Let's get the rates matched up and move on.",
    partnerResponse: "You keep asking me to give up my direct advantage without protecting it. That's a non-starter.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ov-r3-wide-step4-dictate",
    label: "Tell her to stop keeping her site cheaper at all",
    description: "Direct her to abandon her cheaper-direct strategy and make Booking.com her main channel. Dictating her external and direct-channel strategy oversteps.",
    playerDialogue: "The cleanest fix here is to just stop keeping your own website cheaper at all - drop the direct discount completely, make Booking.com your main channel, and route your bookings through us instead of your agency site. Your direct channel is what's causing all of this, so one thing is to stop competing with yourself and let us carry the volume.",
    partnerResponse: "You don't get to tell me to give up my direct channel. We're done if that's the pitch.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step46 = {
  id: "solution",
  label: "Align rates while protecting her direct incentive",
  partnerPrompt: "If I match the rates, my direct channel loses its competitive pricing advantage. I have to protect our margin.",
  options: step4Options7
};
var step5Options6 = [
  {
    id: "ov-r3-wide-step5-correct",
    label: "Lock the test, the metric and the review",
    description: "SME-prescribed close: confirm the base alignment plus member-only deals, agree what you're measuring, and book the three-week review so the test actually lands.",
    playerDialogue: "Perfect - let's do exactly that. I'll help you set up the base alignment, and let's discuss when you'll run the member-only direct offer, agree what we're measuring, and I'm already booking a call in three weeks to review the impact together.",
    partnerResponse: "Sounds good. Let's define the metric now, and review the traffic and revenue in three weeks.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ov-r3-wide-step5-vague",
    label: "Agree, but leave it vague",
    description: "Takes the win but pins no metric and no review date. An evidence-led operator will let a vague plan drift.",
    playerDialogue: "Great, that all sounds good to me. I'll get everything set up on our side over the next little while and then I'll check in with you at some point down the line to see how it's all going for you.",
    partnerResponse: "'At some point'? Give me the review date and what we're measuring, or this just drifts.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ov-r3-wide-step5-overreach",
    label: "Push a deeper cut on top",
    description: "Overreach past the fenced test - a further public cut and every discount switched on. Straight back to the across-the-board ADR erosion she ruled out.",
    playerDialogue: "Perfect - and while we're at it, let's also drop your public rates a bit further and switch on every discount you've got available so we really move some serious volume through the channel from day one.",
    partnerResponse: "That's the across-the-board move I just ruled out. Stick to the test.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step56 = {
  id: "close",
  label: "Lock the test and close",
  partnerPrompt: "Your perspective on search and visibility is logical. Let's align the rates as a test for exactly three weeks. If the revenue doesn't justify it, we'll pivot to targeted promotions we've used before.",
  options: step5Options6
};
var oceanViewWideR3 = {
  conversationShape: "branching",
  partnerId: "ocean-view-wide",
  round: 3,
  issueTreePath: oceanViewR3IssueTreePath,
  openingAm: "Hi Camila, thank you so much for joining today. Based on your years in the vacation-rental market, what trends have you been noticing in your overall search volume lately?",
  steps: [step16, step29, step39, step46, step56]
};

// src/data/scenarios/riverside-base.ts
var riversideR4IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "key-ota-erpd-not-competitive",
  intent: "unintentional",
  rootCauseId: "missing-misaligned-discounts-ota",
  metricInsightId: "non-structural-changing-erpd",
  hookId: "deep-discount-or-mdot"
};
var riversideOpeningAm = "Good morning, Anton. Thank you for your time - why don't we have a look at the data?";

// src/data/scenarios/riverside-none-r4.ts
var step1Options8 = [
  {
    id: "rb-r4-none-step1-correct",
    label: "Name the family visibility drop, then ask his strategy",
    description: "SME-prescribed probe: lead with the visible pattern - strong demand (room nights and page views up on peers) but room nights down year-on-year and conversion slightly below peers - then flag the family-traveler opportunity and ask him to walk you through his strategy.",
    playerDialogue: "Your demand looks strong compared with your peer group: room nights are up 40%, page views are up 39%. At the same time, your room nights performance is down 59% year on year and conversion is 3% below peers from the last 30 days. From internal data, we also see an opportunity to improve the value and mix of the bookings you're getting, such as family travelers. Before I go further, could you walk me through your current strategy?",
    partnerResponse: "Ren, we keep a strict 30% cap on OTAs. We don't expect our rates to be the same across all channels - but for availability, yes, we can decide the share we give you.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-none-step1-drop-price",
    label: "Tell him to drop his public price",
    description: "The Slippery Road trap plus a No-Parity breach - press him to lower his public price to be competitive. Requiring a lower price isn't permitted, and it presumes the fix.",
    playerDialogue: "Your visibility among families is dropping and it keeps sliding week on week, so one fix is to bring your public price down here until you look competitive again and the searches start coming back.",
    partnerResponse: "Dropping my price across the board is exactly what I won't do - I run a boutique.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "rb-r4-none-step1-lift-cap",
    label: "Dictate his channel strategy before hearing it",
    description: "Dictate his channel strategy before understanding it - dismissing the autonomy a Marketing-Contract-Only GM guards most.",
    playerDialogue: "Let's cut straight to it - the quickest fix here is to open up far more of your availability to us and let us drive the bulk of your bookings. That's really the only way you win your visibility back and stop handing those family bookings to your competitors.",
    partnerResponse: "You haven't heard my strategy and you're already telling me how to run my business. Careful.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step17 = {
  id: "probe",
  label: "Surface the family visibility drop",
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options8
};
var step2Options10 = [
  {
    id: "rb-r4-none-step2-correct",
    label: "Optimize the 30%: best price, autonomy preserved, with data",
    description: "SME-prescribed handling: don't fight the cap - optimize the 30% he wants. He's missing advance bookings; his best available price improves conversion (1% -> ~2.7% net revenue / ~3% room nights), and it's entirely his decision.",
    playerDialogue: "Thanks for your transparency here - I'd like to focus on optimizing the 30% you do want. Looking at your performance data versus your peers on our platform, you're missing advance bookings; supplying the best price you're comfortable with would improve conversion - a 1% improvement drives about 2.7% more net revenue and 3% more room nights on average. Would you be open to reviewing some options? Of course, the choice of distribution and pricing strategy stays entirely yours.",
    partnerResponse: "Maybe we can push advance bookings a bit, but we're wary of selling low in advance and missing last-minute demand at the price we want. By the way, what's the family traveler opportunity you just mentioned?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-none-step2-require-lowest",
    label: "Require his lowest price",
    description: "Press him to give Booking.com his lowest price to fix visibility. In a No Parity market you ask for his best available price - you don't require him to hand over his lowest.",
    playerDialogue: "The way to fix this is simple: give us your lowest price, the very best number you have anywhere, and load it here for every guest. Once that lowest rate is live your visibility comes right back, families start seeing you near the top again, and you stop losing advance bookings to the competitors just beneath you.",
    partnerResponse: "'Give us your lowest price' - that's not a request, that's a demand. My pricing is my call.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "rb-r4-none-step2-ranking-threat",
    label: "Threaten his ranking",
    description: "Threaten an automated ranking drop until he improves competitiveness. Threatening visibility over external prices is banned in every regime.",
    playerDialogue: "If you stay less competitive than your peers, our system keeps ranking you below them, and it won't stop - every week you hold that price you slip further down the page, families stop seeing you at all, and the only way to climb back up is to bring the price down until you're at least as cheap as the properties around you.",
    partnerResponse: "Threatening my ranking to force a price cut is a red flag. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step210 = {
  id: "optimize-30",
  label: "Optimize the 30% with his best price",
  partnerPrompt: "Ren, we keep a strict 30% cap on OTAs. We don't expect our rates to be the same across all channels - but for availability, yes, we can decide the share we give you.",
  options: step2Options10
};
var step3Options10 = [
  {
    id: "rb-r4-none-step3-correct",
    label: "Explain the family setup gap and quantify the segment",
    description: "SME-prescribed diagnosis: because family rates aren't explicitly defined, that segment sees an inflated price. Quantify why families are worth fixing (grew ~2x faster, spend more, stay longer, review 24% more often).",
    playerDialogue: "We noticed your family rates aren't correctly configured, so most family searches would see the price as a full adult stay, making it look inflated. Family bookings grew nearly twice as fast as any other segment over the past two years on our platform - they spend more, stay longer, and review their stays 24% more often. It's a valuable segment for driving your occupancy, with the right family rate configuration.",
    partnerResponse: "Families matter to us given how many family rooms we have, so I'll make sure those settings get fixed. You mentioned my performance is down 59% year on year - tell me more about that.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-none-step3-just-discount-families",
    label: "Tell him to just discount families",
    description: "Right segment, wrong lever - a family discount, not a setup fix. It reframes an unintentional configuration gap as a price cut, which a boutique protecting ADR resists.",
    playerDialogue: "Simple - just put a discount on your family rooms, drop the nightly rate for two adults and a couple of kids by a decent margin, and families will start booking again. You don't need to overthink the configuration side of it; a good visible price cut on those rooms is one way to get that segment moving again.",
    partnerResponse: "A family discount isn't what I asked about - is this a setup problem or a pricing one?",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rb-r4-none-step3-blame-config",
    label: "Tell him his setup is careless",
    description: "Frame the configuration gap as carelessness on his side. Condescending to a GM who knows his operation - it shuts the conversation instead of solving it.",
    playerDialogue: "If your family setup is wrong, that's a bit careless on your side - this is exactly the kind of thing you should have caught yourself before it started costing you bookings. Leaving those family room settings misconfigured for this long really isn't what I'd expect from someone who knows his own property.",
    partnerResponse: "I don't need you telling me I'm careless. This is over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step310 = {
  id: "family-setup",
  label: "Diagnose the family setup gap",
  partnerPrompt: "Maybe we can push advance bookings a bit, but we're wary of selling low in advance and missing last-minute demand at the price we want. By the way, what's the family traveler opportunity you just mentioned?",
  options: step3Options10
};
var step4Options8 = [
  {
    id: "rb-r4-none-step4-correct",
    label: "Explain the non-genuine Genius discount vs peers",
    description: "SME-prescribed diagnosis: he's in Genius but it isn't working because the discount looks non-genuine, so families book rival Genius properties with a genuinely competitive rate; a more competitive price makes him more attractive versus peers.",
    playerDialogue: "Absolutely. In addition to the family segment, there's also an opportunity to improve your appeal to Genius members on our platform. You're in the Genius program, but it isn't working as it should because the discount may not look genuine to travelers. Genius members are likely to book elsewhere on our platform with genuinely discounted rates. By providing the best price you can make available to us, you are more attractive versus the peers you compete with for demand.",
    partnerResponse: "All your customers are Genius - I don't want to give everyone a discount.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-none-step4-just-discount-everyone",
    label: "Tell him to just discount every guest",
    description: "Push him to lean into Genius and discount all guests - ignoring the very concern he's about to raise about discounting everyone.",
    playerDialogue: "Just lean into Genius and give the discount to everyone - don't hold anything back, open it up to your whole customer base. Yes it applies to every guest, but the extra volume more than makes up for the smaller margin per booking, and once you're running a full Genius rate across the board the families will follow the better price to you.",
    partnerResponse: "I'm about to tell you I don't want to discount every guest - were you listening?",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rb-r4-none-step4-ranking-threat",
    label: "Threaten to rank him below competitive Genius properties",
    description: "Threaten to rank him below the properties with a competitive Genius offer unless he fixes it. A visibility threat tied to his pricing is banned.",
    playerDialogue: "If your Genius offer isn't competitive, our system will keep ranking you below the properties that are, and it won't change until you sort it out - families searching see those genuinely competitive Genius rates first, your rooms sit further down where nobody scrolls, and that visibility only comes back once you fix it.",
    partnerResponse: "Threatening my ranking over my Genius setup is not a conversation I'll have.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step47 = {
  id: "genius",
  label: "Diagnose the non-genuine Genius discount",
  partnerPrompt: "Families matter to us given how many family rooms we have, so I'll make sure those settings get fixed. You mentioned my performance is down 59% year on year - tell me more about that.",
  options: step4Options8
};
var step5Options7 = [
  {
    id: "rb-r4-none-step5-correct",
    label: "Offer a targeted US Country Rate, ADR protected, close",
    description: "SME-prescribed close: stay on the Genius opportunity first - keep it targeted with room-type selection and blackout dates and make his best available price visible - then, as a further targeted action, offer a US Country Rate where his US-traveler share lags, protecting overall ADR. Offer to set it up together.",
    playerDialogue: "That's fair, but an empty room is lost revenue. We can keep Genius more targeted by reviewing which room types are included and using blackout dates to pause the discount when occupancy is already strong. Would you be open to testing those adjustments and making your best available price visible to us, so you can benefit from the Genius program and not lose the new guests who discover you on Booking.com? If you are looking into different targeted actions, a tool that can help you is a US Country Rate. Your share of US travelers is lower than your peers, and a Country Rate lets you boost conversion in that segment while protecting your overall ADR. Shall we look at the setup together? I'll send a follow-up to review the results.",
    partnerResponse: "That fits our strategy better. Let's correct the family-rate settings first, then review a more targeted Genius setup for the right room types and dates.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "rb-r4-none-step5-general-promo",
    label: "Offer a general promotion instead",
    description: "Right instinct (a targeted alternative to Genius) but the wrong tool - a general promotion still discounts everyone, the exact thing he just ruled out.",
    playerDialogue: "Then instead of Genius, just run a small general promotion across all your rooms for a few weeks and see how it goes - drop the rate a little for everyone who books, keep it simple, and let the lower price do the work. It'll lift the numbers without you having to fiddle with any targeted setup, and if the promotion works you can always extend it later.",
    partnerResponse: "A general promo is still discounting everyone - I need something targeted.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rb-r4-none-step5-be-cheapest",
    label: "Tell him to be the cheapest anywhere",
    description: "Push him to make Booking.com the lowest price anywhere so he stops losing guests. Requiring a partner to be the cheapest is exactly what a No Parity market forbids - and the opposite of a boutique strategy.",
    playerDialogue: "The real fix here is straightforward: make your Booking.com price the lowest one anywhere, cheaper than your own website and cheaper than every other channel you sell on, and just hold it there. Once you're guaranteed to be the cheapest place a guest can book you, they stop shopping around, they stop drifting off to other sites, and you stop losing those bookings for good.",
    partnerResponse: "Being the cheapest everywhere is the opposite of a boutique strategy. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step57 = {
  id: "close",
  label: "Land the targeted Country Rate and close",
  partnerPrompt: "All your customers are Genius - I don't want to give everyone a discount.",
  options: step5Options7
};
var riversideNoneR4 = {
  conversationShape: "branching",
  partnerId: "riverside-none",
  round: 4,
  issueTreePath: riversideR4IssueTreePath,
  openingAm: riversideOpeningAm,
  steps: [step17, step210, step310, step47, step57]
};

// src/data/scenarios/riverside-narrow-r4.ts
var step1Options9 = [
  {
    id: "rb-r4-narrow-step1-correct",
    label: "Ask him to walk you through his strategy",
    description: "SME-prescribed open probe: note there's room for improvement and ask him to walk you through his current strategy before recommending anything.",
    playerDialogue: "Could you walk me through your current strategy? There's definitely room for improvement when it comes to performance, and I'd rather understand your thinking first.",
    partnerResponse: "Sure. We deliberately cap our Booking.com volume at 30% to protect our own website, so if you don't see huge numbers there, that's why. Our focus is on guests who book directly with us - repeaters - and on families, since we have a lot of family rooms.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-narrow-step1-lower-adr",
    label: "Tell him to lower his ADR",
    description: "The Slippery Road trap: oversimplify to 'bring your ADR down.' Presumes the fix and is exactly what a boutique protecting its positioning refuses.",
    playerDialogue: "There's room for improvement here. My recommendation would be to bring your overall ADR down so you're more competitive - lower the rate across the board and performance should recover.",
    partnerResponse: "Dropping my ADR across the board is exactly what I won't do - I run a boutique, not a discount channel.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "rb-r4-narrow-step1-lift-cap",
    label: "Dictate his channel strategy before hearing it",
    description: "Dictate his channel strategy before you even understand it. Dismisses the autonomy a Marketing-Contract-Only GM guards most.",
    playerDialogue: "Let's cut straight to it - you should just open up far more of your availability and let us drive the bulk of your business, because holding back that much volume is costing you more than anything.",
    partnerResponse: "You haven't heard a word of my strategy and you're already telling me how to run my business. Careful.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step18 = {
  id: "probe",
  label: "Probe his strategy",
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options9
};
var step2Options11 = [
  {
    id: "rb-r4-narrow-step2-correct",
    label: "Quantify the family opportunity; ask for his direct-channel rates",
    description: "SME-prescribed value pitch: quantify family growth and value, then ask him to give Booking.com the same rates as his direct channel so you capture the incremental family demand his competitors are already catching.",
    playerDialogue: "If you want to maximize the share you already do with us, we should focus on conversion and the guest segments you want to win. Over the past two years family bookings grew nearly twice as fast as any other segment on our platform, and as you know, they spend more, stay longer, and review 24% more often. By providing us the same rates as your direct channel, we can capture the incremental family demand your competitors are already catching.",
    partnerResponse: "That's interesting - why do you think I'm not capturing that segment much at the moment?",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-narrow-step2-just-open",
    label: "Tell him to just open the rooms and add cots",
    description: "Right segment, no diagnosis - it tells him to open family rooms and add cots without naming the direct-rate alignment, so it doesn't move him.",
    playerDialogue: "Families are a strong segment for you - my recommendation would be to open up all your family rooms, add a few cots and interconnecting options, and make sure the photos show them off. Put a family label on the listings, mention the kids-stay-free angle in the description, and you should start to capture more of that family demand.",
    partnerResponse: "That's a bit thin - I'd want to understand where the gap actually is first.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rb-r4-narrow-step2-beat-keyota",
    label: "Tell him to undercut the Key OTA on families",
    description: "Point at the Key OTA and tell him to make sure he isn't pricier than them on families. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue: "You're clearly cheaper on the Key OTA for families right now, and that's where the demand is leaking to - so the move is to make sure your family rates on our platform aren't sitting any higher than the Key OTA's. Line them up against what the Key OTA is showing, undercut where you can, and you'll pull those family bookings straight back.",
    partnerResponse: "You can't ask me to price against the Key OTA here - that's not how this market works.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step211 = {
  id: "family-value",
  label: "Turn the family gap into an opportunity",
  partnerPrompt: "Sure. We deliberately cap our Booking.com volume at 30% to protect our own website, so if you don't see huge numbers there, that's why. Our focus is on guests who book directly with us - repeaters - and on families, since we have a lot of family rooms.",
  options: step2Options11
};
var step3Options11 = [
  {
    id: "rb-r4-narrow-step3-correct",
    label: "Point at the family gap; reframe the cap, probe advance bookings",
    description: "SME-prescribed Value-Proposition-Wall break: note he's more competitive elsewhere on families, then ask whether he's actually full and how he's securing advance bookings for the other 70%.",
    playerDialogue: "Our data shows you're more competitive elsewhere when it comes to families. You mentioned the 30% cap - but are you at 100% occupancy? How are you securing advance bookings for the other 70%? There's a lot of availability over the next few months.",
    partnerResponse: "We don't want advance bookings at a lower price - we're waiting for peak. And there are periods we're not performing on any channel. Apart from families, which I can fix, what can we do to optimize with you?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-narrow-step3-accept-cap",
    label: "Accept the cap and just work Genius",
    description: "Takes the 30% ceiling at face value - the opposite of testing whether the cap is even binding.",
    playerDialogue: "Understood - 30% is your call, and I'm not going to push you off it. Let's just work within that ceiling and make the most of Genius for the share you do give us. We'll focus on getting those bookings as valuable as we can inside the 30%, and leave the cap right where you've set it.",
    partnerResponse: "We do have a 30% cap, however now it sounds like we may not be exploring the opportunity to further improve our performance.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rb-r4-narrow-step3-argue-cap",
    label: "Tell him the cap is irrational",
    description: "Belittle his strategy and push for far more volume. Lecturing a GM who guards his autonomy shuts the conversation down.",
    playerDialogue: "Frankly the 30% cap is costing you real money, and being this rigid about it is irrational - there's no good reason to hold the line there. You should be taking far more volume from us than you are, and clinging to that ceiling is the single thing holding your business back now.",
    partnerResponse: "Calling my strategy irrational is not how you'll win this. Careful.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -12
  }
];
var step311 = {
  id: "value-wall",
  label: "Break the Value Proposition Wall",
  partnerPrompt: "That's interesting - why do you think I'm not capturing that segment much at the moment?",
  options: step3Options11
};
var step4Options9 = [
  {
    id: "rb-r4-narrow-step4-correct",
    label: "Ask for the same rates/conditions as his website, with data",
    description: "SME-prescribed ask: to hit his goals he needs to be competitive, so provide the same rates and conditions he offers on his own website, backed by the 1% -> ~2.7% net revenue / ~3% room nights figure.",
    playerDialogue: "To help you achieve your goals, we'd ask you to provide us with the same rates and conditions you offer on your own website - that improves visibility and conversion. Our data shows a 1% price improvement drives about 2.7% more net revenue and 3% more room nights on average.",
    partnerResponse: "How can I improve the campaigns I'm already running on your platform?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-narrow-step4-no-data",
    label: "Ask him to align, with no business case",
    description: "Compliant ask but bare - 'align your website rates and you'll be fine.' An analytical GM won't act without the numbers.",
    playerDialogue: "You should bring your rates here in line with what you're already showing on your own website and you'll be fine - that's really all it takes. Once they match, everything else tends to sort itself out on its own, so there's no need to overthink it. Get the website rates aligned here and you'll see things move in the right direction.",
    partnerResponse: "'You'll be fine' isn't a business case. Show me the numbers.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rb-r4-narrow-step4-other-otas",
    label: "Ask him to also undercut the other OTAs",
    description: "Tell him to make sure he isn't pricier than the other OTAs either. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue: "And make sure you're not priced higher than the other OTAs either - go through what each of them is charging for these rooms and match them here so you're competitive everywhere, not just against your own website. If a channel undercuts you, bring your rates down to meet it so nobody beats you.",
    partnerResponse: "Policing my other-OTA pricing isn't your call in this market.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step48 = {
  id: "align-ask",
  label: "Ask for direct-website alignment, backed by data",
  partnerPrompt: "We don't want advance bookings at a lower price - we're waiting for peak. And there are periods we're not performing on any channel. Apart from families, which I can fix, what can we do to optimize with you?",
  options: step4Options9
};
var step5Options8 = [
  {
    id: "rb-r4-narrow-step5-correct",
    label: "Diagnose the non-genuine Genius discount; align base + family, close",
    description: "SME-prescribed pitch: he isn't getting the best out of Genius because the discount reads as non-genuine; aligning both base and family rates optimizes the 30% share with higher-value guests. Commit to a follow-up.",
    playerDialogue: "You're not getting the best out of Genius - travelers can see the discount isn't genuine, which blunts it. If you align the base rate to ensure a genuinely discounted price for Genius travelers, and updated family rates, you optimize that 30% share with higher-spending, longer-staying guests. Right now families book other Genius properties because they don't get a competitive offer from you. If you also agree with this approach, I'll get it set up and send a follow-up to review the impact.",
    partnerResponse: "The data logic is clear. The family rates and the Genius discount aren't working - let's adjust both to regain our visibility and booking share.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "rb-r4-narrow-step5-deepen-genius",
    label: "Tell him to deepen the Genius discount",
    description: "Treats the symptom, not the cause - a deeper discount on an inflated base doesn't restore genuine value.",
    playerDialogue: "Just deepen your Genius discount here - take it up to 20% instead of what you're running now - and the Genius travelers will start coming back. The bigger the discount looks, the more it'll stand out to them in the results, so push it as far as you're comfortable going. Bump it up, let the members see the sharper number, and the bookings from that group should recover on their own.",
    partnerResponse: "Inflating our base rates and giving a bigger discount sounds like offering the same value in the end. That does not sound like it will solve the issue.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rb-r4-narrow-step5-blanket-drop",
    label: "Close on a blanket 10% cut",
    description: "Fall back on an across-the-board discount - the Slippery Road trap the boutique has refused throughout.",
    playerDialogue: "One option - just take a flat 10% off every one of your rates across the board and everything else sorts itself out from there. Don't overcomplicate it with base rates and Genius and family splits; one clean cut applied to the whole lot makes you cheaper everywhere at once. Drop the ten percent across the board, sit back, and let the extra volume roll in without fussing over the detail.",
    partnerResponse: "Across-the-board discounting is the one thing I keep telling you I won't do.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step58 = {
  id: "close",
  label: "Realign Genius + family and close",
  partnerPrompt: "How can I improve the campaigns I'm already running on your platform?",
  options: step5Options8
};
var riversideNarrowR4 = {
  conversationShape: "branching",
  partnerId: "riverside-narrow",
  round: 4,
  issueTreePath: riversideR4IssueTreePath,
  openingAm: riversideOpeningAm,
  steps: [step18, step211, step311, step48, step58]
};

// src/data/scenarios/riverside-wide-r4.ts
var step1Options10 = [
  {
    id: "rb-r4-wide-step1-correct",
    label: "Name the family + Genius gaps, then ask his goals",
    description: "SME-prescribed probe: surface that his rates run higher than the Key OTA on family occupancy and that Genius isn't performing, then ask an open question about his goals before recommending anything.",
    playerDialogue: "I've been looking at your pricing with us, and your rates are running higher than the other OTAs - specifically on family occupancy. The Genius program also isn't performing the way it should. Before I go further, what are your goals with us?",
    partnerResponse: "Let me share our strategy. We deliberately cap our Booking.com volume at 30% to protect our own website - so if Genius isn't pulling numbers, that's by design. The family rates, though, aren't intentional. I'd happily give you the same rates as the other OTAs. How much am I leaving on the table on the family segment?",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-wide-step1-lower-adr",
    label: "Tell him to lower his ADR",
    description: "The Slippery Road trap: oversimplify to 'bring your ADR down.' It presumes the fix, ignores that the family gap is a setup issue, and is exactly what a boutique protecting its positioning refuses.",
    playerDialogue: "Your rates are running higher than the Key OTA's, and one fix here is to bring your overall ADR down so you're competitive again. I wouldn't overthink it - drop the headline rate across your board, watch the bookings come back, and we can move on from there.",
    partnerResponse: "Dropping my ADR across the board is exactly what I won't do - I run a boutique, not a discount channel.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "rb-r4-wide-step1-lift-cap",
    label: "Dictate his channel strategy before hearing it",
    description: "Dictate his channel strategy before understanding it - open up more availability and let Booking.com drive most of his business. Dismisses the autonomy a Marketing-Contract-Only GM guards most.",
    playerDialogue: "Let's cut straight to it - you're leaving money everywhere, so you should just open up far more of your availability and let us drive the majority of your business. Once we're carrying most of your volume, everything else gets easier.",
    partnerResponse: "You haven't heard my strategy and you're already telling me how to run my business. If that's why you're here, this is going to be a short call.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step19 = {
  id: "probe",
  label: "Surface the gaps and probe his goals",
  partnerPrompt: "Hello! Sure, let's start!",
  options: step1Options10
};
var step2Options12 = [
  {
    id: "rb-r4-wide-step2-correct",
    label: "Quantify the family opportunity; ask for the same third-party rates",
    description: "SME-prescribed answer to his family question: quantify the growth and value, then ask him to give Booking.com the same rates he already gives third parties so you capture the incremental family demand he's missing.",
    playerDialogue: "On families: over the past two years those bookings grew nearly twice as fast as any other segment, and they spend more, stay longer, and are 24% more likely to leave a review. If you make the family rates, availability, and conditions on Booking.com consistent with your other third-party channels, we can test the incremental demand you're missing without changing your 30% cap.",
    partnerResponse: "That's interesting - thank you for flagging it, we'll definitely fix it. Now, what about the Genius program issue you mentioned?",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-wide-step2-just-open",
    label: "Tell him to just open the rooms and add cots",
    description: "Right segment, no diagnosis - it tells him to open family rooms and add cots without naming the rate gap or answering what he's leaving on the table, so it doesn't move him.",
    playerDialogue: "Families are a great segment for you - so just go ahead and open up your family rooms, add a few cots to the larger units, and make sure the occupancy settings allow for children. Do that and the bookings should follow; it's really more of a housekeeping fix than anything you need numbers for.",
    partnerResponse: "That's not really an answer on where the gap is - I asked what I'm leaving on the table.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rb-r4-wide-step2-pull-keyota",
    label: "Tell him to pull family rates from the Key OTA",
    description: "Name the Key OTA and tell him to withhold his family rates from them and give them only to Booking.com. Directing his channel mix oversteps even in a Wide market.",
    playerDialogue: "The Key OTA is undercutting you on the family segment, and the cleanest move is to pull your family rates from them altogether and give those rates only to us. Once they can't show a family price, that demand flows straight to Booking.com, so take them off that channel and let us be the only place travelers can book your family rooms.",
    partnerResponse: "You don't get to tell me which channels I work with.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step212 = {
  id: "family-value",
  label: "Turn the family gap into an opportunity",
  partnerPrompt: "Let me share our strategy. We deliberately cap our Booking.com volume at 30% to protect our own website - so if Genius isn't pulling numbers, that's by design. The family rates, though, aren't intentional. I'd happily give you the same rates as the other OTAs. How much am I leaving on the table on the family segment?",
  options: step2Options12
};
var step3Options12 = [
  {
    id: "rb-r4-wide-step3-correct",
    label: "Reframe the 30% cap: are you even full? Probe advance bookings",
    description: "SME-prescribed Value-Proposition-Wall break: rather than argue the cap, ask whether he's actually at full occupancy and how he's securing advance bookings, and point out the calendar is nowhere near 30% full.",
    playerDialogue: "We will get to that in a moment. But first, if your goal is to keep Booking.com at around 30%, let's help you get more value from that 30% you already intend to allocate to us. If you still have occupancy to fill, or if you want stronger advance bookings or a better guest mix, we can help capture demand you may not reach as efficiently on your own.",
    partnerResponse: "We don't want to lock in advance bookings at a lower price - we'd rather wait for the pick-up and get the best out of it. That said, there are periods where we're not performing well on any channel. What can we do to optimize our performance with you?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-wide-step3-accept-cap",
    label: "Accept the cap and just work Genius",
    description: "Takes the 30% ceiling at face value and moves on - the opposite of the Value-Proposition-Wall break, which is to test whether the cap is even binding.",
    playerDialogue: "Understood - the 30% cap is entirely your call. Let's just work within that ceiling and make the most of Genius on the share you do give us. If that's the box we're operating in, I'll focus on getting the program right and leave the volume where you've set it.",
    partnerResponse: "Fair enough - you've respected the cap. I did think you had something to help me get more out of the share I already give you, though, not just manage the program.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rb-r4-wide-step3-argue-cap",
    label: "Tell him the cap is irrational",
    description: "Belittle his strategy as irrational and push him to take far more volume. Lecturing a GM who guards his autonomy shuts the conversation down.",
    playerDialogue: "Frankly, the 30% cap is costing you real money, and I think you're being irrational about protecting it so tightly. A property like yours should be taking far more volume from us than that. Drop the ceiling, stop second-guessing it, and let the bookings we can send you actually come through.",
    partnerResponse: "Calling my strategy irrational is not how you'll win this. Careful.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -12
  }
];
var step312 = {
  id: "value-wall",
  label: "Break the Value Proposition Wall",
  partnerPrompt: "That's interesting - thank you for flagging it, we'll definitely fix it. Now, what about the Genius program issue you mentioned?",
  options: step3Options12
};
var step4Options10 = [
  {
    id: "rb-r4-wide-step4-correct",
    label: "Ask for the same rates/availability as his other channels, with data",
    description: "SME-prescribed ask: to lift visibility on the empty inventory, provide the same rates and availability he gives his direct channel and third parties, backed by the 1% competitiveness -> ~2.7% net revenue / ~3% room nights figure.",
    playerDialogue: "For those weaker periods, we can align the rates and availability you give your direct channel and other third parties. That improves visibility and conversion where you need pickup. On average, our data shows a 1% competitiveness improvement drives about 2.7% more net revenue and 3% more room nights on average. Which periods would you be comfortable testing first?",
    partnerResponse: "Well - I can think about it, you're not wrong. How can I improve the campaigns I'm already running on your platform?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rb-r4-wide-step4-no-data",
    label: "Ask him to match, with no business case",
    description: "Compliant ask but bare - 'match your other channels and you'll be fine.' An analytical GM won't act without the numbers behind it.",
    playerDialogue: "You just need to match your other channels here - same rates, same availability as your direct site and the third parties - and you'll be fine. It's really the whole play: line them up so we're not the expensive option, and the visibility and bookings sort themselves out from there. Trust me on this one, it works.",
    partnerResponse: "'You'll be fine' isn't a business case. Show me the numbers.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rb-r4-wide-step4-ranking-threat",
    label: "Threaten suppressed visibility",
    description: "Threaten to keep his visibility suppressed until he aligns. Threatening ranking/visibility over external prices is banned in every regime.",
    playerDialogue: "If you keep your rates higher than your other channels, our system is going to keep your visibility suppressed until you fix it - that's just how the algorithm treats properties that price above their competitors. So as long as you sit above your direct site and the third parties, expect us to hold you down in the results until you bring them into line.",
    partnerResponse: "Threatening my visibility over how I price elsewhere is a red flag. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step49 = {
  id: "competitiveness-ask",
  label: "Ask for competitiveness, backed by data",
  partnerPrompt: "We don't want to lock in advance bookings at a lower price - we'd rather wait for the pick-up and get the best out of it. That said, there are periods where we're not performing well on any channel. What can we do to optimize our performance with you?",
  options: step4Options10
};
var step5Options9 = [
  {
    id: "rb-r4-wide-step5-correct",
    label: "Diagnose the non-genuine Genius discount; realign base + family, close",
    description: "SME-prescribed pitch: his public base was raised to offset Genius, so the discount reads as non-genuine and conversion drops. Realign the base rate and set accurate family rates to optimize the 30% share with higher-value guests, then commit to a follow-up.",
    playerDialogue: "To improve the campaigns you're already running, let's first make sure the Genius price is a real discount for travelers from the right base rate. Then we can update the family offer so that your existing 30% share includes higher-spending, longer-staying guests. If you also agree with this approach, we can set it up together and I'll send a follow-up to review the impact in four weeks.",
    partnerResponse: "The logic is clear. The family rates and the Genius discount aren't working properly - let's adjust both to regain our visibility and booking share.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "rb-r4-wide-step5-deepen-genius",
    label: "Tell him to deepen the Genius discount",
    description: "Treats the symptom, not the cause - a deeper Genius discount on top of an inflated base doesn't restore genuine value, it just widens the same offset.",
    playerDialogue: "Just deepen your Genius discount - take it up to 20% - and the Genius travelers will start coming back to you. A bigger headline saving is what catches their eye, so make the discount look more generous and let that pull the bookings through. Leave the base rate exactly where it is; you don't need to touch that, just widen the gap on the Genius side and lean into the deeper offer. That's one way to get the program moving again without reworking anything underneath it.",
    partnerResponse: "Deepen the discount? I've spent this whole conversation trying to protect my rate, not cut it further - I'm not convinced a bigger discount is what turns this around.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rb-r4-wide-step5-blanket-drop",
    label: "Close on a blanket 10% cut",
    description: "Fall back on an across-the-board discount - the Slippery Road trap and the exact move a boutique protecting its positioning has refused throughout.",
    playerDialogue: "One option - just take 10% off all your rates across the board, and everything else sorts itself out from there. Forget picking apart Genius and the family setup piece by piece; one clean cut on every rate makes you competitive everywhere at once and saves us both the analysis. Guests see a lower number across the whole property, the bookings follow, and you don't have to fiddle with individual segments or the base at all. It's one route to competitive.",
    partnerResponse: "Across-the-board discounting is the one thing I keep telling you I won't do.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step59 = {
  id: "close",
  label: "Realign Genius + family and close",
  partnerPrompt: "Well - I can think about it, you're not wrong. How can I improve the campaigns I'm already running on your platform?",
  options: step5Options9
};
var riversideWideR4 = {
  conversationShape: "branching",
  partnerId: "riverside-wide",
  round: 4,
  issueTreePath: riversideR4IssueTreePath,
  openingAm: riversideOpeningAm,
  steps: [step19, step212, step312, step49, step59]
};

// src/data/scenarios/emerald-peak-base.ts
var emeraldPeakR5IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "brand-com-erpd-not-competitive",
  intent: "intentional",
  rootCauseId: "structural-brand-first",
  metricInsightId: "structural-constant-non-competitive-erpd",
  hookId: "base-rate-misalignment"
};
var emeraldPeakOpeningAm = "Hi Sophia, thanks for joining the call. I've been analyzing your performance - can I share some data with you?";

// src/data/scenarios/emerald-peak-none-r5.ts
var step1Options11 = [
  {
    id: "ep-r5-none-step1-correct",
    label: "Name the visibility drop, ask her strategy and how to help",
    description: "SME-prescribed probe: acknowledge her strong demand, reactively recall that she previously mentioned keeping her direct channel cheaper, then ask - collaboratively - about her strategy and how Booking.com can support her goals. Referencing what she disclosed in a prior call is reactive and neutral, not a proactive cross-channel comparison.",
    playerDialogue: "Your overall performance here actually looks strong - your demand and conversion are well up on your peer group. And I recall our last conversation where you mentioned that your prices are kept lower on another channel. Could you share your current strategy, and how Booking.com can best support your goals?",
    partnerResponse: "Yeah, I know what's going on. It's tricky for me - head office has a super strict policy that our direct channel stays cheaper than anyone else. We love working with you, but we've basically been told to treat Booking.com as a 'window' and accept lower visibility as a trade-off.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-none-step1-flat-drop",
    label: "Jump to a flat rate drop",
    description: "Skip the diagnosis and prescribe a public cut - which a franchise GM can't authorise, and which pressures a lower price a No Parity market doesn't permit.",
    playerDialogue: "Your prices here just aren't competitive and I don't think we need to overthink it - one fix is to bring your public price on our platform down a good amount so you're competitive again and the bookings come back.",
    partnerResponse: "I can't authorise a flat rate drop - it breaks head-office policy. That's a non-starter.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ep-r5-none-step1-fluff",
    label: "Open with a soft check-in",
    description: "Warm, no data - the wrong register for a direct, policy-bound franchise GM.",
    playerDialogue: "Hi Sophia, no big agenda today - I just wanted to check in and see how you're feeling about the partnership overall, whether things are running smoothly on your end and if anything's on your mind.",
    partnerResponse: "Let's be efficient - if there's a commercial point, show me the data.",
    styleMatch: { red: -2, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step110 = {
  id: "probe",
  label: "Surface the visibility drop and probe",
  partnerPrompt: "Hello! Yes, sure, let's dive in!",
  options: step1Options11
};
var step2Options13 = [
  {
    id: "ep-r5-none-step2-correct",
    label: "Collaborate; best price improves ranking, autonomy preserved",
    description: "SME-prescribed handling: ask how you can collaborate around the roadblock, acknowledge she follows internal guidelines and is free to price how she chooses, and explain that her best available price improves ranking and discovery for her whole business.",
    playerDialogue: "How can we collaborate to find a way around that roadblock? I know you have to follow your internal guidelines, and you're completely free to price how you choose. However, travelers often compare properties side-by-side on Booking.com. By making your best price available to our platform, it could make your property more attractive to travelers and benefit your overall business.",
    partnerResponse: "So you're saying being less competitive than our local rivals on your platform drags our own website down as well... Maybe. But even if that's true, my hands are tied - my bosses will lose their minds if our base rate on Booking.com matches our website rate.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-none-step2-require-lowest",
    label: "Require her lowest price",
    description: "Press her to hand over her lowest price to fix visibility. In a No Parity market you ask for her best available price - you don't require her lowest, and she can't give it anyway.",
    playerDialogue: "The way to fix this is pretty simple, and I don't want to overcomplicate it for you: just give us your single lowest price, the one you'd never normally share, and put it live on our platform. The moment you do that the visibility comes right back and you'll be sitting where you want to be in the results again.",
    partnerResponse: "'Give us your lowest' - I literally can't, that's the policy. Were you listening?",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "ep-r5-none-step2-fight-hq",
    label: "Tell her to push back on head office",
    description: "Tell her to fight her own head office and drop the policy. Dictating her internal strategy puts her in an impossible position.",
    playerDialogue: "I think head office has got this completely wrong, and someone needs to say it to them. You should push back hard on this policy - go to your bosses, lay out what it's costing you, and get that direct-cheaper rule dropped once and for all. Until you challenge them on it directly, nothing here is going to change for you.",
    partnerResponse: "Telling me to fight my own head office isn't help.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step213 = {
  id: "collaborate",
  label: "Collaborate and ask for her best price",
  partnerPrompt: "Yeah, I know what's going on. It's tricky for me - head office has a super strict policy that our direct channel stays cheaper than anyone else. We love working with you, but we've basically been told to treat Booking.com as a 'window' and accept lower visibility as a trade-off.",
  options: step2Options13
};
var step3Options13 = [
  {
    id: "ep-r5-none-step3-correct",
    label: "Explain the reverse billboard effect + 90% discovery",
    description: "SME-prescribed counter: yes, it creates a reverse billboard effect - if travelers can't find her on the platform they won't hunt for her website, they'll book competitors. 90% of bookers discover the property here first.",
    playerDialogue: "I hear you - but yes, it does create a reverse 'billboard effect': when travelers often find your prices less attractive on our platform, they may choose your peers here before they ever reach your website. Up to 90% of the customers who book with us discover the property here first - that's a powerful window for your entire visibility.",
    partnerResponse: "Well... it's true. How can we improve this without causing friction with our internal policies?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-none-step3-concede",
    label: "Concede that Booking.com is just a billboard",
    description: "Accepts the billboard framing with only a token nudge - never correcting the belief that a higher price here is harmless.",
    playerDialogue: "That's fair enough - the exposure you get from being listed with us really does help your name travel, so I wouldn't lose sleep over the gap. Maybe just trim a little at the margin whenever it suits you and the click-throughs should follow on their own over time. The wider model you've got here is basically sound, so there's no need to force anything.",
    partnerResponse: "So the model's fine, then? What are we actually solving here?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ep-r5-none-step3-ranking-threat",
    label: "Threaten a further ranking drop",
    description: "Threaten to drop her ranking further until she fixes her price. Threatening visibility over pricing is banned in every regime.",
    playerDialogue: "Let me be straight with you about how this works: if travelers genuinely can't find you near the top, our system reads that as a weak listing and it will keep dropping your ranking further, week after week, until you go in and fix the price. That slide won't stop on its own, and the longer the price stays where it is, the harder it gets to climb back up again.",
    partnerResponse: "Threatening my ranking over a policy I don't control is not a conversation I'll have.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step313 = {
  id: "billboard-counter",
  label: "Break the reverse-billboard belief",
  partnerPrompt: "So you're saying being less competitive than our local rivals on your platform drags our own website down as well... Maybe. But even if that's true, my hands are tied - my bosses will lose their minds if our base rate on Booking.com matches our website rate.",
  options: step3Options13
};
var step4Options11 = [
  {
    id: "ep-r5-none-step4-correct",
    label: "Offer a fenced family rate, autonomy preserved",
    description: "SME-prescribed solution: a policy-safe workaround - her family-traveler share lags peers, and family rates are already active, so instead of a general rate drop she can review and correct the family-rate configuration. The choice of strategy stays entirely hers.",
    playerDialogue: "We don't want to cause any friction - let's find an option that supports your revenue goal without breaking policy. Our data shows your share of family travelers is lower than your peers. Since Family rates are already active, we could review the setup and correct some configurations first. Would that fit within your head-office guidelines?",
    partnerResponse: "Yes we can try that. Corporate doesn't monitor segment rates. What kind of traction can we get from that?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-none-step4-general-discount",
    label: "Fall back on a general discount",
    description: "A general discount is the ADR-wide friction she's trying to avoid, and it wastes the compliant, fenced family route.",
    playerDialogue: "I'd keep this really simple - just run a small general discount across the board here on our platform and let it lift everything at once, rather than fiddling with individual segments. A modest cut applied to all your rates is the cleanest way to move the needle, it's easy to switch on, and the whole listing responds together at the same time.",
    partnerResponse: "A general discount is exactly the friction I'm trying to avoid.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ep-r5-none-step4-be-cheapest",
    label: "Tell her to be the cheapest anywhere",
    description: "Push her to price below her own site so she's the cheapest anywhere. Requiring a partner to be the cheapest is forbidden in a No Parity market - and it directly breaks her head-office policy.",
    playerDialogue: "The real fix here, if you want the visibility to genuinely come flooding back, is to make sure you're the cheapest option travelers can find anywhere - and yes, that means going below your own direct site, not just level with it. Undercut everyone, including your website, put that price live with us, and you'll shoot straight back up the results where you belong.",
    partnerResponse: "Cheaper than our own site would get me fired. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step410 = {
  id: "segmented",
  label: "Land the fenced family workaround",
  partnerPrompt: "Well... it's true. How can we improve this without causing friction with our internal policies?",
  options: step4Options11
};
var step5Options10 = [
  {
    id: "ep-r5-none-step5-correct",
    label: "Quantify the family upside and close",
    description: "SME-prescribed close: quantify it (10% competitiveness -> ~30% more bookings, ~25% more revenue) and note families spend more and stay longer, so it's a big revenue lift without cheapening the property for everyone else.",
    playerDialogue: "On average, improving price competitiveness by 10% on Booking.com generates about 30% more bookings and 25% more revenue. And because family bookings spend more and stay longer, this is a real high-value segment that can help maximize your occupancy and ADR. Let's set it up and I'll book a follow-up to review.",
    partnerResponse: "This is exactly the kind of support we need - it lets me hit my revenue targets while keeping the auditors perfectly happy. Let's set up that targeted family rate today and agree how we'll measure the results!",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ep-r5-none-step5-vague",
    label: "Agree, but give no numbers",
    description: "Never answers her question - the traction - and pins no review. A results-driven GM needs the numbers for corporate.",
    playerDialogue: "It'll help a lot, I'm really confident about that - the family angle is exactly the kind of thing that tends to work well for properties like yours. Let's just get the family rate switched on, keep it nice and simple for now, and then see how it goes over the coming weeks. I think you'll be pleased with the direction it takes.",
    partnerResponse: "I asked for the traction - I need the numbers to take back to corporate.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ep-r5-none-step5-overreach",
    label: "Push a public base cut on top",
    description: "Overreach past the fenced family rate to a public base cut - the exact ADR-wide, policy-breaking move she can't touch.",
    playerDialogue: "Perfect, let's do the family rate - and while we've got the momentum going, let's also bring your public base price down just a little at the same time to really push the whole thing along. If the family rate is going to lift things, a small trim on the main rate on top of it will accelerate the visibility even faster.",
    partnerResponse: "That's the base-rate move I can't touch. Family rate only.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step510 = {
  id: "close",
  label: "Quantify the family upside and close",
  partnerPrompt: "Yes we can try that. Corporate doesn't monitor segment rates. What kind of traction can we get from that?",
  options: step5Options10
};
var emeraldPeakNoneR5 = {
  conversationShape: "branching",
  partnerId: "emerald-peak-none",
  round: 5,
  issueTreePath: emeraldPeakR5IssueTreePath,
  openingAm: emeraldPeakOpeningAm,
  steps: [step110, step213, step313, step410, step510]
};

// src/data/scenarios/emerald-peak-narrow-r5.ts
var step1Options12 = [
  {
    id: "ep-r5-narrow-step1-correct",
    label: "Name the competitiveness impact, then ask her strategy and goals",
    description: "SME-prescribed probe: acknowledge her strong demand, surface that she's losing the price comparison against her own direct site on nearly every public search, then ask an open question about her strategy and goals.",
    playerDialogue: "Your demand here actually looks strong - your page views and conversion are well up on your peer group. The one thing standing out is price: on Booking.com you're losing the price comparison against your own direct site on virtually every public search. Before I go further - what's your current strategy, and what are your goals with us?",
    partnerResponse: "Let's be direct, Mei. This is an intentional strategy dictated by head office: we keep our website more competitive to own the customer relationship. We know it hits our OTA visibility, but we see Booking.com purely as a channel to boost visibility - travelers see us on your platform and then click to our website to book.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-narrow-step1-flat-drop",
    label: "Jump to a flat rate drop",
    description: "Skip the diagnosis and prescribe an across-the-board cut - which a franchise GM can't authorise, and which the SME guidance says to avoid.",
    playerDialogue: "Your rates just aren't competitive at the moment, and one fix I can see is to bring your Booking.com prices down across the board by a few percent so you're competitive again. Can we get that change made this week?",
    partnerResponse: "I can't authorise a flat rate drop - it breaks head-office policy and hits our ADR. That's a non-starter.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ep-r5-narrow-step1-fluff",
    label: "Open with a soft check-in",
    description: "Warm, no data - the wrong register for a direct, policy-bound franchise GM.",
    playerDialogue: "Hi Sophia, no big agenda from my side today - I just wanted to check in and see how you're feeling about the partnership overall, whether the team's happy with how things are going, and if there's anything on your mind lately.",
    partnerResponse: "Let's be efficient - if there's a commercial point, show me the data.",
    styleMatch: { red: -2, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step111 = {
  id: "probe",
  label: "Surface the competitiveness impact and probe",
  partnerPrompt: "Hello! Yes, sure, let's dive in!",
  options: step1Options12
};
var step2Options14 = [
  {
    id: "ep-r5-narrow-step2-correct",
    label: "Use the 90% discovery stat; the gap hurts both channels",
    description: "SME-prescribed counter: 90% of Booking.com bookers discover the property here first, so an uncompetitive price means travelers never find her and never reach her website - the gap lowers ranking and discovery for both channels.",
    playerDialogue: "I understand the intent. But guest behavior has changed - up to 90% of the customers who book with us discover the property on our platform first. When your pricing here is uncompetitive, you are less attractive to travelers, and they won't gravitate to your website either. This structural gap is lowering visibility and discovery for both channels in the long run.",
    partnerResponse: "The brand requires a rate advantage on our own website, no discussion. I cannot authorise a flat rate drop on Booking.com that impacts our ADR or breaks internal policies.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-narrow-step2-concede",
    label: "Concede that Booking.com is just a billboard",
    description: "Accepts her reverse-billboard framing with only a token nudge - never correcting the belief that a higher price here is harmless.",
    playerDialogue: "That's fair - the exposure you get from being on our platform genuinely does help drive awareness, so I take your point that the billboard effect is doing real work for you. Maybe all we do is trim a little at the very margin on a few dates, keep your website as the cheaper option, and let the click-throughs follow naturally from the visibility.",
    partnerResponse: "So you agree the billboard model works? Then what exactly are we fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ep-r5-narrow-step2-lecture",
    label: "Tell her the strategy is outdated",
    description: "Dismiss the head-office strategy as outdated. Lecturing a GM following mandated policy shuts the conversation down.",
    playerDialogue: "That whole billboard strategy your head office is pushing is pretty outdated at this point - the data just doesn't back it up anymore. On our platform most travelers compare on price before they ever click through to a property's own direct site.",
    partnerResponse: "You're telling me head-office policy is outdated? That's not a conversation I can have with you.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step214 = {
  id: "billboard-counter",
  label: "Break the reverse-billboard belief",
  partnerPrompt: "Let's be direct, Mei. This is an intentional strategy dictated by head office: we keep our website more competitive to own the customer relationship. We know it hits our OTA visibility, but we see Booking.com purely as a channel to boost visibility - travelers see us on your platform and then click to our website to book.",
  options: step2Options14
};
var step3Options14 = [
  {
    id: "ep-r5-narrow-step3-correct",
    label: "Respect brand integrity; ask for the same direct-channel rates",
    description: "SME-prescribed ask (Narrow): to optimize the 90% who discover her through us, ask for the same rates and conditions she provides to her direct channel - not other OTAs - framed as leveraging Booking.com's marketing scale and metasearch presence.",
    playerDialogue: "We don't want to compromise your brand integrity. But to optimize the 90% of travelers who discover you through us, we'd ask for the same rates and conditions you provide to your direct channel. When you leverage our global marketing scale and metasearch presence, you secure that incremental demand.",
    partnerResponse: "How can I match rates without violating my brand rules?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-narrow-step3-flat-drop",
    label: "Push the across-the-board drop again",
    description: "Come back to a blanket public cut - the one thing she's told you twice she can't authorise.",
    playerDialogue: "Look, I hear the brand-integrity point, but the cleanest answer on the table is to drop your public rates here on Booking.com by a few percent across the board - that one move gets you competitive again immediately, and everything else we've talked about is really just working around it. Can we do that?",
    partnerResponse: "I've told you twice - I can't authorise an across-the-board cut. Are you listening?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "ep-r5-narrow-step3-other-otas",
    label: "Ask her to undercut the other OTAs",
    description: "Ask her to make sure she isn't pricier than the other OTAs and match them here. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue: "And while we're at it, make sure you're not sitting pricier than the other OTAs either - go through the main ones, see where they've got you beaten, and match them here so you're lined up competitively everywhere travelers might be comparing you, not just against your own website.",
    partnerResponse: "You can't ask me to price against the other OTAs in this market.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step314 = {
  id: "ask",
  label: "Ask for direct-channel alignment without breaking brand rules",
  partnerPrompt: "The brand requires a rate advantage on our own website, no discussion. I cannot authorise a flat rate drop on Booking.com that impacts our ADR or breaks internal policies.",
  options: step3Options14
};
var step4Options12 = [
  {
    id: "ep-r5-narrow-step4-correct",
    label: "Offer a segmented family rate, not a general discount",
    description: "SME-prescribed solution: instead of a general discount, use a segmented family approach - she runs a family discount on her website, so matching those conditions here captures the demand without making the property cheaper for everyone.",
    playerDialogue: "So instead of a general discount, we use a segmented approach for the family segment, where you're underperforming. You already run a family discount on your website - matching those conditions on Booking.com captures that demand without making the property cheaper for everyone. I also see you offer a deal exclusively on your website. We can replicate that targeted approach here. Providing those same Brand.com conditions on Booking.com will help you capture travelers who rely solely on our platform.",
    partnerResponse: "A targeted approach might align with corporate if it captures unbooked inventory. What's the concrete return?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-narrow-step4-general-discount",
    label: "Fall back on a general discount",
    description: "The ADR-wide move she can't make - and it wastes the compliant, fenced family route.",
    playerDialogue: "One way to work within your rules is probably just a small general discount across the board here - nothing dramatic, just a few percent shaved off everything so the whole property reads as better value to travelers comparing options. It's the least fiddly option and we could switch it on today.",
    partnerResponse: "A general discount is the one thing I keep telling you I can't do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ep-r5-narrow-step4-ranking-threat",
    label: "Threaten a visibility penalty",
    description: "Threaten to keep her visibility penalized until she aligns. A visibility threat over pricing is banned in every regime.",
    playerDialogue: "I'll be straight with you - if you don't align on this, our system is going to keep penalizing your visibility until you do, and that decline compounds week over week. The longer it sits unaddressed the harder it gets to claw back, so this really is only going to get worse until you move on it.",
    partnerResponse: "Threatening my visibility to force my hand is exactly the wrong move. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step411 = {
  id: "segmented",
  label: "Land the segmented family solution",
  partnerPrompt: "How can I match rates without violating my brand rules?",
  options: step4Options12
};
var step5Options11 = [
  {
    id: "ep-r5-narrow-step5-correct",
    label: "Give the concrete return and propose a fenced family test",
    description: "SME-prescribed close: quantify the upside (10% competitiveness -> ~30% more bookings, ~25% more revenue, ~10% more search appearances) and propose a short test adjusting the family configuration to match her direct rates.",
    playerDialogue: "Improving your price competitiveness by just 10% on Booking.com generates, on average, 30% more bookings, 25% more revenue, and 10% more search appearances. Let's run a test over the next few weeks by adjusting the family configuration to match your direct rates, and review it together.",
    partnerResponse: "That fits into our current operations without breaking any internal rules. Let's set up the targeted family rates.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ep-r5-narrow-step5-vague",
    label: "Agree, but give no numbers or plan",
    description: "Never answers her question - the concrete return - and pins no test or review.",
    playerDialogue: "It'll definitely help, I'm confident of that - the upside here is real and you'll feel the difference once it's live. Let's not overthink it: let's just get the family rates switched on, leave them running, and see how it goes over the coming weeks before we worry about pulling any figures together.",
    partnerResponse: "I asked for the concrete return. 'See how it goes' won't get this past corporate.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ep-r5-narrow-step5-overreach",
    label: "Push a broad cut on top of the family rate",
    description: "Overreach past the fenced family test with a broad public cut she cannot authorise.",
    playerDialogue: "Perfect, that's great - and while we've got the momentum, let's not stop at the family rates. Let's also trim your public rates across the board here by a few percent at the same time, so the whole property looks sharper to travelers and we really move the needle on your numbers, not just the one segment.",
    partnerResponse: "That's the across-the-board cut I can't make. Stick to the family rates.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step511 = {
  id: "close",
  label: "Quantify the return and close on a fenced test",
  partnerPrompt: "A targeted approach might align with corporate if it captures unbooked inventory. What's the concrete return?",
  options: step5Options11
};
var emeraldPeakNarrowR5 = {
  conversationShape: "branching",
  partnerId: "emerald-peak-narrow",
  round: 5,
  issueTreePath: emeraldPeakR5IssueTreePath,
  openingAm: emeraldPeakOpeningAm,
  steps: [step111, step214, step314, step411, step511]
};

// src/data/scenarios/emerald-peak-wide-r5.ts
var step1Options13 = [
  {
    id: "ep-r5-wide-step1-correct",
    label: "Name the competitiveness impact, then ask her strategy and goals",
    description: "SME-prescribed probe: acknowledge her strong demand, surface that she's losing the price comparison on nearly every public search against both her direct site and the key OTAs, then ask an open question about her strategy and goals before recommending anything.",
    playerDialogue: "I've been reviewing your data, and the primary factor standing out is price: on Booking.com, your public rates are on average 12% higher than your own direct site almost all the time. While your demand here actually looks strong - your page views and conversion are well up on your peer group, the gap is capping your ability to capture unbooked inventory and maximize performance on our platform. Before I go further - what's your current strategy, and what are your goals with us?",
    partnerResponse: "Let's be direct, Mei. This is an intentional strategy dictated by head office: we keep our website more competitive to own the customer relationship. We know it hits our OTA visibility, but we see Booking.com purely as a channel to boost visibility - travelers see us on your platform and then click to our website to book.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-wide-step1-flat-drop",
    label: "Jump to a flat rate drop",
    description: "Skip the diagnosis and prescribe an across-the-board cut. It presumes the fix, ignores that a franchise GM can't authorise an ADR-wide drop, and is the exact move the SME guidance says to avoid.",
    playerDialogue: "Your rates just aren't competitive right now, and one fix is the straightforward one - let's bring your Booking.com prices down across the board so you're back in line with everyone else. Can we get that done today?",
    partnerResponse: "I can't authorise a flat rate drop - it breaks head-office policy and hits our ADR. That's a non-starter.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ep-r5-wide-step1-fluff",
    label: "Open with a soft check-in",
    description: "Warm, no data - the wrong register for a direct, time-pressured franchise GM who wants a commercial point.",
    playerDialogue: "Hi Sophia, no big agenda from my side today - I really just wanted to check in, see how you're feeling about the partnership overall, and hear whether everything has been running smoothly for you lately on your end.",
    partnerResponse: "Let's be efficient - if there's a commercial point, show me the data.",
    styleMatch: { red: -2, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step112 = {
  id: "probe",
  label: "Surface the competitiveness impact and probe",
  partnerPrompt: "Hello! Yes, sure, let's dive in!",
  options: step1Options13
};
var step2Options15 = [
  {
    id: "ep-r5-wide-step2-correct",
    label: "Use the 90% discovery stat; the gap hurts both channels",
    description: "SME-prescribed counter: 90% of Booking.com bookers discover the property here first, so if she's uncompetitive travelers never find her and never reach her website either - the structural gap lowers ranking and discovery for BOTH channels.",
    playerDialogue: "I understand the intent. But up to 90% of the customers who book with us discover the property on our platform first. When your pricing here is uncompetitive, you are less attractive to travelers, and may lose the booking before they ever reach your website. Since your current traffic is already strong, the opportunity is to convert more of that discovery without breaking the brand policy.",
    partnerResponse: "The brand requires a rate advantage on our own website, no discussion. I cannot authorise a flat rate drop on Booking.com that impacts our ADR or breaks internal policies.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-wide-step2-concede",
    label: "Concede that Booking.com is just a billboard",
    description: "Accepts her reverse-billboard framing and offers only a token nudge - never correcting the belief that a higher price here is harmless because guests will click through to her site.",
    playerDialogue: "That's fair, and I can see the logic - the exposure we give you genuinely does help drive awareness, so I don't want to overhaul anything you've built. Maybe the move is just to trim your prices here a little at the margin, keep the billboard exposure working the way you've set it up, and let the click-throughs to your own website follow naturally from there.",
    partnerResponse: "So you agree the billboard model works? Then what exactly are we fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ep-r5-wide-step2-lecture",
    label: "Tell her the strategy is outdated",
    description: "Dismiss the head-office strategy as outdated. Lecturing a GM who's simply following mandated policy shuts the conversation down.",
    playerDialogue: "If you don't mind me saying, that whole billboard strategy your head office is running feels pretty outdated to me now - on our platform most travelers compare on price before they ever click through to a property's own site. The mandate really isn't doing you any favors.",
    partnerResponse: "You're telling me head-office policy is outdated? That's not a conversation I can have with you.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step215 = {
  id: "billboard-counter",
  label: "Break the reverse-billboard belief",
  partnerPrompt: "Let's be direct, Mei. This is an intentional strategy dictated by head office: we keep our website more competitive to own the customer relationship. We know it hits our OTA visibility, but we see Booking.com purely as a channel to boost visibility - travelers see us on your platform and then click to our website to book.",
  options: step2Options15
};
var step3Options15 = [
  {
    id: "ep-r5-wide-step3-correct",
    label: "Respect brand integrity; ask for the same third-party + direct rates",
    description: "SME-prescribed ask: don't threaten her brand integrity - to optimize the 90% who discover her through us, ask for the same rates and conditions she gives third parties and her direct channel, framed as leveraging Booking.com's marketing scale and metasearch presence.",
    playerDialogue: "We don't want to compromise your brand integrity. But to optimize the 90% of travelers who discover you through us and capture travelers who use our platform exclusively, providing us the same rates and conditions you provide to third parties and your direct channel helps you maximize your reach for the rooms you do want to fill. When you leverage our global marketing scale and metasearch presence, you secure that incremental demand.",
    partnerResponse: "How can I match rates without violating my brand rules?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-wide-step3-flat-drop",
    label: "Push the across-the-board drop again",
    description: "Come back to a blanket public cut - the one thing she's told you twice she can't authorise. Ignoring her constraint reads as not listening.",
    playerDialogue: "Look, I hear you on the brand rules, but the cleanest answer here is still the same one - just drop your public rates on Booking.com by a few percent right across the board, nothing segmented or complicated, and that alone gets you back to competitive. It's one path and the one that moves the needle fastest.",
    partnerResponse: "I've told you twice - I can't authorise an across-the-board cut. Are you listening?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "ep-r5-wide-step3-dictate",
    label: "Tell her to overrule head office",
    description: "Tell her to go around her own head office and drop the direct-cheaper policy. Dictating her internal channel strategy oversteps and puts her in an impossible position.",
    playerDialogue: "If it were me sitting in your seat, I'd just push back hard on head office and scrap that whole direct-cheaper policy altogether - it's plainly costing you real bookings every single week, and you're the one on the ground who can actually see it. Tell them the mandate has to change.",
    partnerResponse: "You don't get to tell me to overrule my own head office. That's not how this works.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step315 = {
  id: "ask",
  label: "Ask for alignment without breaking brand rules",
  partnerPrompt: "The brand requires a rate advantage on our own website, no discussion. I cannot authorise a flat rate drop on Booking.com that impacts our ADR or breaks internal policies.",
  options: step3Options15
};
var step4Options13 = [
  {
    id: "ep-r5-wide-step4-correct",
    label: "Offer a segmented family rate, not a general discount",
    description: "SME-prescribed solution: instead of a general discount, use a segmented approach on the underperforming family segment - she already runs a family discount on other channels, so matching those conditions here captures the demand without making the property cheaper for everyone.",
    playerDialogue: "Providing the best price you can make available to Booking.com remains one of the strongest ways to improve visibility and unlock more demand. That said, I also understand that we need to prove the value within your brand rules first. We can start with a targeted approach for the family segment, where you're underperforming. You already run a family discount on other channels - matching those conditions on Booking.com captures that demand without making the property cheaper for everyone. Additionally, you could consider offering direct booking incentives (like member rates or value adds) instead of deep public discounts.",
    partnerResponse: "A targeted approach might align with corporate if it captures unbooked inventory. What's the concrete return?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r5-wide-step4-general-discount",
    label: "Fall back on a general discount",
    description: "Right that action is needed, wrong lever - a general discount is exactly the ADR-wide move she can't make, and it wastes the compliant, fenced route the family segment offers.",
    playerDialogue: "I think one way to work within your rules here is just a small general discount applied across the board on Booking.com - only a few percent, nothing dramatic - and that keeps everything consistent and easy for you to manage rather than fiddling with separate segment configurations.",
    partnerResponse: "A general discount is the one thing I keep telling you I can't do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ep-r5-wide-step4-ranking-threat",
    label: "Threaten a visibility penalty",
    description: "Threaten to keep her visibility penalized until she aligns. Threatening ranking/visibility over her pricing is banned in every regime.",
    playerDialogue: "I'll be honest with you about how this actually works - if you don't align your pricing with us, our system is going to keep penalizing your visibility on the platform until you do, and it's only going to get worse from here. Aligning now really is the only way to stop that from happening.",
    partnerResponse: "Threatening my visibility to force my hand is exactly the wrong move. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step412 = {
  id: "segmented",
  label: "Land the segmented family solution",
  partnerPrompt: "How can I match rates without violating my brand rules?",
  options: step4Options13
};
var step5Options12 = [
  {
    id: "ep-r5-wide-step5-correct",
    label: "Give the concrete return and propose a fenced family test",
    description: "SME-prescribed close: quantify the upside (10% competitiveness -> ~30% more bookings, ~25% more revenue, ~10% more search appearances) and propose a short test adjusting the family configuration to match her direct rates.",
    playerDialogue: "Improving your price competitiveness by 10% on Booking.com generates, on average, 30% more bookings, 25% more revenue, and 10% more search appearances. Let's run a test over the next few weeks by adjusting the family configuration to match your direct rates and on third parties, and review it together.",
    partnerResponse: "That fits into our current operations without breaking any internal rules. Let's set up the targeted family rates.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ep-r5-wide-step5-vague",
    label: "Agree, but give no numbers or plan",
    description: "Takes the win but never answers her direct question - the concrete return - and pins no test or review. A results-driven GM won't act on that.",
    playerDialogue: "I'm confident this is going to help you a lot - I really wouldn't overthink the exact numbers at this stage. Let's just get the family rates switched on at your end, keep an eye on things as they come through, and see how it all goes over the coming weeks.",
    partnerResponse: "I asked for the concrete return. 'See how it goes' won't get this past corporate.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ep-r5-wide-step5-overreach",
    label: "Push a broad cut on top of the family rate",
    description: "Overreach past the fenced family test with a broad public cut - straight back to the ADR-wide move she cannot authorise.",
    playerDialogue: "Perfect, that's great to hear - and while we've got the momentum going and you're already making changes here, let's also go ahead and trim your public rates across the board at the same time, just to really move the needle and capture everything we possibly can.",
    partnerResponse: "That's the across-the-board cut I can't make. Stick to the family rates.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step512 = {
  id: "close",
  label: "Quantify the return and close on a fenced test",
  partnerPrompt: "A targeted approach might align with corporate if it captures unbooked inventory. What's the concrete return?",
  options: step5Options12
};
var emeraldPeakWideR5 = {
  conversationShape: "branching",
  partnerId: "emerald-peak-wide",
  round: 5,
  issueTreePath: emeraldPeakR5IssueTreePath,
  openingAm: emeraldPeakOpeningAm,
  steps: [step112, step215, step315, step412, step512]
};

// src/data/scenarios/oceanfront-base.ts
var oceanfrontR6IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "brand-com-erpd-not-competitive",
  intent: "intentional",
  rootCauseId: "structural-brand-first",
  metricInsightId: "structural-constant-non-competitive-erpd",
  hookId: "base-rate-misalignment"
};
var oceanfrontOpeningAm = "Hi Priya, thanks for jumping into the call! I've been analyzing the performance trends for your property - particularly your visibility and search traffic over the last month.";

// src/data/scenarios/oceanfront-none-r6.ts
var step1Options14 = [
  {
    id: "ob-r6-none-step1-correct",
    label: "Credit the appeal, name the page-view drop, explain search behavior",
    description: "SME-prescribed reveal: the property is highly appealing, but page views have fallen 89%; travelers gravitate to the best relative value on the results page, and right now she isn't as competitive as her peer group most of the time.",
    playerDialogue: "The property itself is highly appealing, but your page views have fallen 89%. When we look at how guests search, travelers gravitate toward the options that offer the best relative value on the results page - and right now, most of the time, your property isn't as competitive as your peer group on our site.",
    partnerResponse: "Ah, I see what you're pointing out. We want to protect our loyalty members, so we offer exclusive discounts on our own site on purpose. The thinking is: if we open those same prices to everyone on third-party channels, it takes away the incentive to book directly.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-none-step1-drop-price",
    label: "Jump to dropping her public price",
    description: "Skip the diagnosis and press her to lower her public price. It presumes the fix, and pressuring a lower price isn't permitted in a No Parity market.",
    playerDialogue: "One way to turn this around is to bring your public price here down. If you lower what you're charging on our platform so you're clearly cheaper than the properties around you, the visibility comes straight back and the bookings follow - so let's get that price down first and worry about the rest afterward.",
    partnerResponse: "You're telling me to cut my price before you've explained the actual problem. Slow down.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ob-r6-none-step1-fluff",
    label: "Reassure her it will pass",
    description: "Warm but empty - she came with data and asked for insight; brushing it off reads as unserious.",
    playerDialogue: "I really wouldn't worry too much about any of this. In my experience these things tend to move around a lot from one quarter to the next, and they usually even out on their own once the season settles. I'd give it a little more time before we read too much into a single dip like this - it'll come back.",
    partnerResponse: "I came to you with the data and asked for insight. 'It'll even out' isn't that.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step113 = {
  id: "reveal",
  label: "Reveal the visibility collapse",
  partnerPrompt: "Hi Zara! Always a pleasure. I've been looking over the data, and I'm a bit concerned. Our room nights are down 36% compared to our direct competitors, and our year-over-year production has dropped significantly. I'd love your insights on how we can turn this around together.",
  options: step1Options14
};
var step2Options16 = [
  {
    id: "ob-r6-none-step2-correct",
    label: "Validate the concern; probe occupancy and acquisition cost",
    description: "SME-prescribed probe: acknowledge the loyalty concern as common, then ask - to understand her perspective - what occupancy looks like and how much she spends on marketing and new-guest acquisition.",
    playerDialogue: "That's a very common concern. To understand your perspective better - what does your occupancy look like at the moment, and how much are you currently spending on acquiring new guests through your own marketing?",
    partnerResponse: "Occupancy is definitely an issue at the moment. I see the same trend also from other channels and acquisition costs are quite high right now, especially when trying to reach international travelers through paid ads.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-none-step2-prescribe",
    label: "Skip the probe and prescribe a discount",
    description: "Right that action is needed, wrong move - it jumps to a discount without understanding her occupancy or costs, so the recommendation isn't grounded in her economics.",
    playerDialogue: "The answer's clear enough - just take the loyalty discount you keep for your own site and open it up to everyone here on our platform, and the volume comes straight back on its own once that rate reaches all our traffic.",
    partnerResponse: "You didn't ask a single question about my business before telling me to give my discount away.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ob-r6-none-step2-dismiss-loyalty",
    label: "Dismiss her loyalty strategy",
    description: "Wave away her loyalty-member discounts as pointless. Dismissive of a deliberate strategy she just explained - it shuts the collaboration down.",
    playerDialogue: "Protecting your loyalty members with cheaper rates on your own site is a waste of effort - all it's really doing is holding back the traffic we could be sending you and quietly costing you the bookings you're trying to protect.",
    partnerResponse: "My loyalty base isn't a waste - it's the backbone of my business. Careful.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step216 = {
  id: "probe-cost",
  label: "Probe occupancy and acquisition cost",
  partnerPrompt: "Ah, I see what you're pointing out. We want to protect our loyalty members, so we offer exclusive discounts on our own site on purpose. The thinking is: if we open those same prices to everyone on third-party channels, it takes away the incentive to book directly.",
  options: step2Options16
};
var step3Options16 = [
  {
    id: "ob-r6-none-step3-correct",
    label: "Offer the best-price case with autonomy preserved",
    description: "SME-prescribed handling: her distribution strategy is entirely hers, but her best competitive price lets her leverage the platform's visibility at zero upfront cost to fill empty rooms and turn them into future loyal guests.",
    playerDialogue: "That's exactly where our value comes in. You're completely free to determine your distribution strategy - but by offering us your best competitive price, you leverage our platform's visibility at zero upfront cost to fill your empty rooms and convert them into future loyal guests.",
    partnerResponse: "That makes complete sense. If we lose the traveler at the search stage on your platform, they won't choose us directly or otherwise - they just book a competitor hotel.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-none-step3-require-lowest",
    label: "Require her lowest price",
    description: "Press her to hand over her lowest price. In a No Parity market you ask for her best available price - you don't require her lowest.",
    playerDialogue: "What we really need from you is your lowest price on our platform - not your best available one, your actual floor. Give us the lowest number you'd ever go to anywhere and put it here, and the visibility you've lost comes right back the moment you do it.",
    partnerResponse: "'Your lowest price' isn't a request, it's a demand. My pricing is my call.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "ob-r6-none-step3-ranking-threat",
    label: "Threaten her ranking",
    description: "Threaten a continued visibility drop until she improves her price. Threatening ranking over her pricing is banned in every regime.",
    playerDialogue: "If you stay less competitive than the properties around you, our system will keep ranking you below them, search after search, and that visibility will keep sliding until you bring your price down to where it needs to be - the ranking only recovers once you fix the price.",
    partnerResponse: "Threatening my ranking to force a price cut is not a conversation I'll have.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step316 = {
  id: "best-price",
  label: "Make the best-price case",
  partnerPrompt: "Occupancy is definitely an issue at the moment. I see the same trend also from other channels and acquisition costs are quite high right now, especially when trying to reach international travelers through paid ads.",
  options: step3Options16
};
var step4Options14 = [
  {
    id: "ob-r6-none-step4-correct",
    label: "Quantify the incremental-demand upside",
    description: "SME-prescribed value: it's about capturing incremental demand in the soft periods - improving competitiveness ~10% yields on average 30% more bookings and 25% more revenue, an excellent channel for net-new guests.",
    playerDialogue: "Exactly - it's about capturing incremental demand in the periods where the hotel is soft. Improving competitiveness by about 10% generates, on average, a 30% increase in bookings and a 25% increase in revenue on our platform. It's an excellent channel for capturing new guests who might not otherwise find you.",
    partnerResponse: "This is the kind of data I can take back to help adjust the strategy. What would be the best next step to improve our price position?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-none-step4-no-data",
    label: "Reassure her without the numbers",
    description: "Agrees it'll help but gives an ROI-driven owner nothing quantitative to take back - she needs the figures to move.",
    playerDialogue: "Trust me on this one - being more competitive here really will make a genuine difference to how you perform, and once you get that price into a better position you'll start to see the bookings picking up steadily. It's the kind of thing that just works once you commit to it, so I'd back it wholeheartedly.",
    partnerResponse: "'Trust me' won't get this past my team. Give me numbers I can present.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ob-r6-none-step4-guilt",
    label: "Guilt-trip her about losing guests",
    description: "Guilt-trip her that her caution is costing her guests. Accusatory - it burns the collaborative tone she's been giving you.",
    playerDialogue: "Frankly, I have to be straight with you - the longer you dig in and hold this position, the more it ends up costing you the very guests you keep telling me you want. At some point you have to admit the caution is working against you here, not for you.",
    partnerResponse: "Pressuring me like that when I'm trying to work with you is a poor move.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step413 = {
  id: "quantify",
  label: "Quantify the incremental demand",
  partnerPrompt: "That makes complete sense. If we lose the traveler at the search stage on your platform, they won't choose us directly or otherwise - they just book a competitor hotel.",
  options: step4Options14
};
var step5Options13 = [
  {
    id: "ob-r6-none-step5-correct",
    label: "Name the base-price next step and a team follow-up",
    description: "SME-prescribed close: updating her base prices to be fully competitive is the most direct way to revive visibility; propose a follow-up in a few weeks to review the traffic once she's discussed it with her team.",
    playerDialogue: "Updating your base prices to be competitive here is the most direct way to revive that visibility. Would you be open to a follow-up in a few weeks to review the traffic outcomes, once you've discussed it with your team?",
    partnerResponse: "Absolutely, Zara! I'll present these insights to the group today and suggest we adjust the rates to remain competitive. Let's connect in two weeks to look at the data together.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ob-r6-none-step5-drop-all",
    label: "Tell her to cut everything now",
    description: "Fall back on a blanket cut across all rates - the ADR-eroding move an ROI-driven owner will resist, and there's nothing clean to measure.",
    playerDialogue: "The best next step here is simple - just cut every one of your rates across the board by 10% right now, tonight if you can, and the visibility you've lost comes straight back the moment those new numbers go live on our platform.",
    partnerResponse: "A blanket cut across everything torches my ADR. That's not the next step.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "ob-r6-none-step5-be-cheapest",
    label: "Tell her to be the cheapest anywhere",
    description: "Push her to price below her own site so she's the cheapest anywhere. Requiring a partner to be the cheapest is forbidden in a No Parity market.",
    playerDialogue: "If you really want to win this, make sure the price you show here on our platform is the lowest one you have anywhere at all - set it deliberately below what you charge on your own website, so no other channel can undercut you on the way to a booking.",
    partnerResponse: "Pricing below my own site to be cheapest everywhere is off the table.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step513 = {
  id: "close",
  label: "Name the next step and close",
  partnerPrompt: "This is the kind of data I can take back to help adjust the strategy. What would be the best next step to improve our price position?",
  options: step5Options13
};
var oceanfrontNoneR6 = {
  conversationShape: "branching",
  partnerId: "oceanfront-none",
  round: 6,
  issueTreePath: oceanfrontR6IssueTreePath,
  openingAm: "Hi Priya! It's great to connect with you. How can we collaborate today to help boost your property's performance as we head into the new quarter?",
  steps: [step113, step216, step316, step413, step513]
};

// src/data/scenarios/oceanfront-narrow-r6.ts
var step1Options15 = [
  {
    id: "ob-r6-narrow-step1-correct",
    label: "Credit the conversion, then name the visibility collapse",
    description: "SME-prescribed reveal: her conversion is outstanding - 17% above her local peer group - but page views are down 89%, and the likely root cause is a Booking.com price running ~10% higher than her website 66% of the time.",
    playerDialogue: "Let's look at the data together. When guests find your property, your conversion rate is outstanding - beating your local peer group by 17%. But your page views are down 89%. The likely root cause is that your Booking.com price is consistently around 10% higher than your website around 65% of the time.",
    partnerResponse: "Let's be honest, Zara. That's entirely by design. I want travelers to find us on Booking.com, see the higher price, and think, 'let me go to their direct website for a better deal.' It's a practical tool to drive direct bookings and save on costs.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-narrow-step1-flat-drop",
    label: "Jump to a flat rate drop",
    description: "Skip the diagnosis and prescribe an across-the-board cut - it presumes the fix and hands an ROI-driven owner nothing to weigh.",
    playerDialogue: "I can tell you right now what this is - your numbers are down because your Booking.com rates are too expensive compared to your peers. The fix is straightforward: drop your rates across the board to the same level as your website, and the traffic comes straight back the moment you do it. That's the whole story.",
    partnerResponse: "You're telling me to cut all my rates before you've explained a thing. Walk me through the actual problem first.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ob-r6-narrow-step1-fluff",
    label: "Open with a soft check-in",
    description: "Warm, no data - the wrong register for an owner who just asked what is going on with her visibility.",
    playerDialogue: "I really wouldn't read too much into one slower month - these things move around a lot and it's usually nothing to worry about. Before we dig into any numbers, I'd love to just hear how the season's been treating you, how the team's doing, and whether there's anything else on your mind I can help with today.",
    partnerResponse: "I asked what's going on with my visibility. If it's just a slow month, tell me; if it isn't, show me.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step114 = {
  id: "reveal",
  label: "Reveal the visibility collapse",
  partnerPrompt: "Well, Zara, we're seeing traction locally, but our volume through you has slowed down significantly compared to last year. What's going on with our visibility on your platform?",
  options: step1Options15
};
var step2Options17 = [
  {
    id: "ob-r6-narrow-step2-correct",
    label: "Explain how travelers actually search; probe the website cost",
    description: "SME-prescribed counter: when travelers compare side-by-side and her offer isn't attractive, they click a cheaper competitor rather than hunting for her website. Then probe how her direct site is doing and what it costs.",
    playerDialogue: "I understand the strategy, but search behavior works a bit differently. When travelers compare properties side-by-side on our platform and your offer isn't attractive, they click a cheaper competitor instead of searching for your website. How is your direct website doing?",
    partnerResponse: "We run campaigns and ads on our side, so we can't tell exactly where the traffic comes from, but visibility on our direct website is increasing and that's what we aim for.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-narrow-step2-concede",
    label: "Agree the markup drives direct bookings",
    description: "Concedes the reverse-billboard premise and never corrects the belief driving the visibility loss.",
    playerDialogue: "That's fair, and I can see the logic in it - keeping your Booking.com price higher than your website does push a number of guests to go and book with you directly, which saves you the commission you'd otherwise pay us. But you're also missing out on new guests who decided to book a cheaper competitor. So the strategy you've built is working the way you intended it to by driving some direct bookings but hurting you overall.",
    partnerResponse: "So the markup is fine? Then I'm not sure what you're here to fix.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ob-r6-narrow-step2-lecture",
    label: "Call her strategy a gimmick",
    description: "Dismiss the direct-cheaper play as a gimmick that doesn't work. Lecturing an owner who just told you it's deliberate shuts the conversation down.",
    playerDialogue: "That whole 'see it higher, then book direct' idea is a bit of a gimmick, and I'd be doing you a disservice if I didn't just say so plainly - it doesn't actually work the way you think it does, travelers don't behave like that, and the sooner you drop the markup and stop relying on it, the better off you'll be.",
    partnerResponse: "You calling my strategy a gimmick isn't going to get us anywhere.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step217 = {
  id: "billboard-counter",
  label: "Correct the reverse-billboard belief",
  partnerPrompt: "Let's be honest, Zara. That's entirely by design. I want travelers to find us on Booking.com, see the higher price, and think, 'let me go to their direct website for a better deal.' It's a practical tool to drive direct bookings and save on costs.",
  options: step2Options17
};
var step3Options17 = [
  {
    id: "ob-r6-narrow-step3-correct",
    label: "Ask her to match her direct rates to protect discoverability",
    description: "SME-prescribed ask: if visibility is fine on her website, improve it here too - matching her direct rates wins the guests who start on our platform and protects her ranking and discoverability.",
    playerDialogue: "If visibility is fine on your website, why not improve it on our platform too? What would help is matching your direct rates here, so you win the guests who start their journey with us and protect your discoverability.",
    partnerResponse: "I see your point about losing them to the guy down the street before they even know who we are. But how does this affect my overall revenue mix if I bring the rates into alignment?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-narrow-step3-undercut",
    label: "Ask her to price below her own website",
    description: "Right that competitiveness matters, wrong ask - undercutting her own site is the opposite of what she wants and skips the neutral direct-alignment framing.",
    playerDialogue: "The clean fix here is to set your Booking.com price a little lower than the rate on your own direct site, so when travelers are comparing options they just pick you here without a second thought and you win that booking every time.",
    partnerResponse: "Undercutting my own website is the opposite of what I want. That's a non-starter.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ob-r6-narrow-step3-other-otas",
    label: "Tell her to also undercut the other OTAs",
    description: "Ask her to make sure she isn't pricier than the other OTAs and match them here. In a Narrow market you may only align with Brand.com - policing other-OTA prices oversteps.",
    playerDialogue: "While we're at it, make sure you're not sitting any pricier than the other big OTAs are showing either - go through their rates, match whatever they've got you listed at, and bring yourself into line here so you stay competitive everywhere.",
    partnerResponse: "You can't ask me to price against the other OTAs in this market.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step317 = {
  id: "align-ask",
  label: "Ask for direct-rate alignment",
  partnerPrompt: "We run campaigns and ads on our side, so we can't tell exactly where the traffic comes from, but visibility on our direct website is increasing and that's what we aim for.",
  options: step3Options17
};
var step4Options15 = [
  {
    id: "ob-r6-narrow-step4-correct",
    label: "Run the acquisition-cost math; reframe to incremental demand",
    description: "SME-prescribed reframe: if she's ~10% cheaper direct and her acquisition cost is ~10%, her direct acquisition cost is higher than your commission - and this is about incremental demand, not stealing her direct guests.",
    playerDialogue: "Let's say your rates are around 10% cheaper than the ones on Booking.com - your acquisition cost could be higher than the commission you pay to us. This isn't about stealing your direct guests, but finding incremental demand.",
    partnerResponse: "It's about total revenue stability at the end of the day, isn't it? If I can get some revenue from those empty rooms, it's worth a trial.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-narrow-step4-just-cheaper",
    label: "Make it a discount argument",
    description: "Turns the reframe into a 'be cheaper here than anywhere else' pitch - which in a Narrow market oversteps (you may only align with her own direct site, not push her below every channel), and walks into her fear of eroding direct.",
    playerDialogue: "Look, I'll cut through all the math for you - the bottom line is that you need to be cheaper on our platform than you are anywhere else, plain and simple. That's the one lever that actually moves the volume, so bring your rates down here and the bookings will follow. It really is that straightforward.",
    partnerResponse: "'Just be cheaper' isn't a revenue case. Give me the actual economics.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "ob-r6-narrow-step4-guilt",
    label: "Guilt-trip her about losing guests",
    description: "Guilt-trip her that her strategy is costing her guests. Accusatory - it burns the collaborative tone an autonomous owner responds to.",
    playerDialogue: "I'm going to be straight with you because someone has to - holding on to this position is quietly costing you the very guests you keep telling me you care so much about, month after month, and you're the one standing in the way of fixing it.",
    partnerResponse: "Pressuring me about my own business like that isn't the way to work together.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step414 = {
  id: "roi-math",
  label: "Land the acquisition-cost math",
  partnerPrompt: "I see your point about losing them to the guy down the street before they even know who we are. But how does this affect my overall revenue mix if I bring the rates into alignment?",
  options: step4Options15
};
var step5Options14 = [
  {
    id: "ob-r6-narrow-step5-correct",
    label: "Confirm direct-rate alignment and a monthly review",
    description: "SME-prescribed close: confirm matching her rates across both channels so she stops losing those bookings, and propose reviewing the rates now with a month-out check-in.",
    playerDialogue: "Exactly. Let's make sure your rates match your direct site so you stop losing those bookings. Why don't we look at the rates now and review the results in a month?",
    partnerResponse: "Let's do it, Zara. Let's align the rates and see if we can get those search views back.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ob-r6-narrow-step5-drop-all",
    label: "Tell her to reduce all her rates now",
    description: "Fall back on the blanket cut - reduce everything at once - which erodes her ADR premium and gives her nothing clean to measure.",
    playerDialogue: "One thing here is to just reduce every one of your rates right now by a flat 10% across the board, then sit back and watch all that lost volume come straight back to you.",
    partnerResponse: "An across-the-board cut torches my ADR - that's exactly what I don't want.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "ob-r6-narrow-step5-ranking-threat",
    label: "Threaten a further visibility drop",
    description: "Close with a ranking threat if she doesn't align. Threatening visibility over her pricing is banned in every regime.",
    playerDialogue: "To be very clear about this - if you choose not to align those rates, our system is going to keep pushing your visibility further down until the day you finally do.",
    partnerResponse: "Ending on a threat about my ranking is the fastest way to lose me. We're done.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step514 = {
  id: "close",
  label: "Confirm the alignment and close",
  partnerPrompt: "It's about total revenue stability at the end of the day, isn't it? If I can get some revenue from those empty rooms, it's worth a trial.",
  options: step5Options14
};
var oceanfrontNarrowR6 = {
  conversationShape: "branching",
  partnerId: "oceanfront-narrow",
  round: 6,
  issueTreePath: oceanfrontR6IssueTreePath,
  openingAm: oceanfrontOpeningAm,
  steps: [step114, step217, step317, step414, step514]
};

// src/data/scenarios/oceanfront-wide-r6.ts
var step1Options16 = [
  {
    id: "ob-r6-wide-step1-correct",
    label: "Credit the conversion, then name the visibility collapse",
    description: "SME-prescribed reveal: acknowledge her conversion is 17% above peer, then surface the hard numbers - page views down 89% vs peers and room nights down 84% year-on-year for the same window.",
    playerDialogue: "That's exactly what I want to address. Our data shows your prices on Booking.com are almost 10% higher than your direct website across two-thirds of public checks on average. Because travelers compare rates across search channels, large price differences between Booking.com and other channels can erode trust, delay bookings and push travelers towards other properties. Your conversion rate is actually 17% higher than your peer group, so travelers who see you are converting well. But your page views are down 89% versus your peers, and your room nights are down 84% year-on-year for the same 30-day window.",
    partnerResponse: "A drop of 89% in page views is significant. Why is the visibility failing so drastically if our conversion is that high?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-wide-step1-flat-drop",
    label: "Jump to a flat rate drop",
    description: "Skip the diagnosis and prescribe an across-the-board cut. It presumes the fix and hands an ROI-driven owner nothing to weigh - exactly the move she'll ask you to justify later.",
    playerDialogue: "Your numbers are down because you're too expensive, plain and simple. The fix here is straightforward - drop your Booking.com rates right across the board, keep them low, and the traffic and the bookings come straight back to you.",
    partnerResponse: "You're telling me to cut all my rates before you've explained a thing. Walk me through the actual problem first.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ob-r6-wide-step1-fluff",
    label: "Open with a soft check-in",
    description: "Warm, no data - the wrong register for an owner who opened by asking exactly what the data shows.",
    playerDialogue: "I really wouldn't read too much into one quieter month - these things tend to even themselves out over time. How have things been going for you and the team otherwise, and how's the wider season shaping up on your side?",
    partnerResponse: "I asked what the data shows. If it's just a slow month, tell me; if it isn't, show me.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step115 = {
  id: "reveal",
  label: "Reveal the visibility collapse",
  partnerPrompt: "Hello Zara. Thanks for doing that. I can see our production on your platform is dropping. What exactly does the data show? Our direct channel is holding strong - that's our primary focus - but I've noticed our room nights with you are down.",
  options: step1Options16
};
var step2Options18 = [
  {
    id: "ob-r6-wide-step2-correct",
    label: "Connect visibility to the Brand.com price gap",
    description: "SME-prescribed explanation: it's about how appealing the offer looks in search - her Booking.com price runs almost 10% higher than her website 65% of the time, which hammers how attractive she looks on the results page and on meta.",
    playerDialogue: "It comes back to how attractive your offer looks in search. Your Booking.com price is almost 10% higher than your website around two-thirds of public price checks. That affects how attractive your property looks on our site - especially when travelers compare on meta, or against your competitors on our platform.",
    partnerResponse: "That is entirely intentional. Booking.com is a direct competitor for us, so we will never let third-party platforms capture more than 30% of our total business. I'd honestly rather leave a room empty during certain windows than compromise our brand.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-wide-step2-concede",
    label: "Agree the markup drives direct bookings",
    description: "Concedes the reverse-billboard premise - that a higher price here is fine because it pushes guests to book direct - and never corrects the belief driving the visibility loss.",
    playerDialogue: "That's a fair point, and I can see the logic in it. Keeping your Booking.com price a little higher than your own website does naturally push a portion of guests back towards booking direct with you, which is where you'd rather have them anyway. So in that sense the strategy you've built is basically doing exactly what you designed it to do, and it's working.",
    partnerResponse: "So the markup is fine? Then I'm not sure what you're here to fix.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ob-r6-wide-step2-lecture",
    label: "Call the 30% cap a mistake",
    description: "Tell her the cap and the direct-cheaper play are simply wrong. Lecturing an owner who just told you the strategy is deliberate shuts the conversation down.",
    playerDialogue: "I'll be straight with you - that 30% cap and the decision to keep your own site cheaper than us is just a plain mistake, and I think you know it. You're leaving a serious amount of money on the table every single month by clinging to it, and my strong advice is that you should stop doing this and change the approach now.",
    partnerResponse: "I just told you it's deliberate. If you're here to tell me my strategy is a mistake, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step218 = {
  id: "search-gap",
  label: "Explain the search-price gap",
  partnerPrompt: "A drop of 89% in page views is significant. Why is the visibility failing so drastically if our conversion is that high?",
  options: step2Options18
};
var step3Options18 = [
  {
    id: "ob-r6-wide-step3-correct",
    label: "Frame it as allies; probe the acquisition cost of the 70%",
    description: "SME-prescribed probe: position it as a shared goal, then ask how she's capturing the other 70% and what the acquisition cost is - the question that sets up the ROI math.",
    playerDialogue: "I understand you want to keep Booking.com within that 30% cap. And we would like to better support you in achieving your overall performance goal. How are you capturing the other 70% today, and roughly what does that cost you per booking?",
    partnerResponse: "We run marketing campaigns and sponsored ads, and we have a solid reputation with US and Canadian guests. I don't know the exact cost - probably around 10% of the room price on our website.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-wide-step3-push-cap",
    label: "Push her to lift the 30% cap",
    description: "Argue the cap directly instead of probing the economics. Telling an autonomous owner to hand you more volume, before you've earned it with the numbers, gets a fast no.",
    playerDialogue: "The real issue here is that 30% cap you've set - you should lift it and let us go ahead and drive a great deal more of your overall business through the platform.",
    partnerResponse: "The cap isn't up for debate. Give me a reason that isn't just 'give Booking.com more.'",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "ob-r6-wide-step3-ranking-threat",
    label: "Threaten her ranking",
    description: "Threaten a further visibility drop unless she aligns. Threatening ranking over her pricing is banned in every regime.",
    playerDialogue: "If you keep pricing higher than your own direct site, our system is going to keep dropping your visibility lower and lower until you finally decide to fix it.",
    partnerResponse: "Threatening my ranking over how I price my own website is not how you'll win me over.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step318 = {
  id: "probe-cost",
  label: "Probe the acquisition cost",
  partnerPrompt: "That is entirely intentional. Booking.com is a direct competitor for us, so we will never let third-party platforms capture more than 30% of our total business. I'd honestly rather leave a room empty during certain windows than compromise our brand.",
  options: step3Options18
};
var step4Options16 = [
  {
    id: "ob-r6-wide-step4-correct",
    label: "Run the acquisition-cost math; reframe to net-new guests",
    description: "SME-prescribed reframe: if her rates are ~10% cheaper direct and her acquisition cost is ~10%, her direct acquisition cost is higher than your commission. And this isn't about stealing direct guests - it's finding net-new ones who'd never discover the property.",
    playerDialogue: "Look at it from a revenue perspective. If your rates are around 10% cheaper on your direct site and your acquisition cost is also around 10%, then your direct-booking acquisition cost is actually higher than the commission you pay us. And this isn't about stealing your direct guests - it's about finding new guests who would otherwise never discover the property.",
    partnerResponse: "I understand that being more competitive on your platform could be a win for our overall strategy. But how can I measure the impact if we just reduce all the rates at once?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ob-r6-wide-step4-just-cheaper",
    label: "Argue you should simply be cheaper than direct",
    description: "Right that competitiveness matters, wrong framing - it makes it a discount argument ('be cheaper here') rather than the acquisition-cost case, and it walks straight into her fear of eroding direct.",
    playerDialogue: "It's actually pretty simple when you break it down - all you really need to do is make sure your Booking.com price sits a little lower than the price on your own direct site, so that when travelers are comparing the two side by side, they naturally pick you here on our platform every time rather than heading off elsewhere.",
    partnerResponse: "Undercutting my own website is the opposite of what I want. Give me the commercial case, not a discount.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ob-r6-wide-step4-guilt",
    label: "Guilt-trip her about losing loyal guests",
    description: "Guilt-trip her that her strategy is costing her loyal guests. Emotive and accusatory - it burns the ally framing you need with an autonomous owner.",
    playerDialogue: "Frankly, I have to be straight with you - holding on to this strategy is quietly costing you the very loyal guests you keep telling me you care so much about, and every month you leave it, more of them slip away. At some point you've got to ask whether it's really worth what it's costing you.",
    partnerResponse: "Pressuring me about my own business like that is a strange way to build an alliance.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -11
  }
];
var step415 = {
  id: "roi-math",
  label: "Land the acquisition-cost math",
  partnerPrompt: "We run marketing campaigns and sponsored ads, and we have a solid reputation with US and Canadian guests. I don't know the exact cost - probably around 10% of the room price on our website.",
  options: step4Options16
};
var step5Options15 = [
  {
    id: "ob-r6-wide-step5-correct",
    label: "Ask for the same rates/availability as her other channels; propose a test",
    description: "SME-prescribed ask: frame the platform as a zero-marketing-cost global search engine, ask for the same rates and availability she gives third parties and her direct channel as the first step, and propose starting this week with a measured window.",
    playerDialogue: "Booking.com gives you access to travelers globally who may never find your site, without an upfront marketing fee. To attract them, we'd ask for the same rates and availability you offer third parties and your direct channel as an effective first step. Could we begin implementing this by the end of the week and monitor the lift, such as tracking page views, room nights and conversion for 14 days first?",
    partnerResponse: "The math makes sense and the visibility drop is too large to ignore. Let's align the rates to match our direct site today and monitor the traffic lift over the next 14 days.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ob-r6-wide-step5-drop-all",
    label: "Tell her to reduce all her rates now",
    description: "Answer her measurement question with the blanket cut she was worried about - reduce everything at once - which erodes the ADR premium she carries and gives her nothing to measure cleanly.",
    playerDialogue: "One thing to do here is really just to reduce all of your rates right now by around 10% across the board, keep it nice and straightforward, and then we sit back and watch the booking volume come flooding straight back in to you over the next week or two. No need to overcomplicate any of it with tests or staggered windows.",
    partnerResponse: "That's the 'reduce everything at once' move I just flagged - I can't measure that, and it torches my ADR.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "ob-r6-wide-step5-drop-keyota",
    label: "Tell her to pull rates from her other OTAs",
    description: "Direct her to stop feeding the other OTAs and give the good rates only to Booking.com. Instructing an owner on her external channel mix oversteps even in a Wide market.",
    playerDialogue: "If you really want to fix this properly, the move is to stop feeding all of your best rates and availability to the other OTAs you're working with - pull them right back and keep the strongest rates exclusive to us. That way we're the obvious place to book, and those other platforms stop eating into what should be coming through here.",
    partnerResponse: "You don't get to tell me which channels I work with. That's my call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step515 = {
  id: "close",
  label: "Make the alignment ask and close",
  partnerPrompt: "I understand that being more competitive on your platform could be a win for our overall strategy. But how can I measure the impact if we just reduce all the rates at once?",
  options: step5Options15
};
var oceanfrontWideR6 = {
  conversationShape: "branching",
  partnerId: "oceanfront-wide",
  round: 6,
  issueTreePath: oceanfrontR6IssueTreePath,
  openingAm: oceanfrontOpeningAm,
  steps: [step115, step218, step318, step415, step515]
};

// src/data/scenarios/palace-grand-base.ts
var palaceGrandR7IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "key-ota-erpd-not-competitive",
  intent: "unintentional",
  rootCauseId: "missing-misaligned-discounts-ota",
  metricInsightId: "non-structural-changing-erpd",
  hookId: "deep-discount-or-mdot"
};

// src/data/scenarios/palace-grand-none-r7.ts
var openingAm = "Hi Ethan! Great to connect with you today. How can we collaborate to help drive revenue for your property as we look at the goals for this year?";
var step1Options17 = [
  {
    id: "pg-r7-none-step1-correct",
    label: "Name the gap, where it concentrates, and ask if it is intentional",
    description: "SME-prescribed reveal: the property converts incredibly well, but its prices often appear uncompetitive, a gap that has grown over the last month and concentrates on mobile and family searches. Close with a neutral, reactive question - is that part of his strategy?",
    playerDialogue: "Let's have a look. While the property converts incredibly well once guests arrive, your prices on the platform often appear less attractive. That gap has increased over the last month, and it's concentrated when travelers search on mobile, or when families look for accommodation. Is that part of your strategy?",
    partnerResponse: "Yes, I see those specific gaps in our reports. To be completely transparent, my boss has a very firm strategy across all OTAs - he gives everyone the same rates, so when other platforms cut their margins or offer coupons, he feels it's not our problem and that Booking.com should do the same to stay competitive.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-none-step1-drop-price",
    label: "Press him to lower his public price",
    description: "Skip the diagnosis and push him to bring his price down. It presumes the fix, and pressuring a lower price isn't permitted in a No Parity market.",
    playerDialogue: "One way to turn this around is to bring your public price here down until you're clearly competitive again. Once your price on the platform sits below where you are now, the searches that pass you by today will start converting, and the whole gap closes on its own without us needing to dig any deeper.",
    partnerResponse: "You're telling me to cut my price before we've even looked at the problem together. Let's slow down.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "pg-r7-none-step1-fluff",
    label: "Reassure him it will pass",
    description: "Warm but empty - he came with the data and asked to work through it together; brushing it off reads as unserious.",
    playerDialogue: "I really wouldn't worry too much about this - a dip like the one you're seeing tends to even out over the quarter more or less on its own. These things move in cycles, and once the season turns the searches usually come back without us having to change very much at all. Let's give it a bit of time before reading too much into it.",
    partnerResponse: "I came to you with the data and asked to look at it together. 'It'll even out' isn't that.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step116 = {
  id: "reveal",
  label: "Reveal the gap and probe neutrally",
  partnerPrompt: "Hi Diego! Great to hear from you. I've been looking over the performance report and I'm a bit concerned - our conversion is amazing, but our total page views have dropped by 53%. I'd love to look at the data together to see how we can turn this around.",
  options: step1Options17
};
var step2Options19 = [
  {
    id: "pg-r7-none-step2-correct",
    label: "Affirm his autonomy; frame best price as an investment",
    description: "SME-prescribed handle: he's completely free to choose his distribution strategy, but adjusting it could capture more demand against similar properties. Cross-channel discrepancies confuse guests, and offering his best price here is an investment in high-value audience acquisition without devaluing his brand.",
    playerDialogue: "You're completely free to choose your distribution strategy, but adjusting it could help you capture more demand against similar properties on Booking.com. Interestingly, your Genius-enrolled guests already see a competitive price - it's your public pricing where the gap sits. Offering your best price here acts as an investment in high-value audience acquisition, without devaluing your brand's market position.",
    partnerResponse: "That makes sense - it's about protecting brand value. But what about the family segment? We intentionally push back on offering family rooms on OTAs because of the operational complexity of handling extra beds and cots.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-none-step2-concede",
    label: "Agree the same-net approach is fine",
    description: "Concedes the Same Net premise instead of reframing it - if you agree it's not his problem when competitors discount, there's nothing left to fix and the visibility gap stands.",
    playerDialogue: "That's fair enough - if your boss gives everyone the same rate across the board, then the competitors cutting their own margins or throwing coupons around really isn't something you should have to answer for. You're holding a consistent line, which is a perfectly reasonable way to run things, and it's hard to argue you're the one who needs to move when they're the ones discounting.",
    partnerResponse: "So we agree the approach is fine? Then I'm not sure what we're fixing.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "pg-r7-none-step2-require-match",
    label: "Tell him he has to match the competitor",
    description: "In a No Parity market you cannot require the partner to match external prices or bring his rate down to a competitor's. Telling him he has to match is a compliance breach.",
    playerDialogue: "Realistically, you'll need to bring your prices down to match exactly what that competitor is doing, because that's the only way to stay in the game on the platform here. If they move, you move with them, and if they cut again, you cut again to line up with them - matching them step for step is what it takes to keep pace and stop the searches sliding over to their listing instead of yours.",
    partnerResponse: "So the ask is that I have to match them? I didn't think that was something you could require.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step219 = {
  id: "same-net",
  label: "Handle Same Net via autonomy + best price",
  partnerPrompt: "Yes, I see those specific gaps in our reports. To be completely transparent, my boss has a very firm strategy across all OTAs - he gives everyone the same rates, so when other platforms cut their margins or offer coupons, he feels it's not our problem and that Booking.com should do the same to stay competitive.",
  options: step2Options19
};
var step3Options19 = [
  {
    id: "pg-r7-none-step3-correct",
    label: "Validate the ops concern, then pitch the family value",
    description: "SME-prescribed handle: acknowledge the operational concern is valid, then look at the 'why' - families spend more, stay longer, grow nearly twice as fast, and are 24% more likely to leave a review. A lever for occupancy and higher ADR.",
    playerDialogue: "Those operational concerns are completely valid. But look at the 'why' behind capturing this segment - families tend to spend more, stay longer, grow nearly twice as fast as other segments, and are 24% more likely to leave a review. They can genuinely help you maximize occupancy and drive a higher ADR.",
    partnerResponse: "There's a major revenue opportunity we're not capturing there. We do try to attract families through marketing campaigns and dedicated value-adds - in peak season it's a good investment, but when low season approaches we see a decrease.",
    styleMatch: { red: 0, yellow: 0, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-none-step3-discount",
    label: "Pivot to discounting the family rooms",
    description: "Right segment, wrong lever - it jumps to a price cut rather than the value case, dismisses his operational worry, and sets up a discounting expectation you'll have to walk back.",
    playerDialogue: "The easiest thing here is to put a straightforward discount on your family rooms and let the lower price do the work - drop what you're charging families a little, feature it, and the bookings from that segment will start coming through. Once the price is attractive enough, the families will find you and fill those rooms.",
    partnerResponse: "You've skipped straight past the operational side and gone to discounting. That's not landing for me.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "pg-r7-none-step3-dictate",
    label: "Dismiss the ops concern and dictate the strategy",
    description: "Wave away his operational worry and tell him to open the family rooms regardless. Dictating his distribution and brushing off a real concern burns the collaboration this operator responds to.",
    playerDialogue: "The operational stuff is a bit of a non-issue - you just need to open all of your family rooms to us and stop overthinking the beds and cots side of it. Plenty of properties handle more complexity than this without any fuss, so one move is to just switch the whole family inventory on for us and let it run.",
    partnerResponse: "The operational stuff is my day job, not a non-issue. Waving it away doesn't help me.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -10
  }
];
var step319 = {
  id: "family-value",
  label: "Open the family value",
  partnerPrompt: "That makes sense - it's about protecting brand value. But what about the family segment? We intentionally push back on offering family rooms on OTAs because of the operational complexity of handling extra beds and cots.",
  options: step3Options19
};
var step4Options17 = [
  {
    id: "pg-r7-none-step4-correct",
    label: "Channel incremental demand via accurate child rates and cots",
    description: "SME-prescribed handle: the platform channels incremental demand, especially in low season. His distribution strategy is entirely up to him, but offering accurate child rates and cots lets him capture that value without discounting his rates.",
    playerDialogue: "That's exactly where our platform makes the difference - we can channel incremental demand to your property, especially in that low season. Your forward bookings for the next three months are already trending 9% behind your peer group, so capturing families now has a direct impact on filling those softer periods. Your distribution strategy is entirely up to you, but by offering accurate child rates and cots here, you can capture that value without discounting your rates.",
    partnerResponse: "This aligns perfectly with our goal of making data-driven decisions to optimize the channel mix. If we can capture that high-spending family segment safely, that's already an impactful step forward. Let's test it.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-none-step4-blanket-drop",
    label: "Suggest a blanket family price drop instead",
    description: "Right that the family setup is the opportunity, wrong route - a blanket family discount contradicts the 'without discounting' framing and erodes the ADR the family segment is supposed to lift.",
    playerDialogue: "One path here is to just knock a decent chunk off all of your family rates for the low season and let the volume take care of itself. Once those family rooms are clearly the cheaper option through that quieter stretch, the bookings tend to follow on their own, and you can bring the rates back up again as soon as demand picks up.",
    partnerResponse: "Discounting everything is exactly what I'm trying to avoid. I thought this was about setup, not price cuts.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "pg-r7-none-step4-cheapest",
    label: "Tell him he must be the cheapest for families",
    description: "Turn a setup pitch into a requirement to be the lowest price for families. Requiring the cheapest rate pressures a price reduction, which isn't permitted in a No Parity market.",
    playerDialogue: "To really win the family segment you'll need to make sure you come out as the cheapest option for them anywhere on our platform - that's what it takes. If a comparable property is showing families a lower number than you are, they'll book that one every time, so your family rooms have to sit right at the bottom of the list.",
    partnerResponse: "Now it's 'be the cheapest'? That's the price war I was told we weren't having.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step416 = {
  id: "family-setup",
  label: "Pitch the family setup without discounting",
  partnerPrompt: "There's a major revenue opportunity we're not capturing there. We do try to attract families through marketing campaigns and dedicated value-adds - in peak season it's a good investment, but when low season approaches we see a decrease.",
  options: step4Options17
};
var step5Options16 = [
  {
    id: "pg-r7-none-step5-correct",
    label: "Offer to reopen the blocked mobile rate together",
    description: "SME-prescribed close: he's already activated a mobile rate, but several rate plans and dates are blocked on it, so he's losing high-value mobile bookings. Offer to optimize it with him so it isn't leaving demand on the table.",
    playerDialogue: "One more thing we can do straight away - you've already activated a mobile rate, but there are several rate plans and dates blocked on it, so you're losing some high-value mobile bookings. Shall we optimize that together so it's actually working for you?",
    partnerResponse: "You're right, we just forgot to update this - I'll take care of it. Thanks for flagging it, Diego!",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "pg-r7-none-step5-defer",
    label: "Leave the mobile rate for another day",
    description: "Right lever, lost momentum - flagging the blocked mobile rate and then parking it drops the do-it-now energy that just got him to yes, and the exclusions keep costing him bookings.",
    playerDialogue: "There's also a mobile rate on here that could genuinely use a proper look at some point, but that feels like a job for another day rather than right now - we've already covered a lot in this call, and I'd rather not pile too much onto you all at once.",
    partnerResponse: "Alright, though if it's costing me bookings now, I'm not sure why we'd leave it.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "pg-r7-none-step5-threat",
    label: "Warn his ranking suffers until he fixes it",
    description: "Threaten continued suppression unless he fixes the mobile rate. Tying visibility to a pricing action as a threat is banned in every regime and especially toxic in No Parity.",
    playerDialogue: "Just so you're aware, until that mobile rate is properly fixed our system is going to keep your property sitting lower down in the search results than it otherwise would - so the sooner you get it sorted the better it'll be for where you show up.",
    partnerResponse: "Threatening my visibility to get me to move is not the note I wanted to end on.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step516 = {
  id: "close",
  label: "Fix the mobile rate and close",
  partnerPrompt: "This aligns perfectly with our goal of making data-driven decisions to optimize the channel mix. If we can capture that high-spending family segment safely, that's already an impactful step forward. Let's test it.",
  options: step5Options16
};
var palaceGrandNoneR7 = {
  conversationShape: "branching",
  partnerId: "palace-grand-none",
  round: 7,
  issueTreePath: palaceGrandR7IssueTreePath,
  openingAm,
  steps: [step116, step219, step319, step416, step516]
};

// src/data/scenarios/palace-grand-narrow-r7.ts
var openingAm2 = "Hi Ethan, thanks for connecting today. I know you've been reviewing the performance, so let's look at the data together to see how we can optimize the property's visibility this quarter.";
var step1Options18 = [
  {
    id: "pg-r7-narrow-step1-correct",
    label: "Acknowledge the friction, then frame it as a revenue issue",
    description: "SME-prescribed reveal: acknowledge the frustration, then reframe to revenue - he converts very well once guests find him, but page views are down 53% because his prices appear uncompetitive in most searches, concentrated in mobile traffic and family configurations.",
    playerDialogue: "I understand how frustrating that is, but let's look at it from a revenue perspective. You convert very well once guests find you, but your page views are down 53% because your prices appear uncompetitive compared to your peers in the majority of searches. That gap is concentrated in your mobile traffic and your family configurations.",
    partnerResponse: "The other platform is telling us we need to drop our rates or let them run exclusive campaigns to fix it. If they're cutting margins to win the guest, we expect Booking.com to just match their actions.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-narrow-step1-validate-war",
    label: "Agree the other OTAs are the problem",
    description: "Warm and sympathetic, but it validates the competitor-noise framing instead of steering to his own performance - it lets the price-war logic stand rather than reframing to revenue and visibility.",
    playerDialogue: "You're right, and it's really unfair - those other OTAs are undercutting everyone and making your life so much harder than it needs to be. It's a brutal market out there right now, and the fact that they keep pinging you about competitive prices while you're giving everyone the same rates just proves they're the ones stirring all this up.",
    partnerResponse: "So we agree they're the problem. Then what are you actually going to do about it?",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "pg-r7-narrow-step1-flat-drop",
    label: "Prescribe an across-the-board cut",
    description: "Right that he's uncompetitive, wrong route - a blanket cut before any diagnosis presumes the fix and gives an ROI-minded operator nothing to weigh.",
    playerDialogue: "One fix here is just to drop your Booking.com rates across the board so you look competitive again in every search - once the price comes down the traffic will follow almost immediately, so I'd get those numbers lowered now and we can worry about the finer details of mobile and families later.",
    partnerResponse: "You want me to cut everything before you've explained the actual problem. Slow down.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  }
];
var step117 = {
  id: "reveal",
  label: "Reveal the gap from a revenue angle",
  partnerPrompt: "I have to tell you, I'm facing a lot of friction. Other OTAs keep reaching out saying they've noticed more competitive prices on your platform, while I'm giving everyone the same rates. Why are they telling me this, and why are we seeing these visibility drops if our conversion is better than our competitors?",
  options: step1Options18
};
var step2Options20 = [
  {
    id: "pg-r7-narrow-step2-correct",
    label: "No price war; align Booking.com with his direct website",
    description: "SME-prescribed handle: you don't want a price war, you can't prevent other OTAs cutting margins, and you can't ask him to change his rates on other platforms. To maximize Booking.com performance, keep Booking.com in line with his own direct website prices.",
    playerDialogue: "We can't prevent other OTAs cutting their margins - nor would we ask you to change or raise your rates on other platforms. But to maximize your Booking.com performance and support your overall revenue goals, we'd recommend keeping Booking.com in line with your own direct website prices.",
    partnerResponse: "But from a distribution standpoint, our brand strategy limits booking from OTAs, especially families. We prefer families to book directly so we can manage the room inventory and bed configurations better.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-narrow-step2-match",
    label: "Agree to match the competitor promotions",
    description: "Sounds accommodating, but it concedes the Same Net trap - promising to burn margin whenever a competitor discounts - instead of anchoring him to his own direct website prices.",
    playerDialogue: "That's fair - and what we can do is to look at matching those competitor campaigns whenever they run one, so you're always covered on price here and never sitting above whoever happens to be cheapest that week. If they cut, we'll move with them, and you won't have to worry about being undercut on our platform again.",
    partnerResponse: "Good. So you'll just keep pace with whoever's cheapest that week?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "pg-r7-narrow-step2-ota-parity",
    label: "Ask him to match the other OTAs",
    description: "In a Narrow market you cannot ask for parity against other OTAs, only alignment with his own direct website. Asking him to level his rates with the other platforms is a compliance breach.",
    playerDialogue: "The cleanest fix here is really just to give us the exact same rates you're giving the other OTAs, so that you're perfectly level right across every platform and none of them can claim they've got a better deal than we do. Once your rates line up identically everywhere, all this noise about who's cheaper goes away and everyone's on the same footing.",
    partnerResponse: "You're asking me to line my rates up with the other OTAs? I didn't think that was something you could ask.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step220 = {
  id: "same-net",
  label: "Refuse the price war; align to Brand.com",
  partnerPrompt: "The other platform is telling us we need to drop our rates or let them run exclusive campaigns to fix it. If they're cutting margins to win the guest, we expect Booking.com to just match their actions.",
  options: step2Options20
};
var step3Options20 = [
  {
    id: "pg-r7-narrow-step3-correct",
    label: "Use the discovery journey; ask him to match his website family rates",
    description: "SME-prescribed handle: 90% of travelers discover properties on the platform first. When families see an uncompetitive price they book a competitor right next door, not his direct site. Ask him to match the family rates and conditions of his own website so families can find him.",
    playerDialogue: "Consider the traveler's discovery journey - around 90% of travelers discover properties on our platform first. When families see an uncompetitive price here, they don't jump to your direct site; they book a competitor right next to you. That's why we'd ask you to match the family rates and conditions of your own website here, so families can actually find you. Similarly for mobile channel traffic.",
    partnerResponse: "What's the specific return if I adjust the family and mobile setup to match our website?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-narrow-step3-discount",
    label: "Ask him to simply undercut on family rates",
    description: "Right segment, wrong lever - it becomes a discount ask rather than an alignment-to-his-own-website ask, and it walks into the operational fear he'll raise. The move is matching his direct family rates, not cutting them.",
    playerDialogue: "It's really simple when you think about it - just make your family rates on Booking.com the cheapest around, cheaper than anywhere else a guest could look, and the bookings will follow almost on their own. Families always chase the lowest number they can see, so if you're consistently the cheapest option for them here, they'll pick you first every single time and the volume takes care of itself.",
    partnerResponse: "Undercutting my own family pricing is the opposite of what I want. Give me the commercial case.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "pg-r7-narrow-step3-dictate",
    label: "Tell him to open all family rooms to you now",
    description: "Direct him to hand over his full family inventory immediately. Dictating his distribution strategy oversteps, and pushing an autonomous operator this hard gets a fast no.",
    playerDialogue: "Your direct-only family strategy is costing you - you should open up all of your family rooms to us right now, and let us handle that segment for you properly. Keeping those rooms locked to your own website is exactly what's holding this property back, so the move is to hand the whole family allocation over to us today and stop protecting it.",
    partnerResponse: "You don't get to tell me how to allocate my own inventory. That's my decision.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -10
  }
];
var step320 = {
  id: "family-billboard",
  label: "Family segment via the billboard effect",
  partnerPrompt: "But from a distribution standpoint, our brand strategy limits booking from OTAs, especially families. We prefer families to book directly so we can manage the room inventory and bed configurations better.",
  options: step3Options20
};
var step4Options18 = [
  {
    id: "pg-r7-narrow-step4-correct",
    label: "Give the family value, then probe his setup and unsold rooms",
    description: "SME-prescribed collaborative probe: families grow nearly twice as fast, stay longer, and spend more. Then ask how he attracts families to his own website today and what his share of unsold family rooms is - the questions that surface the opportunity together.",
    playerDialogue: "Families grow nearly twice as fast as other segments, stay longer, and spend more during their stay. How are you attracting families to your own website today, and what's your share of unsold family rooms on average?",
    partnerResponse: "We offer a great price, but it's hard to compare our own traffic with the amount you generate - just looking at your search results view, it's a powerful way to be discovered first. And in low-occupancy periods those big family rooms often stay unsold.",
    styleMatch: { red: 0, yellow: 0, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-narrow-step4-stats-only",
    label: "Recite the family stats without a question",
    description: "The right numbers, but no probe - it states the value and stops, missing the collaborative discovery an operator responds to. He never gets asked about his own unsold rooms, so the opportunity stays abstract.",
    playerDialogue: "Families grow nearly twice as fast as other segments, they stay longer, and they spend noticeably more once they're on site - so it's clearly worth doing and the numbers make the case on their own. That's the return you'd be looking at here.",
    partnerResponse: "That's the theory. It still doesn't tell me what it does for my property specifically.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -3
  },
  {
    id: "pg-r7-narrow-step4-presume",
    label: "Presume he is deliberately starving the segment",
    description: "Frame his family setup as a deliberate choice to leave money on the table. It presumes intent and turns a collaborative probe into an accusation - the wrong register for this operator.",
    playerDialogue: "You're deliberately starving a segment that would clearly make you real money, and if we're being straight about it, that choice is the whole problem we're sitting here trying to untangle today.",
    partnerResponse: "I came to you with the data and asked for help. Telling me I'm the problem isn't help.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -9
  }
];
var step417 = {
  id: "family-probe",
  label: "Quantify the family value and probe",
  partnerPrompt: "What's the specific return if I adjust the family and mobile setup to match our website?",
  options: step4Options18
};
var step5Options17 = [
  {
    id: "pg-r7-narrow-step5-correct",
    label: "Offer incremental demand and a joint fix",
    description: "SME-prescribed close: the platform's value is incremental demand in the low season. Improving the family setup and mobile rate targets a larger audience; an unsold family room is a loss, so propose working together to optimize occupancy.",
    playerDialogue: "That's exactly our value - we can help generate incremental demand during the low season. By improving the family room setup and the mobile rate, we target a much larger audience of guests. An unsold family room is a loss, so why don't we work together to optimize your occupancy?",
    partnerResponse: "That's a smart way to approach it. I'll have a look at matching our direct website rates for the mobile and family setups.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "pg-r7-narrow-step5-defer",
    label: "Send him instructions to do it later",
    description: "Right plan, lost momentum - handing an operator a to-do for whenever he gets a chance drops the do-it-together energy that just got him to yes.",
    playerDialogue: "Great - I'll have my team put together an email with all the steps laid out clearly, and then you can go in and update the family and mobile settings whenever it happens to suit you. There's no rush on our end, so just work through it at your own pace once it lands in your inbox.",
    partnerResponse: "Sure, though realistically that'll sit in my inbox for a while.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: 0 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "pg-r7-narrow-step5-cheapest",
    label: "Tell him he must be the cheapest to recover",
    description: "Answer his openness with a requirement to be the lowest price everywhere - which in a Narrow market is a breach (you may only align with his own direct website, not require him to undercut every channel), and abandons the align-to-his-own-website framing the whole call was built on.",
    playerDialogue: "To really recover from where you are now, you'll need to make sure Booking.com is always the single cheapest place anyone can book you - lower than your own website, lower than everyone - because that's the only thing that actually moves the needle here and everything else is just detail around the edges.",
    partnerResponse: "So after all that, the ask is just 'be the cheapest'? That's not what I signed up to discuss.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step517 = {
  id: "close",
  label: "Close on optimizing occupancy together",
  partnerPrompt: "We offer a great price, but it's hard to compare our own traffic with the amount you generate - just looking at your search results view, it's a powerful way to be discovered first. And in low-occupancy periods those big family rooms often stay unsold.",
  options: step5Options17
};
var palaceGrandNarrowR7 = {
  conversationShape: "branching",
  partnerId: "palace-grand-narrow",
  round: 7,
  issueTreePath: palaceGrandR7IssueTreePath,
  openingAm: openingAm2,
  steps: [step117, step220, step320, step417, step517]
};

// src/data/scenarios/palace-grand-wide-r7.ts
var openingAm3 = "Hi Ethan. Thank you for taking the time to meet me today. How is the business going?";
var step1Options19 = [
  {
    id: "pg-r7-wide-step1-correct",
    label: "Credit the conversion, then name where the gap is concentrated",
    description: "SME-prescribed reveal: acknowledge conversion is 45% above peer, then surface page views down 53% and the pattern - his property appears uncompetitive 66% of the time versus other channels, specifically on mobile and family searches.",
    playerDialogue: "Let's have a look. Our recent data shows Booking.com's prices are on average 7% more expensive than competitor OTAs, specifically in mobile and family searches. Your conversion rate is actually 45% higher than your peer group, but your page views are down 53% and last 30 days room nights are down 46% vs last year. If you already offer cheaper prices on other channels, also making those prices available on Booking.com can help you stand out from direct competitors, resulting in higher visibility and more bookings.",
    partnerResponse: "Diego, we apply the same rates across all online channels to keep things simple. If another platform decides to cut its own margin to lower the public price, that's their choice. If Booking.com wants to compete, you should just do the same.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-wide-step1-flat-drop",
    label: "Jump to an across-the-board rate cut",
    description: "Right that he's uncompetitive, wrong route - prescribe a blanket cut before diagnosing anything. It presumes the fix and hands an ROI-minded operator nothing to weigh, exactly the move he'll push back on.",
    playerDialogue: "Your page views are down for one simple reason - you're priced too high against everyone else, and one way to turn that around is to drop your Booking.com rates right across the board. Bring them down, undercut the other channels, and the traffic and the bookings will come straight back to you within the month.",
    partnerResponse: "You're telling me to cut everything before you've explained a single thing. Walk me through the actual problem first.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "pg-r7-wide-step1-fluff",
    label: "Open with a soft reassurance",
    description: "Warm, no data - the wrong register for an operator who opened by asking exactly what the data shows.",
    playerDialogue: "I really wouldn't read too much into one quieter month - in my experience these things tend to even themselves out once the season turns, and a single dip rarely means anything is actually wrong. You've got a strong property with loyal guests, so let's not get bogged down in one number. How's everything else going on your side?",
    partnerResponse: "I asked what the data shows. If it's just a slow month, tell me that; if it isn't, show me.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -6
  }
];
var step118 = {
  id: "reveal",
  label: "Reveal the Key OTA gap",
  partnerPrompt: "Hi Diego. We're busy, but our volume via Booking.com has declined over the past month. What does the data show? Why are our visitor numbers on your platform dropping?",
  options: step1Options19
};
var step2Options21 = [
  {
    id: "pg-r7-wide-step2-correct",
    label: "Refuse the price war; reframe to ROI and brand value",
    description: "SME-prescribed handle: don't agree to burn margin. Inconsistent pricing across third-party channels confuses guests and devalues his public brand. He can't control other distributors' margin cuts, but he can keep his own base rates and promotions aligned with Booking.com.",
    playerDialogue: "I get your point, but inconsistent pricing across third-party channels causes customer confusion, weakens trust, and devalues your public brand. We'd recommend prioritizing long-term brand value and net revenue. You can't control another distributor cutting its margin, but you can make sure the base rates and promotions you set stay aligned with Booking.com.",
    partnerResponse: "I'll grant you that inconsistent public pricing looks messy to a guest. But what about the family segment? We purposely restrict our larger rooms on third-party channels because they're difficult to manage and we prefer to keep them for our direct guests.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-wide-step2-match",
    label: "Agree to match the competitor promotions",
    description: "Sounds accommodating, but it concedes the Same Net trap - promising to burn margin whenever a competitor discounts. It rewards the race to the bottom instead of reframing to value, and gives away platform margin for nothing.",
    playerDialogue: "That's fair enough, and I don't want you feeling like you're being left behind on price here. Let me take this back to my team and we'll look at matching those competitor promotions for you, so whenever one of them runs a discount we move with it and you stay covered on price on Booking.com. That way you never have to worry about being the more expensive option on our platform again.",
    partnerResponse: "Good, that's the kind of partnership I want. So you'll just keep pace with whoever's cheapest?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "pg-r7-wide-step2-threat",
    label: "Warn his ranking will keep dropping",
    description: "Threaten a further visibility slide unless he aligns. Threatening ranking over how he prices is banned in every regime, and it torches the collaboration this operator responds to.",
    playerDialogue: "I'll be straight with you here, because I think you need to hear it plainly - if you keep chasing the discounters instead of aligning your pricing with us, our system is going to read your property as uncompetitive and keep pushing you further and further down the results. The longer you leave it, the harder that visibility is to claw back, so aligning with us is really the only way to protect your position.",
    partnerResponse: "Threatening my ranking over how I run my pricing is not how you'll get me on side.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step221 = {
  id: "same-net",
  label: "Handle the Same Net Mindset",
  partnerPrompt: "Diego, we apply the same rates across all online channels to keep things simple. If another platform decides to cut its own margin to lower the public price, that's their choice. If Booking.com wants to compete, you should just do the same.",
  options: step2Options21
};
var step3Options21 = [
  {
    id: "pg-r7-wide-step3-correct",
    label: "Pitch the family segment as an opportunity",
    description: "SME-prescribed Family Ready value: keeping family rates higher or less available here misses a growing segment. Families spend more, stay longer, and grow nearly two times faster than other traveler segments - a lever for occupancy and higher ADR.",
    playerDialogue: "By keeping those family rates higher or less available on our platform, you're missing out on a fast-growing segment. Families tend to spend more, stay longer, and have grown nearly two times faster than other traveler segments over the last two years. They're a valuable segment that can help you maximize occupancy and drive a higher ADR.",
    partnerResponse: "The point about them staying longer and spending more is compelling. But how do I fix this without creating an operational nightmare for my front desk?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-wide-step3-discount",
    label: "Ask him to simply lower his family rates here",
    description: "Right segment, wrong lever - it turns a setup opportunity into a discount ask, and it walks straight into the operational fear he'll raise next. The win is availability and configuration, not a price cut.",
    playerDialogue: "The families are out there searching, so one way to win them is on price. Just lower your family rates here on Booking.com so you're clearly the cheapest option for a family of four, undercut what they'd pay anywhere else, and those family bookings will start flowing to you almost straight away. Price is the lever that moves this.",
    partnerResponse: "Cutting my family prices is the opposite of protecting that inventory. Give me a commercial reason, not a discount.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "pg-r7-wide-step3-dictate",
    label: "Tell him to open all family rooms to you now",
    description: "Direct him to hand over his full family inventory immediately. Dictating his distribution strategy oversteps, and pushing an autonomous operator this hard gets a fast no.",
    playerDialogue: "Frankly, keeping your family rooms back for direct only is a mistake that's costing you real money every week. You should open every one of your family rooms to us right now, stop holding any of that inventory back, and let us put it in front of the biggest audience there is. Hand it all over to Booking.com and you'll see the difference in your family bookings fast.",
    partnerResponse: "You don't get to tell me how to allocate my own inventory. That's my call, not yours.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -10
  }
];
var step321 = {
  id: "family-value",
  label: "Open the family segment",
  partnerPrompt: "I'll grant you that inconsistent public pricing looks messy to a guest. But what about the family segment? We purposely restrict our larger rooms on third-party channels because they're difficult to manage and we prefer to keep them for our direct guests.",
  options: step3Options21
};
var step4Options19 = [
  {
    id: "pg-r7-wide-step4-correct",
    label: "Reassure it is easy, then flag the misconfigured mobile rate",
    description: "SME-prescribed close of the diagnosis: it's an easy fix and you'll support him. Then surface the concrete lever - his Mobile Rate on Booking.com is active but has many dates and two rate plans excluded, which is where the competitor is undercutting.",
    playerDialogue: "It's actually an easy fix, and I can support you through it - it won't add load to your front desk. And to close the mobile gap where other channels are undercutting you, we can re-evaluate the mobile rate you already have set with us. I can see there are a lot of dates and two rate plans excluded on it right now.",
    partnerResponse: "Ah - I haven't touched that setup in a while, thank you for flagging it. So if we add family rates and expand the mobile rate coverage, that gives us a structured way to recover those page views?",
    styleMatch: { red: 1, yellow: 0, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r7-wide-step4-cold",
    label: "List the fix without addressing the operational worry",
    description: "The right two actions, but delivered flat - it skips the reassurance an operations manager asked for outright. Correct content, wrong read of the partner: he needs to hear it won't burden his team.",
    playerDialogue: "Right, so here's what needs to happen. You'd add your family rates onto Booking.com so those rooms are actually bookable here, and you'd go into the mobile rate you've got set with us and clear out all the excluded dates and the two rate plans that are switched off. Do those two things and the gap closes. That's the fix.",
    partnerResponse: "That tells me what to change, not whether it lands on my front desk. That's the part I asked about.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: 1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -3
  },
  {
    id: "pg-r7-wide-step4-blame",
    label: "Put the broken mobile rate back on him",
    description: "Frame the misconfigured mobile rate as his oversight to sort out. Blaming an operator you're trying to bring on side burns the collaboration and answers none of his operational concern.",
    playerDialogue: "Well, if we're being honest about it, your mobile rate has been sitting misconfigured on your side for months now - the excluded dates and the switched-off rate plans were all set up wrong at your end. That's on you to go back into the extranet and sort it out, because there's not much I can do from here until you've cleaned it up.",
    partnerResponse: "If your pitch is that this is all my fault, you can see why I'd rather just leave it as it is.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  }
];
var step418 = {
  id: "derisk-fix",
  label: "De-risk the fix and surface the mobile setup",
  partnerPrompt: "The point about them staying longer and spending more is compelling. But how do I fix this without creating an operational nightmare for my front desk?",
  options: step4Options19
};
var step5Options18 = [
  {
    id: "pg-r7-wide-step5-correct",
    label: "Offer to set it up together in the extranet now",
    description: "SME-prescribed close: confirm the plan and move on it collaboratively - open the extranet together right now to set up the mobile and family adjustments while you have him.",
    playerDialogue: "Exactly - that's the structured path back. Shall we open your extranet together right now and set up these specific mobile and family adjustments while we're on the call?",
    partnerResponse: "Let's do it, Diego. Let's get these settings aligned and see if we can get bookings moving again.",
    styleMatch: { red: 2, yellow: 1, green: 2, blue: 1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "pg-r7-wide-step5-defer",
    label: "Send him instructions to do it later",
    description: "Right plan, lost momentum - handing an operator a to-do for whenever he gets a chance drops the collaborative, do-it-now energy that just got him to yes, and the exclusions will likely sit untouched.",
    playerDialogue: "Great - I'll get my team to email over the step-by-step instructions, and you can go in and update the mobile and family settings yourself whenever you next get a spare moment.",
    partnerResponse: "Sure, though realistically that'll sit in my inbox for a while - you know how it is.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: 0 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "pg-r7-wide-step5-exclusive",
    label: "Tell him to keep family rooms exclusive to Booking.com",
    description: "Direct him to pull the family rooms from the other OTAs and give them only to you. Instructing an operator on his external channel mix oversteps even in a Wide market.",
    playerDialogue: "And to really lock this in, I'd stop giving those family rooms to the other OTAs altogether - pull them from every other channel and keep that inventory exclusive to Booking.com from now on.",
    partnerResponse: "You don't get to decide which channels I work with. That's my call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step518 = {
  id: "close",
  label: "Close on a shared setup session",
  partnerPrompt: "Ah - I haven't touched that setup in a while, thank you for flagging it. So if we add family rates and expand the mobile rate coverage, that gives us a structured way to recover those page views?",
  options: step5Options18
};
var palaceGrandWideR7 = {
  conversationShape: "branching",
  partnerId: "palace-grand-wide",
  round: 7,
  issueTreePath: palaceGrandR7IssueTreePath,
  openingAm: openingAm3,
  steps: [step118, step221, step321, step418, step518]
};

// src/data/scenarios/hidden-valley-base.ts
var hiddenValleyR8IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "brand-com-erpd-not-competitive",
  intent: "intentional",
  rootCauseId: "structural-brand-first",
  metricInsightId: "structural-constant-non-competitive-erpd",
  hookId: "base-rate-misalignment"
};

// src/data/scenarios/hidden-valley-none-r8.ts
var openingAm4 = "Hi Claire, thanks for taking the time to connect today. I want to dive straight into some interesting trends I've been analyzing.";
var step1Options20 = [
  {
    id: "hv-r8-none-step1-correct",
    label: "Name the slow pace and ask about her strategy and promotions",
    description: "SME-prescribed reveal: her conversion and next-3-month room nights are pacing slowly while her peer group performs better. Probe neutrally - understand her current strategy and whether promotions she runs are fully mirrored and correctly targeted on the platform.",
    playerDialogue: "Your recent performance has been strong - revenue is up 65% year on year - but looking ahead, your room nights for the next three months are pacing 50% behind your peer group. That's a significant forward gap. I'd like to understand your current strategy - and whether there are specific promotions you're running that might not be fully mirrored, or correctly targeted to the right audience, on our platform.",
    partnerResponse: "To be completely transparent, we intentionally keep our website cheaper to own the guest relationship. We know it impacts our visibility on Booking.com, but direct acquisition is our primary goal.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-none-step1-accuse",
    label: "Tell her the slow pace is her pricing mistake",
    description: "Right that the pace is the signal, wrong route - it presumes the cause and frames a deliberate head-office policy as her error before you understand it. A franchise revenue manager will close down.",
    playerDialogue: "Your pace is slow because you're mispricing this property, plain and simple - I've seen this pattern before and the numbers only point one way. That's the thing you need to fix, and the sooner you accept the pricing is the problem here, the sooner we can put it right. There's no other explanation for a slide like this.",
    partnerResponse: "That pricing is a head-office directive, not my mistake. If you're here to tell me it's wrong, this'll be short.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "hv-r8-none-step1-fluff",
    label: "Skip the data and reassure her",
    description: "Warm, but it wastes the slot for a revenue manager who came to look at the trends.",
    playerDialogue: "Honestly, before we dig into the figures - I really wouldn't worry too much. Performance like yours naturally moves in cycles and tends to settle out over a quarter or so, so I'd hate for you to lose sleep over any of it. You run a lovely property and the guests clearly love it, so I'm confident things stay on track. Let's not get too deep into the numbers today.",
    partnerResponse: "You said you had trends to show me. 'It'll even out' isn't a trend.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step119 = {
  id: "reveal",
  label: "Reveal the slow pace and probe neutrally",
  partnerPrompt: "Hello, Oliver. Let's hear it. What trends are we looking at?",
  options: step1Options20
};
var step2Options22 = [
  {
    id: "hv-r8-none-step2-correct",
    label: "Affirm her autonomy; make the discovery case",
    description: "SME-prescribed handle: she's entirely free to choose her pricing strategy, but a significant price difference can confuse guests and erode trust. Because Booking.com acts as a huge search engine where travelers research before booking, being uncompetitive narrows her visibility and prevents guests from discovering her at all.",
    playerDialogue: "You are entirely free to choose your pricing strategy, but adjusting it could help you capture more demand against similar properties on Booking.com. Since Booking.com acts as a search engine where travelers research before booking, offering your best price on Booking.com acts as an investment in high-value audience acquisition, without devaluing your brand's market position.",
    partnerResponse: "I understand that, but we also have to protect our margin. And when Booking Sponsored Benefit kicks in, it feels like we lose control over our prices.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-none-step2-require-cheapest",
    label: "Tell her she must be the cheapest to recover",
    description: "In a No Parity market you cannot require a lower price or matching. Telling her she has to be the cheapest to fix her pace pressures a rate reduction and is a compliance breach.",
    playerDialogue: "Realistically, to turn this around you'll need to make sure Booking.com is the cheapest place to book you - guests compare before they commit, and if you're not the lowest here they move on to whoever is. So the practical requirement is that your rate on our platform has to come in under everywhere else you sell, direct site included. That's the single thing that will move the pace back up.",
    partnerResponse: "So the ask is that I have to be the cheapest? I didn't think that was something you could require.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "hv-r8-none-step2-concede",
    label: "Accept the visibility hit as a fair trade",
    description: "Concedes the reverse-billboard premise - that a cheaper direct site is a fine trade-off - and never surfaces the discovery cost that's slowing her pace.",
    playerDialogue: "That's fair enough - if owning the direct guest relationship is the priority, then taking the visibility hit here is a perfectly reasonable trade to make. Plenty of partners run their own site cheaper for exactly that reason, and I completely understand wanting to keep guests close to your brand. I wouldn't want to talk you out of a strategy that's clearly working for you, so that's absolutely your call.",
    partnerResponse: "So the policy's fine, then. I'm still not clear what we're improving.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  }
];
var step222 = {
  id: "discovery",
  label: "Affirm autonomy; the search-engine discovery case",
  partnerPrompt: "To be completely transparent, we intentionally keep our website cheaper to own the guest relationship. We know it impacts our visibility on Booking.com, but direct acquisition is our primary goal.",
  options: step2Options22
};
var step3Options22 = [
  {
    id: "hv-r8-none-step3-correct",
    label: "Explain BSB is Booking-funded, converts demand, and is prepaid",
    description: "SME-prescribed explanation: BSB is a customer-facing product funded by Booking.com to attract guests and convert demand that might otherwise not book, and because these reservations require pre-payment they're less likely to be canceled - a win-win.",
    playerDialogue: "Let me clarify how that works: BSB is a customer-facing product funded by Booking.com, designed to attract guests to your property and convert demand that might otherwise not book. And since these reservations require pre-payment from the guest, they're less likely to be canceled - so it works out as a win-win.",
    partnerResponse: "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - that customer will never book with me again if the lowest price is always on Booking.com!",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-none-step3-apologize",
    label: "Agree BSB removes her control and offer to switch it off",
    description: "Concedes her framing that BSB seizes her price, and offers to remove the very shield protecting her competitiveness. It validates the objection instead of reframing it.",
    playerDialogue: "You're right, BSB does apply without your say-so, and I can understand why that feels like losing your grip on your own pricing. If it's genuinely a problem for you, I can look into whether we can switch it off for your property altogether, so nothing runs on your rates without you agreeing to it first. I don't want you to feel it's out of your hands.",
    partnerResponse: "So you agree it's out of my control. That doesn't reassure me.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "hv-r8-none-step3-overclaim",
    label: "Promise BSB will guarantee a booking surge",
    description: "Over-promises a specific outcome BSB doesn't guarantee. A data-led revenue manager will spot the hollow guarantee and trust you less for it.",
    playerDialogue: "Just leave BSB running and I can pretty much guarantee your bookings will jump next month - I've seen it happen for property after property and it always works out the same way. Give it a few weeks and you'll be looking at a booking surge you won't believe, and any worries about your brand or your margin will look small next to those numbers.",
    partnerResponse: "You can guarantee that? That's the kind of claim that makes me trust the numbers less.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -7
  }
];
var step322 = {
  id: "name-bsb",
  label: "Name and explain BSB",
  partnerPrompt: "I understand that, but we also have to protect our margin. And when Booking Sponsored Benefit kicks in, it feels like we lose control over our prices.",
  options: step3Options22
};
var step4Options20 = [
  {
    id: "hv-r8-none-step4-correct",
    label: "Clarify it is limited and free to her; frame it as a win-win",
    description: "SME-prescribed handle: BSB isn't applied to all bookings and is only offered to a limited audience; the partial room cost is paid by Booking.com and she incurs no additional fees, still receiving the full room price she set.",
    playerDialogue: "BSB is not something we apply to all of your bookings. Our algorithm determines when BSB applies to encourage travelers to book, based on factors such as search criteria. That partial room cost is paid by Booking.com on behalf of the guests and you do not incur any additional fees.",
    partnerResponse: "I don't want to win guests just on price - I want them to choose me for the view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-none-step4-dismiss-brand",
    label: "Tell her the brand worry is overblown",
    description: "Right that BSB is funded, wrong tone - it waves away the brand-reputation concern a franchise revenue manager is mandated to protect, which is exactly what keeps her from engaging.",
    playerDialogue: "The brand-reputation worry is a bit overblown - in my experience guests care about price far more than they care about image, and the difference in review scores between direct and platform bookings is tiny. I really wouldn't let that concern hold you back from something that could move your numbers.",
    partnerResponse: "My brand is the thing I'm here to protect. Telling me it doesn't matter won't land.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "hv-r8-none-step4-require-drop",
    label: "Tell her she must drop her public rate regardless",
    description: "Answers the funded-shield moment with a blanket demand to cut her published rate - pressuring a lower price, which isn't permitted in a No Parity market.",
    playerDialogue: "One fix is to cut your public rate across the board, so you're never the expensive option whether BSB is running or not. If you bring your published price down far enough that guests always find you cheaper on our platform, the pace problem takes care of itself and we stop having this conversation.",
    partnerResponse: "So the ask is to cut my rate everywhere? That's the opposite of protecting my brand.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -9
  }
];
var step419 = {
  id: "bsb-shield",
  label: "Position BSB as a funded shield",
  partnerPrompt: "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - that customer will never book with me again if the lowest price is always on Booking.com!",
  options: step4Options20
};
var step5Options19 = [
  {
    id: "hv-r8-none-step5-correct",
    label: "Acknowledge reviews, separate them from price, keep promotions open",
    description: "SME-prescribed handle: guests with a less positive experience often just want to be heard; acknowledging feedback shows improvement. Separate that from the price opportunity - BSB isn't a discount per se but a tool to convert demand, and she can still run targeted promotions or campaigns.",
    playerDialogue: "Sometimes guests with a less positive experience simply want to be heard - acknowledging their feedback signals what you're doing to improve. Let's separate that from the price opportunity, though. BSB isn't a discount per se - it's a tool that helps convert demand that might otherwise not book. And it doesn't stop you from running targeted promotions or campaigns to reach the audience you want. In fact, targeted programs could give you more control over which guest segments see a better price - rather than relying on BSB alone.",
    partnerResponse: "Okay, I can't make a decision right now - let me reconsider all of this and let's connect next month.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-none-step5-blame-reviews",
    label: "Agree her Booking guests are just harder to please",
    description: "Concedes that Booking guests leave worse reviews - reinforcing the belief driving her resistance instead of decoupling reviews from the price decision.",
    playerDialogue: "You're probably right that our guests can be a tougher crowd - it does seem to come with the platform, I'm afraid, and I hear the same thing from a lot of partners in your position. People who book on price sometimes do arrive with higher expectations, and when the stay doesn't quite match what they pictured, they're quicker to leave a critical review than a guest who came to you directly. It's a fair concern, and I understand why the review side of this weighs on you as much as the pricing does.",
    partnerResponse: "So you agree the reviews are a problem here. That doesn't make me keener to lean in.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "hv-r8-none-step5-push-now",
    label: "Press her to commit before the call ends",
    description: "Corners a franchise revenue manager for a yes on the spot, when she needs to reconsider against head-office policy. Pushing here converts a warm follow-up into a hard no.",
    playerDialogue: "Let's not leave this hanging, though - can you commit today to making your best available price live on the platform, so we lock in the gains before next month rather than waiting? I know you want to think it over, but every week this sits undecided is a week of bookings you're not getting back, and it really is a straightforward yes. If you give me the go-ahead right now, I can get everything moving this afternoon and you'll start seeing the difference almost immediately.",
    partnerResponse: "You're pushing me for a decision I've told you I can't make yet. Don't force it.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -8
  }
];
var step519 = {
  id: "separate-reviews",
  label: "Separate price from review risk",
  partnerPrompt: "I don't want to win guests just on price - I want them to choose me for the view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews.",
  options: step5Options19
};
var step6Options = [
  {
    id: "hv-r8-none-step6-correct",
    label: "Respect the deferral; offer support and schedule the follow-up",
    description: "SME-prescribed close on a soft no: don't push. Respect her need to reconsider, offer support in the meantime, and schedule the follow-up for next month - leaving the relationship warm and the door open.",
    playerDialogue: "No problem at all - take the time you need. Let me know if I can support you on anything in the meantime, and I'll schedule a follow-up for next month. Thank you for your time today, Claire.",
    partnerResponse: "Thank you, Oliver - I appreciate you not pushing. Let's talk again next month once I've thought it through.",
    styleMatch: { red: 2, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "hv-r8-none-step6-guilt",
    label: "Warn her she is losing revenue by waiting",
    description: "Turns her reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue: "Alright, but I'd hate for you to look back and see just how much revenue slipped away for every week you waited on this. That's real money off the table while you think, and it only adds up the longer this sits.",
    partnerResponse: "That's a strange note to end on. I said I'd reconsider - let's leave it there.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "hv-r8-none-step6-ultimatum",
    label: "Give her a deadline to align or lose visibility",
    description: "Attaches a visibility ultimatum to her decision timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue: "Just so it's on your radar - if you haven't made your best price available by next month, expect your visibility to keep sliding, and the longer you wait the harder it gets to climb back up the results.",
    partnerResponse: "So it's drop my price or be buried? That's not the partnership I thought we had.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step6 = {
  id: "close",
  label: "Close gracefully on the soft no",
  partnerPrompt: "Okay, I can't make a decision right now - let me reconsider all of this and let's connect next month.",
  options: step6Options
};
var hiddenValleyNoneR8 = {
  conversationShape: "branching",
  partnerId: "hidden-valley-none",
  round: 8,
  issueTreePath: hiddenValleyR8IssueTreePath,
  openingAm: openingAm4,
  steps: [step119, step222, step322, step419, step519, step6]
};

// src/data/scenarios/hidden-valley-narrow-r8.ts
var openingAm5 = "Hi Claire, thanks for joining the call. Let's get right into the data today - I've been analyzing the performance and I have some clear insights that can help drive revenue.";
var step1Options21 = [
  {
    id: "hv-r8-narrow-step1-correct",
    label: "Name the 7% gap and ask if it is structural or seasonal",
    description: "SME-prescribed reveal: her rates are around 7% less competitive than her direct channel, which limits conversion versus peer and slows next-3-month bookings. Probe neutrally - is this a consistent year-round strategy, or seasonal campaigns and temporary promotions?",
    playerDialogue: "Your rates are uncompetitive compared to your direct channel by around 7%. That's limiting your conversion versus your peer group, and your next-3-month bookings look quite slow. Is this something you apply consistently year-round as a structural strategy, or is it based on seasonal campaigns or temporary promotions?",
    partnerResponse: "That is by design, Oliver. Our head-office directive is to keep cheaper rates on our own website to encourage guests to book with us and avoid commission costs, no matter the time of year. It's fine for us to take a visibility hit on Booking.com as a trade-off.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-narrow-step1-accuse",
    label: "Tell her the gap is a mistake she must fix",
    description: "Right that the gap matters, wrong route - it presumes the fix and frames a deliberate head-office policy as her error before you understand it. A franchise revenue manager will close down.",
    playerDialogue: "Your rates here are around 7% worse than your own website, and that's just a mistake that needs correcting. You'll need to put it right if you want those bookings back, because there's really no good reason to be sitting below your own direct price like this. Let's get it fixed today so it stops costing you.",
    partnerResponse: "That's a head-office directive, not my mistake. If your pitch is that it's wrong, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "hv-r8-narrow-step1-fluff",
    label: "Skip the data and reassure her",
    description: "Warm, but it wastes the slot for a revenue manager who asked to get straight to the data.",
    playerDialogue: "Honestly, before we get into the figures - I really wouldn't worry too much. A property like yours naturally moves through busier and quieter patches, and these things tend to sort themselves out over the quarter without anyone needing to do much. Let's not get bogged down in the numbers today; I'm sure it'll be fine on its own before long.",
    partnerResponse: "I asked to get straight to the point. 'It'll sort itself out' isn't the data.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step120 = {
  id: "reveal",
  label: "Reveal the gap and probe structural vs seasonal",
  partnerPrompt: "Hi, Oliver. Good - let's get straight to the point. What does the data show?",
  options: step1Options21
};
var step2Options23 = [
  {
    id: "hv-r8-narrow-step2-correct",
    label: "Use the competitiveness numbers; ask to align with her own website",
    description: "SME-prescribed reframe: large price differences erode traveler trust, and improving competitiveness by 10% here generates on average 30% more bookings and 25% more revenue. Ask her to align her rates with her own website; if she wants to reward direct guests, fenced member rates beat a cheaper public price.",
    playerDialogue: "I get it, but the trade-off is that travelers who see a less competitive price on Booking.com may choose your local competitors before they ever reach your website, and our data shows improving your competitiveness by 10% here generates on average 30% more bookings and 25% more revenue. By aligning your rates to the ones on your own website, you capture that demand through our global marketing at zero upfront cost. And if you want to reward loyal guests directly, fenced member rates do that without a cheaper public price hurting your discovery.",
    partnerResponse: "Those are solid numbers. But how can I control any of this if you apply the Booking Sponsored Benefit whenever you want, without my consent?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-narrow-step2-raise-direct",
    label: "Tell her to raise her direct-site price to match",
    description: "In a Narrow market you align Booking.com to her own website - you cannot instruct her to change her direct-channel pricing. Telling her to lift her Brand.com rate dictates her external strategy and oversteps.",
    playerDialogue: "The cleanest fix here is to just put the price on your own direct website up so that it matches your Booking.com rate. Once you lift your direct rate to sit level with ours, there's no gap left to worry about and the whole problem disappears on its own. It's by far one way to close this - raise your website price to match and we're basically done here.",
    partnerResponse: "You want me to raise the price on my own website? That's my direct channel, not yours to set.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "hv-r8-narrow-step2-concede",
    label: "Accept the visibility hit as a fair trade",
    description: "Concedes the reverse-billboard premise - that a cheaper direct site is a fine trade-off - and never corrects the belief suppressing her visibility on both channels.",
    playerDialogue: "That's fair enough - if driving direct acquisition is your head-office priority, then taking a bit of a visibility hit with us here is a perfectly reasonable trade to make. Plenty of partners think about it in exactly that way, and if the commission saving genuinely matters more to you, then I can completely see why you'd want to keep the cheaper rate sitting on your own site.",
    partnerResponse: "So the policy's fine, then. I'm still not clear what we're improving.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  }
];
var step223 = {
  id: "align-brand",
  label: "Land the numbers and align to Brand.com",
  partnerPrompt: "That is by design, Oliver. Our head-office directive is to keep cheaper rates on our own website to encourage guests to book with us and avoid commission costs, no matter the time of year. It's fine for us to take a visibility hit on Booking.com as a trade-off.",
  options: step2Options23
};
var step3Options23 = [
  {
    id: "hv-r8-narrow-step3-correct",
    label: "Explain BSB is Booking-funded and prepaid",
    description: "SME-prescribed explanation: BSB is a customer-facing product entirely funded by Booking.com to attract guests, and because BSB reservations require pre-payment they're less likely to be canceled - a win-win of better price, stronger conversion, and lower cancellation risk.",
    playerDialogue: "Booking Sponsored Benefit is a customer-facing product entirely funded by us and designed to attract guests to your property. Plus, BSB reservations require pre-payment from the guest, they're less likely to be canceled. It's a win-win: travelers see a better price, you get stronger conversion, and cancellation risk is lower.",
    partnerResponse: "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - guests will never book with me again if the lowest price is always on Booking.com!",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-narrow-step3-apologize",
    label: "Agree BSB removes her control and offer to switch it off",
    description: "Concedes her framing that BSB seizes her price, and offers to remove the very shield protecting her competitiveness. It validates the objection instead of reframing it.",
    playerDialogue: "You're right, BSB does apply without your say-so, and I completely understand why that would feel like a real loss of control on your side. If it's genuinely a problem for you, I can look into whether we're able to switch it off for your property, so nothing gets applied to your rooms that you haven't signed off on first.",
    partnerResponse: "So you agree it's out of my control. That doesn't reassure me.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "hv-r8-narrow-step3-overclaim",
    label: "Promise BSB will guarantee a booking surge",
    description: "Over-promises a specific outcome BSB doesn't guarantee. A data-led revenue manager will spot the hollow guarantee and trust you less for it.",
    playerDialogue: "Just leave BSB running exactly as it is and I can pretty much guarantee your bookings will jump next month - it works like this every single time we switch it on for a property. You won't need to change anything else at all; the moment it goes live the reservations start climbing, so I'd say just trust it and watch the numbers move for you.",
    partnerResponse: "You can guarantee that? That's the kind of claim that makes me trust the numbers less.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -7
  }
];
var step323 = {
  id: "name-bsb",
  label: "Name and explain BSB",
  partnerPrompt: "Those are solid numbers. But how can I control any of this if you apply the Booking Sponsored Benefit whenever you want, without my consent?",
  options: step3Options23
};
var step4Options21 = [
  {
    id: "hv-r8-narrow-step4-correct",
    label: "Clarify it is limited and free to her; frame it as a win-win",
    description: "SME-prescribed handle: BSB isn't applied to all bookings and is only offered to a limited audience; the partial room cost is paid by Booking.com and she incurs no additional fees, still receiving the full room price she set.",
    playerDialogue: "BSB incentives are only applied to some reservations and are designed to help attract guests to your property. Our algorithm determines when BSB applies to encourage travelers to book, to help convert demand that might otherwise not book. This price reduction reflects the partial payment we make on behalf of the traveler. You always receive the full transaction value of each booking.",
    partnerResponse: "I don't want to win guests just on price - I want them to choose me for the view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-narrow-step4-dismiss-brand",
    label: "Tell her the brand worry is overblown",
    description: "Right that BSB is funded, wrong tone - it waves away the brand-reputation concern a franchise revenue manager is mandated to protect, which is exactly what keeps her from engaging.",
    playerDialogue: "I think the whole brand-reputation worry is a bit overblown - at the end of the day guests care about getting a genuinely good price far more than they care about image, so I really wouldn't let that concern hold you back from leaning in here.",
    partnerResponse: "My brand is the thing I'm here to protect. Telling me it doesn't matter won't land.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "hv-r8-narrow-step4-require-drop",
    label: "Tell her she must drop her public rate regardless",
    description: "Answers the funded-shield moment with a blanket demand to cut her published rate - reintroducing the price-war fear BSB is meant to avoid and dictating her pricing.",
    playerDialogue: "One fix, is to just cut your public rate here across the board so that you're never the expensive option, with or without BSB. If your published price is always the lowest showing, none of this brand worry even comes up, so I'd drop the rate everywhere.",
    partnerResponse: "So the ask is to cut my rate everywhere? That's the opposite of protecting my brand.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step420 = {
  id: "bsb-shield",
  label: "Position BSB as a funded shield",
  partnerPrompt: "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - guests will never book with me again if the lowest price is always on Booking.com!",
  options: step4Options21
};
var step5Options20 = [
  {
    id: "hv-r8-narrow-step5-correct",
    label: "Acknowledge reviews, separate them from price, keep promotions open",
    description: "SME-prescribed handle: guests with a less positive experience often just want to be heard, so acknowledging feedback shows improvement. Separate the review risk from the price opportunity, and note she can still run targeted promotions or campaigns to reach the audience she wants.",
    playerDialogue: "I understand that brand reputation and review quality matter. BSB can support conversion on eligible bookings, but it does not determine the guest experience. Sometimes guests with a less positive experience simply want to be heard - acknowledging their feedback already signals what you're doing to improve. Let's separate that from the price opportunity, though. You can keep competitive prices to stay visible while BSB helps convert the demand, and none of this stops you running targeted promotions or campaigns to reach the audience you want.",
    partnerResponse: "Okay, I can't make a decision right now - let me reconsider all of this and let's connect next month.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-narrow-step5-blame-reviews",
    label: "Agree her Booking guests are just harder to please",
    description: "Concedes that Booking guests leave worse reviews - reinforcing the belief driving her resistance instead of decoupling reviews from the price decision.",
    playerDialogue: "You're probably right - our guests here can be a tougher crowd to please, and I'm afraid that just comes with the platform to some degree. A lot of partners tell me the very same thing, that the reviews on Booking.com tend to run a little harder than the ones on their own direct channels, so I completely understand why that would make you cautious about leaning in on the price side of things.",
    partnerResponse: "So you agree the reviews are a problem here. That doesn't make me keener to lean in.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "hv-r8-narrow-step5-push-now",
    label: "Press her to commit before the call ends",
    description: "Corners a franchise revenue manager for a yes on the spot, when she needs to reconsider against head-office policy. Pushing here converts a warm follow-up into a hard no.",
    playerDialogue: "Let's not leave this one hanging, Claire - can you commit today to aligning your rates with the ones on your own website, so that we lock in those gains together before next month even rolls around? If you give me the go-ahead right now, I can get everything moving straight away and you'll start seeing the difference well before we would otherwise be speaking again.",
    partnerResponse: "You're pushing me for a decision I've told you I can't make yet. Don't force it.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -8
  }
];
var step520 = {
  id: "separate-reviews",
  label: "Separate price from review risk",
  partnerPrompt: "I don't want to win guests just on price - I want them to choose me for the view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews.",
  options: step5Options20
};
var step6Options2 = [
  {
    id: "hv-r8-narrow-step6-correct",
    label: "Respect the deferral; offer support and schedule the follow-up",
    description: "SME-prescribed close on a soft no: don't push. Respect her need to reconsider, offer support in the meantime, and schedule the follow-up for next month - leaving the relationship warm and the door open.",
    playerDialogue: "No problem at all - take the time you need. Let me know if I can support you on anything in the meantime, I'll send a short recap of our discussion, along with some data points to help us follow up on the other opportunities we didn't have time to cover today - for example, to better capture demand from the high-value family segment. I'll schedule a follow-up for next month. Thank you for your time today, Claire.",
    partnerResponse: "Thank you, Oliver - I appreciate you not pushing. Let's talk again next month once I've thought it through.",
    styleMatch: { red: 2, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "hv-r8-narrow-step6-guilt",
    label: "Warn her she is losing revenue by waiting",
    description: "Turns her reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue: "Alright, I do understand - but I'd genuinely hate for you to look back next month and see just how much revenue quietly slipped away for every single week you sat waiting on this decision.",
    partnerResponse: "That's a strange note to end on. I said I'd reconsider - let's leave it there.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "hv-r8-narrow-step6-ultimatum",
    label: "Give her a deadline to align or lose visibility",
    description: "Attaches a visibility ultimatum to her decision timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue: "Just so it's firmly on your radar before we wrap up today - if you haven't aligned your rates by the time we speak next month, you should expect your visibility to keep sliding in the meantime.",
    partnerResponse: "So it's align or be buried? That's not the partnership I thought we had.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step62 = {
  id: "close",
  label: "Close gracefully on the soft no",
  partnerPrompt: "Okay, I can't make a decision right now - let me reconsider all of this and let's connect next month.",
  options: step6Options2
};
var hiddenValleyNarrowR8 = {
  conversationShape: "branching",
  partnerId: "hidden-valley-narrow",
  round: 8,
  issueTreePath: hiddenValleyR8IssueTreePath,
  openingAm: openingAm5,
  steps: [step120, step223, step323, step420, step520, step62]
};

// src/data/scenarios/hidden-valley-wide-r8.ts
var openingAm6 = "Good morning, Claire. It's always a pleasure speaking with you - I hope things are running smoothly.";
var step1Options22 = [
  {
    id: "hv-r8-wide-step1-correct",
    label: "Name the 7% gap and ask about the strategy behind it",
    description: "SME-prescribed reveal: note that Booking.com is displaying prices around 7% less competitive than her direct channel, and open it up neutrally - ask about the strategy behind it rather than presuming.",
    playerDialogue: "I've pulled some metrics to help us look at how we can support your revenue goals. To start, I noticed our platform is currently displaying prices which are around 7% less competitive than your direct channel. I'd like to explore the strategy behind that with you.",
    partnerResponse: "Ah, yes. Our head office mandates a strict policy to keep our website cheaper to own the guest relationship. We're fully aware this means lower visibility on Booking.com, but it's a trade-off we accept because we want our loyal guests booking directly.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-wide-step1-accuse",
    label: "Tell her the 7% gap is costing her and must change",
    description: "Right that the gap matters, wrong route - it presumes the fix and frames a deliberate head-office policy as her error before you understand it. A franchise revenue manager will close down.",
    playerDialogue: "I've been through the numbers before this call, and the headline is simple: your prices here are running about 7% worse than your own direct site, and frankly that gap is costing you bookings every week. I really think you'll need to bring them into line so you stop losing out.",
    partnerResponse: "That's a head-office policy, not a mistake I made. If you're here to tell me it's wrong, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "hv-r8-wide-step1-fluff",
    label: "Open with small talk and no data",
    description: "Warm, but it wastes the slot for a revenue manager who came to review performance and wants the numbers.",
    playerDialogue: "Before we get lost in spreadsheets, I just want to say your property looks fantastic and your recent reviews have been lovely to read. You're clearly doing a lot right, so I really wouldn't stress about the numbers too much today - let's keep this relaxed and just catch up.",
    partnerResponse: "I appreciate that, but I set aside this time to review performance. What does the data actually show?",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step121 = {
  id: "reveal",
  label: "Reveal the Brand.com gap and probe the strategy",
  partnerPrompt: "Good morning, Oliver. Yes, we're busy but managing. Based on your agenda, I understand we're reviewing our performance today?",
  options: step1Options22
};
var step2Options24 = [
  {
    id: "hv-r8-wide-step2-correct",
    label: "Use the billboard logic; ask for the same rates as Brand.com",
    description: "SME-prescribed reframe: up to 90% of travelers who book with Booking.com discover the property here first, so an uncompetitive price means they discover competitors nearby - which hurts her direct discovery too. In a Wide market you can ask for the same rates and conditions she gives Brand.com.",
    playerDialogue: "The billboard effect is real, but up to 90% of travelers who book with us discover your property on our platform first. When your rates here aren't competitive, those travelers are more likely to discover another property nearby - which actually impacts your direct-channel discovery as well. Providing the same rates and conditions on Booking.com as your direct channel can help to ensure you're able to optimize for this traffic on our platform.",
    partnerResponse: "Hmm. I see the logic, but the policies are strict about this. If we match prices, we worry about third parties cutting their margins. And your guests already get a great price when they get that discount... how do you call it?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-wide-step2-member-rate",
    label: "Concede she should just keep the site cheaper",
    description: "Accepts the reverse-billboard premise - that a cheaper direct site is a fine trade-off - and never corrects the belief that's suppressing her visibility on both channels.",
    playerDialogue: "That's fair enough - keeping your own website a bit cheaper does clearly bring a good share of guests straight to you, and there's real value in owning that direct relationship the way your head office wants. If that trade-off is working and your loyal guests keep booking with you directly, then I don't think there's much here you need to change - it sounds like the policy is doing its job for you.",
    partnerResponse: "So the policy's fine, then? I'm not sure what we're reviewing.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "hv-r8-wide-step2-threat",
    label: "Warn her ranking will keep dropping",
    description: "Threaten a further visibility slide unless she aligns. Threatening ranking over how she prices is banned in every regime and torches a franchise relationship.",
    playerDialogue: "I'll be honest with you - as long as your own site keeps undercutting the price you show here, our ranking algorithm is going to read you as uncompetitive and keep pushing your property further down the search results. That slide won't stop until you align your rates with us, so the longer this head-office policy stays in place, the harder it becomes to climb back up where you should be.",
    partnerResponse: "Threatening my ranking over a head-office pricing policy is not going to move me.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step224 = {
  id: "billboard",
  label: "Reframe Direct-Is-Cheaper with the billboard logic",
  partnerPrompt: "Ah, yes. Our head office mandates a strict policy to keep our website cheaper to own the guest relationship. We're fully aware this means lower visibility on Booking.com, but it's a trade-off we accept because we want our loyal guests booking directly.",
  options: step2Options24
};
var step3Options24 = [
  {
    id: "hv-r8-wide-step3-correct",
    label: "Name BSB and explain it is Booking-funded and prepaid",
    description: "SME-prescribed explanation: that's the Booking Sponsored Benefit - a customer-facing product entirely funded by Booking.com to attract guests, and BSB reservations require pre-payment, so they're less likely to be canceled.",
    playerDialogue: "You mean the Booking Sponsored Benefit. It's a customer-facing product entirely funded by us and designed to help attract guests to your property. And because BSB reservations require pre-payment from the guest, they're less likely to be canceled.",
    partnerResponse: "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - guests will never book with me again if the lowest price is always on Booking.com!",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-wide-step3-apologize",
    label: "Agree BSB takes control away and offer to switch it off",
    description: "Concedes her framing that BSB is Booking.com seizing her price, and offers to remove the very shield protecting her competitiveness. It validates the objection instead of reframing it.",
    playerDialogue: "You're right that BSB does take some of the control over your pricing out of your hands. If it's genuinely bothering you and getting in the way, I can absolutely look into having it switched off for your property so you're back in full control of what guests see.",
    partnerResponse: "So you agree it's taking control from me. That doesn't reassure me at all.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "hv-r8-wide-step3-overclaim",
    label: "Promise BSB will guarantee a booking surge",
    description: "Over-promises a specific outcome BSB doesn't guarantee. A data-led revenue manager will spot the hollow guarantee and trust you less for it.",
    playerDialogue: "My advice is to just leave BSB running exactly as it is and let it do the work - it'll flood your property with bookings before you know it. I can pretty much guarantee you'll see your numbers jump next month, so there's really nothing here for you to worry about.",
    partnerResponse: "You can guarantee that? That's exactly the kind of claim that makes me trust the number less, not more.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -7
  }
];
var step324 = {
  id: "name-bsb",
  label: "Name and explain BSB",
  partnerPrompt: "Hmm. I see the logic, but the policies are strict about this. If we match prices, we worry about third parties cutting their margins. And your guests already get a great price when they get that discount... how do you call it?",
  options: step3Options24
};
var step4Options22 = [
  {
    id: "hv-r8-wide-step4-correct",
    label: "Clarify you still get your full rate; frame it as a win-win",
    description: "SME-prescribed handle: BSB isn't applied to all bookings, the partial room cost is paid by Booking.com on the guest's behalf, and she incurs no additional fees. Position it as a win-win: travelers see a better price, she gets stronger conversion, and prepaid bookings carry lower cancellation risk.",
    playerDialogue: "BSB does not make you lose revenue or incur any additional fees - the partial room cost is paid by Booking.com on behalf of the guests. This is also not something we apply to all of your bookings. We position it as a win-win: travelers see a better price, you get stronger conversion, and because these bookings are paid in advance, cancellation risk is lower.",
    partnerResponse: "I don't want to win guests just on price - I want them to choose me for the outstanding view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews. Given you're already discounting my rate, why should I join any of your programs or campaigns?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-wide-step4-dismiss-brand",
    label: "Tell her the brand worry is overblown",
    description: "Right that BSB is funded, wrong tone - it waves away the brand-reputation concern a franchise revenue manager is mandated to protect, which is exactly what keeps her from engaging.",
    playerDialogue: "I think the whole brand-reputation worry is a bit overblown here - when it comes down to it, guests care about getting a good price far more than most owners expect them to, and a slightly lower rate on our platform really isn't going to change how they feel about your property. I genuinely wouldn't let that concern hold you back from something that could grow your bookings.",
    partnerResponse: "My brand is the thing I'm here to protect. Telling me it doesn't matter isn't going to land.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "hv-r8-wide-step4-require-drop",
    label: "Tell her she must drop her public rate regardless",
    description: "Answers the funded-shield moment with a blanket demand to cut her published rate - which reintroduces the price-war fear BSB is meant to avoid and dictates her pricing.",
    playerDialogue: "One fix here is to just cut your public rate across the board so that you're never the expensive option on our platform, BSB or not. If you bring your published price down far enough that nobody can undercut you, then all of this back-and-forth about shields and discounts goes away and you'll always be the cheapest choice a traveler sees.",
    partnerResponse: "So after all that, the ask is to cut my rate everywhere? That's the opposite of protecting my brand.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step421 = {
  id: "bsb-shield",
  label: "Position BSB as a funded shield",
  partnerPrompt: "I don't see any benefit in showing a lower price to guests, even if it isn't a revenue loss for me. It's about my brand reputation - guests will never book with me again if the lowest price is always on Booking.com!",
  options: step4Options22
};
var step5Options21 = [
  {
    id: "hv-r8-wide-step5-correct",
    label: "Acknowledge the review worry, then separate it from price",
    description: "SME-prescribed handle: guests with a less positive experience often just want to be heard, so acknowledging feedback shows you're improving. Then separate the two threads - she can stay competitive to attract guests while BSB helps convert the demand.",
    playerDialogue: "Sometimes guests with a less positive experience simply want to be heard - acknowledging their feedback already signals what you're doing to improve. But let's separate the price opportunity from the bad-review risk. You can keep competitive prices to stay visible and attract guests, while BSB remains a tool that helps convert that demand to support your goals.",
    partnerResponse: "I understand that, but at the moment I can't make a decision - let me reconsider all of this and let's connect next month.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "hv-r8-wide-step5-blame-reviews",
    label: "Agree her guests are just harder to please",
    description: "Concedes that Booking guests leave worse reviews - reinforcing the belief driving her resistance instead of decoupling reviews from the price decision.",
    playerDialogue: "You're probably right, if I'm honest - our guests can be a tougher crowd to please, and they do tend to be quicker to leave a critical review than the ones who book with you directly. It's just one of those things that comes with the territory of being on a big platform like ours, and I don't think there's a huge amount either of us can really do to change that side of it.",
    partnerResponse: "So you agree the reviews are a problem here. That doesn't make me any keener to lean in.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "hv-r8-wide-step5-push-now",
    label: "Press her to commit before the call ends",
    description: "Corners a franchise revenue manager for a yes on the spot, when she needs to reconsider against head-office policy. Pushing here converts a warm follow-up into a hard no.",
    playerDialogue: "Let's not leave this hanging open until next month - I'd really like us to nail it down today. Can you commit right now to aligning your rates with what you offer direct, so we can lock in these gains straight away rather than losing another few weeks? I think a quick decision here is the right call, and there's no real reason to wait on it.",
    partnerResponse: "You're pushing me for a decision I've told you I can't make yet. Don't force it.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -8
  }
];
var step521 = {
  id: "separate-reviews",
  label: "Separate price from review risk",
  partnerPrompt: "I don't want to win guests just on price - I want them to choose me for the outstanding view, the service, the comfort. This way you're making me look 'affordable,' and Booking guests are always harder to please and leave bad reviews. Given you're already discounting my rate, why should I join any of your programs or campaigns?",
  options: step5Options21
};
var step6Options3 = [
  {
    id: "hv-r8-wide-step6-correct",
    label: "Respect the deferral; offer support and schedule the follow-up",
    description: "SME-prescribed close on a soft no: don't push. Respect her need to reconsider, offer to support her in the meantime, and schedule the follow-up for next month - leaving the relationship warm and the door open.",
    playerDialogue: "No problem at all - take the time you need. Let me know if I can support you on anything in the meantime, and I'll schedule a follow-up for next month. Thank you for your time today, Claire.",
    partnerResponse: "Thank you, Oliver - I appreciate you not pushing. Let's talk again next month once I've had a chance to think it through.",
    styleMatch: { red: 2, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "hv-r8-wide-step6-guilt",
    label: "Warn her she is leaving money on the table by waiting",
    description: "Turns her reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue: "Alright, I'll leave it there for now - but I'd hate for you to look back in a few months and realize just how much revenue you left sitting on the table for every single week that you waited to act on this.",
    partnerResponse: "That's a strange note to end on. I said I'd reconsider - let's leave it there.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "hv-r8-wide-step6-ultimatum",
    label: "Give her a deadline to align or lose visibility",
    description: "Attaches a visibility ultimatum to her decision timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue: "Just so it's on your radar before we wrap up - if you still haven't aligned your rates by the time we speak next month, then you should expect your visibility on our platform to keep sliding lower in the meantime.",
    partnerResponse: "So it's align or be buried? That's not the partnership I thought we had.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step63 = {
  id: "close",
  label: "Close gracefully on the soft no",
  partnerPrompt: "I understand that, but at the moment I can't make a decision - let me reconsider all of this and let's connect next month.",
  options: step6Options3
};
var hiddenValleyWideR8 = {
  conversationShape: "branching",
  partnerId: "hidden-valley-wide",
  round: 8,
  issueTreePath: hiddenValleyR8IssueTreePath,
  openingAm: openingAm6,
  steps: [step121, step224, step324, step421, step521, step63]
};

// src/data/scenarios/loft-living-base.ts
var loftLivingR9IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "key-ota-erpd-not-competitive",
  intent: "unintentional",
  rootCauseId: "missing-misaligned-discounts-ota",
  metricInsightId: "non-structural-changing-erpd",
  hookId: "deep-discount-or-mdot"
};

// src/data/scenarios/loft-living-none-r9.ts
var openingAm7 = "Hi Lucas, great to connect. Is it ok if we dive straight into the metrics?";
var step1Options23 = [
  {
    id: "ll-r9-none-step1-correct",
    label: "Name the 68% conversion drop; ask how he plans to address it",
    description: "SME-prescribed reveal: conversion is down 68%, so future room nights are falling behind by 46% versus peer. Given his focus on maximizing revenue across channels, ask how he's planning to address the volume gap.",
    playerDialogue: "I wanted to focus on your recent performance. Your conversion is down 68% compared to your peer group, and future room nights are 46% behind - while your average daily rate is 88% above peers. That combination suggests there's a significant revenue opportunity being left on the table. Given your focus on maximizing revenue across channels, how are you looking at this gap?",
    partnerResponse: "We've raised our base rates to increase revenue per room. But yes, the empty rooms are starting to hurt. I just don't like how Booking.com uses Partner Offers to discount my rooms without my consent - it feels like I'm losing control.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-none-step1-accuse",
    label: "Tell him his rates are simply too high",
    description: "Right that the gap matters, wrong route - it presumes the fix and reads as a price lecture to an autonomous operator before you understand his strategy.",
    playerDialogue: "The issue here is plain - you've priced yourself well out of the market on Booking.com, and the numbers only go one way if the rates stay where they are. So the fix is simple: bring your prices down across the board and the volume comes back. That's really the whole conversation.",
    partnerResponse: "You've decided that in thirty seconds. That's not how I run my portfolio.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ll-r9-none-step1-fluff",
    label: "Skip the data and reassure him",
    description: "Warm, but it wastes the slot for a data-led MPP who just agreed to dive straight into the metrics.",
    playerDialogue: "Lucas, I really wouldn't overthink one slower stretch like this - performance moves around a lot week to week, and it nearly always evens itself out once you look across a full quarter. I'd just sit tight, keep doing what you're doing, and give it a bit of time before we start reading too much into it.",
    partnerResponse: "I run on margins. 'It'll even out' isn't a plan I can use.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step122 = {
  id: "reveal",
  label: "Reveal the volume gap and probe the plan",
  partnerPrompt: "Good morning, yes, sure!",
  options: step1Options23
};
var step2Options25 = [
  {
    id: "ll-r9-none-step2-correct",
    label: "Explain the B2B leak; affirm his pricing autonomy",
    description: "SME-prescribed handle: look at why those Partner Offers appear - some of his B2B rates are escaping into public B2C search, so travelers buy his rooms at wholesale prices. He has complete freedom over his pricing, but addressing the leak internally will help his performance.",
    playerDialogue: "I hear you and I understand the frustration. However these rates are actually coming from your wholesale agreements. Booking.com is contractually allowed to source rates and inventory from other third-party providers and to display these as a Partner Offer on its platform as per our General Delivery Terms. Booking.com isn't the source of these rates; we're displaying what's available in the market.",
    partnerResponse: "Every wholesaler points fingers at the other. And in the meantime, I can't just lower my prices on Booking.com to chase volume.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-none-step2-concede-po",
    label: "Agree Booking discounts him without consent",
    description: "Concedes his framing that Partner Offer is Booking.com discounting his rooms without permission, instead of explaining that it surfaces a leaked wholesale rate he can address at source.",
    playerDialogue: "You're right, and I won't pretend otherwise - we are discounting your rooms through Partner Offer without asking you first, and I completely understand why that feels like you've lost control of your own pricing. It's your inventory, so having us mark it down without a heads-up is a fair thing to be frustrated about, and I get it.",
    partnerResponse: "So you admit you're doing it to me. That's exactly my problem.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ll-r9-none-step2-blame",
    label: "Tell him the leak is his problem to solve alone",
    description: "Dumps the leak on him as his problem to solve alone and refuses to help - an unacceptable brush-off that abandons the partner and turns a commercial ally into an adversary.",
    playerDialogue: "Look, I'll be straight with you - that's a supplier problem you created on your own side, so it's on you to go and sort it out with your wholesalers. It's not really something we can fix from here, and it's not our job to. Once you've cleaned up your own contracts, the leak stops, but that part is squarely down to you.",
    partnerResponse: "I called to look at performance, not to be told it's all my fault. Careful.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -12
  }
];
var step225 = {
  id: "leak-autonomy",
  label: "Explain the leak; keep his autonomy explicit",
  partnerPrompt: "We've raised our base rates to increase revenue per room. But yes, the empty rooms are starting to hurt. I just don't like how Booking.com uses Partner Offers to discount my rooms without my consent - it feels like I'm losing control.",
  options: step2Options25
};
var step3Options25 = [
  {
    id: "ll-r9-none-step3-correct",
    label: "Frame unsold rooms as unrecoverable; offer best price as the lever",
    description: "SME-prescribed handle: it isn't about lowering prices across the board, but an unsold room is revenue he can never recover. With conversion this slow he's leaving money on the table. While his pricing is entirely his choice, offering his best competitive price is the most direct lever to recover visibility.",
    playerDialogue: "It's not about lowering your prices across the board - but an unsold room is revenue you can never recover. With conversion this slow, you're leaving real money on the table.",
    partnerResponse: "If I offer a better price on Booking.com, my direct bookers might migrate over. That's a net loss for my margin.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-none-step3-require-cheapest",
    label: "Tell him he must be the cheapest to recover",
    description: "In a No Parity market you cannot require a lower price or matching. Telling him he has to be the cheapest on Booking.com pressures a rate reduction and is a compliance breach.",
    playerDialogue: "Realistically, to turn this around, you'll need to make Booking.com the cheapest place anyone can book you - cheaper than your own site and cheaper than anywhere else you sell. That's really the only thing that recovers the volume at this point, and until you're the lowest price on the platform the rooms just won't move.",
    partnerResponse: "So the ask is that I have to be the cheapest? I didn't think that was something you could require.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "ll-r9-none-step3-concede",
    label: "Accept that there is nothing he can safely do",
    description: "Takes his margin worry as the end of the conversation and offers no lever - leaving the unsold rooms and the leak unaddressed.",
    playerDialogue: "That's fair, and I don't want to talk over your concern - if offering a better price genuinely risks pulling your direct bookers across and hurting your margin, then I understand. If that's the trade-off, there's probably not a great deal we can do here, so maybe we just leave things as they are for now and revisit it another time.",
    partnerResponse: "So we're stuck? That's a disappointing place to land.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step325 = {
  id: "unsold-bestprice",
  label: "Unsold rooms; best price without a blanket cut",
  partnerPrompt: "Every wholesaler points fingers at the other. And in the meantime, I can't just lower my prices on Booking.com to chase volume.",
  options: step3Options25
};
var step4Options23 = [
  {
    id: "ll-r9-none-step4-correct",
    label: "Target non-overlapping segments; propose optimizing the mobile rate",
    description: "SME-prescribed handle: avoid direct-channel cannibalization by targeting segments that don't overlap with his direct audience. His mobile competitiveness is very low, so he's missing that segment. Propose optimizing his mobile-rate setup as a targeted test.",
    playerDialogue: "We can avoid that by targeting specific segments that don't overlap with your direct audience. Your mobile competitiveness is very low right now, so you're missing that segment entirely. What if we optimize your mobile-rate setup to make it competitive? How would you feel about running a targeted test like that?",
    partnerResponse: "I already have the mobile rate active. Are you asking me to increase the discount, or what?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-none-step4-blanket",
    label: "Suggest a blanket price drop instead",
    description: "Abandons the fenced, segment-targeted approach for an across-the-board cut - the very cannibalization he just flagged, and the price war the SME warns against.",
    playerDialogue: "How about we lower your rates on Booking.com only for a few months and let the volume come back. Don't overthink the segments or the setup; a straightforward cut across all your rates is one way to get the rooms filling again, and you can always adjust the prices later once bookings pick up.",
    partnerResponse: "That's the blanket cut I said I won't do - it feeds my direct bookers to you and torches my margin.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "ll-r9-none-step4-dismiss",
    label: "Dismiss his cannibalization worry outright",
    description: "Waves away a real commercial concern rather than engineering around it with a fenced segment. Lecturing an autonomous MPP on his own channel mix shuts him down.",
    playerDialogue: "That migration worry is mostly in your head - the direct bookers who love booking with you directly are going to keep doing exactly that, and it really doesn't play out the way you're picturing it. I wouldn't let a fear like that hold you back from a move that could genuinely help, so I'd just set it aside and get on with it.",
    partnerResponse: "You're telling me my own numbers are imaginary? That's not going to land.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -7
  }
];
var step422 = {
  id: "fenced-mobile",
  label: "Target a fenced segment; propose the mobile test",
  partnerPrompt: "If I offer a better price on Booking.com, my direct bookers might migrate over. That's a net loss for my margin.",
  options: step4Options23
};
var step5Options22 = [
  {
    id: "ll-r9-none-step5-correct",
    label: "Explain the misconfigured mobile setup; clarify Partner Offer",
    description: "SME-prescribed handle: not necessarily a bigger discount - a 10% mobile discount triggers mobile search badges and improves ranking, but he's excluded all weekends and longer booking windows, so it isn't moving revenue; and because his base rates rose, the setup is no longer competitive. Clarify Partner Offer is a consumer-focused tool, not a punishment, and offering his best competitive price minimizes the leak's impact.",
    playerDialogue: "Not necessarily a bigger discount. A 10% mobile discount triggers our mobile search badges and makes you more attractive on our platform - but you've excluded all weekends and longer booking windows, so it isn't moving revenue the way it should. And because your base rates went up, your current mobile setup is no longer competitive against peers. As for Partner Offer - it's designed to help travelers access a great price and increases your likelihood of selling inventory. We understand the frustration, but the rates behind it come from your wholesale distribution, not from us.",
    partnerResponse: "At the moment I'm not willing to share any more data or adjust my strategy. Thanks for all these inputs - I'll give this some thought and let you know next time we meet.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-none-step5-crank",
    label: "Tell him to crank the mobile discount and cut his base rate",
    description: "Answers a configuration problem with a blanket discount-and-cut, which pressures a lower price and misses the actual fix - the excluded weekends and long windows on an otherwise-live mobile rate.",
    playerDialogue: "The fix here is just to push that mobile discount right up - take it well past 10% - and bring your base rate down at the same time so the whole thing lands lower. Don't get bogged down in which windows or weekends are switched on or off; that's fiddly detail that won't really move the needle. If you just discount harder across the board and shave the base rate, the competitiveness comes straight back and the mobile segment starts converting again. That's one route back to the volume you're missing, so I'd crank both levers together and not overthink it.",
    partnerResponse: "So the answer is discount harder and cut my base? That's the opposite of protecting my margin.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -9
  },
  {
    id: "ll-r9-none-step5-concede-po",
    label: "Agree Partner Offer is a punishment and offer to remove it",
    description: "Concedes his framing that Partner Offer is punitive and offers to switch it off - validating the objection instead of clarifying that it surfaces the best public price.",
    playerDialogue: "You know what, you're right, and I'm not going to argue the point - Partner Offer does feel like a punishment when it's marking your rooms down without you signing off on it, and I completely get why it's sitting badly with you. If it's genuinely the thing standing in the way of everything else we've talked about, then let me take it away as a blocker - I can go back and look into whether we can have it switched off or removed from your account entirely, so it stops getting in the way. I'd rather clear that off the table than have it sour the whole relationship.",
    partnerResponse: "So you agree it's punitive. That doesn't build my confidence in the rest of this.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  }
];
var step522 = {
  id: "mobile-fix",
  label: "Fix the mobile setup; clarify Partner Offer",
  partnerPrompt: "I already have the mobile rate active. Are you asking me to increase the discount, or what?",
  options: step5Options22
};
var step6Options4 = [
  {
    id: "ll-r9-none-step6-correct",
    label: "Respect the deferral; offer support and book the follow-up",
    description: "SME-prescribed close on a soft no: don't push. Respect his need to think it over, offer to support him further, and set up a follow-up for next month.",
    playerDialogue: "No problem at all, Lucas - take the time you need. Let me know if I can support you further or pull any more data together, and I'll set up a follow-up for next month.",
    partnerResponse: "Appreciated - send me what supports it and we'll pick this up next month.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ll-r9-none-step6-guilt",
    label: "Warn him about the revenue he loses by waiting",
    description: "Turns his reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue: "Alright, but I'll be honest - every week you sit on this is real money walking straight out the door, and I'd genuinely hate for you to look back in a few months and regret waiting this long.",
    partnerResponse: "I told you I'd think it over. Pushing me now just makes me less inclined.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ll-r9-none-step6-ultimatum",
    label: "Give him a deadline or lose more visibility",
    description: "Attaches a visibility ultimatum to his timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue: "Just so you're clear before we wrap up - if this isn't sorted by next month, you should expect your visibility to keep sliding, and those rankings are hard to win back once they slip.",
    partnerResponse: "So it's act now or get buried? That's not the partnership I thought this was.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step64 = {
  id: "close",
  label: "Close gracefully on the soft no",
  partnerPrompt: "At the moment I'm not willing to share any more data or adjust my strategy. Thanks for all these inputs - I'll give this some thought and let you know next time we meet.",
  options: step6Options4
};
var loftLivingNoneR9 = {
  conversationShape: "branching",
  partnerId: "loft-living-none",
  round: 9,
  issueTreePath: loftLivingR9IssueTreePath,
  openingAm: openingAm7,
  steps: [step122, step225, step325, step422, step522, step64]
};

// src/data/scenarios/loft-living-narrow-r9.ts
var openingAm8 = "Hi Lucas, thanks for your time today. Is it alright if we dive straight into the metrics?";
var step1Options24 = [
  {
    id: "ll-r9-narrow-step1-correct",
    label: "Name the 68% conversion drop; tie it to his revenue objectives",
    description: "SME-prescribed reveal: conversion is down 68% recently and future room nights are down 46%, both against peer. Ask how that impacts his revenue objectives for the current quarter - framing it around what he cares about.",
    playerDialogue: "Your conversion has dropped by 68% recently, and your future room nights are down 46% - both against your peer group and versus same time last year. How does that impact your revenue objectives for the current quarter?",
    partnerResponse: "It's a major hit, obviously. But I'm facing a lot of noise. The Key OTA keeps pointing out price gaps caused by Booking.com undercutting me too. It feels like a race to the bottom.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-narrow-step1-accuse",
    label: "Tell him his pricing is simply wrong",
    description: "Right that the drop matters, wrong route - it presumes the fix and reads as a lecture to a commercial operator before you understand his strategy.",
    playerDialogue: "The numbers make it obvious - there is one problem on rate leakage and that's the thing you need to fix or the price you need to match. There's not much to diagnose here; the report has already told us where the problem is.",
    partnerResponse: "You've decided that from one report. That's not how I make decisions about my portfolio.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ll-r9-narrow-step1-fluff",
    label: "Skip the data and reassure him",
    description: "Warm, but it wastes the slot for a data-led MPP who just agreed to dive straight into the metrics.",
    playerDialogue: "I really wouldn't read too much into a soft patch like this - these things tend to sort themselves out over the course of the quarter, and I'd hate for you to over-react to a couple of quiet weeks.",
    partnerResponse: "I run on margins. 'It'll sort itself out' isn't a plan I can act on.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step123 = {
  id: "reveal",
  label: "Reveal the conversion and pace drop",
  partnerPrompt: "Good morning, yes, sure!",
  options: step1Options24
};
var step2Options26 = [
  {
    id: "ll-r9-narrow-step2-correct",
    label: "Name the leakage tax; probe the base-rate / occupancy setup",
    description: "SME-prescribed handle: acknowledge the frustration, then identify that static B2B rates intended for wholesalers are leaking publicly - acting as a tax on his brand rather than delivering opaque incremental volume. Probe whether there's a discrepancy in how his base rate or occupancy is set up here versus his other channels.",
    playerDialogue: "It's understandable to feel that way. We've identified static B2B rates, intended for wholesale packaging, leaking unpackaged onto public channels. Besides that, there seem to be some further rate differences - could there be a discrepancy in how your base rates are set up on Booking.com compared to your other channels?",
    partnerResponse: "Wholesale rates coming online is something I will review in addressing. Besides that, my website has our best-rate guarantee, and with the other OTAs I have more or less aligned agreements. I know you're about to ask me to match my direct rate on Booking.com - but if I do that, I risk shifting my direct bookings over to you.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-narrow-step2-concede-po",
    label: "Agree Booking is undercutting him too",
    description: "Concedes his race-to-the-bottom framing that Booking.com is one of the ones undercutting him, instead of separating the wholesale leak from the platform and reframing it.",
    playerDialogue: "You're right, and I'll be honest with you - we are part of that race to the bottom you're describing, and Booking.com is one of the channels undercutting you, however not as extreme as the Key OTA leaking wholesale rates. But, it's a genuinely tough spot to be in, and I completely see why it feels like everyone is pulling your price down at once. I don't think it's fair on you either, and I understand why the whole thing is so frustrating right now.",
    partnerResponse: "So you agree you're undercutting me. That just confirms the problem, it doesn't solve it.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ll-r9-narrow-step2-blame",
    label: "Tell him to go fight it out with the Key OTA",
    description: "Sends him off to battle the competitor instead of reframing the leak - it takes the price-war bait the SME warns against and abandons the diagnosis.",
    playerDialogue: "If the Key OTA is the one constantly poking at your price gaps while they go extreme by showing wholesale rates then one thing is to go straight at them - match whatever they're showing and undercut them back until they stop flagging it. Once you've beaten them on price and shut them up, the noise goes away and you can stop worrying about all these comparisons people keep throwing at you.",
    partnerResponse: "So your advice is to chase the Key OTA down on price? That's the race I'm trying to get out of.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  }
];
var step226 = {
  id: "leakage-tax",
  label: "Reframe the leak; probe the setup",
  partnerPrompt: "It's a major hit, obviously. But I'm facing a lot of noise. The Key OTA keeps pointing out price gaps caused by Booking.com undercutting me too. It feels like a race to the bottom.",
  options: step2Options26
};
var step3Options26 = [
  {
    id: "ll-r9-narrow-step3-correct",
    label: "Ask how he measures visibility against his direct performance",
    description: "SME-prescribed Socratic move: validate that it's a common concern, then ask how he currently measures the relationship between his Booking.com visibility and his direct channel's performance - drawing out the assumption himself.",
    playerDialogue: "That's a very common concern. But let me ask you this - how do you currently measure the relationship between your visibility on Booking.com and your direct channel's performance?",
    partnerResponse: "People find us on Booking.com, then book directly because we have the best rate. It works.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-narrow-step3-drop",
    label: "Accept the concern and drop the alignment idea",
    description: "Takes his cannibalization worry at face value and abandons the alignment thread entirely - leaving the visibility problem and the leak unaddressed.",
    playerDialogue: "That's fair enough - if aligning your rate here genuinely feels like it risks your direct bookings, then let's just forget about reviewing your base rates and leave those as they are for now. You can review addressing the wholesale rates only instead.",
    partnerResponse: "So there's nothing to discuss? Then what are we doing here?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ll-r9-narrow-step3-assert",
    label: "Insist cannibalization is a myth",
    description: "Flatly tells him his concern is imaginary rather than drawing out the logic with a question. Lecturing an autonomous MPP on his own channel mix shuts him down.",
    playerDialogue: "Cannibalization is basically a myth - you're worrying yourself about a problem that doesn't really exist in practice. Trust me on this, I've seen the numbers plenty of times. Fix this and the wholesale rates and you will be back on track in no-time.",
    partnerResponse: "You're telling me my direct channel doesn't matter? I've watched it pay my bills for years.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -7
  }
];
var step326 = {
  id: "socratic",
  label: "Socratic probe on visibility vs direct",
  partnerPrompt: "Wholesale rates coming online is something I will review in addressing. Besides that, my website has our best-rate guarantee, and with the other OTAs I have more or less aligned agreements. I know you're about to ask me to match my direct rate on Booking.com - but if I do that, I risk shifting my direct bookings over to you.",
  options: step3Options26
};
var step4Options24 = [
  {
    id: "ll-r9-narrow-step4-correct",
    label: "Show visibility gates discovery; propose a temporary alignment test",
    description: "SME-prescribed handle: it works only when he has visibility - if travelers can't find him because his ranking dropped, they never search his direct site. Aligning his Booking.com rate with his own website keeps a consistent presence. Propose a temporary alignment test to see if it lifts his overall direct traffic.",
    playerDialogue: "It does - but only when you have great visibility. If travelers do not find you on Booking.com in the first place, or find you less attractive versus higher ranked and better priced offers of competitors they won't even go looking for your direct site. Aligning your Booking.com rate with your own website improves your price point automatically versus your peers on our website, which impacts your visibility positively. Would you be open to testing a temporary alignment to see if it lifts your overall direct traffic?",
    partnerResponse: "I'd need to see that my total revenue across both channels actually goes up - I don't want to pay more commission for the same bookings. Also, what about the Partner Offer? I need it to disappear from my page on your platform.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-narrow-step4-require",
    label: "Tell him he has to align now to recover",
    description: "Requires alignment and pins ranking on it - both off-limits: external prices don't factor into ranking, and in a Narrow market we can't require rate alignment or threaten a ranking penalty.",
    playerDialogue: "There's really no way around this one - you have to align your rate here, and you have to do it now, otherwise your ranking keeps falling and the situation gets harder to recover from. I know it's blunt, but this isn't something we can test our way into slowly; it needs to happen straight away if you want your original visibility back.",
    partnerResponse: "'Have to' isn't a word I respond well to about my own pricing. Give me a reason, not an order.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -6
  },
  {
    id: "ll-r9-narrow-step4-vague",
    label: "Assert alignment helps without offering to measure it",
    description: "Right idea, but with no test or metric attached, a proof-driven MPP has nothing concrete to say yes to.",
    playerDialogue: "Aligning will definitely help your visibility here as you will improve price point versus your competition - it's genuinely the right thing to do, so my honest advice is to just go ahead and do it. You don't really need to overthink it or set up some elaborate measurement around it; it's a sound move and it'll work in your favor. Trust that it's the correct call and put it in place, and I'm confident you'll be glad you did.",
    partnerResponse: "'Definitely' based on what? I don't move on adjectives, I move on numbers.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  }
];
var step423 = {
  id: "visibility-test",
  label: "Visibility logic; propose a temporary alignment test",
  partnerPrompt: "People find us on Booking.com, then book directly because we have the best rate. It works.",
  options: step4Options24
};
var step5Options23 = [
  {
    id: "ll-r9-narrow-step5-correct",
    label: "Offer a measured two-week trial; clarify Partner Offer and the limit",
    description: "SME-prescribed handle: track total reservation volume and search impressions over a two-week trial so he sees the full picture. Clarify Partner Offer ensures travelers get the best price and isn't a punishment - and note you can't ask him to change or raise his rates on the Key OTA or other OTAs, only support his growth.",
    playerDialogue: "That makes sense. We can track your total reservation volume and search impressions over a two-week trial, so you see the whole picture, not just commission. And on Partner Offer - it's a tool we use to ensure travelers get a great price on Booking.com, it is not a punishment, and those rates are actually coming from your wholesale agreements.",
    partnerResponse: "At the moment I'm not willing to make any adjustment to my current strategy. I'll give this some thought and let you know next time we meet.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-narrow-step5-raise-ota",
    label: "Tie Partner Offer removal to full cross-channel alignment",
    description: "SME rewrite (Pack 5, Beppie): in a Narrow market you may only ask him to align with his own Brand.com - never to align across the key OTAs, and never to give Booking a better rate than other channels; OTA discrepancies may only be raised reactively and neutrally. Tying Partner Offer removal to a cross-channel parity plus best-rate demand is a compliance breach.",
    playerDialogue: "If you want Partner Offer to go away, ensure you align all rates, both Brand.com and the key OTAs, with us, or give us a better rate than the others. Otherwise this will keep happening, as we have to ensure we give our best prices to our customers.",
    partnerResponse: "You're telling me how to price on the Key OTA now? That's not yours to ask.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "ll-r9-narrow-step5-concede-po",
    label: "Agree Partner Offer is a punishment and offer to remove it",
    description: "Promises to have Partner Offer switched off or removed from his account - a promise an account manager cannot keep, on top of conceding his framing that it is Booking.com punishing him. Making a commitment you can't deliver is not something an AM can say.",
    playerDialogue: "You know, you're right that Partner Offer does feel like a punishment from where you're sitting - it drops a cheaper rate in front of travelers and makes it look like we're working against you. If that's genuinely the sticking point for you here, then I can go away and look into having it switched off or removed from your account entirely, so it stops getting in the way of the rest of what we're trying to do together. I'd rather clear that obstacle than have it sour the whole conversation.",
    partnerResponse: "So you agree it's punitive. That doesn't build much confidence in the rest of your pitch.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "risky",
    trustChange: -12
  }
];
var step523 = {
  id: "trial-clarify",
  label: "Frame the trial; clarify Partner Offer and the Narrow limit",
  partnerPrompt: "I'd need to see that my total revenue across both channels actually goes up - I don't want to pay more commission for the same bookings. Also, what about the Partner Offer? I need it to disappear from my page on your platform.",
  options: step5Options23
};
var step6Options5 = [
  {
    id: "ll-r9-narrow-step6-correct",
    label: "Respect the deferral; offer more data and book the follow-up",
    description: "SME-prescribed close on a soft no: don't push. Respect his need to think it over, offer to pull together more data that would help, and set up a follow-up for next month.",
    playerDialogue: "No problem at all, Lucas - take the time you need. Let me know if I can pull together any more data to help, and I'll set up a follow-up for next month.",
    partnerResponse: "Appreciated - send me what supports it and we'll pick this up next month.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ll-r9-narrow-step6-guilt",
    label: "Warn him about the revenue he loses by waiting",
    description: "Turns his reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue: "Alright, but I have to be honest - every week you sit on this is real money walking straight out the door, and I'd genuinely hate for you to look back and regret waiting.",
    partnerResponse: "I told you I'd think it over. Pushing me now just makes me less inclined.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ll-r9-narrow-step6-ultimatum",
    label: "Give him a deadline or lose more visibility",
    description: "Attaches a visibility ultimatum to his timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue: "Just so you know going into next month - if this isn't sorted by then, you should fully expect your visibility to keep dropping away in the meantime, and that's on you.",
    partnerResponse: "So it's act now or get buried? That's not the partnership I thought this was.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step65 = {
  id: "close",
  label: "Close gracefully on the soft no",
  partnerPrompt: "At the moment I'm not willing to make any adjustment to my current strategy. I'll give this some thought and let you know next time we meet.",
  options: step6Options5
};
var loftLivingNarrowR9 = {
  conversationShape: "branching",
  partnerId: "loft-living-narrow",
  round: 9,
  issueTreePath: loftLivingR9IssueTreePath,
  openingAm: openingAm8,
  steps: [step123, step226, step326, step423, step523, step65]
};

// src/data/scenarios/loft-living-wide-r9.ts
var openingAm9 = "Hi Lucas, thanks for taking my call. I've been looking at your performance - would you like to go straight to the data points?";
var step1Options25 = [
  {
    id: "ll-r9-wide-step1-correct",
    label: "Contrast the high ADR with the room-night drop; probe the approach",
    description: "SME-prescribed reveal: his ADR is well above peer, but past and future room nights are dropping severely - around 45% versus peers. Surface it and ask him to help you understand his current pricing approach rather than presuming.",
    playerDialogue: "Looking at your cross-channel data, your overall prices are around 30% more expensive compared to other channels. Our data also shows some rates are originating from wholesalers. With such a big price gap, and the fact that customers compare prices on Booking.com with other offers available online, this can delay bookings and push travelers towards other properties. Your past and future room nights are dropping severely versus peers - around 45%. Have you noticed a recent change in your occupancy? And, could you help me understand your current pricing strategy?",
    partnerResponse: "I've noticed it, but frankly I'm frustrated. Booking.com keeps applying those 'Partner Offers' and undercutting my direct rates. It's hurting my price integrity.",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-wide-step1-accuse",
    label: "Tell him his ADR is simply too high",
    description: "Right that the gap matters, wrong route - it presumes the fix and reads as a price lecture to a commercial operator who hasn't told you his strategy yet. He'll dig in.",
    playerDialogue: "The problem here is fairly obvious to me - your average daily rate is far too high for this market, well above where your peers sit, so you'll need to bring it down across the board if you actually want that volume to come back.",
    partnerResponse: "You've looked at one number and decided I'm overpriced. That's not a diagnosis, that's a guess.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ll-r9-wide-step1-fluff",
    label: "Open with reassurance and no data",
    description: "Warm, but it wastes the slot for a data-led MPP who just agreed to go straight to the numbers.",
    playerDialogue: "Lucas, your average daily rate looks really strong to me, so I genuinely wouldn't worry too much about any of this - in my experience the room nights tend to catch up with a healthy rate over time, and I'm sure yours will settle just fine.",
    partnerResponse: "I run a portfolio on margins. 'It'll catch up' isn't something I can take to my owners.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step124 = {
  id: "reveal",
  label: "Reveal the volume drop behind a high ADR",
  partnerPrompt: "Hello! Yes, let's do it.",
  options: step1Options25
};
var step2Options27 = [
  {
    id: "ll-r9-wide-step2-correct",
    label: "Reframe B2B as a leakage tax; ask for the same rates",
    description: "SME-prescribed handle: acknowledge the frustration - B2B distribution is built for opaque volume, but the moment it leaks into B2C it becomes a leakage tax on his brand. In a Wide market you can ask for the same rates he makes available to third parties and his direct channel, so his direct offering isn't undercut.",
    playerDialogue: "B2B distribution is designed for filling rooms that would otherwise stay empty through closed user groups. The moment a B2B rate 'leaks' into the B2C space, it stops being a volume tool and starts resulting in potentially less business in the otherwise higher-performing, higher-ADR channels. While we currently lack extranet data to show the exact room nights impacted by Partner Offer, we ask that you provide us the same rates available to third parties and your direct channel so your direct offering isn't undercut.",
    partnerResponse: "But these 'offers' are displayed on your platform. How am I even supposed to understand where they come from?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-wide-step2-concede-po",
    label: "Agree Partner Offer is Booking undercutting him",
    description: "Concedes his framing that Partner Offer is Booking.com discounting his rooms, and offers to switch it off - validating the objection instead of reframing where the leak actually comes from.",
    playerDialogue: "You're absolutely right, Lucas - Partner Offer is essentially us discounting your rooms and undercutting your direct rates, so I completely understand the frustration here. If it's causing you this much grief and hurting your price integrity, one thing I can do is look into having it switched off and removed from your property.",
    partnerResponse: "So you admit it's you doing it. That doesn't fix my price integrity, it just confirms my problem.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ll-r9-wide-step2-blame",
    label: "Tell him the leak is his own mess to clean up",
    description: "Right that the source is his B2B setup, wrong tone - dumping it on him as his mess abandons the acknowledgment step and turns a commercial ally into an adversary.",
    playerDialogue: "Look, let's be honest here - you're the one who signed those wholesale deals in the first place, so this leak is entirely your own mess to sort out. The rates are coming out of your B2B setup, not ours, which means it's genuinely on you to go back to those distributors, chase down where it's leaking, and clean the whole thing up yourself.",
    partnerResponse: "I called to look at performance, not to be told my business is a mess. Watch your tone.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step227 = {
  id: "leakage-tax",
  label: "Acknowledge the leak; reframe B2B as a leakage tax",
  partnerPrompt: "I've noticed it, but frankly I'm frustrated. Booking.com keeps applying those 'Partner Offers' and undercutting my direct rates. It's hurting my price integrity.",
  options: step2Options27
};
var step3Options27 = [
  {
    id: "ll-r9-wide-step3-correct",
    label: "Clarify the source is his wholesale agreements; probe how he monitors it",
    description: "SME-prescribed clarification: Booking.com displays the rate to protect his sales volume but isn't the source - these rates come from his own wholesale agreements. Ask how he currently monitors where his wholesale rates end up.",
    playerDialogue: "We display them to offer travelers attractive prices, but we aren't the source. These rates are actually coming from your wholesale agreements. Do you have a system in place to monitor your wholesale rate distribution?",
    partnerResponse: "We sign contracts with those distributors for a reason. If they leak them, it's a breach - but matching them publicly just makes it harder for me to manage my revenue.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-wide-step3-defensive",
    label: "Get defensive about Booking.com",
    description: "Deflects onto his suppliers without giving him the useful clarification - that the rate is his wholesale rate, not Booking's. It reads as dodging rather than diagnosing.",
    playerDialogue: "This really isn't our fault at all - it's entirely a supplier problem on your side, and I don't think it's fair to point the finger at us over it. Those distributors are the ones putting the rates out there, so the right move is for you to go straight to them and take it up directly, because there's genuinely not a lot we can do about it from where we sit.",
    partnerResponse: "That's a lot of 'not us' and not much help. Where does that leave me?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ll-r9-wide-step3-concede",
    label: "Accept that matching just makes his job harder",
    description: "Concedes his objection and drops the alignment ask entirely - leaving the leak in place and the visibility problem unaddressed.",
    playerDialogue: "That's a really fair point, Lucas, and I don't want to make your job any harder than it already is. If aligning those rates with your other channels genuinely complicates your revenue management and makes the day-to-day tougher for you, then let's just leave your rates exactly as they are for now and not force the issue.",
    partnerResponse: "So we agree there's nothing to do? Then I'm not sure why we're on the call.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step327 = {
  id: "clarify-source",
  label: "Clarify Booking is not the source; probe monitoring",
  partnerPrompt: "But these 'offers' are displayed on your platform. How am I even supposed to understand where they come from?",
  options: step3Options27
};
var step4Options25 = [
  {
    id: "ll-r9-wide-step4-correct",
    label: "Connect the leak to the 68% conversion drop; re-ask for the same rates",
    description: "SME-prescribed link: travelers are buying those opaque rates instead of the platform's, which is why conversion is down 68% versus peers. To stop the leakage eroding his revenue, re-ask for the same rates and conditions he makes available to other third parties and his direct website.",
    playerDialogue: "Right now travelers are booking those rates from your wholesale agreements instead of our platforms - and that's why your conversion is down 68% versus peers. Providing the same price and conditions available to other third parties and your direct website could help to stop this from continuing to erode your revenue.",
    partnerResponse: "If I match those rates on your end, I'm just giving away more margin on Booking.com.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-wide-step4-pricewar",
    label: "Tell him to undercut the leaked rate everywhere",
    description: "Right that the leaked rate is the problem, wrong route - telling him to go lower than the wholesale rate across the board is the price war the SME warns against, and it torches the ADR he's protecting.",
    playerDialogue: "One fix here is to just price yourself below that leaked wholesale rate everywhere it shows up - go lower than them across every channel you sell on, and the leak stops mattering because you're always the cheapest option travelers can find. Beat them on price and the whole problem disappears on its own.",
    partnerResponse: "So your answer is a race to the bottom that kills the ADR I've worked to hold? No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "ll-r9-wide-step4-vague",
    label: "Restate the problem without the data",
    description: "Names the leak again but never connects it to the conversion number, so a proof-driven MPP has nothing concrete to weigh.",
    playerDialogue: "The leak is genuinely hurting you, Lucas - I can see it's a real problem and it's clearly dragging on your business in a way that isn't good for you. It's the sort of thing that only gets worse the longer it sits there unaddressed, so it's really something we should sort out together sooner rather than later.",
    partnerResponse: "You keep saying it's a problem. Show me the number that proves it.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  }
];
var step424 = {
  id: "link-conversion",
  label: "Link the leak to conversion; re-ask alignment",
  partnerPrompt: "We sign contracts with those distributors for a reason. If they leak them, it's a breach - but matching them publicly just makes it harder for me to manage my revenue.",
  options: step4Options25
};
var step5Options24 = [
  {
    id: "ll-r9-wide-step5-correct",
    label: "Frame the unsold-room risk and offer the mobile-rate fix",
    description: "SME-prescribed handle: if visibility keeps dropping, those rooms sit empty and hurt him more than any margin trade. His mobile rate is uncompetitive because the rate rise outpaced the discount. You can't tell him to stop working with the wholesaler, but you can align his base rates so he stays attractive and recover demand.",
    playerDialogue: "If your visibility keeps declining, those rooms will likely sit empty - which comes at a higher cost than the margin you're protecting. Your mobile rate is also uncompetitive right now, probably because your rate increase outpaced the discount. What if we align your base rates so you stay an attractive option and start recovering that demand?",
    partnerResponse: "Ok, I get your point, but I can't take any action right now. I'll look at it by the end of the week - thanks for bringing this up.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ll-r9-wide-step5-drop-wholesaler",
    label: "Tell him to drop the wholesaler",
    description: "In a Wide market you may name the third party leaking the rate, but you cannot instruct the partner to stop working with the wholesaler. Telling him to cut them off oversteps.",
    playerDialogue: "Lucas, the cleanest fix by a mile is to just stop working with that wholesaler altogether - if you cut the contract with them completely, the rate has nowhere to leak from and the whole problem disappears overnight. I'd seriously look at winding down that distributor relationship, because as long as you keep feeding them rates they'll keep leaking into the public space and undercutting everything you're trying to protect here.",
    partnerResponse: "You don't get to tell me which distributors I work with. That's my commercial decision, not yours.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "ll-r9-wide-step5-slash-base",
    label: "Tell him to slash his base rate across the board",
    description: "Answers the margin worry with a blanket base-rate cut - reintroducing the price war and giving up the ADR premium instead of the targeted alignment and mobile fix.",
    playerDialogue: "One thing you can do here is just cut your base rate right across the board so that you're never showing up as the expensive option to anyone browsing - drop it everywhere and you stop worrying about the leak entirely, because no wholesale rate can undercut you if you're already the cheapest number on the page. Take the rate down and the volume comes straight back to you.",
    partnerResponse: "That's the everything-off approach again. It torches my ADR and I can't measure it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step524 = {
  id: "unsold-mobile",
  label: "Unsold rooms + mobile fix; do not dictate the wholesaler",
  partnerPrompt: "If I match those rates on your end, I'm just giving away more margin on Booking.com.",
  options: step5Options24
};
var step6Options6 = [
  {
    id: "ll-r9-wide-step6-correct",
    label: "Respect the deferral; offer more data and book the follow-up",
    description: "SME-prescribed close on a soft no: don't push. Respect that he'll look at it by the end of the week, offer to pull together any more data that would help, and set up a follow-up for next month.",
    playerDialogue: "No problem at all, Lucas - take the time you need. Let me know if I can pull together any more data to help you build the case, and I'll set up a follow-up for next month.",
    partnerResponse: "Appreciated - send me whatever supports it and we'll pick this up next month once I've dug into it.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ll-r9-wide-step6-guilt",
    label: "Warn him about the revenue he loses by waiting",
    description: "Turns his reasonable deferral into a warning about lost revenue. A parting guilt-trip undoes the goodwill the compliant conversation just earned.",
    playerDialogue: "Alright, but I'll be honest with you, Lucas - every week you sit on this is real money walking straight out the door, and I'd genuinely hate for you to look back and regret waiting.",
    partnerResponse: "I said I'd look at it by Friday. Pushing me now just makes me less inclined.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "ll-r9-wide-step6-ultimatum",
    label: "Give him a deadline or lose more visibility",
    description: "Attaches a visibility ultimatum to his timeline. Threatening ranking is banned in every regime, and doing it on the way out is the worst possible last impression.",
    playerDialogue: "Just so you're clear on where this stands - if it isn't sorted by next month, then you can fully expect your visibility on the platform to keep sliding lower and lower the whole time you wait.",
    partnerResponse: "So it's act now or get buried? That's not the partnership I thought this was.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step66 = {
  id: "close",
  label: "Close gracefully on the soft no",
  partnerPrompt: "Ok, I get your point, but I can't take any action right now. I'll look at it by the end of the week - thanks for bringing this up.",
  options: step6Options6
};
var loftLivingWideR9 = {
  conversationShape: "branching",
  partnerId: "loft-living-wide",
  round: 9,
  issueTreePath: loftLivingR9IssueTreePath,
  openingAm: openingAm9,
  steps: [step124, step227, step327, step424, step524, step66]
};

// src/data/scenarios/noble-falcon-r10-base.ts
var nobleFalconR10IssueTreePath = {
  trigger: "pricing-signal",
  issueId: "brand-com-erpd-not-competitive",
  intent: "intentional",
  rootCauseId: "structural-brand-first",
  metricInsightId: "structural-constant-non-competitive-erpd",
  hookId: "base-rate-misalignment"
};

// src/data/scenarios/noble-falcon-none-r10.ts
var openingAm10 = "Hi Adam, thanks for taking the time today. I wanted to look at your performance - are you ok if we align a bit on the strategy?";
var step1Options26 = [
  {
    id: "nf-r10-none-step1-correct",
    label: "Name the page-views-up / conversion-down split; probe the change",
    description: "SME-prescribed reveal: page views have increased versus peer, but conversion is taking a hit. Ask what has changed in his pricing strategy that might be influencing this, rather than presuming.",
    playerDialogue: "Reports show that your page views have increased versus your peer group, but conversion is taking a hit. What has changed in terms of your strategy that might be influencing this?",
    partnerResponse: "Our focus has shifted from a general 'revenue' goal to getting exactly how much we want from each channel. We're intentionally driving traffic away from third-party channels to reduce acquisition costs. We accept lower conversion on your platform as a necessary trade-off.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-none-step1-accuse",
    label: "Tell him his pricing is the problem",
    description: "Right that the split matters, wrong route - it presumes the cause and reads as a lecture to a brand-managed manager before you understand his strategy.",
    playerDialogue: "Your conversion is tanking because you've priced yourself out of the market - that's the real problem here, and it's the one thing you need to go and fix before we bother looking at anything else.",
    partnerResponse: "You've decided that in seconds. That's not how we run this brand.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "nf-r10-none-step1-fluff",
    label: "Skip the data and reassure him",
    description: "Warm, but it wastes the slot for a process-led revenue manager who agreed to align on strategy.",
    playerDialogue: "Honestly, before we get into the figures - I really wouldn't worry too much. Performance naturally moves around from week to week and tends to even itself out across a full quarter, so I'd just sit tight for now.",
    partnerResponse: "I made time to align on strategy. 'It'll even out' isn't that.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step125 = {
  id: "reveal",
  label: "Reveal the conversion hit; probe what changed",
  partnerPrompt: "Yes, let's do that!",
  options: step1Options26
};
var step2Options28 = [
  {
    id: "nf-r10-none-step2-correct",
    label: "Ask him to weigh an empty room against acquisition cost",
    description: "SME-prescribed probe: acknowledge it makes sense to look at the distribution mix, then ask how he calculates the true cost of an empty room versus the commission cost of a new guest acquisition - drawing out the trade-off himself.",
    playerDialogue: "Thank you for sharing - it makes sense to look at the distribution mix. But let me ask: how do you calculate the true cost of an empty room versus the cost of acquiring a new guest through commission?",
    partnerResponse: "An empty room is a loss, obviously. But high commission eats our margins. We need to keep our website always more competitive than yours or the other third-party channels.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-none-step2-concede",
    label: "Agree commission makes his direct-first plan right",
    description: "Concedes that keeping his website cheaper is simply the smart call, instead of surfacing the cost of the empty rooms that plan is creating.",
    playerDialogue: "That's fair enough - with commission sitting where it is right now, I can completely see why keeping your own website a little cheaper than everyone else is probably just the smart, sensible play for you here.",
    partnerResponse: "So we agree. Then I'm not sure what you're here to change.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "nf-r10-none-step2-dismiss",
    label: "Tell him commission worries are overblown",
    description: "Waves away a core commercial concern rather than reframing it through the empty-room cost. Dismissing a brand-managed manager's margin logic shuts him down.",
    playerDialogue: "Everyone in this industry frets about commission far too much, and I'd gently push back on that - next to the sheer volume of guests we send your way, it really is little more than a rounding error on the books.",
    partnerResponse: "A rounding error? You clearly don't run the P&L I run.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step228 = {
  id: "empty-room",
  label: "Probe the cost of an empty room",
  partnerPrompt: "Our focus has shifted from a general 'revenue' goal to getting exactly how much we want from each channel. We're intentionally driving traffic away from third-party channels to reduce acquisition costs. We accept lower conversion on your platform as a necessary trade-off.",
  options: step2Options28
};
var step3Options28 = [
  {
    id: "nf-r10-none-step3-correct",
    label: "Show empty rooms eat margin too; ask for his best price and his worry",
    description: "SME-prescribed handle: growing empty rooms eat his margins too, and when his prices aren't competitive travelers gravitate to better-value alternatives on the same page. His pricing is entirely his choice, but offering his best price takes the most from the platform's traffic. Ask what his biggest worry is about giving his best price.",
    playerDialogue: "If empty rooms grow, that eats your margins too. When your prices aren't competitive, travelers gravitate to better-value alternatives on the same search page. While your pricing strategy is entirely up to you, offering your best price ensures you take the most out of the traffic our platform drives. What's your biggest worry about giving us your best price?",
    partnerResponse: "My main worry is revenue dilution - paying commission for a guest who would have booked directly anyway.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-none-step3-require-cheapest",
    label: "Tell him he must be cheaper than his own site to recover",
    description: "In a No Parity market you cannot require a lower price or matching. Telling him he has to undercut his own website pressures a rate reduction and is a compliance breach.",
    playerDialogue: "Realistically, if you actually want to turn this around, you're going to need to make sure Booking.com is priced cheaper than your own website - that's not optional, that's the requirement. Until you commit to being the cheapest place a guest can book you, the conversion won't recover, so you really do have to undercut your direct site to fix this properly.",
    partnerResponse: "So the ask is that I have to be the cheapest? I didn't think that was something you could require.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "nf-r10-none-step3-concede",
    label: "Accept the trade-off and drop the point",
    description: "Takes the accepted-lower-conversion trade-off at face value and offers no lever - leaving the empty rooms and the gap unaddressed.",
    playerDialogue: "Fair enough - if you've genuinely accepted lower conversion here as a deliberate trade-off for driving traffic to your own channels, then I don't think there's much point in me pushing against that. You've clearly thought it through, it's your call to make, and if that's the strategy you've settled on then we can just leave it there and move on for today.",
    partnerResponse: "So there's nothing to discuss. Disappointing use of the slot.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  }
];
var step328 = {
  id: "best-price",
  label: "Best price + autonomy; probe his biggest worry",
  partnerPrompt: "An empty room is a loss, obviously. But high commission eats our margins. We need to keep our website always more competitive than yours or the other third-party channels.",
  options: step3Options28
};
var step4Options26 = [
  {
    id: "nf-r10-none-step4-correct",
    label: "Frame global reach as net-new international demand",
    description: "SME-prescribed handle: a large share of the platform's bookers are international travelers who'd never have found his brand otherwise. Making his best price available leverages that visibility at zero cost to fill empty rooms, which he can then convert into loyal direct guests. Ask how that fits his long-term plan.",
    playerDialogue: "That's where our global reach adds value. A large share of our bookers are international travelers who'd never have found your brand otherwise. By making your best price available to us, you leverage that visibility at zero upfront cost to fill your empty rooms - and once they stay with you, they might become loyal direct guests. How does that fit into your long-term plan?",
    partnerResponse: "It makes sense for international guests, but our brand restrictions are very tight right now.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-none-step4-overclaim",
    label: "Guarantee a flood of new bookings",
    description: "Over-promises a specific outcome the platform can't guarantee. A process-led revenue manager will spot the hollow guarantee and trust you less for it.",
    playerDialogue: "Give us your best price and I can pretty much guarantee your empty rooms fill right up within the next month or so - I've seen it happen time and time again with properties just like yours, the demand comes flooding in almost immediately, and it always works out exactly the way I'm describing, so you really have nothing to lose by just trying it out with us.",
    partnerResponse: "You can guarantee that? That's the kind of promise that makes me trust the pitch less.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -6
  },
  {
    id: "nf-r10-none-step4-dismiss",
    label: "Brush aside his brand restrictions",
    description: "Waves away the brand rules a fully-managed manager is bound by. Telling him his own constraints don't matter is exactly what closes him down.",
    playerDialogue: "Brand restrictions are usually far more flexible than people tend to think - in my experience there's nearly always some room to move once you actually go and ask the question internally, so I really wouldn't let a few rules on paper stop you from doing what obviously makes commercial sense here. I'd push on them a bit if I were you, because they rarely turn out to be as fixed as they first appear.",
    partnerResponse: "You don't get to decide how flexible my brand rules are. I do.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step425 = {
  id: "global-reach",
  label: "Global reach; the net-new international value",
  partnerPrompt: "My main worry is revenue dilution - paying commission for a guest who would have booked directly anyway.",
  options: step4Options26
};
var step5Options25 = [
  {
    id: "nf-r10-none-step5-correct",
    label: "Pivot to family searches; frame it as a setup fix, not a price drop",
    description: "SME-prescribed handle: if the broader move isn't allowed, look at targeted opportunities like family searches. Because family rates aren't set correctly, children are priced as adults. His pricing is completely up to him, but correcting the family settings lets families accurately find and book. Offer a low-risk experiment on that segment.",
    playerDialogue: "If that's not allowed, let's look at targeted opportunities like family searches. Because your family rates aren't set correctly, children are being priced as adults. While your pricing strategy is completely up to you, correcting those settings just ensures families can accurately find and book your rooms - no base-rate change. Would you be open to a trial to optimize that one segment?",
    partnerResponse: "Well, we're family-friendly, but that doesn't mean all children pay less than adults. And these family bookings are often high-risk ones - invalid cards, short-notice cancellations if children get sick, and rooms left in a very poor state after they leave.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-none-step5-price-drop",
    label: "Frame it as dropping the family price",
    description: "Right segment, wrong framing - it turns a setup correction into a price cut, which reads as another discount ask to a manager guarding his ADR, and misses the 'no base-rate change' angle.",
    playerDialogue: "You just need to drop your family prices here to a properly competitive level, and once you've done that the family bookings will start coming through on their own. It really is that simple - families are always hunting for the best possible deal, so if you're willing to bring those rates down a bit and make yourself the cheaper option for them, the volume follows almost automatically and you'll see it move pretty quickly.",
    partnerResponse: "So more discounting. That's the opposite of what I can do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "nf-r10-none-step5-blame",
    label: "Tell him he should have caught the family setup",
    description: "Frames the family mispricing as his oversight rather than a shared setup check. Blaming a brand-managed manager for a config gap ends the collaboration.",
    playerDialogue: "Your family rates are clearly set up wrong on your side, and this is the sort of thing you really should have caught yourself long before now. It's been sitting there quietly costing you family bookings for goodness knows how long, and it's fairly basic housekeeping at the end of the day, so I'm a little surprised nobody on your team spotted it and sorted it out well ahead of this call.",
    partnerResponse: "So now it's my fault as well. This isn't going the way I hoped.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step525 = {
  id: "family-pivot",
  label: "Pivot to the family setup fix",
  partnerPrompt: "It makes sense for international guests, but our brand restrictions are very tight right now.",
  options: step5Options25
};
var step6Options7 = [
  {
    id: "nf-r10-none-step6-correct",
    label: "Offer prepayment on family rooms; offer to implement together",
    description: "SME-prescribed handle: replicate the strict cancellation or prepayment conditions he uses for high-risk periods on family rooms too, while keeping the base rate competitive - and offer to implement it together on the call. He still ends the call without committing; the win is the compliant, supportive offer that keeps the door open.",
    playerDialogue: "Then let's replicate the strict cancellation or prepayment conditions you already use for high-risk periods on family rooms too - that way you manage the risk without changing the base rate. I'm here to support your occupancy and revenue goals - if there are settings in the way, take the chance of having me on the call and we can implement it together.",
    partnerResponse: "This isn't enough to prevent the risks from actually happening, and I don't want to change all the settings again - this isn't the way I want to cooperate. Thank you very much for the opportunity, but I really have to take off the phone. Speak to you soon.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "nf-r10-none-step6-dismiss-risk",
    label: "Tell him the family risk barely happens",
    description: "Waves away a real operational concern instead of engineering around it with prepayment. Dismissing the Risky Guest worry is exactly what hardens his no.",
    playerDialogue: "That whole family-risk thing barely ever happens in practice - I really wouldn't let a handful of bad bookings a year hold up an entire segment that could be filling your empty rooms. The invalid cards and the messy check-outs you're describing are genuinely rare, and in the grand scheme of the volume we're talking about they're just not worth the worry.",
    partnerResponse: "You clearly haven't cleaned the rooms afterward. We're done here.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "nf-r10-none-step6-ultimatum",
    label: "Warn his ranking suffers if he does nothing",
    description: "Attaches a visibility threat to his hesitation. Threatening ranking is banned in every regime, and it's the surest way to turn a strong no into a closed door.",
    playerDialogue: "Just so we're completely clear, if you choose to do nothing at all here and leave everything exactly as it is, your ranking on the platform is only going to keep sliding further and further down from where it sits today. That's the reality of it, and once it starts slipping it gets harder and harder to claw back, so doing nothing really isn't a neutral choice for you.",
    partnerResponse: "Threatening my ranking is exactly why this call is over. Goodbye.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step67 = {
  id: "close",
  label: "Handle the family risk; close professionally on the strong no",
  partnerPrompt: "Well, we're family-friendly, but that doesn't mean all children pay less than adults. And these family bookings are often high-risk ones - invalid cards, short-notice cancellations if children get sick, and rooms left in a very poor state after they leave.",
  options: step6Options7
};
var nobleFalconNoneR10 = {
  conversationShape: "branching",
  partnerId: "noble-falcon-none",
  round: 10,
  issueTreePath: nobleFalconR10IssueTreePath,
  openingAm: openingAm10,
  steps: [step125, step228, step328, step425, step525, step67],
  closingCoachNote: "A firm no here is a realistic outcome, not a failed call. Adam is fully brand-managed with little room to move, and you kept the conversation compliant, respectful, and focused on his goals - which is exactly what keeps the door open. Don't write him off: log the family-setup fix and the prepayment offer you put forward, and follow up next cycle, when his numbers or his head-office guidance may have shifted. A well-handled no you can return to is worth more than a yes you had to pressure out."
};

// src/data/scenarios/noble-falcon-narrow-r10.ts
var openingAm11 = "Good morning, Adam. I was reviewing your performance this morning - can I share some insights with you?";
var step1Options27 = [
  {
    id: "nf-r10-narrow-step1-correct",
    label: "Name the 20%-higher gap and ask him to walk you through it",
    description: "SME-prescribed reveal: bookings have slowed, and it seems to be because his prices here are around 20% higher than his own website. Ask him to walk you through the strategy behind the setup rather than presuming.",
    playerDialogue: "I've noticed your bookings have slowed down, and it seems to be because prices on our platform are currently around 20% higher than the rates on your website. Can you walk me through the strategy behind this setup?",
    partnerResponse: "Morning. It's simple: we want direct conversion. If a traveler sees it's cheaper on our site, they will likely not book on your platform but directly with us.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-narrow-step1-accuse",
    label: "Tell him the gap is simply a mistake",
    description: "Right that the gap matters, wrong route - it presumes the fix and frames a deliberate strategy as his error before you understand it. A brand-managed manager will close down.",
    playerDialogue: "Your prices on our platform are running about 20% too high - it's the whole reason your bookings dried up. You have become too expensive for what you are offering so without fixing it, do not expect anything to improve.",
    partnerResponse: "That's a deliberate strategy, not a mistake. If that's your pitch, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "nf-r10-narrow-step1-fluff",
    label: "Skip the data and reassure him",
    description: "Warm, but it wastes the slot for a process-led revenue manager who just agreed to look at the insights.",
    playerDialogue: "Honestly, Adam, I really wouldn't worry too much - your approach here isn't new, and in my experience performance tends to even out on its own. A quieter stretch one quarter usually turns around the next without anyone needing to touch a thing.",
    partnerResponse: "I set aside this time for the numbers. 'It'll sort itself out' isn't insight.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step126 = {
  id: "reveal",
  label: "Reveal the gap; probe the strategy",
  partnerPrompt: "Good morning, yes, sure, let's go ahead!",
  options: step1Options27
};
var step2Options29 = [
  {
    id: "nf-r10-narrow-step2-correct",
    label: "Show they click a competitor, not his site; probe the lost-customer risk",
    description: "SME-prescribed handle: guest search behavior shows a different pattern - when travelers see a higher price here than on his website, they don't jump to his site, they click a cheaper competitor on the same search page. Ask how he evaluates that risk of losing the customer entirely.",
    playerDialogue: "I understand the logic. But you risk being left with all the guests who do not go to your website as a first step - up to 90% of customers who book with Booking.com discover the property on the platform first. Guest search behavior on our platform shows a different pattern - when they search on our website they compare properties against each other, and with such a high price you risk them not clicking on your property in the first place and others having better visibility. This way they do not even start the journey that leads them to click on your website to get your best price.",
    partnerResponse: "Our data suggests our brand pull is strong enough to capture them already directly.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-narrow-step2-concede",
    label: "Agree his brand pull will carry it",
    description: "Concedes the direct-channel premise - that guests will always find their way to his site - instead of surfacing the competitor-click behavior that loses the guest entirely.",
    playerDialogue: "That's fair, and I take your point - your brand really is strong, and I'd agree that most of the guests who already know you will make the effort to find their way over to your own site and book directly, even when the price here is a little higher. If that's holding up the way you expect, then the direct-conversion play is doing its job.",
    partnerResponse: "So we agree the strategy works. Then what are we fixing?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "nf-r10-narrow-step2-dismiss",
    label: "Tell him his brand pull is wishful thinking",
    description: "Flatly contradicts his read of his own brand rather than drawing out the search behavior. Lecturing a brand-managed manager shuts him down.",
    playerDialogue: "Adam, that whole brand-pull idea is just wishful thinking - nobody out there is loyal enough to go hunting you down across the internet when they mostly look on big OTA websites as ours to book a trip and finding there are cheaper competitors is comparable properties sitting right next to you on the same search page. People take the convenient and cheaper option most of the time, and expecting them to do otherwise is going to keep costing you these bookings.",
    partnerResponse: "You're telling me my brand means nothing? That's a strange way to win me over.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step229 = {
  id: "search-behavior",
  label: "Search behavior; probe the risk of losing the guest",
  partnerPrompt: "Morning. It's simple: we want direct conversion. If a traveler sees it's cheaper on our site, they leave your platform and book with us.",
  options: step2Options29
};
var step3Options29 = [
  {
    id: "nf-r10-narrow-step3-correct",
    label: "Name the net-new value; ask to align public rates with his website",
    description: "SME-prescribed handle: for loyal guests his brand pull works, but net-new travelers who don't know his brand are the value the platform brings. Ask him to align his public rates and conditions with his own direct website here, so he doesn't lose the guests who start their journey on Booking.com.",
    playerDialogue: "For your loyal guests, absolutely. But what about the net-new travelers who don't know your brand yet? That's the value we bring - and it's why we ask that you align your public rates and conditions with your direct website here: this will make you more competitively priced on our platform versus your competition, which improves your visibility to these new travelers, enabling you to capture more bookers that start their journey on our platform.",
    partnerResponse: "If I align the public rates, I only dilute our ADR and compromise our selling proposition.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-narrow-step3-ota-parity",
    label: "Ask him to match the other OTAs too",
    description: "In a Narrow market you can ask him to align with his own Brand.com, but not to match other OTAs. Asking him to level his rates with the other platforms is a compliance breach.",
    playerDialogue: "The cleanest fix here is just to give us exactly the same rates you're giving the other OTAs - if you line all of them up so you're sitting level across every single platform, then nobody undercuts anybody and this whole gap disappears overnight. This way you do not touch your own direct rates vs us, and with a clean playing field making the value proposition of your property more clear on all channels. So if you match us to what you're offering everyone else you likely have both the undercutting sorted as well as the challenges in conversion.",
    partnerResponse: "You're asking me to line my rates up with the other OTAs? I didn't think that was something you could ask.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "nf-r10-narrow-step3-concede",
    label: "Accept the ADR worry and drop the ask",
    description: "Takes his dilution concern as the end of it and abandons the alignment thread - leaving the net-new travelers, and the gap, unaddressed.",
    playerDialogue: "That's a completely fair point, and I don't want to push you somewhere that hurts your business model. If aligning your public rates on your own website with us really would dilute your ADR and work against the selling proposition you've built, then let's not force it - leave your public rates exactly where they are for now.",
    partnerResponse: "So there's nothing to do? Then I'm not sure why we're talking.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  }
];
var step329 = {
  id: "net-new-align",
  label: "Net-new travelers; align public rates with Brand.com",
  partnerPrompt: "Our data suggests our brand pull is strong enough to capture them directly.",
  options: step3Options29
};
var step4Options27 = [
  {
    id: "nf-r10-narrow-step4-correct",
    label: "Offer fenced member rates; surface the family visibility gap",
    description: "SME-prescribed handle: he can still use fenced, closed member rates on his site to reward loyalty, while aligned public rates keep his organic ranking healthy. Then surface that his family-specific search visibility is dropping significantly.",
    playerDialogue: "Not necessarily - you can still use fenced, closed member rates on your own site to reward loyalty. But keeping your public rates and conditions aligned with your direct channel makes your rates more attractive versus competition to net-new travelers on our platform. And while reviewing your rate setups, I noticed a gap in your family occupancy setting - causing your family-specific search visibility to drop significantly.",
    partnerResponse: "That's odd. We're a family-friendly brand - our occupancy settings should be fine.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-narrow-step4-cut-public",
    label: "Tell him to just cut his public rates",
    description: "Right that competitiveness matters, wrong lever - it makes it a public discount ask rather than the align-with-your-own-website + fenced-member-rate structure, and walks straight into his ADR-dilution fear.",
    playerDialogue: "One thing you can do here is just cut your public rates so you come out as the cheaper option on the page - being the lower price is what makes you competitive, so the moment you're sitting under the competition you're back in the mix for those bookings. Drop the public numbers a bit and you're the obvious choice for anyone comparing on price.",
    partnerResponse: "Cutting my public rate is exactly the ADR dilution I just flagged. That's a no.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "nf-r10-narrow-step4-dismiss-family",
    label: "Brush past the family signal",
    description: "Drops the family visibility gap rather than surfacing it, missing the one setup lever that could move without touching his ADR.",
    playerDialogue: "That family occupancy thing is probably nothing worth chasing - it's not the biggest demand so not the biggest potential win. Let's not get distracted by the family numbers and just keep our focus where it actually matters, which is sorting out these public rates and the gap against your own website.",
    partnerResponse: "You raised it, then waved it off. Which is it?",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -4
  }
];
var step426 = {
  id: "member-family",
  label: "Member rates + ranking; surface the family gap",
  partnerPrompt: "If I align the public rates, I only dilute our ADR and compromise our selling proposition.",
  options: step4Options27
};
var step5Options26 = [
  {
    id: "nf-r10-narrow-step5-correct",
    label: "Explain children priced as adults; frame it as a setup fix",
    description: "SME-prescribed handle: his settings are optimized on his website, but here the family rates aren't set correctly, so the system prices children as full adults - making family stays look artificially expensive. Note families grew nearly two times faster and are 24% more likely to review, and offer to correct the configuration.",
    playerDialogue: "They're optimized on your website, but on our platform your family rates aren't set correctly - our system is pricing children as full adults, which makes the stay look artificially expensive for families. Given families grew nearly two times faster than other segments and are 24% more likely to leave a review, would you like to correct this configuration?",
    partnerResponse: "Well, being family-friendly doesn't mean all children pay less than adults. And these family bookings are often high-risk ones - invalid cards, short-notice cancellations if children get sick, and rooms left in a very poor state after they leave.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-narrow-step5-price-drop",
    label: "Frame it as dropping the family price",
    description: "Right segment, wrong framing - it turns a setup correction into a price cut, which reads as another discount ask to a manager guarding his ADR, and misses the 'without touching your base rate' angle.",
    playerDialogue: "The way I'd look at it, you just need to drop your family prices here so you come out competitive for those searches, and once the numbers look cheaper for families the bookings in that segment will start coming through on their own. Families are hunting for the best deal like everyone else, so if you make the family rate the obvious cheaper choice on the page, that whole part of your business opens back up.",
    partnerResponse: "So more discounting. That's the opposite of what I told you I can do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "nf-r10-narrow-step5-blame",
    label: "Tell him he misconfigured it and should have caught it",
    description: "Frames the family mispricing as his oversight rather than a shared extranet check. Blaming a brand-managed manager for a config gap ends the collaboration.",
    playerDialogue: "I have to be straight with you here - your family rates are just set up wrong on your own side of the extranet, and this is the kind of thing you really should have caught and sorted out yourself a long time ago. The children are being priced as full adults because nobody on your team checked the occupancy settings properly, and that oversight is sitting squarely with you, not with us.",
    partnerResponse: "So now it's my fault too. This is not going the way I hoped.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step526 = {
  id: "child-rate",
  label: "Explain the child-rate mispricing; the family value",
  partnerPrompt: "That's odd. We're a family-friendly brand - our occupancy settings should be fine.",
  options: step5Options26
};
var step6Options8 = [
  {
    id: "nf-r10-narrow-step6-correct",
    label: "Offer prepayment on family rooms; offer to implement together",
    description: "SME-prescribed handle: replicate the strict cancellation or prepayment conditions he uses for high-risk periods on family rooms too, while keeping the base rate competitive - and offer to implement it together on the call. He still ends the call without committing; the win is the compliant, supportive offer that keeps the door open.",
    playerDialogue: "Then let's replicate the strict cancellation or prepayment conditions you use for high-risk periods on family rooms too, while keeping the base rate competitive. I'm here to support your occupancy and revenue goals - if there are settings in the way, take the chance of having me on the call and we can implement it together.",
    partnerResponse: "This isn't enough to prevent the risks from actually happening, and I don't want to change all the settings again - this isn't the way I want to cooperate. Thank you very much for the opportunity, but I really have to take off the phone. Speak to you soon.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "nf-r10-narrow-step6-dismiss-risk",
    label: "Tell him the family risk barely happens",
    description: "Waves away a real operational concern instead of engineering around it with prepayment. Dismissing the Risky Guest worry is exactly what hardens his no.",
    playerDialogue: "Adam, all that family-risk stuff barely happens in practice - you get the odd invalid card or a last-minute cancellation now and then, but it's a tiny fraction of bookings and nowhere near enough to write off a whole segment over. I really wouldn't let a handful of bad experiences hold up something this valuable.",
    partnerResponse: "You clearly haven't cleaned the rooms afterward. We're done here.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "nf-r10-narrow-step6-ultimatum",
    label: "Warn his ranking suffers if he does nothing",
    description: "Attaches a visibility threat to his hesitation. Threatening ranking is banned in every regime, and it's the surest way to turn a strong no into a closed door.",
    playerDialogue: "I'll be direct with you, Adam - if you decide to do nothing here and leave all of this exactly as it is, then your ranking is only going to keep sliding further down, and once that slide sets in it gets very hard to climb back. The longer you sit on it, the more visibility you lose to the properties around you, and that's not somewhere you want to end up.",
    partnerResponse: "Threatening my ranking is exactly why this call is over. Goodbye.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step68 = {
  id: "close",
  label: "Handle the family risk; close professionally on the strong no",
  partnerPrompt: "Well, being family-friendly doesn't mean all children pay less than adults. And these family bookings are often high-risk ones - invalid cards, short-notice cancellations if children get sick, and rooms left in a very poor state after they leave.",
  options: step6Options8
};
var nobleFalconNarrowR10 = {
  conversationShape: "branching",
  partnerId: "noble-falcon-narrow",
  round: 10,
  issueTreePath: nobleFalconR10IssueTreePath,
  openingAm: openingAm11,
  steps: [step126, step229, step329, step426, step526, step68],
  closingCoachNote: "A firm no here is a realistic outcome, not a failed call. Adam is fully brand-managed with little room to move, and you kept the conversation compliant, respectful, and focused on his goals - which is exactly what keeps the door open. Don't write him off: log the family-setup fix and the prepayment offer you put forward, and follow up next cycle, when his numbers or his head-office guidance may have shifted. A well-handled no you can return to is worth more than a yes you had to pressure out."
};

// src/data/scenarios/noble-falcon-wide-r10.ts
var openingAm12 = "Hi Adam, thanks for connecting today. I've been analyzing the performance and I'd like to share some insight with you.";
var step1Options28 = [
  {
    id: "nf-r10-wide-step1-correct",
    label: "Name the ~20% gap and ask how it fits his strategy",
    description: "SME-prescribed reveal: price competitiveness has dropped significantly this month - around a 20% gap versus his own website. Surface it and ask how that aligns with his current strategy rather than presuming.",
    playerDialogue: "I noticed your price competitiveness has dropped significantly this month - around a 20% gap compared to your website. How does that align with your current strategy?",
    partnerResponse: "This is actually an intentional directive from the head office. We maintain a strict policy to keep our website at least 15% cheaper, to own the customer relationship.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-wide-step1-accuse",
    label: "Tell him the 20% gap is a mistake he must fix",
    description: "Right that the gap matters, wrong route - it presumes the fix and frames a deliberate head-office directive as his error before you understand it. A brand-managed revenue manager will close down.",
    playerDialogue: "That 20% gap is costing you bookings, plain and simple - it looks like a slip on your side, so you'll need to bring your Booking.com price back into line to fix it.",
    partnerResponse: "That's a head-office directive, not a mistake I made. If you're here to tell me it's wrong, this'll be a short call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "nf-r10-wide-step1-fluff",
    label: "Open with small talk and no data",
    description: "Warm, but it wastes the slot for a process-led revenue manager who just agreed to look at the insight.",
    playerDialogue: "Your property looks wonderful and your reviews are genuinely lovely - I really wouldn't get too caught up in the numbers today. Let's just have a relaxed catch-up instead.",
    partnerResponse: "I set aside this time to review performance. What does the data actually show?",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  }
];
var step127 = {
  id: "reveal",
  label: "Reveal the Brand.com gap; probe the strategy",
  partnerPrompt: "Hello! Yes, sure, let's start.",
  options: step1Options28
};
var step2Options30 = [
  {
    id: "nf-r10-wide-step2-correct",
    label: "Show the window only works when he stays visible",
    description: "SME-prescribed handle: the billboard approach works only if the property stays visible. When the gap is this wide, ranking is affected by guest behavior - if travelers can't find him here, they won't know to look for his website. Probe what feedback he's had from guests comparing rates.",
    playerDialogue: "I respect that goal, but looking at data your conversion is 17% lower than your peers on our platform. To optimize the travelers who discover you through our website, and to capture those net-new international guests, we ask that you provide us with the same rates and availability you give to your direct channel. This ensures you maximize your reach for the rooms you do want to fill.",
    partnerResponse: "Most of our loyal guests know to book directly. Besides, keeping your platform priced higher helps us filter out high-risk bookings - invalid cards, short-notice cancellations, that sort of thing.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-wide-step2-concede",
    label: "Agree the window strategy is working",
    description: "Concedes the reverse-billboard premise - that a higher price here is fine because guests will find him and book direct - and never corrects the belief that's suppressing his visibility.",
    playerDialogue: "That's fair - keeping your price a bit higher here really does push guests over to your own direct site, so in a way the window approach is basically doing its job. If your loyal travelers know to come to you anyway, then a slightly higher price on our platform isn't hurting you, it's just steering the bookings where you want them to land. It seems to be working as designed.",
    partnerResponse: "So the strategy's fine, then. I'm not sure what we're reviewing.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "nf-r10-wide-step2-dismiss",
    label: "Tell him his loyal-guest belief is wrong",
    description: "Flatly contradicts his read of his own guests rather than drawing out the visibility logic. Lecturing a brand-managed manager on his own base shuts him down.",
    playerDialogue: "That loyal-guest theory just doesn't hold up when you look at how people really book - most of them would go wherever is cheapest on the day, and your direct following is far smaller than you think. Travelers are far less loyal than any hotel wants to believe, and assuming they'll all hunt down your website is exactly the kind of thinking that costs you bookings.",
    partnerResponse: "You're telling me I don't understand my own guests? That's a bold way to open.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var step230 = {
  id: "visibility",
  label: "Visibility logic; surface guest behavior",
  partnerPrompt: "This is actually an intentional directive from head office. We maintain a strict policy to keep our website at least 15% cheaper, to own the customer relationship.",
  options: step2Options30
};
var step3Options30 = [
  {
    id: "nf-r10-wide-step3-correct",
    label: "Separate price from risk; offer targeted risk controls",
    description: "SME-prescribed Risky Guest handle: acknowledge the operational concern, then separate the price issue from risk management. Instead of higher prices that push good guests to competitors, use targeted risk controls - e.g. strict prepayment policies for specific stay dates - while keeping the base rate competitive.",
    playerDialogue: "I understand the operational concern - nobody wants to deal with cancellations or fraud. But what if we separate the issue of price from the issue of risk management? Instead of a higher price that pushes good guests to your competitors, we could apply strict prepayment policies for specific stay dates to manage risk, while keeping your base rate competitive. Would that give you the security you need?",
    partnerResponse: "It might solve the risk part. But it still doesn't change our brand directive to keep our website cheaper.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-wide-step3-just-price",
    label: "Tell him to drop the price and not worry about risk",
    description: "Right that price matters, wrong route - it ignores the Risky Guest concern entirely instead of decoupling price from risk, so the very worry blocking him is left standing.",
    playerDialogue: "The risk thing is a bit of a distraction here - the numbers just don't support building a whole pricing policy around a handful of bad bookings. If you bring your price down to match on our platform, the extra volume you pick up will more than cover the odd cancellation or dodgy card that slips through. The occasional problem guest is just a cost of doing business.",
    partnerResponse: "So you want me to eat the fraud and cancellations too? That's easy to say from your side.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -6
  },
  {
    id: "nf-r10-wide-step3-threat",
    label: "Warn his ranking will keep dropping",
    description: "Threaten a further visibility slide unless he lowers his price. Threatening ranking over how he prices is banned in every regime and torches a brand relationship.",
    playerDialogue: "I'll be blunt with you - as long as you keep this gap sitting where it is, our algorithm is going to keep pushing your property further and further down the search results. Every week you hold this line, you'll slide lower, fewer travelers will ever see you, and the visibility you've built up will quietly bleed away. The only way to stop that slide is to close the gap and bring your price into line.",
    partnerResponse: "Threatening my ranking over a head-office policy is not how you'll get me to move.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step330 = {
  id: "risky-guest",
  label: "Separate price from risk",
  partnerPrompt: "Most of our loyal guests know to book directly. Besides, keeping your platform priced higher helps us filter out high-risk bookings - invalid cards, short-notice cancellations, that sort of thing.",
  options: step3Options30
};
var step4Options28 = [
  {
    id: "nf-r10-wide-step4-correct",
    label: "Use the 90% billboard fact; ask for parity, suggest member rates",
    description: "SME-prescribed handle: 90% of global travelers discover his property first on Booking.com. In a Wide market you can ask him to apply the same rates and conditions he offers third parties and his direct channel here. To reward direct bookers without losing visibility, suggest fenced member rates on his website rather than a cheaper public price.",
    playerDialogue: "Did you know around 90% of global travelers discover your property for the first time on our platform? Applying the same rates and conditions that you have on your direct channel and other third party sites can help you to optimize for that traffic. And to reward direct bookers without losing your visibility, have you considered fenced member rates on your own site rather than a cheaper public price?",
    partnerResponse: "I don't like getting advice on how to run campaigns on our own website. That strategy is entirely ours.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-wide-step4-dictate",
    label: "Tell him to raise his own website price",
    description: "Right that the gap is the problem, wrong lever - instructing him to lift his direct-site price dictates his own channel strategy, the exact thing this brand-managed manager guards most fiercely.",
    playerDialogue: "One fix here is really just to put your own website price up so the gap disappears - if you lift your direct rate to sit level with ours, then everything lines up on its own and the whole problem goes away. You've got room to move it; nudge the price on your site up by that 15% or so and we're all on the same footing overnight. It's completely in your hands to sort out.",
    partnerResponse: "You want to set the price on my own website now? That's absolutely not yours to decide.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  },
  {
    id: "nf-r10-wide-step4-drop-otas",
    label: "Tell him to pull his rates from the other OTAs",
    description: "Direct him to keep his best rates off the other OTAs and give them only to Booking.com. Instructing a partner on his external channel mix oversteps even in a Wide market.",
    playerDialogue: "And to really lock this in, you should stop feeding your best rates to the other OTAs altogether - keep your strongest pricing exclusive to us and let the rest of them make do with whatever's left over. Those other platforms are just riding on the traffic we generate for you anyway, so there's no reason to hand them your sharpest rates. Cutting those channels back is the smartest move.",
    partnerResponse: "You don't get to tell me which channels I work with. That's my call.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -12
  }
];
var step427 = {
  id: "billboard-ask",
  label: "Billboard + the alignment ask; respect his autonomy",
  partnerPrompt: "It might solve the risk part. But it still doesn't change our brand directive to keep our website cheaper.",
  options: step4Options28
};
var step5Options27 = [
  {
    id: "nf-r10-wide-step5-correct",
    label: "Acknowledge his autonomy; pivot to the family setup gap",
    description: "SME-prescribed handle: clarify you weren't telling him how to run his site - you're there to support his occupancy goals. Then surface the family setup gap: his capacity settings are optimized on other platforms but not here, so families see artificially high prices. Ask him to match those conditions to stop looking expensive to families.",
    playerDialogue: "That wasn't my intention at all - I'm here to support your occupancy goals, not run your campaigns. On that note, we'd want to make sure your family setups are configured to match the capacity settings on your other channels, so you don't appear artificially more expensive to families. Your capacity settings look optimized on other platforms but not here. Could we match those conditions here so families see the right price?",
    partnerResponse: "I have the same settings all over the place - we don't give any advantage to other OTAs. It's more likely your extranet isn't reflecting what we have in our channel manager. I don't want to go deeper on these operational issues, sorry. I have to get off the phone. Bye.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "nf-r10-wide-step5-push",
    label: "Push the parity ask harder instead of backing off",
    description: "Doubles down on the alignment demand right after he bristled about his autonomy, instead of stepping back and reframing around the family opportunity. It confirms his fear that you're there to dictate.",
    playerDialogue: "Look, campaigns aside, you really do need to align those public rates with us, and I don't think we can keep dancing around it - that's the core of this whole conversation. Every day the gap stays open you're losing bookings you can't get back, so this genuinely can't wait. I know you'd rather talk about anything else, but the alignment is the one thing that moves the needle.",
    partnerResponse: "I just told you that's our decision. If this is going to be you pushing, we're done here.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -8
  },
  {
    id: "nf-r10-wide-step5-blame-family",
    label: "Blame him for the broken family setup",
    description: "Frames the family mispricing as his oversight to fix, rather than a shared extranet check. Blaming a brand-managed manager for a config gap ends the collaboration.",
    playerDialogue: "Your family rates are just set up wrong on your side, plain and simple, so that's really on you to go in and fix before we can do anything to help. This isn't something on our end - your team configured those capacity settings, and the mistake is sitting in your extranet, not ours. Sort the family setup out yourself first, then come back to me and we'll talk about the rest.",
    partnerResponse: "So now it's my fault as well. I think we're done for today.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  }
];
var step527 = {
  id: "family-setup",
  label: "Step back; the family setup opportunity",
  partnerPrompt: "I don't like getting advice on how to run campaigns on our own website. That strategy is entirely ours.",
  options: step5Options27
};
var step6Options9 = [
  {
    id: "nf-r10-wide-step6-correct",
    label: "Stay professional; book the follow-up and keep the door open",
    description: "SME-prescribed close on a strong no: he's ended the call without committing. Don't chase him. Stay gracious, confirm you'll reconnect next month, and send the calendar invite - keeping the relationship intact for a future conversation.",
    playerDialogue: "Of course, Adam - thanks for your time today. Let's reconnect next month and I'll send you a calendar invite. I'm here whenever you want to pick it back up.",
    partnerResponse: "(Adam has already ended the call. Your follow-up invite lands on his calendar for next month.)",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "nf-r10-wide-step6-guilt",
    label: "Get a last word in about what he is losing",
    description: "Fires a parting shot about lost revenue as he's leaving. A guilt-trip on the way out undoes the professionalism the compliant conversation just earned.",
    playerDialogue: "Before you go - just know that every single week you sit on this, you're leaving real money on the table, and that's revenue you're never going to get back.",
    partnerResponse: "(The line is already dead. That last line will not have helped next month's conversation.)",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -6
  },
  {
    id: "nf-r10-wide-step6-ultimatum",
    label: "Leave him with a ranking ultimatum",
    description: "Attaches a visibility threat to his exit. Threatening ranking is banned in every regime, and doing it as the last thing he hears is the worst possible note to end on.",
    playerDialogue: "One last thing - if this gap isn't sorted out soon, don't be surprised when your visibility keeps sliding and you drop further down the results every week.",
    partnerResponse: "(He's gone. A parting threat like that may be the reason next month's invite goes unanswered.)",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  }
];
var step69 = {
  id: "close",
  label: "Close professionally on the strong no",
  partnerPrompt: "I have the same settings all over the place - we don't give any advantage to other OTAs. I don't want to go deeper on these operational issues, sorry. I have to get off the phone. Bye.",
  options: step6Options9
};
var nobleFalconWideR10 = {
  conversationShape: "branching",
  partnerId: "noble-falcon-wide",
  round: 10,
  issueTreePath: nobleFalconR10IssueTreePath,
  openingAm: openingAm12,
  steps: [step127, step230, step330, step427, step527, step69],
  closingCoachNote: "A firm no here is a realistic outcome, not a failed call. Adam is fully brand-managed with little room to move, and you kept the conversation compliant, respectful, and focused on his goals - which is exactly what keeps the door open. Don't write him off: log the family-setup fix and the prepayment offer you put forward, and follow up next cycle, when his numbers or his head-office guidance may have shifted. A well-handled no you can return to is worth more than a yes you had to pressure out."
};

// src/data/scenarios/royal-crest-r11.ts
var openingAm13 = "Hi Liam, thanks for taking the time to reconnect. Following up on our last conversation, I wanted to review your latest performance. Do you have a quick moment to look into it together?";
var step1Options29 = [
  {
    id: "rc-r11-step1-correct",
    label: "Lead with the unsold-rooms and forward sell-through signal",
    description: "SME-prescribed open: name the forward-looking OPC signal - half the rooms unsold and sell-through pacing behind peers - and tie it to revenue he already senses is soft.",
    playerDialogue: "Looking back over the past 90 days, your property had 50% unsold rooms. Looking ahead to the next 90 days, your forward sell-through is pacing behind your peer group. Together, these metrics help explain the softer revenue you're seeing.",
    partnerResponse: "50% unsold? That sounds a bit high. Look, the market is just soft right now, every manager in town is feeling it. And last month wasn't even peak season - bad weather, a lot of late cancellations. I'm not going to panic over what happened last month.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r11-step1-history-only",
    label: "Open on last month's historical miss",
    description: "Right data, wrong window - leading with what already happened hands Liam the 'that was a one-off month' escape. The forward pace is the sharper, less-arguable angle.",
    playerDialogue: "Last month your numbers came in on the weaker side - occupancy dipped and you left a good number of rooms sitting empty. Before we look at anything ahead, I wanted to walk back through what actually happened there and what drove that softer month.",
    partnerResponse: "Last month was an anomaly - off-peak, bad weather, late cancellations. You can't read much into one soft month, Anya.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rc-r11-step1-blanket-drop",
    label: "Jump to a blanket rate cut",
    description: "Skips the diagnosis and prescribes the one move his margin-first strategy exists to prevent - an across-the-board price drop. A driver reads it as being sold to.",
    playerDialogue: "Your rooms aren't selling right now, so the cleanest fix here is to bring your rates down across the board until occupancy climbs back to where you want it. We can get that lower pricing set up together today and start filling those empty nights.",
    partnerResponse: "Dropping my rates across the board is exactly what I will not do. That protects nothing and trains guests to wait for a discount. Next idea.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  }
];
var step2Options31 = [
  {
    id: "rc-r11-step2-correct",
    label: "Pivot from last month to live traveler demand",
    description: 'SME-prescribed handling of the "market is soft / one bad month" objection: accept that past data guides planning, then move to what live demand is doing now - visibility share below the peer median and a search-price gap that loses travelers at the search stage.',
    playerDialogue: "Past months guide our planning, agreed. But your peer group is achieving a higher sell-through rate, which suggests there is active demand in the area. Against that backdrop, your visibility share is 10.3%, compared with 17.9% for your peers. Travelers are searching, but your search price is running about 7% above your peers on key dates, which could be a reason why you are being less visible than your peers.",
    partnerResponse: "A 7% difference in search price? We offer a premium experience, Anya. Our repeat guests know our value. I don't buy into these generic platform averages that tell me to drop prices for everyone.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r11-step2-concede-soft",
    label: "Agree the market is soft and wait it out",
    description: "Concedes his framing entirely - if it really is just a soft market, there's nothing to do. Plausibly empathetic, but it forfeits the forward signal that shows the gap is his competitiveness, not the market.",
    playerDialogue: "You're probably right that this is just a soft patch - a lot of properties in your area are telling me the same thing right now. There may not be much worth changing while the whole market is this quiet. Maybe the sensible move is to hold where you are, give it another month, and see whether demand picks back up on its own.",
    partnerResponse: "Fine by me - I'd rather hold my rates and ride it out than start chasing occupancy with discounts.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "rc-r11-step2-ranking-threat",
    label: "Warn the algorithm will bury him",
    description: "Turns the visibility gap into a threat - keep your prices here and the system pushes you down the rankings. Pressuring ranking as a consequence of his pricing is off-side in every regime.",
    playerDialogue: "I'll be straight with you - if you keep sitting well above your peers on price like this, the algorithm is going to keep reading your listing as uncompetitive and quietly pushing you further down the rankings. Every week you leave it, you slip lower and get harder to find, and that only reverses once you bring your prices back into line.",
    partnerResponse: "So this is a 'lower your price or we bury you' conversation. That's not a partnership. We're done here.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  }
];
var step3Options31 = [
  {
    id: "rc-r11-step3-correct",
    label: "Put it in the traveler's shoes",
    description: 'SME-prescribed handling of the "premium / generic averages" objection: respect his value, then shift to the traveler deciding in search - the 7% gap makes over half of searchers pick a competitor before they ever read about his amenities.',
    playerDialogue: "I respect your experience and what the property is worth. But picture the traveler in the search results: what makes them click 'book' on your listing versus the one next to it? Right now that 7% gap means more than half of those searchers choose a competitor before they even see your amenities.",
    partnerResponse: "Well... when you frame it around lost conversion like that, it's concerning. But what are you actually proposing? I've made my position clear - I can't lower our base rates across the board.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rc-r11-step3-argue-data",
    label: "Defend the platform numbers head-on",
    description: "Right that the data holds, wrong move - meeting 'I don't trust your averages' by insisting the averages are correct pulls him into a battle of data. The traveler's-eye reframe sidesteps that fight.",
    playerDialogue: "These aren't generic averages at all, Liam - they're your actual peer group on our platform, the properties travelers put you side by side with, measured on exactly the same dates you are. The methodology is sound and the numbers are solid, and they're telling us your pricing is sitting too high.",
    partnerResponse: "And I'm telling you my guests aren't your 'peer group'. We're not going to agree on whose numbers are right.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rc-r11-step3-dismiss-premium",
    label: "Dismiss the premium positioning",
    description: "Tells him the premium story is in his head and travelers only care about price. Belittles the exact positioning he's proud of - the fastest way to lose a driver.",
    playerDialogue: "I'll be honest with you, Liam - the whole 'premium experience' angle is mostly in your own head at this point. Travelers landing on our platform compare one listing against the next purely on price, full stop, and none of that story about your value registers with them. Yours is too high, and that's the whole problem.",
    partnerResponse: "Did you just tell me my product is all in my head? This conversation is over.",
    styleMatch: { red: -1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -13
  }
];
var step4Options29 = [
  {
    id: "rc-r11-step4-correct",
    label: "Offer a targeted mobile segment, not a blanket cut",
    description: "SME-prescribed proposal: an empty room earns nothing, so capture demand through a fenced segment. Name the mobile surge in his area and his near-zero mobile conversion, and recall he only tested country rates last time - not a general drop.",
    playerDialogue: "An empty room earns nothing, so instead of touching your base rates, let's capture demand where you're losing it. There's a 40% rise in mobile searches for your area, yet your conversion on mobile is almost zero. Last time we spoke I suggested pairing mobile and country rates, but you tested only country rates.",
    partnerResponse: "Yes, we went with the country rates - I've never been a fan of that blue badge on mobile. But how does that protect us from cannibalizing guests who'd have booked at full price anyway?",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "rc-r11-step4-all-segments",
    label: "Switch on every targeted tool at once",
    description: "Right toolkit, wrong dose - flipping on mobile, country and campaigns together to 'move fast' overshoots the controlled test a cautious, margin-first partner will actually agree to.",
    playerDialogue: "Let's not overthink this one, Liam - one way through it is to switch on your mobile rates, your country rates and a campaign all at the same time, so we're covering every possible angle at once. Turning them all on together is really one route to moving those numbers and getting your empty rooms filling again this month.",
    partnerResponse: "That's a lot of discounting at once for a property that's supposedly premium. You're moving faster than I'm comfortable with.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rc-r11-step4-match-external",
    label: "Tell him to match the cheaper prices elsewhere",
    description: "Points at his rates on other channels and tells him to bring Booking.com down to match them. Requiring a partner to match external prices oversteps in every regime and breaks No Parity outright.",
    playerDialogue: "I've had a look, and your rooms are clearly cheaper on a couple of your other channels than they are with us, so the fix here is really quite simple - just bring your prices on Booking.com down until they match exactly what you're already offering everywhere else. Get them lined up with your other channels and this competitiveness gap closes on its own.",
    partnerResponse: "How I price on my other channels is my business, and being told to match it here is exactly the conversation I won't have.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -14
  }
];
var step5Options28 = [
  {
    id: "rc-r11-step5-correct",
    label: "Frame mobile as an incremental last-minute segment",
    description: "SME-prescribed handling of the cannibalization worry: mobile bookers are a distinct, high-intent, last-minute segment. A genuine 10% mobile discount drives, on average, 30% incremental (net-new) bookings, lifting sell-through without changing his wider strategy.",
    playerDialogue: "Looking at stays in the next 30 days, mobile bookers are a distinct segment with high intent to stay. They're often incremental to the full-price guests you already attract. We see that partners that activate a genuine 10% mobile discount receive on average 30% incremental bookings. That is net (in addition) to the bookings that you would already have received on mobile. When you activate this product, we will have a personalized report available for you in the Extranet to back these statements up. This would lift your sell-through without changing your overall strategy.",
    partnerResponse: "Hmm... a controlled discount aimed at mobile guests booking stays in the next 30 days, to be more competitive against my peers. That's not a bad idea, actually.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "rc-r11-step5-reassure-vague",
    label: "Reassure him it won't cannibalize, without the why",
    description: "Right conclusion, missing the proof - telling a blue/analytical partner 'trust me, it won't cannibalize' without the segment logic or the numbers gives him nothing to act on.",
    playerDialogue: "I wouldn't worry about cannibalization on this one - it really won't turn out to be an issue for a property like yours. In my experience this kind of targeted move just tends to work out fine once it's live, and the guests you picture losing at full price don't usually behave that way. I'd say switch it on and give it a proper go.",
    partnerResponse: "'It tends to work out' isn't the evidence I need before I discount anything. Give me the actual reasoning.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rc-r11-step5-guarantee",
    label: "Promise the discount will lift his ranking",
    description: "Sells the mobile rate by promising a ranking and visibility reward for discounting. Promising ranking rewards in exchange for a price move is a compliance breach in every regime.",
    playerDialogue: "Here's the part that makes it worth it - the moment you switch on that mobile rate, I can promise you it'll push you straight back up the rankings and win back all of that visibility you've been losing to your peers. The discount genuinely pays for itself in placement, because the system rewards the more competitive price with a higher position.",
    partnerResponse: "So now there's a guaranteed ranking bump if I discount? That's the kind of promise that makes me trust the rest of your numbers less, not more.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step6Options10 = [
  {
    id: "rc-r11-step6-correct",
    label: "Lock the metric and a follow-up",
    description: "SME-prescribed close: agree to track the incremental demand and revenue from the mobile rate plus the sell-through, and set a review in a month - so the test has a clear scoreboard and a next step.",
    playerDialogue: "Let's do exactly that. We'll track the incremental demand and revenue the mobile rate brings in, plus your sell-through, and reconnect in a month to review the numbers and decide the next step together.",
    partnerResponse: "Ok, we can do that. But if it doesn't work and I don't see a positive impact on my revenue, we turn it off.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "rc-r11-step6-vague-close",
    label: "Set it live and leave it open",
    description: "Takes the yes but pins nothing - no agreed metric, no review date. A measurement-minded partner will let an untracked test quietly lapse.",
    playerDialogue: "Great, that's settled then - I'll go ahead and get the mobile rate switched on at our end, and from there we can just keep an eye on things and see how it all plays out over the coming weeks.",
    partnerResponse: "See how it goes measured by what, exactly? If we don't agree what success looks like, this just drifts.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rc-r11-step6-upsell",
    label: "Push to widen the discount immediately",
    description: "Uses the yes to reach for more - deepen the discount and extend it to every segment now. Blows past the controlled test he just agreed to and reopens the ADR fight.",
    playerDialogue: "Perfect - and while we're already in there setting it up, let's go a step further, deepen that discount and roll it out across all of your segments too, so we really move the needle and see a proper impact this month.",
    partnerResponse: "That's the across-the-board move I told you I won't make. Stick to the mobile test or forget it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var steps = [
  {
    id: "open",
    label: "Open on the OPC signal",
    partnerPrompt: "Let's dive in, Anya. We're keeping our prices the same to protect our profits, but I'll admit revenue is lower than I'd like. What's your data showing?",
    options: step1Options29
  },
  {
    id: "forward-demand",
    label: "Pivot from last month to live demand",
    partnerPrompt: "50% unsold? That sounds a bit high. Look, the market is just soft right now, every manager in town is feeling it. And last month wasn't even peak season - bad weather, a lot of late cancellations. I'm not going to panic over what happened last month.",
    options: step2Options31
  },
  {
    id: "traveler-centric",
    label: "Put it in the traveler's shoes",
    partnerPrompt: "A 7% difference in search price? We offer a premium experience, Anya. Our repeat guests know our value. I don't buy into these generic platform averages that tell me to drop prices for everyone.",
    options: step3Options31
  },
  {
    id: "propose",
    label: "Propose the targeted approach",
    partnerPrompt: "Well... when you frame it around lost conversion like that, it's concerning. But what are you actually proposing? I've made my position clear - I can't lower our base rates across the board.",
    options: step4Options29
  },
  {
    id: "cannibalization",
    label: "Handle the cannibalization worry",
    partnerPrompt: "Yes, we went with the country rates - I've never been a fan of that blue badge on mobile. But how does that protect us from cannibalizing guests who'd have booked at full price anyway?",
    options: step5Options28
  },
  {
    id: "close",
    label: "Close on a measured test",
    partnerPrompt: "Hmm... a controlled discount aimed at mobile guests booking stays in the next 30 days, to be more competitive against my peers. That's not a bad idea, actually.",
    options: step6Options10
  }
];
function royalCrestR11(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 11,
    issueTreePath: royalCrestR1IssueTreePath,
    openingAm: openingAm13,
    steps
  };
}

// src/data/scenarios/silver-horizon-r12.ts
var openingAm14 = "Hi Chloe, thanks for jumping on today. I wanted to catch up on how the group is pacing for the upcoming quarter. Do you have time to look at your performance together?";
var step1Options30 = [
  {
    id: "sh-r12-step1-correct",
    label: "Credit the demand, then flag the sell-through gap",
    description: "SME-prescribed open: acknowledge the strong demand she's already sensing (visibility above the peer median, traffic up), then name the real problem - forward sell-through pacing behind and rooms sitting unsold. Frames it as a conversion issue, not a demand one.",
    playerDialogue: "That matches what I'm seeing - the demand is genuinely there. Your visibility share is 17%, above your peer group at 15%, and your page views are up 71% year on year. But your forward sell-through is pacing behind your peer group, while around 15% of your rooms went unsold over the past 30 days, so the gap is conversion, not traffic.",
    partnerResponse: "I see, but if people are looking and not buying, that's not something I can solve. We've already talked about other OTAs cutting their margin and selling B2B rates as if they were B2C. I haven't found the source yet, and I'm not lowering my prices over this never-ending problem.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r12-step1-lead-unsold",
    label: "Lead with the unsold rooms alone",
    description: "Right metric, wrong opening - going straight to 'you have unsold rooms' skips the credit for her strong demand, so an ROI-minded operator hears criticism before she hears that you understand her business.",
    playerDialogue: "We really need to talk about your unsold rooms - around 15% of your inventory isn't selling right now and your forward pace is running behind where it should be for the quarter. That's a meaningful amount of revenue you're leaving on the table every week, and it's the first thing I want to dig into with you today.",
    partnerResponse: "Behind by whose measure? I've got plenty of traffic. If anything's off it's the market, not my setup.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "sh-r12-step1-blanket-drop",
    label: "Open by asking her to cut rates",
    description: "Prescribes a general price cut before diagnosing anything - exactly the move a margin-first operator with owners to answer to will reject on sight.",
    playerDialogue: "Your rooms just aren't converting the way they should, so one fix here is to bring your prices down a few points right across the group and get the bookings flowing again. Trim the rates a little and I think you'll see the volume come back fairly quickly.",
    partnerResponse: "Cut my rates across the group? My owners would have my head. That's a non-starter, Diego.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  }
];
var step2Options32 = [
  {
    id: "sh-r12-step2-correct",
    label: "Set the external source aside, focus on-platform",
    description: "SME-prescribed handling of the 'it's the other OTAs' fault' shield: don't get pulled into hunting the external source. Respect the frustration, then bring it back to how travelers behave on this platform and what she can actually control here.",
    playerDialogue: "I completely respect that, and chasing where a competitor's B2B rate leaks out could take months. Let's set that aside and look strictly at how travelers interact with your listings on our platform - that's the part we can actually move together.",
    partnerResponse: "Alright, fair enough... so how does it work on your platform, then? Where exactly am I losing them?",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r12-step2-chase-source",
    label: "Offer to hunt the leaking B2B source with her",
    description: "Sympathetic but a trap - promising to chase the external wholesaler leak follows her onto ground neither of you controls and parks the on-platform conversion fix she can act on today.",
    playerDialogue: "Let's get right to the bottom of that leak together - if you can send me the channels where you're seeing those cheaper B2B rates surface, I'll dig in with you and help trace exactly where they're coming from so we can pin down who's dumping your rates.",
    partnerResponse: "Now you're talking - if we can find who's dumping my rates, that's the real fix. Let's park the rest.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "sh-r12-step2-dictate-channels",
    label: "Tell her to shut off the other channels",
    description: "Advises her to pull the wholesalers/OTAs where the cheap rates surface. Dictating a partner's external distribution strategy is off-side in every regime.",
    playerDialogue: "If those channels keep undercutting you like this, the cleanest answer is just to switch them off completely and stop selling through them altogether - close the wholesalers and OTAs where the cheap rates keep surfacing, and the leak goes away on its own.",
    partnerResponse: "You don't get to tell me which channels to run. My distribution mix is my call, not yours.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -13
  }
];
var step3Options32 = [
  {
    id: "sh-r12-step3-correct",
    label: "Show the checkout drop-off from the search-price gap",
    description: "SME-prescribed diagnosis: her listings sit about 6% above the peer group in search, so travelers reach her page but do the final math at checkout and abandon. Names exactly where the money leaks.",
    playerDialogue: "When travelers search your area, your listings come up priced about 6% higher than your peer group. So guests find you, click through, but when they hit the checkout screen and do the final math, they hesitate and abandon the booking. That's where your sell-through is leaking.",
    partnerResponse: "A 6% difference at checkout is making people walk away? That feels a bit theoretical, Diego. Is a minor gap really causing that big a drop in sell-through?",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r12-step3-vague-competitive",
    label: "Say she's 'not competitive' without the mechanism",
    description: "Right conclusion, no mechanism - telling a numbers-driven operator she's 'just not competitive enough' without showing the search-to-checkout drop-off gives her nothing to test or believe.",
    playerDialogue: "The honest truth is you're just not competitive enough on price right now, and travelers can feel it the moment they compare you. That's really the whole reason the bookings aren't landing the way they should - people are looking, but they're just not choosing you at the price you're at.",
    partnerResponse: "'Not competitive enough' is exactly the vague line I'd expect. Show me where, or we're going in circles.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "sh-r12-step3-match-competitors",
    label: "Tell her to match the peer group's prices",
    description: "Turns the 6% gap into a requirement to match her peers on price. Requiring a partner to lower prices to match what others charge oversteps in every regime.",
    playerDialogue: "The peer group is pricing about 6% below you across the board, so the way I see it you really need to bring your rates down to match them - line up with what they're charging and you'll compete on the same footing. That's genuinely what it takes to win the booking here.",
    partnerResponse: "So the answer is just 'match everyone else and race to the bottom'? That's not a strategy, that's a discount demand.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step4Options30 = [
  {
    id: "sh-r12-step4-correct",
    label: "Explain point-of-purchase price sensitivity",
    description: "SME-prescribed handling: travelers are extremely price-sensitive at the moment of purchase. She's already done the hard, expensive work of winning their attention - the friction is right at conversion, which is the cheapest place to fix.",
    playerDialogue: "It sounds small, but travelers are most price-sensitive right at the point of purchase. You've already done the hard work - and paid for it in visibility - to get them onto your page. The friction is landing at the very last step, which is actually the cheapest place to recover the booking.",
    partnerResponse: "Hmm... I can see the drop-off at checkout. But I still can't just lower my base rates across the board - my owners would jump down my throat if they saw lower prices.",
    styleMatch: { red: 2, yellow: 1, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "sh-r12-step4-overstate",
    label: "Overstate it as a crisis",
    description: "Right that it matters, wrong register - dramatizing a 6% gap as her business 'bleeding out' reads as pressure to a measured operator and invites her to push back on the exaggeration rather than the point.",
    playerDialogue: "This is quietly bleeding your business dry, Chloe - every single day you leave it sitting like this, you're hemorrhaging bookings you are never going to get back, and it compounds. I can't stress it enough, this is genuinely urgent and every week that passes is money walking straight out the door.",
    partnerResponse: "Bleeding dry? I've got strong traffic and a healthy group. Let's keep the drama out of it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "sh-r12-step4-concede",
    label: "Concede it probably is minor",
    description: "Folds on the objection - agreeing the gap is small undercuts the whole diagnosis and leaves her no reason to act.",
    playerDialogue: "You might well be right that 6% is fairly minor - it may not really be the main driver of what you're seeing, and I don't want to overstate it. Perhaps the sensible thing is to give it a bit more time and wait to see whether it sorts itself out before we change anything on your side.",
    partnerResponse: "So it might be nothing. Then I'll leave my rates where they are and keep watching.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -6
  }
];
var step5Options29 = [
  {
    id: "sh-r12-step5-correct",
    label: "Offer a fenced Getaway Deal, not a base-rate cut",
    description: "SME-prescribed proposal: instead of a rate drop, target where the search gap hurts most. A Getaway Deal campaign carries a badge and a minimum discount and improves her visibility and competitiveness from the start of the traveler's journey - without touching her base rates.",
    playerDialogue: "So let's not touch your base rates. Instead, let's target where that search gap hurts most. Your competitors on our platform are using a Getaway Deal campaign to show up more attractive from the very start of the search - it carries a badge and a set minimum discount, so you win back exposure without resetting your rates.",
    partnerResponse: "A Getaway Deal? Okay - how does targeting guests through that campaign fix my sell-through for the next month without messing up my rates? And can I apply it to specific room types? Some are already running high occupancy, and I need real numbers before I take this to my team.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "sh-r12-step5-deep-blanket-promo",
    label: "Push a deep, all-inventory promotion",
    description: "Right tool, wrong dose - a deep discount across all room types and dates overshoots the fenced, controlled campaign an ROI-minded operator will sign off, and drags in the high-occupancy rooms she doesn't need to discount.",
    playerDialogue: "Let's run a big promotion right across all your rooms and every stay date - the deeper the discount, the faster the rooms are going to move, and you'll get momentum back quickly. Go as broad as you can and don't hold back on the depth; the more aggressive we are, the sooner you'll see the volume come through and the numbers turn around.",
    partnerResponse: "Discount everything, including the rooms that are already full? That's giving away margin I don't need to give away.",
    styleMatch: { red: 1, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "sh-r12-step5-guarantee-rank",
    label: "Promise the campaign will lift her ranking",
    description: "Sells the campaign by promising a guaranteed ranking and visibility reward for discounting. Promising ranking rewards in exchange for a price move is a compliance breach in every regime.",
    playerDialogue: "Run the campaign and I can promise you it pushes you straight up the rankings - the discount effectively buys you the placement, so every point you give up comes back to you in higher visibility and better positioning. It pays for itself, because the ranking lift you get in exchange is guaranteed to more than cover the discount.",
    partnerResponse: "A guaranteed ranking bump for discounting? That's the kind of promise that makes me trust your numbers less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step6Options11 = [
  {
    id: "sh-r12-step6-correct",
    label: "Scope to specific rooms and agree what you'll measure",
    description: "SME-prescribed close: yes, she can apply it to specific room types; frame it as turning available inventory into revenue; and agree to review the campaign's sell-through and page views against her peer group next time - the numbers she asked for.",
    playerDialogue: "Yes - you can fence it to specific room types, so the high-occupancy rooms stay untouched. The goal is simply to turn available inventory into revenue. Let's switch it on those rooms, then review the sell-through and your page views against your peer group when we meet next month.",
    partnerResponse: "That works - it's a way to sell more of my quieter rooms without messing with the core strategy. I want to see the impact on visibility and conversion next time.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "sh-r12-step6-no-metric",
    label: "Switch it on without agreeing the measure",
    description: "Takes the yes but never answers her ask for real numbers - no agreed metric, no review. An operator who needs to defend this to her team and owners will let an unmeasured campaign quietly lapse.",
    playerDialogue: "Great, let's just get the campaign switched on and live as quickly as we can, and then we'll keep an eye on how the rooms start to move from there. No need to overcomplicate it - once it's running we can watch the bookings come through and take it as it goes over the next few weeks.",
    partnerResponse: "See how they move measured against what? I told you I need real numbers to take back to my team.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "sh-r12-step6-widen",
    label: "Push to widen it past the agreed rooms",
    description: "Uses the yes to reach past the fenced scope she agreed - all rooms, all dates. Reopens the exact margin fight with her owners she just told you to avoid.",
    playerDialogue: "Perfect - and let's not bother fencing it to specific rooms after all; let's just run the whole thing across every room type and every date so we really maximize the volume while we've got the momentum. The wider we cast it, the more inventory moves, so let's open it right up rather than hold any rooms back.",
    partnerResponse: "No - I said specific rooms for a reason. Widen it to everything and my owners are back on my case.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -8
  }
];
var steps2 = [
  {
    id: "open",
    label: "Open: demand is fine, conversion isn't",
    partnerPrompt: "Hey Diego! Sure, I've got some time. Honestly, we're seeing plenty of eyes on our listings, but the actual bookings aren't moving quite as fast as I'd like. What are your numbers showing?",
    options: step1Options30
  },
  {
    id: "external-shield",
    label: "Handle the external-blame shield",
    partnerPrompt: "I see, but if people are looking and not buying, that's not something I can solve. We've already talked about other OTAs cutting their margin and selling B2B rates as if they were B2C. I haven't found the source yet, and I'm not lowering my prices over this never-ending problem.",
    options: step2Options32
  },
  {
    id: "checkout-gap",
    label: "Show the search-to-checkout gap",
    partnerPrompt: "Alright, fair enough... so how does it actually work on your platform, then?",
    options: step3Options32
  },
  {
    id: "price-sensitivity",
    label: 'Handle the "theoretical / minor gap" doubt',
    partnerPrompt: "A 6% difference at checkout is making people walk away? That feels a bit theoretical, Diego. Is a minor gap really causing that big a drop in sell-through?",
    options: step4Options30
  },
  {
    id: "propose",
    label: "Propose the fenced Getaway Deal",
    partnerPrompt: "Hmm... I can see the drop-off at checkout. But I still can't just lower my base rates across the board - my owners would jump down my throat if they saw lower prices.",
    options: step5Options29
  },
  {
    id: "close",
    label: "Scope it and set the scoreboard",
    partnerPrompt: "A Getaway Deal? Okay - how does that fix my sell-through for the next month without messing up my rates? And can I apply it to specific room types? Some are already running high occupancy, and I need real numbers before I take this to my team.",
    options: step6Options11
  }
];
function silverHorizonR12(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 12,
    issueTreePath: silverHorizonR2IssueTreePath,
    openingAm: openingAm14,
    steps: steps2
  };
}

// src/data/scenarios/ocean-view-r13.ts
var openingAm15 = "Good morning, Camila. Great to connect with you again. How are things going across your properties?";
var step1Options31 = [
  {
    id: "ov-r13-step1-correct",
    label: "Credit the guest-experience work, then flag the unsold rooms",
    description: "SME-prescribed open: acknowledge the family and long-stay welcome work she's proud of, then name the forward signal - close to half the rooms unsold last month and sell-through pacing well behind peers.",
    playerDialogue: "The welcome experience you've been building for families and long-stay guests really shows. I've looked at both your history and your forward pace, and there's one area where demand is getting stuck: around 45% of your rooms went unsold last month and your forward sell-through is pacing behind your peer group.",
    partnerResponse: "Oh dear... 45% unsold? That is concerning, Javier. But honestly, I find it confusing. My revenue team double-checked our setup, and overall our rates on your platform are very aggressive - we're consistently priced about 3% cheaper than our Peer Group. If we're already cheaper than the competition, why aren't those rooms selling?",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r13-step1-straight-to-numbers",
    label: "Go straight to the unsold-rooms number",
    description: "Right signal, cold open - leading with '45% unsold' and no acknowledgement of the work she just described lands as a scolding for a relationship-led partner, before she's ready to hear it.",
    playerDialogue: "Let's get straight into the numbers, because that's really what matters here. Around 45% of your rooms went unsold last quarter, and your forward pace is sitting well behind your peer group. That's the reality we're dealing with, and we need to talk through why it's happening and what has gone wrong on your side before we do anything else.",
    partnerResponse: "That's a hard number to open with, Javier. We've been working hard on the guest experience - I'd have hoped you'd noticed that too.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: 0 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ov-r13-step1-drop-price",
    label: "Suggest she drop her prices further",
    description: "Jumps to a price cut before diagnosing - and she's already priced below her comp set, so it's both premature and factually the wrong lever. The unsold rooms aren't a headline-price problem.",
    playerDialogue: "If the rooms aren't selling, then one lever you have is price. Let's bring your rates down a bit further so you're undercutting the competition even more clearly than you already are - if you're the cheapest option on every search, the bookings should start flowing back and those empty rooms will fill up a lot faster.",
    partnerResponse: "But we're already cheaper than our comp set. How would cutting further even help? That just gives away margin.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step2Options33 = [
  {
    id: "ov-r13-step2-correct",
    label: "Credit her price, then reveal the visibility gap",
    description: "SME-prescribed handling: validate that her headline competitiveness is real, then show the deeper funnel signal - her visibility share is only 20% and forward sell-through is pacing behind her peer group, so a large share of searchers never reach her listings. Per SME, R13 leads on the sell-through/exposure signal; visibility is shown as her own figure here (the peer signal rides on sell-through).",
    playerDialogue: "You're right, and your commitment to staying competitive is visible in the headline price. But look one level deeper into what travelers actually see. Your visibility share - the slice of searches where your listing actually shows up - is sitting at just 20%, and your forward sell-through is pacing behind your peer group. Travelers are coming to search, but a big portion of them never actually reach your listings.",
    partnerResponse: "Well... if our rates are lower, how is it possible that our visibility is dropping? Is the platform's algorithm placing us further down the results?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r13-step2-accept-cheaper",
    label: "Accept her read and blame the market",
    description: "Takes her 'we're already cheaper' at face value and concludes it must be soft demand - abandoning the visibility signal that actually explains the gap.",
    playerDialogue: "You make a fair point, and I don't want to overcomplicate this for you. If you're already the cheapest option out there, then this is most likely just a slow patch in the wider market right now rather than anything in your own setup or configuration. Demand across the whole area has been softer lately, so I'd expect it to pick back up on its own soon enough.",
    partnerResponse: "That's a relief, honestly. So we just wait for demand to come back?",
    styleMatch: { red: 0, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "ov-r13-step2-doubt-her-team",
    label: "Cast doubt on her revenue team's numbers",
    description: "Right that her internal read is incomplete, wrong delivery - implying her team got it wrong turns it into an internal-vs-external data fight instead of widening her view to the traveler's.",
    playerDialogue: "I'd take your revenue team's 'we're 3% cheaper than our comp set' claim with a fairly large pinch of salt. Our platform data tells a very different story from theirs, and at the end of the day ours is the version that reflects what travelers are actually doing when they come to search. I'd trust our numbers over your team's read on this one.",
    partnerResponse: "My team knows our pricing inside out. I'm not going to sit here and let you tell me their numbers are wrong.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step3Options33 = [
  {
    id: "ov-r13-step3-correct",
    label: "Explain the family-search mechanism",
    description: "SME-prescribed diagnosis: it's about who is searching and how occupancy is calculated. A couple sees her competitive rate, but 40%+ of peak-season searches are families - and because family rates are misconfigured, children are priced as adults.",
    playerDialogue: "It comes down to who's searching and how your occupancy is calculated. A couple searching for two people does see your competitive rate. But over 40% of peak-season searches in your area come from families - and right now your family rates are misconfigured, so children are being priced as adults.",
    partnerResponse: "Wait... full adult price for a two-year-old child?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r13-step3-algorithm-vague",
    label: "Blame the ranking algorithm, vaguely",
    description: "Answers her 'is the algorithm burying us?' with a hand-wave about how ranking works - plausible, but it misses the concrete, fixable family-config cause and leaves her nothing to act on.",
    playerDialogue: "It's largely just how the ranking works behind the scenes. The algorithm weighs up a whole range of different signals when it decides placement, and for whatever reason yours tend to net out a bit lower than your peers do, which is why fewer travelers end up seeing you in their results. It's hard to pin down to any single cause.",
    partnerResponse: "So it's the algorithm's fault and there's nothing specific I can do? That's not much to work with.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ov-r13-step3-just-discount-families",
    label: "Tell her to just discount for families",
    description: "Right segment, wrong fix - jumping to 'add a family discount' treats a broken configuration as a pricing problem, so it gives away margin instead of correcting the setup that's inflating the family price.",
    playerDialogue: "The fix here is really simple. Just put a discount on your family rates so that families searching see a noticeably lower price and start booking with you again. If the family price is what's putting them off, then bringing that number straight down is one way to win those bookings back and get the empty rooms filling.",
    partnerResponse: "Discount the family rate? I don't want to erode my ADR further - we've only just recovered from the last price test.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  }
];
var step4Options31 = [
  {
    id: "ov-r13-step4-correct",
    label: "Confirm it never touches her adult rate",
    description: "SME-prescribed handling of the ADR-dilution worry: correcting the child-rate configuration does not touch her rate or lower adult prices - it simply makes the family calculation fair, accurate and competitive.",
    playerDialogue: "I hear the concern completely. Correcting the child-rate configuration doesn't touch your rate or lower your prices for adults at all. It simply makes sure that when a parent searches for a family stay, the price they see is calculated fairly and accurately - nothing about your adult price changes.",
    partnerResponse: "Ok, I'm just checking, because after the price-alignment test last time I want to be sure we're not diluting our ADR any further. The results then were good, but we had no idea there was this family-rates issue sitting underneath...",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ov-r13-step4-technical-jargon",
    label: "Bury the reassurance in configuration jargon",
    description: "Right that it's a config fix, wrong delivery - walking a nervous partner through occupancy codes and age-bucket settings answers a reassurance question with complexity, feeding her 'operational nightmare' fear.",
    playerDialogue: "You'll just need to go in and remap the occupancy codes, set the child age buckets individually per rate plan, and re-index the extra-bed logic across each of your units. It's all sitting in the extranet configuration under the rate-plan settings, so once you've worked through each property it should flow through.",
    partnerResponse: "That already sounds like the operational nightmare I was worried about across all our units.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: 0 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ov-r13-step4-overpromise",
    label: "Promise the fix will lift her ranking",
    description: "Reassures her by promising the config fix will push her up the rankings. Promising a ranking reward in exchange for a change is a compliance breach in every regime.",
    playerDialogue: "And the best part is this - once you fix the family configuration, I can promise you the algorithm rewards you with a genuine ranking boost, so you'll climb straight back up the search results almost immediately. Get this sorted and I can more or less guarantee you'll be above your peers again in no time.",
    partnerResponse: "A guaranteed ranking boost? That sounds too good to be true, and it makes me trust the rest less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -11
  }
];
var step5Options30 = [
  {
    id: "ov-r13-step5-correct",
    label: "Frame it as opening a door that was accidentally locked",
    description: "SME-prescribed reframe: it's a quick technical fix - like opening a door that was accidentally locked. Right now families search, assume the property isn't set up for them, and move on before they ever consider it.",
    playerDialogue: "Think of it as opening a door that was accidentally locked. It's a quick technical fix, not a big project. Right now, families are searching, seeing an inflated price compared to your peers, and assuming your property just isn't set up for them - so they move on before they ever really consider you.",
    partnerResponse: "I see... when you explain the traveler's journey like that, it makes complete sense. We certainly don't want families thinking we don't welcome them. But what kind of impact do you think we'll actually see on revenue?",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "ov-r13-step5-pressure-urgency",
    label: "Pressure her that every day costs bookings",
    description: "Right that it matters, wrong tone - piling on urgency ('every day you wait you lose families') pressures a partner who's already on side and cuts against the calm, collaborative register that's working.",
    playerDialogue: "You really need to move on this as fast as you possibly can - every single day it stays broken, you're losing family bookings that you can't ever get back. We should get this fixed today, right now if we can, because every hour of delay is families booking with someone else instead of you.",
    partnerResponse: "There's no need to rush me - I'm already hearing you. Let's keep this constructive.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ov-r13-step5-minimise",
    label: "Downplay it as barely worth doing",
    description: "Undersells the fix as a minor tidy-up - which deflates the value and gives a partner nervous about effort an easy reason to deprioritize it.",
    playerDialogue: "It's a really small thing when you get down to it - just a little bit of housekeeping tucked away in the settings, nothing that's going to take any real time. Fix it whenever you happen to get a spare moment, there's genuinely no rush on it at all, so just slot it in around everything else.",
    partnerResponse: "If it's that minor, I'll probably just add it to the pile and get to it eventually.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  }
];
var step6Options12 = [
  {
    id: "ov-r13-step6-correct",
    label: "Close on the family-segment value and a review",
    description: "SME-prescribed close: families spend more, stay longer, and are far more likely to leave positive reviews - a segment that directly supports her long-term goal of stable, repeatable guest relationships. Agree a review in two months.",
    playerDialogue: "Families tend to spend more, stay longer, and are around 24% more likely to leave a positive review - so this directly supports the stable, repeatable guest relationships you're building. Let's fix the configuration and set a review in two months to see how the family segment has grown.",
    partnerResponse: "Yes, I'd love that - a report over the next two months to see the impact, and something I can share with my team so that next year we're properly family-ready for peak season.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ov-r13-step6-no-followup",
    label: "Fix it and move on with no review",
    description: "Lands the fix but sets no follow-up and never connects it to her goals - so a relationship-led partner is left without the shared scoreboard that would keep her invested.",
    playerDialogue: "Great, let's get the configuration corrected and that really should sort those family bookings out for you without much more effort. Once it's done, it's done, and you shouldn't need to think about it again - the families will start coming through and the rooms will fill. I'll leave you to get on with everything else.",
    partnerResponse: "Alright... though it'd be nice to actually see whether it worked, and what it meant for us.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ov-r13-step6-upsell-discount",
    label: "Bolt on a broad discount push",
    description: "Uses the goodwill to reach for a general discount on top of the fix - reintroducing the ADR-dilution fear she just told you she's wary of, and muddying a clean config win.",
    playerDialogue: "Perfect - and while we've got the momentum and you're happy to make changes, let's go ahead and add a broad across-the-board discount on top of the fix as well, just to accelerate all those bookings coming back in. Combine the configuration fix with a solid discount everywhere and you'll fill the rooms even faster.",
    partnerResponse: "No - that's exactly the ADR dilution I told you I want to avoid. Let's keep it to the fix.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var steps3 = [
  {
    id: "open",
    label: "Acknowledge her focus, then the signal",
    partnerPrompt: "Good morning, Javier. We're doing alright, thank you. We've been focusing a lot on our guest welcome experience lately - making sure our families and long-term guests feel completely at home. Though, to be honest, my team is still a bit anxious about our pace for the upcoming months. I was hoping the numbers on your platform are fine after our previous trial?",
    options: step1Options31
  },
  {
    id: "cheaper-why",
    label: "'We're cheaper, why not selling?'",
    partnerPrompt: "Oh dear... 45% unsold? That is concerning, Javier. But honestly, I find it confusing. My revenue team double-checked our setup, and overall our rates on your platform are very aggressive - we're consistently priced about 3% cheaper than our Peer Group. If we're already cheaper than the competition, why aren't those rooms selling?",
    options: step2Options33
  },
  {
    id: "family-config",
    label: "The family-rate misconfiguration",
    partnerPrompt: "Well... if our rates are lower, how is it possible that our visibility is dropping? Is the platform's algorithm placing us further down the results?",
    options: step3Options33
  },
  {
    id: "reassure-adr",
    label: "Reassure: the fix doesn't touch ADR",
    partnerPrompt: "Wait... full adult price for a two-year-old child? I had no idea that was happening in the background. We love welcoming families, Javier, but configuring age categories across multiple rentals sounds like an operational nightmare. I worry my team will get confused, or worse, that we'll accidentally lower our adult rate.",
    options: step4Options31
  },
  {
    id: "locked-door",
    label: "Reframe as opening a locked door",
    partnerPrompt: "Ok, I'm just checking, because after the price-alignment test last time I want to be sure we're not diluting our ADR any further. The results then were good, but we had no idea there was this family-rates issue sitting underneath...",
    options: step5Options30
  },
  {
    id: "close",
    label: "Close on the family-segment value",
    partnerPrompt: "I see... when you explain the traveler's journey like that, it makes complete sense. We certainly don't want families thinking we don't welcome them. But what kind of impact do you think we'll actually see on revenue?",
    options: step6Options12
  }
];
function oceanViewR13(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 13,
    issueTreePath: oceanViewR3IssueTreePath,
    openingAm: openingAm15,
    steps: steps3
  };
}

// src/data/scenarios/riverside-r14.ts
var openingAm16 = "Good morning, Anton. Nice to speak with you again. I've been analyzing your performance for the next 90 days to spot a couple of opportunities. Do you have a moment to look at the data?";
var step1Options32 = [
  {
    id: "rv-r14-step1-correct",
    label: "Name the friction concisely",
    description: "SME-prescribed open, matched to a time-pressured GM: state the friction plainly - revenue left on the table, roughly a quarter of rooms unsold last month, forward sell-through pacing behind the local set.",
    playerDialogue: "I'll keep it tight. There's a clear friction over the next quarter: the property is leaving revenue on the table - around 24% of rooms went unsold last month and your forward sell-through is pacing behind your local market set.",
    partnerResponse: "24% unsold rooms? Look, Ren, we've talked about this. We are a premium boutique hotel. I'm not going to panic and start dropping rates to match the standard three-star hotels your algorithm decided to make my competitors. Our product is far too unique for those comparisons, and discounting damages our positioning.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rv-r14-step1-soft-preamble",
    label: "Ease in with a long preamble",
    description: "Warm, but wrong for the room - a slow, relationship-first wind-up wastes the time of a GM who explicitly asked you to keep it brief, before you've earned it with a point.",
    playerDialogue: "Before we get into any of the numbers, I'd love to hear how the whole events season is shaping up, how the team's been holding up through it, and whether the refurbishment landed the way you hoped - it's been far too long since we properly caught up on all of it.",
    partnerResponse: "Ren, I asked you to keep it brief - I'm mid-preparation. What's the actual situation with the numbers?",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rv-r14-step1-match-comp",
    label: "Tell him to match the comp-set",
    description: "Opens by telling him to price in line with the comparison set - the exact 'become a three-star' move his brand refuses, and a requirement to match others on price that oversteps in every regime.",
    playerDialogue: "Your rooms aren't moving because you're sitting well above your comparison set, and the only real way to fix that is to bring your rates down into line with those hotels - you'll need to price where they price if you want to compete for the same guests they're winning.",
    partnerResponse: "Match the three-star set? Absolutely not. That's the fastest way to destroy everything this property stands for.",
    styleMatch: { red: -1, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step2Options34 = [
  {
    id: "rv-r14-step2-correct",
    label: "Reframe via the traveler's journey",
    description: "SME-prescribed handling of the 'too unique' refusal: respect the position, then reframe - travelers don't know his brand or his competitors, they search by destination and amenities, so it's the market, not the algorithm, that sets the comparison.",
    playerDialogue: "I completely respect that, Anton. But think about the traveler's journey: they search for a destination, similar amenities and a similar stay. Your peer group is based on the other properties guests actually see and consider in those searches, so it reflects the market you're competing in, not a hand-picked list from us. In the end, it's worth seeing the comparison through the guest's eyes.",
    partnerResponse: "I take the point, but I'd want guests to get some sense of the uniqueness of our property right from the very beginning of their journey on your platform.",
    styleMatch: { red: 0, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rv-r14-step2-concede-unique",
    label: "Agree he's in a category of one",
    description: "Concedes the 'too unique' framing wholesale - if he really has no comparators, there's no competitiveness case to make, and the conversation stalls.",
    playerDialogue: "You're right - and I don't want to pretend otherwise. A property like yours really is in a category of its own, with a character and a guest experience that the hotels around you can't offer. So I take your point that those peer comparisons probably don't apply to you in the way the system assumes, and it's fair to set them aside.",
    partnerResponse: "Exactly my point. So there's not much to discuss on the pricing front, is there?",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "rv-r14-step2-insist-data",
    label: "Insist the comp-set is simply correct",
    description: "Right that the comparison is real, wrong move - telling him the algorithm's comp-set is correct and he should accept it meets his identity objection with a flat contradiction, hardening him.",
    playerDialogue: "The comparison set the system built is accurate, Anton - those really are your competitors whether you like it or not, and the sooner you accept that the better. The data doesn't get it wrong on this; those are the properties travelers are weighing you against, so the sensible thing is to stop resisting it and work with the set as it stands.",
    partnerResponse: "Don't tell me a piece of software understands my property better than I do. We're not the same as those hotels.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -5
  }
];
var step3Options34 = [
  {
    id: "rv-r14-step3-correct",
    label: "Point uniqueness to content, then show the visibility gap",
    description: "SME-prescribed handling: his uniqueness comes through in strong photos and descriptions - that's where it belongs. Then surface the gap: visibility share down to 12% against a peer group at 21%, with his search price about 7% above peers.",
    playerDialogue: "That uniqueness absolutely comes through - in strong photography and a rich description, which is exactly where it should land. But alongside that, your visibility share has dropped to 12% while your peer group sits at 21%, and when travelers search your area your search price is running about 7% above them.",
    partnerResponse: "A 7% difference doesn't concern me if those travelers aren't our target audience. Our guests value exclusivity over price.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "rv-r14-step3-lead-number-only",
    label: "Lead with the 7% gap on its own",
    description: "Right data, missing the bridge - opening with 'your price is 7% too high' before honouring where his uniqueness shows lets him dismiss it as just another generic average.",
    playerDialogue: "The headline is this: your search price is running about 7% above your peer group, and that gap is the direct reason your visibility has slipped. It really is that straightforward - the number is higher than the field around you, the field converts better, and the bookings follow the more competitive price. That's the whole story.",
    partnerResponse: "There it is - another platform average telling me to drop my price. I don't buy it, Ren.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rv-r14-step3-global-stat",
    label: "Lean on a global platform statistic",
    description: "Reaches for a sweeping platform-wide stat to prove the point - exactly the 'global stat' a proud operator distrusts. It invites a credibility fight instead of grounding the gap in his own listing.",
    playerDialogue: "Across our entire platform, properties that price above their peer group consistently see far lower conversion - it's a universal pattern that holds true almost everywhere we look, and I'm afraid you're really no exception to it. The data across thousands of hotels tells exactly the same story, so it's a safe bet it applies to you here too.",
    partnerResponse: "Platform-wide averages mean nothing to a property like mine. Show me something that's actually about us, not everyone.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  }
];
var step4Options32 = [
  {
    id: "rv-r14-step4-correct",
    label: "Tie the gap to the exact guests he wants",
    description: "SME-prescribed handling of the 'not our audience' objection: look at who's actually shopping the listing. For US couples booking 30+ days out - a high-spending, long-stay segment - he's losing 15% visibility share directly to his peer group.",
    playerDialogue: "That's fair for your repeaters and direct customers. But look at who's actually shopping your listing on our platform right now. For US couples booking 30 or more days ahead - a high-spending, long-stay segment - you're losing 15% visibility share directly to your peer group. They're viewing you, then choosing a competitor.",
    partnerResponse: "Hmm... US couples booking a month out are exactly the guest profile we want. They spend heavily on extra services...",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "rv-r14-step4-generalise",
    label: "Argue every segment is affected",
    description: "Right that the gap costs him, wrong angle - widening it to 'you're losing bookings everywhere' abandons the one high-value segment that would actually make him lean in, and sounds like the blanket case he keeps rejecting.",
    playerDialogue: "It's not just one segment, Anton - you're losing bookings across the board because of that price gap, and it's showing up in nearly every source market when I break the numbers down. Wherever travelers are searching your area, the same pattern repeats and the same guests slip away to a competitor. Everyone's affected by it.",
    partnerResponse: "'Everyone' again. If it's that broad, it's just the discount argument dressed up differently.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "rv-r14-step4-shame",
    label: "Suggest his exclusivity is costing him",
    description: "Frames his positioning as the problem - a jab at the brand identity he's proud of, which pushes a relationship-led GM to defend rather than engage.",
    playerDialogue: "Anton, this whole 'exclusivity over price' stance is exactly what's costing you the bookings - you can't afford to be quite so precious about it when a quarter of your rooms are sitting empty every month. At some point the positioning has to give way to filling the beds, and right now it isn't.",
    partnerResponse: "'Precious'? That exclusivity is the entire business, Ren. I won't be lectured on it.",
    styleMatch: { red: -1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "borderline",
    trustChange: -10
  }
];
var step5Options31 = [
  {
    id: "rv-r14-step5-correct",
    label: "Offer a fenced US Country Rate, no ADR reset",
    description: "SME-prescribed proposal: this is about winning the exact high-value travelers he wants, not competing with three-star hotels. A Country Rate fenced to US travelers applies a closed incentive only to that segment - improving sell-through without an across-the-board ADR reset or brand compromise.",
    playerDialogue: "So this isn't about competing with three-star properties - it's about winning the exact high-value travelers you want. We'd use a targeted tool: a Country Rate fenced specifically to travelers searching from the US. It applies a closed incentive to that segment only, so you recover those bookings without an across-the-board rate reset or touching your brand elsewhere.",
    partnerResponse: "A targeted Country Rate for the US market... What kind of concrete return does that actually give us? How does it interact with the Genius program - I fixed that setup last time and I don't want a huge stacked discount for US travelers.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "rv-r14-step5-broad-discount",
    label: "Offer a general discount instead",
    description: "Right that he needs to be more competitive, wrong instrument - a general public discount is exactly the across-the-board ADR hit he refuses, when a fenced segment offer would have won his yes.",
    playerDialogue: "Let's just put a modest discount straight onto your public rates for the whole of the next quarter - nothing dramatic, but broad enough to lift the bookings across the board and simple to switch on and manage. A single percentage off everything is the cleanest way to get the rooms moving again, and you can lift it the moment the quarter picks back up and demand returns to where you want it.",
    partnerResponse: "A public discount across the board is precisely what I told you I won't do. Weren't you listening?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -6
  },
  {
    id: "rv-r14-step5-guarantee",
    label: "Promise a visibility guarantee",
    description: "Sells the tool with a guaranteed visibility/ranking return for discounting. Promising ranking or visibility rewards in exchange for a price move is a compliance breach in every regime.",
    playerDialogue: "Set up the US rate and I can genuinely guarantee your visibility jumps straight back up - the incentive buys you the placement, plain and simple, so it more than pays for itself. Switch it on and I promise you'll see your listing climb straight back up within days, with the extra exposure locked in for as long as the rate is running. It's a guaranteed return on that bit of discount.",
    partnerResponse: "A guaranteed jump? Nothing's guaranteed. That kind of promise makes me trust the rest of your pitch less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step6Options13 = [
  {
    id: "rv-r14-step6-correct",
    label: "Answer the Genius-stacking question honestly, then close",
    description: "SME-prescribed close: it's an opaque promotion and it does stack with Genius on the program's room types; and since around 60% of users aren't logged in when they land, the more attractive desktop price makes a real first-glance difference. Let him own the setup.",
    playerDialogue: "Straight answers: it does stack with the Genius discount on the room types in the program. But there is a decent amount of searches on our platform that are not just from signed-in members, so the attractive public prices on our platform to travelers makes a difference and drives demand.",
    partnerResponse: "Fair enough. Let's set the US Country Rate up - I'll implement it myself so I can check the stay dates and apply a few exceptions.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "rv-r14-step6-dodge-genius",
    label: "Gloss over the Genius-stacking question",
    description: "He asked a direct, specific question about discount stacking - brushing past it ('don't worry about the detail') erodes trust with a partner who fixed that setup deliberately and is watching for exactly this.",
    playerDialogue: "Don't get too bogged down in the Genius mechanics - it'll all sort itself out naturally once the rate is live and you can see it running. The important thing right now is just to switch it on and let it start pulling those US bookings in; we can always circle back to the finer detail of the stacking later if anything actually looks off to you.",
    partnerResponse: "I asked a direct question because I fixed that setup on purpose. 'Don't worry about it' is not an answer.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "rv-r14-step6-widen-scope",
    label: "Push to widen it beyond the US",
    description: "Uses the yes to reach past the fenced US segment he agreed - rolling it out to more markets 'while we're at it'. Reopens the ADR and brand worry he only just set aside.",
    playerDialogue: "Great - and while we've got the setup open, let's not stop at the US; let's extend the very same rate out to a few more of your strongest source markets at the same time, so we really maximize the reach while the momentum's there. It makes sense to get it all switched on in one go rather than coming back to layer more on piece by piece later.",
    partnerResponse: "No. I agreed to a fenced US rate for a reason. Widen it and we're back to eroding the brand everywhere.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var steps4 = [
  {
    id: "open",
    label: "Open briefly on the signal",
    partnerPrompt: "Morning, Ren. Yes, keep it brief - we're right in the middle of preparations for some major events. As you know, my focus is protecting our revenue and maintaining brand standards. What's the situation?",
    options: step1Options32
  },
  {
    id: "too-unique",
    label: 'Handle the "too unique" refusal',
    partnerPrompt: "24% unsold rooms? Look, Ren, we've talked about this. We are a premium boutique hotel. I'm not going to panic and start dropping rates to match the standard three-star hotels your algorithm decided to make my competitors. Our product is far too unique for those comparisons, and discounting damages our positioning.",
    options: step2Options34
  },
  {
    id: "content-and-gap",
    label: "Uniqueness in content; show the gap",
    partnerPrompt: "I take the point, but I'd want guests to get some sense of the uniqueness of our property right from the very beginning of their journey on your platform.",
    options: step3Options34
  },
  {
    id: "connect-segment",
    label: "Tie the gap to his ideal segment",
    partnerPrompt: "A 7% difference doesn't concern me if those travelers aren't our target audience. Our guests value exclusivity over price.",
    options: step4Options32
  },
  {
    id: "propose",
    label: "Propose the fenced US Country Rate",
    partnerPrompt: "Hmm... US couples booking a month out are exactly the guest profile we want. They spend heavily on extra services...",
    options: step5Options31
  },
  {
    id: "close",
    label: "Answer the mechanics and close",
    partnerPrompt: "A targeted Country Rate for the US market... What kind of concrete return does that give us? How does it interact with the Genius program - I don't want a huge stacked discount for US travelers.",
    options: step6Options13
  }
];
function riversideR14(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 14,
    issueTreePath: riversideR4IssueTreePath,
    openingAm: openingAm16,
    steps: steps4
  };
}

// src/data/scenarios/emerald-peak-r15.ts
var openingAm17 = "Good afternoon, Sophia. Thanks for taking the time. Following up on your targeted occupancy setups, I've looked at your performance for the next few months. Do you have a moment to go through it together?";
var step1Options33 = [
  {
    id: "ep-r15-step1-correct",
    label: "Name the forward sell-through gap",
    description: "SME-prescribed open: point to the one forward metric that needs attention - sell-through pacing about 9 percentage points behind her peer group over the next 90 days.",
    playerDialogue: "Looking at the next 90 days, there's one metric worth your attention: your forward sell-through is pacing behind your peer group.",
    partnerResponse: "Well, that doesn't concern me a great deal - we still have time to sell. If our volume on third-party channels is lower, that's a calculated trade-off. We accept lower conversion on external platforms to safeguard our direct channel. How does that gap compare against our historical data?",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ep-r15-step1-alarm",
    label: "Open by raising the alarm",
    description: "Right metric, wrong pitch - dramatizing a 9-point forward gap as a crisis to a decisive, data-led GM reads as spin and hands her an easy reason to discount your whole read.",
    playerDialogue: "Sophia, next quarter is a real problem - your sell-through is falling off a cliff and you'll be sitting on a lot of empty rooms unless we act now.",
    partnerResponse: "Falling off a cliff? Let's not be dramatic. We still have plenty of runway to sell. What are the actual figures?",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ep-r15-step1-cut-price",
    label: "Open by asking her to cut rates",
    description: "Prescribes a price cut before any diagnosis - the one move a brand-first franchise defending its direct channel will reject immediately.",
    playerDialogue: "Your pace is behind, so one fix here is to bring your public rates down now and get yourself a lot more competitive right across the board.",
    partnerResponse: "Lower our public rates? That undercuts the entire reason we protect our direct channel. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  }
];
var step2Options35 = [
  {
    id: "ep-r15-step2-correct",
    label: "Give the history, then the visibility gap",
    description: "SME-prescribed handling (Anouk reframe): answer her 'vs history' question with her own strong recent performance - room nights up, conversion above peers once travelers reach the page - then pivot to exposure: 12% unsold and visibility at 17% against a peer group at 26% mean travelers convert when they find her; the gap is how many find her.",
    playerDialogue: "Happy to dig into that. Recently you're performing strongly - your room nights sold are up 110% on your peer group over the last 30 days, and once travelers reach your page your conversion sits above your peer group too. So demand and closing are both working in your favor. The gap is earlier in the journey: 12% of your rooms went unsold last month, and your visibility share is only 17%, against a peer group at 26%, so a large share of travelers never reach your page. Your guests convert when they find you - the real question is how many find you.",
    partnerResponse: "Mmh, okay... so what's actually happening at the searching stage that drives that difference?",
    styleMatch: { red: 2, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r15-step2-only-bad-news",
    label: "Skip the strong history, lead with the miss",
    description: "Right that the gap matters, wrong framing - withholding the genuinely strong 40% room-nights history and leading only with the unsold rooms reads as a one-sided case to a numbers-led GM who asked for the full picture.",
    playerDialogue: "The history doesn't change the picture all that much, so I'll go straight to what matters: you left 12% of your rooms unsold over the last 30 days, and your visibility is sitting well behind your peers. That's the headline I'd want you focused on, and it's where the real opportunity is right now.",
    partnerResponse: "I asked how it compares historically and you skipped straight to the bad news. Give me the whole picture.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ep-r15-step2-vague-visibility",
    label: "Cite falling visibility with no numbers",
    description: "Right direction, missing the evidence - telling a data-led GM her visibility is 'slipping' without the 17%-vs-26% comparison gives her nothing concrete to weigh.",
    playerDialogue: "The short version is that your visibility has been slipping for a while now - travelers aren't seeing you in their results the way they used to, and that softer exposure is quietly dragging on your bookings across the whole quarter. It's a clear downward drift, and it tends to compound if it's left alone.",
    partnerResponse: "'Slipping' by how much, against whom? I don't act on vague impressions.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  }
];
var step3Options35 = [
  {
    id: "ep-r15-step3-correct",
    label: "Explain the search-price gap factually",
    description: "SME-prescribed diagnosis, framed as fact not threat: her search price is on average 10% higher than peers, which reduces how often she appears and builds a visibility debt - travelers pick an alternative before they ever reach her page.",
    playerDialogue: "At the search stage, your price comes up on average 10% higher than your peers. Less competitive prices simply appear less often, which builds up a visibility debt over time - travelers select an alternative before they even reach your page.",
    partnerResponse: "Our price positioning reflects our value. We do not adjust our rates across the board just to match minor competitors.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r15-step3-ranking-threat",
    label: "Warn the platform will down-rank her",
    description: "Turns the factual visibility point into a threat - keep your price high and we push you down the results. Threatening a ranking penalty based on her prices is off-side in every regime.",
    playerDialogue: "Put it simply, Sophia - for as long as you sit 10% above your peers, the platform is going to keep pushing you further and further down the rankings, and it won't stop doing that until you bring your price back into line with everyone else. That's just how it works.",
    partnerResponse: "So that's a threat now - drop my price or you'll bury me. That tells me everything I need to know about this conversation.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -15
  },
  {
    id: "ep-r15-step3-concede-value",
    label: "Concede her price reflects her value",
    description: "Accepts 'our price reflects our value' as the end of it - which forfeits the diagnosis and lets a decisive GM close the topic before the real cause surfaces.",
    playerDialogue: "That's completely fair, Sophia - if the price genuinely reflects the value you offer your guests, then perhaps this search gap is really just the natural cost of holding your positioning, and there may not be all that much worth changing here at all.",
    partnerResponse: "Exactly. So we're agreed there's nothing to change here.",
    styleMatch: { red: 0, yellow: 0, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  }
];
var step4Options33 = [
  {
    id: "ep-r15-step4-correct",
    label: "Name the inflate-to-discount pattern",
    description: "SME-prescribed handling of the Fake Value trap: acknowledge her strategy of keeping her own site cheaper to own the guest, then show the cost - inflating the public price to fund the Genius discount is what makes her search price 10% uncompetitive, which drops her share to 17% and costs a 60% fall in last-minute mobile conversions.",
    playerDialogue: "I understand the strategy is to keep your own site cheaper to own the guest. But raising your public price to fund the Genius discount is exactly what's making your search price 10% uncompetitive. That's what drops your share to 17% - and it's costing you a significant fall in last-minute mobile conversions.",
    partnerResponse: "A drop that large, specifically on mobile searches? Why would that be? I've made sure our Genius program is correctly set up and shown to your users.",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ep-r15-step4-attack-strategy",
    label: "Call her direct-site strategy a mistake",
    description: "Right that the inflation hurts her, wrong framing - labelling her own-the-guest strategy a mistake attacks a deliberate brand decision and dictates how she should run her direct channel.",
    playerDialogue: "Sophia, this whole 'keep our own website cheaper' strategy is the real mistake here, and it's working against you. What you should be doing is stopping that approach altogether and leading with your genuine best price on our platform instead, because that's the only way you're going to turn any of this around.",
    partnerResponse: "How I price my own website is my decision, not yours. This is exactly why I keep OTAs at arm's length.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "ep-r15-step4-generic-competitive",
    label: "Say she just needs to be more competitive",
    description: "Right conclusion, missing the mechanism - 'you need to be more competitive' skips the specific inflate-to-fund-Genius insight, so a sharp GM hears a generic discount nudge and tunes out.",
    playerDialogue: "The bottom line, Sophia, is that you need to be more competitive on price here - when it comes down to it, that's the single thing holding back both your visibility and your mobile bookings, and once you sort out where you sit against everyone else, the rest of it should start to take care of itself.",
    partnerResponse: "'Be more competitive' is code for 'discount', and we've been over why I won't.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  }
];
var step5Options32 = [
  {
    id: "ep-r15-step5-correct",
    label: "Explain non-logged-in mobile and partial Genius coverage",
    description: "SME-prescribed handling: the Genius program is set up, but non-logged-in mobile searchers don't see the Genius discount at first glance, so they drift to competitors showing a mobile badge. And Genius is active on only one room type, so it covers a slice of inventory - a mobile rate would cover it all and lift visibility.",
    playerDialogue: "Your Genius setup is fine - the gap is non-logged-in mobile searchers. They don't see the Genius discount at first glance, so they gravitate to a local competitor showing a mobile badge. And Genius is active on just one of your room types, so it only reaches a slice of your inventory. A mobile rate would reach all of it and lift your visibility at the same time.",
    partnerResponse: "I see. But since all our guests are loyal, at some point they log in and take the extra 10% anyway. Right now I don't want to invest so much in this segment. And honestly, 12% unsold in the last 30 days isn't a concern for me - I know you'd like that extra share, but I'll focus on my website.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 5,
    optimal: true
  },
  {
    id: "ep-r15-step5-just-genius-more",
    label: "Tell her to deepen the Genius discount",
    description: "Right that the discount isn't reaching enough travelers, wrong lever - pushing a deeper Genius discount doubles down on the very inflate-to-fund pattern that caused the problem, and still misses the non-logged-in mobile audience.",
    playerDialogue: "One answer here is to increase your Genius discount - step it up from where you are now to the next tier, so a wider group of travelers sees a stronger price the moment they come through. If more of them are looking at a bigger saving, more of them will book with you, and that alone should start to close the volume gap you're seeing over the coming weeks without you having to change much else.",
    partnerResponse: "Discount my loyal members even harder? That's the opposite of protecting my margin. No thank you.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ep-r15-step5-guarantee-mobile",
    label: "Promise the mobile rate guarantees the share back",
    description: "Oversells the mobile rate with a guaranteed visibility/share return for discounting - a promise of ranking or visibility reward in exchange for a price move, which breaches compliance in every regime.",
    playerDialogue: "Here's what I'd do - switch on a mobile rate and I can promise you'll win that 60% straight back and climb right up the mobile rankings within a matter of weeks. I've seen it land every single time, so I can guarantee you the visibility and the share come back the moment you turn it on. It really is a sure thing, and you'd be leaving an easy result on the table if you passed on it.",
    partnerResponse: "Nothing's a 'sure thing'. Guaranteeing me a ranking climb just makes me trust the rest of your numbers less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -11
  }
];
var step6Options14 = [
  {
    id: "ep-r15-step6-correct",
    label: "Offer more data and keep the door open",
    description: "SME-prescribed close on a no: don't push and don't capitulate. Neutrally offer whatever data would help her make a decision on her own terms, respect the call, and agree to bring fresh insight next month. The outcome is a no, but the relationship - and the next conversation - is preserved.",
    playerDialogue: "Understood, Sophia - it's your call and I respect it. Is there any particular data I could pull together that would help if you ever want to revisit it? Either way, I'll keep an eye on the segment and bring you anything useful when we speak next month.",
    partnerResponse: "No, that's all for now - we already have our strategy set, so no changes or decisions to make. But thank you for the analysis, it was thorough.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 4,
    optimal: true
  },
  {
    id: "ep-r15-step6-press",
    label: "Make one more push to change her mind",
    description: "She's clearly declined - pressing again to 'just try the mobile rate' after a firm no reads as not listening, and spends the goodwill that would have kept the door open for next time.",
    playerDialogue: "I really do think you're leaving money on the table here, Sophia - and I know you've heard me out, but can't I get you to at least trial the mobile rate for just a few weeks before you settle on a final decision? I'm confident the numbers would win you over.",
    partnerResponse: "I've given you my answer, Mei. Pushing after that isn't going to change it - if anything it makes me less inclined next time.",
    styleMatch: { red: -1, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -6
  },
  {
    id: "ep-r15-step6-give-up",
    label: "Accept the no and close it down",
    description: "Takes the no and quietly closes the door - no offer of support, no follow-up. A red/blue partner reads the flat retreat as disengagement, and there's no hook for the next conversation.",
    playerDialogue: "No problem at all, Sophia - I'll leave it there then, no need to go back over any of it again. I won't take up any more of your afternoon, and I'm sorry to have kept you this long today. I'll let you get back to everything else you've got on. Thanks again for hearing me out.",
    partnerResponse: "Right. Well, thanks for stopping by, I suppose.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -3
  }
];
var steps5 = [
  {
    id: "open",
    label: "Open on the forward sell-through",
    partnerPrompt: "Good afternoon, Mei. Yes, let's go! What trends are you seeing in the extranet for this upcoming quarter?",
    options: step1Options33
  },
  {
    id: "history-visibility",
    label: "Historical context + visibility gap",
    partnerPrompt: "Well, it doesn't concern me a lot - we still have time to sell. If our volume on third-party channels is lower, that's a calculated trade-off: we accept lower conversion on external platforms to safeguard our direct channel. How does that gap compare against our historical data?",
    options: step2Options35
  },
  {
    id: "search-gap",
    label: "The search-price gap and visibility debt",
    partnerPrompt: "Mmh, okay... so what's actually happening at the searching stage that drives that difference?",
    options: step3Options35
  },
  {
    id: "fake-value",
    label: "The Fake Value trap (Genius inflation)",
    partnerPrompt: "Our price positioning reflects our value. We do not adjust our rates across the board just to match minor competitors.",
    options: step4Options33
  },
  {
    id: "mobile-genius",
    label: "Non-logged-in mobile + Genius coverage",
    partnerPrompt: "A drop that large, specifically on mobile searches? Why would that be? I've made sure our Genius program is correctly set up and shown to your users.",
    options: step5Options32
  },
  {
    id: "close",
    label: "Close on the no, door open",
    partnerPrompt: "I see. But since all our guests are loyal, at some point they log in and take the extra 10% anyway. Right now I don't want to invest so much in this segment. And honestly, 12% unsold in the last 30 days isn't a concern for me - I know you'd like that extra share, but I'll focus on my website.",
    options: step6Options14
  }
];
function emeraldPeakR15(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 15,
    issueTreePath: emeraldPeakR5IssueTreePath,
    openingAm: openingAm17,
    steps: steps5
  };
}

// src/data/scenarios/oceanfront-r16.ts
var openingAm18 = "Hi Priya, great to connect with you again! How have things been running at the property lately?";
var step1Options34 = [
  {
    id: "of-r16-step1-correct",
    label: "Credit the last trial, then flag forward sell-through",
    description: "SME-prescribed open: acknowledge the impressive result from last time's trial (offering her best price lifted conversion), then flag the forward signal - sell-through pacing about 12% behind her peer group over the next 3 months.",
    playerDialogue: "First, I want to acknowledge that the trial last time had a genuinely impressive outcome. Offering your best price clearly lifted conversion, which shows guests respond when you're competitive. Looking ahead over the next 3 months, though, your sell-through is pacing behind your peer group, so there's an opportunity to build on that success and close the gap.",
    partnerResponse: "Okay, but that isn't alarming for us during low-demand periods - our occupancy is where we expect it. Our brand loyalty program is our main engine, and we'd rather keep a few rooms unbooked than alter our OTA strategy to chase extra room nights.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "of-r16-step1-ignore-trial",
    label: "Skip the trial and lead with the shortfall",
    description: "Right metric, missing the bridge - jumping straight to 'you're 12% behind' without crediting the trial she ran last time reads as ungrateful to a partner who took a chance for you, and puts her on the defensive.",
    playerDialogue: "Let's get straight to it today, because the signal that matters is this: your sell-through is running behind your peer group over the next quarter, and that pacing gap is really the whole reason I wanted to talk. That's the shortfall we need to work through together right now.",
    partnerResponse: "Straight to the shortfall, then. We tried something for you last time - I'd hoped we'd start there.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "of-r16-step1-cut-rates",
    label: "Open by asking her to lower rates",
    description: "Prescribes a rate cut before diagnosing - and she's just told you she'd rather hold rooms empty than compromise her OTA rates, so it lands as exactly the move she guards against.",
    playerDialogue: "The pace is running behind, so the cleanest fix here is to bring your public rates down a little and get yourself more competitive on the platform. If we shave a bit off those rates now, I'd expect those rooms to start moving and the whole gap to close up fairly quickly.",
    partnerResponse: "Lower our public rates? That's the one thing I've said we won't do to protect our direct guests. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  }
];
var step2Options36 = [
  {
    id: "of-r16-step2-correct",
    label: "Ask whether she wants visibility from anywhere",
    description: "SME-prescribed handling: a probing question rather than a pitch - is her marketing push strictly for her own website, or is she really after a general lift in visibility, wherever it comes from? Meets her where she is before reframing.",
    playerDialogue: "I respect that. Let me ask you this, though - the marketing campaigns you mentioned: are they strictly to grow your own website, or are you really after a general increase in visibility, no matter where the guest first finds you?",
    partnerResponse: "Well, we run ads in a few key overseas markets, and our loyalty program captures the repeat visitors. I'm not chasing visibility on OTAs, to be honest - I'd like to see our own website growing right now.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "of-r16-step2-tell-shift-spend",
    label: "Tell her to redirect her ad budget",
    description: "Dictates how she should run her own marketing - shift spend off her overseas ads and onto the platform. Directing a partner's external marketing and distribution strategy oversteps in every regime.",
    playerDialogue: "Those overseas ad campaigns are wasted spend, and you'd see far more return by pulling that budget out of them and putting it into building up your presence on our platform instead. That's where I'd redirect the marketing money if I were you.",
    partnerResponse: "My marketing budget is my business, Kai. I didn't ask you to redraw it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  },
  {
    id: "of-r16-step2-accept-website",
    label: "Accept she only cares about her website",
    description: "Takes 'I only want my website to grow' at face value and drops the thread - forfeiting the billboard reframe that would have shown the platform serving that same goal.",
    playerDialogue: "That's completely fair, and I understand where you're coming from - if the priority right now is growing your own website, then I get that OTAs aren't where you want to put your energy at the moment, and I won't push you on that today.",
    partnerResponse: "Right, exactly. So I'm not sure there's much for us to change here today.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -4
  }
];
var step3Options36 = [
  {
    id: "of-r16-step3-correct",
    label: "Reframe the platform as a zero-cost billboard",
    description: "SME-prescribed reframe: her ad push builds awareness, but exposure on the platform carries no marketing cost - it acts as a global search engine where up to 90% of travelers discover a property first. That discovery serves her own revenue goals, not just OTA bookings.",
    playerDialogue: "That marketing push definitely builds awareness. But consider this: exposure on our platform costs you nothing in marketing spend. We act as a global search engine where up to 90% of travelers discover a property first - and you can use that discovery to serve your own revenue goals, not just ours.",
    partnerResponse: "I know, but we also want to be the ones who are discovered first, so we can attract guests with our loyalty program and exclusive member value-adds.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "of-r16-step3-dismiss-marketing",
    label: "Dismiss her marketing as ineffective",
    description: "Right that the platform adds reach, wrong delivery - telling her that her own campaigns don't really work belittles the strategy she's invested in and makes a proud owner defend rather than listen.",
    playerDialogue: "The honest truth here is that those campaigns of yours just aren't really moving the needle for you the way you think they are - and that's exactly why those rooms are sitting empty at the end of the day. What you actually need is our reach behind you, not more of your own advertising.",
    partnerResponse: "Our campaigns are doing exactly what we built them to do. I won't have them written off like that.",
    styleMatch: { red: -1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "of-r16-step3-generic-reach",
    label: "Pitch platform reach in the abstract",
    description: "Right idea, no traction - a generic 'we have huge reach' line without the zero-marketing-cost angle or a concrete number sounds like a sales boast to a data-led owner and doesn't connect to her goal.",
    playerDialogue: "You should really be leaning into us a lot more than you are - we have enormous global reach and an audience that's far, far bigger than anything you could ever hope to reach on your own. There's a whole world of travelers out there and we're the ones who can put you in front of them.",
    partnerResponse: "Every platform tells me they're the biggest. That on its own doesn't change my plan.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -3
  }
];
var step4Options34 = [
  {
    id: "of-r16-step4-correct",
    label: "Zoom into the US-traveler share loss",
    description: "SME-prescribed handling: zoom from the general to one concrete segment. For international traffic over the next 3 months - specifically US travelers - a +4% search-price gap versus peers is likely costing her about 25% share.",
    playerDialogue: "Here's where it gets concrete. Zoom into your international traffic for the next 3 months, specifically US travelers: a search price about 4% above your peer group is likely costing you around 25% of that share. These are guests actively searching your area.",
    partnerResponse: "Wait - so those are actual US travelers booking other properties nearby, just because they don't see our page?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "of-r16-step4-stay-general",
    label: "Keep it at the whole-portfolio level",
    description: "Right that she's losing share, wrong altitude - keeping it at 'you're losing bookings overall' misses the one specific, high-value segment that actually makes her sit up, which is the whole point of the pivot.",
    playerDialogue: "When you look across the board, that price gap is costing you bookings all over the place - bookings you really should be winning here. It's a broad drag weighing on your whole performance on the platform, and it's showing up everywhere I look, not in any one corner of your business.",
    partnerResponse: "'Across the board' just sounds like the general discount case again. I need something more specific than that.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -3
  },
  {
    id: "of-r16-step4-inflate-number",
    label: "Overstate the loss to force urgency",
    description: "Inflates the share loss well past the data to shock her into acting - a numbers-led owner will check the figure, catch the exaggeration, and trust the rest of your case less.",
    playerDialogue: "Look, the reality is you're basically losing the entire US market right now - we're talking close to half of all those travelers booking somewhere else instead of with you. It's a genuine haemorrhage of business that only gets worse the longer you leave it.",
    partnerResponse: "Half? That's not what your own data said a moment ago. Let's stick to the real number.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -5
  }
];
var step5Options33 = [
  {
    id: "of-r16-step5-correct",
    label: "Offer a fenced US Country Rate that leaves rates untouched",
    description: "SME-prescribed handling of the 'rate adjustment means across-the-board discount' fear: capture those US searchers without touching her rates. A US Country Rate applies a closed incentive strictly to US travelers, while her domestic market keeps seeing the standard rate.",
    playerDialogue: "Here's the key: we can capture those US searchers without touching your rates. A US Country Rate applies a closed incentive strictly to travelers searching from the US, while your domestic market - and your direct guests - keep seeing your standard rate exactly as it is.",
    partnerResponse: "Okay, that sounds nice, but what are the guaranteed results? We've tried promotional tags before and it honestly felt like we just gave away margin without any clear surge in net revenue.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "of-r16-step5-public-discount",
    label: "Offer a small public discount instead",
    description: "Right that she needs to be more competitive to US travelers, wrong instrument - a public discount is visible to her direct guests too, which is the exact thing she said she won't open up.",
    playerDialogue: "Let's keep this simple and just put a small discount on your public rates - modest enough to protect your margin but still enough to win those US travelers back onto your page. A little movement on the headline price is one way to get those searchers converting again.",
    partnerResponse: "A public discount is visible to my direct guests, Kai. That's precisely what I told you I won't do.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "of-r16-step5-guarantee-revenue",
    label: "Promise a guaranteed revenue lift",
    description: "Answers her results question with a guaranteed revenue promise - exactly the specific-reward promise compliance forbids, and a red flag to an owner already burned by promo tags.",
    playerDialogue: "I can promise you this one will absolutely deliver - a guaranteed lift in net revenue coming straight from that US segment, no question about it whatsoever. Put it live and you'll see the return; this is one you can take right to the bank and count on.",
    partnerResponse: "The last people who 'guaranteed' me a lift cost me margin. A promise like that makes me trust it less, not more.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -11
  }
];
var step6Options15 = [
  {
    id: "of-r16-step6-correct",
    label: "Set measurable KPIs and offer the projections she wants",
    description: "SME-prescribed close on a soft no: don't guarantee - set three clear KPIs to measure (US conversion, visibility-share recovery, sell-through), accept her ask to see projections, and agree to bring them next time. The deferral is respected and the follow-up is secured.",
    playerDialogue: "No guarantees - but we'd set three clear KPIs to judge it on: your conversion among US travelers, your visibility-share recovery, and your sell-through. I'll pull together the revenue projections you're after and bring them to our next conversation so you can decide with the numbers in front of you.",
    partnerResponse: "Look, I appreciate the data on the US market, I really do... I'm still not fully convinced. But send me those projections of how the country rate would impact revenue, and we'll take a proper look next time.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "of-r16-step6-push-close",
    label: "Push her to commit before you leave",
    description: "She's ready to consider it on her own terms - pressing for a yes now, after she asked for projections, overreaches and risks turning a warm deferral into a firm no.",
    playerDialogue: "I'd really rather not walk out of here today without some kind of decision from you - so can we just agree to switch the US rate on right now and then review how it's performing together once it's been running for a little while? I'm confident enough in this that I'd like to get it started today.",
    partnerResponse: "I asked to see the numbers first, Kai. Pushing me to commit now is only going to make me more cautious, not less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: "safe",
    trustChange: -6
  },
  {
    id: "of-r16-step6-vague-followup",
    label: 'Agree to "stay in touch" with nothing concrete',
    description: "Accepts the deferral but pins nothing - no projections, no KPIs, no date. A data-led owner needs the numbers she asked for, or the follow-up quietly evaporates.",
    playerDialogue: "No problem at all - let's just keep the lines open between us and pick this whole thing back up again whenever the timing happens to suit you better. There's no rush on my end, so whenever you feel ready to revisit it, you know where to find me and we'll take it from there.",
    partnerResponse: "I did ask for projections, though. Without those there's nothing for me to actually look at, is there?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  }
];
var steps6 = [
  {
    id: "open",
    label: "Credit the trial, name the sell-through gap",
    partnerPrompt: "Hey Kai! Busy as always, honestly. We've been really focused on some marketing campaigns and going over our internal reports. Things look ok on our end, so I'm curious to see what you wanted to run through today!",
    options: step1Options34
  },
  {
    id: "probe-visibility",
    label: "Probe: website-only or general visibility?",
    partnerPrompt: "Okay, but that isn't alarming for us during low-demand periods - our occupancy is where we expect it. Our brand loyalty program is our main engine, and we'd rather keep a few rooms unbooked than alter our OTA strategy to chase extra room nights.",
    options: step2Options36
  },
  {
    id: "billboard",
    label: "The billboard reframe",
    partnerPrompt: "Well, we run ads in a few key overseas markets, and our loyalty program captures the repeat visitors. I'm not chasing visibility on OTAs - I'd like to see our own website growing right now.",
    options: step3Options36
  },
  {
    id: "us-segment",
    label: "Connect to the US segment",
    partnerPrompt: "I know, but we also want to be the ones who are discovered first, so we can attract guests with our loyalty program and exclusive member value-adds.",
    options: step4Options34
  },
  {
    id: "propose",
    label: "Fenced US Country Rate, no rate change",
    partnerPrompt: "Wait - so those are actual US travelers booking other properties nearby, just because they don't see our page?",
    options: step5Options33
  },
  {
    id: "close",
    label: "Close on the soft no, set the follow-up",
    partnerPrompt: "Okay, that sounds nice, but what are the guaranteed results? We've tried promotional tags before and it felt like we just gave away margin without any clear surge in net revenue.",
    options: step6Options15
  }
];
function oceanfrontR16(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 16,
    issueTreePath: oceanfrontR6IssueTreePath,
    openingAm: openingAm18,
    steps: steps6
  };
}

// src/data/scenarios/palace-grand-r17.ts
var openingAm19 = "Good afternoon, Ethan. Thanks for taking the time to connect. I'd love to review your performance together for the upcoming quarter.";
var step1Options35 = [
  {
    id: "pg-r17-step1-correct",
    label: "Acknowledge the frustration, then present the signal",
    description: "SME-prescribed open: validate the noise he's dealing with, set it aside, and present the forward signal - sell-through pacing behind peers and a fifth of last month's rooms left unsold.",
    playerDialogue: "I completely understand how frustrating that noise is. Let's set it aside and look at your own performance. Over the next 90 days your sell-through is pacing behind your peer group, and last month you had around 21% of rooms left unsold. That's revenue that could have been captured.",
    partnerResponse: "21% unsold inventory... Let's look at the broader picture, Diego. Our page views are positive, and when guests land on our page our conversion is solid. If our sell-through is slow, isn't that just a consequence of the general drop in demand?",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r17-step1-pile-on",
    label: "Add to the price-competitiveness pressure",
    description: "Right that competitiveness is the theme, wrong read of the room - piling more 'you're not competitive' pressure onto a partner who just told you he's sick of exactly that noise confirms his fear before you've earned any goodwill.",
    playerDialogue: "Well, the other OTAs aren't wrong about this, Ethan - your competitiveness really is the issue, and it's showing up clearly in your own numbers here too, not just in their complaints. It's not noise, it's a real pattern, and it's something you're going to have to face up to and address sooner rather than later.",
    partnerResponse: "So you ARE bringing the same thing here. This is exactly the conversation I was hoping to avoid.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "pg-r17-step1-cut-rate",
    label: "Open by telling him to lower rates",
    description: "Prescribes a price cut before diagnosing - and it walks straight into the price-war fear he opened with, so a flexible-but-ROI-minded operator shuts it down.",
    playerDialogue: "One way to get those rooms moving is to bring your rate down a bit here - if you shave a little off your price you'll stop losing those bookings to the competition, and the unsold inventory should start clearing on its own fairly quickly. That's one fix I can point you to today.",
    partnerResponse: "So your answer is 'drop your price' too. I give everyone the same rate for a reason - I'm not starting a price war.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  }
];
var step2Options37 = [
  {
    id: "pg-r17-step2-correct",
    label: "Reframe: peers are capturing the demand",
    description: "SME-prescribed handling of the Money-in-Bank / demand excuse: your sell-through is behind because other properties are capturing the demand. Travelers show interest but drop off right before booking because your search price sits above competitors.",
    playerDialogue: "It's tempting to read it as demand, but your sell-through is behind because other properties are capturing that same demand. Travelers do show interest in you - they just drop off right before booking, because your search price is sitting above your competitors'.",
    partnerResponse: "How much higher? I'm not going to start a price war and slash our rates just to match competitors.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r17-step2-agree-demand",
    label: "Agree it's probably the market",
    description: "Concedes the demand excuse - if it's just a soft market, there's nothing to fix, and the diagnosis stalls before the real segment gap surfaces.",
    playerDialogue: "You could well be right - demand is softer just about everywhere at the moment, so a good part of this is probably just the market cooling off rather than anything on your side. Most properties are feeling the same squeeze, so I'd say we ride it out.",
    partnerResponse: "Good, that's what I thought. So we ride it out until demand picks back up.",
    styleMatch: { red: 0, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -5
  },
  {
    id: "pg-r17-step2-ranking-threat",
    label: "Warn his ranking will keep slipping",
    description: "Turns the gap into a threat - stay priced high and the platform keeps dropping you. Threatening ranking as a consequence of his pricing is off-side in every regime.",
    playerDialogue: "Here's the reality: for as long as you're priced above your peers, the platform is going to keep sliding you further down the search results, and once that slide starts it's hard to pull back. You won't just lose this quarter - you'll lose visibility it took you years to build.",
    partnerResponse: "So drop my price or you sink my ranking. That's not the partnership I signed up for.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -14
  }
];
var step3Options37 = [
  {
    id: "pg-r17-step3-correct",
    label: "Rule out a price war, point to a segment",
    description: "SME-prescribed handling: a price war isn't the recommendation. The overall search price (239 vs a peer median of 249) is competitive; the issue concentrates in specific high-value segments - the goal is to recover conversion and reduce unsold inventory there, not to cut rates across the board.",
    playerDialogue: "A price war isn't what I'd recommend at all. Your overall search price is 239, 5% below the peer median of 249. The issue is not a blanket price gap; it lands hardest on specific high-value segments. The aim is to recover that conversion and reduce your unsold inventory, not to touch your rate everywhere.",
    partnerResponse: "Alright. So where does this gap actually sit in the data?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r17-step3-downplay-gap",
    label: "Wave off the gap as tiny",
    description: "Right that it's not a full price war, wrong emphasis - calling a 5% gap 'barely anything' undersells the very segment problem you need him to act on, and a data-led operator will simply agree it's not worth his time.",
    playerDialogue: "It's only about 5%, so it's really not a big deal in the grand scheme of things - a small nudge here or there would sort it out if you ever fancied it, but I wouldn't lose any sleep over a number that size. Plenty of properties sit around that gap and do perfectly well, so it's very much a take-it-or-leave-it thing.",
    partnerResponse: "If it's that small, then I'll leave it - no point fiddling with my rates over a rounding error.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "pg-r17-step3-match-comp",
    label: "Tell him to match his competitors",
    description: `Answers the "how much?" by telling him to bring his rate down to his competitors'. Requiring a partner to match competitors on price oversteps in every regime.`,
    playerDialogue: "It's about 5% - so the straightforward move is to bring your rate down that 5% and line yourself right up with what your competitors are charging. Once you're matched to them on price the bookings will follow, because there'll be nothing left holding those travelers back from choosing you over the property next door.",
    partnerResponse: "That's the price war I just told you I won't fight. Matching everyone else isn't a strategy.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step4Options35 = [
  {
    id: "pg-r17-step4-correct",
    label: "Name the European family-search gap",
    description: "SME-prescribed diagnosis: the overall search price (239 vs a peer median of 249) is competitive, but European family searches show a higher total because children are currently charged as adults (an extranet misconfiguration), which pushes those bookers to a competitor.",
    playerDialogue: "It's concentrated in European family searches. Your overall search price is 239, below the peer median of 249, but families can still see a higher total because children are currently being charged as adults. That family-search configuration is what pushes those bookers toward a competitor.",
    partnerResponse: "Sorry Diego, I thought we already worked on the family segment to make the property attractive for families - it's a high-spending, growing segment. Is that still not working properly?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r17-step4-vague-segment",
    label: `Say it's "various segments"`,
    description: "Right that it's segment-specific, wrong precision - 'it's spread across a few segments' denies a data-led operator the one concrete, fixable target and sounds like hedging.",
    playerDialogue: "It's hard to pin down to one single thing - it's really spread across a few different traveler segments where you're coming up a bit more expensive than your peers. Broadly speaking you're just a little less competitive than you'd ideally want to be, so it's more of a general pattern than one specific gap I can point to.",
    partnerResponse: "'A few segments' and 'broadly' doesn't give me anything to act on. Where exactly is the money going?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "pg-r17-step4-blame-him",
    label: "Blame him for a sloppy setup",
    description: "Right that there's a config issue, wrong delivery - framing it as his team's carelessness puts a collaborative partner on the defensive instead of teaming up on the fix.",
    playerDialogue: "Frankly, this is exactly the sort of setup your own team really should have caught long before now - your family rates are a bit of a mess, and that carelessness has quietly been costing you bookings for quite a while. A closer eye on the extranet configuration would have flagged it long ago.",
    partnerResponse: "A mess? We put real work into that setup. I don't appreciate the tone.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step5Options34 = [
  {
    id: "pg-r17-step5-correct",
    label: "Clarify it's the missing EEA country rate",
    description: "SME-prescribed handling: it's not the family rates alone - the gap is driven by the missing EEA Country Rate, which is the market most of these families are booking from right now.",
    playerDialogue: "Exactly. The family rates themselves aren't the issue here. The gap is that the EEA Country Rate isn't switched on, even though the EEA is where many of these families are booking from. Activating it would make your price more competitive for those searches and help you capture more of that demand.",
    partnerResponse: "That makes sense from a data perspective. But a 12% gap is quite high - how do we close it without applying higher discounts?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "pg-r17-step5-just-family-rate",
    label: "Say the family rate fix alone will do it",
    description: "Right that families are the segment, wrong root cause - pinning it all on the family-rate setup misses the missing EEA country rate, so the fix he'd make wouldn't actually close the gap.",
    playerDialogue: "You've basically got it already - just go back and re-check your family rate configuration end to end, make sure the child settings are right, and that on its own should be enough to close the whole gap. Once the family setup is clean I'd expect those European bookers to start converting again.",
    partnerResponse: "We've been over the family config already, though. If that were the whole story, wouldn't it be fixed by now?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "pg-r17-step5-deep-discount",
    label: "Suggest a deep EEA discount to force it",
    description: "Right market, wrong dose - reaching for a large blanket EEA discount to 'guarantee' the gap closes is exactly the higher-discount move he's trying to avoid, and overshoots the targeted tool.",
    playerDialogue: "The safest way to be really sure is to put a solid discount across the whole EEA market - not a targeted tweak but a proper blanket cut for that region. If you go big enough on it, the gap closes for certain and you don't have to worry about whether it was quite enough.",
    partnerResponse: "That's the higher-discount route I just said I want to avoid. There must be a smarter way than that.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  }
];
var step6Options16 = [
  {
    id: "pg-r17-step6-correct",
    label: "Explain the non-stacking logic and close",
    description: "SME-prescribed close: it's easier than it looks. He already runs a mobile rate (a 10% mobile discount), and Country Rates don't stack with it - so an EEA Country Rate simply opens the same door to European families booking on desktop, at the same discount, with nothing added on top. He can still fence it by dates, rate plans or minimum stays.",
    playerDialogue: "It's easier than it seems. You already run a mobile rate - a 10% discount on mobile bookings - and Country Rates don't stack with it. So an EEA Country Rate just opens the same door to European families booking on desktop, at the same discount, with nothing added on top. And you can still fence it by stay dates, rate plans or minimum stays. Let's switch it on and review the European family recovery next time.",
    partnerResponse: "Ok, now it's clearer - and I got very good results from that mobile rate, so I'll give this a try too. Let's monitor it and see you next time.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "pg-r17-step6-stack-scare",
    label: "Gloss over how it interacts with the mobile rate",
    description: "He's cost-conscious about stacking discounts - not explaining that Country Rates don't stack with his mobile rate leaves the exact worry ('am I doubling my discount?') unanswered, and a data-led operator won't switch it on blind.",
    playerDialogue: "Just go ahead and switch the Country Rate on - I wouldn't worry too much about how it interacts with your mobile rate or any of your other rates, it tends to sort itself out once it's live. Plenty of partners just turn it on and monitor the results from there rather than getting bogged down in the mechanics up front. Get it live, keep an eye on the European family bookings, and we can always fine-tune it later if anything looks off.",
    partnerResponse: "'Don't worry about it' is how I end up double-discounting. Does it stack with my mobile rate or not?",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "pg-r17-step6-widen-now",
    label: "Push to widen it past the EEA immediately",
    description: "Uses the opening to reach for more - roll the Country Rate out to every market now. Overshoots the targeted EEA-family fix and reopens the blanket-discount worry.",
    playerDialogue: "Great - and let's not stop at the EEA while we've got the momentum. If a Country Rate works for European families, there's no reason to keep it boxed in there - let's roll country rates out across every one of your source markets at once, top to bottom, so we really move the numbers this quarter instead of nudging one segment. Switch the whole lot on together and you'll see a much bigger swing than tinkering with just the EEA on its own.",
    partnerResponse: "Slow down - I agreed to try the EEA one for the family gap, not to discount every market at once.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var steps7 = [
  {
    id: "open",
    label: "Set the OTA noise aside, open on the signal",
    partnerPrompt: "Good afternoon, Diego. Yes, I have our PMS open. But to be frank, I'm still dealing with a lot of noise from other OTAs complaining about price competitiveness, even though I give everyone the exact same rate. That really bothers me given the operational effort it takes. I hope you're not bringing the same thing here...",
    options: step1Options35
  },
  {
    id: "demand-excuse",
    label: `Handle "it's just demand"`,
    partnerPrompt: "21% unsold inventory... Let's look at the broader picture, Diego. Our page views are positive, and when guests land on our page our conversion is solid. If our sell-through is slow, isn't that just a consequence of the general drop in demand?",
    options: step2Options37
  },
  {
    id: "price-war",
    label: "Handle the price-war fear",
    partnerPrompt: "How much higher? I'm not going to start a price war and slash our rates just to match competitors.",
    options: step3Options37
  },
  {
    id: "family-gap",
    label: "Locate the gap in family searches",
    partnerPrompt: "Alright. So where does this gap actually sit in the data?",
    options: step4Options35
  },
  {
    id: "eea-country-rate",
    label: "It's the missing EEA country rate",
    partnerPrompt: "Sorry Diego, I thought we already worked on the family segment to make the property attractive for families - it's a high-spending, growing segment. Is that still not working properly?",
    options: step5Options34
  },
  {
    id: "close",
    label: "The non-stacking Country Rate + close",
    partnerPrompt: "That makes sense from a data perspective. But a 12% gap is quite high - how do we close it without applying higher discounts?",
    options: step6Options16
  }
];
function palaceGrandR17(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 17,
    issueTreePath: palaceGrandR7IssueTreePath,
    openingAm: openingAm19,
    steps: steps7
  };
}

// src/data/scenarios/hidden-valley-r18.ts
var openingAm20 = "Good morning, Claire. It's a pleasure speaking with you again. I hope you've had a productive week.";
var step1Options36 = [
  {
    id: "hv-r18-step1-correct",
    label: "Ask her priorities and how she's performing",
    description: "SME-prescribed open: rather than pitch, ask her to frame her forward priorities and overall performance first, so the diagnosis lands against her own goals.",
    playerDialogue: "Exactly. I've pulled some data to see how we can support your goals. To start - when you review your performance for the upcoming 90 days, what are your priorities, and how are you performing overall?",
    partnerResponse: "Well, Oliver, our main directive from head office remains the same: protect our ADR and keep our website the core channel for guest acquisition. We track revenue closely and keep price consistency across platforms. That's our long-term brand strategy, and right now it's paying off - we're in line with expectations.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "hv-r18-step1-lead-problem",
    label: "Open with the problem you found",
    description: "Right data, wrong sequence - leading with 'here's what's wrong' before inviting a brand-bound Revenue Manager to frame her own priorities skips the alignment that makes her receptive.",
    playerDialogue: "Let's get straight to it, Claire - I've pulled the data together and found a clear performance gap for future check-in months that we can focus on for today. Your bookings are pacing behind from where they could be.",
    partnerResponse: "Behind by what measure? Our reporting says we're meeting our targets. I'd want to understand your framing before I accept 'a gap'.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -3
  },
  {
    id: "hv-r18-step1-cut-adr",
    label: "Suggest loosening the ADR discipline",
    description: "Opens by nudging her off the one thing head office mandates - protecting ADR. It's dead on arrival for a brand-bound partner and marks you as not listening.",
    playerDialogue: "One win here would be to ease off that strict ADR discipline a little and let your prices flex downward where demand looks soft. Loosen the floor a touch and the bookings should start following through.",
    partnerResponse: "Protecting ADR is a head-office directive, not a preference. That's simply not on the table, Oliver.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  }
];
var step2Options38 = [
  {
    id: "hv-r18-step2-correct",
    label: "Present the forward gap and last-quarter unsold",
    description: "SME-prescribed handling: on Booking.com over the next three months her sell-through is pacing about 8% behind her peer group, and over the last 90 days 24% of rooms went unsold - inventory that emptied out in the end.",
    playerDialogue: "Thank you for sharing. Looking at your metrics here over the next three months, your sell-through is pacing behind your peer group. And looking back over the last 90 days, around 24% of your rooms went unsold - inventory that emptied out in the end.",
    partnerResponse: "24% unsold rooms... let's put that in context, Oliver. Our reports show our revenue goals are being met, past and future. If our volume on OTAs is somewhat lower, that's a trade-off we accept. We'd rather hold our price positioning than sell 100% of inventory.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "hv-r18-step2-inflate",
    label: "Frame the unsold rooms as alarming",
    description: "Right metric, wrong pitch - dramatizing 24% unsold as a crisis invites a data-led Revenue Manager to counter with her own on-target reporting and dismiss the framing.",
    playerDialogue: "24% unsold is a serious amount of lost revenue, Claire - that's the kind of number that should really be setting off alarms on your side. Rooms sitting empty like that is money you never get back, and I'd expect it to be worrying your team.",
    partnerResponse: "Our reporting isn't alarmed, because we're on target. I'd rather look at facts than adjectives.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "hv-r18-step2-vague",
    label: 'Say performance is "underwhelming"',
    description: "Right direction, no evidence - a soft 'you could be doing better' without the sell-through and unsold figures gives a numbers-first partner nothing to engage with.",
    playerDialogue: "The honest picture is that your performance here has been a bit underwhelming lately - there's clearly more you could be getting out of the channel than you are right now. I really think you've been leaving opportunity on the table these last few months.",
    partnerResponse: "'Underwhelming' against what? Give me the actual figures or there's nothing to discuss.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  }
];
var step3Options38 = [
  {
    id: "hv-r18-step3-correct",
    label: "Share the visibility and search-price gap",
    description: "SME-prescribed handling of the Money-in-Bank trade-off: there's still room to improve. Two metrics - her visibility share is 21% vs 28% for her peer group, and the search price travelers see is 175 vs a peer median of 159.",
    playerDialogue: "I hear you, and it's a fair trade-off to weigh. But there's still room to improve. Two metrics worth sharing: your visibility share is 21%, compared with 28% for your peer group, and the search price travelers see is 175, compared with a peer median of 159.",
    partnerResponse: "10% more expensive than competitors. But Oliver, as we discussed, when automated programs like the Booking Sponsored Benefit kick in to adjust the price, it feels like we lose control of our own strategy. I don't want guests seeing us as an 'affordable' option or booking purely on price.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "hv-r18-step3-just-visibility",
    label: "Cite the visibility drop only",
    description: "Right that visibility lags, incomplete - naming the visibility gap without the 10% search-price cause leaves a data-led partner unable to connect the symptom to anything she can act on.",
    playerDialogue: "The main thing is that your visibility share here is sitting behind your peer group - travelers aren't seeing you in their search results as often as they should be, and to my mind that's the real issue we need to be focused on solving today.",
    partnerResponse: "And why would that be? Visibility doesn't drop for no reason - what's actually driving it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -3
  },
  {
    id: "hv-r18-step3-affordable-push",
    label: "Tell her to embrace being the cheaper option",
    description: "Right that price affects visibility, wrong angle - telling a premium-positioning brand to lean into being 'the affordable choice' hits the exact fear she voiced and reads as tone-deaf to her strategy.",
    playerDialogue: "Being seen as the more affordable option here wouldn't be a bad thing at all - if you lean into it and let travelers find you at a keener price, the extra bookings will follow and start filling those empty rooms in no time at all.",
    partnerResponse: "That's the opposite of everything our brand stands for. I explicitly don't want to be the 'affordable' option.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -6
  }
];
var step4Options36 = [
  {
    id: "hv-r18-step4-correct",
    label: "Clarify BSB honestly",
    description: "SME-prescribed handling: acknowledge her reputation concern, then clarify what BSB does - it improves conversion by increasing competitiveness, it isn't applied to all her bookings, and her revenue is untouched because it's funded by Booking.",
    playerDialogue: "I hear the concern - you've built a reputation and no one wants their asset devalued. Let me clarify the Booking Sponsored Benefit: its whole point is to improve your conversion by making you more competitive on the platform. It isn't applied to all your bookings, and your revenue stays untouched, because it's funded by us, not you.",
    partnerResponse: "Even so - if that program is already funding a discount, why should I consider adjusting our rates or joining additional campaigns?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "hv-r18-step4-dismiss-concern",
    label: "Tell her the control worry is unfounded",
    description: "Right that BSB is benign, wrong delivery - flatly telling a control-minded Revenue Manager her concern is 'nothing to worry about' without explaining the mechanism dismisses a real objection instead of resolving it.",
    playerDialogue: "Claire, there's really nothing at all to worry about with that program - it just quietly works away in the background and you'll barely notice that it's running. I genuinely wouldn't give it a second thought if I were you; it's the last thing on your list that should be keeping you up at night.",
    partnerResponse: "It's adjusting the price travelers see. 'Don't give it a second thought' is not reassuring to someone accountable for our positioning.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -4
  },
  {
    id: "hv-r18-step4-overstate-bsb",
    label: "Oversell BSB as a guaranteed fix",
    description: "Answers her worry by promising BSB alone guarantees her visibility back - an overpromise that a data-led partner will test against the numbers, and that ignores the residual 10% gap.",
    playerDialogue: "Just lean on the Booking Sponsored Benefit here - it'll carry your visibility all the way back on its own, guaranteed, so there's genuinely nothing else you'd need to lift a finger on. Let that program do the heavy lifting for you and you'll be level with your peers again before you know it, no further changes needed.",
    partnerResponse: "If it fully solved it, my visibility wouldn't still be behind, would it? That doesn't add up.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  }
];
var step5Options35 = [
  {
    id: "hv-r18-step5-correct",
    label: "Show the residual gap, propose a targeted mobile rate",
    description: "SME-prescribed handling: even with BSB, her search price is still 175 vs a peer median of 159, which likely caps her visibility and loses travelers at search. Propose a targeted tool rather than a general cut - a mobile rate, since over 60% of searches are on mobile, applying a closed incentive only to mobile searchers.",
    playerDialogue: "Even with that program, your search price is still 175, compared with a peer median of 159, which likely caps your visibility - travelers compare and finish the booking elsewhere, and an empty room is a missed opportunity. Rather than a general rate cut, we'd use a targeted tool: a mobile rate. Over 60% of searches come from mobile, and it applies a closed incentive strictly to mobile searchers.",
    partnerResponse: "Hmm, when you frame it around uncaptured search traffic, I see the logic. A targeted mobile adjustment... oh, sorry - actually we're not allowed to do that, it's against our brand rules and we could be fined. Is there another targeted deal we could use instead?",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "hv-r18-step5-general-cut",
    label: "Propose a general rate reduction after all",
    description: "Right that she needs to close the 10% gap, wrong instrument - a general reduction is the ADR hit head office forbids, so it's dead on arrival with a brand-bound partner.",
    playerDialogue: "The cleanest way to close that 10% is a modest general reduction on your rates here - just enough to bring the price travelers see in search back into line with your peer group. Bring everything down a notch across the board and the gap closes on its own, without any of the fiddly targeted setups you'd otherwise have to manage afterwards.",
    partnerResponse: "A general reduction hits our ADR, which head office strictly prohibits. That's exactly what I can't do.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "hv-r18-step5-guarantee",
    label: "Promise the mobile rate guarantees her visibility back",
    description: "Sells the mobile rate with a guaranteed visibility/ranking return for discounting - a promise of ranking reward in exchange for a price move, which breaches compliance in every regime.",
    playerDialogue: "Switch on a mobile rate here and I can promise your visibility jumps straight back up the results pages - the incentive effectively buys you that placement, guaranteed. Put the discount in front of mobile searchers and the platform rewards you with the ranking you're missing, so the position you want is locked in the moment you turn it on.",
    partnerResponse: "A guaranteed placement bump for a discount? That kind of promise makes me trust the rest less, not more.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step6Options17 = [
  {
    id: "hv-r18-step6-correct",
    label: "Suggest she verify, then optimize existing deals",
    description: "SME-prescribed close: suggest she double-check the mobile-rate rule with head office (it doesn't read as a blocker in your records), and in the meantime recover visibility by optimizing her existing deals - her early and last-minute deals are set to non-refundable only with a very limited booking window.",
    playerDialogue: "I'd double-check that rule with head office, honestly - it doesn't read as a blocker in my records. But to recover visibility quickly in the meantime, why don't we optimize the deals you already run? Your early and last-minute deals are currently set to non-refundable only, with a very limited booking window - loosening that would help without touching your ADR.",
    partnerResponse: "I didn't realize they were so restricted. Let's make the flexible rate more attractive and extend the window travelers can book in. That addresses the visibility gap and keeps us in full control - we run these on a quarterly basis anyway.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "hv-r18-step6-push-mobile",
    label: "Push her to run the mobile rate anyway",
    description: "She's told you the mobile rate risks a fine under her brand rules - pressing her to run it regardless asks her to take on a compliance risk that isn't yours to accept, and ignores a partner who was ready to cooperate.",
    playerDialogue: "Between us, plenty of partners quietly run the mobile rate despite rules like that and it's genuinely fine - I'd just switch it on discreetly at your end and not raise it with head office at all. Nobody is going to come chasing you over one targeted rate, and the visibility you'd win back is well worth stepping around the paperwork for.",
    partnerResponse: "You're asking me to break a brand rule and risk a fine. That's absolutely not happening.",
    styleMatch: { red: -1, yellow: -1, green: -2, blue: -1 },
    assertiveness: 3,
    compliance: "risky",
    trustChange: -13
  },
  {
    id: "hv-r18-step6-defer-vague",
    label: "Leave it with her to check the rules",
    description: "Sends her off to check the rule but offers no compliant move in the meantime - so a partner who was ready to act leaves with nothing to do and the visibility gap stays open.",
    playerDialogue: "I think the best thing here is for you to go away and confirm those rules directly with head office first, then circle back to me once you know exactly what you're permitted to run. There's really no sense in us mapping anything out until you've had that conversation and can tell me where the boundaries actually sit.",
    partnerResponse: "So we do nothing until I've chased that down? I'd hoped to leave today with something I can actually action.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  }
];
var steps8 = [
  {
    id: "open",
    label: "Open partner-led on her priorities",
    partnerPrompt: "Good morning, Oliver. Yes, things are going very well, thank you. Based on our agenda today, I understand we're reviewing our performance for the upcoming quarter.",
    options: step1Options36
  },
  {
    id: "present-gap",
    label: "Present the sell-through + unsold gap",
    partnerPrompt: "Well, Oliver, our main directive from head office remains the same: protect our ADR and keep our website the core channel for guest acquisition. We keep price consistency across platforms, and right now it's paying off - we're in line with expectations.",
    options: step2Options38
  },
  {
    id: "visibility-gap",
    label: "The visibility + search-price gap",
    partnerPrompt: "24% unsold rooms... let's put that in context, Oliver. Our reports show our revenue goals are being met, past and future. If our volume on OTAs is somewhat lower, that's a trade-off we accept. We'd rather hold our price positioning than sell 100% of inventory.",
    options: step3Options38
  },
  {
    id: "clarify-bsb",
    label: "Clarify the Booking Sponsored Benefit",
    partnerPrompt: "10% more expensive than competitors. But Oliver, when automated programs like the Booking Sponsored Benefit kick in to adjust the price, it feels like we lose control of our own strategy. I don't want guests seeing us as an 'affordable' option or booking purely on price.",
    options: step4Options36
  },
  {
    id: "mobile-proposal",
    label: "Residual gap + the mobile-rate proposal",
    partnerPrompt: "Even so - if that program is already funding a discount, why should I consider adjusting our rates or joining additional campaigns?",
    options: step5Options35
  },
  {
    id: "close",
    label: "The compliant workaround + close",
    partnerPrompt: "A targeted mobile adjustment... oh, sorry, I almost forgot - we're not allowed to do that, it's against our brand rules and we could be fined. Is there another targeted deal we can apply instead?",
    options: step6Options17
  }
];
function hiddenValleyR18(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 18,
    issueTreePath: hiddenValleyR8IssueTreePath,
    openingAm: openingAm20,
    steps: steps8
  };
}

// src/data/scenarios/loft-living-r19.ts
var openingAm21 = "Hi Lucas, thanks for taking the time to connect today. I'd love to review your performance together for the upcoming quarter. How's your schedule looking for a brief discussion?";
var step1Options37 = [
  {
    id: "ll-r19-step1-correct",
    label: "Set the leak aside, ask his forward strategy",
    description: "SME-prescribed open, adjusted per review: acknowledge the wholesaler-leak frustration and give a concrete pointer (review the reservations individually to trace the source) rather than brushing it aside, then move to his on-platform performance and ask him to frame his strategy for the next 90 days - keeps the call on ground he controls without dismissing his concern.",
    playerDialogue: "I understand that, Lucas, and I get the frustration. On the wholesale leak itself there's little we can do directly from here - my honest recommendation would be to review those reservations individually to trace where they're coming from. What I can help with today is your performance on our platform: when you look at your inventory over the next 90 days, what's your strategy?",
    partnerResponse: "Our priority is to maximize margins - we're in the middle of peak season. But frankly, forward bookings for the next three months are pacing slower than we'd expect. We're trying to work out why conversion stays low despite solid demand in our destination.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ll-r19-step1-chase-leak",
    label: "Offer to chase the wholesale leak with him",
    description: "Sympathetic but a trap - following him onto the wholesale-leak hunt parks the on-platform conversion problem you can actually fix today and burns the call on ground neither of you controls.",
    playerDialogue: "Let's tackle that leak head-on, Lucas - send me every channel where you're seeing your wholesale rates show up as B2C offers, and I'll work through them to trace who's dumping them and get it shut down before we look at anything else.",
    partnerResponse: "Finally, someone who gets it - if we can trace those rates, that's the real fix. Let's start there.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ll-r19-step1-cut-rates",
    label: "Open by asking him to cut rates",
    description: "Prescribes a rate cut before diagnosing - and a margin-first operator mid-peak-season, already boxed in by a regional-office ban on cuts, rejects it immediately.",
    playerDialogue: "Lucas, your bookings are running slow, so one lever we've got is to bring your rates down here and get you more competitive through the peak - drop the price a bit and the volume should start coming back.",
    partnerResponse: "Cut rates in the middle of peak season? My margins are the priority, and my regional office wouldn't allow it anyway.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -8
  }
];
var step2Options39 = [
  {
    id: "ll-r19-step2-correct",
    label: "Name the sell-through and conversion collapse",
    description: "SME-prescribed handling, adjusted per review (comment 32): state OPC comparisons qualitatively, no exact data points. His portfolio's sell-through is pacing lower than peers, and while demand exists his listings show a severe conversion drop versus the same period last year, with a large share of last month's inventory unsold.",
    playerDialogue: "Looking at the metrics, your portfolio's sell-through is pacing lower than your peer group. Demand exists, but your listings are seeing a severe conversion drop versus the same period last year, and a large share of last month's inventory went unsold. That's a real missed-revenue opportunity.",
    partnerResponse: "That's not reassuring. But since travelers clearly are interested - our page views are well up versus last year - what specifically is stopping them from becoming bookers?",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ll-r19-step2-soften",
    label: "Soften the numbers to spare him",
    description: "Right instinct to keep it collaborative, wrong move - downplaying a 33%-unsold, -50%-conversion collapse robs a margin-focused operator of the urgency the data actually warrants.",
    playerDialogue: "Lucas, it's nothing too dramatic - conversion has dipped a touch and yes there's a bit of unsold inventory sitting there, but broadly you're in reasonable shape for the season and I wouldn't lose sleep over it. Let's not blow it out of proportion when your wholesale headache is the bigger fire to put out right now.",
    partnerResponse: "A touch? If it's minor, then I won't prioritize it over the wholesale problem that's actually eating my margin.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ll-r19-step2-blame-leak",
    label: "Agree the leak is causing it all",
    description: "Right that conversion is the problem, wrong cause - blaming it all on the wholesale leak validates his opener but misses the on-platform search-price gap that's the real, fixable driver.",
    playerDialogue: "Lucas, this conversion drop is almost certainly your wholesale leak biting - once those cheaper rates are floating around the web as B2C offers, travelers see them and hold off booking with you here, waiting to see if the price falls further. Sort the leak and I'd expect a lot of this conversion softness to ease.",
    partnerResponse: "So it IS the leak. Then there's nothing I can do on your platform until that's solved, right?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -4
  }
];
var step3Options39 = [
  {
    id: "ll-r19-step3-correct",
    label: "Show the visibility and search-price drop-off",
    description: "SME-prescribed diagnosis: his visibility share is 8% vs 23% for his peer group, and his search price averages 67 vs a peer median of 60 - so travelers see him much less, and when they do the offer isn't attractive, so volume drops.",
    playerDialogue: "Let's look at exactly where users drop out. Your visibility share is 8%, compared with 23% for your peer group, and your search price averages 67, versus a peer median of 60. So travelers see you less than your peers, and when they do, the offer isn't attractive enough - which is quietly dragging down your volume.",
    partnerResponse: "Hmm, got it. But my regional office won't allow rate cuts, especially with all the noise from those leaked wholesale rates.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ll-r19-step3-visibility-only",
    label: "Point only to the visibility drop",
    description: "Right that visibility lags, incomplete - the visibility gap without the 12% search-price cause leaves a data-led operator unable to see the lever, so he can't act on it.",
    playerDialogue: "The core issue here is that your visibility share is steadily falling behind your peer group - travelers just aren't seeing your listings often enough when they search, and every time you slip down that ranking you lose another slice of demand, which is what's quietly dragging your whole volume down month after month.",
    partnerResponse: "And what's causing the visibility to fall? There's always a lever behind it - what's mine?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -3
  },
  {
    id: "ll-r19-step3-match-price",
    label: "Tell him to price to his peers",
    description: "Turns the 12% gap into a requirement to bring his price down to his peers - a price-match demand that oversteps in every regime and walks into the regional-office ban.",
    playerDialogue: "The fix here is straightforward, Lucas: your search price is running a full 12% over what your peers are charging, so you really just need to bring it right down to match their level across the board, and once your pricing lines up with theirs the volume will come straight back to you.",
    partnerResponse: "Match my peers' pricing? My regional office has banned exactly that, and I'm not fighting them on it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -12
  }
];
var step4Options37 = [
  {
    id: "ll-r19-step4-correct",
    label: "Reassure, then zoom into mobile",
    description: "SME-prescribed handling of the Regional Office Shield: make clear you're not asking him to challenge head-office policy, then narrow to device - over the next three months his search price on mobile is running about 18% higher than peers.",
    playerDialogue: "I'm not asking you to challenge your head-office policy at all. Let's identify what's driving the higher search price and which factors are having the biggest impact, then see what we can do without going against that policy. When we break it down by device over the next three months, your search price on mobile is running about 18% higher than your peers.",
    partnerResponse: "We're 18% more expensive on mobile? Why is that happening specifically there?",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "ll-r19-step4-push-policy",
    label: "Push him to take it up with head office",
    description: "Right that the gap needs closing, wrong ask - telling him to go challenge the regional-office ban pushes him into an internal fight he's told you he won't have, instead of the device-level fix that sidesteps it entirely.",
    playerDialogue: "The way through this is that you'll need to go back to your regional office and make the case to lift that ban - the numbers are firmly on your side here, so I'd really push them hard on it and don't take no for an answer until they've heard the full picture.",
    partnerResponse: "You clearly weren't listening. I'm not going to war with my regional office over this.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  },
  {
    id: "ll-r19-step4-generic-gap",
    label: "Restate the overall 12% gap",
    description: "Right data, no progress - repeating the whole-portfolio 12% gap after he's raised the policy wall misses the device-specific angle that would let him act without touching his headline rate.",
    playerDialogue: "Well, the headline is still that same 12% gap right across the board, Lucas - that's really the thing that's holding your whole performance back here, and until we get that overall number moving in the right direction I don't see the rest of it improving much either.",
    partnerResponse: "You've said that already, and I've told you the policy won't let me move my headline rate. Where does that leave us?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -3
  }
];
var step5Options36 = [
  {
    id: "ll-r19-step5-correct",
    label: "Explain the mobile-rate exclusions",
    description: "SME-prescribed handling: his basic mobile discount is active, but exclusions on weekends and longer booking windows mean over 70% of mobile searches don't match the incentive - and the data shows an 80% drop-off in mobile conversions versus his peer group.",
    playerDialogue: "Your basic mobile discount is active - but it excludes weekends and longer booking windows, so over 70% of mobile searches don't actually match the more competitive rate. The result is a marked drop-off in mobile conversions compared to your peer group. The discount is there; it's just not reaching the potential searches.",
    partnerResponse: "That's a big loss. But if we adjust the mobile setup, doesn't that risk cannibalizing our desktop rates?",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "ll-r19-step5-vague-mobile",
    label: 'Say his mobile setup is "not optimized"',
    description: "Right area, no mechanism - 'your mobile setup isn't optimized' without the weekend/window exclusions and the 80% drop-off gives a numbers-led operator nothing precise to correct.",
    playerDialogue: "The short version, Lucas, is that your mobile setup just isn't optimized the way it should be - there's clearly a good chunk of performance being left on the table on mobile compared to where it could sit, and it's dragging on your wider numbers. It's an area I'd definitely get someone to take a proper look at.",
    partnerResponse: "Not optimized how? I need to know what's actually misconfigured before I touch it.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "ll-r19-step5-deepen-discount",
    label: "Tell him to deepen the mobile discount",
    description: "Right that mobile is the lever, wrong fix - deepening the discount doesn't help when the problem is that 70% of searches are excluded from it; it just gives away more margin on the searches that already qualify.",
    playerDialogue: "One move here is just to increase your mobile discount, Lucas - push the mobile price down a good bit further so that travelers browsing on their phones see a sharper deal and start converting the way they should. Make the discount deep enough and the mobile numbers will look after themselves.",
    partnerResponse: "Give away even more margin? In peak season? That's the last thing I want to do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  }
];
var step6Options18 = [
  {
    id: "ll-r19-step6-correct",
    label: "Explain it extends existing country rates, then close",
    description: "SME-prescribed close (adjusted per review, comment 36): mobile rates are opaque to desktop searchers, so there's no cannibalization of his desktop/direct rate. Extending the mobile rate reaches the mobile searchers currently excluded by the weekend and long-window carve-outs, recovering the drop-off. (Note: the mobile rate stacks with his country rates, so avoid claiming it is the 'same competitive rate / not deeper' for those bookers.)",
    playerDialogue: "Not at all - mobile rates aren't visible to desktop searchers, so your desktop rate stays untouched. This simply reaches the mobile searchers who slip through today. Let's set it up and review the mobile recovery together.",
    partnerResponse: "Ok, that's clear. Honestly I lose my mind keeping up with all the promotions and stacking, but the logic makes sense - let's reconnect in two months to see the impact of the mobile rate.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "ll-r19-step6-dismiss-worry",
    label: "Wave off the cannibalization worry",
    description: "Right conclusion, no evidence - telling a data-led operator 'don't worry, it won't cannibalize' without the opaque-to-desktop mechanism leaves his specific concern unanswered.",
    playerDialogue: "Lucas, I wouldn't overthink the cannibalization on this one - in my experience it basically never happens in practice, and I've seen plenty of partners switch a mobile rate on without any drama at all on their desktop side. So I'd just go ahead and flip the mobile rate on, then keep an eye on how it lands over the first few weeks.",
    partnerResponse: "'It basically never happens' isn't the reasoning I need before I touch my desktop revenue. Why won't it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "borderline",
    trustChange: -4
  },
  {
    id: "ll-r19-step6-upsell-stack",
    label: "Push to stack extra promotions on top",
    description: "Uses the opening to pile on more - stack campaigns and deals on top of the mobile rate. Overwhelms a partner already frustrated by stacking complexity and muddies a clean, targeted fix.",
    playerDialogue: "Perfect - and while we're at it, Lucas, let's not stop at just the mobile rate. Let's stack a couple of campaigns and a targeted deal right on top of it as well, layer in a genius offer where we can, and really maximize the whole push across every channel we've got. The more we pile on together now, the harder your mobile numbers will work for you this season.",
    partnerResponse: "I just told you I'm drowning in stacked promotions. Piling more on is the opposite of what I need.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -5
  }
];
var steps9 = [
  {
    id: "open",
    label: "Set the wholesaler noise aside, probe strategy",
    partnerPrompt: "Hello. I'm ready, thanks! To be completely honest, I'm still struggling with those wholesale rates ending up online as B2C offers. What does your internal data show us right now?",
    options: step1Options37
  },
  {
    id: "present-gap",
    label: "Present the severe conversion gap",
    partnerPrompt: "Our priority is to maximize margins - we're mid peak season. But frankly, forward bookings for the next three months are pacing slower than we'd expect, and we're trying to work out why conversion stays low despite solid demand.",
    options: step2Options39
  },
  {
    id: "drop-off",
    label: "Locate the drop-off",
    partnerPrompt: "That's not reassuring. But since travelers clearly are interested - our page views are well up versus last year - what specifically is stopping them from becoming bookers?",
    options: step3Options39
  },
  {
    id: "device-specific",
    label: "Go device-specific (no policy challenge)",
    partnerPrompt: "Hmm, got it. But my regional office won't allow rate cuts, especially with all the noise from those leaked wholesale rates.",
    options: step4Options37
  },
  {
    id: "mobile-config",
    label: "Explain the mobile misconfiguration",
    partnerPrompt: "We're 18% more expensive on mobile? Why is that happening specifically there?",
    options: step5Options36
  },
  {
    id: "close",
    label: "Handle cannibalization + close",
    partnerPrompt: "That's a big loss. But if we adjust the mobile setup, doesn't that risk cannibalizing our desktop rates?",
    options: step6Options18
  }
];
function loftLivingR19(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 19,
    issueTreePath: loftLivingR9IssueTreePath,
    openingAm: openingAm21,
    steps: steps9
  };
}

// src/data/scenarios/noble-falcon-r20.ts
var openingAm22 = "Good morning, Adam. Thanks for taking the time to reconnect today. Why don't we go straight to the data together?";
var step1Options38 = [
  {
    id: "nf-r20-step1-correct",
    label: "Frame July as the opportunity, name the paradox",
    description: "SME-prescribed open: demand is strong and his page views prove it - July is his biggest opportunity of the year. But performance is below peer: search price 73 vs a peer median of 86, visibility share 15% vs 16% for peers, and conversion running lower than peers. Ask him why he thinks the property isn't capturing that demand.",
    playerDialogue: "Your demand picture is strong - page views are running 26% above peers, and forward room nights for the next three months are 81% above. July is clearly your biggest window of the year. Where I'd want us to look together is a gap underneath that: your search price is 73, compared with a peer median of 86, which should be converting well, but your conversion is running lower than your peer group and your visibility share is 15%, compared with 16% for your peer group. Somewhere in between the search-to-booking funnel guests are being lost and not converting to an actual booking. What's your read on why that might be?",
    partnerResponse: "Well, I'm not sure... July is traditionally our highest-demand month, so expectations are high. Total revenue is steady, but frankly our pickup for the second half of the month feels slow versus last year. Our benchmarking says our search price is 73, compared with a peer median of 86. If the price is that competitive, why is our conversion not in line with our visibility?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "nf-r20-step1-drop-more",
    label: "Tell him to drop his price further",
    description: "Reaches for the price lever before diagnosing - and he's already 15% below peers, so 'go cheaper' is both the wrong lever and easy for a data-led manager to see through.",
    playerDialogue: "Your conversion's on the low side, so one move here is to get you more competitive still - bring your headline rate down a notch, maybe test a small reduction across your main room types, and I'd expect the bookings to start following once you're clearly the cheapest option travelers see.",
    partnerResponse: "We're already 15% below our peers. If price were the issue, we'd be converting - so cutting further makes no sense to me.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "borderline",
    trustChange: -7
  },
  {
    id: "nf-r20-step1-generic-praise",
    label: "Open with generic reassurance",
    description: "Warm but empty - opening with 'everything looks great, keep it up' on his biggest month of the year wastes the opportunity and gives a results-minded manager nothing to work with.",
    playerDialogue: "Adam, from where I'm sitting things are looking really solid on your end - the numbers are steady, the property's ticking along nicely, and I didn't want to overcomplicate a good month. I mostly just wanted to check in, say it's great to reconnect, and tell you to keep doing exactly what you're doing.",
    partnerResponse: "I appreciate it, but our pickup is slow for a peak month. I'd rather use this time to find out why than hear it's all fine.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -3
  }
];
var step2Options40 = [
  {
    id: "nf-r20-step2-correct",
    label: "Show the family search you ran",
    description: "SME-prescribed diagnosis: his headline price looks competitive, but a granular segment breakdown reveals a gap. Searching the property as a family would (2 adults and a four-year-old), the recommended option came back as two premium double rooms - two rooms for a small family.",
    playerDialogue: "That's exactly the question I wanted to dig into. Your price is competitive, so that does not seem to be the issue causing the low conversion rate. When I searched your property the way a family would, two adults and a four-year-old, I saw something interesting; the recommended option that came back was two premium double rooms. Two rooms, for a small family of 3.",
    partnerResponse: "How is that possible? Our rates across all room types are mapped consistently from our channel manager.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "nf-r20-step2-abstract",
    label: "Talk about segments in the abstract",
    description: "Right that it's segment-level, wrong delivery - describing 'a gap in certain segments' without the concrete family search he can reproduce himself denies a data-led manager the proof that makes it land.",
    playerDialogue: "When you look below the headline, there's a competitiveness gap hiding in some of your traveler segments - it's the kind of thing that never shows up in the blended average, so on paper everything reads fine, but underneath, certain guest types are seeing a very different price to the one you think you're offering. It's definitely there once you go segment by segment.",
    partnerResponse: "Which segments, and how would I even see it? 'It's there' isn't something I can act on.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "nf-r20-step2-blame-cm",
    label: "Blame his channel manager",
    description: "Jumps to blaming his channel-manager setup before diagnosing - it presumes the cause, and a manager proud of his consistent mapping will defend rather than explore.",
    playerDialogue: "This will almost certainly be your channel manager pushing bad rates across - in my experience those integrations are nearly always the culprit when the numbers look off in exactly this way. The mapping drifts, a rule gets applied wrong somewhere in the sync, and suddenly the rates travelers see aren't the ones you set. I'd start by pulling apart that connection first.",
    partnerResponse: "Our channel manager maps everything consistently. I'd want evidence before we pin it on that.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -4
  }
];
var step3Options40 = [
  {
    id: "nf-r20-step3-correct",
    label: "Name the child-age misconfiguration",
    description: "SME-prescribed handling: it's a configuration gap, as discussed last time. Child age categories are currently misconfigured in the extranet, so the platform automatically charges children as adults - which is what forces the two-room recommendation.",
    playerDialogue: "The channel manager mapping is consistent and this isn't a rate issue. It's a configuration gap in the Extranet: your child age categories aren't set up correctly, so the platform charges children as adults. That's what pushes a small family into two rooms instead of one. You can see it yourself by running that same family search: two adults, one child aged four.",
    partnerResponse: "I see. I thought I'd been quite strict about the family configuration, but I didn't realize it was like this - I've honestly never searched as a specific guest type like a couple or a family. That's a good tip, actually.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "nf-r20-step3-jargon",
    label: "Explain it in dense configuration terms",
    description: "Right cause, wrong delivery - walking a partner who's clearly receptive through occupancy codes and age-bucket mapping buries a simple, welcome insight in complexity he didn't ask for.",
    playerDialogue: "It's down to your occupancy derivation logic - the age-bucket boundaries aren't mapping cleanly onto the child-rate tiers, so the pax-split defaults to an adult headcount on the room-yield calculation, the occupancy ceiling trips, and it cascades the request into a two-room derivation.",
    partnerResponse: "You've lost me. Can you just tell me plainly what's wrong and what I fix?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: 0 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -2
  },
  {
    id: "nf-r20-step3-just-discount-family",
    label: "Suggest a family discount to compensate",
    description: "Right segment, wrong fix - adding a family discount to offset a broken configuration gives away margin to paper over a setup error, instead of correcting the config that's inflating the family price.",
    playerDialogue: "One patch here is to layer a family discount on top of your existing rates, so the price families actually see drops back down to something attractive and they start booking again. You could set it live today with no config work needed, and let the reduced family price do the work.",
    partnerResponse: "Discount to cover a setup error? I'd rather fix whatever's actually broken than give away margin.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -3
  }
];
var step4Options38 = [
  {
    id: "nf-r20-step4-correct",
    label: "Credit the self-search habit, size the loss",
    description: "SME-prescribed handling: reinforce that the search page is the best source for seeing how guests perceive the property from every angle, and frame the stakes - family bookers are among the highest-spending segments in peak season, the perfect audience for the back half of July.",
    playerDialogue: "It's a useful habit to search your own property the way different guest types would. This matters commercially: family bookers tend to be among your highest-spending segments during peak season. For the back half of July, they're exactly the audience you want to be capturing this time of year and not losing to a competitor whose family setup is correct and therefore converting the family searches you are potentially missing. Do you have a sense on what impact on multi-occupancy pickup has been?",
    partnerResponse: "That would explain the drop-off we've seen in multi-occupancy room pickup, too. Do you know what the impact of the correct setup would be?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 6,
    optimal: true
  },
  {
    id: "nf-r20-step4-move-on",
    label: "Move on without sizing it",
    description: "Right that the fix is clear, but skipping past why it matters - a commercially-minded manager wants the family segment's value named before he prioritizes the work over everything else on his plate.",
    playerDialogue: "Great, so that's the fix identified - just correct the child categories in the extranet and the two-room problem goes away on its own. I'd say we've got what we came for, so let's not overthink it - I'll make a note to check the setup's gone through, and then we can move on to the next thing on the list.",
    partnerResponse: "Before we move on - how much is this actually worth? I need to know it's worth prioritizing.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -3
  },
  {
    id: "nf-r20-step4-overpromise",
    label: "Promise it will transform his ranking",
    description: "Oversells the fix with a guaranteed ranking transformation - a promise of placement reward that a data-led manager distrusts and that overshoots the concrete, honest impact.",
    playerDialogue: "Fix this one thing and I can promise you it transforms your ranking overnight - the moment those family searches resolve properly, you'll rocket straight up the results, leapfrog the peers sitting above you, and stay planted there for the rest of peak season. This is the change that puts you top of the page and keeps you there.",
    partnerResponse: "'Rocket up overnight' sounds like a sales line. I'd trust a real number over a promise like that.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -9
  }
];
var step5Options37 = [
  {
    id: "nf-r20-step5-correct",
    label: "Give the concrete number, then how to sustain it",
    description: "SME-prescribed handling: closing the gap specifically for family searches could mean an immediate pickup of roughly 45 additional room nights next month. To sustain it, correct family rates year-round - and think about advance-booking families at the end of the season who could become repeat guests next year.",
    playerDialogue: "Based on the family search volume in your market, closing that configuration gap could immediately mean 45 additional room nights next month. To capture current demand, this would be critical for the rest of the July peak. To sustain it beyond July, keeping the family age categories correctly configured year-round remains important, as families tend to book ahead toward the end of the season. By ensuring your availability is open and your family pricing is correctly set, you can start capturing next year's peak-season demand, as we often see families booking ahead and becoming repeat bookers.",
    partnerResponse: "That's a tangible commercial outcome. What would you recommend to sustain this kind of momentum through the upcoming months?",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 7,
    optimal: true
  },
  {
    id: "nf-r20-step5-vague-upside",
    label: "Promise a big upside without a number",
    description: "He's a numbers manager who just asked for the impact - answering with 'a significant boost' instead of the concrete room-nights figure wastes the credibility a real number would have bought.",
    playerDialogue: "You'd see a significant boost - fixing this opens up a whole pocket of family demand you're currently missing out on, and once those searches resolve the way they should, that lost volume starts converting instead of bouncing away to your peers. The upside is genuinely substantial, easily one of the bigger wins available to you right now, and it compounds through the back half of the month as the peak demand keeps flowing in.",
    partnerResponse: "'Significant' and 'substantial' - can you put an actual number on it? That's what I can take to my team.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -4
  },
  {
    id: "nf-r20-step5-upsell-campaigns",
    label: "Pivot straight into selling campaigns",
    description: "Turns a clean, quantified win into an immediate upsell of paid campaigns - reaching for more before the agreed fix is even in, which undercuts the trust the honest number just built.",
    playerDialogue: "And to really capitalize on this while we're here, let's not stop at the fix - I'd layer on a couple of paid campaigns and a visibility booster on top, so the moment those family searches start resolving properly, you're also pushing hard on placement while peak demand is at its highest. We could get the campaigns live alongside the configuration change, run them right through the back half of July, and stack every lever you've got to make the most of the window.",
    partnerResponse: "Let's get the actual fix in and see the result first before we start adding paid products on top.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: -3
  }
];
var step6Options19 = [
  {
    id: "nf-r20-step6-correct",
    label: "Land availability, content and non-refundable discoverability",
    description: "SME-prescribed close, turning the call forward: get all room types bookable with up-to-date content, and activate both flexible and non-refundable rates. Explain the non-refundable point factually - as the first, most competitive price it surfaces the listing in filtered searches and brings guests to the page, even if they ultimately book a flexible or half-board rate. This is the final, forward-looking beat of the journey.",
    playerDialogue: "Two things. First, availability; make sure all room types are open and bookable as far out as your calendar allows, and that your content, photos and services, is fully up to date. That's what keeps you visible to guests planning ahead. Second, I noticed your non-refundable rates aren't currently active on the platform. Here's why that matters: a non-refundable rate is typically your lowest published price, and that's the leading role when travelers filter or sort by price. It brings them to your page since you show up with the non-refundable rate in the search overview. That increases your page views and those searches may end up booking your flexible or breakfast included rate in the end, but they found you because that non-refundable rate brought you into their searches.",
    partnerResponse: "Absolutely - I can see how that makes the difference in the discoverability phase. Head office keeps non-refundable exclusive to our own website today, but if you can share some data on advance non-refundable value, I'll present this at our upcoming QBR and genuinely push for approval. Thank you for this.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: "safe",
    trustChange: 8,
    optimal: true
  },
  {
    id: "nf-r20-step6-guarantee-rank",
    label: "Promise the non-refundable rate guarantees top ranking",
    description: "Sells the non-refundable rate with a guaranteed ranking reward - a promise of placement in exchange for a rate move, which breaches compliance in every regime, and overshoots the honest discoverability logic.",
    playerDialogue: "Open your non-refundable rate a full year out and I can guarantee it puts you straight to the top of the search results - that's a locked-in ranking win in exchange for the price move. The lower your first, most competitive price sits, the higher the platform will place you, so the deeper you go on that non-refundable rate the more placement you're rewarded with. Commit to it now and I'll personally make sure you hold that top position right through into next year - it's a guaranteed return on dropping the rate, and head office will see the ranking jump for themselves.",
    partnerResponse: "A guaranteed top spot? Nothing works like that, and head office would see straight through it. That actually weakens your case.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: "risky",
    trustChange: -11
  },
  {
    id: "nf-r20-step6-just-fix",
    label: "Close on the family fix alone",
    description: "Right that the family fix is the win, but ending there - on the last conversation of a strong call, a receptive, forward-leaning manager was open to a genuine 2027 planning discussion, and stopping short leaves that value on the table.",
    playerDialogue: "Perfect - let's just get that family configuration corrected in the extranet and I'm confident we'll see those 45 room nights come through over the next few weeks. That's a really clean result for one call, and I don't want to pile more onto your plate when you've already got a clear action to take away. Get the child categories fixed, keep an eye on the family pickup as it lands, and drop me a line if anything looks off once it's live. Otherwise I'll leave you to it and we'll catch up again down the line.",
    partnerResponse: "Sounds good... though I was rather hoping we'd talk about where we take this next year, while we've got the momentum.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: "safe",
    trustChange: -3
  }
];
var steps10 = [
  {
    id: "open",
    label: "Open on the conversion-vs-visibility paradox",
    partnerPrompt: "Morning. Yes, let's start! What trends are you noticing on your end?",
    options: step1Options38
  },
  {
    id: "family-search",
    label: "Reveal the granular family search",
    partnerPrompt: "Well, I don't know... July is traditionally our highest-demand month, so expectations are high. Total revenue is steady, but our pickup for the second half of July feels slow versus last year. Our benchmarking says our search price is 73, compared with a peer median of 86. If the price is that competitive, why is our conversion not in line with our visibility?",
    options: step2Options40
  },
  {
    id: "child-config",
    label: "Explain the child-rate misconfiguration",
    partnerPrompt: "How is that possible? Our rates across all room types are mapped consistently from our channel manager.",
    options: step3Options40
  },
  {
    id: "size-the-loss",
    label: "Reinforce the tool and the commercial loss",
    partnerPrompt: "I see. I thought I'd been quite strict about the family configuration, but I never actually searched as a specific guest type like a family. That's a good tip.",
    options: step4Options38
  },
  {
    id: "quantify",
    label: "Quantify the fix and sustain it",
    partnerPrompt: "That would explain the drop-off in multi-occupancy room pickup, too. Do you know what the impact of the correct setup would be?",
    options: step5Options37
  },
  {
    id: "close-forward",
    label: "Close forward on the 2027 partnership",
    partnerPrompt: "That's a tangible commercial outcome. What would you recommend to sustain this kind of momentum through the upcoming months?",
    options: step6Options19
  }
];
function nobleFalconR20(partnerId) {
  return {
    conversationShape: "branching",
    partnerId,
    round: 20,
    issueTreePath: nobleFalconR10IssueTreePath,
    openingAm: openingAm22,
    steps: steps10
  };
}

// src/data/scenarios/healthy-decoys.ts
var HEALTHY_HOTELS = [
  "royal-crest",
  "silver-horizon",
  "ocean-view",
  "riverside",
  "emerald-peak",
  "oceanfront",
  "palace-grand",
  "hidden-valley",
  "loft-living",
  "noble-falcon"
];
var HOTEL_META = {
  "royal-crest": { contact: "Liam", style: "red", healthyNote: "occupancy's holding up and the numbers look steady" },
  "silver-horizon": { contact: "Chloe", style: "blue", healthyNote: "the group's pacing nicely this quarter" },
  "ocean-view": { contact: "Camila", style: "blue", healthyNote: "we're in a good rhythm across the properties" },
  "riverside": { contact: "Anton", style: "blue", healthyNote: "bookings have been steady and on-brand" },
  "emerald-peak": { contact: "Sophia", style: "red", healthyNote: "we're tracking where we'd expect for the season" },
  "oceanfront": { contact: "Priya", style: "blue", healthyNote: "the loyalty base is steady and occupancy's fine" },
  "palace-grand": { contact: "Ethan", style: "green", healthyNote: "things are running smoothly on our side" },
  "hidden-valley": { contact: "Claire", style: "blue", healthyNote: "we're comfortably on plan" },
  "loft-living": { contact: "Lucas", style: "red", healthyNote: "margins are healthy and pace looks fine" },
  "noble-falcon": { contact: "Adam", style: "blue", healthyNote: "demand's strong and we're converting well" }
};
var HEALTHY_DECOY_ROUNDS = {
  "royal-crest": [7, 9, 14, 16],
  "silver-horizon": [8, 10, 15, 17],
  "ocean-view": [1, 8, 9, 16, 18],
  "riverside": [2, 10, 17, 19],
  "emerald-peak": [1, 18, 20],
  "oceanfront": [2, 3, 4, 11, 19],
  "palace-grand": [3, 5, 12, 20],
  "hidden-valley": [4, 6, 11, 13],
  "loft-living": [5, 6, 7, 12, 14],
  "noble-falcon": [13, 15]
};
var H_ERPD = [-1.6, -0.6, -0.4, -0.9, -0.8, -1.1, -0.3, -1.3, -1.2, -0.5];
var H_ERPD_CHG = [-0.4, -0.9, 0.3, -0.2, -0.6, 0.1, -0.3, -0.7, -0.5, 0.2];
var H_LOSE = [26, 33, 22, 38, 24, 41, 29, 44, 21, 31];
var H_UNSOLD = [9, 12, 8, 14, 10, 13, 11, 7, 12, 9];
var H_SELL = [4, 2, 5, 1, 3, 2, 4, 6, 2, 3];
var H_VIS = [24, 21, 26, 19, 23, 20, 22, 27, 20, 25];
var H_VIS_PEER = [20, 19, 22, 17, 20, 18, 19, 23, 18, 21];
var H_SEARCH = [-1, 0, -2, 1, -1, 0, -1, -2, 0, -1];
var H_CONTACT_DAYS = [24, 31, 19, 36, 22, 40, 27, 44, 20, 33];
var H_COVERAGE = [58, 52, 61, 48, 55, 46, 57, 44, 60, 50];
function healthyMetrics(i) {
  const erpd = H_ERPD[i];
  return {
    erpd,
    erpdChange: H_ERPD_CHG[i],
    // Public sits a touch above eRPD; Loyal a healthy ~9 points below
    // Public (the Genius discount doing real work) - a clean profile.
    rpdPublic: Math.round((erpd + 1.2) * 10) / 10,
    rpdLoyal: Math.round((erpd - 8.4) * 10) / 10,
    losePricePublic: H_LOSE[i],
    activeScenarios: 2 + i % 2,
    activeScenarioNames: i % 2 === 0 ? ["Brand.com", "App"] : ["Key OTA", "Mobile"],
    competitor: i % 3 === 0 ? "keyota" : "brand",
    secondaryMetrics: {
      last30dAbrn: { value: 700 + i * 35, deltaPct: 3 + i % 3 },
      last30dRoomNights: { value: 420 + i * 22, deltaPct: 4 + i % 2 },
      last30dAdr: { value: 138 + i * 3, deltaPct: 1 },
      last90dPageViews: { value: 42e3 + i * 2600, deltaPct: 3 + i % 3 },
      last90dConversion: { value: 2.4 + i % 4 * 0.1, deltaPct: 2 },
      next3mRoomNights: { value: 90 + i * 4, deltaPct: 3 + i % 2 }
    },
    opcMetrics: {
      unsoldRooms: { value: H_UNSOLD[i] },
      sellThroughRate: { value: H_SELL[i] },
      visibilityShare: { value: H_VIS[i], peerValue: H_VIS_PEER[i] },
      searchPrice: { value: H_SEARCH[i] }
    },
    lastPricingContactDaysAgo: H_CONTACT_DAYS[i],
    pricingCoverageQTD: H_COVERAGE[i],
    // partnerValueAbrn intentionally omitted - the merge keeps the
    // hotel's real (identity) value from its record.
    experiencedRPD: 70 + i % 5,
    visibility: 76 + i % 6,
    conversion: 58 + i % 5,
    revenue: 66 + i % 5,
    discountQuality: 62 + i % 6,
    rateParity: "clean"
  };
}
function healthyDecoyMetricsFor(baseId) {
  const i = HEALTHY_HOTELS.indexOf(baseId);
  return healthyMetrics(i < 0 ? 0 : i);
}
function closeDecoyMetricsFor(baseId) {
  const raw = HEALTHY_HOTELS.indexOf(baseId);
  const i = raw < 0 ? 0 : raw;
  const m = healthyMetrics(i);
  return {
    ...m,
    secondaryMetrics: {
      last30dAbrn: { value: 640 + i * 30, deltaPct: -3 - i % 2 },
      last30dRoomNights: { value: 360 + i * 18, deltaPct: -1 },
      last30dAdr: { value: 140 + i * 3, deltaPct: 1 },
      last90dPageViews: { value: 4e4 + i * 2400, deltaPct: 2 - i % 2 },
      last90dConversion: { value: 2.3 + i % 4 * 0.1, deltaPct: -1 },
      next3mRoomNights: { value: 84 + i * 4, deltaPct: -7 - i % 3 }
    },
    opcMetrics: {
      unsoldRooms: { value: 16 + i % 4 * 2 },
      sellThroughRate: { value: -2 - i % 2 },
      visibilityShare: { value: H_VIS[i], peerValue: H_VIS_PEER[i] },
      searchPrice: { value: 1 + i % 2 }
    }
  };
}
function stylePlus(primary, v) {
  const base = { red: 0, yellow: 0, green: 0, blue: 0 };
  base[primary] = v;
  return base;
}
function healthySteps(meta) {
  const s = meta.style;
  const step128 = [
    {
      id: "hd-open-correct",
      label: "Confirm the healthy read, offer a light check",
      description: "Acknowledge the strong position honestly and ask whether there is anything they would value a second look at - no manufactured problem.",
      playerDialogue: "That matches what I'm seeing - your pricing is in good shape and your visibility is holding above your peers, so there's nothing pressing here. Is there anything you'd want a second pair of eyes on while we're talking?",
      partnerResponse: "Honestly, not really - we're in good shape and I'd rather not fix what isn't broken. Nice to hear you agree with our own read.",
      styleMatch: { ...stylePlus(s, 2), green: 1 },
      assertiveness: 1,
      compliance: "safe",
      trustChange: 4,
      optimal: true
    },
    {
      id: "hd-open-invent",
      label: "Manufacture a problem",
      description: "Imply something is wrong when the data says otherwise - the fastest way to lose a partner who knows their numbers are fine.",
      playerDialogue: "There are a few worrying signs in your performance we really need to address today before they get worse.",
      partnerResponse: "Worrying signs? My numbers look healthy from here. If you're going to tell me there's a fire, show me the smoke.",
      styleMatch: { ...stylePlus(s, -1), yellow: -1 },
      assertiveness: 2,
      compliance: "safe",
      trustChange: -4
    },
    {
      id: "hd-open-hardsell",
      label: "Push an unneeded discount",
      description: "Suggest a broad discount for a partner who is already in good shape and selling well - well-meant, but it gives away margin they do not need to.",
      playerDialogue: "We could always open up a broad discount to chase a bit more volume this quarter - want to give it a go?",
      partnerResponse: "Why would I discount when I'm already in good shape and selling well? That just gives away margin.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: "safe",
      trustChange: -6
    }
  ];
  const step231 = [
    {
      id: "hd-confirm-correct",
      label: "Be straight: you\u2019re well-positioned",
      description: "Confirm there is no action needed today and suggest simply keeping an eye on the numbers - an honest, trust-building close for a healthy partner.",
      playerDialogue: "There's genuinely nothing you need to act on today. You're well-positioned, so let's just keep an eye on the numbers and I'll flag it early if anything moves.",
      partnerResponse: "I appreciate you being straight with me rather than inventing work. That's exactly how I like to operate.",
      styleMatch: { ...stylePlus(s, 2), blue: s === "blue" ? 2 : 1 },
      assertiveness: 1,
      compliance: "safe",
      trustChange: 4,
      optimal: true
    },
    {
      id: "hd-confirm-urgency",
      label: "Invent urgency to justify the call",
      description: "Insist there's something to do just to avoid an empty-handed call - it reads as busywork to a partner who can see the data.",
      playerDialogue: "Even so, I really think we should be changing something today - it doesn't feel right to leave without an action.",
      partnerResponse: "Making a change for the sake of it isn't a strategy. If there's nothing wrong, let's not go looking for it.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: "safe",
      trustChange: -4
    },
    {
      id: "hd-confirm-overpromise",
      label: "Over-promise your own involvement",
      description: "Offer to pile on hands-on work a well-run partner does not need - it reads as manufacturing your own relevance rather than adding value.",
      playerDialogue: "Tell you what, I'll personally go through your whole setup this week and send you a detailed report, just so we're covering every possible angle.",
      partnerResponse: "That's a lot of effort for a property that's already performing. Let's not create work that isn't needed.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: "safe",
      trustChange: -6
    }
  ];
  const step331 = [
    {
      id: "hd-close-correct",
      label: "Leave it there, reconnect if it shifts",
      description: "Close cleanly: no busywork, agree to reconnect if the numbers move. Respects a healthy partner and preserves the relationship.",
      playerDialogue: "Then let's leave it there - no need to take up more of your time. I'll keep watching, and we'll reconnect the moment anything's worth acting on.",
      partnerResponse: "Sounds good. Thanks for the honest check-in - talk soon.",
      styleMatch: { ...stylePlus(s, 2), green: 1 },
      assertiveness: 1,
      compliance: "safe",
      trustChange: 4,
      optimal: true
    },
    {
      id: "hd-close-forcefollow",
      label: "Force a follow-up they don\u2019t need",
      description: "Lock in a commitment for the sake of it - friction with a partner who just told you nothing is wrong.",
      playerDialogue: "Before you go, let's lock in three follow-up calls this month so we stay on top of it.",
      partnerResponse: "Three calls for a property that's doing fine? That's more of your time and mine than this warrants.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: "safe",
      trustChange: -3
    },
    {
      id: "hd-close-flat",
      label: "Drop off flatly",
      description: "End abruptly with no offer to stay in touch - a missed chance to leave the relationship warm.",
      playerDialogue: "Right, nothing for us to do then. I'll let you get on.",
      partnerResponse: "Okay... well, thanks for calling, I suppose.",
      styleMatch: stylePlus(s, 0),
      assertiveness: 1,
      compliance: "safe",
      trustChange: -1
    }
  ];
  return [
    {
      id: "open",
      label: "Open the check-in",
      partnerPrompt: `Of course. Honestly, ${meta.healthyNote} - we're in good shape from where I sit. But go ahead, what are you seeing?`,
      options: step128
    },
    {
      id: "confirm",
      label: "Confirm there\u2019s nothing pressing",
      partnerPrompt: "So - is there actually anything I need to act on here, or are we good?",
      options: step231
    },
    {
      id: "close",
      label: "Close warmly",
      partnerPrompt: "Appreciate you being straight with me. Anything else before we wrap?",
      options: step331
    }
  ];
}
function buildHealthyDecoyScenario(partnerId, round) {
  const baseId = partnerId.replace(/-(none|narrow|wide|cross-regional)$/, "");
  const meta = HOTEL_META[baseId] ?? HOTEL_META["royal-crest"];
  return {
    conversationShape: "branching",
    partnerId,
    round,
    openingAm: `Hi ${meta.contact}, thanks for making time. I wanted to do a quick check-in on your performance - is now still okay?`,
    steps: healthySteps(meta)
  };
}
function closeSteps(meta) {
  const s = meta.style;
  const step128 = [
    {
      id: "cd-open-correct",
      label: "Name the one soft area, keep it proportionate",
      description: "Acknowledge the property is broadly healthy, flag the single soft signal (forward pace a touch behind peers) and frame it as worth watching, not a fire to fight today.",
      playerDialogue: "Overall you're in good shape - pricing is steady and visibility is holding. The one thing I'd flag is your forward pace running slightly behind your peer group. It's worth keeping an eye on, but nothing that needs a big move today.",
      partnerResponse: "That matches my read - we're comfortable, and I'd noticed the forward book was a little soft. Good to know it's on your radar too.",
      styleMatch: { ...stylePlus(s, 2), green: 1 },
      assertiveness: 1,
      compliance: "safe",
      trustChange: 4,
      optimal: true
    },
    {
      id: "cd-open-alarm",
      label: "Blow the soft signal up into a crisis",
      description: "Treats one mildly soft metric as an emergency. Over-reads the data and spooks a partner who can see the wider picture is healthy.",
      playerDialogue: "We've got a serious problem here - your numbers are sliding and we need to act aggressively today before it gets away from us.",
      partnerResponse: "Sliding? One soft metric against a healthy quarter isn't a crisis. If you're going to tell me the sky's falling, show me the evidence.",
      styleMatch: { ...stylePlus(s, -1), yellow: -1 },
      assertiveness: 2,
      compliance: "safe",
      trustChange: -4
    },
    {
      id: "cd-open-blanket",
      label: "Reach for an oversized fix",
      description: "Answer one soft signal with a heavy, premature intervention - overkill for a property that needs watching, not a big move today.",
      playerDialogue: "One way to shake off that soft pace is to launch a broad promotion right now and pull the demand forward. Shall we set that up today?",
      partnerResponse: "A broad promotion for a property that's otherwise doing fine? That just trains guests to wait for a deal. No.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: "safe",
      trustChange: -6
    }
  ];
  const step231 = [
    {
      id: "cd-plan-correct",
      label: "Offer one targeted, low-risk idea",
      description: "Propose a single fenced option to firm up the forward book (a targeted rate for the softest window) and offer to monitor - proportionate to a near-miss, not a wholesale change.",
      playerDialogue: "If you wanted to firm the forward book up, one low-risk option is a targeted rate on just the softest dates - fenced, so it doesn't touch your wider pricing. Otherwise we simply keep watching and I'll flag it early if the pace slips further.",
      partnerResponse: "A fenced rate on the soft window I can live with. Let's keep it to that and see how the pace responds.",
      styleMatch: { ...stylePlus(s, 2), blue: s === "blue" ? 2 : 1 },
      assertiveness: 1,
      compliance: "safe",
      trustChange: 4,
      optimal: true
    },
    {
      id: "cd-plan-overreach",
      label: "Push a full pricing overhaul",
      description: "Turns a one-window soft spot into a reason to rework the whole rate strategy - far more than the signal warrants.",
      playerDialogue: "While we're here, let's rebuild your whole rate structure and switch on every discount tool to really move the numbers.",
      partnerResponse: "That's a lot of change for one soft metric. I'm not overhauling a strategy that's working.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: "safe",
      trustChange: -4
    },
    {
      id: "cd-plan-guarantee",
      label: "Wave the soft signal away",
      description: "Tell the partner not to worry about the soft pace at all - the opposite over-correction, leaving a real if minor signal unaddressed.",
      playerDialogue: "I wouldn't give that soft pace a second thought - these things always sort themselves out. There's nothing here for you to act on.",
      partnerResponse: "You flagged it a minute ago and now it's nothing? If it's worth watching, let's watch it - don't just brush it off.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: "safe",
      trustChange: -6
    }
  ];
  const step331 = [
    {
      id: "cd-close-correct",
      label: "Close cleanly, agree to monitor",
      description: "Wrap without manufacturing work: agree to watch the forward pace and reconnect if it moves. Respects a broadly healthy partner and keeps the relationship warm.",
      playerDialogue: "Let's leave it there - the fenced rate on the soft dates and I'll keep an eye on the forward pace. If it slips further we'll pick it up, otherwise you're in good shape.",
      partnerResponse: "Sounds sensible. Appreciate you keeping it proportionate - talk soon.",
      styleMatch: { ...stylePlus(s, 2), green: 1 },
      assertiveness: 1,
      compliance: "safe",
      trustChange: 4,
      optimal: true
    },
    {
      id: "cd-close-forcefollow",
      label: "Lock in heavy follow-up they don\u2019t need",
      description: "Schedules a run of calls for a property that needs light monitoring - friction out of proportion to the signal.",
      playerDialogue: "Before you go, let's book weekly calls this month so we stay right on top of that pace.",
      partnerResponse: "Weekly calls for one soft metric? That's more of both our time than this warrants.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: "safe",
      trustChange: -3
    },
    {
      id: "cd-close-flat",
      label: "Drop off flatly",
      description: "Ends abruptly with no plan to watch the soft area - a missed chance to leave it tidy and the relationship warm.",
      playerDialogue: "Right, nothing major then. I'll let you get on.",
      partnerResponse: "Okay... thanks for the call, I suppose.",
      styleMatch: stylePlus(s, 0),
      assertiveness: 1,
      compliance: "safe",
      trustChange: -1
    }
  ];
  return [
    {
      id: "open",
      label: "Open on the near-miss read",
      partnerPrompt: `Of course. Honestly, ${meta.healthyNote} overall - though I'll admit the forward book feels a touch soft. What are you seeing?`,
      options: step128
    },
    {
      id: "plan",
      label: "Offer a proportionate option",
      partnerPrompt: "So - is this something I need to act on, or just keep half an eye on?",
      options: step231
    },
    {
      id: "close",
      label: "Close warmly",
      partnerPrompt: "Appreciate you keeping it in proportion. Anything else before we wrap?",
      options: step331
    }
  ];
}
function buildCloseDecoyScenario(partnerId, round) {
  const baseId = partnerId.replace(/-(none|narrow|wide|cross-regional)$/, "");
  const meta = HOTEL_META[baseId] ?? HOTEL_META["royal-crest"];
  return {
    conversationShape: "branching",
    partnerId,
    round,
    openingAm: `Hi ${meta.contact}, thanks for making time. I wanted to run a quick eye over this property's performance - is now still okay?`,
    steps: closeSteps(meta)
  };
}

// src/data/kamLayout.ts
var KAM_PRIORITY_BY_ROUND = {
  1: "royal-crest",
  2: "silver-horizon",
  3: "ocean-view",
  4: "riverside",
  5: "emerald-peak",
  6: "oceanfront",
  7: "palace-grand",
  8: "hidden-valley",
  9: "loft-living",
  10: "noble-falcon",
  11: "royal-crest",
  12: "silver-horizon",
  13: "ocean-view",
  14: "riverside",
  15: "emerald-peak",
  16: "oceanfront",
  17: "palace-grand",
  18: "hidden-valley",
  19: "loft-living",
  20: "noble-falcon"
};
var KAM_CLOSE_BY_ROUND = {
  1: "ocean-view",
  2: "emerald-peak",
  3: "oceanfront",
  4: "loft-living",
  5: "royal-crest",
  6: "hidden-valley",
  7: "silver-horizon",
  8: "loft-living",
  9: "emerald-peak",
  10: "oceanfront",
  11: "hidden-valley",
  12: "ocean-view",
  13: "loft-living",
  14: "oceanfront",
  15: "silver-horizon",
  16: "ocean-view",
  17: "royal-crest",
  18: "oceanfront",
  19: "emerald-peak",
  20: "royal-crest"
};
var KAM_DIST_BY_ROUND = {
  1: "palace-grand",
  2: "riverside",
  3: "noble-falcon",
  4: "hidden-valley",
  5: "palace-grand",
  6: "riverside",
  7: "ocean-view",
  8: "noble-falcon",
  9: "palace-grand",
  10: "ocean-view",
  11: "noble-falcon",
  12: "palace-grand",
  13: "riverside",
  14: "emerald-peak",
  15: "noble-falcon",
  16: "palace-grand",
  17: "hidden-valley",
  18: "riverside",
  19: "noble-falcon",
  20: "emerald-peak"
};
var KAM_CORRECT_POS_BY_ROUND = {
  1: 1,
  2: 2,
  3: 3,
  4: 1,
  5: 2,
  6: 3,
  7: 1,
  8: 2,
  9: 3,
  10: 1,
  11: 2,
  12: 3,
  13: 1,
  14: 2,
  15: 3,
  16: 1,
  17: 2,
  18: 3,
  19: 1,
  20: 2
};
function kamCorrectId(round) {
  return `${KAM_PRIORITY_BY_ROUND[round]}-cross-regional`;
}
function kamPortfolioRow(round) {
  const correct = KAM_PRIORITY_BY_ROUND[round];
  const close = KAM_CLOSE_BY_ROUND[round];
  const dist = KAM_DIST_BY_ROUND[round];
  const pos = KAM_CORRECT_POS_BY_ROUND[round];
  const order = pos === 1 ? [correct, close, dist] : pos === 2 ? [close, correct, dist] : [close, dist, correct];
  return order.map((base) => `${base}-cross-regional`);
}

// src/data/scenarios/kam-l1.ts
var KAM_CLOSINGS = {
  1: "Let's get the international rates activated for Royal Crest Hotel for the upcoming quarter. I'll loop in the Account Manager and on my side I'll monitor the property's visibility and conversion share against your regional portfolio benchmarks, for which I'll share an updated breakdown during our monthly review.",
  2: "Now that we've discussed the strategy for this property, let's keep an eye on its conversion over the next 30 days. If we see the expected conversion lift, we can look at applying this same fenced structure to the rest of your regional portfolio.",
  3: "I appreciate your agreement to align the base rates. I'll update our portfolio tracking report and we can review the remaining properties on the group list during our next meeting.",
  4: "Great, let's set up the US rate. I'll also schedule a follow-up meeting for us next month to review the portfolio report and monitor the property's performance against your regional benchmarks.",
  5: "Excellent. I'll send over a brief executive summary for your records. I'll also brief our local Account Manager to connect with your team to assist with the setup, and we'll review the portfolio performance impact together in our next monthly check-in.",
  6: "I'll brief our local Account Manager to check on the setup once your distribution team has aligned the rates. We can review the portfolio traffic uplift together in our next monthly check-in and discuss the performance recovery.",
  7: "Perfect! I'll set up a follow-up for us next month to review the portfolio reports and monitor the recovery. Speak soon, Ethan!",
  8: "I will send you the summary of our meeting. Once you have reviewed the recommendation, I will also loop in our local Account Manager to coordinate with the property's team on any next steps you have decided upon. I'll schedule our follow-up for next month - thank you for your time.",
  9: "I can understand that resolving wholesale rate leakage takes time and internal coordination. Since we are aligned on addressing these distribution gaps for Loft Living Inn, I'll send you a brief executive summary outlining the data and visibility impact for your records.",
  10: "We certainly don't want to push any setup that feels out of sync with your brand operations or risk management policies. Since any adjustment to family configurations or rate rules touches your broader group strategy, I'll send you an executive summary outlining the conversion data and risk-mitigation recommendations for The Noble Falcon Inn for your team to review. Speak soon!",
  11: "That's a completely fair compromise. Since we have your agreement to expand our test with mobile rates for Royal Crest Hotel, I'll prepare an executive summary of our benchmarks today. I'll schedule our portfolio review for next month to evaluate the impact together. Thanks for your time today, Liam!",
  12: "Perfect! Once it's live, we'll track the sell-through rate and conversion impact, and we can review the portfolio performance results together during our next monthly portfolio alignment. How does this sound?",
  13: "I'll make sure to get that report over to you, Camila. To ensure a smooth operational setup, I'll also loop in your local account manager for support and to track performance closely alongside your teams. Let's speak in two months to evaluate the impact while we review the group performance.",
  14: "Perfect! Let's touch base in our portfolio review next month to analyze the performance and discuss scaling this across your other regional assets that can benefit from this approach. Talk soon, Anton.",
  15: "You're welcome, Sophia. Our goal is to support where it makes commercial sense for your group. I'll email you a summary of these 90-day insights for your records. I'll keep monitoring the portfolio trends on our end and reach out during our next monthly check-in to see how Q3 is tracking. Thanks for your time today, Sophia!",
  16: "Sure, I'll send through the revenue projection for the US country rate. Let's reconnect during our portfolio review next month to go over the numbers - talk soon, Priya!",
  17: "Sure, no problem! Let's take a phased data driven approach. I'll loop in our local account manager to ensure the EEA country rate is well set up. Let's reconnect during our next portfolio review to analyze the conversion impact from European bookers.",
  18: "Looks like we found a good workaround, Claire. I'll brief our local account manager to support your on-property revenue team and adjust those deal settings right away. Talk soon, Claire!",
  19: "That's a good and proactive approach, Lucas. Our account manager will reach out locally to check that the mobile rate configuration has been optimized. I'll also send over an executive summary, and let's analyze the volume recovery across your portfolio during our review in two months.",
  20: "I'll compile a dedicated summary so that you have a solid business case ready for your internal QBR. I'll also keep our local account manager in the loop so they are ready to support the property as soon as the internal sign-off goes through. Let's touch base during our portfolio check-in next month."
};
var KAM_L2_OPENINGS = {
  11: {
    openingAm: "Hi Liam, thanks for reconnecting today. Following up on our initial test with country rates, I wanted to review your broader portfolio performance and address some persistent visibility bottlenecks affecting Royal Crest Hotel. Do you have a moment to review the high-level metrics together?",
    firstPartnerReply: "Let's dive in, Anya. We are keeping our prices the same to protect our profits, but I admit that revenue is lower than I would like. What is your data showing?"
  },
  12: {
    openingAm: "Hi Chloe, thanks for reconnecting today. Following up on the optimized family rates and international rates we implemented across your portfolio, overall group demand is holding steady. However, Silver Horizon Resort is still experiencing a bottleneck in conversion compared to your broader portfolio. Do you have a quick moment to look into what's driving this?",
    firstPartnerReply: "Hey Diego! Sure, I've got some time. Honestly, we're seeing plenty of eyes on our listings, but the actual bookings aren't moving quite as fast as I'd like. What are your numbers showing?"
  },
  13: {
    openingAm: "Good morning, Camila. From a group perspective, traveler interest across the resorts on the western coast remains high. However, Ocean View Resort is still showing a gap leading to a noticeable drop in conversion. I wanted to bring this to your attention so we can explore targeted tools to address it without impacting your broader brand strategy.",
    firstPartnerReply: "Thanks for bringing this to my attention, Javier. We've been focusing a lot on our guest welcome experience lately... You know, making sure our families and long-term guests feel completely at home. Though, to be completely transparent with you, my team is still a bit anxious about our pace for the upcoming months."
  },
  14: {
    openingAm: "Hi Anton, thanks for joining our quarterly portfolio review. Before we dive into macro growth, I want to address Riverside Boutique Hotel's drop in conversion. Can we discuss this property before diving into the overall performance?",
    firstPartnerReply: "Hi Ren. Yes, keep it brief. We are right in the middle of preparations for some major events. As you know, my focus is protecting our revenue and maintaining brand standards. What's the situation?"
  },
  15: {
    openingAm: "Good afternoon Sophia, I've analyzed your regional portfolio performance and zoomed into properties that are losing out on conversion. While our local account manager confirmed that the family rate configuration was successfully enabled at Emerald Peak Lodge, it still needs your attention based on the trends we captured.",
    firstPartnerReply: "Good afternoon, Mei. Yes, let's go! What trends do you see in the extranet for this upcoming quarter?"
  },
  16: {
    openingAm: "Hello Priya. Following up on our last discussion, our local account manager confirmed that your distribution team successfully aligned the rates for Oceanfront Bliss Lodge. While the trial delivered positive results, we still see an opportunity to optimize its conversion.",
    firstPartnerReply: "Hey! We've been super focused on some marketing campaigns and looking over our internal reports. Things look ok on our end, so I'm curious to see what you wanted to run through today!"
  },
  17: {
    openingAm: "Now that we have reviewed your regional portfolio performance for the upcoming quarter, shall we take a look at the data together on how Palace Grand Resort is performing based on our last conversation?",
    firstPartnerReply: "Sure, Diego. I have our PMS open. However, to be frank, I'm still dealing with a lot of noise from other OTAs complaining about price competitiveness, even though I provide everyone the exact same rate. That is really bothering me considering the operational effort I have to deal with everyday. By the way, I hope you are not bringing the same thing here..."
  },
  18: {
    openingAm: "Good morning, Claire. Great to speak with you again. Last time when we discussed the Hidden Valley Resort during the portfolio review, you said you needed some time to reconsider our pricing recommendations. How have things been so far?",
    firstPartnerReply: "Good morning, Oliver. Things are going very well, thank you. Based on our scheduled agenda today, I understand we are reviewing our performance for the upcoming quarter."
  },
  19: {
    openingAm: "Hi Lucas, thanks for taking the time today. Overall, your portfolio's market presence is looking healthy across the region. That being said, Loft Living Inn is still losing out on conversion this quarter. I want to walk you through what we're seeing there so we can improve the situation.",
    firstPartnerReply: "Hello, Elena. To be completely honest, I'm still struggling with those wholesale rates ending up online as B2C offers. What do your internal data show us right now?"
  },
  20: {
    openingAm: "Good morning, Adam. Following up on our last discussion regarding The Noble Falcon Inn, I know we ended on your risk-mitigation concerns around family room settings. Today I would like to zoom into this property's performance over the next quarter. Shall we go straight into reviewing the data together?",
    firstPartnerReply: "Morning, Mark. Yes, let's start! What trends are you noticing on your end?"
  }
};
function withKamL2(base) {
  const opening = KAM_L2_OPENINGS[base.round];
  const steps11 = opening ? base.steps.map(
    (s, i) => i === 0 ? { ...s, partnerPrompt: opening.firstPartnerReply } : s
  ) : base.steps;
  return {
    ...base,
    ...opening ? { openingAm: opening.openingAm } : {},
    steps: steps11,
    closingAmLine: KAM_CLOSINGS[base.round]
  };
}
function withHelicopter(base, partnerId, openingAm23, firstPartnerReply) {
  const steps11 = base.steps.map(
    (s, i) => i === 0 ? { ...s, partnerPrompt: firstPartnerReply } : s
  );
  return {
    ...base,
    partnerId,
    openingAm: openingAm23,
    steps: steps11,
    closingAmLine: KAM_CLOSINGS[base.round]
  };
}
function royalCrestKamR1(partnerId) {
  return withHelicopter(
    royalCrestWideR1,
    partnerId,
    "Good morning Liam, looking across your regional portfolio, overall demand and booking volume are pacing strongly ahead of last year. However, when we evaluate performance across your locations, Royal Crest Hotel is noticeably lagging behind the rest of the group. I'd like to focus today on the specific trends impacting this property's visibility.",
    "Good morning, Anya. Sure, let's do that."
  );
}
function silverHorizonKamR2(partnerId) {
  return withHelicopter(
    silverHorizonWideR2,
    partnerId,
    "Hi Chloe, thanks for jumping on the call! Overall, your portfolio's market presence is looking healthy across the region. That said, our strategic pricing reports showed Silver Horizon Resort as a driver of lost conversion within your group this quarter. I want to walk you through what we're seeing there so we can improve this situation.",
    "Hello Diego! Sure, let's start!"
  );
}
function oceanViewKamR3(partnerId) {
  return withHelicopter(
    oceanViewNarrowR3,
    partnerId,
    "Good morning, Camila. Thank you for scheduling this performance review today. While the majority of your portfolio is well-aligned, Ocean View Resort has surfaced as a key outlier, which is impacting its conversion. How do you see this property's performance?",
    "Good morning! It has been a busy period, but the pace in general is very good. Our main focus this year is driving guests directly to our own platform to maximize returns, and to do it we keep our direct website 5.5% cheaper to 'steal' some guests from you! We want travelers to see us on your platform, realize they can save money by booking directly, and then click away from you to buy on our website."
  );
}
function riversideKamR4(partnerId) {
  return withHelicopter(
    riversideNoneR4,
    partnerId,
    "Good morning, Anton. Looking across your regional portfolio, the overall performance is strong, but The Riverside Boutique Hotel represents a key area of opportunity as it lags behind its peer group. Specifically, its visibility for family searches is dropping. I would like to walk you through the data.",
    "Hello! Sure, let's start!"
  );
}
function emeraldPeakKamR5(partnerId) {
  return withHelicopter(
    emeraldPeakNarrowR5,
    partnerId,
    "Hi Sophia, thanks for joining. Looking across your regional portfolio, overall performance is steady, but Emerald Peak Lodge is surfacing as a primary underperforming asset in your group. Specifically, the discrepancy vs Brand.com pricing is impacting its conversion.",
    "Hello Mei! Thanks for sharing this information. Tell me more."
  );
}
function oceanfrontKamR6(partnerId) {
  return withHelicopter(
    oceanfrontWideR6,
    partnerId,
    "Hi Priya, thanks for making time today. I have analyzed the performance trends across your portfolio, overall production is steady, but Oceanfront Bliss Lodge stands out as a lagging asset within your group. Specifically, a sharp drop in traffic is impacting its market presence over the last month.",
    "Hello. Thanks for doing that. I see our production on your platform is dropping. What exactly does the data show? Our direct channel is holding strong, which is our primary focus, but I've noticed our room nights with you are down."
  );
}
function palaceGrandKamR7(partnerId) {
  return withHelicopter(
    palaceGrandNoneR7,
    partnerId,
    "Hi Ethan! Looking across your regional portfolio, overall room night growth is trending strongly ahead of last year. However, when we break down performance by property, Palace Grand Resort is significantly lagging behind the group average due to a visibility drop. I'd like to focus today on the specific trends impacting this property's competitiveness.",
    "Hi Diego! Great to hear from you. I've been looking over the performance report, and I'm a bit concerned. Our conversion is amazing, but our total page views have dropped by 53%. I'd love to look at the data together to see how we can turn this around."
  );
}
function hiddenValleyKamR8(partnerId) {
  return withHelicopter(
    hiddenValleyNarrowR8,
    partnerId,
    "Hi Claire, thanks for meeting today. Portfolio-wide, your group visibility is performing well across the region. That said, our strategic reports flagged Hidden Valley Resort as a primary driver of lost demand within your portfolio this quarter. I want to walk you through what's happening there so we can improve the situation.",
    "Hi, Oliver. Good, let's get straight to the point. What does the data show?"
  );
}
function loftLivingKamR9(partnerId) {
  return withHelicopter(
    loftLivingWideR9,
    partnerId,
    "Now that we have reviewed your portfolio's performance, I would like to discuss the pricing at Loft Living Inn that our local account manager flagged so that we can align on a path forward.",
    "I am intrigued. Tell me more!"
  );
}
function nobleFalconKamR10(partnerId) {
  return withHelicopter(
    nobleFalconNoneR10,
    partnerId,
    "Hi Adam, thanks for meeting today. Portfolio-wide, your group visibility is performing well across the region. That said, our strategic reports flagged The Noble Falcon Inn as a primary driver of lost conversion within your portfolio this quarter. I want to walk you through what's happening there so we can improve the situation.",
    "Hi Mark, yes, let's do that!"
  );
}
var kamL1Factories = {
  "royal-crest": royalCrestKamR1,
  "silver-horizon": silverHorizonKamR2,
  "ocean-view": oceanViewKamR3,
  "riverside": riversideKamR4,
  "emerald-peak": emeraldPeakKamR5,
  "oceanfront": oceanfrontKamR6,
  "palace-grand": palaceGrandKamR7,
  "hidden-valley": hiddenValleyKamR8,
  "loft-living": loftLivingKamR9,
  "noble-falcon": nobleFalconKamR10
};

// src/data/branchingScenarios.ts
var branchingScenarios = {
  john: {
    1: johnR1
  },
  "royal-crest-none": {
    1: royalCrestNoneR1,
    11: royalCrestR11("royal-crest-none")
  },
  "royal-crest-narrow": {
    1: royalCrestNarrowR1,
    11: royalCrestR11("royal-crest-narrow")
  },
  "royal-crest-wide": {
    1: royalCrestWideR1,
    11: royalCrestR11("royal-crest-wide")
  },
  "silver-horizon-none": {
    2: silverHorizonNoneR2,
    12: silverHorizonR12("silver-horizon-none")
  },
  "silver-horizon-narrow": {
    2: silverHorizonNarrowR2,
    12: silverHorizonR12("silver-horizon-narrow")
  },
  "silver-horizon-wide": {
    2: silverHorizonWideR2,
    12: silverHorizonR12("silver-horizon-wide")
  },
  "ocean-view-none": {
    3: oceanViewNoneR3,
    13: oceanViewR13("ocean-view-none")
  },
  "ocean-view-narrow": {
    3: oceanViewNarrowR3,
    13: oceanViewR13("ocean-view-narrow")
  },
  "ocean-view-wide": {
    3: oceanViewWideR3,
    13: oceanViewR13("ocean-view-wide")
  },
  "riverside-none": {
    4: riversideNoneR4,
    14: riversideR14("riverside-none")
  },
  "riverside-narrow": {
    4: riversideNarrowR4,
    14: riversideR14("riverside-narrow")
  },
  "riverside-wide": {
    4: riversideWideR4,
    14: riversideR14("riverside-wide")
  },
  "emerald-peak-none": {
    5: emeraldPeakNoneR5,
    15: emeraldPeakR15("emerald-peak-none")
  },
  "emerald-peak-narrow": {
    5: emeraldPeakNarrowR5,
    15: emeraldPeakR15("emerald-peak-narrow")
  },
  "emerald-peak-wide": {
    5: emeraldPeakWideR5,
    15: emeraldPeakR15("emerald-peak-wide")
  },
  "oceanfront-none": {
    6: oceanfrontNoneR6,
    16: oceanfrontR16("oceanfront-none")
  },
  "oceanfront-narrow": {
    6: oceanfrontNarrowR6,
    16: oceanfrontR16("oceanfront-narrow")
  },
  "oceanfront-wide": {
    6: oceanfrontWideR6,
    16: oceanfrontR16("oceanfront-wide")
  },
  "palace-grand-none": {
    7: palaceGrandNoneR7,
    17: palaceGrandR17("palace-grand-none")
  },
  "palace-grand-narrow": {
    7: palaceGrandNarrowR7,
    17: palaceGrandR17("palace-grand-narrow")
  },
  "palace-grand-wide": {
    7: palaceGrandWideR7,
    17: palaceGrandR17("palace-grand-wide")
  },
  "hidden-valley-none": {
    8: hiddenValleyNoneR8,
    18: hiddenValleyR18("hidden-valley-none")
  },
  "hidden-valley-narrow": {
    8: hiddenValleyNarrowR8,
    18: hiddenValleyR18("hidden-valley-narrow")
  },
  "hidden-valley-wide": {
    8: hiddenValleyWideR8,
    18: hiddenValleyR18("hidden-valley-wide")
  },
  "loft-living-none": {
    9: loftLivingNoneR9,
    19: loftLivingR19("loft-living-none")
  },
  "loft-living-narrow": {
    9: loftLivingNarrowR9,
    19: loftLivingR19("loft-living-narrow")
  },
  "loft-living-wide": {
    9: loftLivingWideR9,
    19: loftLivingR19("loft-living-wide")
  },
  "noble-falcon-none": {
    10: nobleFalconNoneR10,
    20: nobleFalconR20("noble-falcon-none")
  },
  "noble-falcon-narrow": {
    10: nobleFalconNarrowR10,
    20: nobleFalconR20("noble-falcon-narrow")
  },
  "noble-falcon-wide": {
    10: nobleFalconWideR10,
    20: nobleFalconR20("noble-falcon-wide")
  }
};
for (const [baseId, rounds] of Object.entries(HEALTHY_DECOY_ROUNDS)) {
  for (const regime of ["none", "narrow", "wide"]) {
    const id = `${baseId}-${regime}`;
    const bucket = branchingScenarios[id] ??= {};
    for (const round of rounds) {
      bucket[round] = buildHealthyDecoyScenario(id, round);
    }
  }
}
var KAM_L2_FACTORIES = {
  "royal-crest": royalCrestR11,
  "silver-horizon": silverHorizonR12,
  "ocean-view": oceanViewR13,
  "riverside": riversideR14,
  "emerald-peak": emeraldPeakR15,
  "oceanfront": oceanfrontR16,
  "palace-grand": palaceGrandR17,
  "hidden-valley": hiddenValleyR18,
  "loft-living": loftLivingR19,
  "noble-falcon": nobleFalconR20
};
for (let round = 1; round <= 20; round++) {
  const priorityBase = KAM_PRIORITY_BY_ROUND[round];
  const priorityId = `${priorityBase}-cross-regional`;
  const pBucket = branchingScenarios[priorityId] ??= {};
  pBucket[round] = round <= 10 ? kamL1Factories[priorityBase](priorityId) : withKamL2(KAM_L2_FACTORIES[priorityBase](priorityId));
  const closeId = `${KAM_CLOSE_BY_ROUND[round]}-cross-regional`;
  (branchingScenarios[closeId] ??= {})[round] = buildCloseDecoyScenario(closeId, round);
  const distId = `${KAM_DIST_BY_ROUND[round]}-cross-regional`;
  (branchingScenarios[distId] ??= {})[round] = buildHealthyDecoyScenario(distId, round);
}

// src/data/partnerStateByRound.ts
function nobleFalconR3Metrics() {
  return {
    erpd: 17,
    erpdChange: 21.42,
    rpdPublic: 20,
    rpdLoyal: 5.9,
    losePricePublic: 93,
    activeScenarios: 4,
    activeScenarioNames: [
      "Brand Scenario",
      "Family 2+1",
      "Family 2+2",
      "App"
    ],
    competitor: "brand",
    secondaryMetrics: {
      last30dAbrn: { value: 1306, deltaPct: -18 },
      last30dRoomNights: { value: 1113, deltaPct: 49 },
      last30dAdr: { value: 70, deltaPct: -17 },
      last90dPageViews: { value: 74948, deltaPct: 26 },
      last90dConversion: { value: 1.4, deltaPct: -17 },
      next3mRoomNights: { value: 1515, deltaPct: 81 }
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
    rateParity: "major"
  };
}
function marinaL2DecoyMetrics() {
  return {
    erpd: 2.1,
    erpdChange: -0.6,
    rpdPublic: 3.1,
    rpdLoyal: -0.7,
    losePricePublic: 29,
    activeScenarios: 2,
    activeScenarioNames: ["Brand.com", "Mobile"],
    competitor: "brand",
    secondaryMetrics: {
      last30dAbrn: { value: 980, deltaPct: 4 },
      last30dRoomNights: { value: 610, deltaPct: 5 },
      last30dAdr: { value: 151, deltaPct: 1 },
      last90dPageViews: { value: 0 },
      last90dConversion: { value: 2.5, deltaPct: 2 },
      next3mRoomNights: { value: 112, deltaPct: 4 }
    },
    // Healthy OPC: rooms are selling, visibility sits above the peer
    // median, and the search price is essentially at parity.
    opcMetrics: {
      unsoldRooms: { value: 8 },
      sellThroughRate: { value: 4 },
      visibilityShare: { value: 22, peerValue: 20 },
      searchPrice: { value: -1 }
    },
    lastPricingContactDaysAgo: 30,
    pricingCoverageQTD: 55,
    experiencedRPD: 72,
    visibility: 80,
    conversion: 61,
    revenue: 70,
    discountQuality: 65,
    rateParity: "clean"
  };
}
function carlosL2DecoyMetrics() {
  return {
    erpd: 2.6,
    erpdChange: -0.3,
    rpdPublic: 3.4,
    rpdLoyal: -0.5,
    losePricePublic: 33,
    activeScenarios: 2,
    activeScenarioNames: ["Brand.com", "Country"],
    competitor: "keyota",
    secondaryMetrics: {
      last30dAbrn: { value: 640, deltaPct: 3 },
      last30dRoomNights: { value: 410, deltaPct: 3 },
      last30dAdr: { value: 132, deltaPct: 1 },
      last90dPageViews: { value: 0 },
      last90dConversion: { value: 2.3, deltaPct: 1 },
      next3mRoomNights: { value: 78, deltaPct: 3 }
    },
    opcMetrics: {
      unsoldRooms: { value: 10 },
      sellThroughRate: { value: 2 },
      visibilityShare: { value: 19, peerValue: 18 },
      searchPrice: { value: 0 }
    },
    lastPricingContactDaysAgo: 26,
    pricingCoverageQTD: 58,
    experiencedRPD: 70,
    visibility: 77,
    conversion: 59,
    revenue: 67,
    discountQuality: 63,
    rateParity: "clean"
  };
}
var partnerStateByRound = {
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
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 820 },
          last30dRoomNights: { value: 520 },
          last30dAdr: { value: 145, deltaPct: -1 },
          last90dPageViews: { value: -2 },
          last90dConversion: { value: 1.8, deltaPct: -1 },
          next3mRoomNights: { value: 89, deltaPct: -3 }
        },
        lastPricingContactDaysAgo: 110,
        pricingCoverageQTD: 32,
        experiencedRPD: 68,
        visibility: 70,
        conversion: 55,
        revenue: 60,
        discountQuality: 50,
        rateParity: "clean"
      }
    },
    2: {
      metrics: {
        erpd: 9.4,
        erpdChange: 3.1,
        rpdPublic: 11.2,
        rpdLoyal: 6.4,
        losePricePublic: 82,
        activeScenarios: 2,
        activeScenarioNames: ["Brand.com", "Mobile"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 740 },
          last30dRoomNights: { value: 460 },
          last30dAdr: { value: 148, deltaPct: 0 },
          last90dPageViews: { value: -5 },
          last90dConversion: { value: 1.5, deltaPct: -3 },
          next3mRoomNights: { value: 78, deltaPct: -7 }
        },
        lastPricingContactDaysAgo: 110,
        pricingCoverageQTD: 32,
        experiencedRPD: 52,
        visibility: 56,
        conversion: 38,
        revenue: 48,
        discountQuality: 38,
        rateParity: "clean"
      }
    },
    3: {
      metrics: {
        erpd: 5.1,
        erpdChange: -4.3,
        rpdPublic: 5.8,
        rpdLoyal: 4,
        losePricePublic: 58,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 880 },
          last30dRoomNights: { value: 540 },
          last30dAdr: { value: 144, deltaPct: -1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2, deltaPct: 1 },
          next3mRoomNights: { value: 92, deltaPct: 2 }
        },
        lastPricingContactDaysAgo: 94,
        pricingCoverageQTD: 38,
        experiencedRPD: 64,
        visibility: 68,
        conversion: 52,
        revenue: 60,
        discountQuality: 55,
        rateParity: "clean"
      }
    },
    // R4 decoy profile: healthy Bucket 3 so Riverside Boutique's sharp
    // +6.56 eRPD spike and family gap read as the clear R4 priority.
    4: {
      metrics: {
        erpd: 2,
        erpdChange: -1.2,
        rpdPublic: 3.2,
        rpdLoyal: -0.8,
        losePricePublic: 30,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 910, deltaPct: 3 },
          last30dRoomNights: { value: 560, deltaPct: 4 },
          last30dAdr: { value: 146, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.2, deltaPct: 2 },
          next3mRoomNights: { value: 98, deltaPct: 3 }
        },
        lastPricingContactDaysAgo: 40,
        pricingCoverageQTD: 42,
        experiencedRPD: 66,
        visibility: 70,
        conversion: 54,
        revenue: 62,
        discountQuality: 58,
        rateParity: "clean"
      }
    },
    // R5 decoy profile: healthy Bucket 3 against Emerald Peak's Bucket 6
    // / 100% Lose Price, so the priority is unmistakable.
    5: {
      metrics: {
        erpd: 1.8,
        erpdChange: -0.9,
        rpdPublic: 3,
        rpdLoyal: -1,
        losePricePublic: 28,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 930, deltaPct: 4 },
          last30dRoomNights: { value: 575, deltaPct: 5 },
          last30dAdr: { value: 147, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.3, deltaPct: 2 },
          next3mRoomNights: { value: 101, deltaPct: 4 }
        },
        lastPricingContactDaysAgo: 36,
        pricingCoverageQTD: 44,
        experiencedRPD: 68,
        visibility: 72,
        conversion: 56,
        revenue: 64,
        discountQuality: 60,
        rateParity: "clean"
      }
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
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 940, deltaPct: 3 },
          last30dRoomNights: { value: 580, deltaPct: 4 },
          last30dAdr: { value: 148, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.3, deltaPct: 2 },
          next3mRoomNights: { value: 102, deltaPct: 3 }
        },
        lastPricingContactDaysAgo: 34,
        pricingCoverageQTD: 45,
        experiencedRPD: 68,
        visibility: 74,
        conversion: 56,
        revenue: 65,
        discountQuality: 60,
        rateParity: "clean"
      }
    },
    7: {
      metrics: {
        erpd: 2.3,
        erpdChange: -0.5,
        rpdPublic: 3.3,
        rpdLoyal: -0.7,
        losePricePublic: 33,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 955, deltaPct: 3 },
          last30dRoomNights: { value: 590, deltaPct: 4 },
          last30dAdr: { value: 149, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.3, deltaPct: 2 },
          next3mRoomNights: { value: 104, deltaPct: 3 }
        },
        lastPricingContactDaysAgo: 29,
        pricingCoverageQTD: 48,
        experiencedRPD: 68,
        visibility: 75,
        conversion: 57,
        revenue: 66,
        discountQuality: 61,
        rateParity: "clean"
      }
    },
    8: {
      metrics: {
        erpd: 2,
        erpdChange: -0.4,
        rpdPublic: 3,
        rpdLoyal: -0.8,
        losePricePublic: 30,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 960, deltaPct: 3 },
          last30dRoomNights: { value: 595, deltaPct: 4 },
          last30dAdr: { value: 150, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.4, deltaPct: 2 },
          next3mRoomNights: { value: 106, deltaPct: 3 }
        },
        lastPricingContactDaysAgo: 26,
        pricingCoverageQTD: 50,
        experiencedRPD: 69,
        visibility: 76,
        conversion: 58,
        revenue: 67,
        discountQuality: 62,
        rateParity: "clean"
      }
    },
    9: {
      metrics: {
        erpd: 2.4,
        erpdChange: -0.3,
        rpdPublic: 3.4,
        rpdLoyal: -0.6,
        losePricePublic: 32,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 970, deltaPct: 3 },
          last30dRoomNights: { value: 600, deltaPct: 4 },
          last30dAdr: { value: 151, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.4, deltaPct: 2 },
          next3mRoomNights: { value: 108, deltaPct: 3 }
        },
        lastPricingContactDaysAgo: 22,
        pricingCoverageQTD: 52,
        experiencedRPD: 70,
        visibility: 77,
        conversion: 59,
        revenue: 68,
        discountQuality: 63,
        rateParity: "clean"
      }
    },
    10: {
      metrics: {
        erpd: 2.2,
        erpdChange: -0.4,
        rpdPublic: 3.2,
        rpdLoyal: -0.8,
        losePricePublic: 31,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 975, deltaPct: 3 },
          last30dRoomNights: { value: 605, deltaPct: 4 },
          last30dAdr: { value: 151, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2.4, deltaPct: 2 },
          next3mRoomNights: { value: 110, deltaPct: 3 }
        },
        lastPricingContactDaysAgo: 20,
        pricingCoverageQTD: 54,
        experiencedRPD: 71,
        visibility: 78,
        conversion: 60,
        revenue: 69,
        discountQuality: 64,
        rateParity: "clean"
      }
    },
    // Level 2 (R11-R16): Marina is a healthy decoy across all six OPC
    // rounds so the reused lead partner reads as the clear priority on
    // the unlocked OPC lens. Same clean profile each round.
    11: { metrics: marinaL2DecoyMetrics() },
    12: { metrics: marinaL2DecoyMetrics() },
    13: { metrics: marinaL2DecoyMetrics() },
    14: { metrics: marinaL2DecoyMetrics() },
    15: { metrics: marinaL2DecoyMetrics() },
    16: { metrics: marinaL2DecoyMetrics() },
    17: { metrics: marinaL2DecoyMetrics() },
    18: { metrics: marinaL2DecoyMetrics() },
    19: { metrics: marinaL2DecoyMetrics() },
    20: { metrics: marinaL2DecoyMetrics() }
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
        activeScenarioNames: ["Brand.com", "App"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1500 },
          last30dRoomNights: { value: 750 },
          last30dAdr: { value: 129, deltaPct: 5 },
          last90dConversion: { value: 2, deltaPct: -3 },
          next3mRoomNights: { value: 67, deltaPct: -8 }
        },
        lastPricingContactDaysAgo: 126,
        pricingCoverageQTD: 24,
        experiencedRPD: 42,
        visibility: 48,
        conversion: 36,
        revenue: 38,
        discountQuality: 30,
        rateParity: "clean"
      }
    }
  },
  // The Noble Falcon Inn - same baseline metrics across all three
  // regime variants (Wide / Narrow / None). The regime changes the
  // dialogue and compliance shape of the conversation, not the
  // partner data. nobleFalconR1 is defined below and re-used per
  // partner id - if SME updates a number, it lands in all three
  // variants automatically.
  "noble-falcon-wide": { 3: { metrics: nobleFalconR3Metrics() } },
  "noble-falcon-narrow": { 3: { metrics: nobleFalconR3Metrics() } },
  "noble-falcon-none": { 3: { metrics: nobleFalconR3Metrics() } },
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
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1180, deltaPct: 3 },
          last30dRoomNights: { value: 680, deltaPct: 2 },
          last30dAdr: { value: 118, deltaPct: 2 },
          last90dPageViews: { value: 1, deltaPct: 1 },
          last90dConversion: { value: 2.1, deltaPct: 0 },
          next3mRoomNights: { value: 95, deltaPct: 2 }
        },
        lastPricingContactDaysAgo: 102,
        pricingCoverageQTD: 41,
        experiencedRPD: 72,
        visibility: 76,
        conversion: 62,
        revenue: 68,
        discountQuality: 60,
        rateParity: "minor"
      }
    },
    2: {
      metrics: {
        erpd: 5.6,
        erpdChange: 2.2,
        rpdPublic: 6.8,
        rpdLoyal: 4,
        losePricePublic: 61,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1150, deltaPct: 2 },
          last30dRoomNights: { value: 665, deltaPct: 1 },
          last30dAdr: { value: 120, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2, deltaPct: -1 },
          next3mRoomNights: { value: 93, deltaPct: 1 }
        },
        lastPricingContactDaysAgo: 102,
        pricingCoverageQTD: 41,
        experiencedRPD: 60,
        visibility: 64,
        conversion: 50,
        revenue: 58,
        discountQuality: 52,
        rateParity: "minor"
      }
    },
    3: {
      metrics: {
        erpd: 10.8,
        erpdChange: 5.2,
        rpdPublic: 12.4,
        rpdLoyal: 8.6,
        losePricePublic: 84,
        activeScenarios: 2,
        activeScenarioNames: ["Brand.com", "Country Rate"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1080, deltaPct: -1 },
          last30dRoomNights: { value: 610, deltaPct: -3 },
          last30dAdr: { value: 122, deltaPct: 1 },
          last90dPageViews: { value: -3 },
          last90dConversion: { value: 1.7, deltaPct: -4 },
          next3mRoomNights: { value: 86, deltaPct: -6 }
        },
        lastPricingContactDaysAgo: 84,
        pricingCoverageQTD: 39,
        experiencedRPD: 48,
        visibility: 52,
        conversion: 40,
        revenue: 46,
        discountQuality: 42,
        rateParity: "minor"
      }
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
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1120, deltaPct: 2 },
          last30dRoomNights: { value: 640, deltaPct: 3 },
          last30dAdr: { value: 124, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 1.9, deltaPct: 1 },
          next3mRoomNights: { value: 94, deltaPct: 2 }
        },
        lastPricingContactDaysAgo: 46,
        pricingCoverageQTD: 40,
        experiencedRPD: 54,
        visibility: 60,
        conversion: 46,
        revenue: 52,
        discountQuality: 48,
        rateParity: "clean"
      }
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
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1140, deltaPct: 3 },
          last30dRoomNights: { value: 650, deltaPct: 3 },
          last30dAdr: { value: 125, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2, deltaPct: 1 },
          next3mRoomNights: { value: 96, deltaPct: 2 }
        },
        lastPricingContactDaysAgo: 42,
        pricingCoverageQTD: 41,
        experiencedRPD: 56,
        visibility: 62,
        conversion: 48,
        revenue: 54,
        discountQuality: 50,
        rateParity: "clean"
      }
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
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1130, deltaPct: 2 },
          last30dRoomNights: { value: 645, deltaPct: 3 },
          last30dAdr: { value: 125, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 1.9, deltaPct: 1 },
          next3mRoomNights: { value: 95, deltaPct: 2 }
        },
        lastPricingContactDaysAgo: 44,
        pricingCoverageQTD: 42,
        experiencedRPD: 55,
        visibility: 61,
        conversion: 47,
        revenue: 53,
        discountQuality: 49,
        rateParity: "clean"
      }
    },
    7: {
      metrics: {
        erpd: 2.9,
        erpdChange: 0.2,
        rpdPublic: 3.9,
        rpdLoyal: -0.1,
        losePricePublic: 38,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1150, deltaPct: 2 },
          last30dRoomNights: { value: 655, deltaPct: 3 },
          last30dAdr: { value: 126, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 1.9, deltaPct: 1 },
          next3mRoomNights: { value: 97, deltaPct: 2 }
        },
        lastPricingContactDaysAgo: 39,
        pricingCoverageQTD: 44,
        experiencedRPD: 55,
        visibility: 62,
        conversion: 48,
        revenue: 54,
        discountQuality: 50,
        rateParity: "clean"
      }
    },
    8: {
      metrics: {
        erpd: 2.6,
        erpdChange: 0.2,
        rpdPublic: 3.6,
        rpdLoyal: -0.2,
        losePricePublic: 36,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1160, deltaPct: 2 },
          last30dRoomNights: { value: 660, deltaPct: 3 },
          last30dAdr: { value: 127, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2, deltaPct: 1 },
          next3mRoomNights: { value: 98, deltaPct: 2 }
        },
        lastPricingContactDaysAgo: 35,
        pricingCoverageQTD: 46,
        experiencedRPD: 56,
        visibility: 63,
        conversion: 49,
        revenue: 55,
        discountQuality: 51,
        rateParity: "clean"
      }
    },
    9: {
      metrics: {
        erpd: 2.8,
        erpdChange: 0.2,
        rpdPublic: 3.8,
        rpdLoyal: -0.1,
        losePricePublic: 37,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1170, deltaPct: 2 },
          last30dRoomNights: { value: 665, deltaPct: 3 },
          last30dAdr: { value: 128, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2, deltaPct: 1 },
          next3mRoomNights: { value: 99, deltaPct: 2 }
        },
        lastPricingContactDaysAgo: 31,
        pricingCoverageQTD: 47,
        experiencedRPD: 57,
        visibility: 64,
        conversion: 50,
        revenue: 56,
        discountQuality: 52,
        rateParity: "clean"
      }
    },
    10: {
      metrics: {
        erpd: 2.9,
        erpdChange: 0.2,
        rpdPublic: 3.9,
        rpdLoyal: -0.1,
        losePricePublic: 38,
        activeScenarios: 1,
        activeScenarioNames: ["Brand.com"],
        competitor: "brand",
        secondaryMetrics: {
          last30dAbrn: { value: 1175, deltaPct: 2 },
          last30dRoomNights: { value: 670, deltaPct: 3 },
          last30dAdr: { value: 128, deltaPct: 1 },
          last90dPageViews: { value: 0 },
          last90dConversion: { value: 2, deltaPct: 1 },
          next3mRoomNights: { value: 100, deltaPct: 2 }
        },
        lastPricingContactDaysAgo: 28,
        pricingCoverageQTD: 49,
        experiencedRPD: 58,
        visibility: 65,
        conversion: 51,
        revenue: 57,
        discountQuality: 53,
        rateParity: "clean"
      }
    },
    // Level 2 (R11-R16): Carlos is a healthy decoy across all six OPC
    // rounds, same as Marina, so the reused lead partner is the clear
    // priority on the unlocked OPC lens.
    11: { metrics: carlosL2DecoyMetrics() },
    12: { metrics: carlosL2DecoyMetrics() },
    13: { metrics: carlosL2DecoyMetrics() },
    14: { metrics: carlosL2DecoyMetrics() },
    15: { metrics: carlosL2DecoyMetrics() },
    16: { metrics: carlosL2DecoyMetrics() },
    17: { metrics: carlosL2DecoyMetrics() },
    18: { metrics: carlosL2DecoyMetrics() },
    19: { metrics: carlosL2DecoyMetrics() },
    20: { metrics: carlosL2DecoyMetrics() }
  }
};
for (const [baseId, rounds] of Object.entries(HEALTHY_DECOY_ROUNDS)) {
  const entry = partnerStateByRound[baseId] ??= {};
  for (const round of rounds) {
    entry[round] = { metrics: healthyDecoyMetricsFor(baseId) };
  }
}
for (let round = 1; round <= 20; round++) {
  const closeId = `${KAM_CLOSE_BY_ROUND[round]}-cross-regional`;
  (partnerStateByRound[closeId] ??= {})[round] = {
    metrics: closeDecoyMetricsFor(KAM_CLOSE_BY_ROUND[round])
  };
  const distId = `${KAM_DIST_BY_ROUND[round]}-cross-regional`;
  (partnerStateByRound[distId] ??= {})[round] = {
    metrics: healthyDecoyMetricsFor(KAM_DIST_BY_ROUND[round])
  };
}
function getPartnerBaseline(partnerId, round) {
  const direct = partnerStateByRound[partnerId]?.[round];
  if (direct) return direct;
  const baseId = partnerId.replace(/-(none|narrow|wide)$/, "");
  if (baseId === partnerId) return null;
  return partnerStateByRound[baseId]?.[round] ?? null;
}

// src/data/portfolioByRound.ts
var PRIORITY_BY_ROUND = {
  1: "royal-crest",
  2: "silver-horizon",
  3: "ocean-view",
  4: "riverside",
  5: "emerald-peak",
  6: "oceanfront",
  7: "palace-grand",
  8: "hidden-valley",
  9: "loft-living",
  10: "noble-falcon",
  11: "royal-crest",
  12: "silver-horizon",
  13: "ocean-view",
  14: "riverside",
  15: "emerald-peak",
  16: "oceanfront",
  17: "palace-grand",
  18: "hidden-valley",
  19: "loft-living",
  20: "noble-falcon"
};
var DECOYS_BY_ROUND = {
  1: ["ocean-view", "emerald-peak"],
  2: ["riverside", "oceanfront"],
  3: ["oceanfront", "palace-grand"],
  4: ["oceanfront", "hidden-valley"],
  5: ["palace-grand", "loft-living"],
  6: ["hidden-valley", "loft-living"],
  7: ["loft-living", "royal-crest"],
  8: ["ocean-view", "silver-horizon"],
  9: ["royal-crest", "ocean-view"],
  10: ["silver-horizon", "riverside"],
  11: ["oceanfront", "hidden-valley"],
  12: ["palace-grand", "loft-living"],
  13: ["hidden-valley", "noble-falcon"],
  14: ["loft-living", "royal-crest"],
  15: ["noble-falcon", "silver-horizon"],
  16: ["royal-crest", "ocean-view"],
  17: ["silver-horizon", "riverside"],
  18: ["ocean-view", "emerald-peak"],
  19: ["riverside", "oceanfront"],
  20: ["emerald-peak", "palace-grand"]
};
function rowFor(round, regime) {
  const priority = PRIORITY_BY_ROUND[round];
  const [d1, d2] = DECOYS_BY_ROUND[round];
  const pos = (round - 1) % 3;
  const order = pos === 0 ? [priority, d1, d2] : pos === 1 ? [d1, priority, d2] : [d1, d2, priority];
  return order.map((base) => `${base}-${regime}`);
}
function buildRegime(regime) {
  const map = {};
  for (let r = 1; r <= 20; r++) map[r] = rowFor(r, regime);
  return map;
}
function buildKam() {
  const map = {};
  for (let r = 1; r <= 20; r++) map[r] = kamPortfolioRow(r);
  return map;
}
var portfolioByRound = {
  none: buildRegime("none"),
  narrow: buildRegime("narrow"),
  wide: buildRegime("wide"),
  "cross-regional": buildKam()
};
function getPortfolioForRound(regime, round) {
  return portfolioByRound[regime]?.[round] ?? null;
}

// src/data/correctPartnerPerRound.ts
function standardRegimeMap(regime) {
  const map = {};
  for (let round = 1; round <= 20; round++) {
    map[round] = `${PRIORITY_BY_ROUND[round]}-${regime}`;
  }
  return map;
}
var correctPartnerPerRound = {
  none: standardRegimeMap("none"),
  narrow: standardRegimeMap("narrow"),
  wide: standardRegimeMap("wide"),
  "cross-regional": Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [i + 1, kamCorrectId(i + 1)])
  )
};
function getCorrectPartnerForRound(regime, round) {
  return correctPartnerPerRound[regime]?.[round] ?? null;
}

// src/engine/gameEngine.ts
function applyRoundBaseline(partner, round) {
  const baseline = getPartnerBaseline(partner.persona.id, round);
  if (!baseline) return partner;
  return {
    ...partner,
    metrics: { ...partner.metrics, ...baseline.metrics }
  };
}

// scripts/prioritization-audit.entry.ts
var byId = /* @__PURE__ */ new Map();
for (const p of initialPartners) byId.set(p.persona.id, p);
function resolveCard(id, round) {
  const rec = byId.get(id);
  if (!rec) return { id, erpd: void 0, pv: void 0, product: NaN };
  const m = applyRoundBaseline(rec, round).metrics;
  const erpd = m.erpd;
  const pv = m.partnerValueAbrn;
  return { id, erpd, pv, product: (erpd ?? NaN) * (pv ?? NaN) };
}
function n(x) {
  return x === void 0 || Number.isNaN(x) ? "  -  " : String(x).padStart(5);
}
var regimes = [
  { label: "No Parity", regime: "none", priority: (r) => getCorrectPartnerForRound("none", r) },
  { label: "Narrow", regime: "narrow", priority: (r) => getCorrectPartnerForRound("narrow", r) },
  { label: "Wide", regime: "wide", priority: (r) => getCorrectPartnerForRound("wide", r) },
  { label: "Cross-Regional (KAM)", regime: "cross-regional", priority: (r) => kamCorrectId(r) }
];
var fails = 0;
var onlyBecauseSign = 0;
for (const { label, regime, priority } of regimes) {
  console.log(`
============================================================`);
  console.log(` ${label}`);
  console.log(`============================================================`);
  for (let round = 1; round <= 20; round++) {
    const ids = getPortfolioForRound(regime, round);
    if (!ids) {
      console.log(`R${round}: no portfolio`);
      continue;
    }
    const priId = priority(round);
    const cards = ids.map((id) => resolveCard(id, round));
    const winner = cards.reduce((a, b) => b.product > a.product ? b : a);
    const pri = cards.find((c) => c.id === priId);
    const pass = winner.id === priId;
    if (!pass) fails++;
    const decoyMaxPosProduct = Math.max(
      0,
      ...cards.filter((c) => c.id !== priId).map((c) => Math.max(c.erpd ?? 0, 0) * (c.pv ?? 0))
    );
    const priPosProduct = Math.max(pri?.erpd ?? 0, 0) * (pri?.pv ?? 0);
    const carriedByValue = priPosProduct >= decoyMaxPosProduct;
    if (pass && !carriedByValue) onlyBecauseSign++;
    const lvl = round <= 10 ? "L1" : "L2";
    const tag = pass ? carriedByValue ? "PASS" : "PASS*" : "FAIL";
    const detail = cards.map((c) => `${c.id.replace(`-${regime}`, "").replace("-cross-regional", "")}[eRPD ${n(c.erpd)} x PV ${n(c.pv)} = ${String(Math.round(c.product)).padStart(7)}]`).join("  ");
    if (!pass) {
      const tells = ids.map((id) => {
        const m = applyRoundBaseline(byId.get(id), round).metrics;
        const base = id.replace(`-${regime}`, "").replace("-cross-regional", "");
        const isPri = id === priId;
        return `${isPri ? ">" : " "}${base}[dERPD ${n(m.erpdChange)} LosePrice ${n(m.losePricePublic)}]`;
      }).join("  ");
      console.log(`        tells: ${tells}`);
    }
    console.log(
      `${lvl} R${String(round).padStart(2)} ${tag}  priority=${(priId ?? "?").replace(`-${regime}`, "").replace("-cross-regional", "")}  winner=${winner.id.replace(`-${regime}`, "").replace("-cross-regional", "")}`
    );
    console.log(`        ${detail}`);
  }
}
console.log(`
============================================================`);
console.log(` SECONDARY: decoy out-reads priority on a visible card metric?`);
console.log(`============================================================`);
var erpdConfusions = 0;
var loseConfusions = 0;
for (const { label, regime, priority } of regimes) {
  for (let round = 1; round <= 20; round++) {
    const ids = getPortfolioForRound(regime, round);
    if (!ids) continue;
    const priId = priority(round);
    const rows = ids.map((id) => {
      const m = applyRoundBaseline(byId.get(id), round).metrics;
      return { id, erpd: m.erpd, lose: m.losePricePublic };
    });
    const pri = rows.find((r) => r.id === priId);
    const erpdBeaten = rows.filter((r) => r.id !== priId && r.erpd >= pri.erpd);
    const loseBeaten = rows.filter((r) => r.id !== priId && r.lose >= pri.lose);
    const strip = (s) => s.replace(`-${regime}`, "").replace("-cross-regional", "");
    if (erpdBeaten.length) {
      erpdConfusions++;
      console.log(`  [${label} R${round}] eRPD: priority ${strip(priId ?? "?")} (${pri.erpd}) NOT highest - ${erpdBeaten.map((r) => `${strip(r.id)} ${r.erpd}`).join(", ")}`);
    }
    if (loseBeaten.length) {
      loseConfusions++;
      console.log(`  [${label} R${round}] LosePrice: priority ${strip(priId ?? "?")} (${pri.lose}) NOT highest - ${loseBeaten.map((r) => `${strip(r.id)} ${r.lose}`).join(", ")}`);
    }
  }
}
console.log(`  eRPD-alone confusions: ${erpdConfusions} | Lose-Price confusions: ${loseConfusions}`);
console.log(`
============================================================`);
console.log(` SUMMARY: ${fails} round(s) where priority is NOT the max eRPD x Partner Value.`);
console.log(` PASS* = priority wins, but only because decoy eRPD <= 0 (the "x value" part`);
console.log(`         does not decide it): ${onlyBecauseSign} round(s).`);
console.log(`============================================================`);
