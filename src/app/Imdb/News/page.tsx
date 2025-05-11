'use client'
import Topnav from '@/app/components/Topnav';
import React, { useEffect, useState } from 'react';

interface NewsArticle {
  id: string;
  byline: string;
  date: string;
  articleTitle: {
    plainText: string;
  };
  image: {
    url: string;
  };
  text: {
    plainText: string;
  };
}

const NewsList: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNews(data.data.news.edges.map((edge: any) => edge.node));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topnav />
      <div className="pt-24 pb-12 max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest News</h1>
        
        <div className="space-y-10">
          {news.map((article) => (
            <article key={article.id} className="bg-white rounded-lg p-6">
              <div className="mb-2 text-sm text-gray-500">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {article.articleTitle.plainText}
              </h2>
              
              {article.image?.url && (
                <img
                  src={article.image.url}
                  alt={article.articleTitle.plainText}
                  className="w-full h-auto mb-5 rounded-lg"
                />
              )}
              
              <p className="text-gray-700 leading-relaxed mb-3">
                {article.text.plainText}
              </p>
              
              <div className="text-sm text-gray-500">
                {article.byline}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;