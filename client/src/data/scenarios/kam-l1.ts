import type { BranchingConversationTree } from '../../types';
import { royalCrestWideR1 } from './royal-crest-wide-r1';
import { silverHorizonWideR2 } from './silver-horizon-wide-r2';
import { oceanViewNarrowR3 } from './ocean-view-narrow-r3';
import { riversideNoneR4 } from './riverside-none-r4';
import { emeraldPeakNarrowR5 } from './emerald-peak-narrow-r5';
import { oceanfrontWideR6 } from './oceanfront-wide-r6';
import { palaceGrandNoneR7 } from './palace-grand-none-r7';
import { hiddenValleyNarrowR8 } from './hidden-valley-narrow-r8';
import { loftLivingWideR9 } from './loft-living-wide-r9';
import { nobleFalconNoneR10 } from './noble-falcon-none-r10';

/**
 * Cross-Regional (KAM) Level 1 conversation trees, rounds 1-10.
 *
 * Source: SME "KAM Conversations - GAME LEVEL 1" playbook (Content Hub,
 * Privileged & Confidential). The playbook's own design note is that the
 * property-level dialogue for a KAM is DELIBERATELY unchanged from the
 * standard Account Manager version - the pricing metrics, parity issues
 * and product recommendations still operate at the property level. The
 * only structural difference is the "Helicopter View": the KAM opens on
 * portfolio-wide / regional health, then zooms into the specific property
 * outlier, in a meeting with HQ / a management company rather than an
 * on-property manager.
 *
 * So each KAM L1 tree reuses the SME-approved standard tree for the
 * company's FIXED parity regime (from the playbook page-1 table, encoded
 * in KAM_REGIME) and swaps only the opening: the AM's helicopter framing
 * (playbook line 1) becomes `openingAm`, and the partner's opening reply
 * (playbook line 2) becomes the first step's partnerPrompt. Every option,
 * response, compliance tag and the property-level objection handling that
 * follow are the standard tree's, verbatim - which keeps the KAM journey
 * compliant and consistent with the main journey by construction.
 *
 * The factory stamps the engaged partner's `-cross-regional` id onto the
 * copy so the same tree serves the KAM portfolio. Registered at each
 * company's L1 round in branchingScenarios.ts.
 */

/**
 * KAM playbook closing statements, keyed by the conversation's round
 * (L1 rounds 1-10 from the "KAM Conversations - GAME LEVEL 1" playbook;
 * L2 rounds 11-20 from the "GAME LEVEL 2" playbook). These are the AM's
 * final graceful wrap-up - portfolio-voiced (executive summary, loop in
 * the local Account Manager, portfolio review) - which the property-level
 * standard trees don't carry. Rendered as a non-interactive final AM turn
 * on the optimal path only (see `closingAmLine` on BranchingConversationTree).
 * Applied to L1 here (withHelicopter) and to L2 in branchingScenarios.ts.
 */
export const KAM_CLOSINGS: Record<number, string> = {
  1: "Let's get the international rates activated for Royal Crest Hotel for the upcoming quarter. I'll loop in the Account Manager and on my side I'll monitor the property's visibility and conversion share against your regional portfolio benchmarks, for which I'll share an updated breakdown during our monthly review.",
  2: "Now that we've discussed the strategy for this property, let's keep an eye on its conversion over the next 30 days. If we see the expected conversion lift, we can look at applying this same fenced structure to the rest of your regional portfolio.",
  3: "I appreciate your agreement to align the base rates. I'll update our portfolio tracking report and we can review the remaining properties on the group list during our next meeting.",
  4: "Great, let's set up the US rate. I'll also schedule a follow-up meeting for us next month to review the portfolio report and monitor the property's performance against your regional benchmarks.",
  5: "Excellent. I'll send over a brief executive summary for your records. I'll also brief our local Account Manager to connect with your team to assist with the setup, and we'll review the portfolio performance impact together in our next monthly check-in.",
  6: "I'll brief our local Account Manager to check on the setup once your distribution team has aligned the rates. We can review the portfolio traffic uplift together in our next monthly check-in and discuss the performance recovery.",
  7: "Perfect! I'll set up a follow-up for us next month to review the portfolio reports and monitor the recovery. Speak soon, Ethan!",
  8: "I will send you the summary of our meeting. Once you have reviewed the recommendation, I will also loop in our local Account Manager to coordinate with the property's team on any next steps you have decided upon. I'll schedule our follow-up for next month - thank you for your time.",
  9: "I can understand that resolving wholesale rate leakage takes time and internal coordination. Since we are aligned on addressing these distribution gaps for Loft Living Inn, I'll send you a brief executive summary outlining the data and visibility impact for your records.",
  10: "We certainly don't want to push any setup that feels out of sync with your brand operations or risk management policies. Since any adjustment to family configurations or rate rules touches your broader group strategy, I'll send you an executive summary outlining the conversion data and risk-mitigation recommendations for The Noble Falcon Inn for your team to review. Speak soon!",
  11: "That's a completely fair compromise. Since we have your agreement to expand our test with mobile rates for Royal Crest Hotel, I'll prepare an executive summary of our benchmarks today. I'll schedule our portfolio review for next month to evaluate the impact together. Thanks for your time today, Liam!",
  12: "Perfect! Once it's live, we'll track the sell-through rate and conversion impact, and we can review the portfolio performance results together during our next monthly portfolio alignment. How does this sound?",
  13: "I'll make sure to get that report over to you, Camila. To ensure a smooth operational setup, I'll also loop in your local account manager for support and to track performance closely alongside your teams. Let's speak in two months to evaluate the impact while we review the group performance.",
  14: "Perfect! Let's touch base in our portfolio review next month to analyze the performance and discuss scaling this across your other regional assets that can benefit from this approach. Talk soon, Anton.",
  15: "You're welcome, Sophia. Our goal is to support where it makes commercial sense for your group. I'll email you a summary of these 90-day insights for your records. I'll keep monitoring the portfolio trends on our end and reach out during our next monthly check-in to see how Q3 is tracking. Thanks for your time today, Sophia!",
  16: "Sure, I'll send through the revenue projection for the US country rate. Let's reconnect during our portfolio review next month to go over the numbers - talk soon, Priya!",
  17: "Sure, no problem! Let's take a phased data driven approach. I'll loop in our local account manager to ensure the EEA country rate is well set up. Let's reconnect during our next portfolio review to analyze the conversion impact from European bookers.",
  18: "Looks like we found a good workaround, Claire. I'll brief our local account manager to support your on-property revenue team and adjust those deal settings right away. Talk soon, Claire!",
  19: "That's a good and proactive approach, Lucas. Our account manager will reach out locally to check that the mobile rate configuration has been optimized. I'll also send over an executive summary, and let's analyze the volume recovery across your portfolio during our review in two months.",
  20: "I'll compile a dedicated summary so that you have a solid business case ready for your internal QBR. I'll also keep our local account manager in the loop so they are ready to support the property as soon as the internal sign-off goes through. Let's touch base during our portfolio check-in next month.",
};

/**
 * KAM Level 2 (OPC) opening exchanges, from the "KAM Conversations - GAME
 * LEVEL 2" playbook (the "(1)" Content Hub doc). Like the L1 Helicopter
 * openings, the KAM L2 opener reframes the standard property-level opening
 * as a portfolio-level check-in that references the previous (L1) call, then
 * zooms into the one lagging property. Keyed by the L2 round (11-20). Applied
 * by withKamL2 below, which also stamps the KAM closing.
 */
export const KAM_L2_OPENINGS: Record<
  number,
  { openingAm: string; firstPartnerReply: string }
> = {
  11: {
    openingAm:
      "Hi Liam, thanks for reconnecting today. Following up on our initial test with country rates, I wanted to review your broader portfolio performance and address some persistent visibility bottlenecks affecting Royal Crest Hotel. Do you have a moment to review the high-level metrics together?",
    firstPartnerReply:
      "Let's dive in, Anya. We are keeping our prices the same to protect our profits, but I admit that revenue is lower than I would like. What is your data showing?",
  },
  12: {
    openingAm:
      "Hi Chloe, thanks for reconnecting today. Following up on the optimized family rates and international rates we implemented across your portfolio, overall group demand is holding steady. However, Silver Horizon Resort is still experiencing a bottleneck in conversion compared to your broader portfolio. Do you have a quick moment to look into what's driving this?",
    firstPartnerReply:
      "Hey Diego! Sure, I've got some time. Honestly, we're seeing plenty of eyes on our listings, but the actual bookings aren't moving quite as fast as I'd like. What are your numbers showing?",
  },
  13: {
    openingAm:
      "Good morning, Camila. From a group perspective, traveler interest across the resorts on the western coast remains high. However, Ocean View Resort is still showing a gap leading to a noticeable drop in conversion. I wanted to bring this to your attention so we can explore targeted tools to address it without impacting your broader brand strategy.",
    firstPartnerReply:
      "Thanks for bringing this to my attention, Javier. We've been focusing a lot on our guest welcome experience lately... You know, making sure our families and long-term guests feel completely at home. Though, to be completely transparent with you, my team is still a bit anxious about our pace for the upcoming months.",
  },
  14: {
    openingAm:
      "Hi Anton, thanks for joining our quarterly portfolio review. Before we dive into macro growth, I want to address Riverside Boutique Hotel's drop in conversion. Can we discuss this property before diving into the overall performance?",
    firstPartnerReply:
      "Hi Ren. Yes, keep it brief. We are right in the middle of preparations for some major events. As you know, my focus is protecting our revenue and maintaining brand standards. What's the situation?",
  },
  15: {
    openingAm:
      "Good afternoon Sophia, I've analyzed your regional portfolio performance and zoomed into properties that are losing out on conversion. While our local account manager confirmed that the family rate configuration was successfully enabled at Emerald Peak Lodge, it still needs your attention based on the trends we captured.",
    firstPartnerReply:
      "Good afternoon, Mei. Yes, let's go! What trends do you see in the extranet for this upcoming quarter?",
  },
  16: {
    openingAm:
      "Hello Priya. Following up on our last discussion, our local account manager confirmed that your distribution team successfully aligned the rates for Oceanfront Bliss Lodge. While the trial delivered positive results, we still see an opportunity to optimize its conversion.",
    firstPartnerReply:
      "Hey Kai! We've been super focused on some marketing campaigns and looking over our internal reports. Things look ok on our end, so I'm curious to see what you wanted to run through today!",
  },
  17: {
    openingAm:
      "Now that we have reviewed your regional portfolio performance for the upcoming quarter, shall we take a look at the data together on how Palace Grand Resort is performing based on our last conversation?",
    firstPartnerReply:
      "Sure, Diego. I have our PMS open. However, to be frank, I'm still dealing with a lot of noise from other OTAs complaining about price competitiveness, even though I provide everyone the exact same rate. That is really bothering me considering the operational effort I have to deal with everyday. By the way, I hope you are not bringing the same thing here...",
  },
  18: {
    openingAm:
      "Good morning, Claire. Great to speak with you again. Last time when we discussed the Hidden Valley Resort during the portfolio review, you said you needed some time to reconsider our pricing recommendations. How have things been so far?",
    firstPartnerReply:
      "Good morning, Oliver. Things are going very well, thank you. Based on our scheduled agenda today, I understand we are reviewing our performance for the upcoming quarter.",
  },
  19: {
    openingAm:
      "Hi Lucas, thanks for taking the time today. Overall, your portfolio's market presence is looking healthy across the region. That being said, Loft Living Inn is still losing out on conversion this quarter. I want to walk you through what we're seeing there so we can improve the situation.",
    firstPartnerReply:
      "Hello, Elena. To be completely honest, I'm still struggling with those wholesale rates ending up online as B2C offers. What do your internal data show us right now?",
  },
  20: {
    openingAm:
      "Good morning, Adam. Following up on our last discussion regarding The Noble Falcon Inn, I know we ended on your risk-mitigation concerns around family room settings. Today I would like to zoom into this property's performance over the next quarter. Shall we go straight into reviewing the data together?",
    firstPartnerReply:
      "Morning, Mark. Yes, let's start! What trends are you noticing on your end?",
  },
};

/**
 * Apply the KAM treatment to a Level 2 (OPC) tree: swap the opening to the
 * KAM Helicopter opener + partner reply (KAM_L2_OPENINGS) and stamp the KAM
 * closing (KAM_CLOSINGS). Everything else (options, responses, tags,
 * grading) is the reused standard L2 tree, unchanged. Used in
 * branchingScenarios.ts for the -cross-regional ids at rounds 11-20.
 */
export function withKamL2(
  base: BranchingConversationTree,
): BranchingConversationTree {
  const opening = KAM_L2_OPENINGS[base.round];
  const steps = opening
    ? base.steps.map((s, i) =>
        i === 0 ? { ...s, partnerPrompt: opening.firstPartnerReply } : s,
      )
    : base.steps;
  return {
    ...base,
    ...(opening ? { openingAm: opening.openingAm } : {}),
    steps,
    closingAmLine: KAM_CLOSINGS[base.round],
  };
}

function withHelicopter(
  base: BranchingConversationTree,
  partnerId: string,
  openingAm: string,
  firstPartnerReply: string,
): BranchingConversationTree {
  const steps = base.steps.map((s, i) =>
    i === 0 ? { ...s, partnerPrompt: firstPartnerReply } : s,
  );
  return {
    ...base,
    partnerId,
    openingAm,
    steps,
    closingAmLine: KAM_CLOSINGS[base.round],
  };
}

// ── Round 1 - Royal Crest Hotel (Wide) - Liam O'Connell / Anya Sharma ──
export function royalCrestKamR1(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    royalCrestWideR1,
    partnerId,
    "Good morning Liam, looking across your regional portfolio, overall demand and booking volume are pacing strongly ahead of last year. However, when we evaluate performance across your locations, Royal Crest Hotel is noticeably lagging behind the rest of the group. I'd like to focus today on the specific trends impacting this property's visibility.",
    "Good morning, Anya. Sure, let's do that.",
  );
}

// ── Round 2 - Silver Horizon Resort (Wide) - Chloe Davies / Diego Mendez ──
export function silverHorizonKamR2(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    silverHorizonWideR2,
    partnerId,
    "Hi Chloe, thanks for jumping on the call! Overall, your portfolio's market presence is looking healthy across the region. That said, our strategic pricing reports showed Silver Horizon Resort as a driver of lost conversion within your group this quarter. I want to walk you through what we're seeing there so we can improve this situation.",
    "Hello Diego! Sure, let's start!",
  );
}

// ── Round 3 - Ocean View Resort (Narrow) - Camila Ross / Javier Soto ──
export function oceanViewKamR3(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    oceanViewNarrowR3,
    partnerId,
    "Good morning, Camila. Thank you for scheduling this performance review today. While the majority of your portfolio is well-aligned, Ocean View Resort has surfaced as a key outlier, which is impacting its conversion. How do you see this property's performance?",
    "Good morning! It has been a busy period, but the pace in general is very good. Our main focus this year is driving guests directly to our own platform to maximize returns, and to do it we keep our direct website 5.5% cheaper to 'steal' some guests from you! We want travelers to see us on your platform, realize they can save money by booking directly, and then click away from you to buy on our website.",
  );
}

// ── Round 4 - Riverside Boutique Hotel (No Parity) - Anton Müller / Ren Garcia ──
export function riversideKamR4(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    riversideNoneR4,
    partnerId,
    "Good morning, Anton. Looking across your regional portfolio, the overall performance is strong, but The Riverside Boutique Hotel represents a key area of opportunity as it lags behind its peer group. Specifically, its visibility for family searches is dropping. I would like to walk you through the data.",
    "Hello! Sure, let's start!",
  );
}

// ── Round 5 - Emerald Peak Lodge (Narrow) - Sophia Chen / Mei Ling ──
export function emeraldPeakKamR5(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    emeraldPeakNarrowR5,
    partnerId,
    "Hi Sophia, thanks for joining. Looking across your regional portfolio, overall performance is steady, but Emerald Peak Lodge is surfacing as a primary underperforming asset in your group. Specifically, the discrepancy vs Brand.com pricing is impacting its conversion.",
    "Hello Mei! Thanks for sharing this information. Tell me more.",
  );
}

// ── Round 6 - Oceanfront Bliss Lodge (Wide) - Priya Singh / Zara Dubois ──
export function oceanfrontKamR6(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    oceanfrontWideR6,
    partnerId,
    "Hi Priya, thanks for making time today. I have analysed the performance trends across your portfolio, overall production is steady, but Oceanfront Bliss Lodge stands out as a lagging asset within your group. Specifically, a sharp drop in traffic is impacting its market presence over the last month.",
    "Hello Zara. Thanks for doing that. I see our production on your platform is dropping. What exactly does the data show? Our direct channel is holding strong, which is our primary focus, but I've noticed our room nights with you are down.",
  );
}

// ── Round 7 - Palace Grand Resort (No Parity) - Ethan Nkosi / Diego Mendez ──
export function palaceGrandKamR7(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    palaceGrandNoneR7,
    partnerId,
    "Hi Ethan! Looking across your regional portfolio, overall room night growth is trending strongly ahead of last year. However, when we break down performance by property, Palace Grand Resort is significantly lagging behind the group average due to a visibility drop. I'd like to focus today on the specific trends impacting this property's competitiveness.",
    "Hi Diego! Great to hear from you. I've been looking over the performance report, and I'm a bit concerned. Our conversion is amazing, but our total page views have dropped by 53%. I'd love to look at the data together to see how we can turn this around.",
  );
}

// ── Round 8 - Hidden Valley Resort (Narrow) - Claire Thornton / Oliver Vance - SOFT NO ──
export function hiddenValleyKamR8(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    hiddenValleyNarrowR8,
    partnerId,
    "Hi Claire, thanks for meeting today. Portfolio-wide, your group visibility is performing well across the region. That said, our strategic reports flagged Hidden Valley Resort as a primary driver of lost demand within your portfolio this quarter. I want to walk you through what's happening there so we can improve the situation.",
    "Hi, Oliver. Good, let's get straight to the point. What does the data show?",
  );
}

// ── Round 9 - Loft Living Inn (Wide) - Lucas Silva / Elena Rostova - SOFT NO ──
export function loftLivingKamR9(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    loftLivingWideR9,
    partnerId,
    "Now that we have reviewed your portfolio's performance, I would like to discuss the pricing at Loft Living Inn that our local account manager flagged so that we can align on a path forward.",
    "I am intrigued. Tell me more!",
  );
}

// ── Round 10 - The Noble Falcon Inn (No Parity) - Adam Cole / Mark Smith - STRONG NO ──
export function nobleFalconKamR10(partnerId: string): BranchingConversationTree {
  return withHelicopter(
    nobleFalconNoneR10,
    partnerId,
    "Hi Adam, thanks for meeting today. Portfolio-wide, your group visibility is performing well across the region. That said, our strategic reports flagged The Noble Falcon Inn as a primary driver of lost conversion within your portfolio this quarter. I want to walk you through what's happening there so we can improve the situation.",
    "Hi Mark, yes, let's do that!",
  );
}

/** Base id -> KAM Level 1 factory, consumed by branchingScenarios.ts. */
export const kamL1Factories: Record<string, (id: string) => BranchingConversationTree> = {
  'royal-crest': royalCrestKamR1,
  'silver-horizon': silverHorizonKamR2,
  'ocean-view': oceanViewKamR3,
  'riverside': riversideKamR4,
  'emerald-peak': emeraldPeakKamR5,
  'oceanfront': oceanfrontKamR6,
  'palace-grand': palaceGrandKamR7,
  'hidden-valley': hiddenValleyKamR8,
  'loft-living': loftLivingKamR9,
  'noble-falcon': nobleFalconKamR10,
};
