import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { bilingual as b, useI18n } from '../i18n/context';
import PlayBreak from './PlayBreak';
import { PixelIcon } from './PixelScene';

const navigation = [
  { id: 'projetos', label: b('Projetos', 'Projects') },
  { id: 'sobre', label: b('Sobre', 'About') },
  { id: 'ferramentas', label: b('Tecnologias', 'Technologies') },
  { id: 'contato', label: b('Contato', 'Contact') },
];

function focusSection(hash: string) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  target.focus({ preventScroll: true });
  if (!reducedMotion) {
    target.animate?.([{ opacity: 0.72 }, { opacity: 1 }], { duration: 600, easing: 'ease-out' });
  }
}

function Header() {
  const { hash, pathname } = useLocation();
  const { lang, toggleLang, pick } = useI18n();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (pathname !== '/') return;
    const sections = ['inicio', ...navigation.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;
    function update() {
      frame = 0;
      const headerBottom =
        document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0;
      const marker = headerBottom + 24;
      const visibleSections = sections.map((section) => ({
        id: section.id,
        bounds: section.getBoundingClientRect(),
      }));
      let current = visibleSections.find(
        ({ bounds }) => bounds.top <= marker && bounds.bottom > marker,
      )?.id;
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      ) {
        // At the page end, the final section may not reach the header's activation line.
        const remainingSections = visibleSections.filter(
          ({ bounds }) => bounds.bottom > headerBottom && bounds.top < window.innerHeight,
        );
        current = remainingSections[remainingSections.length - 1]?.id;
      }
      setActiveSection(current ?? '');
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    const main = document.getElementById('main-content');
    if (main) observer?.observe(main);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer?.disconnect();
    };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          to="/#inicio"
          onClick={() => setOpen(false)}
          aria-label={pick(b('Pedro Silva — início', 'Pedro Silva — home'))}
        >
          <PixelIcon kind="ghost" />
          <span>
            PHnsilva
            <span className="brand-cursor" aria-hidden="true">
              _
            </span>
          </span>
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? pick(b('Fechar', 'Close')) : 'Menu'}{' '}
          <span aria-hidden="true">{open ? '×' : '+'}</span>
        </button>
        <nav
          id="main-navigation"
          className={open ? 'navigation is-open' : 'navigation'}
          aria-label={pick(b('Navegação principal', 'Main navigation'))}
        >
          {navigation.map((item, index) => (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              onClick={() => {
                setOpen(false);
                if (pathname === '/' && hash === `#${item.id}`) {
                  requestAnimationFrame(() => focusSection(hash));
                }
              }}
              aria-current={activeSection === item.id ? 'location' : undefined}
            >
              <span className="nav-index" aria-hidden="true">
                0{index + 1}
              </span>
              {pick(item.label)}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="language-toggle"
          onClick={toggleLang}
          aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
        >
          <span className={lang === 'pt' ? 'selected' : ''}>PT</span>
          <span aria-hidden="true">/</span>
          <span className={lang === 'en' ? 'selected' : ''}>EN</span>
        </button>
      </div>
    </header>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const { pick } = useI18n();
  const [gameOpen, setGameOpen] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) {
        focusSection(hash);
      } else {
        window.scrollTo(0, 0);
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        {pick(b('Pular para o conteúdo', 'Skip to content'))}
      </a>
      <Header key={pathname} />
      <main id="main-content" tabIndex={-1}>
        <Outlet context={{ openGame: () => setGameOpen(true) }} />
      </main>
      <footer className="site-footer container">
        <div>
          <Link className="footer-name" to="/#inicio">
            {profile.name}
            <span aria-hidden="true">.</span>
          </Link>
          <p>
            © {new Date().getFullYear()} · {pick(b('Portfólio pessoal', 'Personal portfolio'))}
          </p>
        </div>
        <button className="play-link" type="button" onClick={() => setGameOpen(true)}>
          <PixelIcon kind="controller" /> {pick(b('Jogar um pouco', 'Play a little'))}{' '}
          <span aria-hidden="true">↗</span>
        </button>
      </footer>
      {gameOpen && <PlayBreak onClose={() => setGameOpen(false)} />}
    </>
  );
}
