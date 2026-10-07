# Pedro Silva — Portfólio

Portfólio de **Pedro Henrique Silva Vargas**, estudante de Engenharia de Software na PUC Minas e técnico em Eletroeletrônica pelo SENAI Itabirito. Reúne projetos pessoais e em equipe, com contexto do problema, participação e estado de cada entrega.

[![Portfolio checks](https://github.com/PHnsilva/portfolio-PHnsilva/actions/workflows/ci.yml/badge.svg)](https://github.com/PHnsilva/portfolio-PHnsilva/actions/workflows/ci.yml)

- **Site:** [portfolio-phnsilva.vercel.app](https://portfolio-phnsilva.vercel.app)
- **Repositório:** [PHnsilva/portfolio-PHnsilva](https://github.com/PHnsilva/portfolio-PHnsilva)
- **Direção visual e curadoria:** [docs/portfolio-direction.md](docs/portfolio-direction.md)
- **Padrão para revisão dos READMEs:** [docs/README-standard.md](docs/README-standard.md)

## Status

A reformulação está disponível na branch e no pull request correspondente. O endereço público apresenta a versão da branch de produção `master`; a nova versão depende da integração e de um deploy confirmado na Vercel.

## Demonstração

Capturas da reformulação, verificadas no navegador:

| Desktop | Celular |
| --- | --- |
| ![Abertura do portfólio no desktop](docs/prints/reformulation-desktop.jpg) | ![Portfólio em tela de celular](docs/prints/reformulation-mobile.jpg) |

## Funcionalidades

- Apresentação imediata, com foto, formação e contatos.
- Seis projetos selecionados: APAC Feminina, CalendarMate, Meritum, PsiHub, Sofiie e SlothSignal.
- Página de detalhes por projeto, com problema, solução, participação, tecnologias e limitações.
- Navegação entre páginas e seções, menu para celular e rota de página não encontrada.
- Conteúdo em português e inglês, com preferência salva localmente quando disponível.
- Contato por links diretos e cópia do endereço de e-mail; o site não envia mensagens.
- Terminal estático como detalhe de personalidade e minigame opcional no rodapé.
- Navegação por teclado, foco visível, link para pular conteúdo e respeito à preferência por movimento reduzido.

As artes dos projetos são **ilustrações conceituais**, não screenshots dos sistemas. Projetos em equipe têm sua autoria preservada. APAC e PsiHub têm repositórios restritos e são apresentados por resumos profissionais, sem dados ou arquivos internos.

## Tecnologias e arquitetura

**React 19, TypeScript, React Router e Vite 8**, com CSS próprio. Vitest e Testing Library verificam jornadas do visitante. ESLint e Prettier verificam código e formatação. As versões efetivamente instaladas estão no [lockfile](frontend/package-lock.json).

```text
Navegador → React Router → página inicial ou detalhes do projeto
                           ↓
                  dados profissionais PT/EN
```

Aplicação estática, sem backend, formulário de envio, analytics ou credenciais de serviços externos. Fontes DM Sans e IBM Plex Mono são carregadas pelo Google Fonts; há fallback para fontes do sistema. O retrato é servido pelo próprio site.

```text
frontend/
├── public/             Retrato, favicon e robots.txt
├── src/
│   ├── components/     Layout, cartões, arte conceitual, SEO e jogo
│   ├── data/           Perfil e projetos
│   ├── i18n/           Idioma e seleção de conteúdo PT/EN
│   ├── pages/          Início, detalhes e página não encontrada
│   └── index.css       Paleta, tipografia e regras responsivas
├── tests/              Jornadas do visitante
└── vercel.json         Rotas diretas e cabeçalhos
```

## Execução local

Pré-requisitos: Git, **Node.js 24** e npm. A partir de um clone limpo:

```bash
git clone https://github.com/PHnsilva/portfolio-PHnsilva.git
cd portfolio-PHnsilva/frontend
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`. Não há arquivo `.env` obrigatório.

## Verificação

Dentro de `frontend/`:

```bash
npm run lint
npm run format:check
npm test
npm run build
```

Os testes cobrem apresentação imediata, navegação de detalhes para seções, URLs diretas, página inexistente, idioma e persistência, menu móvel, abertura e fechamento do jogo e links externos. Eles não substituem a inspeção visual em navegador.

Para conferir o bundle de produção:

```bash
npm run preview
```

O endereço normalmente será `http://localhost:4173`.

## Publicação

Na Vercel, o projeto deve usar:

| Configuração | Valor |
| --- | --- |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm ci` |
| Node.js | `24.x` |
| Production Branch | `master` |

O arquivo `frontend/vercel.json` oferece fallback para páginas como `/projetos/calendar-mate`, preservando arquivos estáticos. Após integrar o pull request, conferir o deploy e abrir uma rota de projeto diretamente. Uma compilação local não confirma publicação remota.

## Atualizar conteúdo

- Perfil, imagem, contatos e URL canônica: `frontend/src/data/profile.ts`.
- Projetos, participação, status, limites e textos PT/EN: `frontend/src/data/projects.ts`.
- Textos da apresentação: `frontend/src/pages/Home.tsx`.
- Cores e tipografia: `frontend/src/index.css`.

Para novos projetos, incluir contexto, contribuição e estado nas duas línguas. Não inserir links de demonstração inexistentes ou dados privados. Conferir a versão publicada do projeto antes de alterar seu status.

## Contribuição e autoria

Esta versão evolui a base acadêmica do portfólio desenvolvido com **Felipe Parreiras** e **Gabriel Nonato**, preservando seus créditos. A personalização e a reformulação deste repositório são voltadas ao portfólio de Pedro Silva.

Alterações devem partir de uma branch própria, passar pelas verificações e ser apresentadas em pull request para `master`. As referências de design e os critérios editoriais estão em [docs/portfolio-direction.md](docs/portfolio-direction.md).

## Licença

[MIT](LICENSE), conforme o arquivo de licença existente no repositório.
