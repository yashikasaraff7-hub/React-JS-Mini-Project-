import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActorById, getMoviesByActorId } from "../data/mockData";
import MovieCard from "../components/MovieCard";

export default function ActorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const actor = getActorById(id);
  const movies = getMoviesByActorId(id);

  if (!actor) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: 64 }}>🎭</div>
        <h2 style={{ margin: "16px 0 8px" }}>Person Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate("/actors")}>
          ← Back to Actors
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        ← Back
      </button>

      {/* Actor Hero */}
      <div className="actor-hero">
        <div className="actor-photo-wrap">
          <img src={actor.photo} alt={actor.name} className="actor-photo" />
          <div className="actor-role-badge">{actor.role}</div>
        </div>

        <div style={{ flex: 1 }}>
          <h1 className="actor-name">{actor.name}</h1>
          <div className="actor-meta">
            <div className="actor-meta-item">
              🎂 {actor.born}
            </div>
            <div className="actor-meta-item">
              📍 {actor.birthplace}
            </div>
            <div className="actor-meta-item">
              🎬 {movies.length} movie{movies.length !== 1 ? "s" : ""}
            </div>
          </div>
          <p className="actor-bio">{actor.bio}</p>

          {/* Stat chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
            <div style={{
              background: "var(--accent-soft)", border: "1px solid rgba(233,69,96,0.2)",
              color: "var(--accent)", padding: "6px 16px", borderRadius: 20,
              fontSize: 13, fontWeight: 600,
            }}>
              🎬 {movies.length} Films
            </div>
            <div style={{
              background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)",
              color: "var(--gold)", padding: "6px 16px", borderRadius: 20,
              fontSize: 13, fontWeight: 600,
            }}>
              ⭐ Avg {(movies.reduce((s, m) => s + m.rating, 0) / (movies.length || 1)).toFixed(1)} Rating
            </div>
            {movies.some((m) => m.trending) && (
              <div style={{
                background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.2)",
                color: "#ff8c00", padding: "6px 16px", borderRadius: 20,
                fontSize: 13, fontWeight: 600,
              }}>
                🔥 Trending Films
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filmography */}
      <div className="section-title">🎬 Filmography</div>
      {movies.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🎬</div>
          <p>No movies found for this person.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
