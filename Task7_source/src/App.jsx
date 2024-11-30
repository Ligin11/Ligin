import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MoviesProvider } from './context/MoviesContext';
import SearchPage from './pages/SearchPage';
import MovieDetails from './pages/MovieDetails';


function App() {
  return (
    <MoviesProvider className='bg-green-200'>
      <h2 className='bg-green-300 text-4xl font-bold p-4 text-center text-blue-800'>Movie search App</h2> 
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </MoviesProvider>
  );
}

export default App;