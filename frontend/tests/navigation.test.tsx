import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import { I18nProvider } from '../src/i18n/I18nProvider';

afterEach(() => vi.restoreAllMocks());

describe('navigation follows the visible section', () => {
  it('updates selection during manual scrolling without reusing the URL hash', async () => {
    let scroll = 3100;
    const positions: Record<string, [number, number]> = {
      inicio: [0, 800],
      projetos: [900, 3000],
      sobre: [3200, 3900],
      ferramentas: [4000, 4700],
      contato: [5000, 5250],
    };
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
      if (this.classList.contains('site-header')) return new DOMRect(0, 0, 1280, 80);
      const [top, bottom] = positions[this.id] ?? [0, 0];
      return new DOMRect(0, top - scroll, 1280, bottom - top);
    });
    window.history.replaceState(null, '', '/#sobre');
    render(
      <I18nProvider>
        <App />
      </I18nProvider>,
    );
    const about = screen.getByRole('link', { name: 'Sobre', exact: true });
    const technologies = screen.getByRole('link', { name: 'Tecnologias', exact: true });
    await waitFor(() => expect(about.getAttribute('aria-current')).toBe('location'));

    scroll = 3900;
    fireEvent.scroll(window);
    await waitFor(() => expect(technologies.getAttribute('aria-current')).toBe('location'));
    expect(about.hasAttribute('aria-current')).toBe(false);
    expect(window.location.hash).toBe('#sobre');

    scroll = 0;
    fireEvent.scroll(window);
    await waitFor(() => expect(document.querySelector('[aria-current="location"]')).toBeNull());

    scroll = 900;
    fireEvent.scroll(window);
    await waitFor(() =>
      expect(
        screen.getByRole('link', { name: 'Projetos', exact: true }).getAttribute('aria-current'),
      ).toBe('location'),
    );
  });
});
