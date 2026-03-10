import type { ConversationTree } from '../types';

// ════════════════════════════════════════════════════════════
//  CARLOS RIVERA - Round 1
//  Focus: Fix misconfigured Country Rate + activate Early Booker
// ════════════════════════════════════════════════════════════
export const carlosR1: ConversationTree = {
  partnerId: 'carlos',
  round: 1,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Hey! Great timing - I was just looking at my numbers and thinking about calling you. Listen, I've got big plans for Barceloneta Living this year. Bookings need to go through the roof. What have you got for me?",
        options: [
          {
            id: 'carlos-r1-open-energy',
            label: 'Match his energy',
            description: 'Mirror his enthusiasm and signal you share his ambition.',
            playerDialogue:
              "Carlos! Love the energy. I've been looking at Barceloneta Living and honestly, there's a huge opportunity here. I think we can get your bookings growing fast - but I want to make sure we do it smart. Can I share what I've found?",
            styleMatch: { yellow: 2, red: 1, blue: 0, green: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r1-open-data',
            label: 'Lead with the data',
            description: 'Open with his performance numbers and what they reveal.',
            playerDialogue:
              "Hi Carlos. Good to connect. I've been reviewing your property's performance metrics and I've identified some specific areas where your pricing setup isn't working as hard as it could. I'd like to walk through the data with you.",
            styleMatch: { yellow: -1, red: 0, blue: 2, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r1-open-story',
            label: 'Share a success story',
            description: 'Open with a story about a similar property that grew fast.',
            playerDialogue:
              "Carlos, perfect timing. I just came off a call with another city apartment complex - similar size to yours - and they doubled their booking growth in one quarter. I looked at your setup and I think you could do something similar. Want to hear how?",
            styleMatch: { yellow: 2, red: 1, blue: -1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'carlos-r1-open-energy',
          responses: [
            { trustThreshold: 'low', text: "Ha, yeah - smart is good, but fast is better. Don't slow me down with too much analysis. What's the quick win?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Yes! That's what I want to hear. Show me what you've got - I'm ready to move.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Now we're talking! I knew you'd get it. Let's figure this out together - what's the play?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
        {
          optionId: 'carlos-r1-open-data',
          responses: [
            { trustThreshold: 'low', text: "Metrics... okay. Look, I appreciate the thoroughness, but can we skip to the action plan? I've got a lot going on.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Sure, show me. But don't make it too complicated - just tell me what I need to fix and I'll fix it.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Alright, I trust you've done the homework. Hit me with it.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -1,
        },
        {
          optionId: 'carlos-r1-open-story',
          responses: [
            { trustThreshold: 'low', text: "Doubled? Come on, that sounds too good. Which property? I want specifics, not a sales pitch.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Doubled their bookings? That's insane. Okay, you've got my attention - tell me everything.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Doubled! That's exactly what I'm going for. How did they do it? I want the full playbook.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
      ],
    },
    {
      phase: {
        id: 'recommendation',
        label: 'Recommendation',
        partnerPrompt:
          "Okay I'm listening. What do I need to switch on? I want to be aggressive - give me the full package.",
        options: [
          {
            id: 'carlos-r1-rec-countryfix',
            label: 'Fix the Country Rate first',
            description: 'Explain that his Country Rate is misconfigured and needs correcting before adding more.',
            playerDialogue:
              "So here's the thing, Carlos - you've actually got most of the right tools switched on already. But your Country Rate is misconfigured. It's targeting the wrong source markets, which means you're giving discounts to travellers who would've booked anyway, and missing the ones who need a nudge. Fixing that alone will improve your RPD and give you better return on every discount euro you spend.",
            styleMatch: { yellow: 1, red: 1, blue: 2, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r1-rec-earlybook',
            label: 'Activate Early Booker',
            description: 'Recommend switching on Early Booker to capture advance demand.',
            playerDialogue:
              "Here's a big one you're missing - Early Booker Deal. Barcelona gets massive advance demand from international travellers planning city breaks. Right now those bookers are seeing better deals from your competitors who have Early Booker active. Switching it on would capture that demand before they book elsewhere.",
            styleMatch: { yellow: 2, red: 1, blue: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r1-rec-everything',
            label: 'Fix both at once',
            description: 'Recommend fixing Country Rate and activating Early Booker simultaneously.',
            playerDialogue:
              "I think we should move on two things at once. First, your Country Rate is misconfigured - wrong markets, wasted discounts. Second, your Early Booker Deal is inactive, which means you're losing advance bookings to competitors. If we fix both now, you'll see a compound effect - better targeting plus new demand capture.",
            styleMatch: { yellow: 1, red: 2, blue: 0, green: -2 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'carlos-r1-rec-countryfix',
          responses: [
            { trustThreshold: 'low', text: "Misconfigured? How did that happen? I set it up myself... are you sure? Show me what's wrong.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Wait, really? I thought I had that set up right. Okay, if I'm wasting discount budget, I definitely want to fix that. Walk me through it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "No way - I've been throwing money away? Fix it. Show me the right configuration right now.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 3 },
          trustChange: 5,
          nextPhasePrompt: "Okay, I get that the Country Rate needs fixing. But honestly, I don't want to just fix one thing - I want to go bigger. Can't we just turn everything on?",
        },
        {
          optionId: 'carlos-r1-rec-earlybook',
          responses: [
            { trustThreshold: 'low', text: "Early Booker... I looked at that before and wasn't sure. What percentage discount are we talking? I don't want to give away too much.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That makes total sense for Barcelona. Advance bookings from international travellers - yeah, I'm losing those. How quickly can I switch it on?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Why wasn't this on already? Let's activate it today. What do I need to do?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 4, conversion: 2 },
          trustChange: 5,
          nextPhasePrompt: "Alright, Early Booker sounds great. But I also want to push harder - what else can we turn on right now?",
        },
        {
          optionId: 'carlos-r1-rec-everything',
          responses: [
            { trustThreshold: 'low', text: "Both at once? I appreciate the ambition but that's a lot of changes. How do I know which one actually moved the needle?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Now that's what I'm talking about! Two moves at once, compound effect - I love it. Let's go.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes! Big moves. I'm in. Set it all up - I want to see results fast.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 2 },
          trustChange: 2,
          nextPhasePrompt: "Love the big thinking. But wait - what if doing both at once backfires? How would we even know what's working?",
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "I hear you, but here's my worry - I don't want to slow down. My competitors are growing right now and I feel like every day I wait, I'm losing bookings. Can't we just go faster?",
        options: [
          {
            id: 'carlos-r1-obj-momentum',
            label: 'Channel his urgency',
            description: 'Validate his pace but redirect the energy toward the right actions.',
            playerDialogue:
              "I'm with you on speed, Carlos - momentum matters. But here's the thing: moving fast on the wrong configuration is actually slower than getting it right first. Fix the Country Rate today, activate Early Booker tomorrow, and you'll be outpacing competitors by next week. That's fast and smart.",
            styleMatch: { yellow: 2, red: 1, blue: 1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r1-obj-competitor',
            label: 'Show what competitors are doing',
            description: 'Reference similar properties that took a structured approach and won.',
            playerDialogue:
              "You know what the fastest-growing city apartment complexes in Barcelona did? They didn't just switch everything on - they fixed their foundations first. The top performer in your comp set corrected their Country Rate targeting, added Early Booker, and saw a 20% booking uplift in three weeks. Structured speed, not scattered speed.",
            styleMatch: { yellow: 2, red: 1, blue: 1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r1-obj-letloose',
            label: 'Agree and go all in',
            description: 'Match his impatience and agree to activate everything immediately.',
            playerDialogue:
              "You know what, you're right - let's not overthink this. I'll help you fix the Country Rate, activate Early Booker, and we can look at pushing your other discounts harder too. Let's just get everything optimised and running hot.",
            styleMatch: { yellow: 1, red: 2, blue: -2, green: -1 },
            assertiveness: 3,
            compliance: 'borderline',
          },
        ],
      },
      nodes: [
        {
          optionId: 'carlos-r1-obj-momentum',
          responses: [
            { trustThreshold: 'low', text: "Fast and smart... okay, I can live with that. But if I don't see movement in a week, we're changing the plan.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Alright, I like that - fast and smart. Fix it today, activate tomorrow, results by next week. Deal. Let's do it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Ha! You sound like me. Okay, I trust your judgement on the sequencing. Let's execute - send me the steps.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 3, conversion: 2, revenue: 2 },
          trustChange: 6,
        },
        {
          optionId: 'carlos-r1-obj-competitor',
          responses: [
            { trustThreshold: 'low', text: "Structured speed... fine. But which comp set are you looking at? I want to see the actual data, not just the story.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "20% in three weeks? Okay, that's the kind of result I'm after. If that's the playbook, let's follow it. What's step one?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's brilliant. I want to be that top performer. Let's copy what works and do it better. Walk me through the plan.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 2, revenue: 1 },
          trustChange: 5,
        },
        {
          optionId: 'carlos-r1-obj-letloose',
          responses: [
            { trustThreshold: 'low', text: "Wait - I thought you were supposed to help me be strategic? If we just switch everything on randomly, how do we know what's working?", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I appreciate you matching my energy, but... actually, maybe I need someone to tell me when to slow down. What's the right approach?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Okay let's - actually, hold on. Last time I went all-in without a plan I regretted it. Maybe we should be a bit more targeted?", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 1 },
          trustChange: -4,
        },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
//  CARLOS RIVERA - Round 2
//  Focus: Optimise existing discount stack + improve conversion
// ════════════════════════════════════════════════════════════
export const carlosR2: ConversationTree = {
  partnerId: 'carlos',
  round: 2,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Hey! Okay so I've been watching the numbers since we last spoke and things are moving. But I want more. What's next - how do we push even harder?",
        options: [
          {
            id: 'carlos-r2-open-celebrate',
            label: 'Celebrate the wins first',
            description: 'Acknowledge progress and build on positive momentum.',
            playerDialogue:
              "Carlos, love it - let's talk results. Your numbers have shifted since we made those changes and I want to highlight what's working before we plan the next move. Sometimes understanding why something works is the key to scaling it.",
            styleMatch: { yellow: 2, red: 0, blue: 1, green: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'carlos-r2-open-conversion',
            label: 'Pivot to conversion',
            description: 'Shift focus from visibility to converting the traffic you have.',
            playerDialogue:
              "Great momentum, Carlos. But here's something interesting - your visibility has improved, but your conversion rate hasn't kept pace. That means more people are seeing Barceloneta Living, but not all of them are booking. I think that's your biggest opportunity right now.",
            styleMatch: { yellow: 1, red: 1, blue: 2, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r2-open-trend',
            label: 'Share an industry trend',
            description: 'Open with an exciting market insight to grab his attention.',
            playerDialogue:
              "Carlos, you're going to love this. There's a massive trend right now in Barcelona - city break demand from Northern Europe is up 30% year-on-year. Properties that are set up right are capturing a disproportionate share. I think Barceloneta Living can ride that wave.",
            styleMatch: { yellow: 2, red: 1, blue: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'carlos-r2-open-celebrate',
          responses: [
            { trustThreshold: 'low', text: "Yeah, the numbers moved a bit. But I don't want to celebrate too early - what's the next play?", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "You're right, we should take stock. I've been so focused on what's next I forgot to appreciate what worked. Okay, show me.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Ha! Good point - I always forget to enjoy the wins. Let's look at what's working and then figure out how to double it.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'carlos-r2-open-conversion',
          responses: [
            { trustThreshold: 'low', text: "Conversion... I hadn't thought about that angle. But is that something I can even control? What would I change?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Hmm, that's a good insight. More eyes but not more bookings - yeah, we need to fix that. What's the plan?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Okay, that's a different way of thinking about it. I like it. Show me the conversion data.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 2,
        },
        {
          optionId: 'carlos-r2-open-trend',
          responses: [
            { trustThreshold: 'low', text: "30% increase? Where's that number from? I want to see the source before I get excited.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "30% from Northern Europe? That's huge. I've definitely noticed more Scandinavian guests lately. How do I capture more of that?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes! I've been reading about this too! Barcelona is on fire right now. Let's ride this wave - what do I need to do?", emotion: 'positive' },
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
          "Alright, I'm ready. What's the recommendation? And make it good - I want to see a real jump in bookings this month.",
        options: [
          {
            id: 'carlos-r2-rec-stack',
            label: 'Optimise the discount stack',
            description: 'Fine-tune how his active discounts work together for maximum impact.',
            playerDialogue:
              "Right now your discounts are all active but they're not optimised as a stack. Your Genius discount, Mobile Rate, and Country Rate are overlapping in some segments, which means some travellers are getting deeper discounts than necessary. If we tighten the targeting - different discounts for different traveller segments - you get better ROI from the same discount budget.",
            styleMatch: { yellow: 0, red: 1, blue: 2, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r2-rec-content',
            label: 'Improve listing conversion',
            description: 'Focus on property content, photos, and review responses to convert more lookers.',
            playerDialogue:
              "Here's a quick win for conversion - your listing content. Properties with updated photos, a compelling description, and consistent review responses convert 15-20% better than those without. Your photos are good but your last review response was three months ago. Let's sharpen that up and turn more of your traffic into bookings.",
            styleMatch: { yellow: 1, red: 0, blue: 1, green: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r2-rec-aggressive',
            label: 'Push deeper discounts',
            description: 'Suggest increasing discount percentages to beat competitors.',
            playerDialogue:
              "If you want a big jump in bookings, the fastest lever is deepening your discounts. Push your Mobile Rate from 10% to 15%, increase your Early Booker window, and offer a flash deal for the next two weeks. You'll see immediate volume.",
            styleMatch: { yellow: 1, red: 2, blue: -1, green: -2 },
            assertiveness: 3,
            compliance: 'risky',
          },
        ],
      },
      nodes: [
        {
          optionId: 'carlos-r2-rec-stack',
          responses: [
            { trustThreshold: 'low', text: "Overlapping discounts... I hadn't realised. But is this going to be complicated to set up? I don't want to spend hours in the extranet.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "So I'm basically over-discounting some guests? That's wasted money. Yeah, let's tighten it up. Walk me through what to change.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Smarter discounts, same budget, better returns - I'm in. Show me the targeting changes.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, conversion: 3, revenue: 2 },
          trustChange: 4,
          nextPhasePrompt: "Okay, the targeting makes sense. But what if I tighten too much and lose volume? I'd rather over-discount than under-book.",
        },
        {
          optionId: 'carlos-r2-rec-content',
          responses: [
            { trustThreshold: 'low', text: "Review responses? That feels like small stuff. I was hoping for something bigger - something that moves the needle fast.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "15-20% better conversion just from content? That's actually significant. I can update photos this week. Tell me what else to change.", emotion: 'positive' },
            { trustThreshold: 'high', text: "You're right - I've been neglecting that side of things. I'll get the team on photos today. What makes a listing really convert?", emotion: 'positive' },
          ],
          metricEffects: { conversion: 5, visibility: 2, revenue: 2 },
          trustChange: 4,
          nextPhasePrompt: "Updating content is fine, but my competitors are all doing that too. How do I actually stand out?",
        },
        {
          optionId: 'carlos-r2-rec-aggressive',
          responses: [
            { trustThreshold: 'low', text: "Deeper discounts? My margins are already tight. That sounds like a race to the bottom.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I love the boldness! But... won't that just eat my margins? I want volume but not at any cost.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Flash deals - I like the sound of that. But let's think about this... how do I avoid training guests to only book on discount?", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 3 },
          trustChange: -3,
          nextPhasePrompt: "I want volume but I also want to make money. How do I get both?",
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "Look, I get the strategy. But I keep seeing other properties doing crazy promotions and getting loads of bookings. Am I being too cautious? Maybe I should just go all-out with promotions.",
        options: [
          {
            id: 'carlos-r2-obj-reframe',
            label: 'Reframe the competition',
            description: 'Help him see that not all promotions are profitable growth.',
            playerDialogue:
              "I hear you, and it's tempting to match every promotion out there. But here's what I see behind the scenes - a lot of those properties running crazy deals are actually losing money per booking. They get volume but not profit. Barceloneta Living is in a position to grow bookings AND maintain healthy margins. That's the real competitive advantage.",
            styleMatch: { yellow: 1, red: 1, blue: 2, green: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r2-obj-excitement',
            label: 'Redirect his excitement',
            description: 'Channel his competitive energy toward the actions that will actually deliver.',
            playerDialogue:
              "I love that competitive fire, Carlos. But think about it this way - instead of copying what everyone else is doing, what if you're the one they're trying to copy? Optimised targeting, strong conversion, smart discounts - that's how the best properties in Barcelona operate. That's the league you want to be in.",
            styleMatch: { yellow: 2, red: 1, blue: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r2-obj-agree',
            label: 'Agree to go all-out',
            description: 'Support his desire to run heavy promotions.',
            playerDialogue:
              "You know what, maybe you're right. If the market is aggressive, you need to be aggressive. Let's set up a big promotional push - deep discounts, flash deals, the works. We'll worry about margins later.",
            styleMatch: { yellow: 0, red: 1, blue: -2, green: -2 },
            assertiveness: 3,
            compliance: 'risky',
          },
        ],
      },
      nodes: [
        {
          optionId: 'carlos-r2-obj-reframe',
          responses: [
            { trustThreshold: 'low', text: "Losing money per booking? Really? I guess I never thought about what's behind those big promotions. Okay, let's stick to the plan.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Okay, that's a really good perspective. Volume without profit isn't growth, it's just noise. Let's focus on profitable growth.", emotion: 'positive' },
            { trustThreshold: 'high', text: "You're right. I get caught up in the FOMO sometimes. Profitable growth - that's the goal. I trust your approach. Let's keep going.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, conversion: 3, revenue: 3 },
          trustChange: 5,
        },
        {
          optionId: 'carlos-r2-obj-excitement',
          responses: [
            { trustThreshold: 'low', text: "Be the one they copy... I like the sound of that. But talk is cheap - show me that this approach actually delivers.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Ha! I like that mindset. Lead, don't follow. Okay, you've convinced me. Let's build this the right way.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's exactly how I want to position Barceloneta Living. Top tier. Let's execute this plan - I'm all in.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, conversion: 2, revenue: 2 },
          trustChange: 6,
        },
        {
          optionId: 'carlos-r2-obj-agree',
          responses: [
            { trustThreshold: 'low', text: "'Worry about margins later'? That doesn't sound like good advice. I thought you were supposed to help me be strategic.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "Actually... I was hoping you'd push back on me there. If my advisor is saying go all-out, maybe I should be worried. What's the smarter play?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Hmm, you agreed too fast. Last time someone agreed with everything I said, it didn't end well. Give me your honest recommendation.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1, visibility: 1 },
          trustChange: -5,
        },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════
//  CARLOS RIVERA - Round 3
//  Focus: Seasonal pricing strategy + long-term growth
// ════════════════════════════════════════════════════════════
export const carlosR3: ConversationTree = {
  partnerId: 'carlos',
  round: 3,
  phases: [
    {
      phase: {
        id: 'opening',
        label: 'Opening',
        partnerPrompt:
          "Hey! So I've been thinking big picture - what does Barceloneta Living look like in six months? A year? I don't just want to be doing well, I want to be dominating the Barcelona city apartment market. Where do we go from here?",
        options: [
          {
            id: 'carlos-r3-open-vision',
            label: 'Paint the big picture',
            description: 'Share an exciting vision for his property and validate his ambition.',
            playerDialogue:
              "I love that you're thinking long-term, Carlos. Here's what I see - Barceloneta Living has all the ingredients to become a top-5 city apartment complex in Barcelona on our platform. The foundation is solid now. The next step is seasonal strategy - pricing that adapts to demand patterns throughout the year.",
            styleMatch: { yellow: 2, red: 1, blue: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r3-open-seasonal',
            label: 'Lead with seasonal data',
            description: 'Open with Barcelona demand patterns and where the gaps are.',
            playerDialogue:
              "Great question, Carlos. I've pulled Barcelona's demand curve for the next twelve months and there are some clear seasonal patterns. Your peak-season pricing is competitive, but your shoulder-season and off-peak rates aren't attracting enough demand. There's a significant revenue opportunity in those quieter months.",
            styleMatch: { yellow: 0, red: 0, blue: 2, green: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r3-open-innovation',
            label: 'Introduce something new',
            description: 'Open with an innovative approach he hasn\'t considered yet.',
            playerDialogue:
              "Carlos, have you heard about what the top-performing city apartment properties are doing with dynamic seasonal pricing? It's this approach where you set different rate strategies for peak, shoulder, and off-peak periods - and then layer your discounts differently in each one. The properties doing this are outperforming everyone else.",
            styleMatch: { yellow: 2, red: 1, blue: 1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'carlos-r3-open-vision',
          responses: [
            { trustThreshold: 'low', text: "Top 5? That's bold. I like it, but I need a real plan - not just a nice-sounding goal.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Top 5 in Barcelona! Now that's a target. Seasonal strategy - okay, I haven't really thought about that properly. Show me.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Top 5 - let's aim for top 3! I trust the foundation we've built. Tell me about this seasonal strategy.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 4,
        },
        {
          optionId: 'carlos-r3-open-seasonal',
          responses: [
            { trustThreshold: 'low', text: "Off-peak pricing... I'll be honest, I haven't spent much time on that. I usually just focus on peak season. What's the opportunity?", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "You're right - I basically ignore the quiet months. If there's revenue to unlock there, I want to know how.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Show me the demand curve. I've been so focused on summer I probably missed some easy wins in the shoulder months.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 2,
        },
        {
          optionId: 'carlos-r3-open-innovation',
          responses: [
            { trustThreshold: 'low', text: "Dynamic seasonal pricing? That sounds complicated. Is this going to take a lot of time to manage?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Different discount layers for different seasons? That's clever. I hadn't thought about it that way. Tell me more.", emotion: 'positive' },
            { trustThreshold: 'high', text: "I love staying ahead of the curve! If the top performers are doing this, I need to be doing it too. Break it down for me.", emotion: 'positive' },
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
          "Okay, seasonal strategy - I'm into it. But I need a clear plan. What exactly should I be doing differently for peak versus off-peak?",
        options: [
          {
            id: 'carlos-r3-rec-tiered',
            label: 'Build a tiered seasonal plan',
            description: 'Create distinct pricing strategies for peak, shoulder, and off-peak.',
            playerDialogue:
              "Here's what I'd recommend. Peak season - June through September - you run lean on discounts. Demand is high, you don't need to give away margin. Shoulder months - April, May, October - activate Early Booker with a slightly higher percentage to pull in advance demand. Off-peak - November through March - turn up the volume on Country Rate and run targeted promotions for weekend city break markets. Three clear strategies, one for each season.",
            styleMatch: { yellow: 1, red: 1, blue: 2, green: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r3-rec-growth',
            label: 'Focus on year-round occupancy',
            description: 'Prioritise filling the quiet months to maximise annual revenue.',
            playerDialogue:
              "The biggest revenue unlock for Barceloneta Living isn't peak season - you're already strong there. It's the off-peak months where you're running 40-50% occupancy. If we get that up to 65-70% through smart seasonal promotions and targeted Country Rate offers, your annual revenue grows by 15-20% without touching your peak rates at all.",
            styleMatch: { yellow: 1, red: 2, blue: 1, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r3-rec-premium',
            label: 'Go premium in peak',
            description: 'Suggest raising peak rates while discounting off-peak to maximise yield.',
            playerDialogue:
              "Here's a bold move - actually raise your peak season rates. Barcelona demand in summer is so strong that you can charge 10-15% more and still fill your 45 units. Then use that extra margin to fund aggressive off-peak promotions. High-low strategy - premium when demand is hot, promotional when it's cool.",
            styleMatch: { yellow: 1, red: 1, blue: 0, green: -1 },
            assertiveness: 3,
            compliance: 'borderline',
          },
        ],
      },
      nodes: [
        {
          optionId: 'carlos-r3-rec-tiered',
          responses: [
            { trustThreshold: 'low', text: "Three strategies for three seasons... that's a lot to manage. Are you sure I need that level of complexity?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Lean in peak, pull in shoulder, push in off-peak - that's really clear. I can work with that. Help me set it up.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's brilliant. Simple, structured, and each season has a purpose. Let's implement it now - I want to be ready for the next cycle.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 3, conversion: 3, revenue: 4 },
          trustChange: 6,
          nextPhasePrompt: "I like the plan, but what about events and festivals? Barcelona has huge demand spikes for things like Mobile World Congress and La Merce. Should I be doing something different for those?",
        },
        {
          optionId: 'carlos-r3-rec-growth',
          responses: [
            { trustThreshold: 'low', text: "15-20% annual growth? That's a big claim. Show me the maths on that.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Getting off-peak from 50% to 70% would be a game-changer. What promotions are you thinking?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's the kind of growth target I want. Let's build the off-peak plan - what do I switch on first?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 4, conversion: 2, revenue: 5 },
          trustChange: 5,
          nextPhasePrompt: "The off-peak focus makes sense. But won't I be diluting my brand if I'm always running promotions in the quiet months?",
        },
        {
          optionId: 'carlos-r3-rec-premium',
          responses: [
            { trustThreshold: 'low', text: "Raise my peak rates? That's risky. What if I lose bookings to competitors who keep theirs low?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's bold! I like the thinking - charge more when I can, invest when I need to. But I'm nervous about pricing myself out in summer.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Premium positioning in summer - I love it. Let's test it. What's the worst that happens? I drop back down.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, revenue: 3 },
          trustChange: 2,
          nextPhasePrompt: "The premium approach is exciting but I'm worried about scaring off my regular bookers. How do I balance premium pricing with keeping loyal guests?",
        },
      ],
    },
    {
      phase: {
        id: 'objection',
        label: 'Objection Handling',
        partnerPrompt:
          "This all sounds great as a plan. But honestly? I'm worried I'll set all this up and then forget to adjust it. I tend to get excited, do the setup, and then move on to the next thing. How do I make this actually stick?",
        options: [
          {
            id: 'carlos-r3-obj-system',
            label: 'Build a system for him',
            description: 'Propose a simple calendar-based system so he doesn\'t have to remember.',
            playerDialogue:
              "That's really honest, Carlos, and it's a smart thing to flag. Here's what I'd suggest - we set up a pricing calendar right now with the seasonal changes pre-planned. Set reminders for the transition dates. That way you're not relying on memory - the system does the thinking. All you have to do is check in once a month and tweak if needed.",
            styleMatch: { yellow: 2, red: 0, blue: 1, green: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r3-obj-accountability',
            label: 'Offer to be his accountability partner',
            description: 'Commit to regular check-ins to keep the strategy on track.',
            playerDialogue:
              "I get it - you're an ideas person, not a maintenance person. So let's make this easy: I'll schedule quarterly check-ins with you. Each call, we review the seasonal metrics, adjust what needs adjusting, and plan the next quarter. You bring the energy and vision, I'll bring the structure and follow-through. Deal?",
            styleMatch: { yellow: 2, red: 1, blue: 0, green: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'carlos-r3-obj-dismiss',
            label: 'Downplay the concern',
            description: 'Tell him it\'s not that complicated and he\'ll be fine.',
            playerDialogue:
              "Don't overthink it, Carlos. It's really not that complicated - set it up once and let it run. You've got more important things to worry about. The tools do most of the work for you.",
            styleMatch: { yellow: -1, red: 0, blue: -1, green: -2 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'carlos-r3-obj-system',
          responses: [
            { trustThreshold: 'low', text: "A pricing calendar with reminders... that could work. But I've tried calendars before and ignored them. Can you make it really simple?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Yes! That's exactly what I need - a system that does the remembering for me. Let's set it up now while I'm motivated.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Perfect. You know me well - if the system is simple and automatic, I'll actually use it. Let's build it right now. I'm excited about this.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 4, visibility: 3, conversion: 3, revenue: 4 },
          trustChange: 6,
        },
        {
          optionId: 'carlos-r3-obj-accountability',
          responses: [
            { trustThreshold: 'low', text: "Quarterly check-ins... okay, but will you actually follow through? I've had account managers promise that before.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "'I bring the energy, you bring the structure' - ha! That's a perfect partnership. Yes, let's do it. Book the first one now.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's exactly what I need. Someone who actually cares about my results and holds me to the plan. You're the best account manager I've had. Let's make this happen.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2, conversion: 2, revenue: 3 },
          trustChange: 7,
        },
        {
          optionId: 'carlos-r3-obj-dismiss',
          responses: [
            { trustThreshold: 'low', text: "Not complicated? That's what people say when they haven't thought it through. I was being honest about a real concern and you brushed it off.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "Don't downplay this - I know myself. If I don't have a system, it won't happen. I need a real solution, not 'don't worry about it'.", emotion: 'negative' },
            { trustThreshold: 'high', text: "Come on, I opened up about a weakness and you dismissed it. I expected better from you. Let's be real about how to make this sustainable.", emotion: 'cautious' },
          ],
          metricEffects: { revenue: 1 },
          trustChange: -6,
        },
      ],
    },
  ],
};
