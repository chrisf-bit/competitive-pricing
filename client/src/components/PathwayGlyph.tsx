/**
 * PathwayGlyph - a custom winding-road icon that echoes the serpentine
 * yellow ribbon in the Pricing Pathway infographic (multiple humps
 * trending up to the right). Used in place of a stock lucide icon on
 * the launcher tab, the drawer header, the clearance reveal, and the
 * tutorial/guide steps so the same road shape reads as one motif
 * everywhere.
 *
 * Stroke uses `color` (defaults to currentColor) so it inherits or can
 * be tinted navy-on-yellow (tab) or yellow-on-navy (drawer).
 */

interface PathwayGlyphProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  /** Draw small waypoint dots at the ends of the road. */
  dots?: boolean;
}

export function PathwayGlyph({
  size = 24,
  color = 'currentColor',
  strokeWidth = 3,
  dots = false,
}: PathwayGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Multi-hump serpentine, bottom-left up to top-right - the same
          winding read as the infographic ribbon. */}
      <path
        d="M2 20 C 4 20 5 11.5 6.5 11 C 8 10.5 9.5 17 11 17 C 12.5 17 14 8 15.5 8 C 17 8 18.5 13 20 13 C 21 13 21.5 10 22 9.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {dots && (
        <>
          <circle cx="2" cy="20" r={strokeWidth * 0.9} fill={color} />
          <circle cx="22" cy="9.5" r={strokeWidth * 0.9} fill={color} />
        </>
      )}
    </svg>
  );
}
