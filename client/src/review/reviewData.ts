import type {
  BranchingConversationTree,
  CommunicationStyle,
  DiscountProduct,
  ParityRegime,
  PartnerState,
} from '../types';
import { getBranchingScenario } from '../data/branchingScenarios';
import { getCorrectPartnerForRound } from '../data/correctPartnerPerRound';
import { getPortfolioForRound } from '../data/portfolioByRound';
import { initialPartners, pendingPartners } from '../data/partners';
import { getPersonaHint } from '../data/personaHints';
import { getPriceBucket, applyRoundBaseline } from '../engine/gameEngine';

const ALL_PARTNERS: PartnerState[] = [...initialPartners, ...pendingPartners];
const recordFor = (id: string) =>
  ALL_PARTNERS.find((p) => p.persona.id === id) ?? null;

const PERSONAS = [
  { id: 'conversation-architect', label: 'Conversation Architect' },
  { id: 'objection-navigator', label: 'Objection Navigator' },
  { id: 'storyteller', label: 'Storyteller' },
  { id: 'data-detective', label: 'Data Detective' },
] as const;

export interface FlowOption {
  id: string;
  label: string;
  playerDialogue: string;
  partnerResponse: string;
  compliance: 'safe' | 'borderline' | 'risky';
  optimal: boolean;
  styleMatch: Record<CommunicationStyle, number>;
  nextPrompt?: string;
}
export interface FlowStep {
  id: string;
  label?: string;
  partnerPrompt: string;
  options: FlowOption[];
}
export interface Dossier {
  displayName: string;
  contact: string;
  isKam: boolean;
  propertyType: string;
  location: string;
  roomOrProperties: string;
  style: CommunicationStyle;
  styleSecondary: CommunicationStyle;
  regimeLabel: string;
  kamPills: string[];
  description: string;
  commercialGoal: string;
  metrics: { label: string; value: string }[];
  priceBucket: string;
  discounts: DiscountProduct[];
  personaHints: { label: string; oneLiner: string }[];
  issueTreePath?: Record<string, string>;
}
export interface Flow {
  key: string;
  journey: 'standard' | 'kam' | 'decoy';
  journeyLabel: string;
  level: 1 | 2;
  round: number;
  regimes: string[];
  repPartnerId: string;
  basePartner: string;
  title: string;
  dossier: Dossier;
  openingAm?: string;
  steps: FlowStep[];
}

const REGIME_LABEL: Record<string, string> = {
  none: 'No Parity',
  narrow: 'Narrow Parity',
  wide: 'Wide Parity',
  'cross-regional': 'Cross-Regional (KAM)',
};

const baseId = (id: string) =>
  id.replace(/-(none|narrow|wide|cross-regional)$/, '');

function pct(n: number | undefined): string {
  return n === undefined ? '-' : `${n > 0 ? '+' : ''}${n}%`;
}

function buildDossier(
  rec: PartnerState,
  round: number,
  tree: BranchingConversationTree,
): Dossier {
  const p = rec.persona;
  const m = rec.metrics;
  const isKam = !!p.companyName;
  const hints: { label: string; oneLiner: string }[] = [];
  for (const persona of PERSONAS) {
    const h = getPersonaHint(p.id, round, persona.id);
    if (h) hints.push({ label: persona.label, oneLiner: h.oneLiner });
  }

  const metrics: { label: string; value: string }[] = [
    { label: 'eRPD', value: `${pct(m.erpd)} (${m.erpdChange > 0 ? '+' : ''}${m.erpdChange})` },
    { label: 'Partner Value (ABRN ly)', value: m.partnerValueAbrn?.toLocaleString('en-US') ?? '-' },
    { label: 'RPD Public', value: pct(m.rpdPublic) },
    { label: 'RPD Loyal', value: pct(m.rpdLoyal) },
    { label: 'Lose Price', value: `${m.losePricePublic}%` },
    { label: 'Scenarios', value: String(m.activeScenarios) },
    { label: 'Competitor', value: m.competitor === 'brand' ? 'Brand.com' : 'Key OTA' },
  ];
  if (m.secondaryMetrics) {
    for (const [k, v] of Object.entries(m.secondaryMetrics)) {
      if (v && typeof v === 'object' && 'value' in v)
        metrics.push({ label: k, value: `${v.value}${v.deltaPct !== undefined ? ` (${v.deltaPct > 0 ? '+' : ''}${v.deltaPct}%)` : ''}` });
    }
  }
  // OPC metrics only surface from Level 2 (round >= 11) onward, mirroring
  // the sim: the On Platform Competitiveness tab is locked at Level 1.
  if (m.opcMetrics && round >= 11) {
    for (const [k, v] of Object.entries(m.opcMetrics)) {
      if (v && typeof v === 'object' && 'value' in v)
        metrics.push({ label: `OPC ${k}`, value: `${v.value}${v.peerValue !== undefined ? ` vs ${v.peerValue} peer` : v.deltaPct !== undefined ? ` (${v.deltaPct > 0 ? '+' : ''}${v.deltaPct}%)` : ''}` });
    }
  }
  if (m.lastPricingContactDaysAgo !== undefined)
    metrics.push({ label: 'Last Pricing Contact', value: `${m.lastPricingContactDaysAgo} days ago` });
  if (m.pricingCoverageQTD !== undefined)
    metrics.push({ label: 'Pricing Coverage (QTD)', value: `${m.pricingCoverageQTD}%` });

  const kamPills = isKam
    ? [
        REGIME_LABEL[p.parityRegime ?? 'none'] ?? String(p.parityRegime),
        p.numberOfProperties !== undefined ? `${p.numberOfProperties} properties` : '',
        p.hqLocation ? `HQ: ${p.hqLocation}` : '',
        p.partnerType ?? '',
      ].filter(Boolean)
    : [];

  const itp = tree.issueTreePath
    ? {
        Trigger: tree.issueTreePath.trigger,
        Issue: tree.issueTreePath.issueId,
        Intent: tree.issueTreePath.intent,
        'Root cause': tree.issueTreePath.rootCauseId,
        'Metric insight': tree.issueTreePath.metricInsightId,
        Hook: tree.issueTreePath.hookId,
      }
    : undefined;

  return {
    displayName: isKam ? (p.companyName as string) : p.propertyName,
    contact: p.name,
    isKam,
    propertyType: p.propertyType,
    location: p.location,
    roomOrProperties: isKam
      ? `${p.numberOfProperties ?? '-'} properties`
      : `${p.roomCount} rooms`,
    style: p.style,
    styleSecondary: p.styleSecondary,
    regimeLabel: REGIME_LABEL[p.parityRegime ?? 'none'] ?? String(p.parityRegime ?? '-'),
    kamPills,
    description: p.description,
    commercialGoal: p.commercialGoal,
    metrics,
    priceBucket: `Bucket ${getPriceBucket(m.erpd)} (eRPD ${pct(m.erpd)})`,
    discounts: rec.discounts,
    personaHints: hints,
    issueTreePath: itp,
  };
}

function toFlowSteps(tree: BranchingConversationTree): FlowStep[] {
  return tree.steps.map((s) => ({
    id: s.id,
    label: s.label,
    partnerPrompt: s.partnerPrompt,
    options: s.options.map((o) => ({
      id: o.id,
      label: o.label,
      playerDialogue: o.playerDialogue,
      partnerResponse: o.partnerResponse,
      compliance: o.compliance,
      optimal: !!o.optimal,
      styleMatch: o.styleMatch,
      nextPrompt: o.nextPrompt,
    })),
  }));
}

/** A stable signature of the dialogue text so identical trees across
 *  regimes collapse into one review entry. */
function signature(tree: BranchingConversationTree): string {
  return JSON.stringify([
    tree.openingAm ?? '',
    tree.steps.map((s) => [
      s.partnerPrompt,
      s.options.map((o) => [o.id, o.label, o.playerDialogue, o.partnerResponse]),
    ]),
  ]);
}

/** Build the full, deduped list of reviewable conversation flows. */
export function buildFlows(): Flow[] {
  const flows: Flow[] = [];

  // Standard journey: none/narrow/wide, rounds 1-20. Collapse regimes
  // whose tree text is identical (L2 is regime-neutral) into one entry.
  for (let round = 1; round <= 20; round++) {
    const bySig = new Map<string, { tree: BranchingConversationTree; partnerId: string; regimes: string[] }>();
    for (const regime of ['none', 'narrow', 'wide'] as ParityRegime[]) {
      const pid = getCorrectPartnerForRound(regime, round);
      if (!pid) continue;
      const tree = getBranchingScenario(pid, round);
      if (!tree) continue;
      const sig = signature(tree);
      const existing = bySig.get(sig);
      if (existing) existing.regimes.push(regime);
      else bySig.set(sig, { tree, partnerId: pid, regimes: [regime] });
    }
    for (const { tree, partnerId, regimes } of bySig.values()) {
      const rec = recordFor(partnerId);
      if (!rec) continue;
      const level = round <= 10 ? 1 : 2;
      const regLabel =
        regimes.length === 3 ? 'All regimes' : regimes.map((r) => REGIME_LABEL[r]).join(' / ');
      flows.push({
        key: `standard::r${round}::${regimes.join('-')}`,
        journey: 'standard',
        journeyLabel: 'Standard',
        level,
        round,
        regimes,
        repPartnerId: partnerId,
        basePartner: baseId(partnerId),
        title: `R${round} - ${rec.persona.propertyName} - ${regLabel}`,
        dossier: buildDossier(rec, round, tree),
        openingAm: tree.openingAm,
        steps: toFlowSteps(tree),
      });
    }
  }

  // Cross-Regional (KAM) journey: one partner per round, mixed regime.
  for (let round = 1; round <= 20; round++) {
    const pid = getCorrectPartnerForRound('cross-regional', round);
    if (!pid) continue;
    const tree = getBranchingScenario(pid, round);
    if (!tree) continue;
    const rec = recordFor(pid);
    if (!rec) continue;
    const level = round <= 10 ? 1 : 2;
    flows.push({
      key: `kam::r${round}`,
      journey: 'kam',
      journeyLabel: 'Cross-Regional (KAM)',
      level,
      round,
      regimes: ['cross-regional'],
      repPartnerId: pid,
      basePartner: baseId(pid),
      title: `R${round} - ${rec.persona.companyName ?? rec.persona.propertyName} (${REGIME_LABEL[rec.persona.parityRegime ?? 'none']})`,
      dossier: buildDossier(rec, round, tree),
      openingAm: tree.openingAm,
      steps: toFlowSteps(tree),
    });
  }

  // Decoy calls: the two non-priority cards a learner sees each round.
  // They ARE learner-facing (any card can be opened and played), so
  // legal/commercial must review this dialogue too. Enumerate every
  // round x regime's non-priority cards, dedupe by dialogue signature so
  // the shared "nothing pressing" / close-decoy scripts collapse into one
  // entry each, and show the decoy's HEALTHY round metrics (via
  // applyRoundBaseline) rather than the hotel's problem-state record.
  const decoyBySig = new Map<
    string,
    { tree: BranchingConversationTree; partnerId: string; round: number }
  >();
  for (let round = 1; round <= 20; round++) {
    for (const regime of ['none', 'narrow', 'wide', 'cross-regional'] as ParityRegime[]) {
      const priorityId = getCorrectPartnerForRound(regime, round);
      const ids = getPortfolioForRound(regime, round) ?? [];
      for (const id of ids) {
        if (id === priorityId) continue;
        const tree = getBranchingScenario(id, round);
        if (!tree) continue;
        const sig = signature(tree);
        if (!decoyBySig.has(sig)) decoyBySig.set(sig, { tree, partnerId: id, round });
      }
    }
  }
  for (const { tree, partnerId, round } of decoyBySig.values()) {
    const rec = recordFor(partnerId);
    if (!rec) continue;
    const healthyRec = applyRoundBaseline(rec, round);
    flows.push({
      key: `decoy::${partnerId}::r${round}`,
      journey: 'decoy',
      journeyLabel: 'Decoy',
      level: round <= 10 ? 1 : 2,
      round,
      regimes: [],
      repPartnerId: partnerId,
      basePartner: baseId(partnerId),
      title: `R${round} - ${healthyRec.persona.companyName ?? healthyRec.persona.propertyName} (decoy)`,
      dossier: buildDossier(healthyRec, round, tree),
      openingAm: tree.openingAm,
      steps: toFlowSteps(tree),
    });
  }

  return flows;
}

/** Deterministic anchor id for a commentable line. */
export function anchorFor(
  flow: Flow,
  stepId: string,
  optionId: string,
  field: string,
): string {
  return `${flow.repPartnerId}|r${flow.round}|${stepId}|${optionId || '-'}|${field}`;
}
