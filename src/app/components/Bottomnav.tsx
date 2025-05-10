import React from 'react'
import { Copyright } from "lucide-react";

const Bottomnav = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#1a237e', // Richer dark blue
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      padding:'3px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around', // Evenly distributes icons
        alignItems: 'center',
        maxWidth: '500px', // Optional: limits width on larger screens
        margin: '0 auto',
      }} className="flex inline "><div className=""><Copyright className='inline'/><p className='inline'>NovusMovies 2025</p></div></div>
    </div>
  )
}

export default Bottomnav
