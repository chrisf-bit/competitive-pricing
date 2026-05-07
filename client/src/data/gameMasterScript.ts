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
    text: "Hey - you must be the new starter. I'm Alex. I run point on price competitiveness around here.",
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
        { text: 'Average Daily Rate', isCorrect: true },
        { text: 'Competitive Partner Share', isCorrect: false },
      ],
      followUp: {
        correct:
          "Right. ADR isn't on the pyramid. The drivers are Public RPD, Loyal RPD, the two Adoption metrics, and Competitive Partner Share.",
        incorrect:
          "Average Daily Rate is the odd one out. The pyramid is Public RPD, Loyal RPD, Public Pricing Adoption, Genius Pricing Adoption, and Competitive Partner Share. ADR sits outside that.",
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
    text: "Right. That'll do for the metrics side. You've got more to do before clearance, but you're not going to embarrass us on the basics. Off you go.",
  },
];
