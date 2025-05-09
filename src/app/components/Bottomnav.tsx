import React from 'react';
import { FaHome, FaSearch, FaComment } from 'react-icons/fa';

function BottomNav() {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#1a237e', // Richer dark blue
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around', // Evenly distributes icons
        alignItems: 'center',
        padding: '12px 0',
        maxWidth: '500px', // Optional: limits width on larger screens
        margin: '0 auto',
      }}>
        <FaHome 
          onClick={() => {
            window.location.href = '/dashboard/Home';
          }}
          style={{
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            opacity: 0.9,
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <FaSearch
          onClick={() => {
            window.location.href = '/Imdb/Search/Movies';
          }} 
          style={{
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            opacity: 0.9,
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <FaComment 
          style={{
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            opacity: 0.9,
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
    </div>
  );
}

export default BottomNav;