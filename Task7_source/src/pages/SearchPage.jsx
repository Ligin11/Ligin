import React, { useState } from 'react';
import { fetchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');

  const fetchAndSetMovies = async (term, page, filter) => {
    try {
      const data = await fetchMovies(term, page, filter);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError(null);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('An error occurred while fetching movies.');
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    fetchAndSetMovies(term, 1, type);
  };

  const handleFilterChange = (filter) => {
    setType(filter);
    setCurrentPage(1);
    fetchAndSetMovies(searchTerm, 1, filter);
  };

  const handlePagination = (direction) => {
    const newPage = currentPage + direction;
    setCurrentPage(newPage);
    fetchAndSetMovies(searchTerm, newPage, type);
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex justify-center space-x-4 my-4">
        <button
          disabled={currentPage === 1}
          className="btn"
          onClick={() => handlePagination(-1)}
        >
          Previous
        </button>
        <button className="btn" onClick={() => handlePagination(1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchPage;