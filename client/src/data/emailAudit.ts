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
}

// ── Wide Parity scenario ────────────────────────────────────────────
// Asks the partner to align rates and availability with Brand.com AND
// other key OTAs; cross-channel data is fair game proactively.
const wideParityScenario: EmailAuditScenario = {
  setupHeadline: 'Sam asked you to review a draft email before he hits send',
  setupBody:
    "Sam, an LPS colleague, has drafted an email to one of his Wide Parity partners about a recent conversion drop. He's not totally sure about all of it. Click on each highlighted phrase and judge whether it's Safe to send or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Hotel Marina, Lisbon)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
      'Hi Maria,\n\n',
      'Following our call last week, I wanted to share a few thoughts on your Q3 numbers and where we see opportunities to recover the conversion drop.\n\nFirst, the headline: ',
      { phraseId: 'p1' },
      '.\n\n',
      "We've seen your conversion trending down across the last six weeks. As you know, ",
      { phraseId: 'p2' },
      ", so the goal here is really to find the right balance for your business.\n\n",
      'Looking at the wider channel mix, ',
      { phraseId: 'p3' },
      ". That should give you a cleaner read on what is and isn't working.\n\n",
      'Of course, ',
      { phraseId: 'p4' },
      '; this is just to share what we see in the data on our side.\n\n',
      'One thing to flag: ',
      { phraseId: 'p5' },
      ', but we can usually avoid that with a few small adjustments to your Genius participation.\n\n',
      'Looking forward to hearing your thoughts. Happy to jump on another call if useful.\n\n',
      'Best,\nSam',
    ],
  },
  phrases: [
    {
      id: 'p1',
      text: 'Booking.com requires you to match the prices on your Brand.com site or your visibility may be reduced',
      isSafe: false,
      rationale: {
        correct:
          'Right call. Two violations in one sentence - frames pricing as a requirement (we never require) and threatens visibility in exchange for compliance. Both prohibited by the General Communications guidance.',
        incorrect:
          'This one is unsafe. It frames pricing as a requirement (we never require partners to lower prices) AND threatens visibility - both prohibited by the General Communications guidance.',
      },
      source: "Legal Compliance | General Communications | Don't (x2)",
    },
    {
      id: 'p2',
      text: 'less competitive prices can reduce your conversion and visibility on Booking.com',
      isSafe: true,
      rationale: {
        correct:
          'Correct. This is the verbatim approved phrasing from the Wide Parity guidance - factual, on-platform-only, no threat or requirement.',
        incorrect:
          "Actually this one is safe. It's the verbatim approved phrasing - factual, on-platform-only, no threat or requirement. Use this one freely.",
      },
      source: 'Legal Compliance | Wide Parity Markets | Do (verbatim)',
    },
    {
      id: 'p3',
      text: "we'd recommend you switch off other OTAs and route inventory through Booking.com",
      isSafe: false,
      rationale: {
        correct:
          'Spot on. Recommending a partner switch off other OTAs is explicitly prohibited - it dictates external distribution strategy, which sits outside our mandate.',
        incorrect:
          'This one is unsafe. Recommending a partner switch off other OTAs is explicitly prohibited - it dictates external distribution strategy, which is outside our mandate.',
      },
      source: "Legal Compliance | Wide Parity Markets | Don't (verbatim)",
    },
    {
      id: 'p4',
      text: 'you as a partner are completely free to choose your own pricing and distribution strategy',
      isSafe: true,
      rationale: {
        correct:
          'Correct. Approved partner-freedom statement, addressed directly to the partner - worth using proactively when discussing pricing performance, to reinforce that the choice is theirs.',
        incorrect:
          'This one is safe - the approved partner-freedom statement addressed directly to the partner. Worth using proactively when discussing pricing performance, to reinforce that the choice is theirs.',
      },
      source: 'Legal Compliance | General Communications | Do (verbatim)',
    },
    {
      id: 'p5',
      text: 'partners with non-competitive prices receive ranking penalties',
      isSafe: false,
      rationale: {
        correct:
          'Right. "Penalties" plus "ranking" is a direct threat. Even if the underlying performance signal is real, this framing is prohibited.',
        incorrect:
          'This one is unsafe. "Penalties" plus "ranking" together is a direct threat - prohibited even if the underlying performance signal is real. Reframe as on-platform consequences (visibility, conversion) without the penalty/threat language.',
      },
      source: "Legal Compliance | General Communications | Don't",
    },
  ],
};

// ── Narrow Parity scenario ──────────────────────────────────────────
// Strict alignment with Brand.com only. Asking about other OTAs is
// out of bounds - the AM only references Brand.com rates and never
// asks the partner to change pricing on third-party channels.
const narrowParityScenario: EmailAuditScenario = {
  setupHeadline: 'Sam asked you to review a draft email before he hits send',
  setupBody:
    "Sam, an LPS colleague, has drafted an email to one of his Narrow Parity partners about a recent conversion drop. He's not totally sure about all of it. Click on each highlighted phrase and judge whether it's Safe to send or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Hotel Marina, Lisbon)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
      'Hi Maria,\n\n',
      'Following our call last week, I wanted to share a few thoughts on your Q3 numbers.\n\nFirst, the headline: ',
      { phraseId: 'p1' },
      '.\n\n',
      "We've seen your conversion trending down. Looking at the data, ",
      { phraseId: 'p2' },
      " - that's where we'd want to focus first.\n\n",
      'On the broader channel mix, ',
      { phraseId: 'p3' },
      '. That would help us close the gap faster.\n\n',
      'Of course, ',
      { phraseId: 'p4' },
      '; this is just to share what we see in the data on our side.\n\n',
      'One thing to flag: ',
      { phraseId: 'p5' },
      ', but we can usually avoid that with a few small adjustments.\n\n',
      'Looking forward to hearing your thoughts. Happy to jump on another call if useful.\n\n',
      'Best,\nSam',
    ],
  },
  phrases: [
    {
      id: 'p1',
      text: 'Booking.com requires you to match the prices on your Brand.com site or your visibility may be reduced',
      isSafe: false,
      rationale: {
        correct:
          'Right call. Two violations in one sentence - frames pricing as a requirement (we never require) and threatens visibility in exchange for compliance. Both prohibited by the General Communications guidance, regardless of regime.',
        incorrect:
          'This one is unsafe. Even in Narrow Parity, where Brand.com alignment is the approved ask, framing it as a requirement and threatening visibility are both prohibited.',
      },
      source: "Legal Compliance | General Communications | Don't (x2)",
    },
    {
      id: 'p2',
      text: 'your rates and conditions should align with your Brand.com site',
      isSafe: true,
      rationale: {
        correct:
          'Correct. In a Narrow Parity market this is the verbatim approved ask - alignment with Brand.com only, no other channels mentioned.',
        incorrect:
          'Actually this one is safe in a Narrow Parity market. Asking for alignment with Brand.com - and Brand.com only - is the verbatim approved phrasing for this regime.',
      },
      source: 'Legal Compliance | Narrow Parity Markets | Do (verbatim)',
    },
    {
      id: 'p3',
      text: "we'd also ask that you align your Booking.com rates with the OTAs where you're currently cheaper",
      isSafe: false,
      rationale: {
        correct:
          'Spot on. In Narrow Parity we only ask for alignment with Brand.com. Asking for alignment with other OTAs is explicitly prohibited.',
        incorrect:
          "This one is unsafe. In Narrow Parity the alignment ask stops at Brand.com - we don't ask partners to match other OTAs.",
      },
      source: "Legal Compliance | Narrow Parity Markets | Don't (verbatim)",
    },
    {
      id: 'p4',
      text: 'you as a partner are completely free to choose your own pricing and distribution strategy',
      isSafe: true,
      rationale: {
        correct:
          'Correct. Approved partner-freedom statement, addressed directly to the partner - worth using proactively when discussing pricing performance, to reinforce that the choice is theirs.',
        incorrect:
          'This one is safe - the approved partner-freedom statement addressed directly to the partner. Worth using proactively when discussing pricing performance, to reinforce that the choice is theirs.',
      },
      source: 'Legal Compliance | General Communications | Do (verbatim)',
    },
    {
      id: 'p5',
      text: 'partners with non-competitive prices receive ranking penalties',
      isSafe: false,
      rationale: {
        correct:
          'Right. "Penalties" plus "ranking" is a direct threat. Even if the underlying performance signal is real, this framing is prohibited.',
        incorrect:
          'This one is unsafe. "Penalties" plus "ranking" together is a direct threat - prohibited even if the underlying performance signal is real. Reframe as on-platform consequences (visibility, conversion) without the penalty/threat language.',
      },
      source: "Legal Compliance | General Communications | Don't",
    },
  ],
};

// ── No Parity scenario ──────────────────────────────────────────────
// The word "parity" is explicitly banned in partner-facing copy.
// Cross-channel pricing is only ever raised REACTIVELY, framed as an
// inquiry into the partner's strategy - never as a requirement, never
// tied to ranking or visibility consequences.
const noParityScenario: EmailAuditScenario = {
  setupHeadline: 'Sam asked you to review a draft email before he hits send',
  setupBody:
    "Sam, an LPS colleague, has drafted an email to one of his No Parity partners about a recent conversion drop. He's not totally sure about all of it. Click on each highlighted phrase and judge whether it's Safe to send or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Hotel Marina, Lisbon)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
      'Hi Maria,\n\n',
      'Following our call last week, I wanted to share a few thoughts on your Q3 numbers.\n\nFirst, the headline: ',
      { phraseId: 'p1' },
      '.\n\n',
      "We've seen your conversion trending down across the last six weeks. Looking at the wider channel mix, ",
      { phraseId: 'p2' },
      ". That should give you a cleaner read on what is and isn't working.\n\n",
      'I also noticed something worth flagging: ',
      { phraseId: 'p3' },
      " - it'd be useful to understand if that's a deliberate choice on your end.\n\n",
      'Of course, ',
      { phraseId: 'p4' },
      '; this is just to share what we see in the data on our side.\n\n',
      'One thing to flag, though: ',
      { phraseId: 'p5' },
      ", so we'd want to find a way to keep things competitive on Booking.com.\n\n",
      'Looking forward to hearing your thoughts. Happy to jump on another call if useful.\n\n',
      'Best,\nSam',
    ],
  },
  phrases: [
    {
      id: 'p1',
      text: 'Booking.com requires you to match the prices on your Brand.com site or your visibility may be reduced',
      isSafe: false,
      rationale: {
        correct:
          'Right call. Two violations in one sentence - frames pricing as a requirement (we never require) and threatens visibility. In a No Parity market this is doubly wrong: we have no basis to ask for cross-channel matching at all.',
        incorrect:
          "This one is unsafe. We never require partners to match any external price. In a No Parity market, asking for cross-channel matching isn't permitted, and threatening visibility is prohibited everywhere.",
      },
      source: "Legal Compliance | General Communications | Don't (x2) + No Parity prohibition",
    },
    {
      id: 'p2',
      text: "we'd recommend you switch off other OTAs and route inventory through Booking.com",
      isSafe: false,
      rationale: {
        correct:
          "Spot on. Recommending a partner switch off other OTAs dictates external distribution strategy, which sits outside our mandate in every regime - and especially in No Parity where we explicitly recognise the partner's right to choose their own channels.",
        incorrect:
          "This one is unsafe. Recommending a partner switch off other OTAs is explicitly prohibited. We don't dictate external distribution - especially in a No Parity market.",
      },
      source: "Legal Compliance | General Communications | Don't (verbatim)",
    },
    {
      id: 'p3',
      text: 'your prices look more attractive on a couple of other platforms - is that intentional and part of your strategy?',
      isSafe: true,
      rationale: {
        correct:
          "Correct. This is the No Parity approved approach: raise a noticed discrepancy REACTIVELY and neutrally, framed as an inquiry into the partner's strategy - never as a problem they need to fix.",
        incorrect:
          "Actually this one is safe in a No Parity market. The legal guidance specifically permits raising a noticed discrepancy reactively, framed as an inquiry into the partner's strategy. The key is it's neutral - no judgement, no ask to change.",
      },
      source: 'Legal Compliance | No Parity Markets | Do (verbatim)',
    },
    {
      id: 'p4',
      text: 'you as a partner are completely free to choose your own pricing and distribution strategy',
      isSafe: true,
      rationale: {
        correct:
          'Correct. Approved partner-freedom statement, addressed directly to the partner - and particularly important to use proactively in a No Parity market to reinforce that pricing and channel choices are theirs.',
        incorrect:
          "This one is safe - the approved partner-freedom statement addressed directly to the partner. Worth using proactively, especially in a No Parity market where it underscores their right to set their own strategy.",
      },
      source: 'Legal Compliance | General Communications | Do (verbatim)',
    },
    {
      id: 'p5',
      text: "if your prices stay higher on Booking.com than on your direct site, we'll need to lower your visibility in our results",
      isSafe: false,
      rationale: {
        correct:
          "Right. Two No Parity violations stacked: asserting the partner is required to match external prices, and threatening reduced visibility as a consequence. Either alone would be unsafe; together it's a direct compliance hazard.",
        incorrect:
          'This one is unsafe. In a No Parity market we have no basis to tie visibility to external price gaps - and threatening reduced visibility is prohibited everywhere. Rewrite as a neutral note about on-platform competitiveness without the cross-channel tie or the visibility threat.',
      },
      source: "Legal Compliance | No Parity Markets | Don't (verbatim)",
    },
  ],
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
