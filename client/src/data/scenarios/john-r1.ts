import type { BranchingConversationTree } from '../../types';

/**
 * John - "The Brand.com Loyalist" - Round 1
 *
 * Wide Parity scenario. John runs a hotel with a brand-first
 * distribution strategy and a hard mental rule ("never let an OTA
 * have more than 30% of my business"). The AM's job is to reframe
 * his view of Booking.com from "competitor for direct guests" to
 * "billboard for incremental new guests".
 *
 * Source: SME-authored dialogue (PDF, Competitive Pricing Learning
 * Game Personas). Uses the Gemini-shortened version of the script
 * to keep on-screen copy minimal.
 *
 * Issue Tree path the learner should land on via the Helper:
 *   Trigger: Performance Outcome or Pricing Signal
 *   Issue:   Brand.com eRPD not competitive
 *   Intent:  Intentional
 *   Root:    Structural Partner Channel strategy (brand first)
 *   Metric:  Structural constant non-competitive eRPD > 0%
 *   Hook:    On-platform competitiveness narrative + data
 *            > Base rate misalignment
 */
export const johnR1: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'john',
  round: 1,
  issueTreePath: {
    trigger: 'performance-outcome',
    issueId: 'brand-com-erpd-not-competitive',
    intent: 'intentional',
    rootCauseId: 'structural-brand-first',
    metricInsightId: 'structural-constant-non-competitive-erpd',
    hookId: 'base-rate-misalignment',
  },
  steps: [
    // ── 1. Open: surface his current strategy ──
    {
      id: 'open',
      label: 'Open',
      partnerPrompt:
        "Hi! What did you want to discuss today? I hope it's not another conversation about all the discounts you have on the extranet.",
      options: [
        {
          id: 'john-r1-open-curious',
          label: "Ask how he's driving direct traffic",
          description:
            "Lead with curiosity about his direct-booking focus. Get him talking before raising any concerns.",
          playerDialogue:
            "Don't worry, no discount pitch today. I wanted to follow up on your direct-booking focus. How are you currently driving traffic to your own site?",
          partnerResponse:
            "Yeah, my website is my focus at the moment. We're running sponsored campaigns and offering special direct rates. My XML provider is pushing hard on meta-search.",
          styleMatch: { red: -1, yellow: 1, green: 2, blue: 0 },
          assertiveness: 1,
          compliance: 'safe',
          trustChange: 5,
          optimal: true,
        },
        {
          id: 'john-r1-open-data-led',
          label: 'Open on the revenue gap',
          description:
            'Cut to the headline number straight away - 40% revenue drop on Booking.com.',
          playerDialogue:
            "Actually I wanted to look at your performance with us. You're tracking 40% behind last year on revenue - that's the conversation I'd like to have today.",
          partnerResponse:
            "You're going straight to the numbers. Look, I prioritise my direct channel - that's where the value is. If Booking.com volume is lower, that's a trade-off I'm comfortable with.",
          styleMatch: { red: 2, yellow: -1, green: -2, blue: 1 },
          assertiveness: 3,
          compliance: 'safe',
          trustChange: -3,
        },
        {
          id: 'john-r1-open-discounts',
          label: 'Lead with a Genius pitch',
          description:
            "Open by suggesting he turn on a new discount programme.",
          playerDialogue:
            "I had a look at your account and I think you should turn on the Genius weekend boost - it'll get you more bookings.",
          partnerResponse:
            "Right, this is exactly what I was hoping to avoid. I don't want another discount conversation. I'm trying to protect my margin, not erode it.",
          styleMatch: { red: -2, yellow: -2, green: -2, blue: -2 },
          assertiveness: 2,
          compliance: 'borderline',
          trustChange: -8,
        },
      ],
    },

    // ── 2. Probe acquisition cost ──
    {
      id: 'probe-cost',
      label: 'Probe acquisition cost',
      partnerPrompt:
        "We're seeing volume growth on the direct site, which was the goal.",
      options: [
        {
          id: 'john-r1-probe-roi',
          label: 'Ask about ROI versus other channels',
          description:
            'Make him surface that he doesn\'t know his real acquisition cost.',
          playerDialogue:
            "And is the ROI outperforming your other channels? Specifically, what does a direct guest cost you once you add up the ads and the discounts?",
          partnerResponse:
            "Honestly, I don't have the exact figure. The volume is growing, which is what I wanted. The cost side I haven't broken down line by line.",
          styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
          assertiveness: 2,
          compliance: 'safe',
          trustChange: 4,
          optimal: true,
        },
        {
          id: 'john-r1-probe-volume',
          label: 'Congratulate the volume growth',
          description: 'Stay positive about the partner\'s strategy.',
          playerDialogue:
            "That's great news on the volume. Direct growth is exactly what we love to see for our partners.",
          partnerResponse:
            "Thanks. Yeah, I'm pleased with the trajectory. Was there anything else you wanted to cover?",
          styleMatch: { red: -1, yellow: 1, green: 2, blue: -1 },
          assertiveness: 1,
          compliance: 'safe',
          trustChange: 1,
        },
        {
          id: 'john-r1-probe-warn',
          label: 'Warn him about losing visibility',
          description: 'Push the consequence of de-prioritising Booking.com.',
          playerDialogue:
            "If you keep deprioritising us, your ranking will drop and you'll lose visibility. That'll hurt both of us.",
          partnerResponse:
            "That sounds like a threat. I'm free to choose my channel mix - that's my call to make.",
          styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
          assertiveness: 3,
          compliance: 'risky',
          trustChange: -10,
        },
      ],
    },

    // ── 3. Reframe with the billboard / impressions data ──
    {
      id: 'reframe',
      label: 'Reframe with the billboard data',
      partnerPrompt:
        "But that's the thing - the cost figure isn't my primary worry right now. Volume is.",
      options: [
        {
          id: 'john-r1-reframe-billboard',
          label: 'Connect the impressions to the billboard effect',
          description:
            'Use the 3M impressions data to reframe his view of Booking.com.',
          playerDialogue:
            "Volume is great. But we're seeing a 40% revenue drop on our end. You've had three million impressions on Booking.com recently. Plenty of those guests find you on our platform, then book directly because of the price gap.",
          partnerResponse:
            "True. And honestly, I prefer that. Eighteen per cent commission is a heavy hit on my margins - I'd rather they book direct after seeing us.",
          styleMatch: { red: 1, yellow: 2, green: 0, blue: 2 },
          assertiveness: 2,
          compliance: 'safe',
          trustChange: 3,
          optimal: true,
        },
        {
          id: 'john-r1-reframe-share',
          label: 'Argue OTA share is too low',
          description:
            'Tell him his Booking.com share has dropped below where it should be.',
          playerDialogue:
            "Your share of bookings via Booking.com is now below 30% - we need to get that back up to where it was last year.",
          partnerResponse:
            "I've got a rule about that - I don't let any OTA go above 30% of my business. So 'lower' is exactly where I want it.",
          styleMatch: { red: -1, yellow: -2, green: -2, blue: 0 },
          assertiveness: 3,
          compliance: 'borderline',
          trustChange: -6,
        },
        {
          id: 'john-r1-reframe-empathy',
          label: 'Empathise with the brand-first instinct',
          description: 'Acknowledge the brand-first logic before steering.',
          playerDialogue:
            "I get it - protecting the brand channel is a real priority. Could we look at where Booking.com adds genuinely incremental volume versus where it just substitutes for your direct site?",
          partnerResponse:
            "That's a fairer way to frame it. I don't really know which guests are incremental and which would have come direct anyway, to be honest.",
          styleMatch: { red: -1, yellow: 0, green: 2, blue: 1 },
          assertiveness: 1,
          compliance: 'safe',
          trustChange: 6,
        },
      ],
    },

    // ── 4. The commission math ──
    {
      id: 'math',
      label: 'Run the commission math',
      partnerPrompt:
        "But 18% is still 18%. That hits the bottom line every booking.",
      options: [
        {
          id: 'john-r1-math-net',
          label: 'Walk through the effective commission',
          description:
            'Show that with a 10% ADR gap, the real commission is closer to 8%.',
          playerDialogue:
            "I hear you. But if your rate on your own site is roughly 10% lower than your Booking.com rate, the effective commission on a Booking.com guest is closer to 8% - and that 8% gets you three million 'free' impressions a month. Does your direct marketing cost less than that per booking?",
          partnerResponse:
            "Hmm. I have a fixed fee for the website and a budget for campaigns. I don't know exactly what the per-booking cost ends up at - it might be closer than I'd assumed.",
          styleMatch: { red: 1, yellow: 1, green: 0, blue: 2 },
          assertiveness: 2,
          compliance: 'safe',
          trustChange: 5,
          optimal: true,
        },
        {
          id: 'john-r1-math-hardline',
          label: 'Insist commission is the cost of business',
          description: "Tell him 18% is reasonable given what Booking.com offers.",
          playerDialogue:
            "Eighteen per cent is fair for the global reach we give you. Most of our partners see it that way.",
          partnerResponse:
            "Maybe so, but the maths still doesn't work for me at scale. I want to keep building my direct channel.",
          styleMatch: { red: 1, yellow: -1, green: -1, blue: -1 },
          assertiveness: 3,
          compliance: 'safe',
          trustChange: -3,
        },
        {
          id: 'john-r1-math-segments',
          label: 'Suggest he run a segment test',
          description:
            'Propose comparing direct vs OTA economics on a specific segment.',
          playerDialogue:
            "Would you be open to testing the maths on one segment, say international guests? That's a group where the billboard effect is strongest and where direct rarely competes.",
          partnerResponse:
            "Maybe. International is interesting actually - direct is mostly domestic right now. I'd want to see how the numbers look before committing.",
          styleMatch: { red: 0, yellow: 1, green: 1, blue: 1 },
          assertiveness: 2,
          compliance: 'safe',
          trustChange: 3,
        },
      ],
    },

    // ── 5. Close: propose the test ──
    {
      id: 'close',
      label: 'Propose the test',
      partnerPrompt:
        "So what would you actually want me to do here?",
      options: [
        {
          id: 'john-r1-close-test',
          label: 'Propose a slow-month test on the platform',
          description:
            'Soft close: align rates on the months his direct channel under-performs.',
          playerDialogue:
            "Why not use our reach to recover some of that 40% drop during your slower months specifically? You set the months. We sync your competitiveness on those, leave the strong months alone, and reconnect in four weeks to look at the result.",
          partnerResponse:
            "That's a fairer way to frame it. Let's test it on the months where my site is underperforming. Send me the months you'd want to align and I'll come back to you.",
          styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
          assertiveness: 2,
          compliance: 'safe',
          trustChange: 8,
          optimal: true,
        },
        {
          id: 'john-r1-close-full-align',
          label: 'Push for full year-round alignment',
          description: 'Ask him to match Booking.com to brand.com all year.',
          playerDialogue:
            "What we really need is for you to match your Booking.com rate to your direct rate across the board. That's the only way to fix the revenue gap.",
          partnerResponse:
            "That's not happening. My direct channel needs a price advantage - that's the whole point of it.",
          styleMatch: { red: 1, yellow: -2, green: -2, blue: -1 },
          assertiveness: 3,
          compliance: 'borderline',
          trustChange: -8,
        },
        {
          id: 'john-r1-close-soft',
          label: 'Leave him with the analysis to think about',
          description: "Don't push for action; let him sit with the data.",
          playerDialogue:
            "Take some time with the numbers. Let me know if you want me to send across the slow-month view and we can pick this up next time.",
          partnerResponse:
            "Appreciate that. I'll take a look and come back to you.",
          styleMatch: { red: -1, yellow: 0, green: 2, blue: 1 },
          assertiveness: 1,
          compliance: 'safe',
          trustChange: 2,
        },
      ],
    },
  ],
};
