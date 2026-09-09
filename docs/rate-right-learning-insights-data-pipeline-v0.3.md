# RATE RIGHT LEARNING INSIGHTS AND DATA PIPELINE
Stream of Work 2 - Docebo

Version 0.3 - language revision for compliance review.
Prepared 13-07-2026. Updated 24-07-2026 (v0.2). Language revised 09-09-2026 (v0.3).
No technical or schema changes from v0.2: the taxonomy, statements, tables, DDL, and field-to-column mapping are identical. This revision only adjusts framing and wording so the document reads clearly for a learning, compliance, and data-governance audience. v0.2 added Cross-Regional (KAM) handling, objection code identifiers (OBJ_1, OBJ_2, ...), and level milestone completed statements.

---

## Positioning: what this data is and what it is for

Until now, the insight available from a digital learning experience has been very limited. The previous standard (SCORM) essentially recorded four things: whether someone started, whether they finished, how long they spent, and a quiz score if there was one. That confirms completion, but it says nothing about how well the learning landed, where people found it difficult, or whether it made a difference. It gives a manager no meaningful way to support their team, and it gives leadership no real evidence of impact.

Booking's investment in Docebo's xAPI capability changes that. xAPI is the current industry standard for capturing learning activity, and it lets us understand the full journey through a learning experience: from launching it, through the practice decisions a learner makes along the way, to completing it. Presented in a simple dashboard, this gives three things that were not possible before:

- **Better coaching.** Managers can see which capability areas a learner has practised confidently and which they would benefit from developing, so coaching conversations are focused and supportive rather than generic.
- **Better learning design.** We can see which parts of an experience are landing well and which are not, so the content itself can be improved, for everyone.
- **Evidence of impact.** Leadership gets credible data on learning impact and return on investment.

Two points are worth being clear about, because they shape everything below:

- **This is practice, not real-world performance.** Every data point in this document is generated inside the Rate Right training simulation - a safe environment designed for people to try things, make mistakes, and learn. It reflects how someone is building their skills in a practice exercise. It is a measure of learning, not a measure of their day-to-day job.
- **The focus is development and better learning.** The value is in helping people grow and in improving the experience. The insights are most powerful in aggregate; where individual insight supports a coaching conversation, it sits with the learner and their manager as a development tool.

### Privacy and data governance by design

- **Purpose limitation.** The data described here exists to support learning and development and to improve the learning experience.
- **Learner identifier is configurable.** The learner is referenced by an account identifier (see 2.3). The exact identifier format is Booking's to set, and it can be a pseudonymised or hashed value so the dataset does not need to carry directly identifying information.
- **Data minimisation.** The sim emits only what is needed to produce the learning insights above. The capture scope can be shaped to whatever Booking's privacy and data-governance teams are comfortable with.
- **Aggregate first.** The reporting is designed to be read at cohort and content level; individual-level detail supports coaching, not comparison or ranking.
- **Standard, governed technology.** This runs on capability already built into Docebo, using the open xAPI standard, inside a namespace Booking owns (see 8.3). There is no third-party data destination in this design; rapid-learn's remit ends when statements land in Docebo.

A note on table names: one of Booking's target analytics tables is named `FACT_OBJECTION_PERFORMANCE`. "Objection" and "performance" here refer to the *learning exercise* - how a learner practised responding to a coaching-scenario objection inside the simulation - not to an individual's job performance. The table name comes from Booking's own target data map and is kept as-is for pipeline compatibility.

---

## What we need from you (open questions in section 9)

**Docebo Team**
- Can we ensure that the data highlighted in this schema will flow according to this schema.
- Confirm the xAPI namespace (endpoint) and the learner identifier format (how a Booking staff member is referenced in the data). This is where and how the sim will send data into Docebo.
- Sign off on the small set of custom verbs used where no standard equivalent exists.
- Would you have the capacity to support us to build a custom report for the insights we will be collecting?
- Would it be possible to provide our vendor Chris (chris@rapid-learn.co.uk) with the LRS endpoint URL and authentication method (on the Docebo side)?
- Does this need to go through the relevant Integrations and data team? What do we need for this to happen, and who do we need to contact?
- Please clarify whether it is possible to get a daily data export from Docebo, even if done manually, so we could upload it into a temporary Google Sheets dashboard as a contingency.

## What the schema covers

- **The full journey, all experiences.** It handles the standard journey and the Cross-Regional (KAM) experience within one simulation, distinguished by a regime tag. Cross-Regional is 10 rounds across two levels of five, with OPC (Advanced) metrics active throughout.
- **Insight at every stage.** The sim emits a completion event at each milestone (clearance, end of Level 1, end of Level 2, and the final debrief), so progress is measurable stage by stage, not just at the end.
- **Continuous round numbering.** Rounds run continuously across the experience: standard journey is Level 1 rounds 1-10 and Level 2 rounds 11-20; Cross-Regional is Level 1 rounds 1-5 and Level 2 rounds 6-10.

**How objections are handled.** Objections are recorded using stable codes (OBJ_1, OBJ_2, and so on) rather than their names. The code is what lands in the data. This keeps the reporting stable while the objection content is still being refined: a change to an objection's wording never disturbs the historical data, because the data only ever references the code. The friendly names still show on dashboards, joined back in through a simple lookup table (the same pattern used for the capability item codes). We will provide a one-off code-to-name reference list once the objection set is finalised.

## 1. Purpose

The Rate Right simulation is a Booking pricing learning experience shipping for a September 2026 launch across Levels 0 through 3. Its purpose is to help people develop pricing capability in a safe, practice environment. This document specifies how the sim emits learning data via xAPI, how that data lands in Booking's Snowflake environment, and how the resulting Snowflake tables align with the target Fact and Dimension schema shared by Booking's data team. It covers the taxonomy of learning events the sim emits, sample statements for each event type, Snowflake table definitions, and the field-to-column mapping that ties the two together. Items marked TBD require Booking sign-off before build starts.

## 2. Design principles

**2.1 xAPI vocabulary.** The taxonomy uses standard ADL verbs where possible (initialized, passed, failed, completed, answered, interacted) plus a small set of Booking-specific extensions for domain concepts such as item code, capability code, misconception code, regime, level, and round number.

**2.2 Statement shape.** Each measured learning event fires as its own discrete statement rather than being consolidated into a shared summary statement. Discrete shape maps one to one into the client's Fact and Dimension tables and keeps the ETL layer simple. A full playthrough is estimated to emit roughly 100 to 150 statements.

**2.3 Learner identifier.** The actor is expressed as an account object where account.name is the Booking staff identifier and account.homePage is a Booking-owned namespace root (placeholder: https://booking.com/xapi/rate-right). Both values are TBD until Booking confirms the namespace and identifier scheme. The identifier may be a pseudonymised or hashed value at Booking's discretion.

**2.4 Level tagging.** Every statement carries context.extensions.level with a value of level-0, level-1, level-2, or level-3. This maps directly to the level column across the client's Fact tables.

**2.5 Item codes.** Every scoring statement carries context.extensions.item-code with values matching Booking's capability data map (L0.1 through L3.5). These codes drive aggregation from FACT_DECISION_SCORES into DIM_CAPABILITY_SCORES via a shared lookup between item code and capability code.

**2.6 Scoring format.** Each round or item score is emitted twice on the same statement to serve both learning and reporting needs. Raw star count sits in result.score.raw (min 0, max 3). Normalized 0 to 100 score sits in context.extensions.normalized-score. Both shapes travel together so downstream consumers can pick whichever they need.

**2.7 Session grouping.** Every statement in a single learner's playthrough shares the same context.registration value, a UUID assigned at session start. This groups statements downstream so per-attempt and per-playthrough queries can join cleanly.

**2.8 Timestamps.** All timestamps use ISO 8601 UTC.

**2.9 Objection identifiers.** Objections are emitted as stable codes (OBJ_1, OBJ_2, and so on), never as their display names. The code travels in context.extensions.objection-type and is the value stored in FACT_OBJECTION_PERFORMANCE.objection_type. Objection display names are treated as presentation copy only and are expected to change during content development, so they are kept out of the data stream entirely. rapid-learn supplies a one-off objection code-to-name reference list on build; Booking's data team owns any code-to-name mapping table (for example a DIM_OBJECTION dimension) used for Tableau labelling. This keeps the reporting layer stable regardless of how objection wording changes.

**2.10 Cross-Regional (KAM) handling.** The Key Account Manager experience is not a separate build. It runs inside the same simulation, distinguished only by regime with the value cross-regional (the sim is not made role-specific). It comprises 10 rounds split into two levels of five (level-1 rounds 1 to 5, level-2 rounds 6 to 10). OPC (Advanced) metrics are active in every scenario, so the OPC-related capability item codes are exercised across all rounds rather than only in the back half. No additional tables or columns are required: the existing regime, level, round-number, and item-code extensions fully express the KAM structure. Cross-Regional rounds present multiple pricing issues to resolve, so each such round emits multiple objection statements (see 3.13); FACT_OBJECTION_PERFORMANCE keys on objection_id per statement, so several objection rows per round are the expected shape.

**2.11 Round numbering.** Rounds are numbered continuously across the whole experience, not reset per level. In the standard 20-round experience, Level 1 is rounds 1 to 10 and Level 2 is rounds 11 to 20. In the 10-round Cross-Regional (KAM) experience, Level 1 is rounds 1 to 5 and Level 2 is rounds 6 to 10. context.extensions.round-number and the object id round-M both carry this continuous number, while context.extensions.level carries the level grouping. This lets ETL filter by level or by round without needing a level-plus-within-level composite key.

## 3. Statement taxonomy

The sim emits the following distinct statement types across a full playthrough. Each entry names the verb, the object pattern, when it fires, and which downstream Snowflake table it feeds primarily. Where a statement records a timing value (for example response-time-seconds), that value is used to inform learning design (for example, spotting where a step consistently causes hesitation because it is unclear) and to support coaching. It is not used to time-pressure or rank individuals.

**3.1 Sim initialized.** Verb initialized. Object rate-right/simulation. Fires once when the learner enters the sim. Feeds FACT_GAME_EVENTS.

**3.2 Sim completed.** Verb completed. Object rate-right/simulation. Fires once when the learner reaches the debrief. Carries the overall composite score. Feeds FACT_GAME_EVENTS and, via the accompanying capability statements, DIM_CAPABILITY_SCORES.

**3.3 Capability score computed.** Verb scored (Booking custom, alternately mappable to a standard reported verb). Object rate-right/capability/{code} where code is one of the ten capability slugs (recognising-discrepancies, opc-cpc-understanding, diagnostic-to-pitch-flow, signal-vs-proof, commercial-recommendation, objection-handling, landing-next-steps, safe-framing, portfolio-prioritisation, ppai-integration). Fires ten times at the end of each playthrough. Carries score.raw (0 to 100) and result.extensions.contributing-item-codes for traceability. Feeds DIM_CAPABILITY_SCORES.

**3.4 Primary coaching focus identified.** Verb identified (Booking custom). Object rate-right/simulation/primary-coaching-focus. Fires once at debrief. Carries primary and secondary capability slugs plus a misconception-flags array. Feeds DIM_COACHING_FOCUS.

**3.5 Level 0 initialized.** Verb initialized. Object rate-right/level-0/clearance. Fires at the start of each Level 0 attempt. Carries attempt-number extension. Feeds FACT_GAME_EVENTS.

**3.6 Level 0 attempt completed.** Verb passed or failed. Object rate-right/level-0/clearance. Fires at the end of each Level 0 attempt. Carries score (0 to 100), attempt-number, first-attempt, and time-to-completion-seconds. Feeds FACT_CLEARANCE and FACT_GAME_EVENTS.

**3.7 Level 0 item answered.** Verb answered. Object rate-right/level-0/item/{item-id}. Fires once per knowledge check item. Carries response, correctness, and (for wrong answers) a misconception-code extension. Feeds FACT_DECISION_SCORES and, via aggregation, DIM_COACHING_FOCUS.

**3.8 Round initialized (Levels 1, 2, 3).** Verb initialized. Object rate-right/level-N/round-M. Fires at the start of each round. Feeds FACT_GAME_EVENTS.

**3.9 Partner selection answered (Level 1).** Verb answered. Object rate-right/level-1/round-M/partner-selection. Fires when the learner picks a partner. Carries response (partner id), target (correct partner id), correctness, and response-time-seconds. Feeds FACT_DECISION_SCORES.

**3.10 Diagnostic Flow completed (Level 1).** Verb completed. Object rate-right/level-1/round-M/diagnostic-flow. Fires at Hook step. Carries aggregate score and per-step correctness extensions. Feeds FACT_DECISION_SCORES.

**3.11 Conversation decision made (Levels 2 and 3).** Verb answered. Object rate-right/level-N/round-M/{phase} where phase is hook, diagnosis, pitch, or objection-response. Fires per option pick. Carries response, score, style-match, compliance-flag, and response-time-seconds. Feeds FACT_DECISION_SCORES.

**3.12 Objection presented (Levels 2 and 3).** Verb interacted. Object rate-right/level-N/round-M/objection/{objection-type}. Fires when the partner raises an objection. Carries objection-type extension. Feeds FACT_GAME_EVENTS.

**3.13 Objection response answered (Levels 2 and 3).** Verb answered. Object rate-right/level-N/round-M/objection-response. Fires when the learner picks their response to an objection. Carries response, score, compliance-flag, and response-time-seconds. Feeds FACT_OBJECTION_PERFORMANCE and FACT_DECISION_SCORES.

**3.14 Round completed with score (Levels 1, 2, 3).** Verb completed. Object rate-right/level-N/round-M. Fires at the end of each round. Carries star score (raw), normalized score, compliance-safe flag, and round-duration-seconds. Feeds FACT_DECISION_SCORES.

**3.15 Round reset (retake).** Verb reset (Booking custom). Object rate-right/level-N/round-M. Fires when the learner replays a round that scored zero stars. Carries prior score for traceability. Feeds FACT_GAME_EVENTS.

**3.16 Level milestone completed.** Verb completed. Object rate-right/level-N where N is the level just finished. Fires once at each reportable milestone celebration screen: clearance complete, Level 1 complete, and Level 2 complete. Carries the level composite score (0 to 100), normalized-score, and rounds-completed for that level. Feeds FACT_GAME_EVENTS. In the Cross-Regional (KAM) experience these three milestones map to the clearance, end of level 1 (round 5), and end of level 2 (round 10) celebration screens.

## 4. Sample xAPI statements

Sample scenario uses learner BK-1234 playing on 2026-09-15 in a No Parity market. Five representative statements cover the shape for all statement types.

### 4.1 Statement A: Level 0 clearance passed (attempt 2)

```json
{
  "actor": {
    "objectType": "Agent",
    "account": {
      "homePage": "https://booking.com/xapi/rate-right",
      "name": "BK-1234"
    }
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/passed",
    "display": { "en-US": "passed" }
  },
  "object": {
    "objectType": "Activity",
    "id": "https://booking.com/xapi/rate-right/level-0/clearance",
    "definition": {
      "name": { "en-US": "Level 0 Clearance" },
      "type": "http://adlnet.gov/expapi/activities/assessment"
    }
  },
  "result": {
    "success": true,
    "completion": true,
    "score": { "scaled": 0.88, "raw": 88, "min": 0, "max": 100 }
  },
  "context": {
    "registration": "b7a1e7d0-3f9d-4c4e-9a01-session01",
    "platform": "Rate Right",
    "language": "en-US",
    "extensions": {
      "https://booking.com/xapi/extensions/level": "level-0",
      "https://booking.com/xapi/extensions/attempt-number": 2,
      "https://booking.com/xapi/extensions/first-attempt": false,
      "https://booking.com/xapi/extensions/regime": "no-parity",
      "https://booking.com/xapi/extensions/time-to-completion-seconds": 1815
    }
  },
  "timestamp": "2026-09-15T10:12:19.000Z"
}
```

### 4.2 Statement B: Level 1 Round 3 completed with score

```json
{
  "actor": {
    "objectType": "Agent",
    "account": {
      "homePage": "https://booking.com/xapi/rate-right",
      "name": "BK-1234"
    }
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/completed",
    "display": { "en-US": "completed" }
  },
  "object": {
    "objectType": "Activity",
    "id": "https://booking.com/xapi/rate-right/level-1/round-3",
    "definition": {
      "name": { "en-US": "Level 1 Round 3" },
      "type": "http://adlnet.gov/expapi/activities/simulation"
    }
  },
  "result": {
    "success": true,
    "completion": true,
    "score": { "raw": 2, "min": 0, "max": 3 },
    "extensions": {
      "https://booking.com/xapi/extensions/normalized-score": 67,
      "https://booking.com/xapi/extensions/partner-selection-correct": true,
      "https://booking.com/xapi/extensions/compliance-safe": true,
      "https://booking.com/xapi/extensions/style-match-sum": 5,
      "https://booking.com/xapi/extensions/round-duration-seconds": 342
    }
  },
  "context": {
    "registration": "b7a1e7d0-3f9d-4c4e-9a01-session01",
    "platform": "Rate Right",
    "language": "en-US",
    "extensions": {
      "https://booking.com/xapi/extensions/level": "level-1",
      "https://booking.com/xapi/extensions/round-number": 3,
      "https://booking.com/xapi/extensions/item-code": "L1.4",
      "https://booking.com/xapi/extensions/regime": "no-parity"
    }
  },
  "timestamp": "2026-09-15T10:41:57.000Z"
}
```

### 4.3 Statement C: Level 2 Round 15 objection response

```json
{
  "actor": {
    "objectType": "Agent",
    "account": {
      "homePage": "https://booking.com/xapi/rate-right",
      "name": "BK-1234"
    }
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/answered",
    "display": { "en-US": "answered" }
  },
  "object": {
    "objectType": "Activity",
    "id": "https://booking.com/xapi/rate-right/level-2/round-15/objection-response",
    "definition": {
      "name": { "en-US": "Round 15 - Objection response" },
      "type": "http://adlnet.gov/expapi/activities/cmi.interaction",
      "interactionType": "choice"
    }
  },
  "result": {
    "success": true,
    "completion": true,
    "response": "acknowledge-and-reframe",
    "score": { "raw": 82, "min": 0, "max": 100 },
    "extensions": {
      "https://booking.com/xapi/extensions/normalized-score": 82,
      "https://booking.com/xapi/extensions/compliance-flag": "safe",
      "https://booking.com/xapi/extensions/style-match": 2,
      "https://booking.com/xapi/extensions/response-time-seconds": 18
    }
  },
  "context": {
    "registration": "b7a1e7d0-3f9d-4c4e-9a01-session01",
    "platform": "Rate Right",
    "language": "en-US",
    "extensions": {
      "https://booking.com/xapi/extensions/level": "level-2",
      "https://booking.com/xapi/extensions/round-number": 15,
      "https://booking.com/xapi/extensions/item-code": "L2.3",
      "https://booking.com/xapi/extensions/objection-type": "OBJ_14",
      "https://booking.com/xapi/extensions/regime": "no-parity"
    }
  },
  "timestamp": "2026-09-15T11:24:03.000Z"
}
```

### 4.4 Statement D: Capability score computed (objection handling)

```json
{
  "actor": {
    "objectType": "Agent",
    "account": {
      "homePage": "https://booking.com/xapi/rate-right",
      "name": "BK-1234"
    }
  },
  "verb": {
    "id": "https://booking.com/xapi/verbs/scored",
    "display": { "en-US": "scored" }
  },
  "object": {
    "objectType": "Activity",
    "id": "https://booking.com/xapi/rate-right/capability/objection-handling",
    "definition": {
      "name": { "en-US": "Objection handling capability" },
      "type": "http://adlnet.gov/expapi/activities/performance"
    }
  },
  "result": {
    "success": true,
    "completion": true,
    "score": { "scaled": 0.79, "raw": 79, "min": 0, "max": 100 },
    "extensions": {
      "https://booking.com/xapi/extensions/contributing-item-codes": ["L2.3"],
      "https://booking.com/xapi/extensions/statements-aggregated": 10
    }
  },
  "context": {
    "registration": "b7a1e7d0-3f9d-4c4e-9a01-session01",
    "platform": "Rate Right",
    "language": "en-US",
    "extensions": {
      "https://booking.com/xapi/extensions/capability-code": "objection-handling",
      "https://booking.com/xapi/extensions/regime": "no-parity"
    }
  },
  "timestamp": "2026-09-15T12:08:44.000Z"
}
```

### 4.5 Statement E: Simulation completed (game summary)

```json
{
  "actor": {
    "objectType": "Agent",
    "account": {
      "homePage": "https://booking.com/xapi/rate-right",
      "name": "BK-1234"
    }
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/completed",
    "display": { "en-US": "completed" }
  },
  "object": {
    "objectType": "Activity",
    "id": "https://booking.com/xapi/rate-right/simulation",
    "definition": {
      "name": { "en-US": "Rate Right Simulation" },
      "type": "http://adlnet.gov/expapi/activities/simulation"
    }
  },
  "result": {
    "success": true,
    "completion": true,
    "score": { "scaled": 0.78, "raw": 78, "min": 0, "max": 100 },
    "extensions": {
      "https://booking.com/xapi/extensions/rounds-completed": 20,
      "https://booking.com/xapi/extensions/total-stars": 47,
      "https://booking.com/xapi/extensions/persona": "data-detective",
      "https://booking.com/xapi/extensions/primary-coaching-focus": "safe-framing",
      "https://booking.com/xapi/extensions/secondary-coaching-focus": "objection-handling"
    }
  },
  "context": {
    "registration": "b7a1e7d0-3f9d-4c4e-9a01-session01",
    "platform": "Rate Right",
    "language": "en-US",
    "extensions": {
      "https://booking.com/xapi/extensions/regime": "no-parity"
    }
  },
  "timestamp": "2026-09-15T12:08:47.000Z"
}
```

## 5. Snowflake schema

The pattern is a raw landing zone plus curated analytics tables. The raw zone preserves the original xAPI JSON so analytics tables can be rebuilt from scratch if the schema changes. Curated tables map one to one with Booking's target Fact and Dimension design.

### 5.1 RAW_STATEMENTS (append-only landing zone)

```sql
CREATE OR REPLACE TABLE rate_right.raw.statements (
  statement_id VARCHAR(36) PRIMARY KEY,
  stored_at TIMESTAMP_TZ NOT NULL,
  payload VARIANT NOT NULL
);
```

### 5.2 FACT_GAME_EVENTS

```sql
CREATE OR REPLACE TABLE rate_right.analytics.fact_game_events (
  event_id VARCHAR(36) PRIMARY KEY,
  learner_id VARCHAR(64) NOT NULL,
  session_registration VARCHAR(36) NOT NULL,
  level VARCHAR(20) NOT NULL,
  round_number NUMBER(2),
  event_type VARCHAR(64) NOT NULL,
  event_subtype VARCHAR(64),
  regime VARCHAR(20),
  event_timestamp TIMESTAMP_TZ NOT NULL,
  raw_statement_id VARCHAR(36) NOT NULL,
  CONSTRAINT fk_game_events_raw FOREIGN KEY (raw_statement_id) REFERENCES rate_right.raw.statements(statement_id)
)
CLUSTER BY (learner_id, event_timestamp);
```

### 5.3 FACT_DECISION_SCORES

```sql
CREATE OR REPLACE TABLE rate_right.analytics.fact_decision_scores (
  score_id VARCHAR(36) PRIMARY KEY,
  learner_id VARCHAR(64) NOT NULL,
  session_registration VARCHAR(36) NOT NULL,
  level VARCHAR(20) NOT NULL,
  item_code VARCHAR(10) NOT NULL,
  capability_code VARCHAR(64),
  round_number NUMBER(2),
  decision_type VARCHAR(64),
  score NUMBER(5,2) NOT NULL,
  raw_score NUMBER(3),
  correctness BOOLEAN,
  compliance_flag VARCHAR(20),
  style_match NUMBER(3),
  response_time_seconds NUMBER(6),
  score_timestamp TIMESTAMP_TZ NOT NULL,
  raw_statement_id VARCHAR(36) NOT NULL,
  CONSTRAINT fk_decision_raw FOREIGN KEY (raw_statement_id) REFERENCES rate_right.raw.statements(statement_id)
)
CLUSTER BY (learner_id, level, item_code);
```

### 5.4 FACT_OBJECTION_PERFORMANCE

Records how a learner practised responding to a coaching-scenario objection inside the simulation. "Performance" here means performance within the practice exercise, not job performance. Table name retained from Booking's target data map for pipeline compatibility.

```sql
CREATE OR REPLACE TABLE rate_right.analytics.fact_objection_performance (
  objection_id VARCHAR(36) PRIMARY KEY,
  learner_id VARCHAR(64) NOT NULL,
  session_registration VARCHAR(36) NOT NULL,
  level VARCHAR(20) NOT NULL,
  round_number NUMBER(2) NOT NULL,
  objection_type VARCHAR(64) NOT NULL,
  response_option VARCHAR(64),
  score NUMBER(5,2) NOT NULL,
  compliance_flag VARCHAR(20),
  response_time_seconds NUMBER(6),
  objection_timestamp TIMESTAMP_TZ NOT NULL,
  raw_statement_id VARCHAR(36) NOT NULL,
  CONSTRAINT fk_objection_raw FOREIGN KEY (raw_statement_id) REFERENCES rate_right.raw.statements(statement_id)
)
CLUSTER BY (learner_id, objection_type);
```

### 5.5 FACT_CLEARANCE

```sql
CREATE OR REPLACE TABLE rate_right.analytics.fact_clearance (
  attempt_id VARCHAR(36) PRIMARY KEY,
  learner_id VARCHAR(64) NOT NULL,
  session_registration VARCHAR(36) NOT NULL,
  level VARCHAR(20) NOT NULL,
  attempt_number NUMBER(2) NOT NULL,
  passed BOOLEAN NOT NULL,
  score NUMBER(5,2) NOT NULL,
  first_attempt BOOLEAN NOT NULL,
  time_to_completion_seconds NUMBER(6),
  attempt_timestamp TIMESTAMP_TZ NOT NULL,
  raw_statement_id VARCHAR(36) NOT NULL,
  CONSTRAINT fk_clearance_raw FOREIGN KEY (raw_statement_id) REFERENCES rate_right.raw.statements(statement_id)
)
CLUSTER BY (learner_id);
```

### 5.6 DIM_CAPABILITY_SCORES

```sql
CREATE OR REPLACE TABLE rate_right.analytics.dim_capability_scores (
  learner_id VARCHAR(64) NOT NULL,
  session_registration VARCHAR(36) NOT NULL,
  recognising_discrepancies NUMBER(5,2),
  opc_cpc_understanding NUMBER(5,2),
  diagnostic_to_pitch_flow NUMBER(5,2),
  signal_vs_proof NUMBER(5,2),
  commercial_recommendation NUMBER(5,2),
  objection_handling NUMBER(5,2),
  landing_next_steps NUMBER(5,2),
  safe_framing NUMBER(5,2),
  portfolio_prioritisation NUMBER(5,2),
  ppai_integration NUMBER(5,2),
  composite_score NUMBER(5,2) NOT NULL,
  computed_at TIMESTAMP_TZ NOT NULL,
  PRIMARY KEY (learner_id, session_registration)
);
```

### 5.7 DIM_COACHING_FOCUS

```sql
CREATE OR REPLACE TABLE rate_right.analytics.dim_coaching_focus (
  learner_id VARCHAR(64) NOT NULL,
  session_registration VARCHAR(36) NOT NULL,
  primary_focus VARCHAR(64) NOT NULL,
  secondary_focus VARCHAR(64),
  misconception_flags ARRAY,
  computed_at TIMESTAMP_TZ NOT NULL,
  PRIMARY KEY (learner_id, session_registration)
);
```

## 6. Field-to-column mapping

### 6.1 FACT_GAME_EVENTS

```
event_id = statement.id
learner_id = actor.account.name
session_registration = context.registration
level = context.extensions.level
round_number = context.extensions.round-number (nullable)
event_type = derived from verb.id
event_subtype = derived from object.id
regime = context.extensions.regime
event_timestamp = timestamp
raw_statement_id = statement.id
```

### 6.2 FACT_DECISION_SCORES

```
score_id = statement.id
learner_id = actor.account.name
session_registration = context.registration
level = context.extensions.level
item_code = context.extensions.item-code
capability_code = ETL lookup from item_code
round_number = context.extensions.round-number
decision_type = derived from object.id
score = context.extensions.normalized-score, or result.score.raw when the raw score is already 0 to 100
raw_score = result.score.raw when the raw score is 0 to 3 stars
correctness = result.success
compliance_flag = result.extensions.compliance-flag
style_match = result.extensions.style-match
response_time_seconds = result.extensions.response-time-seconds
score_timestamp = timestamp
raw_statement_id = statement.id
```

### 6.3 FACT_OBJECTION_PERFORMANCE

```
objection_id = statement.id
learner_id = actor.account.name
session_registration = context.registration
level = context.extensions.level
round_number = context.extensions.round-number
objection_type = context.extensions.objection-type
response_option = result.response
score = result.score.raw
compliance_flag = result.extensions.compliance-flag
response_time_seconds = result.extensions.response-time-seconds
objection_timestamp = timestamp
raw_statement_id = statement.id
```

### 6.4 FACT_CLEARANCE

```
attempt_id = statement.id
learner_id = actor.account.name
session_registration = context.registration
level = context.extensions.level
attempt_number = context.extensions.attempt-number
passed = result.success
score = result.score.raw
first_attempt = context.extensions.first-attempt
time_to_completion_seconds = context.extensions.time-to-completion-seconds
attempt_timestamp = timestamp
raw_statement_id = statement.id
```

### 6.5 DIM_CAPABILITY_SCORES

Built by ETL from the ten capability-score-computed statements and the sim-completed statement per learner playthrough.
```
learner_id = actor.account.name
session_registration = context.registration
Each capability column = result.score.raw from the matching capability code
composite_score = result.score.raw from the sim-completed statement
computed_at = timestamp of the sim-completed statement
```

### 6.6 DIM_COACHING_FOCUS

```
learner_id = actor.account.name
session_registration = context.registration
primary_focus = result.extensions.primary-coaching-focus from primary-coaching-focus statement, or from sim-completed extensions
secondary_focus = result.extensions.secondary-coaching-focus
misconception_flags = array aggregated by ETL from all L0 item-answered statements where correctness is false, using result.extensions.misconception-code
computed_at = timestamp of the sim-completed statement
```

### Table 1 - DIM_OBJECTION (the lookup)

| Objection | Code | Dashboard Name | Legend Description | Level | Category |
|---|---|---|---|---|---|
| The Segmented Pricing Conversation | OBJ_1 | Targeted vs Broad Discounting | The partner rejects blanket rate cuts but is keen to consider underperforming guest segments. | 1 | XPC |
| Brand.com Loyalty | OBJ_2 | Brand.com Loyalty | The partner limits our booking share to protect their direct website. | 1 | XPC |
| The Competitive Aggression | OBJ_3 | Competitor Rate Pressure | The partner follows aggressive competitor pricing advice. | 1 | XPC |
| The Same Net Mindset | OBJ_4 | Gross Rate vs Public Price | The partner only cares about getting the same payout and not the means behind it. | 1 | XPC |
| Family Ready narrative | OBJ_5 | - | - | 1 | XPC |
| The Billboard Effect in Reverse (Direct-Channel Focus) | OBJ_6 | Direct Search Misconception | The partner overprices our platform to force direct bookings. | 1 | XPC |
| The "Value Proposition" Wall | OBJ_7 | Partner Data Resistance & Value Proposition Challenge | The partner rejects data that can guide pricing conversation or already has a fixed cap for Booking.com. | 1 | XPC |
| The "Slippery Road" of Pricing | OBJ_8 | Pricing Talk Hesitation | I hesitate to hold deep pricing discussions because I am unsure what advice I am allowed to give. | 1 | XPC |
| The Direct-is-Cheaper Strategy | OBJ_9 | Direct Rate Undercutting | The partner intentionally keeps their direct website cheaper to protect direct bookings. | 1 | XPC |
| BSB / Payments Shield | OBJ_10 | BSB Resistance | The partner views Booking Sponsored Benefit as losing rate control. | 1 | XPC |
| The "Wholesaler Leak" | OBJ_11 | Wholesaler Rate Leakage | The partner blames us for leaked wholesale rates on the platform, feeling powerless to fix the leak and resistant to fixing their uncompetitive prices. | 1 | XPC |
| The Risky Guest | OBJ_12 | Risky Guest & Payment Risk Overpricing | The partner overprices our platform to avoid cancellations and risky guests. | 1 | XPC |
| The "Traveler-Centric" Pivot | OBJ_13 | Traveler Behaviour Pivot | I struggle to incorporate traveler behaviour to show the partner we are working towards the same objective. | 2 | OPC |
| The "Global Stat" Credibility Gap | OBJ_14 | Global Stats Skepticism | The partner dismisses global stats as corporate marketing. | 2 | OPC |
| The "Peer Group" Credibility Gap | OBJ_15 | Peer Group Rejection | The partner rejects their peer group comparison as being inaccurate. | 2 | OPC |
| Internal vs. External Data | OBJ_16 | Data Discrepancy Resistance | The partner rejects our platform metrics because they conflict with their internal data. | 2 | OPC |
| The "Money-in-Bank" | OBJ_17 | Contract & Policy Shields | The partner hides behind corporate policies or pre-buy contracts, fearing competitor penalties if they make our platform equally competitive. | 2 | OPC |
| The Regional Office Shield | OBJ_18 | Contract & Policy Shields | The partner hides behind corporate policies or pre-buy contracts, fearing competitor penalties if they make our platform equally competitive. | 2 | OPC |
| The "Too Unique" Comp-Set Refusal | OBJ_19 | Comp Set Rejection | The partner claims their property is too unique or premium for our benchmark data. | 2 | OPC |
| Connect the Metrics Gap | OBJ_20 | Data storytelling Gap | I struggle to connect metrics into a clear story when making pricing recommendations. | 2 | OPC |
| The "Fake Value" Trap (Genius Inflation) | OBJ_21 | Rate Inflation / Fake Discounts | The partner inflates base rates to offset discounts. | 2 | OPC |
| The "Action-to-Impact" Counterfactual | OBJ_22 | Action to Impact Forecasting | The partner demands proof of future results before implementing recommendations. | 2 | OPC |

### Table 2 - Round-to-objection map

| Level | Round | Primary | Support |
|---|---|---|---|
| 1 | 1 | OBJ_1 | OBJ_2 |
| 1 | 2 | OBJ_3 | OBJ_4, OBJ_5 |
| 1 | 3 | OBJ_6 | OBJ_1 |
| 1 | 4 | OBJ_7 | OBJ_8, OBJ_1, OBJ_5 |
| 1 | 5 | OBJ_9 | OBJ_1, OBJ_5 |
| 1 | 6 | OBJ_2 | OBJ_6 |
| 1 | 7 | OBJ_4 | OBJ_3, OBJ_5 |
| 1 | 8 | OBJ_10 | OBJ_9, OBJ_5 |
| 1 | 9 | OBJ_11 | OBJ_3 |
| 1 | 10 | OBJ_12 | OBJ_6, OBJ_9, OBJ_2, OBJ_5 |
| 2 | 11 | - | OBJ_13, OBJ_14, OBJ_15, OBJ_16 |
| 2 | 12 | - | OBJ_17, OBJ_18 |
| 2 | 13 | - | OBJ_19, OBJ_15, OBJ_20, OBJ_16 |
| 2 | 14 | - | OBJ_19, OBJ_14, OBJ_15, OBJ_20, OBJ_16 |
| 2 | 15 | - | OBJ_13, OBJ_21 |
| 2 | 16 | - | OBJ_16, OBJ_13, OBJ_21 |
| 2 | 17 | - | OBJ_17, OBJ_18 |
| 2 | 18 | - | OBJ_17, OBJ_18 |
| 2 | 19 | - | OBJ_17, OBJ_18 |
| 2 | 20 | - | OBJ_22 |

## 9. Open questions (TBD before v1.0 sign-off)

**9.1 Namespace and learner identifier.** Booking to confirm the xAPI namespace root (placeholder https://booking.com/xapi/rate-right) and the actor account scheme (format of the Booking staff identifier in actor.account.name, including whether it is pseudonymised or hashed).

**9.2 Objection code-to-name reference.** rapid-learn supplies the OBJ_N to display-name list once on build. Booking to confirm it will hold and maintain the code-to-name mapping (for example a DIM_OBJECTION dimension) in Snowflake for Tableau labelling.

**9.3 Capability item-code map under OPC-everywhere.** For Cross-Regional, confirm the OPC-related item codes (L3 range) are the correct codes to attach to every round given OPC is active throughout, rather than a KAM-specific item map.

**9.4 Custom verb sign-off.** Booking to confirm the custom verbs (scored, identified, reset) are acceptable, or map them to preferred reported verbs.

**9.5 Objection catalogue finalisation.** The set of objection codes (OBJ_1 to OBJ_N) and their round mappings is being finalised with the SME. Codes are assigned once the count is locked; statement and table shapes are unaffected, so build is not blocked.

## 8. Design rationale

**8.1 Discrete over consolidated.** Packing multiple measurements into a single xAPI statement is technically valid but forces the ETL to unpack extensions into multiple rows for each statement received. Discrete shape produces one xAPI statement per row of downstream data, which is cleaner for Booking's data team to model and easier to audit end to end. Trade-off: higher statement volume, but Snowflake handles this comfortably at any realistic learner scale.

**8.2 Standard ADL verbs.** Where a standard verb fits the semantic (initialized, passed, failed, completed, answered, interacted), the taxonomy uses it. Custom Booking verbs (scored, identified, reset) are used only where no standard verb captures the intent. This reduces vendor lock-in and keeps statements portable if Booking ever moves the LRS.

**8.3 Booking-owned namespace.** The proposed namespace root sits under booking.com so extension URIs, activity URIs, and custom verb URIs all live inside a namespace Booking governs. The taxonomy can evolve without depending on external namespaces or vendors.

**8.4 Level and item code as first-class tags.** Every statement carries an explicit level. Every scoring statement carries an item code that maps to a capability. This means aggregations from Fact tables into DIM tables can be done in ETL without hard-coded rules embedded in the sim code.

**8.5 Raw plus analytics separation.** The recommended pattern is one raw landing table (append-only, preserves original JSON) plus curated analytics tables built by scheduled SQL tasks. This lets the analytics layer be rebuilt from raw without loss if the schema changes, and preserves an audit trail of every emitted statement.

**8.6 Star and normalized scoring together.** Star counts are the learning unit shown in the sim's own Debrief screen. Normalized 0 to 100 scores are what the client's Fact tables expect. Emitting both on the same statement means no downstream conversion is needed and both consumers get their preferred shape.
