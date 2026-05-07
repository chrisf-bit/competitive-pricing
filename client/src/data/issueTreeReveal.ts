/**
 * Issue Tree reveal content for Level 0.
 *
 * One worked example walking through the 7 phases of the Pricing Issue
 * Tree (Trigger > Intent > Root Cause > Metric > Hook > Pitch > Objection).
 * Goal is to introduce the FLOW of diagnostic thinking, not the literal
 * matrix - the learner internalises the shape so the Diagnose step in
 * Level 1 feels familiar.
 *
 * Worked example: a partner ("Maria") whose eRPD has been sliding due
 * to a misconfigured Genius discount. Sourced from the conceptual
 * structure in the Issue Tree PDF; specific narrative is illustrative
 * pending SME refinement.
 */

import type { LucideIcon } from 'lucide-react';
import { Search, Compass, ListChecks, Activity, MessageSquare, Lightbulb, Shield } from 'lucide-react';

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
    id: 'trigger',
    label: 'Trigger',
    shortName: 'Trigger',
    icon: Search,
    headline: "Maria's eRPD has been sliding for three weeks",
    body:
      'Something on this account has shifted. Before doing anything else, you notice the signal.',
    narration:
      "Every diagnostic conversation starts with a trigger - a signal in the data you've spotted on a partner account. Here, Maria's eRPD has slipped three weeks running.",
  },
  {
    id: 'intent',
    label: 'Intent',
    shortName: 'Intent',
    icon: Compass,
    headline: 'Likely unintentional - this looks technical, not strategic',
    body:
      "The slide is steady but not deliberate-looking. Nothing in Maria's recent calls suggests she's chosen to reposition. Worth treating as a config issue first, not a strategy shift.",
    narration:
      "Next: ask whether the change looks intentional or unintentional. That's your mandate axis - it tells you whether to fix it yourself, probe further, or escalate.",
  },
  {
    id: 'root-cause',
    label: 'Root Cause',
    shortName: 'Root Cause',
    icon: ListChecks,
    headline: 'Genius discount looks misconfigured',
    body:
      "Maria's Genius discount stack has fallen out of alignment with peers. Most likely: a recent Genius programme change wasn't carried through cleanly.",
    narration:
      "Now narrow it. From the family of plausible causes, which one fits this signal best? Here, the data points at her Genius config.",
  },
  {
    id: 'metric',
    label: 'Metric',
    shortName: 'Metric',
    icon: Activity,
    headline: 'Public RPD slipping; Loyal RPD steady',
    body:
      "If it were a base-rate issue, you'd expect Loyal RPD to move too. The fact that it's only Public confirms the Genius story.",
    narration:
      'You confirm with the metric. Different causes show up in different driver metrics - matching the cause to the metric is how you separate plausible from probable.',
  },
  {
    id: 'hook',
    label: 'Hook',
    shortName: 'Hook',
    icon: MessageSquare,
    headline: 'Un-platform competitiveness narrative',
    body:
      "Open with what you see on Booking.com - falling visibility, conversion softening - without claiming you know what's happening on her direct site or other OTAs.",
    narration:
      "When you reach for the call, the Hook is your opening - how you frame the conversation safely. On-platform language only, no claims about her business beyond what you can see.",
  },
  {
    id: 'pitch',
    label: 'Pitch',
    shortName: 'Pitch',
    icon: Lightbulb,
    headline: 'Genius audit + reset',
    body:
      'Suggest a quick Genius audit so the two of you can verify the stack together. Frame it as a low-effort fix that gives Maria back the visibility she had a month ago.',
    narration:
      'The Pitch is the recommendation that follows from the diagnosis. Concrete, practical, paired to the cause you identified.',
  },
  {
    id: 'objection',
    label: 'Objection',
    shortName: 'Objection',
    icon: Shield,
    headline: '"We already discount enough"',
    body:
      'A common pushback - the Heavy Entrance objection. The audit isn\'t about adding more discount; it\'s about making sure the existing one is doing its job. Worth practising the response in advance.',
    narration:
      "Finally, anticipate the Objection. Every Pitch carries one or two predictable pushbacks - the better you know which is coming, the smoother the call.",
  },
];

/** Auto-play timing per phase (ms). */
export const PHASE_DURATION_MS = 4200;
