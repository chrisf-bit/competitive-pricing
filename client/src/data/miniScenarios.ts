/**
 * Warm Up (mini-scenarios) activity content.
 *
 * A single case file inserted into clearance between Call Audit and the
 * Pricing Pathway reveal, walking a mini-version of the Pricing Pathway
 * (Signal, Diagnose, Narrative, Next step). Purpose: exercise the
 * diagnostic pattern once BEFORE Alex formalises it as the seven-step
 * framework in the reveal that follows.
 *
 * REGIME-SPECIFIC (2026-09-29, Matthias / SME): the activity was
 * originally four regime-neutral case files. It is now ONE case file -
 * Coastal View Resort, "The Mobile and App Gap" - tailored to the
 * learner's selected parity regime (Wide / Narrow / No Parity), keyed
 * like the Call Audit. `getMiniScenarios(regime)` returns the right
 * variant; null / cross-regional fall back to the No-Parity variant (the
 * strictest / most compliance-conservative). Copy transcribed from the
 * SME "Warm Up (Clearance Activity) - Content Extract" doc, normalized
 * to American English + plain hyphens + straight quotes (CLAUDE.md rule).
 *
 * Each step is scored independently and emits a KnowledgeCheckResult.
 * itemIds are `mini-scenario-{scenarioId}-{stepId}` (scenarioId is
 * 'mobile-gap' across all three regimes, so the Clearance Summary retry
 * path and item matcher are regime-agnostic - the learner only ever sees
 * their own regime's variant).
 */

import type { ParityRegime } from '../types';

export type MiniScenarioTheme = 'brand-gap' | 'mobile-gap' | 'genius-offset' | 'family-undercut';

export interface MiniScenarioOption {
  id: 'A' | 'B' | 'C';
  text: string;
  /** Optional short coaching note shown after the pick reveals. */
  rationale?: string;
}

export interface MiniScenarioStep {
  /** Step id, unique within its scenario. Part of the KC itemId. */
  id: 'signal' | 'diagnose' | 'narrative' | 'next-step';
  /** Short label for the step-dot indicator. */
  label: string;
  /**
   * Bulleted context ("Show:" in the SME doc). Rendered as a subtle
   * "From the data" card at the top of the step. Optional - some
   * steps have no upfront bullets, only a prompt.
   */
  showBullets?: string[];
  /**
   * Extra narrative context beyond the bullets - e.g. "The partner
   * says: ...". Rendered above the prompt.
   */
  contextNote?: string;
  prompt: string;
  options: MiniScenarioOption[];
  correctOptionId: 'A' | 'B' | 'C';
  /** Coaching line shown on correct pick. Optional. */
  correctCoaching?: string;
}

export interface MiniScenario {
  id: string;
  /** Invented property name shown on the case-file cover. */
  propertyName: string;
  /** Short scenario title, e.g. "The Brand.com channel gap". */
  scenarioTitle: string;
  /** Player-facing objective line shown beneath the title. */
  objective: string;
  /**
   * Optional explicit market-regime label shown on the case-file cover.
   * Set ONLY for the Cross-Regional (KAM) variant, whose learner has no
   * single selected regime and therefore needs to be told which parity
   * rules apply to answer correctly. The three standard regime variants
   * leave it unset - those learners picked their regime at Market Select.
   */
  marketLabel?: string;
  /** Visual theme - drives cover-card gradient + icon selection. */
  theme: MiniScenarioTheme;
  /**
   * Property hero photo id, resolved to a bundled WebP at render via
   * resolvePropertyImage(). Reuses Coastal View's existing image.
   */
  heroImage: string;
  steps: MiniScenarioStep[];
  goodOutcome: string;
  badOutcome: string;
}

// ─────────────────────────────────────────────────────────────────────
// Coastal View Resort - "The Mobile and App Gap" - one variant per
// parity regime. The signal, diagnosis and fix are the same device-
// specific mobile-setup gap; only the compliance framing of what the AM
// may reference (other OTAs vs Brand.com-only vs neither, proactively)
// changes by regime.
// ─────────────────────────────────────────────────────────────────────

const COASTAL_VIEW_IMAGE = 'photo-1571896349842';

// ── No Parity ──
const coastalViewNone: MiniScenario = {
  id: 'mobile-gap',
  propertyName: 'Coastal View Resort',
  scenarioTitle: 'The mobile and app gap',
  objective:
    'Identify that the issue is device-specific, diagnose the likely setup gap, and propose a targeted mobile solution without sounding forceful.',
  theme: 'mobile-gap',
  heroImage: COASTAL_VIEW_IMAGE,
  steps: [
    {
      id: 'signal',
      label: 'Signal',
      showBullets: [
        "The RPD Scenarios dashboard shows the partner is consistently cheaper on a competitor's app.",
        'Mobile competitiveness is weaker than on desktop.',
      ],
      prompt: 'What is the best interpretation of this signal?',
      options: [
        {
          id: 'A',
          text: 'The partner needs to lower all their public prices straight away to compete on both mobile and desktop across the platform.',
        },
        {
          id: 'B',
          text: 'The partner is probably losing demand overall because their review score or property content is holding them back rather than pricing on any specific device.',
        },
        {
          id: 'C',
          text: 'The issue may be specific to mobile setup or device-level restrictions.',
        },
      ],
      correctOptionId: 'C',
      correctCoaching:
        'A device-specific pattern points to a device-specific root cause, not a broad pricing problem.',
    },
    {
      id: 'diagnose',
      label: 'Diagnose',
      contextNote:
        'The partner says: "We haven\'t really reviewed our mobile setup recently."',
      prompt: 'What should you do next?',
      options: [
        {
          id: 'A',
          text: 'Check whether mobile rates are missing or whether device-specific restrictions are misaligned.',
        },
        {
          id: 'B',
          text: 'Explain to the partner that competitor pricing on other apps is not something they should worry about and refocus the conversation on their overall Booking.com performance.',
        },
        {
          id: 'C',
          text: "Ask the partner to match the competitor's app price across all their channels so they stay competitive with what mobile travelers are seeing elsewhere.",
        },
      ],
      correctOptionId: 'A',
      correctCoaching:
        'The partner has told you the setup has not been reviewed. Investigate that setup before anything else.',
    },
    {
      id: 'narrative',
      label: 'Narrative',
      prompt: 'Which response is strongest?',
      options: [
        {
          id: 'A',
          text: '"If you are not cheaper on mobile Booking.com will end up ranking you lower, so we need to make sure you are matching or beating what people are seeing on other apps to protect your visibility."',
        },
        {
          id: 'B',
          text: '"On mobile searches, your property is currently less attractive than peers, so you may be missing mobile demand. If you want, we can review whether a mobile rate would help you compete better for that audience."',
        },
        {
          id: 'C',
          text: '"You should run a broad public discount that everyone sees, because that is the simplest way to make sure your mobile pricing is competitive across every device and audience type."',
        },
      ],
      correctOptionId: 'B',
      correctCoaching:
        'Explain the audience impact factually, then offer a targeted option. No threats and no over-broad ask.',
    },
    {
      id: 'next-step',
      label: 'Next step',
      prompt: 'What is the best next action?',
      options: [
        {
          id: 'A',
          text: 'Recommend the partner set up a broad discount that applies to every channel and audience so the price gap disappears in one move rather than in stages.',
        },
        {
          id: 'B',
          text: 'Share what you have found about the mobile gap, thank the partner for their time, and let them decide entirely on their own whether any follow-up is worth pursuing.',
        },
        {
          id: 'C',
          text: 'Offer to review mobile setup and, if the partner wants, activate a targeted mobile rate for that audience.',
        },
      ],
      correctOptionId: 'C',
      correctCoaching:
        'The action matches the diagnosis: fix the mobile setup, offer a mobile-specific rate. Nothing broader than the evidence supports.',
    },
  ],
  goodOutcome:
    'You diagnosed a device-specific competitiveness gap correctly, kept the conversation targeted, and proposed a mobile-rate action that the partner can choose voluntarily.',
  badOutcome:
    'You treated a mobile gap like a full pricing problem, skipped diagnosis, and pushed a broader price action than the evidence supported.',
};

// ── Wide Parity ──
const coastalViewWide: MiniScenario = {
  id: 'mobile-gap',
  propertyName: 'Coastal View Resort',
  scenarioTitle: 'The mobile and app gap',
  objective:
    'Identify that the issue is device-specific, diagnose the likely setup gap, and propose a targeted mobile solution using cross-channel data to support your case.',
  theme: 'mobile-gap',
  heroImage: COASTAL_VIEW_IMAGE,
  steps: [
    {
      id: 'signal',
      label: 'Signal',
      showBullets: [
        "The RPD Scenarios dashboard shows the partner is consistently cheaper on a competitor's app.",
        'Mobile competitiveness is weaker than on desktop.',
      ],
      prompt: 'What is the best interpretation of this signal?',
      options: [
        {
          id: 'A',
          text: 'The partner needs to lower all their public prices straight away to compete on both mobile and desktop across the platform.',
        },
        {
          id: 'B',
          text: 'The partner is probably losing demand overall because their review score or property content is holding them back rather than pricing on any specific device.',
        },
        {
          id: 'C',
          text: 'The issue may be specific to mobile setup or device-level restrictions. The cross-channel data confirms the gap is concentrated on mobile, not across all devices.',
        },
      ],
      correctOptionId: 'C',
      correctCoaching:
        'A device-specific pattern points to a device-specific root cause. In a Wide Parity market, you can use the cross-channel RPD data to illustrate the gap directly, but the diagnosis should still be targeted, not broad.',
    },
    {
      id: 'diagnose',
      label: 'Diagnose',
      contextNote:
        'The partner says: "We haven\'t really reviewed our mobile setup recently."',
      prompt: 'What should you do next?',
      options: [
        {
          id: 'A',
          text: 'Check whether mobile rates are missing or whether device-specific restrictions are misaligned, and use the RPD data to show the partner exactly where the gap sits versus the Key OTA on mobile and ask the partner for the same rates and conditions on Booking.com.',
        },
        {
          id: 'B',
          text: "Tell the partner they need to match the competitor's app price immediately, since in this market you can ask for alignment with both Brand.com and Key OTAs.",
        },
        {
          id: 'C',
          text: 'Suggest the partner lowers their base rate across all channels so the mobile gap closes automatically without needing to review any device-specific settings.',
        },
      ],
      correctOptionId: 'A',
      correctCoaching:
        'Even in a Wide Parity market where you can reference cross-channel data openly, the right move is still to diagnose the setup gap first. Use the data to support your analysis, not to skip it.',
    },
    {
      id: 'narrative',
      label: 'Narrative',
      prompt: 'Which response is strongest?',
      options: [
        {
          id: 'A',
          text: '"Your mobile prices are higher than both your own website and the Key OTA. You need to bring your rates down across the board so we can ensure you\'re competitive on every device and every channel at the same time."',
        },
        {
          id: 'B',
          text: '"On mobile searches, we can see from the price data that your property is less competitive than the Key OTA. This often also points to a gap versus your own website on mobile. If we review your mobile rate setup together, we can close that gap for a specific audience without changing your overall pricing."',
        },
        {
          id: 'C',
          text: '"The competitor\'s app is undercutting you, so the fastest fix is to set your Booking.com price below theirs across all devices, that way you win the mobile search and the desktop search at the same time."',
        },
      ],
      correctOptionId: 'B',
      correctCoaching:
        'In a Wide Parity market, you can name both Brand.com and the Key OTA and reference the data directly. But the recommendation should still be targeted to the diagnosed gap, not a blanket price cut.',
    },
    {
      id: 'next-step',
      label: 'Next step',
      prompt: 'What is the best next action?',
      options: [
        {
          id: 'A',
          text: "Ask the partner to match or beat the Key OTA's mobile price across all channels and devices to eliminate the gap completely.",
        },
        {
          id: 'B',
          text: 'Share the cross-channel RPD data with the partner and leave it entirely up to them whether they want to follow up or not.',
        },
        {
          id: 'C',
          text: 'Offer to review mobile setup together, share the data and scenario screenshot showing the price gap versus the Key OTA, and if the partner agrees, activate a targeted mobile rate for that audience.',
        },
      ],
      correctOptionId: 'C',
      correctCoaching:
        'The action matches the diagnosis. You can share cross-channel evidence openly, but the fix stays targeted: review the mobile setup and offer a mobile-specific rate. Nothing broader than the evidence supports.',
    },
  ],
  goodOutcome:
    'You used cross-channel data to diagnose a device-specific gap, kept the ask proportionate, and proposed a targeted action the partner can agree to.',
  badOutcome:
    'You used the data to justify a broad price cut across all channels, or skipped the mobile diagnosis because you had the authority to reference external prices.',
};

// ── Narrow Parity ──
const coastalViewNarrow: MiniScenario = {
  id: 'mobile-gap',
  propertyName: 'Coastal View Resort',
  scenarioTitle: 'The mobile and app gap',
  objective:
    'Identify that the issue is device-specific, diagnose the likely setup gap, and propose a targeted mobile solution while staying within Narrow Parity boundaries - Brand.com only.',
  theme: 'mobile-gap',
  heroImage: COASTAL_VIEW_IMAGE,
  steps: [
    {
      id: 'signal',
      label: 'Signal',
      showBullets: [
        "The RPD Scenarios dashboard shows the partner's mobile prices are less competitive compared to their own website.",
        'Mobile competitiveness is weaker than on desktop.',
      ],
      prompt: 'What is the best interpretation of this signal?',
      options: [
        {
          id: 'A',
          text: 'The partner needs to lower all their public prices straight away to compete on both mobile and desktop across the platform.',
        },
        {
          id: 'B',
          text: 'The partner is probably losing demand overall because their review score or property content is holding them back rather than pricing on any specific device.',
        },
        {
          id: 'C',
          text: 'The issue may be specific to mobile setup or device-level restrictions. The gap versus Brand.com on mobile points to a setup issue, not a broad pricing problem.',
        },
      ],
      correctOptionId: 'C',
      correctCoaching:
        'A device-specific pattern points to a device-specific root cause. In a Narrow Parity market, you can reference the gap versus Brand.com, but not versus other OTAs.',
    },
    {
      id: 'diagnose',
      label: 'Diagnose',
      contextNote:
        'The partner says: "We haven\'t really reviewed our mobile setup recently."',
      prompt: 'What should you do next?',
      options: [
        {
          id: 'A',
          text: 'Check whether mobile rates are missing or whether device-specific restrictions are misaligned, and use the RPD data to show the partner where the gap sits versus their own website on mobile.',
        },
        {
          id: 'B',
          text: "Point out that the partner's prices on mobile are also higher than the Key OTA's app, and ask them to align with both their direct site and the competitor.",
        },
        {
          id: 'C',
          text: 'Suggest the partner lowers their base rate across all channels so the mobile gap closes automatically without needing to review any device-specific settings.',
        },
      ],
      correctOptionId: 'A',
      correctCoaching:
        "In a Narrow Parity market, you can discuss the gap versus Brand.com but not versus other OTAs. Referencing the Key OTA's app pricing is out of scope, keep the diagnosis focused on the Brand.com mobile gap.",
    },
    {
      id: 'narrative',
      label: 'Narrative',
      prompt: 'Which response is strongest?',
      options: [
        {
          id: 'A',
          text: '"Your mobile prices are higher than both your direct site and the Key OTA, we need you to align with both to stay competitive on every channel."',
        },
        {
          id: 'B',
          text: '"On mobile searches, your property is currently less competitive than your own direct website. To capture demand there, we ask you to offer the same rates and conditions as on your direct site. If we review your mobile rate setup together, we can help you align with your Brand.com pricing for that audience without changing your overall rate structure."',
        },
        {
          id: 'C',
          text: '"The competitor\'s app is undercutting you on mobile, so you should match their price on our platform to make sure you don\'t lose that demand to them."',
        },
      ],
      correctOptionId: 'B',
      correctCoaching:
        'In Narrow Parity, you can ask for the same rates and conditions as on Brand.com. You cannot ask for alignment with other OTAs or third parties. Keep the conversation focused on aligning with their own website.',
    },
    {
      id: 'next-step',
      label: 'Next step',
      prompt: 'What is the best next action?',
      options: [
        {
          id: 'A',
          text: 'Ask the partner to align their mobile prices with both their website and the Key OTA to close the gap completely.',
        },
        {
          id: 'B',
          text: "Share what you've found about the Brand.com mobile gap, thank the partner, and leave it entirely up to them.",
        },
        {
          id: 'C',
          text: 'Offer to review mobile setup together, share the price data and scenario screenshots showing the gap versus Brand.com on mobile, and if the partner agrees, activate a targeted mobile rate to align with their direct website pricing.',
        },
      ],
      correctOptionId: 'C',
      correctCoaching:
        'The action stays within Narrow Parity: reference Brand.com, propose alignment with the partner\'s own website, and keep the fix targeted to where relevant, such as mobile here. No mention of other OTAs in the ask.',
    },
  ],
  goodOutcome:
    'You diagnosed a device-specific gap, kept the conversation within Narrow Parity rules (Brand.com only), and proposed a targeted mobile-rate action.',
  badOutcome:
    'You referenced competitor OTA pricing in your pitch, asked for alignment beyond Brand.com, or pushed a broad price change instead of a mobile-specific fix.',
};

// Cross-Regional (KAM) uses the No-Parity case file, but the learner has
// no single selected regime, so the cover must spell out that this partner
// is in a No-Parity market - otherwise they can't know which rules apply.
// Identical content to coastalViewNone otherwise.
const coastalViewCrossRegional: MiniScenario = {
  ...coastalViewNone,
  marketLabel: 'No Parity market',
};

/**
 * The Warm Up case file per parity regime. One scenario each; the
 * learner only ever runs the variant for their selected market.
 */
export const miniScenariosByRegime: Record<'wide' | 'narrow' | 'none', MiniScenario[]> = {
  wide: [coastalViewWide],
  narrow: [coastalViewNarrow],
  none: [coastalViewNone],
};

/**
 * Resolve the Warm Up case file(s) for a regime. Mirrors the Call
 * Audit's getEmailAudit: null defaults to No Parity. Cross-Regional (KAM)
 * uses the No-Parity content but with an explicit "No Parity market"
 * label, since a KAM learner has no single selected regime.
 */
export function getMiniScenarios(
  regime: ParityRegime | null | undefined,
): MiniScenario[] {
  if (regime === 'cross-regional') return [coastalViewCrossRegional];
  if (!regime) return miniScenariosByRegime.none;
  return miniScenariosByRegime[regime] ?? miniScenariosByRegime.none;
}

/** Total scored KC items for a regime (one scenario x its step count). */
export function getMiniScenarioTotalItems(
  regime: ParityRegime | null | undefined,
): number {
  return getMiniScenarios(regime).reduce((acc, s) => acc + s.steps.length, 0);
}

/** Build the stable KC itemId for a given scenario+step. */
export function miniScenarioItemId(scenarioId: string, stepId: string): string {
  return `mini-scenario-${scenarioId}-${stepId}`;
}
