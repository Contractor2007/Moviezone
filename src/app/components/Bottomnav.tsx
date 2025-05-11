import React from 'react';
import { FaCopyright } from 'react-icons/fa';

const Bottomnav = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1e293b', // Slate dark blue
        color: '#f1f5f9', // Light text for contrast
        padding: '0.75rem 1rem',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.3px',
        }}
      >
        <FaCopyright style={{ marginRight: '6px', fontSize: '1rem' }} />
        <span>NovusMovies © 2025</span>
      </div>
    </footer>
  );
};

export default Bottomnav;
