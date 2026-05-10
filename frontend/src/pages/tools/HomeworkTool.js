import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function HomeworkTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    subject: 'Math',
    level: 'Primary',
    question: ''
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
      const res = await api.post('/ai/homework', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="📚" title="AI Homework Helper" desc="Socratic AI tutor — step by step samjhao">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject</label>
            <select className="input-field" name="subject" value={form.subject} onChange={handleChange}>
              <option value="Math">Math</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="History">History</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Economics">Economics</option>
            </select>
          </div>
          <div className="form-group">
            <label>Level</label>
            <select className="input-field" name="level" value={form.level} onChange={handleChange}>
              <option value="Primary">Primary</option>
              <option value="Middle School">Middle School</option>
              <option value="High School">High School</option>
              <option value="University">University</option>
            </select>
          </div>
          <div className="form-group">
            <label>Homework Question</label>
            <textarea className="input-field" name="question" value={form.question} onChange={handleChange}
              placeholder="Apna question yahan likho ya paste karo..." rows="4" required />
          </div>
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
