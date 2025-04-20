# Template padrão do site

Layout padrão do site (HTML e CSS) que será utilizado em todas as páginas com a definição de identidade visual, aspectos de responsividade e iconografia.

Explique as guias de estilo utilizadas no seu projeto.

## Design

Interface baseada em **Menu Superior + Menu Lateral**, com conteúdo central organizado em **cards e seções**.

## Logo da Aplicação

- **Localização**: Canto superior esquerdo, dentro do Menu Superior
- **Nome exibido**: `OrganizaPRO`
- **Função**: Redireciona para a tela inicial
- **Acessibilidade**: `alt="Logo OrganizaPRO - Início"`

## Menus Padrões

### Menu Superior
| ![Menu Superior](https://github.com/user-attachments/assets/ec1a3ae4-2b0d-4e57-b660-1a6d373f326a) |
|:------------------------------------------------------------------------------------------------:|
| **Figura 1:** Menu superior do sistema OrganizaPro |

| Elemento         | Função                                                                 |
|------------------|------------------------------------------------------------------------|
| Botão "Menu"     | Alterna a visibilidade do menu lateral                                 |
| Campo de busca   | Permite pesquisar em todo o sistema                                     |
| Ícone Casa       | Retorna à Página Inicial                                                |
| Ícone Sino       | Alterna a visibilidade das notificações                                 |
| Ícone Lua        | Ativa o modo noturno ou alto contraste                                  |
| Ícone Circular   | Exibe informações sobre o usuário logado                                |
| Ícone Sair       | Realiza o logout da aplicação                                           |

### Menu Lateral
| ![Menu Lateral](https://github.com/user-attachments/assets/135e84d2-d144-495e-a809-112c682ad2d2) |
|:------------------------------------------------------------------------------------------------:|
| **Figura 2:** Menu lateral do OrganizaPro |

| Elemento                  | Função                            |
|---------------------------|-----------------------------------|
| Campo de busca            | Permite pesquisar itens no menu.       |
| Botão `Hoje` (Tarefas)                    | Filtra as tarefas do dia em que o usuário está logado. |
| Botão `Próximos 7 dias` (Tarefas)                    | Filtra as tarefas da próxima semana. |
| Botão `Processos de Trabalho`                    | Acessa a página Processos de Trabalho. |
| Botão `IPTs e Orientações`                    | Acessa a página IPTs e Orientações. |
| Botão `Painel de Atualizações`                    | Acessa a página Painel de Atualizações. |
| Botão `Usuários e Acessos`                    | Acessa a página Usuários e Acessos. |
| Botão `Notificações`                    | Alterna a visibilidade das notificações |
| Botão `Configurações`                    | Acessa a página Configurações. |

## Área de Conteúdo Principal

### Atualizações Recentes
| ![Atualizações Recentes](https://github.com/user-attachments/assets/c10d0057-f03f-4cc0-90c7-c1d81a415145) |
|:----------------------------------------------------------------------------------------------------------:|
| **Figura 3:** Seção de atualizações recentes |
- Cards com imagem, título e data
- Layout: horizontal com rolagem

### Meus Favoritos
| ![Meus Favoritos](https://github.com/user-attachments/assets/9147fad3-061e-4d38-971d-3f293816fc2f) |
|:--------------------------------------------------------------------------------------------------:|
| **Figura 4:** Seção de atalhos para processos favoritos no OrganizaPro |
- Botões retangulares com nomes dos processos favoritados pelo usuário

### Minhas Tarefas
- Botões: `Filtros` e `+ Criar nova tarefa`
- Estrutura tipo Kanban:
  - Colunas: `A fazer`, `Fazendo`, `Concluído`
  - Cada card:
    - Tags
    - Data
    - Checkbox de status

## Cores
| ![Paleta de Cores](https://github.com/user-attachments/assets/84bbf2fc-2050-4802-b560-9651513b8403) |
|:---------------------------------------------------------------------------------------------------:|
| **Figura 6:** Paleta de cores acessível |

A paleta do OrganizaPro foi definida com base em critérios de **acessibilidade visual**, garantindo contraste adequado e legibilidade para usuários com ou sem deficiências visuais, incluindo os diferentes **tipos de daltonismo**.

| Cor       | HEX       | Função na Interface                             |
|---------------------------|--------------------------------------|----------------------------------------------------------------|
| Alice Blue    | `#D5E5ED` | Fundo de seções secundárias                     |
| Light Blue           | `#A4D3E6` | Elementos de apoio, etiquetas, botões e destaques            |
| Indigo Dye    | `#25446A` | Botões e títulos                     |
| Prussian Blue        | `#1B304B` | Cabeçalho e navegação                           |
| Night          | `#121212` | Texto e elementos de alto contraste             |

- A paleta evita combinações problemáticas para **protanopia, deuteranopia e tritanopia**.
- Todas as cores atendem aos **critérios de contraste do WCAG 2.1**.
- A interface utiliza **rótulos, ícones e formas** para garantir a comunicação mesmo sem distinção de cor.

## Tipografia

A tipografia adotada para toda a aplicação será a **fonte Arial**, uma fonte sem serifa amplamente utilizada por sua **alta legibilidade**, **neutralidade visual** e **compatibilidade entre plataformas**.

### Hierarquia e Função

| Elemento                  | Estilo Tipográfico                   | Função principal                                               |
|---------------------------|--------------------------------------|----------------------------------------------------------------|
| **Título de Página**      | Arial, 32px, Bold | Indicar o nome ou tema principal da página                     |
| **Título de Seção**       | Arial, 24px, Semi Bold             | Destacar subdivisões do conteúdo dentro de uma mesma página   |
| **Rótulos de Componentes**| Arial, 16px, Regular                 | Identificar campos, botões e outros elementos da interface     |
| **Corpo de Texto**        | Arial, 14px, Regular                 | Apresentar informações descritivas, instruções e conteúdos     |

## Iconografia

Defina os ícones que serão utilizados e suas respectivas funções.

Apresente os estilos CSS criados para cada um dos elementos apresentados.
Outras seções podem ser adicionadas neste documento para apresentar padrões de componentes, de menus, etc.
