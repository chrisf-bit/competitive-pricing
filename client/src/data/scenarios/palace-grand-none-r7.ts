import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { palaceGrandR7IssueTreePath } from './palace-grand-base';

/**
 * Palace Grand Resort - Round 7 - No Parity variant.
 *
 * Source: SME "Round 7" doc, Conversation 3 (No Parity). More
 * collaborative in tone: Ethan raises the numbers himself and asks to
 * look together. The AM cannot ask for parity or matching and cannot
 * require a lower price; the compliant ask is for his best available
 * price, with his distribution autonomy preserved, and any discrepancy is
 * raised reactively and neutrally. The threads land as: correct the Same
 * Net logic via autonomy + best-price-as-investment, open the family
 * value, pitch accurate child rates and cots without discounting, then
 * fix the misconfigured mobile rate. Violations are taught via required
 * matching / cheapest and ranking threats, never parity language.
 */

const openingAm =
  "Hi Ethan! Great to connect with you today. How can we collaborate to help drive revenue for your property as we look at the goals for this year?";

// ───────── Step 1 - Reveal the gap and probe neutrally ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'pg-r7-none-step1-correct',
    label: 'Name the gap, where it concentrates, and ask if it is intentional',
    description:
      "SME-prescribed reveal: the property converts incredibly well, but its prices often appear uncompetitive, a gap that has grown over the last month and concentrates on mobile and family searches. Close with a neutral, reactive question - is that part of his strategy?",
    playerDialogue:
      "Let's have a look. While the property converts incredibly well once guests arrive, your prices on the platform often appear less attractive. That gap has increased over the last month, and it's concentrated when travelers search on mobile, or when families look for accommodation. Is that part of your strategy?",
    partnerResponse:
      "Yes, I see those specific gaps in our reports. To be completely transparent, my boss has a very firm strategy across all OTAs - he gives everyone the same rates, so when other platforms cut their margins or offer coupons, he feels it's not our problem and that Booking.com should do the same to stay competitive.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-none-step1-drop-price',
    label: 'Press him to lower his public price',
    description:
      "Skip the diagnosis and push him to bring his price down. It presumes the fix, and pressuring a lower price isn't permitted in a No Parity market.",
    playerDialogue:
      "Honestly, the quickest way to turn this around is to bring your public price here down until you're clearly competitive again. Once your price on the platform sits below where you are now, the searches that pass you by today will start converting, and the whole gap closes on its own without us needing to dig any deeper.",
    partnerResponse:
      "You're telling me to cut my price before we've even looked at the problem together. Let's slow down.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -5,
  },
  {
    id: 'pg-r7-none-step1-fluff',
    label: 'Reassure him it will pass',
    description:
      'Warm but empty - he came with the data and asked to work through it together; brushing it off reads as unserious.',
    playerDialogue:
      "I really wouldn't worry too much about this - a dip like the one you're seeing tends to even out over the quarter more or less on its own. These things move in cycles, and once the season turns the searches usually come back without us having to change very much at all. Let's give it a bit of time before reading too much into it.",
    partnerResponse:
      "I came to you with the data and asked to look at it together. 'It'll even out' isn't that.",
    styleMatch: { red: -1, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -6,
  },
];

const step1: BranchingStep = {
  id: 'reveal',
  label: 'Reveal the gap and probe neutrally',
  partnerPrompt:
    "Hi Diego! Great to hear from you. I've been looking over the performance report and I'm a bit concerned - our conversion is amazing, but our total page views have dropped by 53%. I'd love to look at the data together to see how we can turn this around.",
  options: step1Options,
};

// ───────── Step 2 - Handle Same Net via autonomy + best price ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'pg-r7-none-step2-correct',
    label: 'Affirm his autonomy; frame best price as an investment',
    description:
      "SME-prescribed handle: he's completely free to choose his distribution strategy, but adjusting it could capture more demand against similar properties. Cross-channel discrepancies confuse guests, and offering his best price here is an investment in high-value audience acquisition without devaluing his brand.",
    playerDialogue:
      "You're completely free to choose your distribution strategy, but adjusting it could help you capture more demand against similar properties on Booking.com. Offering your best price here acts as an investment in high-value audience acquisition, without devaluing your brand's market position.",
    partnerResponse:
      "That makes sense - it's about protecting brand value. But what about the family segment? We intentionally push back on offering family rooms on OTAs because of the operational complexity of handling extra beds and cots.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-none-step2-concede',
    label: 'Agree the same-net approach is fine',
    description:
      "Concedes the Same Net premise instead of reframing it - if you agree it's not his problem when competitors discount, there's nothing left to fix and the visibility gap stands.",
    playerDialogue:
      "That's fair enough, honestly - if your boss gives everyone the same rate across the board, then the competitors cutting their own margins or throwing coupons around really isn't something you should have to answer for. You're holding a consistent line, which is a perfectly reasonable way to run things, and it's hard to argue you're the one who needs to move when they're the ones discounting.",
    partnerResponse:
      "So we agree the approach is fine? Then I'm not sure what we're fixing.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r7-none-step2-require-match',
    label: 'Tell him he has to match the competitor',
    description:
      "In a No Parity market you cannot require the partner to match external prices or bring his rate down to a competitor's. Telling him he has to match is a compliance breach.",
    playerDialogue:
      "Realistically, you'll need to bring your prices down to match exactly what that competitor is doing, because that's the only way to stay in the game on the platform here. If they move, you move with them, and if they cut again, you cut again to line up with them - matching them step for step is what it takes to keep pace and stop the searches sliding over to their listing instead of yours.",
    partnerResponse:
      "So the ask is that I have to match them? I didn't think that was something you could require.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

const step2: BranchingStep = {
  id: 'same-net',
  label: 'Handle Same Net via autonomy + best price',
  partnerPrompt:
    "Yes, I see those specific gaps in our reports. To be completely transparent, my boss has a very firm strategy across all OTAs - he gives everyone the same rates, so when other platforms cut their margins or offer coupons, he feels it's not our problem and that Booking.com should do the same to stay competitive.",
  options: step2Options,
};

// ───────── Step 3 - Open the family value ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'pg-r7-none-step3-correct',
    label: 'Validate the ops concern, then pitch the family value',
    description:
      "SME-prescribed handle: acknowledge the operational concern is valid, then look at the 'why' - families spend more, stay longer, grow nearly twice as fast, and are 24% more likely to leave a review. A lever for occupancy and higher ADR.",
    playerDialogue:
      "Those operational concerns are completely valid. But look at the 'why' behind capturing this segment - families tend to spend more, stay longer, grow nearly twice as fast as other segments, and are 24% more likely to leave a review. They can genuinely help you maximize occupancy and drive a higher ADR.",
    partnerResponse:
      "There's a major revenue opportunity we're not capturing there. We do try to attract families through marketing campaigns and dedicated value-adds - in peak season it's a good investment, but when low season approaches we see a decrease.",
    styleMatch: { red: 0, yellow: 0, green: 2, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-none-step3-discount',
    label: 'Pivot to discounting the family rooms',
    description:
      "Right segment, wrong lever - it jumps to a price cut rather than the value case, dismisses his operational worry, and sets up a discounting expectation you'll have to walk back.",
    playerDialogue:
      "The easiest thing here is to put a straightforward discount on your family rooms and let the lower price do the work - drop what you're charging families a little, feature it, and the bookings from that segment will start coming through. Once the price is attractive enough, the families will find you and fill those rooms.",
    partnerResponse:
      "You've skipped straight past the operational side and gone to discounting. That's not landing for me.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r7-none-step3-dictate',
    label: 'Dismiss the ops concern and dictate the strategy',
    description:
      "Wave away his operational worry and tell him to open the family rooms regardless. Dictating his distribution and brushing off a real concern burns the collaboration this operator responds to.",
    playerDialogue:
      "The operational stuff is honestly a bit of a non-issue - you just need to open all of your family rooms to us and stop overthinking the beds and cots side of it. Plenty of properties handle more complexity than this without any fuss, so the simplest move is to just switch the whole family inventory on for us and let it run.",
    partnerResponse:
      "The operational stuff is my day job, not a non-issue. Waving it away doesn't help me.",
    styleMatch: { red: 0, yellow: -1, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'borderline',
    trustChange: -10,
  },
];

const step3: BranchingStep = {
  id: 'family-value',
  label: 'Open the family value',
  partnerPrompt:
    "That makes sense - it's about protecting brand value. But what about the family segment? We intentionally push back on offering family rooms on OTAs because of the operational complexity of handling extra beds and cots.",
  options: step3Options,
};

// ───────── Step 4 - Pitch the family setup without discounting ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'pg-r7-none-step4-correct',
    label: 'Channel incremental demand via accurate child rates and cots',
    description:
      "SME-prescribed handle: the platform channels incremental demand, especially in low season. His distribution strategy is entirely up to him, but offering accurate child rates and cots lets him capture that value without discounting his rates.",
    playerDialogue:
      "That's exactly where our platform makes the difference - we can channel incremental demand to your property, especially in that low season. Your distribution strategy is entirely up to you, but by offering accurate child rates and cots here, you can capture that value without discounting your rates.",
    partnerResponse:
      "This aligns perfectly with our goal of making data-driven decisions to optimize the channel mix. If we can capture that high-spending family segment safely, that's already an impactful step forward. Let's test it.",
    styleMatch: { red: 1, yellow: 0, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'pg-r7-none-step4-blanket-drop',
    label: 'Suggest a blanket family price drop instead',
    description:
      "Right that the family setup is the opportunity, wrong route - a blanket family discount contradicts the 'without discounting' framing and erodes the ADR the family segment is supposed to lift.",
    playerDialogue:
      "The simplest path here is to just knock a decent chunk off all of your family rates for the low season and let the volume take care of itself. Once those family rooms are clearly the cheaper option through that quieter stretch, the bookings tend to follow on their own, and you can bring the rates back up again as soon as demand picks up.",
    partnerResponse:
      "Discounting everything is exactly what I'm trying to avoid. I thought this was about setup, not price cuts.",
    styleMatch: { red: 0, yellow: 0, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'pg-r7-none-step4-cheapest',
    label: 'Tell him he must be the cheapest for families',
    description:
      "Turn a setup pitch into a requirement to be the lowest price for families. Requiring the cheapest rate pressures a price reduction, which isn't permitted in a No Parity market.",
    playerDialogue:
      "Honestly, to really win the family segment you'll need to make sure you come out as the cheapest option for them anywhere on our platform - that's simply what it takes. If a comparable property is showing families a lower number than you are, they'll book that one every time, so your family rooms have to sit right at the bottom of the list.",
    partnerResponse:
      "Now it's 'be the cheapest'? That's the price war I was told we weren't having.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
];

const step4: BranchingStep = {
  id: 'family-setup',
  label: 'Pitch the family setup without discounting',
  partnerPrompt:
    "There's a major revenue opportunity we're not capturing there. We do try to attract families through marketing campaigns and dedicated value-adds - in peak season it's a good investment, but when low season approaches we see a decrease.",
  options: step4Options,
};

// ───────── Step 5 - Fix the mobile rate and close ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'pg-r7-none-step5-correct',
    label: 'Offer to reopen the blocked mobile rate together',
    description:
      "SME-prescribed close: he's already activated a mobile rate, but several rate plans and dates are blocked on it, so he's losing high-value mobile bookings. Offer to optimize it with him so it isn't leaving demand on the table.",
    playerDialogue:
      "One more thing we can do straight away - you've already activated a mobile rate, but there are several rate plans and dates blocked on it, so you're losing some high-value mobile bookings. Shall we optimize that together so it's actually working for you?",
    partnerResponse:
      "You're right, we just forgot to update this - I'll take care of it. Thanks for flagging it, Diego!",
    styleMatch: { red: 1, yellow: 1, green: 2, blue: 1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 8,
    optimal: true,
  },
  {
    id: 'pg-r7-none-step5-defer',
    label: 'Leave the mobile rate for another day',
    description:
      "Right lever, lost momentum - flagging the blocked mobile rate and then parking it drops the do-it-now energy that just got him to yes, and the exclusions keep costing him bookings.",
    playerDialogue:
      "There's also a mobile rate on here that could genuinely use a proper look at some point, but honestly that feels like a job for another day rather than right now - we've already covered a lot in this call, and I'd rather not pile too much onto you all at once.",
    partnerResponse:
      "Alright, though if it's costing me bookings now, I'm not sure why we'd leave it.",
    styleMatch: { red: -1, yellow: 0, green: 0, blue: -1 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'pg-r7-none-step5-threat',
    label: 'Warn his ranking suffers until he fixes it',
    description:
      "Threaten continued suppression unless he fixes the mobile rate. Tying visibility to a pricing action as a threat is banned in every regime and especially toxic in No Parity.",
    playerDialogue:
      "Just so you're aware, until that mobile rate is properly fixed our system is going to keep your property sitting lower down in the search results than it otherwise would - so the sooner you get it sorted the better it'll be for where you show up.",
    partnerResponse:
      "Threatening my visibility to get me to move is not the note I wanted to end on.",
    styleMatch: { red: 1, yellow: -2, green: -2, blue: -2 },
    assertiveness: 3,
    compliance: 'risky',
    trustChange: -14,
  },
];

const step5: BranchingStep = {
  id: 'close',
  label: 'Fix the mobile rate and close',
  partnerPrompt:
    "This aligns perfectly with our goal of making data-driven decisions to optimize the channel mix. If we can capture that high-spending family segment safely, that's already an impactful step forward. Let's test it.",
  options: step5Options,
};

// ───────── Assembled tree ─────────

export const palaceGrandNoneR7: BranchingConversationTree = {
  conversationShape: 'branching',
  partnerId: 'palace-grand-none',
  round: 7,
  issueTreePath: palaceGrandR7IssueTreePath,
  openingAm,
  steps: [step1, step2, step3, step4, step5],
};
