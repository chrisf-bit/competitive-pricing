# xAPI Schema v0.3 - Additions: Style Adaptation and Diagnostic Flow capture

Draft additions to fold into the Data Pipeline Schema (currently v0.2).
Two new measured signals plus one cross-cutting prerequisite they both
depend on. Written to slot into the existing doc; renumber the section
labels to match once placed.

Extension IRIs below use the base `{ext} = https://booking.com/xapi/ext`
as a placeholder. Replace with the Booking-owned IRI namespace once
confirmed (already an open question in the current doc). Extension keys
stay kebab-case to match the existing set (`level`, `item-code`,
`objection-type`, `normalized-score`, `capability-code`, `round-number`,
`regime`).

Reference for source-of-truth values: the sim's engine
(`engine/grading.ts`, `types/index.ts`) computes both signals today; the
work is emission, not measurement.

---

## 0. Prerequisite (cross-cutting): `mode` and `attempt-number`

Neither addition is watertight without this, and it hardens the whole
schema. Every scoring statement (existing and new) MUST carry:

- `{ext}/mode` : `"assessment" | "practice"` - `practice` for Practice
  Mode replays from the Debrief; `assessment` for the main run. Practice
  replays re-play scored rounds and must be excludable from capability
  rollups, or a learner can farm their scores.
- `{ext}/attempt-number` : integer, 1-based per (learner, round). Retakes
  emit a new statement each time (statements are immutable); the "best
  score only goes up" rule is applied in the ETL, not in the sim. Without
  an attempt marker the LRS holds several conflicting scores for one round
  with no way to order them.

ETL rule to state in the doc: **capability rollups
(`DIM_CAPABILITY_SCORES`) consider `mode = 'assessment'` only, and take
the latest `attempt-number` per (learner, round, measured item).**

---

## A. Style adaptation (adapting to the partner's communication style)

### A.1 What we capture

Each conversation option carries a `styleMatch` value scored against the
partner's primary communication style (`red | yellow | green | blue`). It
already drives the star tier (average styleMatch sets 2 vs 3 stars) but is
**folded into the star and not separately reportable**. This addition
surfaces it so "does the learner flex their approach to the partner's
personality" becomes its own axis.

Source of truth for the numeric range: the engine's per-option
`styleMatch` (integer; confirm exact bounds in `types/index.ts` - it is
currently in the range -2..+2, where -2 is an active mismatch against the
partner's primary style).

### A.2 Statement changes

No new statement type. Two extension additions:

**(a) Per-decision** - on each existing decision-scoring statement
(partner selection / diagnosis / pitch), add:

```json
"context": {
  "extensions": {
    "{ext}/style-match": 2,
    "{ext}/partner-style": "blue"
  }
}
```

- `style-match` : integer, the pick's styleMatch vs the partner's primary
  style.
- `partner-style` : the partner's primary style, so the dashboard knows
  what was being adapted to (a +2 to a blue partner is a different skill
  from a +2 to a green one).

**(b) Per-round rollup** - on the round-complete / call-close statement,
add:

```json
"result": { "score": { "raw": 3, "min": 0, "max": 3 } },
"context": {
  "extensions": {
    "{ext}/style-match-avg": 1.67,
    "{ext}/partner-style": "blue",
    "{ext}/normalized-score": 100
  }
}
```

- `style-match-avg` : numeric, mean styleMatch across the round's picks.
  Emitted for convenience; the per-decision values remain the source of
  truth and the average is otherwise derivable in Snowflake.

### A.3 Fact-table changes (DDL)

```sql
-- one row per scored decision
ALTER TABLE FACT_DECISION_SCORES
  ADD COLUMN style_match   SMALLINT,          -- per-pick, nullable
  ADD COLUMN partner_style VARCHAR(6);        -- red|yellow|green|blue

-- one row per completed round (or the round-close event in
-- FACT_GAME_EVENTS, whichever holds the round rollup)
ALTER TABLE FACT_GAME_EVENTS
  ADD COLUMN style_match_avg NUMERIC(4,2),
  ADD COLUMN partner_style   VARCHAR(6);
```

### A.4 Capability mapping

Style adaptation does not map cleanly onto the existing 10 capability
dimensions. Two options (see open questions):
- treat it as a **cross-cutting behavioural metric** reported alongside
  the capability heatmap, not inside it (recommended - keeps the 10-dim
  model stable), or
- add an 11th dimension "Adapting to partner style" with its own
  `capability-code` (`adapting-to-style`). L&D call.

---

## B. Pricing Diagnostic Flow (the Coach) capture

### B.1 What we capture, and the design fork

The Diagnostic Flow drawer is **teach-mode today: no scoring**. There are
two levels of capture, and they are materially different decisions:

- **B-engagement (low commitment):** did the learner open the Flow before
  the call, and when. Pure behavioural signal; no change to the drawer's
  teach-mode nature.
- **B-accuracy (higher commitment):** does the learner's Coach path match
  the scenario's prescribed `issueTreePath` (Trigger, Issue, Intent, Root
  cause, Metric, Hook)? This requires the drawer to **score its picks**,
  which turns a teaching aid into an assessment and interacts with the
  existing "Data suggests this" auto-suggest nudge. This needs an explicit
  pedagogy decision (see open questions) before it is built.

Both are specified below so the doc is complete; flag B-accuracy as
gated on sign-off.

### B.2 Statements

**B-engagement** - one per (partner, round, attempt) when the drawer is
first opened:

```json
{
  "verb": { "id": "http://adlnet.gov/expapi/verbs/interacted",
            "display": { "en-US": "interacted" } },
  "object": { "id": "{activity-base}/diagnostic-flow/l1/r3",
              "definition": { "type": "http://adlnet.gov/expapi/activities/interaction",
                              "name": { "en-US": "Pricing Diagnostic Flow" } } },
  "context": { "registration": "...", "extensions": {
    "{ext}/level": "L1", "{ext}/round-number": 3, "{ext}/regime": "none",
    "{ext}/coach-opened": true, "{ext}/mode": "assessment",
    "{ext}/attempt-number": 1
  } }
}
```

**B-accuracy** (only if the scored-Coach decision is taken) - one per
Coach completion, carrying per-step match against `issueTreePath`:

```json
{
  "verb": { "id": "http://adlnet.gov/expapi/verbs/completed",
            "display": { "en-US": "completed" } },
  "object": { "id": "{activity-base}/diagnostic-flow/l1/r3" },
  "result": { "score": { "raw": 5, "min": 0, "max": 6 },
              "completion": true },
  "context": { "extensions": {
    "{ext}/level": "L1", "{ext}/round-number": 3, "{ext}/regime": "none",
    "{ext}/item-code": "L1.1",
    "{ext}/capability-code": "diagnostic-flow-classification",
    "{ext}/coach-steps-correct": 5,
    "{ext}/coach-path-match": 0.83,
    "{ext}/coach-steps": {
      "trigger": true, "issue": true, "intent": true,
      "root-cause": true, "metric": true, "hook": false
    },
    "{ext}/normalized-score": 83,
    "{ext}/mode": "assessment", "{ext}/attempt-number": 1
  } }
}
```

- `coach-steps-correct` / `coach-path-match` : count and fraction of the 6
  steps matching the prescribed path.
- `coach-steps` : per-step boolean map, so the dashboard can show *which*
  step of the diagnosis breaks down (e.g. consistently wrong on Root
  cause), which is the actionable coaching detail.

### B.3 New fact table

A dedicated table keeps the per-step detail clean rather than overloading
`FACT_DECISION_SCORES`:

```sql
CREATE TABLE FACT_DIAGNOSTIC_FLOW (
  statement_id      VARCHAR PRIMARY KEY,
  learner_id        VARCHAR NOT NULL,
  registration      VARCHAR,
  level             VARCHAR(4),          -- L0..L3
  round_number      SMALLINT,
  regime            VARCHAR(16),         -- wide|narrow|none|cross-regional
  partner_id        VARCHAR,
  opened            BOOLEAN,             -- from the engagement statement
  scored            BOOLEAN,             -- false if only engagement captured
  steps_total       SMALLINT DEFAULT 6,
  steps_correct     SMALLINT,
  path_match_pct    NUMERIC(5,2),
  trigger_correct   BOOLEAN,
  issue_correct     BOOLEAN,
  intent_correct    BOOLEAN,
  root_cause_correct BOOLEAN,
  metric_correct    BOOLEAN,
  hook_correct      BOOLEAN,
  mode              VARCHAR(12),         -- assessment|practice
  attempt_number    SMALLINT,
  event_ts          TIMESTAMP_NTZ
);
```

### B.4 Capability mapping

Maps to the existing dimensions:
- **Pricing Diagnostic to Pitch Flow & discrepancy classification**
  (`item-code` L0.4, L1.1, L1.3).
- **Signal vs Proof** (L1.2) - the Metric step in particular.

Feed `FACT_DIAGNOSTIC_FLOW` into `DIM_CAPABILITY_SCORES` for those
dimensions **only if B-accuracy is built**; B-engagement alone is a
behavioural completeness signal, not a capability score.

---

## Open questions (add to section 8)

1. **Score the Coach, or only capture engagement?** B-accuracy turns the
   teach-mode Diagnostic Flow into an assessment. It also interacts with
   the "Data suggests this" auto-suggest chip - scoring a step the tool
   just nudged toward is not a fair measure unless the nudge is removed,
   hidden, or explicitly accounted for. Decide with L&D / Adriana.
2. **Does style adaptation become an 11th capability dimension, or a
   cross-cutting behavioural metric?** Recommended: cross-cutting, to keep
   the signed-off 10-dimension model stable.
3. **Confirm the `style-match` numeric scale to emit** (per-pick delta vs
   the partner's primary style; whether secondary style also contributes).
   Lock the range against `types/index.ts` so the ETL bounds are exact.
4. **Practice-mode and retake handling** (the section 0 prerequisite):
   confirm the ETL excludes `mode = 'practice'` from capability rollups
   and takes the latest `attempt-number` per measured item.
