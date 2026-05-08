import type { GameScreen } from '../types';

/**
 * The clearance journey, in order. Single source of truth for the
 * progress strip rendered on every clearance screen.
 */
export interface ClearanceActivityRef {
  id: string;
  label: string;
  screen: GameScreen;
}

export const clearanceActivities: ClearanceActivityRef[] = [
  { id: 'market-select', label: 'Market', screen: 'l0-market-select' },
  { id: 'character-build', label: 'Character', screen: 'l0-character-build' },
  { id: 'gm-chat', label: 'Day one', screen: 'l0-gm-chat' },
  { id: 'data-insights', label: 'Data & Insights', screen: 'l0-dashboard-hotspot' },
  { id: 'email-audit', label: 'Email Audit', screen: 'l0-email-audit' },
  { id: 'issue-tree', label: 'Diagnose', screen: 'l0-issue-tree-reveal' },
  { id: 'summary', label: 'Summary', screen: 'l0-clearance-summary' },
];

/** Index in clearanceActivities for the given screen, or -1 if not part of clearance. */
export function clearanceIndexOf(screen: GameScreen): number {
  return clearanceActivities.findIndex((a) => a.screen === screen);
}
