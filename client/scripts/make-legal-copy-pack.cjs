/*
 * Build a LEGAL COPY pack (.docx): all learner-facing WORDING, with the
 * on-screen data / metrics stripped out.
 *
 * This is a copy-only sibling of make-review-pack.cjs. It consumes the same
 * flow JSON (from extract-review-pack.mjs) but renders ONLY the copy legal /
 * compliance needs to read - the conversation, the profile / commercial-goal
 * text, and the persona coaching chips - and OMITS the numeric dossier: the
 * Portfolio-card metrics, Partner Detail driving metrics, eRPD price bucket,
 * secondary metrics, OPC tab, profile-meta, discount-product table, and the
 * room/size count. Numbers that live INSIDE spoken lines are kept (they are
 * copy the learner hears, and legal reviews them); only the dashboard data
 * blocks are removed.
 *
 * Usage:
 *   # 1. extract every flow (standard all regimes + KAM + decoy, R1-20)
 *   PACK_OUT=/tmp/legal.json PACK_JOURNEY=all node scripts/extract-review-pack.mjs
 *   # 2. render copy-only
 *   node scripts/make-legal-copy-pack.cjs /tmp/legal.json \
 *     "../docs/review-packs/Rate Right - Learner-Facing Copy (Legal Review).docx" \
 *     "Learner-facing copy" "Legal / compliance review - wording only, metrics omitted"
 *
 * Requires the `docx` dev dependency (npm i -D docx in client/).
 */
const fs = require('node:fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  BorderStyle, AlignmentType, ShadingType, PageBreak,
} = require('docx');

const [, , inPath, outPath, packTitle, packSubtitle] = process.argv;
if (!inPath || !outPath) {
  throw new Error(
    'usage: node scripts/make-legal-copy-pack.cjs <in.json> <out.docx> <title> <subtitle>',
  );
}

const flows = JSON.parse(fs.readFileSync(inPath, 'utf8'));

// ── Label maps ──
const STYLE_LABEL = {
  red: 'Director (red)', yellow: 'Socialiser (yellow)',
  green: 'Nurturer (green)', blue: 'Thinker (blue)',
};
const JOURNEY_LABEL = { standard: 'Standard', kam: 'Cross-Regional (KAM)', decoy: 'Decoy' };
const COMPLIANCE_LABEL = { safe: 'SAFE', borderline: 'BORDERLINE', risky: 'RISKY' };
const COMPLIANCE_COLOR = { safe: '1B7A43', borderline: 'B7791F', risky: 'B01818' };

// ── Colours ──
const NAVY = '0B2545';
const YELLOW = 'F4B400';
const GREY = '5A6472';

// ── Paragraph helpers ──
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 },
    children: [new TextRun({ text, bold: true, color: NAVY, size: 24 })],
  });
}
function h3(text) {
  return new Paragraph({
    spacing: { before: 180, after: 60 },
    children: [new TextRun({ text, bold: true, color: GREY, size: 20, allCaps: true })],
  });
}
function para(runs, opts = {}) {
  return new Paragraph({
    spacing: { after: 80, ...(opts.spacing || {}) }, ...opts,
    children: Array.isArray(runs) ? runs : [runs],
  });
}
function labelValue(label, value) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, color: NAVY, size: 20 }),
      new TextRun({ text: String(value), size: 20 }),
    ],
  });
}
function quote(text, color = NAVY) {
  return new Paragraph({
    spacing: { after: 100 }, indent: { left: 360 },
    children: [new TextRun({ text: `“${text}”`, italics: true, color, size: 20 })],
  });
}
function divider() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: YELLOW } },
    children: [],
  });
}

// ── Build content ──
const children = [];

// Cover
children.push(new Paragraph({
  spacing: { before: 1200, after: 120 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: 'Rate Right - Learner-Facing Copy', bold: true, color: NAVY, size: 44 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { after: 80 },
  children: [new TextRun({ text: packTitle || 'Legal / compliance review', bold: true, color: NAVY, size: 32 })],
}));
if (packSubtitle) {
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 400 },
    children: [new TextRun({ text: packSubtitle, color: GREY, size: 24 })],
  }));
}
children.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { after: 60 },
  children: [new TextRun({ text: `${flows.length} scenarios`, color: GREY, size: 20 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({
    text: 'Copy only. On-screen metrics and dashboard data (eRPD, RPD, Lose Price, price bucket, secondary and OPC metrics, discount-product status, room counts) are omitted. This pack is the wording a learner reads and hears, for legal / compliance review.',
    italics: true, color: GREY, size: 18,
  })],
}));

// How to read
children.push(new Paragraph({
  spacing: { before: 500, after: 80 },
  children: [new TextRun({ text: 'How to read this pack', bold: true, color: NAVY, size: 24 })],
}));
[
  'Each scenario lists the partner identity and personality copy, the persona coaching chips, and the full branching conversation. The numeric dashboard the learner sees on Partner Detail is deliberately left out - this pack is for reviewing language, not data.',
  'Every conversation step lists all three response options. The option marked [OPTIMAL] is the SME-preferred (correct) pick. Each option shows the exact words the learner would say, the partner’s scripted reply, and the compliance tag (SAFE / BORDERLINE / RISKY).',
  'Numbers that appear inside a spoken line (for example “conversion is down 68%”) are kept - they are part of the wording the learner hears. Only the standalone metric / data displays are removed.',
].forEach((t) => children.push(new Paragraph({
  spacing: { after: 80 }, bullet: { level: 0 },
  children: [new TextRun({ text: t, size: 20 })],
})));

children.push(new Paragraph({ children: [new PageBreak()] }));

let lastJourney = null;
for (const flow of flows) {
  const d = flow.dossier;

  // Journey section divider (only meaningful when the pack spans journeys,
  // e.g. an 'all' dump).
  if (flow.journey !== lastJourney) {
    lastJourney = flow.journey;
    children.push(new Paragraph({
      spacing: { before: 60, after: 120 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({
        text: `${(JOURNEY_LABEL[flow.journey] || flow.journey).toUpperCase()} JOURNEY`,
        bold: true, color: YELLOW, size: 26,
      })],
    }));
  }

  const decoyTag = flow.journey === 'decoy' ? ' (decoy)' : '';

  // Round header
  children.push(new Paragraph({
    spacing: { before: 120, after: 60 }, shading: { type: ShadingType.CLEAR, fill: NAVY },
    children: [new TextRun({
      text: `  ROUND ${flow.round}  -  ${d.displayName}${decoyTag}  -  ${d.regimeLabel}  `,
      bold: true, color: 'FFFFFF', size: 30,
    })],
  }));
  children.push(divider());

  // 1. Who the partner is (identity + personality copy - no data)
  children.push(h2('Partner (identity and personality)'));
  children.push(labelValue('Property', d.displayName));
  children.push(labelValue('Point of contact', d.contact));
  children.push(labelValue('Property type', d.propertyType));
  children.push(labelValue('Location', d.location));
  children.push(labelValue(
    'Communication style',
    `${STYLE_LABEL[d.style] || d.style} primary, ${STYLE_LABEL[d.styleSecondary] || d.styleSecondary} secondary`,
  ));
  children.push(labelValue('Parity regime', d.regimeLabel));
  children.push(h3('Profile'));
  children.push(para(new TextRun({ text: d.description, size: 20 })));
  children.push(h3('Commercial goal'));
  children.push(para(new TextRun({ text: d.commercialGoal, size: 20 })));

  // 2. Persona coaching lenses (learner-facing chip copy)
  if (d.personaHints && d.personaHints.length) {
    children.push(h2('Persona coaching lenses'));
    children.push(para(new TextRun({
      text: 'One chip shown on Partner Detail depending on the learner’s chosen super power. Informational only - does not change grading.',
      italics: true, color: GREY, size: 18,
    })));
    for (const hint of d.personaHints) {
      children.push(new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: `${hint.label}: `, bold: true, color: NAVY, size: 20 }),
          new TextRun({ text: hint.oneLiner, size: 20 }),
        ],
      }));
    }
  }

  // 3. Conversation
  children.push(h2('Conversation'));
  if (flow.openingAm) {
    children.push(h3('Opening line (learner / AM)'));
    children.push(quote(flow.openingAm, NAVY));
  }
  flow.steps.forEach((step, si) => {
    children.push(new Paragraph({
      spacing: { before: 200, after: 60 },
      children: [new TextRun({ text: step.displayLabel || `Step ${si + 1}`, bold: true, color: YELLOW, size: 22 })],
    }));
    children.push(new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: `${d.contact} says:`, bold: true, color: GREY, size: 19 })],
    }));
    children.push(quote(step.partnerPrompt, NAVY));

    step.options.forEach((opt, oi) => {
      const tag = opt.optimal ? '  [OPTIMAL]' : '';
      children.push(new Paragraph({
        spacing: { before: 120, after: 30 },
        children: [
          new TextRun({ text: `Option ${String.fromCharCode(65 + oi)}`, bold: true, color: NAVY, size: 20 }),
          new TextRun({ text: tag, bold: true, color: '1B7A43', size: 20 }),
          new TextRun({ text: `   [${COMPLIANCE_LABEL[opt.compliance]}]`, bold: true, color: COMPLIANCE_COLOR[opt.compliance], size: 18 }),
        ],
      }));
      children.push(new Paragraph({
        spacing: { after: 20 }, indent: { left: 360 },
        children: [new TextRun({ text: 'Learner says:', bold: true, color: GREY, size: 18 })],
      }));
      children.push(quote(opt.playerDialogue, '333333'));
      children.push(new Paragraph({
        spacing: { after: 20 }, indent: { left: 360 },
        children: [new TextRun({ text: `${d.contact} responds:`, bold: true, color: GREY, size: 18 })],
      }));
      children.push(quote(opt.partnerResponse, NAVY));
    });
  });

  if (flow.closingAmLine) {
    children.push(h3('Closing line (learner / AM) - optimal path only'));
    children.push(quote(flow.closingAmLine, NAVY));
  }

  children.push(new Paragraph({ children: [new PageBreak()] }));
}

const doc = new Document({
  creator: 'Rate Right',
  title: packTitle || 'Learner-Facing Copy (Legal Review)',
  styles: { default: { document: { run: { font: 'Calibri' } } } },
  sections: [{
    properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log(`Wrote ${outPath} (${(buf.length / 1024).toFixed(0)} KB, ${flows.length} scenarios)`);
});
