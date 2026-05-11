import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { movies, genres } from "../data/mockData";
import { useReviews } from "../context/AppContext";
import StarRating from "../components/StarRating";

export default function ReviewsPage() {
  const navigate = useNavigate();
  const { allReviews } = useReviews();
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  // Flatten all reviews with movie info attached
  const allFlat = useMemo(() => {
    return Object.entries(allReviews).flatMap(([movieId, reviews]) => {
      const movie = movies.find((m) => m.id === movieId);
      if (!movie) return [];
      if (genreFilter !== "All" && !movie.genre.includes(genreFilter)) return [];
      return reviews.map((r) => ({ ...r, movie }));
    });
  }, [allReviews, genreFilter]);

  const sorted = useMemo(() => {
    return [...allFlat].sort((a, b) => {
      if (sortBy === "rating-high") return b.rating - a.rating;
      if (sortBy === "rating-low") return a.rating - b.rating;
      return new Date(b.date) - new Date(a.date);
    });
  }, [allFlat, sortBy]);

  const totalReviews = allFlat.length;
  const avgRating = totalReviews
    ? (allFlat.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1)
    : null;

  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allFlat.filter((r) => r.rating === star).length,
    pct: totalReviews
      ? Math.round((allFlat.filter((r) => r.rating === star).length / totalReviews) * 100)
      : 0,
  }));

  return (
    <div>
      <div className="page-header">
        <h1>⭐ Movie Reviews</h1>
        <p>All community reviews across every movie</p>
      </div>

      {/* Summary Stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, marginBottom: 28,
      }}>
        <div style={{
          background: "var(--bg-card)", borderRadius: "var(--radius-md)",
          padding: 24, border: "1px solid var(--border)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: "var(--gold)", lineHeight: 1 }}>
            {avgRating || "—"}
          </div>
          <StarRating value={Math.round(avgRating)} readOnly size={20} />
          <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8 }}>
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </div>
        </div>
        <div style={{
          background: "var(--bg-card)", borderRadius: "var(--radius-md)",
          padding: 24, border: "1px solid var(--border)",
        }}>
          <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Rating Distribution</div>
          {ratingDist.map(({ star, count, pct }) => (
            <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--gold)", minWidth: 20 }}>{star}★</span>
              <div className="progress-bar-wrap" style={{ flex: 1 }}>
                <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span style={{ fontSize: 12, color: "var(--text-muted)", minWidth: 30, textAlign: "right" }}>
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="search-filter-bar" style={{ marginBottom: 24 }}>
        <select className="filter-select" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          <option value="All">All Genres</option>
          {genres.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="recent">Most Recent</option>
          <option value="rating-high">Highest Rated</option>
          <option value="rating-low">Lowest Rated</option>
        </select>
      </div>

      {/* Reviews List */}
      {sorted.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">📝</div>
          <p>No reviews yet. Be the first to review a movie!</p>
          <button className="btn btn-primary" onClick={() => navigate("/")} style={{ marginTop: 12 }}>
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="reviews-list">
          {sorted.map((review) => (
            <div key={review.id} className="review-card">
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                {/* Movie thumbnail */}
                <img
                  src={review.movie.poster}
                  alt={review.movie.title}
                  style={{ width: 56, height: 84, objectFit: "cover", borderRadius: "var(--radius-sm)", flexShrink: 0, cursor: "pointer" }}
                  onClick={() => navigate(`/movie/${review.movie.id}`)}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 15, color: "var(--accent)", cursor: "pointer", marginBottom: 4 }}
                    onClick={() => navigate(`/movie/${review.movie.id}`)}
                  >
                    {review.movie.title} ({review.movie.year})
                  </div>
                  <div className="review-header" style={{ marginBottom: 8 }}>
                    <div className="review-avatar">{review.author[0].toUpperCase()}</div>
                    <div>
                      <div className="review-author">{review.author}</div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <StarRating value={review.rating} readOnly size={15} />
                    </div>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
