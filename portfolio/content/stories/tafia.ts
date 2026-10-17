import type { Decision, Story } from "@/lib/story";

export const tafiaDecisions: Decision[] = [
  {
    id: "games",
    prompt: "What users changed",
    label: "Why add games to a medication tool?",
    icon: "♣",
    title: "Seniors left before the reminder ever appeared",
    body: [
      "Our first website centered on medication tracking and the caregiver dashboard. In testing, seniors did not stay long enough to experience the reminders, which could only appear while the site was open.",
      "Interviews had already surfaced boredom, so I proposed simple cognitive games as a reason to stay. **Longer sessions were a means of helping seniors encounter the medication-support workflow, not a goal in themselves.**",
    ],
    cells: [
      { term: "Options", detail: "Keep a medication-only experience, or add lightweight activities and companion interaction." },
      { term: "Evidence", detail: "Early departures from the prototype and interview feedback about boredom." },
      { term: "Tradeoff", detail: "More engagement features added scope without solving reminder delivery outside the website." },
      { term: "What followed", detail: "A simple session timer we added in Lovable showed time in the app about 25% higher with games and the chatbot than in the medication-only version. That supports the direction, not better adherence." },
    ],
    more: { href: "#engagement", label: "Read the full decision" },
  },
  {
    id: "website",
    prompt: "Why I chose this",
    label: "Why a website instead of a pillbox?",
    icon: "◎",
    title: "Our micro:bit pillbox was tied to a wall and a shelf",
    body: [
      "Our first direction was a micro:bit pillbox. That build needed continuous wall power and was sensitive to its positioning, which made it a poor fit for seniors who were not always at home. I also questioned whether another pillbox offered enough differentiation in a crowded category.",
    ],
    cells: [
      { term: "Evidence", detail: "Pillbox use varied across interviews, while a reminder need showed up across different routines." },
      { term: "Constraint", detail: "A semester-long project with limited development capacity." },
      { term: "Choice", detail: "Move medication support into a website with activities and caregiver visibility." },
      { term: "Tradeoff", detail: "We avoided the device's power and positioning burden but now relied on digital access and an open browser tab." },
    ],
    more: { href: "#pillbox", label: "Read the full decision" },
  },
  {
    id: "companion",
    prompt: "What I deferred",
    label: "Why the chatbot used predetermined replies",
    icon: "✎",
    title: "A bounded companion before generative conversation",
    body: [
      "The companion used predetermined replies, such as follow-up prompts. It did not call a generative AI service. Token limits, an early-stage prototype, and the need to finish core functionality all pointed the same way.",
      "Selected trigger phrases were sorted into three severity tiers and flagged on the caregiver dashboard. Lower-tier examples included sadness; the highest tier included a reported fall or several days of missed medication.",
    ],
    cells: [
      { term: "Sacrifice", detail: "Less flexible conversation and limited ability to understand unexpected language." },
      { term: "Boundary", detail: "No separate caregiver alert was implemented. A flag waited on the dashboard until someone looked." },
    ],
    more: { href: "#how-it-worked", label: "How the companion worked" },
  },
  {
    id: "lovable",
    prompt: "My contribution",
    label: "What I personally did",
    icon: "★",
    title: "Product lead, and the person who restarted the build",
    body: [
      "I conducted the largest share of our 50+ interviews, synthesized the research, prioritized with MoSCoW, wrote functional specifications, kept the roadmap, and organized three sprints in Jira.",
      "Our informal technical lead's availability became limited partway through. I initiated a Lovable build so the prototype kept moving toward a usable demonstration. Lovable is AI-assisted, so I didn't hand-code the whole application, and the finished prototype was a team output.",
    ],
    more: { href: "#role", label: "Read about the team" },
  },
  {
    id: "next",
    prompt: "What happened next",
    label: "What I'd fix first",
    icon: "→",
    title: "Reminders that work when the tab is closed",
    body: [
      "Games helped us test engagement inside the website, but they did not remove the need for reminders that reach people outside an active session.",
      "For a next iteration I would prioritize reminder reliability, then measure whether seniors notice and answer prompts. Session length would become a supporting metric next to reported medication status, missed prompts, repeat use, and caregiver follow-through.",
    ],
    more: { href: "#strategy", label: "Read the strategy" },
  },
];

export const tafiaStory: Story = {
  glance: [
    { label: "The challenge", text: "Reminders only appeared while the website was open, and seniors were leaving the first, medication-focused version before they ever saw one." },
    { label: "My response", text: "I synthesized research and prototype feedback, prioritized with MoSCoW, and proposed simple games and limited companion interaction to make time on the site worth spending." },
    { label: "What we delivered", text: "A working prototype: medication tracking, scheduled in-site prompts with yes/no answers, games, predetermined chatbot replies, and severity flags on an unfinished caregiver dashboard." },
  ],
  sections: [
    {
      id: "challenge",
      kicker: "01 · The problem",
      title: "A medication tool also needed to earn the user's attention",
      blocks: [
        { type: "p", text: "TAFIA began as a medication-support project for older adults. Our initial direction was a micro:bit pillbox. Over the semester, research and prototyping shifted our focus from a physical device to a website that combined medication support with activities seniors could enjoy." },
        { type: "p", text: "The two audiences needed different things. Older adults wanted a simple, approachable experience that gave them something interesting to do. Caregivers wanted visibility into medication activity and concerning changes. The product needed to make those needs work together without making the senior experience feel like constant monitoring." },
        { type: "question", text: "How might we make medication support engaging enough for older adults to use, while giving caregivers useful visibility?" },
        { type: "p", text: "This was a prototype question. We did not establish improved clinical outcomes or prove that longer sessions produced better medication adherence." },
      ],
    },
    {
      id: "role",
      kicker: "02 · Ownership",
      title: "I led the product work and helped move delivery forward",
      blocks: [
        { type: "p", text: "I co-founded TAFIA and served as Product Lead on a four-person team during a September–December 2025 academic capstone. I contributed to the original concept and micro:bit iteration, conducted the largest share of interviews, synthesized the broader research, and translated findings into product priorities and requirements." },
        { type: "p", text: "My responsibilities included defining success metrics, maintaining the roadmap, writing functional specifications, and using Jira to organize tickets, dependencies, and blockers across three development sprints." },
        { type: "p", text: "One teammate informally focused on technical implementation. When their availability became limited, I initiated a Lovable-based build to keep the prototype moving. Two other teammates contributed interviews and presentation preparation. The finished prototype and final presentation were team outputs; the research synthesis, prioritization, and the decision to start the Lovable build were central parts of my contribution." },
        { type: "callout", tone: "limit", title: "On AI assistance", text: "Lovable provided AI-assisted development. I did not independently hand-code the entire application, and I don't claim individual components as my own engineering." },
      ],
    },
    {
      id: "research",
      kicker: "03 · Discovery",
      title: "We tested existing routines before committing to a device",
      blocks: [
        { type: "p", text: "Our professor asked us to test the assumptions behind the pillbox idea. Did seniors already use pillboxes? How did they track medication? Was remembering to take it a problem the proposed device would meaningfully address?" },
        { type: "p", text: "Across the project, our research included **50+ interviews with older adults and caregivers**. Medication routines varied: some seniors used pillboxes and others did not. A reminder need appeared across those different routines, while interviews also surfaced boredom and a desire for interesting activities." },
        {
          type: "table",
          caption: "How I translated research patterns into product implications.",
          head: ["Research pattern", "Product implication"],
          rows: [
            ["Existing medication routines differed", "Avoid making the entire experience depend on one physical pillbox routine"],
            ["Seniors wanted simple, enjoyable interaction", "Make the experience approachable and offer reasons to spend time there"],
            ["Caregivers wanted visibility and trust", "Include a caregiver-facing workflow alongside the senior experience"],
            ["Seniors left the medication-focused prototype quickly", "Test whether lightweight activities helped them stay long enough to encounter prompts"],
          ],
        },
        { type: "p", text: "I haven't reproduced participant quotations here, because I don't have verbatim records or permission to publish them." },
      ],
    },
    {
      id: "manual-test",
      kicker: "04 · Testing before automating",
      title: "Human-delivered reminders tested the experience first",
      blocks: [
        { type: "p", text: "During one week of the project, we tested reminders with approximately **20 seniors**. Rather than building the full reminder system first, team members called participants to remind them to take their medication." },
        { type: "p", text: "We then asked about the experience, including how a human reminder compared with a phone reminder. Participants told us they appreciated the human interaction. For some seniors who already had caregivers, those caregivers also reported whether medication was taken after our reminders." },
        { type: "p", text: "**The hypothesis:** a personally delivered reminder would be useful and acceptable, and the interaction itself might have value beyond the notification." },
        { type: "p", text: "**What we learned:** participants valued the interpersonal part of the experience. That helped motivate companion interaction alongside medication support." },
        { type: "callout", tone: "limit", title: "What this test did not show", text: "We did not run a controlled comparison of calls versus phone notifications, and we did not verify an adherence rate. Nor did we show that a predefined chatbot could reproduce the value of a human call. Participant preferences and caregiver reports were useful directional evidence, not independently observed medication use." },
      ],
    },
    {
      id: "pillbox",
      kicker: "05 · Decision one",
      title: "Move beyond the micro:bit pillbox",
      blocks: [
        { type: "p", text: "The physical prototype created practical burdens. Our particular build needed continuous wall power and was sensitive to its positioning. That limited portability and made it a poor fit for seniors who were not always at home. I also questioned whether another pillbox offered enough differentiation in a category with many existing products." },
        {
          type: "table",
          head: ["Decision element", "What happened"],
          rows: [
            ["Options", "Continue developing the micro:bit pillbox, or move medication support into a website"],
            ["Evidence", "Variable pillbox use, reminder needs, and the practical limitations of our hardware prototype"],
            ["Constraint", "A semester-long project with limited development capacity"],
            ["Choice", "Shift to a website supporting medication interaction, activities, and caregiver visibility"],
            ["Tradeoff", "Avoid the device's power and positioning burden, while accepting reliance on digital access and an open website"],
            ["What followed", "We built a functional website prototype and expanded its engagement experience"],
          ],
        },
        { type: "p", text: "The website was not automatically a complete answer to portability. It removed the need to carry our device, but we still needed to evaluate digital access, usability, and reminder delivery outside an active session." },
      ],
    },
    {
      id: "engagement",
      kicker: "06 · Decision two",
      title: "Make engagement serve the medication workflow",
      blocks: [
        { type: "p", text: "Our first website iteration centered on medication tracking and the caregiver dashboard. In testing, seniors did not spend enough time in the prototype to experience the reminders." },
        { type: "p", text: "I proposed cognitive games as a reason to stay. Interviews had already surfaced boredom, which gave the idea a basis beyond adding features for their own sake. We added simple activities such as word searches and puzzles, together with a limited chatbot as another way to interact." },
        { type: "callout", title: "The point", text: "The objective was not screen time in isolation. **Longer sessions were a means of helping seniors encounter the medication-support workflow.**" },
        {
          type: "table",
          head: ["Decision element", "What happened"],
          rows: [
            ["Options", "Keep a medication-only experience, or add lightweight activities and companion interaction"],
            ["Evidence", "Early departures from the prototype and interview feedback about boredom"],
            ["Constraint", "Reminders only appeared with the website open; development time was limited"],
            ["Choice", "Add simple games and predefined chatbot interaction"],
            ["Tradeoff", "More engagement features increased scope without solving background reminder delivery"],
            ["What followed", "Time in the app was about 25% higher than in the medication-only version, by our in-app session timer"],
          ],
        },
        { type: "h3", text: "How we measured it" },
        { type: "p", text: "To check whether the change worked, we added a simple session timer in Lovable. It logged how long someone stayed in the app before leaving, so we could compare the medication-only version with the version that added games and the chatbot. Time in the app came out about **25% higher** with games and the chatbot." },
        { type: "callout", tone: "limit", title: "What the 25% does and doesn't show", text: "It compares two versions of a prototype with a basic timer, not a controlled experiment. It measures time in the app, not medication taken. It doesn't separate the effect of the games from the chatbot or show long-term retention. Its value is that it told us the engagement change was pulling in the right direction." },
      ],
    },
    {
      id: "prioritization",
      kicker: "07 · Prioritization",
      title: "MoSCoW kept the prototype focused on essential workflows",
      blocks: [
        { type: "p", text: "I used MoSCoW to translate interview findings and prototype feedback into priorities. Medication tracking and caregiver visibility formed the initial core. When short sessions became an obstacle, simple engagement activities became important to testing that core experience." },
        {
          type: "table",
          caption: "A summary of the scope decisions, not a copy of the original MoSCoW board.",
          head: ["Capability", "Why it mattered", "Delivered / deferred"],
          rows: [
            ["Medication tracking", "Central user task", "Tracking and scheduled prompts with yes/no responses"],
            ["Caregiver dashboard", "Give the assigned caregiver visibility", "Functional but unfinished dashboard"],
            ["Simple games", "Help seniors stay long enough to encounter reminders", "Word searches and puzzles; complex games deferred"],
            ["Companion interaction", "Offer another engagement option", "Predefined replies; generative replies deferred"],
            ["Concerning-message handling", "Surface selected signals to caregivers", "Three severity tiers and dashboard flags; no separate alert"],
            ["Reminders outside the website", "Support routines beyond active sessions", "Deferred to a later priority"],
          ],
        },
        { type: "p", text: "The scope favored simpler implementations that could test the concept within our constraints. We did not establish that simple games had the same impact a more elaborate version would." },
      ],
    },
    {
      id: "build",
      kicker: "08 · Development",
      title: "Turning the priorities into a working prototype",
      blocks: [
        { type: "p", text: "I converted the research into requirements, functional specifications, roadmap decisions, and Jira work items. As technical progress slowed, I initiated the Lovable build so we could move toward a usable demonstration rather than stop at a concept or presentation." },
        {
          type: "table",
          head: ["Tool", "Role in the stack"],
          rows: [
            ["Lovable", "AI-assisted website prototyping, chosen to move implementation forward"],
            ["React and TypeScript", "Frontend interface and typed application code"],
            ["Vite", "Frontend development and build tooling"],
            ["shadcn/ui", "Interface component toolkit"],
            ["Supabase", "Backend platform included in the stack"],
          ],
        },
        { type: "p", text: "The choice I can speak to directly is using Lovable to accelerate prototyping. I'm not claiming that each underlying technology was evaluated against alternatives." },
      ],
    },
    {
      id: "how-it-worked",
      kicker: "09 · How it worked",
      title: "Medication prompts, a bounded companion, and dashboard flags",
      blocks: [
        { type: "h3", text: "Medication interaction" },
        { type: "p", text: "While the website was open, a scheduled prompt could appear during an activity. It asked whether the senior had taken a named medication at a specified time, and the senior could answer **yes or no**. Caregivers had visibility into that medication activity." },
        { type: "p", text: "A yes/no answer was self-reported medication status. It did not verify that anyone took anything." },
        {
          type: "figure",
          src: "/images/tafia/health.jpg",
          width: 800,
          height: 447,
          label: "TAFIA · Health",
          alt: "TAFIA prototype Health screen with Upload Photo, Take Photo and Enter Manually options, a My Medications card whose details are blurred, and a weekly medication schedule listing four medications per day.",
          caption: "The prototype's Health screen, from our final presentation. I blurred the medication details for privacy.",
        },
        { type: "h3", text: "Companion interaction and concerning-message flags" },
        { type: "p", text: "The chatbot used **predetermined responses**, such as follow-up prompts. It did not call a generative AI service to produce replies." },
        { type: "p", text: "Trigger phrases were assigned to three severity tiers and surfaced on the caregiver dashboard. Lower-tier examples included sadness; highest-tier examples included a reported fall or several days of missed medication." },
        {
          type: "table",
          head: ["Step", "Implemented behavior", "Boundary"],
          rows: [
            ["Senior enters a message", "A limited companion interface accepts the interaction", "Replies are predefined"],
            ["Trigger detection", "Selected phrases are categorized by severity", "Keyword matching can miss relevant language or flag harmless statements"],
            ["Caregiver visibility", "Categorized concerns are flagged on the dashboard", "No separate push, text, email, or other alert"],
            ["Human response", "A caregiver sees the flag when viewing the dashboard", "No acknowledgment, response-time commitment, or clinician routing"],
          ],
        },
        { type: "callout", tone: "limit", title: "Not a triage system", text: "This was a prototype flagging mechanism, not a clinically validated triage system. A severe dashboard flag did not mean someone had been notified or had acted." },
        { type: "h3", text: "Rules versus AI" },
        { type: "p", text: "We used an AI-assisted tool to build the website, but the companion's replies were rule-based. Token constraints informed the decision to defer generative conversation. The limited implementation also narrowed what we needed to test, though predefined replies and keyword matching brought their own limitations." },
      ],
    },
    {
      id: "companion",
      kicker: "10 · Decision three",
      title: "Deliver a bounded companion before generative conversation",
      blocks: [
        {
          type: "table",
          head: ["Decision element", "What happened"],
          rows: [
            ["Options", "Connect generative replies, or begin with predetermined interaction"],
            ["Evidence and constraints", "Limited tokens, an early-stage prototype, and the need to deliver core functionality"],
            ["Choice", "Use predefined replies and trigger-based dashboard flagging"],
            ["Sacrifice", "Less flexible conversation and limited ability to understand unexpected language"],
            ["Outcome", "A working companion interaction without a generative reply service"],
          ],
        },
        { type: "p", text: "This is a concrete technical product decision I can explain without claiming to have built an AI model. The next validation question is whether the limited companion adds enough value to justify its place in the experience." },
      ],
    },
    {
      id: "testing",
      kicker: "11 · Evidence",
      title: "We tested engagement and messaging, with different limits on each",
      blocks: [
        {
          type: "table",
          head: ["Activity", "Question", "What we saw", "Limit"],
          rows: [
            ["Interviews", "What do seniors and caregivers need?", "50+ interviews; simplicity, engagement, visibility, and trust emerged", "Interview counts aren't the same as unique participants"],
            ["Manual reminder test", "How do people experience personally delivered reminders?", "About 20 seniors; positive feedback on the human interaction, plus some caregiver reports", "No controlled comparison or verified adherence effect"],
            ["Prototype iteration", "Do games and companion interaction support longer sessions?", "About 25% more time in the app, by our in-app session timer", "Two prototype versions and a basic timer, not a controlled test; doesn't isolate games from chatbot"],
            ["Marketing test", "Which value propositions attract initial interest?", "Game-focused messaging drew the stronger early interest", "An early interest signal, not retention or product-market fit"],
          ],
        },
        { type: "p", text: "After the pivot we used Meta Ads Manager to put several value propositions in front of people. It gave us an early read on interest, which I treat as directional rather than as a controlled experiment." },
      ],
    },
    {
      id: "results",
      kicker: "12 · Outcome",
      title: "What the prototype achieved, and what remained unresolved",
      blocks: [
        { type: "p", text: "By the December 2025 presentation, TAFIA was a functional website prototype with medication tracking, in-session reminders, games, a limited chatbot, and a working but unfinished caregiver dashboard. After we moved beyond medication-only interaction, time in the app rose by about 25%, measured with a session timer we built into the prototype." },
        { type: "p", text: "More important for the product story, evidence changed our priorities. We moved beyond the original hardware concept, tested reminders manually, and treated engagement as a dependency of the in-site medication experience." },
        { type: "p", text: "TAFIA did not reach a commercial launch. Its important unresolved limitations:" },
        {
          type: "list",
          items: [
            "Reminders depended on the website remaining open.",
            "Keyword-based flags could miss relevant language or flag harmless statements; edge cases were not systematically tested.",
            "Dashboard flags did not actively notify a caregiver or ensure follow-up.",
            "The dashboard remained unfinished.",
            "Longer sessions did not establish medication adherence or clinical benefit.",
            "Privacy controls, access permissions, failure handling, and scalable operation would all need review before real use.",
          ],
        },
      ],
    },
    {
      id: "strategy",
      kicker: "13 · Strategy",
      title: "Attention was useful only if it supported the underlying need",
      blocks: [
        { type: "p", text: "Our initial target was older adults needing medication support, with caregivers as the second side of the experience. The value proposition was to bring reminders, enjoyable activities, and caregiver visibility into one approachable website." },
        { type: "p", text: "Alternatives included existing pillboxes, phone reminders, and human or caregiver reminders. Our research examined those routines; it did not establish that TAFIA was better than them." },
        { type: "p", text: "The opportunity was the connection between an enjoyable experience and a practical care routine. The central tradeoff was that optimizing for longer visits could distract from the more important question: does the product reliably support the medication workflow?" },
        { type: "p", text: "For a next iteration, I would prioritize reminder reliability beyond active sessions, then measure whether seniors notice and answer prompts. Session length would remain a supporting metric. Reported medication status, missed prompts, repeat use, and caregiver follow-through connect more directly to the product's purpose." },
        { type: "p", text: "No validated revenue model, unit economics, clinical outcome, or long-term retention result came out of this project." },
      ],
    },
    {
      id: "reflection",
      kicker: "14 · Reflection",
      title: "Build the experience, then test the assumption it depends on",
      blocks: [
        { type: "p", text: "The project showed me that a core feature can be technically present and still fail to reach users. Medication prompts existed, but the early experience didn't give seniors a reason to stay long enough to see them. Research helped me recognize that attention and usability were part of the delivery problem." },
        { type: "p", text: "I also learned to tell a useful prototype shortcut apart from a lasting product solution. Games helped us test engagement within the website, but they did not remove the need for reminders that work outside an active session. If I repeated the project, I would separate those hypotheses earlier: whether reminders reach users, whether users respond, and whether activities make the overall experience worth returning to." },
        { type: "p", text: "Leading the product also meant adapting when the team's delivery capacity changed. Starting the Lovable build kept us moving toward a functional prototype, and it made it important to be clear about what I directed, what the tool generated, and what teammates contributed." },
      ],
    },
    {
      id: "future",
      kicker: "15 · What's next",
      title: "Support that extends beyond a browser session",
      blocks: [
        { type: "p", text: "**Proposed direction:** a consent-based companion that works across appropriate channels, connects medication check-ins with enjoyable activities, and lets seniors control what caregivers can see." },
        { type: "p", text: "Its value would be continuity beyond one open website. Its difficulty would include reliable delivery, privacy and consent, accessible interaction, bounded conversation, and clear expectations for caregiver response." },
        { type: "p", text: "A smaller first experiment would test one reminder channel outside the website with a small consenting group, measuring delivery, notice, response, false or duplicate prompts, and user preferences before expanding companion capabilities. This is a proposal, not a shipped feature." },
      ],
    },
  ],
};
