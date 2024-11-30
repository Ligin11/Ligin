import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    };
    getMovieDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <img src={movie.Poster} alt={movie.Title} className="w-full max-w-sm mx-auto" />
      <h1 className="text-2xl font-bold text-center my-4">{movie.Title}</h1>
      <p>{movie.Plot}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Release Date:</strong> {movie.Released}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
    </div>
  );
};

export default MovieDetails;