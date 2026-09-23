// One-off generator: renders the Warm Up (mini-scenarios) clearance content
// as a Word doc in the review-pack house style, for legal / SME sign-off.
// Bundles the live data with esbuild so the doc can never drift from the sim.
//   node scripts/make-warmup-pack.mjs
import esbuild from 'esbuild';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
} from 'docx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataSrc = path.join(__dirname, '..', 'src', 'data', 'miniScenarios.ts');
const bundleOut = path.join(__dirname, '.warmup.bundle.mjs');

await esbuild.build({
  entryPoints: [dataSrc], bundle: true, platform: 'node', format: 'esm',
  target: 'node18', outfile: bundleOut, logLevel: 'error',
});
const { miniScenarios } = await import(pathToFileURL(bundleOut).href);

const NAVY = '0B2545', GREY = '5A6472', GREEN = '1B7A43', YELLOW = 'B7791F';

const runs = (arr) => new Paragraph({ children: arr, spacing: { after: 120 } });
const plain = (text, opts = {}) =>
  new Paragraph({ children: [new TextRun({ text, ...opts })], spacing: { after: opts.after ?? 100 } });
const bullet = (text) =>
  new Paragraph({ children: [new TextRun({ text, color: NAVY, size: 20 })], bullet: { level: 0 }, spacing: { after: 40 } });

const children = [];
children.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: 'Rate Right - Warm Up (Clearance Activity)', color: NAVY })] }));
children.push(plain('Learner-facing content extract for review. Four case files, each walking a four-step mini pricing diagnosis (Signal, Diagnose, Narrative, Next step) - 16 scored knowledge-check items in total.', { italics: true, color: GREY, size: 20 }));
children.push(plain('The activity is regime-neutral: the same content is shown to Wide, Narrow and No-Parity learners. The correct answer for each step is marked CORRECT; the coaching shown is the feedback the learner sees on the correct pick. Option order is fixed here for review; in the game the three options are presented as tap cards.', { italics: true, color: GREY, size: 20, after: 240 }));

const stepIntro = (s) => {
  if (s.showBullets && s.showBullets.length) {
    children.push(plain('From the data:', { bold: true, color: NAVY, size: 20, after: 40 }));
    for (const b of s.showBullets) children.push(bullet(b));
  }
  if (s.contextNote) children.push(plain(`Context: ${s.contextNote}`, { italics: true, color: GREY, size: 20 }));
};

miniScenarios.forEach((sc, i) => {
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 60 },
    children: [new TextRun({ text: `Scenario ${i + 1} - ${sc.propertyName} - ${sc.scenarioTitle}`, color: NAVY })],
  }));
  children.push(plain(`Objective: ${sc.objective}`, { italics: true, color: GREY, size: 20, after: 160 }));

  sc.steps.forEach((s, si) => {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 160, after: 60 },
      children: [new TextRun({ text: `Step ${si + 1} - ${s.label}`, color: NAVY })],
    }));
    stepIntro(s);
    children.push(plain(s.prompt, { bold: true, color: NAVY, size: 22 }));
    s.options.forEach((o) => {
      const correct = o.id === s.correctOptionId;
      const kids = [];
      if (correct) kids.push(new TextRun({ text: 'CORRECT  ', bold: true, color: GREEN, size: 20 }));
      kids.push(new TextRun({ text: `${o.id}. `, bold: true, color: NAVY, size: 20 }));
      kids.push(new TextRun({ text: o.text, color: '222222', size: 20, bold: correct }));
      children.push(new Paragraph({ children: kids, spacing: { after: o.rationale ? 20 : 60 }, indent: { left: 220 } }));
      if (o.rationale)
        children.push(new Paragraph({ children: [new TextRun({ text: `Note: ${o.rationale}`, italics: true, color: GREY, size: 18 })], spacing: { after: 60 }, indent: { left: 460 } }));
    });
    children.push(plain(`Coaching (shown on the correct answer): ${s.correctCoaching}`, { italics: true, color: YELLOW, size: 20, after: 140 }));
  });

  if (sc.goodOutcome) children.push(plain(`Good outcome: ${sc.goodOutcome}`, { color: GREEN, size: 20, after: 40 }));
  if (sc.badOutcome) children.push(plain(`Missed outcome: ${sc.badOutcome}`, { color: GREY, size: 20, after: 200 }));
});

const doc = new Document({ sections: [{ children }] });
const outDir = path.join(__dirname, '..', '..', 'docs', 'review-packs');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'Rate Right - Warm Up (Clearance Activity) - Content Extract.docx');
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buf);
fs.rmSync(bundleOut, { force: true });
console.log('Wrote', outPath, `(${miniScenarios.length} scenarios, ${miniScenarios.reduce((n, s) => n + s.steps.length, 0)} steps)`);
