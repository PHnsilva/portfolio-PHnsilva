import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { bilingual as b, useI18n } from '../i18n/context';
import ProjectVisual from './ProjectVisual';

export default function ProjectCard({ project }: { project: Project }) {
  const { pick } = useI18n();
  return (
    <article className="project-card">
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
      <div className="project-meta">
        <span>{pick(project.category)}</span>
        <span className="project-status">{pick(project.status)}</span>
      </div>
      <h3>
        <Link to={`/projetos/${project.slug}`}>
          {project.title}
          <span aria-hidden="true">↗</span>
        </Link>
      </h3>
      <p>{pick(project.summary)}</p>
      <ul className="tags" aria-label={pick(b('Tecnologias', 'Technologies'))}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link className="text-link" to={`/projetos/${project.slug}`}>
        {pick(b('Conhecer o projeto', 'Explore the project'))}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
