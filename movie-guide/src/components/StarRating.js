import React, { useState } from "react";

export default function StarRating({ value = 0, onChange, readOnly = false, size = 22 }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="review-stars" style={{ gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= display ? "filled" : ""}`}
          style={{ fontSize: size, cursor: readOnly ? "default" : "pointer", userSelect: "none" }}
          onClick={() => !readOnly && onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          aria-label={`${star} star`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
