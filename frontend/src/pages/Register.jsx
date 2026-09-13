import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="home-container">
      <div style={{
        maxWidth: '450px',
        margin: '60px auto',
        padding: '40px',
        background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(249, 115, 22, 0.2)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
      }}>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Register</h2>
        
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
        
        {success && (
          <div style={{
            padding: '12px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '8px',
            color: '#86efac',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
              placeholder="Confirm your password"
            />
          </div>
          
          <button type="submit" className="btn" style={{ marginTop: '10px' }}>Register</button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#a1a1aa' }}>
          Already have an account? <a href="/login" style={{ color: '#f97316', fontWeight: '600' }}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
