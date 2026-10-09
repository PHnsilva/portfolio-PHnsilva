import { useRef, useState, type FormEvent } from 'react';
import { profile } from '../data/profile';
import { bilingual as b, useI18n } from '../i18n/context';

export default function ContactForm() {
  const { pick } = useI18n();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const inFlight = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (name.length < 2 || message.length < 10 || !form.reportValidity()) {
      setStatus('error');
      return;
    }
    inFlight.current = true;
    setStatus('sending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: 'Contato pelo portfólio de Pedro Silva',
          _template: 'table',
          _honey: String(data.get('_honey') ?? ''),
        }),
      });
      const result: { success?: boolean | string } = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error('Submission was not accepted');
      }
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-labelledby="message-title"
      aria-busy={status === 'sending'}
    >
      <h3 id="message-title">{pick(b('Enviar uma mensagem', 'Send a message'))}</h3>
      <div className="contact-form-fields">
        <label htmlFor="contact-name">
          {pick(b('Nome', 'Name'))}
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            disabled={status === 'sending'}
          />
        </label>
        <label htmlFor="contact-email">
          E-mail
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            disabled={status === 'sending'}
          />
        </label>
      </div>
      <label htmlFor="contact-message">
        {pick(b('Mensagem', 'Message'))}
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          minLength={10}
          maxLength={2000}
          disabled={status === 'sending'}
        />
      </label>
      <div className="contact-honey" aria-hidden="true">
        <label>
          Website
          <input name="_honey" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="contact-form-footer">
        <button className="button button-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending'
            ? pick(b('Enviando...', 'Sending...'))
            : pick(b('Enviar mensagem', 'Send message'))}
          <span aria-hidden="true">→</span>
        </button>
        <small>
          {pick(
            b(
              'Seu e-mail será usado para responder ao contato.',
              'Your email will be used to reply to your message.',
            ),
          )}
        </small>
      </div>
      {status === 'sent' && (
        <p className="form-feedback success" role="status">
          {pick(
            b(
              'Mensagem enviada. Obrigado pelo contato.',
              'Message sent. Thank you for getting in touch.',
            ),
          )}
        </p>
      )}
      {status === 'error' && (
        <p className="form-feedback error" role="alert">
          {pick(
            b(
              'Não foi possível enviar. Confira os campos e tente novamente ou use o e-mail ao lado.',
              'Unable to send. Check the fields and try again, or use the email address alongside.',
            ),
          )}
        </p>
      )}
    </form>
  );
}
