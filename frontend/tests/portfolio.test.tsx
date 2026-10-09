import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { I18nProvider } from '../src/i18n/I18nProvider';

function mount(path = '/') {
  window.history.replaceState(null, '', path);
  return render(
    <I18nProvider>
      <App />
    </I18nProvider>,
  );
}
describe('Portfolio visitor journeys', () => {
  it('shows the profile and six projects immediately, with one main and one h1', () => {
    mount();
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen
        .getByRole('img', { name: 'Retrato de Pedro Henrique Silva Vargas' })
        .getAttribute('src'),
    ).toBe('/images/pedro-hero.jpeg');
    expect(document.querySelectorAll('.project-card')).toHaveLength(6);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
  it('opens a case study and returns to the correct home section from its header', async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole('link', { name: 'Conhecer APAC Feminina' }));
    expect(screen.getByRole('heading', { name: 'Minha participação' })).toBeTruthy();
    expect(window.location.pathname).toBe('/projetos/apac-feminina');
    expect(screen.queryByRole('link', { name: /Ver código/ })).toBeNull();
    await user.click(screen.getByRole('link', { name: 'Contato' }));
    expect(window.location.pathname).toBe('/');
    expect(window.location.hash).toBe('#contato');
    expect(screen.getByRole('heading', { name: 'Onde me encontrar' })).toBeTruthy();
  });
  it('supports direct project URLs and unknown routes without blank pages', () => {
    const view = mount('/projetos/calendar-mate');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('CalendarMate.');
    expect(screen.getByRole('link', { name: /Ver código/ }).getAttribute('href')).toBe(
      'https://github.com/PHnsilva/CalendarMate',
    );
    view.unmount();
    mount('/projetos/unknown');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Um caminho');
    expect(screen.getByRole('link', { name: /Voltar ao início/ })).toBeTruthy();
  });
  it('translates home and case studies, persists the selection and updates the document language', async () => {
    const user = userEvent.setup();
    const view = mount();
    await user.click(screen.getByRole('button', { name: 'Switch to English' }));
    expect(screen.getByText('Software development')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'View projects' })).toBeTruthy();
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('portfolio.lang')).toBe('en');
    await user.click(screen.getByRole('link', { name: 'Explore Sofiie' }));
    expect(screen.getByRole('heading', { name: 'My contribution' })).toBeTruthy();
    view.unmount();
    mount('/projetos/meritum');
    expect(screen.getByRole('heading', { name: 'The problem' })).toBeTruthy();
  });
  it('ignores invalid stored language preferences', () => {
    localStorage.setItem('portfolio.lang', 'invalid');
    mount();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Pedro Silva.');
    expect(screen.getByText('Desenvolvimento de software')).toBeTruthy();
    expect(document.documentElement.lang).toBe('pt-BR');
  });
  it('closes the mobile menu with Escape, restores focus and closes after navigation', async () => {
    const user = userEvent.setup();
    mount();
    const menu = screen.getByRole('button', { name: /Menu/ });
    await user.click(menu);
    expect(menu.getAttribute('aria-expanded')).toBe('true');
    await user.keyboard('{Escape}');
    expect(menu.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(menu);
    await user.click(menu);
    await user.click(screen.getByRole('link', { name: 'Projetos' }));
    expect(menu.getAttribute('aria-expanded')).toBe('false');
  });
  it('keeps the game optional, allows closing and can reopen cleanly', async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole('button', { name: 'Pixel break' }));
    await waitFor(() => expect(screen.getByRole('dialog').hasAttribute('open')).toBe(true));
    await user.click(screen.getByRole('button', { name: 'Fechar jogo' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Jogar um pouco' }));
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
  });
  it('filters personal and team work without changing attribution or losing project routes', async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole('button', { name: 'Pessoais' }));
    expect(document.querySelectorAll('.project-card')).toHaveLength(3);
    expect(screen.queryByRole('link', { name: 'Conhecer APAC Feminina' })).toBeNull();
    expect(screen.getByRole('link', { name: 'Conhecer CalendarMate' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Em equipe' }));
    expect(screen.getByRole('button', { name: 'Em equipe' }).getAttribute('aria-pressed')).toBe(
      'true',
    );
    expect(screen.getByRole('link', { name: 'Conhecer APAC Feminina' })).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'Conhecer CalendarMate' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Todos' }));
    expect(document.querySelectorAll('.project-card')).toHaveLength(6);
  });
  it('provides real contact links and protects external browsing', () => {
    mount();
    expect(screen.getByRole('link', { name: 'phnsilva1@gmail.com' }).getAttribute('href')).toBe(
      'mailto:phnsilva1@gmail.com',
    );
    for (const anchor of document.querySelectorAll('a[target="_blank"]')) {
      expect(anchor.getAttribute('rel')).toContain('noopener');
      expect(anchor.getAttribute('href')).toMatch(/^https:\/\//);
    }
  });
});
