import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    background: '#18181b',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    textAlign: 'center'
  };

  const socialBtnStyle = {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    background: '#27272a',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#fff' }}>About</h2>
      <h3 style={{ fontSize: '1.5rem', color: '#f97316', marginBottom: '15px' }}>CARTIVO</h3>

      <p style={{ color: '#a1a1aa', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 30px auto' }}>
        <strong>CARTIVO</strong> - welcome to the CARTIVO website!
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          style={{ ...socialBtnStyle, background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444', color: '#ef4444' }}
        >
          YouTube
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          style={{ ...socialBtnStyle, background: 'rgba(236, 72, 153, 0.2)', borderColor: '#ec4899', color: '#ec4899' }}
        >
          Instagram
        </a>
        <a href="https://x.com" target="_blank" rel="noreferrer" style={socialBtnStyle}>
          X (Twitter)
        </a>
      </div>
    </div>
  );
};

export default About;
