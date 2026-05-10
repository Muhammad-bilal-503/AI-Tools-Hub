import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function InteriorTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    roomType: 'Living Room',
    style: 'Modern',
    budget: '',
    dimensions: ''
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
      const res = await api.post('/ai/interior-design', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="🏠" title="AI Interior Design Visualizer" desc="Room describe karo — complete design plan pao">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Room Type</label>
            <select className="input-field" name="roomType" value={form.roomType} onChange={handleChange}>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Office">Office</option>
              <option value="Dining Room">Dining Room</option>
              <option value="Bathroom">Bathroom</option>
            </select>
          </div>
          <div className="form-group">
            <label>Style Preference</label>
            <select className="input-field" name="style" value={form.style} onChange={handleChange}>
              <option value="Modern">Modern</option>
              <option value="Minimalist">Minimalist</option>
              <option value="Traditional">Traditional</option>
              <option value="Industrial">Industrial</option>
              <option value="Scandinavian">Scandinavian</option>
              <option value="Bohemian">Bohemian</option>
            </select>
          </div>
          <div className="form-group">
            <label>Budget</label>
            <input className="input-field" type="text" name="budget" value={form.budget}
              onChange={handleChange} placeholder="Rs. 2,00,000" required />
          </div>
          <div className="form-group">
            <label>Room Size</label>
            <input className="input-field" type="text" name="dimensions" value={form.dimensions}
              onChange={handleChange} placeholder="15x20 feet, medium sized" required />
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
