import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function MentalHealthTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    mood: 'Happy',
    message: ''
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
      const res = await api.post('/ai/mental-health', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="🧠" title="AI Mental Health Companion" desc="Empathetic AI se apni feelings share karo">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Aaj ka mood</label>
            <select className="input-field" name="mood" value={form.mood} onChange={handleChange}>
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Anxious">Anxious</option>
              <option value="Stressed">Stressed</option>
              <option value="Neutral">Neutral</option>
              <option value="Angry">Angry</option>
            </select>
          </div>
          <div className="form-group">
            <label>Aap kya feel kar rahe hain?</label>
            <textarea className="input-field" name="message" value={form.message} onChange={handleChange}
              placeholder="Apni baat share karo..." rows="4" required />
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
