# Reviewer review packs (.docx)

Generates human-readable Word docs of every learner-facing screen (copy +
on-screen data) plus the full conversation for a slice of scenarios, for
SME/legal review. Output docs live in `docs/review-packs/`.

Two steps: **extract** (run the review tool's `buildFlows()` and dump the
requested slice to JSON) then **render** (JSON -> .docx). Sourcing from
`buildFlows()` (`src/review/reviewData.ts`) means the packs track the live
data, not a hand-copy.

## Prereqs

`docx` is a dev dependency (`npm i` in `client/` installs it). The
extractor bundles with esbuild (already a Vite dep) - no extra install.

## Usage

Run from `client/`. Two env-configured commands:

```bash
# 1. extract a slice to JSON
PACK_OUT=/tmp/pack.json PACK_JOURNEY=standard PACK_REGIME=wide \
  PACK_FROM=1 PACK_TO=5 node scripts/extract-review-pack.mjs

# 2. render the JSON to a .docx
node scripts/make-review-pack.cjs /tmp/pack.json \
  "../docs/review-packs/My Pack.docx" "Pack title" "Pack subtitle"
```

### Extract env vars

| var          | values                        | default   |
|--------------|-------------------------------|-----------|
| `PACK_OUT`   | output JSON path (required)   | -         |
| `PACK_JOURNEY`| `standard` \| `decoy` \| `kam`| `standard`|
| `PACK_REGIME`| `wide` \| `narrow` \| `none`  | `wide`    |
| `PACK_FROM`  | first round                   | `1`       |
| `PACK_TO`    | last round                    | `5`       |

- `standard`: one priority flow per (round, regime). Metrics are identical
  across a partner's three regime variants; only the dialogue framing
  differs, so pick the regime you want. Rounds 1-10 = Level 1; 11-20 =
  Level 2 (OPC, regime-neutral, so the three regimes collapse to one flow).
- `kam`: the Cross-Regional priority flow per round (`PACK_REGIME` ignored).
- `decoy`: the deduped healthy decoy calls in the round range - any card a
  learner can open that isn't the priority (`PACK_REGIME` ignored).

## The 8 Level-1/2 packs that shipped 2026-09-06

Wide/Narrow/No-Parity x (R1-5, R6-10) = 6 packs (all of Level 1), plus OPC
Level 2 R11-15 and R16-20 = 8 total. See `docs/review-packs/`.

## Legal copy pack (copy only, no data/metrics)

A copy-only sibling for legal / compliance review: same conversation
coverage as the review packs, but with every on-screen metric / data block
removed (Portfolio-card metrics, Partner Detail driving metrics, eRPD price
bucket, secondary + OPC metrics, discount-product status, room counts). It
keeps the wording a learner reads/hears - the conversation, the profile and
commercial-goal text, and the persona chips - plus the compliance tags.
Numbers that sit INSIDE a spoken line (e.g. "conversion is down 68%") are
kept; only the standalone data displays are stripped.

Two steps, same extract + a different renderer:

```bash
# 1. extract EVERY flow in one pass (standard all regimes + KAM + decoy, R1-20)
PACK_OUT=/tmp/legal.json PACK_JOURNEY=all node scripts/extract-review-pack.mjs

# 2. render copy-only
node scripts/make-legal-copy-pack.cjs /tmp/legal.json \
  "../docs/review-packs/Rate Right - Learner-Facing Copy (Legal Review).docx" \
  "Learner-facing copy" "Legal / compliance review - wording only, metrics omitted"
```

`PACK_JOURNEY=all` (added for this) dumps the whole set (defaults to rounds
1-20); it also works with the normal `make-review-pack.cjs` if you ever want
one big data-inclusive pack. You can still slice (`PACK_JOURNEY=standard
PACK_REGIME=narrow PACK_FROM=6 PACK_TO=10`) and feed that JSON to the legal
renderer for a copy-only slice. Latest full copy pack lives in
`docs/review-packs/`.

## Fidelity rules baked into the renderer

These mirror what the learner actually sees on screen - do not "restore"
them:
- The eRPD Price Bucket **number** is not shown (removed from the strip
  callout); only the eRPD % marker renders.
- Conversation **option move-titles** and **step titles** are hidden from
  learners, so they are not rendered - options show as A/B/C + the spoken
  line + [OPTIMAL] + compliance tag.
