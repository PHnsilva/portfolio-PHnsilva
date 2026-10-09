import { bilingual as b, type Localized } from '../i18n/context';

export type Project = {
  slug: string;
  title: string;
  kind: 'personal' | 'team';
  category: Localized;
  summary: Localized;
  status: Localized;
  role: Localized;
  problem: Localized;
  approach: Localized;
  contribution: Localized;
  highlights: Localized<string[]>;
  limits: Localized;
  stack: string[];
  visual: 'inventory' | 'calendar' | 'coins' | 'network' | 'assistant' | 'signal';
  repo?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: 'apac-feminina',
    title: 'APAC Feminina',
    kind: 'team',
    visual: 'inventory',
    category: b('Saúde · projeto em equipe', 'Healthcare · team project'),
    summary: b(
      'Gestão de medicamentos e acompanhamento clínico para apoiar a rotina da APAC Feminina.',
      'Medication management and clinical follow-up supporting daily work at APAC Feminina.',
    ),
    status: b('Em desenvolvimento', 'In development'),
    role: b('Desenvolvimento full stack em equipe', 'Full-stack development in a team'),
    problem: b(
      'Substituir o controle em planilhas por um sistema que acompanhe estoque por lote, vencimentos e registros clínicos.',
      'Replace spreadsheets with a system that tracks stock by batch, expiry dates and clinical records.',
    ),
    approach: b(
      'Frontend Next.js, API Spring Boot e PostgreSQL. O domínio organiza medicamentos, pacientes, receitas e movimentações com controle de acesso por perfil.',
      'A Next.js frontend, Spring Boot API and PostgreSQL database organize medications, patients, prescriptions and stock movements with role-based access.',
    ),
    contribution: b(
      'Contribuí com dashboard de dados reais, controle por unidade e embalagem, responsividade, consulta de receitas e padronização dos ícones de ação. As entregas foram feitas por pull requests revisados pela equipe.',
      'I contributed the dashboard using real data, unit and package stock control, responsive flows, prescription search and consistent action icons through team-reviewed pull requests.',
    ),
    highlights: b(
      [
        'Estoque por unidade e embalagem',
        'Dashboard e relatórios de uso',
        'Consulta de receitas e fluxos responsivos',
      ],
      [
        'Unit and package stock control',
        'Dashboard and usage reports',
        'Prescription search and responsive flows',
      ],
    ),
    limits: b(
      'Projeto em desenvolvimento. O repositório da equipe tem acesso restrito; esta apresentação não expõe dados de pacientes ou ambientes internos.',
      'In development. The team repository is restricted; this overview contains no patient data or internal environment details.',
    ),
    stack: ['Java', 'Spring Boot', 'Next.js', 'PostgreSQL'],
  },
  {
    slug: 'calendar-mate',
    title: 'CalendarMate',
    kind: 'personal',
    visual: 'calendar',
    category: b('Agendamento · projeto pessoal', 'Scheduling · personal project'),
    summary: b(
      'Agenda de serviços locais com disponibilidade, confirmação e histórico de atendimentos.',
      'Local service scheduling with availability, confirmation and appointment history.',
    ),
    status: b('Aplicação publicada', 'Deployed application'),
    role: b('Desenvolvimento e evolução do projeto', 'Project development and maintenance'),
    problem: b(
      'Organizar a disponibilidade e o atendimento de prestadores de serviços em um fluxo acessível pelo navegador.',
      'Organize service providers’ availability and appointments in a browser-accessible flow.',
    ),
    approach: b(
      'Frontend React e backend Spring Boot, com integração ao Google Calendar e histórico configurável. Os serviços externos têm modos locais de desenvolvimento.',
      'React frontend and Spring Boot backend with Google Calendar integration and configurable history. External services support local development modes.',
    ),
    contribution: b(
      'Desenvolvo o fluxo de agendamento, consulta e cancelamento, a disponibilidade em escala 4x4, o painel administrativo e a integração entre frontend e API.',
      'I develop booking, lookup and cancellation flows, 4-on/4-off availability, the administration panel and frontend/API integration.',
    ),
    highlights: b(
      [
        'Disponibilidade e escala configurável',
        'Consulta, cancelamento e histórico',
        'Integrações com modos de desenvolvimento',
      ],
      [
        'Configurable availability and schedules',
        'Lookup, cancellation and history',
        'Integrations with development modes',
      ],
    ),
    limits: b(
      'Os provedores externos dependem de configuração. O site público é um ambiente operacional de serviços; não é necessário criar um agendamento para conhecer o projeto.',
      'External providers depend on configuration. The public site is an operational service environment; no booking is needed to explore it.',
    ),
    stack: ['Java', 'Spring Boot', 'React', 'Google Calendar'],
    repo: 'https://github.com/PHnsilva/CalendarMate',
    live: 'https://calendar-mate.vercel.app',
  },
  {
    slug: 'meritum',
    title: 'Meritum',
    kind: 'team',
    visual: 'coins',
    category: b('Educação · projeto em equipe', 'Education · team project'),
    summary: b(
      'Moeda estudantil para reconhecer mérito acadêmico, com extrato e acesso por perfil.',
      'A student currency recognizing academic merit, with transaction history and role-based access.',
    ),
    status: b('Protótipo funcional', 'Functional prototype'),
    role: b('Integrante da equipe de desenvolvimento', 'Development team member'),
    problem: b(
      'Modelar o reconhecimento de mérito acadêmico em um sistema compartilhado por alunos, professores e instituições.',
      'Model recognition of academic merit in a system shared by students, teachers and institutions.',
    ),
    approach: b(
      'React e Fastify com TypeScript, Prisma e PostgreSQL. A API usa autenticação JWT, permissões por perfil e testes de integração.',
      'React and Fastify with TypeScript, Prisma and PostgreSQL. The API uses JWT authentication, role-based permissions and integration tests.',
    ),
    contribution: b(
      'Participo do desenvolvimento acadêmico com Felipe Parreiras e Gabriel Nonato. O código e a documentação registram a autoria coletiva; as funcionalidades abaixo descrevem o produto da equipe.',
      'I participate in this academic project with Felipe Parreiras and Gabriel Nonato. Code and documentation preserve collective authorship; the features below describe the team’s product.',
    ),
    highlights: b(
      [
        'Autenticação e autorização por perfil',
        'Distribuição de moedas e extrato',
        'Testes de integração da API',
      ],
      [
        'Authentication and role-based authorization',
        'Coin distribution and transaction history',
        'API integration tests',
      ],
    ),
    limits: b(
      'Protótipo acadêmico. O catálogo e o resgate de vantagens fazem parte da evolução prevista, e não são apresentados como entrega concluída.',
      'Academic prototype. Rewards catalog and redemption are planned work, not completed features.',
    ),
    stack: ['React', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL'],
    repo: 'https://github.com/PHnsilva/Meritum',
  },
  {
    slug: 'psihub',
    title: 'PsiHub',
    kind: 'team',
    visual: 'network',
    category: b('Saúde · aplicações distribuídas', 'Healthcare · distributed applications'),
    summary: b(
      'Presença profissional e agendamento para psicólogos, em uma plataforma web e mobile.',
      'Professional presence and scheduling for psychologists on a web and mobile platform.',
    ),
    status: b('Em desenvolvimento', 'In development'),
    role: b(
      'Desenvolvimento, qualidade e documentação em equipe',
      'Team development, quality and documentation',
    ),
    problem: b(
      'Reunir descoberta de profissionais e agendamento, hoje fragmentados entre redes sociais, mensagens e agendas manuais.',
      'Bring together professional discovery and scheduling, currently fragmented across social networks, messages and manual calendars.',
    ),
    approach: b(
      'App Flutter e API NestJS com PostgreSQL. A arquitetura prevê comunicação assíncrona para notificações e lembretes, com entregas acompanhadas por sprint.',
      'Flutter app and NestJS API with PostgreSQL. The architecture plans asynchronous notifications and reminders, with work tracked through sprints.',
    ),
    contribution: b(
      'Implementei a integração contínua da API e do Flutter e contribuí com avaliação heurística, revisão e documentação de entregas. Participo da evolução de eventos de consultas e lembretes, ainda em desenvolvimento.',
      'I implemented continuous integration for the API and Flutter and contributed heuristic evaluation, review and delivery documentation. I participate in ongoing appointment event and reminder development.',
    ),
    highlights: b(
      [
        'Aplicação web e mobile com Flutter',
        'API de identidade, busca e agendamento',
        'Integração contínua e avaliação heurística',
      ],
      [
        'Flutter web and mobile application',
        'Identity, search and scheduling API',
        'Continuous integration and heuristic evaluation',
      ],
    ),
    limits: b(
      'Algumas telas usam dados de exemplo. Mensageria e lembretes estão em evolução. O repositório da equipe tem acesso restrito e a API gratuita pode levar um tempo para responder.',
      'Some screens use example data. Messaging and reminders are ongoing work. The team repository is restricted and the free-tier API may take time to respond.',
    ),
    stack: ['Flutter', 'Dart', 'NestJS', 'TypeScript', 'PostgreSQL'],
    live: 'https://psihub-orcin.vercel.app',
  },
  {
    slug: 'sofiie',
    title: 'Sofiie',
    kind: 'personal',
    visual: 'assistant',
    category: b('Assistente · projeto pessoal', 'Assistant · personal project'),
    summary: b(
      'Assistente por texto e voz com interface web e ações locais controladas no desktop.',
      'A text and voice assistant with a web interface and controlled desktop actions.',
    ),
    status: b('MVP funcional', 'Functional MVP'),
    role: b('Projeto pessoal de desenvolvimento', 'Personal development project'),
    problem: b(
      'Explorar uma interface de assistente que combine conversa e comandos locais sem permitir execução arbitrária.',
      'Explore an assistant interface combining conversation and local commands without arbitrary execution.',
    ),
    approach: b(
      'PWA em TypeScript, backend Fastify e bridge Tauri. Comandos determinísticos e uma lista de ações permitidas limitam o que pode ser executado no dispositivo.',
      'TypeScript PWA, Fastify backend and Tauri bridge. Deterministic commands and an allowlist limit device actions.',
    ),
    contribution: b(
      'Desenvolvo a interface, os estados visuais do assistente, a integração de voz, o catálogo de comandos e os limites entre a API e o aplicativo desktop.',
      'I develop the interface, assistant visual states, voice integration, command catalog and boundaries between the API and desktop application.',
    ),
    highlights: b(
      ['Texto e voz com fallback', 'PWA e integração desktop', 'Comandos locais com allowlist'],
      ['Text and voice with fallback', 'PWA and desktop integration', 'Allowlisted local commands'],
    ),
    limits: b(
      'Não há histórico permanente ou autenticação por voz. Ações desktop exigem o Tauri aberto; o provedor mock permite desenvolvimento sem credenciais externas.',
      'No permanent history or voice authentication. Desktop actions require Tauri; the mock provider supports development without external credentials.',
    ),
    stack: ['TypeScript', 'Fastify', 'Tauri', 'Rust', 'PWA'],
    repo: 'https://github.com/PHnsilva/Sofiie',
  },
  {
    slug: 'sloth-signal',
    title: 'SlothSignal',
    kind: 'personal',
    visual: 'signal',
    category: b('Infraestrutura · projeto pessoal', 'Infrastructure · personal project'),
    summary: b(
      'Serviço reutilizável de Web Push para eventos e alertas de aplicações.',
      'A reusable Web Push service for application events and alerts.',
    ),
    status: b('Serviço publicado', 'Deployed service'),
    role: b('Desenvolvimento do serviço e integração', 'Service development and integration'),
    problem: b(
      'Separar o envio de notificações da aplicação consumidora, mantendo os registros mesmo quando o alerta não puder ser enviado.',
      'Separate notification delivery from the consuming application while preserving records when alerts cannot be sent.',
    ),
    approach: b(
      'API autenticada por aplicação, inscrições Web Push, deduplicação de eventos e armazenamento no Supabase. O primeiro consumidor é o SlothMint.',
      'App-authenticated API, Web Push subscriptions, event deduplication and Supabase storage. SlothMint is the first consumer.',
    ),
    contribution: b(
      'Desenvolvo o serviço independente e o contrato de integração, com tokens mantidos no servidor e destinos de notificação limitados à aplicação consumidora.',
      'I develop the independent service and integration contract, keeping tokens server-side and limiting notification destinations to the consuming application.',
    ),
    highlights: b(
      [
        'Contrato reutilizável por aplicação',
        'Deduplicação de eventos',
        'Web Push com inscrição por dispositivo',
      ],
      [
        'Reusable per-app contract',
        'Event deduplication',
        'Web Push with per-device subscriptions',
      ],
    ),
    limits: b(
      'Notificações dependem da integração do aplicativo e da permissão de cada navegador. A página publicada apresenta o serviço; ela não ativa notificações por conta própria.',
      'Notifications require application integration and browser permission. The deployed page introduces the service; it does not activate notifications itself.',
    ),
    stack: ['TypeScript', 'Web Push', 'Supabase', 'Vercel'],
    repo: 'https://github.com/PHnsilva/SlothSignal',
    live: 'https://sloth-signal.vercel.app',
  },
];
