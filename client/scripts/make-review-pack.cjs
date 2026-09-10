/*
 * Build a human-readable Word (.docx) reviewer pack from extracted flow JSON.
 *
 * This is step 2 of the review-pack pipeline. Step 1 is
 * `extract-review-pack.mjs`, which runs the review tool's own buildFlows()
 * and writes a JSON array of flows. This script turns that JSON into a .docx.
 *
 * Usage:
 *   node scripts/make-review-pack.cjs <in.json> <out.docx> "<title>" "<subtitle>"
 *
 * Handles priority (standard), KAM and decoy flows - it adapts the wording
 * when every flow in the JSON is a decoy scenario.
 *
 * Requires the `docx` dev dependency (npm i -D docx in client/).
 */
const fs = require('node:fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, ShadingType, PageBreak,
} = require('docx');

const [, , inPath, outPath, packTitle, packSubtitle] = process.argv;
if (!inPath || !outPath) throw new Error('usage: node scripts/make-review-pack.cjs <in.json> <out.docx> <title> <subtitle>');

const flows = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const isDecoy = flows.length > 0 && flows.every((f) => f.journey === 'decoy');
const partnerWord = isDecoy ? 'decoy partner' : 'priority partner';

// ── Label maps (mirror the learner-facing UI) ──
const STYLE_LABEL = { red: 'Director (red)', yellow: 'Socialiser (yellow)', green: 'Nurturer (green)', blue: 'Thinker (blue)' };
const METRIC_LABEL = {
  last30dAbrn: 'Last 30D ABRN (vs last year)',
  last30dRoomNights: 'Last 30D Room Nights (vs peer)',
  last30dAdr: 'Last 30D ADR (vs peer)',
  last90dPageViews: 'Last 30D Page Views (vs peer)',
  last90dConversion: 'Last 30D Conversion (vs peer)',
  next3mRoomNights: 'Next 3M Room Nights (vs peer)',
};
const OPC_LABEL = {
  unsoldRooms: 'Unsold Rooms (vs peer)',
  sellThroughRate: 'Sell Through Rate (vs peer)',
  visibilityShare: 'Visibility Share (vs peer)',
  clickThroughRate: 'Click Through Rate (vs peer)',
  conversion: 'Conversion (vs peer)',
  searchPrice: 'Search Price (vs peer)',
};
const DISCOUNT_CATEGORY = {
  'public-pricing': 'Public Pricing',
  'genius-pricing': 'Genius Pricing',
  'foundations-payments': 'Foundations & Payments',
};
const COMPLIANCE_LABEL = { safe: 'SAFE', borderline: 'BORDERLINE', risky: 'RISKY' };
const COMPLIANCE_COLOR = { safe: '1B7A43', borderline: 'B7791F', risky: 'B01818' };

// ── Colours / styling ──
const NAVY = '0B2545';
const YELLOW = 'F4B400';
const GREY = '5A6472';
const LIGHT = 'EEF2F7';

const friendlyMetric = (label) => METRIC_LABEL[label] || label;

// ── Paragraph helpers ──
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 },
    children: [new TextRun({ text, bold: true, color: NAVY, size: 24 })] });
}
function h3(text) {
  return new Paragraph({ spacing: { before: 180, after: 60 },
    children: [new TextRun({ text, bold: true, color: GREY, size: 20, allCaps: true })] });
}
function para(runs, opts = {}) {
  return new Paragraph({ spacing: { after: 80, ...(opts.spacing || {}) }, ...opts,
    children: Array.isArray(runs) ? runs : [runs] });
}
function labelValue(label, value) {
  return new Paragraph({ spacing: { after: 40 }, children: [
    new TextRun({ text: `${label}: `, bold: true, color: NAVY, size: 20 }),
    new TextRun({ text: String(value), size: 20 }),
  ]});
}
function quote(text, color = NAVY) {
  return new Paragraph({ spacing: { after: 100 }, indent: { left: 360 }, children: [
    new TextRun({ text: `“${text}”`, italics: true, color, size: 20 }),
  ]});
}

// ── Metric table ──
function metricTable(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: allBorders('D5DCE5'),
    rows: rows.map(([label, value], i) => new TableRow({ children: [
      cell(label, { bold: true, width: 45, shade: i % 2 ? undefined : LIGHT }),
      cell(value, { width: 55, shade: i % 2 ? undefined : LIGHT }),
    ]})),
  });
}
function cell(text, opts = {}) {
  return new TableCell({
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    shading: opts.shade ? { type: ShadingType.CLEAR, fill: opts.shade } : undefined,
    margins: { top: 40, bottom: 40, left: 90, right: 90 },
    children: [new Paragraph({ children: [new TextRun({ text: String(text), bold: !!opts.bold, size: 20, color: opts.color || '000000' })] })],
  });
}
function allBorders(color) {
  const b = { style: BorderStyle.SINGLE, size: 2, color };
  return { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b };
}
function divider() {
  return new Paragraph({ spacing: { before: 120, after: 120 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: YELLOW } }, children: [] });
}

// ── Build content ──
const children = [];

// Cover
children.push(new Paragraph({ spacing: { before: 1200, after: 120 }, alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: 'Rate Right - Conversation Review Pack', bold: true, color: NAVY, size: 44 })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
  children: [new TextRun({ text: packTitle || 'Review Pack', bold: true, color: NAVY, size: 32 })] }));
if (packSubtitle) children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
  children: [new TextRun({ text: packSubtitle, color: GREY, size: 24 })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
  children: [new TextRun({ text: `${flows.length} scenarios - ${partnerWord} per scenario`, color: GREY, size: 20 })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: `Contains every learner-facing screen (copy + on-screen data) and the full ${partnerWord} conversation for each scenario.`, italics: true, color: GREY, size: 18 })] }));

// How to read
children.push(new Paragraph({ spacing: { before: 500, after: 80 }, children: [new TextRun({ text: 'How to read this pack', bold: true, color: NAVY, size: 24 })] }));
[
  `Each scenario shows the ${partnerWord} exactly as the learner encounters them: the Portfolio card, the Partner Detail screen (all visible metrics and data), the four persona coaching lenses, the prescribed Pricing Diagnostic to Pitch Flow, and the full branching conversation.`,
  'Every conversation step lists all three response options. The option marked [OPTIMAL] is the SME-preferred (correct) pick. Each option shows the exact words the learner would say, the partner’s scripted reply, and the compliance tag (SAFE / BORDERLINE / RISKY) that drives grading.',
  'Metric values are shown as they render on screen. eRPD shows the percentage and the month-on-month change in brackets. Secondary and comparator metrics show the value with the vs-peer / vs-last-year delta in brackets.',
].forEach((t) => children.push(new Paragraph({ spacing: { after: 80 }, bullet: { level: 0 }, children: [new TextRun({ text: t, size: 20 })] })));

children.push(new Paragraph({ children: [new PageBreak()] }));

for (const flow of flows) {
  const d = flow.dossier;
  const decoyTag = flow.journey === 'decoy' ? ' (decoy)' : '';

  // Round header
  children.push(new Paragraph({ spacing: { before: 120, after: 60 }, shading: { type: ShadingType.CLEAR, fill: NAVY },
    children: [new TextRun({ text: `  ROUND ${flow.round}  -  ${d.displayName}${decoyTag}  -  ${d.regimeLabel}  `, bold: true, color: 'FFFFFF', size: 30 })] }));
  children.push(divider());

  // 1. Scenario overview
  children.push(h2('1. Scenario overview'));
  children.push(labelValue('Property', d.displayName));
  children.push(labelValue('Point of contact', d.contact));
  children.push(labelValue('Property type', d.propertyType));
  children.push(labelValue('Location', d.location));
  children.push(labelValue('Size', d.roomOrProperties));
  children.push(labelValue('Communication style', `${STYLE_LABEL[d.style] || d.style} primary, ${STYLE_LABEL[d.styleSecondary] || d.styleSecondary} secondary`));
  children.push(labelValue('Parity regime', d.regimeLabel));
  children.push(h3('Profile'));
  children.push(para(new TextRun({ text: d.description, size: 20 })));
  children.push(h3('Commercial goal'));
  children.push(para(new TextRun({ text: d.commercialGoal, size: 20 })));

  // 2. Portfolio card
  children.push(h2('2. Portfolio card (what the learner sees before opening)'));
  const cardMetrics = d.metrics.filter((m) => ['eRPD', 'Partner Value (ABRN ly)', 'RPD Public', 'Lose Price'].includes(m.label));
  children.push(metricTable([
    ['Name', d.displayName],
    ['Property type', d.propertyType],
    ['Rooms', d.roomOrProperties],
    ['Communication style', STYLE_LABEL[d.style] || d.style],
    ...cardMetrics.map((m) => [m.label, m.value]),
  ]));

  // 3. Partner Detail - driving metrics
  children.push(h2('3. Partner Detail screen'));
  children.push(h3('Driving metrics'));
  const drivingLabels = ['eRPD', 'Partner Value (ABRN ly)', 'RPD Public', 'RPD Loyal', 'Lose Price', 'Scenarios', 'Competitor'];
  children.push(metricTable(d.metrics.filter((m) => drivingLabels.includes(m.label)).map((m) => [m.label, m.value])));

  children.push(h3('eRPD Price Bucket strip'));
  // On screen the marker callout shows the eRPD % only - the bucket NUMBER
  // was removed and no longer appears to the learner (it survives only in
  // the per-segment hover tooltip). Represent the visible marker, never
  // "Bucket N".
  const erpdMatch = /eRPD\s*([+\-]?[\d.]+%)/.exec(d.priceBucket);
  const erpdMarker = erpdMatch ? erpdMatch[1] : '';
  children.push(para([
    new TextRun({ text: 'On-screen marker: ', bold: true, color: NAVY, size: 20 }),
    new TextRun({ text: `eRPD ${erpdMarker}`, size: 20 }),
  ]));
  children.push(para(new TextRun({ text: 'Shown as a 7-segment green (most competitive) to red (least competitive) strip, with the marker over this partner’s segment. The bucket number is not shown on screen.', italics: true, color: GREY, size: 18 })));

  const secondary = d.metrics.filter((m) => METRIC_LABEL[m.label]);
  if (secondary.length) {
    children.push(h3('Secondary metrics'));
    children.push(metricTable(secondary.map((m) => [friendlyMetric(m.label), m.value])));
  }

  // On Platform Competitiveness (OPC) tab - only present at Level 2
  // (round >= 11), where the OPC tab is unlocked.
  const opc = d.metrics.filter((m) => m.label.startsWith('OPC '));
  if (opc.length) {
    children.push(h3('On Platform Competitiveness tab (OPC metrics)'));
    children.push(metricTable(opc.map((m) => {
      const key = m.label.slice(4);
      return [OPC_LABEL[key] || key, m.value];
    })));
    children.push(para(new TextRun({ text: 'On screen, OPC metrics without a peer figure display a "(xx)" comparator placeholder (peer data still pending SME sign-off).', italics: true, color: GREY, size: 18 })));
  }

  const profileMeta = d.metrics.filter((m) => ['Last Pricing Contact', 'Pricing Coverage (QTD)'].includes(m.label));
  if (profileMeta.length) {
    children.push(h3('Profile meta'));
    children.push(metricTable(profileMeta.map((m) => [m.label, m.value])));
  }

  // Discount products grouped by category
  children.push(h3('Discount products'));
  const byCat = {};
  for (const disc of d.discounts) {
    const cat = disc.category || 'other';
    (byCat[cat] = byCat[cat] || []).push(disc);
  }
  for (const cat of Object.keys(byCat)) {
    children.push(new Paragraph({ spacing: { before: 60, after: 20 }, children: [new TextRun({ text: DISCOUNT_CATEGORY[cat] || cat, bold: true, size: 19, color: GREY })] }));
    children.push(metricTable(byCat[cat].map((disc) => [disc.label, disc.status === 'active' ? 'Active' : disc.status === 'misconfigured' ? 'Misconfigured' : 'Inactive'])));
  }

  // 4. Persona lenses
  if (d.personaHints && d.personaHints.length) {
    children.push(h2('4. Persona coaching lenses'));
    children.push(para(new TextRun({ text: 'One chip shown on Partner Detail depending on the learner’s chosen super power. Informational only - does not change grading.', italics: true, color: GREY, size: 18 })));
    for (const hint of d.personaHints) {
      children.push(new Paragraph({ spacing: { after: 40 }, children: [
        new TextRun({ text: `${hint.label}: `, bold: true, color: NAVY, size: 20 }),
        new TextRun({ text: hint.oneLiner, size: 20 }),
      ]}));
    }
  }

  // 5. Prescribed pathway
  if (d.issueTreePath) {
    children.push(h2('5. Prescribed Pricing Diagnostic to Pitch Flow (Coach answer key)'));
    children.push(metricTable(Object.entries(d.issueTreePath).map(([k, v]) => [k, v])));
  }

  // 6. Conversation
  children.push(h2(`6. Conversation (${partnerWord})`));
  if (flow.openingAm) {
    children.push(h3('Opening line (learner / AM)'));
    children.push(quote(flow.openingAm, NAVY));
  }
  flow.steps.forEach((step, si) => {
    // Step labels are internal too (the branching call shows numbered dots,
    // not named steps), so only the number is rendered.
    children.push(new Paragraph({ spacing: { before: 200, after: 60 }, children: [
      new TextRun({ text: step.displayLabel || `Step ${si + 1}`, bold: true, color: YELLOW, size: 22 }),
    ]}));
    children.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: `${d.contact} says:`, bold: true, color: GREY, size: 19 })] }));
    children.push(quote(step.partnerPrompt, NAVY));

    step.options.forEach((opt, oi) => {
      // The move-title (opt.label) is hidden from learners on screen - they
      // see only the spoken line - so it is NOT rendered here.
      const tag = opt.optimal ? '  [OPTIMAL]' : '';
      children.push(new Paragraph({ spacing: { before: 120, after: 30 }, children: [
        new TextRun({ text: `Option ${String.fromCharCode(65 + oi)}`, bold: true, color: NAVY, size: 20 }),
        new TextRun({ text: tag, bold: true, color: '1B7A43', size: 20 }),
        new TextRun({ text: `   [${COMPLIANCE_LABEL[opt.compliance]}]`, bold: true, color: COMPLIANCE_COLOR[opt.compliance], size: 18 }),
      ]}));
      children.push(new Paragraph({ spacing: { after: 20 }, indent: { left: 360 }, children: [new TextRun({ text: 'Learner says:', bold: true, color: GREY, size: 18 })] }));
      children.push(quote(opt.playerDialogue, '333333'));
      children.push(new Paragraph({ spacing: { after: 20 }, indent: { left: 360 }, children: [new TextRun({ text: `${d.contact} responds:`, bold: true, color: GREY, size: 18 })] }));
      children.push(quote(opt.partnerResponse, NAVY));
    });
  });

  children.push(new Paragraph({ children: [new PageBreak()] }));
}

const doc = new Document({
  creator: 'Rate Right',
  title: packTitle || 'Review Pack',
  styles: { default: { document: { run: { font: 'Calibri' } } } },
  sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log(`Wrote ${outPath} (${(buf.length / 1024).toFixed(0)} KB, ${flows.length} scenarios)`);
});
