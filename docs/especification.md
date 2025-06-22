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

#### Módulo: Gerenciamento de Usuários
| ID   | Descrição do Requisito                                                | Prioridade     |
|------|----------------------------------------------------------------------|----------------|
| RF01 | Permitir o login de usuários com e-mail e senha.            | Alta           |
| RF02 | Permitir a recuperação de senha via e-mail.                          | Alta           |
| RF03 | Permitir o cadastro de novos usuários.                               | Alta           |
| RF04 | Permitir a edição dos dados cadastrais dos usuários.                 | Alta           |
| RF05 | Permitir a exclusão de usuários.                                     | Alta           |

#### Módulo: Interface e Navegação
| ID   | Descrição do Requisito                                                | Prioridade     |
|------|----------------------------------------------------------------------|----------------|
| RF06 | Exibir menu superior com acesso às principais funcionalidades.        | Alta           |
| RF07 | Exibir menu lateral com links para todas as seções disponíveis.      | Alta           |
| RF08 | Exibir as últimas atualizações de arquivos na tela inicial.          | Média          |
| RF09 | Permitir acesso aos arquivos favoritos do usuário na tela inicial.  | Média          |
| RF10 | Exibir painel de acesso a arquivos agrupados por categorias.         | Alta           |

#### Módulo: Tarefas
| ID   | Descrição do Requisito                                                | Prioridade     |
|------|----------------------------------------------------------------------|----------------|
| RF11 | Exibir quadro Kanban com tarefas atribuídas ao usuário.              | Alta           |
| RF12 | Permitir que o gestor atribua tarefas a usuários.                     | Alta           |
| RF13 | Permitir definir descrição, prazo e status das tarefas.              | Alta           |
| RF14 | Permitir atualizar o status da tarefa (pendente, em andamento, concluída). | Alta           |
| RF15 | Permitir que o usuário crie tarefas pessoais.                        | Média          |
| RF16 | Permitir que o usuário edite suas tarefas pessoais.                  | Média          |
| RF17 | Permitir que o usuário exclua suas tarefas pessoais.                 | Baixa          |

#### Módulo: Atualizações e Notificações
| ID   | Descrição do Requisito                                                | Prioridade     |
|------|----------------------------------------------------------------------|----------------|
| RF18 | Exibir painel com detalhes das atualizações de arquivos.             | Alta           |
| RF19 | Enviar notificações por e-mail sobre novas tarefas atribuídas.       | Alta           |
| RF20 | Enviar notificações por e-mail sobre atualizações nos arquivos.      | Média          |
| RF21 | Exibir notificações na tela inicial sobre tarefas e atualizações nos arquivos. | Alta           |

#### Módulo: Pesquisa e Versionamento
| ID   | Descrição do Requisito                                                | Prioridade     |
|------|----------------------------------------------------------------------|----------------|
| RF22 | Permitir pesquisa de arquivos por palavras-chave, etiquetas, data, tipo de arquivo e categoria. | Alta           |
| RF23 | Manter histórico de alterações nos arquivos com controle de versão.  | Alta           |
| RF24 | Exibir o histórico de versões em painel cronológico.                 | Média          |
| RF25 | Permitir restaurar versões anteriores de arquivos.                   | Média          |

#### Módulo: Controle de Arquivos
| ID   | Descrição do Requisito                                                | Prioridade     |
|------|----------------------------------------------------------------------|----------------|
| RF26 | Permitir o armazenamento de arquivos.                                | Alta           |
| RF27 | Permitir a organização de arquivos por etiquetas e categorias.       | Média          |
| RF28 | Permitir que o usuário visualize arquivos.                           | Alta           |
| RF29 | Permitir que o usuário edite arquivos.                               | Alta           |
| RF30 | Permitir que o usuário marque arquivos como favoritos.               | Média          |
| RF31 | Permitir que o usuário duplique arquivos.                            | Baixa          |
| RF32 | Permitir que o usuário gere arquivos em formato PDF.                 | Baixa          |
| RF33 | Permitir que o usuário arquive documentos.                           | Baixa          |

#### Módulo: Gerenciamento de Usuários
| ID   | Descrição do Requisito                                                | Prioridade     |
|------|----------------------------------------------------------------------|----------------|
| RF01 | Permitir o login de usuários com nome de usuário e senha.            | Alta           |
| RF02 | Permitir a recuperação de senha via e-mail.                          | Alta           |
| RF03 | Permitir o cadastro de novos usuários.                               | Alta           |
| RF04 | Permitir a edição dos dados cadastrais dos usuários.                 | Alta           |
| RF05 | Permitir a exclusão de usuários.                                     | Alta           |

### Requisitos não Funcionais

| **ID**    | **Descrição do Requisito**                                                                 | **Prioridade** |
|-----------|--------------------------------------------------------------------------------------------|----------------|
| **RNF-001** | A aplicação deve ser responsiva, garantindo usabilidade em diferentes dispositivos (desktop, tablet e mobile). |   ALTA         |
| **RNF-002** | A aplicação deve processar requisições do usuário em no máximo 3 segundos.                |   ALTA         |
| **RNF-003** | A aplicação deve assegurar a proteção dos dados, implementando mecanismos de controle de acessos. |   ALTA         |
| **RNF-004** | A aplicação deve ser compatível com os principais navegadores.                            |   ALTA         |
| **RNF-005** | A aplicação deve armazenar logs detalhados de alterações para auditoria e rastreabilidade. |   MÉDIA        |
| **RNF-006** | A interface da aplicação deve seguir princípios de usabilidade e acessibilidade, conforme as Diretrizes de Acessibilidade para Conteúdo Web (WCAG). |   MÉDIA        |
| **RNF-007** | A aplicação deve permitir escalabilidade para suportar múltiplos usuários simultaneamente sem perda de desempenho. |  BAIXA        |
| **RNF-008** | A aplicação deve ter alta disponibilidade, garantindo tempo de inatividade mínimo.        |   BAIXA        |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| **ID** | **Restrição**                                                                                      |
|--------|----------------------------------------------------------------------------------------------------|
| **01** | O projeto deverá ser entregue até o final do semestre.                                              |
| **02** | Não poderá ser desenvolvido um módulo de backend.                                                  |
| **03** | Não é permitido o uso de frameworks.                                                               |
