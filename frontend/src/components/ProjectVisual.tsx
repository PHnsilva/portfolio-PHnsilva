import type { Project } from '../data/projects';
import { projectMedia } from '../data/projectMedia';
import { useI18n } from '../i18n/context';

export default function ProjectVisual({ project }: { project: Project }) {
  const { pick } = useI18n();
  const media = projectMedia[project.slug];
  return (
    <div className={`project-art art-${project.visual}`}>
      <div className="screen-shell">
        <div className="screen-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>{media.label}</span>
        </div>
        <img
          className="project-screenshot"
          src={media.src}
          alt={pick(media.alt)}
          width="1280"
          height="720"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
