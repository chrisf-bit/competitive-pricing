import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { nobleFalconR10IssueTreePath } from './noble-falcon-r10-base';

/**
 * The Noble Falcon Inn - Round 20 (Level 2 / On-Platform
 * Competitiveness). The FINAL round of the journey.
 *
 * Source: SME "Round 20" doc, OPC Conversation Example 1 (The Noble
 * Falcon Inn). Follow-up to the Round 10 call - Adam Cole, a Revenue
 * Manager for a fully brand-managed property (blue/red: data-led,
 * commercial, brand-bound). This is the "Action-to-Impact
 * Counterfactual": his headline rate sits ~15% below peers, so he can't
 * understand why conversion lags visibility. The reveal is a granular
 * family-search gap (children charged as adults from a misconfiguration,
 * so a small family is quoted two premium rooms). The fix carries a
 * concrete impact (~45 room nights next month), and the call turns
 * forward into a genuine 2027 partnership conversation about
 * availability, content and non-refundable-rate discoverability.
 *
 * A warm, positive close - the last beat of the whole sim. Adam commits
 * to taking the non-refundable-rate case to his internal QBR.
 *
 * OPC objection in play: The "Action-to-Impact" Counterfactual.
 *
 * Regime-neutral; safe across all three regimes. The non-refundable
 * discoverability point is framed factually (how a first price surfaces
 * a listing in filtered search), not as a ranking reward for
 * discounting. Distractors teach violations via a "just drop your price
 * more" push (wrong lever - he's already cheap) and a guaranteed-ranking
 * promise. No internal metric names in any playerDialogue.
 */

const openingAm =
  "Good morning, Adam. Thanks for taking the time to reconnect today. Why don't we go straight to the data together?";

// ───────── Step 1 - Open on the conversion-vs-visibility paradox ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'nf-r20-step1-correct',
    label: 'Frame July as the opportunity, name the paradox',
    description:
      "SME-prescribed open: demand is strong and his page views prove it - July is his biggest opportunity of the year. But performance is below peer, with conversion at 1.3% and visibility share at 14.5%. Ask him why he thinks the property isn't capturing that demand.",
    playerDialogue:
      "Demand is strong right now - your page-view volume is clear evidence - and July is your biggest opportunity of the year. But performance is sitting below peer level: conversion at 1.3% and visibility share at 14.5%. Why do you think the property isn't capturing more of that demand?",
    partnerResponse:
      "Well, I'm not sure... July is traditionally our highest-demand month, so expectations are high. Total revenue is steady, but frankly our pickup for the second half of the month feels slow versus last year. Our benchmarking says our general rate here sits roughly 15% below our local peers. If the price is that competitive, why is our conversion not in line with our visibility?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'nf-r20-step1-drop-more',
    label: 'Tell him to drop his price further',
    description:
      "Reaches for the price lever before diagnosing - and he's already 15% below peers, so 'go cheaper' is both the wrong lever and easy for a data-led manager to see through.",
    playerDialogue:
      "Your conversion's on the low side, so the simplest move here is to get you more competitive still - bring your headline rate down a notch, maybe test a small reduction across your main room types, and I'd expect the bookings to start following once you're clearly the cheapest option travelers see.",
    partnerResponse:
      "We're already 15% below our peers, Mark. If price were the issue, we'd be converting - so cutting further makes no sense to me.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
  {
    id: 'nf-r20-step1-generic-praise',
    label: 'Open with generic reassurance',
    description:
      "Warm but empty - opening with 'everything looks great, keep it up' on his biggest month of the year wastes the opportunity and gives a results-minded manager nothing to work with.",
    playerDialogue:
      "Honestly, Adam, from where I'm sitting things are looking really solid on your end - the numbers are steady, the property's ticking along nicely, and I didn't want to overcomplicate a good month. I mostly just wanted to check in, say it's great to reconnect, and tell you to keep doing exactly what you're doing.",
    partnerResponse:
      "I appreciate it, but our pickup is slow for a peak month. I'd rather use this time to find out why than hear it's all fine.",
    styleMatch: { red: -1, yellow: 1, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -3,
  },
];

// ───────── Step 2 - Reveal the granular family search ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'nf-r20-step2-correct',
    label: 'Show the family search you ran',
    description:
      "SME-prescribed diagnosis: his headline price looks competitive, but a granular segment breakdown reveals a gap. Searching the property as a family would (2 adults and a four-year-old), the recommended option came back as two premium double rooms - two rooms for a small family.",
    playerDialogue:
      "That's exactly the question I wanted to answer. Your headline price does look very competitive - but a granular segment breakdown shows a gap. I searched your property the way a family would, two adults and a four-year-old, and the recommended option that came back was two premium double rooms. Two rooms, for a small family.",
    partnerResponse:
      "How is that possible? Our rates across all room types are mapped consistently from our channel manager.",
    styleMatch: { red: 1, yellow: 0, green: 0, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'nf-r20-step2-abstract',
    label: 'Talk about segments in the abstract',
    description:
      "Right that it's segment-level, wrong delivery - describing 'a gap in certain segments' without the concrete family search he can reproduce himself denies a data-led manager the proof that makes it land.",
    playerDialogue:
      "When you look below the headline, there's a competitiveness gap hiding in some of your traveler segments - it's the kind of thing that never shows up in the blended average, so on paper everything reads fine, but underneath, certain guest types are seeing a very different price to the one you think you're offering. It's definitely there once you go segment by segment.",
    partnerResponse:
      "Which segments, and how would I even see it? 'It's there' isn't something I can act on.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'nf-r20-step2-blame-cm',
    label: 'Blame his channel manager',
    description:
      "Jumps to blaming his channel-manager setup before diagnosing - it presumes the cause, and a manager proud of his consistent mapping will defend rather than explore.",
    playerDialogue:
      "This will almost certainly be your channel manager pushing bad rates across - in my experience those integrations are nearly always the culprit when the numbers look off in exactly this way. The mapping drifts, a rule gets applied wrong somewhere in the sync, and suddenly the rates travelers see aren't the ones you set. I'd start by pulling apart that connection first.",
    partnerResponse:
      "Our channel manager maps everything consistently. I'd want evidence before we pin it on that.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 3 - Explain the child-rate misconfiguration ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'nf-r20-step3-correct',
    label: 'Name the child-age misconfiguration',
    description:
      "SME-prescribed handling: it's a configuration gap, as discussed last time. Child age categories are currently misconfigured in the extranet, so the platform automatically charges children as adults - which is what forces the two-room recommendation.",
    playerDialogue:
      "It's a configuration gap, Adam - the same theme we touched on last time. Your child age categories are currently misconfigured in the extranet, so the platform automatically charges children as adults. That's what forces a small family into two rooms instead of one.",
    partnerResponse:
      "I see. I thought I'd been quite strict about the family configuration, but I didn't realise it was like this - I've honestly never searched as a specific guest type like a couple or a family. That's a good tip, actually.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'nf-r20-step3-jargon',
    label: 'Explain it in dense configuration terms',
    description:
      "Right cause, wrong delivery - walking a partner who's clearly receptive through occupancy codes and age-bucket mapping buries a simple, welcome insight in complexity he didn't ask for.",
    playerDialogue:
      "It's down to your occupancy derivation logic - the age-bucket boundaries aren't mapping cleanly onto the child-rate tiers, so the pax-split defaults to an adult headcount on the room-yield calculation, the occupancy ceiling trips, and it cascades the request into a two-room derivation.",
    partnerResponse:
      "You've lost me. Can you just tell me plainly what's wrong and what I fix?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: 0 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -2,
  },
  {
    id: 'nf-r20-step3-just-discount-family',
    label: 'Suggest a family discount to compensate',
    description:
      "Right segment, wrong fix - adding a family discount to offset a broken configuration gives away margin to paper over a setup error, instead of correcting the config that's inflating the family price.",
    playerDialogue:
      "The quickest patch here is to layer a family discount on top of your existing rates, so the price families actually see drops back down to something attractive and they start booking again. You could set it live today with no config work needed, and let the reduced family price do the work.",
    partnerResponse:
      "Discount to cover a setup error? I'd rather fix whatever's actually broken than give away margin.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
];

// ───────── Step 4 - Reinforce the tool and the commercial loss ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'nf-r20-step4-correct',
    label: 'Credit the self-search habit, size the loss',
    description:
      "SME-prescribed handling: reinforce that the search page is the best source for seeing how guests perceive the property from every angle, and frame the stakes - family bookers are among the highest-spending segments in peak season, the perfect audience for the back half of July.",
    playerDialogue:
      "Exactly - the search page is the best place to see how guests actually perceive you, from every angle. And this matters commercially: family bookers are among your highest-spending segments in peak season, so for the back half of July they're the perfect audience to be winning, not losing.",
    partnerResponse:
      "That would explain the drop-off we've seen in multi-occupancy room pickup, too. Do you know what the impact of the correct setup would be?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'nf-r20-step4-move-on',
    label: 'Move on without sizing it',
    description:
      "Right that the fix is clear, but skipping past why it matters - a commercially-minded manager wants the family segment's value named before he prioritises the work over everything else on his plate.",
    playerDialogue:
      "Great, so that's the fix identified - just correct the child categories in the extranet and the two-room problem goes away on its own. I'd say we've got what we came for, so let's not overthink it - I'll make a note to check the setup's gone through, and then we can move on to the next thing on the list.",
    partnerResponse:
      "Before we move on - how much is this actually worth? I need to know it's worth prioritising.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
  {
    id: 'nf-r20-step4-overpromise',
    label: 'Promise it will transform his ranking',
    description:
      "Oversells the fix with a guaranteed ranking transformation - a promise of placement reward that a data-led manager distrusts and that overshoots the concrete, honest impact.",
    playerDialogue:
      "Fix this one thing and I can promise you it transforms your ranking overnight - the moment those family searches resolve properly, you'll rocket straight up the results, leapfrog the peers sitting above you, and stay planted there for the rest of peak season. This is the change that puts you top of the page and keeps you there.",
    partnerResponse:
      "'Rocket up overnight' sounds like a sales line. I'd trust a real number over a promise like that.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -9,
  },
];

// ───────── Step 5 - Quantify the fix and sustain it ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'nf-r20-step5-correct',
    label: 'Give the concrete number, then how to sustain it',
    description:
      "SME-prescribed handling: closing the gap specifically for family searches could mean an immediate pickup of roughly 45 additional room nights next month. To sustain it, correct family rates year-round - and think about advance-booking families at the end of the season who could become repeat guests next year.",
    playerDialogue:
      "Closing that gap specifically for family searches could mean an immediate pickup of roughly 45 additional room nights next month. To sustain it, keep the family rates correctly configured year-round - and think about families booking ahead at the end of the season: if your availability is open and your prices are competitive, you're already working toward next year's guests, and many of them become repeaters.",
    partnerResponse:
      "That's a tangible commercial outcome. What would you recommend to sustain this kind of momentum through the upcoming months?",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'nf-r20-step5-vague-upside',
    label: 'Promise a big upside without a number',
    description:
      "He's a numbers manager who just asked for the impact - answering with 'a significant boost' instead of the concrete room-nights figure wastes the credibility a real number would have bought.",
    playerDialogue:
      "You'd see a significant boost, honestly - fixing this opens up a whole pocket of family demand you're currently missing out on, and once those searches resolve the way they should, that lost volume starts converting instead of bouncing away to your peers. The upside is genuinely substantial, easily one of the bigger wins available to you right now, and it compounds through the back half of the month as the peak demand keeps flowing in.",
    partnerResponse:
      "'Significant' and 'substantial' - can you put an actual number on it? That's what I can take to my team.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'nf-r20-step5-upsell-campaigns',
    label: 'Pivot straight into selling campaigns',
    description:
      "Turns a clean, quantified win into an immediate upsell of paid campaigns - reaching for more before the agreed fix is even in, which undercuts the trust the honest number just built.",
    playerDialogue:
      "And to really capitalise on this while we're here, let's not stop at the fix - I'd layer on a couple of paid campaigns and a visibility booster on top, so the moment those family searches start resolving properly, you're also pushing hard on placement while peak demand is at its highest. We could get the campaigns live alongside the configuration change, run them right through the back half of July, and stack every lever you've got to make the most of the window.",
    partnerResponse:
      "Let's get the actual fix in and see the result first before we start adding paid products on top.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
];

// ───────── Step 6 - Close forward on the 2027 partnership ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'nf-r20-step6-correct',
    label: 'Land availability, content and non-refundable discoverability',
    description:
      "SME-prescribed close, turning the call forward: get all room types bookable with up-to-date content, and activate both flexible and non-refundable rates. Explain the non-refundable point factually - as the first, most competitive price it surfaces the listing in filtered searches and brings guests to the page, even if they ultimately book a flexible or half-board rate. This is the final, forward-looking beat of the journey.",
    playerDialogue:
      "Let's turn to next year. First, availability - make sure all your room types are bookable and your content, photos and services, is fully up to date. I'd also activate both flexible and non-refundable rates. I noticed your non-refundable rates are currently closed - and here's why they matter: as your first, most competitive price, a non-refundable rate is what surfaces you when travelers filter by price range. It brings them to your page. They may end up booking a flexible or half-board rate, but they found you because of it.",
    partnerResponse:
      "Absolutely - I can see how that makes the difference in the discoverability phase. Head office keeps non-refundable exclusive to our own website today, but if you can share some data on advance non-refundable value, I'll present this at our upcoming QBR and genuinely push for approval. Thank you for this.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'nf-r20-step6-guarantee-rank',
    label: 'Promise the non-refundable rate guarantees top ranking',
    description:
      "Sells the non-refundable rate with a guaranteed ranking reward - a promise of placement in exchange for a rate move, which breaches compliance in every regime, and overshoots the honest discoverability logic.",
    playerDialogue:
      "Open your non-refundable rate a full year out and I can guarantee it puts you straight to the top of the search results - that's a locked-in ranking win in exchange for the price move. The lower your first, most competitive price sits, the higher the platform will place you, so the deeper you go on that non-refundable rate the more placement you're rewarded with. Commit to it now and I'll personally make sure you hold that top position right through into next year - it's a guaranteed return on dropping the rate, and head office will see the ranking jump for themselves.",
    partnerResponse:
      "A guaranteed top spot? Nothing works like that, and head office would see straight through it. That actually weakens your case.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -11,
  },
  {
    id: 'nf-r20-step6-just-fix',
    label: 'Close on the family fix alone',
    description:
      "Right that the family fix is the win, but ending there - on the last conversation of a strong call, a receptive, forward-leaning manager was open to a genuine 2027 planning discussion, and stopping short leaves that value on the table.",
    playerDialogue:
      "Perfect - let's just get that family configuration corrected in the extranet and I'm confident we'll see those 45 room nights come through over the next few weeks. Honestly, that's a really clean result for one call, and I don't want to pile more onto your plate when you've already got a clear action to take away. Get the child categories fixed, keep an eye on the family pickup as it lands, and drop me a line if anything looks off once it's live. Otherwise I'll leave you to it and we'll catch up again down the line.",
    partnerResponse:
      "Sounds good... though I was rather hoping we'd talk about where we take this next year, while we've got the momentum.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -3,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: 'Open on the conversion-vs-visibility paradox',
    partnerPrompt:
      "Morning, Mark. Yes, let's start! What trends are you noticing on your end?",
    options: step1Options,
  },
  {
    id: 'family-search',
    label: 'Reveal the granular family search',
    partnerPrompt:
      "Well, I don't know... July is traditionally our highest-demand month, so expectations are high. Total revenue is steady, but our pickup for the second half of July feels slow versus last year. Our benchmarking says our general rate here sits roughly 15% below our local peers. If the price is that competitive, why is our conversion not in line with our visibility?",
    options: step2Options,
  },
  {
    id: 'child-config',
    label: 'Explain the child-rate misconfiguration',
    partnerPrompt:
      "How is that possible? Our rates across all room types are mapped consistently from our channel manager.",
    options: step3Options,
  },
  {
    id: 'size-the-loss',
    label: 'Reinforce the tool and the commercial loss',
    partnerPrompt:
      "I see. I thought I'd been quite strict about the family configuration, but I never actually searched as a specific guest type like a family. That's a good tip.",
    options: step4Options,
  },
  {
    id: 'quantify',
    label: 'Quantify the fix and sustain it',
    partnerPrompt:
      "That would explain the drop-off in multi-occupancy room pickup, too. Do you know what the impact of the correct setup would be?",
    options: step5Options,
  },
  {
    id: 'close-forward',
    label: 'Close forward on the 2027 partnership',
    partnerPrompt:
      "That's a tangible commercial outcome. What would you recommend to sustain this kind of momentum through the upcoming months?",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for noble-falcon-none/
 * -narrow/-wide at round 20 in branchingScenarios.ts. The final round
 * of the journey - a warm, forward-looking close.
 */
export function nobleFalconR20(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 20,
    issueTreePath: nobleFalconR10IssueTreePath,
    openingAm,
    steps,
  };
}
