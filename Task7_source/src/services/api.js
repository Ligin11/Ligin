const API_KEY = '6ccca80';

const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (term, page, type) => {
  const response = await fetch(`${BASE_URL}?s=${term}&page=${page}&type=${type}&apikey=${API_KEY}`);
  return response.json();
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}?i=${id}&plot=full&apikey=${API_KEY}`);
  return response.json();
};
