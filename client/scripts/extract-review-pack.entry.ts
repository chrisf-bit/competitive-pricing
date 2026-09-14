import { writeFileSync } from 'node:fs';
import { buildFlows } from '../src/review/reviewData';

/**
 * Step 1 of the review-pack pipeline: run the review tool's own buildFlows()
 * and write the requested slice as JSON for make-review-pack.cjs to render.
 *
 * Env vars:
 *   PACK_OUT     (required) output JSON path
 *   PACK_JOURNEY standard | decoy | kam   (default: standard)
 *   PACK_REGIME  wide | narrow | none      (only used for journey=standard)
 *   PACK_FROM    first round               (default: 1)
 *   PACK_TO      last round                (default: 5)
 *
 * Notes:
 *   - standard: one priority flow per (round, regime). Metrics are identical
 *     across a partner's three regime variants; only the dialogue framing
 *     differs, so pick the regime you want to review.
 *   - kam: the Cross-Regional priority flow per round (regime is mixed, so
 *     PACK_REGIME is ignored).
 *   - decoy: the deduped healthy decoy calls in the round range (any card a
 *     learner can open but that isn't the priority). regimes is empty on
 *     decoys, so PACK_REGIME is ignored.
 */

const OUT = process.env.PACK_OUT;
if (!OUT) throw new Error('PACK_OUT env var required');

const JOURNEY = (process.env.PACK_JOURNEY ?? 'standard') as
  | 'standard'
  | 'decoy'
  | 'kam'
  | 'all';
const REGIME = process.env.PACK_REGIME ?? 'wide';
const FROM = Number(process.env.PACK_FROM ?? '1');
// 'all' spans the whole journey by default (rounds 1-20); slices default to 1-5.
const TO = Number(process.env.PACK_TO ?? (JOURNEY === 'all' ? '20' : '5'));

let flows = buildFlows();
if (JOURNEY === 'all') {
  // Every flow the tool produces - standard (all three regimes), KAM and
  // decoy - across the round range. Used for the legal copy pack, which
  // wants the full learner-facing wording in one document.
  flows = flows.filter((f) => f.round >= FROM && f.round <= TO);
} else {
  flows = flows.filter(
    (f) => f.journey === JOURNEY && f.round >= FROM && f.round <= TO,
  );
  // Standard journey has one flow per regime; narrow to the requested one.
  // decoy / kam carry no single regime, so no regime filter is applied.
  if (JOURNEY === 'standard') {
    flows = flows.filter((f) => f.regimes.includes(REGIME));
  }
}

// Group by journey, then by round, so an 'all' dump reads standard -> then
// the others in a stable order.
const journeyOrder: Record<string, number> = { standard: 0, kam: 1, decoy: 2 };
flows.sort(
  (a, b) =>
    (journeyOrder[a.journey] ?? 9) - (journeyOrder[b.journey] ?? 9) ||
    a.round - b.round,
);

writeFileSync(OUT, JSON.stringify(flows, null, 2), 'utf8');
console.log(`Wrote ${flows.length} flows (${JOURNEY}) to ${OUT}`);
for (const f of flows) {
  const tag = JOURNEY === 'standard' ? `[${f.regimes.join('/')}]` : `[${f.journeyLabel}]`;
  console.log(
    `  R${f.round} ${f.dossier.displayName} ${tag} - ${f.steps.length} steps`,
  );
}
