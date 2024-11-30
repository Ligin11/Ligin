import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Link to={`/movie/${movie.imdbID}`} className="block shadow-lg rounded overflow-hidden">
    <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-bold">{movie.Title}</h3>
      <p className="text-gray-600">{movie.Year}</p>
    </div>
  </Link>
);

export default MovieCard;