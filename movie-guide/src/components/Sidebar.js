import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useWatchlist } from "../context/AppContext";

const navItems = [
  { path: "/",            icon: "🏠", label: "Home"       },
  { path: "/watchlist",   icon: "🔖", label: "Watchlist"  },
  { path: "/actors",      icon: "🎭", label: "Actors"     },
  { path: "/reviews",     icon: "⭐", label: "Reviews"    },
];

export default function Sidebar() {
  const { watchlist } = useWatchlist();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="overlay-backdrop" onClick={closeMobile} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar${mobileOpen ? " open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">🎬</div>
          <span>CineVerse</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar-nav-item${isActive ? " active" : ""}`
              }
              onClick={closeMobile}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.label === "Watchlist" && watchlist.length > 0 && (
                <span className="sidebar-badge">{watchlist.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>🎬 CineVerse 2026</p>
          <p style={{ marginTop: 4, color: "var(--text-muted)", fontSize: 11 }}>
            All data is mock / demo
          </p>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>
    </>
  );
}
