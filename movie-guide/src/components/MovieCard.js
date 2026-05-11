import React from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist, useToast } from "../context/AppContext";

export default function MovieCard({ movie, showOverlay = true }) {
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { showToast } = useToast();

  const inList = isInWatchlist(movie.id);

  const handleWatchlist = (e) => {
    e.stopPropagation();
    toggleWatchlist(movie.id);
    showToast(
      inList ? `Removed "${movie.title}" from watchlist` : `Added "${movie.title}" to watchlist`,
      inList ? "🗑️" : "🔖"
    );
  };

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/movie/${movie.id}`)}
    >
      {movie.trending && <span className="trending-badge">🔥 Trending</span>}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="card-poster"
          loading="lazy"
        />
        {showOverlay && (
          <div className="card-overlay">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>{movie.duration}</div>
                <div className="card-rating">⭐ {movie.rating}</div>
              </div>
              <button className="btn-icon" onClick={handleWatchlist} aria-label="Toggle watchlist">
                {inList ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="card-info">
        <div className="card-title">{movie.title}</div>
        <div className="card-meta">
          <div className="card-rating">⭐ {movie.rating}</div>
          <span style={{ color: "var(--text-muted)" }}>·</span>
          <span>{movie.year}</span>
        </div>
        <div className="card-genre-tags">
          {movie.genre.slice(0, 2).map((g) => (
            <span key={g} className="genre-tag">{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
