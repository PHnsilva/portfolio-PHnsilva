# Direção do portfólio

## Referências consultadas

- [Brittany Chiang](https://brittanychiang.com/): apresentação profissional, seleção de projetos, descrição de contribuições e navegação clara.
- [Lee Robinson](https://leerob.com/): conteúdo direto e tipografia sem ornamentação excessiva.
- [Josh W. Comeau — Building an Effective Dev Portfolio](https://www.joshwcomeau.com/effective-portfolio/): seleção de projetos e explicação da participação como forma de guiar a avaliação do trabalho.

O layout e as ilustrações deste projeto são originais. As referências orientam hierarquia e curadoria; não foram copiados textos, imagens ou componentes.

## Identidade e leitura

Foto escolhida por Pedro, com fundo terroso. Marfim como base, grafite no texto, cobre nos destaques e azul-petróleo nos controles. Títulos em serifada, corpo em DM Sans e pequenos detalhes em IBM Plex Mono. O retrato permanece sem filtros de cor.

Terminal estático na apresentação pessoal; jogo opcional no rodapé. Todo o conteúdo aparece imediatamente. Nenhuma introdução, animação de digitação ou jogo impede a leitura. Preferência por movimento reduzido respeitada.

## Curadoria

| Projeto | Por que está em destaque | Tratamento da autoria e status |
| --- | --- | --- |
| APAC Feminina | Domínio real, regras de estoque, dashboard e experiência full stack | Projeto em equipe em desenvolvimento; participação conferida no histórico de pull requests; repositório restrito |
| CalendarMate | Aplicação própria com fluxo completo e integrações | Separar aplicação publicada de configuração real dos provedores |
| Meritum | API, persistência, autenticação e testes de integração | Autoria coletiva preservada; resgate de vantagens identificado como evolução prevista |
| PsiHub | Vivência com aplicações distribuídas e qualidade em equipe | CI, revisão e avaliação heurística atribuídas corretamente; mensageria não é apresentada como concluída |
| Sofiie | Interface original e integração web/desktop | MVP com limitações explícitas |
| SlothSignal | Serviço reutilizável, eventos e contrato entre aplicações | Envio depende da integração e de permissão do navegador |

APAC e PsiHub usam somente resumos profissionais. Não incluem arquivos internos, URLs privadas, dados de produção ou capturas das aplicações restritas. As artes dos cartões são ilustrações conceituais, não capturas nem evidências de execução dos produtos.

## Problemas corrigidos

- Introdução bloqueante e demora artificial para revelar conteúdo.
- Navegação com âncoras locais que não retornavam à página inicial nos detalhes.
- Mais de um main e múltiplos títulos h1 na página inicial.
- Jogo sem fechamento visível e sem limpeza do loop de animação.
- Detalhes de projeto inacessíveis pela vitrine e catálogo limitado a dois exemplos.
- Texto de contato com aparência de envio pelo site, apesar de depender de cliente de e-mail.
- Preferência de idioma sem atualização da língua do documento.
- Título do site com erro de grafia e metadados incompletos.
- Referências antigas a portfolio-grupo e documentação com blocos malformados.

## Manutenção

Dados profissionais em frontend/src/data/profile.ts. Projetos e suas versões PT/EN em frontend/src/data/projects.ts. O usuário busca sua primeira oportunidade; não foram criadas experiências profissionais, números de impacto ou qualificações não informadas. Mudanças futuras na participação devem ser verificadas com o histórico de cada projeto antes de publicação.
