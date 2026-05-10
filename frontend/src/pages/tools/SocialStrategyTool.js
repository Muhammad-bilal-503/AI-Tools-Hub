import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function SocialStrategyTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    platform: 'Instagram',
    niche: '',
    currentStats: '',
    goals: ''
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
      const res = await api.post('/ai/social-strategy', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="📱" title="AI Social Media Strategy" desc="30-day content calendar + strategy banao">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Platform</label>
            <select className="input-field" name="platform" value={form.platform} onChange={handleChange}>
              <option value="Instagram">Instagram</option>
              <option value="Twitter/X">Twitter/X</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="TikTok">TikTok</option>
              <option value="Facebook">Facebook</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>
          <div className="form-group">
            <label>Niche / Industry</label>
            <input className="input-field" type="text" name="niche" value={form.niche}
              onChange={handleChange} placeholder="Food blogger, Tech startup, Fashion brand..." required />
          </div>
          <div className="form-group">
            <label>Current Stats</label>
            <textarea className="input-field" name="currentStats" value={form.currentStats} onChange={handleChange}
              placeholder="Followers: 5000, Avg likes: 100, Posting: 3x week..." rows="4" required />
          </div>
          <div className="form-group">
            <label>Goals</label>
            <input className="input-field" type="text" name="goals" value={form.goals}
              onChange={handleChange} placeholder="10K followers in 3 months, more sales..." required />
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
