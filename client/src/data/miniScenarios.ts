/**
 * Mini-scenarios activity content.
 *
 * Four short case files inserted into clearance between Call Audit and
 * the Pricing Pathway reveal. Each scenario walks a mini-version of the
 * Pricing Pathway (Signal, Diagnose, Narrative, Next step) on a
 * different pricing situation. Purpose: exercise the diagnostic
 * pattern in variety BEFORE Alex formalises it as the seven-step
 * framework in the reveal that follows.
 *
 * Copy sourced verbatim from the SME doc, with three edits per the
 * session's copy-review pass:
 *   - Smart quotes / em dashes / en dashes normalized (CLAUDE.md rule).
 *   - Scenario 3 Step 3 prompt "What should the AM/PFR say?" replaced
 *     with "What is the strongest response?" (role-agnostic copy).
 *   - Family Ready framework references kept as-is (well-known to
 *     learners per SME confirmation).
 *
 * Each step is scored independently and emits a KnowledgeCheckResult.
 * itemIds are `mini-scenario-{scenarioId}-{stepId}` so the Clearance
 * Summary retry path can filter to just the missed steps.
 */

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
  /** Visual theme - drives cover-card gradient + icon selection. */
  theme: MiniScenarioTheme;
  /**
   * URL for the property hero photo shown on the case-file cover.
   * Currently sourced from Unsplash CDN URLs already validated by the
   * existing partner records - joins the pre-existing SCORM debt
   * (runtime network call, banned in the CLAUDE.md rules for a
   * self-contained SCORM zip). Both this and the existing partner
   * images should be swapped to bundled WebP under
   * client/src/assets/ before final ship.
   */
  heroImage: string;
  steps: MiniScenarioStep[];
  goodOutcome: string;
  badOutcome: string;
}

export const miniScenarios: MiniScenario[] = [
  // ── Scenario 1: The Partner Channel Strategy Gap ──
  {
    id: 'brand-gap',
    propertyName: 'Hotel Castellana',
    scenarioTitle: 'The Brand.com channel gap',
    objective:
      "Recognize that a Brand.com gap is a signal to diagnose, not a reason to pressure the partner, and guide the conversation toward a compliant, performance-led next step.",
    theme: 'brand-gap',
    heroImage:
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=1000&fit=crop',
    steps: [
      {
        id: 'signal',
        label: 'Signal',
        showBullets: [
          'The partner is more competitive on their own website than on Booking.com.',
          'Brand eRPD is above 0%.',
        ],
        prompt: 'What should you take from this first?',
        options: [
          {
            id: 'A',
            text: 'The partner is deliberately trying to reduce their volume on Booking.com and steer travelers to their direct site, which needs addressing straight away.',
          },
          {
            id: 'B',
            text: 'This is a signal that the partner could be more competitive on Booking.com and the cause needs to be understood.',
          },
          {
            id: 'C',
            text: "The partner's overall performance is likely fine because they are competitive on their direct site, so no follow-up is needed unless another metric moves.",
          },
        ],
        correctOptionId: 'B',
        correctCoaching:
          'A Brand.com gap is a signal to investigate, not a compliance flag or something to dismiss.',
      },
      {
        id: 'diagnose',
        label: 'Diagnose',
        prompt: 'What is the best first response to the partner?',
        options: [
          {
            id: 'A',
            text: '"Your prices on Booking.com need to align with your direct site if you want to stay competitive here, so let\'s talk through how you can bring them in line across both channels."',
          },
          {
            id: 'B',
            text: '"You are free to choose your pricing and distribution strategy. I would like to understand whether these differences are intentional, unintentional, or a mix so we can review the impact on your performance on Booking.com."',
          },
          {
            id: 'C',
            text: '"If this pattern continues you\'ll see your visibility on Booking.com drop and your ranking start to slide, so it would be worth bringing your prices here in line with your direct site."',
          },
        ],
        correctOptionId: 'B',
        correctCoaching:
          'Lead with partner freedom, then ask to understand intent. Neutral, non-directive, compliant.',
      },
      {
        id: 'narrative',
        label: 'Narrative',
        prompt: 'Which commercial explanation is strongest?',
        options: [
          {
            id: 'A',
            text: '"Most customers compare options directly on Booking.com and on the app. If your price is less competitive here, you may lose visibility and conversion to other properties. When you become more competitive versus the peer group, you can improve bookings, so it is worth reviewing what price you want to make available on Booking.com."',
          },
          {
            id: 'B',
            text: '"If you want to grow bookings you should always make sure Booking.com is your cheapest channel, because travelers will book wherever the price is best and that is what our platform is set up to reward with better visibility."',
          },
          {
            id: 'C',
            text: '"Whenever we see a partner more competitive on their direct site we should push back on that gap and require them to bring their Booking.com prices in line, especially in markets where they are formally required to do so."',
          },
        ],
        correctOptionId: 'A',
        correctCoaching:
          'Explain the platform mechanics factually, then invite a review. Never dictate the partner\'s pricing across channels.',
      },
      {
        id: 'next-step',
        label: 'Next step',
        prompt: 'What should happen next?',
        options: [
          {
            id: 'A',
            text: 'Ask the partner to bring their prices across every channel in line with the price they show on Booking.com so travelers see a consistent offer wherever they search.',
          },
          {
            id: 'B',
            text: 'Share the benchmark data with the partner, thank them for their time, and leave the choice of any follow-up entirely with them without any coaching on what the data means for their performance.',
          },
          {
            id: 'C',
            text: 'If the gap is unintentional, help fix it; if it is intentional, keep the discussion neutral and explain how that pricing choice may affect visibility and conversion on Booking.com.',
          },
        ],
        correctOptionId: 'C',
        correctCoaching:
          'Match the action to the intent. Neither pressure nor abandon - the partner\'s strategy sets the shape of the next step.',
      },
    ],
    goodOutcome:
      'You treated the Brand.com gap as a signal, diagnosed before pitching, stayed compliant, and landed on a realistic next step based on the partner\'s actual pricing strategy.',
    badOutcome:
      'You jumped too quickly into a price challenge, skipped the diagnosis, and turned a performance conversation into a compliance or pressure moment.',
  },

  // ── Scenario 2: The Mobile / App Gap ──
  {
    id: 'mobile-gap',
    propertyName: 'Coastal View Resort',
    scenarioTitle: 'The mobile and app gap',
    objective:
      "Identify that the issue is device-specific, diagnose the likely setup gap, and propose a targeted mobile solution without sounding forceful.",
    theme: 'mobile-gap',
    heroImage:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=1000&fit=crop',
    steps: [
      {
        id: 'signal',
        label: 'Signal',
        showBullets: [
          'The RPD Scenarios dashboard shows the partner is consistently cheaper on a competitor\'s app.',
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
          'The partner has told you the setup hasn\'t been reviewed. Investigate that setup before anything else.',
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
          'Explain the audience impact factually, then offer a targeted option. No threats, no over-broad ask.',
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
  },

  // ── Scenario 3: The "Offset" Genius Discount ──
  {
    id: 'genius-offset',
    propertyName: 'Grandview Inn',
    scenarioTitle: 'The offset Genius discount',
    objective:
      "Recognize low-quality Genius adoption, explain why the discount is not delivering real traveler value, and guide the partner back to fixing the base price first.",
    theme: 'genius-offset',
    heroImage:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=1000&fit=crop',
    steps: [
      {
        id: 'signal',
        label: 'Signal',
        showBullets: [
          'The partner joined Genius.',
          'Public base prices went up immediately after activation.',
          'The member price now looks close to the old public price.',
        ],
        prompt: 'What is the issue here?',
        options: [
          {
            id: 'A',
            text: 'This may be low-quality adoption because the base rate was raised to offset the Genius discount.',
          },
          {
            id: 'B',
            text: 'This is a strong Genius setup because both public and member prices moved together, showing the partner is running a coordinated pricing change across their audience.',
          },
          {
            id: 'C',
            text: 'This only affects the loyal Genius audience, so the impact on public competitiveness or peer benchmarks is limited and does not need urgent follow-up.',
          },
        ],
        correctOptionId: 'A',
        correctCoaching:
          'A public rate that climbs the moment Genius activates is the classic offset pattern - the member price is nominally discounted but the traveler sees no real saving.',
      },
      {
        id: 'diagnose',
        label: 'Impact',
        prompt: 'Which explanation is best?',
        options: [
          {
            id: 'A',
            text: '"The main issue is that travelers might complain if they notice the base price went up, which could hurt reviews and how the partner is perceived by future guests."',
          },
          {
            id: 'B',
            text: '"It does not really matter whether the discount is genuine as long as the Genius badge shows on the listing, because that is what drives the audience to book in the first place."',
          },
          {
            id: 'C',
            text: '"If the base price is inflated first, the discount stops feeling genuine, so travelers and algorithms see less real value and the product becomes less effective."',
          },
        ],
        correctOptionId: 'C',
        correctCoaching:
          'Both travelers and platform signals key off real value delivered. An inflated base undermines both.',
      },
      {
        id: 'narrative',
        label: 'Narrative',
        prompt: 'What is the strongest response?',
        options: [
          {
            id: 'A',
            text: '"You are not allowed to raise your public rates at the moment you activate Genius, so you will need to bring those prices back down before we can review the setup any further."',
          },
          {
            id: 'B',
            text: '"If you carry on with this pattern we may end up needing to reduce your visibility on the platform, so it would be worth adjusting your base price now before that becomes a problem."',
          },
          {
            id: 'C',
            text: '"The goal is to make sure discounts create genuine value for travelers. If the base price rises first, the Genius offer becomes less meaningful. Let\'s review the base setup first so the member price reflects real savings."',
          },
        ],
        correctOptionId: 'C',
        correctCoaching:
          'Anchor on traveler value, not on rules or threats. That frames the fix as improving the product for everyone.',
      },
      {
        id: 'next-step',
        label: 'Next step',
        prompt: 'What is the best next step?',
        options: [
          {
            id: 'A',
            text: 'Pause all pricing conversations with this partner until the Genius setup has been reviewed by another team, so we do not risk pushing them into another change too quickly.',
          },
          {
            id: 'B',
            text: 'Review and correct the base price first, then make sure the Genius discount creates a genuine experienced price improvement.',
          },
          {
            id: 'C',
            text: 'Layer additional public discounts on top of the current Genius setup straight away so the overall member price ends up more competitive against peers on the platform.',
          },
        ],
        correctOptionId: 'B',
        correctCoaching:
          'Fix the base, then the discount. Layering more discounts on top of an inflated base compounds the problem.',
      },
    ],
    goodOutcome:
      'You identified low-quality adoption, explained the issue in a performance-led way, and guided the partner toward restoring genuine traveler value.',
    badOutcome:
      'You focused on the discount label instead of the real price experience, so the root cause remained unresolved.',
  },

  // ── Scenario 4: The Family / Occupancy Undercut ──
  {
    id: 'family-undercut',
    propertyName: 'Sunfield Apartments',
    scenarioTitle: 'The family and occupancy undercut',
    objective:
      "Recognize that the gap may come from family setup, not broad pricing, and guide the partner through a foundations-first fix.",
    theme: 'family-undercut',
    heroImage:
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=1000&fit=crop',
    steps: [
      {
        id: 'signal',
        label: 'Signal',
        showBullets: [
          'The property is more expensive for 2 adults + 1 child on Booking.com than on Brand.com or another OTA.',
          'The partner says they did not intend to price families differently.',
        ],
        prompt: 'What is the most likely explanation?',
        options: [
          {
            id: 'A',
            text: 'A family or occupancy setup issue is making the property look artificially expensive.',
          },
          {
            id: 'B',
            text: 'The partner needs to bring their base rates down across every room type so families see a more competitive offer whenever they search the platform.',
          },
          {
            id: 'C',
            text: "The property's review score or content is probably the real reason families are converting better on other sites, so pricing may not be the main lever here.",
          },
        ],
        correctOptionId: 'A',
        correctCoaching:
          'When a gap only shows up for a specific occupancy shape, look at the occupancy setup before broader pricing.',
      },
      {
        id: 'diagnose',
        label: 'Framework',
        contextNote:
          'The Family Ready Journey says the sequence is first Get found through capacity settings, then Get booked through child pricing and cot setup.',
        prompt: 'What should you check first?',
        options: [
          {
            id: 'A',
            text: 'Set up a public promotion straight away so families searching now can see a more competitive rate while the deeper setup review happens in the background.',
          },
          {
            id: 'B',
            text: 'Ask the partner to copy the family offer that a nearby competitor is running so they can match what those travelers are already comparing against.',
          },
          {
            id: 'C',
            text: 'Review adult, child, and infant capacity settings before discussing broader pricing actions.',
          },
        ],
        correctOptionId: 'C',
        correctCoaching:
          'Foundations first: if the property cannot be found in family searches, no promotion will land.',
      },
      {
        id: 'narrative',
        label: 'Narrative',
        prompt: 'Which response is best?',
        options: [
          {
            id: 'A',
            text: '"Your setup may be making you look uncompetitive in family searches. Let\'s fix the child and occupancy configuration first so families can find and book the rooms you already want to sell."',
          },
          {
            id: 'B',
            text: '"You should run a family discount that applies across every room type on the platform so any family traveler searching sees a lower rate than they did before."',
          },
          {
            id: 'C',
            text: '"This is really a broader pricing problem across all your channels, so the fix is to bring your family pricing on your direct site and other partners in line with what you are showing on Booking.com."',
          },
        ],
        correctOptionId: 'A',
        correctCoaching:
          'Name the setup issue, propose the foundations-first fix, and connect it to bookings the partner already wants.',
      },
      {
        id: 'next-step',
        label: 'Next step',
        contextNote:
          'The Family Ready guidance recommends a two-stage approach: make sure rooms can appear in family searches, then improve competitiveness through child pricing and cot availability where relevant.',
        prompt: 'What is the best next step?',
        options: [
          {
            id: 'A',
            text: 'Guide the partner to correct child policies, occupancy and capacity settings, and derived children pricing, and review cots if relevant.',
          },
          {
            id: 'B',
            text: 'Tell the partner to lower all their base rates for family travelers on every channel they distribute through so the gap disappears in one clean move.',
          },
          {
            id: 'C',
            text: 'Leave the family setup as it is for now and monitor the numbers over the next few weeks to see whether the gap corrects itself before taking any action.',
          },
        ],
        correctOptionId: 'A',
        correctCoaching:
          'Fix the family-setup fundamentals in order. Broad discounts and passive monitoring both miss the real issue.',
      },
    ],
    goodOutcome:
      'You treated the issue as a family setup problem first, followed the right foundations-first logic, and helped the partner improve visibility and conversion without pushing a broad promotion.',
    badOutcome:
      'You treated a family configuration gap like a generic pricing problem and missed the operational fix that would have solved the issue faster.',
  },
];

/** Total scored KC items across all scenarios: 4 scenarios x 4 steps. */
export const miniScenarioTotalItems = miniScenarios.reduce(
  (acc, s) => acc + s.steps.length,
  0,
);

/** Build the stable KC itemId for a given scenario+step. */
export function miniScenarioItemId(scenarioId: string, stepId: string): string {
  return `mini-scenario-${scenarioId}-${stepId}`;
}
