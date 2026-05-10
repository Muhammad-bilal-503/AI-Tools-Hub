import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function TravelTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    destination: '',
    days: '',
    budget: '',
    interests: ''
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
      const res = await api.post('/ai/travel', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="✈️" title="AI Travel Planner" desc="Destination batao — complete itinerary pao">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Destination</label>
            <input className="input-field" type="text" name="destination" value={form.destination}
              onChange={handleChange} placeholder="Bangkok, Istanbul, Dubai..." required />
          </div>
          <div className="form-group">
            <label>Kitne Din</label>
            <input className="input-field" type="text" name="days" value={form.days}
              onChange={handleChange} placeholder="5" required />
          </div>
          <div className="form-group">
            <label>Total Budget</label>
            <input className="input-field" type="text" name="budget" value={form.budget}
              onChange={handleChange} placeholder="Rs. 1,00,000" required />
          </div>
          <div className="form-group">
            <label>Interests</label>
            <input className="input-field" type="text" name="interests" value={form.interests}
              onChange={handleChange} placeholder="Food, history, adventure, shopping..." required />
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
