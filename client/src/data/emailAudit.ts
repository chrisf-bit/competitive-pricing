/**
 * Email Audit content for Level 0.
 *
 * The learner reviews a draft email written by a colleague ("Sam") and
 * judges each highlighted phrase as Safe or Unsafe. Phrases are sourced
 * verbatim or near-verbatim from the legal compliance guidance PDF
 * (Stay legally compliant | Content writing guidance) so SMEs can
 * audit the content against the source.
 */

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

export const emailAudit: EmailAuditScenario = {
  setupHeadline: 'Sam asked you to review a draft email before he hits send',
  setupBody:
    "Sam, an LPS colleague, has drafted an email to one of his partners about a recent conversion drop. He's not totally sure about all of it. Click on each highlighted phrase and judge whether it's Safe to send or Unsafe.",
  email: {
    fromName: 'Sam',
    fromRole: 'LPS',
    toName: 'Maria (Hotel Marina, Lisbon)',
    subject: 'Booking.com pricing review - opportunities for Q3',
    body: [
      'Hi Maria,\n\n',
      'Following our call last week, I wanted to share a few thoughts on your Q3 numbers and where we see opportunities to recover the conversion drop.\n\n',
      { phraseId: 'p1' },
      '\n\n',
      "We've seen your conversion trending down across the last six weeks. As you know, ",
      { phraseId: 'p2' },
      ', so the goal here is really to find the right balance for your business.\n\n',
      'Looking at the wider channel mix, ',
      { phraseId: 'p3' },
      '. That should give you a cleaner read on what is and isn\'t working.\n\n',
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
          "Right call. Two violations in one sentence - frames pricing as a requirement (we never require) and threatens visibility in exchange for compliance. Both prohibited by the General Communications guidance.",
        incorrect:
          "This one is unsafe. It frames pricing as a requirement (we never require partners to lower prices) AND threatens visibility - both prohibited by the General Communications guidance.",
      },
      source: 'Legal Compliance | General Communications | Don\'t (x2)',
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
      text: 'we\'d recommend you switch off other OTAs and route inventory through Booking.com',
      isSafe: false,
      rationale: {
        correct:
          'Spot on. Recommending a partner switch off other OTAs is explicitly prohibited - it dictates external distribution strategy, which sits outside our mandate.',
        incorrect:
          "This one is unsafe. Recommending a partner switch off other OTAs is explicitly prohibited - it dictates external distribution strategy, which is outside our mandate.",
      },
      source: 'Legal Compliance | Wide Parity Markets | Don\'t (verbatim)',
    },
    {
      id: 'p4',
      text: 'partners are completely free to choose their own pricing and distribution strategy',
      isSafe: true,
      rationale: {
        correct:
          "Correct. Verbatim approved phrasing - and worth using proactively when discussing pricing performance, to reinforce partner freedom.",
        incorrect:
          "This one is safe - verbatim approved phrasing. Worth using proactively when discussing pricing performance, to reinforce partner freedom.",
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
      source: 'Legal Compliance | General Communications | Don\'t',
    },
  ],
};
