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
        id: 'hook',
        label: 'Hook',
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "Okay - what specifically are you seeing? Walk me through the data.",
        options: [
          {
            id: 'marina-r1-diag-vague',
            label: 'Flag a general concern',
            description: 'Note that her numbers look soft without naming a specific driver.',
            playerDialogue:
              "Your performance has been a bit soft recently and I think there are some pricing levers we could look at together. Nothing alarming, but worth a conversation.",
            styleMatch: { blue: -2, green: 0, red: -1, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r1-diag-baserate',
            label: 'Name the signal, blame the base rate',
            description: 'Acknowledge visibility is slipping but attribute it to her overall rate being too high.',
            playerDialogue:
              "Your visibility has been slipping for a few weeks now and you're losing the price comparison on around two-thirds of searches. My read is your base rate is sitting a bit above the market, and that's what's pulling things down.",
            styleMatch: { blue: 1, green: 0, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r1-diag-mobile-gap',
            label: 'Name the signal, point to the mobile gap',
            description:
              'Walk her through where the visibility loss is concentrated and connect it to the missing Mobile Rate.',
            playerDialogue:
              "Your visibility is slipping and you're losing the price comparison on about two-thirds of searches. The interesting bit is where the loss is concentrated: your Genius bookings are holding up, but on non-Genius traffic you're being undercut consistently. Your rate parity is clean and you don't have Mobile Rate active - that combination points to mobile users specifically, where most of Madrid's search volume sits.",
            styleMatch: { blue: 2, green: 1, red: 0, yellow: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r1-diag-vague',
          responses: [
            { trustThreshold: 'low', text: "'A bit soft' isn't something I can act on. Can you be more specific about which metrics, and by how much?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I need more than that, sorry. Which numbers, and what's the comparison?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I trust you, but I'd still want the specifics before I do anything about it. What are you actually seeing?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
        {
          optionId: 'marina-r1-diag-baserate',
          responses: [
            { trustThreshold: 'low', text: "If you think my base rate is wrong, I'd want to see the comparable set you're benchmarking against. I'm not lowering my ADR on a hunch.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I take the visibility point - but I'm not convinced the base rate is the issue. My ADR is in line with the boutique set in central Madrid. What else could it be?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "You're right that visibility is trending the wrong way. But I'd be surprised if it's base rate - I check that monthly. Anything else in the data?", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: 1,
        },
        {
          optionId: 'marina-r1-diag-mobile-gap',
          responses: [
            { trustThreshold: 'low', text: "Okay, that's a much clearer read. The Public-vs-Loyal split is interesting - I hadn't broken it out that way. Go on.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That's exactly the kind of analysis I needed. The Public-vs-Loyal gap is a strong signal - so you're pointing at a mobile-specific issue, not a base rate one. Makes sense.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes - I was looking at the same numbers last week and reaching the same conclusion. Glad we're aligned. What's the fix?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 1 },
          trustChange: 6,
          nextPhasePrompt: "Right, so what are you recommending? And what's the evidence it will move the right metric?",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
        partnerPrompt:
          "Okay, so what are you recommending I do? And more importantly - what's the evidence it will work?",
        options: [
          {
            id: 'marina-r1-rec-mobile',
            label: 'Recommend Mobile Rate',
            description: 'Suggest activating Mobile Rate with data showing mobile booking share.',
            playerDialogue:
              "Looking at your data, mobile bookings make up over 60% of searches in Madrid. Your property isn't currently offering a Mobile Rate, which means mobile users see higher prices compared to competitors who do. Activating it would close that gap for mobile guests without touching your base rate.",
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
              "Rather than jumping to a recommendation, I'd like to walk through your visibility and price-comparison data with you. I think once we look at where you sit versus comparable properties, the right action will become clear. Can I share my screen?",
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
            { trustThreshold: 'high', text: "Perfect - I was hoping you'd suggest that. I've got some questions about how my price compares to the boutique set too. Let's dig in.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 2 },
          trustChange: 6,
          nextPhasePrompt: "Okay, the data makes sense. But before I commit to anything - what happens if it doesn't work? Can I reverse it easily?",
        },
      ],
    }
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
        id: 'hook',
        label: 'Hook',
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "Right - so what have you actually found? Cut to it.",
        options: [
          {
            id: 'stavros-r1-diag-broad',
            label: 'Frame it as a broad slump',
            description: 'Acknowledge bookings are down without pinpointing a cause.',
            playerDialogue:
              "Things are clearly under pressure - bookings are off, visibility is down, and you're trailing the comparable resort set on Kos. There are a few moving parts, but the headline is your competitive position has slipped.",
            styleMatch: { red: 0, blue: -1, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r1-diag-discount-volume',
            label: 'Blame the discount stack',
            description: "Argue Expedia is out-discounting him and he needs more products active.",
            playerDialogue:
              "Your visibility is down and you're losing the price comparison on most searches. The story I'd tell is your discount stack isn't doing enough work - Expedia partners on Kos have more products active than you do. That's where the visibility gap is opening up.",
            styleMatch: { red: 1, blue: 0, yellow: 1, green: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r1-diag-product-and-visibility',
            label: 'Name the broken product and visibility crash',
            description:
              'Pinpoint the misconfigured Last-Minute Deal and the on-platform visibility crash, and explain why they compound.',
            playerDialogue:
              "Two things are happening together and they're compounding. One: your Last-Minute Deal is active but misconfigured - the booking window is set seven days out instead of one to two, so you're discounting bookings that would've come in at full price anyway and missing the empty-room conversions it's actually designed to catch. Two: on-platform, your visibility on price-shopping searches has collapsed - you're showing further down in the results, and your overall price competitiveness is being read as weak. Combined effect: you're losing on both fronts at once.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: -1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r1-diag-broad',
          responses: [
            { trustThreshold: 'low', text: "'Slipped'? I can see that from my own dashboard. I need to know WHY, not THAT. Try again.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I already know I've slipped, that's why we're talking. What I need from you is the specific cause.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I know things are under pressure. Tell me something I don't know.", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'stavros-r1-diag-discount-volume',
          responses: [
            { trustThreshold: 'low', text: "More discounts? I'm already discounting. If that was the answer I'd have solved it months ago.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I'm not convinced. Expedia comparisons are useful but I want to know what's actually broken on my side. Anything else?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Maybe - but my gut says it's something more specific than just product count. What else have you got?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: 0,
        },
        {
          optionId: 'stavros-r1-diag-product-and-visibility',
          responses: [
            { trustThreshold: 'low', text: "Misconfigured booking window? My team set that up months ago. If you can show me where it's wrong I'm interested.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Now that's the specificity I needed. A broken Last-Minute Deal AND a visibility crash - that would explain a lot. Keep going.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Right. That's the kind of analysis I've been waiting for. So I've been throwing more discounts at a problem that wasn't really about discounts. Go on.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 1 },
          trustChange: 7,
          nextPhasePrompt: "Alright - so what do I actually do about the broken deal and getting my visibility back? And don't tell me to add more discounts - I'm already discounting.",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
        partnerPrompt:
          "Right. So what do I actually need to do? And don't tell me to add more discounts - I'm already discounting.",
        options: [
          {
            id: 'stavros-r1-rec-product-fix',
            label: 'Fix the misconfigured Last-Minute Deal',
            description: 'Sort out the broken product before adding new ones.',
            playerDialogue:
              "Here's the thing, Stavros - your discounts are active, but the Last-Minute Deal isn't doing what you think it's doing. The booking window is set seven days out, so it's discounting bookings that would've come in at full price anyway, and missing the empty-room conversions it's actually designed to catch. Fixing that one setting will recover your visibility on price-shopping searches and stop the leak before we even think about adding new products.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'stavros-r1-rec-more-discounts',
            label: 'Suggest adding Country Rate',
            description: 'Recommend another discount product to improve competitiveness.',
            playerDialogue:
              "One quick win would be activating Country Rate for key source markets. That would target travellers from high-volume countries with a tailored discount, which should close the price gap you're currently losing on those segments.",
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
          optionId: 'stavros-r1-rec-product-fix',
          responses: [
            { trustThreshold: 'low', text: "Wait - the Last-Minute Deal has been miswired the whole time? Show me exactly what's wrong with the setup.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's... actually not what I expected to hear. If we've been bleeding margin on full-price bookings I need to deal with it. Can you walk me through the exact setting that's wrong?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Well that explains a lot. I've been throwing money at new discounts and the issue was a broken old one. What's the change I need to make?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2 },
          trustChange: 7,
          nextPhasePrompt: "Okay, let's say I fix the deal. How long before I see results? Because I can't afford to wait months.",
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
    }
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
        id: 'hook',
        label: 'Hook',
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "So what is it you're seeing? I always want to know if there's something I should be aware of.",
        options: [
          {
            id: 'hannah-r1-diag-slow',
            label: 'Flag a slow patch',
            description: "Note that bookings look soft midweek without pinpointing why.",
            playerDialogue:
              "Things have been a little quiet midweek for you - nothing dramatic, but worth a look together. I thought it'd be good to chat through where the slow patches are coming from.",
            styleMatch: { green: 1, yellow: 0, blue: -1, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r1-diag-price-too-high',
            label: 'Suggest the price is too high',
            description: "Read it as a pricing problem - guests are choosing cheaper options nearby.",
            playerDialogue:
              "What I'm seeing is that your price competitiveness has slipped against nearby guesthouses - on the searches where you're appearing, travellers are choosing the cheaper option. My read is the rate's a little above what the comparable set is showing.",
            styleMatch: { green: 0, yellow: 0, blue: 1, red: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'hannah-r1-diag-visibility-gap',
            label: 'Frame it as a visibility gap, not a pricing problem',
            description:
              "Explain that her rate is fine - the issue is she's missing the filters and segments where travellers are choosing other properties.",
            playerDialogue:
              "Here's the encouraging bit - your rate is fine. Your parity is clean and your ADR sits in line with comparable guesthouses. What's happening is more about visibility than price. Because you don't have a Last-Minute Deal or Genius active, you're disappearing from the filters that the travellers most likely to love Meadow Lane are using - last-minute weekend trips, mid-range romantic getaways. They never see you to choose between you and someone cheaper.",
            styleMatch: { green: 2, yellow: 2, blue: 1, red: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r1-diag-slow',
          responses: [
            { trustThreshold: 'low', text: "Oh. Well, midweek is always quieter, isn't it? I'm not sure that's something we can really fix.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Quiet midweek - yes, I've noticed. But I was hoping you'd be able to tell me a bit more about why. Is it just the season?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "I trust you, but 'quiet patches' isn't really actionable for me. Anything specific you've spotted?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -1,
        },
        {
          optionId: 'hannah-r1-diag-price-too-high',
          responses: [
            { trustThreshold: 'low', text: "Oh dear. I really don't want to lower my prices - the guests we have are happy with them, and I worry about cheapening what we offer.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I see what you're saying, but I'm not comfortable lowering the rate. Meadow Lane isn't a budget property and I don't want to be priced like one. Is there another way to read it?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Hmm. I understand the data, but I'd want to find another way before touching the rate. The pricing is part of what protects the experience.", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
        {
          optionId: 'hannah-r1-diag-visibility-gap',
          responses: [
            { trustThreshold: 'low', text: "Oh! That's a relief - I was bracing for you to tell me to drop my prices. So it's more about being found in the right places?", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That makes so much more sense. So it's not that my rate is wrong - it's that the right travellers aren't even seeing Meadow Lane to consider it. I like that framing. Tell me more.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes, that's exactly what I needed to hear. I knew the rate wasn't the issue - it's the discoverability. So what do we do about that without compromising the brand?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 2 },
          trustChange: 6,
          nextPhasePrompt: "So if it's visibility, not pricing... what would you suggest? I should say upfront though - I'm not really keen on big discounts. I don't want to cheapen what we offer here.",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
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
    }
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
        id: 'hook',
        label: 'Hook',
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "So what does the data actually show? Walk me through what's moved and what hasn't.",
        options: [
          {
            id: 'marina-r2-diag-progress-only',
            label: 'Show overall progress',
            description: 'Highlight that the headline numbers are trending up.',
            playerDialogue:
              "The headline is positive - visibility is up, conversion is improving, and bookings are tracking ahead of where you were a month ago. The Mobile Rate change is doing what we hoped.",
            styleMatch: { blue: 1, green: 1, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r2-diag-rpd-broad',
            label: 'Note RPD still has room - more discounts needed',
            description: 'Acknowledge progress but argue the broader discount stack should now be opened up.',
            playerDialogue:
              "Mobile Rate has helped, but your overall RPD still has room to improve. My read is the mobile fix on its own isn't enough - we should be looking at broader discount adoption to push it further.",
            styleMatch: { blue: 0, green: -1, red: 1, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'marina-r2-diag-source-market-gap',
            label: 'Pinpoint a source-market visibility gap',
            description:
              'Identify that the remaining gap is concentrated on inbound traffic from her top source markets.',
            playerDialogue:
              "Mobile is closing - your mobile booking share is up about 8 points since we activated it. Where you're still losing the price comparison is on inbound traffic from France, Germany, and the UK. Those three account for over 60% of your non-domestic search volume and you're being undercut on them specifically. Domestic Spanish travellers and mobile users are now fine; the gap is now country-specific.",
            styleMatch: { blue: 2, green: 1, red: 0, yellow: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r2-diag-progress-only',
          responses: [
            { trustThreshold: 'low', text: "Good headlines - but I want to know what's NOT working as much as what is. Anything still off?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's good to hear, but it's not the whole picture. Where is there still a gap?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Encouraging. But you know me - I'd rather discuss what's still off than just celebrate what's working.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: 0,
        },
        {
          optionId: 'marina-r2-diag-rpd-broad',
          responses: [
            { trustThreshold: 'low', text: "'Broader discount adoption' is vague. I'm not adding products just because the dashboard says I should - tell me which segment is actually losing and why.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I'd want a more precise read than 'open up discounts'. Where exactly is the leakage?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "I hear you, but blanket discounting isn't my style. Can you point me at the specific segment?", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: 0,
        },
        {
          optionId: 'marina-r2-diag-source-market-gap',
          responses: [
            { trustThreshold: 'low', text: "That's much more useful. Source-market specific - I can work with that. Can you send me the breakdown by country?", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Now that's the kind of analysis I value. So mobile is sorted, and the next leakage is country-specific. That makes sense given my booking mix.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes - I was looking at the same breakdown last week and reaching the same conclusion. Glad we're aligned on the next move.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 1 },
          trustChange: 6,
          nextPhasePrompt: "Right - so where do we go from here? What's the next logical step?",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
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
    }
  ],
};

const stavrosR2: ConversationTree = {
  partnerId: 'stavros',
  round: 2,
  phases: [
    {
      phase: {
        id: 'hook',
        label: 'Hook',
        partnerPrompt:
          "Alright, you're back. What's the update? Are the numbers moving?",
        options: [
          {
            id: 'stavros-r2-open-progress',
            label: 'Show progress',
            description: 'Lead with what has improved since the last conversation.',
            playerDialogue:
              "Stavros, good news - the product fix is starting to take effect. Your price competitiveness is improving and visibility is trending upward. Let me walk you through the specifics.",
            styleMatch: { red: 2, blue: 1, yellow: 1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-open-honest',
            label: 'Be transparent about mixed results',
            description: 'Acknowledge progress but flag remaining issues.',
            playerDialogue:
              "I'll be straight with you - we've seen some improvement, but we're not where we need to be yet. There's still a gap I want to address today, particularly on your international source-market traffic.",
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
            { trustThreshold: 'low', text: "Still a gap after the fix? You said it would help. What's left?", emotion: 'cautious' },
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
            { trustThreshold: 'medium', text: "Hang on, let's not skip past the results. What happened with the product fix?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I appreciate looking forward, but I need to see what happened first. Show me the progress.", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
      ],
    },
    {
      phase: {
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt: "So where do we actually stand? Be specific.",
        options: [
          {
            id: 'stavros-r2-diag-mostly-fine',
            label: 'Frame it as mostly back on track',
            description: "Suggest the product fix has done the heavy lifting and the rest will follow.",
            playerDialogue:
              "Honestly, the product fix has done most of the heavy lifting. The numbers are still climbing but the worst is behind us. I'd say we're in recovery mode now.",
            styleMatch: { red: 0, blue: -1, yellow: 1, green: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-diag-need-deeper-discount',
            label: 'Argue the discount levels are too shallow',
            description: 'Read the residual gap as needing harder discounts across the stack.',
            playerDialogue:
              "The product fix is in. Where I think you're still losing ground is the depth of your discounts - your Genius and Mobile discount levels are sitting at the conservative end of the range. To pull back the volume you've lost, you'd want to push those harder.",
            styleMatch: { red: 1, blue: 0, yellow: 1, green: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-diag-source-market-gap',
            label: 'Pinpoint the international source-market gap',
            description:
              'Show that with the product fix in, residual leakage is on inbound traffic from his top international source markets.',
            playerDialogue:
              "The Last-Minute Deal fix is doing its job - visibility is climbing and the empty-room conversions are picking up. What's still soft is your international demand: Germany and the UK are your top two source markets, and on that traffic specifically you're being read as less competitive than comparable resorts on Kos. That's where the next meaningful gap is.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r2-diag-mostly-fine',
          responses: [
            { trustThreshold: 'low', text: "'Recovery mode' is exactly the kind of phrase I don't want to hear. I need to know where I'm still losing money, not be told everything's fine.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "That's not specific enough for me. If there's residual leakage, find it. Don't tell me to wait it out.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I appreciate the confidence, but I want to know where I'm STILL losing - because I am. What's the residual problem?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
        {
          optionId: 'stavros-r2-diag-need-deeper-discount',
          responses: [
            { trustThreshold: 'low', text: "More discount, again. I've already discounted. If that was the answer, the diagnosis last time wouldn't have been a single product fix.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I'd push back on that. Deeper discounting feels like throwing money at the problem. Anything more specific?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Maybe - but my instinct says there's something more specific than 'discount harder'. Look again.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: 0,
        },
        {
          optionId: 'stavros-r2-diag-source-market-gap',
          responses: [
            { trustThreshold: 'low', text: "Germany and UK specifically? That's a sharper read. Show me the source-market breakdown - I want to see how my numbers compare on each.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Now THAT is the kind of specific diagnosis I needed. Two named source markets where I'm under-competing - that's something I can act on.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Right. So the broken product is sorted but the next gap is who's looking and where they're from. That's a clear next move.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 1 },
          trustChange: 6,
          nextPhasePrompt: "Right - so what's the next play? How do I close that source-market gap?",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
        partnerPrompt: "Right. So what's the next play?",
        options: [
          {
            id: 'stavros-r2-rec-country',
            label: 'Add Country Rate for key markets',
            description: 'Target the international source markets where the visibility gap sits.',
            playerDialogue:
              "Now that the product fix is in, let's layer in a Country Rate targeting your top source markets - Germany and the UK. That gives those travellers a more competitive rate without changing your base price, and closes the specific gap we just identified.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-rec-genius-deeper',
            label: 'Push Genius participation harder',
            description: 'Recommend deepening the Genius discount to attract more repeat travellers.',
            playerDialogue:
              "Before we add a new product, I'd push your Genius participation harder. You're at the conservative end of the range - moving to a deeper Genius discount unlocks priority placement for repeat travellers, which is a different audience to the source-market one we just talked about.",
            styleMatch: { red: 1, blue: 1, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'stavros-r2-rec-patience',
            label: 'Recommend patience',
            description: 'Suggest waiting for the product fix to fully take effect.',
            playerDialogue:
              "Honestly, Stavros, I think the best move right now is patience. The product fix is working but it takes time to flow through to visibility and bookings. I'd say give it another two to three weeks before adding anything else.",
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
            { trustThreshold: 'low', text: "Germany and UK... what percentage rate, and what's the expected volume uplift?", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That's targeted, and it lines up with the source-market gap you just showed me. What level are we talking?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Smart. Layer it in while the momentum is building. Set it up.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 5, conversion: 3, revenue: 3 },
          trustChange: 6,
        },
        {
          optionId: 'stavros-r2-rec-genius-deeper',
          responses: [
            { trustThreshold: 'low', text: "Deeper Genius? That's giving away more margin on guests already coming in. Not sure that's the right move right now.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Genius repeat traveller versus the source-market gap - they're different audiences. I'd want to be sure we're picking the right one first.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Reasonable, but I'd rather close the source-market gap we just named first. Genius after that maybe.", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 1 },
          trustChange: 1,
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
    }
  ],
};

const hannahR2: ConversationTree = {
  partnerId: 'hannah',
  round: 2,
  phases: [
    {
      phase: {
        id: 'hook',
        label: 'Hook',
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "So what's the data actually telling you? I always like to understand the bigger picture.",
        options: [
          {
            id: 'hannah-r2-diag-broad-uplift',
            label: 'Celebrate the broad uplift',
            description: 'Highlight that bookings are up across the board.',
            playerDialogue:
              "The data is looking lovely - bookings are up, visibility is up, conversion is moving in the right direction. The change we made is doing its job and you're being seen by more travellers.",
            styleMatch: { green: 1, yellow: 2, blue: 0, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r2-diag-needs-more-products',
            label: 'Argue the next gap is more products',
            description: 'Read the residual softness as needing additional discount products.',
            playerDialogue:
              "It's working, but I don't think we're done. Your overall price competitiveness has improved but it's not yet on a par with the comparable set. The shape of the gap suggests we need more products active to keep pulling visibility up.",
            styleMatch: { green: -1, yellow: 0, blue: 0, red: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'hannah-r2-diag-midweek-pattern',
            label: 'Spot the midweek pattern',
            description:
              'Show that the uplift is concentrated on weekends; weekday/off-peak is still soft and reflects a seasonal-pricing gap, not a product gap.',
            playerDialogue:
              "Here's the interesting bit: the uplift is concentrated on weekends and peak nights - those are now competitive. Where there's still softness is weekday and shoulder-season nights. The pattern says it's a seasonal pricing question, not another discount product - on weekends your rate is fine, but on quieter nights you're appearing alongside properties that have softer midweek pricing.",
            styleMatch: { green: 2, yellow: 1, blue: 2, red: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r2-diag-broad-uplift',
          responses: [
            { trustThreshold: 'low', text: "Oh that's wonderful to hear! But is there anything I should still be watching out for?", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Lovely. But I always like to know where I should be paying attention next - what's still soft?", emotion: 'positive' },
            { trustThreshold: 'high', text: "I'm so pleased. Is there anywhere you think we could keep building though? I'd rather not coast.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
        {
          optionId: 'hannah-r2-diag-needs-more-products',
          responses: [
            { trustThreshold: 'low', text: "Oh no - 'more products' sounds like 'more discounts' to me. That's what I was worried about. Is there really nothing else to read in the data?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I'm not sure about that, to be honest. It feels like a leap. Is the data actually pointing at product count, or is there something more specific?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I'd want a more specific read than that before I add another product. Where exactly is the softness?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
        {
          optionId: 'hannah-r2-diag-midweek-pattern',
          responses: [
            { trustThreshold: 'low', text: "Oh, that's a relief - weekends are doing well. So it's specifically about my quieter nights? That feels like something I can actually do something about.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That makes so much sense. My peak nights have always been strong - it's the slow midweek stretches that I worry about. So it's really a pricing-shape question.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes - and that's exactly the bit that bothers me. Midweek empty rooms feel like a waste. Tell me what you'd do.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 1 },
          trustChange: 6,
          nextPhasePrompt: "So what would you suggest as a next step? I'm more open to ideas now, but I still want to be careful.",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
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
    }
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
        id: 'hook',
        label: 'Hook',
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
              "Perfect timing indeed. Marina, before we plan forward, I want to acknowledge how much your numbers have improved. Your price competitiveness is significantly better, visibility is up, and revenue is trending positively. That's your strategy working.",
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "Before we talk strategy - where's the data telling you the residual gap actually is?",
        options: [
          {
            id: 'marina-r3-diag-aggregate',
            label: 'Frame it at the aggregate level',
            description: 'Note that headline competitiveness is strong; rest is general fine-tuning.',
            playerDialogue:
              "At the aggregate level your position is genuinely strong - you're well inside the competitive band against the boutique set in Madrid. Anything else is fine-tuning rather than fixing.",
            styleMatch: { blue: 1, green: 1, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'marina-r3-diag-base-rate-lift',
            label: 'Suggest the next move is a base rate lift',
            description: 'Read the strong position as headroom to lift the base rate.',
            playerDialogue:
              "Your position is strong enough that I think there's room to test a small base rate lift in peak. The data suggests you're slightly under-priced now that visibility has caught up - we could capture more revenue per booking.",
            styleMatch: { blue: 1, green: 0, red: 2, yellow: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'marina-r3-diag-room-type-mix',
            label: 'Pinpoint the room-type performance gap',
            description:
              'Show that the aggregate hides a meaningful gap between standard and superior room performance.',
            playerDialogue:
              "Headline numbers are great. But when I break it down by room type, the story is different: your standard rooms are tracking at the top of the boutique set, but your superior rooms are running materially below them on occupancy. You're pricing them as if they perform identically - the data says they don't. That's the next meaningful gap.",
            styleMatch: { blue: 2, green: 1, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'marina-r3-diag-aggregate',
          responses: [
            { trustThreshold: 'low', text: "Strong is good, but 'fine-tuning' isn't a recommendation. I'm preparing a quarterly review - I need more than that.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I'd push back gently - aggregate fine, but I always assume there's a more granular cut. What does the segment-level view show?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Aggregate-level is encouraging, but I want to know what the breakdown by segment shows. There's always something underneath the headline.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: 0,
        },
        {
          optionId: 'marina-r3-diag-base-rate-lift',
          responses: [
            { trustThreshold: 'low', text: "A base rate lift? That feels like the opposite of what got us here. I'd want to be very careful about that.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Interesting, but risky. We worked hard to get visibility back - a rate lift now could undo it. Is the segment-level data really that strong, or is this an aggregate read?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Possible, but the risk-reward feels off. I'd want a much sharper signal than aggregate before lifting price. Anything more specific?", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: -1,
        },
        {
          optionId: 'marina-r3-diag-room-type-mix',
          responses: [
            { trustThreshold: 'low', text: "Standard versus superior - now that's interesting. I had a feeling my superior rooms were under-performing but I hadn't quantified it. Show me the gap.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That's exactly the kind of segment-level cut I was hoping for. Pricing my room types identically when they perform differently - that's a real gap.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes - I've been suspicious of my superior room performance for a while. This is what I want to talk about in the quarterly review. Go on.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 1, revenue: 1 },
          trustChange: 7,
          nextPhasePrompt: "Right - so what would you recommend for my Q2 pricing strategy given that?",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
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
    }
  ],
};

const stavrosR3: ConversationTree = {
  partnerId: 'stavros',
  round: 3,
  phases: [
    {
      phase: {
        id: 'hook',
        label: 'Hook',
        partnerPrompt: "Right. Final check-in. Where are we at?",
        options: [
          {
            id: 'stavros-r3-open-results',
            label: 'Lead with results',
            description: 'Present the full improvement trajectory.',
            playerDialogue:
              "Stavros, here's where we stand: since we started working on this six weeks ago, your price competitiveness has improved significantly, visibility is recovering, and bookings are trending upward. Let me show you the full picture.",
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
              "Stavros, credit where it's due - the speed at which you acted on the product fix and the discount adjustments is the reason the numbers are recovering. Not every partner moves that fast.",
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt: "So before we plan for high season - where are we still leaking? Be specific.",
        options: [
          {
            id: 'stavros-r3-diag-good-everywhere',
            label: 'Suggest the position is solid across the board',
            description: 'Frame current performance as broadly competitive in every period.',
            playerDialogue:
              "Honestly, you're now competitive across the board - peak, shoulder and off-peak. There isn't a screaming gap anywhere. The conversation today is more about how we capitalise from a strong position than how we patch a problem.",
            styleMatch: { red: 0, blue: 0, yellow: 1, green: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'stavros-r3-diag-deeper-discounts',
            label: 'Argue we should discount harder going into peak',
            description: 'Read the recovery as a signal to lean harder on discounts.',
            playerDialogue:
              "We've got momentum and high season is coming. My read is we should push the existing discounts harder across the board to lock in volume before competitors do the same.",
            styleMatch: { red: 1, blue: -1, yellow: 1, green: -1 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'stavros-r3-diag-peak-vs-shoulder',
            label: 'Split the read by peak vs shoulder',
            description:
              'Show that peak demand is robust enough to capture advance bookings while shoulder season still needs visibility help.',
            playerDialogue:
              "When I split it by season the picture changes. For high season - June through August - your demand signal is strong and you're not capturing enough advance bookings, you're leaving peak revenue on the table waiting for late traffic. For shoulder season - April-May and September - you're still being undercut on price-shopping searches, so volume needs a push. They're different problems in different periods, not one blanket discount question.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'stavros-r3-diag-good-everywhere',
          responses: [
            { trustThreshold: 'low', text: "If I'm competitive everywhere then why am I not seeing the booking volume I want yet? Don't tell me everything's fine - tell me what's still off.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Mostly true, but I don't believe there's nothing left to find. Look harder.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "I appreciate the confidence, but high season is too important for 'broadly fine'. What's the next real opportunity?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -1,
        },
        {
          optionId: 'stavros-r3-diag-deeper-discounts',
          responses: [
            { trustThreshold: 'low', text: "Discount harder going into peak? On the highest-margin nights of my year? That's exactly when I should be tightening, not loosening.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I don't agree. Peak is when I make my margin. Heavier discounts there would be giving away revenue I don't need to give away.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I'd push back on that hard. Peak is my best window - I'm not going to over-discount it. Anything sharper than a blanket push?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
        {
          optionId: 'stavros-r3-diag-peak-vs-shoulder',
          responses: [
            { trustThreshold: 'low', text: "Now THAT is two different problems I can actually plan around. Peak too late, shoulder too pricey. Good. Walk me through it.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Yes - that matches my gut. I've been treating it like one strategy when it should be two. Different periods, different plays. Good read.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's exactly the kind of strategic separation I needed. Two different problems, two different plays - I can plan around that. Go on.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 2 },
          trustChange: 7,
          nextPhasePrompt: "Right - so what's the play for next season? High season is coming - I need a plan.",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
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
            description: 'Suggest pulling back now that the product fix is in.',
            playerDialogue:
              "Now that the discount stack is in order, you could actually consider reducing some of your discounts. The product fix is doing the heavy lifting - you might not need as much discounting as before.",
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
    }
  ],
};

const hannahR3: ConversationTree = {
  partnerId: 'hannah',
  round: 3,
  phases: [
    {
      phase: {
        id: 'hook',
        label: 'Hook',
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "So what does it look like in the numbers? You know I always like to hear what the data says alongside the stories.",
        options: [
          {
            id: 'hannah-r3-diag-broad-rosy',
            label: 'Stay broad and celebratory',
            description: "Confirm everything's trending up without getting into specifics.",
            playerDialogue:
              "Honestly, the picture is lovely across the board. Bookings, visibility, conversion - all trending up. The numbers are matching the stories your guests are telling you.",
            styleMatch: { green: 2, yellow: 2, blue: 0, red: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'hannah-r3-diag-now-push-more',
            label: 'Argue the momentum says push harder',
            description: 'Suggest the strong results are a sign to layer in more discount products.',
            playerDialogue:
              "The momentum is real - my read is now's the moment to capitalise. Numbers like these suggest we should add more products and accelerate while travellers are responding so well.",
            styleMatch: { green: -1, yellow: 0, blue: 0, red: 2 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'hannah-r3-diag-advance-window-gap',
            label: 'Spot the advance-booking window gap',
            description:
              "Show that current strength is in close-in bookings; she's still under-represented in advance-window searches.",
            playerDialogue:
              "The current strength is mostly close-in - travellers booking within two weeks. Where you're still under-represented is the advance window: people planning trips one to three months ahead. Your direct and Genius guests already book early, but on Booking.com you barely appear in those advance searches. That's the next gentle gap - calendar certainty, not visibility-versus-price.",
            styleMatch: { green: 2, yellow: 1, blue: 2, red: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'hannah-r3-diag-broad-rosy',
          responses: [
            { trustThreshold: 'low', text: "Oh wonderful! Is there anywhere I should still be looking though? I'd hate to take my eye off something important.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That's lovely to hear. But you know me - I always like to know where I could still be paying attention.", emotion: 'positive' },
            { trustThreshold: 'high', text: "I'm so pleased. Anywhere you think we could keep building, without overdoing it?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
        {
          optionId: 'hannah-r3-diag-now-push-more',
          responses: [
            { trustThreshold: 'low', text: "Oh dear - 'capitalise' and 'more products' is exactly what worries me. I've felt comfortable with what we've done. I don't want to overdo it.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate the enthusiasm but that's not how I want to grow. Gentle and right-fit, not 'accelerate'. Is there a softer read of the data?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I know you mean well - but 'add more products' feels like the wrong direction for me. I'd rather one thoughtful step than several at once. What does the data actually suggest specifically?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'hannah-r3-diag-advance-window-gap',
          responses: [
            { trustThreshold: 'low', text: "Oh, I'd never thought about that gap. So my close-in is doing well, but I'm just not visible to advance planners. That feels like something we can fix without changing what works.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That makes so much sense. Advance planners are exactly the kind of guests I'd love more of - they're organised, they value certainty. And it doesn't undermine what we've built. Tell me more.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes - advance bookings would give me such peace of mind about my calendar! And it sounds like a gentle, well-fitting next step. I love it.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 1, revenue: 1 },
          trustChange: 6,
          nextPhasePrompt: "So given that, what would you suggest I focus on going forward?",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
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
    }
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
