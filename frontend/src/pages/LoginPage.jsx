import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data);
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="home-container">
      <div style={{
        maxWidth: '400px',
        margin: '60px auto',
        padding: '40px',
        background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(249, 115, 22, 0.2)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
      }}>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Login</h2>
        
        {error && (
          <div style={{
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '8px',
            color: '#fca5a5',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(249, 115, 22, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px'
              }}
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(249, 115, 22, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px'
              }}
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="btn" style={{ marginTop: '10px' }}>Login</button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#a1a1aa' }}>
          Don't have an account? <a href="/register" style={{ color: '#f97316', fontWeight: '600' }}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
