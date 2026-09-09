import { writeFileSync } from 'node:fs';
import { buildFlows } from '../src/review/reviewData';

// Emit the per-pack hand-edit list of Safe distractors to retag Borderline.
// The CHANGE set below is the combative/condescending + false-concession
// options (the reviewer convention). Pure fluff / route-error near-misses
// stay Safe. Located by spoken-line snippet because the docs hide titles.

const CHANGE_IDS = new Set<string>([
  // Pack 1 - Wide R1-5
  'rc-r1-wide-step3-dismiss', 'sh-r2-wide-step4-lecture', 'ov-r3-wide-step2-concede',
  'ov-r3-wide-step2-lecture', 'ep-r5-wide-step2-concede', 'ep-r5-wide-step2-lecture',
  // Pack 2 - Narrow R1-5
  'rc-r1-narrow-step3-dismiss', 'sh-r2-narrow-step4-blame-ops', 'ov-r3-narrow-step2-concede',
  'ov-r3-narrow-step2-lecture', 'ep-r5-narrow-step2-concede',
  // Pack 3 - No Parity R1-5
  'rc-r1-none-step3-dismiss', 'sh-r2-none-step4-dismiss', 'ov-r3-none-step2-concede',
  'ov-r3-none-step2-lecture', 'ep-r5-none-step3-concede',
  // Pack 4 - No Parity R6-10
  'ob-r6-none-step2-dismiss-loyalty', 'ob-r6-none-step4-guilt', 'pg-r7-none-step2-concede',
  'hv-r8-none-step1-accuse', 'hv-r8-none-step2-concede', 'hv-r8-none-step4-dismiss-brand',
  'hv-r8-none-step5-blame-reviews', 'hv-r8-none-step6-guilt', 'll-r9-none-step2-blame',
  'll-r9-none-step4-dismiss', 'll-r9-none-step5-concede-po', 'll-r9-none-step6-guilt',
  'nf-r10-none-step1-accuse', 'nf-r10-none-step2-concede', 'nf-r10-none-step2-dismiss',
  'nf-r10-none-step3-concede', 'nf-r10-none-step4-dismiss', 'nf-r10-none-step5-blame',
  'nf-r10-none-step6-dismiss-risk',
  // Pack 5 - Narrow R6-10
  'ob-r6-narrow-step2-concede', 'ob-r6-narrow-step2-lecture', 'ob-r6-narrow-step4-guilt',
  'pg-r7-narrow-step1-validate-war', 'pg-r7-narrow-step4-presume', 'hv-r8-narrow-step1-accuse',
  'hv-r8-narrow-step2-concede', 'hv-r8-narrow-step4-dismiss-brand', 'hv-r8-narrow-step5-blame-reviews',
  'hv-r8-narrow-step6-guilt', 'll-r9-narrow-step3-assert', 'll-r9-narrow-step5-concede-po',
  'll-r9-narrow-step6-guilt', 'nf-r10-narrow-step2-concede', 'nf-r10-narrow-step2-dismiss',
  'nf-r10-narrow-step4-dismiss-family', 'nf-r10-narrow-step5-blame', 'nf-r10-narrow-step6-dismiss-risk',
  // Pack 6 - Wide R6-10
  'ob-r6-wide-step2-concede', 'ob-r6-wide-step2-lecture', 'ob-r6-wide-step4-guilt',
  'pg-r7-wide-step4-blame', 'hv-r8-wide-step1-accuse', 'hv-r8-wide-step2-member-rate',
  'hv-r8-wide-step4-dismiss-brand', 'hv-r8-wide-step5-blame-reviews', 'hv-r8-wide-step6-guilt',
  'll-r9-wide-step2-blame', 'll-r9-wide-step3-defensive', 'll-r9-wide-step6-guilt',
  'nf-r10-wide-step1-accuse', 'nf-r10-wide-step2-concede', 'nf-r10-wide-step2-dismiss',
  'nf-r10-wide-step5-blame-family', 'nf-r10-wide-step6-guilt',
  // Pack 7 - OPC L2 R11-15
  'rc-r11-step2-concede-soft', 'rc-r11-step3-dismiss-premium', 'sh-r12-step4-concede',
  'ov-r13-step2-accept-cheaper', 'ov-r13-step2-doubt-her-team', 'rv-r14-step2-concede-unique',
  'rv-r14-step2-insist-data', 'rv-r14-step4-shame', 'ep-r15-step3-concede-value',
  // Pack 8 - OPC L2 R16-20
  'of-r16-step2-accept-website', 'of-r16-step3-dismiss-marketing', 'pg-r17-step1-pile-on',
  'pg-r17-step2-agree-demand', 'pg-r17-step4-blame-him', 'hv-r18-step4-dismiss-concern',
  'll-r19-step2-blame-leak', 'll-r19-step6-dismiss-worry',
]);

const PACKS = [
  { name: 'Review Pack 1 - Wide Parity - Rounds 1-5', regime: 'wide', from: 1, to: 5 },
  { name: 'Review Pack 2 - Narrow Parity - Rounds 1-5', regime: 'narrow', from: 1, to: 5 },
  { name: 'Review Pack 3 - No Parity - Rounds 1-5', regime: 'none', from: 1, to: 5 },
  { name: 'Review Pack 4 - No Parity - Rounds 6-10', regime: 'none', from: 6, to: 10 },
  { name: 'Review Pack 5 - Narrow Parity - Rounds 6-10', regime: 'narrow', from: 6, to: 10 },
  { name: 'Review Pack 6 - Wide Parity - Rounds 6-10', regime: 'wide', from: 6, to: 10 },
  { name: 'Review Pack 7 - OPC (Level 2) - Rounds 11-15', regime: 'wide', from: 11, to: 15 },
  { name: 'Review Pack 8 - OPC (Level 2) - Rounds 16-20', regime: 'wide', from: 16, to: 20 },
];

const all = buildFlows();
const seen = new Set<string>();
let out = `# Review pack compliance-tag fixes\n\nChange each option below from **SAFE** to **BORDERLINE** in the Google Doc for that pack. Locate the option by its round, step, and the opening words of the spoken line (option titles are hidden in the packs, so match on the quoted line). Only the options listed here change - every other SAFE tag stays as is.\n\n`;
let total = 0;

for (const pk of PACKS) {
  const flows = all
    .filter((f) => f.journey === 'standard' && f.round >= pk.from && f.round <= pk.to)
    .filter((f) => f.regimes.includes(pk.regime))
    .sort((a, b) => a.round - b.round);

  const rows: string[] = [];
  for (const f of flows) {
    for (let si = 0; si < f.steps.length; si++) {
      for (const o of f.steps[si].options) {
        if (!CHANGE_IDS.has(o.id)) continue;
        seen.add(o.id);
        const words = o.playerDialogue.split(/\s+/).slice(0, 20).join(' ');
        rows.push(`- **R${f.round}, Step ${si + 1}** - SAFE -> BORDERLINE\n  > "${words}..."`);
        total++;
      }
    }
  }
  out += `## ${pk.name} (${rows.length})\n\n${rows.join('\n')}\n\n`;
}

const missing = [...CHANGE_IDS].filter((id) => !seen.has(id));
out += `---\n\nTotal changes: ${total}\n`;
if (missing.length) out += `\nWARNING - ids not found (typo?): ${missing.join(', ')}\n`;

writeFileSync('../docs/review-pack-compliance-tag-fixes.md', out, 'utf8');
console.log(`Wrote ${total} changes. Missing ids: ${missing.length ? missing.join(', ') : 'none'}`);
