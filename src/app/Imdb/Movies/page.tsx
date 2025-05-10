"use client"
import { useState, useEffect } from 'react';
import Topnav from '@/app/components/Topnav';
import Bottomnav from '@/app/components/Bottomnav';

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
};

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = 'fb7bb23f03b6994dafc674c074d01761';
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
                );
                const data = await response.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <Topnav />
            <div>
                {movies.map(movie => (
                    <div key={movie.id}>
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />
                        )}
                        <h3>{movie.title}</h3>
                        <p>Rating: {movie.vote_average}</p>
                        {movie.release_date && <p>Released: {movie.release_date}</p>}
                    </div>
                ))}
            </div>
            <Bottomnav />
        </div>
    );
}