/**
 * Distant amber doorway — organic architectural arch, not a sci-fi portal.
 * Reads --door-scale / --light-angle / --light-strength from Act.
 * Aria-hidden: carries no information a screen reader needs.
 */
export default function Door() {
  return (
    <div className="door" aria-hidden>
      <div className="door__bloom" />
      <div className="door__arch">
        <div className="door__stone" />
        <div className="door__glow" />
        <div className="door__rim" />
      </div>
    </div>
  );
}
