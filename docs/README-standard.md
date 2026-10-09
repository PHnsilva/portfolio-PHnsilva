# Padrão de README dos projetos de Pedro Silva

Um README deve permitir que alguém entenda o problema, veja o que existe hoje e consiga avaliar ou executar o projeto. A ordem e a quantidade de seções acompanham o tamanho do projeto. A documentação descreve o código presente na branch, sem transformar planejamento em funcionalidade entregue.

## O que aproveitar das referências

| Referência                                                 | Prática aproveitada                                                    | Como aplicar                                                                                                   |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| APAC Feminina, exemplo fornecido pelo autor                | Problema real, status e critérios de aceite, configuração por ambiente | Separar entregas concluídas, parciais e pendentes; vincular pendências às issues                               |
| PsiHub, exemplo fornecido pelo autor                       | Jornada de execução, portas, comandos, arquitetura e autoria da equipe | Oferecer um caminho principal reproduzível, com endereços, requisitos e observações sobre o ambiente publicado |
| [Meritum](https://github.com/PHnsilva/Meritum)             | Funcionalidades, limites, estrutura da API, testes e troubleshooting   | Explicar o que os testes cobrem e diferenciar protótipo de produção                                            |
| [CalendarMate](https://github.com/PHnsilva/CalendarMate)   | Modos locais e reais das integrações, variáveis por serviço            | Declarar quando uma integração depende de configuração ou opera em modo dummy                                  |
| [Sofiie](https://github.com/PHnsilva/Sofiie)               | Limites explícitos do MVP e fronteiras entre web e desktop             | Registrar restrições reais e pré-requisitos das capacidades demonstradas                                       |
| [Nubo](https://github.com/PHnsilva/nubo-scheduling-system) | Artefatos e fontes editáveis dos diagramas                             | Identificar um repositório documental; apresentar modelos e diagramas como evidência adequada                  |

As referências são inspirações de estrutura. Versões, comandos, URLs, status, licenças e autoria sempre precisam ser conferidos no próprio repositório. Nenhum badge ou trecho técnico é copiado sem essa verificação. Os arquivos internos dos projetos privados não devem ser reproduzidos em repositórios públicos.

## Estrutura recomendada

1. **Nome e apresentação:** duas ou três frases sobre público, problema e solução. Evitar repetir a apresentação em várias seções.
2. **Status e links:** informar protótipo, MVP, aplicação publicada ou projeto em desenvolvimento; oferecer repositório, demonstração e documentação existentes. Uma URL respondendo não comprova todas as funções do produto.
3. **Demonstração:** poucas capturas atuais ou vídeo curto, com legenda. Usar dados fictícios. Identificar mockups e ilustrações como conceituais. Para projetos documentais, mostrar diagramas renderizados.
4. **Funcionalidades e limites:** indicar o que está implementado, o que é parcial e o que está previsto. Conectar pendências a issues quando houver acompanhamento ativo.
5. **Tecnologias e arquitetura:** listar apenas tecnologias usadas. Explicar responsabilidades e fluxo principal; mover detalhes extensos para docs. Frameworks planejados ficam identificados como proposta.
6. **Execução local:** versões realmente exigidas, instalação, configuração, comando de início, portas e URL esperada. Informar de qual pasta cada comando parte. Apresentar um caminho principal e alternativas apenas se úteis.
7. **Configuração e ambientes:** tabela curta com variáveis necessárias e arquivos de exemplo. Usar placeholders; distinguir desenvolvimento, teste e produção, serviços pagos, mocks e integrações opcionais.
8. **Verificação:** comandos reais de lint, testes e build. Descrever cobertura funcional, dependências e restrições. Registrar a data de uma execução quando apresentar resultados; evitar números de testes fixos que envelheçam sem manutenção.
9. **Documentação e contribuição:** referências a docs, contratos, diagramas e CONTRIBUTING. Acrescentar troubleshooting para problemas conhecidos e recorrentes.
10. **Autores e licença:** preservar autoria coletiva e identificar participação individual quando útil. A licença deve corresponder ao arquivo existente; ausência de licença é descrita como ausência, sem supor permissão.

Adicionar sumário em READMEs longos. Os títulos precisam corresponder às âncoras do índice. Repositórios pequenos podem reunir seções; projetos documentais não precisam de comandos fictícios de servidor ou testes inexistentes.

## Regras de escrita e apresentação

- Português claro, frases diretas, títulos curtos e termos consistentes.
- Nome, objetivo e estado compreensíveis antes do primeiro scroll.
- No máximo uma linha compacta de badges pertinentes. Badges de CI devem refletir um workflow real; versões devem corresponder ao manifesto ou ambiente exigido.
- Uma captura representativa é mais útil do que muitas imagens redundantes.
- Estrutura de pastas resumida às responsabilidades principais. Não apresentar node_modules, dist ou arquivos gerados como arquitetura.
- Caminhos relativos para arquivos do repositório; HTTPS para links externos. Links privados devem ser identificados como restritos.
- Comandos completos, blocos Markdown fechados e instruções compatíveis com a ferramenta indicada. Evitar comandos destrutivos como parte do caminho normal de execução.
- Resultado quantitativo, desempenho ou nível de maturidade precisa de evidência. Não inventar número de usuários, cobertura, disponibilidade, impacto ou integração automática.
- Credenciais, dados pessoais e dados de clientes/pacientes não entram nas capturas ou exemplos. Placeholders não devem ser credenciais operacionais.
- Separar contribuição pessoal de funcionalidades produzidas pela equipe. Revisão e documentação são contribuições válidas e devem receber o nome correto.

## Critério de revisão

Antes de publicar uma alteração, conferir:

- [ ] Objetivo e status representam o estado do código.
- [ ] Demonstração e contatos levam ao destino correto.
- [ ] Links relativos, índice e blocos de código funcionam.
- [ ] Requisitos correspondem aos manifestos e ao lockfile.
- [ ] Caminho de execução foi validado, ou sua limitação está explícita.
- [ ] Mocks, credenciais necessárias e funcionalidades pendentes estão identificados.
- [ ] Capturas são atuais, legíveis e não contêm dados privados.
- [ ] Testes, build e CI são descritos sem extrapolar seus resultados.
- [ ] Autoria, contribuição e licença foram preservadas.

## Ordem da revisão futura

Primeiro, os destaques do portfólio: CalendarMate, Meritum, Sofiie e SlothSignal. APAC e PsiHub recebem sugestões nos respectivos fluxos da equipe, respeitando seus templates e autoria. Depois, revisar os demais repositórios públicos, com formato próprio para estudos, APIs pequenas e documentação de arquitetura. Esta etapa define o padrão; não altera os READMEs desses outros projetos.
