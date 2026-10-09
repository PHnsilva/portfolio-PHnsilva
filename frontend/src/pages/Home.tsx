import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { technologies } from '../data/technologies';
import { bilingual as b, useI18n } from '../i18n/context';
import ProjectCard from '../components/ProjectCard';
import PixelScene, { PixelIcon } from '../components/PixelScene';
import Seo from '../components/Seo';

export default function Home() {
  const { pick } = useI18n();
  const { openGame } = useOutletContext<{ openGame: () => void }>();
  const [filter, setFilter] = useState<'all' | 'personal' | 'team'>('all');
  const visibleProjects = projects.filter((project) => filter === 'all' || project.kind === filter);
  return (
    <>
      <Seo
        title={pick(b('Pedro Silva — Portfólio', 'Pedro Silva — Portfolio'))}
        description={pick(
          b(
            'Projetos web, APIs e experimentos de Pedro Henrique Silva Vargas.',
            'Web projects, APIs and experiments by Pedro Henrique Silva Vargas.',
          ),
        )}
      />
      <section className="hero container" id="inicio" tabIndex={-1} aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="prompt" aria-hidden="true">
              ~/
            </span>{' '}
            {pick(b('MEU PORTFÓLIO', 'MY PORTFOLIO'))}
          </p>
          <h1 id="hero-title">
            Pedro Silva<span className="name-period">.</span>
          </h1>
          <p className="hero-role">
            {pick(b('Desenvolvimento de software', 'Software development'))}
          </p>
          <p className="hero-description">
            {pick(
              b(
                'Aplicações web, APIs e alguns experimentos. Uma seleção do que desenvolvo, sozinho e em equipe.',
                'Web applications, APIs and a few experiments. A selection of what I build, on my own and with others.',
              ),
            )}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projetos">
              {pick(b('Ver projetos', 'View projects'))}
              <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button button-outline"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="hero-location">
            <span aria-hidden="true">⌖</span> {profile.location}
          </p>
        </div>
        <div className="player-scene">
          <figure className="hero-portrait">
            <div className="player-bar">
              <span>PLAYER 01</span>
              <span className="player-hearts" aria-hidden="true">
                <PixelIcon kind="heart" />
                <PixelIcon kind="heart" />
                <PixelIcon kind="heart" />
              </span>
            </div>
            <div className="portrait-frame">
              <img
                src={profile.image}
                alt={pick(
                  b(
                    'Retrato de Pedro Henrique Silva Vargas',
                    'Portrait of Pedro Henrique Silva Vargas',
                  ),
                )}
                width="320"
                height="318"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>@PHnsilva</span>
              <span className="pixel-square" aria-hidden="true" />
            </figcaption>
          </figure>
          <PixelScene />
          <span className="scene-coordinate" aria-hidden="true">
            {'{ x: 01, y: 08 }'}
          </span>
        </div>
      </section>
      <div className="loadout container">
        <div className="loadout-tools">
          <span className="mono muted">{pick(b('FERRAMENTAS', 'TOOLS'))}</span>
          <span>Java</span>
          <span>Spring Boot</span>
          <span>React</span>
          <span>TypeScript</span>
          <a className="loadout-more" href="#ferramentas">
            {pick(b('Ver todas', 'See all'))} ↓
          </a>
        </div>
        <button className="arcade-link" type="button" onClick={openGame}>
          <PixelIcon kind="controller" />
          <span>Pixel break</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <section
        className="section container"
        id="projetos"
        tabIndex={-1}
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span aria-hidden="true">01 /</span> {pick(b('SELEÇÃO', 'SELECTED WORK'))}
            </p>
            <h2 id="projects-title">
              {pick(b('Projetos em destaque', 'Featured projects'))}
              <span className="heading-pixel" aria-hidden="true" />
            </h2>
          </div>
          <div
            className="project-filters"
            role="group"
            aria-label={pick(b('Filtrar projetos', 'Filter projects'))}
          >
            {(
              [
                { value: 'all', label: b('Todos', 'All') },
                { value: 'personal', label: b('Pessoais', 'Personal') },
                { value: 'team', label: b('Em equipe', 'Team') },
              ] as const
            ).map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {pick(item.label)}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status">
          {visibleProjects.length} {pick(b('projetos exibidos', 'projects shown'))}
        </p>
        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <a
          className="all-projects"
          href={profile.github + '?tab=repositories'}
          target="_blank"
          rel="noopener noreferrer"
        >
          {pick(b('Mais projetos no GitHub', 'More projects on GitHub'))}
          <span aria-hidden="true">↗</span>
        </a>
      </section>
      <section
        className="about-section container"
        id="sobre"
        tabIndex={-1}
        aria-labelledby="about-title"
      >
        <div className="about-copy">
          <p className="eyebrow">
            <span aria-hidden="true">02 /</span> {pick(b('SOBRE', 'ABOUT'))}
          </p>
          <h2 id="about-title">{pick(b('Além do código', 'Beyond the code'))}</h2>
          <p>
            {pick(
              b(
                'Sou Pedro Henrique Silva Vargas, estudante de Engenharia de Software na PUC Minas e técnico em Eletroeletrônica pelo SENAI.',
                'I’m Pedro Henrique Silva Vargas, a Software Engineering student at PUC Minas and an Electronics Technician trained at SENAI.',
              ),
            )}
          </p>
          <p>
            {pick(
              b(
                'Gosto de desenvolver interfaces, entender o que acontece no backend e conectar os dois. Jogos, tecnologia e projetos pessoais também fazem parte do meu tempo fora da faculdade.',
                'I enjoy building interfaces, understanding the backend and connecting the two. Games, technology and personal projects are also part of my time outside university.',
              ),
            )}
          </p>
        </div>
        <div className="about-terminal">
          <div className="terminal-bar">
            <div aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <span>pedro@portfolio: ~</span>
            <PixelIcon kind="spark" />
          </div>
          <div className="terminal-body">
            <p>
              <span className="prompt">❯</span> cat sobre.txt
            </p>
            <dl>
              <div>
                <dt>{pick(b('estudando', 'studying'))}</dt>
                <dd>
                  {pick(b('Engenharia de Software', 'Software Engineering'))}
                  <small>PUC Minas · 2024 — {pick(b('atual', 'present'))}</small>
                </dd>
              </div>
              <div>
                <dt>{pick(b('formação', 'education'))}</dt>
                <dd>
                  {pick(b('Eletroeletrônica', 'Electronics'))}
                  <small>SENAI · 2022 — 2023</small>
                </dd>
              </div>
              <div>
                <dt>{pick(b('interesses', 'interests'))}</dt>
                <dd>web · backend · games</dd>
              </div>
            </dl>
            <span className="terminal-cursor" aria-hidden="true">
              ▌
            </span>
          </div>
        </div>
      </section>
      <section
        className="toolbox container"
        id="ferramentas"
        tabIndex={-1}
        aria-labelledby="tools-title"
      >
        <div className="toolbox-heading">
          <p className="eyebrow">
            <span aria-hidden="true">~/</span> {pick(b('MEU INVENTÁRIO', 'MY INVENTORY'))}
          </p>
          <h2 id="tools-title">{pick(b('Ferramentas & tecnologias', 'Tools & technologies'))}</h2>
          <p>
            {pick(
              b(
                'Tecnologias que uso nos meus projetos. Abra cada área para explorar.',
                'Technologies I use in my projects. Open each area to explore.',
              ),
            )}
          </p>
        </div>
        <div className="toolbox-grid">
          {technologies.map((group, index) => (
            <details key={group.title.pt} className="toolbox-group">
              <summary>
                <span className="toolbox-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span>
                  <strong>{pick(group.title)}</strong>
                  <small>{group.preview}</small>
                </span>
                <span className="toolbox-toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
      <section
        className="contact-section container"
        id="contato"
        tabIndex={-1}
        aria-labelledby="contact-title"
      >
        <div>
          <p className="eyebrow">
            <span aria-hidden="true">03 /</span> {pick(b('CONTATO', 'CONTACT'))}
          </p>
          <h2 id="contact-title">{pick(b('Onde me encontrar', 'Where to find me'))}</h2>
        </div>
        <div className="contact-links">
          <a className="email-link" href={`mailto:${profile.email}`}>
            {profile.email}
            <span aria-hidden="true">↗</span>
          </a>
          <div className="contact-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
