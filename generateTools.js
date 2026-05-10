const fs = require('fs');
const path = require('path');

const tools = [
  {
    file: 'ResumeTool', icon: '📄', title: 'AI Resume Builder', desc: 'Job description se tailored resume banao',
    endpoint: '/ai/resume', fields: [
      { key: 'jobDescription', label: 'Job Description', type: 'textarea', placeholder: 'Job posting yahan paste karo...' },
      { key: 'experience', label: 'Aapka Experience', type: 'textarea', placeholder: 'Work history, projects...' },
      { key: 'skills', label: 'Aapki Skills', type: 'text', placeholder: 'React, Node.js, Python...' }
    ]
  },
  {
    file: 'MentalHealthTool', icon: '🧠', title: 'AI Mental Health Companion', desc: 'Empathetic AI se apni feelings share karo',
    endpoint: '/ai/mental-health', fields: [
      { key: 'mood', label: 'Aaj ka mood', type: 'select', options: ['Happy', 'Sad', 'Anxious', 'Stressed', 'Neutral', 'Angry'] },
      { key: 'message', label: 'Aap kya feel kar rahe hain?', type: 'textarea', placeholder: 'Apni baat share karo...' }
    ]
  },
  {
    file: 'CodeReviewTool', icon: '🔍', title: 'AI Code Review', desc: 'Code paste karo — bugs, security issues aur fixes pao',
    endpoint: '/ai/code-review', fields: [
      { key: 'language', label: 'Programming Language', type: 'select', options: ['JavaScript', 'Python', 'PHP', 'Java', 'C++', 'TypeScript'] },
      { key: 'code', label: 'Apna Code Paste Karo', type: 'textarea', placeholder: 'Yahan code paste karo...' }
    ]
  },
  {
    file: 'LearningPathTool', icon: '🎓', title: 'AI Learning Path Generator', desc: 'Personalized syllabus banao kisi bhi topic ke liye',
    endpoint: '/ai/learning-path', fields: [
      { key: 'topic', label: 'Kya sikhna chahte hain?', type: 'text', placeholder: 'React.js, Machine Learning, Photography...' },
      { key: 'level', label: 'Current Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'] },
      { key: 'goal', label: 'Aapka Goal', type: 'textarea', placeholder: 'Job lena chahta hoon, freelancing, personal project...' }
    ]
  },
  {
    file: 'ContentStudioTool', icon: '✍️', title: 'AI Content Marketing Studio', desc: 'Blog, Instagram, Twitter, LinkedIn — sab ek saath',
    endpoint: '/ai/content-studio', fields: [
      { key: 'topic', label: 'Topic / Product', type: 'text', placeholder: 'Mera naya coffee shop, AI course...' },
      { key: 'audience', label: 'Target Audience', type: 'text', placeholder: 'Young professionals, students, entrepreneurs...' },
      { key: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual', 'Funny', 'Inspirational', 'Urgent'] }
    ]
  },
  {
    file: 'LegalSummaryTool', icon: '⚖️', title: 'AI Legal Document Summarizer', desc: 'Contract paste karo — simple English mein samjho',
    endpoint: '/ai/legal-summary', fields: [
      { key: 'documentText', label: 'Document Text Paste Karo', type: 'textarea', placeholder: 'Contract, NDA, Terms of Service...' }
    ]
  },
  {
    file: 'FakeNewsTool', icon: '📰', title: 'AI Fake News Detector', desc: 'Article paste karo — credibility score pao',
    endpoint: '/ai/fake-news', fields: [
      { key: 'articleText', label: 'Article Text Paste Karo', type: 'textarea', placeholder: 'News article yahan paste karo...' }
    ]
  },
  {
    file: 'FinanceTool', icon: '💰', title: 'AI Personal Finance Advisor', desc: 'Income, expenses batao — savings plan pao',
    endpoint: '/ai/finance', fields: [
      { key: 'income', label: 'Monthly Income', type: 'text', placeholder: 'Rs. 50,000' },
      { key: 'expenses', label: 'Monthly Expenses (categories)', type: 'textarea', placeholder: 'Rent: 15000, Food: 8000, Transport: 3000...' },
      { key: 'goals', label: 'Financial Goals', type: 'textarea', placeholder: 'Car khareedna hai, emergency fund banana...' }
    ]
  },
  {
    file: 'AccessibilityTool', icon: '♿', title: 'AI Accessibility Auditor', desc: 'HTML paste karo — WCAG issues aur fixes pao',
    endpoint: '/ai/accessibility', fields: [
      { key: 'htmlCode', label: 'HTML Code Paste Karo', type: 'textarea', placeholder: '<div>...your HTML...</div>' }
    ]
  },
  {
    file: 'InterviewTool', icon: '🎤', title: 'AI Interview Coach', desc: 'Job role select karo — mock interview practice karo',
    endpoint: '/ai/interview', fields: [
      { key: 'role', label: 'Job Role', type: 'text', placeholder: 'Frontend Developer, Marketing Manager...' },
      { key: 'level', label: 'Experience Level', type: 'select', options: ['Fresher', 'Junior (1-2 years)', 'Mid (3-5 years)', 'Senior (5+ years)'] },
      { key: 'question', label: 'Interview Question', type: 'textarea', placeholder: 'Tell me about yourself...' },
      { key: 'answer', label: 'Aapka Answer', type: 'textarea', placeholder: 'Apna jawab yahan likho...' }
    ]
  },
  {
    file: 'MealPlanTool', icon: '🥗', title: 'AI Meal Planner', desc: '7-day personalized meal plan + shopping list',
    endpoint: '/ai/meal-plan', fields: [
      { key: 'goals', label: 'Health Goals', type: 'text', placeholder: 'Weight loss, muscle gain, energy boost...' },
      { key: 'allergies', label: 'Allergies / Restrictions', type: 'text', placeholder: 'Dairy-free, gluten-free, vegetarian...' },
      { key: 'ingredients', label: 'Available Ingredients', type: 'textarea', placeholder: 'Chicken, rice, vegetables, eggs...' },
      { key: 'calories', label: 'Daily Calorie Target', type: 'text', placeholder: '2000' }
    ]
  },
  {
    file: 'TravelTool', icon: '✈️', title: 'AI Travel Planner', desc: 'Destination batao — complete itinerary pao',
    endpoint: '/ai/travel', fields: [
      { key: 'destination', label: 'Destination', type: 'text', placeholder: 'Bangkok, Istanbul, Dubai...' },
      { key: 'days', label: 'Kitne Din', type: 'text', placeholder: '5' },
      { key: 'budget', label: 'Total Budget', type: 'text', placeholder: 'Rs. 1,00,000' },
      { key: 'interests', label: 'Interests', type: 'text', placeholder: 'Food, history, adventure, shopping...' }
    ]
  },
  {
    file: 'PlagiarismTool', icon: '🔎', title: 'AI Plagiarism Checker', desc: 'Text paste karo — AI-written content detect karo',
    endpoint: '/ai/plagiarism', fields: [
      { key: 'text', label: 'Text Paste Karo', type: 'textarea', placeholder: 'Essay ya content yahan paste karo...' }
    ]
  },
  {
    file: 'ChatbotTool', icon: '🤖', title: 'AI Chatbot Builder', desc: 'Business info aur FAQs se chatbot banao',
    endpoint: '/ai/chatbot', fields: [
      { key: 'businessInfo', label: 'Business Name / Type', type: 'text', placeholder: 'TechStore Pakistan — electronics retailer' },
      { key: 'faqs', label: 'FAQs / Knowledge Base', type: 'textarea', placeholder: 'Q: Delivery time? A: 2-3 days...' },
      { key: 'userQuery', label: 'Test Customer Question', type: 'text', placeholder: 'Do you offer returns?' }
    ]
  },
  {
    file: 'AltTextTool', icon: '🖼️', title: 'AI Alt Text Generator', desc: 'Image describe karo — SEO alt text + captions pao',
    endpoint: '/ai/alt-text', fields: [
      { key: 'imageDescription', label: 'Image Ko Describe Karo', type: 'textarea', placeholder: 'A sunset over mountains with orange sky and silhouette of trees...' }
    ]
  },
  {
    file: 'HomeworkTool', icon: '📚', title: 'AI Homework Helper', desc: 'Socratic AI tutor — step by step samjhao',
    endpoint: '/ai/homework', fields: [
      { key: 'subject', label: 'Subject', type: 'select', options: ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Computer Science', 'Economics'] },
      { key: 'level', label: 'Level', type: 'select', options: ['Primary', 'Middle School', 'High School', 'University'] },
      { key: 'question', label: 'Homework Question', type: 'textarea', placeholder: 'Apna question yahan likho ya paste karo...' }
    ]
  },
  {
    file: 'SentimentTool', icon: '📊', title: 'AI Sentiment Analyzer', desc: 'Product reviews paste karo — feature-level analysis pao',
    endpoint: '/ai/sentiment', fields: [
      { key: 'reviews', label: 'Product Reviews Paste Karo', type: 'textarea', placeholder: 'Review 1: Great battery life...\nReview 2: Design is good but...' }
    ]
  },
  {
    file: 'LanguageTool', icon: '🌍', title: 'AI Language Companion', desc: 'AI se conversational language practice karo',
    endpoint: '/ai/language', fields: [
      { key: 'targetLanguage', label: 'Kaunsi Language Sikhni Hai', type: 'select', options: ['French', 'Spanish', 'Arabic', 'Chinese', 'German', 'Japanese', 'Turkish', 'Persian'] },
      { key: 'level', label: 'Level', type: 'select', options: ['Beginner', 'Elementary', 'Intermediate', 'Advanced'] },
      { key: 'scenario', label: 'Scenario', type: 'text', placeholder: 'At a restaurant, Airport, Job interview...' },
      { key: 'userMessage', label: 'Aap Kya Kehna Chahte Hain', type: 'textarea', placeholder: 'Type in target language ya English mein...' }
    ]
  },
  {
    file: 'MeetingTool', icon: '📋', title: 'AI Meeting Summarizer', desc: 'Meeting transcript paste karo — structured notes pao',
    endpoint: '/ai/meeting-summary', fields: [
      { key: 'transcript', label: 'Meeting Transcript Paste Karo', type: 'textarea', placeholder: 'John: We need to launch by Friday...\nSarah: I can handle the design...' }
    ]
  },
  {
    file: 'EmailTool', icon: '📧', title: 'AI Email Composer', desc: '3 tone variants ek saath generate karo',
    endpoint: '/ai/email', fields: [
      { key: 'receivedEmail', label: 'Received Email (optional)', type: 'textarea', placeholder: 'Jo email mili hai woh paste karo...' },
      { key: 'context', label: 'Situation / Context', type: 'textarea', placeholder: 'Mujhe salary raise maangna hai, client ko deadline extend karni hai...' },
      { key: 'purpose', label: 'Email Ka Maqsad', type: 'text', placeholder: 'Follow up, complaint, request, apology...' }
    ]
  },
  {
    file: 'SymptomsTool', icon: '🏥', title: 'AI Symptom Checker (Educational)', desc: 'Symptoms batao — educational health info pao',
    endpoint: '/ai/symptoms', fields: [
      { key: 'symptoms', label: 'Symptoms Describe Karo', type: 'textarea', placeholder: 'Headache, fever since 2 days, mild cough...' },
      { key: 'age', label: 'Age Group', type: 'select', options: ['Child (0-12)', 'Teen (13-17)', 'Adult (18-45)', 'Middle Age (46-60)', 'Senior (60+)'] },
      { key: 'area', label: 'Body Area', type: 'text', placeholder: 'Head, chest, stomach, full body...' }
    ]
  },
  {
    file: 'NewsTool', icon: '📡', title: 'AI News Digest', desc: 'Articles paste karo — summarized digest pao',
    endpoint: '/ai/news-digest', fields: [
      { key: 'topics', label: 'Aapki Interests', type: 'text', placeholder: 'Technology, Sports, Politics, Business...' },
      { key: 'articles', label: 'News Articles Paste Karo', type: 'textarea', placeholder: 'Article 1 headline + text...\nArticle 2...' }
    ]
  },
  {
    file: 'StoryTool', icon: '📖', title: 'AI Story Writing Engine', desc: 'AI ke saath milke story likho',
    endpoint: '/ai/story', fields: [
      { key: 'genre', label: 'Genre', type: 'select', options: ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Adventure', 'Historical'] },
      { key: 'characters', label: 'Characters', type: 'text', placeholder: 'Ali (brave warrior), Zara (clever scientist)...' },
      { key: 'opening', label: 'Opening / Story So Far', type: 'textarea', placeholder: 'Story ka opening paragraph yahan likho...' },
      { key: 'instruction', label: 'Direction (optional)', type: 'text', placeholder: 'Plot twist lao, action badhao, end karo...' }
    ]
  },
  {
    file: 'ScraperTool', icon: '🕷️', title: 'AI Web Scraper Generator', desc: 'Plain English mein batao — scraper code pao',
    endpoint: '/ai/scraper', fields: [
      { key: 'url', label: 'Website URL', type: 'text', placeholder: 'https://example.com/products' },
      { key: 'dataDescription', label: 'Kaunsa Data Chahiye?', type: 'textarea', placeholder: 'Product names, prices, aur ratings chahiye...' }
    ]
  },
  {
    file: 'FlashcardTool', icon: '🃏', title: 'AI Flashcard Generator', desc: 'Notes paste karo — flashcards, quiz, mind map pao',
    endpoint: '/ai/flashcards', fields: [
      { key: 'subject', label: 'Subject', type: 'text', placeholder: 'World War 2, Data Structures, Organic Chemistry...' },
      { key: 'notes', label: 'Lecture Notes Paste Karo', type: 'textarea', placeholder: 'Apne notes yahan paste karo...' }
    ]
  },
  {
    file: 'SecurityTool', icon: '🛡️', title: 'AI Security Scanner', desc: 'Code ya URL submit karo — vulnerabilities pao',
    endpoint: '/ai/security', fields: [
      { key: 'type', label: 'Kya Scan Karna Hai?', type: 'select', options: ['PHP Code', 'JavaScript Code', 'Python Code', 'HTML/CSS', 'SQL Query'] },
      { key: 'code', label: 'Code Paste Karo', type: 'textarea', placeholder: 'Apna code yahan paste karo...' }
    ]
  },
  {
    file: 'InteriorTool', icon: '🏠', title: 'AI Interior Design Visualizer', desc: 'Room describe karo — complete design plan pao',
    endpoint: '/ai/interior-design', fields: [
      { key: 'roomType', label: 'Room Type', type: 'select', options: ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Dining Room', 'Bathroom'] },
      { key: 'style', label: 'Style Preference', type: 'select', options: ['Modern', 'Minimalist', 'Traditional', 'Industrial', 'Scandinavian', 'Bohemian'] },
      { key: 'budget', label: 'Budget', type: 'text', placeholder: 'Rs. 2,00,000' },
      { key: 'dimensions', label: 'Room Size', type: 'text', placeholder: '15x20 feet, medium sized' }
    ]
  },
  {
    file: 'SocialStrategyTool', icon: '📱', title: 'AI Social Media Strategy', desc: '30-day content calendar + strategy banao',
    endpoint: '/ai/social-strategy', fields: [
      { key: 'platform', label: 'Platform', type: 'select', options: ['Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'Facebook', 'YouTube'] },
      { key: 'niche', label: 'Niche / Industry', type: 'text', placeholder: 'Food blogger, Tech startup, Fashion brand...' },
      { key: 'currentStats', label: 'Current Stats', type: 'textarea', placeholder: 'Followers: 5000, Avg likes: 100, Posting: 3x week...' },
      { key: 'goals', label: 'Goals', type: 'text', placeholder: '10K followers in 3 months, more sales...' }
    ]
  },
  {
    file: 'VoiceDataTool', icon: '🎙️', title: 'AI Voice to Structured Data', desc: 'Transcript paste karo — structured form data pao',
    endpoint: '/ai/voice-to-data', fields: [
      { key: 'schema', label: 'Database Fields (schema)', type: 'text', placeholder: 'name, age, disease, appointment_date, phone' },
      { key: 'transcript', label: 'Voice Transcript', type: 'textarea', placeholder: 'Add patient Ali Khan, 35 years old, diabetes, appointment Friday 3pm...' }
    ]
  },
  {
    file: 'PortfolioTool', icon: '⭐', title: 'AI Portfolio Evaluator', desc: 'Project submit karo — industry expert ka scorecard pao',
    endpoint: '/ai/portfolio-eval', fields: [
      { key: 'projectUrl', label: 'Project URL / GitHub Link', type: 'text', placeholder: 'https://myproject.vercel.app' },
      { key: 'description', label: 'Project Description', type: 'textarea', placeholder: 'Yeh project kya karta hai, kaise banaya, unique features...' },
      { key: 'techStack', label: 'Tech Stack Used', type: 'text', placeholder: 'React, Node.js, MongoDB, Tailwind CSS...' }
    ]
  },
  {
    file: 'ProductRecommendTool', icon: '🛒', title: 'AI Product Recommender', desc: 'Preferences batao — personalized products pao',
    endpoint: '/ai/product-recommend', fields: [
      { key: 'category', label: 'Product Category', type: 'text', placeholder: 'Laptop, Smartphone, Shoes, Books...' },
      { key: 'budget', label: 'Budget', type: 'text', placeholder: 'Rs. 80,000' },
      { key: 'preferences', label: 'Preferences', type: 'textarea', placeholder: 'Gaming laptop, lightweight, good battery...' },
      { key: 'userHistory', label: 'Past Interests / Purchases', type: 'text', placeholder: 'Already have iPhone, use Adobe Creative Suite...' }
    ]
  },
  {
    file: 'DebateTool', icon: '🗣️', title: 'AI Debate Trainer', desc: 'AI se argue karo — reasoning skills improve karo',
    endpoint: '/ai/debate', fields: [
      { key: 'topic', label: 'Debate Topic', type: 'text', placeholder: 'Social media is harmful, AI will replace jobs...' },
      { key: 'userSide', label: 'Aap Kaunsi Side Lete Hain?', type: 'select', options: ['For (Agree)', 'Against (Disagree)'] },
      { key: 'userArgument', label: 'Aapka Argument', type: 'textarea', placeholder: 'Apni point yahan likho...' }
    ]
  },
  {
    file: 'BrandTool', icon: '🎨', title: 'AI Brand Identity Generator', desc: 'Business batao — complete brand kit pao',
    endpoint: '/ai/brand', fields: [
      { key: 'businessName', label: 'Business Name', type: 'text', placeholder: 'TechNova, GreenEats, UrbanStyle...' },
      { key: 'industry', label: 'Industry', type: 'text', placeholder: 'Food & Beverage, Technology, Fashion...' },
      { key: 'audience', label: 'Target Audience', type: 'text', placeholder: 'Young professionals, students, mothers...' },
      { key: 'values', label: 'Brand Values', type: 'text', placeholder: 'Innovation, Trust, Sustainability, Fun...' }
    ]
  },
  {
    file: 'CodeDocsTool', icon: '📝', title: 'AI Code Documentation Generator', desc: 'Code paste karo — README + docs auto banao',
    endpoint: '/ai/code-docs', fields: [
      { key: 'language', label: 'Language', type: 'select', options: ['JavaScript', 'Python', 'PHP', 'Java', 'TypeScript', 'C++'] },
      { key: 'code', label: 'Code Paste Karo', type: 'textarea', placeholder: 'Apna code yahan paste karo...' }
    ]
  },
  {
    file: 'FormBuilderTool', icon: '📋', title: 'AI Accessible Form Builder', desc: 'Form describe karo — WCAG-compliant HTML pao',
    endpoint: '/ai/form-builder', fields: [
      { key: 'formDescription', label: 'Form Describe Karo (English mein)', type: 'textarea', placeholder: 'I need a contact form with name, email, phone, message, and a submit button with validation...' }
    ]
  }
];

const template = (tool) => `import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function ${tool.file}() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({${tool.fields.map(f => `\n    ${f.key}: '${f.type === 'select' ? f.options[0] : ''}'`).join(',')}
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    setLoading(true);
    try {
      const res = await api.post('${tool.endpoint}', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="${tool.icon}" title="${tool.title}" desc="${tool.desc}">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          ${tool.fields.map(f => {
            if (f.type === 'select') {
              return `<div className="form-group">
            <label>${f.label}</label>
            <select className="input-field" name="${f.key}" value={form.${f.key}} onChange={handleChange}>
              ${f.options.map(o => `<option value="${o}">${o}</option>`).join('\n              ')}
            </select>
          </div>`;
            } else if (f.type === 'textarea') {
              return `<div className="form-group">
            <label>${f.label}</label>
            <textarea className="input-field" name="${f.key}" value={form.${f.key}} onChange={handleChange}
              placeholder="${f.placeholder}" rows="4" required />
          </div>`;
            } else {
              return `<div className="form-group">
            <label>${f.label}</label>
            <input className="input-field" type="text" name="${f.key}" value={form.${f.key}}
              onChange={handleChange} placeholder="${f.placeholder}" required />
          </div>`;
            }
          }).join('\n          ')}
          <button className="btn-primary" type="submit" disabled={loading}
            style={{ width: '100%', padding: '12px', fontSize: '15px' }}>
            {loading ? 'AI Kaam Kar Rahi Hai...' : '✨ Generate'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="loading" style={{ justifyContent: 'center', padding: '20px' }}>
          <div className="spinner" />
          <span>AI response generate kar rahi hai...</span>
        </div>
      )}

      {error && <div className="error-msg">{error}</div>}

      {result && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#6366f1' }}>✅ AI Result</h3>
            <button onClick={() => navigator.clipboard.writeText(result)} style={{
              background: 'transparent', border: '1px solid #2d2d44', color: '#94a3b8',
              padding: '4px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
            }}>Copy</button>
          </div>
          <div className="result-box">{result}</div>
        </div>
      )}
    </ToolPage>
  );
}
`;

const outDir = path.join(__dirname, 'frontend/src/pages/tools');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

tools.forEach(tool => {
  const content = template(tool);
  fs.writeFileSync(path.join(outDir, `${tool.file}.js`), content);
  console.log(`✅ Created: ${tool.file}.js`);
});

console.log('\n🎉 Sab 35 tool pages ban gaye!');
