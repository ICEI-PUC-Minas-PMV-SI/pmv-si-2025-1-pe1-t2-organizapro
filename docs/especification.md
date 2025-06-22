# Especificações do Projeto

A Especificação do Projeto trata da definição do problema e da solução a partir da perspectiva do usuário. Serão apresentados o perfil de usuários, o diagrama de personas, as histórias de usuários, os requisitos funcionais e não funcionais, além das restrições do projeto. Essas abordagens visam alinhar as necessidades dos usuários às funcionalidades do sistema, além de estabelecer as limitações técnicas e operacionais.

Para a elaboração dessas especificações, foram aplicadas técnicas como Design Thinking para identificar e priorizar as necessidades dos usuários, brainstorming para geração de ideias, e a criação de personas e histórias de usuários para representar suas características e expectativas.

## Perfis de Usuários

Os perfis de usuários da aplicação web englobam uma diversidade de funções e níveis de conhecimento tecnológico, garantindo que a solução atenda às necessidades de diferentes tipos de usuários em instituições públicas e privadas. A seguir, são apresentados os principais perfis de usuários que interagirão com a aplicação, cada um com características e necessidades específicas.

### Perfil 1: Analistas de Processos

| **Dados**                    | **Descrição**                                                                                                          |
|------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Demográficos**              | Profissionais entre 25 e 45 anos, com ensino superior, podendo ou não ter especialização em modelagem de processos.     |
| **Uso do Produto**           | Criam, ajustam e monitoram flows de trabalho para garantir eficiência e otimização.                                    |
| **Psicográficos**            | Buscam padronização, automação e soluções para reduzir falhas e aumentar a produtividade.                              |
| **Sentimento do Cliente**    | Precisam de ferramentas flexíveis para ajustes rápidos e acompanhamento em tempo real.                                |
| **Tecnográficos**            | Usam desktops e notebooks com Windows, podendo ter restrições ao uso de extensões ou softwares externos.               |
| **Nível de conhecimento tecnológico** | Intermediário, familiarizados com ferramentas de análise e gestão de processos.                                      |
| **Necessidades**             | Ferramentas intuitivas para criação, edição e otimização de procedimentos.                                            |

### Perfil 2: Diretores e Executivos

| **Dados**                    | **Descrição**                                                                                                          |
|------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Demográficos**              | Profissionais entre 40 e 60 anos, com ensino superior e possível pós-graduação em gestão ou liderança.                 |
| **Uso do Produto**           | Analisam dados estratégicos, indicadores e tomam decisões.                                                             |
| **Psicográficos**            | Buscam dados precisos para otimizar a gestão e embasar decisões.                                                       |
| **Sentimento do Cliente**    | Exigem informações claras e objetivas.                                                                                  |
| **Tecnográficos**            | Usam tablets e notebooks, preferindo interfaces simples e dashboards visuais.                                           |
| **Nível de conhecimento tecnológico** | Básico a intermediário, com foco em dados para decisões.                                                              |
| **Necessidades**             | Visão clara das mudanças nos flows de trabalho para facilitar a gestão estratégica.                                   |

### Perfil 3: Funcionários Operacionais

| **Dados**                    | **Descrição**                                                                                                          |
|------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Demográficos**              | Profissionais entre 18 e 60 anos, com formação técnica ou ensino médio.                                                |
| **Uso do Produto**           | Acessam para executar tarefas diárias e seguir flows definidos.                                                      |
| **Psicográficos**            | Buscam praticidade e eficiência nas tarefas, preferindo interfaces simples e diretas.                                  |
| **Sentimento do Cliente**    | Precisam de suporte acessível e treinamento básico.                                                                    |
| **Tecnográficos**            | Usam dispositivos móveis ou computadores básicos com limitações no uso de certos navegadores.                          |
| **Nível de conhecimento tecnológico** | Básico, familiarizados com ferramentas simples, mas com dificuldades em funcionalidades avançadas.                   |
| **Necessidades**             | Acesso simples aos flows de trabalho, com interface funcional e notificações sobre alterações importantes.            |

### Perfil 4: Gestores e Administradores

| **Dados**                    | **Descrição**                                                                                                          |
|------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Demográficos**              | Profissionais entre 30 e 50 anos, com ensino superior em Administração, Gestão ou áreas correlatas.                    |
| **Uso do Produto**           | Monitoram, controlam e otimizam procedimentos de trabalho para maior eficiência operacional.                           |
| **Psicográficos**            | Valorizam produtividade, organização e redução de erros, focando em ferramentas que facilitam a gestão.               |
| **Sentimento do Cliente**    | Buscam clareza nos dados e funcionalidades intuitivas para o acompanhamento dos processos.                             |
| **Tecnográficos**            | Acessam via computadores corporativos, usando navegadores como Chrome e Edge.                                          |
| **Nível de conhecimento tecnológico** | Intermediário, com experiência em sistemas de gestão, mas podem ter dificuldades com ferramentas digitais avançadas.|
| **Necessidades**             | Controle de acesso eficiente, visão clara e atualizada dos flows de trabalho para otimizar processos.                 |

### Perfil 5: TI e Suporte Técnico

| **Dados**                    | **Descrição**                                                                                                          |
|------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Demográficos**              | Profissionais entre 20 e 40 anos, com formação superior em TI, Ciência da Computação ou áreas correlatas.             |
| **Uso do Produto**           | Gerenciam infraestrutura, configuram integrações e oferecem suporte técnico.                                          |
| **Psicográficos**            | Priorizam estabilidade, segurança e eficiência na aplicação.                                                          |
| **Sentimento do Cliente**    | Valorizam documentação técnica clara, suporte ágil e flexibilidade para personalização.                               |
| **Tecnográficos**            | Trabalham com servidores, bancos de dados, integração de APIs, usando sistemas como Linux, Windows Server e macOS.     |
| **Nível de conhecimento tecnológico** | Avançado, com habilidades em configuração de sistemas e integração de ferramentas.                                    |
| **Necessidades**             | Acesso avançado para configurações, logs detalhados e permissões administrativas para ajustes internos.               |

## Personas

As personas podem ser definidas como representações semificcionais dos usuários ideais, refletindo as características e necessidades do público-alvo ao qual a aplicação se destina. A seguir, são apresentadas as principais personas que utilizarão a aplicação, com a descrição das suas particularidades:

### Persona 1

![Daniela Almeida, a Gerente (1)](https://github.com/user-attachments/assets/9feee6d0-ba39-4069-80e9-934b177f7e48)

### Persona 2

![Sônia Barbosa, a Analista de Processos (1)](https://github.com/user-attachments/assets/4808bce4-1ea0-455e-86ee-cedd3d555a7f)

### Persona 3

![Márcio Cândido, o Oficial Judiciário](https://github.com/user-attachments/assets/5b403c6d-38f3-41ec-bd9c-21a0d4e1c343)

## Histórias de Usuários

Histórias de usuários são descrições curtas das necessidades e objetivos de diferentes personas dentro de um sistema, ajudando a guiar o desenvolvimento de funcionalidades que atendam a essas demandas. A seguir, são apresentadas as histórias de usuários para os principais perfis que interagirão com a aplicação:

| **EU COMO... `PERSONA`**            | **QUERO/PRECISO... `FUNCIONALIDADE`**                                       | **PARA... `MOTIVO/VALOR`**                                           |
|-----------------------------------|---------------------------------------------------------------------------|------------------------------------------------------------------|
| **Analista de Processos**         | Atualizar procedimentos de trabalho.                                       | Adaptar flows conforme as novas demandas sem perder a eficiência. |
| **Analista de Processos**         | Criar e ajustar flows de trabalho de forma rápida e eficiente.            | Otimizar os processos internos e responder às necessidades organizacionais. |
| **Diretor Executivo**             | Destacar procedimentos de trabalho mais relevantes.                        | Assegurar que os recursos da equipe sejam focados nas áreas de maior impacto estratégico. |
| **Diretor Executivo**             | Visualizar as alterações recentes nos flows de trabalho.                 | Tomar decisões estratégicas com base nas mudanças mais significativas. |
| **Funcionário Operacional**      | Acessar flows de trabalho em uma interface simples e intuitiva.          | Realizar tarefas de maneira rápida e sem gerar retrabalhos.        |
| **Funcionário Operacional**      | Receber notificações sobre alterações nos procedimentos de trabalho.     | Ficar atualizado sobre mudanças importantes para seguir corretamente os processos. |
| **Gestor/Administrador**         | Centralizar o acesso a todos os procedimentos de trabalho em um repositório unificado. | Facilitar a consulta, padronizar a execução dos processos e identificar rapidamente pontos de melhoria. |
| **Gestor/Administrador**         | Notificar usuários sobre alterações nos flows de trabalho.               | Garantir que todos os usuários estejam atualizados e alinhados com as mudanças importantes. |
| **TI e Suporte Técnico**         | Acessar configurações avançadas da aplicação.                             | Realizar ajustes internos e garantir que a aplicação esteja otimizada conforme as necessidades da instituição. |
| **TI e Suporte Técnico**         | Controlar o acesso de usuários à aplicação.                               | Garantir que cada colaborador tenha as permissões adequadas.       |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID    | Descrição do Requisito                                                                 | Prioridade |
|-------|-----------------------------------------------------------------------------------------|------------|
| RF01  | Exibir tela inicial com atualizações recentes, procedimentos favoritos e quadro Kanban de tarefas. | Alta       |
| RF02  | Exibir menu superior com acesso às principais funcionalidades do sistema.              | Alta       |
| RF03  | Exibir menu lateral com links para todas as seções da aplicação.                       | Alta       |
| RF04  | Permitir que o usuário oculte ou exiba o menu lateral em todas as páginas do sistema.  | Média      |
| RF05  | Exibir quadro Kanban com tarefas do usuário na tela inicial.                           | Alta       |
| RF06  | Permitir criação de novas tarefas.                                                     | Alta       |
| RF07  | Permitir definição de título, descrição, etiquetas, data de vencimento e status.       | Alta       |
| RF08  | Permitir atualização do status da tarefa entre "a fazer", "fazendo" e "concluído".     | Alta       |
| RF09  | Permitir edição de tarefas existentes.                                                 | Alta       |
| RF10  | Permitir exclusão de tarefas.                                                          | Alta       |
| RF11  | Permitir pesquisa de tarefas por palavras-chave.                                       | Média      |
| RF12  | Permitir filtragem de tarefas por etiquetas, status e data de vencimento.              | Média      |
| RF13  | Exibir tarefas do dia e dos próximos sete dias no menu lateral.                        | Média      |
| RF14  | Exibir painel de atualizações com lista cronológica.                                   | Alta       |
| RF15  | Permitir criação de novas atualizações.                                                | Alta       |
| RF16  | Permitir definição de título, descrição, etiquetas e status das atualizações.          | Alta       |
| RF17  | Permitir edição de atualizações existentes.                                            | Alta       |
| RF18  | Permitir exclusão de atualizações.                                                     | Alta       |
| RF19  | Permitir arquivamento de atualizações.                                                 | Média      |
| RF20  | Permitir desarquivamento de atualizações.                                              | Média      |
| RF21  | Permitir marcação de atualizações como favoritas.                                      | Média      |
| RF22  | Permitir pesquisa de atualizações por palavras-chave.                                  | Média      |
| RF23  | Permitir filtragem de atualizações por favoritos, status, etiquetas e data de criação. | Média      |
| RF24  | Exibir atualizações recentes na tela inicial.                                          | Alta       |
| RF25  | Exibir painel de controle com lista de procedimentos.                                  | Alta       |
| RF26  | Permitir criação de novos procedimentos.                                               | Alta       |
| RF27  | Permitir definição de título, tipo, descrição, etiquetas, status e anexo dos procedimentos. | Alta   |
| RF28  | Permitir visualização de procedimentos.                                                | Alta       |
| RF29  | Permitir edição de procedimentos.                                                      | Alta       |
| RF30  | Permitir exclusão de procedimentos.                                                    | Alta       |
| RF31  | Permitir cópia de procedimentos.                                                       | Média      |
| RF32  | Permitir arquivamento de procedimentos.                                                | Média      |
| RF33  | Permitir desarquivamento de procedimentos.                                             | Média      |
| RF34  | Permitir marcação de procedimentos como favoritos.                                     | Média      |
| RF35  | Permitir pesquisa de procedimentos por palavras-chave.                                 | Média      |
| RF36  | Permitir filtragem de procedimentos por tipo, status, etiquetas, data e favoritos.     | Média      |
| RF37  | Exibir histórico de versões dos procedimentos.                                         | Média      |
| RF38  | Exibir procedimentos favoritos do usuário na tela inicial.                             | Média      |
| RF39  | Permitir login de usuário por e-mail e senha.                                          | Alta       |
| RF40  | Permitir recuperação de senha por e-mail e redefinição com token de segurança.         | Alta       |
| RF41  | Permitir a inserção, sugestão e gerenciamento visual de etiquetas (tags) em campos de formulário. | Média |
| RF42  | Permitir criação de filtros personalizados com chips interativos e popovers arrastáveis. | Média   |
| RF43  | Gerenciar abertura, fechamento, título e conteúdo de janelas modais reutilizáveis em todo o sistema. | Média |

### Requisitos Não Funcionais

| ID       | Descrição do Requisito                                                                    | Prioridade |
|----------|--------------------------------------------------------------------------------------------|------------|
| RNF-001  | Garantir responsividade da aplicação em desktop, tablet e mobile.                          | Alta       |
| RNF-002  | Processar ações do usuário em no máximo 3 segundos para boa experiência.                   | Alta       |
| RNF-003  | Proteger dados locais, implementando controle de acesso na interface.                      | Alta       |
| RNF-004  | Garantir compatibilidade com os principais navegadores modernos.                           | Alta       |
| RNF-005  | Seguir princípios de usabilidade e acessibilidade conforme WCAG.                           | Média      |
| RNF-006  | Carregar componentes HTML de forma assíncrona e paralela para melhor desempenho.           | Média      |
| RNF-007  | Ativar scripts específicos conforme a rota sem conflitos.                                   | Média      |
| RNF-008  | Aplicar cores consistentes para tags para melhor identificação visual.                     | Baixa      |
| RNF-009  | Garantir comportamento uniforme e consistente dos modais em toda a aplicação.              | Baixa      |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| **ID** | **Restrição**                                                                                      |
|--------|----------------------------------------------------------------------------------------------------|
| **01** | O projeto deverá ser entregue até o final do semestre.                                              |
| **02** | Não poderá ser desenvolvido um módulo de backend.                                                  |
| **03** | Não é permitido o uso de frameworks.                                                               |
