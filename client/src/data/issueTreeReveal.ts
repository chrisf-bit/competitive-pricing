/**
 * Pricing Pathway reveal content for Level 0 (formerly "Issue Tree
 * reveal" / "Pricing Diagnostic Flow"; the framework is now **The
 * Pricing Pathway**).
 *
 * A worked example walking the learner along the Pathway, the
 * diagnostic sequence LPS use before every partner call. Framing,
 * phase names, step titles, sub-labels and goals map to the SME's
 * Content Chart Canvas (pages 3-7) verbatim: each step is the
 * question the LPS asks themselves, grouped into three phases -
 * Prioritize, Diagnose, Act - and Alex's narration carries the
 * coaching commentary. Positioned as a guide that gives structure,
 * not a new framework or a rigid checklist.
 *
 * Seven steps, preceded by an Overview intro:
 *   Phase 1 | Prioritize - 1. Trigger, 2. Primary Check
 *   Phase 2 | Diagnose   - 3. Diagnose & Intent, 4. Evidence
 *   Phase 3 | Act        - 5. Plan, 6. Hook, 7. Pitch
 *
 * Note the restructure vs the old seven-column tree: the old Intent
 * and Root Cause steps are now a single "Diagnose & Intent" step
 * (you determine strategy and root cause together), and a new "Plan"
 * step was inserted before the Hook. The in-sim Pricing Pathway
 * drawer walks the learner up to the Hook; the Pitch (step 7) happens
 * live via the conversation option picks.
 *
 * Worked example: a partner ("Hotel Atlante") whose eRPD has been
 * sliding due to a misconfigured Genius discount. Hotel-named so the
 * learner can't mistake the partner for an LPS colleague.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Route,
  Eye,
  SearchCheck,
  Stethoscope,
  ClipboardCheck,
  Flag,
  Compass,
  Handshake,
} from 'lucide-react';

/** The three phases the seven steps group into. */
export type PathwayPhase = 'Prioritize' | 'Diagnose' | 'Act';

export interface IssueTreePhase {
  /** Stable id for keys/animation. */
  id: string;
  /** Phase label (column name in the matrix). */
  label: string;
  /** Short stage name shown on the inactive card / pathway node. */
  shortName: string;
  /**
   * Which of the three Pathway phases this step belongs to. Undefined
   * for the Overview intro (it sits before the road).
   */
  phase?: PathwayPhase;
  /** 1-7 step number on the road. Undefined for the Overview intro. */
  stepNumber?: number;
  /** Icon for the card / node. */
  icon: LucideIcon;
  /** Headline shown when this phase is active (the guiding question). */
  headline: string;
  /**
   * The SME's parenthetical sub-label for the step, e.g. "The Trigger".
   * Shown beneath the headline on the pathway infographic.
   */
  subLabel?: string;
  /** The SME's one-line goal for the step (shown on the infographic). */
  goal?: string;
  /** Body text shown when active - the worked example for this phase. */
  body: string;
  /** Alex's narration line for this phase. */
  narration: string;
}

export const issueTreePhases: IssueTreePhase[] = [
  {
    id: 'intro',
    label: 'Overview',
    shortName: 'Overview',
    icon: Route,
    headline: 'Meet the Pricing Pathway',
    // Multi-paragraph body with **bold** inline markers. The screen
    // renders these via a simple splitter (see IssueTreeRevealScreen)
    // so we don't need a markdown library. Paragraphs are split on
    // \n\n; **...** is turned into <strong>.
    body:
      "The **Pricing Pathway** helps you connect the pricing signals you identify with the commercial conversation you have. It runs in three phases: **Prioritize**, **Diagnose**, then **Act**.\n\nIt isn't a new framework, and it isn't a rigid checklist to tick through. It's a guide that gives your thinking structure while leaving room for judgement in exceptions and case-by-case situations. Use it as a starting point - your judgement always comes first.\n\nYou'll find the winding-road **Pricing Pathway** icon on the yellow **Partner Detail** tab throughout the simulation. Open it at any time to walk the route using a live partner.\n\nLet's see how it works in practice.",
    narration: '',
  },

  // ───────── Phase 1 | Prioritize ─────────
  {
    id: 'trigger',
    label: 'Trigger',
    shortName: 'Trigger',
    phase: 'Prioritize',
    stepNumber: 1,
    icon: Eye,
    headline: 'What am I seeing?',
    subLabel: 'The Trigger',
    goal: 'Identifying market and partner conditions and key pricing opportunities or problems.',
    body:
      "The starting point. Something on Hotel Atlante has shifted - the eRPD has slipped for three weeks. Before doing anything else, you notice the signal and ask what conditions are driving it.",
    narration:
      "Triggers come in four flavors: performance outcomes (room nights or conversion drops), data signals (competitiveness turning red, high unsold rooms, low sell-through), partner interactions (they raise a concern or point out a price difference), or program changes (Genius or Preferred eligibility shifts). Any of them can start the Pathway.",
  },
  {
    id: 'primary-check',
    label: 'Primary Check',
    shortName: 'Primary Check',
    phase: 'Prioritize',
    stepNumber: 2,
    icon: SearchCheck,
    headline: 'Where are the primary pricing gaps?',
    subLabel: 'The Primary Check',
    goal: 'Identify where the gap exists. Review Pricing RPD and OPC dashboards or PPAI.',
    body:
      "The trigger tells you something is off. This step names where the gap sits: on the partner's own website (Brand.com), on a Key OTA, or somewhere else the data flags. For Hotel Atlante the pattern points at an on-platform competitiveness gap.",
    narration:
      "Review the Pricing RPD and OPC dashboards, or PPAI, to locate the gap precisely. That's what narrows the search before you diagnose why.",
  },

  // ───────── Phase 2 | Diagnose ─────────
  {
    id: 'diagnose',
    label: 'Diagnose & Intent',
    shortName: 'Diagnose',
    phase: 'Diagnose',
    stepNumber: 3,
    icon: Stethoscope,
    headline: 'What is causing the pricing gaps?',
    subLabel: 'The Diagnose and Intent',
    goal: "Understand why the gap exists by determining the partner's strategy and root cause together.",
    body:
      "Understand WHY the gap exists by determining the partner's strategy and the root cause together. Is it intentional (a deliberate commercial strategy - brand-first, preferred-OTA, exclusive promotions) or unintentional (setup oversights, missing discounts, technical errors, or external distortion like wholesaler leakage)? For Hotel Atlante the slide looks technical, not strategic - a misconfigured Genius stack, so treat it as unintentional.",
    narration:
      "In No Parity and Narrow Parity markets you can only raise cross-channel pricing reactively, and the conversation stays neutral and informational. Never demand parity, never threaten visibility. You're determining strategy and root cause in one move - the next step tests it against the data.",
  },
  {
    id: 'evidence',
    label: 'Evidence',
    shortName: 'Evidence',
    phase: 'Diagnose',
    stepNumber: 4,
    icon: ClipboardCheck,
    headline: 'What data supports my diagnosis?',
    subLabel: 'The Evidence, incl. RPD Scenarios',
    goal: 'Validate your hypothesis with data proof before action.',
    body:
      "Validate your hypothesis with data proof before you act. Different causes show up as different patterns: structural constant non-competitive eRPD points to foundational choices; a Public vs Loyal RPD split points to a Genius or program issue; non-structural changing eRPD points to promotions or external interventions. For Hotel Atlante, Public RPD is slipping while Loyal RPD holds steady - that confirms the Genius story.",
    narration:
      "Pull your proof from the RPD dashboard, an RPD Scenario or live check, OPC explainers (visibility share, CTR, conversion, search price vs ADR), and Extranet insights. If Loyal RPD had moved too, you'd be looking at a base-rate issue instead of a Genius one.",
  },

  // ───────── Phase 3 | Act ─────────
  {
    id: 'plan',
    label: 'Plan',
    shortName: 'Plan',
    phase: 'Act',
    stepNumber: 5,
    icon: Flag,
    headline: 'What do I want to achieve?',
    subLabel: 'The Plan',
    goal: 'Define what you want to achieve and how, at portfolio and individual partner level.',
    body:
      "Define what you want to achieve and how, at portfolio and individual partner level. Set a clear goal for the meeting and identify the solution: is it a foundation fix, a product-gap closure, or a rate-leakage resolution? For Hotel Atlante the goal is to restore on-platform visibility by resetting the Genius setup, without touching the base rate.",
    narration:
      "At portfolio level, rank partners by eRPD x partner value, plus scenario impact x partner value, and set measurable quarterly milestones. At property level, apply Foundations First: get base rates, taxes, fees, and occupancy setup correct before recommending any discount.",
  },
  {
    id: 'hook',
    label: 'Hook',
    shortName: 'Hook',
    phase: 'Act',
    stepNumber: 6,
    icon: Compass,
    headline: "What's my conversation angle?",
    subLabel: 'The Hook; Prepare for the conversation',
    goal: 'Choose the most effective entry point that makes the partner lean in, before you deliver the recommendation.',
    body:
      "You have the evidence and the plan. Now choose the most effective entry point - the one that makes the partner lean in before you deliver the recommendation. This isn't re-analyzing data; it's selecting the story from your diagnosis that lands best with this specific partner. For Hotel Atlante, an on-platform competitiveness narrative fits.",
    narration:
      "RPD Scenarios and self-identified scenarios give you the hook - the concrete, data-backed insight that opens the door. Use PPAI to build the narrative and pull the supporting data points into a conversation-ready format. Frame safely: on-platform language only, no claims about the partner's business beyond what you can see.",
  },
  {
    id: 'pitch',
    label: 'Pitch',
    shortName: 'Pitch',
    phase: 'Act',
    stepNumber: 7,
    icon: Handshake,
    headline: "What's the commercial pitch?",
    subLabel: 'The Conversation',
    goal: 'Deliver a tailored solution connecting diagnosis to commercial value, and lead to clear next steps.',
    body:
      "The tailored solution that connects your diagnosis to commercial value, and leads to clear next steps. It's either a cross-platform pricing conversation or an on-platform one. For Hotel Atlante: propose a Genius audit and reset - it restores visibility without changing the base rate.",
    narration:
      "In the sim, the Pricing Pathway drawer walks you up to the Hook. The Pitch happens live on the call, through the conversation option picks you make in the moment. Same route, just delivered rather than prepared.",
  },
];

/** Auto-play timing per phase (ms). */
export const PHASE_DURATION_MS = 4200;

/** One node per road step (structurally a PricingPathway `PathwayNode`). */
export interface PathwayNodeData {
  id: string;
  stepNumber: number;
  shortName: string;
  phase: PathwayPhase;
  icon: LucideIcon;
  /** Guiding question (the headline). */
  title: string;
  /** Parenthetical sub-label, e.g. "The Trigger". */
  subLabel: string;
  /** One-line goal. */
  goal: string;
  /** Alex's coaching line, revealed when the node is clicked. */
  coaching: string;
}

/**
 * The seven road nodes derived from the phases above (everything with
 * a stepNumber; the Overview intro sits before the road). Shared by
 * the clearance reveal and the in-sim drawer so both render the same
 * road. Kept in the data module to avoid a circular import with the
 * PricingPathway component.
 */
export const pathwayNodes: PathwayNodeData[] = issueTreePhases
  .filter((p) => p.stepNumber != null && p.phase != null)
  .map((p) => ({
    id: p.id,
    stepNumber: p.stepNumber!,
    shortName: p.shortName,
    phase: p.phase!,
    icon: p.icon,
    title: p.headline,
    subLabel: p.subLabel ?? '',
    goal: p.goal ?? '',
    coaching: p.narration ?? '',
  }));
