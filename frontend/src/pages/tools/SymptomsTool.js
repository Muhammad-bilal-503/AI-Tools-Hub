import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function SymptomsTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    symptoms: '',
    age: 'Child (0-12)',
    area: ''
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
      const res = await api.post('/ai/symptoms', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="🏥" title="AI Symptom Checker (Educational)" desc="Symptoms batao — educational health info pao">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Symptoms Describe Karo</label>
            <textarea className="input-field" name="symptoms" value={form.symptoms} onChange={handleChange}
              placeholder="Headache, fever since 2 days, mild cough..." rows="4" required />
          </div>
          <div className="form-group">
            <label>Age Group</label>
            <select className="input-field" name="age" value={form.age} onChange={handleChange}>
              <option value="Child (0-12)">Child (0-12)</option>
              <option value="Teen (13-17)">Teen (13-17)</option>
              <option value="Adult (18-45)">Adult (18-45)</option>
              <option value="Middle Age (46-60)">Middle Age (46-60)</option>
              <option value="Senior (60+)">Senior (60+)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Body Area</label>
            <input className="input-field" type="text" name="area" value={form.area}
              onChange={handleChange} placeholder="Head, chest, stomach, full body..." required />
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
