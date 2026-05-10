import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#1a1a2e',
      borderBottom: '1px solid #2d2d44',
      padding: '0 24px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <span style={{
          fontSize: '20px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ⚡ AI Platform
        </span>
        <span style={{ color: '#4a4a6a', fontSize: '12px', marginLeft: '8px' }}>35 Tools</span>
      </Link>

      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>
            👤 {user.name}
          </span>
          <Link to="/dashboard" style={{
            color: '#6366f1', textDecoration: 'none', fontSize: '14px', fontWeight: '500'
          }}>
            Dashboard
          </Link>
          <button onClick={handleLogout} style={{
            background: 'transparent',
            border: '1px solid #2d2d44',
            color: '#94a3b8',
            padding: '6px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px'
          }}>
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/login" style={{
            color: '#94a3b8', textDecoration: 'none', fontSize: '14px'
          }}>Login</Link>
          <Link to="/register" style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            textDecoration: 'none',
            padding: '6px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600'
          }}>Register</Link>
        </div>
      )}
    </nav>
  );
}
