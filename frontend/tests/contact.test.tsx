import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../src/components/ContactForm';
import { I18nProvider } from '../src/i18n/I18nProvider';

afterEach(() => vi.unstubAllGlobals());
function mount() {
  return render(
    <I18nProvider>
      <ContactForm />
    </I18nProvider>,
  );
}
async function fill() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Nome'), 'Visitante');
  await user.type(screen.getByLabelText('E-mail'), 'visitante@example.com');
  await user.type(screen.getByLabelText('Mensagem'), 'Gostaria de saber mais sobre o projeto.');
  return user;
}

describe('contact submissions', () => {
  it('preserves the draft after a rejected submission and clears it only after acceptance', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: 'false', message: 'Activation required' }),
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: 'true' }) });
    vi.stubGlobal('fetch', fetchMock);
    mount();
    const user = await fill();
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect((screen.getByLabelText('Mensagem') as HTMLTextAreaElement).value).toContain('Gostaria');
    expect(screen.queryByRole('status')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    expect(await screen.findByRole('status')).toHaveProperty(
      'textContent',
      'Mensagem enviada. Obrigado pelo contato.',
    );
    expect((screen.getByLabelText('Mensagem') as HTMLTextAreaElement).value).toBe('');
    const payload = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(payload).toMatchObject({
      name: 'Visitante',
      email: 'visitante@example.com',
      message: 'Gostaria de saber mais sobre o projeto.',
    });
  });
  it('prevents duplicate sends and retains the message after a network error', async () => {
    let reject: (reason: Error) => void = () => {};
    const fetchMock = vi.fn(
      () =>
        new Promise((_, rejectPromise) => {
          reject = rejectPromise;
        }),
    );
    vi.stubGlobal('fetch', fetchMock);
    mount();
    const user = await fill();
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    expect(screen.getByRole('button', { name: 'Enviando...' }).hasAttribute('disabled')).toBe(true);
    await user.click(screen.getByRole('button', { name: 'Enviando...' }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    reject(new Error('Network unavailable'));
    await waitFor(() => expect(screen.getByRole('alert')).toBeTruthy());
    expect((screen.getByLabelText('Nome') as HTMLInputElement).value).toBe('Visitante');
    expect(screen.getByRole('button', { name: 'Enviar mensagem' }).hasAttribute('disabled')).toBe(
      false,
    );
  });
  it('blocks invalid email and missing message without requesting a send', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    mount();
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Nome'), 'Visitante');
    await user.type(screen.getByLabelText('E-mail'), 'email-invalido');
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect((screen.getByLabelText('E-mail') as HTMLInputElement).validity.typeMismatch).toBe(true);
  });
});
