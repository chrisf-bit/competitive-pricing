# Rate Right - xAPI statement smoke test

A minimal **Tin Can / xAPI** package. On launch it reads the LRS launch
parameters the LMS supplies (`endpoint`, `auth`, `actor`, `registration`),
POSTs five representative statements, and confirms each is accepted. Its
job is to answer two questions the SCORM smoke test could not:

1. **Do statements reach the LRS at all** from a package launched inside
   the LMS (endpoint reachable, auth valid, CORS allowed)?
2. **Does a replay append rather than overwrite?** This is the whole point
   of moving behavioural data to xAPI - unlike SCORM, each statement is
   immutable and additive, so re-playing the course adds new rows instead
   of replacing the last attempt.

## What it posts

Five statements, using the planned Rate Right taxonomy (object ids under
the `https://booking.com/xapi/rate-right` namespace; `level`, `item-code`,
`round`, `objection-type`, `capability-code` and `normalized-score` as
`context.extensions`; stars in `result.score.raw` 0-3, percentage in the
extension):

| # | verb | object | carries |
|---|---|---|---|
| 1 | initialized | course | level L0 |
| 2 | passed | clearance | score 86/100, item-code L0.3 |
| 3 | answered | l1/r3/partner-selection | stars 3/3, item-code L1.4, round 3 |
| 4 | answered | l2/r15/objection | stars 2/3, **objection-type OBJ_14**, capability objection-handling |
| 5 | completed | course | score.scaled 0.85 |

The `OBJ_14` code (not a display name) rides in
`context.extensions[".../objection-type"]`, matching the
`FACT_OBJECTION_PERFORMANCE.objection_type` decision from the schema doc.

## How to run it

### Option A - launched from the LMS (the real test)

1. Zip the **contents** of this folder so `tincan.xml` sits at the zip root
   (not inside a subfolder). A ready-made `xapi-smoke-test.zip` is at the
   repo root.
2. Upload the zip as a **Tin Can / xAPI** package (Docebo: "Training
   material" of type Tin Can; SCORM Cloud: any course upload auto-detects
   `tincan.xml`).
3. Launch it as a test learner. It auto-detects the launch params and shows
   the panel. Click **Send statements**. Every line should read `-> 200`
   and the LRS should echo statement ids. The banner should read **PASS**.

### Option B - opened directly (quick check, no packaging)

Open `index.html` in a browser. With no launch params it shows a manual
panel - paste an LRS **endpoint** (must end with `/`) and a **Basic auth**
header, then Send. Handy for pointing at a SCORM Cloud LRS activity
provider (Apps > LRS gives you an endpoint + key/secret; the auth header is
`Basic <base64(key:secret)>`).

## Confirming append-not-overwrite (the key result)

1. Click **Send statements** (run #1), then **Count statements in LRS** -
   note the count for this registration.
2. Click **Send statements** again (run #2) - it posts five *new*
   statements with fresh UUIDs under the same registration.
3. Click **Count** again. The total should have grown by five, not stayed
   flat. That is the durable per-attempt history SCORM 1.2 / Docebo SCORM
   tracking cannot give us.

Then confirm the same in the LMS/LRS reporting UI: the statements appear
with their ids, verbs, scores and extensions intact, and a replay adds to
them rather than replacing the previous run.

## LRS version note

Docebo's sandbox LRS only supports xAPI **0.9 - 1.0.2**, so the harness
sends `X-Experience-API-Version: 1.0.2` (a `1.0.3` header is rejected with
HTTP 400 before the statements are even read). SCORM Cloud and newer LRSs
accept 1.0.2 too, so it is the safe common denominator. Docebo also passes
the launch `actor` with `mbox`/`name` as arrays; the harness collapses those
to single values so the Agent is conformant.

## The one thing that can trip it

**CORS.** The browser posts cross-origin to the LRS. A conformant LRS
(SCORM Cloud, Docebo's LRS, Learning Locker) answers the preflight and
allows it. If you see a "Network / CORS error" in the log, the endpoint is
wrong, the LRS blocks the origin, or you're posting to a SCORM (not xAPI)
endpoint. This mirrors the real constraint the in-app `sendStatement()`
helper will hit - so proving it here de-risks the app wiring.
