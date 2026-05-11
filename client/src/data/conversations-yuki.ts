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
        id: 'hook',
        label: 'Hook',
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "Please, share what you have observed. I would like to understand how things look from your perspective.",
        options: [
          {
            id: 'yuki-r1-diag-soft',
            label: 'Note things are a little soft',
            description: 'Acknowledge bookings are a bit below where they could be, without specifics.',
            playerDialogue:
              "Honestly, things are a little softer than they could be at the moment. Nothing alarming, but there's a sense the property could be reaching more guests. I think there's room to grow.",
            styleMatch: { green: 1, blue: -1, red: 0, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r1-diag-price-too-high',
            label: 'Read it as a pricing problem',
            description: 'Suggest the rate is sitting above what guests are willing to pay.',
            playerDialogue:
              "What I'm seeing is that on the searches where Ryokan Komorebi appears, travellers are often choosing properties at a lower price point. My read is the rate may be sitting slightly above what comparable luxury ryokans in Kyoto are showing.",
            styleMatch: { green: -1, blue: 1, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r1-diag-discoverability',
            label: 'Frame it as a discoverability gap, not a price one',
            description:
              "Show that her rate is fine - the issue is the right travellers never see her in the filters and quality-signal sets where she'd naturally win.",
            playerDialogue:
              "Here is what I find interesting. Your rate is right where it should be for a luxury ryokan in Kyoto - your parity is clean, your ADR is in line with comparable traditional properties. What's happening is more about being found. The travellers who would genuinely value Ryokan Komorebi - experienced, longer-stay, culturally-curious - tend to filter by quality signals before price. Because you have no Genius programme or other visibility marker active, you simply do not appear in the curated set they look at. They are not choosing someone else - they never see you in the first place.",
            styleMatch: { green: 2, blue: 2, red: 0, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r1-diag-soft',
          responses: [
            { trustThreshold: 'low', text: "Softer is a feeling, not a diagnosis. I would like to understand what specifically is happening before we discuss what to do.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate the gentleness, but I would value more precision. Could you tell me specifically what you are seeing in the data?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "I trust you, but 'a little soft' is not something my team and I can act on. Please be more specific.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -1,
        },
        {
          optionId: 'yuki-r1-diag-price-too-high',
          responses: [
            { trustThreshold: 'low', text: "I would be very surprised if our rate is the issue. Our pricing reflects the experience we offer, and lowering it would damage what we are. Are you certain that is what the data shows?", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I am not comfortable with that conclusion. Our rate is intentional - it protects the kind of guest we attract. I would want to understand if there is another way to read what you are seeing.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I appreciate the honesty, but I do not believe our price is the problem. The right guest understands what they are paying for. Could the data be pointing somewhere else?", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
        {
          optionId: 'yuki-r1-diag-discoverability',
          responses: [
            { trustThreshold: 'low', text: "So our rate is appropriate, but the travellers who would value us most never see us. That is a relief - and also troubling. I would like to understand this better.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That is a thoughtful framing. So it is not that we are losing them to a cheaper option - we are not even appearing in their consideration set. Yes, that aligns with what we sense. Please continue.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes. That is exactly the dilemma I have felt but could not put into words. The right traveller would love what we offer, but we are invisible to them. Thank you for naming it.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 1 },
          trustChange: 6,
          nextPhasePrompt: "Given that, what would you suggest? But I should be clear - I am not interested in discounting. Our rates reflect the quality of the experience we provide.",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
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
    }
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
        id: 'hook',
        label: 'Hook',
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "Before you suggest anything, I would like to understand what the data is showing now. We have always preferred to make decisions in context.",
        options: [
          {
            id: 'yuki-r2-diag-broad-good',
            label: 'Reassure broadly',
            description: 'Note things are moving in the right direction without specifics.',
            playerDialogue:
              "The picture is genuinely encouraging. The Genius programme is starting to bring in the kind of traveller you described - longer stays, higher review scores. Things are moving in the right direction.",
            styleMatch: { green: 2, blue: 0, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r2-diag-rate-still-high',
            label: 'Reopen the rate question',
            description: 'Suggest the residual gap is still about price, despite the Genius improvement.',
            playerDialogue:
              "Genius is helping, but the residual gap I see is still about price. To pull in more of the right travellers, my read is we may need to look again at where the rate sits.",
            styleMatch: { green: -2, blue: 0, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r2-diag-source-market',
            label: 'Identify the high-value source markets',
            description:
              "Show that the bookings already coming in concentrate on specific high-value international source markets where Ryokan Komorebi could be far more visible.",
            playerDialogue:
              "Here is what is interesting in the booking data. The guests responding most strongly to the Genius programme cluster around three source markets - Australia, the United States, and the UK. They book longer stays, leave the highest review scores, and they're the closest profile to the guest you described as ideal. Where there is still a gap is visibility to that exact audience: in those markets, comparable luxury ryokans are appearing more prominently in search than Ryokan Komorebi, so even the right travellers from those markets often don't see you. The gap is about being found by a specific audience, not about the rate.",
            styleMatch: { green: 2, blue: 2, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r2-diag-broad-good',
          responses: [
            { trustThreshold: 'low', text: "That is reassuring, but my team will ask for specifics. Where exactly is the data pointing?", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "I am glad to hear it, but I would like a clearer picture before discussing next steps. What is the data telling you precisely?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Thank you. I would still like to understand where there is more to do - we are never satisfied with 'moving in the right direction' alone.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
        {
          optionId: 'yuki-r2-diag-rate-still-high',
          responses: [
            { trustThreshold: 'low', text: "We had this conversation in our last call. Our rate is intentional. I am surprised to hear you return to this so soon.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I thought we had agreed our rate reflects our positioning. If the data has changed your view, I would want to see it clearly - but I am not comfortable reopening that question.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I would rather not revisit the rate question. If there is a different angle in the data, please share that instead.", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'yuki-r2-diag-source-market',
          responses: [
            { trustThreshold: 'low', text: "Australia, the US, and the UK - those are exactly the markets our best guests come from historically. So we are not being seen by the very people most likely to value us. That is a clearer problem to solve.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "That is a beautifully specific observation. So the audience is right, the experience is right, the price is right - but the visibility to that exact audience is missing. I think my team will respond well to that framing.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Thank you - that is exactly the kind of analysis I hoped for. Specific, respectful of the rate, and aligned with the guests we already love. Please tell me what we can do.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 1 },
          trustChange: 6,
          nextPhasePrompt: "I am open to hearing what you would suggest next. But please remember - we do not want to attract guests who are only motivated by price.",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
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
    }
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
        id: 'hook',
        label: 'Hook',
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
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "Before we plan the next stage, please tell me what the data is showing across the year. I want to understand the pattern, not only the headline.",
        options: [
          {
            id: 'yuki-r3-diag-strong-throughout',
            label: 'Frame the position as strong throughout the year',
            description: 'Suggest the calendar is broadly healthy and the conversation should be about growth.',
            playerDialogue:
              "The picture is genuinely strong across the calendar. The Genius programme and Country Rate have lifted the right kind of bookings, and there isn't a particular soft spot when I look year-round. So the conversation today is more about how to grow gracefully from a healthy base.",
            styleMatch: { green: 1, blue: 0, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'yuki-r3-diag-needs-more-products-yearround',
            label: 'Argue more products are needed year-round',
            description: 'Suggest the residual gap is product coverage, applied across the calendar.',
            playerDialogue:
              "What I see in the data is that competing luxury properties have more discount products active than you do. To keep visibility climbing, I think we need to expand your product set and apply them year-round.",
            styleMatch: { green: -1, blue: 0, red: 1, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'yuki-r3-diag-seasonal-pattern',
            label: 'Split the read by season',
            description:
              "Show that peak Kyoto seasons (cherry blossom, autumn foliage) are at their natural ceiling, while late summer and winter are running well below their potential.",
            playerDialogue:
              "When I split it by season the picture is quite different from the headline. Cherry blossom and autumn foliage - your peak seasons - are essentially at their natural ceiling, with occupancy and review scores both excellent. Late summer and winter are where the gap is: in those months you're running well below comparable luxury ryokans on visibility, particularly to your high-value international source markets. So you have a strong base and a clear seasonal pattern - peak does not need more tools, but your quieter seasons could be working much harder.",
            styleMatch: { green: 2, blue: 2, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'yuki-r3-diag-strong-throughout',
          responses: [
            { trustThreshold: 'low', text: "Strong everywhere is encouraging, but my team will ask what specifically is left to improve. I am not satisfied with a year-round summary.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "I appreciate the reassurance, but I am sure the calendar is not uniformly strong. Could you look more closely at the quieter months?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Thank you. But Kyoto has very different seasons - I would be surprised if the data did not reflect that. Could you look season by season?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: 0,
        },
        {
          optionId: 'yuki-r3-diag-needs-more-products-yearround',
          responses: [
            { trustThreshold: 'low', text: "More products applied year-round - I worry that is exactly what we have been careful to avoid. We do not want to discount during cherry blossom season when demand is already strong.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I don't think that's right for us. Year-round discounting would feel inconsistent with how we have positioned ourselves. Is there a more nuanced read?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I would push back. Year-round discounting doesn't fit our seasonal identity. Could you tell me where the gap actually is - by season, perhaps?", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
        {
          optionId: 'yuki-r3-diag-seasonal-pattern',
          responses: [
            { trustThreshold: 'low', text: "Cherry blossom at its ceiling, late summer and winter underperforming - yes, that is exactly the pattern we feel but had not quantified. That is a much more honest read.", emotion: 'positive' },
            { trustThreshold: 'medium', text: "This is the kind of seasonal analysis I have been hoping for. Peak protected, quieter seasons given more help - that aligns with everything we believe. My team will love it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes - this is exactly the conversation I wanted. The seasons are everything to us, and a strategy that respects them is the only one that fits. Thank you for naming it this way.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2, revenue: 1 },
          trustChange: 7,
          nextPhasePrompt: "Given that pattern, I am ready to hear your recommendation for our longer-term approach. What would a complete strategy look like for Ryokan Komorebi?",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
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
    }
  ],
};
