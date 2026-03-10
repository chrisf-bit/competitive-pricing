import type { ConversationTree } from '../types';

// ════════════════════════════════════════════════════════════
//  YUKI - Round 1
//  Focus: Introducing Genius Programme as a premium visibility
//  tool (not discounting)
// ════════════════════════════════════════════════════════════
export const yukiR1: ConversationTree = {
  partnerId: 'yuki',
  round: 1,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Good morning. Thank you for calling. I have set aside some time for our conversation. How may I help you today?",
        options: [
          {
            id: 'yuki-r1-opening-relationship',
            label: 'Lead with relationship',
            description: 'Open warmly, ask about her property and guests before business.',
            playerDialogue:
              "Good morning, Yuki. Thank you for making time. Before anything else, I wanted to ask - how is the season shaping up at Ryokan Komorebi? I imagine spring in Kyoto must be a wonderful time for your guests.",
            styleMatch: { green: 2, blue: 1, red: -1, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r1-opening-data',
            label: 'Lead with data',
            description: 'Open with her performance numbers and a specific observation.',
            playerDialogue:
              "Good morning, Yuki. I've been reviewing Ryokan Komorebi's performance on the platform, and I've identified some areas where I think we could work together to improve your visibility to the right travellers. Could I walk you through what I'm seeing?",
            styleMatch: { green: 0, blue: 2, red: 0, yellow: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r1-opening-opportunity',
            label: 'Lead with opportunity',
            description: 'Frame the call around a growth opportunity for luxury properties.',
            playerDialogue:
              "Yuki, I've been looking at how luxury traditional properties in Kyoto are performing, and I think there's an opportunity to get Ryokan Komorebi in front of more high-quality travellers without compromising your positioning. I'd love to share what I've found.",
            styleMatch: { green: 0, blue: 0, red: 1, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r1-opening-relationship',
          responses: [
            { trustThreshold: 'low', text: "That is kind of you to ask. The season is steady. But I suspect you are calling about more than the cherry blossoms. What is on your mind?", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Thank you for asking. Spring is beautiful here, and our guests appreciate the seasonal kaiseki menu we prepare. We are not as full as I would like, though. Was there something specific you wished to discuss?", emotion: 'positive' },
            { trustThreshold: 'high', text: "How thoughtful. Spring is indeed our most special season. I have been thinking about how to reach more of the right travellers, actually. Perhaps you have some ideas?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 5,
        },
        {
          optionId: 'yuki-r1-opening-data',
          responses: [
            { trustThreshold: 'low', text: "I see. Before we proceed, I would like to understand how you are measuring our performance. We are a traditional ryokan - I want to be sure the comparison is appropriate.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate that you have taken the time to analyse our data. Please, go ahead. I am always interested in understanding our position more clearly.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you. I have been looking at our numbers myself and I have some questions. Please share what you have found.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
        {
          optionId: 'yuki-r1-opening-opportunity',
          responses: [
            { trustThreshold: 'low', text: "I appreciate the thought, but I am cautious about anything that might attract guests who are not the right fit for our experience. What exactly do you mean?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That is interesting. Reaching the right travellers is very important to us. I would like to hear more, but I should say - we are very selective about our positioning.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "That sounds promising. Connecting with the right guests is always our priority. Please tell me what you have in mind.", emotion: 'positive' },
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
          "I appreciate your thoughts. But I should be clear - I am not interested in discounting. Our rates reflect the quality of the experience we provide. What would you suggest?",
        options: [
          {
            id: 'yuki-r1-recommendation-genius',
            label: 'Position Genius as premium visibility',
            description: 'Frame the Genius Programme as a curated traveller programme, not a discount.',
            playerDialogue:
              "I completely understand, Yuki, and I would never suggest anything that undermines your positioning. The Genius Programme is actually designed with properties like yours in mind. Genius members are experienced, frequent travellers - they leave higher review scores, book longer stays, and are far less likely to cancel. The programme gives your property a visibility badge that signals quality, not price. It is about being discovered by the right traveller, not the bargain hunter.",
            styleMatch: { green: 2, blue: 1, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r1-recommendation-multiple',
            label: 'Recommend Genius plus Mobile Rate',
            description: 'Suggest activating two discount products at once for maximum impact.',
            playerDialogue:
              "I think the best approach would be to activate the Genius Programme and a Mobile Rate together. Genius gives you access to a premium traveller segment, and Mobile Rate captures the growing number of bookings made on phones. Together, they would significantly improve your RPD and visibility.",
            styleMatch: { green: -2, blue: 0, red: 1, yellow: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'yuki-r1-recommendation-explore',
            label: 'Explore her goals first',
            description: 'Ask what success looks like for her before making a specific recommendation.',
            playerDialogue:
              "Before I suggest anything specific, I would like to understand your goals better. What does an ideal season look like for Ryokan Komorebi? Is it primarily about occupancy, or is there a specific type of guest you are hoping to attract more of? I want to make sure any recommendation fits with your vision for the property.",
            styleMatch: { green: 2, blue: 2, red: -1, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r1-recommendation-genius',
          responses: [
            { trustThreshold: 'low', text: "That is an interesting perspective. But a discount is still a discount, even if you call it a programme. How large is the rate reduction? I would need to discuss this with my team before considering it.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate how you have framed that. Higher review scores and longer stays - those are exactly the metrics that matter to us. What does the programme involve specifically? I would like to share the details with my operations manager.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That resonates with me. We invest so much in creating an authentic experience - connecting with travellers who truly appreciate it is very important. Please tell me how we would get started. I will discuss it with my team this week.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 4, conversion: 2 },
          trustChange: 5,
          nextPhasePrompt: "I can see the potential value, but I worry about setting a precedent. If we start offering discounts - even to a select group - where does it end?",
        },
        {
          optionId: 'yuki-r1-recommendation-multiple',
          responses: [
            { trustThreshold: 'low', text: "That is too much at once. I asked you not to suggest discounting, and you are proposing two discounts simultaneously. I would need to think about this very carefully.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I appreciate your enthusiasm, but that feels like rushing. We make decisions carefully here. Could we perhaps focus on one thing at a time?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I understand the logic, but two changes at once is not how we prefer to work. Could we start with one and evaluate before adding another?", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 2 },
          trustChange: -5,
          nextPhasePrompt: "I need to feel confident in one step before taking another. Can we slow down?",
        },
        {
          optionId: 'yuki-r1-recommendation-explore',
          responses: [
            { trustThreshold: 'low', text: "That is a thoughtful question. Our ideal guest is someone who comes for the cultural experience - the tea ceremony, the onsen, the kaiseki dinner. We do not want high volume. We want the right people.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Thank you for asking that. We want guests who stay at least two nights and truly immerse themselves in the ryokan experience. Occupancy is important, but guest quality is more important. What would you recommend with that in mind?", emotion: 'positive' },
            { trustThreshold: 'high', text: "I am glad you asked. Our vision is to be the most respected traditional ryokan on the platform - not the most booked, but the most valued. We want travellers who seek authenticity. How can we reach more of them?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2 },
          trustChange: 6,
          nextPhasePrompt: "I appreciate your approach. But if you do have a specific recommendation, I would like to hear it - as long as it respects what we are trying to build here.",
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "My concern is this: once we begin offering discounts, it changes the perception of our property. Our reputation has been built on consistency and quality. How do I protect that?",
        options: [
          {
            id: 'yuki-r1-objection-casestudy',
            label: 'Share a luxury case study',
            description: 'Reference another premium property that maintained its brand while using Genius.',
            playerDialogue:
              "That is a very valid concern, Yuki. I worked with a boutique heritage hotel in Kyoto - similar size, similar positioning to yours. They had exactly the same worry. After joining the Genius Programme, they found that their average review score actually increased, because Genius members tend to be more respectful, experienced travellers. Their brand perception strengthened, not weakened. I can share the details with you if that would be helpful.",
            styleMatch: { green: 2, blue: 1, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r1-objection-control',
            label: 'Emphasise her control',
            description: 'Highlight that she can adjust or remove the programme at any time.',
            playerDialogue:
              "I understand completely. The important thing to know is that you remain in full control. You can set the discount level, choose which room types to include, and deactivate the programme at any point if it does not feel right. This is not a permanent commitment - it is an experiment that you can shape to fit your standards.",
            styleMatch: { green: 2, blue: 2, red: 0, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r1-objection-urgency',
            label: 'Highlight the competitive gap',
            description: 'Point out that competitor luxury properties are already using these tools.',
            playerDialogue:
              "I hear your concern, Yuki, but I should be transparent - several comparable luxury properties in Kyoto are already using the Genius Programme. Each week that passes, they are building visibility with the exact traveller segment you want to reach. The risk of waiting may be greater than the risk of trying.",
            styleMatch: { green: -2, blue: 0, red: 2, yellow: 0 },
            assertiveness: 3,
            compliance: 'borderline',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r1-objection-casestudy',
          responses: [
            { trustThreshold: 'low', text: "A heritage hotel in Kyoto... that is relevant. I would like to see the details before making any decision. Could you send that information to me?", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That is reassuring. If a similar property saw their reviews improve, that addresses my main concern. Please share the details, and I will discuss it with my team this week.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That is exactly the kind of evidence I needed. If their brand was strengthened, not weakened, then I feel more confident. Let us explore this further. I will speak with my operations manager tomorrow.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 4, conversion: 3 },
          trustChange: 7,
        },
        {
          optionId: 'yuki-r1-objection-control',
          responses: [
            { trustThreshold: 'low', text: "The ability to reverse it is important. Let me take this to my team and we will consider it carefully. I will contact you next week.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That is comforting. Knowing I can shape it and stop it gives me more confidence. I would like to try it on a limited basis first - perhaps just our standard rooms. Can we do that?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you for explaining that so clearly. Full control and the ability to adjust - that is what I needed to hear. Let us set it up together. I will confirm with my team by end of week.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 2 },
          trustChange: 5,
        },
        {
          optionId: 'yuki-r1-objection-urgency',
          responses: [
            { trustThreshold: 'low', text: "I appreciate your honesty, but I do not make decisions based on what competitors are doing. I make decisions based on what is right for our guests. I will take my time with this.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I understand the competitive landscape, but rushing is not our way. I would rather be thoughtful and get it right than react out of fear. Let me consider this properly.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "That is useful context, though I would prefer not to feel pressured. Let me review the programme details with my team and I will come back to you with a decision.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: -6,
        },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
//  YUKI - Round 2
//  Focus: Adding Mobile Rate or Country Rate with luxury
//  positioning
// ════════════════════════════════════════════════════════════
export const yukiR2: ConversationTree = {
  partnerId: 'yuki',
  round: 2,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Good morning. Thank you for following up. I discussed our last conversation with my team and I have some thoughts to share.",
        options: [
          {
            id: 'yuki-r2-opening-listen',
            label: 'Invite her to share first',
            description: 'Let Yuki lead by sharing her team\'s thoughts before presenting anything.',
            playerDialogue:
              "Good morning, Yuki. I would love to hear what you and your team discussed. Your perspective is important to me, and I want to make sure our next steps are aligned with your thinking.",
            styleMatch: { green: 2, blue: 1, red: -1, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r2-opening-results',
            label: 'Share the early results',
            description: 'Open with the positive metrics from the changes made in Round 1.',
            playerDialogue:
              "Good morning, Yuki. Before we discuss next steps, I wanted to share some encouraging data from the past few weeks. Your visibility and booking quality metrics have been moving in a positive direction, and I think it is worth reviewing together.",
            styleMatch: { green: 0, blue: 2, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r2-opening-push',
            label: 'Jump to the next recommendation',
            description: 'Move quickly to propose the next product.',
            playerDialogue:
              "Good morning, Yuki. I have been thinking about the next step for Ryokan Komorebi and I have a recommendation I am excited to share. I think we can build on the momentum from our first conversation.",
            styleMatch: { green: -1, blue: 0, red: 1, yellow: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r2-opening-listen',
          responses: [
            { trustThreshold: 'low', text: "Thank you. My team had mixed feelings. Some are open to change, others worry about the guest experience. I would like to hear your thoughts before we decide.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That means a great deal. My operations manager was actually quite positive about the Genius Programme. She felt it could attract the kind of traveller we want. We are cautiously open to doing more.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you for that respect. My team is on board with the direction we discussed. They trust the approach, and so do I. What would you suggest as our next step?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 5,
        },
        {
          optionId: 'yuki-r2-opening-results',
          responses: [
            { trustThreshold: 'low', text: "I would like to see the numbers. I have been monitoring our bookings and I want to compare what you are seeing with what we are experiencing on the ground.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That is good to hear. I have noticed a few more enquiries recently. Please share the data - I would like to understand the full picture.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Wonderful. I felt something had shifted. Please walk me through the details - I want to share accurate information with my team.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'yuki-r2-opening-push',
          responses: [
            { trustThreshold: 'low', text: "I appreciate your enthusiasm, but I had hoped we could first discuss how the current changes are working. I do not like to rush ahead.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I see. Before we add anything new, could we review the results of what we have already done? I want to feel confident before taking another step.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I admire your energy. But could we first look at the current results? I would feel more comfortable building on evidence rather than momentum alone.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt:
          "I am open to hearing what you would suggest next. But please remember - we do not want to attract guests who are only motivated by price. What do you recommend?",
        options: [
          {
            id: 'yuki-r2-recommendation-country',
            label: 'Recommend Country Rate for key markets',
            description: 'Suggest a Country Rate targeting luxury source markets like Australia and the US.',
            playerDialogue:
              "Based on your booking data, your highest-value guests tend to come from Australia, the United States, and the UK. These travellers book longer stays and leave excellent reviews. A Country Rate would give you a small, targeted advantage when these travellers search - it is invisible to other markets. Think of it as a quiet welcome for the guests you most want to attract.",
            styleMatch: { green: 2, blue: 2, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r2-recommendation-mobile',
            label: 'Recommend Mobile Rate',
            description: 'Suggest activating Mobile Rate with a focus on modern luxury travellers.',
            playerDialogue:
              "I would like to suggest adding a Mobile Rate. Over 65% of luxury travel searches in Japan now happen on mobile devices, and many of your ideal guests - international travellers researching their Kyoto stay - are browsing on their phones. A Mobile Rate ensures Ryokan Komorebi appears competitively in that channel. It does not change your base rate or what your existing guests see.",
            styleMatch: { green: 1, blue: 2, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r2-recommendation-aggressive',
            label: 'Recommend a full discount stack',
            description: 'Push for multiple products to close the competitive gap quickly.',
            playerDialogue:
              "Yuki, to be straightforward - your RPD is still below market average. I would recommend activating Country Rate, Mobile Rate, and an Early Booker Deal together. The combined effect would close the gap quickly and drive meaningful visibility improvements within weeks.",
            styleMatch: { green: -2, blue: 0, red: 1, yellow: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r2-recommendation-country',
          responses: [
            { trustThreshold: 'low', text: "A quiet welcome... that is an elegant way to describe it. But I would need to understand the exact discount percentage. And I want to confirm it truly is invisible to other markets before I agree to anything.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I like the precision of that approach. Targeting the markets that already value our experience - that feels aligned with who we are. Could you prepare a proposal with the specific rates so I can review it with my team?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That is beautifully thought through. A quiet welcome for the right guests - yes, that is very much our philosophy. Let us set this up. I will confirm the markets with my team today.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 4, conversion: 3, revenue: 2 },
          trustChange: 5,
          nextPhasePrompt: "I am warming to this idea, but I want to make sure we are not diluting our pricing. If Australian guests see a lower rate, will they expect that every time they return?",
        },
        {
          optionId: 'yuki-r2-recommendation-mobile',
          responses: [
            { trustThreshold: 'low', text: "65% on mobile... that is higher than I expected. But I worry that mobile bookings are more impulsive. Are those really the guests who will appreciate a traditional ryokan experience?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That is a thoughtful suggestion. If it does not affect our base rate or what returning guests see, it feels like a safe step. How much of a discount are we discussing?", emotion: 'positive' },
            { trustThreshold: 'high', text: "I had not realised mobile was so dominant in the luxury segment. If this helps us reach international travellers during their research phase, I can see the value. Let us explore the details.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 3, conversion: 2, revenue: 1 },
          trustChange: 4,
          nextPhasePrompt: "I can see the logic, but how do I know that mobile bookers will be the same quality of guest as those who book through other channels?",
        },
        {
          optionId: 'yuki-r2-recommendation-aggressive',
          responses: [
            { trustThreshold: 'low', text: "I must be honest - that approach does not align with how we operate. We do not make multiple changes at once, and I do not appreciate being told our position is below average without context.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I understand the urgency you feel, but that is not how we make decisions here. We prefer to take one careful step at a time. Could we focus on the most impactful single action?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I know you are trying to help, and I appreciate the analysis. But three changes at once is too much for us. Let us choose the one that makes the most sense and do it well.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1, visibility: 1 },
          trustChange: -5,
          nextPhasePrompt: "I would rather do one thing excellently than three things hastily. Can we focus?",
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "My worry is about consistency. Our guests expect a certain standard, and I do not want different guests paying different prices for the same experience. How do you address that?",
        options: [
          {
            id: 'yuki-r2-objection-segment',
            label: 'Explain segmentation clearly',
            description: 'Walk through how the discount is invisible to other segments, protecting rate integrity.',
            playerDialogue:
              "That is a thoughtful concern, and it shows how carefully you protect your guests' experience. The way these tools work is through segmentation - a Country Rate, for example, is only visible to travellers searching from a specific country. A guest in Japan never sees it. A returning guest booking from the same country sees the same rate they saw before. It is not a public discount - it is a private, targeted offer to a specific audience.",
            styleMatch: { green: 2, blue: 2, red: 0, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r2-objection-luxury',
            label: 'Reference luxury industry norms',
            description: 'Explain that premium hotels worldwide use segmented pricing as standard practice.',
            playerDialogue:
              "I understand the concern completely. It may help to know that segmented pricing is standard practice across the luxury hospitality industry worldwide. The finest hotels in Tokyo, Paris, and New York all use market-specific and channel-specific rates. It is not seen as discounting - it is seen as sophisticated revenue management. Your guests would never know, and your brand remains exactly as strong.",
            styleMatch: { green: 1, blue: 2, red: 0, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r2-objection-dismiss',
            label: 'Minimise the concern',
            description: 'Suggest she is overthinking it and should just try it.',
            playerDialogue:
              "Honestly, Yuki, I think you may be overthinking this. The price differences are very small and guests do not compare rates with each other. Most travellers never notice. I would suggest just trying it for a month and seeing what happens.",
            styleMatch: { green: -2, blue: -1, red: 1, yellow: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r2-objection-segment',
          responses: [
            { trustThreshold: 'low', text: "A private, targeted offer... I can accept that framing. Let me review the technical details with my team to make sure I fully understand it before activating.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That explanation puts my mind at ease. If it is truly invisible to other guests, then it does not compromise our integrity. I will discuss the specifics with my operations manager and confirm by end of week.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you for explaining that so clearly. Private and targeted - that is consistent with how we approach everything. Let us proceed. I will confirm the details with my team today.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 2, revenue: 2 },
          trustChange: 6,
        },
        {
          optionId: 'yuki-r2-objection-luxury',
          responses: [
            { trustThreshold: 'low', text: "I was not aware it was so widespread in luxury hospitality. That is helpful context. I would like to research this further before committing, but I am more open than before.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "If the finest hotels in the world use this approach, then perhaps I have been too cautious. That is very reassuring. Let us discuss the specifics and I will take it to my team.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That is exactly the kind of context I needed. Sophisticated revenue management, not discounting. I am ready to move forward. Let us set it up.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 3, conversion: 2, revenue: 1 },
          trustChange: 5,
        },
        {
          optionId: 'yuki-r2-objection-dismiss',
          responses: [
            { trustThreshold: 'low', text: "I do not believe I am overthinking it. Attention to detail is what makes Ryokan Komorebi special. I would prefer to work with someone who understands that.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "With respect, this is not overthinking - this is how we make decisions. Every detail matters in hospitality. I need to understand it fully before committing.", emotion: 'negative' },
            { trustThreshold: 'high', text: "I appreciate your confidence, but I would not describe my care for our guests as overthinking. Please give me the details and I will make my own assessment.", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -6,
        },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
//  YUKI - Round 3
//  Focus: Seasonal strategy and building a complete
//  competitive toolkit
// ════════════════════════════════════════════════════════════
export const yukiR3: ConversationTree = {
  partnerId: 'yuki',
  round: 3,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Good morning. I have been looking forward to our conversation. The team and I have noticed some positive changes, and I would like to discuss what comes next.",
        options: [
          {
            id: 'yuki-r3-opening-celebrate',
            label: 'Celebrate the progress together',
            description: 'Acknowledge the improvements and credit her thoughtful approach.',
            playerDialogue:
              "Good morning, Yuki. That is wonderful to hear. The progress you have made is really impressive, and I think it reflects how carefully you and your team have approached each step. I would love to review the results together and then discuss a seasonal strategy that could build on this foundation.",
            styleMatch: { green: 2, blue: 1, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r3-opening-strategic',
            label: 'Frame the conversation strategically',
            description: 'Position this as the long-term strategy conversation.',
            playerDialogue:
              "Good morning, Yuki. I am glad to hear that. I think we are now at a point where we can think more strategically about the full year ahead. Kyoto has such distinct seasons, and I believe there is an opportunity to build a pricing and visibility approach that works in harmony with your seasonal calendar.",
            styleMatch: { green: 1, blue: 2, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r3-opening-ambitious',
            label: 'Set ambitious targets',
            description: 'Push for significant improvement with a bold growth goal.',
            playerDialogue:
              "Good morning, Yuki. The early results are promising, but I think we can aim much higher. With the right approach, I believe we could improve your visibility by 30% or more before the autumn season. Let me share what I have in mind.",
            styleMatch: { green: -1, blue: 0, red: 2, yellow: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r3-opening-celebrate',
          responses: [
            { trustThreshold: 'low', text: "Thank you. We have been pleased with the direction. A seasonal strategy sounds interesting - but I want to make sure we do not overextend ourselves.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That is very kind. My team has felt good about the changes, and I think we are ready to think more broadly. Please share what you have in mind for the seasons ahead.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you. It has been a genuine partnership, and my team feels the same way. We are ready to plan for the full year. Let us build something lasting together.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 5,
        },
        {
          optionId: 'yuki-r3-opening-strategic',
          responses: [
            { trustThreshold: 'low', text: "A seasonal approach is intriguing. Kyoto's seasons are central to our identity. I would like to hear your ideas, but I will need time to evaluate them properly.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That is exactly how I think about our business - in harmony with the seasons. Each one brings a different guest and a different experience. I am very interested to hear your thoughts.", emotion: 'positive' },
            { trustThreshold: 'high', text: "You understand our business well. The seasons are everything to us - cherry blossom, summer festivals, autumn foliage, winter contemplation. Let us build a strategy that honours each one.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
        {
          optionId: 'yuki-r3-opening-ambitious',
          responses: [
            { trustThreshold: 'low', text: "30% is a bold number. I would want to understand what that requires before committing to any targets. We do not set goals we cannot deliver with quality.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate your ambition, but I am more interested in the right growth than fast growth. Can we discuss what sustainable improvement looks like?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "That is ambitious. I am open to hearing the plan, but I would want to make sure we do not sacrifice quality for numbers. What is your thinking?", emotion: 'neutral' },
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
          "I am ready to hear your recommendation for our longer-term approach. What would a complete strategy look like for Ryokan Komorebi?",
        options: [
          {
            id: 'yuki-r3-recommendation-seasonal',
            label: 'Propose a seasonal toolkit',
            description: 'Build a strategy that adjusts tools by season, aligned with her calendar.',
            playerDialogue:
              "Here is what I would suggest. For cherry blossom and autumn foliage - your peak seasons - you maintain your current positioning with Genius only, because demand is strong and you do not need additional tools. For the quieter months - late summer and winter - we activate your Country Rate and Mobile Rate to improve visibility when competition for guests is highest. This way, you protect your premium pricing when demand is strong and use the tools strategically when you need them most. It works with your seasonal rhythm, not against it.",
            styleMatch: { green: 2, blue: 2, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r3-recommendation-earlybooker',
            label: 'Suggest an Early Booker Deal',
            description: 'Recommend an advance-purchase discount to lock in high-quality bookings.',
            playerDialogue:
              "I think there is an opportunity with an Early Booker Deal. Your ideal guests - the ones who research carefully and plan a cultural trip to Kyoto - tend to book well in advance. An Early Booker Deal rewards that behaviour with a small incentive to commit early. It gives you better forecasting, reduces last-minute uncertainty, and attracts the planners and enthusiasts who appreciate what you offer most.",
            styleMatch: { green: 1, blue: 2, red: 0, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r3-recommendation-maxstack',
            label: 'Recommend activating everything',
            description: 'Push for all remaining discount products to maximise competitive position.',
            playerDialogue:
              "Yuki, I think it is time to activate your full toolkit - Early Booker Deal, Country Rate for additional markets, and a Last-Minute Deal for any remaining availability close to check-in. Your RPD needs to come up significantly, and the only way to do that efficiently is to use all available tools.",
            styleMatch: { green: -2, blue: 0, red: 2, yellow: 0 },
            assertiveness: 3,
            compliance: 'borderline',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r3-recommendation-seasonal',
          responses: [
            { trustThreshold: 'low', text: "Working with our seasonal rhythm... that is a thoughtful approach. I appreciate that you are not suggesting the same strategy year-round. Let me map this against our calendar with my team before confirming.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "This is excellent. Protecting our pricing during peak season and using the tools during quiet periods - that makes complete sense. My team will appreciate this logic. Can you help me plan the activation dates?", emotion: 'positive' },
            { trustThreshold: 'high', text: "This is exactly the kind of strategy I was hoping for. It respects our identity while being commercially intelligent. I am ready to implement this. Let us build the seasonal calendar together today.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 5, conversion: 3, revenue: 3 },
          trustChange: 7,
          nextPhasePrompt: "I am very encouraged by this approach. My one remaining concern is about the transition points between seasons - how do we handle the switch without confusing our positioning?",
        },
        {
          optionId: 'yuki-r3-recommendation-earlybooker',
          responses: [
            { trustThreshold: 'low', text: "Rewarding planners and enthusiasts... that does align with our guest profile. I would need to understand the discount level and the booking window before deciding.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That is a lovely way to think about it. Our best guests do plan carefully. If the Early Booker Deal attracts more of that type, I can see the value. What percentage discount would you recommend?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That resonates deeply. Our most valued guests are the ones who research, plan, and arrive with genuine curiosity. Let us reward that. I would like to set this up for next season.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 4, conversion: 3, revenue: 2 },
          trustChange: 5,
          nextPhasePrompt: "I like this concept. But what happens if someone books early and then sees a lower last-minute rate elsewhere? That would damage our credibility.",
        },
        {
          optionId: 'yuki-r3-recommendation-maxstack',
          responses: [
            { trustThreshold: 'low', text: "I am sorry, but that is not acceptable. We have built trust through careful, measured steps, and now you are asking me to do everything at once. That is not how we work.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I respect your expertise, but I cannot agree to activating everything simultaneously. We have made progress by being thoughtful. I do not want to undo that now.", emotion: 'negative' },
            { trustThreshold: 'high', text: "I understand the logic, but I am not comfortable with that approach. Can we choose the most important one and focus our energy there?", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1 },
          trustChange: -6,
          nextPhasePrompt: "Please. Let us focus on one meaningful step rather than overwhelming my team with changes.",
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "I want to commit to a longer-term strategy, but I need to know - how do I maintain the soul of Ryokan Komorebi while adopting these commercial tools? That is my final concern.",
        options: [
          {
            id: 'yuki-r3-objection-philosophy',
            label: 'Connect tools to her values',
            description: 'Frame the commercial tools as an extension of her hospitality philosophy.',
            playerDialogue:
              "Yuki, I think the answer is already in how you have approached this from the beginning. Every decision you have made has been filtered through the question: does this serve our guests? These tools do not change who Ryokan Komorebi is - they simply make sure that the travellers who would most appreciate your experience can find you. The soul of your ryokan lives in the tea ceremony, the garden, the kaiseki dinner, the warmth of your team. No pricing tool can touch that. What it can do is bring more of the right people through your door to experience it.",
            styleMatch: { green: 2, blue: 1, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r3-objection-partnership',
            label: 'Commit to ongoing partnership',
            description: 'Offer regular reviews and collaborative decision-making going forward.',
            playerDialogue:
              "That is the right question to ask, and I want you to know that I see my role as supporting you in that balance, not pushing you away from it. What I would suggest is that we establish a quarterly review - we look at the data together, assess how each tool is performing, and you make the call on what stays and what goes. You will never be locked into anything, and every decision remains yours. My job is to bring you the information and the options.",
            styleMatch: { green: 2, blue: 2, red: -1, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r3-objection-blunt',
            label: 'Be blunt about the commercial reality',
            description: 'Tell her directly that without these tools, she will fall behind.',
            playerDialogue:
              "I hear the concern, Yuki, but the reality is that the market is moving. Properties that do not use these tools are being left behind in search results. The soul of your ryokan is important, but so is having guests to share it with. At some point, commercial pragmatism has to come into the picture.",
            styleMatch: { green: -2, blue: 0, red: 2, yellow: 0 },
            assertiveness: 3,
            compliance: 'borderline',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r3-objection-philosophy',
          responses: [
            { trustThreshold: 'low', text: "That is beautifully expressed. You are right - our soul is in the experience, not the pricing. I will take this to my team with a recommendation to proceed. Thank you for understanding what matters to us.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "I am moved by that perspective. Bringing the right people through our door - that is exactly what we want. You have my commitment. Let us build this strategy together, season by season.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you. That is the most important thing anyone has said to us about our business on this platform. You truly understand Ryokan Komorebi. I am fully committed to this partnership. Let us finalise the plan.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 4, conversion: 3, revenue: 3 },
          trustChange: 8,
        },
        {
          optionId: 'yuki-r3-objection-partnership',
          responses: [
            { trustThreshold: 'low', text: "Quarterly reviews with full transparency - that is exactly the kind of partnership I can support. Thank you for offering that structure. I will discuss it with my team and confirm.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That is a mature and respectful approach. Knowing we have regular checkpoints gives me confidence to move forward. Let us schedule the first quarterly review now.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That is exactly what I needed. A true partnership with regular reflection and the freedom to adjust. I am fully on board. Let us plan the year ahead together.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 2, revenue: 2 },
          trustChange: 6,
        },
        {
          optionId: 'yuki-r3-objection-blunt',
          responses: [
            { trustThreshold: 'low', text: "I find that perspective reductive. We have operated for many years by staying true to our values. I will not be frightened into abandoning them. I think we should end this conversation here.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I understand the commercial reality, but I do not appreciate the implication that I am ignoring it. We have made significant steps. I need a partner who respects our pace, not one who threatens us with irrelevance.", emotion: 'negative' },
            { trustThreshold: 'high', text: "I hear the pragmatism in what you are saying, and I know it comes from a good place. But I would prefer encouragement over warnings. Let me consider this on my own terms.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1, revenue: 1 },
          trustChange: -7,
        },
      ],
    },
  ],
};
