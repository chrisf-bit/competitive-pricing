# Structural changes extract - August 2026

Three pieces of client structural feedback, implemented on branch
`release-2-partner-detail`. This document lists every change (before -> after)
for review. Build is clean (`tsc` + `vite`).

Summary:
1. **Fictional locations** - every real city/country replaced with a fictional
   place, so no location maps to the published parity list.
2. **Real room counts** - the 10 lead hotels now show the real room numbers
   from "Partner Data Set 46".
3. **Expedia -> Key OTA** - every learner-facing "Expedia" replaced with
   "Key OTA".

---

## 1. Fictional locations

One fictional location per property, used across all of its parity-regime
variants (so location no longer signals a regime). No gameplay impact -
location is display-only; parity is driven by a separate internal field.

### Lead hotels (shown in the standard journey)

| Hotel (round) | Old - Wide / Narrow / No Parity | New (all regimes) |
|---|---|---|
| Royal Crest Hotel (R1) | Miami Beach, USA / Cotswolds, UK / Costa del Sol, Spain | West Haven, Republic of Alden |
| Silver Horizon Resort (R2) | Orlando, USA / Lake District, UK / Costa Brava, Spain | Santa Delmar, Republic of Valora |
| Ocean View Resort (R3) | San Diego, USA / Brighton, UK / Alicante, Spain | San Carlos Port, United States of Marisot |
| Riverside Boutique Hotel (R4) | Charleston, USA / Bath, UK / Seville, Spain | Clayton-on-Mersey, Federal State of Kenshire |
| Emerald Peak Lodge (R5) | Aspen, USA / Lake District, UK / Sierra Nevada, Spain | Arnesund, Kingdom of Norland |
| Oceanfront Bliss Lodge (R6) | San Diego, USA / Cornwall, UK / Málaga, Spain | Nusa Merah, Republic of Nusantara |
| Palace Grand Resort (R7) | Orlando, USA / London, UK / Marbella, Spain | Mont Bellerive, Grand Duchy of Valence |
| The Hidden Valley Resort (R8) | Aspen, USA / Lake District, UK / Sierra Nevada, Spain | Altenstrad, Federal Republic of Eldon |
| Loft Living Inn (R9) | Austin, USA / Manchester, UK / Seville, Spain | Kurokawa-Shi, State of Shinano |
| The Noble Falcon Inn (R10) | New York, USA / London, UK / Seville, Spain | Port Al-Qasira, Emirate of Qasira |

### Cross-Regional (KAM) company names (neutralised - no regional hint)

| Base hotel | Old company name | New company name |
|---|---|---|
| Royal Crest | Northumbrian Quays Hotel Management | Alden Harbour Hotel Management |
| Silver Horizon | Hawkesbury Hotel Investments | Valora Bay Hotel Investments |
| Ocean View | Attica Harbour Hotel Management | Marisot Harbour Hotel Management |
| Riverside | Golf + Leisure Clubs & Rental | Kenshire Golf & Leisure Group |
| Emerald Peak | Aravalli Hotels | Norland Highland Hotels |
| Oceanfront | Marlow & Keene Hotels | Nusantara Coast Hotels |
| Palace Grand | Thames Hospitality Group | Bellerive Hospitality Group |
| Hidden Valley | Valle do Paraiba Managed Hotels | Eldon Valley Managed Hotels |
| Loft Living | Midtown River Ownership Group | Shinano River Ownership Group |
| Noble Falcon | Cuajimalpa Highlands Hospitality Group | Qasira Highlands Hospitality Group |

### Cross-Regional (KAM) companies - location + HQ pill

| Company (base hotel) | Old location | Old HQ | New location | New HQ |
|---|---|---|---|---|
| Northumbrian Quays (Royal Crest) | London, UK | London | West Haven, Republic of Alden | Republic of Alden |
| Hawkesbury Hotel Investments (Silver Horizon) | Costa Brava, Spain | Spain | Santa Delmar, Republic of Valora | Republic of Valora |
| Attica Harbour (Ocean View) | Athens, Greece | Athens | San Carlos Port, United States of Marisot | United States of Marisot |
| Golf + Leisure Clubs (Riverside) | Singapore | Singapore | Clayton-on-Mersey, Federal State of Kenshire | Federal State of Kenshire |
| Aravalli Hotels (Emerald Peak) | Delhi, India | Delhi | Arnesund, Kingdom of Norland | Kingdom of Norland |
| Marlow & Keene (Oceanfront) | Amsterdam, Netherlands | Amsterdam | Nusa Merah, Republic of Nusantara | Republic of Nusantara |
| Thames Hospitality (Palace Grand) | New York, USA | New York | Mont Bellerive, Grand Duchy of Valence | Grand Duchy of Valence |
| Valle do Paraiba (Hidden Valley) | Rio de Janeiro, Brazil | Rio de Janeiro | Altenstrad, Federal Republic of Eldon | Federal Republic of Eldon |
| Midtown River (Loft Living) | London, UK | London | Kurokawa-Shi, State of Shinano | State of Shinano |
| Cuajimalpa Highlands (Noble Falcon) | Mexico City, Mexico | Mexico | Port Al-Qasira, Emirate of Qasira | Emirate of Qasira |

### Non-active records (not shown in the game today, changed for completeness)

These partner records are retired / parked (not on any current portfolio) but
were changed so no real place name remains anywhere in the data.

| Record | Old (per regime where applicable) | New |
|---|---|---|
| Crystal Water Resort | Miami Beach / Cornwall / Marbella | Valdecosta, Republic of Marenza |
| Velvet Sky Boutique Hotel | New York / Edinburgh / Madrid | Highmoor, Kingdom of Estland |
| Raven Inn | Valencia / Bath / Boston | Thornwick, Duchy of Brammark |
| Driftwood Bay Resort | Mallorca / Brighton / Newport Beach | Coralport, Republic of Sarabaya |
| Marina (boutique city hotel) | Madrid / London / New York | Solenne, Republic of Casteaux |
| Carlos (city apartments) | Barcelona / Manchester / Los Angeles | Puerto Vialta, Republic of Andira |
| John Marston | York, England | Ashcombe, Kingdom of Wessmark |
| Stavros | Kos, Greece | Kalithnos, Republic of Aegora |
| Hannah | Cotswolds, England | Elderfield, Duchy of Harlen |
| Priya | Mumbai, India | Chandrapur, Republic of Bharati |
| Yuki | Kyoto, Japan | Hoshimura, State of Yamato |

### Portfolio market banner (Portfolio screen)

The seasonal / competitor banner named real cities per regime. Rewritten to be
geography-neutral (learners in one regime now hold a portfolio spanning several
fictional countries, so no single real market applies).

| Round | Old (No Parity example) | New (all regimes) |
|---|---|---|
| 1 | "Spanish coastal and city competitors are actively using discount tools..." | "Coastal and city competitors are actively using discount tools..." |
| 2 | "Costa del Sol competitors have entered... Madrid and Barcelona hotels... Valencia and Mallorca demand is climbing." | "Competitors have entered with aggressive summer pricing. Established city hotels are holding steady while coastal and resort demand climbs week on week." |
| 2 (note) | "peak Spanish summer" | "peak summer" |
| 3 | "Spanish market pricing competition has intensified..." | "Market pricing competition has intensified..." |
| 3 (note) | "Peak Spanish summer is imminent..." | "Peak summer is imminent..." |

(Narrow used UK cities, Wide used US cities - all collapse to the same neutral
copy above.)

---

## 2. Real room counts (10 lead hotels)

Source: SME "Partner Data Set 46" tab, "Number of room" column. Display-only.

| Hotel | Old rooms | New rooms |
|---|---|---|
| Royal Crest Hotel | 120 | **101** |
| Silver Horizon Resort | 64 | **61** |
| Ocean View Resort | 110 | **90** |
| Riverside Boutique Hotel | 42 | **49** |
| Emerald Peak Lodge | 88 | **185** |
| Oceanfront Bliss Lodge | 58 | **309** |
| Palace Grand Resort | 184 | **70** |
| The Hidden Valley Resort | 96 | **77** |
| Loft Living Inn | 46 | **190** |
| The Noble Falcon Inn | 288 | 288 (unchanged) |

---

## 3. Expedia -> Key OTA

Every learner-facing "Expedia" replaced. The lesson in each compliance scenario
is unchanged (it teaches the behaviour, not the brand).

### Rendered UI / data

| Where | Before | After |
|---|---|---|
| Partner Detail - "Competitor" KPI | Expedia | Key OTA |
| Data & Insights - hotspot table Competitor column | Expedia | Key OTA |
| "Competitor" metric tooltip | "...or Expedia / a Key OTA." | "...or a Key OTA." |
| Silver Horizon persona profile | "Fields aggressive competitor calls (Expedia)..." | "Fields aggressive Key OTA competitor calls..." |
| Conversation Review tool - Competitor value | Expedia | Key OTA |

### Conversation dialogue and coaching text

**Silver Horizon R2 (Narrow)** - partner line "...Expedia is just cutting margins..." -> "...The Key OTA is just cutting margins..."; option "Ask her to price below Expedia here" -> "...below the Key OTA here"; "isn't higher than Expedia['s]" -> "...the Key OTA['s]"; "price against Expedia here" -> "...the Key OTA here"; "Point at Expedia and tell her to pull inventory" -> "Point at the Key OTA..."; "cheaper on Expedia... pull them from Expedia" -> "...the Key OTA... the Key OTA"; "Pricing against Expedia..." -> "...the Key OTA..."; 'Add "be cheaper than Expedia"' -> '...the Key OTA'; "cheaper than Expedia for international" -> "...the Key OTA...".

**Silver Horizon R2 (Wide)** - partner line "...Expedia keeps calling..." -> "...The Key OTA keeps calling..."; "Offer to fund a discount to match Expedia" -> "...the Key OTA"; "match Expedia's public price" -> "...the Key OTA's..."; "Tell her to drop Expedia" -> "...the Key OTA"; "Name Expedia as the problem" -> "Name the Key OTA..."; "Honestly, Expedia is the problem" -> "Honestly, the Key OTA..."; "match Expedia and stop there" -> "...the Key OTA..."; "conditions you give Expedia" -> "...the Key OTA"; "Matching Expedia just protects the status quo" -> "Matching the Key OTA..."; "beat Expedia and starve their inventory" -> "...the Key OTA..."; "price below Expedia" -> "...the Key OTA"; "better rate than Expedia" -> "...the Key OTA"; "align my rates to what's showing on Expedia" -> "...the Key OTA"; "'match Expedia everywhere'" -> "'match the Key OTA everywhere'".

**Riverside R4 (Narrow)** - "Tell him to undercut Expedia on families" -> "...the Key OTA..."; "Point at Expedia and tell him..." -> "Point at the Key OTA..."; "cheaper on Expedia... higher than Expedia's" -> "...the Key OTA... the Key OTA's"; "price against Expedia here" -> "...the Key OTA here".

**Riverside R4 (Wide)** - "higher than Expedia's - specifically on family occupancy" -> "...the Key OTA's..."; "Your rates are higher than Expedia's" -> "...the Key OTA's"; "Tell him to pull family rates from Expedia" -> "...from the Key OTA"; "Name Expedia and tell him to withhold..." -> "Name the Key OTA..."; "Honestly, Expedia is undercutting you on families" -> "Honestly, the Key OTA...".

**Loft Living R9 (Narrow)** - partner line "Expedia keeps pointing out price gaps..." -> "The Key OTA keeps pointing out..."; "go fight it out with Expedia" -> "...the Key OTA"; "If Expedia's the one poking..." -> "If the Key OTA's the one poking..."; "chase Expedia down on price" -> "...the Key OTA..."; "rates on Expedia or [the] other OTAs" (x3) -> "...the Key OTA or [the] other OTAs"; "how to price on Expedia now" -> "...the Key OTA now".

**Legacy distractor dialogue (Marina/Carlos, Priya - not on current portfolios)** - "Argue Expedia is out-discounting him" -> "Argue the Key OTA..."; "Expedia partners on Kos have more products active" -> "partners on the Key OTA have more products active"; "Expedia comparisons are useful" -> "Key OTA comparisons are useful"; "my other properties on Expedia" -> "...on the Key OTA".

### Persona hint lines

| Before | After |
|---|---|
| 'Expect "Expedia cuts margin, I give everyone the same rate..."' | 'Expect "The Key OTA cuts margin, I give everyone the same rate..."' |
| "...bleeding the high-value International and Family segments to Expedia." | "...to the Key OTA." |
| "...scenarios flag exactly where Expedia undercuts." | "...where the Key OTA undercuts." |
| "...Competitive Aggression from Expedia..." | "...from the Key OTA..." |

---

## Internal scrub (second pass - no code/data mismatch)

Cleaned so nothing internal contradicts the visible data:
- **KAM company names** neutralised (table above).
- **`competitor` field token renamed** `'expedia'` -> `'keyota'` (type union,
  all data values, decoy generator). No behaviour change - it already rendered
  as "Key OTA".
- **Scenario step-ids** `...-expedia` -> `...-keyota` (7 ids; self-contained,
  no external references).
- **Code comments** mentioning Expedia or real cities updated (old "Spain / UK /
  US" country-grouping notes replaced with "locations are fictional and
  regime-neutral"; city parentheticals dropped from Crystal Water / Velvet Sky
  headers).

Verified: zero `expedia` (any case) and zero "Spain / UK / US" grouping notes
remain in `client/src`.

## Deliberately NOT changed (flag if you want these too)

- **Contact names** (Liam O'Connell, Anton Müller, etc.) unchanged - out of
  scope for this pass.
- **"US Country Rate" / "US travelers" in the Level 2 (OPC) scenarios** left as
  SME pricing mechanics. These refer to a guest **source market** (a real
  Country Rate lever the partner sets for US-origin travellers), not the
  property's location, so they are not a location-vs-parity mismatch. Flag if
  you want these fictionalised too.
- **Cultural flavour in one parked record** (Yuki's "ryokans" / "Komorebi")
  left - not a city/country, and the record is not shown.

## Files touched

`data/partners.ts`, `data/market.ts`, `data/metricDefinitions.ts`,
`screens/PartnerDetailScreen.tsx`, `screens/DashboardHotspotScreen.tsx`,
`review/reviewData.ts`, `data/personaHints.ts`, and scenario files
`silver-horizon-{narrow,wide}-r2.ts`, `riverside-{narrow,wide}-r4.ts`,
`loft-living-narrow-r9.ts`, `conversations.ts`, `conversations-priya.ts`.
