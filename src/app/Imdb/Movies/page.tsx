'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiKey = '41ee980e4b5f05f6693fda00eb7c4fd4';

  const fetchMovies = useCallback(
    async (pageNum: number, query = '') => {
      try {
        setLoading(true);
        const endpoint = query.trim()
          ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${pageNum}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNum}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setTotalPages(data.total_pages);
        return data.results;
      } catch (err) {
        console.error('Error fetching movies:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

  const fetchMovieDetails = useCallback(
    async (movie: Movie) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
        );
        return await response.json();
      } catch (err) {
        console.error('Error fetching movie details:', err);
        return movie; // fallback to basic info
      }
    },
    [apiKey]
  );

  const loadMovies = useCallback(async () => {
    try {
      const movieList = await fetchMovies(1, searchQuery);
      const detailed = await Promise.all(movieList.map(fetchMovieDetails));
      setMovies(detailed);
      setFilteredMovies(detailed);
      setPage(1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }, [fetchMovies, fetchMovieDetails, searchQuery]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadMovies();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, loadMovies]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100 ||
        loading ||
        page >= totalPages
      ) return;

      setPage(prev => prev + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, totalPages]);

  useEffect(() => {
    if (page > 1) {
      const loadMore = async () => {
        try {
          const newMovies = await fetchMovies(page, searchQuery);
          const detailed = await Promise.all(newMovies.map(fetchMovieDetails));
          setMovies(prev => [...prev, ...detailed]);
          setFilteredMovies(prev => [...prev, ...detailed]);
        } catch (err) {
          console.error('Error loading more movies:', err);
        }
      };
      loadMore();
    }
  }, [page, fetchMovies, fetchMovieDetails, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
      <main className="pt-24 pb-20 max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <article
                key={movie.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="md:flex">
                  {movie.poster_path && (
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-6 md:w-2/3">
                    <div className="text-sm text-gray-500 mb-1">
                      {movie.release_date
                        ? new Date(movie.release_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Unknown release date'}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {movie.title}
                    </h2>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        ★ {movie.vote_average.toFixed(1)}
                      </span>
                      {movie.runtime && (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {movie.runtime} min
                        </span>
                      )}
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
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No movies found matching your search.</p>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </main>
      <Bottomnav />
    </div>
  );
}
