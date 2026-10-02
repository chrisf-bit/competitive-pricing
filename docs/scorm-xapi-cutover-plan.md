# Rate Right - self-contained package cutover (Tin Can / xAPI)

Move Rate Right off the Render-hosted preview to a **self-contained
Tin Can / xAPI package** that Docebo unzips and serves with no runtime
hosting. After cutover, Render is retired as the delivery channel.

This is the complete technical cutover. The September launch *content*
scope (Objection as a round type, Level 3 OPC Application) is a
separate track at the end.

Status legend: `[ ]` not started  `[~]` partial  `[x]` done.
Grounded against the code on 2026-10-01 (`release-2-partner-detail`).

---

## Launch architecture - DECIDED: Tin Can / xAPI (not SCORM, not cmi5)

Confirmed 2026-10-01. The proven smoke test (`xapi-smoke-test/`) is a
**Tin Can package**: `tincan.xml` at the zip root, `<launch>` points at
the content, and **Docebo injects the LRS launch params on the content
URL query string** - `endpoint`, `auth`, `actor`, `registration`,
`activity_id`. The content reads them with `URLSearchParams`. cmi5 is
ruled out (Docebo doesn't support it); plain SCORM is rejected (it
can't deliver the LRS endpoint/auth without baking secrets).

This one decision resolves several things at once:
- **No baked secrets** - endpoint + auth come from the launch, not the
  bundle.
- **Learner name** comes from the launch `actor` (not
  `cmi.core.student_name`).
- **Persistence** moves to the xAPI **State API** (GET/PUT a state
  document keyed by activity + agent + registration) - no 4096-char
  limit, unlike SCORM `suspend_data`.
- **Completion / score** ride as xAPI `completed` / `passed` statements.

**Consequence:** the Phase 1 SCORM wrapper (`util/scorm.ts`,
SCORM-specific bits of `util/persistence.ts`) is **superseded**. Keep
`localStorage` as the dev fallback; replace the SCORM path with the
xAPI launch + State API path.

### What our own testing already proved on Docebo (no Booking input needed)
- **Tin Can launch works** - Docebo injects endpoint/auth/actor/
  registration on the query string.
- **Statements POST (200) and append** on replay (durable per-attempt
  history).
- **Docebo derives completion/score** from the xAPI `completed`, posted
  **against Docebo's launched `activity_id`** (a custom activity id is
  not what Docebo marks the lesson on).
- Constraints handled: **xAPI 1.0.2 only** (1.0.3 -> HTTP 400), **actor
  `mbox`/`name` arrive as arrays** (normalise), **CORS** preflight
  answered by the LRS.

So the launch, auth, endpoint, actor, persistence model and completion
are settled by our tests - **nothing to ask Booking** to validate them.

### High-volume emission - PROVEN (resolved)
- The 5-statement smoke test passed with custom
  `booking.com/xapi/rate-right` activity ids. The ~240-statement
  full-data package first came back mostly "400 Invalid activity"
  because it batched statements atomically (one bad statement dropped
  ~24 good ones). **Fixed by posting statements individually - re-tested
  and all 230+ statements were recorded in Docebo.** So the full
  pipeline at full volume (launch -> individual statement POSTs ->
  append -> completion against the launched activity) is proven end to
  end on Docebo. **No open LRS item, nothing to ask Booking.** The
  remaining xAPI work is purely porting this proven approach into the
  app.

---

## Phase A - Strip dev affordances (must not ship)

- [ ] **Remove DevNav.** Imported `App.tsx` L7, rendered twice (splash
  ~L97, main ~L508). `shouldShowDevNav()` opens on `import.meta.env.DEV`
  OR `?dev=1`. Remove imports + both render sites; delete
  `components/DevNav.tsx`.
- [ ] **Remove `DEV_UNLOCK_ALL_ROUNDS`** (`RoundSelectScreen.tsx` L33) so
  round locking falls back to the real sequential gate.
- [ ] **Remove / gate the Splash "Reset progress" button**
  (`SplashScreen.tsx` `onResetProgress`).
- [ ] **Remove every `?dev=1` / `import.meta.env.DEV` gate.** Grep sweep
  before packaging.

## Phase B - Decommission server / network

- [ ] **Retire Render as the delivery channel** once the package is
  accepted. Confirm `vite.config.ts` keeps `base: './'`.
- [ ] **`render.yaml`** - leave or delete (not part of the deliverable).
- [ ] **Conversation Review tool** (`review.html`, `src/review/*`,
  `client/review-apps-script/`) - already stripped from the zip by
  `build-scorm.mjs`. Confirm it stays excluded; its Apps Script endpoint
  must never ship in the learner package.
- [ ] **DECISION: Feedback button Sheet POST** (`FeedbackButton.tsx`,
  `client/feedback-apps-script/`). Options: keep the Google Sheet POST
  (precedent-backed, works now), migrate it onto the xAPI stream once
  emission lands (cleaner, joins the pipeline), or both during
  transition. Note: unlike xAPI, the Sheet URL is a baked endpoint - the
  one remaining baked outbound call if kept.
- [ ] **No-network audit** of built `dist/`: grep for `fetch`,
  `XMLHttpRequest`, `http(s)://`, `fonts.googleapis`, `unsplash`, CDN
  hosts. After cutover the only allowed outbound calls are: the xAPI LRS
  (endpoint from launch) and the feedback Sheet POST (if kept). Images /
  fonts / jsPDF are already bundled.
- [ ] Confirm the **Debrief summary PDF** (jsPDF, lazy, bundled)
  generates offline.

## Phase C - Production gating + routing

- [~] **Sequential round unlock** - already the production behaviour
  (`activeRound` = first round with < 1 star; later tiles lock; only the
  dev override opens them). After Phase A, **verify** 1 -> 20 unlocks
  strictly in order and Level 2 (11-20) is gated behind Level 1
  completion, across all regimes + KAM.
- [ ] **Clearance hard-gate** (80% + all activities attempted) re-verify
  in the packaged build.
- [ ] **DECISION: returning-learner routing** - cleared learners
  currently re-walk Market Select + Character Build each visit. Confirm
  keep vs skip; the State API resume may handle this at relaunch.
- [ ] **DECISION: parked partner records** (John / Stavros / Hannah /
  Priya / Yuki) - strip from the bundle or keep.

## Phase D - Launch + identity + persistence (replaces the SCORM layer)

- [ ] **Launch-param reader** - port from `xapi-smoke-test/index.html`:
  parse `endpoint`, `auth`, `actor`, `registration`, `activity_id` from
  the query string; normalise Docebo's array-form `mbox`/`name`; default
  gracefully when absent (dev / direct-open) to the `localStorage` path.
- [ ] **Learner name from the launch `actor`** - seeds
  `learnerProfile.playerName`, replacing the `cmi.core.student_name`
  seed. `Name_Var` stays the dev-only default. (Supersedes the current
  `getLmsStudentName` SCORM path.)
- [ ] **Persistence via the xAPI State API** - replace
  `cmi.suspend_data` with GET/PUT of a state document (activityId +
  agent + registration + a `stateId`). Store the same slim slice
  (learnerProfile, level0 cleared + clearedForRegime, roundStars). GET
  on launch to resume; PUT on change/commit. Keep `localStorage` as the
  dev/offline fallback. Keep the state shape versioned.
- [ ] **Commit timing** - PUT state on meaningful transitions +
  on `pagehide`/unload. A mid-conversation round isn't checkpointed by
  design - document it.
- [ ] Retire / gate the SCORM wrapper (`util/scorm.ts`) and its
  persistence branch once the above lands.

## Phase E - xAPI emission (statements)

The pipeline is proven in `xapi-smoke-test/` + `xapi-full-data-preview/`.
This phase ports it into the app and wires the real events.

- [ ] **`sendStatement()` helper** - POST to the launch `endpoint` with
  the launch `auth`, `X-Experience-API-Version: 1.0.2`, launch `actor` +
  `registration`. Fire-and-forget, errors swallowed, local buffer
  fallback. **Post individually, not in atomic batches**, so one
  rejected statement doesn't drop valid ones (per the Docebo constraint).
- [ ] **Completion against the launched `activity_id`** - post the
  `completed`/`passed` statement against Docebo's launched activity (its
  own request), or the lesson won't mark complete. Fire this at the
  **Level 2 celebration** (see reporting note below), not only the
  Debrief.
- [ ] **Event taxonomy wiring** (~100-150 statements / playthrough), per
  the v0.3 schema:
  - Clearance: each KC answered, each activity passed, clearance cleared
    (score).
  - Round: round started, partner engaged, each scored decision
    (Diagnosis / Pitch) with `result.score.raw` (stars 0-3) +
    `context.extensions.normalized-score` (0-100).
  - Level milestone completed at each celebration (clearance, Level 1,
    Level 2).
  - Debrief / final completion.
  - Every scoring statement carries `context.extensions.level` +
    `item-code` (and `objection-type` / `capability-code` where they
    apply).
- [ ] **Completion fires at the Level 2 celebration, not the Debrief.**
  Today a SCORM `completed` fired on Debrief mount (`DebriefScreen.tsx`
  L141). In the xAPI model, fire the `completed`/`passed` at the Level 2
  Complete screen (`level-2-complete`) - the real "finished all 20
  rounds" moment, before the Debrief. Make it **idempotent** and keep a
  Debrief fallback so it still lands via Play Again / legacy paths.
- [ ] **Objection codes** `OBJ_1..OBJ_22` (never display names) - once
  Objection content is built (launch track).
- [ ] Optional v0.3 additions: `style-match` extension, Diagnostic Flow
  (Coach) capture, `mode` / `attempt-number`.
- [ ] Reference: `docs/rate-right-learning-insights-data-pipeline-v0.3.md`,
  `docs/xapi-schema-v0.3-additions.md`, `xapi-smoke-test/`,
  `xapi-full-data-preview/`.

## Phase F - Packaging + QA + smoke test

- [x] CDN images -> bundled WebP. Fonts bundled (`@fontsource/inter`).
- [ ] **`tincan.xml` at the package root** pointing `<launch>` at the
  built `index.html`. Replace the SCORM `imsmanifest.xml` packaging path
  with a Tin Can build/zip step (adapt `scripts/build-scorm.mjs` -> a
  Tin Can package builder; still strip `review.*`).
- [ ] **Docebo smoke test from inside the packaged course**: launch
  params received, statements POST + append, completion against the
  launched activity id marks the lesson complete, State API resume
  works. (Confirm sandbox vs live Docebo with the LMS team.)
- [ ] **Full-playthrough QA in the packaged build**: all 3 regimes +
  KAM, clearance -> 20 rounds -> Debrief, Practice Mode, retake, PDF
  download, resume-after-close, short viewport / iframe.
- [ ] **No-network re-audit** of the final zip. **Build/content version
  stamp** baked in for support.

## Phase G - Booking-side items (soft governance, non-blocking)

The transport/launch/LRS architecture is proven - nothing to validate
with Booking. These remaining items are governance, not blockers:

- [ ] Booking-owned **IRI namespace** for activity/verb URIs (do they
  want their own vs our `booking.com/xapi/rate-right` placeholder).
- [ ] Event taxonomy / capability-mapping sign-off (L&D learning-design
  call).
- [ ] Learner **identifier** - already decided (Workday-ID account in the
  launch actor); just confirm on the live course.

## Phase H - Security + governance

- [ ] **Booking security review** of the package (explicit gate). Tin Can
  removes baked LRS secrets; the feedback Sheet URL is the one remaining
  baked endpoint if kept.
- [ ] **Data privacy** sign-off on PII in statements (name + Workday ID)
  - positioning doc exists; governance approval is the gate.
- [ ] **Accessibility** - confirm whether Booking requires WCAG; the sim
  has not been audited (keyboard nav, contrast, screen reader).
- [ ] **English-only** confirmation (no i18n requirement).

## Phase I - Content + legal sign-offs

- [ ] SME sign-off on Claude-authored content (L2 R11-20 distractors, KAM
  close/distractor decoys, L2 persona hints, L2 objection tags).
- [ ] Legal sign-off on the distractor surname-only localisation pattern.
- [ ] Remaining review-pack backlog applied.

---

## UX polish for the packaged / small-viewport (iframe) context

- [ ] **"More content below" scroll affordance** - a reusable cue on the
  scroll container (bottom fade + small chevron) that shows while content
  is clipped below the fold and hides at the bottom. Applied at the
  content-area level so it covers every screen at once. Theme-aware, no
  layout shift.
- [ ] Re-verify celebration screens, Day one / GM chat (phone frame), and
  the Warm Up summary on a short viewport.

## Separate track - September launch content scope

- [ ] Objection as a round scenario type (21-22 catalogued, not built).
- [ ] Level 3 (OPC Application) mechanic + content.

## Nice-to-have

- [ ] Code-split the ~1.2MB main JS chunk (dynamic imports).

---

### Shortest path to a packageable zip
Phases A + B + C (dev strip, server decommission, verify gating) +
D + F (launch/identity/State-API persistence + Tin Can packaging +
Docebo smoke test). Phase E (statements) can run fully in parallel - the
LRS pipeline is already proven at full volume, so it's just porting the
proven emitter into the app and wiring events; nothing gates it.

### Decisions needed
1. Feedback Sheet POST - keep / migrate to xAPI / both.
2. Returning-learner routing - re-walk vs skip.
3. Parked partner records - strip vs keep.
4. `render.yaml` + Render preview - retire fully or keep internal.

(The Docebo-LRS taxonomy question is NOT a Booking decision - our tests
already showed custom activity ids are accepted; the big-run 400s were
atomic batching. We close it ourselves by posting individually and
re-running the smoke test. See Phase E / F.)
