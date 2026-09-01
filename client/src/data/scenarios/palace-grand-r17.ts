import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { palaceGrandR7IssueTreePath } from './palace-grand-base';

/**
 * Palace Grand Resort - Round 17 (Level 2 / On-Platform
 * Competitiveness).
 *
 * Source: SME "Round 17" doc, OPC Conversation Example 9 (Palace Grand
 * Resort). Follow-up to the Round 7 call - Ethan Nkosi, an Operations
 * Manager (green/blue: collaborative, ROI- and occupancy-minded). He
 * opens frustrated by other OTAs' price-competitiveness noise even
 * though he gives everyone the same rate. The unlock is to set that
 * aside, land the diagnosis on one segment (European family searches,
 * running +12% because children are miscofigured as adults AND the EEA
 * country rate is missing), and land a non-stacking EEA Country Rate.
 *
 * OPC objections in play: The "Money-in-Bank" (unsold inventory read as
 * a demand consequence) and The Regional Office Shield / same-net-rate
 * frustration.
 *
 * Regime-neutral; safe across all three regimes. No parity language, no
 * matching ask, no ranking threat on the optimal path - the Country
 * Rate is a targeted, opaque tool. Distractors teach violations via a
 * "match your competitors" price demand and a ranking threat. No
 * internal metric names in any playerDialogue.
 */

const openingAm =
  "Good afternoon, Ethan. Thanks for taking the time to connect. I'd love to review your performance together for the upcoming quarter.";

// ───────── Step 1 - Set the OTA noise aside, open on the signal ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'pg-r17-step1-correct',
    label: 'Acknowledge the frustration, then present the signal',
    description:
      "SME-prescribed open: validate the noise he's dealing with, set it aside, and present the forward signal - sell-through pacing behind peers and a fifth of last month's rooms left unsold.",
    playerDialogue:
      "I completely understand how frustrating that noise is. Let's set it aside and look at your own performance. Over the next 90 days your sell-through is pacing about 13% behind your peer group, and last month you had around 21% of rooms left unsold. That's revenue that could have been captured.",
    partnerResponse:
      "21% unsold inventory... Let's look at the broader picture, Diego. Our page views are positive, and when guests land on our page our conversion is solid. If our sell-through is slow, isn't that just a consequence of the general drop in demand?",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r17-step1-pile-on',
    label: 'Add to the price-competitiveness pressure',
    description:
      "Right that competitiveness is the theme, wrong read of the room - piling more 'you're not competitive' pressure onto a partner who just told you he's sick of exactly that noise confirms his fear before you've earned any goodwill.",
    playerDialogue:
      "Well, the other OTAs aren't wrong about this, Ethan - your competitiveness really is the issue, and it's showing up clearly in your own numbers here too, not just in their complaints. It's not noise, it's a real pattern, and it's something you're going to have to face up to and address sooner rather than later.",
    partnerResponse:
      "So you ARE bringing the same thing here. This is exactly the conversation I was hoping to avoid.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'pg-r17-step1-cut-rate',
    label: 'Open by telling him to lower rates',
    description:
      'Prescribes a price cut before diagnosing - and it walks straight into the price-war fear he opened with, so a flexible-but-ROI-minded operator shuts it down.',
    playerDialogue:
      "The simplest way to get those rooms moving is to bring your rate down a bit here - if you shave a little off your price you'll stop losing those bookings to the competition, and the unsold inventory should start clearing on its own fairly quickly. Honestly, that's the quickest fix I can point you to today.",
    partnerResponse:
      "So your answer is 'drop your price' too. I give everyone the same rate for a reason - I'm not starting a price war.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
];

// ───────── Step 2 - Handle "it's just demand" ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'pg-r17-step2-correct',
    label: 'Reframe: peers are capturing the demand',
    description:
      "SME-prescribed handling of the Money-in-Bank / demand excuse: your sell-through is behind because other properties are capturing the demand. Travelers show interest but drop off right before booking because your search price sits above competitors.",
    playerDialogue:
      "It's tempting to read it as demand, but your sell-through is behind because other properties are capturing that same demand. Travelers do show interest in you - they just drop off right before booking, because your search price is sitting above your competitors'.",
    partnerResponse:
      "How much higher? I'm not going to start a price war and slash our rates just to match competitors.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r17-step2-agree-demand',
    label: "Agree it's probably the market",
    description:
      "Concedes the demand excuse - if it's just a soft market, there's nothing to fix, and the diagnosis stalls before the real segment gap surfaces.",
    playerDialogue:
      "You could well be right - demand is softer just about everywhere at the moment, so honestly a good part of this is probably just the market cooling off rather than anything on your side. Most properties are feeling the same squeeze, so I'd say we ride it out.",
    partnerResponse:
      "Good, that's what I thought. So we ride it out until demand picks back up.",
    styleMatch: { red: 0, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r17-step2-ranking-threat',
    label: 'Warn his ranking will keep slipping',
    description:
      'Turns the gap into a threat - stay priced high and the platform keeps dropping you. Threatening ranking as a consequence of his pricing is off-side in every regime.',
    playerDialogue:
      "Here's the reality: for as long as you're priced above your peers, the platform is going to keep sliding you further down the search results, and once that slide starts it's hard to pull back. You won't just lose this quarter - you'll lose visibility it took you years to build.",
    partnerResponse:
      "So drop my price or you sink my ranking. That's not the partnership I signed up for.",
    styleMatch: { red: 0, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

// ───────── Step 3 - Handle the price-war fear ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'pg-r17-step3-correct',
    label: 'Rule out a price war, point to a segment',
    description:
      "SME-prescribed handling: a price war isn't the recommendation. The gap is only around 5% overall, but it concentrates in specific high-value segments - the goal is to recover conversion and reduce unsold inventory there, not to cut rates across the board.",
    playerDialogue:
      "A price war isn't what I'd recommend at all. The overall gap is only around 5%, but it lands hardest on specific high-value segments - that's where the demand is hardest to convert. The aim is to recover that conversion and reduce your unsold inventory, not to touch your rate everywhere.",
    partnerResponse:
      "Alright. So where does this gap actually sit in the data?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r17-step3-downplay-gap',
    label: 'Wave off the gap as tiny',
    description:
      "Right that it's not a full price war, wrong emphasis - calling a 5% gap 'barely anything' undersells the very segment problem you need him to act on, and a data-led operator will simply agree it's not worth his time.",
    playerDialogue:
      "Honestly it's only about 5%, so it's really not a big deal in the grand scheme of things - a small nudge here or there would sort it out if you ever fancied it, but I wouldn't lose any sleep over a number that size. Plenty of properties sit around that gap and do perfectly well, so it's very much a take-it-or-leave-it thing.",
    partnerResponse:
      "If it's that small, then I'll leave it - no point fiddling with my rates over a rounding error.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'pg-r17-step3-match-comp',
    label: 'Tell him to match his competitors',
    description:
      'Answers the "how much?" by telling him to bring his rate down to his competitors\'. Requiring a partner to match competitors on price oversteps in every regime.',
    playerDialogue:
      "It's about 5% - so the straightforward move is to bring your rate down that 5% and line yourself right up with what your competitors are charging. Once you're matched to them on price the bookings will follow, because there'll be nothing left holding those travelers back from choosing you over the property next door.",
    partnerResponse:
      "That's the price war I just told you I won't fight. Matching everyone else isn't a strategy.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

// ───────── Step 4 - Locate the gap in family searches ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'pg-r17-step4-correct',
    label: 'Name the European family-search gap',
    description:
      "SME-prescribed diagnosis: the gap is concentrated in European family searches, where the search price runs 12% higher because children are currently charged as adults from a misconfiguration in the extranet.",
    playerDialogue:
      "It's concentrated in European family searches. For those queries your search price comes up about 12% higher than your peer group - because children are currently being charged as adults, from a misconfiguration in your extranet. That 12% is what pushes those bookers to abandon and pick a competitor.",
    partnerResponse:
      "Sorry Diego, I thought we already worked on the family segment to make the property attractive for families - it's a high-spending, growing segment. Is that still not working properly?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r17-step4-vague-segment',
    label: "Say it's \"various segments\"",
    description:
      "Right that it's segment-specific, wrong precision - 'it's spread across a few segments' denies a data-led operator the one concrete, fixable target and sounds like hedging.",
    playerDialogue:
      "It's honestly hard to pin down to one single thing - it's really spread across a few different traveler segments where you're coming up a bit more expensive than your peers. Broadly speaking you're just a little less competitive than you'd ideally want to be, so it's more of a general pattern than one specific gap I can point to.",
    partnerResponse:
      "'A few segments' and 'broadly' doesn't give me anything to act on. Where exactly is the money going?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'pg-r17-step4-blame-him',
    label: 'Blame him for a sloppy setup',
    description:
      "Right that there's a config issue, wrong delivery - framing it as his team's carelessness puts a collaborative partner on the defensive instead of teaming up on the fix.",
    playerDialogue:
      "Frankly, this is exactly the sort of setup your own team really should have caught long before now - your family rates are a bit of a mess, and that carelessness has quietly been costing you bookings for quite a while. A closer eye on the extranet configuration would have flagged it long ago.",
    partnerResponse:
      "A mess? We put real work into that setup. I don't appreciate the tone.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
];

// ───────── Step 5 - It's the missing EEA country rate ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'pg-r17-step5-correct',
    label: "Clarify it's the missing EEA country rate",
    description:
      "SME-prescribed handling: it's not the family rates alone - the gap is driven by the missing EEA Country Rate, which is the market most of these families are booking from right now.",
    playerDialogue:
      "It's not the family rates on their own. The gap is really driven by a missing EEA Country Rate - and the EEA is exactly the market most of these families are booking from at the moment. So even with the family setup fixed, that market is where you're coming up short.",
    partnerResponse:
      "That makes sense from a data perspective. But a 12% gap is quite high - how do we close it without applying higher discounts?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r17-step5-just-family-rate',
    label: 'Say the family rate fix alone will do it',
    description:
      "Right that families are the segment, wrong root cause - pinning it all on the family-rate setup misses the missing EEA country rate, so the fix he'd make wouldn't actually close the gap.",
    playerDialogue:
      "You've basically got it already - just go back and re-check your family rate configuration end to end, make sure the child settings are right, and that on its own should be enough to close the whole gap. Once the family setup is clean I'd expect those European bookers to start converting again.",
    partnerResponse:
      "We've been over the family config already, though. If that were the whole story, wouldn't it be fixed by now?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'pg-r17-step5-deep-discount',
    label: 'Suggest a deep EEA discount to force it',
    description:
      "Right market, wrong dose - reaching for a large blanket EEA discount to 'guarantee' the gap closes is exactly the higher-discount move he's trying to avoid, and overshoots the targeted tool.",
    playerDialogue:
      "The safest way to be really sure is to put a solid discount across the whole EEA market - not a targeted tweak but a proper blanket cut for that region. If you go big enough on it, the gap closes for certain and you don't have to worry about whether it was quite enough.",
    partnerResponse:
      "That's the higher-discount route I just said I want to avoid. There must be a smarter way than that.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 6 - The non-stacking Country Rate + close ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'pg-r17-step6-correct',
    label: 'Explain the non-stacking logic and close',
    description:
      "SME-prescribed close: it's easier than it looks. He already runs a mobile rate (a 10% mobile discount), and Country Rates don't stack with it - so an EEA Country Rate simply opens the same door to European families booking on desktop, at the same discount, with nothing added on top. He can still fence it by dates, rate plans or minimum stays.",
    playerDialogue:
      "It's easier than it seems. You already run a mobile rate - a 10% discount on mobile bookings - and Country Rates don't stack with it. So an EEA Country Rate just opens the same door to European families booking on desktop, at the same discount, with nothing added on top. And you can still fence it by stay dates, rate plans or minimum stays. Let's switch it on and review the European family recovery next time.",
    partnerResponse:
      "Ok, now it's clearer - and I got very good results from that mobile rate, so I'll give this a try too. Let's monitor it and see you next time.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'pg-r17-step6-stack-scare',
    label: 'Gloss over how it interacts with the mobile rate',
    description:
      "He's cost-conscious about stacking discounts - not explaining that Country Rates don't stack with his mobile rate leaves the exact worry ('am I doubling my discount?') unanswered, and a data-led operator won't switch it on blind.",
    playerDialogue:
      "Just go ahead and switch the Country Rate on - honestly, I wouldn't worry too much about how it interacts with your mobile rate or any of your other rates, it tends to sort itself out once it's live. Plenty of partners just turn it on and monitor the results from there rather than getting bogged down in the mechanics up front. Get it live, keep an eye on the European family bookings, and we can always fine-tune it later if anything looks off.",
    partnerResponse:
      "'Don't worry about it' is how I end up double-discounting. Does it stack with my mobile rate or not?",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r17-step6-widen-now',
    label: 'Push to widen it past the EEA immediately',
    description:
      "Uses the opening to reach for more - roll the Country Rate out to every market now. Overshoots the targeted EEA-family fix and reopens the blanket-discount worry.",
    playerDialogue:
      "Great - and honestly, let's not stop at the EEA while we've got the momentum. If a Country Rate works for European families, there's no reason to keep it boxed in there - let's roll country rates out across every one of your source markets at once, top to bottom, so we really move the numbers this quarter instead of nudging one segment. Switch the whole lot on together and you'll see a much bigger swing than tinkering with just the EEA on its own.",
    partnerResponse:
      "Slow down - I agreed to try the EEA one for the family gap, not to discount every market at once.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: 'Set the OTA noise aside, open on the signal',
    partnerPrompt:
      "Good afternoon, Diego. Yes, I have our PMS open. But to be frank, I'm still dealing with a lot of noise from other OTAs complaining about price competitiveness, even though I give everyone the exact same rate. That really bothers me given the operational effort it takes. I hope you're not bringing the same thing here...",
    options: step1Options,
  },
  {
    id: 'demand-excuse',
    label: "Handle \"it's just demand\"",
    partnerPrompt:
      "21% unsold inventory... Let's look at the broader picture, Diego. Our page views are positive, and when guests land on our page our conversion is solid. If our sell-through is slow, isn't that just a consequence of the general drop in demand?",
    options: step2Options,
  },
  {
    id: 'price-war',
    label: 'Handle the price-war fear',
    partnerPrompt:
      "How much higher? I'm not going to start a price war and slash our rates just to match competitors.",
    options: step3Options,
  },
  {
    id: 'family-gap',
    label: 'Locate the gap in family searches',
    partnerPrompt:
      "Alright. So where does this gap actually sit in the data?",
    options: step4Options,
  },
  {
    id: 'eea-country-rate',
    label: "It's the missing EEA country rate",
    partnerPrompt:
      "Sorry Diego, I thought we already worked on the family segment to make the property attractive for families - it's a high-spending, growing segment. Is that still not working properly?",
    options: step5Options,
  },
  {
    id: 'close',
    label: 'The non-stacking Country Rate + close',
    partnerPrompt:
      "That makes sense from a data perspective. But a 12% gap is quite high - how do we close it without applying higher discounts?",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for palace-grand-none/
 * -narrow/-wide at round 17 in branchingScenarios.ts.
 */
export function palaceGrandR17(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 17,
    issueTreePath: palaceGrandR7IssueTreePath,
    openingAm,
    steps,
  };
}
