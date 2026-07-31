/**
 * Game Master chat script for Level 0.
 *
 * The GM is "Alex" - a stylised senior LPS who briefs the learner on
 * day one. The script is a sequence of beats: plain messages from
 * Alex, and question beats where the learner picks a reply.
 *
 * Question content is sourced verbatim or near-verbatim from
 * docs/level-0-knowledge-checks-draft.md (sections A and B).
 */

export type GMOption = {
  text: string;
  isCorrect: boolean;
};

export type GMQuestion = {
  /** ID matching the source KC item (for scoring / progress tracking). */
  itemId: string;
  prompt: string;
  options: GMOption[];
  /** Alex's response after the learner picks an answer. */
  followUp: {
    correct: string;
    incorrect: string;
  };
};

export type GMBeat =
  | { type: 'message'; text: string }
  | { type: 'question'; question: GMQuestion };

export const gmCharacter = {
  name: 'Alex',
  role: 'Senior LPS',
  avatarInitial: 'A',
};

export const gmScript: GMBeat[] = [
  {
    type: 'message',
    text: "Hey {{name}} - good to meet you. I'm Alex. I run point on price competitiveness around here.",
  },
  {
    type: 'message',
    text: "Before I let you anywhere near a real partner, I need to know you've got the basics down. Quick chat, won't take long. Stop me if anything sounds off.",
  },
  {
    type: 'question',
    question: {
      itemId: 'A1',
      prompt: "Let's start easy. What does eRPD actually stand for?",
      options: [
        { text: 'Estimated Revenue Per Day', isCorrect: false },
        { text: 'Experienced Relative Price Difference', isCorrect: true },
        { text: 'External Rate Performance Data', isCorrect: false },
      ],
      followUp: {
        correct:
          "Right. Experienced Relative Price Difference - it tells us how much cheaper or more expensive Booking.com is compared to Brand.com and Key OTAs, based on what travellers actually see.",
        incorrect:
          "Not quite. It's Experienced Relative Price Difference. Tells us how cheap or expensive we are compared to Brand.com and Key OTAs from the traveller's point of view.",
      },
    },
  },
  {
    type: 'message',
    text: "OK, second one.",
  },
  {
    type: 'question',
    question: {
      itemId: 'A2',
      prompt: 'When eRPD goes DOWN, are our prices getting more or less competitive?',
      options: [
        { text: 'Less competitive vs Brand.com and Key OTAs', isCorrect: false },
        { text: 'More competitive vs Brand.com and Key OTAs', isCorrect: true },
        { text: "It depends on the partner's tier", isCorrect: false },
      ],
      followUp: {
        correct:
          "Exactly. Lower eRPD means we're cheaper relative to competitors. The 2026 goal is literally to get this number lower vs last year.",
        incorrect:
          "Other way around. Lower eRPD means we're cheaper relative to competitors - so going DOWN is what we want. The 2026 objective is explicitly to lower it vs last year.",
      },
    },
  },
  {
    type: 'question',
    question: {
      itemId: 'A3',
      prompt: 'eRPD is one number, but it combines two underlying metrics. Which two?',
      options: [
        { text: 'Public RPD and Loyal RPD', isCorrect: true },
        { text: 'Public RPD and Cross-channel RPD', isCorrect: false },
        { text: 'Loyal RPD and Genius RPD', isCorrect: false },
      ],
      followUp: {
        correct:
          'Yep. Public RPD covers non-logged-in travellers, Loyal covers logged-in Genius members. We blend the two by share of searches.',
        incorrect:
          "It's Public RPD and Loyal RPD. Public is non-logged-in travellers, Loyal is Genius members - we blend them by share of searches into one number.",
      },
    },
  },
  {
    type: 'question',
    question: {
      itemId: 'A4',
      prompt: 'OK, last metric one. Which of these is NOT a driver metric for eRPD?',
      options: [
        { text: 'Public Pricing Adoption %', isCorrect: false },
        { text: 'Genius Pricing Adoption %', isCorrect: false },
        { text: 'Review Score', isCorrect: true },
        { text: 'Competitive Partner Share', isCorrect: false },
      ],
      followUp: {
        correct:
          "Right. Review Score isn't on the pricing pyramid - it shapes overall partner performance but it isn't a pricing driver. The drivers are Public RPD, Loyal RPD, the two Adoption metrics, and Competitive Partner Share.",
        incorrect:
          "Review Score is the odd one out - it shapes overall partner performance but it isn't a pricing driver. The pyramid is Public RPD, Loyal RPD, Public Pricing Adoption, Genius Pricing Adoption, and Competitive Partner Share.",
      },
    },
  },
  {
    type: 'message',
    text: "Right. A couple more on the fundamentals before we move on.",
  },
  {
    type: 'question',
    question: {
      itemId: 'A5',
      prompt:
        'Roughly how much ABRN growth do we get for every 1% improvement in RPD?',
      options: [
        { text: 'About 0.5%', isCorrect: false },
        { text: 'About 2 to 3%', isCorrect: true },
        { text: 'About 10%', isCorrect: false },
      ],
      followUp: {
        correct:
          "Right. Roughly 2 to 3 percent ABRN uplift for every 1 percent improvement in RPD. Sounds small, but it compounds fast across a portfolio - that's why price competitiveness is the lever we lean on.",
        incorrect:
          "It's about 2 to 3 percent ABRN uplift per 1 percent improvement in RPD. Doesn't sound huge on paper, but it compounds fast across a portfolio - that's why we treat price competitiveness as the primary lever.",
      },
    },
  },
  {
    type: 'question',
    question: {
      itemId: 'A6',
      prompt:
        "Competitive Partner Share tells us the proportion of a portfolio's partner value sitting in which eRPD range?",
      options: [
        { text: 'eRPD greater than 12% (the least competitive band)', isCorrect: false },
        { text: 'eRPD 3% to 6% (the middle band)', isCorrect: false },
        { text: 'eRPD less than or equal to 0% (the competitive band)', isCorrect: true },
      ],
      followUp: {
        correct:
          "Yep. eRPD less than or equal to zero is the 'competitive' zone. Competitive Partner Share tells us how much of a portfolio's partner value is sitting inside it. Purely internal prioritisation - it never goes into a partner conversation.",
        incorrect:
          "It's eRPD less than or equal to zero - the 'competitive' zone. Competitive Partner Share tells us how much of a portfolio's partner value sits inside that band, so we know where the healthy price competitiveness lives. Internal only, don't put it into a partner conversation.",
      },
    },
  },
  {
    type: 'message',
    text: "Some context to set up the next few questions. When you look at a partner's pricing there are two flavours of competitiveness. On-Platform Competitiveness - OPC - is how they stack up against their peer set inside Booking.com. Cross-Platform Competitiveness is how they compare with their own Brand.com rates and other OTAs. Both matter, but there's a reason we start on-platform.",
  },
  {
    type: 'question',
    question: {
      itemId: 'A7',
      prompt:
        'Roughly what share of bookings on Booking.com come from customers who discover the property directly on the platform?',
      options: [
        { text: '50%', isCorrect: false },
        { text: '70%', isCorrect: false },
        { text: 'Around 90%', isCorrect: true },
        { text: '30%', isCorrect: false },
      ],
      followUp: {
        correct:
          "Yep. Around nine in ten. That's why On-Platform Competitiveness is the primary lever - win how you stack up against your peer set inside Booking.com and you win where the vast majority of your traffic lives.",
        incorrect:
          "Around 90%. Nine in ten travellers who book on Booking.com discovered the property here, not somewhere else. That's why OPC - how you sit against your peer set inside the platform - is the lever we spend most of our time on.",
      },
    },
  },
  {
    type: 'question',
    question: {
      itemId: 'A8',
      prompt:
        "You're working a No Parity market. Which framing is neutral and safe to raise in every call?",
      options: [
        {
          text: "How the partner's pricing compares against similar properties on Booking.com",
          isCorrect: true,
        },
        {
          text: "How the partner's pricing compares against their Brand.com rates",
          isCorrect: false,
        },
        { text: 'Both, if you frame them carefully', isCorrect: false },
        { text: "Neither - pricing framing isn't allowed in No Parity", isCorrect: false },
      ],
      followUp: {
        correct:
          "Right. On-Platform Competitiveness is regime-neutral because it's about how travellers experience Booking.com, not the partner's external strategy. You can lead with it in Wide, Narrow, and No Parity alike. Cross-platform framing carries regime-specific rules - in No Parity you can only raise it reactively if the partner brings it up first. And here's the bonus: fixing OPC often improves the partner's cross-platform position too, because the same base rate and discount stack usually show up across channels.",
        incorrect:
          "It's the on-platform comparison. OPC is regime-neutral because it's about how travellers experience Booking.com, not the partner's external strategy - so it's safe in Wide, Narrow, and No Parity alike. Cross-platform framing needs the regime rules applied. And the payoff: fixing OPC often improves the partner's cross-platform position too, because the same base rate and discount stack usually show up across channels.",
      },
    },
  },
  {
    type: 'message',
    text: "Now the OPC metric family, which sets up the next few questions. When Level 2 unlocks and you get access to the OPC dashboard, you'll see a family of six new metrics. I'm not going to walk you through how to use each one in a diagnostic (that's the TLX training that lands with the dashboard). But it's worth knowing how each one links to eRPD, because that's the anchor you've already got. Some of them feed into eRPD, some are downstream of it, and knowing which is which is how you'll read the dashboard when it arrives.",
  },
  {
    type: 'question',
    question: {
      itemId: 'A9',
      prompt:
        'Which of the new OPC metrics is a direct INPUT to how eRPD is calculated?',
      options: [
        { text: 'Search Price', isCorrect: true },
        { text: 'Visibility Share', isCorrect: false },
        { text: 'Sell Through Rate', isCorrect: false },
        { text: 'Net Booked Share', isCorrect: false },
      ],
      followUp: {
        correct:
          "Right. Search Price is the average public price shown on the front-end, weighted by visitors. eRPD compares your Search Price against the peer set's Search Prices to produce a competitiveness position. So Search Price is upstream of eRPD; change one and you change the other. The other OPC metrics either sit downstream of eRPD or are independent context.",
        incorrect:
          "It's Search Price. eRPD compares your Search Price (the average public price shown on the front-end) against the peer set's Search Prices. Search Price is the upstream input; the rest sit downstream of eRPD or are independent context.",
      },
    },
  },
  {
    type: 'question',
    question: {
      itemId: 'A10',
      prompt:
        "A partner's eRPD has been uncompetitive for two quarters. Which OPC metric is most likely to have suffered as a direct consequence?",
      options: [
        { text: 'Visibility Share', isCorrect: true },
        { text: 'Search Price', isCorrect: false },
        { text: 'Search Month Distribution', isCorrect: false },
        { text: 'Sell Through Rate', isCorrect: false },
      ],
      followUp: {
        correct:
          'Right. Uncompetitive eRPD pushes the property down in ranking, so it appears in fewer destination searches. Visibility Share is the direct downstream signal. Sell Through Rate would also slip as a consequence, but that\'s second-order (visibility hurts conversion hurts throughput); the direct hit is Visibility Share. Search Month Distribution is seasonality and moves independently of pricing.',
        incorrect:
          "It's Visibility Share. Uncompetitive eRPD pushes the property down in ranking, so it appears in fewer destination searches. Sell Through Rate would fall too as a knock-on (via visibility hurting conversion), but that's second-order; the direct hit is Visibility Share.",
      },
    },
  },
  {
    type: 'question',
    question: {
      itemId: 'A11',
      prompt:
        "A partner's Sell Through Rate has fallen and Unsold Rooms have climbed. Their eRPD is trending up (worsening). What's the most likely connection?",
      options: [
        {
          text: 'Uncompetitive pricing has reduced visibility and conversion, so less inventory clears',
          isCorrect: true,
        },
        {
          text: 'The metrics are unrelated; supply and pricing move independently',
          isCorrect: false,
        },
        { text: 'Sell Through Rate directly determines eRPD', isCorrect: false },
        {
          text: 'Higher eRPD forces the partner to hold back inventory',
          isCorrect: false,
        },
      ],
      followUp: {
        correct:
          'Yep. Rising eRPD (worsening competitiveness) reduces the property\'s ranking and conversion. Fewer travellers see it, fewer of those who see it convert, so more inventory sits unsold at the end of the period. Sell Through Rate falls, Unsold Rooms rises. Both are supply-side symptoms of an upstream pricing problem.',
        incorrect:
          "The connection runs from eRPD to Visibility Share to conversion to inventory. Rising eRPD hurts ranking, so fewer travellers see the property; fewer of those convert; so more rooms sit unsold. Sell Through Rate and Unsold Rooms are downstream symptoms of the pricing problem, not independent of it.",
      },
    },
  },
  {
    type: 'question',
    question: {
      itemId: 'A12',
      prompt:
        "Net Booked Share is Booking.com's share of a partner's total capacity, either historically or forward-looking. How does it relate to eRPD?",
      options: [
        {
          text: "It's a compound outcome; competitive eRPD tends to grow Net Booked Share over time, alongside visibility and inventory decisions",
          isCorrect: true,
        },
        {
          text: "They're independent; NBS is about capacity, eRPD is about pricing",
          isCorrect: false,
        },
        {
          text: 'It replaces eRPD as the on-platform performance measure',
          isCorrect: false,
        },
        { text: 'eRPD is calculated FROM Net Booked Share', isCorrect: false },
      ],
      followUp: {
        correct:
          'Right. Net Booked Share is the aggregate outcome, blending eRPD (are we competitive), Visibility Share (are we seen), and inventory decisions. When eRPD trends competitive over time, Net Booked Share tends to grow because the platform is winning more of the partner\'s capacity. When eRPD drifts uncompetitive, NBS slows. Other factors can move NBS too, like inventory allocation and capacity constraints, but eRPD is a major driver.',
        incorrect:
          "Net Booked Share is a compound outcome. Competitive eRPD tends to grow it over time because winning the pricing competition means Booking.com captures more of the partner's capacity. Visibility Share and inventory decisions also feed in, but eRPD is a major driver. It doesn't replace eRPD or derive from it, they're linked but distinct.",
      },
    },
  },
  {
    type: 'message',
    text: "Good. Now an important one - this trips people up.",
  },
  {
    type: 'question',
    question: {
      itemId: 'B1',
      prompt:
        'A partner shows you data that their direct website is converting better than their Booking.com listing this month. What is that telling you about?',
      options: [
        { text: 'On-platform competitiveness on Booking.com', isCorrect: false },
        { text: 'Cross-channel competitiveness', isCorrect: true },
        { text: 'eRPD vs Key OTAs', isCorrect: false },
      ],
      followUp: {
        correct:
          'Spot on. Cross-channel is comparing us to other places they sell - their site, other OTAs. On-platform is only about how they perform within Booking.com against similar properties.',
        incorrect:
          "It's cross-channel. On-platform is only about performance WITHIN Booking.com - against similar properties on the platform. The moment another channel enters the picture, you're in cross-channel territory. Worth keeping that boundary clear in conversations.",
      },
    },
  },
  {
    type: 'message',
    text: "One last one - about what happens if we let things drift.",
  },
  {
    type: 'question',
    question: {
      itemId: 'B2',
      prompt:
        'A partner is consistently priced higher than similar properties on the platform. What compounds if they leave it alone?',
      options: [
        { text: 'Not much - they lose a few bookings this week, that\'s it', isCorrect: false },
        {
          text: "They accrue 'visibility debt': fewer clicks, weaker ranking over time, and recovery gets expensive",
          isCorrect: true,
        },
        { text: 'They get automatically moved to a lower price bucket', isCorrect: false },
      ],
      followUp: {
        correct:
          "That's it. 'Visibility debt' is the term. Uncompetitive pricing over time means they get shown less, ranking weakens, and pulling it back later usually needs heavy last-minute discounts or serious investment. Cheaper to keep price competitive in the first place.",
        incorrect:
          "It's called 'visibility debt'. Consistent uncompetitive pricing means the platform shows them less, ranking weakens, and recovery later takes heavy last-minute discounts or significant investment. Much cheaper to prevent than repair.",
      },
    },
  },
  {
    type: 'message',
    text: "Right. That'll do for the metrics side. You've got more to do before clearance, but you're not going to embarrass us on the basics. Off you go.",
  },
];
