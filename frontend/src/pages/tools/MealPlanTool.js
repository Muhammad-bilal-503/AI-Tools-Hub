import React, { useState } from 'react';
import ToolPage from '../../components/ToolPage';
import api from '../../services/api';

export default function MealPlanTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    goals: '',
    allergies: '',
    ingredients: '',
    calories: ''
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
      const res = await api.post('/ai/meal-plan', form);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Kuch error aayi — dobara try karo');
    }
    setLoading(false);
  };

  return (
    <ToolPage icon="🥗" title="AI Meal Planner" desc="7-day personalized meal plan + shopping list">
      <div className="card" style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Health Goals</label>
            <input className="input-field" type="text" name="goals" value={form.goals}
              onChange={handleChange} placeholder="Weight loss, muscle gain, energy boost..." required />
          </div>
          <div className="form-group">
            <label>Allergies / Restrictions</label>
            <input className="input-field" type="text" name="allergies" value={form.allergies}
              onChange={handleChange} placeholder="Dairy-free, gluten-free, vegetarian..." required />
          </div>
          <div className="form-group">
            <label>Available Ingredients</label>
            <textarea className="input-field" name="ingredients" value={form.ingredients} onChange={handleChange}
              placeholder="Chicken, rice, vegetables, eggs..." rows="4" required />
          </div>
          <div className="form-group">
            <label>Daily Calorie Target</label>
            <input className="input-field" type="text" name="calories" value={form.calories}
              onChange={handleChange} placeholder="2000" required />
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
