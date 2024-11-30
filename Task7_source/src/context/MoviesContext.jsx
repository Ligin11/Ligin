import React, { createContext, useReducer } from 'react';

export const MoviesContext = createContext();

const initialMoviesState = {
  favorites: [],
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((movie) => movie.imdbID !== action.payload),
      };
    default:
      return state;
  }
};

export const MoviesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialMoviesState);

  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};