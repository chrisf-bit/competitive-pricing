import type { ConversationTree } from '../types';

/**
 * Driftwood Bay Resort R2 - 3-phase distractor conversation (No-Parity).
 *
 * Distractor partner used to round out the R2 portfolio. Data is
 * mapped from the SME spreadsheet mix sheet row 43 (The Oasis Palms
 * Resort) - eRPD 3.4% (Bucket 4), four active scenarios, Genius
 * Programme active. Reads as moderate / not the priority vs Velvet
 * Sky Boutique Hotel at R2.
 *
 * Author: Claude (filler). The conversation is realistic and
 * compliance-safe across all options - it plays through to a 0-star
 * wrong-partner verdict because Velvet Sky is the SME-approved R2
 * priority. No SME validation pending; this is distractor-only
 * content.
 *
 * Daniel Cruz (Hotel Manager) is yellow / green primary -
 * expressive and warm, energetic about his resort and quick to
 * engage. Style scoring rewards yellow / green, penalises blue when
 * the AM gets too analytical and slow-paced.
 */
export const driftwoodBayR2: ConversationTree = {
  partnerId: 'driftwood-bay',
  round: 2,
  phases: [
    // ── Hook ────────────────────────────────────────────────
    {
      phase: {
        id: 'hook',
        label: 'Hook',
        partnerPrompt:
          "Hey - good to hear from you! Things have been busy - we've had the family scenarios humming and the App work is finally paying off. What's on your mind?",
        options: [
          {
            id: 'drift-r2-hook-celebrate',
            label: 'Celebrate the momentum first',
            description:
              "Acknowledge the scenarios he's already got working and open warmly.",
            playerDialogue:
              "Daniel, you've got real momentum - four active scenarios and the App work showing through is exactly the pattern I wanted to call about. Let's keep that going.",
            styleMatch: { blue: 0, green: 2, red: 0, yellow: 2 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'drift-r2-hook-data-cold',
            label: 'Open with a cold data observation',
            description:
              "Skip the warmth and lead with a flat metric read. Out of step with Daniel's expressive energy.",
            playerDialogue:
              "Daniel, your eRPD has drifted up 1.4 points since last quarter and your loyalty pricing is the weakest part of the picture. Let me walk through it.",
            styleMatch: { blue: 2, green: -2, red: 1, yellow: -2 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'drift-r2-hook-listen',
            label: "Ask what's working for him right now",
            description:
              "Let Daniel set the agenda - he's energetic and loves talking about his property.",
            playerDialogue:
              "Daniel - before I share what I'm seeing, what's working best for you right now and where are you hitting walls?",
            styleMatch: { blue: 0, green: 1, red: -1, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'drift-r2-hook-celebrate',
          responses: [
            { trustThreshold: 'low', text: "Thanks, I appreciate the read! Where do you think the next gain comes from?", emotion: 'positive' },
            { trustThreshold: 'medium', text: "Yes! That's exactly the energy I needed today. Let's talk next moves.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Brilliant - this is why I love these calls. Hit me with the next play.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'drift-r2-hook-data-cold',
          responses: [
            { trustThreshold: 'low', text: "Okay, that's... a flat opener. Walk me through the data, I guess.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Right. Bit of a buzzkill opener but let's see the numbers.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Direct, fine. Show me what you've got.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
        {
          optionId: 'drift-r2-hook-listen',
          responses: [
            { trustThreshold: 'low', text: "Right now I'm working the family weekend angle - it's converting nicely. Walls? Mostly off-season mid-week.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Family weekend bookings are strong, App is finally clicking. Off-season mid-week is the headache. What's your read?", emotion: 'positive' },
            { trustThreshold: 'high', text: "You know what's funny - I was just about to call you about the same thing. The mid-week off-season gap is where I want help.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 2,
        },
      ],
    },
    // ── Diagnosis ────────────────────────────────────────────
    {
      phase: {
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "Okay - what should I actually be looking at?",
        options: [
          {
            id: 'drift-r2-diag-loyal',
            label: 'Surface the loyal pricing gap',
            description:
              "Point at the negative Loyal RPD - his Genius members are seeing a competitive rate, which is good, but the public side is where the upside still sits.",
            playerDialogue:
              "Your Loyal pricing is genuinely strong - Genius members see a competitive rate, which is rare. The Brand Scenario flag is on the public side: your public rate is sitting a touch above Brand.com and that's where the leakage is hiding.",
            styleMatch: { blue: 1, green: 1, red: 0, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'drift-r2-diag-allover',
            label: 'Cover everything at once',
            description:
              "Run through every active scenario, every dimension, every metric. Too much in one pass.",
            playerDialogue:
              "Let me walk you through the whole picture - App scenario, Family 2+1, Family 2+2, Brand Scenario, the public RPD across www and mdot and domestic and international and solo and couple and group. There's a lot to unpack.",
            styleMatch: { blue: 1, green: -1, red: 0, yellow: -2 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'drift-r2-diag-headline',
            label: 'Stay on the headline',
            description:
              "Tell him the bigger picture is mostly fine - just one small thing to think about.",
            playerDialogue:
              "Big picture you're doing well - your scenarios are mostly captured. The one thing worth thinking about is the small Brand.com gap on public rates.",
            styleMatch: { blue: 0, green: 1, red: 0, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'drift-r2-diag-loyal',
          responses: [
            { trustThreshold: 'low', text: "Public side gap - okay. What would you recommend before I commit?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Right, the public side is where my margin instinct kicks in. What's the play?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Perfect - that's exactly the framing I needed. What do you propose?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'drift-r2-diag-allover',
          responses: [
            { trustThreshold: 'low', text: "Okay, that's a lot. Can we boil it down to the one thing that matters?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Buddy, that's too much for a 30-min call. What's the one move?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Love the depth but my brain is melting. Pick one thing and run.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
        {
          optionId: 'drift-r2-diag-headline',
          responses: [
            { trustThreshold: 'low', text: "Okay, the public gap. Tell me what to do about it.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Right - one thing at a time, I can do that. What's the play?", emotion: 'positive' },
            { trustThreshold: 'high', text: "Appreciate the focused read. Hit me with the proposal.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
      ],
    },
    // ── Pitch ────────────────────────────────────────────────
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
        partnerPrompt:
          "Right - what's the move?",
        options: [
          {
            id: 'drift-r2-pitch-brand-align',
            label: 'Pitch a small Brand.com alignment',
            description:
              "Suggest a modest 2-3 point alignment on public rates to close the Brand.com gap.",
            playerDialogue:
              "A small 2-3 point alignment on your public rate to close the Brand.com gap. Won't touch your Loyal pricing - just brings the public side in line and lifts conversion on the segments you're not yet capturing.",
            styleMatch: { blue: 1, green: 1, red: 0, yellow: 1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'drift-r2-pitch-bundle',
            label: 'Push every product on the menu',
            description:
              "Pitch Mobile Rate, Country Rate, AND Genius dynamic all at once. Daniel'll match the energy but it overreaches.",
            playerDialogue:
              "Let's go big - Mobile Rates, Country Rates, AND Genius dynamic all on this week. Stack the levers, watch the volume.",
            styleMatch: { blue: -2, green: 0, red: 2, yellow: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
          {
            id: 'drift-r2-pitch-wait',
            label: 'Suggest holding off until next quarter',
            description:
              "Tell him to hold steady and revisit in 3 months. Misses the action moment.",
            playerDialogue:
              "Honestly, you're in good shape - let's hold the current setup and revisit next quarter. No need to do anything right now.",
            styleMatch: { blue: 0, green: 0, red: -2, yellow: -2 },
            assertiveness: 1,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'drift-r2-pitch-brand-align',
          responses: [
            { trustThreshold: 'low', text: "2-3 points feels reasonable. Send me the projected lift and I'll look at it.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "That's the kind of move I can take to the team. Let's do it.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Done - send me the parameters and I'll have it live this afternoon.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 3, visibility: 2, conversion: 2, revenue: 2 },
          trustChange: 4,
        },
        {
          optionId: 'drift-r2-pitch-bundle',
          responses: [
            { trustThreshold: 'low', text: "Three things at once is too much for me to track. Pick one.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Love the energy but I won't be able to read what worked if we flip everything. Sequence?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Tempting but I want to attribute the lift. Which one do we run first?", emotion: 'neutral' },
          ],
          metricEffects: { experiencedRPD: 1, visibility: 1 },
          trustChange: -1,
        },
        {
          optionId: 'drift-r2-pitch-wait',
          responses: [
            { trustThreshold: 'low', text: "Hold? That's the opposite of what I called you for. I want to do something.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I appreciate the candour but holding feels like a wasted moment. Something small at least?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "I respect the read but I'm not a holding kind of operator. Give me one small move.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
      ],
    },
  ],
};
