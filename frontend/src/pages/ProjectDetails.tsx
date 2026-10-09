import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { projectMedia } from '../data/projectMedia';
import { bilingual as b, useI18n } from '../i18n/context';
import ProjectVisual from '../components/ProjectVisual';
import Seo from '../components/Seo';
import NotFound from './NotFound';

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const { pick } = useI18n();
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article className="container project-detail">
      <Seo title={`${project.title} — Pedro Silva`} description={pick(project.summary)} />
      <Link className="text-link back-link" to="/#projetos">
        <span aria-hidden="true">←</span> {pick(b('Todos os projetos', 'All projects'))}
      </Link>
      <header className="detail-heading">
        <p className="eyebrow">{pick(project.category)}</p>
        <h1>
          {project.title}
          <span>.</span>
        </h1>
        <p>{pick(project.summary)}</p>
      </header>
      <div className="detail-art">
        <ProjectVisual project={project} />
        <span className="art-disclaimer">{pick(projectMedia[project.slug].caption)}</span>
      </div>
      <dl className="project-facts">
        <div>
          <dt>{pick(b('Participação', 'Role'))}</dt>
          <dd>{pick(project.role)}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{pick(project.status)}</dd>
        </div>
        <div>
          <dt>{pick(b('Tecnologias', 'Technologies'))}</dt>
          <dd>{project.stack.join(' · ')}</dd>
        </div>
      </dl>
      <div className="detail-content">
        <div className="detail-stories">
          {[
            { title: b('O problema', 'The problem'), text: project.problem },
            { title: b('A solução', 'The approach'), text: project.approach },
            { title: b('Minha participação', 'My contribution'), text: project.contribution },
          ].map((section, index) => (
            <section key={section.title.pt}>
              <span className="mono">0{index + 1}</span>
              <div>
                <h2>{pick(section.title)}</h2>
                <p>{pick(section.text)}</p>
              </div>
            </section>
          ))}
        </div>
        <aside className="detail-aside">
          <h2>{pick(b('Pontos de destaque', 'Highlights'))}</h2>
          <ul>
            {pick(project.highlights).map((item) => (
              <li key={item}>
                <span aria-hidden="true">↗</span>
                {item}
              </li>
            ))}
          </ul>
          <h2>{pick(b('Estado e limites', 'State and limitations'))}</h2>
          <p>{pick(project.limits)}</p>
          <div className="detail-actions">
            {project.repo && (
              <a
                className="button button-primary"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pick(b('Ver código', 'View code'))}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.live && (
              <a
                className="button button-outline"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pick(b('Visitar site', 'Visit site'))}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </aside>
      </div>
      <Link className="next-project" to={`/projetos/${next.slug}`}>
        <span className="eyebrow">{pick(b('PRÓXIMO PROJETO', 'NEXT PROJECT'))}</span>
        <strong>{next.title}</strong>
        <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
