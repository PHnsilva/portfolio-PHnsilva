import { useState } from 'react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { bilingual as b, useI18n } from '../i18n/context';
import ProjectCard from '../components/ProjectCard';
import Seo from '../components/Seo';

export default function Home() {
  const { pick } = useI18n();
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'unavailable'>('idle');
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState('copied');
    } catch {
      setCopyState('unavailable');
    }
  }
  return (
    <>
      <Seo
        title={pick(
          b('Pedro Silva — Desenvolvimento de software', 'Pedro Silva — Software development'),
        )}
        description={pick(
          b(
            'Portfólio de Pedro Henrique Silva Vargas. Estudante de Engenharia de Software na PUC Minas. Projetos web, APIs e integrações.',
            'Pedro Henrique Silva Vargas’s portfolio. Software Engineering student at PUC Minas. Web projects, APIs and integrations.',
          ),
        )}
      />
      <section className="hero container" id="inicio" tabIndex={-1} aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            {pick(b('Aberto a oportunidades', 'Open to opportunities'))}
          </p>
          <p className="hero-intro">{pick(b('Olá, eu sou Pedro.', 'Hello, I’m Pedro.'))}</p>
          <h1 id="hero-title">
            {pick(b('Código com', 'Code with'))}
            <br /> <em>{pick(b('propósito.', 'purpose.'))}</em>
          </h1>
          <p className="hero-description">
            {pick(
              b(
                'Estudante de Engenharia de Software na PUC Minas. Construo aplicações web, APIs e integrações com atenção ao que acontece dos dois lados da tela.',
                'Software Engineering student at PUC Minas. I build web applications, APIs and integrations, paying attention to both sides of the screen.',
              ),
            )}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projetos">
              {pick(b('Explorar projetos', 'Explore projects'))}
              <span aria-hidden="true">↘</span>
            </a>
            <a className="button button-text" href="#contato">
              {pick(b('Vamos conversar', 'Let’s talk'))}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="hero-location">
            <span aria-hidden="true">⌖</span> {profile.location}{' '}
            <span className="location-separator">/</span> {pick(b('Brasil', 'Brazil'))}
          </p>
        </div>
        <figure className="hero-portrait">
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
            <span className="portrait-corner corner-top" aria-hidden="true" />
            <span className="portrait-corner corner-bottom" aria-hidden="true" />
          </div>
          <figcaption>
            <span>PH / 01</span>
            <span>
              {pick(b('Engenharia encontra curiosidade.', 'Engineering meets curiosity.'))}
            </span>
          </figcaption>
        </figure>
        <div className="hero-bottom">
          <span className="mono">
            {pick(b('DA IDEIA À IMPLEMENTAÇÃO', 'FROM IDEA TO IMPLEMENTATION'))}
          </span>
          <p>
            Java <span>/</span> Spring Boot <span>/</span> React <span>/</span> TypeScript
          </p>
          <a
            href="#projetos"
            className="scroll-cue"
            aria-label={pick(b('Ir para os projetos', 'Go to projects'))}
          >
            ↓
          </a>
        </div>
      </section>

      <section
        className="section container"
        id="projetos"
        tabIndex={-1}
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / {pick(b('TRABALHOS SELECIONADOS', 'SELECTED WORK'))}</p>
            <h2 id="projects-title">
              {pick(b('Ideias que viram', 'Ideas turned into'))}{' '}
              <em>{pick(b('software.', 'software.'))}</em>
            </h2>
          </div>
          <p>
            {pick(
              b(
                'Projetos pessoais e em equipe. Problemas diferentes, a mesma vontade de construir bem.',
                'Personal and team projects. Different problems, the same intention to build thoughtfully.',
              ),
            )}
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="projects-more">
          <p>
            {pick(
              b(
                'Mais experimentos, estudos e código no GitHub.',
                'More experiments, learning and code on GitHub.',
              ),
            )}
          </p>
          <a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer">
            {pick(b('Todos os repositórios', 'All repositories'))} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="about-section" id="sobre" tabIndex={-1} aria-labelledby="about-title">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">02 / {pick(b('SOBRE MIM', 'ABOUT ME'))}</p>
            <h2 id="about-title">
              {pick(b('Curiosidade para', 'Curiosity to'))}
              <br /> <em>{pick(b('entender.', 'understand.'))}</em>
              <br />
              {pick(b('Cuidado para', 'Care to'))}
              <br />
              {pick(b('construir.', 'build.'))}
            </h2>
          </div>
          <div className="about-copy">
            <p>
              {pick(
                b(
                  'Sou Pedro Henrique Silva Vargas, estudante de Engenharia de Software e técnico em Eletroeletrônica. Minha formação aproxima a lógica do software da atenção prática que aprendi no trabalho com sistemas e componentes.',
                  'I’m Pedro Henrique Silva Vargas, a Software Engineering student and Electronics Technician. My background brings software logic together with the practical attention I learned working with systems and components.',
                ),
              )}
            </p>
            <p>
              {pick(
                b(
                  'Gosto de entender o problema antes de escolher a ferramenta. Em projetos acadêmicos e pessoais, trabalho com interfaces, APIs e integrações, além de documentação, versionamento e revisão em equipe.',
                  'I like to understand the problem before choosing the tool. In academic and personal projects, I work on interfaces, APIs and integrations, as well as documentation, version control and team reviews.',
                ),
              )}
            </p>
            <p>
              {pick(
                b(
                  'Busco minha primeira oportunidade na área para aprender com outras pessoas e contribuir com entregas organizadas. E, entre uma implementação e outra, jogos e terminais ainda têm seu lugar por aqui.',
                  'I’m looking for my first opportunity in the field to learn from others and contribute organized work. And between implementations, games and terminals still have a place here.',
                ),
              )}
            </p>
            <div className="terminal-note">
              <div className="terminal-bar">
                <span />
                <span />
                <span />
                <span className="terminal-filename">pedro / about</span>
              </div>
              <p>
                <span className="terminal-prompt">❯</span> git status
              </p>
              <p className="terminal-result">
                {pick(b('aprendendo, construindo, evoluindo.', 'learning, building, improving.'))}
                <span className="terminal-cursor" aria-hidden="true">
                  ▊
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section container education-section"
        id="formacao"
        tabIndex={-1}
        aria-labelledby="education-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / {pick(b('FORMAÇÃO & FERRAMENTAS', 'EDUCATION & TOOLS'))}</p>
            <h2 id="education-title">
              {pick(b('Uma base em', 'A foundation in'))}{' '}
              <em>{pick(b('evolução.', 'progress.'))}</em>
            </h2>
          </div>
        </div>
        <div className="education-grid">
          <div className="education-list">
            <article>
              <span className="mono">2024 — {pick(b('ATUAL', 'PRESENT'))}</span>
              <h3>PUC Minas</h3>
              <p>{pick(b('Engenharia de Software', 'Software Engineering'))}</p>
              <small>{pick(b('Bacharelado em andamento', 'Bachelor’s degree in progress'))}</small>
            </article>
            <article>
              <span className="mono">2022 — 2023</span>
              <h3>SENAI Itabirito</h3>
              <p>{pick(b('Técnico em Eletroeletrônica', 'Electronics Technician'))}</p>
              <small>
                {pick(b('Formação técnica concluída', 'Technical education completed'))}
              </small>
            </article>
          </div>
          <div className="skills-list">
            {[
              {
                name: b('Desenvolvimento', 'Development'),
                items: ['Java', 'Spring Boot', 'React', 'TypeScript', 'C# / .NET', 'Node.js'],
              },
              {
                name: b('Dados & integração', 'Data & integration'),
                items: ['PostgreSQL', 'SQL', 'REST APIs', 'Prisma'],
              },
              {
                name: b('Rotina de projeto', 'Project workflow'),
                items: [
                  'Git / GitHub',
                  'Docker',
                  'Postman',
                  'Swagger',
                  pick(b('Testes', 'Testing')),
                ],
              },
            ].map((group) => (
              <div key={group.name.pt}>
                <h3>{pick(group.name)}</h3>
                <ul className="skill-tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="contact-section"
        id="contato"
        tabIndex={-1}
        aria-labelledby="contact-title"
      >
        <div className="container contact-inner">
          <div>
            <p className="eyebrow">04 / {pick(b('PRÓXIMA CONVERSA', 'NEXT CONVERSATION'))}</p>
            <h2 id="contact-title">
              {pick(b('Vamos construir', 'Let’s build'))}
              <br /> <em>{pick(b('algo bom?', 'something good?'))}</em>
            </h2>
            <p>
              {pick(
                b(
                  'Para oportunidades, projetos ou uma boa troca de ideias.',
                  'For opportunities, projects or a good exchange of ideas.',
                ),
              )}
            </p>
          </div>
          <div className="contact-links">
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
              <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-socials">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <button type="button" onClick={copyEmail}>
                {pick(b('Copiar e-mail', 'Copy email'))}
              </button>
            </div>
            <p className="copy-feedback" role="status">
              {copyState === 'copied'
                ? pick(b('E-mail copiado.', 'Email copied.'))
                : copyState === 'unavailable'
                  ? pick(
                      b(
                        'Use o endereço acima para entrar em contato.',
                        'Use the address above to get in touch.',
                      ),
                    )
                  : ''}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
