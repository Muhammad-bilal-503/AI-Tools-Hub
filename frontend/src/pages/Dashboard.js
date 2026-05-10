import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const tools = [
  { id: 1, title: 'Resume Builder', desc: 'Job description se tailored resume banao', icon: '📄', route: '/tool/resume', domain: 'Career', level: 'Intermediate', color: '#6366f1' },
  { id: 2, title: 'Mental Health Companion', desc: 'Empathetic AI chatbot for mood tracking', icon: '🧠', route: '/tool/mental-health', domain: 'Health', level: 'Advanced', color: '#ec4899' },
  { id: 3, title: 'Code Review', desc: 'Code bugs, security issues aur fixes', icon: '🔍', route: '/tool/code-review', domain: 'Dev Tools', level: 'Intermediate', color: '#10b981' },
  { id: 4, title: 'E-Learning Path', desc: 'Personalized learning path generate karo', icon: '🎓', route: '/tool/learning-path', domain: 'EdTech', level: 'Advanced', color: '#f59e0b' },
  { id: 5, title: 'Content Studio', desc: 'Blog, social posts, ad copy — sab ek saath', icon: '✍️', route: '/tool/content-studio', domain: 'Marketing', level: 'Intermediate', color: '#8b5cf6' },
  { id: 6, title: 'Legal Summarizer', desc: 'Contracts ko simple English mein samjho', icon: '⚖️', route: '/tool/legal-summary', domain: 'Legal', level: 'Intermediate', color: '#06b6d4' },
  { id: 7, title: 'Fake News Detector', desc: 'Articles fact-check karo, credibility score', icon: '📰', route: '/tool/fake-news', domain: 'Media', level: 'Advanced', color: '#ef4444' },
  { id: 8, title: 'Finance Advisor', desc: 'Spending analyze karo, savings plan banao', icon: '💰', route: '/tool/finance', domain: 'FinTech', level: 'Intermediate', color: '#22c55e' },
  { id: 9, title: 'Accessibility Auditor', desc: 'WCAG compliance check aur auto-fix', icon: '♿', route: '/tool/accessibility', domain: 'Web Eng', level: 'Intermediate', color: '#f97316' },
  { id: 10, title: 'Interview Coach', desc: 'Mock interviews with AI scoring', icon: '🎤', route: '/tool/interview', domain: 'Career', level: 'Advanced', color: '#6366f1' },
  { id: 11, title: 'Meal Planner', desc: '7-day personalized meal plan + shopping list', icon: '🥗', route: '/tool/meal-plan', domain: 'Health', level: 'Beginner', color: '#84cc16' },
  { id: 12, title: 'Travel Planner', desc: 'Day-by-day itinerary with budget breakdown', icon: '✈️', route: '/tool/travel', domain: 'Travel', level: 'Intermediate', color: '#0ea5e9' },
  { id: 13, title: 'Plagiarism Checker', desc: 'AI-generated text detect karo', icon: '🔎', route: '/tool/plagiarism', domain: 'EdTech', level: 'Intermediate', color: '#d946ef' },
  { id: 14, title: 'Chatbot Builder', desc: 'Custom support chatbot apne docs se', icon: '🤖', route: '/tool/chatbot', domain: 'Business', level: 'Advanced', color: '#14b8a6' },
  { id: 15, title: 'Alt Text Generator', desc: 'Images ke liye SEO alt text banao', icon: '🖼️', route: '/tool/alt-text', domain: 'Accessibility', level: 'Beginner', color: '#a855f7' },
  { id: 16, title: 'Homework Helper', desc: 'Socratic AI tutor — step by step', icon: '📚', route: '/tool/homework', domain: 'EdTech', level: 'Beginner', color: '#f59e0b' },
  { id: 17, title: 'Sentiment Analyzer', desc: 'Product reviews ka feature-level analysis', icon: '📊', route: '/tool/sentiment', domain: 'E-Commerce', level: 'Intermediate', color: '#3b82f6' },
  { id: 18, title: 'Language Companion', desc: 'Conversational AI language teacher', icon: '🌍', route: '/tool/language', domain: 'EdTech', level: 'Intermediate', color: '#10b981' },
  { id: 19, title: 'Meeting Summarizer', desc: 'Transcripts se structured notes + action items', icon: '📋', route: '/tool/meeting', domain: 'Productivity', level: 'Intermediate', color: '#6366f1' },
  { id: 20, title: 'Email Composer', desc: '3 tone variants simultaneously generate karo', icon: '📧', route: '/tool/email', domain: 'Productivity', level: 'Beginner', color: '#ec4899' },
  { id: 21, title: 'Symptom Checker', desc: 'Educational health information tool', icon: '🏥', route: '/tool/symptoms', domain: 'Health', level: 'Advanced', color: '#ef4444' },
  { id: 22, title: 'News Digest', desc: 'Personalized daily news with bias labels', icon: '📡', route: '/tool/news', domain: 'Media', level: 'Intermediate', color: '#f97316' },
  { id: 23, title: 'Story Writing Engine', desc: 'AI ke saath milke story likho', icon: '📖', route: '/tool/story', domain: 'Creative', level: 'Beginner', color: '#8b5cf6' },
  { id: 24, title: 'Web Scraper', desc: 'Plain English mein scraper code generate karo', icon: '🕷️', route: '/tool/scraper', domain: 'Data Eng', level: 'Advanced', color: '#06b6d4' },
  { id: 25, title: 'Flashcard Generator', desc: 'Notes se flashcards, quiz, mind map', icon: '🃏', route: '/tool/flashcards', domain: 'EdTech', level: 'Beginner', color: '#22c55e' },
  { id: 26, title: 'Security Scanner', desc: 'Code/URL OWASP vulnerability scan', icon: '🛡️', route: '/tool/security', domain: 'Security', level: 'Advanced', color: '#ef4444' },
  { id: 27, title: 'Interior Design', desc: 'Room description se design + color palette', icon: '🏠', route: '/tool/interior', domain: 'Creative', level: 'Intermediate', color: '#f59e0b' },
  { id: 28, title: 'Social Strategy', desc: '30-day social media content calendar', icon: '📱', route: '/tool/social-strategy', domain: 'Marketing', level: 'Advanced', color: '#d946ef' },
  { id: 29, title: 'Voice to Data', desc: 'Bolo — AI structured form fill kar dega', icon: '🎙️', route: '/tool/voice-data', domain: 'Productivity', level: 'Intermediate', color: '#14b8a6' },
  { id: 30, title: 'Portfolio Evaluator', desc: 'Project ko industry expert ki nazar se dekho', icon: '⭐', route: '/tool/portfolio', domain: 'Career', level: 'Intermediate', color: '#a855f7' },
  { id: 31, title: 'Product Recommender', desc: 'Personalized product recommendations', icon: '🛒', route: '/tool/product-recommend', domain: 'E-Commerce', level: 'Advanced', color: '#3b82f6' },
  { id: 32, title: 'Debate Trainer', desc: 'AI se debate karo, reasoning improve karo', icon: '🗣️', route: '/tool/debate', domain: 'EdTech', level: 'Intermediate', color: '#10b981' },
  { id: 33, title: 'Brand Identity', desc: 'Complete brand kit — logo concept, colors, fonts', icon: '🎨', route: '/tool/brand', domain: 'Design', level: 'Intermediate', color: '#6366f1' },
  { id: 34, title: 'Code Documentation', desc: 'Codebase se auto README + docs generate', icon: '📝', route: '/tool/code-docs', domain: 'Dev Tools', level: 'Beginner', color: '#f59e0b' },
  { id: 35, title: 'Form Builder', desc: 'Plain English se WCAG-compliant HTML form', icon: '📋', route: '/tool/form-builder', domain: 'Web Eng', level: 'Intermediate', color: '#ec4899' },
];

const domains = ['All', 'Career', 'Health', 'Dev Tools', 'EdTech', 'Marketing', 'Legal', 'Media', 'FinTech', 'Web Eng', 'Business', 'Accessibility', 'E-Commerce', 'Productivity', 'Travel', 'Creative', 'Data Eng', 'Security', 'Design'];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeDomain, setActiveDomain] = useState('All');

  const filtered = tools.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    const matchDomain = activeDomain === 'All' || t.domain === activeDomain;
    return matchSearch && matchDomain;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
          Welcome, {user?.name}! 👋
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          35 AI-powered tools — ek jagah, ek login
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Tools', value: '35', icon: '⚡' },
          { label: 'Domains', value: '13', icon: '🌐' },
          { label: 'Status', value: 'Active', icon: '✅' }
        ].map((s, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#6366f1' }}>{s.value}</div>
            <div style={{ color: '#64748b', fontSize: '13px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          className="input-field"
          placeholder="🔍 Tool search karo..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ fontSize: '15px', padding: '12px 16px' }}
        />
      </div>

      {/* Domain filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {domains.map(d => (
          <button key={d} onClick={() => setActiveDomain(d)} style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid',
            borderColor: activeDomain === d ? '#6366f1' : '#2d2d44',
            background: activeDomain === d ? '#6366f1' : 'transparent',
            color: activeDomain === d ? 'white' : '#94a3b8',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}>{d}</button>
        ))}
      </div>

      {/* Tools Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {filtered.map(tool => (
          <div key={tool.id} onClick={() => navigate(tool.route)}
            className="card"
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderColor: '#2d2d44',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = tool.color;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#2d2d44';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Top color bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: tool.color, borderRadius: '12px 12px 0 0'
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginTop: '8px' }}>
              <div style={{
                fontSize: '28px',
                background: '#0f0f1a',
                borderRadius: '10px',
                padding: '8px',
                minWidth: '48px',
                textAlign: 'center'
              }}>{tool.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#4a4a6a', fontWeight: '600' }}>
                    #{String(tool.id).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    background: '#0f0f1a',
                    color: tool.color,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: '600'
                  }}>{tool.level}</span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px', color: '#e2e8f0' }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>
                  {tool.desc}
                </p>
                <div style={{
                  marginTop: '10px',
                  fontSize: '11px',
                  color: '#4a4a6a',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {tool.domain}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#4a4a6a' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <p>Koi tool nahi mila — search change karo</p>
        </div>
      )}
    </div>
  );
}
