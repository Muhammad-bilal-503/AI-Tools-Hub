const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/auth');

const axios = require('axios');

async function callGroq(prompt) {
  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2048
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data.choices[0].message.content;
}

// Tool 1 — AI Resume Builder
router.post('/resume', authMiddleware, async (req, res) => {
  try {
    const { jobDescription, experience, skills } = req.body;
    const prompt = `Tum ek expert resume writer ho. Neeche di gayi job description aur experience ke liye ek professional resume banao.

Job Description: ${jobDescription}
Experience: ${experience}
Skills: ${skills}

Yeh sections banao:
1. Professional Summary (2-3 lines)
2. Key Skills (bullet points)
3. Work Experience (formatted)
4. Education
5. Match Score (0-100) - yeh resume is job ke liye kitna suitable hai
6. Missing Skills - kya skills add karni chahiye

Urdu/English mix mat karo — sirf English mein resume banao.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 2 — AI Mental Health Companion
router.post('/mental-health', authMiddleware, async (req, res) => {
  try {
    const { message, mood } = req.body;
    const prompt = `Tum ek empathetic mental health companion ho. User ka mood "${mood}" hai aur woh keh raha hai: "${message}"

Ek caring, supportive response do. Koi medical advice mat do. Agar zaroorat ho toh professional help recommend karo. Response friendly aur warm raho.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 3 — AI Code Review
router.post('/code-review', authMiddleware, async (req, res) => {
  try {
    const { code, language } = req.body;
    const prompt = `Tum ek senior ${language} developer ho. Yeh code review karo:

\`\`\`${language}
${code}
\`\`\`

Yeh batao:
1. Bugs (agar hain)
2. Security issues
3. Code quality problems
4. Improved version of the code
5. Explanation of changes

Clear aur helpful tarike se batao.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 4 — AI E-Learning Path Generator
router.post('/learning-path', authMiddleware, async (req, res) => {
  try {
    const { topic, level, goal } = req.body;
    const prompt = `Tum ek expert educator ho. "${topic}" sikhne ke liye personalized learning path banao.

Level: ${level}
Goal: ${goal}

Yeh banao:
1. Diagnostic quiz (5 questions)
2. 4-week learning plan
3. Week-by-week topics
4. Recommended resources (free)
5. Mini projects for practice`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 5 — AI Content Marketing Studio
router.post('/content-studio', authMiddleware, async (req, res) => {
  try {
    const { topic, audience, tone } = req.body;
    const prompt = `Tum ek expert content marketer ho. "${topic}" ke baare mein "${audience}" audience ke liye "${tone}" tone mein content banao:

1. Blog Post (300 words)
2. Instagram Caption (150 chars)
3. Twitter/X Thread (5 tweets)
4. LinkedIn Post
5. Google Ad Copy (headline + description)

Sab ek saath do.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 6 — AI Legal Document Summarizer
router.post('/legal-summary', authMiddleware, async (req, res) => {
  try {
    const { documentText } = req.body;
    const prompt = `Tum ek legal expert ho. Yeh document summarize karo simple English mein:

${documentText.substring(0, 3000)}

Batao:
1. Main points (bullet points)
2. Risky clauses (red flags)
3. Important dates/deadlines
4. Plain English summary
5. Key obligations

Legal jargon avoid karo — simple raho.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 7 — AI Fake News Detector
router.post('/fake-news', authMiddleware, async (req, res) => {
  try {
    const { articleText } = req.body;
    const prompt = `Tum ek fact-checker ho. Yeh article analyze karo:

${articleText.substring(0, 2000)}

Batao:
1. Credibility Score (0-100)
2. Main claims jo verify ki ja sakti hain
3. Biased language examples
4. Logical fallacies (agar hain)
5. Overall verdict: Real / Misleading / Fake
6. Reasons for verdict`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 8 — AI Personal Finance Advisor
router.post('/finance', authMiddleware, async (req, res) => {
  try {
    const { income, expenses, goals } = req.body;
    const prompt = `Tum ek personal finance advisor ho.

Monthly Income: ${income}
Monthly Expenses: ${expenses}
Financial Goals: ${goals}

Banao:
1. Spending Analysis
2. Wasteful categories identify karo
3. Monthly savings plan
4. Goal achievement timeline
5. 3 actionable tips

Specific aur practical advice do.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 9 — AI Accessibility Auditor
router.post('/accessibility', authMiddleware, async (req, res) => {
  try {
    const { htmlCode } = req.body;
    const prompt = `Tum ek web accessibility expert ho. Yeh HTML audit karo WCAG 2.2 standards ke mutabiq:

${htmlCode.substring(0, 3000)}

Batao:
1. Accessibility violations (list)
2. Each issue ki severity (High/Medium/Low)
3. Fixed code for each issue
4. Overall accessibility score (0-100)
5. Quick wins (easy fixes)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 10 — AI Interview Coach
router.post('/interview', authMiddleware, async (req, res) => {
  try {
    const { role, level, answer, question } = req.body;
    const prompt = `Tum ek senior HR interviewer ho. "${role}" position ke liye "${level}" level interview.

Question: ${question}
Candidate Answer: ${answer}

Evaluate karo:
1. Clarity Score (0-10)
2. Depth Score (0-10)
3. Relevance Score (0-10)
4. Strengths in this answer
5. Weaknesses
6. Ideal answer example
7. Follow-up question`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 11 — AI Meal Planner
router.post('/meal-plan', authMiddleware, async (req, res) => {
  try {
    const { goals, allergies, ingredients, calories } = req.body;
    const prompt = `Tum ek nutritionist ho. 7-day meal plan banao:

Health Goals: ${goals}
Allergies: ${allergies}
Available Ingredients: ${ingredients}
Daily Calorie Target: ${calories}

Har din ke liye:
- Breakfast, Lunch, Dinner, Snacks
- Calorie count
- Macros (protein/carbs/fat)
- Shopping list (week ke liye)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 12 — AI Travel Planner
router.post('/travel', authMiddleware, async (req, res) => {
  try {
    const { destination, days, budget, interests } = req.body;
    const prompt = `Tum ek travel expert ho. ${destination} ke liye ${days}-day itinerary banao.

Budget: ${budget}
Interests: ${interests}

Har din ke liye:
- Morning, Afternoon, Evening activities
- Estimated costs
- Transport tips
- Food recommendations
- Packing suggestions (last mein)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 13 — AI Plagiarism Checker
router.post('/plagiarism', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const prompt = `Tum ek plagiarism detection expert ho. Yeh text analyze karo:

${text.substring(0, 2000)}

Batao:
1. AI-Generated Content Score (0-100%)
2. Writing patterns jo AI suggest karte hain
3. Suspicious sentences (list karo)
4. Originality Score (0-100%)
5. Overall verdict
6. Suggestions to make it more original`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 14 — AI Customer Support Bot Builder
router.post('/chatbot', authMiddleware, async (req, res) => {
  try {
    const { businessInfo, userQuery, faqs } = req.body;
    const prompt = `Tum ek customer support agent ho for "${businessInfo}".

FAQs/Knowledge Base:
${faqs.substring(0, 2000)}

Customer Question: ${userQuery}

Helpful aur professional answer do. Agar answer knowledge base mein nahi hai toh politely batao aur human agent se connect karne ka suggest karo.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 15 — AI Image Alt Text (text description based)
router.post('/alt-text', authMiddleware, async (req, res) => {
  try {
    const { imageDescription } = req.body;
    const prompt = `Image description: "${imageDescription}"

Banao:
1. SEO Alt Text (under 125 chars)
2. Instagram Caption (casual tone)
3. LinkedIn Caption (professional tone)
4. Twitter Caption (witty tone)
5. Accessibility Description (detailed, for screen readers)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 16 — AI Homework Helper
router.post('/homework', authMiddleware, async (req, res) => {
  try {
    const { question, subject, level } = req.body;
    const prompt = `Tum ek Socratic tutor ho. "${subject}" ka yeh question hai:

"${question}"

Student level: ${level}

Seedha jawab mat do. Pehle:
1. Guiding question pucho
2. Concept explain karo
3. Step-by-step hint do
4. Phir complete solution dikhao
5. Ek practice question do

Teaching style friendly aur encouraging raho.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 17 — AI Sentiment Analyzer
router.post('/sentiment', authMiddleware, async (req, res) => {
  try {
    const { reviews } = req.body;
    const prompt = `Tum ek product analyst ho. Yeh reviews analyze karo:

${reviews.substring(0, 3000)}

Batao:
1. Overall Sentiment (Positive/Negative/Mixed %)
2. Feature-wise sentiment (battery, design, price, etc.)
3. Top Pros (most mentioned)
4. Top Cons (most mentioned)
5. Fake Review indicators
6. Overall Rating (0-10)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 18 — AI Language Learning
router.post('/language', authMiddleware, async (req, res) => {
  try {
    const { targetLanguage, level, userMessage, scenario } = req.body;
    const prompt = `Tum ek ${targetLanguage} language teacher ho. Student level: ${level}.

Scenario: ${scenario}
Student said: "${userMessage}"

Karo:
1. Grammar errors correct karo (agar hain)
2. Natural way batao isko kehne ka
3. Vocabulary tip do
4. Conversation continue karo ${targetLanguage} mein
5. Next practice sentence do`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 19 — AI Meeting Summarizer
router.post('/meeting-summary', authMiddleware, async (req, res) => {
  try {
    const { transcript } = req.body;
    const prompt = `Tum ek professional meeting secretary ho. Yeh meeting transcript summarize karo:

${transcript.substring(0, 4000)}

Banao:
1. Executive Summary (2-3 sentences)
2. Key Decisions Made
3. Action Items (with owner names if mentioned)
4. Important Deadlines
5. Next Steps
6. Meeting Sentiment (productive/unproductive/mixed)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 20 — AI Email Composer
router.post('/email', authMiddleware, async (req, res) => {
  try {
    const { context, receivedEmail, purpose } = req.body;
    const prompt = `Tum ek professional email writer ho.

Context: ${context}
Received Email: ${receivedEmail}
Purpose: ${purpose}

3 versions likho:
--- FORMAL VERSION ---
(professional, formal tone)

--- FRIENDLY VERSION ---
(warm, casual but respectful)

--- ASSERTIVE VERSION ---
(direct, confident tone)

Har version ke liye subject line bhi do.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 21 — AI Symptom Checker
router.post('/symptoms', authMiddleware, async (req, res) => {
  try {
    const { symptoms, age, area } = req.body;
    const prompt = `IMPORTANT: Yeh sirf educational information hai — medical advice nahi.

Symptoms: ${symptoms}
Age group: ${age}
Body area: ${area}

Educational information do:
1. Possible conditions (likelihood ke saath)
2. Urgency level: Low/Medium/High
3. Common causes
4. When to see a doctor (immediately vs soon vs routine)
5. General wellness tips

DISCLAIMER: Yeh AI information hai — actual diagnosis ke liye doctor se milna zaroori hai.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 22 — AI News Digest
router.post('/news-digest', authMiddleware, async (req, res) => {
  try {
    const { topics, articles } = req.body;
    const prompt = `Tum ek news editor ho. In articles ko "${topics}" topics ke baare mein summarize karo:

${articles.substring(0, 3000)}

Har article ke liye:
1. 3-bullet summary
2. Bias label (Left/Center/Right/Unknown)
3. Key facts vs opinions
4. Importance rating (1-5)

Phir overall digest banao.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 23 — AI Story Writing
router.post('/story', authMiddleware, async (req, res) => {
  try {
    const { genre, characters, opening, instruction } = req.body;
    const prompt = `Tum ek creative writer ho. Genre: ${genre}

Characters: ${characters}
Story so far: "${opening}"
User instruction: "${instruction}"

Story continue karo (200-300 words). Character voices consistent rakho. Engaging aur vivid writing karo. End mein ek plot twist ya hook do.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 24 — AI Web Scraper Code Generator
router.post('/scraper', authMiddleware, async (req, res) => {
  try {
    const { url, dataDescription } = req.body;
    const prompt = `Tum ek Python web scraping expert ho.

Website: ${url}
Data needed: ${dataDescription}

Complete Python code likho using BeautifulSoup ya Scrapy:
1. Full working code
2. Comments explain karo har step
3. Error handling include karo
4. Output CSV mein save karo
5. Usage instructions

Code production-ready hona chahiye.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 25 — AI Flashcard Generator
router.post('/flashcards', authMiddleware, async (req, res) => {
  try {
    const { notes, subject } = req.body;
    const prompt = `Tum ek study expert ho. "${subject}" ke yeh notes se flashcards banao:

${notes.substring(0, 3000)}

Banao:
1. 10-15 Flashcards (Question | Answer format)
2. Key Terms Glossary
3. 1-page Summary
4. 5 Practice Quiz Questions (MCQ)
5. Mind Map structure (text format)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 26 — AI Cybersecurity Scanner
router.post('/security', authMiddleware, async (req, res) => {
  try {
    const { code, type } = req.body;
    const prompt = `Tum ek cybersecurity expert ho. Yeh ${type} analyze karo security ke liye:

${code.substring(0, 3000)}

Check karo:
1. OWASP Top 10 vulnerabilities
2. SQL Injection risks
3. XSS vulnerabilities
4. Authentication issues
5. Data exposure risks
6. Fix recommendations with corrected code
7. Security score (0-100)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 27 — AI Interior Design
router.post('/interior-design', authMiddleware, async (req, res) => {
  try {
    const { roomType, style, budget, dimensions } = req.body;
    const prompt = `Tum ek interior designer ho.

Room: ${roomType}
Style: ${style}
Budget: ${budget}
Dimensions: ${dimensions}

Design plan banao:
1. Color palette (with hex codes)
2. Furniture list (with approximate prices)
3. Layout suggestions
4. Lighting recommendations
5. Decor items
6. Budget breakdown
7. Style rationale`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 28 — AI Social Media Strategy
router.post('/social-strategy', authMiddleware, async (req, res) => {
  try {
    const { platform, niche, currentStats, goals } = req.body;
    const prompt = `Tum ek social media strategist ho.

Platform: ${platform}
Niche: ${niche}
Current Stats: ${currentStats}
Goals: ${goals}

Banao:
1. Account audit (strengths/weaknesses)
2. Best posting times
3. Top 10 hashtag recommendations
4. 30-day content calendar (week by week)
5. Content ideas (10 post ideas)
6. Growth strategy`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 29 — AI Voice to Data
router.post('/voice-to-data', authMiddleware, async (req, res) => {
  try {
    const { transcript, schema } = req.body;
    const prompt = `Tum ek data extraction expert ho.

Schema fields: ${schema}
Voice transcript: "${transcript}"

Extract karo:
1. Har field ki value transcript se
2. JSON format mein output do
3. Missing fields identify karo
4. Confidence level har field ke liye
5. Corrections suggest karo agar kuch unclear ho

Sirf JSON output do pehle, phir explanation.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 30 — AI Portfolio Evaluator
router.post('/portfolio-eval', authMiddleware, async (req, res) => {
  try {
    const { projectUrl, description, techStack } = req.body;
    const prompt = `Tum ek senior tech recruiter ho.

Project: ${projectUrl}
Description: ${description}
Tech Stack: ${techStack}

Evaluate karo (0-100 each):
1. Code Quality Score
2. UI/UX Design Score
3. Innovation Score
4. Security Score
5. Performance Score
6. Employability Score
7. Overall verdict
8. Top 3 improvements
9. Would you hire this developer? (Yes/Maybe/No + reason)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 31 — AI Product Recommender
router.post('/product-recommend', authMiddleware, async (req, res) => {
  try {
    const { userHistory, preferences, budget, category } = req.body;
    const prompt = `Tum ek shopping advisor ho.

Category: ${category}
Budget: ${budget}
Preferences: ${preferences}
Past purchases/interests: ${userHistory}

Recommend karo:
1. Top 5 products (with reasons)
2. Why each product suits this user
3. Price comparison
4. Best value pick
5. Premium pick
6. Budget pick`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 32 — AI Debate Trainer
router.post('/debate', authMiddleware, async (req, res) => {
  try {
    const { topic, userSide, userArgument } = req.body;
    const prompt = `Tum ek debate opponent ho. Topic: "${topic}"

User ki side: ${userSide}
User ka argument: "${userArgument}"

Tum OPPOSING side se argue karo:
1. Strong counter-argument do
2. Logical fallacies point out karo (agar hain user ke argument mein)
3. Evidence-based points do
4. Rhetorical question pucho
5. Argument strength score karo (0-10)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 33 — AI Brand Identity Generator
router.post('/brand', authMiddleware, async (req, res) => {
  try {
    const { businessName, industry, audience, values } = req.body;
    const prompt = `Tum ek brand strategist ho.

Business: ${businessName}
Industry: ${industry}
Target Audience: ${audience}
Brand Values: ${values}

Complete brand identity banao:
1. Brand Archetype (Hero/Sage/Creator etc.) with explanation
2. Color Palette (5 colors with hex codes + rationale)
3. Font pairing recommendations
4. Brand voice guide (3-4 adjectives + examples)
5. 10 tagline options
6. Brand personality description`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 34 — AI Code Documentation
router.post('/code-docs', authMiddleware, async (req, res) => {
  try {
    const { code, language } = req.body;
    const prompt = `Tum ek technical writer ho. Yeh ${language} code document karo:

${code.substring(0, 3000)}

Banao:
1. README.md content
2. Inline comments for each function
3. API documentation (agar applicable)
4. Function reference guide
5. Setup instructions
6. Architecture overview (text format)`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

// Tool 35 — AI Form Builder
router.post('/form-builder', authMiddleware, async (req, res) => {
  try {
    const { formDescription } = req.body;
    const prompt = `Tum ek web developer ho. Yeh form description ke liye WCAG 2.2 compliant HTML/CSS/JS code banao:

"${formDescription}"

Requirements:
1. Semantic HTML5
2. ARIA labels
3. Keyboard navigation
4. Client-side validation with error messages
5. Responsive design
6. Clean CSS styling
7. JavaScript validation

Complete production-ready code do.`;
    const result = await callGroq(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI error: ' + err.message });
  }
});

module.exports = router;
