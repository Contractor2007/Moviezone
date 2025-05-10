'use client'
import Bottomnav from '@/app/components/Bottomnav'
import Topnav from '@/app/components/Topnav'
import React from 'react'

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      
      
      <main style={{
        flex: 1,
        padding: '1rem',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <Topnav />
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #3b82f6, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to NovusMovies!
        </h1>
        
        <p style={{
          lineHeight: '1.6',
          fontSize: '1rem',
          textAlign: 'justify',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}>
          Welcome to NovusMovies your ultimate destination for all things cinema! Whether you are a die-hard film buff, a casual viewer, or just looking for your next movie night pick, we have got you covered. Explore in-depth reviews, the latest trailers, exclusive recommendations, and behind-the-scenes insights on your favorite films. From timeless classics to the hottest new releases, our passion for movies drives us to bring you the best content. Sit back, grab some popcorn, and dive into the magic of movies with us. Lights, camera, action—your cinematic journey starts here! 🎬🍿
        </p>
      </main>
      
      <Bottomnav />
    </div>
  )
}

export default Home