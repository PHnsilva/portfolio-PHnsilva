# Validação da prévia local

Data: 8 de outubro de 2026. Reformulação baseada em `94673a6` de `master`, validada na branch `feat/portfolio-pixel` e aprovada por Pedro para publicação.

- Build TypeScript/Vite, ESLint e Prettier passaram.
- Nove testes de interação passaram: apresentação, navegação entre detalhes e seções, URLs diretas/404, idioma/persistência, preferência inválida, menu móvel/Escape, jogo, filtros e links externos.
- Inspeção no navegador em 320, 390, 600, 768, 1024 e 1440 px; sem rolagem horizontal na página inicial. Detalhes de projeto também conferidos em 320 px.
- Menu móvel fecha ao navegar; filtros retornam os três projetos pessoais ou os três projetos em equipe.
- Jogo começa por botão, responde a Espaço, fecha por Escape e devolve o foco ao acionador.
- Bundle de produção servido localmente. Rota `/projetos/calendar-mate` recarregada diretamente, em inglês; língua e metadados corretos. Navegação de volta à página inicial conferida.
- Retrato e seis capturas carregaram; hash do retrato coincide com o arquivo fornecido pelo usuário.
- Nenhum erro ou aviso no console da prévia inspecionada.

As capturas em `docs/prints/` são desta versão. Essa validação confirma a prévia local, não uma publicação remota. A proteção/regras de produção não foram alteradas.

## Ampliação de tecnologias e Pixel racer

Data: 9 de outubro de 2026. A versão aprovada foi integrada pelo PR #2, em `91ad880a3890025efc592d1f0a42950ab50b566a`, com deploy de produção concluído e página pública conferida no navegador.

A evolução na branch `feat/pixel-racer-and-tools` mantém a direção visual e acrescenta o inventário de tecnologias e a corrida de carro pixelado.

- Quatorze testes passaram: nove jornadas do visitante e cinco testes da simulação de corrida.
- ESLint, formatação e build TypeScript/Vite passaram.
- Corrida automática, aceleração, mudança de faixa por teclado e botões, colisão, fim de jogo, reinício e pausa conferidos no navegador.
- Jogo e inventário inspecionados em 320 × 568 e 390 × 844 px e no desktop; sem rolagem horizontal. O diálogo cabe na tela pequena com seus controles acessíveis.
- Expansão das áreas de tecnologia e tradução do jogo para inglês conferidas. Escape fecha o diálogo.
- Tecnologias revisadas a partir dos manifestos dos projetos; fontes em `technology-sources.md`. C, C++ e VS Code preservados da apresentação existente do autor.

Essa segunda inspeção é local; a publicação deve ser confirmada pelo deploy associado ao commit integrado e pela página pública.
