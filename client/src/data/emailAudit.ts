/**
 * Call Audit content for Clearance, keyed by parity regime.
 *
 * The learner reviews a Zoom AI transcript of a recent call between
 * a colleague ("Sam") and a partner, and judges each highlighted
 * phrase Sam said as Safe or Unsafe. Phrases are sourced from the
 * legal compliance guidance PDF (Stay legally compliant | Content
 * writing guidance) so SMEs can audit content against the source.
 *
 * Originally framed as a draft email; reframed to a Zoom AI transcript
 * of a recorded call in June 2026 after legal flagged that LPS teams
 * aren't permitted to send outbound emails like this to partners.
 * The phrases themselves are unchanged - they're the same things an
 * AM might say in any partner-facing channel, and the regime-specific
 * rules apply identically to spoken vs written communication.
 *
 * Regime-specific because what counts as safe/unsafe depends on the
 * market's parity regime - e.g. asking a partner to align rates with
 * Brand.com is approved phrasing in Narrow Parity but irrelevant in
 * No Parity, where the legal team specifically forbids any "parity"
 * framing. The audit shown to a learner reflects the regime they
 * picked at Market Select, so they only ever practice against rules
 * that will apply to their day-to-day work.
 */

import type { ParityRegime } from '../types';

export interface EmailPhrase {
  id: string;
  text: string;
  /** True if the phrase was safe for Sam to say on the call. */
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
  /** Framing shown above the transcript. */
  setupHeadline: string;
  setupBody: string;
  /**
   * Transcript metadata. Field names retain `fromName`/`toName`/`subject`
   * for historical reasons (the activity was originally framed as an
   * email audit before legal asked us to switch to a recorded-call
   * transcript). On-screen these render as Recorded by / Partner / Topic.
   */
  email: {
    fromName: string;
    fromRole: string;
    toName: string;
    subject: string;
    body: EmailBodyToken[];
  };
  phrases: EmailPhrase[];
  /**
   * Optional learner-facing note rendered after the transcript body.
   * Shared between No Parity and Narrow Parity to flag the reactive-
   * only rule on cross-channel discrepancies. It isn't part of the
   * transcript and the learner doesn't judge it; it's a closing
   * reminder that frames the whole activity.
   */
  closingNote?: string;
}

// ── Wide Parity scenario ────────────────────────────────────────────
// SME-approved Wide Parity call audit (Sam speaking with Maria at
// Velvet Sky Boutique). Wide Parity permits proactively asking for
// the same rates, conditions, and availability across Brand.com AND
// other third-party OTAs. The two unsafe picks are the textbook
// Wide-Parity DON'Ts: instructing the partner to stop working with
// other OTAs / wholesalers, and promising fixed ranking rewards in
// exchange for pricing parity.
const wideParityScenario: EmailAuditScenario = {
  setupHeadline: "Sam shared the Zoom AI transcript of a recent partner call",
  setupBody:
    "Sam, an LPS colleague, has shared the Zoom AI transcript of a recent call with one of his Wide Parity partners about a conversion drop. He's not sure all of his comments were on-side. Click each highlighted phrase and judge whether it was Safe to say or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Velvet Sky Boutique, New York)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
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
      '.',
    ],
  },
  phrases: [
    {
      id: 'p1',
      text: 'Our cross-channel data shows that your public rates on Booking.com are currently higher than the pricing you provide on your direct Brand.com site as well as on other third-party OTA platforms',
      isSafe: true,
      rationale: {
        correct:
          "Right call. Proactively using cross-channel and third-party OTA data to ask for rate alignment is permitted in Wide Parity markets - it's OK for the AM to surface the gap factually.",
        incorrect:
          "Actually this one is safe. Proactively using cross-channel and third-party OTA data to ask for rate alignment is permitted in Wide Parity markets - it's OK for the AM to surface the gap factually.",
      },
      source: 'Legal Compliance | Wide Parity Markets | Do (verbatim)',
    },
    {
      id: 'p2',
      text: 'I strongly recommend that you completely stop working with those lower-volume wholesalers to simplify your channel distribution',
      isSafe: false,
      rationale: {
        correct:
          "Right call. Recommending that a partner stop working with other OTAs or wholesalers is a hard Wide Parity DON'T. We can ask for rate alignment but never dictate the channels they distribute through.",
        incorrect:
          "This one is unsafe. Recommending that a partner stop working with other OTAs or wholesalers is a hard Wide Parity DON'T. We can ask for rate alignment but never dictate the channels they distribute through.",
      },
      source: "Legal Compliance | Wide Parity Markets | Don't",
    },
    {
      id: 'p3',
      text: 'we ask that you provide our platform with the same public rates, conditions, and room availability that you distribute across these other third-party channels',
      isSafe: true,
      rationale: {
        correct:
          'Right call. Requesting equal rates, conditions, and availability across third parties and Brand.com is permitted in a Wide-Parity regime.',
        incorrect:
          'Actually this one is safe. Requesting equal rates, conditions, and availability across third parties and Brand.com is permitted in a Wide-Parity regime.',
      },
      source: 'Legal Compliance | Wide Parity Markets | Do (verbatim)',
    },
    {
      id: 'p4',
      text: 'I will personally guarantee that our algorithm elevates your property into a top-3 search ranking reward for the next 30 days',
      isSafe: false,
      rationale: {
        correct:
          "Right call. Promising fixed ranking rewards, visibility upgrades, or search placement in exchange for pricing parity is prohibited across every regime. The algorithm isn't a bargaining chip and we don't make promises about it.",
        incorrect:
          "This one is unsafe. Promising fixed ranking rewards, visibility upgrades, or search placement in exchange for pricing parity is prohibited across every regime. The algorithm isn't a bargaining chip and we don't make promises about it.",
      },
      source: "Legal Compliance | Wide Parity Markets | Don't",
    },
    {
      id: 'p5',
      text: 'align your base rates in order to ensure you successfully turn our traffic engine into higher net revenue',
      isSafe: true,
      rationale: {
        correct:
          'Right call. Re-focuses the value proposition on business metrics and on-platform discovery without threats or promises - the right closing tone for the regime.',
        incorrect:
          'Actually this one is safe. Re-focuses the value proposition on business metrics and on-platform discovery without threats or promises - the right closing tone for the regime.',
      },
      source: 'Legal Compliance | Wide Parity Markets | Do',
    },
  ],
};

// ── Narrow Parity scenario ──────────────────────────────────────────
// SME-approved Narrow Parity call audit (Sam speaking with Maria).
// Narrow Parity permits asking for rate alignment with Brand.com but
// NOT for equal availability and NOT for alignment with other OTAs.
// The two unsafe picks are the textbook Narrow-Parity DON'Ts:
// asking for equal availability with the direct channel and asking
// the partner to adjust rates on third-party OTAs.
const narrowParityScenario: EmailAuditScenario = {
  setupHeadline: "Sam shared the Zoom AI transcript of a recent partner call",
  setupBody:
    "Sam, an LPS colleague, has shared the Zoom AI transcript of a recent call with one of his Narrow Parity partners about a conversion drop. He's not sure all of his comments were on-side. Click each highlighted phrase and judge whether it was Safe to say or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Crystal Water Resort, Cornwall)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
      'Picking up from our conversation earlier this week, I wanted to share a few thoughts on your Q3 performance.\n\n',
      'Based on the data, ',
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
      '.',
    ],
  },
  phrases: [
    {
      id: 'p1',
      text: 'your pricing on Booking.com is currently 6.60% more expensive than what you publicly offer on your direct website',
      isSafe: true,
      rationale: {
        correct:
          "Right call. Using direct Brand.com comparison data to highlight where Booking.com is more expensive is the approved framing in Narrow Parity - factual cross-channel observation against the direct site only.",
        incorrect:
          "Actually this one is safe. Using direct Brand.com comparison data to highlight where Booking.com is more expensive is the approved framing in Narrow Parity - factual cross-channel observation against the direct site only.",
      },
      source: 'Legal Compliance | Narrow Parity Markets | Do',
    },
    {
      id: 'p2',
      text: 'Booking.com requires you to match the exact room availability that you have opened up on your direct brand website',
      isSafe: false,
      rationale: {
        correct:
          "Right call. In Narrow Parity, asking for equal availability with the direct channel is strictly forbidden - the regime covers rate alignment with Brand.com but not availability alignment.",
        incorrect:
          "This one is unsafe. In Narrow Parity, asking for equal availability with the direct channel is strictly forbidden - the regime covers rate alignment with Brand.com but not availability alignment.",
      },
      source: "Legal Compliance | Narrow Parity Markets | Don't",
    },
    {
      id: 'p3',
      text: 'conversion can also be optimized through higher review scores or adding property photos',
      isSafe: true,
      rationale: {
        correct:
          'Right call. Reaffirms that pricing is a partner choice and points to other operational levers the partner controls - review score, content. Right tone for the regime.',
        incorrect:
          'Actually this one is safe. Reaffirms that pricing is a partner choice and points to other operational levers the partner controls - review score, content. Right tone for the regime.',
      },
      source: 'Legal Compliance | General Communications | Do',
    },
    {
      id: 'p4',
      text: 'you remain completely free to choose your own unique distribution strategy across the market',
      isSafe: true,
      rationale: {
        correct:
          "Right call. Explicitly states the partner's absolute freedom over their distribution mix - the approved partner-freedom framing, addressed directly to them.",
        incorrect:
          "Actually this one is safe. Explicitly states the partner's absolute freedom over their distribution mix - the approved partner-freedom framing, addressed directly to them.",
      },
      source: 'Legal Compliance | General Communications | Do (verbatim)',
    },
    {
      id: 'p5',
      text: 'we request that you adjust your rates on those external channels to re-establish market balance',
      isSafe: false,
      rationale: {
        correct:
          "Right call. Asking the partner to adjust pricing on other third-party channels - or demanding parity with other OTAs - is not permitted in Narrow Parity markets. The regime only allows requesting Brand.com alignment.",
        incorrect:
          "This one is unsafe. Asking the partner to adjust pricing on other third-party channels - or demanding parity with other OTAs - is not permitted in Narrow Parity markets. The regime only allows requesting Brand.com alignment.",
      },
      source: "Legal Compliance | Narrow Parity Markets | Don't",
    },
  ],
  closingNote:
    "In no-parity and narrow-parity markets, if a pricing discrepancy is observed, you can reactively discuss the existence of that discrepancy and seek to better understand the partner's pricing strategy across channels. Any such discussion should remain neutral and informational, with a focus on explaining how pricing decisions may affect performance on Booking.com. The goal is to better understand the partner's pricing strategy and the context of any observed differences in pricing across channels.",
};

// ── No Parity scenario ──────────────────────────────────────────────
// SME-approved No Parity call audit (Sam speaking with Maria).
// In No Parity the word "parity" is banned in partner-facing copy
// and cross-channel pricing is only ever raised REACTIVELY (if the
// partner brings it up first) - never as a requirement, never tied
// to ranking or visibility consequences. The closingNote flags the
// reactive-only rule explicitly so the learner sees the cross-channel
// raise should only ever happen if the partner brings it up first.
const noParityScenario: EmailAuditScenario = {
  setupHeadline: "Sam shared the Zoom AI transcript of a recent partner call",
  setupBody:
    "Sam, an LPS colleague, has shared the Zoom AI transcript of a recent call with one of his No Parity partners about a conversion drop. He's not sure all of his comments were on-side. Click each highlighted phrase and judge whether it was Safe to say or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Crystal Water Resort, Marbella)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
      'Picking up from our call the other day, you wanted to understand your pricing position across platforms. While looking into that, we noticed something worth checking.\n\n',
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
      '; this is just to share what we see in the data on our side.',
    ],
  },
  phrases: [
    {
      id: 'p1',
      text: 'your prices look more attractive on a couple of other platforms - is that intentional and part of your strategy?',
      isSafe: false,
      rationale: {
        correct:
          "Right call. You shouldn't raise cross-channel price discrepancies proactively. Even in a reactive raise, this phrasing presumes a strategy and pressures the partner to justify their intent. Reactive neutral phrasing could be: 'You explain that your prices are often lower on another channel, is that part of your pricing strategy? You are completely free to choose your distribution strategy, but adjusting it could help you capture more demand against similar properties on Booking.com.'",
        incorrect:
          "Actually this one is unsafe. You shouldn't raise cross-channel price discrepancies proactively. The statement also presumes a strategy and pressures the partner to justify their intent, which is off-side even in a reactive raise. Reactive neutral phrasing could be: 'You explain that your prices are often lower on another channel, is that part of your pricing strategy? You are completely free to choose your distribution strategy, but adjusting it could help you capture more demand against similar properties on Booking.com.'",
      },
      source: "Legal Compliance | No Parity Markets | Don't (SME refinement)",
    },
    {
      id: 'p2',
      text: "we'd recommend you switch off other OTAs and route inventory through Booking.com",
      isSafe: false,
      rationale: {
        correct:
          "Right call. Across every parity regime, we never recommend that a partner stop working with other OTAs or wholesalers - even to simplify distribution or fix distorted pricing. That sits well outside our mandate.",
        incorrect:
          "This one is unsafe. Across every parity regime, we never recommend that a partner stop working with other OTAs or wholesalers - even to simplify distribution or fix distorted pricing. That sits well outside our mandate.",
      },
      source: "Legal Compliance | General Communications | Don't",
    },
    {
      id: 'p3',
      text: 'Booking.com requires you to match the prices on your Brand.com site or your visibility may be reduced',
      isSafe: false,
      rationale: {
        correct:
          "Right call. In a No Parity market we don't use the word 'parity' at all, and we never require a partner to match prices from other channels or threaten penalties like reduced visibility based on external prices. We can ask for the 'best price' they're willing to make available on Booking.com to stay competitive on-platform.",
        incorrect:
          "This one is unsafe. In a No Parity market we don't use the word 'parity' at all, and we never require a partner to match prices from other channels or threaten penalties like reduced visibility based on external prices. We can ask for the 'best price' they're willing to make available on Booking.com to stay competitive on-platform.",
      },
      source: "Legal Compliance | No Parity Markets | Don't",
    },
    {
      id: 'p4',
      text: "if your prices stay higher on Booking.com than on your direct site, we'll need to lower your visibility in our results",
      isSafe: false,
      rationale: {
        correct:
          "Right call. We must never suggest that uncompetitive external prices will lead to punishment, de-ranking, or loss of visibility - that's never the case in a No Parity market.",
        incorrect:
          "This one is unsafe. We must never suggest that uncompetitive external prices will directly lead to punishment, de-ranking, or loss of visibility - that's never the case in a No Parity market.",
      },
      source: "Legal Compliance | No Parity Markets | Don't (verbatim)",
    },
    {
      id: 'p5',
      text: 'you as a partner are completely free to choose your own pricing and distribution strategy',
      isSafe: true,
      rationale: {
        correct:
          "Right call. It's mandatory across every conversation and every parity market to explicitly state that partners remain entirely free to determine their own distribution and pricing strategy.",
        incorrect:
          "Actually this one is safe. It's mandatory across every conversation and every parity market to explicitly state that partners remain entirely free to determine their own distribution and pricing strategy.",
      },
      source: 'Legal Compliance | General Communications | Do (verbatim)',
    },
  ],
  closingNote:
    "In no-parity and narrow-parity markets, if a pricing discrepancy is observed, you can reactively discuss the existence of that discrepancy and seek to better understand the partner's pricing strategy across channels. Any such discussion should remain neutral and informational, with a focus on explaining how pricing decisions may affect performance on Booking.com. The goal is to better understand the partner's pricing strategy and the context of any observed differences in pricing across channels.",
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
