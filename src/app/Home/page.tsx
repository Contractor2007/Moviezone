'use client';
import Bottomnav from '@/app/components/Bottomnav';
import Topnav from '@/app/components/Topnav';
import React from 'react';

function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#f9fafb',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Topnav />

      <main
        style={{
          flex: 1,
          paddingTop: '5rem', // leave space for fixed Topnav (approx. 80px)
          paddingBottom: '5rem', // also leave space for Bottomnav
          paddingLeft: '1rem',
          paddingRight: '1rem',
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #3b82f6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}
          >
            Welcome to NovusMovies!
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#374151',
              lineHeight: '1.8',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Your ultimate destination for everything cinema. From timeless classics to the latest box office hits, dive into a world of curated reviews, trailers, recommendations, and behind-the-scenes magic.
          </p>
        </section>

        <section
          style={{
            backgroundColor: '#ffffff',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
            marginBottom: '2rem',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Why NovusMovies?</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', lineHeight: '1.8', color: '#4b5563' }}>
            <li>🧠 Smart movie recommendations powered by trends & taste.</li>
            <li>🎥 Watch the latest trailers instantly.</li>
            <li>🍿 Curated lists for every genre, mood, or occasion.</li>
            <li>🌍 Explore global cinema beyond Hollywood.</li>
            <li>🎞️ Save your watchlist & share with friends.</li>
          </ul>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {[
            { title: 'Browse Movies', emoji: '📚' },
            { title: 'Top Rated', emoji: '⭐' },
            { title: 'Genres', emoji: '🎭' },
            { title: 'Now Playing', emoji: '🕒' },
            { title: 'Upcoming Releases', emoji: '🚀' },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: '#ffffff',
                padding: '1rem',
                borderRadius: '0.75rem',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ fontSize: '2rem' }}>{item.emoji}</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem' }}>{item.title}</div>
            </div>
          ))}
        </section>
      </main>

      <Bottomnav />
    </div>
  );
}

export default Home;
