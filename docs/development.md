# Programação de Funcionalidades

Nesta seção, são apresentados os **requisitos funcionais** e **não-funcionais** atendidos durante a implementação do sistema. Cada requisito é relacionado aos artefatos gerados, como código fonte ou páginas desenvolvidas, além das estruturas de dados utilizadas.  O sistema pode ser acessado e testado através do **GitHub Pages**. 

> GitHub Pages https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t2-organizapro/

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

| ID   | Descrição do Requisito                                                                 | Responsável           | Artefato Gerado                                                       |
|------|-----------------------------------------------------------------------------------------|-----------------------|----------------------------------------------------------------------|
| RF01 | Exibir tela inicial com atualizações recentes, procedimentos favoritos e quadro Kanban de tarefas. | Carlos Samuel<br>Nicole<br>Laise | index.html<br>main.js                                                           |
| RF02 | Exibir menu superior com acesso às principais funcionalidades do sistema.              | Carlos Samuel<br>Nicole | header.html                                                          |
| RF03 | Exibir menu lateral com links para todas as seções da aplicação.                       | Carlos Samuel<br>Nicole | sidebar.html                                                         |
| RF04 | Permitir que o usuário oculte ou exiba o menu lateral em todas as páginas do sistema.  | Laise                 | sidebar-menu.js                                                      |
| RF05 | Exibir quadro Kanban com tarefas do usuário na tela inicial.                           | Laise                 | tasks-widget.html<br>tasks.js                                        |
| RF06 | Permitir criação de novas tarefas.                                                     | Laise                 | modal-task-form.html<br>task-modal.js<br>task-data.js                |
| RF07 | Permitir definição de título, descrição, etiquetas, data de vencimento e status.       | Laise                 | modal-task-form.html<br>task-data.js                                 |
| RF08 | Permitir atualização do status da tarefa entre "a fazer", "fazendo" e "concluído".    | Laise                 | tasks.js<br>tasks-data.js                                            |
| RF09 | Permitir edição de tarefas existentes.                                                 | Laise                 | modal-task-form.html<br>tasks-data.js                                |
| RF10 | Permitir exclusão de tarefas.                                                          | Laise                 | tasks-data.js                                                       |
| RF11 | Permitir pesquisa de tarefas por palavras-chave.                                       | Laise                 | tasks-filters.js                                                    |
| RF12 | Permitir filtragem de tarefas por etiquetas, status e data de vencimento.              | Laise                 | tasks-filters.js                                                    |
| RF13 | Exibir tarefas do dia e dos próximos sete dias no menu lateral.                        | Laise                 | modal-task-sidebar.html<br>task-sidebar-modals.js<br>task-data.js    |
| RF14 | Exibir painel de atualizações com lista cronológica.                                  | Laise<br>Nicole       | upd-panel.html<br>upd-panel.js<br>upd-renderer.js                   |
| RF15 | Permitir criação de novas atualizações.                                               | Laise                 | modal-upd-form-update.html<br>upd-form.js<br>upd-data.js            |
| RF16 | Permitir definição de título, descrição, etiquetas e status das atualizações.         | Laise                 | modal-upd-form-update.html<br>upd-form.js<br>upd-data.js            |
| RF17 | Permitir edição de atualizações existentes.                                           | Laise                 | modal-form-update.html<br>upd-form.js<br>upd-modal.js<br>upd-data.js|
| RF18 | Permitir exclusão de atualizações.                                                    | Laise                 | upd-events.js<br>upd-data.js                                         |
| RF19 | Permitir arquivamento de atualizações.                                                | Laise                 | upd-events.js<br>upd-data.js                                         |
| RF20 | Permitir desarquivamento de atualizações.                                            | Laise                 | upd-events.js<br>upd-data.js                                         |
| RF21 | Permitir marcação de atualizações como favoritas.                                    | Laise                 | upd-events.js<br>upd-data.js                                         |
| RF22 | Permitir pesquisa de atualizações por palavras-chave.                                | Laise                 | upd-filters.js                                                     |
| RF23 | Permitir filtragem de atualizações por favoritos, status, etiquetas e data de criação.| Laise                 | upd-filters.js                                                     |
| RF24 | Exibir atualizações recentes na tela inicial.                                        | Laise<br>Nicole       | recent-updates-widget.html<br>upd-renderer.js                       |
| RF25 | Exibir painel de controle com lista de procedimentos.                               | Laise                 | control-panel.html<br>procedure-table.js                            |
| RF26 | Permitir criação de novos procedimentos.                                            | Laise                 | modal-form-procedure.html<br>procedure-form.js<br>procedure-data.js|
| RF27 | Permitir definição de título, tipo, descrição, etiquetas, status e anexo dos procedimentos. | Laise              | procedure-form.js<br>procedure-data.js                              |
| RF28 | Permitir visualização de procedimentos.                                             | Laise                 | modal-view-procedure.html<br>procedure-view-modal.js               |
| RF29 | Permitir edição de procedimentos.                                                   | Laise                 | modal-form-procedure.html<br>procedure-form.js<br>procedure-data.js|
| RF30 | Permitir exclusão de procedimentos.                                                 | Laise                 | procedure-table.js<br>procedimentos-data.js                        |
| RF31 | Permitir cópia de procedimentos.                                                    | Laise                 | modal-form-procedure.html<br>procedure-data.js                     |
| RF32 | Permitir arquivamento de procedimentos.                                             | Laise                 | procedure-table.js<br>procedure-data.js                            |
| RF33 | Permitir desarquivamento de procedimentos.                                          | Laise                 | procedure-table.js<br>procedure-data.js                            |
| RF34 | Permitir marcação de procedimentos como favoritos.                                | Laise                 | procedure-table.js<br>procedure-data.js                            |
| RF35 | Permitir pesquisa de procedimentos por palavras-chave.                            | Laise                 | procedure-filters.js                                               |
| RF36 | Permitir filtragem de procedimentos por tipo, status, etiquetas, data e favoritos.| Laise                 | procedure-filters.js                                               |
| RF37 | Exibir histórico de versões dos procedimentos.                                     | Laise                 | modal-version-procedure.html<br>procedure-version-modal.js<br>procedure-data.js|
| RF38 | Exibir procedimentos favoritos do usuário na tela inicial.                         | Laise                 | favorites-widget.html<br>favorites-widget.js<br>procedure-data.js  |
| RF39 | Permitir login de usuário por e-mail e senha.                                       | Laise                 | login.html<br>login.js<br>form-login.js                            |
| RF40 | Permitir recuperação de senha por e-mail e redefinição com token de segurança.      | Laise                 | modal-forgot-password.html<br>forgot-password.js                   |
| RF41 | Permitir a inserção, sugestão e gerenciamento visual de etiquetas (tags) em campos de formulário.| Laise            | tag-input-component.js                                            |
| RF42 | Permitir criação de filtros personalizados com chips interativos e popovers arrastáveis.| Laise             | filter-controls.js                                                |
| RF43 | Gerenciar abertura, fechamento, título e conteúdo de janelas modais reutilizáveis em todo o sistema.| Laise            | modal-controller.js                                               |

### Requisitos Não Funcionais

| ID       | Descrição do Requisito                                                                    | Responsável         | Artefato Gerado                              |
|----------|------------------------------------------------------------------------------------------|---------------------|----------------------------------------------|
| RNF-001  | Garantir responsividade da aplicação em desktop, tablet e mobile.                        | Laise  | Todos os arquivos HTML, CSS e JS             |
| RNF-002  | Processar ações do usuário em no máximo 3 segundos para boa experiência.                 | Laise  | init-includes.js<br>include-loader.js |
| RNF-003  | Proteger dados locais, implementando controle de acesso na interface.                    | Laise  | login.js<br> form-login.js<br>forgot-password.js  |
| RNF-004  | Garantir compatibilidade com os principais navegadores modernos.                        | Laise  | Todos os arquivos front-end                    |
| RNF-005  | Seguir princípios de usabilidade e acessibilidade conforme WCAG.                        | Laise  | filter-controls.js<br>tag-input-component.js<br> modal-controller.js |
| RNF-006  | Carregar componentes HTML de forma assíncrona e paralela para melhor desempenho.        | Laise  | init-includes.js                          |
| RNF-007  | Ativar scripts específicos conforme a rota sem conflitos.                              | Laise  | route-initializers.js                     |
| RNF-008  | Aplicar cores consistentes para tags para melhor identificação visual.                  | Laise  | color-helpers.js                         |
| RNF-009  | Garantir comportamento uniforme e consistente dos modais em toda a aplicação.          | Laise  | modal-controller.js                      |

## Descrição das estruturas:

## Procedimentos

| **Nome do Campo**     | **Tipo**              | **Descrição**                                              | **Exemplo**                         |
|-------------------|-------------------|--------------------------------------------------------|--------------------------------|
| id                | Texto (string)    | Identificador único gerado aleatoriamente              | "_5g7k1abcd"                   |
| titulo            | Texto (string)    | Título do procedimento                                 | "Revisão de contrato"          |
| descricao         | Texto (string)    | Descrição detalhada do procedimento                     | "Analisar cláusulas..."        |
| tipo              | Texto (string)    | Tipo ou categoria do procedimento                       | "Juridico"                    |
| etiquetas         | Array de texto    | Lista de etiquetas (tags) associadas                    | ["Urgente", "Cliente X"]       |
| status            | Texto (string)    | Status atual do procedimento ("Ativo", "Inativo", etc.)| "Ativo"                       |
| favorito          | Booleano          | Indica se o procedimento está marcado como favorito    | true                          |
| inativo           | Booleano          | Indica se o procedimento está arquivado/inativo        | false                         |
| ultimaAtualizacao  | Data (string ISO) | Data da última atualização do procedimento              | "2025-06-22"                  |
| dataCriacao       | Data (string ISO) | Data de criação do procedimento (usada na versão nova) | "2025-06-10"                  |
| versao            | Número (inteiro)  | Número da versão do procedimento                         | 1                             |
| idPai             | Texto (string)    | ID do procedimento pai para versões                      | "_abc123xyz"                  |
| versoesFilhas     | Array de texto    | IDs das versões filhas associadas                        | ["_def456uvw", "_ghi789rst"]  |

## Tarefas

| Nome do Campo    | Tipo           | Descrição                                                    | Exemplo                         |
|------------------|----------------|--------------------------------------------------------------|--------------------------------|
| id               | Texto (string) | Identificador único da tarefa                                 | "k5jd93ks"                     |
| titulo           | Texto (string) | Título da tarefa                                             | "Enviar relatório mensal"      |
| descricao        | Texto (string) | Descrição detalhada da tarefa                                | "Enviar relatório para o gerente até o dia 10" |
| tags             | Array de texto | Lista de etiquetas associadas à tarefa                       | ["urgente", "financeiro"]      |
| dataVencimento   | Texto (string) | Data de vencimento no formato ISO 8601                       | "2025-06-25 00:00:00"    |
| status           | Texto (string) | Status da tarefa (ex.: "a-fazer", "concluido")               | "a-fazer"                     |
| concluida        | Booleano       | Indica se a tarefa está concluída                             | false                         |
| criadaEm         | Texto (string) | Data/hora de criação da tarefa (ISO 8601)                    | "2025-06-20 15:30:00"    |

## Atualizações 

| Nome do Campo       | Tipo             | Descrição                                               | Exemplo                         |
|---------------------|------------------|---------------------------------------------------------|--------------------------------|
| id                  | Texto (string)   | Identificador único da atualização (gerado aleatoriamente) | "_7h9k3abcd"                   |
| titulo              | Texto (string)   | Título da atualização                                   | "Atualização do sistema"       |
| descricao           | Texto (string)   | Descrição detalhada da atualização                      | "Correção de bugs e melhorias" |
| etiquetas           | Array de texto   | Lista de etiquetas (tags) associadas                    | ["Bugfix", "Urgente"]          |
| status              | Texto (string)   | Status atual da atualização ("Ativo" ou "Inativo")     | "Ativo"                       |
| favorito            | Booleano         | Indica se a atualização está marcada como favorita     | false                         |
| inativo             | Booleano         | Indica se a atualização está arquivada/inativa         | false                         |
| data_criacao        | Texto (string)   | Data e hora da criação no formato ISO 8601              | "2025-06-22 15:30:00"   |
| ultima_atualizacao   | Texto (string)   | Data e hora da última atualização no formato ISO 8601   | "2025-06-23 10:00:00"   |
