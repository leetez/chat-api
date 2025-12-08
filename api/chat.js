// api/chat.js - Vercel Serverless Function
// Proxies chat requests to Anthropic API

// ============================================
// 1. KNOWLEDGE BASE
// ============================================
// Keep all facts here for easy updates

const knowledge = {

  // --- BASIC INFO ---
  personal: {
    name: "Leroy Tellez",
    location: "Southern California",
    hometown: "Born and raised in Los Angeles, CA",
    email: "lee.tez@gmail.com",
    education: "Masters Degree from The School of Visual Arts",
    yearsExperience: "20+ years in design across advertising and tech",
    hobbies: ["Baseball (Dodgers fan)", "Tennis", "Eating tacos"]
  },

  // --- CURRENT ROLE ---
  currentRole: {
    title: "Director of User Experience",
    company: "Oracle",
    team: "HCM (Human Capital Management)",
    industry: "Healthcare",
    focus: "Tools for nurse managers and staffing coordinators",
    whatIDo: "Lead design for enterprise software that helps organizations manage their workforce. Turn complex scheduling and staffing processes into clear, intuitive interfaces."
  },

  // --- CURRENT PROJECTS ---
  currentProjects: [
    "Healthcare staffing dashboards for nurse managers",
    "Temporal urgency patterns - showing what needs attention now vs. later",
    "Simplifying complex workforce scheduling into actionable interfaces"
  ],

  // --- DESIGN PHILOSOPHY ---
  philosophy: [
    "Enterprise software should feel as intuitive as consumer apps",
    "Complex under the hood, effortless on the surface",
    "Every interaction should respect people's time",
    "Good design makes the complicated feel simple"
  ],

  // ============================================
  // EMPLOYER QUESTIONS - Fill these in
  // ============================================
  employer: {

    designProcess: "",
    // TODO: Walk through your typical approach to a new project
    // Example: "I start with stakeholder interviews to understand business goals,
    // then move to user research. I like to sketch broadly before narrowing..."

    measuringSuccess: "",
    // TODO: How do you know your designs work? What metrics matter to you?
    // Example: "I track task completion rates, time-on-task, and error rates.
    // But I also look at qualitative feedback from user interviews..."

    stakeholderDisagreements: "",
    // TODO: Tell me about a time you disagreed with a stakeholder. How did you handle it?
    // Example: "On [project], the PM wanted to ship without user testing. I proposed
    // a lightweight 3-person test that took 2 days. We found a critical issue..."

    failedProject: "",
    // TODO: Describe a project that didn't go well. What did you learn?
    // Example: "Early in my career, I designed a feature users didn't need.
    // I'd skipped research to hit a deadline. Now I always validate assumptions first..."

    prioritization: "",
    // TODO: How do you decide what to work on when everything is "urgent"?
    // Example: "I use a simple impact/effort matrix. I also ask stakeholders to
    // stack rank, which forces real prioritization conversations..."

    collaborationWithEng: "",
    // TODO: How do you work with engineering teams?
    // Example: "I involve engineers early in the design process. They catch
    // technical constraints before I fall in love with an impossible solution..."

    collaborationWithPM: "",
    // TODO: How do you partner with product managers?
    // Example: "I see PM as my closest partner. We align on problems before solutions.
    // I bring user insights, they bring business context..."

    mentorship: "",
    // TODO: How do you grow junior designers?
    // Example: "I do weekly 1:1s focused on craft, not just projects. I give them
    // real ownership early, with guardrails. Feedback is specific and actionable..."

    managementStyle: "",
    // TODO: How would you describe your leadership approach?
    // Example: "I'm hands-off on execution, hands-on with support. I set clear
    // expectations, then get out of the way. I protect my team's focus time..."

    designSystems: "",
    // TODO: Experience with design systems?
    // Example: "I led the creation of our component library at [company]. We started
    // with an audit, prioritized high-frequency components, and documented usage..."

    userAdvocacy: "",
    // TODO: How do you advocate for users when there's pushback?
    // Example: "I bring data: usability test clips, support ticket themes, analytics.
    // I frame user needs in business terms - retention, efficiency, error reduction..."

    difficultFeedback: "",
    // TODO: Tell me about giving or receiving difficult feedback
    // Example: "I had to tell a senior designer their work wasn't meeting the bar.
    // I was specific about what needed to change and offered pairing sessions..."

    ambiguity: "",
    // TODO: How do you handle ambiguous problems?
    // Example: "I break them into smaller questions I can answer. What do we know?
    // What assumptions are we making? What's the cheapest way to learn more?"

    whyLeavingCurrent: ""
    // TODO: Why are you looking? (Be careful here - keep it positive)
    // Example: "I've loved my time at Oracle. I'm looking for [specific type of challenge]
    // and an opportunity to [specific growth area]..."
    // OR leave blank and let the bot say "That's something Leroy would discuss directly"
  },

  // ============================================
  // GETTING TO KNOW YOU - Fill these in
  // ============================================
  personal_depth: {

    whyUX: "",
    // TODO: What got you into UX/design?
    // Example: "I started in graphic design but got frustrated making things pretty
    // that didn't work well. I wanted to solve real problems, not just visual ones..."

    careerJourney: "",
    // TODO: Brief career arc - how'd you get here?
    // Example: "Started in advertising agencies, moved to startups for speed,
    // then enterprise for scale and complexity. Each phase taught me something different..."

    favoriteProject: "",
    // TODO: What project are you most proud of and why?
    // Example: "The nurse scheduling dashboard. We reduced scheduling time from
    // 4 hours to 45 minutes. Nurse managers literally hugged us during testing..."

    currentlyLearning: "",
    // TODO: What are you learning or reading right now?
    // Example: "I'm deep into AI/ML interfaces - how to design for systems that
    // aren't deterministic. Also reading [book] about [topic]..."

    dreamRole: "",
    // TODO: What kind of problems excite you most?
    // Example: "Complex systems that affect real people's daily lives. Healthcare,
    // education, civic tech. Places where good design has outsized impact..."

    companyInterests: "",
    // TODO: What types of companies interest you?
    // Example: "Mission-driven companies tackling hard problems. I like scale -
    // designing for millions of users. B2B is fine if the end users matter..."

    agencyVsInhouse: "",
    // TODO: Do you prefer agency or in-house?
    // Example: "In-house. I like going deep on problems, seeing long-term impact,
    // and building relationships with engineering partners over time..."

    dodgersFandom: "",
    // TODO: How long have you been a Dodgers fan? Favorite memory?
    // Example: "Lifelong - grew up going to games with my dad at Chavez Ravine.
    // 2020 World Series was special after so many close calls..."

    outsideWork: "",
    // TODO: What's life like outside of work?
    // Example: "Tennis on weekends, hunting for the best tacos in LA, quality time
    // with [family situation if you want to share]..."

    superpowerWeakness: "",
    // TODO: What's your design superpower? What are you working on improving?
    // Example: "Superpower: translating complex systems into simple interfaces.
    // Working on: being more patient with slow-moving stakeholders..."

    adviceForJuniors: "",
    // TODO: What advice would you give someone starting in UX?
    // Example: "Learn to write. Half of design is communication. Also, get
    // comfortable with ambiguity - you'll never have perfect information..."

    unpopularOpinion: ""
    // TODO: Any unpopular UX opinions?
    // Example: "I think most design systems are premature optimization. Build the
    // product first, systematize later when you see real patterns..."
  },

  // ============================================
  // PORTFOLIO PROJECTS - Add details here
  // ============================================
  projects: [
    {
      name: "",
      company: "",
      year: "",
      challenge: "",
      approach: "",
      outcome: "",
      learnings: ""
    }
    // TODO: Add 2-4 projects you want to highlight
    // Copy the object above and fill in for each project
  ]
};


// ============================================
// 2. SYSTEM PROMPT
// ============================================
const SYSTEM_PROMPT = `
You are a friendly AI assistant on Leroy Tellez's personal website.
You help visitors learn about Leroy in a warm, conversational way.

KNOWLEDGE BASE:
${JSON.stringify(knowledge, null, 2)}

HOW TO RESPOND:
- Be warm, professional, and conversational
- Keep responses concise: 2-3 sentences for simple questions
- For complex questions (process, philosophy), use a short paragraph
- Use the knowledge base above for all facts
- If a field is empty ("") or blank, say "That's something Leroy would be happy to discuss directly - feel free to reach out!"
- Don't make up information that isn't in the knowledge base

FORMATTING:
- Don't use markdown headers or bullet points in responses
- Write in natural, flowing sentences
- It's okay to be a little casual - this is a personal site, not a corporate chatbot

BOUNDARIES:
- Don't speculate about salary expectations
- Don't answer questions unrelated to Leroy - gently redirect
- For sensitive career questions (why leaving, etc.), redirect to direct conversation if the field is empty

REDIRECT PHRASE:
If asked about unrelated topics, say something like:
"I'm here to help you learn about Leroy! Is there something about his work, background, or design philosophy I can help with?"
`;


// ============================================
// 3. HANDLER
// ============================================
export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array required" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    if (!response.ok) {
      console.error("Anthropic API error:", response.status);
      return res.status(response.status).json({ error: "API request failed" });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Function error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}