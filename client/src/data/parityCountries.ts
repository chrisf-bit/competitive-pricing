import type { ParityRegime } from '../types';

/**
 * Country -> parity regime mapping. Single source of truth for the sim.
 * Confirmed by Chris 2026-05-08.
 *
 * Wide is the default (rest-of-world) so we list only the non-Wide
 * countries explicitly.
 */

export const NO_PARITY_COUNTRIES: readonly string[] = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Ireland',
  'Italy',
  'Latvia',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Russian Federation',
  'Switzerland',
  'South Africa',
  'Chile',
];

export const NARROW_PARITY_COUNTRIES: readonly string[] = [
  'Armenia',
  'Georgia',
  'Israel',
  'Turkey',
  'United Kingdom',
  'Australia',
  'China',
  'Hong Kong',
  'Japan',
  'New Zealand',
  'South Korea',
  'Brazil',
];

/** Resolve a country name to its parity regime. Returns 'wide' as the default. */
export function getParityRegimeForCountry(country: string): ParityRegime {
  if (NO_PARITY_COUNTRIES.includes(country)) return 'none';
  if (NARROW_PARITY_COUNTRIES.includes(country)) return 'narrow';
  return 'wide';
}
