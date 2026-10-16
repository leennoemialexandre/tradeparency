import type { Decision, Story } from "@/lib/story";

export const jobaholicDecisions: Decision[] = [
  {
    id: "views",
    prompt: "Why I chose this",
    label: "Why both a board and a list?",
    icon: "▦",
    title: "Two ways to look at the same applications",
    body: [
      "The board shows where each application sits in the seven-stage pipeline. The list is for scanning details across many records at once. Both read the same application records, so moving a card on one changes the other.",
    ],
    cells: [
      { term: "Alternatives", detail: "One view only, or keeping separate tracking tools." },
      { term: "Tradeoff", detail: "Two interfaces mean more behavior to keep consistent." },
      { term: "What I can't claim", detail: "That two views made tracking faster or reduced errors. I haven't measured preference or speed." },
    ],
    more: { href: "#choices", label: "Read the full decision" },
  },
  {
    id: "prep",
    prompt: "Why I chose this",
    label: "Why put interview prep inside a tracker?",
    icon: "★",
    title: "An application should stay useful after you hit Apply",
    body: [
      "Each application can open its own prep page: interview rounds, interviewer details, questions sorted as Behavioral, Technical, Case, or Culture, answers in STAR format, company notes, and useful links. That gives the product a job once a status moves to an interview stage.",
      "**Mock mode** hides your answers so you can practice and reveal them one at a time. It's a study aid, not AI: no scoring, no speech recognition, no generated feedback.",
    ],
    cells: [
      { term: "Alternative", detail: "A tracker, with preparation kept somewhere else." },
      { term: "Tradeoff", detail: "A broader product needs more navigation and clearer boundaries between records." },
    ],
    more: { href: "#choices", label: "Read the full decision" },
  },
  {
    id: "deadlines",
    prompt: "How it works",
    label: "How deadline warnings decide",
    icon: "⏰",
    title: "A badge appears when a deadline gets close",
    body: [
      "Deadlines more than a week away stay quiet. From seven days out, a blue badge appears; at three days it turns amber; on the day it reads \"Due today!\" in red, and afterwards \"Expired\". Each state has a text label, so the meaning never depends on color alone.",
    ],
    more: { href: "#how-it-works", label: "See the architecture" },
  },
  {
    id: "metrics",
    prompt: "How it works",
    label: "What \"response rate\" actually means",
    icon: "%",
    title: "A percentage is only useful if its definition matches what you think it means",
    body: [
      "In Jobaholic, *applied* means anything not still in Saved. Response rate counts HireVue, Phone Screen, Interview, and Offer against that; rejection rate counts Rejected against it. The streak counts consecutive days with at least one non-Saved application added.",
      "Writing those definitions down is part of the product. A rejected application that once had an interview, for instance, no longer counts as a response, which is worth knowing before you read the number.",
    ],
    more: { href: "#reliability", label: "Read about reliability" },
  },
];

export const jobaholicStory: Story = {
  glance: [
    { label: "The problem", text: "Application details, interview notes, documents, deadlines, and preparation get scattered across a job search." },
    { label: "My response", text: "I independently built Jobaholic as one workspace where tracking and preparation live together." },
    { label: "The key idea", text: "An application should stay useful after you record that you applied. It should support what comes next." },
  ],
  sections: [
    {
      id: "problem",
      kicker: "01 · The problem",
      title: "A job search is more than a list of applications",
      blocks: [
        { type: "p", text: "Jobaholic addresses the fragmentation of application information, interviews, notes, documents, deadlines, and preparation. A tracker can record where someone applied, but the wider workflow includes everything needed to act on those applications." },
        { type: "p", text: "I designed Jobaholic to bring those tasks into one system. You can track progress through a seven-stage pipeline, switch between Kanban and list views, prepare for company-specific interviews, review statistics, see application cities on a map, and watch deadlines." },
        { type: "p", text: "I iterated with feedback from people who used it. It wasn't a formal research project with an interview program or competitive study, and I don't present it as one." },
      ],
    },
    {
      id: "ownership",
      kicker: "02 · Ownership",
      title: "I owned the work from feature definition through deployment",
      blocks: [
        { type: "p", text: "This was an independent product. I defined the features and product flows, designed the UX, built the application with AI-assisted tools, deployed it on Vercel, and iterated based on user feedback." },
        { type: "p", text: "The technical scope included authentication, persistent PostgreSQL-backed records through Supabase, and file storage for résumés and cover letters. It wasn't a frontend mockup." },
        { type: "callout", tone: "limit", title: "On AI assistance", text: "AI-assisted tools materially supported development. I don't describe every line as hand-written; what I can speak to is what I directed, evaluated, and changed." },
      ],
    },
    {
      id: "definition",
      kicker: "03 · Definition",
      title: "Define the product around connected tasks",
      blocks: [
        { type: "question", text: "How might job seekers keep application progress, and the material they need for their next step, together?" },
        { type: "p", text: "The target user is a job seeker managing many applications and the preparation that goes with them. The value proposition is one workflow spanning tracking, deadlines, documents, and company-specific preparation." },
        { type: "p", text: "Feedback shaped the product as I went. The next thing I'd add to this case study is one documented before-and-after: the task someone was doing, the friction they hit, the change I made, and what happened when they tried again." },
      ],
    },
    {
      id: "choices",
      kicker: "04 · Decisions",
      title: "Three product choices worth explaining",
      blocks: [
        { type: "h3", text: "Offer Kanban and list views" },
        { type: "p", text: "The pipeline has seven default stages: **Saved, Applied, HireVue, Phone Screen, Interview, Offer, and Rejected**. Users can add their own stages, though the defaults can't be removed. A list view sits alongside the board." },
        {
          type: "table",
          head: ["Element", "What I can support"],
          rows: [
            ["Implemented choice", "Two views of the same application records"],
            ["Product logic", "Kanban emphasizes pipeline position; a list supports scanning records and details"],
            ["Alternatives (looking back)", "One view only, or separate tracking tools"],
            ["Tradeoff", "Two interfaces mean more behavior to maintain and keep consistent"],
            ["Not established", "Faster tracking, user preference, or fewer errors"],
          ],
        },
        { type: "h3", text: "Connect tracking with company-specific preparation" },
        { type: "p", text: "Each application can open a prep page with interview rounds, questions by type, STAR-format answers, company notes, research links, and a mock mode that hides answers for practice. That gives the product a role once a status moves to an interview stage." },
        {
          type: "table",
          head: ["Element", "What I can support"],
          rows: [
            ["Implemented choice", "Tracking and interview preparation in one application"],
            ["Product logic", "Keep preparation next to the company being pursued"],
            ["Alternative", "A tracker, with preparation maintained elsewhere"],
            ["Tradeoff", "A broader product needs more navigation and clearer boundaries between records"],
            ["Not established", "Better interviews, more confidence, or improved offer rates"],
          ],
        },
        { type: "p", text: "Mock mode hides answers until you reveal them. It isn't generative AI, automated scoring, or speech recognition." },
        { type: "h3", text: "Add deadline and search-level visibility" },
        { type: "p", text: "Color-and-text deadline warnings surface upcoming dates. A statistics dashboard shows totals, response and rejection rates, offers, average days active, a day streak, a 14-day activity chart, and breakdowns by status and industry. A map shows application cities, and an optional weekly or daily goal tracks progress." },
        { type: "p", text: "These features connect individual records to a view of the whole search. Their usefulness depends on clear definitions and reliable data, which is why I document the formulas below." },
      ],
    },
    {
      id: "scope",
      kicker: "05 · Scope",
      title: "What shipped",
      blocks: [
        {
          type: "table",
          head: ["Area", "Functionality"],
          rows: [
            ["Access", "Email and password sign-in"],
            ["Persistence", "Database records per user, plus résumé and cover-letter uploads"],
            ["Tracking", "Seven-stage Kanban (customizable) and list views, filters, and search"],
            ["Preparation", "Per-application rounds, STAR Q&A, notes, links, and mock mode"],
            ["Awareness", "Deadline warnings and an optional application goal"],
            ["Analysis", "Response rate, rejection rate, streak, and activity charts"],
            ["Geography", "City map of applications"],
          ],
        },
        { type: "p", text: "I didn't use a named prioritization method here, and I don't have a record of build order. The scope covers several connected tasks; explaining which came first is something I'd document from the start next time." },
      ],
    },
    {
      id: "how-it-works",
      kicker: "06 · How it works",
      title: "How the technical pieces connect",
      blocks: [
        { type: "p", text: "Jobaholic is a Next.js and React application. Its pages talk to Supabase from the browser using the Supabase client library, and it's deployed on Vercel." },
        {
          type: "table",
          head: ["Piece", "What it does in the code"],
          rows: [
            ["Next.js / React", "The tracker page and a per-application prep page"],
            ["Supabase Auth", "Email and password sign-up and sign-in; the app shows the tracker only with an active session"],
            ["Supabase Postgres", "Tables for applications, stages, goals, interview prep, interview rounds, and interview questions, each queried by the signed-in user's ID"],
            ["Supabase Storage", "A `resumes` bucket holding uploaded résumés and cover letters"],
            ["Vercel", "Hosting and deployment"],
          ],
        },
        { type: "p", text: "Interview prep belongs to a specific application: opening it for the first time creates an empty prep record linked to that application, and rounds and questions hang off it. The prep page also checks that the application belongs to the signed-in user before showing it." },
        { type: "p", text: "Database-level permission policies live in Supabase rather than in the repository, so I can't show them here. Confirming that one user can't read another's records is a separate check from having sign-in." },
        { type: "h3", text: "Rules versus AI" },
        { type: "p", text: "AI assisted the build. There are no runtime AI features: statistics, deadline warnings, and mock mode are all ordinary programmed behavior." },
      ],
    },
    {
      id: "reliability",
      kicker: "07 · Reliability",
      title: "Reliability means more than a working screen",
      blocks: [
        { type: "p", text: "Authentication, saved records, and uploads each fail in different ways. A strong product has an answer for what the user sees when a save fails, a session expires, or an upload is interrupted." },
        { type: "p", text: "The statistics need the same care. In the code:" },
        {
          type: "list",
          items: [
            "*Applied* means any application not in Saved.",
            "**Response rate** = (HireVue + Phone Screen + Interview + Offer) ÷ applied.",
            "**Rejection rate** = Rejected ÷ applied.",
            "**Streak** = consecutive days, counting back from today, with at least one non-Saved application added that day.",
            "**Deadline warnings**: expired, due today, 1–3 days (amber), 4–7 days (blue), otherwise none.",
          ],
        },
        { type: "p", text: "Writing these out shows where a number could surprise someone. Because status is a single current value, an application that reached an interview and was later rejected counts toward the rejection rate, not the response rate. Dates are compared as calendar days, so time zones matter at the edges." },
      ],
    },
    {
      id: "testing",
      kicker: "08 · Testing",
      title: "What I'd verify next",
      blocks: [
        { type: "p", text: "I iterated with user feedback, but I don't have a written test protocol to show. These are the checks I'd run and document before calling it production-ready:" },
        {
          type: "table",
          head: ["Area", "Check"],
          rows: [
            ["Persistence", "Save, reload, sign out and in, and confirm the record is unchanged"],
            ["Authentication", "Protected access, session expiry, and an unauthorized-user test"],
            ["Files", "Upload, open, permissions, deletion, and error states"],
            ["Metrics", "Compare dashboard numbers with a small hand-calculated dataset"],
            ["Deadlines", "Threshold boundaries and time-zone edges"],
            ["Accessibility", "Keyboard navigation, labels, and mobile layouts"],
          ],
        },
      ],
    },
    {
      id: "outcome",
      kicker: "09 · Outcome",
      title: "A deployed application with connected functionality",
      blocks: [
        { type: "p", text: "I built and deployed a full-stack application that combines job tracking and interview preparation, backed by authentication, per-user database records, and file storage." },
        { type: "p", text: "That's the outcome I can support. I'm not claiming user counts, retention, time saved, or interview conversion. The sample workspace above is the best way to see what it does." },
      ],
    },
    {
      id: "strategy",
      kicker: "10 · Strategy",
      title: "Product strategy and next priorities",
      blocks: [
        { type: "p", text: "Jobaholic's premise is that related job-search tasks become more useful when they're connected. You should be able to move from knowing an application's status to knowing what to do next." },
        { type: "p", text: "The main tradeoff is breadth: each feature can strengthen the workspace while adding complexity and maintenance. A useful next step would be to watch people complete a representative journey (record an application, add a deadline, prepare, retrieve a document) and find where that connection breaks." },
        { type: "p", text: "Proposed success measures: task completion, successful retrieval of saved information, repeat use, and how often saves or syncs fail. These are recommendations, not existing results. There's no revenue model." },
      ],
    },
    {
      id: "reflection",
      kicker: "11 · Reflection",
      title: "Displaying information is different from maintaining a system",
      blocks: [
        { type: "p", text: "Building Jobaholic gave me a concrete way to work through the difference between displaying information and maintaining a usable system. An application status, a preparation note, and an uploaded file all need to stay understandable and retrievable across a whole search." },
        { type: "p", text: "If I did it again, I would document the initial scope, technical decisions, and test cases as I built, so I could explain not only what the application does but why I chose each implementation and how I know it works." },
        { type: "p", text: "I would also define dashboard measures before designing them. A polished percentage is only useful if the calculation matches what the user thinks it means." },
      ],
    },
    {
      id: "future",
      kicker: "12 · What's next",
      title: "From tracking to a next-action cue",
      blocks: [
        { type: "p", text: "**Proposed vision:** a workspace that helps a job seeker see the next useful action across tracking, preparation, and deadlines." },
        { type: "p", text: "A smaller experiment would surface one deterministic cue, like an upcoming recorded deadline, and observe whether people understand and use it. Runtime AI would only be justified after a simpler approach showed a clear limitation. Neither is a delivered feature." },
      ],
    },
  ],
};
