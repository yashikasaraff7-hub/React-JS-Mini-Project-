import React from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist, useToast } from "../context/AppContext";
import { getMovieById } from "../data/mockData";
// StarRating not used directly in watchlist

export default function WatchlistPage() {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const { showToast } = useToast();

  const watchlistMovies = watchlist.map(getMovieById).filter(Boolean);
  const totalRating = watchlistMovies.reduce((s, m) => s + m.rating, 0);
  const avgRating = watchlistMovies.length
    ? (totalRating / watchlistMovies.length).toFixed(1)
    : null;

  const handleRemove = (movie) => {
    removeFromWatchlist(movie.id);
    showToast(`"${movie.title}" removed from watchlist`, "🗑️");
  };

  return (
    <div>
      <div className="page-header">
        <h1>🔖 My Watchlist</h1>
        <p>Movies you want to watch later</p>
      </div>

      {/* Stats */}
      {watchlistMovies.length > 0 && (
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-icon">🎬</span>
            <div>
              <div className="stat-value">{watchlistMovies.length}</div>
              <div className="stat-label">Total Movies</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <div>
              <div className="stat-value">{avgRating}</div>
              <div className="stat-label">Avg Rating</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⏱️</span>
            <div>
              <div className="stat-value">
                {Math.round(
                  watchlistMovies.reduce((s, m) => {
                    const [h, min] = m.duration.replace("h", "").replace("m", "").split(" ");
                    return s + parseInt(h) * 60 + parseInt(min || 0);
                  }, 0) / 60
                )}h
              </div>
              <div className="stat-label">Watch Time</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🔥</span>
            <div>
              <div className="stat-value">{watchlistMovies.filter((m) => m.trending).length}</div>
              <div className="stat-label">Trending</div>
            </div>
          </div>
        </div>
      )}

      {watchlistMovies.length === 0 ? (
        <div className="watchlist-empty">
          <div className="empty-icon">🔖</div>
          <h2 style={{ color: "var(--text-secondary)", fontSize: 22 }}>Your watchlist is empty</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 340 }}>
            Browse movies and click the heart icon to add them to your watchlist.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            🎬 Browse Movies
          </button>
        </div>
      ) : (
        <div>
          {watchlistMovies.map((movie) => (
            <div key={movie.id} className="watchlist-item">
              <img
                src={movie.poster}
                alt={movie.title}
                className="watchlist-poster"
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{ cursor: "pointer" }}
              />
              <div className="watchlist-info" onClick={() => navigate(`/movie/${movie.id}`)} style={{ cursor: "pointer" }}>
                <div className="watchlist-title">{movie.title}</div>
                <div className="watchlist-meta">
                  <span>⭐ {movie.rating}</span>
                  <span>·</span>
                  <span>{movie.year}</span>
                  <span>·</span>
                  <span>⏱️ {movie.duration}</span>
                  {movie.trending && <span className="genre-tag">🔥 Trending</span>}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {movie.genre.map((g) => (
                    <span key={g} className="genre-tag">{g}</span>
                  ))}
                </div>
                <p style={{
                  color: "var(--text-muted)", fontSize: 13, marginTop: 8,
                  overflow: "hidden", display: "-webkit-box",
                  WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                }}>
                  {movie.synopsis}
                </p>
              </div>
              <div className="watchlist-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  View
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => handleRemove(movie)}
                  title="Remove from watchlist"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <div style={{
            marginTop: 24, textAlign: "center",
            color: "var(--text-muted)", fontSize: 13,
          }}>
            {watchlistMovies.length} movie{watchlistMovies.length !== 1 ? "s" : ""} in your watchlist · Stored locally in your browser
          </div>
        </div>
      )}
    </div>
  );
}
