import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
// data import removed (seed data defined inline)

const WatchlistContext = createContext();
const ReviewsContext = createContext();
const ToastContext = createContext();

// ─── Watchlist Provider ───────────────────────────────────────────────────────
export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mg_watchlist") || "[]");
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("mg_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = useCallback((movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId) ? prev : [...prev, movieId]
    );
  }, []);

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist((prev) => prev.filter((id) => id !== movieId));
  }, []);

  const isInWatchlist = useCallback(
    (movieId) => watchlist.includes(movieId),
    [watchlist]
  );

  const toggleWatchlist = useCallback((movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  }, []);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);

// ─── Reviews Provider ─────────────────────────────────────────────────────────
export function ReviewsProvider({ children }) {
  const [allReviews, setAllReviews] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("mg_reviews") || "{}");
      // seed dummy reviews if empty
      if (Object.keys(stored).length === 0) {
        return {
          m1: [
            { id: "r1", author: "CineMax", rating: 5, text: "Absolutely mind-bending! A cinematic masterpiece that challenges reality itself.", date: "2024-01-15" },
            { id: "r2", author: "FilmBuff42", rating: 4, text: "Incredible concept and visuals. DiCaprio is phenomenal. Slightly confusing but worth every minute.", date: "2024-02-20" },
          ],
          m4: [
            { id: "r3", author: "SpaceNerd", rating: 5, text: "Interstellar hit me on an emotional level I wasn't prepared for. Hans Zimmer's score is otherworldly.", date: "2024-03-10" },
          ],
          m8: [
            { id: "r4", author: "HistoryBuff", rating: 5, text: "Oppenheimer is a towering achievement. Cillian Murphy delivers a career-defining performance.", date: "2024-01-05" },
            { id: "r5", author: "MovieNightKing", rating: 4, text: "Dense and demanding but enormously rewarding. Nolan at his ambitious best.", date: "2024-02-14" },
          ],
          m9: [
            { id: "r6", author: "ClassicCinema", rating: 5, text: "Life is like a box of chocolates. A timeless story of love, perseverance, and the human spirit.", date: "2023-12-20" },
          ],
        };
      }
      return stored;
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("mg_reviews", JSON.stringify(allReviews));
  }, [allReviews]);

  const addReview = useCallback((movieId, review) => {
    setAllReviews((prev) => ({
      ...prev,
      [movieId]: [...(prev[movieId] || []), review],
    }));
  }, []);

  const getReviews = useCallback(
    (movieId) => allReviews[movieId] || [],
    [allReviews]
  );

  return (
    <ReviewsContext.Provider value={{ addReview, getReviews, allReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export const useReviews = () => useContext(ReviewsContext);

// ─── Toast Provider ───────────────────────────────────────────────────────────
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, emoji = "✅") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, emoji }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2900);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map((t) => (
          <div className="toast" key={t.id}>
            <span>{t.emoji}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
