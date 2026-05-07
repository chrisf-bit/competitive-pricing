/**
 * Dashboard Hotspot challenges for Level 0.
 *
 * The learner sees a stylised mock dashboard (modelled on the real LPS
 * Competitive Pricing dashboards referenced on Steering & Narrative
 * page 10) and is asked "click where you'd look to..." style questions.
 *
 * Each challenge maps to one of the named tiles on the dashboard mock.
 */

export type DashboardTileId =
  | 'erpd-headline'
  | 'public-vs-loyal'
  | 'driver-pyramid'
  | 'erpd-trend'
  | 'partner-priority';

export interface HotspotChallenge {
  id: string;
  prompt: string;
  correctTileId: DashboardTileId;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export const dashboardHotspotChallenges: HotspotChallenge[] = [
  {
    id: 'h1',
    prompt:
      "You want to check whether your country's eRPD is improving versus Brand.com and Key OTAs. Where do you look first?",
    correctTileId: 'erpd-headline',
    feedback: {
      correct:
        "Right - the eRPD headline tile shows your country's current value vs Brand.com and Key OTAs, with the trend in one glance. It's the first place to look.",
      incorrect:
        "The eRPD headline tile is where you'd start - it shows the headline number and trend at country level. The other tiles drill into the drivers behind that headline.",
    },
  },
  {
    id: 'h2',
    prompt:
      'A senior manager asks you which traveller mix - logged-in Genius members or non-logged-in public - is dragging your eRPD down. Which tile shows that breakdown?',
    correctTileId: 'public-vs-loyal',
    feedback: {
      correct:
        'Yes - Public RPD covers non-logged-in travellers, Loyal RPD covers Genius members. The breakdown tile lets you see which one is the bigger contributor to the headline number.',
      incorrect:
        'The Public vs Loyal RPD breakdown tile is where you can see which traveller mix is driving the headline. Public is non-logged-in, Loyal is Genius - both feed into eRPD.',
    },
  },
  {
    id: 'h3',
    prompt:
      'You only have time to call a handful of partners this week. Which area of the dashboard helps you decide which ones to prioritise?',
    correctTileId: 'partner-priority',
    feedback: {
      correct:
        'Exactly. The partner priority list ranks accounts by impact on country-level eRPD, so you spend your time where it counts most.',
      incorrect:
        'The partner priority list is what you want here. It ranks accounts by impact on country-level eRPD - useful for triaging the week.',
    },
  },
];
