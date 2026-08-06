import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { oceanViewR3IssueTreePath } from './ocean-view-base';

/**
 * Ocean View Resort - Round 13 (Level 2 / On-Platform Competitiveness).
 *
 * Source: SME "Round 13" doc, OPC Conversation Example 6 (Ocean View
 * Resort, Hotel ID 60). Follow-up to the Round 3 call - Camila Ross,
 * warm and family-focused, running several vacation rentals (blue/red:
 * accuracy-driven but relationship-led). She believes she's already
 * highly competitive (priced ~3% below her comp set), so the unsold
 * rooms confuse her. The real cause is a family-rate misconfiguration:
 * children are priced as adults, so the biggest search segment -
 * families - sees her as ~8% more expensive and books elsewhere.
 *
 * OPC objections in play: The "Too Unique" Comp-Set Refusal, The "Peer
 * Group" Credibility Gap, Connect the Metrics Gap, Internal vs External
 * Data ("my revenue team checked our setup, our rates are aggressive").
 * The win is a technical, no-price-drop setup fix for family rates -
 * reassuring her it never touches her adult ADR.
 *
 * Regime-neutral; safe across all three regimes. This scenario is a
 * setup/config fix, not a price ask, so the compliance surface is low.
 * Distractors teach violations via a naive "just drop your price" push
 * and a match-the-comp-set demand. No internal metric names in any
 * playerDialogue.
 */

const openingAm =
  'Good morning, Camila. Great to connect with you again. How are things going across your properties?';

// ───────── Step 1 - Acknowledge her focus, then the signal ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'ov-r13-step1-correct',
    label: 'Credit the guest-experience work, then flag the unsold rooms',
    description:
      "SME-prescribed open: acknowledge the family and long-stay welcome work she's proud of, then name the forward signal - close to half the rooms unsold last quarter and sell-through pacing well behind peers.",
    playerDialogue:
      "The welcome experience you've been building for families and long-stay guests really shows. I've looked at both your history and your forward pace, and there's one area where demand is getting stuck: around 45% of your rooms went unsold last quarter and your forward sell-through is pacing about 18% behind your peer group.",
    partnerResponse:
      "Oh dear... 45% unsold? That is concerning, Javier. But honestly, I find it confusing. My revenue team double-checked our setup, and overall our rates on your platform are very aggressive - we're consistently priced about 3% cheaper than our competitive set. If we're already cheaper than the competition, why aren't those rooms selling?",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r13-step1-straight-to-numbers',
    label: 'Go straight to the unsold-rooms number',
    description:
      "Right signal, cold open - leading with '45% unsold' and no acknowledgement of the work she just described lands as a scolding for a relationship-led partner, before she's ready to hear it.",
    playerDialogue:
      "Let's get into the numbers - 45% of your rooms went unsold last quarter and your pace is well behind peers. We need to talk about why that's happening.",
    partnerResponse:
      "That's a hard number to open with, Javier. We've been working hard on the guest experience - I'd have hoped you'd noticed that too.",
    styleMatch: { red: 1, yellow: -1, green: -2, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ov-r13-step1-drop-price',
    label: 'Suggest she drop her prices further',
    description:
      "Jumps to a price cut before diagnosing - and she's already priced below her comp set, so it's both premature and factually the wrong lever. The unsold rooms aren't a headline-price problem.",
    playerDialogue:
      "If the rooms aren't selling, the quickest lever is price - let's bring your rates down a bit further so you undercut the competition even more.",
    partnerResponse:
      "But we're already cheaper than our comp set. How would cutting further even help? That just gives away margin.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
];

// ───────── Step 2 - "We're cheaper, why not selling?" ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'ov-r13-step2-correct',
    label: 'Credit her price, then reveal the visibility gap',
    description:
      "SME-prescribed handling: validate that her headline competitiveness is real, then show the deeper signal - travelers are searching, but her visibility share is only 20% against a peer group at 30%, so a large share never see her listings at all.",
    playerDialogue:
      "You're right, and your commitment to staying competitive is visible in the headline price. But look one level deeper into what travelers actually see: your visibility share is sitting at just 20%, while your peers are at 30%. Travelers are coming to search, but a big portion of them never actually reach your listings.",
    partnerResponse:
      "Well... if our rates are lower, how is it possible that our visibility is dropping? Is the platform's algorithm placing us further down the results?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r13-step2-accept-cheaper',
    label: 'Accept her read and blame the market',
    description:
      "Takes her 'we're already cheaper' at face value and concludes it must be soft demand - abandoning the visibility signal that actually explains the gap.",
    playerDialogue:
      "You make a fair point - if you're already the cheapest, then it's probably just a slow patch in the market right now rather than anything in your setup.",
    partnerResponse:
      "That's a relief, honestly. So we just wait for demand to come back?",
    styleMatch: { red: 0, yellow: 1, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'ov-r13-step2-doubt-her-team',
    label: "Cast doubt on her revenue team's numbers",
    description:
      "Right that her internal read is incomplete, wrong delivery - implying her team got it wrong turns it into an internal-vs-external data fight instead of widening her view to the traveler's.",
    playerDialogue:
      "I'd take your revenue team's 'we're 3% cheaper' with a pinch of salt - our platform data tells a different story, and ours is the one travelers actually act on.",
    partnerResponse:
      "My team knows our pricing inside out. I'm not going to sit here and let you tell me their numbers are wrong.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
];

// ───────── Step 3 - The family-rate misconfiguration ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'ov-r13-step3-correct',
    label: 'Explain the family-search mechanism',
    description:
      "SME-prescribed diagnosis: it's about who is searching and how occupancy is calculated. A couple sees her competitive rate, but 40%+ of peak-season searches are families - and because family rates are misconfigured, children are priced as adults.",
    playerDialogue:
      "It comes down to who's searching and how your occupancy is calculated. A couple searching for two people does see your competitive rate. But over 40% of peak-season searches in your area come from families - and right now your family rates are misconfigured, so children are being priced as adults.",
    partnerResponse:
      "Wait... full adult price for a two-year-old child?",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r13-step3-algorithm-vague',
    label: 'Blame the ranking algorithm, vaguely',
    description:
      "Answers her 'is the algorithm burying us?' with a hand-wave about how ranking works - plausible, but it misses the concrete, fixable family-config cause and leaves her nothing to act on.",
    playerDialogue:
      "It's largely how the ranking works - the algorithm weighs a lot of signals, and yours net out lower than your peers, which is why fewer travelers see you.",
    partnerResponse:
      "So it's the algorithm's fault and there's nothing specific I can do? That's not much to work with.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ov-r13-step3-just-discount-families',
    label: 'Tell her to just discount for families',
    description:
      "Right segment, wrong fix - jumping to 'add a family discount' treats a broken configuration as a pricing problem, so it gives away margin instead of correcting the setup that's inflating the family price.",
    playerDialogue:
      "The fix is simple - put a discount on your family rates so families see a lower price and start booking again.",
    partnerResponse:
      "Discount the family rate? I don't want to erode my ADR further - we've only just recovered from the last price test.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
];

// ───────── Step 4 - Reassure: the fix doesn't touch ADR ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'ov-r13-step4-correct',
    label: 'Confirm it never touches her adult rate',
    description:
      "SME-prescribed handling of the ADR-dilution worry: correcting the child-rate configuration does not touch her rate or lower adult prices - it simply makes the family calculation fair, accurate and competitive.",
    playerDialogue:
      "I hear the concern completely. Correcting the child-rate configuration doesn't touch your rate or lower your prices for adults at all. It simply makes sure that when a parent searches for a family stay, the price they see is calculated fairly and accurately - nothing about your adult ADR changes.",
    partnerResponse:
      "Ok, I'm just checking, because after the price-alignment test last time I want to be sure we're not diluting our ADR any further. The results then were good, but we had no idea there was this family-rates issue sitting underneath...",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'ov-r13-step4-technical-jargon',
    label: 'Bury the reassurance in configuration jargon',
    description:
      "Right that it's a config fix, wrong delivery - walking a nervous partner through occupancy codes and age-bucket settings answers a reassurance question with complexity, feeding her 'operational nightmare' fear.",
    playerDialogue:
      "You'll just need to remap the occupancy codes, set the child age buckets per rate plan, and re-index the extra-bed logic across each unit - it's all in the extranet configuration.",
    partnerResponse:
      "That already sounds like the operational nightmare I was worried about across all our units.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: 0 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ov-r13-step4-overpromise',
    label: 'Promise the fix will lift her ranking',
    description:
      'Reassures her by promising the config fix will push her up the rankings. Promising a ranking reward in exchange for a change is a compliance breach in every regime.',
    playerDialogue:
      "And the best part - once you fix it, I can promise the algorithm rewards you with a ranking boost, so you'll climb straight back up the results.",
    partnerResponse:
      "A guaranteed ranking boost? That sounds too good to be true, and it makes me trust the rest less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -11,
  },
];

// ───────── Step 5 - Reframe as opening a locked door ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'ov-r13-step5-correct',
    label: 'Frame it as opening a door that was accidentally locked',
    description:
      "SME-prescribed reframe: it's a quick technical fix - like opening a door that was accidentally locked. Right now families search, assume the property isn't set up for them, and move on before they ever consider it.",
    playerDialogue:
      "Think of it as opening a door that was accidentally locked. It's a quick technical fix, not a big project. Right now, families are searching, seeing an inflated price, and assuming your property just isn't set up for them - so they move on before they ever really consider you.",
    partnerResponse:
      "I see... when you explain the traveler's journey like that, it makes complete sense. We certainly don't want families thinking we don't welcome them. But what kind of impact do you think we'll actually see on revenue?",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'ov-r13-step5-pressure-urgency',
    label: 'Pressure her that every day costs bookings',
    description:
      "Right that it matters, wrong tone - piling on urgency ('every day you wait you lose families') pressures a partner who's already on side and cuts against the calm, collaborative register that's working.",
    playerDialogue:
      "You need to move on this fast - every single day it stays broken, you're losing family bookings you can't get back. We should fix it today.",
    partnerResponse:
      "There's no need to rush me - I'm already hearing you. Let's keep this constructive.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ov-r13-step5-minimise',
    label: 'Downplay it as barely worth doing',
    description:
      "Undersells the fix as a minor tidy-up - which deflates the value and gives a partner nervous about effort an easy reason to deprioritise it.",
    playerDialogue:
      "It's honestly a small thing - a little housekeeping in the settings. Fix it whenever you get a spare moment, no rush.",
    partnerResponse:
      "If it's that minor, I'll probably just add it to the pile and get to it eventually.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 6 - Close on the family-segment value ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'ov-r13-step6-correct',
    label: 'Close on the family-segment value and a review',
    description:
      "SME-prescribed close: families spend more, stay longer, and are far more likely to leave positive reviews - a segment that directly supports her long-term goal of stable, repeatable guest relationships. Agree a review in two months.",
    playerDialogue:
      "Families tend to spend more, stay longer, and are around 24% more likely to leave a positive review - so this directly supports the stable, repeatable guest relationships you're building. Let's fix the configuration and set a review in two months to see how the family segment has grown.",
    partnerResponse:
      "Yes, I'd love that - a report over the next two months to see the impact, and something I can share with my team so that next year we're properly family-ready for peak season.",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'ov-r13-step6-no-followup',
    label: 'Fix it and move on with no review',
    description:
      "Lands the fix but sets no follow-up and never connects it to her goals - so a relationship-led partner is left without the shared scoreboard that would keep her invested.",
    playerDialogue:
      "Great, let's get the configuration corrected and that should sort the family bookings out. I'll leave you to it.",
    partnerResponse:
      "Alright... though it'd be nice to actually see whether it worked, and what it meant for us.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'ov-r13-step6-upsell-discount',
    label: 'Bolt on a broad discount push',
    description:
      "Uses the goodwill to reach for a general discount on top of the fix - reintroducing the ADR-dilution fear she just told you she's wary of, and muddying a clean config win.",
    playerDialogue:
      "Perfect - and while we're at it, let's add an across-the-board discount too, just to really accelerate the bookings back.",
    partnerResponse:
      "No - that's exactly the ADR dilution I told you I want to avoid. Let's keep it to the fix.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -7,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: 'Acknowledge her focus, then the signal',
    partnerPrompt:
      "Good morning, Javier. We're doing alright, thank you. We've been focusing a lot on our guest welcome experience lately - making sure our families and long-term guests feel completely at home. Though, to be honest, my team is still a bit anxious about our pace for the upcoming months. I was hoping the numbers on your platform are fine after our previous trial?",
    options: step1Options,
  },
  {
    id: 'cheaper-why',
    label: "'We're cheaper, why not selling?'",
    partnerPrompt:
      "Oh dear... 45% unsold? That is concerning, Javier. But honestly, I find it confusing. My revenue team double-checked our setup, and overall our rates on your platform are very aggressive - we're consistently priced about 3% cheaper than our competitive set. If we're already cheaper than the competition, why aren't those rooms selling?",
    options: step2Options,
  },
  {
    id: 'family-config',
    label: 'The family-rate misconfiguration',
    partnerPrompt:
      "Well... if our rates are lower, how is it possible that our visibility is dropping? Is the platform's algorithm placing us further down the results?",
    options: step3Options,
  },
  {
    id: 'reassure-adr',
    label: "Reassure: the fix doesn't touch ADR",
    partnerPrompt:
      "Wait... full adult price for a two-year-old child? I had no idea that was happening in the background. We love welcoming families, Javier, but configuring age categories across multiple rentals sounds like an operational nightmare. I worry my team will get confused, or worse, that we'll accidentally lower our adult rate.",
    options: step4Options,
  },
  {
    id: 'locked-door',
    label: 'Reframe as opening a locked door',
    partnerPrompt:
      "Ok, I'm just checking, because after the price-alignment test last time I want to be sure we're not diluting our ADR any further. The results then were good, but we had no idea there was this family-rates issue sitting underneath...",
    options: step5Options,
  },
  {
    id: 'close',
    label: 'Close on the family-segment value',
    partnerPrompt:
      "I see... when you explain the traveler's journey like that, it makes complete sense. We certainly don't want families thinking we don't welcome them. But what kind of impact do you think we'll actually see on revenue?",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for ocean-view-none/-narrow/
 * -wide at round 13 in branchingScenarios.ts.
 */
export function oceanViewR13(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 13,
    issueTreePath: oceanViewR3IssueTreePath,
    openingAm,
    steps,
  };
}
