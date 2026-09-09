# Rate Right - xAPI Full Data Preview

A companion to the `xapi-smoke-test` package. Where the smoke test proved
that a handful of statements reach the LRS and that replay appends, this
package answers a different question for Booking's tech and data teams:

> **What is the full set of data one learner produces, and what do the
> Snowflake tables look like once it lands?**

It generates a complete, worked-example playthrough of a single learner (a
standard 20-round journey: clearance, Level 1 rounds 1-10, Level 2 rounds
11-20) as xAPI - roughly **240 statements** covering **every statement type**
in the Data Pipeline Schema taxonomy - then renders the exact **Snowflake
rows** each statement produces, using the field-to-column mapping from
schema section 6.

Everything is dummy data for one fictional learner (`BK-1234`). No real
learner data is involved.

## What it shows

Open `index.html` (or launch it from an LMS) and you get three tabs:

1. **Snowflake tables** - every analytics table from the schema, populated
   with the rows this playthrough generates:
   - `FACT_GAME_EVENTS` (lifecycle, milestones, objection-presented, resets)
   - `FACT_DECISION_SCORES` (every scored decision: clearance items, partner
     selection, Diagnostic Flow, hook/diagnosis/pitch, objection responses,
     round rollups)
   - `FACT_OBJECTION_PERFORMANCE` (one row per objection response; several
     per Level 2 round, as designed)
   - `FACT_CLEARANCE` (one row per Level 0 attempt - the example fails
     attempt 1, passes attempt 2)
   - `DIM_CAPABILITY_SCORES` (one row per playthrough, all ten capability
     columns plus the composite)
   - `DIM_COACHING_FOCUS` (primary/secondary focus + misconception flags)
   - `RAW_STATEMENTS` (the append-only landing zone)

   Each table shows its row count and a **Download CSV** button (the CSV
   holds the full set even where the on-screen table is truncated to the
   first 60 rows).

2. **Raw statements** - the complete xAPI JSON for all ~240 statements, as
   they would POST to the LRS. **Download statements (JSON)** saves the lot.

3. **POST log** - results if you send the batch to a live LRS.

The header shows a live count of statements and of rows per table, so the
data team can eyeball the volume one learner represents.

## The mapping is the point

The table rows are not hand-authored. The page derives them from the
generated statements exactly as Booking's ETL would - classifying each
statement by its verb and object-id shape, then pulling columns from
`actor.account.name`, `context.registration`, `context.extensions.*`,
`result.score.*` and `result.extensions.*` per schema section 6. So what
you see is a faithful preview of the raw-to-curated transform, not a mock-up.

## How to run it

### Option A - opened directly (no LMS needed)

Open `index.html` in a browser. It generates the playthrough immediately and
fills the tables. Change the learner id or regime and click **Regenerate**.
No LRS is required to see the full structure - the POST controls are optional.

### Option B - launched from the LMS, posting to the LRS

1. Zip the **contents** of this folder so `tincan.xml` sits at the zip root.
   A ready-made `xapi-full-data-preview.zip` is at the repo root.
2. Upload as a **Tin Can / xAPI** package (Docebo: "Training material" of
   type Tin Can; SCORM Cloud: auto-detects `tincan.xml`).
3. Launch as a test learner. Click **POST all statements to LRS** - it sends
   the ~240 statements in batches of 25, then automatically sends one final
   **completion statement** against the LMS-launched activity so the lesson
   marks **Completed**. Then **Count statements in LRS** to confirm the total,
   and inspect them in the LMS/LRS reporting UI.

### Marking the lesson complete (Docebo / any Tin Can LMS)

A Tin Can LMS only flips its lesson status to Completed when it receives a
`completed` statement whose **object id is the activity_id the LMS launched**,
under the **registration the LMS passed in**. The ~240 schema statements do
neither by design - they use custom Rate Right activity ids to demonstrate the
Snowflake structure. So on **POST all statements to LRS** the page now also
reads the launched `registration` + `activity_id` from the launch URL and
sends one extra `completed` statement against that activity (as its own
request, so it lands even if the schema batches are rejected). That is what
marks the lesson complete. Closing the player with the **X** never changes
status - by design.

**Known Docebo finding:** Docebo's built-in LRS rejects statements whose
activity id it did not launch, returning `400 Invalid activity` - so most of
the schema statements do not land in Docebo's own LRS (they land fine in a
general-purpose LRS such as SCORM Cloud). The completion statement is accepted
because it targets Docebo's own launch activity. How much of the full schema
Docebo's LRS will accept is an open question for Booking's data team (it may
require registering the activity ids, moving detail into extensions, or
pointing emission at a dedicated LRS).

You can also paste an LRS **endpoint** (ending in `/`) and **Basic auth**
header into the fields when opened directly, to point it at a SCORM Cloud or
Docebo LRS activity provider.

## Notes for the data team

- **Namespaces** follow the schema doc: object ids under
  `https://booking.com/xapi/rate-right`, extension keys under
  `https://booking.com/xapi/extensions`, custom verbs under
  `https://booking.com/xapi/verbs`. All are placeholders pending Booking
  sign-off (open question 8.1).
- **Actor** is the account form (`account.homePage` + `account.name`) from
  the schema. When launched from an LMS the launched actor is used instead
  (Docebo passes `mbox`/`name` as arrays; the page normalises those).
- **Scoring** is emitted twice per the schema: stars in `result.score.raw`
  (0-3) and percentage in `context.extensions.normalized-score`.
- **Objection codes** are the stable `OBJ_N` codes, never display names
  (schema 2.9). Level 2 rounds emit several.
- **Custom verbs** (`scored`, `identified`, `reset`) are the ones flagged for
  Booking sign-off in open question 8.4.
- xAPI version header is `1.0.2` (Docebo's sandbox LRS caps there).

This package is a **reviewer/preview tool only** - like `xapi-smoke-test`, it
is not part of the SCORM deliverable and is not built into the sim bundle.
