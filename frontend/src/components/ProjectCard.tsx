import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { bilingual as b, useI18n } from '../i18n/context';
import ProjectVisual from './ProjectVisual';

export default function ProjectCard({ project }: { project: Project }) {
  const { pick } = useI18n();
  return (
    <article className={`project-card project-${project.slug}`}>
      <Link
        className="project-art-link"
        to={`/projetos/${project.slug}`}
        aria-label={pick(b(`Conhecer ${project.title}`, `Explore ${project.title}`))}
      >
        <ProjectVisual project={project} />
        <span className="art-open" aria-hidden="true">
          ↗
        </span>
      </Link>
      <div className="project-copy">
        <div className="project-meta">
          <span>{pick(project.category)}</span>
          <span className="project-index" aria-hidden="true">
            ↗
          </span>
        </div>
        <h3>
          <Link to={`/projetos/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{pick(project.summary)}</p>
        <ul className="tags" aria-label={pick(b('Tecnologias', 'Technologies'))}>
          {project.stack.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
