'use client'
import Topnav from '@/app/components/Topnav';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Movie data structure
interface Movie {
  id: string;
  primaryTitle: string;
  description: string;
  primaryImage: string;
  trailer: string;
  contentRating: string;
  releaseDate: string;
  genres: string[];
  grossWorldwide: number;
  budget: number;
  runtimeMinutes: number;
  averageRating: number;
  numVotes: number;
  url: string;
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
        
        // Validate data structure
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        No movies found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
     <Topnav />      
      <h1 className="text-3xl font-bold mb-8 text-center">Popular Movies</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {movie.primaryImage && (
              <Image 
                src={movie.primaryImage} 
                alt={movie.primaryTitle} 
                className="w-full h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-movie.jpg';
                }}
              ></Image>
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {movie.primaryTitle} ({new Date(movie.releaseDate).getFullYear()})
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {movie.description || 'No description available'}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genres.map(genre => (
                  <span 
                    key={genre} 
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p>{movie.contentRating || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Runtime</p>
                  <p>{movie.runtimeMinutes ? `${movie.runtimeMinutes} min` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Score</p>
                  <p>{movie.averageRating ? `${movie.averageRating}/10` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Votes</p>
                  <p>{movie.numVotes ? movie.numVotes.toLocaleString() : 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-4">
                {movie.url && (
                  <a 
                    href={movie.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    IMDb
                  </a>
                )}
                {movie.trailer && (
                  <a 
                    href={movie.trailer} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Trailer
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMoviesList;