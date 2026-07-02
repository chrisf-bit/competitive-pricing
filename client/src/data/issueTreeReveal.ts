/**
 * Issue Tree reveal content for Level 0.
 *
 * A worked example walking the learner through the framework LPS use
 * to diagnose pricing issues on the platform. Six diagnostic phases
 * that exactly mirror the Diagnosis Coach drawer in the sim
 * (Trigger > Issue > Intent > Root Cause > Metric Insight > Hook),
 * preceded by an intro card that names the framework and connects it
 * to the Coach. Alignment matters: learners see this in clearance,
 * then walk the same six steps in every partner conversation.
 *
 * Worked example: a partner ("Hotel Atlante") whose eRPD has been
 * sliding due to a misconfigured Genius discount. Hotel-named so the
 * learner can't mistake the partner for an LPS colleague. Sourced
 * from the conceptual structure in the Issue Tree PDF; specific
 * narrative is illustrative pending SME refinement.
 */

import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Search,
  Target,
  Compass,
  ListChecks,
  Activity,
  MessageSquare,
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
    icon: BookOpen,
    headline: 'The six-step diagnostic used on every partner call',
    body:
      "This is the Pricing Issue Tree. LPS walk these six steps in order before any partner call, so the conversation stays structured, honest, and safe. The Diagnosis Coach in the sim guides you through the same six steps for each partner.",
    narration:
      "Quick primer before you meet a partner. Every diagnostic starts with a trigger and ends with a hook. Six steps in between shape the whole call. Click through and I'll show you what each looks like on a real-ish example.",
  },
  {
    id: 'trigger',
    label: 'Trigger',
    shortName: 'Trigger',
    icon: Search,
    headline: "Hotel Atlante's eRPD has been sliding for three weeks",
    body:
      "Something on this partner's pricing has shifted. Before doing anything else, you notice the signal.",
    narration:
      "Every diagnostic conversation starts with a trigger - a signal in the data you've spotted on a partner. Here, Hotel Atlante's eRPD has slipped three weeks running.",
  },
  {
    id: 'issue',
    label: 'Issue',
    shortName: 'Issue',
    icon: Target,
    headline: 'Which pricing issue does the data point at?',
    body:
      "The trigger is the signal. The Issue is the specific pricing pattern the signal maps to - a Brand.com competitiveness gap, a Key OTA gap, a discount depth mismatch, and so on. Naming the Issue precisely narrows what you look at next.",
    narration:
      "From the trigger you pick a specific pricing issue. This is the second column of the tree, a fixed list of pricing issues LPS have seen play out. For Hotel Atlante, the pattern points at an on-platform competitiveness gap.",
  },
  {
    id: 'intent',
    label: 'Intent',
    shortName: 'Intent',
    icon: Compass,
    headline: 'Likely unintentional. This looks technical, not strategic',
    body:
      "The slide is steady but not deliberate-looking. Nothing in recent calls with Hotel Atlante suggests they've chosen to reposition. Worth treating as a config issue first, not a strategy shift.",
    narration:
      "Next: ask whether the change looks intentional or unintentional. That's your mandate axis. It tells you whether to fix it yourself, probe further, or reframe the conversation around a strategy the partner has actively chosen.",
  },
  {
    id: 'root-cause',
    label: 'Root Cause',
    shortName: 'Root Cause',
    icon: ListChecks,
    headline: 'Genius discount looks misconfigured',
    body:
      "Hotel Atlante's Genius discount stack has fallen out of alignment with peers. Most likely: a recent Genius programme change wasn't carried through cleanly.",
    narration:
      "Now narrow it. From the family of plausible causes, which one fits this signal best? Here, the data points at their Genius config.",
  },
  {
    id: 'metric',
    label: 'Metric',
    shortName: 'Metric',
    icon: Activity,
    headline: 'Public RPD slipping. Loyal RPD steady',
    body:
      "If it were a base-rate issue, you'd expect Loyal RPD to move too. The fact that it's only Public confirms the Genius story.",
    narration:
      'You confirm with the metric. Different causes show up in different driver metrics. Matching the cause to the metric is how you separate plausible from probable.',
  },
  {
    id: 'hook',
    label: 'Hook',
    shortName: 'Hook',
    icon: MessageSquare,
    headline: 'On-platform competitiveness narrative',
    body:
      "Open with what you see on Booking.com - falling visibility, softening conversion - without claiming you know what's happening on the hotel's direct site or other OTAs. This is the angle you take into the call.",
    narration:
      "The Hook is your opening. It frames the conversation safely. On-platform language only, no claims about the partner's business beyond what you can see. Once you've landed on a Hook, the rest of the call is a conversation - not a diagnosis.",
  },
];

/** Auto-play timing per phase (ms). */
export const PHASE_DURATION_MS = 4200;
