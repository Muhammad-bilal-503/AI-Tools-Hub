import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ToolPage({ icon, title, desc, children }) {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 24px' }}>
      <button onClick={() => navigate('/dashboard')} style={{
        background: 'transparent', border: 'none', color: '#6366f1',
        cursor: 'pointer', fontSize: '14px', marginBottom: '20px',
        display: 'flex', alignItems: 'center', gap: '6px', padding: 0
      }}>
        ← Dashboard
      </button>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>{icon}</div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>{title}</h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>{desc}</p>
      </div>
      {children}
    </div>
  );
}
