import React, { useState, useMemo } from "react";
import { movies, genres, years } from "../data/mockData";
import MovieCard from "../components/MovieCard";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const trending = useMemo(() => movies.filter((m) => m.trending), []);

  const filtered = useMemo(() => {
    return movies.filter((m) => {
      const matchSearch =
        !search ||
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.genre.some((g) => g.toLowerCase().includes(search.toLowerCase()));
      const matchGenre =
        selectedGenre === "All" || m.genre.includes(selectedGenre);
      const matchYear =
        selectedYear === "All" || m.year === Number(selectedYear);
      return matchSearch && matchGenre && matchYear;
    });
  }, [search, selectedGenre, selectedYear]);

  const isFiltering = search || selectedGenre !== "All" || selectedYear !== "All";

  return (
    <div>
      {/* Hero Banner */}
      {!isFiltering && (
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            marginBottom: 36,
            minHeight: 260,
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(135deg, #0a0a1e 0%, #1a0a2e 50%, #0e0e1e 100%)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Decorative circles */}
          {["180px", "320px", "100px"].map((size, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                right: `${i * 80 + 20}px`,
                top: "50%",
                transform: "translateY(-50%)",
                width: size, height: size,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(233,69,96,${0.12 - i * 0.03}) 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          ))}
          <div style={{ padding: "40px 48px", position: "relative", zIndex: 2 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
              🎬 Your Ultimate Movie Guide
            </div>
            <h1 style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 900,
              letterSpacing: "-1px",
              lineHeight: 1.15,
              background: "linear-gradient(135deg, #fff 30%, #9090b0)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 12,
              maxWidth: 540,
            }}>
              Discover, Review & Track<br/>Your Favorite Movies
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 440, lineHeight: 1.7 }}>
              Explore {movies.length} movies, read reviews, manage your watchlist and discover great films.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <div style={{
                background: "var(--accent-soft)", border: "1px solid rgba(233,69,96,0.2)",
                borderRadius: "var(--radius-sm)", padding: "8px 18px",
                fontSize: 13, fontWeight: 600, color: "var(--accent)",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                🔥 {movies.filter(m => m.trending).length} Trending Now
              </div>
              <div style={{
                background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)",
                borderRadius: "var(--radius-sm)", padding: "8px 18px",
                fontSize: 13, fontWeight: 600, color: "var(--gold)",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                ⭐ Top Rated Available
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="search-filter-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search movies, genres…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="All">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          className="filter-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        {isFiltering && (
          <button
            className="btn btn-ghost"
            onClick={() => { setSearch(""); setSelectedGenre("All"); setSelectedYear("All"); }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Trending Section (only when not filtering) */}
      {!isFiltering && (
        <section style={{ marginBottom: 36 }}>
          <div className="section-title">🔥 Trending Now</div>
          <div className="scroll-row">
            {trending.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      )}

      {/* All / Filtered Movies */}
      <section>
        <div className="section-title">
          {isFiltering ? `🎯 Results (${filtered.length})` : "🎬 All Movies"}
        </div>
        {filtered.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🎭</div>
            <p>No movies match your filters.</p>
            <button className="btn btn-primary" style={{ marginTop: 12 }}
              onClick={() => { setSearch(""); setSelectedGenre("All"); setSelectedYear("All"); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="movies-grid">
            {filtered.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
