import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function StoryTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    genre: 'Fantasy',
    characters: '',
    opening: '',
    instruction: ''
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
      const res = await api.post('/ai/story', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="📖" title="AI Story Writing Engine" desc="AI ke saath milke story likho">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Genre</label>
            <select className="input-field" name="genre" value={form.genre} onChange={handleChange}>
              <option value="Fantasy">Fantasy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Horror">Horror</option>
              <option value="Adventure">Adventure</option>
              <option value="Historical">Historical</option>
            </select>
          </div>
          <div className="form-group">
            <label>Characters</label>
            <input className="input-field" type="text" name="characters" value={form.characters}
              onChange={handleChange} placeholder="Ali (brave warrior), Zara (clever scientist)..." required />
          </div>
          <div className="form-group">
            <label>Opening / Story So Far</label>
            <textarea className="input-field" name="opening" value={form.opening} onChange={handleChange}
              placeholder="Story ka opening paragraph yahan likho..." rows="4" required />
          </div>
          <div className="form-group">
            <label>Direction (optional)</label>
            <input className="input-field" type="text" name="instruction" value={form.instruction}
              onChange={handleChange} placeholder="Plot twist lao, action badhao, end karo..." required />
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
