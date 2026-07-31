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

**Current trajectory: September 2026 = full launch.** Confirmed
by Chris on 2026-07-14: complete sim across Levels 0 through 3,
rounds 1 through 20, Objection restored as a round scenario type,
OPC Application unlocked as Level 3. See the Post-2026-07-13
tweaks section under "Jul 2026 session update" for the launch
scope details and the significant build ahead.

**Historical context:** R2 was originally targeted at 2026-06-18
(Advanced View locked) after the original MVP date of 2026-05-18
slipped. R2 becomes a pre-launch milestone rather than the final
destination. The R2 scope items below (partner detail rework,
SCORM packaging, and so on) are historical about how the sim got
here. Level 3 content (OPC Metrics + Quality Adoption Metrics),
full Pricing Diagnostic Flow as live mechanic, post-sim
Diagnostic Tool, and manager dashboard were originally out of R2
scope but all ship for the September launch.

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

- **No em dashes (—) or en dashes (–) anywhere.** Plain hyphens (-),
  in code AND in the assistant's chat responses back to Chris (he
  reads the chat text too and em dashes there count as violations).
  Chris has corrected this three times now; memory file enforces.
  En dashes strip too as of Jul 2026 - even in numeric ranges
  ("5-10" not "5–10").
- **No "real-ish" (or similar hedges).** Use "worked example" or an
  unhedged descriptor. "Real-ish" reads as apologetic when the sim
  is deliberately teaching from a constructed scenario.
- **No "Level 0/1/2" labels in learner-facing copy.** Levels are
  internal SME terms. UI uses activity names ("Email Audit", "Day
  one", "Diagnose"). Internal code/types/route-ids can use level prefixes.
- **eRPD is partner-account level for LPS daily work.** Country-level
  is only the rollup objective. Don't say "your country's eRPD" in
  learner copy.
- **Internal-only metric names never appear in partner dialogue -
  including in deliberately-wrong learner options.** eRPD /
  Experienced RPD, Public RPD, Loyal RPD, Lose Price Public, and
  Competitive Partner Share / Price Bucket are LPS-side metric
  names. Partners don't see them and the learner must never say
  them aloud. Translate to partner-facing language in conversation
  dialogue: "visibility", "price competitiveness", "you're losing
  the price comparison on X% of searches", "what Genius members see
  vs what non-Genius traffic sees", "where your rates sit vs
  Brand.com / your key OTAs". Internal names are fine on the LPS
  dashboard / partner-detail screens (those are the learner's
  pre-call data view) and in code / type fields. **Critically: this
  ban also covers `risky` / `borderline` learner options where the
  intent is to teach the lesson by violation.** Legal will block
  the line even if it's flagged in-app as the wrong pick - the
  phrase appearing in any partner-facing dialogue string is the
  problem, not the grading around it. Compliance lessons must be
  taught through the *other* violation modes (ranking threats,
  parity-overreach in No-Parity markets, dictating external channel
  strategy, etc.).
- **No "parity" in conversations with No-Parity partners.** It's a
  partner-property filter on conversation options.
- **Supportive, collaborative vocabulary - not combative.** Calls
  with partners are framed as discussions, not arguments or
  fights. When authoring conversation options, persona hints, or
  any learner-facing copy that describes a partner approach,
  prefer the softer register: "discussion" / "conversation" /
  "case" / "rationale" over "argument"; "lead with X" / "raise X"
  over "attack X"; "work alongside the rule" / "acknowledge it"
  over "fight the rule head-on"; "framing question" over "framing
  fight". Describing a *partner's* behaviour as challenging or
  pushing back is fine (it's an accurate read); describing the
  *learner's* approach as combative is not - that's the register
  we're teaching them out of.
- **Role-agnostic copy.** Not all partner-facing roles are AMs - the
  briefing says "manage partner accounts" without naming the role.
- **Partners get hotel-styled names where ambiguity is possible.**
  The Issue Tree reveal's worked example is now **Hotel Atlante**,
  not "Maria". A first-name-only partner read as a possible LPS
  colleague, especially next to the Email Audit recipient who also
  happens to be a Maria. When introducing a new partner in a
  teaching context (worked examples, clearance copy), prefer the
  property name so the learner-vs-partner relationship is
  unambiguous. Pronouns shift to **they/their** when the referent
  is the hotel as an entity. Avoid "this account" / "partner
  account" - use partner-direct language ("this partner", "their
  pricing").
- **Partner-freedom statement is rendered in second person inside
  partner-facing copy.** The approved phrase becomes "**you as a
  partner are completely free to choose your own pricing and
  distribution strategy**" when the surrounding text is addressed
  directly to the partner (e.g. Sam's Email Audit drafts). The
  third-person "partners are completely free..." reads awkwardly
  in a direct-address email. Because we've adapted person/tense,
  treat this as the **approved partner-freedom statement** rather
  than a verbatim quote - the legal intent is preserved, the
  surface form adapts to context. The third-person form is still
  fine in LPS-side / training copy.

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
- **RPDBadge has been removed** from Portfolio, Partner Detail, and
  Debrief. The eRPD number is still shown prominently; the
  Competitive / Slightly Below / Below Market / Poor pill was
  redundant alongside the figure and risked steering the learner
  before they'd read the data. `getRPDLevel` + the `RPDLevel` type
  still exist in the engine in case the bucketing is needed
  elsewhere later.
- **RelationshipBadge is the only status pill** on partner cards
  and the Partner Detail header. It now carries an explicit
  "Relationship Status" label before the value (Warm / Neutral /
  Cool / Strained) so the term lands clearly, given it's a new
  concept for many learners.

### Round mechanic

- **10 rounds.** `TOTAL_ROUNDS = 10` in `gameEngine.ts` and
  `Header.tsx` (the latter for the dot indicator).
- **One action per round.** Each round, the learner picks ONE partner
  to engage; that's the action. Partners they don't pick neglect
  silently between rounds.
- The "right" partner each round is held in
  `data/correctPartnerPerRound.ts` per regime per round. For
  No-Parity the rotation is **Crystal Water Resort R1, Velvet Sky
  Boutique Hotel R2, The Noble Falcon Inn R3** - all three are
  SME-approved branching scenarios. For Narrow and Wide regimes,
  each round uses the corresponding regime variant - same data,
  same partner story, different regulatory framing.
- **Per-round partner state is scripted** in
  `data/partnerStateByRound.ts` and applied as an overlay by
  `applyRoundBaseline` in three places: `createInitialState` (R1
  starting state), `advanceRound` (after the round's neglect /
  history updates, so the new round's baseline takes precedence),
  and `startPracticeRound` (the baseline for whichever round is
  being practised). The engine's conversation outcomes only nudge a
  couple of legacy metric fields; without this overlay the headline
  KPIs never move and the same partner stays worst forever. The
  scripted arc for No-Parity today: R1 Crystal Water Resort in a
  Brand.com Competitiveness Gap (Sarah Bennett running cheaper
  promotional rates on her direct brand site, 202% page-view spike
  vs peer but Conversion -52%, Lose Price 99%, only Genius Programme
  active); R2 Velvet Sky Boutique Hotel in a milder but chronic
  Brand.com gap (John Whitford aggressively discounting on his
  direct site, zero active Booking.com pricing tools, Lose Price
  99% with mild +0.53 YoY eRPD change); R3 The Noble Falcon Inn in
  a structural Brand.com competitiveness gap (eRPD 17.0% with
  +21.42 percentage points YoY, Lose Price 93%, four active
  scenarios including the Brand Scenario). All three priorities
  also stand up for Narrow and Wide regimes - same data, regime-
  specific dialogue (see
  `data/scenarios/crystal-water-{none,narrow,wide}-r1.ts`,
  `data/scenarios/velvet-sky-{none,narrow,wide}-r2.ts`, and
  `data/scenarios/noble-falcon-{none,narrow,wide}-r3.ts`).
- **Conversation data covers Crystal Water Resort R1, Velvet Sky
  Boutique Hotel R2, and The Noble Falcon Inn R3 as SME-approved
  branching scenarios across all three regimes, plus Marina R1-R3
  and Carlos R1-R3 as 3-phase distractors.** Rounds 4-10 are
  non-playable today (TOTAL_ROUNDS is capped at 3 in
  `gameEngine.ts`). `getConversationTree` returns undefined past
  round 3, and `getBranchingScenario` resolves at R1 (Crystal
  Water), R2 (Velvet Sky), and R3 (Noble Falcon); Practice Mode
  handles missing rounds by locking those cards.
- **No Parity, Narrow Parity, and Wide Parity are all selectable
  today** in Market Select. Cross Regional is still gated. The
  active roster is Marina, Carlos (R1 and R3 distractors), Raven
  Inn and Driftwood Bay Resort (R2 distractors), plus the three
  Crystal Water variants (R1 priority across regimes), the three
  Velvet Sky variants (R2 priority across regimes), and the three
  Noble Falcon variants (R3 priority across regimes). Distractor
  partner records are tagged `parityRegime: 'none'` but appear on
  all three regimes' portfolios via the explicit
  `portfolioByRound` mapping. John Marston moved back to
  `pendingPartners` in June 2026 alongside Stavros, Hannah, Priya,
  Yuki.
- **Per-round portfolio composition is explicit** in
  `data/portfolioByRound.ts`. Three cards per round in the early
  rounds (one priority + two distractors) is the design target -
  Noble Falcon Inn doesn't appear on R1 or R2 because its static
  metrics (eRPD 17% / Bucket 7) would dominate the puzzle visually
  long before R3 is the right call. The mapping is the source of
  truth on Portfolio renders - it ignores each partner's own
  `parityRegime` field when an entry exists, which lets the same
  distractor record (e.g. Marina with parityRegime 'none') appear
  on Wide / Narrow / No-Parity portfolios without per-regime
  clones. Sibling of `correctPartnerPerRound.ts`: keep them in sync
  - the priority partner per round MUST be present in the
  corresponding portfolio list, otherwise the round is unwinnable.

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
  Mirrors the back half of Alex's Diagnostic Flow taught in
  clearance.
- **Objection phase was removed in May 2026.** No SME-validated
  content for objection responses at the time, so we pulled it
  rather than fabricate scoring. **Objection returns for the
  September 2026 launch, but as a round scenario type** (each
  round is an objection scenario diagnosed via the Pricing
  Diagnostic Flow), **not as a fourth conversation phase**.
  Full trajectory in the Post-2026-07-13 tweaks section.
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
  Diagnostic Flow leaf (trigger, issue, intent, root cause,
  metric insight, hook). Consumed by the Diagnosis Coach drawer
  and - eventually - by a stricter grader that scores the
  learner's Coach pick against the prescribed path. (Internal
  field name `issueTreePath` kept per the rename precedent.)
- Branching scenarios live in `data/scenarios/{partner}-r{n}.ts`,
  registered via `data/branchingScenarios.ts`. Coverage today: John
  R1 (Wide Parity, Brand.com loyalist).
- Grading uses `gradeBranchingRound` in `engine/grading.ts`. Minimal
  pass for v1: floor = right partner + all picks `compliance: 'safe'`
  + no -2 style mismatch. No "optimal diag / pitch" gate yet (will
  tighten once 3+ branching scenarios exist and per-step `optimal`
  tagging is consistent).

### Distractor design

The three-option pattern (Hook / Diagnosis / Pitch phases in the
3-phase model, per-step options in the branching model) leans on
distractor quality for its teaching power. A round where the
correct answer is obvious - because both distractors are visibly
wrong - lets the learner pattern-match without engaging with the
reasoning.

**Rule: at least one distractor per option triad must be "close
but not quite".** A plausible option that stays inside the safe
register on first read but carries a specific nuance that makes
it less correct than the optimal pick. The other distractor can
be more clearly wrong (visible compliance breach, obvious style
mismatch, wrong diagnostic angle), but at least one has to force
the learner to compare fine-grained differences.

Nuance shifts that count as "close but not quite":

- Right diagnostic angle, wrong framing for the partner's regime
  (e.g. proactive cross-channel talk in a Narrow market vs the
  Brand.com-only version needed there)
- Right pitch, wrong tone for the partner's communication style
  (e.g. a data-heavy delivery to a green/relationship-led
  partner)
- Right metric, delivered without the setup context that makes
  it land
- Right question, but phrased in a way that presumes intent
  (which the neutral compliant version deliberately avoids)
- Right destination, wrong route (arrives at a compliant hook
  but via a step that oversteps - e.g. asking for parity in a
  No-Parity market before landing on the neutral ask)

Applies to both 3-phase legacy trees and the branching
scenarios' per-step options. When reviewing new SME-drafted
content, if the two distractors both read as "obviously wrong,"
push back and ask for one of them to be rewritten as a
plausible near-miss.

### Conversation screen visuals (softphone)

Both `ConversationScreen` (3-phase) and `BranchingConversationScreen`
(branching) render inside a **softphone-style call card** rather
than a chat UI - the surrounding language already says "Begin
Conversation" / "Call complete" / "See round report", and the
visual now matches.

- **Wrapper**: `--off-white` background with 12px padding so the
  card floats as a sibling to the GuidePanel (matching the panel's
  own 12px margins). Earlier the white banner was a full-width
  child of an off-white column that butted directly against the
  GuidePanel and read as "cut" at the edge - the floating card
  fixes that.
- **Header strip**: dark navy gradient, green `PhoneCall` badge,
  partner avatar circle tinted with the partner's communication-
  style colour, then `[Property] · Live · mm:ss` with a pulsing
  green dot and a real call-duration timer ticking up from mount
  via `useEffect` + `setInterval`. The timer is cosmetic only - no
  engine state depends on it.
- **Step indicator**: 3-phase scenarios keep named Hook /
  Diagnosis / Pitch pills (the triad is part of the lesson);
  branching scenarios use numbered dots since they can run up to
  six steps.
- **Transcript**: gradient `--white` to `--off-white`. Speaker
  caption (`[FirstName] says`) + quoted speech rendered with the
  partner's style colour as a 3px left accent bar. Plain (non-
  italic) body type - italics felt too transcript-y.
- **Response footer**: "Your response" caption + option cards.
  Branching options lead with the move label uppercased and quote
  the spoken line beneath; 3-phase options lead with the label
  and show the move description beneath (the legacy data shape
  doesn't carry a clean `playerDialogue` per option).
- **Completion state**: "Call complete · Duration mm:ss" alongside
  the See round report CTA. Lines up with the Conversation
  Report's existing "Call" framing.
- **Round advance**: the Conversation Report's Continue button is
  the only thing that advances the round. The old Portfolio
  action bar (with Advance Round) was removed in May 2026 since
  it always read 1-action-remaining and added a redundant click.

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
  metric or trust mark on the partner. The retake only marks the
  engaged partner as "previously engaged this round" when they
  were the WRONG pick (checked via `getCorrectPartnerForRound`),
  so right-partner-with-bad-responses can retake with the same
  correct partner without Begin Conversation locking. See the
  Retake bug fix note under Post-2026-07-13 tweaks for context.
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

**Renamed to "Diagnosis Coach" in Jul 2026 user-facing copy - internal
identifiers kept.** See the "Jul 2026 session update" section below
for the rename, coach-mode intro, auto-suggest, enlarged launcher
tab with "COACH" label, and pause-during-drawer-open idle-nudge
interaction. Section below still describes the drawer's mechanics
which are unchanged.

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

**Six steps**, mirroring the Diagnostic Flow columns:
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
a modal - the learner can read the metrics, discount cards, and
profile on Partner Detail while picking their way
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

**Round 1 gate.** Opening the Helper at least once is mandatory in
Round 1 - the Partner Detail Begin Conversation button is disabled
until `GameState.hasOpenedIssueTreeHelper` flips to true. The
Simulation Guide for Round 1 partner-detail surfaces an "Open the
Issue Tree Helper" step that goes from active to done on first
open. The flag is one-shot per playthrough (lifts permanently
after the first open) and resets only on `onRestart`; practice
rounds preserve it so returning learners aren't re-gated. Rounds
2+ leave the Helper optional. Don't gate via Round 1's correct
partner specifically - the gate is about getting the learner to
discover the tool, not enforcing diagnostic use.

**Progress bar uses brand-blue, not success-green.** Completed
steps render `var(--brand-blue)` rather than `var(--success)` to
avoid implying the learner has made the "correct" pick - the
Helper is teach-mode and doesn't score picks. Active step stays
brand-navy; pending stays grey.

**Lives on Partner Detail only.** Not in the Conversation screen -
keeps the call surface clean and positions the Helper as a
pre-call think-time tool.

### Persona power effects (subtle gameplay)

**Refactored in Jul 2026 into a single Persona Lens chip on Partner
Detail** (replaced the Insight + Blind Spot cards). See "Jul 2026
session update" below for details. Section here still holds for
the retro line on Conversation Report and aggregate block on
Debrief; those surfaces are unchanged.

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

**Coverage today:** R1 hints authored for Marina and Carlos plus
the parked John and Stavros (kept in sync for reuse). R3 hints
authored for The Noble Falcon Inn across all three regimes. R1
priority (Crystal Water Resort) and R2 priority (Velvet Sky
Boutique) hints land alongside the partner record drops.

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
  on RPD now reads "**High** RPD can stem from missing or
  misconfigured discounts, config issues, or weak price
  competitiveness" (lower RPD is the healthy state - the previous
  "Low RPD can stem from..." phrasing had the direction reversed).
  The internal field
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
- **The Year-on-Year (PACE) card was retired in 2026-06.** SME
  confirmed the next 3M Room Nights tile (in the secondary metrics
  row) carries the forward-looking signal the PACE card was
  duplicating, and the YoY card itself wasn't part of the
  finalised dashboard layout. The `PacePerformance` type and
  `PartnerMetrics.pace` field were removed from the schema; the
  `PacePerformanceCard` / `PaceRow` components and the
  `formatNumber` helper were dropped from
  `PartnerDetailScreen.tsx`. Don't bring it back without an SME
  request - if YoY context is needed for a story (e.g. the
  brand-first crisis John was telling), encode it in profile
  notes or the persona-hint copy instead of as a separate card.
- **`applyRoundBaseline` merges metrics** rather than replacing them
  (`{ ...partner.metrics, ...baseline.metrics }`). This was
  originally so partner-level "static" fields like the PACE block
  survived baseline application without being duplicated in every
  per-round baseline entry. The PACE block is gone but the merge
  still matters - it keeps any other partner-scoped static fields
  (e.g. `activeScenarioNames` when only set at the partner level)
  intact when a per-round baseline overlays only the round-specific
  numbers. Don't switch this back to a full replace.

### Parity regimes

- Four regimes: `wide`, `narrow`, `none`, `cross-regional`.
- **Currently only No Parity is selectable** in the Market Select
  screen. Narrow / Wide / Cross Regional are visually disabled
  ("Coming soon" pill, dashed border, not-allowed cursor) until the
  matching partner data lands (expected next week).
- **The Noble Falcon Inn sits at R3 as a pedagogical stretch;
  Sheet 7 places it at Round 10 as its target home.** SME's
  Partner Data Set 46 (Sheet 7 of the "2026 Pricing Learning -
  Data examples" workbook) tags Noble Falcon as Round 10 content.
  It's been pulled forward to R3 in the current sim so testers
  can experience a genuinely complex partner (eRPD 17%, +21pp
  YoY, four active scenarios, Brand Scenario active) inside the
  playable window, before R4-R9 SME priority content lands.
  Noble Falcon moves back to Round 10 as the remaining rounds
  get authored. Originally mis-slotted at R1 (the source doc was
  titled "Rate Right - Round 1") and then briefly at R10 before
  landing at R3 in 2026-06. Three regime variants of the same hotel (Wide /
  Narrow / None) sit in `initialPartners` alongside Marina, John,
  and Carlos; their data is shared via the `nobleFalconBase()`
  helper in `data/partners.ts`, only location + `parityRegime` +
  the property image differ. The contact `Anton Müller` is
  consistent across all three (blue/thinker primary + red/driver
  secondary). Conversation files are
  `data/scenarios/noble-falcon-{none,narrow,wide}-r3.ts` - the
  four regime-agnostic steps live in `noble-falcon-base.ts` and
  only Steps 3 + 4 (the parity ask and the risk solution) carry
  the regime-specific dialogue from the SME doc.
- John R1 is a **placeholder** No-Parity Round 1 priority pending
  the SME-approved Crystal Water Resort drop. Scenario file
  `data/scenarios/john-r1.ts` is in the new branching shape; the
  dialogue is No-Parity compliant - the AM never proactively
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
- **Email Audit phrase content is keyed by parity regime.**
  `data/emailAudit.ts` exports `emailAuditByRegime` plus a
  `getEmailAudit(regime)` helper - Wide / Narrow / No Parity each
  have their own 5-phrase set drawn from the regime-specific
  legal compliance guidance. The learner only ever sees phrases
  that apply to the regime they picked at Market Select
  (e.g. "your rates should align with Brand.com" is approved in
  Narrow, irrelevant in No Parity). The Clearance Summary's
  missed-item lookup also uses the regime-specific scenario so
  retry copy matches what the learner saw. Cross-Regional falls
  back to Wide until its rules are authored.
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
- **The GM pricing-pyramid distractor is Review Score, not ADR.**
  The Day-one-with-Alex "which metric is NOT on the pyramid" knowledge
  check (`gmScript` beat in `data/gameMasterScript.ts`) uses Review
  Score as the correct (i.e. not-a-driver) answer. ADR was previously
  here but was muddy because ADR can indirectly influence eRPD, so
  the question could be argued either way. Review Score is cleanly
  outside the pricing pyramid - it shapes overall partner performance
  without being a pricing driver - and the follow-up copy spells that
  out. If you re-author this beat, keep the distractor cleanly
  non-pricing.

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
- `@dicebear/core` and `@dicebear/collection` were dropped from
  `package.json` in Phase 1 (no current imports). Don't add them back
  unless we reintroduce procedurally-generated avatars; the WebP
  illustrations are the avatar source today.
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
- **Both frames accept two backdrop props.** Use `backdrop` for any
  CSS background value (gradients, layered values, url()) that
  overrides the default navy radial gradient. Use `backdropImage`
  (added May 2026) for an image URL that should fade in as a real
  `<img>` element. The `backdropImage` path renders via an internal
  `ImageBackdrop` helper that gates the framer-motion opacity
  transition on the image's `onLoad`, so the fade starts only once
  the bitmap is paintable rather than running against an empty img.
  GM Chat phone uses `gm-chat-backdrop.webp` (city-window office
  scene); the Email Audit laptop uses `email-audit-backdrop.webp`
  (notebook and mug on a clean desk). Both go through `backdropImage`
  - they used to render via CSS `background`, which doesn't transition
  at all, so the fade never played.
- **All full-bleed backdrops are compressed WebP.** Splash
  (`splash-dark.webp`), Cleared Celebration (`cleared-dark.webp`),
  Data & Insights (`data-insights-backdrop.webp`), GM Chat, and
  Email Audit. The compressed batch dropped ~9.3MB of source PNG to
  ~234KB of WebP across initial-paint assets (~97% reduction) with
  no visible quality loss on these stylised illustrations.
- **Backdrop fade pattern: `motion.img` with `onLoad`-gated opacity.**
  At this WebP size (30-80KB each) the older `img.decode()` pre-mount
  gate is no longer needed - WebP doesn't show the band-reveal that
  motivated the decode pattern on the original 1.5-2.2MB PNGs.
  Splash and Cleared Celebration now mount the `motion.img`
  immediately and fade over 0.4-0.5s; Data & Insights uses the
  `onLoad` gate (without it, framer-motion finishes its 0->1 opacity
  transition before the bitmap arrives and the image pops in at full
  opacity). Any future full-bleed backdrop should follow the
  `onLoad`-gated motion.img pattern rather than reintroducing the
  decode-and-wait approach.
- **Data & Insights content is constrained to a 960px column.** The
  question strip, KPI table, and feedback all sit inside a centred
  max-width wrapper so the screen doesn't feel awkwardly stretched
  on wide viewports. The backdrop and bottom border still span full
  width; only the content column is constrained.

### Portfolio market banner

- The market update banner on the Portfolio is **read-only** - the
  yellow band with the seasonal note carries the information, and
  the learner moves on. The earlier Acknowledge button and its
  `marketUpdateAcknowledged` GameState flag were retired in
  2026-06 alongside the Actions pill, on the same principle: the
  click did nothing the learner could see (the Simulation Guide
  step it gated had already dropped strikethrough feedback because
  not all Guide steps could be tracked consistently). Don't add it
  back unless we have a reason to *gate* something on it; a
  "tap-to-acknowledge" with no downstream effect is friction
  without payoff.
- The Simulation Guide's portfolio steps ("Check the market
  update", "Pick the partner who needs you most") are now both
  untracked reminder items - neither carries a `done` flag. The
  rendering style still supports `active` / `done` for screens
  where tracking is consistent (e.g. the in-call Hook / Diagnosis
  / Pitch progression).

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

## Release 2 scope (active, branch `release-2-partner-detail`)

**Test target: 2026-06-18, Advanced View locked.** Source spec is
the "Partner Metrics" PDF (`C:\Users\chris\Downloads\Partner
Metrics.pdf`) - pages 1, 12-17 describe the Partner Detail rework,
pages 4 + 21 + 23 carry metric definitions and the eRPD price-bucket
thresholds, page 19 carries example partner profile + commercial
goal copy.

### Production format: fully self-contained SCORM 1.2 package

- Final deliverable is a **single `rate-right.zip`** with HTML/JS/CSS
  bundle, all WebP assets, fonts, the SCORM manifest, and the PDF
  library for the debrief export. **No external hosting at runtime** -
  the LMS unzips the package and serves it from its own infrastructure.
- `vite.config.ts` ships with `base: './'` so the build works from any
  nested LMS path.
- Persistence adapter (`util/persistence.ts`) targets
  `cmi.suspend_data` via a pipwerks-style SCORM 1.2 wrapper, with the
  existing `localStorage` path retained as the dev fallback (auto-
  selected when the SCORM API isn't present on `window`).
- Learner name flows from `cmi.core.student_name` into
  `learnerProfile.playerName` (overrides the `Name_Var` default).
- `cmi.core.lesson_status` is set on Clearance pass and on
  Debrief render; `cmi.core.score.raw` carries the clearance %.
- `client/scripts/build-scorm.mjs` runs `npm run build` (which puts
  `imsmanifest.xml` from `client/public/` at the dist root) and then
  zips the contents of `dist/` into `rate-right.zip` at the repo root.
  Zip generation uses the OS-native tool (PowerShell `Compress-Archive`
  on Windows, `zip -r` elsewhere) rather than a JS lib, because every
  `node_modules`-resident archiver kept tripping OneDrive sync
  interference on Windows; don't reintroduce a JS-based zip dep.
- **Render stays as the dev/SME preview channel until 2026-06-18**,
  then is retired. The production deliverable does not depend on it.
- The `@dicebear/*` deps (no longer imported anywhere) have been
  dropped from `package.json` in the same pass that wired up the SCORM
  build, to keep the zip lean.
- **Phase 1 landed (commit on `release-2-partner-detail`):** SCORM
  wrapper (`util/scorm.ts`), persistence dispatch
  (`util/persistence.ts` - SCORM `cmi.suspend_data` inside an LMS,
  `localStorage` outside), session lifecycle on `pagehide`,
  `reportLessonStatus('passed')` + `reportScore(clearancePct * 100)`
  on Clearance Summary continue, `reportLessonStatus('completed')`
  on Debrief mount, LMS `cmi.core.student_name` seeding the fresh-
  boot `playerName`, manifest at `client/public/imsmanifest.xml`,
  `npm run build:scorm` producing `rate-right.zip` at the repo
  root. Untested in a real SCORM LMS yet - SCORM Cloud smoke test
  is the next gate before the 2026-06-18 test pass.
- **Phase 2 landed (commit on `release-2-partner-detail`):** Partner
  Detail rebuilt to match the Partner Metrics PDF.
  - `types/index.ts`: new `SecondaryMetricValue` /
    `PartnerSecondaryMetrics` shapes; `PartnerMetrics` carries
    `secondaryMetrics`, `lastPricingContactDaysAgo`,
    `pricingCoverageQTD`,
    and `activeScenarioNames`; `DiscountProductId` expanded to the
    PDF's 11-product taxonomy (legacy `genius`, `last-minute`,
    `early-booker` IDs retained so parked-partner seed data still
    compiles); `DiscountProduct.category` drives the 3-column
    grouping; `DiscountCategory` type added.
  - `engine/gameEngine.ts`: new `getPriceBucket(erpd)` mapping eRPD
    to buckets 1-7 with thresholds verbatim from PDF page 23.
  - `data/metricDefinitions.ts`: every Driving Metrics label and a
    placeholder for the locked Advanced View labels carry plain-
    English `helpText` for the `<MetricLabel>` tooltip.
  - `data/partnerStateByRound.ts`: John R1 baseline now carries the
    full PDF page 1 data (six secondary metrics including the three
    `(xx)` data-pending comparators, Last Pricing Contact stored
    as a relative offset (the John baseline used 126 days back
    against an authoring date of 2026-06-04 - rendered live as
    `today - 126 days`),
    Pricing Coverage 24%, scenarios Brand.com + App). Marina and
    Carlos R1-R3 also gained secondary-metrics blocks consistent
    with their narrative arcs.
  - `data/partners.ts`: Marina, John, and Carlos rebuilt around the
    11-product / 3-category discount taxonomy. John's adoption
    profile matches the PDF (Mobile Rates, Genius Programme, Base
    Rate Plan active; everything else inactive). Carlos's Country
    Rate stays `misconfigured` - that's the R3 trap. Parked
    partners (Stavros, Hannah, Priya, Yuki) keep their legacy
    5-product lists; their records render via the
    `DiscountProductsGrid` flat-list fallback.
  - `components/MetricLabel.tsx`: shared label + info-icon tooltip
    used everywhere on the Driving Metrics tab. Hover OR tap to
    open, outside-click to dismiss, configurable alignment.
    **Info vs data variants are auto-detected from the `helpText`
    prop shape**: plain strings are descriptions (icon is grey, the
    default), `ReactNode` values are live partner data (icon turns
    brand-yellow). Same circled (i) shape either way so the
    affordance reads as "click for tooltip"; the colour tells the
    learner whether they'll see a definition or a value. Default
    icon size is 13px with `strokeWidth: 2.25` for prominence -
    smaller tiles (Secondary metrics, Profile-meta rows) pass
    explicit `iconSize` overrides to keep proportions tight.
  - `components/PriceBucketStrip.tsx`: 7-segment colour strip
    (green -> red) with a "Bucket N · eRPD X%" callout pinned over
    the partner's segment. Each segment carries its own hover
    threshold tooltip; the strip's overall label has the long-form
    definition tooltip via MetricLabel. Reads `getPriceBucket` from
    the engine - no parallel implementation.
  - `screens/PartnerDetailScreen.tsx`: tab bar above the metrics
    block, Driving Metrics active + Advanced View locked with
    "Coming Soon" pill. Driving Metrics tab renders the existing
    KPI row (now with inline help on every card and an Active
    Scenarios click-popover) followed by the eRPD Price Bucket
    strip and the six secondary metric cards. Discount Products
    restructured into the 3-column
    grid with the SME-authored footer note. Right-hand profile
    card gains a `ProfileMetaFields` block below Notes for Last
    Pricing Contact + Pricing Coverage (QTD). The existing
    Action card (Begin Conversation / Issue Tree gate / etc.)
    is unchanged - the "Open the Issue Tree Helper before you
    engage" state on it already matches the PDF gate-tile spec.
  - Verified via `npm run build` (clean TS + 820KB JS / 227KB
    gzipped). Browser test on the deployed Render URL is the next
    gate.
- **Phase 3 landed (commit on `release-2-partner-detail`):** Debrief
  downloadable summary PDF.
  - `package.json` adds `jspdf` ^3.0.1 as a runtime dep.
  - `util/debriefPdf.ts` builds an A4 PDF from the run's data:
    cover (name, persona, regime, completion date, overall grade,
    portfolio RPD, relationship health), round-by-round results
    (10 rows showing target partner, engaged partner if different,
    stars), Well done section (persona `retroOnWin` + the rounds
    that scored 2-3 stars), Coaching focus section (persona
    `retroOnLoss` + the 0-star rounds with the partner the learner
    picked vs the target), and a Where-to-grow-next aggregate
    coaching line. Pure text - no images, no fonts beyond the
    Helvetica that ships with jsPDF.
  - jsPDF is loaded via **dynamic import** (`await import('jspdf')`)
    so the ~770KB of jsPDF + html2canvas + dompurify chunks are
    lazy-loaded only when the learner clicks Download. Main bundle
    stays at 827KB - same as Phase 2 + 7KB for the wire-up.
  - `DebriefScreen.tsx` gains a yellow "Download your summary" CTA
    next to the existing "Play Again" button. The button hides
    gracefully if `learnerProfile` isn't passed (backwards-compat
    for non-App callers).
  - `App.tsx` passes `state.learnerProfile` through to the Debrief
    so the PDF can address the learner by name.
  - Filename pattern: `rate-right-summary-{slug}-{YYYY-MM-DD}.pdf`.
  - No backend, no network call - generated entirely client-side
    inside the SCORM zip. SCORM zip output went 1.44MB -> 1.68MB
    to accommodate the lazy-loaded jsPDF chunks (still fine for
    LMS upload).

### Partner Detail restructure

Source: PDF page 1 (Release 1 / current scope), pages 2-3 (Releases
2-3, locked).

**Top of main column - unchanged from today:**
- Property manager communication style chip (red/yellow/green/blue) +
  Relationship Status pill.
- Learner-persona insight card + blind-spot card. The persona effect
  spec under "Persona power effects (subtle gameplay)" still applies -
  these cards are not part of the R2 rework.

**Below that - new tabbed block:**
- **Tab bar:** `Driving Metrics` (active) | `Advanced View` (locked,
  "Coming Soon" badge). Tab styling lifts from the existing pill/chip
  vocabulary. Locked tab is not clickable in R2.
- **Driving Metrics tab contents (top to bottom):**
  1. **Existing KPI row** kept: eRPD, RPD Public, RPD Loyal, Lose
     Price Public, Active Scenarios, Competitor.
  2. **eRPD Price Bucket strip** (new) - see "eRPD Price Bucket"
     section below.
  3. **Six secondary metric cards** (new): Last 30D ABRN (vs last
     year), Last 30D Room Nights (vs peer), Last 30D ADR (vs peer),
     Last 90D Page Views (vs peer), Last 90D Conversion (vs peer),
     Next 3M Room Nights (vs peer). Each carries primary value + a
     parenthesised comparator delta. `(xx)` from the PDF means "data
     pending / value to come" - render the pill with a "Data pending"
     dimmed treatment.
  4. **Discount Products** restructured into 3 columns (see "Discount
     Products" section below).

**Advanced View tab (locked in R2):**
- Renders the page-1 "Coming Soon" treatment: dimmed tab with a lock
  icon, click no-ops. PDF page 2 (Release 3) and page 3 (Release 2)
  layouts are the design targets for later - **OPC Metrics** column
  (Unsold Rooms, Sell Through Rate vs Peer, Distribution of Search,
  Visibility Share vs Peer, Click Through Rate vs Peer, Conversion vs
  Peer, Search Price vs Peer) and **Quality Adoption Metrics** column
  (Weighted Adoption %, Utilization %, Discount Depth, Discount
  Contribution, True discount fraction, True discount contribution).
  Definitions per PDF page 21.

### eRPD Price Bucket strip

Source: PDF page 23 (thresholds), page 1 (visual placement).

- **Seven buckets, 1 = most competitive, 7 = least competitive.**
  Lower bucket = lower eRPD = partner's prices are closer to / below
  Key OTA + Brand.com benchmark; higher bucket = partner is more
  expensive, more likely to be the round's priority call.
- **Thresholds (verbatim from PDF page 23, "Details" column).**
  Boundary values land in the lower bucket - so exactly 3.0 lands
  in Bucket 3 (not 4), exactly 12.0 lands in Bucket 6 (not 7), etc.:
  - Bucket 1: eRPD ≤ -3%
  - Bucket 2: -3% < eRPD ≤ 0%
  - Bucket 3: 0% < eRPD ≤ 3%
  - Bucket 4: 3% < eRPD ≤ 6%
  - Bucket 5: 6% < eRPD ≤ 9%
  - Bucket 6: 9% < eRPD ≤ 12%
  - Bucket 7: eRPD > 12%
- **Visual:** continuous CSS gradient from dark green (B1) through
  light green (B2), yellow (B3), orange (B4), light red (B5), red
  (B6), dark red (B7), with thin separators marking the seven
  segments. Marker callout above the strip pins this partner's
  bucket. Callout reads `Bucket {n} - eRPD {value}%` in small type.
- **Tooltip-only thresholds.** Hovering / tapping any segment surfaces
  its threshold via the shared `<MetricLabel>` tooltip pattern. The
  strip itself stays clean (page-1 style), not the legend-heavy page-23
  style.
- **Engine:** new `getPriceBucket(erpd: number): 1 | 2 | 3 | 4 | 5 | 6
  | 7` in `engine/gameEngine.ts` implements the thresholds verbatim.
  The legacy `getRPDLevel` stays for now (no consumer cleanup in R2).
- **Legal:** price bucket is **internal-only diagnostic data**. Per
  the No-Parity compliance rule already in this file: "Competitive
  Partner Share / Price Bucket distribution is for internal
  prioritisation only, never a SMART objective." The strip is fine
  on Partner Detail (the learner's pre-call view) but the bucket
  number / "Bucket N" phrasing must **not** appear in partner
  dialogue, hooks, pitches, briefings, or any partner-facing copy.
  Same rule as the existing internal-metric-name ban.

### Discount Products restructure

Source: PDF page 1.

- Block heading `Discount Products` is kept.
- Three columns side-by-side, each headed with a small caption:
  - **Public Pricing:** Mobile Rates, Country Rates, Portfolio Deals,
    Campaigns.
  - **Genius Pricing:** Genius Programme, Genius 15%, Genius 20%,
    Genius dynamic pricing.
  - **Foundations & Payments:** Base Rate Plan, Family Rates,
    Payments.
- Each row is `{label} {status pill}` where status is `Active` (green
  pill) or `Inactive` (red pill). Same neutral-presentation rule as
  the existing partner cards - the activity status is the data; we
  don't add severity colouring beyond Active/Inactive.
- Footer note (PDF page 1): "Note: This is a non-exhaustive list. The
  metrics and products shown are commonly used to drive pricing
  performance and are part of this learning solution." Render as a
  single dimmed line under the block.
- **Data shape:** new `PartnerDiscountProducts` type on
  `PartnerMetrics` keyed by product slug, each carrying
  `status: 'active' | 'inactive'`. `partnerStateByRound.ts` baselines
  drive per-round changes (e.g. Carlos's misconfigured Country Rate
  becomes a baseline-driven `active` flag with a separate
  `misconfigured: true` annotation later).

### Active Scenarios popover

- The Active Scenarios KPI card on the Driving Metrics row becomes
  clickable. On click, a small popover anchored to the card lists the
  active scenario names (e.g. `Brand.com`, `App`).
- Per-partner-round scenario list lives on
  `PartnerMetrics.activeScenarioNames?: string[]`. Noble Falcon R3
  carries `['Brand Scenario', 'Family 2+1', 'Family 2+2', 'App']`
  (verbatim from the SME data set).

### Right-hand panel additions

Source: PDF page 1.

- Current right-panel structure stays: Profile (property manager
  personality description) -> Commercial Goal -> Notes.
- **Two new fields added below Notes:**
  - **Last Pricing Contact** - shown as a YYYY-MM-DD date in the
    UI, but stored as a relative offset in days behind today:
    `PartnerMetrics.lastPricingContactDaysAgo?: number`. The
    Partner Detail screen resolves it to a date at render via
    `formatDaysAgoAsDate(daysAgo)` so the gap between today and
    the last contact stays constant across replays. A learner
    returning to the sim six months later still sees the same
    recency they did the first time. **Don't hard-code dates
    here** - encode the partner's recency as days-ago against
    the authoring date. The conversion math: pick the date the
    SME doc had, subtract from the day you author, store the
    delta.
  - **Pricing Coverage (QTD)** - percentage. Field on
    `PartnerMetrics.pricingCoverageQTD?: number`.
- The Issue Tree gate tile stays at the bottom of the right column
  as today, with copy: "Open the Issue Tree Helper before you
  engage". It hides once `hasOpenedIssueTreeHelper` flips true
  (same flag as the existing Round 1 gate), and the yellow tree-tab
  affordance on the right edge stays as the quick-launcher
  afterwards. Two affordances by design: the tile is the gate
  message, the tab is reopening.

### Inline metric helpers

- New shared component `<MetricLabel label="..." helpText="...">`
  used on every metric on the Driving Metrics tab and on the
  eRPD Price Bucket strip segments. Renders the label with a small
  info `(i)` icon; hover/tap surfaces the help text in a tooltip.
- Definitions sourced from PDF page 4 (revenue/booking/visibility/
  guest/pricing metric dictionary) and page 21 (Quality Adoption
  definitions, for when the Advanced View tab unlocks in R3).
- Definitions live in `data/metricDefinitions.ts` as a flat
  `{ [metricKey]: { label, helpText } }` map. Tooltip itself uses
  the existing tooltip pattern from the Issue Tree Helper / persona
  blind-spot cards - no new library.
- This is the surface that respects the existing rule about
  internal metric names: the help text can use full internal names
  (Experienced RPD, Lose Price Public) because the learner is
  reading the dashboard, not speaking to the partner.

### Debrief downloadable summary

- New CTA on the Debrief: "Download your summary (PDF)".
- Client-side PDF generation via **jsPDF** (~300KB, ES module, fully
  client-side - works inside the SCORM zip with no network calls).
  Added to `package.json` in Phase 1.
- Content sections:
  - Cover: learner name, character, persona, regime, completion date.
  - Round-by-round result: 10 rows with `Round N - {target partner} -
    {stars}` and the engaged partner if different (i.e. wrong-partner
    rounds).
  - **Well done** section: aggregated from rounds at 2-3 stars - lists
    persona `retroOnWin` lines and key style-match wins. Pulls from
    the existing `roundStars` + persona retro data.
  - **Coaching focus** section: aggregated from 0-star rounds - lists
    persona `retroOnLoss` lines, compliance breaches encountered, and
    style-mismatch patterns. Sourced from grading metadata stored on
    each completed round.
- No backend, no email - the learner saves the PDF locally from the
  browser's save dialog and forwards it to a manager if they choose.
- The same data could power xAPI statements later if Booking wires up
  an LRS; in R2 we just generate the PDF.

## Jul 2026 session update

Biggest single update since the R2 scope drop. Multiple system-shaped
changes landed between 2026-07-01 and 2026-07-03. Where a section
above is superseded or extended, its header points here.

### Naming shifts (user-facing only, internal identifiers kept)

- **"Issue Tree Helper" -> "Diagnosis Coach"** in every user-facing
  string. Internal identifiers (`IssueTreeHelper` component,
  `issueTreeHelperStates` state field, `hasOpenedIssueTreeHelper`
  flag, `data/issueTree.ts`) kept for continuity. Rename covers
  drawer title, launcher tab tooltip, tutorial, GuidePanel step
  copy, and the Partner Detail gate. The name is TBC per client -
  future rename should treat "Diagnosis Coach" as the canonical
  touchpoint and swap it in one pass. Icon is still TreeDeciduous;
  recommendation for a future rename is Stethoscope for a clean
  "diagnostic coach" read, but held until the name settles.
- **"Email Audit" -> "Call Audit"** everywhere user-facing. The
  activity is reframed as reviewing a Zoom AI transcript of a
  recorded partner call, not a draft email (legal flagged that
  LPS teams aren't permitted to send outbound emails like the
  original draft). Internal file/type names (`emailAudit.ts`,
  `EmailAuditScreen`, `getEmailAudit`) kept. Header labels
  swapped: From/To/Subject -> Recorded by/Partner/Topic. Judgement
  buttons: "Safe to send" -> "Safe to say", "Unsafe - rewrite" ->
  "Unsafe - shouldn't have said it". Body text stripped of the
  "Best, Sam" signoff.

### Round Select hub (new screen `'round-select'`)

- Inserted **after the cleared celebration** (which now routes here
  instead of `portfolio`) AND **between rounds** - `advanceRound`
  routes here instead of the next round's portfolio.
- **Two levels of ten tiles each**. Level 1 = existing partner-
  portfolio content (rounds 1-10; today only R1-R3 are playable per
  TOTAL_ROUNDS, the rest render locked with "Coming Soon"). Level 2
  = future OPC / Advanced View content (rounds 11-20, all locked
  with a sparkles badge + OPC label).
- **Current tile derived from `roundStars`**, not the engine's
  `currentRound`. Persistence restores roundStars but resets
  currentRound to 1, so a returning learner with rounds already
  cleared would otherwise see Round 1 tagged "Current" alongside
  Round 2/3 tagged "Cleared". `activeRound = first playable round
  with < 1 star`. If every playable round is cleared, no tile is
  current and the retry pills on completed tiles carry the flow.
- **Tile styling**: solid, high-alpha fills (~92%) so tiles read
  cleanly on the backdrop. Current = brand-yellow gradient, navy
  content, glow ring. Cleared = bright green gradient, white
  content, white "CLEARED" pill with deep-green text. Locked =
  mid-navy gradient with visible border and white icons/text.
- **Retry pill** on completed tiles with < 3 stars ("Retry for 3
  stars"). Clicking a cleared tile calls `startPracticeRound` -
  partner state resets to that round's baseline; stars only go up.
- **`enterRound(state, round)` engine reducer** for the current-
  round click; keeps existing state, just routes to portfolio.
- **`onEnterRound` hook handler** branches: if the clicked round
  === currentRound -> `enterRound`; if it's an earlier completed
  round -> `startPracticeRound`.
- Cleared learners who complete Character Build on a return visit
  now route to `round-select` instead of `portfolio` (was jumping
  straight past the hub previously).
- Backdrop: night cityscape WebP at 36KB. Fade-in pattern matches
  splash/cleared/data-insights. Backdrop brightness at 0.65, radial
  vignette only (no middle-band scrim). Tiles carry their own
  weight now that they're solid, so the backdrop can breathe.

### Idle nudge (new)

- **`useIdleNudge(target, enabled)` hook** in `hooks/useIdleNudge.ts`.
  Watches window for mousedown/keydown/wheel/touchstart. After 15s
  of no interaction, fires a yellow pulse animation on the element
  matching `[data-tutorial="{target}"]` AND on any Guide-panel
  step marked `[data-guide-step-for="{target}"]`. Repeats every 20s
  if still idle. Off-screen targets scroll into view before pulsing.
  **No mousemove listener** - reading the screen with a still cursor
  is exactly the state we want to interrupt.
- **CSS**: `.idle-nudge-pulse` class + `idleNudgePulse` keyframe in
  `index.css`. Three-iteration yellow ring (box-shadow + outline)
  totalling ~2.4s.
- **Portfolio** wires the hook with target `partner-card` (pulses
  the first card - primary decision).
- **Partner Detail** wires with target derived from state:
  - R1 pre-Helper (`issueTreeGateBlocks`) -> `partner-detail-tree-tab`
  - Otherwise -> `partner-detail-action` (Begin Conversation)
  - **Disabled while the Diagnosis Coach drawer is open**
    (`!helperOpen`) - drawer covers the right column so Begin
    Conversation would pulse behind it, and the learner isn't
    stuck on the CTA anyway (they're mid-diagnostic).
- **GuideStep gained an optional `target` field**;
  `data-guide-step-for={step.target}` emitted on each step div.
  Metric-referring steps target the whole block, not per-number.

### Persona system: single Persona Lens chip

- **Insight + Blind Spot cards on Partner Detail replaced** with a
  single `PersonaLensChip` component. Icon + persona chip label +
  one-line lens on the partner. Same footprint as a metric row;
  no expand button, no paragraphs.
- **`PersonaHint` schema reduced from three fields to one**:
  dropped `unlocked` / `mutedTeaser` / `mutedFull`, kept only
  `oneLiner`. All 24 authored hint entries across
  Marina/Carlos/Stavros/John + Crystal Water / Velvet Sky /
  Noble Falcon regime variants rewritten as tight single sentences
  distilling each persona's angle (Architect on approach, Navigator
  on pushback, Storyteller on story, Detective on anomaly).
- **`inGameImpact: string` field added to `SuperPowerPersona`**.
  Rendered as an accent-tinted strip at the bottom of each Character
  Build persona card. Names the concrete UI effect the pick has
  ("On each partner, a one-line chip flags the pushback most likely
  to derail the call"). Authoring rule: update this string first
  when a new persona effect ships, so it stays honest to what the
  card actually delivers.
- **Character Build cards trimmed**: removed the Blind Spots list
  block and the underlying `weaknesses[]` field from the persona
  type. Also stripped dead fields `identity`, `strengths`,
  `gameplayStyle` that were declared and authored but never
  rendered.
- **`expandedBlindSpots` GameState field removed** along with
  `markBlindSpotExpanded` reducer, hook handler, and prop wiring.
  Practice mode + full restart no longer need to clear it.
- The **retro line on Conversation Report** and **aggregate block
  on Debrief** are unchanged (still driven by
  `powerEffect.retroOnWin/retroOnLoss/aggregateCoaching`).

### Engagement-scoped Debrief

Fixes the reported "perfect run reads as if I neglected 18 partners"
bug. Insights, outcomes, and averages now only look at partners the
learner actually engaged with.

- **New `engagedPartnerIds: string[]` on GameState**. Appended when a
  conversation completes (main run only; Practice Mode replays don't
  rewrite the main-run engagement history). Filtered on retake so a
  reverted 0-star wrong-pick doesn't count as an engagement.
- **`calculateScore` restricts insights + averages to engaged
  partners.** Highlights, improvements, style insights, Avg RPD
  Change, Revenue Impact, Relationship Health now compute over
  engaged partners only. A perfect 9/9 run no longer surfaces
  "Sarah's RPD declined, consider prioritising them earlier" for
  the 18 partners the learner correctly ignored.
- **Debrief Partner Outcomes grid** only renders engaged partners
  (typically 3 cards, not 21). Fallback to the full list if the
  engagement history is somehow empty.
- **Practice Mode block on Debrief hidden entirely** when all
  attempted rounds are already at 3 stars. Nothing to chase on a
  perfect run.
- **Grade derived from per-round stars** (not the legacy metric
  deltas). 3 rounds x 3 stars = 9 max; 89%/67%/33% maps to A/B/C/D.

### Play Again vs Restart

Fixes the reported "I had to retake clearance despite completing it
earlier" bug.

- **`resetForPlayAgain(state)` engine reducer** (new). Preserves
  `learnerProfile`, `level0Progress.cleared`, `clearedForRegime`,
  and both `tutorialShown` / `partnerDetailTutorialShown` flags.
  Wipes everything else (partners back to R1 baseline, currentRound
  1, roundStars {}, engagements, helper picks, conversation state,
  market context, retry bookkeeping). Learner lands on Round Select.
- **Debrief "Play Again" button** now calls `game.onPlayAgain`
  (backed by `resetForPlayAgain`) instead of the destructive
  `game.onRestart`. Rename on `DebriefScreen` prop from
  `onRestart` to `onPlayAgain` reflects the change.
- **`game.onRestart` stays destructive** - Splash "Reset progress"
  and DevNav "Reset" still use it. Full nuke including clearance
  status.

### Regime change routes cleared learners through Call Audit

For learners changing regime on a return visit (experimentation or
role change into a new parity regime), the Call Audit is
regime-specific so they need to walk it again for the new regime.
Rest of clearance stays skipped.

- **New `Level0Progress.clearedForRegime: ParityRegime | null` field**.
  Snapshots the regime the learner cleared under. Set by
  `markLevel0Cleared` on Clearance Summary success (reads
  `learnerProfile.market.parityRegime` at that moment). Persisted
  to localStorage / SCORM `cmi.suspend_data`.
- **Character Build onContinue** now checks:
  - Not cleared -> `l0-gm-chat` (fresh full clearance)
  - Cleared, regime matches `clearedForRegime` -> `round-select`
  - Cleared, regime changed -> set `level0ReturnTo: 'round-select'`,
    route to `l0-email-audit` (Call Audit for the new regime)
- **New `markClearedForCurrentRegime` reducer** refreshes the snapshot
  after a Call Audit completion. Called from the Email Audit
  onComplete handler in App.tsx (any completion is safe to call it -
  the reducer no-ops if the regime already matches).
- **New `requestReturnToAfterActivity(screen)` reducer** sets
  `level0ReturnTo` from App.tsx; consumed by the existing
  `finishLevel0Activity`.
- **Older persisted payloads without `level0ClearedForRegime`** parse
  as null. Trigger the audit once on the returning learner's next
  regime switch, then settle.

### Regime-indexed market context

Fixes the reported "banner references cities I've never seen" bug.

- **`marketContextByRound` reshaped to `marketContextByRegime`** in
  `data/market.ts`. Each of the three active regimes now carries its
  own R1/R2/R3 content:
  - **No Parity (Spain)**: Costa del Sol, Madrid, Barcelona,
    Valencia, Mallorca
  - **Narrow (UK)**: Cotswolds, Cornwall, London, Edinburgh, Bath,
    Brighton
  - **Wide (USA)**: Miami Beach, Newport Beach, New York, Boston,
    West Coast
- **`getMarketContext(regime, round)` helper** with fallbacks: null
  regime -> Wide; Cross-Regional -> Wide; missing round for a
  regime -> Round 1 for that regime.
- Three engine sites (`createInitialState`, `startPracticeRound`,
  `advanceRound`) now resolve via the helper against the learner's
  regime.
- Previous banners referenced parked-partner cities (Kos, Mumbai,
  Kyoto) that no longer appear on any active portfolio. Gone.

### Diagnose activity (formerly "Issue Tree Reveal")

- **Eight cards total**: Overview (position 0) + seven diagnostic
  phases aligned to the SME's Pricing Diagnostic Flow
  material verbatim: Trigger, Issue, Intent, Root Cause,
  Diagnosis, Hook, Pitch.
- **Headlines are the SME's guiding questions**, not declarative
  worked-example lines: "What am I seeing?" / "Where are the
  primary pricing gaps?" / "What is the partner's pricing
  strategy?" / "What's likely behind the pricing gaps?" / "What
  proof do I have?" / "What conversation should I lead with?" /
  "What's the commercial pitch?". Alex's narration adds the coaching
  context. Hotel Atlante is the running worked example.
- **Overview icon is Lightbulb** to match the Diagnosis Coach
  launcher tab; `IntroVisual` renders a large yellow lightbulb
  badge styled identically to the launcher (same gradient, navy
  lightbulb, shadow). Learners see the same shape in clearance
  and on Partner Detail so the correlation is unmissable.
  (Framework rename: was `TreeDeciduous` until the Pricing
  Diagnostic to Pitch Flow rename; see the Post-session tweaks
  rename bullet.)
- **Overview narration explicitly points at the sim**: "You'll see
  this same lightbulb icon on a yellow tab on Partner Detail in
  the sim - that's the Diagnosis Coach, which walks you through
  the Diagnostic Flow on a real partner."
- **Pitch step icon is Handshake** (was `Lightbulb` until the
  rename swap; framework icon collides with Pitch icon if both
  are Lightbulb, so Pitch moved to Handshake).
- **Pitch step carries a caveat**: "In the sim the Diagnosis Coach
  walks you through the Diagnostic Flow up to the Hook. The Pitch
  happens live on the call, through the conversation option picks
  you make in the moment." Handles the divergence between the
  Reveal (7 steps) and the drawer (6 steps).
- **Subtitle** in `clearanceActivities.ts`: "A change of pace: this
  one's a walkthrough, not a check. Your manager will have introduced
  you to the Pricing Diagnostic Flow in your briefing.
  Here's a quick recap of the seven steps on a worked example, so
  you're set to use it in the sim." Bridges from the Call Audit
  (assessment) into
  this teaching activity and references the TLX manager briefing
  as prior context.
- **Objection phase dropped** from the old Reveal (was stale -
  Objection was retired from the sim in May 2026).

### Diagnosis Coach reframe (drawer copy + launcher)

- **Drawer header** shifted from "Issue Tree Helper" / "Diagnosis
  for X" to "Diagnosis Coach" / "Working out the angle for X".
- **Step 0 coach intro**: "We'll walk {name}'s data together and
  land on the right way to open the call. There might be more than
  one trigger - pick the one that stands out most."
- **Step 1 question reframed** from "What kind of trigger surfaced
  this issue?" to "Looking at {name}'s data, which trigger is
  loudest?" - acknowledges multi-trigger reality without adding
  multi-select complexity.
- **Auto-suggest** added: soft blue tint + "Data suggests this"
  chip on the option at each step matching the branching
  scenario's `issueTreePath`. Uses existing SME data; nudge only,
  learner still clicks.
- **Launcher tab enlarged**: icon 28 -> 36, heavier stroke, padding
  bumped, radius bumped, glow wider. Added a small "COACH" label
  under the tree icon so the tab reads as a labelled affordance
  instead of just a decorative pulse.

### Alex chat (Day one with Alex) - three new items

Added from the SME's "content to add" list. Scoring, retry, and
Clearance Summary display pick these up automatically because the
summary enumerates `gmScript` at runtime.

- **A5**: "Roughly how much ABRN growth do we get for every 1%
  improvement in RPD?" -> **about 2 to 3%**. Frames why price
  competitiveness is the primary lever.
- **A6**: "Competitive Partner Share tells us the proportion of a
  portfolio's partner value sitting in which eRPD range?" ->
  **eRPD less than or equal to 0%** (the competitive band).
  Follow-up flags CPS is internal-only prioritisation and never
  goes into a partner conversation.
- **B2**: "A partner is consistently priced higher than similar
  properties on the platform. What compounds if they leave it
  alone?" -> they accrue **"visibility debt"** (fewer clicks,
  weaker ranking over time, expensive to recover).

### Call Audit content refinements (SME)

- **Reminder rewritten** (No Parity + Narrow Parity share the same
  copy): "In no-parity and narrow-parity markets, if a pricing
  discrepancy is observed, you can reactively discuss the existence
  of that discrepancy and seek to better understand the partner's
  pricing strategy across channels. Any such discussion should
  remain neutral and informational, with a focus on explaining how
  pricing decisions may affect performance on Booking.com. The goal
  is to better understand the partner's pricing strategy and the
  context of any observed differences in pricing across channels."
- **No Parity phrase p1 flipped from safe to unsafe** ("your prices
  look more attractive on a couple of other platforms - is that
  intentional and part of your strategy?"). Was previously cited as
  verbatim-approved; SME's refinement is that even in a reactive
  raise this presumes a strategy and pressures the partner to
  justify their intent. Off-side. Rationale now teaches the neutral
  phrasing: "We note that your prices differ across channels. Could
  you help us understand your current pricing approach? As always,
  you remain free to determine your pricing strategy, and the point
  of this conversation is just to better explain how pricing
  decisions may affect performance on Booking.com." Transcript body
  around p1 kept as-is (Sam's whole approach was off, not just the
  flagged phrase).

### Loyal RPD framing corrected (SME)

SME flagged that Loyal RPD near zero is NOT "fine" - it means the
partner has raised Public rates to compensate for the Genius
discount, so the ~10-point gap that should exist between Public and
Loyal isn't there.

- **Marina R1 Data Detective hint**: rewrote from stale 7.5% / 4.8%
  (old baseline) to current 2.8% / 1.6% and reframed as "the Genius
  discount should be creating a ~10-point gap, not 1 point".
- **Marina R1 Storyteller hint**: rewrote to reflect current Lose
  Price 42% (was still on old 68%), and flagged the missing Genius
  gap as the quieter story.
- **Marina R1 conversation dialogue** (`marina-r1-diag-mobile-gap`
  option and Marina's responses): rewrote "Genius bookings holding
  up, non-Genius traffic undercut" as "Loyal RPD sits close to
  Public RPD - Genius discount should be creating closer to ten
  points".
- **Priority partner scenarios** (Crystal Water, Velvet Sky, Noble
  Falcon) already avoided the pattern - unchanged.
- **Driftwood Bay** (Loyal -1.5) and **Raven Inn** (Loyal -2.3)
  genuinely have negative Loyal RPD so their "Loyal is strong"
  framing is factually accurate. Left in place.

### Diagnosis Coach: option relabel

- Root-cause option in the Brand.com / Intentional branch of
  `data/issueTree.ts` relabelled from "Exclusive room / rate supply
  on Brand.com" to "Missing room / rate on Brand.com" per client
  copy note. Description ("Specific room types or rate plans are
  only available on the direct site") left in place. Flag if it
  needs updating to match the new phrasing on next pass.

### Character Build subtitle + card cleanup

- **Subtitle** now reads: "This is your starting point in the sim,
  who you are on day one. Pick the avatar you identify with and
  the super power you naturally lean into today. Everyone has
  equal potential to succeed." Client testing feedback was
  "it's not clear if that's the current version of myself or what
  I would like to become" - the day-one framing is explicit.
- Persona cards structure now: name + super power label + succeeds-
  by tagline + "Wins by" list + "In game" impact strip. Blind
  spots and dead fields removed (see persona system section above).

### Partner Detail: Notes removed, CTA enlarged

- **Notes block removed** from the right-column Profile card
  entirely (105 lines net removal after stripping the now-unused
  `profileNotes[]` field from the type and all 12 partner records
  in `data/partners.ts`).
- **Begin Conversation button enlarged**: padding 12/24 -> 18/28,
  font 14 -> 17, icons 15 -> 20, radius sm -> md, softer/wider
  glow. Same yellow gradient + pulseGlow animation.
- **Briefing narrative** gained a paragraph explaining the 10-round
  arc plus the future unlock of a second 10-round series with OPC
  (on-platform competitiveness) metrics. Sets expectation and
  previews the R3 Advanced View drop.

### Simulation Guide + tutorials

- **Portfolio + Partner Detail Guide "What to do" steps sharpened**
  to name the exact next action ("Compare eRPD and Lose Price
  across the cards" instead of "Pick the partner who needs you
  most"). The generic reminders that used to sit here read as
  filler; specific next-action copy actually helps stuck learners.
- **Partner Detail tutorial auto-fires on first-visit** via a
  `state.screen === 'partner-detail'` useEffect watcher in
  App.tsx. Same pattern as Portfolio. Gated by a new
  `partnerDetailTutorialShown: boolean` on GameState so it only
  fires once per playthrough.
- **Portfolio tutorial deferred to actual Portfolio mount**.
  Previously fired inline on the ClearanceSummary and
  ClearedCelebration onContinue callbacks; with Round Select now
  sitting between clearance and Portfolio, the tutorial was firing
  on Round Select where its target (`guide-panel`) isn't
  rendered. Now fires from a `state.screen === 'portfolio'`
  useEffect watcher.
- **Tutorial step 8 (Portfolio, Discount Products) fixed**:
  description no longer mentions the 3-column detail view (that
  lives on Partner Detail, not the Portfolio card summary);
  tooltip position switched from `top` to `bottom` so it doesn't
  cover the row it's describing.

### xAPI data pipeline (planned, not built)

- Client hosting in **Docebo** (unlikely LMS-hosted LRS). Data
  pipeline discussion landed on **batch ETL** (Docebo
  `/tcapi/statements` endpoint, OAuth2 poll, flatten to SQL,
  Tableau reads) as the recommended path over event-driven /
  webhook streaming. Batch is simpler to build and manage,
  backfillable, comfortably handles 1000 concurrent worst case.
- Sim will need to **emit xAPI statements alongside its existing
  SCORM calls** (SCORM 1.2 only carries `lesson_status` /
  `score.raw` natively; behavioural data is a separate stream).
  Small `sendStatement()` helper posting to Docebo's xAPI endpoint
  at key events.
- **Client-side decisions pending**: Docebo xAPI endpoint URL +
  OAuth2 credentials, Booking-owned IRI namespace for
  activity/verb URIs, event taxonomy sign-off, learner identifier
  method (mbox / account / hashed).
- Email draft to client covering all four asks was prepared during
  this session (see chat history).

### GameState field additions (this session)

For quick reference when reading `types/index.ts`:

- `engagedPartnerIds: string[]` - durable engagement history for
  Debrief scoping
- `partnerDetailTutorialShown: boolean` - auto-fire gate
- `level0Progress.clearedForRegime: ParityRegime | null` - regime
  the learner cleared under

Persisted set now includes `level0ClearedForRegime` alongside
learnerProfile, level0Cleared, and roundStars. Older payloads
without the field parse safely; regime-change routing settles
on the next Call Audit completion.

### Post-session tweaks (2026-07-08 onward)

Small copy and content changes since the main Jul 2026 push.

- **Data & Insights table gains a Partner Value (ABRN ly)
  column.** New `SamplePartnerRow.partnerValueAbrn` field on
  `data/dashboardHotspot.ts`; new column on the sample partner
  table in the D&I clearance activity, sitting after Hotel name.
  Rendered as neutral bold with thousands separators, no colour
  coding because it's a scale indicator, not a severity axis.
  Priority-challenge feedback rewritten to name the value angle:
  Attic Hotel is the priority even though UpHill has more ABRN,
  because UpHill's eRPD is actually improving. Ties the sample
  table to the CPS/ABRN concept the Alex chat A6 beat teaches.
- **"Five quick questions" dropped from Day one with Alex
  subtitle.** New SME-added beats (A5, A6, B2) took the chat
  past five, so the count in the subtitle was stale. Subtitle
  in `data/clearanceActivities.ts` now just names the purpose
  without pinning a count.
- **Pricing Coverage reframed as LPS activity, not partner
  adoption.** SME clarification: Pricing Coverage % measures
  how much steering work the LPS has tracked for a partner
  (across topics, products, and scenarios), not how many of
  the partner's pricing products are configured. Same numbers,
  different meaning: a low % now says "you haven't done many
  steering conversations with this partner yet" rather than
  "the partner has lots of untapped pricing levers." Updated
  in two learner-facing places: the Partner Detail tutorial
  step 6/8 in `components/TutorialOverlay.tsx` and the metric
  tooltip in `data/metricDefinitions.ts`. No gameplay change.
- **Advanced View copy no longer names specific future
  metrics.** Both learner-facing surfaces (tutorial tab-bar
  step in `TutorialOverlay.tsx` and the Advanced View
  placeholder body copy on `PartnerDetailScreen.tsx`) now read
  "more metrics will unlock in a later release." SME flagged
  Quality Adoption as premature to preview; going generic on
  both is safer if either shifts before R3 ships. Internal
  code comments and this file's R2 scope section still name
  both, since those aren't learner-facing.
- **Alex chat: OPC metrics family beats (A9-A12).** Follow-up
  ask on the OPC narrative: four new questions after A8
  covering the six new OPC metrics (Search Price, Visibility
  Share, Sell Through Rate, Unsold Rooms, Net Booked Share,
  Search Month Distribution). Each question is framed around
  the metric's link to eRPD, not a definitional match. A9
  tests Search Price as the upstream input to eRPD; A10 tests
  Visibility Share as the direct downstream signal when eRPD
  is uncompetitive; A11 tests Sell Through Rate + Unsold Rooms
  as paired supply-side symptoms of upstream pricing; A12
  tests Net Booked Share as a compound outcome. Search Month
  Distribution rides as a distractor with a follow-up
  explanation (independent of pricing). Scope note: still not
  operational teaching (that stays with the future TLX
  training that ships with the OPC dashboard). These beats
  establish vocabulary and the causal chain so the Level 2
  dashboard is legible when it arrives. Alex chat now
  contains A1-A12 + B1-B2 (14 items pre-B-track transition).
- **Alex chat: three new beats introducing OPC.** SME
  feedback: the sim taught eRPD, RPD flavours, and CPS, but
  never told the learner *why On-Platform Competitiveness is
  where you start*. Without that anchor the R2 Advanced View
  lock and the Level 2 round tiles (rounds 11-20, sparkles +
  OPC badge) will feel like a new tool rather than the payoff
  of a discipline the learner has been building. Three beats
  added after A6 in `data/gameMasterScript.ts`: a message
  setting up OPC vs Cross-Platform, question A7 on ~90% of
  Booking.com bookings originating on-platform (the "why OPC
  first" anchor), and question A8 on OPC being regime-neutral
  (safe to raise in Wide, Narrow, and No Parity alike). A8's
  follow-up doubles up: it explains the compliance angle AND
  seeds the OPC-improves-cross-platform correlation (same
  base rate + discount stack shows up across channels).
  Advanced View placeholder tab copy stays generic per the
  earlier feedback - the SME confirmed OPC won't be visible
  by name until Level 2 unlocks in a later release.
- **"Pricing Issue Tree" renamed to "Pricing Diagnostic to
  Pitch Flow"** in every user-facing string. Follows the same
  pattern as the earlier Coach rename: internal identifiers
  (`IssueTreeHelper` component, `data/issueTree.ts`,
  `data/issueTreeReveal.ts`, `IssueTreePath` type,
  `issueTreeHelperStates` state field,
  `hasOpenedIssueTreeHelper` flag, screen id
  `l0-issue-tree-reveal`) all kept for continuity. Short-form
  in narrative copy is **the Diagnostic Flow** (or just "the
  Flow" where context is unambiguous); "the Tree" retires.
  Icon changed from `TreeDeciduous` to **`Lightbulb`** across
  the Diagnose reveal Overview card, the Diagnosis Coach
  launcher tab on Partner Detail, the tutorial steps, and the
  Guide panel item. Pitch step (step 7) icon inside the
  Diagnose reveal was `Lightbulb`; swapped to **`Handshake`**
  so the framework icon and the Pitch icon don't collide
  visually. Learner-facing tutorial + narration copy now says
  "yellow lightbulb tab" instead of "yellow tree tab."
  Documented rename in the source SME material (framework
  concept) drove this - matches whatever the SME will call it
  in the manager briefing / TLX materials.

### Post-2026-07-13 tweaks

Larger scope shifts and multiple related changes since the
2026-07-08 batch. September 2026 confirmed as full launch (not
partial-scope test), which reshapes the trajectory materially.
All levels ship, Objection returns as a round scenario type,
Level 3 (OPC Application) unlocks alongside Level 2.

**Naming and icon (Diagnosis Coach retired):**

- **"Diagnosis Coach" retired as the tool name.** Drawer is now
  called **"Pricing Diagnostic Flow"** everywhere in
  user-facing copy, matching the framework it walks. Previously
  we distinguished them (framework name vs tool name); collapsing
  them simplifies the mental model.
  Naming trajectory this session: first tried the SME's full
  framework name "Pricing Diagnostic to Pitch Flow"; client
  came back saying it was too long for the launcher tab and
  verbose in prose; shortened to **"Pricing Diagnostic Flow"**
  as the settled form. Full name used everywhere in prose;
  **no short form nickname** (earlier "the Diagnostic Flow"
  short form is retired). Drawer header, launcher tab, tutorial steps, guide
  panel step, reveal narration, aria-label, action card copy all
  updated. Internal identifiers (`IssueTreeHelper` component,
  `data/issueTree.ts`, `IssueTreePath`, `issueTreePath`,
  `l0-issue-tree-reveal`, `hasOpenedIssueTreeHelper`, etc.)
  unchanged per rename precedent.
- **Icon changed from `Lightbulb` to `Workflow`** across all
  framework touchpoints: Diagnose reveal Overview card, launcher
  tab on Partner Detail, tutorial steps, guide panel item.
  `Workflow` reads as a literal process flow (connected boxes
  with an arrow), matches the name, and preserves the
  unmissable visual correlation between clearance teaching and
  the sim tool.
- **Launcher tab label stacked as three lines** to fit the
  shortened name: `Pricing / Diagnostic / Flow` at fontSize
  9.5, letterSpacing 0.06em, lineHeight 1.15. Tab height
  approximates the original single-line "COACH" tab; horizontal
  padding unchanged. (Briefly stacked as four lines when the
  full "Pricing Diagnostic to Pitch Flow" name was in use; that
  version was tighter and taller.)
- **Residual `TreeDeciduous` fix** on the launcher tab. The
  earlier tree-to-lightbulb rename missed the `HelperLauncherTab`
  component in `PartnerDetailScreen.tsx` (only the drawer's
  header icon inside `IssueTreeHelper.tsx` was updated). Fixed
  in the same pass as the Lightbulb-to-Workflow swap.
- **Pitch step icon stays as `Handshake`** (moved from
  `Lightbulb` in the earlier rename to avoid collision with the
  framework icon; still valid now that the framework icon is
  `Workflow`).

**Portfolio Guide reshape (3 steps -> 4 steps):**

- Steps now teach the actual workflow given that Partner Value
  ABRN ly is a key priority signal that lives on Partner Detail,
  not on the Portfolio card. New sequence: (1) read market
  update, (2) scan cards for eRPD/Lose Price to shortlist,
  (3) open each candidate to check Partner Value (ABRN ly),
  (4) pick where value and pricing risk both stack up.
- Objective at the top rewritten: "One partner needs your
  attention more than the others. Card metrics narrow the field;
  check Partner Value inside each profile before you commit."
- Standalone "Check Partner Value" tip dropped from the tips
  block; new step 3 covers it directly.

**Partner Value (ABRN ly) added to Partner Detail:**

- New `partnerValueAbrn?: number` field on `PartnerMetrics`.
  Partner-level static attribute (Actual Booked Room Nights last
  year), not per-round. Populated once per partner record and
  survives `applyRoundBaseline` merges unchanged.
- Priority partners use SME values from Sheet 7 "Partner Data
  Set 46" of the `2026 Pricing Learning - Data examples`
  workbook: Crystal Water Resort 6061, Velvet Sky Boutique
  Hotel 4137, The Noble Falcon Inn 13957. Same value across
  all three regime variants of each.
- Distractors (not in Sheet 7's roster) use Claude-authored
  values sized to keep round puzzles honest: Marina 8200,
  Carlos 3400, Raven Inn 5800, Driftwood Bay 2900. Marina at
  8200 is bigger than Crystal Water at 6061 (R1) so
  "biggest wins" pattern-matching fails; Raven Inn at 5800 is
  bigger than Velvet Sky at 4137 (R2), same purpose.
- **All five parked partners also carry the field** (John 3800,
  Stavros 15200, Hannah 1200, Priya 9600, Yuki 1800) so any
  future roster splice doesn't need a follow-up patch. Total
  of 12 partner records populated across `initialPartners` and
  `pendingPartners`.
- **Renders as a KPI tile in the Driving Metrics row** between
  eRPD and RPD Public. Grid template bumped from `repeat(6, 1fr)`
  to `repeat(7, 1fr)`. Value uses `toLocaleString('en-US')` for
  thousands separators. Falls back to `-` if the field is
  undefined (all 12 records carry it today, but the guard stays
  for type safety).
  Client feedback moved it here from an earlier profile-meta row
  placement below Notes; the tile row is a stronger signal
  because it sits inside the KPI grid the learner reads at a
  glance.
- **Now shown on the Portfolio card** (added 2026-07-27 at
  Chris's request), rendered as a prominent navy figure beside
  the Experienced RPD number, mirroring the Partner Detail tile
  placement. This reverses the earlier "keep it off the card"
  decision (the rationale had been to force learners to open
  partners before deciding). Because the number is now visible
  on the card, the Portfolio Guide was reworked: step 2 compares
  eRPD, Partner Value and Lose Price on the cards; step 3 now
  says "open your strongest candidate to review the full picture"
  rather than "open candidates to check Partner Value". Don't
  restore the "not on the card" treatment without an explicit
  request.
- Tooltip via `metricDefinitions.ts` (`partnerValueAbrn` entry).
- **Data & Insights table width bumped from 960px to 1120px**
  to accommodate the same Partner Value column added there in
  the earlier `dashboardHotspot.ts` pass. Competitor column was
  clipping at 960px after Partner Value was added.

**Retake: don't block re-engaging the correct partner:**

- Bug found by client 2026-07-17. When the learner picked the
  correct partner but bombed the responses (0 stars from bad
  in-conversation picks), retaking the round left Begin
  Conversation permanently disabled on that partner. Portfolio
  routed them back to Partner Detail, `alreadyEngaged` returned
  true, gate stuck.
- Root cause: `resetRoundForRetake` in `engine/gameEngine.ts`
  unconditionally added the engaged partner to
  `previouslyEngagedThisRound`. That list was designed to flag
  WRONG picks so the learner doesn't waste a retake calling the
  same wrong partner. Right partner + bad responses is a
  different case (learner wants to retry the same correct call
  with better answers).
- Fix: `resetRoundForRetake` now checks the engaged partner
  against `getCorrectPartnerForRound(regime, currentRound)` and
  only adds them to `previouslyEngagedThisRound` when the pick
  was wrong. Right partner retakes leave the flag list
  untouched, so `alreadyEngaged` returns false and Begin
  Conversation stays active.
- Test matrix: (1) right partner + 0 stars -> retake with same
  partner works. (2) wrong partner + 0 stars -> wrong partner
  still flagged, retake with correct partner works. (3) wrong
  partner + 0 stars, then retake with the same wrong partner
  again -> still blocked (correct behaviour, don't waste a
  retake on the same wrong call).

**PPAI tip in the conversation Simulation Guide (evolved three
times across this session):**

- Added originally as a tip inside the conversation-screen tips
  block: "Once the root cause is identified, use the Partner
  Performance AI (PPAI) tool to translate the complex data into
  a simple, actionable story tailored to the partner."
- Reframed to make the sim vs real-world boundary explicit
  (PPAI is not reachable from the sim; the old wording implied
  otherwise).
- Refined further to name the timing: PPAI sits between the
  Pricing Diagnostic Flow completing and the learner
  picking up the phone (not mid-call). Current title: **"PPAI
  before the call"**. Current text: "The Partner Performance AI
  (PPAI) tool isn't inside the sim. In real work you'd reach
  for it between the Pricing Diagnostic Flow and
  picking up the phone, to turn your diagnosis into a
  partner-facing narrative."
- **Decision landed with Adriana:** PPAI is referenced in the
  sim but not simulated. No game data emitted for PPAI. If
  Booking wants PPAI adoption reporting, it comes from a
  separate source (survey), not the sim. Recorded as section
  7.8 of the reporting spec doc.

**Objection reinterpretation (major, and it's back for launch):**

- **Objection is not a separate conversation phase.** Each round
  IS an objection scenario. The learner's job in every round:
  diagnose using the Pricing Diagnostic Flow, identify
  which objection type applies, and deliver the pitch that
  addresses it. Step 7 of the Flow ("What's the commercial
  pitch?") is literally the objection-handling response, per
  the SME's Content Hub PDF.
- **21 named objection types** cataloged from the Content Hub:
  Section 26 (Common XPC Objections, 10 primaries + 2 supports)
  and Section 40 (OPC Common Objections, 9 primaries).
- **Level 1 rounds** carry one primary objection per round plus
  optional supports (secondary objections the learner might
  brush against; the SME's exact use of "Support" tag is
  awaiting clarification).
- **Level 2 rounds** carry multiple objections per round,
  encountered in sequence during the conversation. Different
  emission shape from Level 1 (multiple per-objection statements
  per round vs one).
- Full round-to-objection mapping shared by Chris on 2026-07-14
  (see chat history for the sheet).

**September 2026 = full launch confirmed:**

- Not a partial-scope test. Complete sim with all levels
  (Levels 0 through 3), all rounds (1 through 20), Objection
  restored as a round scenario type, OPC Application unlocked
  as Level 3.
- Timeline to launch: roughly 7 to 10 weeks from 2026-07-13.
  Significant build ahead: R4-R10 SME priority content, Level 2
  rounds 11-20, Level 3 (OPC Application) mechanic and content,
  Objection reintroduction, xAPI emission wiring, reporting
  integration.
- Content-first prioritisation suggested: Objection first
  (touches every round), R4-R10 second (already stubbed as
  locked "Coming soon"), Level 2/3 last (structurally biggest).

**Reporting workstream (xAPI + Snowflake), v0.1 spec drafted:**

- Target Snowflake schema per client's data pipeline doc:
  FACT_GAME_EVENTS, FACT_DECISION_SCORES,
  FACT_OBJECTION_PERFORMANCE, FACT_CLEARANCE,
  DIM_CAPABILITY_SCORES, DIM_COACHING_FOCUS.
- **10 capability dimensions** per the client's Page 5 data map,
  each mapped to specific L-item codes (L0.1 through L3.5):
  Recognising discrepancies & prioritising partners (L0.1,
  L1.4), OPC/CPC context & eRPD understanding (L0.2), Pricing
  Diagnostic to Pitch Flow & discrepancy classification (L0.4,
  L1.1, L1.3), Signal vs Proof (L1.2), Commercial recommendation
  & scenario selection (L2.1, L2.2), Objection handling (L2.3),
  Landing next steps & escalation (L2.4), Compliance & parity
  (L0.3), Advanced data scenarios & portfolio prioritisation
  (L3.1-4), PPAI integration (L3.5, TBD).
- **Level structure has two frames:** the sim UI uses "Level 1"
  (rounds 1-10) and "Level 2" (rounds 11-20). The client's
  reporting model uses L0/L1/L2/L3 as capability groupings.
  Every scoring statement carries `context.extensions.level` and
  `context.extensions.item-code` so ETL can aggregate items into
  capabilities cleanly regardless of the sim's UI level
  structure. Use the client's L0/L1/L2/L3 numbering when
  describing anything to Booking's data team.
- **Discrete xAPI shape confirmed** (one statement per measured
  event, maps one to one to fact-table rows). Estimated 100 to
  150 statements per full playthrough.
- **Star + normalized-percentage scoring emitted together** on
  every scoring statement. `result.score.raw` for stars (min 0,
  max 3), `context.extensions.normalized-score` for 0-100
  percentage.
- **Scope boundary: rapid-learn's remit ends when xAPI
  statements land in Docebo.** Booking's data team owns the
  ETL from Docebo to Snowflake, plus all downstream tables,
  retention, refresh, permissions, and reporting. Confirmed
  route via the client-friendly email draft (see chat 2026-07-14).
- v0.1 spec doc drafted (taxonomy + 6 sample statements + full
  Snowflake DDL + field-to-column mapping + open questions).
  Client questions covered in section 7 of that doc.

### Things to avoid (session-specific)

- Don't put an em dash or en dash in ANYTHING (including chat
  responses to Chris). Plain hyphens even in numeric ranges.
- Don't use "real-ish" or similar hedges - use "worked example".
- Don't restore the persona Insight + Blind Spot cards. Single
  chip is the model. `weaknesses[]` on the persona type has
  been removed.
- Don't restore `profileNotes[]` on `PartnerPersona`. Field is
  gone; every partner record has been cleaned.
- Don't make Play Again destructive. `game.onPlayAgain` preserves
  clearance; only Splash "Reset progress" and DevNav "Reset"
  should nuke.
- Don't skip the Call Audit re-run on regime change for cleared
  learners. Regime-specific content; walking it once is the
  minimum bar.
- Don't fire tutorials inline in `onContinue` callbacks now that
  Round Select sits between clearance and Portfolio. Use the
  `state.screen ===` useEffect watchers.
- Don't rewrite the Debrief to score across all partners again.
  Scoping to `engagedPartnerIds` is the design; a perfect run
  should read as a perfect run.
- Don't reintroduce Objection as a fourth conversation phase.
  The 3-phase Hook / Diagnosis / Pitch model stays. Objection
  returns for the September 2026 launch as a **round scenario
  type** (each round IS an objection to overcome via the Pricing
  Diagnostic to Pitch Flow, not a separate step in the call).
  SME content is dropping across the summer; catalog of 21 named
  objection types documented in the Post-2026-07-13 tweaks
  section above.

## Post-2026-07-19 additions

Batch of additions on 2026-07-19 / 2026-07-20 covering a new
between-levels celebration, a new scored clearance activity
("Warm Up"), and copy fixes for the Diagnostic Flow reveal.

### Level 1 Complete celebration screen

New screen `'level-1-complete'` on the `GameScreen` union. Fires
from `advanceRound` in `engine/gameEngine.ts` when the learner
finishes the final playable round AND has cleared every Level 1
round (1-10) with at least one star each. Partial completions
(today's `TOTAL_ROUNDS = 3` cap, or any pre-launch state where
some Level 1 rounds are still unplayable) still route straight to
Debrief - the celebration only appears on a full ten-out-of-ten
run.

- File: `screens/Level1CompleteScreen.tsx`.
- Same `cleared-dark.webp` backdrop as the Clearance Cleared
  moment; same translucent-panel treatment (see below) so the two
  celebration beats share a visual identity.
- Trophy badge, "Ten out of ten, {name}." headline, sub-line
  about Level 2 unlocking, green "Level 2 unlocked" pill, avatar
  + persona chip. "See your debrief" CTA advances to Debrief via
  `game.onContinueAfterLevel1Complete` (sets `gameComplete: true`
  as a safety net for the DevNav-jump path).
- Chrome-free like the l0- screens: `isLevel0Chrome` in App.tsx
  now includes `screen === 'level-1-complete'`.
- Available in DevNav under the Wrap group for testing before
  TOTAL_ROUNDS is bumped to 10.

### Translucent panel treatment on both celebration screens

Both `ClearedCelebrationScreen` and `Level1CompleteScreen` wrap
their content in a semi-transparent navy panel:
```
rgba(6, 18, 42, 0.38) fill
1px solid rgba(255,255,255,0.14) border
24px radius
backdropFilter: blur(18px)
maxWidth: 720
```

The backdrop-blur compensates for the low fill alpha; text stays
legible against the busy `cleared-dark.webp` cityscape without
washing the photo out. When adding future celebration moments
that reuse this backdrop, use the same panel spec rather than
inventing per-screen values.

### "Warm Up" clearance activity (mini-scenarios)

**Placement.** New `l0-mini-scenarios` screen inserted between
Call Audit (`l0-email-audit`) and the Diagnostic Flow reveal
(`l0-issue-tree-reveal`). Full flow through clearance now:
Market -> Character -> Day one -> Data & Insights -> Call Audit
-> **Warm Up** -> Diagnose -> Summary.

**Naming.** User-facing label is **"Warm Up"** everywhere -
ClearanceShell progress strip, Clearance Summary card, DevNav.
Internal identifiers stay as `mini-scenarios` /
`miniScenarioItemId` / `data/miniScenarios.ts` per the same
rename precedent as Diagnosis Coach and Pricing Diagnostic Flow.

**Structure.** Four case-file scenarios, each walking a mini
four-step Pricing Diagnostic Flow (Signal, Diagnose, Narrative,
Next step). Sixteen KC items total feed the 80% clearance gate.

- **Scenario 1 (Hotel Castellana, `brand-gap` theme):** The
  Brand.com channel gap. Teaches: signal-first, then diagnose;
  don't pressure across channels.
- **Scenario 2 (Coastal View Resort, `mobile-gap`):** The mobile
  and app gap. Teaches: device-specific setup fix, not broad
  price cut.
- **Scenario 3 (Grandview Inn, `genius-offset`):** The offset
  Genius discount. Teaches: base price first, then discount;
  low-quality adoption pattern.
- **Scenario 4 (Sunfield Apartments, `family-undercut`):** The
  family and occupancy undercut. Teaches: Family Ready foundations-
  first sequence; capacity setup before broader pricing.

**Content authoring.** SME content used verbatim with three
normalising passes: (1) smart quotes/dashes converted to plain,
(2) "AM/PFR" role reference in Scenario 3 Step 3 replaced with
"What is the strongest response?" per the role-agnostic copy
rule, (3) "Family Ready" framework refs in Scenario 4 kept
as-is (SME-confirmed well-known to learners from the manager
briefing).

**Distractor design.** All 32 wrong options rewritten in the
2026-07-20 pass to match correct-answer length. The initial
implementation had distractors that were consistently much
shorter than the correct pick, so learners could pattern-match
on length alone. Each triad now follows the "close but not
quite" rule from the existing Distractor design section - at
least one plausible near-miss per triad; the other clearly
wrong. Also swapped two distractors that used "parity" as
internal-strategy shorthand (Sc1 Step 3 C, Sc4 Step 3 C) for
regime-neutral misdirections that carry the same wrong intent
without the compliance-red-flag word.

**Files.**
- `data/miniScenarios.ts` - scenario content + itemId helpers.
  KC itemIds are `mini-scenario-{scenarioId}-{stepId}` (stable;
  used by the Clearance Summary retry filter).
- `screens/MiniScenariosScreen.tsx` - the case-file interaction
  screen. Local state (scenario index, step index, picked
  option, per-scenario progress, showOutcome flag, showSummary
  flag). No global state - all bookkeeping is component-local
  and emits results via `onComplete` at the end.

**Layout.** Two-panel case-file layout:
- **Left panel (~36% width, min 320 max 440):** themed gradient
  background + text header at the top (Case File badge, property
  name, scenario title) + property photo hero filling the
  remainder. Text-first at the TOP so the read flows naturally
  top-to-bottom on the left, then handoff to the right panel's
  step interaction. Objective copy was pulled from the cover
  (was originally at the bottom, causing "start reading from
  bottom-left" feedback) and now appears only on the outcome
  card at the end of each scenario.
- **Right panel (interaction):** step-dot indicator across the
  top, breadcrumb chips for prior-step picks, "From the data"
  card if the step has `showBullets`, italic context note if the
  step has `contextNote`, prompt in navy bold, three tap-card
  options, reveal-answer coaching card, Next button. Full-width
  outcome panel replaces the interaction on scenario end.

**Post-pick colour discipline.** Only the correct option keeps
a green background - that's the ONE clear "answer" moment
on-screen. Coaching card is plain white with a small coloured
"Why" label header (green for correct, warning-amber for
incorrect); no left-border rail. Prior step chips are neutral
breadcrumb bars with a tiny status dot (green/amber). Wrong
picks show red bg only on the chosen option, dim the others.
This layout came from user feedback that "3 green panels all
saying the same thing" competed for attention - the discipline
matters, don't loosen it when adding future post-pick
affordances.

**Summary screen.** After the fourth scenario's outcome card,
the learner sees a Warm Up summary panel (full-width, replaces
the two-panel layout entirely). Two stat blocks (correct
decisions X/16, perfect case files X/4) + four scenario cards
in a grid (photo thumbnail, property name, scenario title,
green/amber status dot with N/4 correct). Continue advances to
the Diagnostic Flow reveal.

**Retry.** Runs the WHOLE scenario if any step in it was missed
(not partial steps). Simpler than mid-scenario resume and keeps
the case-file flow intact. `screens/MiniScenariosScreen.tsx`
filters scenarios to those with at least one failed step in
`retryItemIds`.

**Property images.** Photos on each cover reuse verified Unsplash
URLs from the parked partner records (`pendingPartners` in
`data/partners.ts`) to avoid inventing URLs. Same latent SCORM
debt as the existing partner images (runtime CDN call, banned
per the SCORM rule) - flagged in the `heroImage` doc string.
The eventual WebP swap for existing partner images should sweep
these too.

### Diagnostic Flow reveal - Overview copy rewrite + rich body

The Overview card (step 0 of the reveal) got fresh copy with
multi-paragraph structure and bold references to "Pricing
Diagnostic Flow" and "Partner Detail". The single-`<p>` renderer
in `screens/IssueTreeRevealScreen.tsx` couldn't handle either,
so added a small `renderRichBody(text)` helper:
- Paragraphs split on `\n\n`
- Inline `**text**` markers wrap in `<strong>`
- No markdown library

Kept intentionally tiny - only the Overview needs it today. The
data file (`data/issueTreeReveal.ts`) now uses `\n\n` and
`**bold**` markers in the intro phase's `body`; the phase's
`narration` field is set to `''`.

### New feedback rule: no left-border "handle" accents

Saved as `feedback_no_left_border_handles.md` in the memory
system. Chris flagged the pattern on sight during this session as
a tell-tale AI-generated UI pattern. **Never use `borderLeft:
'3px solid ...'` (or similar) as a decorative accent on cards,
callouts, or info panels.** Applies to all accent colours (green
/amber/red/navy), not just one. Doesn't apply to `border` (all
sides) or `borderBottom` for separator rules - just the decorative
left-rail pattern. Pre-existing borderLeft usages elsewhere in the
codebase haven't been swept; don't refactor them unless asked.
This rule governs NEW work.

### Things to avoid (this session)

- Don't reintroduce left-border accent rails on any new cards.
  See the feedback memory for the full rule; icon or tiny status
  dot is the correct colour signal, not a borderLeft rail.
- Don't restore the mini-scenarios cover panel with objective
  copy at the bottom. Text at the top with photo below is the
  natural reading order; objective moved to the outcome card.
- Don't over-tint the mini-scenarios post-pick UI. Correct option
  = green bg. Coaching = plain white with a coloured "Why"
  label. Prior chips = neutral with a tiny dot. Adding more
  green surfaces recreates the "three panels all say the same
  thing" problem.
- Don't shorten the mini-scenario distractors to be brief. Length
  disparity gives away the correct answer; the current lengths
  are deliberately comparable across each triad.
- Don't route Warm Up straight to the Diagnostic Flow reveal on
  the fourth outcome card's Continue. The summary screen is a
  designed beat - the last outcome's CTA reads "See warm-up
  summary" for that reason.
- Don't restore "Mini Scenarios" / "Scenarios" as the learner-
  facing label. It's "Warm Up" everywhere the learner sees it;
  internal identifiers keep the `mini-scenarios` shape.

## Post-2026-07-27 session (reporting / xAPI + small UI)

Mostly reporting-and-data-pipeline work (which lives in external
docs, not the codebase) plus two small sim changes. Captured here
so the context survives.

### xAPI reporting schema doc (v0.2)

- **Deliverable file: `C:\Users\chris\Downloads\Data Pipeline
  Schema v0.2.docx`** (saved alongside the original `Data Pipeline
  Schema.docx`; the original is v0.1). This is the vendor-side
  reporting spec that aligns the sim's xAPI emission to Booking's
  target Snowflake schema.
- **Booking's own source deck is
  `C:\Users\chris\Downloads\Competitive Pricing 2026 - Reporting &
  Data Pipeline WIP.pdf`** ("Learning Impact Ask"). Its **Data Map
  (page 5 / page 8)** is the authority for the capability
  framework: a "CAPABILITY DIMENSIONS" column (10 dimensions) each
  tagged with L-codes (L0.1 through L3.5), and the six target
  tables (FACT_GAME_EVENTS, FACT_DECISION_SCORES,
  FACT_OBJECTION_PERFORMANCE, FACT_CLEARANCE, DIM_CAPABILITY_SCORES,
  DIM_COACHING_FOCUS). Pipeline is Docebo (B.Learn) LRS -> Snowflake
  -> Tableau; Booking's data team owns everything from Docebo
  onward (rapid-learn's remit ends when statements land in Docebo).
- **Chris has since moved the schema into a Google Doc shared with
  Booking**, so future edits go there, not the docx. Don't assume
  the docx is the live copy.

**Decisions baked into v0.2:**

- **Objections emit as stable codes `OBJ_1 ... OBJ_N`, never their
  display names.** The code rides in `context.extensions.
  objection-type` and is what lands in
  `FACT_OBJECTION_PERFORMANCE.objection_type`. Names are display
  labels only (they keep changing), joined back via a
  **`DIM_OBJECTION`** lookup Booking maintains in Snowflake. Rationale:
  a rename never disturbs historical data. rapid-learn hands over
  the code-to-name list once; Booking owns the mapping table.
- **Cross-Regional (KAM) = same sim, `regime: "cross-regional"`.**
  Not a separate build (the sim is not made role-specific). 10
  rounds in two levels of five, OPC (Advanced) metrics active in
  every scenario. No new tables/columns; regime + level +
  round-number + item-code already express it. See
  [[project-cross-regional-kam]].
- **Round numbering is continuous, not reset per level.** Standard:
  L1 = rounds 1-10, L2 = rounds 11-20. Cross-Regional: L1 = rounds
  1-5, L2 = rounds 6-10. `round-number` and the object-id round-M
  both carry the continuous number; `level` carries the grouping.
- **New statement type 3.16 "Level milestone completed"** fires a
  `completed` at each celebration screen (clearance, Level 1, Level
  2), not just at final debrief.
- **Multiple objections per round** are supported already
  (FACT_OBJECTION_PERFORMANCE keys per statement via `objection_id`,
  so several rows per round is the expected shape).
- **New Section 7 "Capability Code Map"** added to the doc: the
  code inventory plus a proposed per-round capability-code mapping,
  put to **L&D (not the data team) to confirm** - which capability
  each round exercises is a learning-design call. Open questions
  renumbered to section 8, Design Rationale to 9.
- **Provenance note:** "capability dimensions", the L0.1-L3.5
  codes, and `DIM_CAPABILITY_SCORES` are all Booking's (their Data
  Map). The field names `item-code` / `capability-code` and the
  machine slugs (`recognising-discrepancies`, etc.) are our
  coinage. Booking's deck also uses "competency" interchangeably;
  we standardised on "capability".

### Objection catalogue (OBJ_N) - built this session

Chris supplied the round-to-objection mapping; we turned it into
the code catalogue. **22 objections total** (matches the Content
Hub Section 26 XPC = 12 and Section 40 OPC = 10 after the split
below):

- **Level 1 (XPC): OBJ_1 through OBJ_12.** OBJ_1 Segmented Pricing
  Conversation, OBJ_2 Brand.com Loyalty, OBJ_3 Competitive
  Aggression, OBJ_4 Same Net Mindset, OBJ_5 Family Ready narrative,
  OBJ_6 Billboard Effect in Reverse (Direct-Channel Focus), OBJ_7
  "Value Proposition" Wall, OBJ_8 "Slippery Road" of Pricing, OBJ_9
  Direct-is-Cheaper Strategy, OBJ_10 BSB/Payments Shield, OBJ_11
  "Wholesaler Leak", OBJ_12 Risky Guest.
- **Level 2 (OPC): OBJ_13 through OBJ_22.** OBJ_13 "Traveler-Centric"
  Pivot, OBJ_14 "Global Stat" Credibility Gap, OBJ_15 "Peer Group"
  Credibility Gap, OBJ_16 Internal vs External Data, OBJ_17
  "Money-in-Bank", OBJ_18 Regional Office Shield, OBJ_19 "Too Unique"
  Comp-Set Refusal, OBJ_20 Connect the Metrics Gap, OBJ_21 "Fake
  Value" Trap (Genius Inflation), OBJ_22 "Action-to-Impact"
  Counterfactual.
- **OBJ_17 was split into two** (Money-in-Bank + Regional Office
  Shield) at Chris's call, which is why the total is 22 not 21 and
  L2 codes shifted from the original draft.
- **Name variants were merged to single codes** (Chris to sanity
  check): OBJ_1 absorbs the "Segmented" spellings; OBJ_2 absorbs
  "The Partner Brand.com-Loyalty"; OBJ_3 absorbs "Competitive
  Aggression Factor"; OBJ_6 absorbs "The Direct-Channel Focus";
  OBJ_9 absorbs the "Direct-Is-Cheaper" variants.
- The **round-to-objection map** (primary/support per round) is a
  separate bridge/reference, NOT part of `DIM_OBJECTION` (a
  dimension is one row per objection). It's also reconstructable
  from the emitted statements, so it's documentation rather than a
  required pipeline table. Full tables were delivered to Chris in
  TSV for pasting into the Booking Google Doc.
- **These codes are not in the sim code yet.** Objection is still a
  planned round-scenario type (September 2026 launch), not built.
  Today the only objection *name* rendered anywhere is "The Value
  Proposition Wall" (a teaching example in the Diagnose reveal
  Pitch step, `data/issueTreeReveal.ts`). No xAPI emission exists
  in the app yet (only the SCORM wrapper in `util/scorm.ts`).

### Reporting contingency discussed (not built)

If neither the Snowflake/Tableau pipeline nor an LMS custom report
is ready by launch, the fallback is a **manager + L&D dashboard fed
by a daily Docebo export**, kept inside the client's own
environment (IT will not allow us to host anything externally).
Shape discussed: Google Sheets with an Apps Script daily pull/import
(serverless inside their Workspace), a Lookups tab holding the
DIM_OBJECTION + capability tables, and separate Manager (team
roll-up, coaching focus, watch-list) and L&D (funnel, capability
heatmap, round difficulty, objection performance) views. Floor
regardless: standard Docebo completion/score reports already cover
usage + headline performance. Build-side lever offered: also emit
scored decisions as SCORM `cmi.interactions` so richer data
survives even without the LRS export. All interim; nothing built.

### Small sim changes (committed + pushed to
`release-2-partner-detail`)

- **Partner Value (ABRN ly) now on the Portfolio card** beside the
  eRPD number, all partners, via the shared `MiniMetric` component
  (matches RPD Pub weight/size). Reverses the earlier "keep it off
  the card" decision; Portfolio Guide reworked so step 3 no longer
  sends learners digging for it. Documented under the Post-2026-07-13
  Partner Value bullet. Commits `3d1c2c2`, `7736fe9`.
- **PPAI tip reworded** in the conversation Simulation Guide
  (`GuidePanel.tsx`): title now "On the Job Tip", body "PPAI isn't
  available inside this simulation. However, you can use it back on
  the job to diagnose issues, shape your key message, and prep
  before actual calls." Commit `7db7743`.

## Post-2026-07-30 session (OPC tab unlock + scaffold)

Partner Detail's second metrics tab went from a permanently-locked
placeholder to a conditionally-unlocked, structurally-complete OPC
metrics view. Data is not wired yet by design (Chris: "build the
structure, then add the data later"). Commits `90e4371`, `9501a5c`
on `release-2-partner-detail`.

### Tab rename (learner-facing only, internal id kept)

- **"Advanced View" -> "On Platform Competitiveness"** in every
  learner-facing string: the Partner Detail tab label and the
  Partner Detail tutorial step in `TutorialOverlay.tsx`. Same rename
  precedent as Diagnosis Coach / Pricing Diagnostic Flow - the
  internal tab-state key stays `'advanced'`
  (`activeTab: 'driving' | 'advanced'`) and the R2-scope references
  to "Advanced View" earlier in this file are historical. Don't
  rename the state key.

### Conditional unlock (was: permanently locked)

- The OPC tab **unlocks in the OPC-active window and stays locked
  otherwise**. Gate in `PartnerDetailScreen.tsx`:
  `const opcUnlocked = partner.persona.parityRegime ===
  'cross-regional' || currentRound >= 11;`
  - **Level 1 (rounds 1-10, standard journey):** locked. The tab
    renders **greyed out and unclickable** (grey text + not-allowed
    cursor + `disabled`), with **no pill and no text** - the old
    "Coming soon" pill and the `AdvancedViewLocked` placeholder were
    removed on 2026-07-31 at Chris's request. This is a live feature
    that unlocks in later rounds, not a future release, so a "Coming
    soon" affordance was misleading. Don't reinstate any pill or
    placeholder copy on the locked tab without an explicit ask.
  - **Level 2 (rounds 11-20):** unlocked (round >= 11).
  - **Cross-Regional / KAM (any round):** unlocked, because OPC
    metrics run in all ten of their rounds. Driven off the partner
    record's `parityRegime`, not the round number.
- `PartnerDetailTabBar` gained an `opcUnlocked: boolean` prop that
  drives `locked={!opcUnlocked}` on the OPC `TabPill`. Because a
  locked `TabPill` is `disabled`, `activeTab` can never become
  `'advanced'` while locked, so the render simply shows
  `<OpcMetricsTab>` when `activeTab === 'advanced'` (no locked
  fallback component needed).
- **Not reachable in today's build.** `TOTAL_ROUNDS` is capped at 3
  and Cross-Regional isn't selectable, so nothing hits round 11+ or
  a KAM partner. The unlocked tab auto-appears once Level 2 / KAM
  content lands. To preview it before then you'd force `opcUnlocked`
  true or add a temporary DevNav hook (not done).

### OPC metric cards (structure built, data pending)

- **New `PartnerOpcMetrics` type** (`types/index.ts`) + optional
  `PartnerMetrics.opcMetrics` field. Same `SecondaryMetricValue`
  (`{ value, deltaPct? }`) shape as the Driving Metrics secondary
  cards. Every field optional.
- **`OpcMetricsTab`** (`PartnerDetailScreen.tsx`) renders **seven**
  OPC cards in a `repeat(4, 1fr)` grid (4+3), reusing
  `SecondaryMetricCard`. Unpopulated cards render the dashed
  **"Data pending"** state, so the grid is complete and it's obvious
  where numbers are still owed. All comparators are "vs peer".
  Order: Unsold Rooms, Sell Through Rate, Distribution of Search,
  Visibility Share, Click Through Rate, Conversion, Search Price.
  (Net Booked Share was briefly added as an 8th card mid-session
  then removed at Chris's request - don't reinstate it without an
  explicit ask.)
- **All seven definitions/tooltips live in `metricDefinitions.ts`**
  from the PDF page 2/3 pass.
- **Adding data later is a pure data edit** - drop an
  `opcMetrics: { visibilityShare: { value: 10, deltaPct: -8 }, ... }`
  block onto a partner in `partnerStateByRound.ts` (or the partner
  record) and the cards populate. No further UI work.
- **Scope note:** this is the 7-OPC-metric view only. The PDF's
  separate Quality Adoption Metrics column (Weighted Adoption %,
  Utilization %, Discount Depth, etc.) is NOT in this tab - Chris
  chose "7 OPC metrics only". Those definitions still sit in
  `metricDefinitions.ts` for a future surface if needed.

### Day one with Alex - transition-message reword (2026-07-31)

Reviewer flagged that the Alex knowledge-check chat
(`data/gameMasterScript.ts`) signalled the end prematurely. Three
inter-question `message` beats used "one more ... then we'll shift
gears" language while several questions still followed, so the
wind-down was promised repeatedly and mid-chat. Commit `5421708`.

- Reworded the three offending beats to neutral topic-transitions:
  before A5 ("A couple more on the fundamentals before we move
  on." - there are two, A5 + A6, not one), before A7 ("Some
  context to set up the next few questions."), and before A9 ("Now
  the OPC metric family, which sets up the next few questions.").
- **The genuine end-markers were left as-is:** "Now an important
  one" before B1 and "One last one" before B2 (the actual final
  question). Rule going forward: reserve "one more" / "last one" /
  wind-down phrasing for the beat immediately before the very last
  question (B2); interstitial beats should read as topic hand-offs,
  not countdowns.
- The retry-flow "one more I want to double-check" message in
  `GameMasterChatScreen.tsx` is correct and untouched - it only
  fires when exactly one failed item is being re-asked.

## How to run

```
cd client
npm install
npm run dev
```

Hosted at the URL on Render configured via `render.yaml` (auto-deploy
from `main` branch).

## Pre-production checklist (remove / change before final SCORM deploy)

A running list of features that exist for tester / reviewer
convenience and shouldn't ship in the final SCORM package, plus
placeholder content awaiting SME sign-off and open design questions
to resolve before final delivery.

### Dev-only affordances to remove or further gate

- **DevNav** (`src/components/DevNav.tsx`) - floating bottom-right
  lightning-bolt button that opens a panel with jump-to buttons for
  every screen + Show Splash + Reset utilities. Gated to `npm run
  dev` or `?dev=1` in the URL today. Remove the component import +
  the URL-param check entirely before SCORM ship.
- **Reset Progress button on Splash screen**
  (`src/screens/SplashScreen.tsx`) - bottom-right `Reset progress`
  button that wipes the persisted profile + clearance status + round
  stars. Useful for testers hitting the deeplink with a stale
  profile, but in SCORM the LMS owns attempt semantics, so this
  button conflicts with the standard "new attempt" flow. Either
  remove the `onResetProgress` wiring entirely (which deletes the
  button) or gate it behind `?dev=1` alongside DevNav.
- **`?dev=1` URL flag** - the query-param check that opens the dev
  affordances above. Remove from production source.

### Placeholder content awaiting SME review

- **Distractor 3-phase conversation trees** - Claude-authored
  filler that plays when the learner picks the wrong partner.
  Files: `data/conversations-raven-inn.ts`,
  `data/conversations-driftwood-bay.ts`, Marina + Carlos R1-R3 in
  `data/conversations.ts` + `data/conversations-carlos.ts`. SME
  should confirm the dialogue is compliant across all regimes (the
  regime-suffix alias fallback means a single tree serves Wide /
  Narrow / None variants of the same partner).
- **Distractor persona hints** - Claude-authored
  `data/personaHints.ts` content for Marina, Carlos, Raven Inn,
  Driftwood Bay. Unlocked + blind-spot copy hasn't been SME-validated.
- **R1 + R3 distractor baselines** - Marina + Carlos at R1 and R3 in
  `data/partnerStateByRound.ts` carry Claude-tuned metric values
  (e.g. Marina R1 at eRPD 2.4% / Bucket 3) so the priority puzzle
  reads cleanly. Numbers haven't been SME-validated for narrative
  coherence.
- **Avg RPD Change + Revenue Impact tiles on Debrief** - still pulled
  from the legacy `experiencedRPD` and `revenue` fields that the
  new branching engine only nudges by a couple of points per
  round. Numbers are largely cosmetic. Decide whether to compute
  them from the new eRPD baselines, leave them as soft indicators,
  or drop the tiles entirely.

### Round / regime gates that scale with content

- **TOTAL_ROUNDS capped at 3** in `engine/gameEngine.ts` and
  `components/Header.tsx`. Bump as each additional round's SME
  priority content lands. Header dots, Practice Mode grid, and
  Debrief grading all derive from this constant so the bump is
  one-line.
- **Advanced View tab locked** on Partner Detail. Unlocks in R3
  with the OPC + Quality Adoption Metrics content drop.
- **Cross-Regional regime** still flagged `available: false` in
  `data/learnerMarkets.ts`. Either remove the card from Market
  Select entirely if it won't ship, or unlock when content lands.
  Today it falls back to Wide Parity if accessed.
- **Practice Mode locked R4-R10 cards** auto-scale with
  TOTAL_ROUNDS - no manual action needed.

### Functional gaps to close before final ship

- **Randomise conversation option positions at render time.** Every
  branching `BranchingStep.options` array and every 3-phase
  `phase.options` array currently lists the OPTIMAL pick first by
  authoring convention - a pattern testers will spot in a few clicks
  ("the right answer is always the top one"). Before live launch,
  shuffle the option order at render time in
  `BranchingConversationScreen` and `ConversationScreen`, ideally
  with a seeded random so a replay of the same round shows the same
  layout (so the learner isn't disoriented by reshuffled positions
  mid-attempt). The data files do not need to change - the
  `optimal: true` flag and the grading layer key off ids, not array
  position.

### Decisions to confirm before final ship

- **Returning-learner routing**: cleared learners currently always
  route through Market Select + Character Build (pre-filled) on
  every Briefing -> Open your portfolio click. Decide if that
  stays for real learners or reverts to "skip if cleared" for
  production. SCORM's `cmi.suspend_data` + `cmi.core.lesson_status
  = 'passed'` may make the question moot at the LMS layer.
- **Distractor contact name pattern**: first name stays constant
  across regime variants (Marina/Marina/Marina) and only surname
  changes per regime (Alvarez/Ashworth/Brown). Decision was driven
  by keeping the SME dialogue ("Hi Marina, ...") readable across
  variants without per-regime tree authoring. Confirm with legal
  that surname-only localisation passes review; if first names
  must also differ, per-regime distractor trees (with substituted
  names) become necessary.
- **Parked partner records** - `pendingPartners` in
  `data/partners.ts` still contains John Marston, Stavros,
  Hannah, Priya, Yuki with their persona data and 3-phase trees.
  These are dead data on disk today. Decide whether to leave them
  for future-round reuse or strip them out of the SCORM bundle
  for size / clarity.

## Things to avoid

- Don't reintroduce em dashes (saved as a feedback memory).
- Don't decorate cards, callouts, or info panels with a thick
  coloured `borderLeft` rail (e.g. `borderLeft: '3px solid ...'`).
  Chris flags this pattern on sight as a tell-tale AI-generated
  UI cliche - saved as a feedback memory. Colour signal for
  status belongs in a small icon or tiny dot, not a decorative
  left rail. Applies to all accent colours. Doesn't apply to
  `border` (all sides) or `borderBottom` used for genuine
  separator rules. Pre-existing borderLeft usages elsewhere
  haven't been swept; don't refactor them unless asked.
- Don't add severity colour-coding to Portfolio / Partner Detail
  metrics - it makes "spot the bad partner" trivial.
- Don't add Level 0/1/2 prefix labels to learner-facing UI.
- Don't use "Pricing Issue Tree" or "the Tree" in any new
  learner-facing copy. The framework is now the **Pricing
  Diagnostic to Pitch Flow** ("the Diagnostic Flow" as short
  form). Internal code identifiers - `IssueTreeHelper`,
  `data/issueTree.ts`, `data/issueTreeReveal.ts`,
  `IssueTreePath`, `issueTreePath`, screen id
  `l0-issue-tree-reveal`, etc. - are kept for continuity, per
  the same precedent as the earlier Diagnosis Coach rename.
  Icon is `Lightbulb`, not `TreeDeciduous`.
- Don't ship a round with two obviously-wrong distractors. At
  least one distractor per option triad (Hook / Diagnosis / Pitch
  in the 3-phase model, per-step options in branching) must be a
  "close but not quite" near-miss - the same register as the
  optimal pick but with a specific nuance (wrong regime framing,
  wrong tone for the partner style, missing setup context,
  presumes intent, right destination via a wrong route). See
  "Distractor design" for the full rule. Trivially-easy triads
  let the learner pattern-match without reasoning.
- Don't preview locked features by name in learner-facing copy.
  "Advanced View unlocks OPC and Quality Adoption metrics"
  reads as a promise; if either shifts before R3 ships we've
  mispromised. Default to generic phrasing ("more metrics will
  unlock in a later release") unless the feature is locked in
  for the next release. Internal code comments and R2 scope
  notes in this file are exempt - they aren't learner-facing.
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
  intentional - it lets the learner peek at the metrics and
  discount cards while running the diagnosis. If it grows enough
  to need more space, scroll inside the drawer rather than
  expanding the drawer footprint.
- Don't switch `applyRoundBaseline` back to a full replace
  (`metrics: { ...baseline.metrics }`). It merges
  (`{ ...partner.metrics, ...baseline.metrics }`) so any
  partner-level static fields survive baseline application
  without being duplicated in every round entry.
- Don't reintroduce a Year-on-Year (PACE) card on Partner Detail.
  Retired in 2026-06 - SME confirmed the next-3M Room Nights
  secondary metric covers the forward-looking signal it was
  duplicating. If a story needs YoY context (e.g. a brand-first
  collapse), encode it in profile notes or persona-hint copy
  rather than as a standalone card.
- Don't reskin the partner conversation screens back to a chat-
  bubble UI. The softphone treatment (call card with PhoneCall
  badge, Live-with-duration status, quoted speaker turns, "Your
  response" footer) lines up with the Begin Conversation / Call /
  See round report language used elsewhere - reverting to chat
  bubbles re-opens the "is this chat or call?" ambiguity.
- Don't add an Advance Round button back to the Portfolio. The
  Conversation Report's Continue button is the only round-advance
  affordance; an action bar always read 1-action-remaining (one
  action per round) and added a redundant click.
- Don't add an Actions counter pill back to the Header, and don't
  reintroduce `actionsRemaining` to `GameState`. The mechanic is
  "one engagement per round" - the count value only ever showed 1
  or briefly 0, and never told the learner anything beyond what
  the round number already conveyed. The Conversation Report's
  Continue is the only path forward after a call, so the brief
  "actions=0" state was effectively unreachable to the eye.
  "One engagement per round" is now communicated through:
  (a) the small caption on the Begin Conversation card,
  (b) the round-tracker tutorial step, and
  (c) the implicit mechanic itself. The `actionsThisRound` array
  on `GameState` is still there - it's how the engine knows which
  partner was engaged this round, drives `alreadyEngaged`, and
  feeds neglect calculations on round advance.
- Don't paint a full-bleed backdrop as a CSS `background` value
  when you want it to fade in. CSS-background changes don't run
  through framer-motion's opacity transition, so the bitmap pops in
  at full opacity. Use DeviceFrame's `backdropImage` prop (for the
  phone/laptop frames) or a `motion.img` with `onLoad`-gated opacity
  (for screen-level backdrops). This is exactly what the Email Audit
  and GM Chat backdrops were doing wrong before the May 2026 fix.
- Don't swap backdrops back to PNG. WebP at 30-80KB each is what
  makes the immediate-mount fade pattern work; reintroducing 1.5MB+
  PNGs brings back the band-reveal that originally forced the
  decode-gate workaround.
- Don't reference eRPD price buckets in partner-facing copy.
  Phrases like "you're in Bucket 6" or "let's get you out of the red
  band" break the same internal-only rule that already governs
  Experienced RPD, Lose Price Public, and Competitive Partner Share.
  The strip is fine on Partner Detail (internal prioritisation); the
  bucket name must not surface in dialogue, hooks, pitches,
  briefings, or email-audit phrases.
- Don't hardcode a fixed ISO date for Last Pricing Contact (or any
  partner-data field that's meant to read as "recent"). Use the
  `lastPricingContactDaysAgo` offset shape so the gap stays
  constant across replays. A learner returning in six months
  shouldn't see a six-month-old date - they should see the same
  recency they saw on the first play.
- Don't add `fetch()`, `XMLHttpRequest`, CDN-hosted fonts, or any
  other runtime network call to the sim. The production deliverable
  is a self-contained SCORM zip served from the LMS - any external
  request will (a) fail or be blocked in many LMS sandboxes, (b)
  break the "no hosting required" guarantee, and (c) potentially
  trip Booking security review. All assets must ship in the bundle.
  The pipwerks SCORM API calls (`LMSGetValue` / `LMSSetValue`) are
  the only "outside the bundle" comms allowed, and those go to the
  LMS-injected `window.API` object, not the network.
