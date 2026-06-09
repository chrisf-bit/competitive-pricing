import type { ConversationTree } from '../types';

/**
 * Raven Inn R2 - 3-phase distractor conversation (No-Parity).
 *
 * Distractor partner used to round out the R2 portfolio. Data is
 * mapped from the SME spreadsheet Key OTA sheet row 14 (White
 * Cliffs Hotel) - eRPD 1.3% (Bucket 3), Lose Price 35%, three
 * active scenarios. Raven Inn reads as healthy / not the priority
 * vs Velvet Sky Boutique Hotel at R2.
 *
 * Author: Claude (filler). The conversation is realistic and
 * compliance-safe across all options - it plays through to a 0-star
 * wrong-partner verdict because Velvet Sky is the SME-approved R2
 * priority. No SME validation pending; this is distractor-only
 * content.
 *
 * Emily Carter (Hotel Manager) is green / blue primary - amiable
 * and analytical, prefers data-led conversations and collaborative
 * planning. Style scoring rewards green / blue, penalises red /
 * yellow when the AM pushes too hard or gets too expressive.
 */
export const ravenInnR2: ConversationTree = {
  partnerId: 'raven-inn',
  round: 2,
  phases: [
    // ── Hook ────────────────────────────────────────────────
    {
      phase: {
        id: 'hook',
        label: 'Hook',
        partnerPrompt:
          "Hi - thanks for calling. We've been steady this quarter and I've been working through where the next gains can come from. What did you want to walk through?",
        options: [
          {
            id: 'raven-r2-hook-data',
            label: 'Lead with the Key OTA picture',
            description:
              "Open with a data observation against the Key OTA she's currently competitive against.",
            playerDialogue:
              "Thanks Emily. Looking at your Key OTA picture, your Loyal pricing is genuinely strong and your Lose Price is sitting well under most of your peers. I wanted to walk through what's underneath that and where you could push further.",
            styleMatch: { blue: 2, green: 1, red: 0, yellow: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'raven-r2-hook-relationship',
            label: 'Lead with the partnership tone',
            description:
              "Open relationally - acknowledge her steady performance and ask how she's thinking about the next quarter.",
            playerDialogue:
              "Hi Emily. Your numbers have been quietly impressive - I wanted to check in on how you're thinking about the coming quarter before I share what I've been seeing on our side.",
            styleMatch: { blue: 0, green: 2, red: -1, yellow: 1 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'raven-r2-hook-push',
            label: 'Push for a bigger move',
            description:
              "Frame the call around an aggressive growth play. Out of step with her steady, analytical pace.",
            playerDialogue:
              "Emily, you're under-utilising the platform. Let's stop being conservative and put some real growth tools on the account today.",
            styleMatch: { blue: -1, green: -2, red: 2, yellow: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'raven-r2-hook-data',
          responses: [
            { trustThreshold: 'low', text: "Okay, walk me through the numbers. I'd like to see the underlying breakdown before we get to any recommendations.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That fits how I think about the account. Take me through what you're seeing.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Good - I was hoping you'd come at it from that angle. Let's go through it together.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 2,
        },
        {
          optionId: 'raven-r2-hook-relationship',
          responses: [
            { trustThreshold: 'low', text: "Thanks. Honestly though I'd rather we get to the data quickly - I've got back-to-back calls today.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "I appreciate that. The coming quarter looks steady. What were you seeing your end?", emotion: 'positive' },
            { trustThreshold: 'high', text: "That's kind. I'm thinking carefully about which levers to pull - I'd value your view.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
        {
          optionId: 'raven-r2-hook-push',
          responses: [
            { trustThreshold: 'low', text: "I'm going to stop you there. Calling me conservative as an opener isn't the right tone.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "We move carefully because it works. If you've got a specific lever, share it - but skip the framing.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Let's keep the framing measured. I'll listen to the proposal, but I won't be rushed.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -3,
        },
      ],
    },
    // ── Diagnosis ────────────────────────────────────────────
    {
      phase: {
        id: 'diagnosis',
        label: 'Diagnosis',
        partnerPrompt:
          "Okay - what's the picture from your end?",
        options: [
          {
            id: 'raven-r2-diag-segment',
            label: 'Walk through segment by segment',
            description:
              "Show her the family / international scenarios already flagged and where the next opportunity is hiding.",
            playerDialogue:
              "Your International scenario and both Family 2+1 and 2+2 are already flagged - you've got those captured, which is why your Loyal pricing is strong. The next opportunity is in mobile: app traffic specifically is where the Key OTA is undercutting you by a small but visible amount.",
            styleMatch: { blue: 2, green: 1, red: 0, yellow: -1 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'raven-r2-diag-headline',
            label: 'Stay on the headline view',
            description:
              "Keep the analysis at the headline level - eRPD comfortable, no urgent crisis.",
            playerDialogue:
              "On the headline you're in a comfortable spot. eRPD is well placed and Lose Price is significantly below peer. There's no urgent crisis - I'm here to share where the marginal gain is.",
            styleMatch: { blue: 0, green: 1, red: 0, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'raven-r2-diag-alarm',
            label: 'Frame it as an emerging crisis',
            description:
              "Tell her the small trend is the start of a much bigger problem. Out of proportion to the data.",
            playerDialogue:
              "I want to be direct - the trend you're showing is the start of a real visibility problem. If you don't act in the next two weeks, your visibility's going to fall off a cliff.",
            styleMatch: { blue: -2, green: -2, red: 1, yellow: 0 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'raven-r2-diag-segment',
          responses: [
            { trustThreshold: 'low', text: "Okay, the segment view is helpful. Can you show me the app-specific data before I commit?", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That matches what I've been suspecting on the app side. Let's look at what's actionable there.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes - the app gap has been on my list. I'm glad you're picking up the same signal.", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 3,
        },
        {
          optionId: 'raven-r2-diag-headline',
          responses: [
            { trustThreshold: 'low', text: "I'd want more than a headline read before I think about any change.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Appreciate the candour. Tell me what the marginal gain actually looks like.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Thanks for not overselling. What's the specific marginal gain you've got in mind?", emotion: 'positive' },
          ],
          metricEffects: {},
          trustChange: 1,
        },
        {
          optionId: 'raven-r2-diag-alarm',
          responses: [
            { trustThreshold: 'low', text: "That doesn't match what I'm seeing in my own dashboards. Let's slow down and look at the data.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "Two weeks is a strong claim. Walk me through the underlying numbers before I take that seriously.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "I'll grant you the urgency framing if the data backs it. Show me.", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
      ],
    },
    // ── Pitch ────────────────────────────────────────────────
    {
      phase: {
        id: 'pitch',
        label: 'Pitch',
        partnerPrompt:
          "Right - what do you actually want me to do?",
        options: [
          {
            id: 'raven-r2-pitch-mobile-rate',
            label: 'Pitch a targeted Mobile Rate',
            description:
              "Propose a Mobile Rate to close the app gap without touching the base ADR.",
            playerDialogue:
              "Let's activate a targeted Mobile Rate. It closes the app-specific gap without touching your base ADR, and we can review the conversion movement in two weeks.",
            styleMatch: { blue: 2, green: 1, red: 0, yellow: 0 },
            assertiveness: 2,
            compliance: 'safe',
          },
          {
            id: 'raven-r2-pitch-pilot',
            label: 'Propose a paper pilot to review next month',
            description:
              "Suggest a written proposal to walk through together at the next call. Soft close.",
            playerDialogue:
              "Let me put together a written pilot you can take to your team and we can pick it up at the next call.",
            styleMatch: { blue: 1, green: 2, red: -1, yellow: 0 },
            assertiveness: 1,
            compliance: 'safe',
          },
          {
            id: 'raven-r2-pitch-bundle',
            label: 'Push a multi-tool bundle',
            description:
              "Pitch Mobile Rate + Country Rate + Genius dynamic all at once. Overreach for her steady pace.",
            playerDialogue:
              "Let's go bigger - Mobile Rate, Country Rate, and Genius dynamic pricing all activated this week.",
            styleMatch: { blue: -1, green: -1, red: 2, yellow: 1 },
            assertiveness: 3,
            compliance: 'safe',
          },
        ],
      },
      nodes: [
        {
          optionId: 'raven-r2-pitch-mobile-rate',
          responses: [
            { trustThreshold: 'low', text: "Send me the setup details and I'll review with the team before activating.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "That's a tidy proposal. Let's activate it and review in two weeks.", emotion: 'positive' },
            { trustThreshold: 'high', text: "Yes, let's do it. Send me the parameters and I'll have it live by tomorrow.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 2, visibility: 2, conversion: 1, revenue: 1 },
          trustChange: 4,
        },
        {
          optionId: 'raven-r2-pitch-pilot',
          responses: [
            { trustThreshold: 'low', text: "A written pilot works for me - I prefer that to deciding mid-call.", emotion: 'neutral' },
            { trustThreshold: 'medium', text: "Fine - send the pilot doc and we'll review at the next call.", emotion: 'neutral' },
            { trustThreshold: 'high', text: "Appreciate the patient approach. Send it over and I'll have notes ready.", emotion: 'positive' },
          ],
          metricEffects: { experiencedRPD: 1, visibility: 1 },
          trustChange: 1,
        },
        {
          optionId: 'raven-r2-pitch-bundle',
          responses: [
            { trustThreshold: 'low', text: "Three things at once is too much. Pick one and we can talk.", emotion: 'cautious' },
            { trustThreshold: 'medium', text: "I move one lever at a time. Let's not bundle - which one is the highest-impact?", emotion: 'neutral' },
            { trustThreshold: 'high', text: "I'd rather sequence them than fire all at once. Which order do you suggest?", emotion: 'neutral' },
          ],
          metricEffects: {},
          trustChange: -2,
        },
      ],
    },
  ],
};
