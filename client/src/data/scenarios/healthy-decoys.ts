import type {
  PartnerMetrics,
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
  CommunicationStyle,
} from '../../types';

/**
 * Healthy decoy layer (design "Option B").
 *
 * In every round the portfolio shows the priority hotel plus TWO OTHER
 * priority hotels displayed in a healthy state. Each hotel is therefore
 * sometimes the answer and sometimes a decoy, so identity tells the
 * learner nothing - they have to read the data. This module supplies,
 * for each of the ten lead hotels:
 *
 *   1. a HEALTHY metrics profile used whenever the hotel is a decoy
 *      (its own priority round keeps its problem-state record), and
 *   2. a short "this hotel is in good shape, nothing pressing today"
 *      conversation, so engaging a wrong pick plays a real call, scores
 *      0 (wrong partner) and lets the learner retake.
 *
 * HEALTHY_DECOY_ROUNDS lists, per hotel, the rounds where it appears as
 * a decoy (never its own priority round). partnerStateByRound and
 * branchingScenarios both loop over this map to wire the baselines and
 * the calls; the base-id alias in getPartnerBaseline covers all three
 * markets from a single base-id entry.
 *
 * The healthy profiles are deliberately VARIED (not identical) so two
 * decoy cards never read as clones. partnerValueAbrn is intentionally
 * omitted from each profile so the merge in applyRoundBaseline keeps the
 * hotel's real (identity) partner value.
 */

interface HotelMeta {
  /** Contact first name used to address the partner in the call. */
  contact: string;
  /** Primary communication style - drives the healthy call's styleMatch. */
  style: CommunicationStyle;
  /** One-line "what's going well", kept generic so it holds whether the
   *  hotel is a decoy before or after its own priority round. */
  healthyNote: string;
}

/** Ordered so the metric arrays below can be indexed by position. */
export const HEALTHY_HOTELS = [
  'royal-crest',
  'silver-horizon',
  'ocean-view',
  'riverside',
  'emerald-peak',
  'oceanfront',
  'palace-grand',
  'hidden-valley',
  'loft-living',
  'noble-falcon',
] as const;

const HOTEL_META: Record<string, HotelMeta> = {
  'royal-crest': { contact: 'Liam', style: 'red', healthyNote: "occupancy's holding up and the numbers look steady" },
  'silver-horizon': { contact: 'Chloe', style: 'blue', healthyNote: "the group's pacing nicely this quarter" },
  'ocean-view': { contact: 'Camila', style: 'blue', healthyNote: "we're in a good rhythm across the properties" },
  'riverside': { contact: 'Anton', style: 'blue', healthyNote: 'bookings have been steady and on-brand' },
  'emerald-peak': { contact: 'Sophia', style: 'red', healthyNote: "we're tracking where we'd expect for the season" },
  'oceanfront': { contact: 'Priya', style: 'blue', healthyNote: "the loyalty base is steady and occupancy's fine" },
  'palace-grand': { contact: 'Ethan', style: 'green', healthyNote: 'things are running smoothly on our side' },
  'hidden-valley': { contact: 'Claire', style: 'blue', healthyNote: "we're comfortably on plan" },
  'loft-living': { contact: 'Lucas', style: 'red', healthyNote: 'margins are healthy and pace looks fine' },
  'noble-falcon': { contact: 'Adam', style: 'blue', healthyNote: "demand's strong and we're converting well" },
};

/**
 * Rounds where each hotel is a DECOY (never its own priority round).
 * Derived from the agreed rotation: each hotel decoys exactly four
 * times across the twenty-round journey, and its two priority rounds
 * (Level 1 + Level 2) get different decoy pairs.
 */
export const HEALTHY_DECOY_ROUNDS: Record<string, number[]> = {
  'royal-crest': [7, 9, 14, 16],
  'silver-horizon': [8, 10, 15, 17],
  'ocean-view': [1, 9, 16, 18],
  'riverside': [2, 10, 17, 19],
  'emerald-peak': [1, 3, 18, 20],
  'oceanfront': [2, 4, 11, 19],
  'palace-grand': [3, 5, 12, 20],
  'hidden-valley': [4, 6, 11, 13],
  'loft-living': [5, 7, 12, 14],
  'noble-falcon': [6, 8, 13, 15],
};

// ── Healthy metrics (varied per hotel; clearly better than any
//    priority's problem state) ─────────────────────────────────────
const H_ERPD = [-1.6, 0.5, 1.3, 2.2, -0.8, 1.9, 0.7, 2.5, -1.2, 1.1];
const H_ERPD_CHG = [-0.4, -0.9, 0.3, -0.2, -0.6, 0.1, -0.3, -0.7, -0.5, 0.2];
const H_LOSE = [26, 33, 22, 38, 24, 41, 29, 44, 21, 31];
const H_UNSOLD = [9, 12, 8, 14, 10, 13, 11, 7, 12, 9];
const H_SELL = [4, 2, 5, 1, 3, 2, 4, 6, 2, 3];
const H_VIS = [24, 21, 26, 19, 23, 20, 22, 27, 20, 25];
const H_VIS_PEER = [20, 19, 22, 17, 20, 18, 19, 23, 18, 21];
const H_SEARCH = [-1, 0, -2, 1, -1, 0, -1, -2, 0, -1];
const H_CONTACT_DAYS = [24, 31, 19, 36, 22, 40, 27, 44, 20, 33];
const H_COVERAGE = [58, 52, 61, 48, 55, 46, 57, 44, 60, 50];

/** Full healthy PartnerMetrics for the hotel at index `i` (0-9). */
function healthyMetrics(i: number): PartnerMetrics {
  const erpd = H_ERPD[i];
  return {
    erpd,
    erpdChange: H_ERPD_CHG[i],
    // Public sits a touch above eRPD; Loyal a healthy ~9 points below
    // Public (the Genius discount doing real work) - a clean profile.
    rpdPublic: Math.round((erpd + 1.2) * 10) / 10,
    rpdLoyal: Math.round((erpd - 8.4) * 10) / 10,
    losePricePublic: H_LOSE[i],
    activeScenarios: 2 + (i % 2),
    activeScenarioNames: i % 2 === 0 ? ['Brand.com', 'App'] : ['Key OTA', 'Mobile'],
    competitor: i % 3 === 0 ? 'expedia' : 'brand',
    secondaryMetrics: {
      last30dAbrn: { value: 700 + i * 35, deltaPct: 3 + (i % 3) },
      last30dRoomNights: { value: 420 + i * 22, deltaPct: 4 + (i % 2) },
      last30dAdr: { value: 138 + i * 3, deltaPct: 1 },
      last90dPageViews: { value: 0 },
      last90dConversion: { value: 2.4 + (i % 4) * 0.1, deltaPct: 2 },
      next3mRoomNights: { value: 90 + i * 4, deltaPct: 3 + (i % 2) },
    },
    opcMetrics: {
      unsoldRooms: { value: H_UNSOLD[i] },
      sellThroughRate: { value: H_SELL[i] },
      visibilityShare: { value: H_VIS[i], peerValue: H_VIS_PEER[i] },
      searchPrice: { value: H_SEARCH[i] },
    },
    lastPricingContactDaysAgo: H_CONTACT_DAYS[i],
    pricingCoverageQTD: H_COVERAGE[i],
    // partnerValueAbrn intentionally omitted - the merge keeps the
    // hotel's real (identity) value from its record.
    experiencedRPD: 70 + (i % 5),
    visibility: 76 + (i % 6),
    conversion: 58 + (i % 5),
    revenue: 66 + (i % 5),
    discountQuality: 62 + (i % 6),
    rateParity: 'clean',
  };
}

/** Healthy baseline metrics for a hotel by base id (fresh object per call). */
export function healthyDecoyMetricsFor(baseId: string): PartnerMetrics {
  const i = HEALTHY_HOTELS.indexOf(baseId as (typeof HEALTHY_HOTELS)[number]);
  return healthyMetrics(i < 0 ? 0 : i);
}

// ── The healthy "nothing pressing today" call ───────────────────────

function stylePlus(primary: CommunicationStyle, v: number): Record<CommunicationStyle, number> {
  const base: Record<CommunicationStyle, number> = { red: 0, yellow: 0, green: 0, blue: 0 };
  base[primary] = v;
  return base;
}

function healthySteps(meta: HotelMeta): BranchingStep[] {
  const s = meta.style;
  const step1: BranchingOption[] = [
    {
      id: 'hd-open-correct',
      label: 'Confirm the healthy read, offer a light check',
      description:
        'Acknowledge the strong position honestly and ask whether there is anything they would value a second look at - no manufactured problem.',
      playerDialogue:
        "That matches what I'm seeing - your pricing is competitive and your visibility is holding above your peers, so there's nothing pressing here. Is there anything you'd want a second pair of eyes on while we're talking?",
      partnerResponse:
        "Honestly, not really - we're in good shape and I'd rather not fix what isn't broken. Nice to hear you agree with our own read.",
      styleMatch: { ...stylePlus(s, 2), green: 1 },
      assertiveness: 1,
      compliance: 'safe',
      trustChange: 4,
      optimal: true,
    },
    {
      id: 'hd-open-invent',
      label: 'Manufacture a problem',
      description:
        "Imply something is wrong when the data says otherwise - the fastest way to lose a partner who knows their numbers are fine.",
      playerDialogue:
        "There are a few worrying signs in your performance we really need to address today before they get worse.",
      partnerResponse:
        "Worrying signs? My numbers look healthy from here. If you're going to tell me there's a fire, show me the smoke.",
      styleMatch: { ...stylePlus(s, -1), yellow: -1 },
      assertiveness: 2,
      compliance: 'safe',
      trustChange: -4,
    },
    {
      id: 'hd-open-hardsell',
      label: 'Push a discount they don’t need',
      description:
        'Lead with a rate cut when the hotel is already competitive - pure friction for a well-priced partner.',
      playerDialogue:
        "I'd like you to open up a broad discount to really push volume this quarter.",
      partnerResponse:
        "Why would I discount when I'm already competitive and selling well? That just gives away margin.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: 'borderline',
      trustChange: -6,
    },
  ];

  const step2: BranchingOption[] = [
    {
      id: 'hd-confirm-correct',
      label: 'Be straight: you’re well-positioned',
      description:
        'Confirm there is no action needed today and suggest simply keeping an eye on the numbers - an honest, trust-building close for a healthy partner.',
      playerDialogue:
        "There's genuinely nothing you need to act on today. You're well-positioned, so let's just keep an eye on the numbers and I'll flag it early if anything moves.",
      partnerResponse:
        "I appreciate you being straight with me rather than inventing work. That's exactly how I like to operate.",
      styleMatch: { ...stylePlus(s, 2), blue: s === 'blue' ? 2 : 1 },
      assertiveness: 1,
      compliance: 'safe',
      trustChange: 4,
      optimal: true,
    },
    {
      id: 'hd-confirm-urgency',
      label: 'Invent urgency to justify the call',
      description:
        "Insist there's something to do just to avoid an empty-handed call - it reads as busywork to a partner who can see the data.",
      playerDialogue:
        "Even so, I really think we should be changing something today - it doesn't feel right to leave without an action.",
      partnerResponse:
        "Making a change for the sake of it isn't a strategy. If there's nothing wrong, let's not go looking for it.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: 'safe',
      trustChange: -4,
    },
    {
      id: 'hd-confirm-overpromise',
      label: 'Promise a reward for a change',
      description:
        'Dangle a ranking or visibility reward to get them to move - a compliance breach even on a healthy partner.',
      playerDialogue:
        "Tell you what - make one tweak for me and I can promise it pushes you even higher up the rankings.",
      partnerResponse:
        "A guaranteed ranking bump? That kind of promise makes me trust the rest less, not more.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: 'risky',
      trustChange: -8,
    },
  ];

  const step3: BranchingOption[] = [
    {
      id: 'hd-close-correct',
      label: 'Leave it there, reconnect if it shifts',
      description:
        'Close cleanly: no busywork, agree to reconnect if the numbers move. Respects a healthy partner and preserves the relationship.',
      playerDialogue:
        "Then let's leave it there - no need to take up more of your time. I'll keep watching, and we'll reconnect the moment anything's worth acting on.",
      partnerResponse:
        "Sounds good. Thanks for the honest check-in - talk soon.",
      styleMatch: { ...stylePlus(s, 2), green: 1 },
      assertiveness: 1,
      compliance: 'safe',
      trustChange: 4,
      optimal: true,
    },
    {
      id: 'hd-close-forcefollow',
      label: 'Force a follow-up they don’t need',
      description:
        'Lock in a commitment for the sake of it - friction with a partner who just told you nothing is wrong.',
      playerDialogue:
        "Before you go, let's lock in three follow-up calls this month so we stay on top of it.",
      partnerResponse:
        "Three calls for a property that's doing fine? That's more of your time and mine than this warrants.",
      styleMatch: stylePlus(s, -1),
      assertiveness: 2,
      compliance: 'safe',
      trustChange: -3,
    },
    {
      id: 'hd-close-flat',
      label: 'Drop off flatly',
      description:
        'End abruptly with no offer to stay in touch - a missed chance to leave the relationship warm.',
      playerDialogue:
        "Right, nothing for us to do then. I'll let you get on.",
      partnerResponse:
        "Okay... well, thanks for calling, I suppose.",
      styleMatch: stylePlus(s, 0),
      assertiveness: 1,
      compliance: 'safe',
      trustChange: -1,
    },
  ];

  return [
    {
      id: 'open',
      label: 'Open the check-in',
      partnerPrompt: `Of course. Honestly, ${meta.healthyNote} - we're in good shape from where I sit. But go ahead, what are you seeing?`,
      options: step1,
    },
    {
      id: 'confirm',
      label: 'Confirm there’s nothing pressing',
      partnerPrompt: 'So - is there actually anything I need to act on here, or are we good?',
      options: step2,
    },
    {
      id: 'close',
      label: 'Close warmly',
      partnerPrompt: "Appreciate you being straight with me. Anything else before we wrap?",
      options: step3,
    },
  ];
}

/**
 * Builds the healthy "nothing pressing" call for whichever lead hotel is
 * acting as a decoy. Stamps the engaged partner's regime-suffixed id and
 * the current round. Registered for each hotel's HEALTHY_DECOY_ROUNDS
 * across all three markets in branchingScenarios.ts.
 */
export function buildHealthyDecoyScenario(
  partnerId: string,
  round: number,
): BranchingConversationTree {
  const baseId = partnerId.replace(/-(none|narrow|wide)$/, '');
  const meta = HOTEL_META[baseId] ?? HOTEL_META['royal-crest'];
  return {
    conversationShape: 'branching',
    partnerId,
    round,
    openingAm: `Hi ${meta.contact}, thanks for making time. I wanted to do a quick check-in on your performance - is now still okay?`,
    steps: healthySteps(meta),
  };
}
