import type {
  BranchingConversationTree,
  BranchingStep,
  BranchingOption,
} from '../../types';
import { oceanfrontR6IssueTreePath } from './oceanfront-base';

/**
 * Oceanfront Bliss Lodge - Round 16 (Level 2 / On-Platform
 * Competitiveness). Ends on a SOFT NO.
 *
 * Source: SME "Round 16" doc, OPC Conversation Example 8 (Oceanfront
 * Bliss Lodge, Hotel ID 132). Follow-up to the Round 6 call - Priya
 * Singh (blue/red), an owner whose loyalty programme is her main engine
 * and who leans on her own marketing to grow her direct site. She's
 * warm but sceptical of OTAs. The unlock is the billboard reframe
 * (exposure on the platform has no marketing cost) plus one concrete
 * segment: US travelers, where a +4% search-price gap is losing her
 * ~25% share. The fix is a fenced US Country Rate that never touches
 * her standard rates. She doesn't say yes - she defers, asking for
 * revenue projections to review next time (a soft no with the door
 * open).
 *
 * Because the outcome is scripted (she defers regardless), the star
 * grading is on the PROCESS - a compliant, well-diagnosed conversation
 * that earns the follow-up. The optimal close accepts the deferral
 * gracefully and sets up the next step rather than pushing for a yes.
 *
 * OPC objections in play: Internal vs External Data, The
 * "Traveler-Centric" Pivot, The "Fake Value" Trap (Genius Inflation).
 *
 * Regime-neutral; safe across all three regimes. No parity language, no
 * matching ask, no ranking threat, no guaranteed-result promise on the
 * optimal path. Distractors teach violations via dictating her external
 * marketing strategy and guaranteeing revenue. No internal metric names
 * in any playerDialogue.
 */

const openingAm =
  "Hi Priya, great to connect with you again! How have things been running at the property lately?";

// ───────── Step 1 - Credit the trial, name the sell-through gap ─────────

const step1Options: BranchingOption[] = [
  {
    id: 'of-r16-step1-correct',
    label: 'Credit the last trial, then flag forward sell-through',
    description:
      "SME-prescribed open: acknowledge the impressive result from last time's trial (offering her best price lifted conversion), then flag the forward signal - sell-through pacing about 12% behind her peer group over the next 3 months.",
    playerDialogue:
      "First, I want to acknowledge that the trial last time had a genuinely impressive outcome - offering your best price here clearly lifted your conversion. Building on that, when I look at the next 3 months, your sell-through is pacing about 12% behind your peer group.",
    partnerResponse:
      "Okay, but that isn't alarming for us during low-demand periods. Honestly, we'd rather keep those rooms unbooked for a few extra days than do anything that compromises our rates on OTAs.",
    styleMatch: { red: 2, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'of-r16-step1-ignore-trial',
    label: 'Skip the trial and lead with the shortfall',
    description:
      "Right metric, missing the bridge - jumping straight to 'you're 12% behind' without crediting the trial she ran last time reads as ungrateful to a partner who took a chance for you, and puts her on the defensive.",
    playerDialogue:
      "Let's get straight to it today, because the number that matters is this: your sell-through is running about 12% behind your peer group over the next quarter, and that pacing gap is really the whole reason I wanted to talk. That's the shortfall we need to work through together right now.",
    partnerResponse:
      "Straight to the shortfall, then. We tried something for you last time - I'd hoped we'd start there.",
    styleMatch: { red: 1, yellow: -1, green: -1, blue: 0 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -4,
  },
  {
    id: 'of-r16-step1-cut-rates',
    label: 'Open by asking her to lower rates',
    description:
      "Prescribes a rate cut before diagnosing - and she's just told you she'd rather hold rooms empty than compromise her OTA rates, so it lands as exactly the move she guards against.",
    playerDialogue:
      "The pace is running behind, so honestly the cleanest fix here is to bring your public rates down a little and get yourself more competitive on the platform. If we shave a bit off those rates now, I'd expect those rooms to start moving and the whole gap to close up fairly quickly.",
    partnerResponse:
      "Lower our public rates? That's the one thing I've said we won't do to protect our direct guests. No.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'borderline',
    trustChange: -8,
  },
];

// ───────── Step 2 - Probe: website-only or general visibility? ─────────

const step2Options: BranchingOption[] = [
  {
    id: 'of-r16-step2-correct',
    label: 'Ask whether she wants visibility from anywhere',
    description:
      "SME-prescribed handling: a probing question rather than a pitch - is her marketing push strictly for her own website, or is she really after a general lift in visibility, wherever it comes from? Meets her where she is before reframing.",
    playerDialogue:
      "I respect that. Let me ask you this, though - the marketing campaigns you mentioned: are they strictly to grow your own website, or are you really after a general increase in visibility, no matter where the guest first finds you?",
    partnerResponse:
      "Well, we run ads in a few key overseas markets, and our loyalty programme captures the repeat visitors. I'm not chasing visibility on OTAs, to be honest - I'd like to see our own website growing right now.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'of-r16-step2-tell-shift-spend',
    label: 'Tell her to redirect her ad budget',
    description:
      "Dictates how she should run her own marketing - shift spend off her overseas ads and onto the platform. Directing a partner's external marketing and distribution strategy oversteps in every regime.",
    playerDialogue:
      "Honestly, those overseas ad campaigns are wasted spend, and you'd see far more return by pulling that budget out of them and putting it into building up your presence on our platform instead. That's where I'd redirect the marketing money if I were you.",
    partnerResponse:
      "My marketing budget is my business, Kai. I didn't ask you to redraw it.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -12,
  },
  {
    id: 'of-r16-step2-accept-website',
    label: 'Accept she only cares about her website',
    description:
      "Takes 'I only want my website to grow' at face value and drops the thread - forfeiting the billboard reframe that would have shown the platform serving that same goal.",
    playerDialogue:
      "That's completely fair, and I understand where you're coming from - if the priority right now is growing your own website, then I get that OTAs simply aren't where you want to put your energy at the moment, and I won't push you on that today.",
    partnerResponse:
      "Right, exactly. So I'm not sure there's much for us to change here today.",
    styleMatch: { red: 0, yellow: 1, green: 1, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
];

// ───────── Step 3 - The billboard reframe ─────────

const step3Options: BranchingOption[] = [
  {
    id: 'of-r16-step3-correct',
    label: 'Reframe the platform as a zero-cost billboard',
    description:
      "SME-prescribed reframe: her ad push builds awareness, but exposure on the platform carries no marketing cost - it acts as a global search engine where up to 90% of travelers discover a property first. That discovery serves her own revenue goals, not just OTA bookings.",
    playerDialogue:
      "That marketing push definitely builds awareness. But consider this: exposure on our platform costs you nothing in marketing spend. We act as a global search engine where up to 90% of travelers discover a property first - and you can use that discovery to serve your own revenue goals, not just ours.",
    partnerResponse:
      "I know, but we also want to be the ones who are discovered first, so we can attract guests with our loyalty programme and exclusive member value-adds.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'of-r16-step3-dismiss-marketing',
    label: 'Dismiss her marketing as ineffective',
    description:
      "Right that the platform adds reach, wrong delivery - telling her that her own campaigns don't really work belittles the strategy she's invested in and makes a proud owner defend rather than listen.",
    playerDialogue:
      "The honest truth here is that those campaigns of yours just aren't really moving the needle for you the way you think they are - and that's exactly why those rooms are sitting empty at the end of the day. What you actually need is our reach behind you, not more of your own advertising.",
    partnerResponse:
      "Our campaigns are doing exactly what we built them to do. I won't have them written off like that.",
    styleMatch: { red: -1, yellow: -2, green: -2, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -7,
  },
  {
    id: 'of-r16-step3-generic-reach',
    label: 'Pitch platform reach in the abstract',
    description:
      "Right idea, no traction - a generic 'we have huge reach' line without the zero-marketing-cost angle or a concrete number sounds like a sales boast to a data-led owner and doesn't connect to her goal.",
    playerDialogue:
      "Honestly, you should really be leaning into us a lot more than you are - we have enormous global reach and an audience that's far, far bigger than anything you could ever hope to reach on your own. There's a whole world of travelers out there and we're the ones who can put you in front of them.",
    partnerResponse:
      "Every platform tells me they're the biggest. That on its own doesn't change my plan.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
];

// ───────── Step 4 - Connect to the US segment ─────────

const step4Options: BranchingOption[] = [
  {
    id: 'of-r16-step4-correct',
    label: 'Zoom into the US-traveler share loss',
    description:
      "SME-prescribed handling: zoom from the general to one concrete segment. For international traffic over the next 3 months - specifically US travelers - a +4% search-price gap versus peers is likely costing her about 25% share.",
    playerDialogue:
      "Here's where it gets concrete. Zoom into your international traffic for the next 3 months, specifically US travelers: a search price about 4% above your peer group is likely costing you around 25% of that share. These are guests actively searching your area.",
    partnerResponse:
      "Wait - so those are actual US travelers booking other properties nearby, just because they don't see our page?",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'of-r16-step4-stay-general',
    label: 'Keep it at the whole-portfolio level',
    description:
      "Right that she's losing share, wrong altitude - keeping it at 'you're losing bookings overall' misses the one specific, high-value segment that actually makes her sit up, which is the whole point of the pivot.",
    playerDialogue:
      "When you look across the board, that price gap is costing you bookings all over the place - bookings you really should be winning here. It's a broad drag weighing on your whole performance on the platform, and it's showing up everywhere I look, not in any one corner of your business.",
    partnerResponse:
      "'Across the board' just sounds like the general discount case again. I need something more specific than that.",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -3,
  },
  {
    id: 'of-r16-step4-inflate-number',
    label: 'Overstate the loss to force urgency',
    description:
      "Inflates the share loss well past the data to shock her into acting - a numbers-led owner will check the figure, catch the exaggeration, and trust the rest of your case less.",
    playerDialogue:
      "Look, the reality is you're basically losing the entire US market right now - we're talking close to half of all those travelers booking somewhere else instead of with you. It's a genuine haemorrhage of business that only gets worse the longer you leave it.",
    partnerResponse:
      "Half? That's not what your own data said a moment ago. Let's stick to the real number.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -5,
  },
];

// ───────── Step 5 - Fenced US Country Rate, no rate change ─────────

const step5Options: BranchingOption[] = [
  {
    id: 'of-r16-step5-correct',
    label: 'Offer a fenced US Country Rate that leaves rates untouched',
    description:
      "SME-prescribed handling of the 'rate adjustment means across-the-board discount' fear: capture those US searchers without touching her rates. A US Country Rate applies a closed incentive strictly to US travelers, while her domestic market keeps seeing the standard rate.",
    playerDialogue:
      "Here's the key: we can capture those US searchers without touching your rates. A US Country Rate applies a closed incentive strictly to travelers searching from the US, while your domestic market - and your direct guests - keep seeing your standard rate exactly as it is.",
    partnerResponse:
      "Okay, that sounds nice, but what are the guaranteed results? We've tried promotional tags before and it honestly felt like we just gave away margin without any clear surge in net revenue.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: 7,
    optimal: true,
  },
  {
    id: 'of-r16-step5-public-discount',
    label: 'Offer a small public discount instead',
    description:
      "Right that she needs to be more competitive to US travelers, wrong instrument - a public discount is visible to her direct guests too, which is the exact thing she said she won't open up.",
    playerDialogue:
      "Let's keep this simple and just put a small discount on your public rates - modest enough to protect your margin but still enough to win those US travelers back onto your page. A little movement on the headline price is honestly the quickest way to get those searchers converting again.",
    partnerResponse:
      "A public discount is visible to my direct guests, Kai. That's precisely what I told you I won't do.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 2,
    compliance: 'safe',
    trustChange: -5,
  },
  {
    id: 'of-r16-step5-guarantee-revenue',
    label: 'Promise a guaranteed revenue lift',
    description:
      "Answers her results question with a guaranteed revenue promise - exactly the specific-reward promise compliance forbids, and a red flag to an owner already burned by promo tags.",
    playerDialogue:
      "I can promise you this one will absolutely deliver - a guaranteed lift in net revenue coming straight from that US segment, no question about it whatsoever. Put it live and you'll see the return; honestly, this is one you can take right to the bank and count on.",
    partnerResponse:
      "The last people who 'guaranteed' me a lift cost me margin. A promise like that makes me trust it less, not more.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -2 },
    assertiveness: 2,
    compliance: 'risky',
    trustChange: -11,
  },
];

// ───────── Step 6 - Close on the soft no, set the follow-up ─────────

const step6Options: BranchingOption[] = [
  {
    id: 'of-r16-step6-correct',
    label: 'Set measurable KPIs and offer the projections she wants',
    description:
      "SME-prescribed close on a soft no: don't guarantee - set three clear KPIs to measure (US conversion, visibility-share recovery, sell-through), accept her ask to see projections, and agree to bring them next time. The deferral is respected and the follow-up is secured.",
    playerDialogue:
      "No guarantees - but we'd set three clear KPIs to judge it on: your conversion among US travelers, your visibility-share recovery, and your sell-through. I'll pull together the revenue projections you're after and bring them to our next conversation so you can decide with the numbers in front of you.",
    partnerResponse:
      "Look, I appreciate the data on the US market, I really do... I'm still not fully convinced. But send me those projections of how the country rate would impact revenue, and we'll take a proper look next time.",
    styleMatch: { red: 1, yellow: 1, green: 1, blue: 2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: 6,
    optimal: true,
  },
  {
    id: 'of-r16-step6-push-close',
    label: 'Push her to commit before you leave',
    description:
      "She's ready to consider it on her own terms - pressing for a yes now, after she asked for projections, overreaches and risks turning a warm deferral into a firm no.",
    playerDialogue:
      "I'd really rather not walk out of here today without some kind of decision from you - so can we just agree to switch the US rate on right now and then review how it's performing together once it's been running for a little while? I'm confident enough in this that I'd like to get it started today.",
    partnerResponse:
      "I asked to see the numbers first, Kai. Pushing me to commit now is only going to make me more cautious, not less.",
    styleMatch: { red: 0, yellow: -1, green: -1, blue: -1 },
    assertiveness: 3,
    compliance: 'safe',
    trustChange: -6,
  },
  {
    id: 'of-r16-step6-vague-followup',
    label: 'Agree to "stay in touch" with nothing concrete',
    description:
      "Accepts the deferral but pins nothing - no projections, no KPIs, no date. A data-led owner needs the numbers she asked for, or the follow-up quietly evaporates.",
    playerDialogue:
      "No problem at all, honestly - let's just keep the lines open between us and pick this whole thing back up again whenever the timing happens to suit you better. There's no rush on my end, so whenever you feel ready to revisit it, you know where to find me and we'll take it from there.",
    partnerResponse:
      "I did ask for projections, though. Without those there's nothing for me to actually look at, is there?",
    styleMatch: { red: 0, yellow: 0, green: 0, blue: -2 },
    assertiveness: 1,
    compliance: 'safe',
    trustChange: -4,
  },
];

const steps: BranchingStep[] = [
  {
    id: 'open',
    label: 'Credit the trial, name the sell-through gap',
    partnerPrompt:
      "Hey Kai! Busy as always, honestly. We've been really focused on some marketing campaigns and going over our internal reports. Things look ok on our end, so I'm curious to see what you wanted to run through today!",
    options: step1Options,
  },
  {
    id: 'probe-visibility',
    label: 'Probe: website-only or general visibility?',
    partnerPrompt:
      "Sure, we can look. But to be honest, Kai, our reports show our occupancy is exactly where we expect it to be. Our brand loyalty programme is our main engine, and we really don't feel the need to alter our strategy on OTAs just to chase extra room nights. What are your numbers showing?",
    options: step2Options,
  },
  {
    id: 'billboard',
    label: 'The billboard reframe',
    partnerPrompt:
      "Well, we run ads in a few key overseas markets, and our loyalty programme captures the repeat visitors. I'm not chasing visibility on OTAs - I'd like to see our own website growing right now.",
    options: step3Options,
  },
  {
    id: 'us-segment',
    label: 'Connect to the US segment',
    partnerPrompt:
      "I know, but we also want to be the ones who are discovered first, so we can attract guests with our loyalty programme and exclusive member value-adds.",
    options: step4Options,
  },
  {
    id: 'propose',
    label: 'Fenced US Country Rate, no rate change',
    partnerPrompt:
      "Wait - so those are actual US travelers booking other properties nearby, just because they don't see our page?",
    options: step5Options,
  },
  {
    id: 'close',
    label: 'Close on the soft no, set the follow-up',
    partnerPrompt:
      "Okay, that sounds nice, but what are the guaranteed results? We've tried promotional tags before and it felt like we just gave away margin without any clear surge in net revenue.",
    options: step6Options,
  },
];

/**
 * Factory - stamps the engaged partner's regime-suffixed id onto the
 * shared, regime-neutral tree. Registered for oceanfront-none/-narrow/
 * -wide at round 16 in branchingScenarios.ts. Ends on a soft no -
 * grading is on the process, not the scripted deferral.
 */
export function oceanfrontR16(partnerId: string): BranchingConversationTree {
  return {
    conversationShape: 'branching',
    partnerId,
    round: 16,
    issueTreePath: oceanfrontR6IssueTreePath,
    openingAm,
    steps,
  };
}
