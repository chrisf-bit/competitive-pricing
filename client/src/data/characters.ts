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
  /**
   * Optional CSS transform scale for the avatar img. Useful when one
   * illustration is rendered larger than the rest at the same tile
   * size (e.g. Marcus is framed closer up than the others); a value
   * like 0.9 shrinks the image so its apparent size matches the row.
   */
  scale?: number;
  /**
   * Optional vertical translate, expressed as a percentage of the
   * tile height (positive = down, negative = up). Used to fine-tune
   * the head position when scale alone doesn't get the centre line
   * matching the rest of the row.
   */
  translateY?: number;
  /**
   * Optional CSS object-fit override. Default is 'cover' (fills
   * the tile and crops as needed). Use 'contain' for an avatar
   * whose source image isn't quite square - cover would chop the
   * hair flat, contain shows the full illustration with bgColor
   * around it instead.
   */
  objectFit?: 'cover' | 'contain';
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
  { id: 'avatar-marcus', label: 'Marcus', dataUri: marcusImg, bgColor: '#93c5fd' },
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
  /**
   * Subtle gameplay effects tied to the persona. Drives the
   * insight/blind-spot card on Partner Detail and the post-round
   * retrospective on the Conversation Report + Debrief.
   *
   * Authoring rule: chip labels and retro lines are persona-fixed
   * (same string every round). Partner-specific hint content lives
   * in data/personaHints.ts and is keyed by persona x partner x round.
   */
  powerEffect: {
    /** Short label on the unlocked card (e.g. "Architect insight"). */
    unlockedChip: string;
    /** Short label on the dimmed/collapsed card (e.g. "Architect blind spot"). */
    mutedChip: string;
    /** Shown on the Conversation Report when the round earned >= 2 stars. */
    retroOnWin: string;
    /** Shown on the Conversation Report when the round earned 0 stars. */
    retroOnLoss: string;
    /** Coaching tail on the Debrief aggregate block. */
    aggregateCoaching: string;
  };
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
        detail: 'Can burn time harmonising instead of deciding.',
      },
      {
        headline: 'Less data-oriented',
        detail: 'May rely too heavily on conversation and instinct over analytical evidence.',
      },
    ],
    accent: 'green',
    icon: MessageCircle,
    powerEffect: {
      unlockedChip: 'Architect insight',
      mutedChip: 'Architect blind spot',
      retroOnWin:
        'Your Architect lens built trust quickly; the partner heard you out and the diagnosis landed.',
      retroOnLoss:
        'Your Architect lens kept things harmonious, but a sharper data lead would have surfaced the root cause faster. The trade-off hurt you a little here.',
      aggregateCoaching:
        'Next playthrough, push past the rapport when the numbers ask for it.',
    },
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
          'Can focus too much on beating resistance than finding root causes.',
      },
      {
        headline: 'Can push conversations too quickly',
        detail:
          'Can jump to solution before understanding the issue.',
      },
    ],
    accent: 'red',
    icon: Shield,
    powerEffect: {
      unlockedChip: 'Navigator insight',
      mutedChip: 'Navigator blind spot',
      retroOnWin:
        'Your Navigator lens held momentum through resistance; you got to the pitch cleanly.',
      retroOnLoss:
        'Your Navigator lens pushed ahead before fully understanding the issue. Watch for that next round.',
      aggregateCoaching:
        'Next playthrough, slow down for one more diagnostic question before pitching.',
    },
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
        headline: 'Can oversimplify things',
        detail: 'Can remove important details.',
      },
      {
        headline: 'Relies on strong inputs',
        detail: 'Can struggle when data or signals are weak.',
      },
    ],
    accent: 'yellow',
    icon: Sparkles,
    powerEffect: {
      unlockedChip: 'Storyteller insight',
      mutedChip: 'Storyteller blind spot',
      retroOnWin:
        'Your Storyteller lens turned the data into a clear story; the partner could see the picture.',
      retroOnLoss:
        "Your Storyteller lens simplified too far this time. There was a detail you couldn't afford to lose.",
      aggregateCoaching:
        'Next playthrough, leave the supporting detail in when it changes the story.',
    },
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
        headline: 'Can overcomplicate conversations',
        detail: 'Can overwhelm people with details.',
      },
      {
        headline: 'Can miss emotional signals',
        detail: 'Can focus on metrics over relationships.',
      },
    ],
    accent: 'blue',
    icon: Search,
    powerEffect: {
      unlockedChip: 'Detective insight',
      mutedChip: 'Detective blind spot',
      retroOnWin:
        'Your Detective lens caught the anomaly fast; the diagnosis was airtight.',
      retroOnLoss:
        "Your Detective lens stayed in the numbers; the partner's style cues were the missing piece this round.",
      aggregateCoaching:
        'Next playthrough, look up from the dashboard for the partner\'s style signals.',
    },
  },
];

export function getPersonaById(id: string | null): SuperPowerPersona | null {
  if (!id) return null;
  return superPowerPersonas.find((p) => p.id === id) ?? null;
}
