import { Link } from 'react-router-dom';
import { bilingual as b, useI18n } from '../i18n/context';
import Seo from '../components/Seo';
export default function NotFound() {
  const { pick } = useI18n();
  return (
    <div className="container not-found">
      <Seo
        title="404 — Pedro Silva"
        description={pick(b('Página não encontrada.', 'Page not found.'))}
      />
      <p className="eyebrow">404 / PATH NOT FOUND</p>
      <h1>
        {pick(b('Um caminho', 'A path'))}
        <br />
        <em>{pick(b('que não existe.', 'that does not exist.'))}</em>
      </h1>
      <p>
        {pick(
          b(
            'Você pode voltar ao início ou explorar os projetos.',
            'You can return home or explore the projects.',
          ),
        )}
      </p>
      <Link className="button button-primary" to="/">
        {pick(b('Voltar ao início', 'Back to home'))} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
