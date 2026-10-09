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
