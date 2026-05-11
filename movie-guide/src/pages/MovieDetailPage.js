import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, getActorById, getSimilarMovies } from "../data/mockData";
import { useWatchlist, useReviews, useToast } from "../context/AppContext";
import StarRating from "../components/StarRating";
// MovieCard not needed on this page

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = getMovieById(id);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { getReviews, addReview } = useReviews();
  const { showToast } = useToast();

  const [trailerVisible, setTrailerVisible] = useState(false);
  const [form, setForm] = useState({ author: "", text: "", rating: 0 });
  const [formError, setFormError] = useState("");

  if (!movie) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: 64 }}>🎬</div>
        <h2 style={{ margin: "16px 0 8px" }}>Movie Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate("/")}>← Back to Home</button>
      </div>
    );
  }

  const director = getActorById(movie.director);
  const castMembers = movie.cast.map(getActorById).filter(Boolean);
  const similarMovies = getSimilarMovies(id);
  const reviews = getReviews(id);
  const inList = isInWatchlist(id);

  const handleToggleWatchlist = () => {
    toggleWatchlist(id);
    showToast(inList ? `Removed from watchlist` : `Added to watchlist`, inList ? "🗑️" : "🔖");
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!form.author.trim()) return setFormError("Please enter your name.");
    if (!form.text.trim()) return setFormError("Please write a review.");
    if (form.rating === 0) return setFormError("Please give a star rating.");
    setFormError("");
    addReview(id, {
      id: `r_${Date.now()}`,
      author: form.author.trim(),
      text: form.text.trim(),
      rating: form.rating,
      date: new Date().toISOString().split("T")[0],
    });
    setForm({ author: "", text: "", rating: 0 });
    showToast("Review submitted! Thanks 🎉", "⭐");
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div>
      {/* Back Button */}
      <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        ← Back
      </button>

      {/* Hero */}
      <div className="movie-detail-hero">
        <img src={movie.backdrop} alt="" className="hero-backdrop" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <img src={movie.poster} alt={movie.title} className="hero-poster" />
          <div className="hero-info">
            <h1 className="hero-title">{movie.title}</h1>
            <div className="hero-meta">
              <span className="hero-rating">⭐ {movie.rating} <span style={{ fontWeight: 400, fontSize: 14, color: "var(--text-secondary)" }}>/ 10</span></span>
              <div className="hero-meta-item">🗓️ {movie.year}</div>
              <div className="hero-meta-item">⏱️ {movie.duration}</div>
              {movie.genre.map((g) => (
                <span key={g} className="genre-tag">{g}</span>
              ))}
            </div>
            {director && (
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 12 }}>
                🎬 Directed by{" "}
                <span
                  style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}
                  onClick={() => navigate(`/actor/${director.id}`)}
                >
                  {director.name}
                </span>
              </div>
            )}
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setTrailerVisible(true)}>
                ▶ Watch Trailer
              </button>
              <button
                className={`btn ${inList ? "btn-primary" : "btn-ghost"}`}
                onClick={handleToggleWatchlist}
              >
                {inList ? "❤️ In Watchlist" : "🤍 Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>
        <div>
          {/* Synopsis */}
          <section style={{ marginBottom: 28 }}>
            <div className="section-title">📖 Synopsis</div>
            <div style={{
              background: "var(--bg-card)", borderRadius: "var(--radius-md)",
              padding: 24, border: "1px solid var(--border)",
              color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 15,
            }}>
              {movie.synopsis}
            </div>
          </section>

          {/* Trailer */}
          <section style={{ marginBottom: 28 }}>
            <div className="section-title">🎬 Trailer</div>
            <div className="trailer-container">
              {trailerVisible ? (
                <iframe
                  className="trailer-iframe"
                  src={`${movie.trailerUrl}?autoplay=1`}
                  title="Movie Trailer"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <div className="trailer-placeholder">
                  <button className="play-button" onClick={() => setTrailerVisible(true)}>▶</button>
                  <p>Click to play trailer</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>({movie.title})</p>
                </div>
              )}
            </div>
          </section>

          {/* Cast */}
          <section style={{ marginBottom: 28 }}>
            <div className="section-title">🎭 Cast</div>
            <div className="cast-grid">
              {castMembers.map((actor) => (
                <div
                  key={actor.id}
                  className="cast-card"
                  onClick={() => navigate(`/actor/${actor.id}`)}
                >
                  <img src={actor.photo} alt={actor.name} className="cast-photo" />
                  <div className="cast-name">{actor.name}</div>
                  <div className="cast-role">{actor.role}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="section-title">
              ⭐ Reviews
              {avgRating && (
                <span style={{
                  marginLeft: "auto", background: "var(--gold-soft)",
                  border: "1px solid rgba(255,215,0,0.2)",
                  color: "var(--gold)", padding: "3px 12px",
                  borderRadius: 20, fontSize: 13, fontWeight: 700,
                }}>
                  Avg {avgRating}/5 · {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Review Form */}
            <div className="review-form">
              <h3>Write a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    className="form-input"
                    placeholder="e.g. MovieBuff42"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Rating</label>
                  <StarRating
                    value={form.rating}
                    onChange={(r) => setForm({ ...form, rating: r })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Review</label>
                  <textarea
                    className="form-input"
                    placeholder="Share your thoughts about this movie…"
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    rows={4}
                  />
                </div>
                {formError && (
                  <div style={{ color: "var(--accent)", fontSize: 13, marginBottom: 12 }}>
                    ⚠️ {formError}
                  </div>
                )}
                <button type="submit" className="btn btn-primary">
                  ⭐ Submit Review
                </button>
              </form>
            </div>

            {/* Reviews List */}
            {reviews.length === 0 ? (
              <div style={{ color: "var(--text-muted)", textAlign: "center", padding: "30px 0" }}>
                No reviews yet. Be the first to review!
              </div>
            ) : (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div className="review-card" key={review.id}>
                    <div className="review-header">
                      <div className="review-avatar">{review.author[0].toUpperCase()}</div>
                      <div>
                        <div className="review-author">{review.author}</div>
                        <div className="review-date">{review.date}</div>
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        <StarRating value={review.rating} readOnly size={16} />
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Movie Info Card */}
          <div style={{
            background: "var(--bg-card)", borderRadius: "var(--radius-md)",
            padding: 20, border: "1px solid var(--border)", marginBottom: 20,
          }}>
            <div className="section-title" style={{ fontSize: 16, marginBottom: 14 }}>ℹ️ Movie Info</div>
            {[
              { label: "Year", value: movie.year },
              { label: "Duration", value: movie.duration },
              { label: "Rating", value: `${movie.rating} / 10` },
              { label: "Director", value: director?.name || "Unknown", clickable: director, onClick: () => navigate(`/actor/${director.id}`) },
              { label: "Genres", value: movie.genre.join(", ") },
            ].map(({ label, value, clickable, onClick }) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                padding: "10px 0", borderBottom: "1px solid var(--border)",
                fontSize: 14,
              }}>
                <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>{label}</span>
                <span
                  style={{
                    textAlign: "right", maxWidth: 160,
                    color: clickable ? "var(--accent)" : "var(--text-primary)",
                    cursor: clickable ? "pointer" : "default",
                    fontWeight: clickable ? 600 : 400,
                  }}
                  onClick={clickable ? onClick : undefined}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          {similarMovies.length > 0 && (
            <div style={{
              background: "var(--bg-card)", borderRadius: "var(--radius-md)",
              padding: 20, border: "1px solid var(--border)",
            }}>
              <div className="section-title" style={{ fontSize: 16, marginBottom: 14 }}>🎯 Similar Movies</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {similarMovies.map((sm) => (
                  <div
                    key={sm.id}
                    style={{
                      display: "flex", gap: 12, cursor: "pointer",
                      padding: 10, borderRadius: "var(--radius-sm)",
                      transition: "var(--transition)",
                    }}
                    onClick={() => navigate(`/movie/${sm.id}`)}
                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-secondary)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <img
                      src={sm.poster} alt={sm.title}
                      style={{ width: 55, height: 82, objectFit: "cover", borderRadius: "var(--radius-sm)", flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{sm.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{sm.year} · ⭐ {sm.rating}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                        {sm.genre.slice(0, 2).map((g) => (
                          <span key={g} className="genre-tag" style={{ fontSize: 10 }}>{g}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
