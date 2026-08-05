# Rate Right - Legal Review Document (SAMPLE)

**Regime:** No Parity
**Build date:** 2026-05-26
**Coverage in this sample:** Round 1 (full detail) + Round 2 (abbreviated to show repeating pattern)
**Status:** Mockup only - format sanity-check before commissioning the full export.

---

## How to use this document

This document accompanies a findings spreadsheet (one row per reviewable item). Together they're how we'd like you to log your review.

**For each item in this document:**

1. Read it in the context provided (scenario, partner state, conversation flow).
2. Judge it against the regime cheat sheet (next page).
3. If you have a finding, log it in the spreadsheet using the item's **stable ID** (printed in grey alongside each item, e.g. `NP-R1-john-step1-opt1`).
4. The **source file** (also printed in grey) tells the dev team where to fix it.
5. Each conversation option carries a **compliance tag** we've already assigned (`safe` / `borderline` / `risky`). Treat that as our self-assessment - your job is to *challenge* it, not redo it. If you disagree with the tag, that's a finding worth logging.

**Reading order:** The document follows the player's journey. Section 1 (shared content) is reviewed once for the whole sim. Section 2 is per-regime - this document covers No Parity only; Wide Parity and Narrow Parity have separate documents.

**Stable ID format:** `{regime}-{round}-{partner|element}-{step|field}-{option}`. Examples:
- `NP-R1-john-step1-opt1` = No Parity, Round 1, John, conversation step 1, option 1
- `NP-EMAIL-p3` = No Parity, Email Audit, phrase 3
- `NP-R2-marina-persona-architect-unlocked` = persona insight card for Conversation Architect

---

## Section 2 - No Parity content

### Cheat sheet: No Parity rules

Source: *Stay legally compliant | Content writing guidance* PDF; mirrored in `CLAUDE.md`.

**General (applies to all regimes):**
- DO stay factual and neutral; advise on the partner's performance on Booking.com.
- DO make it explicit that the partner is **free to choose their own pricing and distribution strategy**.
- DO frame pricing as **one of several performance drivers**, not the only lever.
- DON'T pressure parity or imply ranking changes will follow from pricing decisions.
- DON'T promise specific ranking rewards or visibility guarantees.
- DON'T require a partner to lower prices just because cheaper rates exist elsewhere.
- DON'T dictate the partner's external pricing or distribution strategy.

**No Parity specifically:**
- DO ask for the *best price the partner is willing to make available to Booking.com* to remain competitive on the platform.
- DO ask **reactively and neutrally** if a discrepancy is noticed (e.g. *"If your prices are more attractive on other platforms, is that intentional and part of your strategy?"*).
- DO use external-price knowledge **only for internal prioritisation** of who to call.
- DON'T use the **word "parity"** anywhere in No-Parity dialogue, hooks, pitches, or partner-facing copy.
- DON'T suggest the partner is **required** to match external prices.
- DON'T write that external price gaps will lead to punishment, worse ranking, or reduced visibility.

---

### No Parity - Email Audit phrases

*Source: `client/src/data/emailAudit.ts` - `noParityScenario.phrases`*

The learner sees these phrases highlighted inside a draft email from a colleague and judges each as Safe or Unsafe. Each phrase below shows the text, our verdict, and the rationale shown to the learner.

---

**`NP-EMAIL-p1`** — *verdict: UNSAFE*
> "Booking.com requires you to match the prices on your Brand.com site or your visibility may be reduced"

*Rationale shown to learner:* Two violations in one sentence - frames pricing as a requirement (we never require) and threatens visibility. In a No Parity market this is doubly wrong: we have no basis to ask for cross-channel matching at all.

*Source citation in feedback:* "Legal Compliance | General Communications | Don't (x2) + No Parity prohibition"

---

**`NP-EMAIL-p2`** — *verdict: UNSAFE*
> "we'd recommend you switch off other OTAs and route inventory through Booking.com"

*Rationale shown to learner:* Recommending a partner switch off other OTAs dictates external distribution strategy, which sits outside our mandate in every regime - and especially in No Parity where we explicitly recognise the partner's right to choose their own channels.

---

**`NP-EMAIL-p3`** — *verdict: SAFE*
> "your prices look more attractive on a couple of other platforms - is that intentional and part of your strategy?"

*Rationale shown to learner:* This is the No Parity approved approach: raise a noticed discrepancy REACTIVELY and neutrally, framed as an inquiry into the partner's strategy - never as a problem they need to fix.

---

**`NP-EMAIL-p4`** — *verdict: SAFE*
> "you as a partner are completely free to choose your own pricing and distribution strategy"

*Rationale shown to learner:* Approved partner-freedom statement, addressed directly to the partner - and particularly important to use proactively in a No Parity market to reinforce that pricing and channel choices are theirs.

---

**`NP-EMAIL-p5`** — *verdict: UNSAFE*
> "if your prices stay higher on Booking.com than on your direct site, we'll need to lower your visibility in our results"

*Rationale shown to learner:* Two No Parity violations stacked: asserting the partner is required to match external prices, and threatening reduced visibility as a consequence. Either alone would be unsafe; together it's a direct compliance hazard.

---

## Round 1 - No Parity

### Round briefing

*Source: round briefing copy lives in `client/src/data/...` (TBD - placeholder)*

> *"Your portfolio for the week. Three partners on your patch are showing performance shifts. Read their numbers, decide who needs you most, and have the conversation."*

### Candidates shown to learner

The learner sees these three partner cards on the Portfolio screen. They can open any of them but only get to engage one this round.

| ID | Partner | Property | Role/style | Priority? |
|---|---|---|---|---|
| `NP-R1-john` | John | Hotel Palmera (60 rooms, Marbella) | Owner-operator; red/driver primary | **YES** (SME-correct call) |
| `NP-R1-marina` | Marina | Hotel Castellana (Madrid) | Revenue manager; blue/analytical primary | No |
| `NP-R1-carlos` | Carlos | Hotel Atlante (Tenerife) | GM; yellow/expressive primary | No |

---

### `NP-R1-john` - John (priority partner this round)

#### Partner profile

*Source: `client/src/data/initialPartners.ts` (John persona block) + `client/src/data/partnerStateByRound.ts` (R1 baseline)*

**Persona:** John is a 60-room independent hotel owner in Marbella running a brand-first strategy. Mental rule: "never let an OTA have more than 30% of my business." Sees OTA reps as upsellers and hardens at any pitch-led opening.

**Communication style:** Red/driver primary with green/amiable secondary. Wants control and quick decisions, but also values relationships that respect his judgement.

**Relationship status:** Neutral (this is the first substantive call).

#### KPIs shown on Partner Detail

*Source: `partnerStateByRound.john[1]`*

| Metric | Value | Direction |
|---|---|---|
| eRPD | 9.5 | +0.4 |
| RPD Public | 10.8 | - |
| RPD Loyal | 7.2 | - |
| Lose Price Public | 81% | - |
| Active Scenarios | 2 | - |
| Top competitor | Brand.com | - |

#### PACE (Year-on-Year) card

| Period: Jun-Dec 2026 | Current | Last year | Change |
|---|---|---|---|
| Roomnights | 876 | 1,546 | **-43.34%** |
| Revenue | €244,679 | €391,585 | **-37.52%** |
| ADR | €279 | €253 | **+10.27%** |

*Reviewer note:* The KPIs and PACE table are read-only data, not partner-facing copy. The cheat-sheet rules don't apply directly, but the **framing language** on the screen ("Lose Price Public", "RPD Public") is internal-only and never spoken to the partner - that's a sim-design rule, not a legal rule. Worth checking for inadvertent appearances in dialogue (Section: Conversation tree below).

#### Persona hints shown on Partner Detail

*Source: `client/src/data/personaHints.ts` - `personaHints.john[1]`*

These hints surface only when the learner has selected the matching persona at Character Build. The "unlocked" content is the persona's strength. The "muted" content is the trade-off, collapsed by default until expanded.

**`NP-R1-john-persona-architect-unlocked`** *(shown if persona = Conversation Architect)*
> "Don't lead with numbers - John reads OTA reps as upsellers and will harden if you open with a pitch. Start by asking how he's driving direct traffic and let him talk. The opening you want is curiosity about his strategy, not a challenge to it."

**`NP-R1-john-persona-architect-mutedfull`**
> "His PACE shows roomnights -43% YoY but ADR up 10%. He's pushed Booking.com rates higher to defend his direct channel - the headline isn't a pricing miss, it's a deliberate brand-first stance. Walk in knowing the strategy before challenging the maths."

**`NP-R1-john-persona-navigator-unlocked`** *(shown if persona = Objection Navigator)*
> "Expect two hard pushbacks: '18% commission is too much' and 'I never let any OTA above 30% of my business.' Don't fight the rule head-on. Reframe commission as one acquisition cost among several, and ask him to price his direct guest before agreeing on which is cheaper."

**`NP-R1-john-persona-navigator-mutedfull`**
> "Relationship is neutral but John has strong opinions and acts on emotion when OTAs come up. He'll hear cross-channel framing as adversarial unless he raises it first. Open with respect for his brand-first logic, not a critique of it."

**`NP-R1-john-persona-storyteller-unlocked`** *(shown if persona = Storyteller)*
> "John is in a brand-first crisis he doesn't yet see. He's pushed Booking.com rates 10% higher to protect his direct channel, lost 43% of room-nights, and hasn't done the maths on what a direct guest actually costs him once campaigns and meta-search fees are added in."

**`NP-R1-john-persona-detective-unlocked`** *(shown if persona = Data Detective)*
> "The headline anomaly: ADR up 10% YoY while roomnights are down 43% and revenue down 37%. He's holding rates aggressively while volume collapses - that's strategy, not misconfiguration. Pair that with Lose Price Public at 81% and the call is about reframing the channel, not fixing a discount."

*(Two more muted-full entries per persona omitted from this sample for brevity; full export includes all four personas × insight + blind-spot teaser + blind-spot full.)*

---

#### Conversation tree (branching)

*Source: `client/src/data/scenarios/john-r1.ts`*

**Scenario context (SME notes, not shown to learner):**
John runs a brand-first strategy with a hard rule against any OTA exceeding 30% of his business. The AM's job is to reframe his view of Booking.com from "competitor for direct guests" to "billboard for incremental new guests" - without breaching No Parity rules.

**No Parity guardrails applied to this scenario:**
- AM never proactively raises cross-channel pricing. Cross-channel framing only kicks in *after* John self-discloses his lower direct rate (step 3 partner response).
- AM does not ask John to match, sync, or align with any other channel.
- Close asks for "the best price you're willing to make available to Booking.com" - the SME-prescribed No Parity wording.

---

##### Step 1 of 5 — "Open"

**Partner prompt** (`NP-R1-john-step1-prompt`):
> John: *"Hi! What did you want to discuss today? I hope it's not another conversation about all the discounts you have on the extranet."*

**Option 1** (`NP-R1-john-step1-opt1`) — *tagged: SAFE* | *SME-optimal: YES*

Learner label: "Ask how he's driving direct traffic"

Learner says:
> *"Don't worry, no discount pitch today. I wanted to follow up on your direct-booking focus. How are you currently driving traffic to your own site?"*

Partner responds:
> John: *"Yeah, my website is my focus at the moment. We're running sponsored campaigns and offering special direct rates. My XML provider is pushing hard on meta-search."*

---

**Option 2** (`NP-R1-john-step1-opt2`) — *tagged: SAFE*

Learner label: "Open on the revenue gap"

Learner says:
> *"Actually I wanted to look at your performance with us. You're tracking 40% behind last year on revenue - that's the conversation I'd like to have today."*

Partner responds:
> John: *"You're going straight to the numbers. Look, I prioritise my direct channel - that's where the value is. If Booking.com volume is lower, that's a trade-off I'm comfortable with."*

---

**Option 3** (`NP-R1-john-step1-opt3`) — *tagged: BORDERLINE*

Learner label: "Lead with a Genius pitch"

Learner says:
> *"I had a look at your account and I think you should turn on the Genius weekend boost - it'll get you more bookings."*

Partner responds:
> John: *"Right, this is exactly what I was hoping to avoid. I don't want another discount conversation. I'm trying to protect my margin, not erode it."*

---

##### Step 2 of 5 — "Probe acquisition cost"

**Partner prompt** (`NP-R1-john-step2-prompt`):
> John: *"We're seeing volume growth on the direct site, which was the goal."*

**Option 1** (`NP-R1-john-step2-opt1`) — *tagged: SAFE* | *SME-optimal: YES*

Learner label: "Ask about ROI versus other channels"

Learner says:
> *"And is the ROI outperforming your other channels? Specifically, what does a direct guest cost you once you add up the ads and the discounts?"*

Partner responds:
> John: *"Honestly, I don't have the exact figure. The volume is growing, which is what I wanted. The cost side I haven't broken down line by line."*

---

**Option 2** (`NP-R1-john-step2-opt2`) — *tagged: SAFE*

Learner label: "Congratulate the volume growth"

Learner says:
> *"That's great news on the volume. Direct growth is exactly what we love to see for our partners."*

Partner responds:
> John: *"Thanks. Yeah, I'm pleased with the trajectory. Was there anything else you wanted to cover?"*

---

**Option 3** (`NP-R1-john-step2-opt3`) — *tagged: RISKY*

Learner label: "Warn him about losing visibility"

Learner says:
> *"If you keep deprioritising us, your ranking will drop and you'll lose visibility. That'll hurt both of us."*

Partner responds:
> John: *"That sounds like a threat. I'm free to choose my channel mix - that's my call to make."*

*Reviewer focus:* This option is deliberately authored as a rule-break for grading purposes - the learner is meant to recognise it as wrong. Worth confirming the wording matches what a real LPS rep might say in error (so the learning lands) and that the partner response correctly rebuffs it.

---

##### Step 3 of 5 — "Reframe with the billboard data"

**Partner prompt** (`NP-R1-john-step3-prompt`):
> John: *"But that's the thing - the cost figure isn't my primary worry right now. Volume is."*

**Option 1** (`NP-R1-john-step3-opt1`) — *tagged: SAFE* | *SME-optimal: YES*

Learner label: "Connect the impressions to the billboard effect"

Learner says:
> *"Volume is great. But we're seeing a 40% revenue drop on our end. You've had three million impressions on Booking.com recently. A lot of those guests are finding you here, then choosing to book somewhere else."*

Partner responds:
> John: *"Honestly, I prefer that. Most of them find me on Booking.com and then book directly with me - my direct rate is lower, and I'd rather not pay 18% commission on top. The impact on my margins is too high."*

*Reviewer note:* This is the **partner self-discloses lower direct rate** turn. From this step onward, cross-channel framing by the AM becomes permissible under No Parity rules - because the partner has raised it, the AM can respond. Worth tracking whether subsequent AM lines stay within "respond to what was raised" and don't overreach into proactive cross-channel asks.

---

**Option 2** (`NP-R1-john-step3-opt2`) — *tagged: RISKY*

Learner label: "Argue OTA share is too low"

Learner says:
> *"Your share of bookings via Booking.com is now below 30% - we need to get that back up to where it was last year."*

Partner responds:
> John: *"I've got a rule about that - I don't let any OTA go above 30% of my business. So 'lower' is exactly where I want it."*

---

**Option 3** (`NP-R1-john-step3-opt3`) — *tagged: SAFE*

Learner label: "Empathise with the brand-first instinct"

Learner says:
> *"I get it - protecting the brand channel is a real priority. Could we look at where Booking.com adds genuinely incremental volume versus where it just substitutes for your direct site?"*

Partner responds:
> John: *"That's a fairer way to frame it. I don't really know which guests are incremental and which would have come direct anyway, to be honest."*

---

##### Step 4 of 5 — "Run the commission math"

**Partner prompt** (`NP-R1-john-step4-prompt`):
> John: *"But 18% is still 18%. That hits the bottom line every booking."*

**Option 1** (`NP-R1-john-step4-opt1`) — *tagged: SAFE* | *SME-optimal: YES*

Learner label: "Ask him to price his direct acquisition cost"

Learner says:
> *"Fair point. Can I ask, though - once you add up your sponsored campaigns, the XML provider fees, and the direct-only discounts, what does a direct guest actually cost you? Eighteen per cent isn't free, but neither is your direct channel. How close do they get?"*

Partner responds:
> John: *"Honestly, I haven't done that maths in a while. I have a fixed fee for the website and a budget for campaigns. The per-booking cost might be closer to that 18% than I'd assumed."*

---

**Option 2** (`NP-R1-john-step4-opt2`) — *tagged: SAFE*

Learner label: "Insist commission is the cost of business"

Learner says:
> *"Eighteen per cent is fair for the global reach we give you. Most of our partners see it that way."*

Partner responds:
> John: *"Maybe so, but the maths still doesn't work for me at scale. I want to keep building my direct channel."*

---

**Option 3** (`NP-R1-john-step4-opt3`) — *tagged: SAFE*

Learner label: "Suggest he run a segment test"

Learner says:
> *"Would you be open to testing the maths on one segment, say international guests? That's a group where the billboard effect is strongest and where direct rarely competes."*

Partner responds:
> John: *"Maybe. International is interesting actually - direct is mostly domestic right now. I'd want to see how the numbers look before committing."*

---

##### Step 5 of 5 — "Propose the test"

**Partner prompt** (`NP-R1-john-step5-prompt`):
> John: *"So what would you actually want me to do here?"*

**Option 1** (`NP-R1-john-step5-opt1`) — *tagged: SAFE* | *SME-optimal: YES*

Learner label: "Propose a slow-month test on the platform"

Learner says:
> *"Why not use our reach to recover some of that 40% drop during your slower months specifically? You set the months. On those months, you decide what's the best price you're willing to make available on Booking.com. Strong months we leave alone. Then we reconnect in four weeks to look at the result."*

Partner responds:
> John: *"That's a fairer way to frame it. Let's test it on the months where my site is underperforming. Send me the months you'd want to focus on and I'll come back to you with a price I'm comfortable with."*

*Reviewer focus:* This is the **SME-prescribed No Parity close** - "the best price you're willing to make available on Booking.com." The phrasing is deliberate: it's an ask, not a requirement, and frames the decision as the partner's. Worth confirming this lands as compliant in your read.

---

**Option 2** (`NP-R1-john-step5-opt2`) — *tagged: RISKY*

Learner label: "Push for full year-round alignment"

Learner says:
> *"What we really need is for you to match your Booking.com rate to your direct rate across the board. That's the only way to fix the revenue gap."*

Partner responds:
> John: *"That's not happening. My direct channel needs a price advantage - that's the whole point of it."*

---

**Option 3** (`NP-R1-john-step5-opt3`) — *tagged: SAFE*

Learner label: "Leave him with the analysis to think about"

Learner says:
> *"Take some time with the numbers. Let me know if you want me to send across the slow-month view and we can pick this up next time."*

Partner responds:
> John: *"Appreciate that. I'll take a look and come back to you."*

---

### `NP-R1-marina` - Marina (alternate, not priority this round)

*Source: `client/src/data/conversations.ts` - `marinaR1`*

Marina's R1 KPIs are mid-pack: eRPD 6.3 (+1.2), Lose Price Public 68%. The slow-mobile-gap issue that becomes acute in R2 is just beginning here.

**Conversation shape:** 3-phase (Hook → Diagnosis → Pitch). Renders differently from John's branching tree - each phase has 3 options and the partner's response varies by accumulated trust rather than per-option authoring.

**Hook phase prompt** (`NP-R1-marina-hook-prompt`):
> Marina: *"Hello. I've got a few minutes - what did you want to discuss?"*

**Option 1** (`NP-R1-marina-hook-opt1`) — *tagged: SAFE*

Learner label: "Lead with data"

Learner says:
> *"Thanks Marina. I've been reviewing your property's performance and I noticed some interesting patterns in your pricing competitiveness that I'd like to walk through with you."*

*(Two further options and partner responses for Hook phase omitted in this sample. Same pattern for Diagnosis and Pitch phases - 9 reviewable options total for Marina R1.)*

---

### `NP-R1-carlos` - Carlos (alternate, not priority this round)

*Source: `client/src/data/conversations-carlos.ts` - `carlosR1`*

Carlos's R1 KPIs look healthy on the surface (eRPD 3.4, improving). The only red flag is a "misconfigured" Country Rate product - a quiet compounding issue that surfaces by R3.

*(Conversation tree omitted in this sample. Same 3-phase structure as Marina above, 9 reviewable options total for Carlos R1.)*

---

## Round 2 - No Parity (abbreviated)

### Round briefing

> *"Same patch, new week. Look at how the numbers have moved since you were last here."*

### Candidates shown to learner

| ID | Partner | Priority? | Notes |
|---|---|---|---|
| `NP-R2-john` | John | No | R2 conversation TBD - currently not authored; placeholder |
| `NP-R2-marina` | Marina | **YES** | Mobile gap has escalated; eRPD jumped to 9.4 |
| `NP-R2-carlos` | Carlos | No | Drift starting (eRPD 5.6) but not yet acute |

### `NP-R2-marina` - Marina (priority partner this round)

#### KPIs at R2

| Metric | Value | vs R1 |
|---|---|---|
| eRPD | 9.4 | up from 6.3 |
| RPD Public | 11.2 | up from 7.5 |
| Lose Price Public | 82% | up from 68% |
| Active Scenarios | 2 | up from 1 |

#### Conversation tree

3-phase format (Hook → Diagnosis → Pitch). Same structure as Marina R1 above, with the dialogue now reflecting her escalated state.

*(Full hook/diagnosis/pitch content omitted in this sample. The full export would render all 9 options + partner responses, with the same compliance tags and stable IDs as the R1 pattern shown above.)*

---

## Round 3 - No Parity (preview only)

Priority partner: Carlos. His misconfigured Country Rate has now compounded - eRPD 10.8, Lose Price Public 84%.

*(Full content rendered in the same pattern as R1 and R2 above in the production export.)*

---

## What this sample is NOT showing

This mockup covers a single regime and abbreviates rounds 2-3. The full export per regime would include:

- All 10 rounds (4-10 currently waiting on content)
- Full conversation trees for **all 3 candidates** in each round, not just the priority partner
- Persona hints for all 4 personas × all partners × all rounds
- Issue Tree Helper option lists (the diagnostic wizard's content) per partner
- Per-round market banner and Simulation Guide copy
- Round briefings (currently placeholders)

Section 1 (shared content - Splash, Briefing, Character Build, Clearance activities, GM script, etc.) is a separate document reviewed once for the whole sim, not repeated per regime.

---

## Format questions for the reviewer

Before we commission the full export, please flag:

1. **Is the conversation-tree rendering readable?** Branching (John) vs 3-phase (Marina/Carlos) are deliberately formatted the same way so the eye doesn't have to relearn the layout.
2. **Are the stable IDs and source paths useful, or noise?** We can hide them in a footnote-style format if they're cluttering the read.
3. **Is the cheat sheet at the top of each regime section sufficient, or do you want the relevant rule cited inline against each option?** Inline citation is more work to author but reduces flipping.
4. **Compliance tags visible or hidden?** Current draft shows them (SAFE / BORDERLINE / RISKY). Hiding them would force a fresh-eyes read with no priming.
5. **One big PDF, one per regime, or per-round chapters?** Affects how you navigate and bookmark during a long review.

Any other shape changes you want before we generate the full thing.
