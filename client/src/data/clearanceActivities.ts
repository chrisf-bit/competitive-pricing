import type { GameScreen } from '../types';

/**
 * The clearance journey, in order. Single source of truth for the
 * progress strip + intro block rendered on every clearance screen.
 *
 * Every clearance activity has a consistent intro block (title +
 * subtitle) at the top of the screen, rendered by ClearanceShell -
 * not by the individual activity component. This gives the journey
 * a continuous narrative feel and avoids each screen inventing its
 * own header treatment.
 */
export interface ClearanceActivityRef {
  id: string;
  /** Short label used in the progress strip. */
  label: string;
  screen: GameScreen;
  /** Heading shown at the top of the activity. */
  title: string;
  /** One-line "what you'll do here" instruction shown beneath the title. */
  subtitle: string;
}

export const clearanceActivities: ClearanceActivityRef[] = [
  {
    id: 'market-select',
    label: 'Market',
    screen: 'l0-market-select',
    title: 'Pick your parity regime',
    subtitle:
      'The regime you operate in dictates what you can and cannot say to a partner. Pick yours to set the rules of engagement.',
  },
  {
    id: 'character-build',
    label: 'Character',
    screen: 'l0-character-build',
    title: 'Build your character',
    subtitle:
      "This is your starting point in the sim, who you are on day one. Pick the avatar you identify with and the super power you naturally lean into today. Everyone has equal potential to succeed.",
  },
  {
    id: 'gm-chat',
    label: 'Day one',
    screen: 'l0-gm-chat',
    title: 'Day one with Alex',
    subtitle:
      "Alex will check you've got the basics down before you meet a real partner.",
  },
  {
    id: 'data-insights',
    label: 'Data & Insights',
    screen: 'l0-dashboard-hotspot',
    title: 'Read the data',
    subtitle:
      "A partial view of what you'd typically see across our pricing tools. Spotting where attention is needed is a critical skill.",
  },
  {
    id: 'email-audit',
    label: 'Call Audit',
    screen: 'l0-email-audit',
    title: "Audit Sam's call transcript",
    subtitle:
      'A colleague has shared the Zoom AI transcript of a recent call with a partner. Click each highlighted phrase and judge whether it was safe to say.',
  },
  {
    id: 'mini-scenarios',
    label: 'Scenarios',
    screen: 'l0-mini-scenarios',
    title: 'Four quick case files',
    subtitle:
      "Four short scenarios drawn from real situations. For each one, walk the signal, diagnose the cause, land the right narrative, and pick the next step. You'll practise the diagnostic pattern in variety before you meet the framework by name in the next activity.",
  },
  {
    id: 'issue-tree',
    label: 'Diagnose',
    screen: 'l0-issue-tree-reveal',
    title: 'Using the Pricing Diagnostic Flow',
    subtitle:
      "A change of pace: this one's a walkthrough, not a check. Your manager will have introduced you to the Pricing Diagnostic Flow in your briefing. Here's a quick recap of the seven steps on a worked example, so you're set to use it in the sim.",
  },
  {
    id: 'summary',
    label: 'Summary',
    screen: 'l0-clearance-summary',
    title: 'Your clearance',
    subtitle:
      'How you did across the activities. You need 80% or higher to clear and take on a real partner.',
  },
];

/** Index in clearanceActivities for the given screen, or -1 if not part of clearance. */
export function clearanceIndexOf(screen: GameScreen): number {
  return clearanceActivities.findIndex((a) => a.screen === screen);
}

/** Find the full activity ref for the given screen, or null. */
export function clearanceActivityFor(screen: GameScreen): ClearanceActivityRef | null {
  return clearanceActivities.find((a) => a.screen === screen) ?? null;
}
