/**
 * Pricing Pathway drawer content ("Tell" format).
 *
 * As of the 2026-09 "Game vs Pathway Update" (deck: Game vs Pathway
 * Update, Daria / James / Irene), the in-sim Pricing Pathway drawer is
 * no longer a learner-to-click wizard. It reads through six fixed steps
 * (Trigger, Primary pricing gaps, Intent and root causes, Evidence,
 * Plan, Conversation angle) and simply *tells* the learner the answer or
 * the guidance for each - the "Tell" format the client found works
 * better than the click-through version.
 *
 * Two flavours:
 *   - DETAILED: one partner only - Royal Crest Hotel - at Round 1
 *     (Level 1 / XPC) and Round 11 (Level 2 / OPC). Partner-specific,
 *     SME-validated copy that reads its answers off the same data the
 *     learner sees on Partner Detail, and ends with a summary card.
 *   - GENERIC: every other partner in every other round. General
 *     guidance for each step (the learner cannot always reach a firm
 *     conclusion from the game alone), and NO summary card.
 *
 * Principle (deck slide 4): where the game gives enough data/context,
 * give a clear answer (detailed); where it does not, give general
 * information (generic).
 *
 * Copy is transcribed verbatim from the deck, with em/en dashes
 * normalised to plain hyphens per the house style rule.
 */

export type PathwayContentPhase = 'Prioritise' | 'Diagnose' | 'Act';

export interface PathwayStepContent {
  /** 1-6, matches the six road nodes Trigger..Hook. */
  stepNumber: number;
  phase: PathwayContentPhase;
  /** Step title, e.g. "Trigger - What am I seeing?". */
  title: string;
  /** Optional lead-in line shown above the main body (Plan / Angle). */
  intro?: string;
  /** Main body copy for the step. */
  body: string;
  /** Optional "Note:" caveat drawing the sim/real-world boundary. */
  note?: string;
}

export interface PathwaySummaryRow {
  label: string;
  value: string;
}

export interface PathwaySummaryContent {
  rows: PathwaySummaryRow[];
  /** The suggested hook / conversation angle to carry into the call. */
  hook: string;
}

export interface PricingPathwayContent {
  variant: 'detailed' | 'generic';
  steps: PathwayStepContent[];
  /** Present on the detailed variant only. */
  summary?: PathwaySummaryContent;
}

// ─────────────────────────────────────────────────────────────────
// Royal Crest Hotel - Round 1 (Level 1 / XPC). Deck slides 7-13.
// ─────────────────────────────────────────────────────────────────

const royalCrestR1: PricingPathwayContent = {
  variant: 'detailed',
  steps: [
    {
      stepNumber: 1,
      phase: 'Prioritise',
      title: 'Trigger - What am I seeing?',
      intro: "Looking at the partner's data, which trigger is the loudest?",
      body: "Based on the information available in this section, a clear trigger here is a data signal: Royal Crest Hotel's Brand.com eRPD sits at 5.2% and has been deteriorating, increasing by 0.6 percentage points month over month. This is a worsening price gap that signals a pricing opportunity worth investigating.",
      note: 'The game uses a simplified simulation, so you may not always have full context to confirm what triggers a pricing journey for this partner. In reality, performance drop, data signal, context from partner interaction, or shifts in EPO gating product eligibility are the common starting points that lead you to the flow of prioritization, diagnosis, and act.',
    },
    {
      stepNumber: 2,
      phase: 'Prioritise',
      title: 'Primary pricing gaps - Where are the primary pricing gaps?',
      body: "In this case (game predefined), the partner's primary pricing gap is about Brand.com eRPD is not competitive. The partner's eRPD of 5.2% and Lose Price 99% tells us that travellers consistently find a better price on the partner's own website than on Booking.com. This is where the largest commercial gap sits for this partner.",
      note: "For each game round, we use one predefined primary comparison player, either Brand.com or the Key OTA, for the eRPD and price metrics so the simulation stays focused. In practice, you should follow office-country's eRPD objectives direction and use pricing dashboard insights, with manager guidance, to prioritize between Brand.com and Key OTA, based on potential eRPD impact, partner value, observed trends, and parity guardrails.",
    },
    {
      stepNumber: 3,
      phase: 'Diagnose',
      title: 'Intent and root causes - What is causing the pricing gaps?',
      body: 'In this case (game predefined), the hypothesis is that the price gap is an intentional result - the partner appears to be following a Brand-first strategy, likely protecting their direct guest source and maintaining control over their brand pricing. The structural, constant nature of the eRPD gap (consistently above 0%, not fluctuating) points to a deliberate pricing choice rather than a setup error or temporary campaign.',
      note: "The game uses a simplified simulation, so you may not always have full context to confirm the partner's intent. In reality, always investigate the reason behind a pricing gap and form a hypothesis around whether partner's actions were part of their strategy or not, base your understanding from previous partner conversations, RPD scenario types, and product reviews.",
    },
    {
      stepNumber: 4,
      phase: 'Diagnose',
      title: 'Evidence - What data supports my diagnosis?',
      body: "In this case (game predefined), the partner's historical Brand.com eRPD is constantly not competitive. RPD Scenarios dashboard also reveals an active Brand scenario for this partner, reinforcing the cross-channel gap. Additionally, App and Mdot scenarios have been identified against the Key OTA, which could serve as supporting data points. Together, this evidence pack validates the intentional Brand-first hypothesis before approaching the partner.",
      note: 'The game provides simplified data for simulation purposes, so full validation may not always be possible. In reality, use all available tools, relevant metrics, patterns, and scenarios to support your diagnosis, and build an evidence pack.',
    },
    {
      stepNumber: 5,
      phase: 'Act',
      title: 'Plan - What do I want to achieve?',
      intro: 'Before you prepare any conversation, define what success looks like.',
      body: "In this case, at partner level, what specific outcome do you want from this meeting? A clear objective keeps you focused and makes your follow-up measurable. The goal for this conversation could be: seek to better understand the partner's pricing strategy across channels, using a neutral and informational approach, and discuss how different aspects of partner's offer - including prices, conditions, availability, and more - can influence how attractive their property is to travelers on Booking.com. And a clear meeting objective could be: partner is open to review their base rate setup and agree on a timeline to assess whether adjustments are commercially viable for both sides.",
    },
    {
      stepNumber: 6,
      phase: 'Act',
      title: "Conversation angle - What's my conversation angle?",
      intro: 'You have the diagnosis and the plan. Now pick the most effective angle that will make this partner lean in.',
      body: "In this case, lead with the Brand.com opportunity - the structural Brand eRPD gap is the strongest signal, making it the most credible angle to open the conversation. The App and Mdot scenarios identified against the Key OTA can serve as supporting levers, that targeted discounts for specific audiences could further improve the partner's price competitiveness without requiring a full rate restructure. This gives the partner a graduated path - start with base rate discussion, then optimise with targeted discounts where it makes sense.",
    },
  ],
  summary: {
    rows: [
      { label: 'Trigger', value: 'Data signal (eRPD)' },
      { label: 'Primary issue', value: 'Brand.com eRPD is not competitive' },
      { label: 'Intent & root cause', value: 'Likely an intentional Brand-first strategy' },
      {
        label: 'Evidence',
        value: 'Consistent uncompetitive Brand eRPD ; RPD Scenarios on Brand, and App, Mdot vs Key OTA.',
      },
      {
        label: 'Plan',
        value: "Neutrally understand the partner's pricing strategy and agree on a timeline to test and review adjustments outcome.",
      },
    ],
    hook: 'Lead with the Brand.com opportunity. The App and Mdot scenarios vs Key OTA can serve as supporting levers - start with base rate discussion, then optimise with targeted discounts where it makes sense.',
  },
};

// ─────────────────────────────────────────────────────────────────
// Royal Crest Hotel - Round 11 (Level 2 / OPC). Deck slides 16-22.
// ─────────────────────────────────────────────────────────────────

const royalCrestR11: PricingPathwayContent = {
  variant: 'detailed',
  steps: [
    {
      stepNumber: 1,
      phase: 'Prioritise',
      title: 'Trigger - What am I seeing?',
      body: "Based on the information available in this section, a clear trigger is a performance outcome: 50% of the partner's rooms are unsold, while Sell Through Rate is below the peer group. This indicates a meaningful on-platform performance issue worth investigating.",
      note: 'The trigger shows where to start the investigation, but not yet why the issue is happening. Continue through the pathway before deciding on an action.',
    },
    {
      stepNumber: 2,
      phase: 'Prioritise',
      title: 'Primary pricing gaps - Where are the primary pricing gaps?',
      body: "In this case, the partner's primary gap is on-platform competitiveness. The partner is being seen less, not chosen less: Visibility Share is 10.3% compared with 17.9% for the peer group, while Search Price is 7% above peers. This suggests that the main opportunity is to understand how the partner's price and offer conditions affect their visibility and ability to attract travellers on Booking.com.",
      note: 'In an On-Platform Competitiveness context, the primary pricing gap can be translated to Performance Gap. In this example, the performance gap appears to be in the upper funnel.',
    },
    {
      stepNumber: 3,
      phase: 'Diagnose',
      title: 'Intent and root causes - What is causing the pricing gaps?',
      body: "The inactive product setup may indicate a product or foundation opportunity, but do not assume this is the root cause. Check the partner's strategy, previous conversations and setup before deciding whether the issue is deliberate or an oversight. The aim is to understand whether the partner has chosen this approach or may not be aware of the impact on their performance.",
    },
    {
      stepNumber: 4,
      phase: 'Diagnose',
      title: 'Evidence - What data supports my diagnosis?',
      body: "In this case, the evidence pack should connect the visibility gap to the partner's search price & product setup. The partner has 50% unsold rooms, Sell Through Rate is 10% below peers, Visibility Share is 10.3% compared with 17.9%, and Search Price is 7% above peers. The setup also shows that Mobile Rates, Country Rates, Portfolio Deals, Campaigns, Genius Pricing, Base Rate Plan and Payments are inactive, while Family Rates are active.",
    },
    {
      stepNumber: 5,
      phase: 'Act',
      title: 'Plan - What do I want to achieve?',
      intro: 'Before you prepare any conversation, define what success looks like.',
      body: 'In this case, at partner level, what specific outcome do you want from this meeting? A clear objective keeps you focused and makes your follow-up measurable. The partner-level objective could be to understand whether a targeted product or setup change can improve discoverability and sell-through without changing rates broadly. Agree what will be tested, define success using Visibility Share, Sell Through Rate and Unsold Rooms, and set a review point to assess the impact before deciding on the next step.',
    },
    {
      stepNumber: 6,
      phase: 'Act',
      title: "Conversation angle - What's my conversation angle?",
      intro: 'You have the diagnosis and the plan. Now pick the most effective angle that will make this partner lean in.',
      body: "In this case, lead with the traveller-impact story: the partner is seen less, not chosen less. Visibility Share is 10.3% compared with 17.9% for peers, Search Price is 7% above peers, and 50% of rooms are unsold. Use this to open a neutral conversation about how the partner's pricing and product setup may affect visibility and sell-through on Booking.com. Avoid promising ranking outcomes or moving directly to a broad rate reduction.",
    },
  ],
  summary: {
    rows: [
      { label: 'Trigger', value: 'Performance outcome (OPC metric signal).' },
      { label: 'Primary issue', value: 'Underperforming on platform vs peer group.' },
      {
        label: 'Intent & root cause',
        value: 'Likely a product or foundation opportunity, with intent to be clarified with partner.',
      },
      {
        label: 'Evidence',
        value: 'Unsold inventory, weaker visibility, and higher search price vs peer ; Multiple pricing product opportunities.',
      },
      {
        label: 'Plan',
        value: "Neutrally understand the partner's pricing strategy and agree on a timeline to test and review adjustments outcome.",
      },
    ],
    hook: 'Lead with the traveller-impact story and OPC performance to neutrally explore how pricing and product setup may affect visibility and sell-through on Booking.com.',
  },
};

// ─────────────────────────────────────────────────────────────────
// Generic Pricing Pathway - every other partner, every other round.
// Deck slides 24-29. No summary card (deck slide 30).
// ─────────────────────────────────────────────────────────────────

const genericPathway: PricingPathwayContent = {
  variant: 'generic',
  steps: [
    {
      stepNumber: 1,
      phase: 'Prioritise',
      title: 'Trigger - What am I seeing?',
      body: "Something flagged for this partner. Before you dive in, identify what type of signal you're reacting to - is it a performance drop (room nights, conversion), a pricing (e-RPD) or a EPO-gating programme eligibility change? The trigger indicates a pricing opportunity or problem for you to look into.",
    },
    {
      stepNumber: 2,
      phase: 'Prioritise',
      title: 'Primary pricing gaps - Where are the primary pricing gaps?',
      body: "You've seen the signal - now pinpoint where the primary gap sits. Check: is the partner less competitive versus their own website (Brand.com), versus a Key OTA, or versus their peer group on-platform (OPC)? One partner can have multiple gaps - your job is to identify the primary one that's driving the most impact.",
    },
    {
      stepNumber: 3,
      phase: 'Diagnose',
      title: 'Intent and root causes - What is causing the pricing gaps?',
      body: 'You know where the gap is. Now work out why. Review what you already know about this partner - previous conversations, their setup, their strategy. Then ask: did the partner choose this (intentional), or is it an oversight they may not be aware of (unintentional)? This distinction changes how you frame the conversation.',
    },
    {
      stepNumber: 4,
      phase: 'Diagnose',
      title: 'Evidence - What data supports my diagnosis?',
      body: 'Ask yourself: if the partner challenged my analysis, would my data hold up? Build an evidence pack you can confidently refer to - metric patterns, scenario frequency, screenshots, and on-platform comparisons.',
    },
    {
      stepNumber: 5,
      phase: 'Act',
      title: 'Plan - What do I want to achieve?',
      body: "Set your objective at the right altitude. For your portfolio: connect to the country eRPD objective direction and pick the driver metric you're focused on this quarter. For this specific partner: define the concrete outcomes you want from the conversation - a foundation fix, a product activation, or a commitment to review.",
    },
    {
      stepNumber: 6,
      phase: 'Act',
      title: "Conversation angle - What's my conversation angle?",
      body: "Put yourself in the partner's shoes. Which framing will resonate most - a performance story (OPC), a pricing gap story (RPD Scenario), or something you've uncovered through your own analysis? The best angle is not the one with the most data behind it - it's the one that connects to what this partner already cares about.",
    },
  ],
};

/**
 * Strip the regime / journey suffix from a partner id to get the base
 * hotel id (e.g. `royal-crest-wide` / `royal-crest-cross-regional` ->
 * `royal-crest`), so the detailed-pathway check matches Royal Crest in
 * every regime and in the KAM journey.
 */
function basePartnerId(partnerId: string): string {
  return partnerId.replace(/-(wide|narrow|none|cross-regional)$/, '');
}

/**
 * Resolve the Pricing Pathway drawer content for a partner-round.
 * Royal Crest gets its detailed, SME-validated pathway at Round 1 (XPC)
 * and Round 11 (OPC); everyone else - including Royal Crest as a decoy
 * in any other round - gets the generic pathway.
 */
export function getPricingPathwayContent(
  partnerId: string,
  round: number,
): PricingPathwayContent {
  if (basePartnerId(partnerId) === 'royal-crest') {
    if (round === 1) return royalCrestR1;
    if (round === 11) return royalCrestR11;
  }
  return genericPathway;
}
