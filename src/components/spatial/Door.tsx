/**
 * Distant amber doorway — the cause of the sunrise.
 * Pure CSS. Reads --door-scale / --light-angle / --light-strength from Act.
 * Aria-hidden: carries no information a screen reader needs.
 */
export default function Door() {
  return (
    <div className="door" aria-hidden>
      {/* Outer bloom — spills onto surrounding darkness; biased by light angle */}
      <div className="door__bloom" />
      {/* Arch silhouette + capped interior glow */}
      <div className="door__arch">
        <div className="door__glow" />
        <div className="door__rim" />
      </div>
    </div>
  );
}
