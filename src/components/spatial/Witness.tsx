/**
 * Near-field human presence — the shade of carrying something heavy.
 * Soft silhouette only: unhurried, no laptop, no aggressive stance.
 * Fades as the door approaches. Aria-hidden.
 */
export default function Witness() {
  return (
    <div className="witness" aria-hidden>
      <svg
        className="witness__figure"
        viewBox="0 0 120 200"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        {/* Quiet standing figure, seen from behind — weight in the shoulders, not the fists */}
        <ellipse cx="60" cy="28" rx="16" ry="18" fill="currentColor" />
        <path
          d="M36 48
             C28 72 26 110 30 148
             L42 148
             C44 118 48 88 52 68
             L68 68
             C72 88 76 118 78 148
             L90 148
             C94 110 92 72 84 48
             C78 42 70 40 60 40
             C50 40 42 42 36 48Z"
          fill="currentColor"
        />
        <path
          d="M42 148 L38 196 L52 196 L54 152Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M78 148 L76 152 L78 196 L92 196Z"
          fill="currentColor"
          opacity="0.92"
        />
      </svg>
      <div className="witness__ground" />
    </div>
  );
}
