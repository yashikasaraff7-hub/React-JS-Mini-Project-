import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const data = await fetchTrendingMovies();
    setMovies(data);
  };

  return (
    <div>
      <h1>Trending Movies</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
