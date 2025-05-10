# Projeto de Interface

O projeto de interface tem como objetivo estruturar visualmente a interação entre o usuário e a aplicação, garantindo uma navegação clara, acessível e alinhada aos objetivos do sistema. Ele abrange a definição do fluxo de navegação do usuário (user flow) e a elaboração dos wireframes das principais telas, que representam a organização dos elementos visuais e funcionais da plataforma.

A construção das interfaces foi guiada pelos requisitos funcionais e não funcionais, além das histórias de usuário descritas na Documentação de Especificação. Os wireframes apresentados a seguir demonstram como as funcionalidades foram distribuídas nas telas, priorizando a usabilidade, a coerência visual e a eficiência na execução das tarefas pelos usuários.

## User Flow
| ![User Flow](https://github.com/user-attachments/assets/aec45b5a-79a1-47ea-ab33-e1c9691b2e3e) |
|:--------------------------------------------------------------------------------------------:|
| **Figura 1: Fluxo do Usuário (User Flow)**                                                  |

## Wireframes

São protótipos usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante do layout de elementos fundamentais na interface e é fundamental sempre relacionar cada wireframe com o(s) requisito(s) que ele atende.

### Página Inicial (Home)
|![Página Inicial](https://github.com/user-attachments/assets/560e2ed4-dd66-4cdc-a7e4-73afc4b2f191)|
|:--------------------------------------------------------------------------------------------:|
| **Figura 2: Página Inicial**                                                  |

| **Componente**               | **Requisitos Atendidos**                                                                 |
|------------------------------|------------------------------------------------------------------------------------------|
| **Menu Lateral**              | RF-002: Controle de acesso baseado em perfis de usuário<br>RF-003: Criação de perfis de usuários com permissões específicas<br>RF-004: Restrição de acesso a funcionalidades com base no perfil<br>RNF-003: Segurança de dados com controle de acessos |
| **Barra de Navegação Superior** | RF-017: Painel de alterações recentes<br>RF-016: Histórico de alterações<br>RF-018: Envio de notificações de atualizações por e-mail<br>RF-019: Envio de notificações de criação de novos procedimentos |
| **Área Central** | RF-014: Organização de procedimentos de trabalho<br>RF-015: Pesquisa e filtragem de procedimentos por tags/categorias<br>RF-017: Exibição do painel de alterações recentes |
| **Painel de Alterações Recentes** | RF-017: Exibição das últimas alterações realizadas<br>RF-016: Histórico de alterações |

### Painel de Atualizações
| ![Painel de Atualizações](https://github.com/user-attachments/assets/913f393a-14b2-46ff-999e-b723b663dfc7) |
|:--------------------------------------------------------------------------------------------:|
| **Figura 3: Painel de Atualizações Recentes**                                                  |

| **Componente**               | **Requisitos Atendidos**                                                                 |
|------------------------------|------------------------------------------------------------------------------------------|
| **Lista de Atualizações**    | RF-017: Exibição das últimas alterações nos flows e documentos<br>RF-016: Histórico de alterações |
| **Botão de Filtro de Alterações** | RF-015: Pesquisa e filtragem de flows e procedimentos de trabalho por tags/categorias |
| **Notificações de Atualizações** | RF-018: Envio de notificações por e-mail quando houver atualizações |

### Página de Processos de Trabalho
|![Processos de Trabalho](https://github.com/user-attachments/assets/4ba1d4a8-dea1-4812-8cb7-374ff633c77c) |
|:--------------------------------------------------------------------------------------------:|
| **Figura 4: Página de Processos de Trabalho**                                                  |

| **Componente**               | **Requisitos Atendidos**                                                                 |
|------------------------------|------------------------------------------------------------------------------------------|
| **Lista de Processos**        | RF-005: Criação de flows de perguntas e respostas<br>RF-014: Organização de procedimentos de trabalho<br>RF-015: Pesquisa e filtragem de procedimentos por tags/categorias |
| **Botões de Ação**            | RF-006: Edição de flows de perguntas e respostas<br>RF-009: Arquivamento de procedimentos sem exclusão<br>RF-013: Armazenamento de procedimentos de trabalho<br>RF-014: Organização de procedimentos de trabalho |
| **Área de Detalhamento**     | RF-011: Impossibilidade de edição de procedimentos arquivados<br>RF-012: Desarquivamento de procedimentos de trabalho |

### Página de flows
| ![flows de Trabalho](https://github.com/user-attachments/assets/e76b4cc5-e20d-4a78-b860-61a742907a2d)|
|:--------------------------------------------------------------------------------------------:|
| **Figura 5: Página de flows**                                                                |

| **Componente**               | **Requisitos Atendidos**                                                                 |
|------------------------------|------------------------------------------------------------------------------------------|
| **Lista de flows**           | RF-005: Criação de flows de perguntas e respostas<br>RF-008: Visualização de flows em lista ou diagrama |
| **Editor de flows**         | RF-006: Edição de flows de perguntas e respostas<br>RF-014: Organização de flows |
| **Configurações Avançadas**  | RF-007: Configurações avançadas para administradores e equipe de TI |

### Página de IPTs e Orientações
| ![IPTs e Orientações](https://github.com/user-attachments/assets/c1a4a1ce-0634-4784-83ee-d6230d7fab69)|
|:--------------------------------------------------------------------------------------------:|
| **Figura 6: Página de IPTs e Orientações**                                                   |

| **Componente**               | **Requisitos Atendidos**                                                                 |
|------------------------------|------------------------------------------------------------------------------------------|
| **Lista de IPTs e Orientações** | RF-013: Armazenamento de procedimentos de trabalho<br>RF-014: Organização de procedimentos de trabalho<br>RF-015: Pesquisa e filtragem de procedimentos de trabalho por tags/categorias |
| **Área de Detalhamento de IPTs** | RF-009: Arquivamento de procedimentos de trabalho sem exclusão<br>RF-012: Desarquivamento de procedimentos de trabalho |
| **Notificações**             | RF-018: Envio de notificações por e-mail quando um procedimento de trabalho for atualizado<br>RF-019: Envio de notificações por e-mail quando um novo procedimento de trabalho for criado |

