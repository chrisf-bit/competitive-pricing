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
      'Pick an avatar (visual identity only) and the super power you\'ll naturally lean into. Everyone has equal potential to succeed.',
  },
  {
    id: 'gm-chat',
    label: 'Day one',
    screen: 'l0-gm-chat',
    title: 'Day one with Alex',
    subtitle:
      'Alex will check you\'ve got the basics down before you meet a real partner. Five quick questions on the data side of pricing.',
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
    label: 'Email Audit',
    screen: 'l0-email-audit',
    title: 'Audit Sam\'s draft email',
    subtitle:
      'A colleague has asked you to sense-check a draft email. Click each highlighted phrase and judge whether it\'s safe to send.',
  },
  {
    id: 'issue-tree',
    label: 'Diagnose',
    screen: 'l0-issue-tree-reveal',
    title: 'Diagnosing pricing issues',
    subtitle:
      'Every partner conversation follows the same arc. Click each step to walk through how Alex would diagnose a pricing problem.',
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
