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
  No-Parity the rotation is **Stavros R1, Marina R2, Carlos R3** -
  matched to the per-round state baselines (below) so each round one
  partner is genuinely the worst on visible KPIs.
- **Per-round partner state is scripted** in
  `data/partnerStateByRound.ts` and applied as an overlay by
  `applyRoundBaseline` in three places: `createInitialState` (R1
  starting state), `advanceRound` (after the round's neglect /
  history updates, so the new round's baseline takes precedence),
  and `startPracticeRound` (the baseline for whichever round is
  being practised). The engine's conversation outcomes only nudge a
  couple of legacy metric fields; without this overlay the headline
  KPIs never move and the same partner stays worst forever. The
  scripted arc for No-Parity: R1 Stavros crisis (eRPD 17.2, broken
  Last-Minute Deal); R2 Stavros recovering, Marina's gap escalates;
  R3 Marina recovering, Carlos's misconfig compounds.
- **Conversation data covers rounds 1-3 per partner today.** Rounds
  4-10 are not yet playable. `getConversationTree` returns undefined
  past round 3, which Practice Mode handles by locking those cards.
- **Only No-Parity is selectable today.** Marina, Stavros, Carlos
  are the active No-Parity roster in `initialPartners`. Hannah,
  Priya, Yuki are parked in a separate `pendingPartners` export in
  the same file - their persona data and conversation trees are
  intact and ready to be spliced back into the active roster when
  Narrow / Wide / Cross Regional become selectable.

### Conversation structure

- Every conversation is **3 phases: Hook -> Diagnosis -> Pitch.**
  Mirrors the back half of Alex's Issue Tree flow taught in
  clearance. The earlier Trigger / Intent / Root Cause / Metric
  phases of the Issue Tree happen pre-call on the portfolio +
  partner-detail screens, not inside the conversation.
- **Objection phase was removed in May 2026.** We don't have SME-
  validated content for what makes a good objection response, so we
  pulled it rather than fabricate scoring. The Issue Tree reveal
  still teaches learners to *anticipate* objections; we just stop
  short of practising the response.
- Each phase has 3 options scored on `compliance` ('safe' |
  'borderline' | 'risky') and `styleMatch` per communication style.
  The grader uses these directly - **never fabricate a separate
  ground-truth map.** The "optimal" Diagnosis and Pitch options are
  derived at grading time as the option with the highest
  `trustChange` (metricEffects sum as tiebreak), so SME content
  authoring stays in one place.
- Conversation files live in `data/conversations.ts` and the three
  sidecars `conversations-{carlos,priya,yuki}.ts`. 6 partners x 3
  rounds = 18 trees.

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

### Parity regimes

- Four regimes: `wide`, `narrow`, `none`, `cross-regional`.
- **Currently only No Parity is selectable** in the Market Select
  screen. Narrow / Wide / Cross Regional are visually disabled
  ("Coming soon" pill, dashed border, not-allowed cursor) until the
  matching partner data lands (expected next week).
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

- 8 hand-illustrated PNG avatars under `src/assets/avatars/`
  (`ava.png` etc.), 4 femme-presenting and 4 masc-presenting. Each
  carries its own `bgColor` in `data/characters.ts` so the pick grid
  reads as a varied set rather than a uniform wall of tiles. The IDs
  are stable across the earlier DiceBear migration so any previously-
  saved `learnerProfile.avatarId` values still resolve.
- `@dicebear/core` and `@dicebear/collection` are no longer imported
  anywhere; they can be removed from `package.json` in a tidy-up pass.
- 4 super-power personas (Conversation Architect, Objection Navigator,
  Storyteller, Data Detective).
- For MVP, super-power impact is **flavour-only** - they're surfaced in
  the GM intro and Debrief but do not affect scoring. Mechanic
  differentiation is post-MVP.
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
