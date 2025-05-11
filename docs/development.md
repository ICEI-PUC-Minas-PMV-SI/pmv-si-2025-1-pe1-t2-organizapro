# Programação de Funcionalidades

Nesta seção, são apresentados os **requisitos funcionais** e **não-funcionais** atendidos durante a implementação do sistema. Cada requisito é relacionado aos artefatos gerados, como código fonte ou páginas desenvolvidas, além das estruturas de dados utilizadas.  O sistema pode ser acessado e testado através do **GitHub Pages**. 

> GitHub Pages https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t2-organizapro/

# Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

## Requisitos Funcionais

### Módulo: Interface e Navegação
| ID   | Descrição do Requisito                                                | Responsável     | Artefato Gerado   |
|------|----------------------------------------------------------------------|-----------------|-------------------|
| RF06 | Exibir menu superior com acesso às principais funcionalidades.        | Carlos Samuel<br>Nicole      | inc-header.html   |
| RF07 | Exibir menu lateral com links para todas as seções disponíveis.      | Carlos Samuel<br>Nicole       | inc-sidebar.html  |
| RF08 | Exibir as últimas atualizações de arquivos na tela inicial.          | Carlos Samuel<br>Nicole<br>Laise   | inc-recent-upd.html |
| RF09 | Permitir acesso aos arquivos favoritos do usuário na tela inicial.  | Carlos Samuel<br>Nicole      | inc-favorites.html |
| RF10 | Exibir painel de acesso a arquivos agrupados por categorias.         | Carlos Samuel<br>Nicole       | pg-processes.html |

### Módulo: Tarefas
| ID   | Descrição do Requisito                                                | Responsável     | Artefato Gerado   |
|------|----------------------------------------------------------------------|-----------------|-------------------|
| RF11 | Exibir quadro Kanban com tarefas atribuídas ao usuário.              | Carlos Samuel<br>Nicole<br>Laise   | inc-tasks.html    |
| RF12 | Permitir que o gestor atribua tarefas a usuários.                     | Carlos Samuel<br>Nicole<br>Laise      | inc-tasks.html    |
| RF13 | Permitir definir descrição, prazo e status das tarefas.              | Carlos Samuel<br>Nicole<br>Laise       | inc-tasks.html    |
| RF14 | Permitir atualizar o status da tarefa (pendente, em andamento, concluída). | Carlos Samuel<br>Nicole<br>Laise   | inc-tasks.html    |
| RF15 | Permitir que o usuário crie tarefas pessoais.                        | Carlos Samuel<br>Nicole<br>Laise      | inc-tasks.html    |
| RF16 | Permitir que o usuário edite suas tarefas pessoais.                  | Carlos Samuel<br>Nicole<br>Laise       | inc-tasks.html    |
| RF17 | Permitir que o usuário exclua suas tarefas pessoais.                 | Carlos Samuel<br>Nicole<br>Laise   | inc-tasks.html    |

### Módulo: Atualizações e Notificações
| ID   | Descrição do Requisito                                                | Responsável     | Artefato Gerado   |
|------|----------------------------------------------------------------------|-----------------|-------------------|
| RF18 | Exibir painel com detalhes das atualizações de arquivos.             | Nicole      | pg-updates.html   |
| RF19 | Enviar notificações por e-mail sobre novas tarefas atribuídas.       | Carlos Samuel<br>Nicole      | index.html        |
| RF20 | Enviar notificações por e-mail sobre atualizações nos arquivos.      |Carlos Samuel<br>Nicole   | index.html        |
| RF21 | Exibir notificações na tela inicial sobre tarefas e atualizações nos arquivos. | Carlos Samuel<br>Nicole      | index.html        |

### Módulo: Pesquisa e Versionamento
| ID   | Descrição do Requisito                                                | Responsável     | Artefato Gerado   |
|------|----------------------------------------------------------------------|-----------------|-------------------|
| RF22 | Permitir pesquisa de arquivos por palavras-chave, etiquetas, data, tipo de arquivo e categoria. | Laise | pg-flow.html<br>pg-work-guides.html |
| RF23 | Manter histórico de alterações nos arquivos com controle de versão.  | Laise      | pg-flows.html<br>pg-work-guides.html |
| RF24 | Exibir o histórico de versões em painel cronológico.                 | Laise   | pg-flows.html<br>pg-work-guides.html |
| RF25 | Permitir restaurar versões anteriores de arquivos.                   | Laise       | pg-flows.html<br>pg-work-guides.html |

### Módulo: Controle de Arquivos
| ID   | Descrição do Requisito                                                | Responsável     | Artefato Gerado   |
|------|----------------------------------------------------------------------|-----------------|-------------------|
| RF26 | Permitir o armazenamento de arquivos.                                | Laise      | pg-flows.html<br>pg-work-guides.html |
| RF27 | Permitir a organização de arquivos por etiquetas e categorias.       | Laise       | pg-flows.html<br>pg-work-guides.html |
| RF28 | Permitir que o usuário visualize arquivos.                           | Laise   | pg-flows.html<br>pg-work-guides.html |
| RF29 | Permitir que o usuário edite arquivos.                               | Laise      | pg-flows.html<br>pg-work-guides.html |
| RF30 | Permitir que o usuário marque arquivos como favoritos.               | Laise       | pg-flows.html<br>pg-work-guides.html |
| RF31 | Permitir que o usuário duplique arquivos.                            | Laise   | pg-flows.html<br>pg-work-guides.html |
| RF32 | Permitir que o usuário gere arquivos em formato PDF.                 | Laise      | pg-flows.html<br>pg-work-guides.html |
| RF33 | Permitir que o usuário arquive documentos.                           | Laise       | pg-flows.html<br>pg-work-guides.html |

## Descrição das estruturas:

## Notícia
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id             | Numero (Inteiro)  | Identificador único da notícia            | 1                                              |
| Título         | Texto             | Título da notícia                         | Sistemas de Informação PUC Minas é o melhor                                   |
| Conteúdo       | Texto             | Conteúdo da notícia                       | Sistemas de Informação da PUC Minas é eleito o melhor curso do Brasil                            |
| Id do usuário  | Numero (Inteiro)  | Identificador do usuário autor da notícia | 1                                              |

