import type { ConversationTree } from '../types';
import { carlosR1, carlosR2, carlosR3 } from './conversations-carlos';
import { priyaR1, priyaR2, priyaR3 } from './conversations-priya';
import { yukiR1, yukiR2, yukiR3 } from './conversations-yuki';

// ════════════════════════════════════════════════════════════
//  MARINA - Round 1
// ════════════════════════════════════════════════════════════
const marinaR1: ConversationTree = {
  partnerId: 'marina',
  round: 1,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Hello. I've got a few minutes - what did you want to discuss?",
        options: [
          {
            id: 'marina-r1-open-data',
            label: 'Lead with data',
            description: 'Open with her performance numbers and a specific observation.',
            playerDialogue:
              "Thanks Marina. I've been reviewing your property's performance and I noticed some interesting patterns in your pricing competitiveness that I'd like to walk through with you.",
            styleMatch: { blue: 2, green: 0, red: 0, yellow: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r1-open-relationship',
            label: 'Lead with relationship',
            description: 'Start with rapport and ask how business is going.',
            playerDialogue:
              "Hi Marina, thanks for making time. Before I get into anything - how have things been going at the Castellana recently? How's the season looking?",
            styleMatch: { blue: -1, green: 2, red: -1, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r1-open-opportunity',
            label: 'Lead with opportunity',
            description: 'Frame the call around a growth opportunity.',
            playerDialogue:
              "Marina, I've spotted something that could help drive more bookings for the Castellana. I wanted to share it and get your perspective.",
            styleMatch: { blue: 0, green: 0, red: 1, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r1-open-data',
          responses: [
            { trustThreshold: 'low', text: "Alright. What patterns are you seeing? I'd want to understand the methodology though.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate that. I've been looking at my numbers too - go ahead, show me what you've found.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Good - I was actually going to call you about this. Let's compare notes.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'marina-r1-open-relationship',
          responses: [
            { trustThreshold: 'low', text: "Things are fine. But I assume you're calling for a reason - what is it?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Season's been steady. Occupancy is okay but I know we could be doing better. Was there something specific?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "That's kind of you to ask. Things are decent but I have some concerns about our online positioning. What's on your mind?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: -1,
        },
        {
          optionId: 'marina-r1-open-opportunity',
          responses: [
            { trustThreshold: 'low', text: "I'm open to hearing it, but I'd need to see the numbers before I commit to anything.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Go on - what kind of opportunity? I'd want to understand the specifics.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Interesting. I'm always looking at ways to optimise. What have you found?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt:
          "Okay, so what are you recommending I do? And more importantly - what's the evidence it will work?",
        options: [
          {
            id: 'marina-r1-rec-mobile',
            label: 'Recommend Mobile Rate',
            description: 'Suggest activating Mobile Rate with data showing mobile booking share.',
            playerDialogue:
              "Looking at your data, mobile bookings make up over 60% of searches in Madrid. Your property isn't currently offering a Mobile Rate, which means mobile users see higher prices compared to competitors who do. Activating it would improve your Experienced RPD for that segment without changing your base rate.",
            styleMatch: { blue: 2, green: 1, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r1-rec-broad',
            label: 'Recommend full discount stack',
            description: 'Suggest activating multiple discount products at once.',
            playerDialogue:
              "I think there's a real opportunity to activate your Mobile Rate, Country Rate, and Early Booker Deal together. That would give you maximum visibility uplift and significantly improve your competitive position.",
            styleMatch: { blue: -1, green: -2, red: 1, yellow: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'marina-r1-rec-analyse',
            label: 'Explore the data together',
            description: 'Walk through the dashboard collaboratively and let her draw conclusions.',
            playerDialogue:
              "Rather than jumping to a recommendation, I'd like to walk through your Experienced RPD data with you. I think once we look at where you sit versus comparable properties, the right action will become clear. Can I share my screen?",
            styleMatch: { blue: 2, green: 1, red: -1, yellow: -1 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r1-rec-mobile',
          responses: [
            { trustThreshold: 'low', text: "60%... do you have a source for that? And what discount percentage are we talking about? I need to model the margin impact.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's a compelling datapoint. What's the typical uplift you've seen with similar properties when they activate Mobile Rate?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That makes sense. I've been meaning to look into this. What percentage discount does it require and can I trial it for a month?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 4 },
          trustChange: 5,
          nextPhasePrompt: "I can see the logic, but I need to think about the margin impact. What if it just cannibalises my direct bookings?",
        },
        {
          optionId: 'marina-r1-rec-broad',
          responses: [
            { trustThreshold: 'low', text: "That's a lot of changes at once. I'm not comfortable activating everything without understanding the individual impact of each.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I appreciate the ambition, but I'd prefer to take this one step at a time. Can we focus on one product and measure the impact?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I see what you're going for, but I'd rather be methodical about this. Can we start with one and build from there?", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 2 },
          trustChange: -4,
          nextPhasePrompt: "I need to be convinced this won't just erode my margins across the board.",
        },
        {
          optionId: 'marina-r1-rec-analyse',
          responses: [
            { trustThreshold: 'low', text: "Yes, I'd prefer that. Let's look at the data together before we decide anything.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That's a good approach. I'd rather understand the full picture before making changes. Go ahead.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Perfect - I was hoping you'd suggest that. I've got some questions about the RPD calculation too. Let's dig in.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 2 },
          trustChange: 6,
          nextPhasePrompt: "Okay, the data makes sense. But before I commit to anything - what happens if it doesn't work? Can I reverse it easily?",
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "I hear what you're saying, but what about the margin impact? I can't afford to just give away revenue.",
        options: [
          {
            id: 'marina-r1-obj-evidence',
            label: 'Provide evidence',
            description: 'Share data from comparable properties that showed net revenue gain.',
            playerDialogue:
              "That's a fair concern, and I'd have the same question. Looking at comparable boutique properties in Madrid that activated Mobile Rate, the average saw a 12% increase in booking volume which more than offset the rate reduction. The net revenue impact was positive within 6 weeks.",
            styleMatch: { blue: 2, green: 1, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r1-obj-trial',
            label: 'Suggest a trial',
            description: 'Propose a limited trial period to reduce risk.',
            playerDialogue:
              "Completely understand. What if we approach this as a 30-day trial? You activate Mobile Rate for one month, we measure the impact together, and if the numbers don't work, you simply switch it off. No long-term commitment.",
            styleMatch: { blue: 1, green: 2, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r1-obj-push',
            label: 'Stress the urgency',
            description: 'Emphasise that competitors are moving and she risks falling further behind.',
            playerDialogue:
              "I understand the concern, but the reality is that your competitors in Madrid are already using these tools. Every week you wait, the gap widens. The margin on a booking you don't get is zero.",
            styleMatch: { blue: -1, green: -2, red: 2, yellow: 0 },
            assertiveness: 3,
            compliance: 'borderline',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r1-obj-evidence',
          responses: [
            { trustThreshold: 'low', text: "12% uplift... can you send me that data in writing? I'd like to review it properly before deciding.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's useful. If the comparables are genuinely similar properties, I'd be willing to try it. Send me the details and I'll review by end of week.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's exactly the kind of evidence I needed. Let's do it. Can you walk me through the setup?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 2 },
          trustChange: 5,
        },
        {
          optionId: 'marina-r1-obj-trial',
          responses: [
            { trustThreshold: 'low', text: "A trial... that's more reasonable. Let me think about it and I'll let you know.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "A 30-day trial with clear measurement - I can get behind that. Let's set it up.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes, that works for me. I like that there's an easy off-ramp. Let's start next week.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2 },
          trustChange: 4,
        },
        {
          optionId: 'marina-r1-obj-push',
          responses: [
            { trustThreshold: 'low', text: "I don't appreciate being pressured. I make decisions based on data, not fear. I'll review this on my own timeline.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I understand competition is real, but scare tactics aren't how I make decisions. Let's stick to the data.", emotion: 'negative' },
            { trustThreshold: 'high', text: "Point taken, but I'd still prefer to see the evidence before moving. Can you send me the analysis?", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: -6,
        },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
//  STAVROS - Round 1
// ════════════════════════════════════════════════════════════
const stavrosR1: ConversationTree = {
  partnerId: 'stavros',
  round: 1,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Yeah, hi - look, I'm busy. Occupancy is down 15% and I need answers, not another check-in call. What have you got for me?",
        options: [
          {
            id: 'stavros-r1-open-direct',
            label: 'Match his energy - be direct',
            description: 'Get straight to the point with a clear, confident opening.',
            playerDialogue:
              "Stavros, I hear you. I've been digging into your numbers and I've found the root cause of your visibility drop. I want to walk you through it - it's fixable, but it's not what you might expect.",
            styleMatch: { red: 2, blue: 1, yellow: 0, green: -1 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'stavros-r1-open-empathy',
            label: 'Acknowledge the frustration',
            description: 'Show you understand the pressure before getting to the solution.',
            playerDialogue:
              "I can hear the pressure you're under, Stavros, and I want to help. I've been looking at your performance data in detail and I think I can explain what's driving the decline.",
            styleMatch: { red: -1, blue: 0, yellow: 0, green: 2 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'stavros-r1-open-benchmark',
            label: 'Lead with a competitor benchmark',
            description: 'Open with how his competitors are performing to grab attention.',
            playerDialogue:
              "Stavros - quick question. Are you aware that three comparable resorts on Kos have improved their booking volume by 20% in the last quarter? I've looked at why, and I think there's something you can do about it.",
            styleMatch: { red: 2, blue: 1, yellow: 1, green: -1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r1-open-direct',
          responses: [
            { trustThreshold: 'low', text: "Alright, you've got my attention. But the last person who said 'fixable' didn't fix anything. Go on.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Good. Finally someone who's actually looked at the data. What did you find?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's what I want to hear. Show me.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
        {
          optionId: 'stavros-r1-open-empathy',
          responses: [
            { trustThreshold: 'low', text: "I don't need empathy, I need results. What's the plan?", emotion: 'negative' },
            { trustThreshold: 'medium', text: "Look, I appreciate the sentiment, but let's skip the feelings and get to the point. What have you found?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Thanks. Alright, show me what you've got.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'stavros-r1-open-benchmark',
          responses: [
            { trustThreshold: 'low', text: "20%? Which resorts? Don't give me vague numbers - names.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "20% improvement? That's significant. What are they doing that I'm not?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's exactly the kind of competitive intelligence I need. Break it down for me.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt:
          "Right. So what do I actually need to do? And don't tell me to add more discounts - I'm already discounting.",
        options: [
          {
            id: 'stavros-r1-rec-parity',
            label: 'Diagnose the rate parity issue',
            description: 'Explain that the real problem is rate parity, not discount levels.',
            playerDialogue:
              "Here's the thing, Stavros - your discounts are active, but they're not the problem. I've found a significant rate parity issue. Your rates on at least two other OTAs are undercutting your Booking.com rate. That means even with your Genius and Mobile discounts, travellers see a cheaper price elsewhere. Until that's resolved, more discounts won't help.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'stavros-r1-rec-more-discounts',
            label: 'Suggest adding Country Rate',
            description: 'Recommend another discount product to improve competitiveness.',
            playerDialogue:
              "One quick win would be activating Country Rate for key source markets. That would target travellers from high-volume countries with a tailored discount, which should improve your Experienced RPD for those segments.",
            styleMatch: { red: 1, blue: 0, yellow: 1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r1-rec-lower-rate',
            label: 'Suggest lowering the base rate',
            description: 'Recommend a direct rate reduction to become more competitive.',
            playerDialogue:
              "To be straightforward - your base rate is significantly above the market for comparable resorts on Kos right now. If you brought it down by 8–10%, combined with your existing discounts, you'd likely see a meaningful jump in visibility and bookings.",
            styleMatch: { red: 1, blue: 0, yellow: 0, green: -2 },
            assertiveness: 3,
            compliance: 'risky',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r1-rec-parity',
          responses: [
            { trustThreshold: 'low', text: "Rate parity? Are you sure? My channel manager is supposed to keep everything in sync. Which OTAs?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's... actually not what I expected to hear. If that's true, I need to deal with it. Can you show me exactly where the parity breaks are?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Well that explains a lot. I've been throwing money at discounts and the problem was elsewhere. What do I need to do?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2 },
          trustChange: 7,
          nextPhasePrompt: "Okay, let's say I fix the parity. How long before I see results? Because I can't afford to wait months.",
        },
        {
          optionId: 'stavros-r1-rec-more-discounts',
          responses: [
            { trustThreshold: 'low', text: "I told you - I'm already discounting. Adding another discount on top of discounts? That's not strategy, that's desperation.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I can try it, but I'm sceptical. I've been adding discounts and nothing's moving. Are you sure more discounts is the answer?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Fine, I'll try it. But if this doesn't move the needle, we're having a different conversation next time.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: -2,
          nextPhasePrompt: "I just don't see how more discounts solve the problem when the ones I have aren't working.",
        },
        {
          optionId: 'stavros-r1-rec-lower-rate',
          responses: [
            { trustThreshold: 'low', text: "Hold on - are you telling me what to charge? That's my decision, not yours.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "Look, I know my rate is my decision. But you're essentially telling me to drop my price. That's a big ask.", emotion: 'negative' },
            { trustThreshold: 'high', text: "That's a bold recommendation. I'll look at the numbers, but I'm not comfortable being told what to charge.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: -5,
          nextPhasePrompt: "I set my own rates. If you've got a better idea that doesn't involve me cutting my prices, I'm listening.",
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "Look, I've heard promises before. How do I know this will actually work?",
        options: [
          {
            id: 'stavros-r1-obj-roi',
            label: 'Show the ROI projection',
            description: 'Present a revenue impact model with concrete numbers.',
            playerDialogue:
              "Fair question. Let me share a projection based on your current traffic. If we resolve the parity issue and your Experienced RPD improves to market average, the visibility uplift alone could drive an estimated 25–35 additional room nights per month. At your current ADR, that's significant incremental revenue.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r1-obj-case-study',
            label: 'Share a success story',
            description: 'Reference a similar resort that fixed parity and saw results.',
            playerDialogue:
              "I worked with a similar resort in Crete - 200 rooms, similar market. They had the same parity issue. Once resolved, their visibility improved by 30% within three weeks and bookings followed. I can't guarantee identical results, but the pattern is consistent.",
            styleMatch: { red: 1, blue: 1, yellow: 2, green: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r1-obj-guarantee',
            label: 'Promise results',
            description: 'Make a strong commitment to build confidence.',
            playerDialogue:
              "I guarantee this will work. Fix the parity issue and your metrics will improve. I've seen it dozens of times. If it doesn't work within a month, I'll personally escalate it with our technical team.",
            styleMatch: { red: 1, blue: -2, yellow: 1, green: -1 },
            assertiveness: 3,
            compliance: 'borderline',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r1-obj-roi',
          responses: [
            { trustThreshold: 'low', text: "25–35 room nights... alright, that's a language I understand. I'll look into the parity issue. But I'm tracking this.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Now you're talking my language. That's the kind of analysis I need. Let's move on it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Good. Clear numbers, clear action. Let's fix the parity and I'll hold you to those projections.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 2, revenue: 2 },
          trustChange: 6,
        },
        {
          optionId: 'stavros-r1-obj-case-study',
          responses: [
            { trustThreshold: 'low', text: "Crete isn't Kos. But fine - 30% visibility improvement is worth investigating. What exactly did they do?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's a good example. If they saw those results in three weeks, I'm willing to try. Walk me through the steps.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Good. Real examples, not theory. Let's do it.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2, conversion: 1, revenue: 1 },
          trustChange: 4,
        },
        {
          optionId: 'stavros-r1-obj-guarantee',
          responses: [
            { trustThreshold: 'low', text: "You 'guarantee' it? Nobody can guarantee that. You just lost credibility. I'll figure this out myself.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "Don't promise what you can't control. But I appreciate the confidence. I'll try it and we'll see.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I'll hold you to that guarantee. Let's see if you deliver.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 1 },
          trustChange: -4,
        },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
//  HANNAH - Round 1
// ════════════════════════════════════════════════════════════
const hannahR1: ConversationTree = {
  partnerId: 'hannah',
  round: 1,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Oh hello! How lovely to hear from you. I was just finishing up some guest welcome packs. How are you?",
        options: [
          {
            id: 'hannah-r1-open-warmth',
            label: 'Match her warmth',
            description: 'Build rapport before transitioning to business.',
            playerDialogue:
              "Hi Hannah! I'm well, thanks for asking. Welcome packs - that's such a lovely personal touch. How's everything going at Meadow Lane? I wanted to catch up and also share some thoughts about your bookings if you have a few minutes.",
            styleMatch: { green: 2, yellow: 2, blue: -1, red: -1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r1-open-data',
            label: 'Lead with data',
            description: 'Get straight to the performance numbers.',
            playerDialogue:
              "Hi Hannah. I've been looking at your property's performance data and there are some things I'd like to discuss. Your visibility has dropped and I think there are some actions we could take to improve it.",
            styleMatch: { green: -2, yellow: -1, blue: 2, red: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'hannah-r1-open-guest',
            label: 'Connect through guest experience',
            description: 'Start with what she cares about - her guests - then bridge to bookings.',
            playerDialogue:
              "Hi Hannah, lovely to catch up. I can see your reviews are wonderful - guests clearly love the experience at Meadow Lane. I was actually thinking about how we could help more travellers discover what you offer. Would you be open to exploring that?",
            styleMatch: { green: 2, yellow: 1, blue: 0, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r1-open-warmth',
          responses: [
            { trustThreshold: 'low', text: "Oh that's nice of you. Yes, I've got a few minutes. What were you thinking about?", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Thank you! Yes, things are good. A bit quiet midweek to be honest, but weekends are lovely. What did you want to chat about?", emotion: 'positive' },
            { trustThreshold: 'high', text: "How kind! Things are well. I've been wondering actually - I noticed we've been less visible on the site. Is that something you can help with?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
        {
          optionId: 'hannah-r1-open-data',
          responses: [
            { trustThreshold: 'low', text: "Oh. That sounds a bit... serious. My visibility dropped? I didn't realise. What's happened?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Performance data... right. I'm not really a numbers person to be honest, but go on - what's the concern?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Oh okay. That's concerning. I had noticed fewer bookings coming through. What does the data say?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'hannah-r1-open-guest',
          responses: [
            { trustThreshold: 'low', text: "That's a lovely way to put it. I do worry sometimes that more bookings means the wrong kind of guest though...", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Oh, that's so nice of you to say! I do put my heart into it. I'd love more people to experience Meadow Lane - what did you have in mind?", emotion: 'positive' },
            { trustThreshold: 'high', text: "What a wonderful thought! I'd absolutely be open to that. The right kind of traveller would love it here. What are you thinking?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 5,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt:
          "I'm open to hearing your ideas... but I should say upfront - I'm not really keen on big discounts. I don't want to cheapen what we offer here.",
        options: [
          {
            id: 'hannah-r1-rec-lastminute',
            label: 'Suggest Last-Minute Deal only',
            description: 'A targeted, small discount for unfilled rooms close to check-in.',
            playerDialogue:
              "I completely understand that, and I wouldn't suggest anything that feels wrong for your brand. What about a Last-Minute Deal that only applies to rooms that would otherwise go empty? It's a small, targeted discount for bookings made 1–2 days before arrival. Your regular guests and advance bookers see no change at all - it just fills those last empty rooms.",
            styleMatch: { green: 2, yellow: 1, blue: 1, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r1-rec-genius',
            label: 'Recommend Genius Programme',
            description: 'Position Genius as a way to attract better-quality travellers.',
            playerDialogue:
              "Have you looked at the Genius programme? It's actually designed for properties like yours. Genius members tend to be more experienced travellers who leave better reviews and book longer stays. The discount is small, and in return you get access to a higher-quality traveller segment that would genuinely appreciate what Meadow Lane offers.",
            styleMatch: { green: 1, yellow: 1, blue: 1, red: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'hannah-r1-rec-full',
            label: 'Recommend multiple discounts',
            description: 'Push for a broader discount strategy to maximise impact.',
            playerDialogue:
              "Hannah, I know discounts feel uncomfortable, but the reality is that your competitors in the Cotswolds are using these tools and it's affecting your visibility. I'd recommend activating Genius, Mobile Rate, and a Last-Minute Deal to catch up.",
            styleMatch: { green: -2, yellow: -1, blue: 0, red: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r1-rec-lastminute',
          responses: [
            { trustThreshold: 'low', text: "Hmm, just for empty rooms? I suppose that makes sense... I wouldn't want regulars to see a cheaper price though.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Oh, that's actually quite clever. Only for rooms that would be empty anyway? I like that. What kind of discount are we talking about?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's perfect! I hate the idea of empty rooms anyway. And if my regular guests don't see it, that feels right. Let's try it!", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 3 },
          trustChange: 5,
          nextPhasePrompt: "I do like the idea... but what if it attracts people who aren't the right fit for Meadow Lane?",
        },
        {
          optionId: 'hannah-r1-rec-genius',
          responses: [
            { trustThreshold: 'low', text: "Genius members leave better reviews? I'd need to see evidence of that. It still feels like discounting to me.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Higher-quality travellers... that's interesting. I do care more about the right guest than the most guests. Tell me more about how it works.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Oh, I like the sound of that! Experienced travellers who appreciate quality - that's exactly who I want. How do I sign up?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 2 },
          trustChange: 4,
          nextPhasePrompt: "But what if I get loads of bookings from people just chasing the discount? That's my worry.",
        },
        {
          optionId: 'hannah-r1-rec-full',
          responses: [
            { trustThreshold: 'low', text: "I... that feels like a lot. I don't want to turn Meadow Lane into a discount hotel. I need to think about this.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I appreciate you being honest, but that's exactly what I was worried about. It feels like you're asking me to compete on price, and that's not who we are.", emotion: 'negative' },
            { trustThreshold: 'high', text: "I know you mean well, but that's overwhelming. Can we take it one step at a time?", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -6,
          nextPhasePrompt: "I just don't want Meadow Lane to become a bargain-basement listing. That's not what we are.",
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "I just worry about changing what makes Meadow Lane special. My guests come for the experience, not the price.",
        options: [
          {
            id: 'hannah-r1-obj-reassure',
            label: 'Reassure and validate',
            description: 'Acknowledge her values and show the discount protects her brand.',
            playerDialogue:
              "And you're absolutely right - that's what makes Meadow Lane wonderful. Nothing we're talking about changes the experience you offer. This is just about making sure the right travellers can find you. Your reviews, your photos, your personal touches - those are what sell the stay. The discount just helps you appear in the search results where those travellers are looking.",
            styleMatch: { green: 2, yellow: 1, blue: 1, red: -1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r1-obj-story',
            label: 'Share a similar success story',
            description: 'Tell her about another guesthouse that had the same concern and succeeded.',
            playerDialogue:
              "I worked with a guesthouse owner in the Lake District who had exactly the same concern. She was worried discounts would attract the wrong guests. She tried a Last-Minute Deal as an experiment and found that the guests who booked through it were actually lovely - they were spontaneous travellers, couples looking for a last-minute escape. Her reviews stayed excellent and her midweek occupancy improved significantly.",
            styleMatch: { green: 2, yellow: 2, blue: 0, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r1-obj-urgency',
            label: 'Be direct about the risk',
            description: 'Point out that without action, bookings will continue to decline.',
            playerDialogue:
              "I hear that, Hannah, but I want to be honest with you. Your bookings have been declining and your visibility is falling further behind similar properties. If we don't take some action now, the trend will continue. I know discounts feel uncomfortable, but doing nothing has a cost too.",
            styleMatch: { green: -2, yellow: -1, blue: 1, red: 2 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r1-obj-reassure',
          responses: [
            { trustThreshold: 'low', text: "That's a nice way to think about it. I do want more people to find us... Let me sleep on it and I'll let you know.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "You know what, when you put it that way, it makes sense. It's not changing the experience, just the discoverability. Okay, I'll give it a try.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you for understanding. That really helps. Let's do it - I'll try the Last-Minute Deal and see how it goes.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 2 },
          trustChange: 6,
        },
        {
          optionId: 'hannah-r1-obj-story',
          responses: [
            { trustThreshold: 'low', text: "The Lake District... that is quite similar. Spontaneous travellers, couples... I like the sound of that actually.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Oh, that's a lovely story! Couples looking for a last-minute escape - that's exactly the kind of guest I'd want. Let's try it!", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's so reassuring! If she managed to keep her quality and fill rooms, there's no reason I can't too. Count me in.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 3, conversion: 3 },
          trustChange: 7,
        },
        {
          optionId: 'hannah-r1-obj-urgency',
          responses: [
            { trustThreshold: 'low', text: "That's... quite alarming. I need some time to think about this. Can we speak again next week?", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I appreciate your honesty, but I'm not going to be rushed into this. I'll think about it and come back to you.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I know you're trying to help, and I do hear you. But I need to feel comfortable with this, not pressured. Let me think.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: -5,
        },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
//  Round 2 & 3 - Continuation trees
//  (Responses adapt based on prior conversation outcomes)
// ════════════════════════════════════════════════════════════

const marinaR2: ConversationTree = {
  partnerId: 'marina',
  round: 2,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Hello again. I've had a chance to review the data since our last conversation. Shall we pick up where we left off?",
        options: [
          {
            id: 'marina-r2-open-results',
            label: 'Review her progress',
            description: 'Reference the metrics changes since your last conversation.',
            playerDialogue:
              "Absolutely, Marina. I've been tracking your numbers since we last spoke and there are some encouraging signs I'd like to walk through with you.",
            styleMatch: { blue: 2, green: 1, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r2-open-deepen',
            label: 'Propose the next step',
            description: 'Build on your earlier recommendation with an additional product.',
            playerDialogue:
              "Great to reconnect, Marina. I think our initial approach is starting to show results, and I wanted to discuss the logical next step to build on that momentum.",
            styleMatch: { blue: 1, green: 0, red: 1, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r2-open-check',
            label: 'Check her experience',
            description: 'Ask how the change has felt from her side before pushing forward.',
            playerDialogue:
              "Hi Marina. Before we look at the numbers, I wanted to ask - how has the change felt from your side? Have you noticed anything different in your bookings or guest profile?",
            styleMatch: { blue: 0, green: 2, red: -1, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r2-open-results',
          responses: [
            { trustThreshold: 'low', text: "I've been tracking them too. Let's compare notes - I have some questions about the methodology.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Good. I noticed some movement. Walk me through what you're seeing on your end.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes, I've been pleased with the early signs. Let's review and plan the next move.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'marina-r2-open-deepen',
          responses: [
            { trustThreshold: 'low', text: "Let's see the results of the first change before we start adding more.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I'm open to discussing it, but I'd want to see clear evidence the first step worked before committing to more.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "I like your thinking. What's the next step you'd recommend?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
        {
          optionId: 'marina-r2-open-check',
          responses: [
            { trustThreshold: 'low', text: "It's been fine. Nothing dramatic yet. Are the numbers showing anything?", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Actually, yes - I've noticed a few more mobile bookings. Nothing huge, but it's a positive sign.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Honestly, it's been better than I expected. I'm curious to see the full data.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 2,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt:
          "So where do we go from here? What's the next logical step?",
        options: [
          {
            id: 'marina-r2-rec-country',
            label: 'Add Country Rate',
            description: 'Layer in Country Rate targeting key source markets.',
            playerDialogue:
              "Based on the data, your top source markets are France, Germany, and the UK. Adding a Country Rate for these markets would give you a targeted competitive edge. It's a small discount visible only to travellers from those countries, so it's very precise.",
            styleMatch: { blue: 2, green: 1, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r2-rec-optimise',
            label: 'Optimise existing setup',
            description: 'Fine-tune what is already active rather than adding more.',
            playerDialogue:
              "Before adding anything new, I think there's value in optimising what we have. Your Mobile Rate is active but I want to check the discount level is set correctly and review your room type pricing to make sure the RPD improvement is maximised.",
            styleMatch: { blue: 2, green: 2, red: -1, yellow: -1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r2-rec-aggressive',
            label: 'Go all-in on discounts',
            description: 'Push for maximum discount adoption to accelerate results.',
            playerDialogue:
              "The early results are good, but I think we can accelerate. If we activate Country Rate, Early Booker Deal, and adjust your Genius discount level all at once, the combined effect should be significant.",
            styleMatch: { blue: -1, green: -2, red: 1, yellow: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r2-rec-country',
          responses: [
            { trustThreshold: 'low', text: "Country-specific discounts... interesting. What percentage are we talking, and can I set different levels per market?", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That's well-targeted. I like that it's specific rather than blanket. Let me review the source market data and we can decide on the right level.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That makes complete sense as a next step. Targeted, measurable, specific. Let's set it up.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 4, conversion: 3, revenue: 2 },
          trustChange: 4,
        },
        {
          optionId: 'marina-r2-rec-optimise',
          responses: [
            { trustThreshold: 'low', text: "Yes, I'd prefer that. Get the foundations right before adding layers.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Good thinking. I'd rather do fewer things well than lots of things poorly. Let's optimise.", emotion: 'positive' },
            { trustThreshold: 'high', text: "I appreciate that approach. Let's make sure what we have is working at its best.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2, conversion: 2, revenue: 1 },
          trustChange: 5,
        },
        {
          optionId: 'marina-r2-rec-aggressive',
          responses: [
            { trustThreshold: 'low', text: "That's too much, too fast. I said I wanted to be methodical. Let's slow down.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I appreciate the ambition, but that's not my style. I'd prefer to add one thing at a time and measure.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I admire your enthusiasm, but let's not get ahead of ourselves. One step at a time.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1, visibility: 1 },
          trustChange: -4,
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "One thing - I'm still watching the margin impact closely. Can you reassure me on that?",
        options: [
          {
            id: 'marina-r2-obj-data',
            label: 'Show the net revenue data',
            description: 'Present the actual revenue figures showing net positive impact.',
            playerDialogue:
              "Absolutely. Looking at the last three weeks since we activated Mobile Rate, your total booking revenue through Booking.com is up 8%. The rate per booking is slightly lower, but the volume increase has more than compensated. Net revenue is positive.",
            styleMatch: { blue: 2, green: 1, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r2-obj-monitor',
            label: 'Offer ongoing monitoring',
            description: 'Propose regular check-ins to track the margin impact together.',
            playerDialogue:
              "How about this - let's set up a fortnightly check-in where we review the margin impact together. If at any point the numbers don't work, we adjust immediately. You're always in control.",
            styleMatch: { blue: 1, green: 2, red: -1, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r2-obj-dismiss',
            label: 'Downplay the concern',
            description: 'Suggest the margin concern is less important than the growth opportunity.',
            playerDialogue:
              "Honestly Marina, margin on incremental bookings is almost always positive. I wouldn't worry too much about it - the bigger risk is leaving money on the table by not being visible.",
            styleMatch: { blue: -2, green: -1, red: 1, yellow: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r2-obj-data',
          responses: [
            { trustThreshold: 'low', text: "8% increase... I'll verify that against my own numbers. If it checks out, I'm comfortable continuing.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That's exactly what I needed to hear. Volume up, net revenue up - that's the right trajectory. Let's keep going.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Excellent. That's conclusive. I'm fully on board with the next step.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, revenue: 3 },
          trustChange: 5,
        },
        {
          optionId: 'marina-r2-obj-monitor',
          responses: [
            { trustThreshold: 'low', text: "Fortnightly check-ins work for me. I want visibility on this.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "I'd like that. Having regular oversight will make me more comfortable with expanding the strategy.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Perfect. I appreciate the partnership approach. Let's do it.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, revenue: 1 },
          trustChange: 4,
        },
        {
          optionId: 'marina-r2-obj-dismiss',
          responses: [
            { trustThreshold: 'low', text: "Don't tell me not to worry about my margins. That's my business, not yours.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I understand the logic, but dismissing my concern isn't helpful. I take margins seriously.", emotion: 'negative' },
            { trustThreshold: 'high', text: "I hear you, but I'd still like to see the data rather than be told not to worry.", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -5,
        },
      ],
    },
  ],
};

const stavrosR2: ConversationTree = {
  partnerId: 'stavros',
  round: 2,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Alright, you're back. What's the update? Are the numbers moving?",
        options: [
          {
            id: 'stavros-r2-open-progress',
            label: 'Show progress',
            description: 'Lead with what has improved since the last conversation.',
            playerDialogue:
              "Stavros, good news - the parity fix is starting to take effect. I can see your Experienced RPD improving and visibility is trending upward. Let me walk you through the specifics.",
            styleMatch: { red: 2, blue: 1, yellow: 1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-open-honest',
            label: 'Be transparent about mixed results',
            description: 'Acknowledge progress but flag remaining issues.',
            playerDialogue:
              "I'll be straight with you - we've seen some improvement, but we're not where we need to be yet. There are still some parity issues on one channel and I want to address that today.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-open-deflect',
            label: 'Focus on next steps',
            description: 'Skip past the results and focus on what to do next.',
            playerDialogue:
              "Rather than dwelling on the past few weeks, I want to focus on the next move. I've identified an additional opportunity that could accelerate your recovery.",
            styleMatch: { red: 0, blue: -1, yellow: 1, green: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r2-open-progress',
          responses: [
            { trustThreshold: 'low', text: "Improving how much? Give me percentages, not adjectives.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Good. Walk me through it - I want to see the trend.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Now that's what I like to hear. Show me the numbers.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'stavros-r2-open-honest',
          responses: [
            { trustThreshold: 'low', text: "Still parity issues? You said fixing it would help. When is 'fixed' actually fixed?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate the honesty. Most people would try to spin that. What's the remaining issue?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Good - I'd rather hear the truth than a sales pitch. What do we need to do?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 5,
        },
        {
          optionId: 'stavros-r2-open-deflect',
          responses: [
            { trustThreshold: 'low', text: "Wait - I want to see results from what we already did before you pitch me something new.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "Hang on, let's not skip past the results. What happened with the parity fix?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I appreciate looking forward, but I need to see what happened first. Show me the progress.", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt: "Right. So what's the next play?",
        options: [
          {
            id: 'stavros-r2-rec-country',
            label: 'Add Country Rate for key markets',
            description: 'Target specific source markets to boost competitive position.',
            playerDialogue:
              "Now that parity is improving, let's layer in a Country Rate targeting your top source markets - Germany and the UK. This targets the highest-volume travellers with a competitive rate without changing your base price.",
            styleMatch: { red: 2, blue: 1, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-rec-fix-lastminute',
            label: 'Fix the misconfigured Last-Minute Deal',
            description: 'Clean up the existing discount that is not working properly.',
            playerDialogue:
              "Before we add anything new, I noticed your Last-Minute Deal is active but misconfigured - it's set too far in advance and the discount level isn't competitive enough. Let's fix that first. It's already costing you without delivering results.",
            styleMatch: { red: 1, blue: 2, yellow: 0, green: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-rec-patience',
            label: 'Recommend patience',
            description: 'Suggest waiting for the parity fix to fully take effect.',
            playerDialogue:
              "Honestly, Stavros, I think the best move right now is patience. The parity fix is working but it takes time to flow through to visibility and bookings. I'd say give it another two to three weeks before adding anything else.",
            styleMatch: { red: -2, blue: 1, yellow: -1, green: 2 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r2-rec-country',
          responses: [
            { trustThreshold: 'low', text: "Germany and UK... what percentage discount, and what's the expected volume uplift?", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That's targeted. I like it. What level of discount are we talking?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Smart. Layer it in while the momentum is building. Set it up.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 5, conversion: 3, revenue: 3 },
          trustChange: 4,
        },
        {
          optionId: 'stavros-r2-rec-fix-lastminute',
          responses: [
            { trustThreshold: 'low', text: "Misconfigured? Why wasn't I told about this before? Fine - fix it.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Wait - it's been costing me money and not working? Show me what's wrong and let's fix it now.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Good catch. I didn't realise it was misconfigured. Let's sort it out immediately.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, discountQuality: 15, visibility: 3, revenue: 2 },
          trustChange: 5,
        },
        {
          optionId: 'stavros-r2-rec-patience',
          responses: [
            { trustThreshold: 'low', text: "Patience? I'm losing money every day. I need action, not patience.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I hear you, but 'wait and see' isn't a strategy. What else can we do in the meantime?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I trust your judgement, but it's hard to sit still when the numbers are down. Is there nothing else we can do?", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: -4,
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt: "What about Expedia? They're still showing better rates in some searches.",
        options: [
          {
            id: 'stavros-r2-obj-investigate',
            label: 'Offer to investigate',
            description: 'Promise to dig into the specific parity issue with Expedia.',
            playerDialogue:
              "I want to look into that specifically. Can you share some examples of where you've seen the rate difference? I'll cross-reference with our parity monitoring and we can identify exactly where the leak is.",
            styleMatch: { red: 1, blue: 2, yellow: 0, green: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-obj-channel-manager',
            label: 'Suggest a channel manager review',
            description: 'Recommend checking the channel manager configuration.',
            playerDialogue:
              "That's likely a channel manager configuration issue. Sometimes rate rules create unintended differences across channels. I'd recommend doing a full audit of your channel manager setup. I can help guide you through what to look for.",
            styleMatch: { red: 1, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-obj-match',
            label: 'Suggest matching Expedia rates',
            description: 'Recommend lowering Booking.com rates to match.',
            playerDialogue:
              "The simplest fix would be to adjust your Booking.com rate to match what you're offering on Expedia. That would immediately resolve the parity issue and boost your competitiveness.",
            styleMatch: { red: 1, blue: 0, yellow: 0, green: -1 },
            assertiveness: 3,
            compliance: 'risky',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r2-obj-investigate',
          responses: [
            { trustThreshold: 'low', text: "Fine. I'll send you screenshots. But I expect a solution, not just an investigation.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Good - a proper investigation. I'll pull the examples together today. How quickly can you turn it around?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's the right approach. I'll send everything over. Let's nail this.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, rateParity: -1 as unknown as undefined },
          trustChange: 5,
        },
        {
          optionId: 'stavros-r2-obj-channel-manager',
          responses: [
            { trustThreshold: 'low', text: "My channel manager should be handling this automatically. Are you saying it's my fault?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's possible. I haven't reviewed the rate rules in a while. What should I be looking for?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Good idea. I'll schedule a review with my revenue manager. Can you provide a checklist?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, discountQuality: 5 },
          trustChange: 3,
        },
        {
          optionId: 'stavros-r2-obj-match',
          responses: [
            { trustThreshold: 'low', text: "You're telling me to lower my prices on your platform to match a competitor? That doesn't sound right.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "Hmm, that feels like you're asking me to give Booking.com a better deal. I need to think about that.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I see the logic, but I'd rather fix the underlying issue than just patch the rate. Let's go deeper.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: -5,
        },
      ],
    },
  ],
};

const hannahR2: ConversationTree = {
  partnerId: 'hannah',
  round: 2,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Hello again! I've been thinking about our last chat. How are you?",
        options: [
          {
            id: 'hannah-r2-open-positive',
            label: 'Celebrate early wins',
            description: 'Start with positive news about any improvements.',
            playerDialogue:
              "Hi Hannah! I'm great, thanks. I've been looking at your numbers and there's some lovely progress to share - I thought you'd want to hear about it.",
            styleMatch: { green: 2, yellow: 2, blue: 0, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r2-open-ask',
            label: 'Ask about her experience',
            description: 'Let her share how things have been going before presenting data.',
            playerDialogue:
              "Lovely to hear from you too! Before I share anything, I'd love to hear - have you noticed any changes in your bookings since we last spoke?",
            styleMatch: { green: 2, yellow: 1, blue: -1, red: -1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r2-open-next-step',
            label: 'Jump to the next recommendation',
            description: 'Move quickly to what you want to propose next.',
            playerDialogue:
              "Hi Hannah. I wanted to touch base because I think there's an additional step we could take to keep building on the progress. Do you have a moment to discuss?",
            styleMatch: { green: -1, yellow: 0, blue: 1, red: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r2-open-positive',
          responses: [
            { trustThreshold: 'low', text: "Oh, progress? That's encouraging! I was a bit nervous to be honest. What are you seeing?", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Oh how exciting! I've noticed a few more bookings actually. Is that what you're seeing too?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Wonderful! I had a feeling things were picking up. Tell me everything!", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
        {
          optionId: 'hannah-r2-open-ask',
          responses: [
            { trustThreshold: 'low', text: "Hmm, it's hard to tell yet. Maybe a few more enquiries? I'm not sure if it's related though.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Actually, yes! I had two lovely couples book midweek, which is unusual. They mentioned finding us on Booking.com.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Oh yes! It's been noticeably busier, especially midweek. And the guests have been wonderful - exactly the kind of people we love hosting!", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'hannah-r2-open-next-step',
          responses: [
            { trustThreshold: 'low', text: "Oh, already? I feel like we've only just started. What did you have in mind?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I'm open to hearing it, but I don't want to rush ahead too quickly.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Sure! I'm feeling more confident now. What were you thinking?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: -1,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt:
          "So what would you suggest as a next step? I'm more open to ideas now, but I still want to be careful.",
        options: [
          {
            id: 'hannah-r2-rec-genius',
            label: 'Suggest Genius (if not already active)',
            description: 'Position Genius as the natural next step.',
            playerDialogue:
              "Given how well the initial change has worked, I think the Genius Programme would be a natural next step. It attracts experienced travellers who tend to leave great reviews. The discount is modest, and the quality of guest is typically exactly what a property like Meadow Lane attracts.",
            styleMatch: { green: 2, yellow: 1, blue: 1, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r2-rec-seasonal',
            label: 'Suggest seasonal pricing',
            description: 'Recommend adjusting rates for off-peak periods rather than adding more discounts.',
            playerDialogue:
              "Rather than adding another discount product, what if we looked at your seasonal pricing? If we slightly adjusted your midweek and off-peak rates, you could become more competitive during quiet periods without touching your peak-season or weekend pricing at all.",
            styleMatch: { green: 2, yellow: 0, blue: 2, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r2-rec-aggressive',
            label: 'Push for full activation',
            description: 'Recommend activating all remaining discount products.',
            playerDialogue:
              "You're seeing great results. I think now's the time to go all in - activate Genius, Mobile Rate, and Early Booker. The momentum is there and I don't want you to lose it.",
            styleMatch: { green: -2, yellow: 0, blue: -1, red: 2 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r2-rec-genius',
          responses: [
            { trustThreshold: 'low', text: "Hmm, I'd want to understand the discount level. But the 'experienced traveller' angle appeals to me.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That does sound like a good fit. If the guests are the kind who appreciate quality, I'm interested.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes! That sounds perfect for us. Let's do it.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 4, conversion: 3, revenue: 3 },
          trustChange: 5,
        },
        {
          optionId: 'hannah-r2-rec-seasonal',
          responses: [
            { trustThreshold: 'low', text: "That's interesting - only off-peak? So weekends and summer stays the same? I could consider that.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Oh, that's clever! I do hate having empty rooms midweek. And it doesn't affect my best periods. I like it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's brilliant! It feels very tailored to how Meadow Lane actually works. Let's look at the numbers together.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 2, revenue: 2 },
          trustChange: 6,
        },
        {
          optionId: 'hannah-r2-rec-aggressive',
          responses: [
            { trustThreshold: 'low', text: "All in? No, absolutely not. That's exactly the kind of thing I was worried about.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I appreciate the enthusiasm but that's too much, too fast. I want to take this slowly.", emotion: 'negative' },
            { trustThreshold: 'high', text: "I know you're excited by the results, but I'd rather build gradually. One thing at a time, please.", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -6,
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "I do have one concern - I had a guest last week who mentioned they got a deal. I don't want my regular guests feeling they paid too much.",
        options: [
          {
            id: 'hannah-r2-obj-explain',
            label: 'Explain how it works',
            description: 'Clarify that discounts are targeted and regulars see normal rates.',
            playerDialogue:
              "That's a great question, and I completely understand the concern. The discount is only visible to specific traveller segments - for example, Genius members or mobile app users. Your regular guests booking through your website or at your standard rate see your normal pricing. There's no public display of a reduced rate.",
            styleMatch: { green: 2, yellow: 0, blue: 2, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r2-obj-reframe',
            label: 'Reframe as smart revenue management',
            description: 'Position it as what all smart properties do.',
            playerDialogue:
              "Think of it this way - airlines have been doing this for decades. The person in seat 14A paid a different price than the person in 14B. It's not about devaluing the experience - it's smart revenue management that fills your rooms without undermining your brand.",
            styleMatch: { green: 0, yellow: 1, blue: 1, red: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'hannah-r2-obj-minimise',
            label: 'Minimise the concern',
            description: 'Suggest it is unlikely to be an issue in practice.',
            playerDialogue:
              "Honestly Hannah, it's very rare for guests to compare notes on prices. I wouldn't worry about it - it's a non-issue for the vast majority of properties.",
            styleMatch: { green: -2, yellow: -1, blue: -1, red: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r2-obj-explain',
          responses: [
            { trustThreshold: 'low', text: "Oh, I see - so it's not visible to everyone? That does make me feel better.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That's really reassuring. I didn't realise it was so targeted. Thank you for explaining.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Perfect - that's exactly what I needed to hear. I feel much better about it now.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, conversion: 2 },
          trustChange: 5,
        },
        {
          optionId: 'hannah-r2-obj-reframe',
          responses: [
            { trustThreshold: 'low', text: "I see the logic, but Meadow Lane isn't an airline... I want it to feel personal, not transactional.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's a fair point. I suppose hotels do this all the time. I just want to make sure it still feels right.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Ha, that's true! I never thought of it that way. Alright, I can get behind that.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, conversion: 1 },
          trustChange: 1,
        },
        {
          optionId: 'hannah-r2-obj-minimise',
          responses: [
            { trustThreshold: 'low', text: "It's not a non-issue to me. It literally just happened. I'd appreciate you taking my concerns seriously.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I know it might seem small to you, but it matters to me. These are my guests.", emotion: 'negative' },
            { trustThreshold: 'high', text: "I'm sure you're right, but it still bothers me. Can we find a way to address it?", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -5,
        },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
//  Round 3 - Final round trees
// ════════════════════════════════════════════════════════════

const marinaR3: ConversationTree = {
  partnerId: 'marina',
  round: 3,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Good timing - I was about to reach out. I've been preparing my quarterly pricing review and wanted your input.",
        options: [
          {
            id: 'marina-r3-open-strategic',
            label: 'Take a strategic view',
            description: 'Frame this as a long-term partnership discussion.',
            playerDialogue:
              "That's great to hear, Marina. I'd love to help with that. I think this is a good moment to look at the bigger picture - not just the tactical discount level, but your overall competitive positioning going into next quarter.",
            styleMatch: { blue: 2, green: 0, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r3-open-celebrate',
            label: 'Celebrate the results',
            description: 'Start by acknowledging how far her metrics have come.',
            playerDialogue:
              "Perfect timing indeed. Marina, before we plan forward, I want to acknowledge how much your numbers have improved. Your Experienced RPD is significantly better, visibility is up, and revenue is trending positively. That's your strategy working.",
            styleMatch: { blue: 1, green: 1, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r3-open-push',
            label: 'Push for more',
            description: 'Emphasise there is still room to grow.',
            playerDialogue:
              "Good, because there's still significant upside. You've made progress, but you're not yet at the competitive level of the top boutique hotels in Madrid. I want to help you close that gap.",
            styleMatch: { blue: 0, green: -1, red: 2, yellow: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r3-open-strategic',
          responses: [
            { trustThreshold: 'low', text: "Bigger picture - yes, that's what I need. Let's look at the data together.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Exactly what I was hoping to discuss. Strategic positioning, not just tactics. Go on.", emotion: 'positive' },
            { trustThreshold: 'high', text: "This is why I value our conversations. Let's build a proper plan.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
        {
          optionId: 'marina-r3-open-celebrate',
          responses: [
            { trustThreshold: 'low', text: "Thank you. I've been pleased with the direction. Now, let's talk about what's next.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "I appreciate you saying that. It feels like we've built a good foundation. What do you recommend for next quarter?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you - it's been a genuine partnership. I'm ready to be more ambitious now. What do you suggest?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'marina-r3-open-push',
          responses: [
            { trustThreshold: 'low', text: "I know there's a gap. But I'd rather close it methodically than chase a number.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Fair point. I'm not satisfied with 'good enough' either. What would it take to reach the top tier?", emotion: 'positive' },
            { trustThreshold: 'high', text: "I agree. I want to be the best in the market, not just better than before. Show me the gap.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt: "What do you recommend for my Q2 pricing strategy?",
        options: [
          {
            id: 'marina-r3-rec-holistic',
            label: 'Present a holistic plan',
            description: 'Combine multiple elements into a coherent quarterly strategy.',
            playerDialogue:
              "Here's what I'd recommend for Q2: maintain your current Mobile Rate and Country Rate settings, add an Early Booker Deal for advance bookings, and slightly adjust your midweek base rate to close the remaining gap with competitors. Together, this gives you a strong competitive position without relying too heavily on any single discount.",
            styleMatch: { blue: 2, green: 1, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r3-rec-maintain',
            label: 'Recommend maintaining current strategy',
            description: 'Suggest staying the course rather than changing further.',
            playerDialogue:
              "Honestly, Marina, I think the smart move is to maintain what's working. Your current setup is delivering results and I'd rather we protect that momentum than risk over-optimising. Let's revisit in 6 weeks when we have more data.",
            styleMatch: { blue: 1, green: 2, red: -2, yellow: -1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r3-rec-experiment',
            label: 'Suggest a pricing experiment',
            description: 'Propose testing different rate strategies across room types.',
            playerDialogue:
              "Here's an idea - what if we run a structured experiment? Keep your standard rooms at current pricing, but test a more aggressive discount on your superior rooms which have lower occupancy. We measure the impact over 4 weeks and use the data to inform your full Q2 strategy.",
            styleMatch: { blue: 2, green: 0, red: 0, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r3-rec-holistic',
          responses: [
            { trustThreshold: 'low', text: "That's a well-structured plan. I'll review the numbers and come back to you within the week.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "I like the coherence of the approach. It's not just random discounts - it's a strategy. Let's implement it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Excellent. This is exactly the kind of strategic thinking I've been looking for. Let's execute it.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 5, conversion: 4, revenue: 4 },
          trustChange: 6,
        },
        {
          optionId: 'marina-r3-rec-maintain',
          responses: [
            { trustThreshold: 'low', text: "That's... conservative. I was hoping for more actionable guidance.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate the caution, but I feel ready to do more. Is there really nothing else to try?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "I understand the logic, but I'm feeling ambitious. Let's at least explore one more thing.", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 1, visibility: 1 },
          trustChange: -1,
        },
        {
          optionId: 'marina-r3-rec-experiment',
          responses: [
            { trustThreshold: 'low', text: "A structured experiment with clear measurement - that appeals to me. How would we set it up?", emotion: 'positive' },
            { trustThreshold: 'medium', text: "I love that idea. Data-driven, controlled, measurable. That's exactly how I like to work.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Brilliant. A proper test with proper measurement. Let's design it together.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 4, conversion: 3, revenue: 3 },
          trustChange: 7,
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Closing',
        partnerPrompt: "This has been a productive conversation. Any final thoughts before I go?",
        options: [
          {
            id: 'marina-r3-close-partnership',
            label: 'Affirm the partnership',
            description: 'End on a collaborative note about working together.',
            playerDialogue:
              "Just that I've really valued how you've approached this, Marina. You've been rigorous, methodical, and willing to try new things. The results reflect that. I'm looking forward to seeing what we can achieve next quarter.",
            styleMatch: { blue: 1, green: 2, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r3-close-summary',
            label: 'Summarise next steps',
            description: 'End with clear, documented actions and timelines.',
            playerDialogue:
              "Let me quickly summarise: we'll implement the agreed changes by end of week, I'll send you a written summary of the plan, and we'll review the impact together in two weeks. I'll put it all in an email. Sound good?",
            styleMatch: { blue: 2, green: 1, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r3-close-ambitious',
            label: 'Set a stretch target',
            description: 'Challenge her to aim for top-tier performance.',
            playerDialogue:
              "One thought - what if we set a target of getting Hotel Castellana into the top 10% for Experienced RPD in Madrid by end of Q2? It's ambitious, but based on your trajectory, I think it's achievable.",
            styleMatch: { blue: 1, green: -1, red: 2, yellow: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r3-close-partnership',
          responses: [
            { trustThreshold: 'low', text: "Thank you. I do feel more confident about our approach now. Talk soon.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That's mutual. It's refreshing to work with someone who respects the process. Let's keep it going.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you - this has been the most productive partnership I've had with Booking.com. I'm genuinely excited about next quarter.", emotion: 'positive' },
          ],
          metricEffects: { revenue: 2 },
          trustChange: 5,
        },
        {
          optionId: 'marina-r3-close-summary',
          responses: [
            { trustThreshold: 'low', text: "Yes, a written summary would be helpful. Thank you for being organised about this.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Perfect - clear actions, clear timeline. That's exactly how I like to work. Thanks.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Excellent. I'll review the email and come back with any questions. This has been very productive.", emotion: 'positive' },
          ],
          metricEffects: { revenue: 1 },
          trustChange: 4,
        },
        {
          optionId: 'marina-r3-close-ambitious',
          responses: [
            { trustThreshold: 'low', text: "Top 10%? That's a stretch. I'd rather set realistic targets we can definitely hit.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's ambitious... but I like having a clear target. Let's see if the data supports it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "I love it. Give me a target and I'll chase it. Top 10% in Madrid - let's make it happen.", emotion: 'positive' },
          ],
          metricEffects: { revenue: 2 },
          trustChange: 2,
        },
      ],
    },
  ],
};

const stavrosR3: ConversationTree = {
  partnerId: 'stavros',
  round: 3,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt: "Right. Final check-in. Where are we at?",
        options: [
          {
            id: 'stavros-r3-open-results',
            label: 'Lead with results',
            description: 'Present the full improvement trajectory.',
            playerDialogue:
              "Stavros, here's where we stand: since we started working on this six weeks ago, your Experienced RPD has improved significantly, visibility is recovering, and bookings are trending upward. Let me show you the full picture.",
            styleMatch: { red: 2, blue: 2, yellow: 1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r3-open-challenge',
            label: 'Acknowledge remaining gaps',
            description: 'Be honest about what is still unresolved.',
            playerDialogue:
              "We've made real progress, but I want to be upfront - there are still gaps. Your RPD has improved but you're not yet where your top competitors are. Let me show you what's left to address.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r3-open-praise',
            label: 'Praise his action',
            description: 'Acknowledge that his quick decisions drove the improvement.',
            playerDialogue:
              "Stavros, credit where it's due - the speed at which you acted on the parity fix and the discount adjustments is the reason the numbers are recovering. Not every partner moves that fast.",
            styleMatch: { red: 2, blue: 0, yellow: 2, green: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r3-open-results',
          responses: [
            { trustThreshold: 'low', text: "Show me. Numbers. Now.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Good. Let me see the full trajectory - I want to see the trend, not just the current number.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Finally, some good news. Walk me through it - and tell me what's next.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'stavros-r3-open-challenge',
          responses: [
            { trustThreshold: 'low', text: "Gaps? After six weeks? What's left?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate the honesty. Show me the gaps and what it'll take to close them.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Good - I want the full picture, not the highlights reel. What do we need to do?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
        {
          optionId: 'stavros-r3-open-praise',
          responses: [
            { trustThreshold: 'low', text: "I don't need flattery. Are the numbers better or not?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Thanks. I don't hang around when there's a problem. Now, where do we stand?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Appreciate that. When someone gives me a clear plan, I execute. Now let's see the payoff.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 2,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt: "So what's the play for next season? High season is coming - I need a plan.",
        options: [
          {
            id: 'stavros-r3-rec-seasonal',
            label: 'Build a seasonal strategy',
            description: 'Create a pricing plan that varies by season and demand.',
            playerDialogue:
              "Here's my recommendation for high season: maintain your current discount setup, but create an Early Booker Deal specifically for June–August to capture advance bookings. Then in shoulder season, we layer in more aggressive Country Rates. This way you maximise revenue in peak and drive volume in quiet periods.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r3-rec-compete',
            label: 'Focus on beating competitors',
            description: 'Position the strategy around competitive advantage.',
            playerDialogue:
              "Your top three competitors on Kos are all using Early Booker and Country Rate strategies. Right now, you're catching up. My recommendation is to match their discount setup and then differentiate through your Genius programme and superior room types. Beat them on value, not just on price.",
            styleMatch: { red: 2, blue: 1, yellow: 1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r3-rec-scale-back',
            label: 'Recommend reducing discounts',
            description: 'Suggest pulling back now that parity is fixed.',
            playerDialogue:
              "Now that parity is resolved, you could actually consider reducing some of your discounts. The parity fix is doing the heavy lifting - you might not need as much discounting as before.",
            styleMatch: { red: -1, blue: 1, yellow: -1, green: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r3-rec-seasonal',
          responses: [
            { trustThreshold: 'low', text: "Early Booker for peak, aggressive Country Rates for shoulder... that's structured. I can work with that.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That's a plan I can execute. Maximise peak, drive shoulder. Clear and actionable. Let's do it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Now that's the kind of strategic thinking I've been wanting. You understand my business. Let's implement it.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 7, visibility: 5, conversion: 4, revenue: 5 },
          trustChange: 6,
        },
        {
          optionId: 'stavros-r3-rec-compete',
          responses: [
            { trustThreshold: 'low', text: "Beat them on value, not price... I like that framing. What specifically do I need to set up?", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Good - competitive intelligence is exactly what I need. If they're doing this, I should be too. Walk me through the setup.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's the mindset. Beat them. I'm in. Let's set it up today.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 5, conversion: 3, revenue: 4 },
          trustChange: 5,
        },
        {
          optionId: 'stavros-r3-rec-scale-back',
          responses: [
            { trustThreshold: 'low', text: "Reduce discounts? Are you serious? I'm just starting to see results and you want me to pull back?", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I see the logic, but the timing feels wrong. I'd rather keep the momentum going into high season.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Interesting thought, but I'm not sure now is the time. Let's keep the foot on the gas for one more quarter.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: -2, visibility: -1 },
          trustChange: -3,
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Closing',
        partnerPrompt: "Alright. I think we have a plan. Anything else?",
        options: [
          {
            id: 'stavros-r3-close-confidence',
            label: 'Express confidence',
            description: 'End with a strong, confident close.',
            playerDialogue:
              "Just this - you've made more progress in six weeks than most properties make in a quarter. If you execute this plan for high season, I expect the Aegean Grand to be one of the top-performing resorts on Kos by September.",
            styleMatch: { red: 2, blue: 0, yellow: 2, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r3-close-support',
            label: 'Offer ongoing support',
            description: 'Promise to stay closely involved.',
            playerDialogue:
              "I'll be monitoring your metrics closely over the coming weeks and I'll flag anything that needs attention. You've got my direct line - if anything looks off, call me.",
            styleMatch: { red: 1, blue: 1, yellow: 0, green: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'stavros-r3-close-challenge',
            label: 'Set a competitive target',
            description: 'Challenge him to beat a specific competitor.',
            playerDialogue:
              "One last thought - your closest competitor, the one that's been outperforming you, is within striking distance. With this plan, you could overtake them by end of summer. That's the benchmark I'd be aiming for.",
            styleMatch: { red: 2, blue: 1, yellow: 1, green: -1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r3-close-confidence',
          responses: [
            { trustThreshold: 'low', text: "We'll see. I'll judge on results.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That's a bold claim. I like it. Let's make it happen.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's what I want to hear. One of the top resorts on Kos. I'll hold you to it.", emotion: 'positive' },
          ],
          metricEffects: { revenue: 2 },
          trustChange: 4,
        },
        {
          optionId: 'stavros-r3-close-support',
          responses: [
            { trustThreshold: 'low', text: "Fine. I'll be in touch if I need anything.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Good to know. Having someone watching the numbers alongside me is useful.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Appreciate it. That's the kind of support that makes a difference. Talk soon.", emotion: 'positive' },
          ],
          metricEffects: { revenue: 1 },
          trustChange: 3,
        },
        {
          optionId: 'stavros-r3-close-challenge',
          responses: [
            { trustThreshold: 'low', text: "Overtake them? I'd settle for catching up first. But the ambition is noted.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Now you're speaking my language. Give me a target and I'll beat it. Consider it done.", emotion: 'positive' },
            { trustThreshold: 'high', text: "I love it. They won't know what hit them. Let's go.", emotion: 'positive' },
          ],
          metricEffects: { revenue: 3 },
          trustChange: 5,
        },
      ],
    },
  ],
};

const hannahR3: ConversationTree = {
  partnerId: 'hannah',
  round: 3,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Hello there! Oh, I've been looking forward to our chat. I've got some news!",
        options: [
          {
            id: 'hannah-r3-open-listen',
            label: 'Let her share first',
            description: 'Give her the floor to share her news.',
            playerDialogue:
              "Oh wonderful - I'd love to hear it! Go ahead, what's your news?",
            styleMatch: { green: 2, yellow: 2, blue: 0, red: -1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r3-open-data',
            label: 'Share the results first',
            description: 'Start with the performance data before hearing her news.',
            playerDialogue:
              "I've got news too! I've been looking at your latest numbers and there's been some real improvement. Let me share what I'm seeing.",
            styleMatch: { green: -1, yellow: 0, blue: 1, red: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'hannah-r3-open-mutual',
            label: 'Exchange news',
            description: 'Suggest you both share updates.',
            playerDialogue:
              "How exciting! You go first, and then I've got some great data to share too. This sounds like it's going to be a good conversation!",
            styleMatch: { green: 1, yellow: 2, blue: 0, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r3-open-listen',
          responses: [
            { trustThreshold: 'low', text: "We had our best midweek occupancy in months! And the guests have been lovely. I think what we did is working!", emotion: 'positive' },
            { trustThreshold: 'medium', text: "I've been getting the most wonderful reviews from the new guests! One couple even said they found us through a special offer and it was the best surprise of their trip!", emotion: 'positive' },
            { trustThreshold: 'high', text: "We're fully booked next weekend for the first time in ages! And the guests are exactly the kind of people who appreciate Meadow Lane. I'm so pleased!", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 5,
        },
        {
          optionId: 'hannah-r3-open-data',
          responses: [
            { trustThreshold: 'low', text: "Oh... I had my own news but... go on, what do the numbers say?", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Oh, you go ahead then! I'll share mine after. What are you seeing?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Haha, we're both excited! You go first with the data, and then I'll share my story.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: -1,
        },
        {
          optionId: 'hannah-r3-open-mutual',
          responses: [
            { trustThreshold: 'low', text: "Oh how fun! Okay - well, we've had our best midweek bookings in months! Your turn!", emotion: 'positive' },
            { trustThreshold: 'medium', text: "I love that! Okay - my news is that we've had the most wonderful feedback from new guests. And bookings are up! Now you!", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes! This does feel like a celebration! We're busier than ever and the guests are wonderful. I can't wait to hear what the data says!", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt: "So, what do you think I should focus on going forward?",
        options: [
          {
            id: 'hannah-r3-rec-gentle-growth',
            label: 'Suggest gentle growth',
            description: 'Recommend one small additional step that builds on success.',
            playerDialogue:
              "You've built something really special, Hannah. My suggestion would be one small addition - an Early Booker Deal for next quarter. It would help fill your calendar further in advance, giving you more certainty, while keeping the guest quality high. It's a natural extension of what's already working.",
            styleMatch: { green: 2, yellow: 1, blue: 1, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r3-rec-empower',
            label: 'Empower her to decide',
            description: 'Present options and let her choose what feels right.',
            playerDialogue:
              "Honestly, you know your business best. There are a few options: you could add an Early Booker Deal, try seasonal pricing, or simply maintain what's working. All three are valid. What feels right to you?",
            styleMatch: { green: 2, yellow: 1, blue: 0, red: -1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r3-rec-maximise',
            label: 'Push for maximum impact',
            description: 'Recommend adding multiple new products to capitalise on momentum.',
            playerDialogue:
              "The momentum is incredible. I think now is the time to capitalise - add Early Booker, activate Mobile Rate fully, and consider Country Rate for your top markets. Let's make the most of this while things are going well.",
            styleMatch: { green: -2, yellow: 0, blue: 0, red: 2 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r3-rec-gentle-growth',
          responses: [
            { trustThreshold: 'low', text: "Just one thing? I can handle that. Early Booker sounds sensible - more planning time is always good.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That's perfect. One step at a time - and advance bookings would give me peace of mind. Let's set it up.", emotion: 'positive' },
            { trustThreshold: 'high', text: "I love that you understand my pace. Early Booker is exactly right - it fits how I think about my business. Absolutely, let's do it!", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 4, conversion: 3, revenue: 4 },
          trustChange: 6,
        },
        {
          optionId: 'hannah-r3-rec-empower',
          responses: [
            { trustThreshold: 'low', text: "I appreciate you giving me the choice. I think I'll try the Early Booker - it feels the safest.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "What a lovely approach. I think I'd like to try seasonal pricing - it feels the most natural for how we work.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Do you know what? I'm feeling brave. I'd actually like to try two of those. Let's do Early Booker AND seasonal pricing!", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 3, revenue: 3 },
          trustChange: 5,
        },
        {
          optionId: 'hannah-r3-rec-maximise',
          responses: [
            { trustThreshold: 'low', text: "That's... a lot. I've been happy with the gradual approach. Let's not rush things.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I know you mean well, but that feels like too much at once. Can we just pick one?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I appreciate the ambition! But I'd rather keep building slowly. Let me pick the one that feels right.", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 1, visibility: 1 },
          trustChange: -4,
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Closing',
        partnerPrompt: "This has been such a lovely journey. Thank you for understanding what Meadow Lane is about.",
        options: [
          {
            id: 'hannah-r3-close-warmth',
            label: 'Mirror her warmth',
            description: 'End on a personal, warm note.',
            playerDialogue:
              "It's been a genuine pleasure, Hannah. You've built something really special at Meadow Lane, and I'm glad we've found a way to help more people discover it. I'll always make sure any recommendation fits who you are.",
            styleMatch: { green: 2, yellow: 2, blue: 0, red: -1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r3-close-practical',
            label: 'End with next steps',
            description: 'Finish with a clear plan and timeline.',
            playerDialogue:
              "Thank you, Hannah. So to confirm - I'll set up the Early Booker Deal this week, and we'll check in again in two weeks to see how it's performing. Sound good?",
            styleMatch: { green: 0, yellow: 0, blue: 2, red: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'hannah-r3-close-vision',
            label: 'Paint a picture of the future',
            description: 'Share an optimistic vision for Meadow Lane.',
            playerDialogue:
              "You know what I see for Meadow Lane? A property that's fully booked year-round with guests who truly appreciate what you offer. We're not far from that. Every step we've taken has brought you closer.",
            styleMatch: { green: 1, yellow: 2, blue: 0, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r3-close-warmth',
          responses: [
            { trustThreshold: 'low', text: "That means a lot. Thank you. I'm glad I trusted the process.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Oh, how kind! I feel like we've really built a lovely working relationship. Talk soon!", emotion: 'positive' },
            { trustThreshold: 'high', text: "You've been wonderful. I used to dread these calls, you know - but now I look forward to them. Thank you!", emotion: 'positive' },
          ],
          metricEffects: { revenue: 2 },
          trustChange: 7,
        },
        {
          optionId: 'hannah-r3-close-practical',
          responses: [
            { trustThreshold: 'low', text: "Yes, that works. Thank you for being organised about it. Bye for now.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Lovely. Clear plan, no fuss. I appreciate that. Speak in two weeks!", emotion: 'positive' },
            { trustThreshold: 'high', text: "Perfect. I feel in very safe hands. Thank you!", emotion: 'positive' },
          ],
          metricEffects: { revenue: 1 },
          trustChange: 2,
        },
        {
          optionId: 'hannah-r3-close-vision',
          responses: [
            { trustThreshold: 'low', text: "What a lovely thought. I hope we get there. Thank you.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Oh, that's a beautiful vision! Fully booked with the right guests - that's the dream. Thank you!", emotion: 'positive' },
            { trustThreshold: 'high', text: "Stop, you'll make me cry! That's exactly what I've always wanted for Meadow Lane. Thank you so much!", emotion: 'positive' },
          ],
          metricEffects: { revenue: 2 },
          trustChange: 6,
        },
      ],
    },
  ],
};

// ── Export all conversation trees ──
export const conversationTrees: ConversationTree[] = [
  marinaR1, marinaR2, marinaR3,
  stavrosR1, stavrosR2, stavrosR3,
  hannahR1, hannahR2, hannahR3,
  carlosR1, carlosR2, carlosR3,
  priyaR1, priyaR2, priyaR3,
  yukiR1, yukiR2, yukiR3,
];

export function getConversationTree(
  partnerId: string,
  round: number,
): ConversationTree | undefined {
  return conversationTrees.find(
    (t) => t.partnerId === partnerId && t.round === round,
  );
}
