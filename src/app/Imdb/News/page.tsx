'use client'
import Topnav from '@/app/components/Topnav';
import React, { useEffect, useState } from 'react';

// Define the structure of the news data
interface NewsArticle {
  id: string;
  byline: string;
  date: string;
  externalUrl: string;
  articleTitle: {
    plainText: string;
  };
  image: {
    url: string;
    height: number;
    width: number;
  };
  text: {
    plainText: string;
  };
  source: {
    homepage: {
      url: string;
      label: string;
    };
  };
}

const NewsList: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]); // Store news data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch news data when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news'); // Fetch news from the API
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data.data.news.edges.map((edge: any) => edge.node)); // Extract news articles from the response
      } catch (err: any) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchNews();
  }, []); // Empty dependency array means it runs once when the component mounts

  // Render loading, error, or news data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Topnav />
      <h1>News Articles</h1>
      <ul>
        {news.map((article) => (
          <li key={article.id} style={{ marginBottom: '20px' }}>
            <h2>{article.articleTitle.plainText}</h2>
            <p><strong>By: </strong>{article.byline}</p>
            <p><strong>Published on: </strong>{new Date(article.date).toLocaleDateString()}</p>
            <div>
              <img
                src={article.image.url}
                alt={article.articleTitle.plainText}
                style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
              />
            </div>
            <p>{article.text.plainText}</p>
            <p>
              <a href={article.externalUrl} target="_blank" rel="noopener noreferrer">
                Read full article
              </a>
            </p>
            <p>
              Source: <a href={article.source.homepage.url} target="_blank" rel="noopener noreferrer">
                {article.source.homepage.label}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
