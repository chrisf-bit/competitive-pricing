import { createAvatar } from '@dicebear/core';
import { personas } from '@dicebear/collection';
import type { LucideIcon } from 'lucide-react';
import { MessageCircle, Shield, Sparkles, Search } from 'lucide-react';

/**
 * Character library for the Build Your Character screen.
 *
 * Two independent picks:
 *   - Avatar (visual identity, 8 curated DiceBear seeds, 4 femme + 4 masc)
 *   - Super Power persona (one of 4, content sourced from the persona PDF)
 *
 * Super powers are flavour-only for MVP - they surface in the GM intro
 * and the debrief, but do not affect scoring. Mechanic differentiation
 * is post-MVP.
 */

// ───────────────────────── Avatars ─────────────────────────

export interface CharacterAvatar {
  id: string;
  label: string;
  /** DiceBear seed string. Same seed produces the same avatar deterministically. */
  seed: string;
  /** Generated data URI (computed at module load). */
  dataUri: string;
}

/**
 * 8 curated DiceBear Personas avatars. Seeds are intentional - if any
 * doesn't render the way we want, swap the seed string. The style
 * (Personas) is illustrated, professional, and works well in a
 * corporate learning context.
 */
const AVATAR_SEEDS = [
  // Femme-presenting cluster
  { id: 'avatar-ava', label: 'Ava', seed: 'Ava-pricing-2026' },
  { id: 'avatar-sofia', label: 'Sofia', seed: 'Sofia-pricing-2026' },
  { id: 'avatar-maya', label: 'Maya', seed: 'Maya-pricing-2026' },
  { id: 'avatar-zara', label: 'Zara', seed: 'Zara-pricing-2026' },
  // Masc-presenting cluster
  { id: 'avatar-felix', label: 'Felix', seed: 'Felix-pricing-2026' },
  { id: 'avatar-noah', label: 'Noah', seed: 'Noah-pricing-2026' },
  { id: 'avatar-marcus', label: 'Marcus', seed: 'Marcus-pricing-2026' },
  { id: 'avatar-raj', label: 'Raj', seed: 'Raj-pricing-2026' },
];

function generateAvatar(seed: string): string {
  return createAvatar(personas, {
    seed,
    backgroundColor: ['fcd34d', '93c5fd', 'f9a8d4', 'a7f3d0', 'fdba74', 'ddd6fe'],
    backgroundType: ['solid'],
  }).toDataUri();
}

export const characterAvatars: CharacterAvatar[] = AVATAR_SEEDS.map((a) => ({
  ...a,
  dataUri: generateAvatar(a.seed),
}));

export function getAvatarById(id: string | null): CharacterAvatar | null {
  if (!id) return null;
  return characterAvatars.find((a) => a.id === id) ?? null;
}

// ───────────────────────── Super Power Personas ─────────────────────────

export interface SuperPowerPersona {
  id: string;
  name: string;
  superPower: string;
  identity: string;
  succeedsBy: string;
  strengths: string[];
  gameplayStyle: string;
  winsBy: string[];
  weaknesses: { headline: string; detail: string }[];
  /** CSS color name token used for accent (matches existing --style-* vars). */
  accent: 'green' | 'red' | 'yellow' | 'blue';
  icon: LucideIcon;
}

export const superPowerPersonas: SuperPowerPersona[] = [
  {
    id: 'conversation-architect',
    name: 'The Conversation Architect',
    superPower: 'Questioning & Listening',
    identity:
      'Excels at guiding commercial conversations through thoughtful questioning and active listening. Uncovers hidden concerns, understands partner motivations deeply, and builds trust by making partners feel heard.',
    succeedsBy: 'Succeeds by uncovering what others miss.',
    strengths: [
      'Reveals hidden partner needs and motivations',
      'Builds trust quickly through active listening',
      'Adapts questioning style to different personalities',
      'Creates stronger alignment during pricing conversations',
    ],
    gameplayStyle: 'Curious, collaborative, relationship-driven.',
    winsBy: [
      'uncovering the real commercial challenge',
      'building trust',
      'asking the right questions at the right time',
    ],
    weaknesses: [
      {
        headline: 'Avoids conflict',
        detail: 'Can spend too much time maintaining harmony instead of progressing decisions.',
      },
      {
        headline: 'Less data-oriented',
        detail: 'May rely too heavily on conversation and instinct over analytical evidence.',
      },
    ],
    accent: 'green',
    icon: MessageCircle,
  },
  {
    id: 'objection-navigator',
    name: 'The Objection Navigator',
    superPower: 'Handling Objections',
    identity:
      'Thrives when conversations become difficult. Handles pricing resistance, commercial tension, and stakeholder pushback calmly without damaging relationships or losing momentum.',
    succeedsBy: 'Succeeds by turning resistance into progress.',
    strengths: [
      'Handles pushback calmly and constructively',
      'Reframes difficult conversations positively',
      'Maintains confidence under pressure',
      'Keeps commercial discussions moving forward',
    ],
    gameplayStyle: 'Composed, resilient, confident.',
    winsBy: [
      'staying calm under pressure',
      'navigating resistance effectively',
      'maintaining momentum during difficult discussions',
    ],
    weaknesses: [
      {
        headline: 'Can become defensive',
        detail:
          'May focus too heavily on overcoming resistance instead of exploring root causes.',
      },
      {
        headline: 'Pushes conversations forward too quickly',
        detail:
          'Sometimes moves into solution mode before fully understanding the partner perspective.',
      },
    ],
    accent: 'red',
    icon: Shield,
  },
  {
    id: 'storyteller',
    name: 'The Storyteller',
    superPower: 'Storytelling Using Data',
    identity:
      'Transforms complex pricing insights into clear, compelling commercial stories. Knows how to make data meaningful, relevant, and actionable for different audiences.',
    succeedsBy: 'Succeeds by making insight easy to understand and impossible to ignore.',
    strengths: [
      'Simplifies complex commercial information clearly',
      'Connects data directly to partner priorities',
      'Communicates insights in a compelling way',
      'Creates alignment through clarity and storytelling',
    ],
    gameplayStyle: 'Clear, persuasive, communication-focused.',
    winsBy: [
      'translating complexity into clarity',
      'helping stakeholders understand value',
      'turning insight into action through storytelling',
    ],
    weaknesses: [
      {
        headline: 'Can oversimplify',
        detail: 'May remove too much detail when simplifying information.',
      },
      {
        headline: 'Relies on strong inputs',
        detail: 'Less effective when the underlying analysis or data quality is weak.',
      },
    ],
    accent: 'yellow',
    icon: Sparkles,
  },
  {
    id: 'data-detective',
    name: 'The Data Detective',
    superPower: 'Data Analysis',
    identity:
      'Thrives in complexity. Navigates dashboards, pricing metrics, and commercial data with speed and precision. Uncovers patterns hidden inside large volumes of information and transforms raw numbers into actionable insight.',
    succeedsBy: 'Succeeds by finding the evidence others overlook.',
    strengths: [
      'Identifies trends and anomalies rapidly',
      'Connects multiple datasets into meaningful insight',
      'Detects pricing gaps and margin risks',
      'Supports decisions with strong commercial evidence',
    ],
    gameplayStyle: 'Analytical, methodical, evidence-driven.',
    winsBy: [
      'uncovering insight faster',
      'validating recommendations with data',
      'reducing commercial risk through precision',
    ],
    weaknesses: [
      {
        headline: 'Overcomplicates conversations',
        detail: 'Can overwhelm others with too much detail.',
      },
      {
        headline: 'Misses emotional signals',
        detail: 'May focus on metrics instead of relationship dynamics.',
      },
    ],
    accent: 'blue',
    icon: Search,
  },
];

export function getPersonaById(id: string | null): SuperPowerPersona | null {
  if (!id) return null;
  return superPowerPersonas.find((p) => p.id === id) ?? null;
}
