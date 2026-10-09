export function PixelIcon({ kind }: { kind: 'heart' | 'controller' | 'spark' | 'ghost' }) {
  const paths = {
    heart: 'M2 1h3v1h2V1h3v1h1v4h-1v1H9v1H8v1H7v1H6V9H5V8H4V7H3V6H2V5H1V2h1z',
    controller:
      'M3 2h8v1h2v2h1v5h-1v1h-2V9H3v2H1v-1H0V5h1V3h2z M3 4v1H2v1h1v1h1V6h1V5H4V4z M10 4v1h1V4z M11 6v1h1V6z',
    spark: 'M5 0h2v4h4v2H7v4H5V6H1V4h4z',
    ghost: 'M4 1h6v1h2v2h1v8h-2v-2H9v2H5v-2H3v2H1V4h1V2h2z M4 4v3h2V4z M8 4v3h2V4z',
  };
  return (
    <svg
      className={`pixel-icon pixel-${kind}`}
      viewBox="0 0 14 13"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <path d={paths[kind]} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export default function PixelScene() {
  return (
    <svg
      className="pixel-landscape"
      viewBox="0 0 120 62"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <g fill="#d1a88b">
        <path d="M9 6h2V4h1v2h2v1h-2v2h-1V7H9z" />
        <rect x="102" y="7" width="1" height="1" />
        <rect x="93" y="18" width="2" height="2" />
        <rect x="18" y="24" width="1" height="1" />
      </g>
      <path
        fill="#56423a"
        d="M0 48h5v-5h6v-8h6v-5h8v5h6v7h8v6h12v-4h8v-8h6v-6h8v-5h9v9h7v8h10v6h21v14H0z"
      />
      <path
        fill="#785443"
        d="M0 53h15v-4h10v-4h14v5h12v3h20v-8h7v-6h7v-5h7v-4h8v6h7v8h5v4h8v14H0z"
      />
      <path fill="#af7753" d="M0 58h20v-3h15v3h25v-5h15v-3h15v3h30v9H0z" />
      <path fill="#d9a171" d="M0 60h24v-2h12v2h27v-4h15v-3h11v3h31v2H89v-3H79v3H65v4H0z" />
      <g fill="#96b5a6">
        <path d="M12 54V40h3v14z M9 41v5h3v3H7v-8z M15 43h3v-5h2v8h-5z" />
        <path d="M101 52V40h2v12z M99 42v3h2v2h-4v-5z" />
      </g>
      <g className="pixel-explorer">
        <path fill="#252b31" d="M77 40h7v2h2v8h-2v5h-3v-3h-2v3h-3v-9h-2v-3h3z" />
        <path fill="#f5b881" d="M77 39h7v3h2v3h-9z" />
        <path fill="#b87750" d="M76 45h9v2h-5v4h-4z" />
        <path fill="#8dcbd0" d="M79 42h5v2h-5z" />
        <rect x="76" y="46" width="2" height="2" fill="#ebd7ad" />
      </g>
    </svg>
  );
}
