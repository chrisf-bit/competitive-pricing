import type { ConversationTree } from '../types';

// ════════════════════════════════════════════════════════════
//  PRIYA SHARMA - Round 1
//  Focus: Fix misconfigured Mobile Rate (quick win) + major rate parity
// ════════════════════════════════════════════════════════════
export const priyaR1: ConversationTree = {
  partnerId: 'priya',
  round: 1,
  phases: [
    {
      phase: {
        id: 'hook',
        label: 'Hook',
        partnerPrompt:
          "I have fifteen minutes before my next call. My RPD is at 30 and dropping. Tell me you have a plan.",
        options: [
          {
            id: 'priya-r1-open-direct',
            label: 'Match her directness',
            description: 'Get straight to the diagnosis with confidence and clarity.',
            playerDialogue:
              "Priya, I do have a plan. I've identified two critical issues dragging your RPD down - a major rate parity breach and a misconfigured Mobile Rate. Both are fixable this week. Let me walk you through it.",
            styleMatch: { red: 2, blue: 1, yellow: 0, green: -1 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'priya-r1-open-empathy',
            label: 'Acknowledge the pressure first',
            description: 'Show understanding of her situation before getting into details.',
            playerDialogue:
              "I can see the numbers are under real pressure, Priya. I want to make sure we use your time well today, so let me start by understanding - what's your biggest concern right now? Revenue per room or overall occupancy?",
            styleMatch: { red: -2, blue: 0, yellow: 0, green: 2 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'priya-r1-open-benchmark',
            label: 'Lead with chain comparison',
            description: 'Open with how The Grand Residency compares to other properties in her chain.',
            playerDialogue:
              "Priya, I've been looking at how The Grand Residency stacks up against other properties in your chain on our platform. You're currently underperforming the chain average on RPD by a significant margin. I know why, and I have a structured action plan to close that gap.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: -1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'priya-r1-open-direct',
          responses: [
            { trustThreshold: 'low', text: "Fixable this week - I've heard that before. Show me the specifics. What exactly is misconfigured and what's the parity breach?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Good. Two clear issues with a timeline - that's what I need. Walk me through it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Finally, someone who's done their homework before calling. Go ahead - I'm listening.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 5,
        },
        {
          optionId: 'priya-r1-open-empathy',
          responses: [
            { trustThreshold: 'low', text: "I don't need you to understand my feelings, I need you to fix my numbers. What's the plan?", emotion: 'negative' },
            { trustThreshold: 'medium', text: "Both, obviously. Look - can we skip the discovery questions and get to what you're actually recommending?", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Revenue per room is the priority. But I'd rather you told me what you've found than ask me questions you should already know the answer to.", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -4,
        },
        {
          optionId: 'priya-r1-open-benchmark',
          responses: [
            { trustThreshold: 'low', text: "Underperforming the chain average? Which properties are you comparing me to? I need to see the data, not just hear claims.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's exactly the kind of comparison I run internally. Show me the gap and the action plan.", emotion: 'positive' },
            { trustThreshold: 'high', text: "You're speaking my language. Our Pune property outperforms us and I want to know why. Let's see your plan.", emotion: 'positive' },
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
          "Give me the specifics. What exactly is dragging RPD down and where's the evidence?",
        options: [
          {
            id: 'priya-r1-diag-multi-issue',
            label: 'Flag multiple issues broadly',
            description: 'Note there are several things to address without quantifying each.',
            playerDialogue:
              "There are a few things going on here. Your discount setup needs work, you've got some price competitiveness issues, and there's room to optimise your Genius participation. I'd want to walk through each.",
            styleMatch: { red: -1, blue: 0, yellow: 0, green: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'priya-r1-diag-parity-only',
            label: 'Pin it on parity alone',
            description: 'Name the rate parity breach but miss the misconfigured Mobile Rate.',
            playerDialogue:
              "The single biggest drag is rate parity. Two competing channels are showing you 8-12% cheaper than your rate here. Until that gap closes, no discount will perform properly - you're being undercut before the booking decision even starts.",
            styleMatch: { red: 1, blue: 1, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'priya-r1-diag-both-issues',
            label: 'Name both issues with quantified evidence',
            description:
              'Identify the parity breach AND the misconfigured Mobile Rate, with specifics and likely impact for each.',
            playerDialogue:
              "Two distinct issues, compounding. One: rate parity breach - two competing channels are showing you 8-12% cheaper than your rate here, which is suppressing your visibility on every price-shopping search. Two: Mobile Rate is active but misconfigured, it's not applying to your main room types - so 70% of Mumbai search traffic, which is mobile, is seeing your higher unfiltered rate. Either one in isolation would be material; together they explain almost all of your RPD drag.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'priya-r1-diag-multi-issue',
          responses: [
            { trustThreshold: 'low', text: "'A few things' isn't a diagnosis - it's a hedge. Tell me the top two with numbers attached, or send me away.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I don't have time for 'a few things'. Rank them, quantify them, or this conversation is over.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I trust you've done the work, but I need a sharper read than 'a few things'. What are the top two specifically?", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'priya-r1-diag-parity-only',
          responses: [
            { trustThreshold: 'low', text: "Parity at 8-12% is a real number. But is that genuinely the only issue? My RPD is at 30 - that's worse than a single parity breach would explain.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Parity is real and I'll act on it. But my gut says that's not the whole story given how far RPD has slipped. Anything else in the data?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Good, parity is half the answer. But the drag is bigger than 8-12% would explain on its own. What else have you found?", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 2 },
          trustChange: 2,
        },
        {
          optionId: 'priya-r1-diag-both-issues',
          responses: [
            { trustThreshold: 'low', text: "Two specific issues with quantified impact. Show me the evidence for each - the OTA price comparisons and the room types the Mobile Rate isn't applying to.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Now THAT is a diagnosis I can act on. Parity at 8-12% plus 70% of traffic seeing the wrong rate - they're independent and compounding. That's exactly the kind of structured analysis I expected.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Two clean issues with specifics and impact. That's the calibre of analysis I needed. Let's get into the action plan.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2 },
          trustChange: 6,
          nextPhasePrompt: "Right. So what specifically needs to change? Give me the actions, the expected impact, and the timeline.",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
        partnerPrompt:
          "Right. So what specifically needs to change? Give me the actions, the expected impact, and the timeline.",
        options: [
          {
            id: 'priya-r1-rec-mobile',
            label: 'Fix the Mobile Rate first',
            description: 'Lead with the misconfigured Mobile Rate as a quick win with immediate ROI.',
            playerDialogue:
              "Your Mobile Rate is active but misconfigured - it's not applying to your main room types. In Mumbai, over 70% of searches come from mobile devices. You're invisible to that traffic right now. Fixing this is a 10-minute configuration change and I'd project a 5-8 point RPD improvement within days. That's your quickest ROI.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'priya-r1-rec-parity',
            label: 'Prioritise the parity breach',
            description: 'Focus on resolving the major rate parity issue as the highest-impact fix.',
            playerDialogue:
              "Priority one is your rate parity issue. Your rates on at least two competing OTAs are undercutting your price here by 8-12%. That's destroying your RPD score and suppressing your visibility in search results. Until parity is fixed, no discount product will perform properly. I'd recommend contacting your channel manager today to align rates.",
            styleMatch: { red: 1, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'priya-r1-rec-both',
            label: 'Present a two-step action plan',
            description: 'Lay out both fixes as a structured, sequenced plan with projected ROI.',
            playerDialogue:
              "Here's a two-step plan. Step one, today: fix your Mobile Rate configuration - 10-minute fix, immediate RPD uplift of 5-8 points because you unlock 70% of Mumbai's search traffic. Step two, by end of week: resolve the rate parity breach with your channel manager - two OTAs are undercutting you by 8-12%. Combined projected impact: 10-15 point RPD improvement within two weeks. I'll send you the ROI breakdown after this call.",
            styleMatch: { red: 2, blue: 2, yellow: 1, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'priya-r1-rec-mobile',
          responses: [
            { trustThreshold: 'low', text: "A 10-minute fix that improves RPD by 5-8 points? If that's true, why wasn't this flagged to me months ago? I've had two previous account managers.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "70% mobile traffic and we're invisible to it. That's a costly misconfiguration. Walk me through the fix - and what about the parity issue?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Let's fix it right now while I have you on the line. Pull up the configuration. But I also want the parity issue addressed - don't let me forget.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 4, conversion: 3 },
          trustChange: 5,
          nextPhasePrompt: "Fine. But my other properties on Expedia are delivering better numbers with less effort. Why should I invest more time into this platform specifically?",
        },
        {
          optionId: 'priya-r1-rec-parity',
          responses: [
            { trustThreshold: 'low', text: "8-12% undercut? That's a serious claim. Can you show me the exact rate comparisons? I need screenshots, not summaries.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "If that's accurate, it explains a lot. Send me the specific discrepancies and I'll get my channel manager on it today.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's exactly the root cause analysis I needed. Flag those rates now - I'll have my team on it within the hour.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 7, visibility: 5 },
          trustChange: 4,
          nextPhasePrompt: "What about the Mobile Rate misconfiguration? You mentioned two issues. I don't want to fix one and leave the other leaking revenue.",
        },
        {
          optionId: 'priya-r1-rec-both',
          responses: [
            { trustThreshold: 'low', text: "10-15 points in two weeks. That's a big promise. What happens when it's two weeks from now and we're at 32 instead of 45? What's your plan B?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I like the structure. Two clear steps, clear timeline, measurable outcome. Let's start with step one now.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Sequenced, measurable, time-bound - that's how I'd have structured it. Let's execute. Walk me through step one.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 8, visibility: 6, conversion: 4 },
          trustChange: 7,
          nextPhasePrompt: "The plan makes sense on paper. But I've seen platform reps promise results before. What makes this time different?",
        },
      ],
    }
  ],
};

// ════════════════════════════════════════════════════════════
//  PRIYA SHARMA - Round 2
//  Focus: Deeper rate parity strategy + Genius optimisation / Country Rate
// ════════════════════════════════════════════════════════════
export const priyaR2: ConversationTree = {
  partnerId: 'priya',
  round: 2,
  phases: [
    {
      phase: {
        id: 'hook',
        label: 'Hook',
        partnerPrompt:
          "The Mobile Rate fix moved the needle - RPD is climbing. But I ran a comparison against our Pune and Bangalore properties last night. They're still 15 points ahead of me. What's the next move?",
        options: [
          {
            id: 'priya-r2-open-results',
            label: 'Anchor on the progress, then pivot',
            description: 'Acknowledge improvement and use the chain comparison to introduce the next action.',
            playerDialogue:
              "Good - the RPD lift confirms the diagnosis was right. Now let's close that 15-point gap. I've analysed what your Pune and Bangalore properties are doing differently. Two things stand out: they're running Genius programme at a higher tier, and they've activated Country Rate targeting key source markets. I have a plan to get you to parity with them.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'priya-r2-open-cautious',
            label: 'Take a consultative approach',
            description: 'Ask about her priorities before recommending next steps.',
            playerDialogue:
              "I'm glad the initial fixes are showing results. Before I suggest the next phase, I want to understand - when you compare against Pune and Bangalore, which metrics are you focused on? Occupancy, RevPAR, or booking volume? I want to make sure my recommendation targets the right gap.",
            styleMatch: { red: -1, blue: 1, yellow: 0, green: 2 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'priya-r2-open-competitive',
            label: 'Lead with competitive intelligence',
            description: 'Show how Mumbai competitors are outperforming her with discount tools.',
            playerDialogue:
              "Priya, your RPD is trending right, but I want to show you something. Four of the top six budget hotels in Mumbai by booking volume are running Genius Level 2 and Country Rate. You're running neither. That's a visibility and conversion gap your competitors are exploiting every day. I think we can close it within a month.",
            styleMatch: { red: 2, blue: 1, yellow: 0, green: -1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'priya-r2-open-results',
          responses: [
            { trustThreshold: 'low', text: "You've looked at Pune and Bangalore specifically? Good. But those are different markets. Show me the like-for-like comparison before I accept it.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's exactly the analysis I was going to request. Genius and Country Rate - walk me through the ROI on each.", emotion: 'positive' },
            { trustThreshold: 'high', text: "You're ahead of me - I was going to ask you to run that comparison. Let's close the gap. Show me the plan.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 5,
        },
        {
          optionId: 'priya-r2-open-cautious',
          responses: [
            { trustThreshold: 'low', text: "All of them, obviously. I told you before - don't ask me questions you should already know the answer to. What are you recommending?", emotion: 'negative' },
            { trustThreshold: 'medium', text: "RevPAR is the metric I report on upward. But I expected you to arrive with a recommendation, not more discovery questions.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "RevPAR, but you should know that by now. What's the recommendation?", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'priya-r2-open-competitive',
          responses: [
            { trustThreshold: 'low', text: "Four out of six - fine. But are those properties profitable or just buying volume with deep discounts? I need margin data, not just rankings.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Genius Level 2 and Country Rate - two clear gaps. Walk me through the cost-benefit on each. I have a P&L to protect.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That competitive gap is unacceptable. Show me how to close it. I want the implementation plan and the projected timeline.", emotion: 'positive' },
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
          "Break down the gap. What specifically explains the 15 points my Pune and Bangalore properties are ahead of me on?",
        options: [
          {
            id: 'priya-r2-diag-mostly-recovered',
            label: 'Frame it as mostly recovered',
            description: 'Suggest the gap will close naturally with the changes already made.',
            playerDialogue:
              "The Mobile Rate fix and parity work are still flowing through. My read is the 15-point gap will close largely on its own over the next month or two as those changes compound.",
            styleMatch: { red: -1, blue: 0, yellow: 0, green: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'priya-r2-diag-country-only',
            label: 'Identify Country Rate gap only',
            description: 'Name the Country Rate gap but miss the Genius level differential.',
            playerDialogue:
              "The biggest gap is Country Rate. Pune and Bangalore both run it at 12% targeting UK, US, Middle East and Southeast Asia - you have it switched off entirely. That alone could explain the lion's share of the international booking gap.",
            styleMatch: { red: 1, blue: 1, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'priya-r2-diag-genius-and-country',
            label: 'Name Genius Level + Country Rate, with chain benchmark',
            description:
              'Identify both gaps with quantified Pune/Bangalore comparison and clean segmentation argument.',
            playerDialogue:
              "Two specific gaps versus your sister properties, both quantifiable. One: Genius programme - you're at Level 1, Pune and Bangalore are at Level 2, which unlocks priority placement and a badge that converts 22% better on repeat traveller traffic. Two: Country Rate - Pune runs 12% targeting UK, US, Middle East and Southeast Asia and sees a 20% international booking uplift; you have it switched off. Importantly, those two products target different traveller segments - Genius for repeat/loyalty, Country Rate for international new-search - so there's minimal overlap and minimal cannibalisation. They explain the bulk of the 15-point gap independently.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'priya-r2-diag-mostly-recovered',
          responses: [
            { trustThreshold: 'low', text: "Mostly recovered isn't a plan. I'm presenting to leadership next month - I need a strategy, not 'it'll sort itself out'.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I don't accept 'wait and see' for a 15-point gap. If there's a structural difference between my property and Pune, I want it named.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I trust you, but I'm not closing a 15-point gap by waiting. What's the structural difference between me and Pune?", emotion: 'cautious' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'priya-r2-diag-country-only',
          responses: [
            { trustThreshold: 'low', text: "Country Rate is one lever. But you said earlier my Genius was underperforming too - is that not part of this gap?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Country Rate is half the answer. But 15 points is a lot for one product alone. What else is structurally different between me and my sister properties?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Right, Country Rate is real. But I'd want a second specific gap before I commit - 15 points is rarely one thing alone.", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 2 },
          trustChange: 2,
        },
        {
          optionId: 'priya-r2-diag-genius-and-country',
          responses: [
            { trustThreshold: 'low', text: "Two specific gaps, quantified, with chain benchmarks. Send me the Genius Level 2 ROI model and the Pune Country Rate breakdown before I commit. But this is the analysis I expected.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Now that's a structured diagnosis. Two specific gaps, different segments, minimal overlap. That's what I'll take to leadership. Let's price each one.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Two clean gaps with measurable chain benchmarks. That's exactly the level of analysis I need to defend a 15-point catch-up plan. Let's execute.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2 },
          trustChange: 6,
          nextPhasePrompt: "Get to the point. What specifically should I activate, what does it cost me in margin, and what's the projected return?",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
        partnerPrompt:
          "Get to the point. What specifically should I activate, what does it cost me in margin, and what's the projected return?",
        options: [
          {
            id: 'priya-r2-rec-genius',
            label: 'Optimise Genius programme',
            description: 'Focus on upgrading her Genius participation for visibility and conversion gains.',
            playerDialogue:
              "Your Genius programme is active but underoptimised. You're at Level 1 with a basic 10% discount. Moving to Level 2 with a 15% discount unlocks priority placement in search results and a Genius badge that converts 18% better with repeat travellers. In Mumbai, Genius Level 2 properties see an average 22% increase in bookings from high-value repeat guests. The 5% additional discount pays for itself within the first two weeks based on your room volume.",
            styleMatch: { red: 1, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'priya-r2-rec-country',
            label: 'Activate Country Rate',
            description: 'Recommend Country Rate to capture international demand without affecting domestic pricing.',
            playerDialogue:
              "Country Rate targets international travellers searching from specific source markets. For Mumbai, that's primarily UK, US, Middle East, and Southeast Asia. You set a discounted rate for those markets only - domestic pricing stays completely untouched. Your Pune property runs this at 12% and sees a 20% increase in international bookings. The incremental volume more than covers the discount. Zero cannibalisation of your domestic rate.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'priya-r2-rec-both',
            label: 'Layer both strategically',
            description: 'Present Genius upgrade and Country Rate as a coordinated revenue strategy.',
            playerDialogue:
              "Here's the play. First, upgrade Genius to Level 2 - 15% discount, priority search placement, 22% average booking uplift from high-value repeat guests. Second, activate Country Rate at 12% targeting UK, US, Middle East, and Southeast Asia - your Pune property sees 20% more international bookings from this alone. The two products target different traveller segments, so there's minimal overlap. Combined projected impact: 8-point visibility boost, 6-point conversion improvement, and your RPD should close the gap on Pune within four weeks.",
            styleMatch: { red: 2, blue: 2, yellow: 1, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'priya-r2-rec-genius',
          responses: [
            { trustThreshold: 'low', text: "18% better conversion - where's that data from? Is that Mumbai-specific or a global average? Global averages mean nothing to me.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "22% booking increase from repeat guests is compelling. But I need to model the margin impact. Can you send me the breakeven analysis for my room rates?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Priority placement and 22% uplift - the numbers work. Upgrade it. What do I need to do in the extranet?", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 6, conversion: 4 },
          trustChange: 4,
          nextPhasePrompt: "The Genius upgrade makes numerical sense. But my revenue director will ask whether we're buying position instead of earning it. How do I defend that internally?",
        },
        {
          optionId: 'priya-r2-rec-country',
          responses: [
            { trustThreshold: 'low', text: "Zero cannibalisation is a strong claim. How can you guarantee international guests aren't displacing domestic bookings at higher rates?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Pune's 20% international uplift is a useful benchmark. I want to start with UK and Middle East - those are my strongest source markets. Set it up at 12%.", emotion: 'positive' },
            { trustThreshold: 'high', text: "No domestic rate impact and proven chain results. Activate it now. I'll brief my revenue director with the Pune comparison data.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 6, visibility: 5, conversion: 3, revenue: 4 },
          trustChange: 5,
          nextPhasePrompt: "Country Rate is logical. But what happens if my domestic guests find out international travellers are getting a lower rate? That's a PR risk for a chain brand.",
        },
        {
          optionId: 'priya-r2-rec-both',
          responses: [
            { trustThreshold: 'low', text: "Minimal overlap - I want to see the data on that. If I'm double-discounting the same traveller through Genius and Country Rate, my margin collapses.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Different segments, minimal overlap, measurable within four weeks. That's a strong proposal. Walk me through the Genius upgrade first.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Closing the gap on Pune in four weeks - that's the target I'll hold you to. Let's implement both. Start with the Genius configuration.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 7, visibility: 8, conversion: 5, revenue: 5 },
          trustChange: 6,
          nextPhasePrompt: "The combined plan is aggressive but logical. My concern is justifying two new discount products to head office simultaneously. They'll question whether we're over-discounting.",
        },
      ],
    }
  ],
};

// ════════════════════════════════════════════════════════════
//  PRIYA SHARMA - Round 3
//  Focus: Final strategy consolidation - decisive if trust built, dismissive if not
// ════════════════════════════════════════════════════════════
export const priyaR3: ConversationTree = {
  partnerId: 'priya',
  round: 3,
  phases: [
    {
      phase: {
        id: 'hook',
        label: 'Hook',
        partnerPrompt:
          "RPD has improved significantly and I'm presenting to chain leadership next month. I need a long-term strategy I can defend, not just a list of products you've switched on. What's the big picture?",
        options: [
          {
            id: 'priya-r3-open-roadmap',
            label: 'Present a strategic roadmap',
            description: 'Open with a structured three-pillar long-term strategy.',
            playerDialogue:
              "Priya, for the leadership presentation I'd recommend framing a three-pillar strategy: sustained rate competitiveness through automated parity monitoring, demand capture through your now-optimised discount stack, and a seasonal pricing calendar to maximise RevPAR across peak and off-peak. Each pillar has measurable KPIs. I can help you build the deck with supporting data.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'priya-r3-open-collaborative',
            label: 'Co-create the strategy',
            description: 'Invite her to shape the long-term direction collaboratively.',
            playerDialogue:
              "Congratulations on the turnaround. For the leadership presentation, I'd love to co-create the strategy with you. You know your chain's priorities and I know the platform levers. What themes does leadership care about most - market share, margin optimisation, or brand positioning?",
            styleMatch: { red: -1, blue: 1, yellow: 1, green: 2 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'priya-r3-open-benchmark',
            label: 'Position her as the chain benchmark',
            description: 'Frame her property as the success story for the rest of the chain.',
            playerDialogue:
              "Priya, your property's turnaround has been one of the strongest in the Mumbai market this quarter. Your RPD improvement puts you ahead of the chain average now. I think there's an opportunity to position The Grand Residency as the benchmark property - and for you to present the playbook to the rest of the chain at that leadership meeting.",
            styleMatch: { red: 2, blue: 1, yellow: 1, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'priya-r3-open-roadmap',
          responses: [
            { trustThreshold: 'low', text: "Three pillars - fine. But I need hard data behind each one, not just a framework. Can you provide the quantitative analysis?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Rate competitiveness, demand capture, seasonal strategy - that's a clean structure. Walk me through the data behind each pillar.", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's boardroom-ready thinking. Build that deck with me. I want data-backed slides for each pillar and projected ROI by quarter.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 5,
        },
        {
          optionId: 'priya-r3-open-collaborative',
          responses: [
            { trustThreshold: 'low', text: "I don't need a brainstorming partner, I need a strategy. Come to me with a recommendation, not questions.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "Market share and margin are the priorities. But I was expecting you to come prepared with a specific plan, not an open-ended question.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "Leadership cares about RevPAR and market share. But if you have a framework in mind, lead with that and I'll shape it.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'priya-r3-open-benchmark',
          responses: [
            { trustThreshold: 'low', text: "Ahead of the chain average is table stakes. I want to be number one. What does it take to get there?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Benchmark property - I like the positioning. What specific metrics would I need to hit to make that case convincingly to leadership?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's exactly the narrative I want. If I can present a replicable playbook to chain leadership, it elevates my profile and the property. Let's build it.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 6,
        },
      ],
    },
    {
      phase: {
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "Before you pitch me a strategy - tell me where the residual gaps are. I won't take a long-term plan to leadership without that.",
        options: [
          {
            id: 'priya-r3-diag-fully-recovered',
            label: 'Frame the position as fully recovered',
            description: 'Suggest there are no structural gaps left - now it is about scaling what works.',
            playerDialogue:
              "Honestly the structural gaps are closed. RPD is recovered, parity is monitored, your product stack is mostly aligned with the top of the chain. The conversation now is about scaling, not fixing.",
            styleMatch: { red: -1, blue: 0, yellow: 0, green: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'priya-r3-diag-early-booker-only',
            label: 'Name the Early Booker gap only',
            description: 'Identify the missing Early Booker product but miss the strategic monitoring/seasonal gaps.',
            playerDialogue:
              "One gap remains: Early Booker. Pune runs it at 10% and books 35% of inventory more than 30 days out; you're at 18%. Activating it would lock in advance demand and reduce your reliance on last-minute discounting.",
            styleMatch: { red: 1, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'priya-r3-diag-three-structural-gaps',
            label: 'Identify three structural gaps for sustained leadership',
            description:
              'Frame the analysis as three distinct gaps - advance demand, parity governance, and seasonal pricing - matching a leadership-deck structure.',
            playerDialogue:
              "Three distinct structural gaps remain, each independent. One: Early Booker is your only inactive product - Pune runs it at 10% and locks in 35% of inventory more than 30 days out versus your 18%, which is also why their RPD is more predictable than yours. Two: the parity fix worked, but the breach happened once and could happen again - there's no automated monitoring in place, so a future drift wouldn't be caught for weeks. Three: your discount stack is set the same year-round, but Mumbai demand is highly seasonal - you're under-priced in peak and over-discounted in shoulder. Each gap maps to a pillar for the leadership deck.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'priya-r3-diag-fully-recovered',
          responses: [
            { trustThreshold: 'low', text: "Fully recovered? I'm presenting to leadership next month - 'recovered' doesn't justify a 12-month plan. Find the gaps.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I don't believe there are zero structural gaps. There always are. If you can't find them, my revenue director will - and that's how I lose credibility.", emotion: 'cautious' },
            { trustThreshold: 'high', text: "I trust we've done good work, but 'no gaps' isn't a 12-month strategy. There has to be more underneath. Look harder.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
        {
          optionId: 'priya-r3-diag-early-booker-only',
          responses: [
            { trustThreshold: 'low', text: "Early Booker is fair, but for a leadership deck that's a single bullet point. What's the structural story?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Early Booker is one pillar. But I need three or four for a defensible 12-month strategy. What else?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Good - Early Booker is one. Give me the second and third structural pillar. Single-product plans don't survive leadership scrutiny.", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 2 },
          trustChange: 2,
        },
        {
          optionId: 'priya-r3-diag-three-structural-gaps',
          responses: [
            { trustThreshold: 'low', text: "Three structural gaps - advance demand, parity governance, seasonal pricing. That maps to a real strategy. Send me the data behind each before I commit, but this is the level I need.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Now that's a leadership-deck-ready diagnosis. Three independent, defensible pillars. That's what I'll take to the presentation. Build the strategy around this.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Three structural pillars, each measurable, each independent. That's exactly the framework I need for the chain leadership presentation. Let's execute.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2 },
          trustChange: 7,
          nextPhasePrompt: "Give me the long-term play. What should I be doing over the next six to twelve months to sustain this and lead the chain? I need specifics, not generalities.",
        },
      ],
    },
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
        partnerPrompt:
          "Give me the long-term play. What should I be doing over the next six to twelve months to sustain this and lead the chain? I need specifics, not generalities.",
        options: [
          {
            id: 'priya-r3-rec-fullstack',
            label: 'Present the full optimisation playbook',
            description: 'Lay out a comprehensive strategy covering parity, products, and seasonal pricing.',
            playerDialogue:
              "Here's the full playbook for the next two quarters. First, activate Early Booker Deal - you're the only property in the chain not running it, and it builds advance booking certainty. Your Pune property achieves 35% advance booking rate versus your 18%. Second, implement automated monthly parity monitoring so the breach we caught in round one never recurs. Third, build a seasonal pricing calendar - higher base rates in peak season when Mumbai demand is strong, targeted Country Rate and Genius promotions in shoulder months. Combined, this positions The Grand Residency for sustained top-quartile performance.",
            styleMatch: { red: 2, blue: 2, yellow: 0, green: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'priya-r3-rec-earlybooker',
            label: 'Focus on Early Booker activation',
            description: 'Recommend the last remaining inactive product for advance demand capture.',
            playerDialogue:
              "Your one remaining gap is Early Booker Deal. Here's why it matters strategically: it locks in advance bookings at a modest discount, giving you guaranteed base occupancy before peak periods. Your Pune property runs it at 10% for bookings 30 or more days out and achieves 35% advance booking rate versus your 18%. That advance demand base means less reliance on last-minute discounting, more predictable revenue forecasting, and a stronger P&L story for leadership.",
            styleMatch: { red: 1, blue: 2, yellow: 0, green: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'priya-r3-rec-cautious',
            label: 'Suggest consolidating current gains',
            description: 'Recommend holding steady and optimising before adding more.',
            playerDialogue:
              "Priya, you've made significant changes in a short period. My recommendation for next quarter would be to hold steady - monitor the impact of your Genius upgrade and Country Rate, fine-tune the discount percentages based on performance data, and avoid adding more complexity until we've fully optimised what's live. Stability builds confidence for your leadership presentation.",
            styleMatch: { red: -2, blue: 1, yellow: 0, green: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'priya-r3-rec-fullstack',
          responses: [
            { trustThreshold: 'low', text: "That's comprehensive. But I need separate ROI projections for each element, not a bundled estimate. Break it down.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Early Booker, parity monitoring, seasonal pricing - that's a proper revenue management strategy. Let's build it out with the numbers.", emotion: 'positive' },
            { trustThreshold: 'high', text: "This is the kind of strategic plan I can present to chain leadership as a replicable model. Let's execute immediately. I want the Early Booker configured this week.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 8, visibility: 6, conversion: 5, revenue: 7 },
          trustChange: 7,
          nextPhasePrompt: "I want to commit to this, but what's the risk? If we over-discount across all products simultaneously, could the margin impact be worse than the revenue gain?",
        },
        {
          optionId: 'priya-r3-rec-earlybooker',
          responses: [
            { trustThreshold: 'low', text: "35% versus 18% - that's a hard number. But a 10% discount on advance bookings means I'm giving away margin on rooms that might sell at full price. What's the net benefit?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Revenue predictability and reduced reliance on last-minute discounting - those are metrics leadership cares about. Let's configure it. What parameters should I set?", emotion: 'positive' },
            { trustThreshold: 'high', text: "This completes the product stack and gives me a cleaner revenue story. Set it up at 10% for 30-plus days. Send me the projected impact for my leadership deck.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 5, visibility: 4, conversion: 4, revenue: 4 },
          trustChange: 5,
          nextPhasePrompt: "Early Booker is logical. But committing inventory at a discount 30 days out carries risk. What if demand spikes and I've already given rooms away cheaply?",
        },
        {
          optionId: 'priya-r3-rec-cautious',
          responses: [
            { trustThreshold: 'low', text: "Hold steady? I didn't ask for a maintenance plan. I asked for a growth strategy. I'm trying to lead the chain, not coast along.", emotion: 'negative' },
            { trustThreshold: 'medium', text: "I appreciate the caution, but leadership won't be impressed by 'hold steady and monitor.' They want trajectory. What's the ambitious version?", emotion: 'negative' },
            { trustThreshold: 'high', text: "I understand the logic, but I need forward momentum for the presentation. Give me the ambitious version - I can decide how far to push.", emotion: 'cautious' },
          ],
          metricEffects: { experiencedRPD: 1, visibility: 1 },
          trustChange: -5,
          nextPhasePrompt: "I need a bolder strategy. What else have you got?",
        },
      ],
    }
  ],
};
