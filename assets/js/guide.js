/*
 * Reader-facing guide derived from Project_Ignition_Outline.md.
 * Synopses appear before each chapter and in the contents drawer.
 */
window.BOOK_PARTS = [
  {
    "id": 1,
    "title": "Ignition Fails",
    "range": "Chapters 1–16",
    "summary": "Ridgeway mistakes agent output for progress. Invisible work, weak ownership, and ignored warnings culminate in a public SPARK failure and Mike's resignation."
  },
  {
    "id": 2,
    "title": "The Harness",
    "range": "Chapters 17–35",
    "summary": "Ridgeway rebuilds around visible work, shared definitions, protected constraints, risk-tiered verification, and a harness designed to make safe delivery fast."
  }
];

window.CHAPTER_GUIDE = {
  1: "Mike is abruptly promoted to VP of Engineering after the CTO is fired. As he inherits SPARK and a weekend pricing failure, he realizes Ridgeway has never defined what “done” means for agent-authored work.",
  2: "A pricing agent pushed incorrect discounts to every store. The change has no linked intent, specification, reviewer, meaningful evaluation, or accountable human owner.",
  3: "Iris traces the pricing failure to Security's undocumented tokenization assistant, which altered configuration used by the pricing agent. The incident exposes how departmental silence creates unowned systems.",
  4: "Sarah presses for SPARK's launch while Mike uncovers more autonomous systems operating without ownership or review. A joint risk process exists on the calendar but has quietly stopped functioning.",
  5: "An audit finds hundreds of production changes without specifications, reviewers, evaluations, or incident trails. Mike has six days to produce an honest response while SPARK consumes the team.",
  6: "Mike, Priya, and Marcus inventory agent-driven work with index cards. By day's end, 240 visible items prove the backlog was much larger than any official system admitted.",
  7: "Elliot takes Mike to a verification-heavy production line and reframes Ridgeway's problem: generation is not the bottleneck; trustworthy verification is. He introduces the Harness and the Six Stages.",
  8: "The team designs risk-tiered gates so review effort matches potential harm. The approach can scale only if routine evaluation is automated instead of routed through a small human review team.",
  9: "An unowned fulfillment agent ships unsafe brake-part substitutions. Iris saves the incident again, forcing Mike to prohibit autonomous action during a crisis and confront the cost of hero dependence.",
  10: "Mike observes how nearly every uncertain decision routes to Iris. He protects her time, begins transferring her judgment through documentation and shadowing, and learns the SPARK retrieval pipeline is not verified.",
  11: "Priya's dashboard shows that most queued changes are waiting for a human reviewer, especially Iris. The new process did not create the backlog; it made the existing constraint visible.",
  12: "SPARK launches despite Iris's written warning. Under real traffic, a retrieval-cache collision exposes customer data and disrupts checkout, turning a known verification gap into a public breach.",
  13: "Store employees use handwritten payment details to work around the outage, creating a second compliance incident. Mike and Jon choose the slower, auditable recovery path before the auditors arrive.",
  14: "Derek gives Mike ninety days to prove Ridgeway can change or face replacement by Continuum AI. Mike and Jordan finally speak honestly about the silence and mistrust between their teams.",
  15: "Mike and Elliot map four categories of work: planned, governance, harness, and unplanned. The numbers reveal that incidents consume the largest share of capacity and repeatedly land on Iris.",
  16: "A silent billing-agent failure threatens quarter close. Derek demands speed, Mike refuses to bypass the review discipline under pressure, and the conflict ends with Mike's resignation.",
  17: "Without Mike coordinating across teams, a nineteen-hour inventory outage exposes the value of the work he was doing between silos. Derek asks him to return and promises to prove that leadership has changed.",
  18: "Mike returns to a leadership offsite where Derek publicly owns his failures. Mike insists Jon be included, exposing how habit had excluded Security from decisions it was expected to govern.",
  19: "The leadership team admits it has no shared definition of “done.” Together they define completion through risk-appropriate review, evaluation, named ownership, and stable production behavior.",
  20: "A freeze on new agent-driven releases sharply reduces unplanned work. Mike learns to release work that does not depend on the constraint while explicitly holding only the work that truly does.",
  21: "The artifact trail lets Renata complete the audit follow-up in forty minutes and downgrade the finding to a significant deficiency with a credible remediation path. Jon struggles with a resolution that feels too painless.",
  22: "Priya builds a board that tracks each change through the Six Stages and links its full artifact trail. Two-week improvement cycles turn generalized anxiety into specific, measurable work.",
  23: "A delayed evaluation task proves to be a cross-functional project waiting on several fully utilized people. Protected slack allows the work to move faster without anyone working harder.",
  24: "Jon confronts the possibility that his security controls created friction without reducing risk. He decides to rebuild trust by starting with Nathan, the leader he understands least.",
  25: "Nathan explains Finance's actual objectives and dependencies. Mike and Jon realize Engineering and Security have spent years asking for budgets without first asking what business outcomes they needed to support.",
  26: "Interviews across the business reveal that Engineering is load-bearing for growth, financing, and dealer trust. SPARK was not only under-verified; it bundled more simultaneous risk than the business could absorb.",
  27: "The team links business objectives to engineering dependencies, risks, and controls. IT risk becomes visible as business risk, while the continuous artifact trail reduces repeated audit work.",
  28: "Sarah routes around the freeze with Continuum AI and exposes customer information to an unreviewed vendor system. The near-miss reveals that governance needs a safe fast lane, not only stronger prohibitions.",
  29: "Leadership formally charters Project Ignition: a rebuild designed around the Six Stages, risk tiers, evaluations, and protected harness capacity from the first day rather than after the first failure.",
  30: "Elliot shows Mike how the production line became both safe and fast by removing waits and automating routine handoffs. Mike sets a goal of ten verified deployments per day.",
  31: "A cross-functional founding team designs Ignition's harness: isolated sandboxes, staged automatic rollback, built-in governance classification, and ownership that survives any single person's absence.",
  32: "Shared dev, evaluation, and production environments create one standard path for every agent. Leadership's attempt to borrow Iris for a quick win becomes the first real test of the standard.",
  33: "Nathan calculates SPARK's full downstream cost against Ignition's up-front investment. The cost crossover convinces the board to fund evaluation infrastructure and the disciplined approach.",
  34: "A loyalty promotion triggers a real discount-stacking anomaly. Ignition contains it, rolls back only the affected path in roughly forty seconds, records the incident, and ships a reviewed correction without a public crisis.",
  35: "Ridgeway now averages fourteen verified changes per day, unplanned work has fallen to eight percent, and every quarterly incident was contained before reaching customers. The audit closes and Derek offers Mike a path to COO."
};

window.APPLICATION_GUIDE = {
  "principles": [
    {
      "title": "Choose rigor by stakes",
      "text": "Vibe coding is useful for exploration, disposable prototypes, and low-consequence learning. Move toward agentic engineering as longevity, blast radius, sensitive data, or customer impact increases."
    },
    {
      "title": "Start with intent, not code",
      "text": "Capture what is wanted, why it matters, who is affected, what cannot change, and what success means. The originator can write this in plain language; technical fluency is not the entry ticket."
    },
    {
      "title": "Engineer the context",
      "text": "Keep essential rules and commands always available. Load domain knowledge, examples, tools, and policies only when the task needs them. Review and version context like code."
    },
    {
      "title": "Verify the result and the path",
      "text": "Tests and output evals ask whether the result is correct. Trajectory evals ask whether the agent used the right tools, respected boundaries, and completed required checks."
    },
    {
      "title": "Automate up to accountable gates",
      "text": "Agents can plan, build, test, review, prepare releases, monitor, and execute pre-approved recovery. A named human remains accountable for production authorization and high-risk judgment."
    },
    {
      "title": "Close the loop",
      "text": "Production incidents should create new intent, new tests or evals, and updated context. Maintenance is not the end of the lifecycle; it is the next Plan stage."
    }
  ],
  "roles": [
    {
      "role": "Newcomer or student",
      "start": "Use AI on a small, reversible task. State what success looks like, inspect the output, and keep real credentials and customer data out of the experiment."
    },
    {
      "role": "Business, product, or operations",
      "start": "Describe the problem in your own words. Ask AI to turn the conversation into a short intent document, then correct what it misunderstood before Engineering acts."
    },
    {
      "role": "Developer or analyst",
      "start": "Ask for a plan before implementation. Give the agent one command or observable result that proves the work, and require it to run that check before reporting completion."
    },
    {
      "role": "Team lead or architect",
      "start": "Write the recurring context once: architecture, commands, conventions, and common mistakes. Add reusable skills for guidance and deterministic hooks for rules that cannot be optional."
    },
    {
      "role": "Security, risk, or compliance",
      "start": "Classify work by blast radius, reversibility, novelty, and data sensitivity. Put policy into the workflow early and preserve human approval where judgment or regulation requires it."
    },
    {
      "role": "Executive or transformation leader",
      "start": "Measure total cost and business outcomes, not generated code. Track lead time, first-pass success, review time, rework, incidents, and how quickly production lessons become permanent controls."
    }
  ],
  "firstMonth": [
    "<strong>Week 1:</strong> Pick one recurring, low-risk workflow and define “done” in measurable terms.",
    "<strong>Week 2:</strong> Create the intent, context, plan, and one-command feedback loop.",
    "<strong>Week 3:</strong> Add review, permissions, sandboxing, and a tested recovery path proportional to the risk.",
    "<strong>Week 4:</strong> Measure quality and wait time. Expand only if verification keeps pace with output."
  ]
};
