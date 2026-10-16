import type { Story } from "@/lib/story";

export const entrypreneurStory: Story = {
  glance: [
    { label: "Context", text: "An internship at a startup making entrepreneurship educational products and books for Pre-K through high school." },
    { label: "Research", text: "50 customer interviews and an analysis of three competitors." },
    { label: "Delivered", text: "A shipped blog and content strategy, plus contributions to a youth entrepreneurship program concept and recommendations to leadership." },
  ],
  sections: [
    {
      id: "hypothesis",
      kicker: "01 · The hypothesis",
      title: "Research changed the sales problem we were solving",
      blocks: [
        { type: "p", text: "Entry-Preneur was developing entrepreneurship-focused educational products for students. While the team looked into weak customer response, leadership was considering more personalized sales outreach." },
        { type: "p", text: "I conducted 50 customer discovery interviews. They surfaced a different obstacle: prospective customers often saw the offering as just another children's educational book, and didn't have enough reason to trust the brand." },
        { type: "p", text: "That changed the recommendation. More personalized outreach might improve how a pitch was delivered, but the research suggested the company also needed to establish why its educational perspective was credible." },
      ],
    },
    {
      id: "recommendation",
      kicker: "02 · The decision",
      title: "Earn trust through education",
      blocks: [
        { type: "p", text: "I recommended a content-first strategy, including a blog that could educate audiences before asking them to buy. I also suggested drawing on the company's connection to NYU and student entrepreneurship as a credibility signal (a connection, not an official endorsement)." },
        {
          type: "table",
          head: ["Decision element", "Evidence and choice"],
          rows: [
            ["Initial direction", "Leadership was considering more personalized outreach"],
            ["Research finding", "A trust and credibility gap, beyond personalization alone"],
            ["Recommendation", "Add a content-first educational approach"],
            ["Tradeoff", "Useful content takes sustained effort and may not produce immediate sales"],
            ["Delivered result", "I helped develop and ship the blog and content strategy"],
          ],
        },
        { type: "p", text: "The recommendation didn't mean abandoning outreach. It meant moving away from purely transactional selling." },
      ],
    },
    {
      id: "coordination",
      kicker: "03 · Supporting work",
      title: "Competitive analysis and follow-through",
      blocks: [
        { type: "p", text: "I compared three competitors across positioning, features, pricing, and opportunities to differentiate. That gave context for how Entry-Preneur could present a more distinctive educational offering." },
        { type: "p", text: "Across 16 cross-functional meetings with leadership, design, and technical contributors, I turned discussions into actionable next steps. I contributed to the blog, a youth entrepreneurship program concept, and recommendations to leadership. The blog shipped; the youth program remained a concept." },
      ],
    },
    {
      id: "outcome",
      kicker: "04 · Outcome",
      title: "What I can claim",
      blocks: [
        { type: "p", text: "The tangible outcome was a shipped content initiative grounded in customer research. I don't claim the blog caused revenue growth: outreach, seasonality, and customer mix all affect sales, and we didn't isolate the content's effect." },
        { type: "p", text: "The stronger story is the decision itself: I tested the assumed problem and recommended an approach that responded to the trust problem customers described." },
      ],
    },
    {
      id: "reflection",
      kicker: "05 · Reflection",
      title: "Test the assumed problem before optimizing the solution",
      blocks: [
        { type: "p", text: "The issue wasn't only how personally the company communicated; it was whether prospective customers trusted what it offered." },
        { type: "p", text: "Next time I'd document how each customer concern mapped to content topics, and set an evaluation plan before launch, watching content engagement, qualified inquiries, and how those customers progressed." },
      ],
    },
  ],
};

export const paramountStory: Story = {
  glance: [
    { label: "Context", text: "An NYU Stern corporate strategy and communication group project, looking at traditional TV, streaming, revenue mix, audiences, and competitors." },
    { label: "My part", text: "Company and industry research, TV-versus-streaming and audience analysis, competitive research, recommendations, presentation scripting, and Q&A prep." },
    { label: "Individually", text: "I wrote a separate strategic-action memo on new creative talent and mentorship." },
  ],
  sections: [
    {
      id: "tension",
      kicker: "01 · The tension",
      title: "The current revenue base versus the future audience",
      blocks: [
        { type: "p", text: "Our team analyzed a company whose traditional TV business was still a major revenue source while facing structural decline. We looked at Paramount+'s growth alongside direct-to-consumer losses, and at the older skew of CBS and traditional TV audiences." },
        { type: "p", text: "The strategic question: how to prepare for future streaming audiences while respecting the importance of the existing business. This is a historical project, not a description of Paramount today." },
      ],
    },
    {
      id: "analysis",
      kicker: "02 · Analysis",
      title: "A younger-audience, original-content recommendation",
      blocks: [
        { type: "p", text: "I contributed to company and industry research, TV-versus-streaming analysis, audience demographics, competitor analysis, and identifying a content-strategy concern: heavy reliance on nostalgia, reboots, and spinoffs." },
        { type: "p", text: "We recommended bringing in younger and fresh creative voices, developing more original storytelling, strengthening social media engagement, and focusing on future streaming audiences, and we compared that approach with competitors producing newer original content." },
      ],
    },
    {
      id: "tradeoff",
      kicker: "03 · The tradeoff",
      title: "A portfolio decision, not a slogan",
      blocks: [
        {
          type: "table",
          head: ["Decision element", "What the project supports"],
          rows: [
            ["Strategic tension", "Existing TV revenue versus a declining outlook and future streaming audiences"],
            ["Proposed direction", "More emphasis on new creative perspectives and original storytelling"],
            ["Competing approach", "Continued reliance on familiar formats and franchises"],
            ["Constraint", "Funding original content while managing direct-to-consumer losses"],
            ["Implementation", "Potential divestitures and funding choices were considered"],
            ["Outcome", "An academic recommendation and presentation, not a proven financial result"],
          ],
        },
        { type: "p", text: "Looking back, the better framing is balancing familiar IP with experimentation, not assuming every reboot is a mistake. We didn't quantify an ideal mix or prove that original content would perform better financially." },
      ],
    },
    {
      id: "memo",
      kicker: "04 · My memo",
      title: "Making the creative recommendation actionable",
      blocks: [
        { type: "p", text: "Separately from the team output, I wrote a strategic-action memo recommending newer creative talent, fresh storytelling perspectives, and mentorship and knowledge-transfer approaches to improve streaming competitiveness." },
        { type: "p", text: "The mentorship piece matters because a talent strategy needs a way to develop and integrate new perspectives, not just hire them. The memo makes the recommendation; it doesn't design a full program or budget." },
        { type: "p", text: "I also helped plan and script the presentation and prepare for Q&A." },
      ],
    },
    {
      id: "next",
      kicker: "05 · Limits and next step",
      title: "Funding and measuring the bet",
      blocks: [
        { type: "p", text: "The analysis would be stronger with dated financial and audience exhibits, explicit alternatives, and a funding model. We didn't run primary interviews or audience tests." },
        { type: "p", text: "A next step would be a bounded content-and-talent experiment with a defined target audience, measured by audience composition, completion, repeat viewing, and cost relative to its goal." },
        { type: "p", text: "Recommending a future direction is easier than explaining how to fund and evaluate it. A persuasive strategy has to connect audience insight with investment, implementation, and evidence that it's working." },
      ],
    },
  ],
};

export const loopifyStory: Story = {
  glance: [
    { label: "The problem", text: "Interruptions get in the way when you want to hear the same thing over and over." },
    { label: "The product", text: "A focused browser tool that loops a YouTube video or playlist, built on the YouTube IFrame API and hosted on GitHub Pages." },
    { label: "The boundary", text: "Loopify adds no ads of its own, but it can't remove or block anything YouTube itself serves." },
  ],
  sections: [
    {
      id: "problem",
      kicker: "01 · The problem",
      title: "Disruption during repeated listening",
      blocks: [
        { type: "p", text: "I noticed interruptions as a source of friction when listening to the same audio repeatedly, for focus or practice, and designed a lightweight browser tool around looping YouTube content." },
        { type: "p", text: "The promise I can stand behind is repeated playback with my own loop controls. Loopify adds no advertising of its own. It does not remove, bypass, or block anything YouTube serves, and I don't claim it does." },
      ],
    },
    {
      id: "how",
      kicker: "02 · How it works",
      title: "One playback task, done simply",
      blocks: [
        { type: "p", text: "You paste a YouTube video or playlist link. Loopify loads it into a YouTube IFrame player kept off-screen, and shows its own controls: play and pause, previous and next, a scrubber, volume, a loop toggle, and, for playlists, the track list." },
        {
          type: "table",
          head: ["Event", "What the code does"],
          rows: [
            ["A single video ends, loop on", "Seeks back to 0:00 and plays again"],
            ["A single video ends, loop off", "Stops and shows \"Ended.\""],
            ["A playlist track ends", "Plays the next track; after the last one, wraps to the first if looping"],
            ["A playlist track can't play", "Skips to the next track"],
            ["A single video can't play", "Shows \"Cannot play this video — it may be restricted or unavailable.\""],
          ],
        },
        { type: "p", text: "It's plain HTML, CSS, and JavaScript with no backend or accounts." },
      ],
    },
    {
      id: "tradeoff",
      kicker: "03 · The tradeoff",
      title: "Building on someone else's player",
      blocks: [
        { type: "p", text: "Loopify wraps its own interaction around an external service, so product claims have to match what that integration actually controls. Unavailable content, embedding restrictions, browser autoplay rules, and changes to YouTube's API all sit outside it." },
        { type: "p", text: "A small playback tool is only useful if its promise is precise. Before adding features, I'd observe whether the current controls help people complete the repeated-listening task reliably." },
      ],
    },
    {
      id: "outcome",
      kicker: "04 · Outcome",
      title: "What shipped",
      blocks: [
        { type: "p", text: "A shipped browser product using an external playback API and custom loop behavior. I haven't measured usage or any focus benefit, so I don't claim either." },
      ],
    },
  ],
};
