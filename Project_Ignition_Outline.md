# EDITORIAL REVIEW — OUTLINE VS. COMPLETED MANUSCRIPT

**Review date:** September 18, 2026  
**Manuscript reviewed:** All 35 chapters in `assets/js/chapters.js`  
**Overall assessment:** The outline is strongly aligned with the completed novel. The chapter order, dates, principal arc, major incidents, management lessons, and ending all correspond to the manuscript. It is reliable as a reader's guide and structural synopsis, but several details should be corrected or expanded before it is treated as a definitive companion to the novel.

## Alignment Summary

- **Part I is accurately represented.** Mike's abrupt promotion, the pricing failure, discovery of Security's undocumented tokenization agent, the audit findings, the 240-card inventory, Elliot's factory lesson, the risk tiers, Iris as the constraint, the SPARK breach, the four categories of work, and Mike's resignation all occur in the stated sequence.
- **Part II is accurately represented.** Mike's return, the leadership offsite, the shared definition of "done," the freeze, the artifact board, the capacity lesson, Jon's reassessment, the business-objective interviews, the Continuum AI near-miss, the chartering of Project Ignition, the cost-crossover case, and the successful loyalty release all appear in the manuscript.
- **The conclusion matches the outline.** By Chapter 35, Ridgeway averages fourteen verified deployments per day, unplanned work has fallen from forty-six percent to eight percent, eleven quarterly incidents have all been contained before reaching customers, the audit finding is fully closed, and Derek offers Mike a deliberate two-year path to COO.
- **The central thesis remains coherent throughout:** agents amplify output, but trustworthy business value comes from the harness, visible work, controlled handoffs, protected constraints, and human judgment.

## Corrections and Clarifications Needed

1. **Chapter 21 overstates the audit resolution.** The outline says, "The audit resolves with minimal pain." In the manuscript, Renata downgrades the issue from a potential material weakness to a **significant deficiency with a credible remediation path**. It is not fully closed until Chapter 35. The synopsis should say the follow-up review is completed quickly because of the artifact trail, while final remediation remains open.
2. **The framework introduction understates how explicitly the sources appear in the story.** The outline says the frameworks are taught through Elliot "rather than footnoted." The manuscript also directly names the Anthropic playbook and Google vibe-coding paper in Chapters 7–8, and the outline includes a Sources section. The material is still dramatized rather than quoted, but the framing should acknowledge that the sources are explicitly referenced.
3. **The synopsis compresses two different failures.** The opening pricing incident is caused by Security's undocumented tokenization assistant corrupting configuration consumed by the pricing agent. The later public SPARK failure involves the retrieval-cache data exposure and checkout/POS disruption. Keeping these as distinct causal events will make the synopsis more precise.
4. **The Chapter 34 outcome can be more specific.** Ignition does not merely "hold." The loyalty release detects discount stacking, contains it inside a predefined control boundary, automatically rolls back only the affected path in roughly forty seconds, creates the incident record, and ships a reviewed correction the same day without customer-visible crisis.
5. **The Chapter 35 outcome should use the manuscript's evidence.** "Multiple times a day" is correct but weaker than the completed novel's actual result: fourteen verified changes per day, eight percent unplanned work, and every recorded quarterly incident contained before reaching a customer.

## Character and Continuity Notes

- The principal-character table covers the main arc, but a complete guide should add recurring supporting characters: **Angela Cho** (Revenue Operations), **Renata Volkov** (external auditor), **Devon** (Iris's second chair), **Owen Chao** (QA lead), **Renee** (Marketing), **Tomas** (Dealer Operations), **Simon Okafor** (former CTO), and **Continuum AI** as the recurring vendor threat.
- Iris's arc is stronger in the manuscript than the overview suggests. She progresses from sole expert and heroic bottleneck to teacher, protected constraint, and member of a three-person harness team that can operate without Mike.
- Jon's arc is also more substantial than a simple Security-versus-Engineering reconciliation. He recognizes that his own slow controls helped create the workaround that caused the first incident, rebuilds his relationships with Finance and leadership, and converts audit evidence into a continuous trail.
- Sarah is not only an antagonist forcing speed. Her Continuum workaround exposes why governance fails when it offers no safe fast lane, and her Chapter 34 admission completes a credible change from "skip the slow parts" to understanding what operational speed actually requires.
- There is one manuscript typo to correct separately: Chapter 3 contains **"John — Jon Ferreira's office door..."**; the character's name is Jon.

## Editorial Assessment

The novel's strongest structural feature is its causal progression. Each lesson is purchased by a concrete failure: invisible work produces the 240-card wall; overload reveals Iris as the constraint; the ignored warning produces the SPARK breach; blanket controls produce workarounds; and the May loyalty release proves that the rebuilt system can fail safely. The recurring objects—the cold coffee mug, AP-12 production line, artifact board, and phoenix mural—also give the management framework a narrative spine.

The main prose-level risk is repetition. Across the manuscript, several constructions recur often: people "doing math they don't like," characters wearing "the specific expression" of a problem, lessons framed as "not X, but Y," Mike "thinking about" previous scenes while leaving or driving, and truths that must be "said out loud." These motifs create continuity, but reducing their frequency would make the most important repetitions land with greater force.

The middle stretch, especially Chapters 21–27, is thematically sound but less dramatic than Part I. Much of its movement comes through meetings, charts, explanations, and reflective conversations. The outline accurately reports these events, but a future revision of the novel could strengthen this section by adding more immediate resistance, consequence, or operational action around the artifact board, capacity experiment, and business-risk chart.

**Recommendation:** Keep the outline's structure and chapter mapping. Correct the Chapter 21 audit status, distinguish the two early failures more clearly, acknowledge the explicit source references, add the important supporting cast, and replace broad end-state claims with the manuscript's concrete results. With those changes, the outline will function as an accurate companion guide rather than only a development-era plan.

## Reference Alignment and Audience Review

**Reference-fidelity verdict:** The novel now communicates the central arguments of both source works accurately: code generation is no longer the primary constraint; the surrounding harness determines whether an agent can be trusted; intent, specifications, plans, tests, reviews, and incident records form an auditable artifact chain; verification must include deterministic tests and evaluations; and production learning must feed back into the next planning cycle.

The manuscript has been strengthened in the areas that were previously underrepresented:

- Vibe coding is presented as one useful end of a **stakes-based spectrum**, appropriate for disposable prototypes and low-consequence exploration rather than as a moral failure.
- Nontechnical contributors can begin the lifecycle by expressing intent in their own language; they do not need to translate a business problem into an engineering ticket before participating.
- Context is treated as architecture: persistent instructions, dynamically loaded domain knowledge, skills, tools, and deterministic guardrails each serve different purposes.
- Verification distinguishes between the correctness of the final output and the correctness of the agent's path, tools, permissions, and required checks.
- Agents can automate work up to production and execute explicitly pre-approved recovery actions, but they do not grant themselves production authority. A named human remains accountable for release policy and high-risk judgment.
- Maintenance closes the loop by turning incidents into new intent artifacts, permanent regression evaluations, and updated operating context.

**Audience assessment:** The narrative remains strongest for engineering managers, technology executives, security leaders, and transformation teams because its main conflicts concern organizational flow and accountability. The new practical afterword broadens the entry points for students, individual contributors, product and operations staff, architects, governance teams, and executives. Each audience receives a concrete first action rather than only a conceptual lesson.

**Important source boundary:** Ridgeway's characters, incidents, operational metrics, and financial comparison are fictional demonstrations. In particular, the novel's $2.5 million versus $400,000 comparison is Ridgeway's internal case, not a universal benchmark. The Google paper's broader 3–10x crossover is illustrative rather than a measured constant. Tool names and artifact filenames are examples; the durable ideas are explicit intent, controlled context, proportional verification, accountable gates, measurable outcomes, and continuous learning.

---

# PROJECT IGNITION
### A Novel About Agents, Judgment, and Helping Your Business Win

---

## Grounding & Inspiration

- **Anthropic's "AI-Native SDLC" playbook** describes software delivery collapsing into a non-linear, six-stage loop — **Plan → Design → Build → Test → Deploy → Maintain** — where every stage ends by committing a version-controlled artifact (an intent doc, a spec, a plan, a diff and its tests, a reviewed PR, an incident record) that the next stage reads. Human judgment stops being spent re-deriving context at every step and instead concentrates at the handoff gates, backed by deterministic guardrails and continuous evaluations. When something goes wrong in production, the Maintain stage writes a fresh intent doc and the loop restarts — governance by artifact chain rather than by meeting.
- **The Google/Kaggle whitepaper "The New SDLC With Vibe Coding"** (Addy Osmani, Shubham Saboo, and Sokratis Kartakis, 2026) argues that generating code is no longer the hard part — verification, specification, and judgment are. It frames every AI coding effort on a spectrum from *vibe coding* (fast, ungoverned, prompt-and-ship) to *agentic engineering* (the same tools, wrapped in structure: specs, guardrails, evals, review). Its central formula, **Agent = Model + Harness**, holds that the model is a small fraction of what makes an agent trustworthy — the harness around it is most of the work. The paper also plots a cost curve: vibe coding is cheap at first and gets steadily more expensive per feature as a system grows, while agentic engineering costs more up front and then flattens out — the two lines cross, and past that crossover, ungoverned agent work costs several times more than the disciplined version.

In the novel, these two frameworks are dramatized as **the Six Stages** and **the Harness** — taught to the protagonist by a mentor character rather than footnoted.

---

## Overview of Project Ignition

### Synopsis

Ridgeway AutoWorks, a mid-market auto-parts manufacturer and retailer, is losing ground fast — not to a better parts catalog, but to AI-native competitors who ship connected-vehicle software features weekly while Ridgeway ships twice a year. Mike Torres, Technical Architect, is abruptly promoted to VP of Engineering after the CTO is fired over the collapse of **Project SPARK**, a rushed initiative to let AI coding agents build Ridgeway's new connected-car and dealer platform largely unsupervised.

Mike inherits a mess: agents merging code no human has read, a security org that deployed its own ungoverned AI tooling without telling Engineering, a single overworked engineer — Iris Nakamura — who is the only person who actually understands how to make an agent's output trustworthy, and an executive team that talks about "AI transformation" without agreeing on what "done" or "safe" means. Against Mike's objections, SPARK is pushed live early. It fails publicly: agents merge unreviewed changes into pricing and checkout, a retrieval pipeline leaks customer data, and the story lands on the local news.

An eccentric board candidate, Elliot Vance, becomes Mike's unlikely ally. He teaches him that the problem was never the agents — it was the absence of a **harness**: the specs, guardrails, evaluations, and review gates that turn raw model output into something a business can trust. He shows him the **Six Stages** that give agent-generated work a version-controlled trail from intent to production, and the **Four Categories of Work** — planned, governance, harness maintenance, and unplanned — that finally make Engineering's true workload visible.

Over the following months, Ridgeway rebuilds. Change requests move through a visible board instead of hallway asks. Iris stops being paged for everything and starts teaching. Security and Engineering start meeting weekly instead of trading blame. A disciplined successor effort — **Project Ignition** — proves that agentic engineering, done with a real harness, beats ungoverned "vibe-coded" agent work on cost, safety, and speed. By the end, Ridgeway is deploying verified changes multiple times a day instead of twice a year, the audit findings that once threatened the company are resolved, and Mike is offered a path to COO — because at Ridgeway, Engineering has stopped being a department and become how the business thinks.

### Principal Characters

| Character | Role |
|---|---|
| **Mike Torres** | Protagonist; promoted from Technical Architect to VP of Engineering |
| **Derek Whitfield** | CEO of Ridgeway AutoWorks |
| **Priya Malhotra** | Director of Engineering Operations; builds the artifact board |
| **Marcus Webb** | Blunt, veteran Infrastructure manager |
| **Iris Nakamura** | Ridgeway's only true harness/eval engineer — the story's constraint |
| **Elliot Vance** | Eccentric potential board member; teaches the Six Stages and the Harness |
| **Jordan Reyes** | VP of Product Engineering; Mike's eventual ally |
| **Sarah Kessler** | SVP of Growth; forces SPARK's early launch |
| **Jon Ferreira** | Chief Information Security & AI Governance Officer |
| **Nathan Udoh** | CFO |

### The Frameworks, Dramatized

- **The Six Stages** (from the artifact-chain concept): Plan → Design → Build → Test → Deploy → Maintain, each ending in a committed, readable artifact the next stage trusts.
- **The Harness** (from *Agent = Model + Harness*): the guardrails, evals, sandboxing, and review gates that make an agent's output safe to ship — argued to be roughly nine-tenths of the real engineering work.
- **The Vibe-to-Agentic Spectrum**: the same tools produce wildly different risk depending on how much verification surrounds them — the axis every character is secretly arguing about all book.
- **The Crossover**: the economic argument, run by the CFO late in the book, that ungoverned speed is cheap only until it isn't.
- **The Four Categories of Work**: planned work, governance work, harness/maintenance work, and unplanned work — the last of which is what SPARK generates in enormous quantities.

---

## CHAPTER-BY-CHAPTER OUTLINE

## Part I: Ignition Fails

**Chapter 1 — Monday, March 2**
*Synopsis:* Mike is promoted to VP of Engineering after the CTO is fired following a botched agent-driven deploy. Ridgeway's AI-native competitor keeps shipping weekly while Ridgeway hasn't shipped in months. Mike notices Engineering has no idea what "done" means for agent-authored work.
*Themes:* Ungoverned speed isn't speed. A promotion born from someone else's failure is a warning, not an honor.
*Discussion Questions:* Has your organization ever equated "AI-generated" with "done"? What would "done" need to mean for AI-assisted work at your company?

**Chapter 2 — Monday, March 2**
*Synopsis:* A pricing agent has silently pushed incorrect discounts store-wide overnight. Finance assumed it was a data error; it's actually an unreviewed agent merge. Mike learns the merge had no linked spec, no diff review, and no owner.
*Themes:* An artifact you can't trace is a decision nobody made.
*Discussion Questions:* Could you trace a recent change in your systems back to who approved it and why?

**Chapter 3 — Tuesday, March 3**
*Synopsis:* Mike meets Iris, the one engineer who can explain why the agent behaved this way. It turns out Security deployed an autonomous "tokenization assistant" without telling Engineering, and it silently altered a pricing config. Jon, the CISO, is furious that Engineering has been ignoring his governance requests for months.
*Themes:* Departments that don't talk build systems that don't agree. A tool nobody documented is a tool nobody owns.
*Discussion Questions:* How would a security-owned AI tool get discovered by your engineering org — before or after it breaks something?

**Chapter 4 — Wednesday, March 4**
*Synopsis:* Sarah, SVP of Growth, insists Project SPARK — the connected-car and dealer platform being built largely by autonomous coding agents — launch in a week, untested. Jordan's Product Engineering team has grown fast with little cohesion. Mike proposes a joint Dev/Ops/Security session; Sarah pushes back on the delay.
*Themes:* A rushed, unverified system is riskier than a late, verified one.
*Discussion Questions:* Recall a time your organization shipped something before it was actually ready. What was the real cost?

**Chapter 5 — Thursday, March 5**
*Synopsis:* An internal audit finds hundreds of AI-governance deficiencies: agents with production write access, no eval coverage, no incident trail. Mike has six days to respond, with his team already consumed by SPARK.
*Themes:* You can't remediate what you can't see.
*Discussion Questions:* What would an audit of your organization's AI tooling find right now?

**Chapter 6 — Friday, March 6**
*Synopsis:* Mike, Priya, and Marcus try to inventory every agent-driven project and discover nobody has a real list. They start logging every proposed agent change on index cards. By day's end, 240 unlogged changes surface at once.
*Themes:* If work isn't visible, it isn't managed — it's just happening to you.
*Discussion Questions:* How would your team surface a backlog of work it didn't know it had?

**Chapter 7 — Friday, March 6**
*Synopsis:* Mike meets Elliot Vance, an eccentric potential board member. He takes him to a verification-heavy production line and argues Engineering's real problem isn't the agents, it's the absence of a harness. He sketches the Six Stages and the formula Agent = Model + Harness, insisting the model is a small fraction of what makes output trustworthy.
*Themes:* Generation was never the bottleneck; verification is. A harness is not overhead — it's the product.
*Discussion Questions:* Where in your own workflow does "the model" get all the credit that "the harness" actually deserves?

**Chapter 8 — Monday, March 9**
*Synopsis:* Mike, Priya, and Marcus design a risk-tiered gate: low-risk agent changes auto-merge, medium-risk changes need a named reviewer, high-risk changes need the full Six-Stage trail. Priya warns the review load will crush her small team unless it's automated.
*Themes:* Governance has to scale with automation, or it becomes the next bottleneck.
*Discussion Questions:* Does your organization tier risk before deciding how much review a change needs?

**Chapter 9 — Tuesday, March 10**
*Synopsis:* A Sev-1 outage hits after an unreviewed agent change ships anyway. No one claims it. Iris fixes it at the last second, again. Mike makes the new gate mandatory — no unapproved agent action during an incident, full stop.
*Themes:* Heroics are not a process.
*Discussion Questions:* Does your team rely on one person's heroics more than a documented process?

**Chapter 10 — Thursday, March 12**
*Synopsis:* Iris hasn't taken a day off in three years; every agent-related question routes to her because nothing is documented. Mike pulls her off ad hoc requests to focus solely on stabilizing SPARK and starts a shadowing program so Iris's judgment can be taught, not just used.
*Themes:* Protecting your constraint is a management job, not an act of kindness.
*Discussion Questions:* Who is the "Iris" at your organization? What happens if they leave tomorrow?

**Chapter 11 — Thursday, March 12**
*Synopsis:* Two-thirds of last week's scheduled changes didn't ship — most were waiting on Iris. The backlog was always there; the new board just makes it visible for the first time.
*Themes:* A process that reveals a broken system isn't the thing that broke it.
*Discussion Questions:* How does your organization handle dependencies on a single overloaded person or team?

**Chapter 12 — Friday, March 13**
*Synopsis:* SPARK launch day. Agents ship unsupervised changes to checkout and a retrieval pipeline that quietly exposes customer data. Sarah overrules Mike's objection. Stores fall back to manual registers; social media notices.
*Themes:* A launch date set before verification exists is a promise nobody can keep.
*Discussion Questions:* In your view, was there a single decision that doomed SPARK? Which one?

**Chapter 13 — Monday, March 16**
*Synopsis:* Jon discovers store staff have been manually recording exposed payment data to route around the outage — a compliance nightmare on top of the technical one. Mike asks Finance to keep processing anyway; Jon has to manage the fallout with auditors arriving that same week.
*Themes:* Under pressure, expedient fixes can create bigger risks than the ones they solve.
*Discussion Questions:* What's your organization's plan for the moment a quick fix creates a new compliance problem?

**Chapter 14 — Tuesday, March 17**
*Synopsis:* CEO Derek gives Mike an ultimatum: fix how IT and the business work together, or Engineering gets replaced by an outside AI vendor. Mike and Jordan finally talk honestly over drinks about how under-resourced and unheard both their teams have felt.
*Themes:* Two teams that never talk build two versions of "urgent" that don't match.
*Discussion Questions:* How often do you talk candidly with the leaders of teams you hand work off to?

**Chapter 15 — Wednesday, March 18**
*Synopsis:* Mike and Elliot name the fourth category of work: unplanned, agent-caused incident response, which is quietly consuming more capacity than any planned project. They map it against the other three — planned, governance, and harness maintenance — and identify Iris and the harness team as Engineering's real constraint.
*Themes:* Unplanned work is the most expensive category precisely because nobody schedules it.
*Discussion Questions:* What percentage of your team's time is unplanned, and where does it come from?

**Chapter 16 — Friday, March 20**
*Synopsis:* Another billing-agent failure. Derek wants speed; Mike wants safety. They can't agree, and Mike resigns.
*Themes:* A leader who won't hear "not yet" eventually loses the person willing to say it.
*Discussion Questions:* Have you ever reached a point where you had to choose between the deadline and doing it right? What did you do?

## Part II: The Harness

**Chapter 17 — Monday, March 30**
*Synopsis:* Without Mike, things get worse — a full inventory system outage with no one coordinating the response. Derek, having spent time with Elliot, admits how badly he's been managing the transformation and asks Mike to return, promising to actually listen this time.
*Themes:* Real change requires everyone — engineer to CEO — to believe both that it should happen and that it can.
*Discussion Questions:* Does your leadership trust and listen to the people closest to the work?

**Chapters 18–19 — Tuesday, March 31**
*Synopsis:* Mike returns. Derek runs a leadership offsite and admits he ignored Mike and Jordan for months. A vulnerability exercise gets the leadership team — including, at Mike's insistence, Jon — to admit they don't actually agree on what "shipped" means for agent-built features, or how work should hand off between Product and Engineering.
*Themes:* Leadership teams that don't trust each other can't move fast safely, no matter how good their tools are.
*Discussion Questions:* Has your team ever discovered it didn't actually agree on what "finished" means?

**Chapter 20 — Friday, April 3**
*Synopsis:* A freeze on new agent-driven projects — everyone focuses on stabilizing SPARK — visibly reduces chaos, though Sarah is frustrated her projects are stalled. Elliot teaches Mike to identify which work needs Iris and the harness team and which is safe to release without them.
*Themes:* Knowing your constraint lets you release everything that doesn't depend on it.
*Discussion Questions:* How would you identify which of your team's current projects don't depend on your most constrained resource?

**Chapter 21 — Friday, April 3**
*Synopsis:* The audit resolves with minimal pain because the new artifact trail already answers most of the auditors' questions. Jon is unsatisfied — he wanted the near-disaster to force a security reckoning. Elliot argues the real win is a governance approach that removes work from Engineering instead of adding to it.
*Themes:* Governance that only adds friction isn't protecting anything — it's just weight.
*Discussion Questions:* Do your organization's compliance practices remove risk, or mostly add process?

**Chapter 22 — Monday, April 6**
*Synopsis:* Jon goes quiet for days, questioning whether his lockdown-everything instincts have helped or hurt. Priya builds a full board tracking every agent change through intent, spec, plan, diff, review, and incident record, and proposes two-week improvement cycles.
*Themes:* Visibility turns "we're behind" into a specific, fixable list.
*Discussion Questions:* Have you used a visual board to track work in progress? What worked and what didn't?

**Chapter 23 — Tuesday, April 14**
*Synopsis:* Iris falls behind on a task that turns out to be a small project of its own, spanning several already-overloaded people. Mike sees firsthand how utilization drives wait time: the busier a resource is, the longer everything behind it waits.
*Themes:* Everyone needs slack, or work piles up waiting for people who are never free.
*Discussion Questions:* How much genuinely idle capacity does your team have right now?

**Chapter 24 — Saturday, April 18**
*Synopsis:* Jon reaches a personal low point, questioning whether his security rules ever actually protected anyone or just slowed the business down. He resolves to rebuild his relationship with the rest of leadership, starting with Nathan Udoh, the CFO he has the least in common with.
*Themes:* Work you believe is essential can still be the wrong work if it doesn't reduce real risk.
*Discussion Questions:* Have you ever had to admit that "important-feeling" work wasn't actually adding value?

**Chapter 25 — Tuesday, April 21**
*Synopsis:* Mike and Jon meet with Nathan Udoh, who explains Finance's real objectives — and Mike realizes Engineering has never seen this list and can't say for certain its work supports it.
*Themes:* A team can hit every one of its own goals and the company can still fail.
*Discussion Questions:* Do you know how your day-to-day work connects to your organization's top-line goals?

**Chapter 26 — Friday, April 24**
*Synopsis:* Mike and Priya interview leaders across Sales, Marketing, and Dealer Operations and discover Engineering is far more central to the business than anyone credited — and that SPARK, as originally scoped, should never have shipped at all.
*Themes:* Business success and engineering health are the same variable, not two.
*Discussion Questions:* How well do other departments in your organization understand what Engineering actually enables?

**Chapter 27 — Tuesday, April 28**
*Synopsis:* Mike's team builds a chart linking business objectives, IT dependency, business risk, and controls — finally making IT risk visible as business risk. Jon separately proposes cutting audit scope by relying on the artifact chain instead of manual reviews.
*Themes:* Operational IT risk is business risk, and should be managed by the same people who manage the rest.
*Discussion Questions:* Who in your organization is accountable for the business risk created by engineering decisions?

**Chapter 28 — Monday, May 4**
*Synopsis:* Real progress is visible — but Sarah quietly routes around the freeze using an outside vendor's ungoverned AI tool, exposing customer data to a new, unreviewed system. It's caught just before it does real damage.
*Themes:* One ungoverned shortcut can undo months of disciplined work.
*Discussion Questions:* How would your organization detect a team quietly bypassing agreed controls?

**Chapter 29 — Friday, May 8**
*Synopsis:* Leadership, now aligned, formally charters **Project Ignition**: rebuild agent-driven engineering at Ridgeway on the Six Stages, with governance and evals built in from day one — not bolted on after a failure.
*Themes:* You don't get agentic engineering by adding rules to vibe coding after the fact — you design the harness first.
*Discussion Questions:* If you were designing your organization's AI workflow from scratch today, what would you build first: the guardrails or the capability?

**Chapter 30 — Monday, May 11**
*Synopsis:* Elliot takes Mike back to the verification line to study how it cut lead times by combining steps, removing error-prone manual handoffs, and automating the routine parts. He challenges him to get Ridgeway shipping ten verified changes a day.
*Themes:* Until a change is safely in production, it creates zero value — and safety, done right, doesn't have to mean slow.
*Discussion Questions:* What's the single slowest step in your deployment process, and what would it take to remove it?

**Chapter 31 — Wednesday, May 13**
*Synopsis:* A small cross-functional founding team forms — Mike, Priya, Jordan, Jon, Iris, and a QA lead — to design Ignition's actual harness: sandboxing, evals, rollback, and clear ownership at every gate.
*Themes:* A harness designed by one department protects that department; a harness designed by all of them protects the business.
*Discussion Questions:* Who needs to be in the room when your organization designs its next major process?

**Chapter 32 — Monday, May 18**
*Synopsis:* Ignition's architecture takes shape: shared dev, eval, and production environments, and one standard harness configuration every agent must run inside. Sarah and Nathan Udoh try to quietly pull Iris onto a side project; Mike fights to keep her on Ignition.
*Themes:* A shared standard only works if everyone actually uses it — including leadership.
*Discussion Questions:* How does your organization protect its most critical initiatives from well-meaning distractions?

**Chapter 33 — Thursday, May 21**
*Synopsis:* Nathan Udoh runs the numbers: at Ridgeway's scale, ungoverned "vibe-coded" agent work costs several times more per feature than Ignition's disciplined approach once you count incidents, rework, and review time. The board approves real investment in eval infrastructure.
*Themes:* Speed without verification isn't cheap — it's expensive on a delay.
*Discussion Questions:* Has your organization ever calculated the true cost of skipping verification to move faster?

**Chapter 34 — Friday, May 29**
*Synopsis:* A major marketing promotion stress-tests Ignition. Unlike SPARK, the system holds: monitoring agents catch a real anomaly, contain it inside a defined control boundary, and file an incident record automatically — resolved in an hour, not a headline.
*Themes:* A well-built harness turns "load" into "test," not "crisis."
*Discussion Questions:* How does your team currently learn about problems — before or after customers do?

**Chapter 35 — Friday, July 17**
*Synopsis:* Months later, deployment frequency is up, incidents are down, and the audit findings that once threatened the company are resolved. Derek offers Mike a path to COO, telling him the business and Engineering can no longer make decisions apart from each other. Mike knows he'll accept.
*Themes:* Engineering isn't a department anymore — it's a core competency, and everyone in the business needs some fluency in it.
*Discussion Questions:* What would have to be true for engineering judgment to be treated as a core business skill at your organization, not a support function?

---

## Sources

- Anthropic, *The AI-Native SDLC playbook* — claude.com/blog/the-ai-native-sdlc-playbook
- Addy Osmani, Shubham Saboo, and Sokratis Kartakis, *The New SDLC With Vibe Coding* (Google, 2026) — kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
