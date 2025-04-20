# Template padrão do site

O projeto utiliza um layout base em HTML e CSS padronizado para todas as páginas da aplicação. Esse template define a **identidade visual**, contempla princípios de **responsividade** para diferentes dispositivos e incorpora **iconografia funcional** com base em bibliotecas modernas.

## Guias de Estilo
Foram adotadas diretrizes de design centradas na simplicidade, acessibilidade e coerência visual. As principais definições incluem:

- **Estrutura visual consistente:** uso de espaçamentos, alinhamentos e tipografia uniformes.
- **Paleta de cores acessível:** cores com alto contraste, testadas para múltiplas formas de daltonismo.
- **Tipografia padrão:** Arial aplicada de forma hierárquica (títulos, rótulos e corpo de texto).
- **Componentização visual:** uso de cards, seções, ícones e feedback visual padronizado.

## Design
|![Página Inicial](https://github.com/user-attachments/assets/1c95460d-b8fc-4d4a-bf3f-a1149e257f09)|
|:---------------------------------------------------------------------------------------------------:|
| **Figura 1:** Página inicial do OrganizaPro |

Interface baseada em **Menu Superior + Menu Lateral**, com conteúdo central organizado em **cards e seções**.

## Logo da Aplicação
| ![Logo](https://github.com/user-attachments/assets/6e1c2e1e-8712-4185-a114-ccaf5173bf88)|
|:------------------------------------------------------------------------------------------------:|
| **Figura 1:** Logo do OrganizaPro |

- **Localização**: Canto superior esquerdo, dentro do Menu Superior
- **Nome exibido**: `OrganizaPRO`
- **Função**: Redireciona para a tela inicial
- **Acessibilidade**: `alt="Logo OrganizaPRO - Início"`

## Menus Padrões

### Menu Superior

| ![Menu Superior](https://github.com/user-attachments/assets/ec1a3ae4-2b0d-4e57-b660-1a6d373f326a) |
|:------------------------------------------------------------------------------------------------:|
| **Figura 2:** Menu superior do OrganizaPro |

| Elemento         | Função                                                                 |
|------------------|------------------------------------------------------------------------|
| Botão "Menu"     | Alterna a visibilidade do menu lateral                                 |
| Campo de busca   | Permite pesquisar em todo o sistema                                     |
| Ícone Casa       | Retorna à Página Inicial                                                |
| Ícone Sino       | Alterna a visibilidade das notificações                                 |
| Ícone Lua        | Ativa o modo noturno ou alto contraste                                  |
| Ícone Círculo   | Exibe informações sobre o usuário logado                                |
| Ícone Sair       | Realiza o logout da aplicação                                           |

### Menu Lateral
| ![Menu Lateral](https://github.com/user-attachments/assets/135e84d2-d144-495e-a809-112c682ad2d2) |
|:------------------------------------------------------------------------------------------------:|
| **Figura 3:** Menu lateral do OrganizaPro |

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
| **Figura 4:** Seção de atualizações recentes |
- Cards com imagem, título e data
- Layout: horizontal com rolagem

### Meus Favoritos
| ![Meus Favoritos](https://github.com/user-attachments/assets/9147fad3-061e-4d38-971d-3f293816fc2f) |
|:--------------------------------------------------------------------------------------------------:|
| **Figura 5:** Seção de atalhos para processos favoritos no OrganizaPro |
- Botões retangulares com nomes dos processos favoritados pelo usuário

### Minhas Tarefas
|![Minhas Tarefas](https://github.com/user-attachments/assets/3986556c-d888-4c47-a0c7-16b93977d3a9)|
|:---------------------------------------------------------------------------------------------------:|
| **Figura 6:** Seção de tarefas do Usuário |
- Botões: `Filtros` e `+ Criar nova tarefa`
- Estrutura tipo Kanban:
  - Colunas: `A fazer`, `Fazendo`, `Concluído`
  - Conteúdo dos cards:
    - Etiquetas (Tags)
    - Data pra conclusão da tarefa
    - Checkbox de status

## Cores
| ![Paleta de Cores](https://github.com/user-attachments/assets/84bbf2fc-2050-4802-b560-9651513b8403) |
|:---------------------------------------------------------------------------------------------------:|
| **Figura 7:** Paleta de cores acessível |

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

A tipografia adotada para toda a aplicação será a **fonte Inter**, uma fonte sem serifa amplamente utilizada por sua **alta legibilidade**, **neutralidade visual** e **compatibilidade entre plataformas**.

### Hierarquia e Função

| Elemento                  | Estilo Tipográfico                   | Função principal                                               |
|---------------------------|--------------------------------------|----------------------------------------------------------------|
| **Título de Página**      | Inter, 32px, Bold | Indicar o nome ou tema principal da página                     |
| **Título de Seção**       | Inter, 24px, Semi Bold             | Destacar subdivisões do conteúdo dentro de uma mesma página   |
| **Rótulos de Componentes**| Inter, 16px, Regular                 | Identificar campos, botões e outros elementos da interface     |
| **Corpo de Texto**        | Inter, 14px, Regular                 | Apresentar informações descritivas, instruções e conteúdos     |

## Iconografia

| Ícone            | Descrição                | Função na Aplicação                           |
|------------------|--------------------------|----------------------------------------------|
| ![pesquisar](https://github.com/user-attachments/assets/d51e1cf3-94b7-4a3e-b47a-d763382dd7ea) | Pesquisa        | Permite realizar buscas dentro da aplicação. |
| ![home](https://github.com/user-attachments/assets/8c210848-3850-4e52-9adf-d0642fd654fa)  | Casa           | Retorna à Página Inicial.                    |
| ![notifications](https://github.com/user-attachments/assets/6e5978bb-241e-4e66-a694-2a226b2afd16) | Sino           | Alterna a visibilidade das notificações.     |
| ![moon](https://github.com/user-attachments/assets/f8c4ad84-5a8f-4c13-b266-e29fb6102cbc) | Lua            | Ativa o modo noturno ou alto contraste.      |
| ![perfil](https://github.com/user-attachments/assets/c4d5bc0e-5ded-4ef5-a6f5-964cfd17bc9b) | Círculo        | Exibe informações sobre o usuário logado.    |
| ![logout](https://github.com/user-attachments/assets/c7793153-6054-4407-8e53-a68ab8b6d60d) | Sair           | Realiza o logout da aplicação.              |
| ![filter](https://github.com/user-attachments/assets/5739c9f4-acd8-41a4-b2b3-279754e3cff7) | Filtro         | Permite realizar filtros nas buscas.        |
| ![add](https://github.com/user-attachments/assets/726f1ab1-e352-49df-92c6-d26c73210804) | Adicionar      | Permite inserir novas tarefas no quadro Kanban. |
| ![visibility](https://github.com/user-attachments/assets/d1c2ff7a-0d1f-4808-b038-4895253a05a4) | Olho           | Permite visualizar o item selecionado.       |
| ![edit](https://github.com/user-attachments/assets/f3cc9582-50ca-474d-a893-02223d97cd2f) | Lápis          | Permite editar o item selecionado.           |
| ![favorite](https://github.com/user-attachments/assets/6defb9fc-4e99-48e5-a1c2-ba790b5b0ea5) | Coração        | Permite favoritar o item e filtrar os favoritos. |
| ![duplicar](https://github.com/user-attachments/assets/bd7d1672-3dd4-4469-8144-4462362f3b05) | Duplicar       | Permite duplicar o item selecionado.         |
| ![pdf](https://github.com/user-attachments/assets/5ad43cf4-5f0e-49a0-9f58-ed10248b1878) | PDF            | Gera um arquivo PDF do item.                 |
| ![archive](https://github.com/user-attachments/assets/50169f02-017b-4fe9-befe-95cc6eb571e1) | Arquivar       | Arquiva o item selecionado.                  |
