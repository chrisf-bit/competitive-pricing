# Rate Right - SCORM interaction smoke test

A minimal **SCORM 2004 3rd Edition** package with a single SCO. It writes
completion, success, a score, and four representative `cmi.interactions`,
then commits. Its only job is to prove whether Docebo captures and surfaces
interaction-level data before we commit to the real build.

## What it writes

| # | interaction id | type | learner_response | result |
|---|---|---|---|---|
| 0 | `l1.r3.partner-selection` | choice | `royal-crest` | correct |
| 1 | `l1.r3.diagnosis` | choice | `brandcom-gap` | correct |
| 2 | `l2.r15.obj.OBJ_14` | choice | `acknowledge-and-reframe` | correct |
| 3 | `cap.objection-handling` | other | `79` | neutral |

The interaction ids deliberately use the planned encoding grammar
(`level.round.phase`, `...obj.OBJ_N`, `cap.<capability>`) so the test also
confirms the id survives intact into the report and the API.

Headline values written: `completion_status = completed`,
`success_status = passed`, `score.scaled = 0.82` (raw 82 / 0-100).

## How to run the test

1. Zip the **contents** of this folder so `imsmanifest.xml` sits at the zip
   root (not inside a subfolder). A ready-made `scorm-smoke-test.zip` is
   produced at the repo root by the build step.
2. In `bookingsandbox.docebosaas.com`, create a course and upload the zip
   as SCORM training material.
3. Play it as a test learner. The SCO auto-runs and shows a live log - every
   line should read `-> true`, and the banner should read **PASS**. If the
   banner is red, the SCORM API rejected something (details in the red lines).

## What to check in Docebo (the three readout paths)

1. **Attempt details** - open the SCORM training material as an admin, select
   the learner, and confirm the four questions, answers and correct/incorrect
   results appear.
2. **Answers breakdown** - in Training material statistics, confirm the
   Answers export lists the interactions, and export it.
3. **Interaction API** - call `GET /learn/v1/lo/scorminteraction/{scorm_id}/list`
   and confirm the four interactions come back with ids intact.

Also enable Docebo's **SCORM debugging** option during playback to confirm the
package actually calls the interaction fields and commits.

## The one known limitation to verify

Replay the completed material as the same learner and re-check the report.
Docebo's documented behaviour is that SCORM tracking is **overwritten** on
replay, so expect the previous attempt's interactions to be replaced, not
kept. This confirms there is no durable per-attempt history.
