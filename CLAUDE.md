# Competitive Pricing Sim - CLAUDE.md

A working brief for any future agent picking this up. Read this before
making changes; the file captures the decisions we've already settled
on so they don't have to be relearned.

## What we're building

The "Rate Right" sim is a Booking.com pricing learning experience
commissioned by Adriana Nedea (PS Learning, Jan 2026 deck). It pairs a
**clearance** front-end (Level 0 in the deck's terms) with a
**partner-portfolio simulation** afterwards.

- **Clearance**: a guided 7-activity onboarding that teaches and tests
  the basics (parity rules, eRPD, partner freedom, safe vs unsafe
  phrases, the diagnostic mindset) before the learner is allowed near
  a real partner.
- **Partner sim**: 10 rounds of partner-portfolio decision making,
  where one partner each round is significantly worse than the others
  and the learner has to spot them, take the right action, and have
  the right conversation.

MVP target: **2026-05-18**. Out of MVP: Level 2 branching, full
Pricing Issue Tree as live mechanic, post-sim Diagnostic Tool, manager
dashboard, SCORM/xAPI wrapper. All those are post-MVP.

## Source documents

Four PDFs live on disk (paths in
`~/.claude/projects/.../memory/reference_source_docs.md`):

1. **Learning Deliverables deck** - the journey, scoring axes, scope
2. **Pricing Issue Tree concept** - 7-column matrix (Trigger > Intent >
   Root Cause > Metric > Hook > Pitch > Objection)
3. **Steering & Narrative release** - 2026 strategy, Two Key
   Principles (page 3 = safe-vs-unsafe rulebook), eRPD definition
4. **Stay legally compliant | Content writing guidance** - the parity
   regime rules per regime

When in doubt about content, source from these.

## Architecture

- React 19 + TypeScript + Vite, hosted on Render as a static site.
- No state library; one `useGame` hook + `gameEngine.ts` pure functions.
- `App.tsx` is the screen-state-machine router (no React Router).
- Splash + briefing + clearance + partner sim + debrief are sibling
  screens, switched by `state.screen`.

Key files:
- `client/src/types/index.ts` - all domain types
- `client/src/engine/gameEngine.ts` - game state transitions
- `client/src/hooks/useGame.ts` - React state wrapper + setters
- `client/src/data/` - all content (partners, conversations, market,
  parityCountries, learnerMarkets, characters, gameMasterScript,
  emailAudit, dashboardHotspot, issueTreeReveal, clearanceActivities)
- `client/src/screens/` - one component per screen
- `client/src/components/` - shared components (Header, GuidePanel,
  TutorialOverlay, DevNav, ClearanceShell, DeviceFrame, MetricBadge)

## Design decisions and rules

### Voice and copy

- **No em dashes (—) anywhere.** Plain hyphens (-). Chris has corrected
  this twice; memory file enforces.
- **No "Level 0/1/2" labels in learner-facing copy.** Levels are
  internal SME terms. UI uses activity names ("Email Audit", "Day
  one", "Diagnose"). Internal code/types/route-ids can use level prefixes.
- **eRPD is partner-account level for LPS daily work.** Country-level
  is only the rollup objective. Don't say "your country's eRPD" in
  learner copy.
- **Internal-only metric names never appear in partner dialogue.**
  eRPD / Experienced RPD, Public RPD, Loyal RPD, and Lose Price Public
  are LPS-side metric names - partners don't see them and the learner
  must never say them aloud. Translate to partner-facing language in
  conversation dialogue: "visibility", "price competitiveness",
  "you're losing the price comparison on X% of searches", "what
  Genius members see vs what non-Genius traffic sees". Internal names
  are fine on the LPS dashboard / partner-detail screens (those are
  the learner's pre-call data view) and in code/type fields. Only the
  spoken-to-partner dialogue is gated.
- **No "parity" in conversations with No-Parity partners.** It's a
  partner-property filter on conversation options.
- **Role-agnostic copy.** Not all partner-facing roles are AMs - the
  briefing says "manage partner accounts" without naming the role.

### Compliance guardrails (legal)

Source: **Stay legally compliant | Content writing guidance** PDF.
These are hard rules for every piece of learner-facing or partner-
facing copy in the sim - dialogue options, hook text, pitch text,
email audit content, GM script, briefing copy, clearance feedback,
everything. If a proposed line breaks any rule below, rewrite it.

**General (applies to all regimes):**
- DO stay factual and neutral; advise on the partner's performance
  on Booking.com.
- DO make it explicit that the partner is **free to choose their
  own pricing and distribution strategy**.
- DO frame pricing as **one of several performance drivers**
  (alongside reviews, content, etc.), not the only lever.
- DON'T pressure parity or imply ranking changes will follow from
  pricing decisions.
- DON'T promise specific ranking rewards or visibility guarantees
  in exchange for a price or product change.
- DON'T require a partner to lower prices just because cheaper
  rates exist elsewhere.
- DON'T dictate the partner's external pricing or distribution
  strategy on other channels.

**Internal objective framing (LPS-side copy, dashboard, GM lines):**
- DO position **On-platform growth (ABRN)** as the only hard,
  incentivised KPI for partner-facing roles.
- DO use **e-RPD objectives at country-level or above**, and only
  for Area Manager+ roles.
- DO position pricing as **one of 5 pillars** of on-platform growth.
- DON'T set quantitative, incentivised, or hard targets for e-RPD
  in any learner objective text.
- DON'T (in No-Parity context) frame objectives like "increase
  competitive partner share from x to y%" for partner-facing roles.
  Competitive Partner Share / Price Bucket distribution is for
  **internal prioritisation only**, never a SMART objective.

**Wide Parity markets:**
- DO ask partners to provide the **same rates, conditions, and
  availability** they give to Brand.com and key OTAs.
- DO explain that less competitive prices can **reduce conversion
  and visibility** on Booking.com (this is fact-based, not a threat).
- DO proactively use **on-platform competitiveness AND cross-
  channel data** (RPD, EPO) to illustrate opportunities.
- DON'T promise ranking rewards or threaten penalties based solely
  on external prices.
- DON'T recommend the partner switch off other OTAs or wholesalers.

**Narrow Parity markets:**
- DO ask partners to align rates and conditions **strictly with
  Brand.com**.
- DO use **RPD vs Brand.com** data to show where Booking.com is
  more expensive than the partner's direct site.
- DON'T ask for same availability or price alignment with other OTAs.
- DON'T suggest the partner adjust or reduce prices on other channels.

**No-Parity markets:**
- DO ask for the **"best price the partner is willing to make
  available to Booking.com"** to remain competitive on the platform.
- DO ask **reactively and neutrally** if a discrepancy is noticed
  (e.g. "If your prices are more attractive on other platforms, is
  that intentional and part of your strategy?").
- DO use external-price knowledge **only for internal prioritisation**
  of who to call.
- DON'T use the **word "parity"** anywhere in No-Parity dialogue,
  hooks, pitches, or partner-facing copy.
- DON'T suggest the partner is **required** to match external prices.
- DON'T write that external price gaps will lead to punishment,
  worse ranking, or reduced visibility.

When authoring new conversation options, the `compliance` field
('safe' | 'borderline' | 'risky') should reflect these rules:
**risky** is any line that breaks a DON'T above; **borderline** is a
line that flirts with one (e.g. proactive cross-channel framing in a
No-Parity market); **safe** is everything that stays inside both the
DO list and the regime's specific constraints.

### Clearance UI consistency

- Every clearance activity renders inside `<ClearanceShell>` which provides:
  - **Persistent progress strip** at the top (all 7 activities, current
    yellow, past blue with check, future grey).
  - **Standard intro block** beneath the strip: yellow eyebrow label +
    title (h1) + subtitle (one-line "what you'll do here"). Pulled from
    `data/clearanceActivities.ts` so each activity has consistent
    framing without re-implementing it.
- Activity screens themselves render only the activity-specific
  content. They do **not** add their own heading/subtitle (the shell
  does that).
- Activity screens use `height: 100%`, not `100vh`, so they fit inside
  the shell's flex content area.

### Q&A placement

- **Questions and instructions go ABOVE the data they refer to**, not
  below. Learners don't scroll to the bottom looking for prompts.
  Specifically: Data & Insights challenge questions sit above the KPI
  table; the table reacts to the answer (highlights correct/wrong
  rows) below it.

### Visual cues / "no spoonfeeding"

- **Severity colour-coding (red/amber/green) is removed from Portfolio
  partner cards and Partner Detail.** The data is shown in neutral
  tones; the learner has to read the numbers and decide. Discount
  product issues (misconfigured) are also rendered neutrally.
- **Severity colour-coding IS kept on the Data & Insights teaching
  screen** - that's a context where the colour IS the lesson.
- **RPDBadge labels** (Competitive / Slightly Below / Below Market /
  Poor) render in neutral grey across the app. The label still names
  the level; the colour no longer pre-judges.

### Round mechanic

- **10 rounds.** `TOTAL_ROUNDS = 10` in `gameEngine.ts` and
  `Header.tsx` (the latter for the dot indicator).
- **One action per round.** Each round, the learner picks ONE partner
  to engage; that's the action. Partners they don't pick neglect
  silently between rounds.
- The "right" partner each round is held in
  `data/correctPartnerPerRound.ts` per regime per round. For
  No-Parity the rotation is **John R1, Marina R2, Carlos R3** -
  matched to the per-round state baselines (below) so each round one
  partner is genuinely the worst on visible KPIs. John replaced
  Stavros as the R1 target in May 2026; Stavros's persona +
  conversation trees are moved to `pendingPartners` so they remain
  on disk for future reuse without filtering into the active
  portfolio.
- **Per-round partner state is scripted** in
  `data/partnerStateByRound.ts` and applied as an overlay by
  `applyRoundBaseline` in three places: `createInitialState` (R1
  starting state), `advanceRound` (after the round's neglect /
  history updates, so the new round's baseline takes precedence),
  and `startPracticeRound` (the baseline for whichever round is
  being practised). The engine's conversation outcomes only nudge a
  couple of legacy metric fields; without this overlay the headline
  KPIs never move and the same partner stays worst forever. The
  scripted arc for No-Parity today: R1 John in brand-first crisis
  (PACE -43% roomnights / -37% revenue YoY, ADR +10%, eRPD 9.5,
  lose-price 81%); R2 Marina's mobile gap escalates; R3 Marina
  recovering, Carlos's misconfigured Country Rate compounds.
- **Conversation data covers rounds 1-3 per partner today.** Rounds
  4-10 are not yet playable. `getConversationTree` returns undefined
  past round 3, which Practice Mode handles by locking those cards.
- **Only No-Parity is selectable today.** Marina, John, Carlos are
  the active No-Parity roster in `initialPartners`. Stavros,
  Hannah, Priya, Yuki are parked in a separate `pendingPartners`
  export in the same file - their persona data and conversation
  trees are intact and ready to be spliced back into the active
  roster if needed.

### Conversation structure

Two shapes coexist in the engine while partners are migrated from
the legacy 3-phase model to the new branching model. SME has
confirmed all scenarios will eventually be branching - the 3-phase
trees stay only as long as the existing Marina/Carlos R1-R3
content hasn't been rewritten (and John R1 is already in the new
branching shape).

**Shape detection.** `conversationInProgress.shape` discriminates at
engine and screen-routing level. `startConversation` checks
`getBranchingScenario(partnerId, round)` first; if a branching
scenario exists, shape is set to `'branching'`. Otherwise falls back
to the 3-phase lookup (`getConversationTree`). `App.tsx` routes to
either `ConversationScreen` (3-phase) or `BranchingConversationScreen`
based on the shape flag.

**3-phase (legacy):**
- Every conversation is **3 phases: Hook -> Diagnosis -> Pitch.**
  Mirrors the back half of Alex's Issue Tree flow taught in
  clearance.
- **Objection phase was removed in May 2026.** No SME-validated
  content for objection responses, so we pulled it rather than
  fabricate scoring.
- Each phase has 3 options scored on `compliance` and `styleMatch`.
  "Optimal" Diagnosis / Pitch are derived at grading time as the
  highest-`trustChange` option (metricEffects sum as tiebreak), so
  SME content authoring stays in one place.
- Files in `data/conversations.ts` + sidecars
  `conversations-{carlos,priya,yuki}.ts`. 6 partners x 3 rounds.

**Branching (SME-confirmed forward direction):**
- A `BranchingConversationTree` is a sequence of **steps** (typically
  4-6 exchanges). Each step has a partner prompt + 3 learner options.
  Each option carries its own `partnerResponse` (no trust-banded
  alternates), `styleMatch`, `compliance`, and `trustChange`.
- Optional **lightweight branching** via `option.nextPrompt`: if set,
  the next step's `partnerPrompt` is replaced with this string. Lets
  the partner's tone change based on the prior pick without authoring
  full alternate-step trees.
- Optional **per-step "optimal"** tag (`option.optimal: true`) marks
  the SME-preferred move at each step. Drives the heuristic
  diagnosis/pitch-correct readout on the Conversation Report; doesn't
  affect the floor.
- Each tree carries `issueTreePath` mapping the scenario to the
  Pricing Issue Tree leaf (trigger, issue, intent, root cause,
  metric insight, hook). Consumed by the Issue Tree Helper and -
  eventually - by a stricter grader that scores the learner's
  Helper pick against the prescribed path.
- Branching scenarios live in `data/scenarios/{partner}-r{n}.ts`,
  registered via `data/branchingScenarios.ts`. Coverage today: John
  R1 (Wide Parity, Brand.com loyalist).
- Grading uses `gradeBranchingRound` in `engine/grading.ts`. Minimal
  pass for v1: floor = right partner + all picks `compliance: 'safe'`
  + no -2 style mismatch. No "optimal diag / pitch" gate yet (will
  tighten once 3+ branching scenarios exist and per-step `optimal`
  tagging is consistent).

### Star grading and round gating

- Each round is graded **0-3 stars** by `engine/grading.ts` after the
  conversation completes. Result is shown on the new
  `ConversationReportScreen`.
- **Floor for any star (any of these failing = 0):**
  1. Right partner picked for the round.
  2. Optimal Diagnosis option chosen.
  3. Optimal Pitch option chosen.
  4. All picks `compliance: 'safe'`.
  5. No active style mismatch (no single phase pick at -2 against
     partner's primary style).
- **Above the floor:**
  - **2 stars:** style sum across Hook + Diagnosis + Pitch >= +5 on
    partner's primary style.
  - **3 stars:** style sum >= +6.
- Pass = >= 1 star. **`advanceRound` is a hard no-op when
  `roundStars[currentRound] < 1`** - the engine enforces the gate
  even if a path bypasses the report screen UI.
- **Retake reset.** On 0 stars, the engine's `resetRoundForRetake`
  restores the engaged partner from a snapshot captured at
  `startConversation`, returns the action budget to 1, and routes
  back to the portfolio. A failed conversation leaves no permanent
  metric or trust mark on the partner.
- **`roundStars` only goes up.** A retake or Practice Mode replay
  can raise the stored score, never lower it.

### Practice Mode (Debrief)

- After completing the sim, the Debrief shows a Practice Mode panel
  with a 10-card round grid, total stars counter, and target-partner
  label per card.
- Tapping a card calls `startPracticeRound(round)` which **resets all
  partners to baseline** and drops the learner into that round's
  portfolio. A practice attempt is a clean run, not a continuation
  of the previous playthrough.
- `isPracticeMode` is a `GameState` flag. When true,
  `onContinueAfterReport` routes back to the Debrief instead of
  advancing the round.
- Rounds without conversation data (currently 4-10) render as locked
  "Coming soon" cards. They auto-unlock once the conversation data
  is extended.

### Issue Tree Helper (guided diagnostic on Partner Detail)

A pre-call wizard that walks the learner through the Pricing Issue
Tree to land on a hook. Launched from a **square launcher tab**
pinned to the right edge of the Partner Detail screen: brand-yellow
gradient, TreeDeciduous icon, no text label, with a subtle infinite
yellow-glow pulse on `boxShadow` to draw the eye without moving the
tab. The tab carries a small navy dot in the icon's top-right
corner when the learner has any saved picks for the current
partner-round, signalling unfinished progress. The tutorial calls
out the helper as its final step so first-time learners know to
look for the yellow tree tab when they open a partner. Tab hides
while the drawer is open so the two affordances don't compete for
attention.

**Teach-mode in v1.** No scoring, no "you got it wrong." The wizard
walks the learner one column at a time, narrows option sets by prior
picks, and ends with a summary card listing the path + the suggested
hook with a one-line description. Scoring/validation against
`BranchingConversationTree.issueTreePath` can layer on later once
more scenarios land.

**Six steps**, mirroring the Issue Tree columns:
1. Trigger (Performance Outcome / Pricing Signal / Interaction / Programme)
2. Primary pricing issue (e.g. Brand.com eRPD not competitive)
3. Intent (Intentional / Unintentional)
4. Root cause (filtered by issue + intent)
5. Pricing metric insight ("the diagnose")
6. Pricing scenario hook ("the pitch angle")

**Data lives in `data/issueTree.ts`.** Each column is a flat list of
options with `valid*` arrays that gate downstream filtering. Coverage
today is full for the trigger + issue + intent columns and complete
for the Brand.com eRPD branch downstream. Key OTA eRPD branches are
stubbed with one representative option per column so the wizard
always offers plausible alternates; SME content for those branches
lands later.

**Chatbot-style floating drawer.** ~400x640 panel anchored to the
right edge, 16px gap from the screen edge, vertically centred.
Rounded corners all around with a shadow. NOT full-height and NOT
a modal - the learner can read the metrics, discount cards, PACE
card, and profile on Partner Detail while picking their way
through. No backdrop. Framer-motion handles enter/exit so the slide
animation and the vertical centring don't fight each other
(combining transforms in a plain CSS keyframe clobbered the y
centring during the slide). Closing does not lose picks.

**Picks persist per partner-round.** The Helper is a controlled
component; its `path` and `stepIndex` live in
`GameState.issueTreeHelperStates` keyed by `${partnerId}-${round}`.
Closing and reopening the drawer resumes the learner where they
left off rather than starting over. Reset only happens on full
restart (`onRestart`) and on practice-round entry
(`startPracticeRound`).

**Lives on Partner Detail only.** Not in the Conversation screen -
keeps the call surface clean and positions the Helper as a
pre-call think-time tool.

### Persona power effects (subtle gameplay)

Super-power personas (Conversation Architect, Objection Navigator,
Storyteller, Data Detective) used to be flavour-only. They now have
a subtle gameplay impact via **information asymmetry**, not grading
change. The grader doesn't see the persona at all - star scoring
stays transparent regardless of which persona was picked.

**Three surfaces:**

- **Partner Detail** - two new cards above the metrics block:
  - **Insight card** (full prominence, accent-coloured left border)
    surfaces the persona's strength applied to *this* partner-round.
    Always visible.
  - **Blind-spot card** (dimmed, dashed border, one-line teaser plus
    a "Reveal blind spot" button) holds the same persona's trade-off,
    collapsed by default. Tapping reveals the full content inline.
    Per the "hide when seen once" rule, once the learner has expanded
    the card for a given partner-round, it disappears entirely on
    subsequent visits to that partner-round.

- **Conversation Report** - a post-round persona retro line:
  - **`retroOnWin`** when the round earns >= 2 stars (strength
    credited).
  - **`retroOnLoss`** when the round earns 0 stars (trade-off named).
  - **Nothing** for 1-star scrappy passes - the persona didn't clearly
    carry or cost.

- **Debrief** - an aggregate persona block:
  - Counts strength-rounds (>= 2 stars) and trade-off-rounds (0 stars)
    across all 10 round slots from `roundStars`.
  - Renders as "As [persona] you played **X of 10** rounds where your
    strength carried, and **Y of 10** where the trade-off slowed you
    down. [coaching line]."

**Authoring lives in two places:**

- `SuperPowerPersona.powerEffect` in `data/characters.ts` -
  persona-fixed copy (`unlockedChip`, `mutedChip`, `retroOnWin`,
  `retroOnLoss`, `aggregateCoaching`).
- `data/personaHints.ts` - partner-specific content keyed by
  `partnerId x round x personaId`. Each entry has:
  - `unlocked` - the strength card body
  - `mutedTeaser` - the one-line collapsed prompt
  - `mutedFull` - the full reveal content

**Themes per persona** (consistent across all partner-rounds, so
SME authors know the slot they're filling):
- Conversation Architect - unlocks how-to-approach; mutes anomaly
  callout
- Objection Navigator - unlocks likely-objections preview; mutes
  relationship-tone hint
- Storyteller - unlocks one-line narrative summary; mutes raw-trend
  detail
- Data Detective - unlocks biggest anomaly highlighted; mutes style
  cue

**Coverage today:** R1 only, for the now-retired No-Parity trio
(Marina, Stavros, Carlos) authored before John replaced Stavros as
R1 target. **John has no personaHints content yet** - the persona
insight + blind-spot cards won't render for him until R1 hints are
authored. R2/R3 hints for Marina/Carlos and a full set for John
land alongside the next SME drop.

**State (`expandedBlindSpots: string[]` on `GameState`):** keys are
`${partnerId}-${round}` strings. Resets on full restart
(`onRestart`) and on practice-round entry (`startPracticeRound`),
so a clean attempt gets the hint surfaced again. Does **not**
currently survive a page reload; bump the persisted-state shape
in `util/persistence.ts` and `engine/gameEngine.ts` if you want
that.

**Don't bend grading numerically based on persona.** The effect is
informational only, by design. Adding a style-sum bump or a
floor-criterion exception for a persona breaks the "every learner
sees the same right answer" pedagogy.

**Colour tokens:** persona accents render via `--style-{red,yellow,
green,blue}` on white surfaces (Partner Detail, Debrief) and via
the brighter `--style-{red,yellow,green,blue}-bright` variants on
dark surfaces (CharacterBuild persona cards, Conversation Report
retro). The base red/blue tokens are tuned for light surfaces and
are unreadable on navy; the bright variants exist for exactly this
reason.

### Compliance + copy guardrails for in-game text

The legal compliance ruleset (Wide / Narrow / No-Parity / general
DOs and DON'Ts) is captured under [Compliance guardrails (legal)]
above. Beyond that, a few learner-facing wording shifts have landed
across the UI - log them here so the next agent doesn't re-do the
debate:

- **"Rate parity" wording has been retired from learner-facing
  copy** in favour of "**price competitiveness**". The legal
  guidance treats parity language as a regulatory hazard, especially
  in No-Parity markets. Where the Simulation Guide or the on-screen
  tips used to say "Check rate parity and discounts", they now read
  "Check pricing competitiveness and discounts"; the Dig deeper tip
  on RPD now lists "discounts, config issues, or price
  competitiveness" rather than "rate parity". The internal field
  `rateParity` on `PartnerMetrics` is unchanged - it's not surfaced
  to the learner, just used by the engine.
- **Data & Insights challenge 3-of-3 take-away** (in
  `data/dashboardHotspot.ts`) reads "loyal price is masking the
  underneath issue and the partner is using Genius rate as base
  price" - phrased as a story about the partner's behaviour, not as
  a generic "the public price is the problem" line.
- **Briefing copy** sits in `BriefingScreen.tsx` as four paragraphs:
  hook, situation, mission, clearance pre-condition. Voice is
  "we / you" with no role naming (see the role-agnostic copy rule
  in Voice and copy above).

### Persistence (localStorage)

- A slim slice of state survives a page reload via
  `util/persistence.ts`:
  - `learnerProfile`
  - `level0Progress.cleared`
  - `roundStars`
- Partner metrics, conversation state, current round, etc. **never
  persist** - those are per-playthrough and reset each session.
- Storage key is versioned (`rateRight:state:v1`). Bump the version
  in the source file if you change the persisted shape; older
  payloads are then dropped on load rather than crashing.
- Reset (via DevNav) calls `clearPersistedState` so a true reset is
  available.

### Partner KPIs

- The KPIs on partner cards and the Partner Detail screen are the real
  ones LPS use: **eRPD, eRPD change, RPD Public, RPD Loyal, Lose Price
  Public, Active Scenarios, Competitor**. Sourced from Chris's KPI
  spec on 2026-05-08.
- Legacy fields (`experiencedRPD`, `visibility`, `conversion`,
  `revenue`, `discountQuality`, `rateParity`) still exist on
  `PartnerMetrics` - they drive the conversation system and scoring
  internally. They're not displayed; they'll be retired post-MVP when
  the conversation system is rewired onto the new KPIs.
- **Year-on-Year (PACE) performance** is an optional partner-scoped
  block: `PartnerMetrics.pace?` with `period`, `roomnights`,
  `revenue`, `adr` (each carrying current / lastYear / relativeChange,
  plus currency for revenue and ADR), and an optional `dataPending`
  flag. Rendered as a dedicated "Year-on-Year Performance" card on
  Partner Detail when present, unless `dataPending: true` (in which
  case the card hides itself so the learner doesn't see rows of
  zeros). The card shows neutral tones - no severity colouring -
  per the no-spoonfeeding rule.
- **Three distinct PACE signatures** today, one per active No-Parity
  partner:
  - **John**: roomnights -43.34%, revenue -37.52%, ADR +10.27%.
    Classic brand-first collapse (pushing rates up, losing OTA
    volume). The R1 priority.
  - **Marina**: roomnights -11.44%, revenue -12.39%, ADR -1.41%.
    Moderate slow leak, consistent with the slow mobile gap.
  - **Carlos**: roomnights +4.28%, revenue +4.75%, ADR +0.94%.
    Surface-healthy growth - the Country Rate misconfig hasn't bitten
    PACE yet, which is exactly the trap that surfaces by R3.
- **`applyRoundBaseline` merges metrics** rather than replacing them
  (`{ ...partner.metrics, ...baseline.metrics }`). This is so
  partner-level "static" fields like the PACE block survive baseline
  application without having to be duplicated into every per-round
  baseline entry. Don't switch this back to a full replace - it
  would silently drop PACE on baseline-driven rounds.

### Parity regimes

- Four regimes: `wide`, `narrow`, `none`, `cross-regional`.
- **Currently only No Parity is selectable** in the Market Select
  screen. Narrow / Wide / Cross Regional are visually disabled
  ("Coming soon" pill, dashed border, not-allowed cursor) until the
  matching partner data lands (expected next week).
- **John is the No-Parity R1 target** as of May 2026. He sits in
  `initialPartners` alongside Marina and Carlos with
  `parityRegime: 'none'`. His R1 conversation is in the new
  branching shape (`data/scenarios/john-r1.ts`); the dialogue is
  written to be No-Parity compliant - the AM never proactively
  raises cross-channel pricing, cross-channel framing only kicks
  in after John self-discloses his lower direct rate, and the
  close asks for "the best price you're willing to make available
  to Booking.com" rather than "syncing competitiveness".
- Country-to-regime mapping is the single source of truth in
  `data/parityCountries.ts`. Wide is the default for any country not
  listed under No or Narrow. Cross Regional is tagged per-partner, not
  by country.
- The Portfolio filters partners to show only those whose
  `parityRegime` matches the learner's chosen market. Picking a regime
  with no partners shows an empty portfolio.

### Conversation choice surfacing

- **Compliance labels (Compliant / Risky / Borderline) are NOT shown
  next to options on the conversation screen.** Compliance is part
  of what the report card grades on, so surfacing the tag gives the
  test answer away. The option's `compliance` value still drives
  grading - the UI just doesn't reveal it pre-pick.

### Hard-gate at clearance

- Pass threshold is **80%** across attempted KC items, with all scorable
  activities fully attempted.
- Below 80%, the **Continue button on the Clearance Summary is
  disabled**. The learner has to use the per-activity Retry buttons
  to redo failed activities until the overall % climbs to 80% or higher.
- Cleared learners see the **Cleared Celebration screen** before
  landing on the Portfolio. Sub-80% "continue anyway" is no longer a
  path.
- Tutorial fires automatically (once per session) when the learner
  first lands on the Portfolio, regardless of cleared/non-cleared
  path. Reachable later via the Help icon in the Header.
- **Scored activities are Day one with Alex, Data & Insights, and
  Email Audit.** The Issue Tree reveal is completion-only. The
  Clearance Summary dedupes results by itemId before scoring so any
  re-record path can't inflate the percentage.
- **The summary does not reveal the correct answer for missed
  items.** Each missed-item card shows only the prompt plus a
  "marked incorrectly, hit Retry" hint. Revealing the answer pre-
  empts the retake.
- **Retry only re-runs the questions the learner got wrong.**
  `requestLevel0Retry` writes the failed itemIds to
  `level0RetryItemIds`, the activity screen filters its content to
  just those items, and `finishLevel0Activity` clears the flag.
  Correct answers from previous attempts stay in the results -
  they're not re-asked.

### Character build

- 8 hand-illustrated **WebP** avatars under `src/assets/avatars/`
  (`ava.webp` etc.), 4 femme-presenting and 4 masc-presenting. The
  files are 1024x1536 portrait (2:3) - the character-pick tile
  matches that aspect ratio (`aspectRatio: '2 / 3'`) so each
  illustration fills its tile exactly with no cropping, scaling, or
  per-avatar position workarounds. Each avatar carries its own
  `bgColor` in `data/characters.ts` so the pick grid reads as a
  varied set rather than a uniform wall of tiles. The IDs are stable
  across the earlier DiceBear migration so any previously-saved
  `learnerProfile.avatarId` values still resolve.
- **Avatars preload before the grid paints.** `CharacterBuildScreen`
  runs `img.decode()` over all eight at mount and only fades the
  grid in (opacity 0 -> 1) once `Promise.all` resolves. A 2.5s
  safety fallback flips ready anyway if any decode hangs. Stops the
  row painting tile-by-tile on first visit.
- Optional escape-hatch fields on `CharacterAvatar` -
  `objectPosition`, `scale`, `translateY`, `objectFit` - are kept
  for future images that don't share the 1024x1536 ratio. All eight
  current avatars leave them unset.
- `@dicebear/core` and `@dicebear/collection` are no longer imported
  anywhere; they can be removed from `package.json` in a tidy-up pass.
- 4 super-power personas (Conversation Architect, Objection Navigator,
  Storyteller, Data Detective).
- Super-powers now have **a subtle gameplay impact** via the persona
  insight + blind-spot cards on Partner Detail, the post-round retro
  on the Conversation Report, and the aggregate block on the Debrief.
  The effect is informational, not numeric - the grader stays
  persona-blind. See **Persona power effects (subtle gameplay)**
  above for the full spec.
- Player name lives on `learnerProfile.playerName`; default is
  `Name_Var` pre-SCORM. Once SCORM-wrapped, `cmi.core.student_name`
  populates this. The GM chat interpolates `{{name}}` in script lines.

### Device frames

- GM Chat sits inside a `PhoneFrame` (status bar with time/battery,
  dynamic island, home indicator, rounded bezel).
- Email Audit sits inside a `LaptopFrame` (silver MacBook-style
  aluminium body, camera notch, hinge dimple).
- Both frames use `position: absolute, inset: 0` (not `fixed`) so they
  fit inside the ClearanceShell's content area below the progress
  strip.

### Portfolio market banner

- The market update banner on the Portfolio has an **Acknowledge
  button**, not a Demand pill. The button toggles a per-round
  `marketUpdateAcknowledged` flag on GameState (resets on advance
  and on practice-round entry). On click the button swaps to an
  'Acknowledged' check pill; the banner text itself stays normal
  (no strikethrough).
- The Simulation Guide's 'Check the market update' step reads
  `marketUpdateAcknowledged` for its `done` state. The next step
  ('Pick the partner who needs you most') only becomes `active`
  once acknowledged, encouraging read-then-decide. Completed Guide
  steps don't strikethrough - text stays readable and a green check
  icon appears on the right.

### Fullscreen on launch

- The Splash 'Begin' button calls
  `document.documentElement.requestFullscreen()` inside the click
  handler. The click satisfies the API's user-gesture requirement
  so no permission prompt. Wrapped in try/catch with silent failure
  - some embed contexts (iframes without `allowfullscreen`,
  locked-down browsers) reject it, and the sim must still work in
  a normal window if so. Esc exits as expected.

### Briefing button adapts

- If the learner has cleared (`level0Progress.cleared` is true), the
  primary button on the Briefing reads "Open your portfolio" and
  routes straight to the partner sim.
- Otherwise it reads "Get clearance for mission" and routes to Market
  Select.

### DevNav

- Floating bottom-right button (lightning bolt) opens a panel with
  jump-to buttons for every clearance and partner-sim screen, plus
  Show Splash and Reset utilities.
- Visible in dev (`npm run dev`) or when `?dev=1` is in the URL.
  Hidden on production by default. Will be removed/further-gated
  before final delivery.

## How to run

```
cd client
npm install
npm run dev
```

Hosted at the URL on Render configured via `render.yaml` (auto-deploy
from `main` branch).

## Things to avoid

- Don't reintroduce em dashes (saved as a feedback memory).
- Don't add severity colour-coding to Portfolio / Partner Detail
  metrics - it makes "spot the bad partner" trivial.
- Don't add Level 0/1/2 prefix labels to learner-facing UI.
- Don't put questions/instructions BELOW the data they refer to.
- Don't invent dashboard layouts that mimic specific real tools - LPS
  use multiple existing tools, and we don't want to teach a fake one.
  The Data & Insights screen treats the table as universal data, not
  a specific dashboard.
- Don't add a screen-level intro/heading inside a clearance activity -
  that's the ClearanceShell's job. The activity should focus on the
  activity-specific content.
- Don't bend grading numerically based on the learner's persona pick.
  The persona power effects are informational only - adding a style-
  sum bump or a floor-criterion exception for a persona breaks the
  "every learner sees the same right answer" pedagogy.
- Don't reuse `--style-red` or `--style-blue` on dark navy
  backgrounds - they're tuned for light surfaces and read as muddy.
  Use the `--style-{accent}-bright` variants for any persona accent
  rendered on a dark surface.
- Don't use the phrase "rate parity" in any learner-facing copy.
  It's been replaced everywhere with "price competitiveness" because
  the legal compliance guidance treats parity language as a
  regulatory hazard (especially in No-Parity markets). The internal
  `rateParity` field on `PartnerMetrics` is fine - it's not surfaced
  to the learner.
- Don't restore the Issue Tree Helper to a centred full-height
  modal. The chatbot-style right-side drawer (~400x640) is
  intentional - it lets the learner peek at the metrics and PACE
  card while running the diagnosis. If it grows enough to need
  more space, scroll inside the drawer rather than expanding the
  drawer footprint.
- Don't switch `applyRoundBaseline` back to a full replace
  (`metrics: { ...baseline.metrics }`). It merges
  (`{ ...partner.metrics, ...baseline.metrics }`) so partner-level
  static fields like the PACE block survive baseline application
  without being duplicated in every round entry.
