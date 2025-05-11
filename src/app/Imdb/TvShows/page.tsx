'use client'
import Topnav from '@/app/components/Topnav';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface TVShow {
  id: string;
  primaryTitle: string;
  description: string;
  primaryImage: string;
  contentRating: string;
  releaseDate: string;
  interests: string[];
}

const TVShowsList: React.FC = () => {
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/tvshows');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch TV shows (Status: ${response.status})`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }
        
        setTvShows(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
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

  if (tvShows.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Topnav />
        <div className="pt-24 px-4">
          <div className="max-w-4xl mx-auto bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            No TV shows found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topnav />
      <div className="pt-24 pb-12 max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Popular TV Shows</h1>
        
        <div className="space-y-10">
          {tvShows.map((show) => (
            <article key={show.id} className="bg-white rounded-lg p-6">
              <div className="mb-2 text-sm text-gray-500">
                {show.releaseDate ? new Date(show.releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Release date not available'}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {show.primaryTitle}
              </h2>
              
              {show.primaryImage && (
                <div className="relative w-full h-96 mb-5 rounded-lg overflow-hidden">
                  <Image 
                    src={show.primaryImage} 
                    alt="" 
                    fill
                    className="object-cover"
                    unoptimized={true}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-show.jpg';
                    }}
                  />
                </div>
              )}
              
              <div className="flex flex-wrap gap-3 mb-4">
                {show.contentRating && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {show.contentRating}
                  </span>
                )}
              </div>
              
              {show.interests?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {show.interests.map(interest => (
                    <span 
                      key={interest} 
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-700 leading-relaxed mb-3">
                {show.description || 'No description available.'}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVShowsList;