/**
 * Diagnose reveal content for Level 0 (formerly "Issue Tree reveal";
 * framework is now the Pricing Diagnostic Flow).
 *
 * A worked example walking the learner through the Flow, the
 * diagnostic sequence LPS use before every partner call. Framing and
 * step titles map to the SME's material verbatim: each step is the
 * question the LPS asks themselves, and Alex's narration carries the
 * coaching commentary. Not a checklist - a mind map.
 *
 * Seven diagnostic steps, preceded by an Overview intro. The seven
 * mirror the SME framework: Trigger, Issue, Intent, Root Cause,
 * Diagnosis, Hook, Pitch. The Diagnosis Coach drawer in the sim
 * currently walks steps 1-6 (ending at Hook); the Pitch (step 7)
 * happens live via the conversation option picks. The Reveal
 * teaches all seven so the learner has the full mental model.
 *
 * Worked example: a partner ("Hotel Atlante") whose eRPD has been
 * sliding due to a misconfigured Genius discount. Hotel-named so the
 * learner can't mistake the partner for an LPS colleague. The
 * example is intentionally simple; the SME material is clear that
 * the Flow is a starting point, not the final word, and case-by-case
 * judgment always beats strict adherence.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Workflow,
  Search,
  Target,
  Compass,
  ListChecks,
  Activity,
  MessageSquare,
  Handshake,
} from 'lucide-react';

export interface IssueTreePhase {
  /** Stable id for keys/animation. */
  id: string;
  /** Phase label (column name in the matrix). */
  label: string;
  /** Short stage name shown on the inactive card. */
  shortName: string;
  /** Icon for the card. */
  icon: LucideIcon;
  /** Headline shown when this phase is active. */
  headline: string;
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
    icon: Workflow,
    headline: 'Meet the Pricing Diagnostic Flow',
    body:
      "A diagnostic flow that connects the pricing signals you spot to the commercial pitch you deliver. Not a checklist, more a mind map LPS can use to guide their thinking. Seven guiding questions in order. Starting point, not the final word - case-by-case judgment always beats strict adherence.",
    narration:
      "You'll see this same flow icon on a yellow tab on Partner Detail in the sim - tap it to open the Pricing Diagnostic Flow and walk it through on a real partner. Click through and I'll show you how it plays on a worked example.",
  },
  {
    id: 'trigger',
    label: 'Trigger',
    shortName: 'Trigger',
    icon: Search,
    headline: 'What am I seeing?',
    body:
      "The starting point. Something on Hotel Atlante has shifted - the eRPD has slipped for three weeks. Before doing anything else, you notice the signal.",
    narration:
      "Triggers come in four flavours: performance outcomes (room nights or conversion drops), data signals (competitiveness turning red), partner interactions (they raise a concern), or programme changes (Genius eligibility shifts). Any of them can start the diagnostic.",
  },
  {
    id: 'issue',
    label: 'Issue',
    shortName: 'Issue',
    icon: Target,
    headline: 'Where are the primary pricing gaps?',
    body:
      "The trigger tells you something is off. This step names where the gap sits: on the partner's own website (Brand.com), on a Key OTA, or somewhere else the RPD data flags. For Hotel Atlante the pattern points at an on-platform competitiveness gap.",
    narration:
      "You review the Pricing RPD dashboard and RPD Scenarios dashboard to name the Issue precisely. That's what narrows the search for the root cause.",
  },
  {
    id: 'intent',
    label: 'Intent',
    shortName: 'Intent',
    icon: Compass,
    headline: "What is the partner's pricing strategy?",
    body:
      "Ask whether the gap is intentional (a deliberate commercial strategy - exclusive prices on the direct site, preferred-OTA plays) or unintentional (technical oversight, setup miss). For Hotel Atlante the slide looks technical, not strategic - treat it as unintentional first.",
    narration:
      "In No Parity and Narrow Parity markets you can only raise cross-channel pricing reactively, and the conversation stays neutral and informational. Never demand parity, never threaten visibility.",
  },
  {
    id: 'root-cause',
    label: 'Root Cause',
    shortName: 'Root Cause',
    icon: ListChecks,
    headline: "What's likely behind the pricing gaps?",
    body:
      "The specific underlying reason. Intentional root causes tend to be brand-first strategies, exclusive promotions, or preferred-OTA plays. Unintentional root causes tend to be setup or inventory oversights, external actions, or technical errors. For Hotel Atlante the Genius discount stack looks misconfigured.",
    narration:
      "You're building a hypothesis. The next step tests it against the data before you take it to the partner.",
  },
  {
    id: 'metric',
    label: 'Diagnosis',
    shortName: 'Diagnosis',
    icon: Activity,
    headline: 'What proof do I have?',
    body:
      "The evidence phase. Different causes show up as different data patterns: structural constant non-competitive eRPD points to foundational choices; structural Genius/Public RPD gaps point to programme issues; non-structural changing eRPD points to promotions or external interventions. For Hotel Atlante, Public RPD is slipping while Loyal RPD is steady - confirms the Genius story.",
    narration:
      "Match the cause to the pattern. If Loyal RPD had moved too, you'd be looking at a base-rate issue instead of a Genius one.",
  },
  {
    id: 'hook',
    label: 'Hook',
    shortName: 'Hook',
    icon: MessageSquare,
    headline: 'What conversation should I lead with?',
    body:
      "The angle you take into the call. Pick between existing RPD scenarios (mobile, app, domestic, international, family, wholesale leakage), self-identified scenarios (base-rate misalignment, non-genuine discounts, coupons), or OPC commercial scenarios (a segment-specific diagnosis). For Hotel Atlante, an on-platform competitiveness narrative fits.",
    narration:
      "Frame safely. On-platform language only, no claims about the partner's business beyond what you can see. The Hook is your bridge from data to conversation.",
  },
  {
    id: 'pitch',
    label: 'Pitch',
    shortName: 'Pitch',
    icon: Handshake,
    headline: "What's the commercial pitch?",
    body:
      "The tailored solution that follows from the diagnosis. Cross-platform pitches include The Value Proposition Wall, the Reverse Billboard effect, and the Same Net for Everyone mindset. On-platform pitches include the Fake Value trap and Direct-Booking Loyalty Pushback. For Hotel Atlante: propose a Genius audit and reset - restores visibility without changing the base rate.",
    narration:
      "In the sim, the Pricing Diagnostic Flow walks you up to the Hook. The Pitch happens live on the call, through the conversation option picks you make in the moment. Same framework, just delivered rather than prepared.",
  },
];

/** Auto-play timing per phase (ms). */
export const PHASE_DURATION_MS = 4200;
