import React from 'react';

const SearchBar = ({ onSearch, onFilterChange }) => (
  <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 my-4">
    <input
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
      className="input"
    />
    <select onChange={(e) => onFilterChange(e.target.value)} className="input">
      <option value="">All</option>
      <option value="movie">Movies</option>
      <option value="series">Series</option>
      <option value="episode">Episodes</option>
    </select>
  </div>
);

export default SearchBar;