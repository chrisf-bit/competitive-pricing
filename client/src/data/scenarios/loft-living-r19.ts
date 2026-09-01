import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { loftLivingR9IssueTreePath } from './loft-living-base';

/**
 * Loft Living Inn - Round 19 (Level 2 / On-Platform Competitiveness).
 *
 * Source: SME "Round 19" doc, OPC Conversation Example 2 (Loft Living
 * Inn). Follow-up to the Round 9 call - Lucas Silva, a Multi-Property
 * Professional / PMC Revenue Manager (red/blue: margin logic, ROI,
 * data). He opens frustrated by wholesale rates leaking online as B2C
 * offers and cites a regional-office ban on rate cuts. The unlock is to
 * set the wholesaler noise aside, go device-specific (his mobile search
 * price runs 18% higher because his mobile discount excludes weekends
 * and long windows), and land a mobile rate that simply extends his
 * existing country-rate competitiveness to mobile bookers.
 *
 * OPC objections in play: The "Money-in-Bank" (severe unsold inventory)
 * and The Regional Office Shield ("my regional office won't allow rate
 * cuts").
 *
 * Regime-neutral; safe across all three regimes. No parity language, no
 * matching ask, no ranking threat on the optimal path - the mobile rate
 * is a targeted, opaque tool that doesn't ask him to challenge head-
 * office policy. Distractors teach violations via a "fix your wholesale
 * channels" overreach and a price-match demand. No internal metric
 * names in any playerDialogue.
 */

const openingAm =
  "Hi Lucas, thanks for taking the time to connect today. I'd love to review your performance together for the upcoming quarter. How's your schedule looking for a brief discussion?";

// ───────── Step 1 - Set the wholesaler noise aside, probe strategy ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'll-r19-step1-correct',
    label: 'Set the leak aside, ask his forward strategy',
    description:
      "SME-prescribed open: acknowledge the wholesaler-leak frustration, set it aside, and ask him to frame his strategy for his inventory over the next 90 days - keeps the call on ground he controls.",
    playerDialogue:
      "I understand that, Lucas, and I get the frustration. Let's step away from the wholesale leak and look strictly at your performance on our platform. When you look at your inventory over the next 90 days, what's your strategy?",
    partnerResponse:
      "Our priority is to maximise margins - we're in the middle of peak season. But frankly, forward bookings for the next three months are pacing slower than we'd expect. We're trying to work out why conversion stays slow despite solid demand in our destination.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'll-r19-step1-chase-leak',
    label: 'Offer to chase the wholesale leak with him',
    description:
      "Sympathetic but a trap - following him onto the wholesale-leak hunt parks the on-platform conversion problem you can actually fix today and burns the call on ground neither of you controls.",
    playerDialogue:
      "Let's tackle that leak head-on, Lucas - send me every channel where you're seeing your wholesale rates show up as B2C offers, and I'll work through them to trace who's dumping them and get it shut down before we look at anything else.",
    partnerResponse:
      "Finally, someone who gets it - if we can trace those rates, that's the real fix. Let's start there.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'll-r19-step1-cut-rates',
    label: 'Open by asking him to cut rates',
    description:
      'Prescribes a rate cut before diagnosing - and a margin-first operator mid-peak-season, already boxed in by a regional-office ban on cuts, rejects it immediately.',
    playerDialogue:
      "Honestly, Lucas, your bookings are running slow, so the quickest lever we've got is to bring your rates down here and get you more competitive through the peak - drop the price a bit and the volume should start coming back.",
    partnerResponse:
      "Cut rates in the middle of peak season? My margins are the priority, and my regional office wouldn't allow it anyway.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
];

// ───────── Step 2 - Present the severe conversion gap ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'll-r19-step2-correct',
    label: 'Name the sell-through and conversion collapse',
    description:
      "SME-prescribed handling: his portfolio's sell-through is pacing about 7% behind peers, and while demand exists his listings show a severe conversion drop (nearly -50% versus the same period last year), with 33% of last month's inventory unsold.",
    playerDialogue:
      "Looking at the metrics, your portfolio's sell-through is pacing about 7% behind your peer group. Demand exists, but your listings are seeing a severe conversion drop - almost -50% versus the same period last year - and 33% of last month's inventory went unsold. That's a real missed-revenue opportunity.",
    partnerResponse:
      "That's not reassuring. But since travelers clearly are interested - our page views are well up versus last year - what specifically is stopping them from becoming bookers?",
    styleMatch: { red: 2, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'll-r19-step2-soften',
    label: 'Soften the numbers to spare him',
    description:
      "Right instinct to keep it collaborative, wrong move - downplaying a 33%-unsold, -50%-conversion collapse robs a margin-focused operator of the urgency the data actually warrants.",
    playerDialogue:
      "Honestly, Lucas, it's nothing too dramatic - conversion has dipped a touch and yes there's a bit of unsold inventory sitting there, but broadly you're in reasonable shape for the season and I wouldn't lose sleep over it. Let's not blow it out of proportion when your wholesale headache is the bigger fire to put out right now.",
    partnerResponse:
      "A touch? If it's minor, then I won't prioritise it over the wholesale problem that's actually eating my margin.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'll-r19-step2-blame-leak',
    label: 'Agree the leak is causing it all',
    description:
      "Right that conversion is the problem, wrong cause - blaming it all on the wholesale leak validates his opener but misses the on-platform search-price gap that's the real, fixable driver.",
    playerDialogue:
      "Honestly, Lucas, this conversion drop is almost certainly your wholesale leak biting - once those cheaper rates are floating around the web as B2C offers, travelers see them and simply hold off booking with you here, waiting to see if the price falls further. Sort the leak and I'd expect a lot of this conversion softness to ease.",
    partnerResponse:
      "So it IS the leak. Then there's nothing I can do on your platform until that's solved, right?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 3 - Locate the drop-off ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'll-r19-step3-correct',
    label: 'Show the visibility and search-price drop-off',
    description:
      "SME-prescribed diagnosis: despite rising visibility versus last year, his share versus peers is falling 15% behind, and his search price averages 12% higher than theirs - so travelers see him much less, and when they do the offer isn't attractive, so volume drops.",
    playerDialogue:
      "Let's look at exactly where users drop out. Even with your visibility up versus last year, your share against your peer group is falling about 15% behind, and your search price averages 12% higher than theirs. So travelers see you much less - and when they do, the offer isn't attractive enough - and the volume drops.",
    partnerResponse:
      "Hmm, got it. But my regional office won't allow rate cuts, especially with all the noise from those leaked wholesale rates.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'll-r19-step3-visibility-only',
    label: 'Point only to the visibility drop',
    description:
      "Right that visibility lags, incomplete - the visibility gap without the 12% search-price cause leaves a data-led operator unable to see the lever, so he can't act on it.",
    playerDialogue:
      "The core issue here is that your visibility share is steadily falling behind your peer group - travelers just aren't seeing your listings often enough when they search, and every time you slip down that ranking you lose another slice of demand, which is what's quietly dragging your whole volume down month after month.",
    partnerResponse:
      "And what's causing the visibility to fall? There's always a lever behind it - what's mine?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -3,
  },
  {
    id: 'll-r19-step3-match-price',
    label: 'Tell him to price to his peers',
    description:
      'Turns the 12% gap into a requirement to bring his price down to his peers - a price-match demand that oversteps in every regime and walks into the regional-office ban.',
    playerDialogue:
      "The fix here is straightforward, Lucas: your search price is running a full 12% over what your peers are charging, so you really just need to bring it right down to match their level across the board, and once your pricing lines up with theirs the volume will come straight back to you.",
    partnerResponse:
      "Match my peers' pricing? My regional office has banned exactly that, and I'm not fighting them on it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

// ───────── Step 4 - Go device-specific (no policy challenge) ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'll-r19-step4-correct',
    label: 'Reassure, then zoom into mobile',
    description:
      "SME-prescribed handling of the Regional Office Shield: make clear you're not asking him to challenge head-office policy, then narrow to device - over the next three months his search price on mobile is running about 18% higher than peers.",
    playerDialogue:
      "I'm not asking you to challenge your head-office policy at all. Let's just look closer at where the gap does the most damage. When we break it down by device over the next three months, your search price on mobile is running about 18% higher than your peers.",
    partnerResponse:
      "We're 18% more expensive on mobile? Why is that happening specifically there?",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'll-r19-step4-push-policy',
    label: 'Push him to take it up with head office',
    description:
      "Right that the gap needs closing, wrong ask - telling him to go challenge the regional-office ban pushes him into an internal fight he's told you he won't have, instead of the device-level fix that sidesteps it entirely.",
    playerDialogue:
      "The way through this is that you'll need to go back to your regional office and make the case to lift that ban - the numbers are firmly on your side here, so I'd really push them hard on it and don't take no for an answer until they've heard the full picture.",
    partnerResponse:
      "You clearly weren't listening. I'm not going to war with my regional office over this.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'll-r19-step4-generic-gap',
    label: 'Restate the overall 12% gap',
    description:
      "Right data, no progress - repeating the whole-portfolio 12% gap after he's raised the policy wall misses the device-specific angle that would let him act without touching his headline rate.",
    playerDialogue:
      "Well, the headline is still that same 12% gap right across the board, Lucas - that's really the thing that's holding your whole performance back here, and until we get that overall number moving in the right direction I don't see the rest of it improving much either.",
    partnerResponse:
      "You've said that already, and I've told you the policy won't let me move my headline rate. Where does that leave us?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
];

// ───────── Step 5 - Explain the mobile misconfiguration ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'll-r19-step5-correct',
    label: 'Explain the mobile-rate exclusions',
    description:
      "SME-prescribed handling: his basic mobile discount is active, but exclusions on weekends and longer booking windows mean over 70% of mobile searches don't match the incentive - and the data shows an 80% drop-off in mobile conversions versus his peer group.",
    playerDialogue:
      "Your basic mobile discount is active - but it excludes weekends and longer booking windows, so over 70% of mobile searches don't actually match the incentive. The result is an 80% drop-off in mobile conversions compared to your peer group. The discount is there; it's just not reaching the searches.",
    partnerResponse:
      "That's a big loss. But if we adjust the mobile setup, doesn't that risk cannibalizing our desktop rates?",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'll-r19-step5-vague-mobile',
    label: "Say his mobile setup is \"not optimised\"",
    description:
      "Right area, no mechanism - 'your mobile setup isn't optimised' without the weekend/window exclusions and the 80% drop-off gives a numbers-led operator nothing precise to correct.",
    playerDialogue:
      "The short version, Lucas, is that your mobile setup just isn't optimised the way it should be - there's clearly a good chunk of performance being left on the table on mobile compared to where it could sit, and it's dragging on your wider numbers. It's an area I'd definitely get someone to take a proper look at.",
    partnerResponse:
      "Not optimised how? I need to know what's actually misconfigured before I touch it.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'll-r19-step5-deepen-discount',
    label: 'Tell him to deepen the mobile discount',
    description:
      "Right that mobile is the lever, wrong fix - deepening the discount doesn't help when the problem is that 70% of searches are excluded from it; it just gives away more margin on the searches that already qualify.",
    playerDialogue:
      "Honestly the simplest move here is just to increase your mobile discount, Lucas - push the mobile price down a good bit further so that travelers browsing on their phones see a sharper deal and start converting the way they should. Make the discount deep enough and the mobile numbers will look after themselves.",
    partnerResponse:
      "Give away even more margin? In peak season? That's the last thing I want to do.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 6 - Handle cannibalization + close ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'll-r19-step6-correct',
    label: 'Explain it extends existing country rates, then close',
    description:
      "SME-prescribed close: mobile rates are opaque to desktop searchers, so there's no cannibalization. And he already runs country rates - so the same competitive rate he offers EEA, US and UK would simply become available to mobile bookers too, widening the audience rather than discounting deeper.",
    playerDialogue:
      "Not at all - mobile rates aren't visible to desktop searchers, so your desktop rate is untouched. And you already run country rates: this just means the same competitive rate you give EEA, US and UK travelers becomes available to mobile bookers too. You're widening the audience, not cutting deeper. Let's set it up and review the mobile recovery together.",
    partnerResponse:
      "Ok, that's clear. Honestly I lose my mind keeping up with all the promotions and stacking, but the logic makes sense - let's reconnect in two months to see the impact of the mobile rate.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'll-r19-step6-dismiss-worry',
    label: 'Wave off the cannibalization worry',
    description:
      "Right conclusion, no evidence - telling a data-led operator 'don't worry, it won't cannibalize' without the opaque-to-desktop mechanism leaves his specific concern unanswered.",
    playerDialogue:
      "Honestly, Lucas, I wouldn't overthink the cannibalization on this one - in my experience it basically never happens in practice, and I've seen plenty of partners switch a mobile rate on without any drama at all on their desktop side. So I'd just go ahead and flip the mobile rate on, then keep an eye on how it lands over the first few weeks.",
    partnerResponse:
      "'It basically never happens' isn't the reasoning I need before I touch my desktop revenue. Why won't it?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'll-r19-step6-upsell-stack',
    label: 'Push to stack extra promotions on top',
    description:
      "Uses the opening to pile on more - stack campaigns and deals on top of the mobile rate. Overwhelms a partner already frustrated by stacking complexity and muddies a clean, targeted fix.",
    playerDialogue:
      "Perfect - and honestly, while we're at it, Lucas, let's not stop at just the mobile rate. Let's stack a couple of campaigns and a targeted deal right on top of it as well, layer in a genius offer where we can, and really maximise the whole push across every channel we've got. The more we pile on together now, the harder your mobile numbers will work for you this season.",
    partnerResponse:
      "I just told you I'm drowning in stacked promotions. Piling more on is the opposite of what I need.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: 'Set the wholesaler noise aside, probe strategy',
    partnerPrompt:
      "Hello, Elena. I'm ready, thanks! To be completely honest, I'm still struggling with those wholesale rates ending up online as B2C offers. What does your internal data show us right now?",
    options: step1Options,
  },
  {
    id: 'present-gap',
    label: 'Present the severe conversion gap',
    partnerPrompt:
      "Our priority is to maximise margins - we're mid peak season. But frankly, forward bookings for the next three months are pacing slower than we'd expect, and we're trying to work out why conversion stays slow despite solid demand.",
    options: step2Options,
  },
  {
    id: 'drop-off',
    label: 'Locate the drop-off',
    partnerPrompt:
      "That's not reassuring. But since travelers clearly are interested - our page views are well up versus last year - what specifically is stopping them from becoming bookers?",
    options: step3Options,
  },
  {
    id: 'device-specific',
    label: 'Go device-specific (no policy challenge)',
    partnerPrompt:
      "Hmm, got it. But my regional office won't allow rate cuts, especially with all the noise from those leaked wholesale rates.",
    options: step4Options,
  },
  {
    id: 'mobile-config',
    label: 'Explain the mobile misconfiguration',
    partnerPrompt:
      "We're 18% more expensive on mobile? Why is that happening specifically there?",
    options: step5Options,
  },
  {
    id: 'close',
    label: 'Handle cannibalization + close',
    partnerPrompt:
      "That's a big loss. But if we adjust the mobile setup, doesn't that risk cannibalizing our desktop rates?",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for loft-living-none/-narrow/
 * -wide at round 19 in branchingScenarios.ts.
 */
export function loftLivingR19(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 19,
    issueTreePath: loftLivingR9IssueTreePath,
    openingAm,
    steps,
  };
}
