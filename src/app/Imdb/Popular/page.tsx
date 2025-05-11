'use client'
import Topnav from '@/app/components/Topnav';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Movie {
  id: string;
  primaryTitle: string;
  description: string;
  primaryImage: string;
  contentRating: string;
  releaseDate: string;
  genres: string[];
  runtimeMinutes: number;
  averageRating: number;
  numVotes: number;
}

const PopularMoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/popularmovies');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }
        
        setMovies(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Topnav />
        <div className="pt-24 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Topnav />
        <div className="pt-24 px-4">
          <div className="max-w-4xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Topnav />
        <div className="pt-24 px-4">
          <div className="max-w-4xl mx-auto bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            No movies found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topnav />
      <div className="pt-24 pb-12 max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
        
        <div className="space-y-10">
          {movies.map((movie) => (
            <article key={movie.id} className="bg-white rounded-lg p-6">
              <div className="mb-2 text-sm text-gray-500">
                {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {movie.primaryTitle}
              </h2>
              
              {movie.primaryImage && (
                <div className="relative w-full h-96 mb-5 rounded-lg overflow-hidden">
                  <Image 
                    src={movie.primaryImage} 
                    alt="" 
                    fill
                    className="object-cover"
                    unoptimized={true}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-movie.jpg';
                    }}
                  />
                </div>
              )}
              
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {movie.contentRating || 'Not Rated'}
                </span>
                <span className="text-gray-600 text-sm">
                  {movie.runtimeMinutes ? `${movie.runtimeMinutes} min` : 'N/A'}
                </span>
                {movie.averageRating && (
                  <span className="text-gray-600 text-sm">
                    ★ {movie.averageRating.toFixed(1)}/10
                  </span>
                )}
              </div>
              
              {movie.genres?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map(genre => (
                    <span 
                      key={genre} 
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-700 leading-relaxed mb-3">
                {movie.description || 'No description available.'}
              </p>
              
              {movie.numVotes && (
                <div className="text-sm text-gray-500">
                  {movie.numVotes.toLocaleString()} votes
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularMoviesList;