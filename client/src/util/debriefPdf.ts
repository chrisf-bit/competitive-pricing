import type { jsPDF } from 'jspdf';
import type {
  LearnerProfile,
  PartnerState,
  ParityRegime,
  ScoreBreakdown,
} from '../types';
import { getPersonaById } from '../data/characters';
import { getCorrectPartnerForRound } from '../data/correctPartnerPerRound';
import { TOTAL_ROUNDS } from '../engine/gameEngine';

// jsPDF + its transitive deps (html2canvas, dompurify) add ~400KB to
// the bundle. Loading them lazily inside downloadDebriefPdf keeps the
// initial-launch bundle small - the learner only pays the cost when
// they actually click "Download your summary".

/**
 * Generates the post-sim "Take this with you" summary PDF.
 *
 * Sections:
 *  - Cover: learner name, persona, regime, completion date, headline
 *    score line.
 *  - Round-by-round results: one row per round (TOTAL_ROUNDS) showing
 *    the SME-correct partner for the round, the engaged partner if
 *    different, and the stars earned.
 *  - Well done: persona retroOnWin lines for every >=2-star round +
 *    the aggregate persona-strength coaching line.
 *  - Coaching focus: persona retroOnLoss lines for every scrappy
 *    single-star round + the aggregate persona-trade-off coaching line.
 *
 * Generated client-side via jsPDF - no network call, no backend, no
 * shared CDN. Fits in the self-contained SCORM zip.
 *
 * Designed for printing and saving locally. The learner triggers the
 * download from the Debrief; the browser surfaces the OS save dialog.
 */
const PAGE_WIDTH = 210; // A4 mm
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

interface BuildDebriefPdfArgs {
  learnerProfile: LearnerProfile;
  score: ScoreBreakdown;
  partners: PartnerState[];
  roundStars: Record<number, 0 | 1 | 2 | 3>;
  regime: ParityRegime | null;
  personaId: string | null;
}

export async function buildDebriefPdf(args: BuildDebriefPdfArgs): Promise<jsPDF> {
  const { learnerProfile, score, partners, roundStars, regime, personaId } = args;
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  let y = MARGIN;

  // ─── Cover block ───
  y = drawCoverBlock(doc, y, { learnerProfile, score, regime, personaId });
  y = ensureSpace(doc, y, 30);

  // ─── Round-by-round results ───
  y = drawSectionHeader(doc, y, 'Round results');
  y = ensureSpace(doc, y, 8);
  // Rounds actually played (roundStars only stores rounds the learner
  // cleared) - the denominator for the strength / trade-off lines,
  // matching the on-screen Debrief aggregate block.
  const roundsPlayed = Object.keys(roundStars).length;
  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    const stars = roundStars[round] ?? null;
    const correctPartnerId = regime ? getCorrectPartnerForRound(regime, round) : null;
    const correctPartnerName = correctPartnerId
      ? partnerName(partners, correctPartnerId)
      : null;
    const engagedPartner = engagedPartnerForRound(partners, round);
    const engagedDiffers =
      engagedPartner &&
      correctPartnerId &&
      engagedPartner.persona.id !== correctPartnerId;
    y = ensureSpace(doc, y, 6);
    y = drawRoundRow(doc, y, {
      round,
      stars,
      targetPartnerName: correctPartnerName,
      engagedPartnerName: engagedDiffers ? engagedPartner.persona.name : null,
    });
  }

  // Persona retros - drive both "Well done" and "Coaching focus".
  const persona = getPersonaById(personaId);

  // ─── Well done ───
  const wellDoneRounds = Object.entries(roundStars)
    .filter(([, s]) => s >= 2)
    .map(([r]) => Number(r))
    .sort((a, b) => a - b);
  if (wellDoneRounds.length > 0 || persona) {
    y = ensureSpace(doc, y, 18);
    y += 4;
    y = drawSectionHeader(doc, y, 'Well done');
    if (persona && wellDoneRounds.length > 0) {
      y = drawBodyLine(
        doc,
        y,
        `${wellDoneRounds.length} of ${roundsPlayed} rounds where your ${persona.name} strength carried.`,
        { bold: true },
      );
      y = drawBodyParagraph(doc, y, persona.powerEffect.retroOnWin);
    } else if (persona) {
      y = drawBodyParagraph(
        doc,
        y,
        `No round earned 2+ stars this run. The ${persona.name} strength will land more often once you score 2+ stars on rounds where the persona's edge applies.`,
      );
    }
    for (const round of wellDoneRounds) {
      y = ensureSpace(doc, y, 6);
      y = drawBodyLine(
        doc,
        y,
        `  Round ${round}  -  ${starsLine(roundStars[round] ?? 0)}`,
      );
    }
  }

  // ─── Coaching focus ───
  // A scrappy single-star pass is where the persona's trade-off showed
  // even though the learner got through. A 0-star round can't reach the
  // debrief (you can't advance past it), so the count keys off s === 1,
  // mirroring the on-screen Debrief aggregate block.
  const coachingRounds = Object.entries(roundStars)
    .filter(([, s]) => s === 1)
    .map(([r]) => Number(r))
    .sort((a, b) => a - b);
  if (coachingRounds.length > 0 || persona) {
    y = ensureSpace(doc, y, 18);
    y += 4;
    y = drawSectionHeader(doc, y, 'Coaching focus');
    if (persona && coachingRounds.length > 0) {
      y = drawBodyLine(
        doc,
        y,
        `${coachingRounds.length} of ${roundsPlayed} rounds where the ${persona.name} trade-off slowed you down.`,
        { bold: true },
      );
      y = drawBodyParagraph(doc, y, persona.powerEffect.retroOnLoss);
    } else if (persona) {
      y = drawBodyParagraph(
        doc,
        y,
        `No round came down to a scrappy single-star pass this run. Keep playing to the ${persona.name} strengths and watch for the moments the trade-off bites.`,
      );
    }
    for (const round of coachingRounds) {
      y = ensureSpace(doc, y, 6);
      const correctPartnerId = regime ? getCorrectPartnerForRound(regime, round) : null;
      const correctPartnerName = correctPartnerId
        ? partnerName(partners, correctPartnerId)
        : '';
      const engagedPartner = engagedPartnerForRound(partners, round);
      const engagedDiffers =
        engagedPartner &&
        correctPartnerId &&
        engagedPartner.persona.id !== correctPartnerId;
      const note = engagedDiffers
        ? `  Round ${round}  -  picked ${engagedPartner.persona.name} (target was ${correctPartnerName})`
        : `  Round ${round}  -  ${correctPartnerName ? `target was ${correctPartnerName}` : 'no clear target'}`;
      y = drawBodyLine(doc, y, note);
    }
  }

  // Aggregate persona coaching line (always at the end if persona set).
  if (persona) {
    y = ensureSpace(doc, y, 18);
    y += 4;
    y = drawSectionHeader(doc, y, 'Where to grow next');
    y = drawBodyParagraph(doc, y, persona.powerEffect.aggregateCoaching);
  }

  return doc;
}

/** Triggers the browser save dialog with a sensible default filename. */
export async function downloadDebriefPdf(args: BuildDebriefPdfArgs): Promise<void> {
  const doc = await buildDebriefPdf(args);
  const safeName = args.learnerProfile.playerName
    .replace(/[^a-z0-9_-]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  const date = new Date().toISOString().slice(0, 10);
  doc.save(`rate-right-summary-${safeName || 'player'}-${date}.pdf`);
}

// ─── drawing helpers ────────────────────────────────────────────

function drawCoverBlock(
  doc: jsPDF,
  startY: number,
  args: {
    learnerProfile: LearnerProfile;
    score: ScoreBreakdown;
    regime: ParityRegime | null;
    personaId: string | null;
  },
): number {
  let y = startY;
  const persona = getPersonaById(args.personaId);
  const completionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(20, 33, 61);
  doc.text('Rate Right', MARGIN, y);
  y += 7;

  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text('Your simulation summary', MARGIN, y);
  y += 10;

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(110, 110, 110);

  const rows: Array<[string, string]> = [
    ['Player', args.learnerProfile.playerName || 'Player'],
  ];
  if (persona) {
    rows.push(['Super-power', persona.name]);
  }
  if (args.regime) {
    rows.push(['Market regime', regimeLabel(args.regime)]);
  }
  rows.push(['Completed', completionDate]);
  rows.push(['Overall grade', args.score.overallGrade]);
  rows.push([
    'Relationship health',
    `${Math.round(args.score.relationshipHealth)} avg`,
  ]);

  for (const [label, value] of rows) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(140, 140, 140);
    doc.text(label.toUpperCase(), MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    doc.text(value, MARGIN + 40, y);
    y += 5.5;
  }

  return y + 3;
}

function drawSectionHeader(doc: jsPDF, startY: number, label: string): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 33, 61);
  doc.text(label, MARGIN, startY);
  doc.setDrawColor(254, 186, 2);
  doc.setLineWidth(0.7);
  doc.line(MARGIN, startY + 1.5, MARGIN + 24, startY + 1.5);
  return startY + 7;
}

function drawRoundRow(
  doc: jsPDF,
  startY: number,
  args: {
    round: number;
    stars: 0 | 1 | 2 | 3 | null;
    targetPartnerName: string | null;
    engagedPartnerName: string | null;
  },
): number {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);

  const roundLabel = `Round ${args.round}`;
  doc.text(roundLabel, MARGIN, startY);

  const targetText = args.targetPartnerName
    ? `Target: ${args.targetPartnerName}`
    : 'Target: -';
  doc.text(targetText, MARGIN + 22, startY);

  if (args.engagedPartnerName) {
    doc.setTextColor(180, 90, 30);
    doc.text(`Engaged: ${args.engagedPartnerName}`, MARGIN + 92, startY);
    doc.setTextColor(60, 60, 60);
  }

  const starsText = args.stars === null ? 'not played' : starsLine(args.stars);
  doc.setFont('helvetica', 'bold');
  doc.text(starsText, MARGIN + CONTENT_WIDTH - 22, startY);
  return startY + 5.5;
}

function drawBodyParagraph(
  doc: jsPDF,
  startY: number,
  text: string,
): number {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
  let y = startY;
  for (const line of lines) {
    y = ensureSpace(doc, y, 5);
    doc.text(line, MARGIN, y);
    y += 4.6;
  }
  return y + 2;
}

function drawBodyLine(
  doc: jsPDF,
  startY: number,
  text: string,
  opts: { bold?: boolean } = {},
): number {
  doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text(text, MARGIN, startY);
  return startY + 5;
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_HEIGHT - MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

// ─── data helpers ────────────────────────────────────────────────

function partnerName(partners: PartnerState[], id: string): string {
  return partners.find((p) => p.persona.id === id)?.persona.name ?? id;
}

function engagedPartnerForRound(
  partners: PartnerState[],
  round: number,
): PartnerState | null {
  for (const p of partners) {
    if (p.conversationLog.some((log) => log.round === round)) {
      return p;
    }
  }
  return null;
}

function regimeLabel(regime: ParityRegime): string {
  switch (regime) {
    case 'wide':
      return 'Wide Parity';
    case 'narrow':
      return 'Narrow Parity';
    case 'none':
      return 'No Parity';
    case 'cross-regional':
      return 'Cross Regional';
  }
}

function starsLine(stars: 0 | 1 | 2 | 3): string {
  const filled = '*'.repeat(stars);
  const empty = '.'.repeat(3 - stars);
  return `${filled}${empty}  (${stars}/3)`;
}
