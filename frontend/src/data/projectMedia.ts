import type { Localized } from '../i18n/context';
import { bilingual as b } from '../i18n/context';

type ProjectMedia = { src: string; alt: Localized; caption: Localized; label: string };
export const projectMedia: Record<string, ProjectMedia> = {
  'apac-feminina': {
    src: '/images/projects/apac-feminina.jpg',
    alt: b('Tela de acesso do sistema APAC Farma', 'APAC Farma sign-in screen'),
    caption: b(
      'Tela de acesso da aplicação, executada localmente.',
      'Application sign-in screen, running locally.',
    ),
    label: 'APAC FARMA',
  },
  'calendar-mate': {
    src: '/images/projects/calendar-mate.jpg',
    alt: b(
      'Página de agendamentos SG Pequenos Reparos, desenvolvida no CalendarMate',
      'SG Pequenos Reparos scheduling page, built with CalendarMate',
    ),
    caption: b(
      'Página pública de agendamentos SG Pequenos Reparos.',
      'Public SG Pequenos Reparos scheduling page.',
    ),
    label: 'CALENDARMATE',
  },
  meritum: {
    src: '/images/projects/meritum-login.png',
    alt: b('Tela de acesso do Meritum', 'Meritum sign-in screen'),
    caption: b(
      'Captura da aplicação registrada no repositório do projeto.',
      'Application screenshot from the project repository.',
    ),
    label: 'MERITUM',
  },
  psihub: {
    src: '/images/projects/psihub.jpg',
    alt: b('Tela pública de acesso da plataforma PsiHub', 'PsiHub public sign-in screen'),
    caption: b(
      'Tela de acesso da versão web publicada.',
      'Sign-in screen of the deployed web application.',
    ),
    label: 'PSIHUB',
  },
  sofiie: {
    src: '/images/projects/sofiie.jpg',
    alt: b(
      'Interface da assistente Sofiie, com expressão visual e campo de mensagem',
      'Sofiie assistant interface, with visual expression and message field',
    ),
    caption: b(
      'Interface local em repouso, sem conexão com o servidor.',
      'Local interface at rest, without a server connection.',
    ),
    label: 'SOFIIE',
  },
  'sloth-signal': {
    src: '/images/projects/sloth-signal.jpg',
    alt: b('Página pública do serviço SlothSignal', 'SlothSignal public service page'),
    caption: b(
      'Página de apresentação do serviço Web Push publicado.',
      'Public overview page of the deployed Web Push service.',
    ),
    label: 'SLOTHSIGNAL',
  },
};
