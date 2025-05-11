'use client'
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

function Topnav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900 text-white p-4 shadow-lg z-50 flex justify-between items-center">
      {/* Logo */}
      <h3 className="m-0 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
        NovusMovies
      </h3>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 items-center">
        <NavLink href="/Home" text="Home" />
        <NavLink href="/Imdb/Movies" text="Movies" />
        <NavLink href="/Imdb/News" text="News" />
        <NavLink href="/Imdb/Popular" text="Popular" />
        <NavLink href="/Imdb/TvShows" text="TvShows" />
      </div>
      
      {/* Mobile Menu Button */}
      <FaBars
        className="text-xl cursor-pointer md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 bg-slate-900 w-48 p-4 shadow-lg flex flex-col gap-3 md:hidden">
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
  return (
    <a 
      href={href}
      className="text-white hover:text-blue-400 no-underline font-medium transition-colors"
    >
      {text}
    </a>
  );
}

export default Topnav;