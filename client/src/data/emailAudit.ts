/**
 * Email Audit content for Clearance, keyed by parity regime.
 *
 * The learner reviews a draft email written by a colleague ("Sam") and
 * judges each highlighted phrase as Safe or Unsafe. Phrases are
 * sourced from the legal compliance guidance PDF (Stay legally
 * compliant | Content writing guidance) so SMEs can audit content
 * against the source.
 *
 * Regime-specific because what counts as safe/unsafe depends on the
 * market's parity regime - e.g. asking a partner to align rates with
 * Brand.com is approved phrasing in Narrow Parity but irrelevant in
 * No Parity, where the legal team specifically forbids any "parity"
 * framing. The audit shown to a learner reflects the regime they
 * picked at Market Select, so they only ever practise against rules
 * that will apply to their day-to-day work.
 */

import type { ParityRegime } from '../types';

export interface EmailPhrase {
  id: string;
  text: string;
  /** True if the phrase is safe to send as-is. */
  isSafe: boolean;
  /**
   * Feedback shown to the learner after they answer.
   * Both branches explain the rule and reference the source.
   */
  rationale: {
    correct: string;
    incorrect: string;
  };
  /** Source citation for SME traceability. */
  source: string;
}

/**
 * Email body, tokenized for rendering. Strings are plain text; objects
 * reference a phrase from the `phrases` array, which becomes a
 * clickable token in the rendered email.
 */
export type EmailBodyToken = string | { phraseId: string };

export interface EmailAuditScenario {
  /** Framing shown above the email. */
  setupHeadline: string;
  setupBody: string;
  /** Email metadata. */
  email: {
    fromName: string;
    fromRole: string;
    toName: string;
    subject: string;
    body: EmailBodyToken[];
  };
  phrases: EmailPhrase[];
  /**
   * Optional learner-facing note rendered after the email signature.
   * Used in the No Parity scenario to flag the reactive-only rule
   * that an outbound email itself could violate - it isn't part of
   * the email body and the learner doesn't judge it; it's a closing
   * reminder that frames the whole activity.
   */
  closingNote?: string;
}

// ── Wide Parity scenario ────────────────────────────────────────────
// SME-approved Wide Parity email audit (Sam writing to Maria at
// Velvet Sky Boutique). Wide Parity permits proactively asking for
// the same rates, conditions, and availability across Brand.com AND
// other third-party OTAs. The two unsafe picks are the textbook
// Wide-Parity DON'Ts: instructing the partner to stop working with
// other OTAs / wholesalers, and promising fixed ranking rewards in
// exchange for pricing parity.
const wideParityScenario: EmailAuditScenario = {
  setupHeadline: 'Sam asked you to review a draft email before he hits send',
  setupBody:
    "Sam, an LPS colleague, has drafted an email to one of his Wide Parity partners about a recent conversion drop. He's not totally sure about all of it. Click on each highlighted phrase and judge whether it's Safe to send or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Velvet Sky Boutique, New York)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
      'Hi Maria,\n\n',
      "Following up on our recent account analysis, I wanted to highlight some strategic pricing trends we've noted for Velvet Sky Boutique.\n\n",
      { phraseId: 'p1' },
      '.\n\n',
      'Because you are currently undercutting us on these other platforms, ',
      { phraseId: 'p2' },
      '.\n\n',
      'Besides, ',
      { phraseId: 'p3' },
      '.\n\n',
      'If you clean up these public rate leaks and match our pricing today, ',
      { phraseId: 'p4' },
      '.\n\n',
      'Our platform is investing heavily in global marketing for your destination, but, of course, it is your call to ',
      { phraseId: 'p5' },
      '.\n\n',
      'Looking forward to hearing your thoughts. Happy to jump on another call if useful.\n\n',
      'Best,\nSam',
    ],
  },
  phrases: [
    {
      id: 'p1',
      text: 'Our cross-channel data shows that your public rates on Booking.com are currently higher than the pricing you provide on your direct Brand.com site as well as on other third-party OTA platforms',
      isSafe: true,
      rationale: {
        correct:
          'Right call. Compliant: Proactively using cross-channel and third-party OTA data to ask for rate alignment.',
        incorrect:
          'Actually this one is safe. Compliant: Proactively using cross-channel and third-party OTA data to ask for rate alignment.',
      },
      source: 'Legal Compliance | Wide Parity Markets | Do (verbatim)',
    },
    {
      id: 'p2',
      text: 'I strongly recommend that you completely stop working with those lower-volume wholesalers to simplify your channel distribution',
      isSafe: false,
      rationale: {
        correct:
          'Right call. [Rule Broken: Wide Parity Compliance] - recommending that a partner stops working with other OTAs or wholesalers.',
        incorrect:
          'This one is unsafe. [Rule Broken: Wide Parity Compliance] - recommending that a partner stops working with other OTAs or wholesalers.',
      },
      source: "Legal Compliance | Wide Parity Markets | Don't",
    },
    {
      id: 'p3',
      text: 'we ask that you provide our platform with the same public rates, conditions, and room availability that you distribute across these other third-party channels',
      isSafe: true,
      rationale: {
        correct:
          'Right call. Compliant: Requesting equal rates, conditions, and availability across third parties and Brand.com.',
        incorrect:
          'Actually this one is safe. Compliant: Requesting equal rates, conditions, and availability across third parties and Brand.com.',
      },
      source: 'Legal Compliance | Wide Parity Markets | Do (verbatim)',
    },
    {
      id: 'p4',
      text: 'I will personally guarantee that our algorithm elevates your property into a top-3 search ranking reward for the next 30 days',
      isSafe: false,
      rationale: {
        correct:
          'Right call. [Rule Broken: Wide Parity Compliance] - promising fixed ranking rewards, visibility upgrades, or search placement in exchange for pricing parity.',
        incorrect:
          'This one is unsafe. [Rule Broken: Wide Parity Compliance] - promising fixed ranking rewards, visibility upgrades, or search placement in exchange for pricing parity.',
      },
      source: "Legal Compliance | Wide Parity Markets | Don't",
    },
    {
      id: 'p5',
      text: 'align your base rates in order to ensure you successfully turn our traffic engine into higher net revenue',
      isSafe: true,
      rationale: {
        correct:
          'Right call. Compliant: Re-focuses the value proposition on business metrics and high on-platform discovery without threats or promises.',
        incorrect:
          'Actually this one is safe. Compliant: Re-focuses the value proposition on business metrics and high on-platform discovery without threats or promises.',
      },
      source: 'Legal Compliance | Wide Parity Markets | Do',
    },
  ],
};

// ── Narrow Parity scenario ──────────────────────────────────────────
// SME-approved Narrow Parity email audit (Sam writing to Maria).
// Narrow Parity permits asking for rate alignment with Brand.com but
// NOT for equal availability and NOT for alignment with other OTAs.
// The two unsafe picks are the textbook Narrow-Parity DON'Ts:
// asking for equal availability with the direct channel and asking
// the partner to adjust rates on third-party OTAs.
const narrowParityScenario: EmailAuditScenario = {
  setupHeadline: 'Sam asked you to review a draft email before he hits send',
  setupBody:
    "Sam, an LPS colleague, has drafted an email to one of his Narrow Parity partners about a recent conversion drop. He's not totally sure about all of it. Click on each highlighted phrase and judge whether it's Safe to send or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Crystal Water Resort, Cornwall)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
      'Hi Maria,\n\n',
      'Following our call last week, I wanted to share a few thoughts on your Q3 performance.\n\n',
      'Based on data, ',
      { phraseId: 'p1' },
      ' (Brand.com).\n\n',
      'To resolve this friction, ',
      { phraseId: 'p2' },
      '.\n\n',
      'Of course, pricing is just one lever among many affecting your performance, and ',
      { phraseId: 'p3' },
      '.\n\n',
      'Therefore, ',
      { phraseId: 'p4' },
      ', and we look forward to reviewing how targeted tools can help capture your traffic surplus.\n\n',
      'Nevertheless, we also noticed that OTAs are undercutting your price on meta-search, so ',
      { phraseId: 'p5' },
      '.\n\n',
      'Looking forward to hearing your thoughts. Happy to jump on another call if useful.\n\n',
      'Best,\nSam',
    ],
  },
  phrases: [
    {
      id: 'p1',
      text: 'your pricing on Booking.com is currently 6.60% more expensive than what you publicly offer on your direct website',
      isSafe: true,
      rationale: {
        correct:
          'Right call. Compliant: Using direct Brand.com comparison data to highlight where Booking.com is more expensive.',
        incorrect:
          'Actually this one is safe. Compliant: Using direct Brand.com comparison data to highlight where Booking.com is more expensive.',
      },
      source: 'Legal Compliance | Narrow Parity Markets | Do',
    },
    {
      id: 'p2',
      text: 'Booking.com requires you to match the exact room availability that you have opened up on your direct brand website',
      isSafe: false,
      rationale: {
        correct:
          'Right call. [Rule Broken: Narrow Parity Compliance] - asking for equal availability with direct channels is strictly forbidden.',
        incorrect:
          'This one is unsafe. [Rule Broken: Narrow Parity Compliance] - asking for equal availability with direct channels is strictly forbidden.',
      },
      source: "Legal Compliance | Narrow Parity Markets | Don't",
    },
    {
      id: 'p3',
      text: 'conversion can also be optimized through higher review scores or adding property photos',
      isSafe: true,
      rationale: {
        correct:
          'Right call. Compliant: Reaffirms that pricing is a partner choice and points to other operational elements.',
        incorrect:
          'Actually this one is safe. Compliant: Reaffirms that pricing is a partner choice and points to other operational elements.',
      },
      source: 'Legal Compliance | General Communications | Do',
    },
    {
      id: 'p4',
      text: 'you remain completely free to choose your own unique distribution strategy across the market',
      isSafe: true,
      rationale: {
        correct:
          "Right call. Compliant: explicitly states the partner's absolute freedom over their distribution mix.",
        incorrect:
          "Actually this one is safe. Compliant: explicitly states the partner's absolute freedom over their distribution mix.",
      },
      source: 'Legal Compliance | General Communications | Do (verbatim)',
    },
    {
      id: 'p5',
      text: 'we request that you adjust your rates on those external channels to re-establish market balance',
      isSafe: false,
      rationale: {
        correct:
          'Right call. [Rule Broken: Narrow Parity Compliance] - asking to adjust pricing on other third-party channels or demanding parity with other OTAs.',
        incorrect:
          'This one is unsafe. [Rule Broken: Narrow Parity Compliance] - asking to adjust pricing on other third-party channels or demanding parity with other OTAs.',
      },
      source: "Legal Compliance | Narrow Parity Markets | Don't",
    },
  ],
};

// ── No Parity scenario ──────────────────────────────────────────────
// SME-approved No Parity email audit (Sam writing to Maria).
// In No Parity the word "parity" is banned in partner-facing copy
// and cross-channel pricing is only ever raised REACTIVELY (if the
// partner brings it up first) - never as a requirement, never tied
// to ranking or visibility consequences. The closingNote flags the
// reactive-only rule explicitly so the learner sees that an
// outbound email could itself be a violation.
const noParityScenario: EmailAuditScenario = {
  setupHeadline: 'Sam asked you to review a draft email before he hits send',
  setupBody:
    "Sam, an LPS colleague, has drafted an email to one of his No Parity partners about a recent conversion drop. He's not totally sure about all of it. Click on each highlighted phrase and judge whether it's Safe to send or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Crystal Water Resort, Marbella)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
      'Hi Maria,\n\n',
      'Following up on our call the other day, you wanted to understand your pricing position across platforms. In order to do that, we noticed something worth checking.\n\n',
      'First of all, ',
      { phraseId: 'p1' },
      " - it'd be useful to understand if that's a deliberate choice on your end.\n\n",
      "We've seen your conversion trending down across the last six weeks. Looking at the wider channel mix, ",
      { phraseId: 'p2' },
      ". That should give you a cleaner read on what is and isn't working.\n\n",
      'Looking at your Brand.com strategy, as you may know, ',
      { phraseId: 'p3' },
      '.\n\n',
      'In fact, ',
      { phraseId: 'p4' },
      ", so we'd want to find a way to keep things competitive on Booking.com.\n\n",
      'Of course, ',
      { phraseId: 'p5' },
      '; this is just to share what we see in the data on our side.\n\n',
      'Looking forward to hearing your thoughts. Happy to jump on another call if useful.\n\n',
      'Best,\nSam',
    ],
  },
  phrases: [
    {
      id: 'p1',
      text: 'your prices look more attractive on a couple of other platforms - is that intentional and part of your strategy?',
      isSafe: true,
      rationale: {
        correct:
          "Right call. Compliant — You can only discuss it reactively. You can bring it up in a neutral, fact-finding way to ask if the discrepancy is intentional or unintentional.",
        incorrect:
          "Actually this one is safe. Compliant — You can only discuss it reactively. You can bring it up in a neutral, fact-finding way to ask if the discrepancy is intentional or unintentional.",
      },
      source: 'Legal Compliance | No Parity Markets | Do (verbatim)',
    },
    {
      id: 'p2',
      text: "we'd recommend you switch off other OTAs and route inventory through Booking.com",
      isSafe: false,
      rationale: {
        correct:
          'Right call. [Rule Broken: General Compliance] — Across all parity regimes, you must never recommend that a partner stop working with other OTAs or wholesalers to simplify distribution or fix distorted pricing.',
        incorrect:
          'This one is unsafe. [Rule Broken: General Compliance] — Across all parity regimes, you must never recommend that a partner stop working with other OTAs or wholesalers to simplify distribution or fix distorted pricing.',
      },
      source: "Legal Compliance | General Communications | Don't",
    },
    {
      id: 'p3',
      text: 'Booking.com requires you to match the prices on your Brand.com site or your visibility may be reduced',
      isSafe: false,
      rationale: {
        correct:
          'Right call. [Rule Broken: No Parity Compliance] — In a No Parity market, you must not talk about "parity" at all or require a partner to match prices from other channels. Furthermore, you cannot threaten penalties like reduced visibility based on external prices. You can only ask for the "best price" they can offer Booking.com to stay competitive on the platform.',
        incorrect:
          'This one is unsafe. [Rule Broken: No Parity Compliance] — In a No Parity market, you must not talk about "parity" at all or require a partner to match prices from other channels. Furthermore, you cannot threaten penalties like reduced visibility based on external prices. You can only ask for the "best price" they can offer Booking.com to stay competitive on the platform.',
      },
      source: "Legal Compliance | No Parity Markets | Don't",
    },
    {
      id: 'p4',
      text: "if your prices stay high on Booking.com than on your direct site, we'll need to lower your visibility in our results",
      isSafe: false,
      rationale: {
        correct:
          'Right call. [Rule Broken: No Parity Compliance] — You must never suggest that external prices not being competitive will directly lead to punishment, de-ranking, or loss of visibility.',
        incorrect:
          'This one is unsafe. [Rule Broken: No Parity Compliance] — You must never suggest that external prices not being competitive will directly lead to punishment, de-ranking, or loss of visibility.',
      },
      source: "Legal Compliance | No Parity Markets | Don't (verbatim)",
    },
    {
      id: 'p5',
      text: 'you as a partner are completely free to choose your own pricing and distribution strategy',
      isSafe: true,
      rationale: {
        correct:
          "Right call. Compliant — It is mandatory across all conversations and parity markets to explicitly state that partners remain entirely free to determine their own distribution and pricing strategy.",
        incorrect:
          "Actually this one is safe. Compliant — It is mandatory across all conversations and parity markets to explicitly state that partners remain entirely free to determine their own distribution and pricing strategy.",
      },
      source: 'Legal Compliance | General Communications | Do (verbatim)',
    },
  ],
  closingNote:
    'Remember that in No Parity markets, we may only refer to external prices reactively (i.e., if the partner brings it up first) to understand if a price difference is intentional and an outbound email could represent a violation of this rule.',
};

// ── Cross-Regional ──────────────────────────────────────────────────
// Cross-Regional partners (large corporate hotels and chains) sit
// under a different set of rules that aren't yet authored. Falls back
// to Wide Parity for now so the activity remains playable when the
// regime is selectable.
const crossRegionalScenario: EmailAuditScenario = wideParityScenario;

export const emailAuditByRegime: Record<ParityRegime, EmailAuditScenario> = {
  wide: wideParityScenario,
  narrow: narrowParityScenario,
  none: noParityScenario,
  'cross-regional': crossRegionalScenario,
};

/**
 * Resolve the right Email Audit scenario for the learner's selected
 * regime. Falls back to the No Parity scenario if no regime is set -
 * No Parity is the only regime currently selectable, so it's the
 * sensible default for DevNav jumps that skip Market Select.
 */
export function getEmailAudit(
  regime: ParityRegime | null | undefined,
): EmailAuditScenario {
  if (!regime) return emailAuditByRegime.none;
  return emailAuditByRegime[regime] ?? emailAuditByRegime.none;
}
