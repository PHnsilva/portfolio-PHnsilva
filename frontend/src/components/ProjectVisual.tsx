import type { Project } from '../data/projects';

// Abstract artwork, deliberately separate from screenshots of the applications.
export default function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-art art-${project.visual}`} aria-hidden="true">
      <div className="art-grid" />
      {project.visual === 'inventory' && (
        <div className="inventory-art">
          <span className="cross-mark">+</span>
          <div className="inventory-lines">
            <i />
            <i />
            <i />
          </div>
          <span className="art-code">APAC / CARE & CODE</span>
        </div>
      )}
      {project.visual === 'calendar' && (
        <div className="calendar-art">
          <div className="calendar-top">
            <i />
            <i />
          </div>
          <div className="calendar-cells">
            {Array.from({ length: 21 }, (_, i) => (
              <span key={i} className={[9, 10, 11, 17].includes(i) ? 'calendar-selected' : ''}>
                {i + 1}
              </span>
            ))}
          </div>
        </div>
      )}
      {project.visual === 'coins' && (
        <div className="coins-art">
          <span className="coin coin-back">m</span>
          <span className="coin coin-front">
            m<span>+</span>
          </span>
          <div className="coin-orbit" />
        </div>
      )}
      {project.visual === 'network' && (
        <div className="network-art">
          <svg viewBox="0 0 300 140">
            <path
              d="M60 30 L150 70 L240 30 M60 110 L150 70 L240 110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <circle cx="60" cy="30" r="15" />
            <circle cx="60" cy="110" r="15" />
            <circle cx="240" cy="30" r="15" />
            <circle cx="240" cy="110" r="15" />
            <circle cx="150" cy="70" r="32" />
          </svg>
          <span className="network-center">ψ</span>
        </div>
      )}
      {project.visual === 'assistant' && (
        <div className="assistant-art">
          <div className="assistant-eyes">
            <span />
            <span />
          </div>
          <span className="assistant-wave">
            {Array.from({ length: 13 }, (_, i) => (
              <i key={i} style={{ height: `${8 + ((i * 7) % 23)}px` }} />
            ))}
          </span>
        </div>
      )}
      {project.visual === 'signal' && (
        <div className="signal-art">
          <span className="signal-ring ring-one" />
          <span className="signal-ring ring-two" />
          <span className="signal-ring ring-three" />
          <span className="signal-origin">↗</span>
          <span className="signal-packet packet-one" />
          <span className="signal-packet packet-two" />
        </div>
      )}
      <span className="art-caption">{project.title}</span>
      <span className="art-number">
        {project.visual === 'inventory'
          ? '01'
          : project.visual === 'calendar'
            ? '02'
            : project.visual === 'coins'
              ? '03'
              : project.visual === 'network'
                ? '04'
                : project.visual === 'assistant'
                  ? '05'
                  : '06'}{' '}
        / PH
      </span>
    </div>
  );
}
