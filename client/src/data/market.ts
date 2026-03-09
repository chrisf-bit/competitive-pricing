import type { MarketContext, RoundSummaryItem } from '../types';

export const marketContextByRound: Record<number, MarketContext> = {
  1: {
    demand: 'flat',
    competitorPricing:
      'Competitors across all six markets are actively using discount tools. Mobile Rate adoption is above 70% for comparable properties.',
    seasonalNote:
      'Shoulder season approaching. Properties that secure advance bookings now will have a significant advantage.',
  },
  2: {
    demand: 'up',
    competitorPricing:
      'A new competitor in Kos has entered with aggressive pricing. Madrid and Barcelona competitors are holding steady. Budget chains in Mumbai are undercutting on price. Cotswolds and Kyoto demand is increasing.',
    seasonalNote:
      'Advance bookings for peak season are accelerating. Properties with Early Booker Deals are capturing disproportionate share.',
  },
  3: {
    demand: 'up',
    competitorPricing:
      'Market-wide pricing competition has intensified. Properties that invested in competitiveness early are pulling ahead. Latecomers are losing ground.',
    seasonalNote:
      'Peak season is imminent. Pricing decisions made now will determine high-season performance.',
  },
};

export function generateRoundSummary(
  round: number,
  engagedPartnerIds: string[],
  allPartnerIds: string[],
): RoundSummaryItem[] {
  const summaries: RoundSummaryItem[] = [];

  for (const id of allPartnerIds) {
    const wasEngaged = engagedPartnerIds.includes(id);

    if (wasEngaged) {
      summaries.push({
        partnerId: id,
        headline: 'Conversation held',
        detail: getEngagedDetail(id, round),
        metricChange: 'up',
      });
    } else {
      summaries.push({
        partnerId: id,
        headline: 'No contact this period',
        detail: getNeglectedDetail(id, round),
        metricChange: 'down',
      });
    }
  }

  return summaries;
}

function getEngagedDetail(partnerId: string, round: number): string {
  const details: Record<string, Record<number, string>> = {
    marina: {
      1: 'Marina is reviewing your recommendations. She indicated she would assess the data before making changes.',
      2: 'Marina has implemented the agreed changes and is monitoring the impact closely.',
      3: 'Marina has adopted a structured pricing strategy and is planning her Q2 approach.',
    },
    stavros: {
      1: 'Stavros is investigating the issues you identified. He expressed urgency about seeing results.',
      2: 'Stavros has made adjustments based on your recommendations. He is watching the numbers daily.',
      3: 'Stavros has committed to a seasonal pricing strategy and is focused on high-season performance.',
    },
    hannah: {
      1: 'Hannah is considering the approach you discussed. She wants to make sure it feels right for Meadow Lane.',
      2: 'Hannah has seen positive results and is more open to further optimisation.',
      3: 'Hannah is enthusiastic about her progress and open to continued growth at a pace that suits her.',
    },
    carlos: {
      1: 'Carlos is excited about the ideas you shared. He is already experimenting with some of the suggestions.',
      2: 'Carlos has seen early results and is eager to push further. His energy is high.',
      3: 'Carlos has fully embraced the strategy and is planning expansion across his portfolio.',
    },
    priya: {
      1: 'Priya is reviewing the data you presented. She has scheduled a follow-up with her regional team.',
      2: 'Priya has implemented changes and is tracking daily performance against her chain benchmarks.',
      3: 'Priya has seen measurable improvement and is presenting the results to her leadership team.',
    },
    yuki: {
      1: 'Yuki is discussing the suggestions with her team. She appreciates the careful approach.',
      2: 'Yuki has made gentle adjustments and is monitoring guest feedback alongside metrics.',
      3: 'Yuki is cautiously optimistic. She has found a balance between visibility and brand integrity.',
    },
  };

  return details[partnerId]?.[round] ?? 'Partner is reviewing the conversation outcomes.';
}

function getNeglectedDetail(partnerId: string, round: number): string {
  const details: Record<string, Record<number, string>> = {
    marina: {
      1: 'Marina\'s metrics continued their gradual decline without intervention. She has not made any changes independently.',
      2: 'Marina has been waiting for follow-up. Her Experienced RPD has drifted further below market average.',
      3: 'Marina appears to have deprioritised Booking.com optimisation. Metrics are stagnating.',
    },
    stavros: {
      1: 'Stavros\'s frustration is growing. Without guidance, he has not identified the root cause of his performance issues.',
      2: 'Stavros has been making changes independently — some helpful, some counterproductive. His approach is uncoordinated.',
      3: 'Stavros expressed frustration about the lack of support. His relationship with Booking.com has cooled further.',
    },
    hannah: {
      1: 'Hannah has not made any pricing changes. Her visibility continues to decline slowly.',
      2: 'Hannah mentioned feeling unsupported during a recent industry event. Her metrics remain flat.',
      3: 'Hannah is losing confidence in the platform. Competitors in the Cotswolds are gaining ground.',
    },
    carlos: {
      1: 'Carlos has been distracted by other projects. His Country Rate remains misconfigured and metrics are slipping.',
      2: 'Carlos tried some changes on his own but without a clear strategy. Results are mixed.',
      3: 'Carlos is frustrated by inconsistent performance. He is considering reducing his Booking.com allocation.',
    },
    priya: {
      1: 'Priya\'s already-low metrics have declined further. She is increasingly critical of the platform\'s value.',
      2: 'Priya has been comparing Booking.com unfavourably to competitors in her chain meetings.',
      3: 'Priya has flagged Booking.com as underperforming to her regional director. The relationship is at risk.',
    },
    yuki: {
      1: 'Yuki has not made any changes. Her visibility continues to trail behind competing ryokans.',
      2: 'Yuki is questioning whether Booking.com is the right channel for Komorebi. Metrics remain flat.',
      3: 'Yuki has reduced her room allocation on the platform. She feels the partnership lacks personal attention.',
    },
  };

  return details[partnerId]?.[round] ?? 'No engagement this period. Metrics may have drifted.';
}
