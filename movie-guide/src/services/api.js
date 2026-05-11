const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  if (!API_KEY) {
    throw new Error("Missing REACT_APP_TMDB_API_KEY in environment.");
  }

  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch trending movies.");
  }

  const data = await response.json();
  return data.results;
};
