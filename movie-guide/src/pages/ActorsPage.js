import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actors } from "../data/mockData";

export default function ActorsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = actors.filter((a) => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || a.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div>
      <div className="page-header">
        <h1>🎭 Actors & Directors</h1>
        <p>Meet the talented people behind your favorite movies</p>
      </div>

      {/* Filters */}
      <div className="search-filter-bar" style={{ marginBottom: 28 }}>
        <div className="search-input-wrap" style={{ flex: 1 }}>
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search actors and directors…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Actor">Actors</option>
          <option value="Director">Directors</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🎭</div>
          <p>No people match your search.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((actor) => (
            <div
              key={actor.id}
              style={{
                background: "var(--bg-card)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                transition: "var(--transition)",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => navigate(`/actor/${actor.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={actor.photo}
                  alt={actor.name}
                  style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: actor.role === "Director"
                    ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                    : "linear-gradient(135deg, var(--accent), #ff6b81)",
                  color: "white", fontSize: 10, fontWeight: 700,
                  padding: "3px 10px", borderRadius: 20, letterSpacing: 0.5,
                }}>
                  {actor.role}
                </div>
              </div>
              <div style={{ padding: "14px 16px 16px" }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{actor.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>
                  📍 {actor.birthplace.split(",").slice(-2).join(",").trim()}
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  background: "var(--accent-soft)", border: "1px solid rgba(233,69,96,0.2)",
                  color: "var(--accent)", padding: "4px 12px", borderRadius: 20,
                  fontSize: 12, fontWeight: 600,
                }}>
                  🎬 {actor.movies.length} movie{actor.movies.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
