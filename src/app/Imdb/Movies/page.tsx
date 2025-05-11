'use client';

import { useState, useEffect } from 'react';
import Topnav from '@/app/components/Topnav';
import Bottomnav from '@/app/components/Bottomnav';
import Image from 'next/image';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  genres?: { id: number; name: string }[];
  overview?: string;
  runtime?: number;
};

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = '41ee980e4b5f05f6693fda00eb7c4fd4';

  useEffect(() => {
    const fetchMoviesWithDetails = async () => {
      try {
        const popularRes = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const popularData = await popularRes.json();
        const popularMovies = popularData.results.slice(0, 10); // limit for performance

        const detailedMovies = await Promise.all(
          popularMovies.map(async (movie: Movie) => {
            const detailRes = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
            );
            const detailData = await detailRes.json();
            return { ...movie, ...detailData };
          })
        );

        setMovies(detailedMovies);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesWithDetails();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Topnav />
      <main className="pt-24 pb-12 max-w-4xl mx-auto px-4 space-y-10">
        <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
        {movies.map((movie) => (
          <article key={movie.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-500 mb-1">
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Unknown release date'}
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{movie.title}</h2>

            {movie.poster_path && (
              <div className="relative w-full h-96 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-700">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                ★ {movie.vote_average.toFixed(1)}
              </span>
              {movie.runtime && <span>{movie.runtime} min</span>}
            </div>

            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-700 leading-relaxed">
              {movie.overview || 'No description available.'}
            </p>
          </article>
        ))}
      </main>
      <Bottomnav />
    </div>
  );
}
