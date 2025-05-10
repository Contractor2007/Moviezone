'use client'
import React, { useState } from 'react';
import { Menu } from 'lucide-react';


function Topnav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '1rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo */}
      <h3 style={{
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #3b82f6, #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>NovusMovies</h3>
      
      {/* Desktop Navigation */}
      <div style={{
        display: 'none',
        gap: '1.5rem',
        alignItems: 'center',
        '@media (minWidth: 768px)': {
          display: 'flex'
        }
      }}>
        <NavLink href="/Home" text="Home" />
        <NavLink href="/Imdb/Movies" text="Movies" />
        <NavLink href="/Imdb/News" text="News" />
        <NavLink href="/Imdb/Popular" text="Popular" />
        <NavLink href="/Imdb/TvShows" text="TvShows" />
      </div>
      
      {/* Mobile Menu Button */}
      <Menu
        style={{
          fontSize: '1.25rem',
          cursor: 'pointer',
          '@media (minWidth: 768px)': {
            display: 'none'
          }
        }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: '#0f172a',
          width: '200px',
          padding: '1rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          '@media (minWidth: 768px)': {
            display: 'none'
          }
        }}>
          <NavLink href="/Home" text="Home" />
          <NavLink href="/Imdb/Movies" text="Movies" />
          <NavLink href="/Imdb/News" text="News" />
          <NavLink href="/Imdb/Popular" text="Popular" />
          <NavLink href="/Imdb/TvShows" text="TvShows" />
        </div>
      )}
    </div>
  );
}

// Reusable NavLink component with proper typing
interface NavLinkProps {
  href: string;
  text: string;
}

function NavLink({ href, text }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href}
      style={{
        color: isHovered ? '#3b82f6' : 'white',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.2s'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </a>
  );
}

export default Topnav;