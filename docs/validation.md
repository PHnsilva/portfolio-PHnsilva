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

## Navegação, apresentação e contato

Data: 9 de outubro de 2026. Base `d3870b2c1fb2d64534b558a212543447387849a8`, já publicada pelo PR #3. Ajustes na branch `feat/portfolio-navigation-contact`.

- Dezoito testes passaram: nove jornadas do visitante, seis verificações da corrida e três do formulário. ESLint, formatação e build passaram.
- Velocidade inicial e aceleração da corrida dobradas; o painel começa a 84 km/h. Corrida e encerramento conferidos no navegador.
- Cartões exibem “Saiba mais” e “Projeto e minha contribuição”. O novo link da APAC Feminina abre a página com a participação individual preservada.
- Tecnologias substitui “Meu inventário” e tem acesso pela navbar. Navegação local e retorno dos detalhes para Tecnologias conferidos, com foco no destino e menu móvel fechado. A rolagem é suave e a transição respeita movimento reduzido.
- Apresentação revisada em português e inglês, com formação e interesses em qualidade, acessibilidade, usabilidade, sistemas distribuídos, automação, DevOps, interfaces, produtos digitais e jogos.
- Sobre, Tecnologias e Contato inspecionados em 320, 390 e 768 px e no desktop. Sem rolagem horizontal na página. Captura da apresentação: [about-refinement.jpg](prints/about-refinement.jpg).
- O formulário valida os campos, bloqueia envios simultâneos e preserva o rascunho em falhas. Os três testes usam respostas simuladas; não comprovam entrega de e-mail.
- Após a ativação confirmada pelo proprietário, o serviço aceitou o envio real com a origem do domínio público. Pedro confirmou o recebimento no Gmail e forneceu uma captura da mensagem. O endereço local solicitou ativação própria e exibiu erro, preservando o texto. A submissão pelo navegador de produção deve ser conferida após o deploy.
