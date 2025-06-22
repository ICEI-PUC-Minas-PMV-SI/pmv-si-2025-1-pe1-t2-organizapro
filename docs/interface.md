# Projeto de Interface

O projeto de interface tem como objetivo estruturar visualmente a interação entre o usuário e a aplicação, garantindo uma navegação clara, acessível e alinhada aos objetivos do sistema. Ele abrange a definição do fluxo de navegação do usuário (user flow) e a elaboração dos wireframes das principais telas, que representam a organização dos elementos visuais e funcionais da plataforma.

A construção das interfaces foi guiada pelos requisitos funcionais e não funcionais, além das histórias de usuário descritas na Documentação de Especificação. Os wireframes apresentados a seguir demonstram como as funcionalidades foram distribuídas nas telas, priorizando a usabilidade, a coerência visual e a eficiência na execução das tarefas pelos usuários.

## User Flow
| ![User Flow](https://github.com/user-attachments/assets/aec45b5a-79a1-47ea-ab33-e1c9691b2e3e) |
|:--------------------------------------------------------------------------------------------:|
| **Figura 1: Fluxo do Usuário (User Flow)**                                                  |

## Wireframes

São protótipos usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante do layout de elementos fundamentais na interface e é fundamental sempre relacionar cada wireframe com o(s) requisito(s) que ele atende.

### Tela de Login
|![Tela de Login](https://github.com/user-attachments/assets/1b420f07-0a95-412d-9b2e-9015f8f31a6d)|
|:--------------------------------------------------------------------------------------------:|
| **Figura 2: Tela de Login**                                                  |

| **Componente**               | **Requisitos Atendidos**                                                                 |
|------------------------------|------------------------------------------------------------------------------------------|
| **Tela de Login**              | RF39:	Permitir login de usuário por e-mail e senha.<br> RF40:	Permitir recuperação de senha por e-mail e redefinição com token de segurança.|

### Tela Inicial
|![Página Inicial](https://github.com/user-attachments/assets/560e2ed4-dd66-4cdc-a7e4-73afc4b2f191)|
|:--------------------------------------------------------------------------------------------:|
| **Figura 3: Tela Inicial**                                                  |

| **Componente**               | **Requisitos Atendidos**                                                                 |
|------------------------------|------------------------------------------------------------------------------------------|
| **Tela inicial**              | RF01: Exibir tela inicial com atualizações recentes, procedimentos favoritos e quadro Kanban de tarefas.<br>RF24: Exibir atualizações recentes na tela inicial.<br>RF38: Exibir procedimentos favoritos do usuário na tela inicial.
| **Menu Superior** | RF02: Exibir menu superior com acesso às principais funcionalidades do sistema.|
| **Menu Lateral**              | RF03: Exibir menu lateral com links para todas as seções da aplicação.<br>RF04: Permitir que o usuário oculte ou exiba o menu lateral em todas as páginas do sistema.<br>RF13: Exibir tarefas do dia e dos próximos sete dias no menu lateral.<br>RF43: Gerenciar abertura, fechamento, título e conteúdo de janelas modais reutilizáveis em todo o sistema.<br>RNF-008: Aplicar cores consistentes para tags para melhor identificação visual.
| **Quadro de Tarefas** | RF05: Exibir quadro Kanban com tarefas do usuário na tela inicial.<br>RF06: Permitir criação de novas tarefas.<br>RF07: Permitir definição de título, descrição, etiquetas, data de vencimento e status.<br>RF08: Permitir atualização do status da tarefa entre "a fazer", "fazendo" e "concluído".<br>RF09: Permitir edição de tarefas existentes.<br>RF10: Permitir exclusão de tarefas.<br><br>RF11: Permitir pesquisa de tarefas por palavras-chave.<br>RF12:	Permitir filtragem de tarefas por etiquetas, status e data de vencimento.<br>RF41: Permitir a inserção, sugestão e gerenciamento visual de etiquetas (tags) em campos de formulário.<br>RF42: Permitir criação de filtros personalizados com chips interativos e popovers arrastáveis.<br>RF43: Gerenciar abertura, fechamento, título e conteúdo de janelas modais reutilizáveis em todo o sistema.<br>RNF-008: Aplicar cores consistentes para tags para melhor identificação visual. |

### Painel de Atualizações
| ![Painel de Atualizações](https://github.com/user-attachments/assets/913f393a-14b2-46ff-999e-b723b663dfc7) |
|:--------------------------------------------------------------------------------------------:|
| **Figura 4: Painel de Atualizações Recentes**                                                  |

| **Componente**               | **Requisitos Atendidos**                                                                 |
|------------------------------|------------------------------------------------------------------------------------------|
| **Painel de Atualizações**    | RF14:	Exibir painel de atualizações com lista cronológica.<br>RF15:	Permitir criação de novas atualizações.<br>RF16	Permitir definição de título, descrição, etiquetas e status das atualizações.<br>RF22	Permitir pesquisa de atualizações por palavras-chave.<br>RF23	Permitir filtragem de atualizações por favoritos, status, etiquetas e data de criação. |
| **Lista de Atualizações** | RF17	Permitir edição de atualizações existentes.<br>RF18	Permitir exclusão de atualizações.<br>RF19	Permitir arquivamento de atualizações.<br>RF20	Permitir desarquivamento de atualizações.<br>RF21	Permitir marcação de atualizações como favoritas. |

### Painel de Controle
| ![IPTs e Orientações](https://github.com/user-attachments/assets/c1a4a1ce-0634-4784-83ee-d6230d7fab69)|
|:--------------------------------------------------------------------------------------------:|
| **Figura 5: Painel de Controle**                                                   |

| **Componente**               | **Requisitos Atendidos**                                                                 |
|------------------------------|------------------------------------------------------------------------------------------|
| **Painel de Controle** | RF25:	Exibir painel de controle com lista de procedimentos.<br>RF26:	Permitir criação de novos procedimentos.<br>RF27:	Permitir definição de título, tipo, descrição, etiquetas, status e anexo dos procedimentos.<br>RF35:	Permitir pesquisa de procedimentos por palavras-chave.<br>RF36:	Permitir filtragem de procedimentos por tipo, status, etiquetas, data e favoritos.	 |
| **Lista de procedimentos** | RF28	Permitir visualização de procedimentos.<br>	RF29:	Permitir edição de procedimentos.<br>RF30:	Permitir exclusão de procedimentos.<br>RF31:	Permitir cópia de procedimentos.<br>RF32:	Permitir arquivamento de procedimentos.	<br>RF33:	Permitir desarquivamento de procedimentos.<br>RF34:	Permitir marcação de procedimentos como favoritos.|

