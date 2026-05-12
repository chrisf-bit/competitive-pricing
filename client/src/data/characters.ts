import type { LucideIcon } from 'lucide-react';
import { MessageCircle, Shield, Sparkles, Search } from 'lucide-react';

import avaImg from '../assets/avatars/ava.webp';
import sofiaImg from '../assets/avatars/sofia.webp';
import mayaImg from '../assets/avatars/maya.webp';
import zaraImg from '../assets/avatars/zara.webp';
import felixImg from '../assets/avatars/felix.webp';
import noahImg from '../assets/avatars/noah.webp';
import marcusImg from '../assets/avatars/marcus.webp';
import rajImg from '../assets/avatars/raj.webp';

/**
 * Character library for the Build Your Character screen.
 *
 * Two independent picks:
 *   - Avatar (visual identity, 8 hand-illustrated PNGs, 4 femme + 4 masc)
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
  /**
   * Imported image URL (resolved by the bundler). The previous
   * DiceBear seed has been dropped now that we use static assets;
   * keeping the field name dataUri so consumers don't need updating.
   */
  dataUri: string;
  /**
   * Soft-pastel tile background tuned to suit each illustration's
   * palette. Used by the character-pick grid (and any other surface
   * that frames the avatar). Each avatar gets its own colour so the
   * row reads as a varied set rather than a uniform wall of tiles.
   */
  bgColor: string;
  /**
   * Optional CSS object-position for the avatar img element. Most
   * illustrations sit fine at the default 'center', but some PNGs
   * have the character framed higher in the source and lose hair to
   * objectFit: 'cover' cropping. Setting this to e.g. 'center top'
   * anchors the top of the image and crops from the bottom instead.
   */
  objectPosition?: string;
}

/**
 * 8 curated hand-illustrated avatars. Files live under
 * src/assets/avatars/ and are imported as static URLs - swap any image
 * by replacing the file on disk (same name) or updating the import.
 *
 * IDs are stable across the DiceBear migration so any saved
 * learnerProfile.avatarId values continue to resolve.
 *
 * Background colours are picked to complement each illustration's
 * dominant accents without clashing - warm yellows / oranges for the
 * sunlit set, cooler blues / violets for the rest.
 */
export const characterAvatars: CharacterAvatar[] = [
  // Femme-presenting cluster
  { id: 'avatar-ava', label: 'Ava', dataUri: avaImg, bgColor: '#fde68a' },
  { id: 'avatar-sofia', label: 'Sofia', dataUri: sofiaImg, bgColor: '#fdba74' },
  { id: 'avatar-maya', label: 'Maya', dataUri: mayaImg, bgColor: '#fca5a5' },
  { id: 'avatar-zara', label: 'Zara', dataUri: zaraImg, bgColor: '#c4b5fd' },
  // Masc-presenting cluster
  { id: 'avatar-felix', label: 'Felix', dataUri: felixImg, bgColor: '#fef3c7' },
  { id: 'avatar-noah', label: 'Noah', dataUri: noahImg, bgColor: '#bae6fd' },
  {
    id: 'avatar-marcus',
    label: 'Marcus',
    dataUri: marcusImg,
    bgColor: '#93c5fd',
    // Marcus's PNG is framed slightly higher than the others. Pure
    // 'center top' cropped his shoulders off; 'center 25%' is a
    // softer top-anchor that keeps his hair AND his collar in frame.
    objectPosition: 'center 25%',
  },
  { id: 'avatar-raj', label: 'Raj', dataUri: rajImg, bgColor: '#fcd34d' },
];

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
