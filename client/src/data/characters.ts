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
 * Super powers are flavor-only for MVP - they surface in the GM intro
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
   * that frames the avatar). Each avatar gets its own color so the
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
   * the head position when scale alone doesn't get the center line
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
 * Background colors are picked to complement each illustration's
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
  // Marcus sits high in his 2:3 canvas, so a centred square crop clips
  // his hair - anchor the crop to the top to keep his full head in frame.
  { id: 'avatar-marcus', label: 'Marcus', dataUri: marcusImg, bgColor: '#93c5fd', objectPosition: 'center top' },
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
  succeedsBy: string;
  winsBy: string[];
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
  /**
   * Concrete, learner-facing description of what the persona does
   * during play. Rendered on the Character Build card so the pick
   * doesn't feel like pure flavor. One line, present tense, names
   * the actual UI effect (which chip, which highlight) so the
   * learner knows what to expect. Kept honest to what ships - if
   * you build a new persona effect, update this string first.
   */
  inGameImpact: string;
}

export const superPowerPersonas: SuperPowerPersona[] = [
  {
    id: 'conversation-architect',
    name: 'The Conversation Architect',
    superPower: 'Questioning & Listening',
    succeedsBy: 'Succeeds by uncovering what others miss.',
    winsBy: [
      'uncovering the real commercial challenge',
      'building trust',
      'asking the right questions at the right time',
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
    inGameImpact:
      'On each partner, a one-line coaching banner tells you how to approach the conversation.',
  },
  {
    id: 'objection-navigator',
    name: 'The Objection Navigator',
    superPower: 'Handling Objections',
    succeedsBy: 'Succeeds by turning resistance into progress.',
    winsBy: [
      'staying calm under pressure',
      'navigating resistance effectively',
      'maintaining momentum during difficult discussions',
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
    inGameImpact:
      'On each partner, a one-line banner flags the pushback most likely to derail the call.',
  },
  {
    id: 'storyteller',
    name: 'The Storyteller',
    superPower: 'Storytelling Using Data',
    succeedsBy: 'Succeeds by making insight easy to understand and impossible to ignore.',
    winsBy: [
      'translating complexity into clarity',
      'helping stakeholders understand value',
      'turning insight into action through storytelling',
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
    inGameImpact:
      'On each partner, a one-line banner retells the numbers as the story they add up to.',
  },
  {
    id: 'data-detective',
    name: 'The Data Detective',
    superPower: 'Data Analysis',
    succeedsBy: 'Succeeds by finding the evidence others overlook.',
    winsBy: [
      'uncovering insight faster',
      'validating recommendations with data',
      'reducing commercial risk through precision',
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
    inGameImpact:
      'On each partner, a one-line banner calls out the biggest metric anomaly hiding in the data.',
  },
];

export function getPersonaById(id: string | null): SuperPowerPersona | null {
  if (!id) return null;
  return superPowerPersonas.find((p) => p.id === id) ?? null;
}
