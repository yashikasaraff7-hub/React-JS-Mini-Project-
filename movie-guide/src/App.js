import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import WatchlistPage from "./pages/WatchlistPage";
import ActorsPage from "./pages/ActorsPage";
import ActorProfilePage from "./pages/ActorProfilePage";
import ReviewsPage from "./pages/ReviewsPage";
import {
  WatchlistProvider,
  ReviewsProvider,
  ToastProvider,
} from "./context/AppContext";

export default function App() {
  return (
    <WatchlistProvider>
      <ReviewsProvider>
        <ToastProvider>
          <Router>
            <div className="app-layout">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/movie/:id" element={<MovieDetailPage />} />
                  <Route path="/watchlist" element={<WatchlistPage />} />
                  <Route path="/actors" element={<ActorsPage />} />
                  <Route path="/actor/:id" element={<ActorProfilePage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route
                    path="*"
                    element={
                      <div style={{ textAlign: "center", padding: "80px 20px" }}>
                        <div style={{ fontSize: 72, marginBottom: 16 }}>🎬</div>
                        <h2 style={{ marginBottom: 8, fontSize: 28 }}>404 — Page Not Found</h2>
                        <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
                          The page you're looking for doesn't exist.
                        </p>
                        <a href="/" className="btn btn-primary">Go Home</a>
                      </div>
                    }
                  />
                </Routes>
              </main>
            </div>
          </Router>
        </ToastProvider>
      </ReviewsProvider>
    </WatchlistProvider>
  );
}
