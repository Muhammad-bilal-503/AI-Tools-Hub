import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function PortfolioTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    projectUrl: '',
    description: '',
    techStack: ''
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
      const res = await api.post('/ai/portfolio-eval', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="⭐" title="AI Portfolio Evaluator" desc="Project submit karo — industry expert ka scorecard pao">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project URL / GitHub Link</label>
            <input className="input-field" type="text" name="projectUrl" value={form.projectUrl}
              onChange={handleChange} placeholder="https://myproject.vercel.app" required />
          </div>
          <div className="form-group">
            <label>Project Description</label>
            <textarea className="input-field" name="description" value={form.description} onChange={handleChange}
              placeholder="Yeh project kya karta hai, kaise banaya, unique features..." rows="4" required />
          </div>
          <div className="form-group">
            <label>Tech Stack Used</label>
            <input className="input-field" type="text" name="techStack" value={form.techStack}
              onChange={handleChange} placeholder="React, Node.js, MongoDB, Tailwind CSS..." required />
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
