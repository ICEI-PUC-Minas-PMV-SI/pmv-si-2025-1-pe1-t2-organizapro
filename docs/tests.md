# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.


**Caso de Teste** | **CT01 - Efetuar login com dados válidos**
 :--------------: | ------------
**Procedimento**  | 1) Acessar a tela de login;<br>2) Inserir e-mail e senha válidos;<br>3) Clicar no botão "Entrar".
**Requisitos associados** | RF39:	Permitir login de usuário por e-mail e senha.
**Resultado esperado** | Login efetuado. O usuário será direcionado para a Tela Inicial.
**Dados de entrada** | E-mail e senha válidos.
**Resultado obtido** | Login efetuado. O usuário foi direcionado para a Tela Inicial.

**Caso de Teste** | **CT02 - Efetuar login com dados inválidos**
 :--------------: | ------------
**Procedimento**  | 1) Acessar a tela de login;<br>2) Inserir e-mail e senha inválidos;<br>3) Clicar no botão "Entrar".
**Requisitos associados** | RF39:	Permitir login de usuário por e-mail e senha.
**Resultado esperado** | Login não efetuado. O usuário não será direcionado para a Tela Inicial. 
**Dados de entrada** | E-mail e senha inválidos.
**Resultado obtido** | Login não efetuado. O usuário não foi direcionado para a Tela Inicial.

**Caso de Teste** | **CT03 - Alternar exibição do menu lateral**
 :--------------: | ------------
**Procedimento**  | 1) Acessar a tela inicial;<br>2) Clicar no botão com o ícone de três linhas horizontais (hamburger).
**Requisitos associados** | RF04:	Permitir que o usuário oculte ou exiba o menu lateral em todas as páginas do sistema.
**Resultado esperado** | O menu lateral deve ser exibido (caso esteja oculto) ou ocultado (caso esteja visível), conforme o estado atual.
**Dados de entrada** | Nenhum.
**Resultado obtido** | Menu lateral exibido e ocultado corretamente.

**Caso de Teste** | **CT04 - Acessar tarefas no menu lateral**
 :--------------: | ------------
**Procedimento**  | 1) Acessar a tela inicial;<br>2) Clicar no botão com o ícone de três linhas horizontais (hamburger) para exibir o menu lateral;<br>3) Clicar no botão "Hoje";<br>4) Verificar a lista de tarefas exibidas;<br>5) Clicar no botão "Próximos 7 dias";<br>6) Verificar a nova lista de tarefas exibidas.
**Requisitos associados** | RF13:	Acessar as tarefas do dia e dos próximos sete dias no menu lateral.
**Resultado esperado** | Ao clicar em "Hoje", devem ser exibidas apenas as tarefas do dia atual. Ao clicar em "Próximos 7 dias", devem ser exibidas as tarefas programadas para os próximos sete dias.
**Dados de entrada** | Nenhum.
**Resultado obtido** | Tarefas exibidas corretamente conforme o botão selecionado.

**Caso de Teste** | **CT05 - Acessar atualizações recentes a partir da tela inicial**
 :--------------: | ------------
**Procedimento**  | 	1) Acessar a tela inicial;<br>2) Localizar a seção "Atualizações recentes";<br>3) Clicar em uma atualização listada;<br>4) Verificar se o sistema redireciona para o Painel de Atualizações, com o conteúdo correspondente em destaque.
**Requisitos associados** | RF24: Exibir atualizações recentes na tela inicial com links que redirecionam para o conteúdo correspondente no painel de atualizações.
**Resultado esperado** | Ao clicar em uma atualização recente, o usuário deve ser redirecionado automaticamente para o painel de atualizações, com o item correspondente evidenciado.
**Dados de entrada** | Nenhum.
**Resultado obtido** | Redirecionamento correto para a atualização no Painel de Atualizações.

**Caso de Teste** | **CT06 - Acessar procedimentos favoritos na tela inicial**
 :--------------: | ------------
**Procedimento**  | 	1) Acessar a tela inicial;<br>2) Localizar a seção "Meus favoritos";<br>3) Clicar em um procedimento listado;<br>4) Verificar se o sistema exibe o conteúdo completo do procedimento selecionado.
**Requisitos associados** | RF38: Exibir procedimentos favoritos do usuário na tela inicial.
**Resultado esperado** | Ao clicar em um procedimento favorito, o sistema deve abrir e exibir o conteúdo completo do procedimento.
**Dados de entrada** | Nenhum.
**Resultado obtido** | Procedimento aberto corretamente ao clicar no favorito.

**Caso de Teste** | **CT07 - Acessar quadro Kanban com tarefas do usuário**  
:--------------: | ------------  
**Procedimento** | 1) Acessar a tela inicial;<br>2) Verificar a exibição do quadro Kanban com as tarefas do usuário;<br>3) Confirmar que as tarefas estão organizadas por status: "a fazer", "fazendo" e "concluído".  
**Requisitos associados** | RF05: Exibir quadro Kanban com tarefas do usuário na tela inicial.  
**Resultado esperado** | O quadro Kanban deve apresentar todas as tarefas do usuário, agrupadas corretamente por status.  
**Dados de entrada** | Nenhum.  
**Resultado obtido** | Quadro Kanban exibido com tarefas organizadas por status.  

**Caso de Teste** | **CT08 - Criar nova tarefa**  
:--------------: | ------------  
**Procedimento** | 1) Acessar a tela inicial;<br>2) Localizar a seção "Minhas tarefas";<br>3) Clicar em "Nova tarefa";<br>2) Preencher o formulário título, descrição, etiquetas, data de vencimento e status;<br>3) Clicar em "Salvar tarefa";<br>4) Verificar se a nova tarefa aparece no quadro Kanban com os dados preenchidos.  
**Requisitos associados** | RF06: Permitir criação de novas tarefas.<br>RF07: Permitir definição de título, descrição, etiquetas, data de vencimento e status.  
**Resultado esperado** | A tarefa criada deve aparecer no quadro Kanban com todas as informações corretamente registradas.  
**Dados de entrada** | Título, descrição, etiquetas, data de vencimento e status válidos.  
**Resultado obtido** | Tarefa criada e exibida corretamente com todas as informações.  

**Caso de Teste** | **CT09 - Atualizar status de uma tarefa no quadro Kanban**  
:--------------: | ------------  
**Procedimento** | 1) Localizar uma tarefa no quadro Kanban;<br>2) Alterar o status da tarefa entre "a fazer", "fazendo" e "concluído", arrastando a tarefa ou clicando no checkbox para concluí-la;<br>3) Confirmar a atualização do status.  
**Requisitos associados** | RF08: Permitir atualização do status da tarefa entre "a fazer", "fazendo" e "concluído".  
**Resultado esperado** | O status da tarefa deve ser atualizado corretamente e refletido no quadro Kanban.  
**Dados de entrada** | Tarefa existente.  
**Resultado obtido** | Status da tarefa atualizado corretamente e refletido no Kanban.  

**Caso de Teste** | **CT10 - Editar uma tarefa existente**  
:--------------: | ------------  
**Procedimento** | 1) Selecionar uma tarefa existente;<br>2) Clicar em "Editar tarefa";<br>3) Alterar campos como título, descrição ou etiquetas;<br>4) Salvar as alterações;<br>5) Verificar a atualização da tarefa no quadro Kanban.  
**Requisitos associados** | RF09: Permitir edição de tarefas existentes.  
**Resultado esperado** | A tarefa deve refletir as alterações feitas após salvar.  
**Dados de entrada** | Dados modificados para a tarefa.  
**Resultado obtido** | Tarefa atualizada com sucesso e alterações refletidas no quadro.  

**Caso de Teste** | **CT11 - Excluir uma tarefa**  
:--------------: | ------------  
**Procedimento** | 1) Selecionar uma tarefa;<br>2) Clicar em "Exclur tarefa";<br>3) Confirmar a exclusão;<br>4) Verificar se a tarefa foi removida do quadro Kanban.  
**Requisitos associados** | RF10: Permitir exclusão de tarefas.  
**Resultado esperado** | A tarefa deve ser removida permanentemente e desaparecer do quadro.  
**Dados de entrada** | Tarefa existente.  
**Resultado obtido** | Tarefa excluída e removida do quadro com sucesso.  

**Caso de Teste** | **CT12 - Pesquisar tarefas por palavra-chave**  
:--------------: | ------------  
**Procedimento** | 1) Localizar o campo de pesquisa na seção "Minhas tarefas";<br>2) Digitar uma palavra-chave relacionada a título, descrição ou etiquetas;<br>3) Executar a pesquisa;<br>4) Verificar as tarefas exibidas.  
**Requisitos associados** | RF11: Permitir pesquisa de tarefas por palavras-chave.  
**Resultado esperado** | A lista deve mostrar somente as tarefas que contenham a palavra-chave.  
**Dados de entrada** | Palavra-chave válida.  
**Resultado obtido** | Pesquisa filtrou corretamente as tarefas pela palavra-chave.  

**Caso de Teste** | **CT13 - Filtrar tarefas por etiquetas, status e data de vencimento**  
:--------------: | ------------  
**Procedimento** | 1) Clicar em "Filtros" na seção "Minhas tarefas";<br>2) Selecionar etiquetas, status e/ou data;<br>3) Aplicar os filtros;<br>4) Verificar as tarefas exibidas.  
**Requisitos associados** | RF12: Permitir filtragem de tarefas por etiquetas, status e data de vencimento.  
**Resultado esperado** | As tarefas exibidas devem atender a todos os critérios selecionados.  
**Dados de entrada** | Etiquetas, status e datas válidas para filtro.  
**Resultado obtido** | Tarefas filtradas corretamente conforme os critérios aplicados.  

**Caso de Teste** | **CT14 - Exibir painel de atualizações com lista cronológica**  
:--------------: | ------------  
**Procedimento** | 1) Acessar o painel de atualizações;<br>2) Verificar se a lista de atualizações está ordenada cronologicamente do mais recente para o mais antigo.  
**Requisitos associados** | RF14: Exibir painel de atualizações com lista cronológica.  
**Resultado esperado** | As atualizações devem ser exibidas em ordem cronológica decrescente, mostrando primeiro as mais recentes.  
**Dados de entrada** | Nenhum.  
**Resultado obtido** | Lista de atualizações exibida corretamente em ordem cronológica.  

**Caso de Teste** | **CT15 - Criar nova atualização**  
:--------------: | ------------  
**Procedimento** | 1) Clicar em "Nova atualização";<br>2) Preencher o formulário com título, descrição, etiquetas e status;<br>3) Clicar em "Salvar";<br>4) Verificar se a atualização aparece no painel corretamente.  
**Requisitos associados** | RF15: Permitir criação de novas atualizações.<br>RF16: Permitir definição de título, descrição, etiquetas e status das atualizações.  
**Resultado esperado** | A nova atualização deve ser criada e exibida no painel com todos os dados informados.  
**Dados de entrada** | Título, descrição, etiquetas e status válidos.  
**Resultado obtido** | Atualização criada e exibida corretamente no painel com os dados preenchidos.  

**Caso de Teste** | **CT16 - Editar atualização existente**  
:--------------: | ------------  
**Procedimento** | 1) Escolher uma atualização existente;<br>2) Clicar em "Editar";<br>3) Alterar título, descrição, etiquetas ou status;<br>4) Clicar em "Salvar" as alterações;<br>5) Verificar se a atualização foi atualizada no painel.  
**Requisitos associados** | RF17: Permitir edição de atualizações existentes.  
**Resultado esperado** | A atualização deve refletir as alterações após salvar.  
**Dados de entrada** | Dados modificados para a atualização.  
**Resultado obtido** | Atualização editada com sucesso e alterações refletidas no painel.  

**Caso de Teste** | **CT17 - Excluir atualização**  
:--------------: | ------------  
**Procedimento** | 1) Escolher uma atualização;<br>2) Clicar em "Excluir";<br>3) Confirmar a exclusão;<br>4) Verificar se a atualização foi removida do painel.  
**Requisitos associados** | RF18: Permitir exclusão de atualizações.  
**Resultado esperado** | A atualização deve ser removida permanentemente do painel.  
**Dados de entrada** | Atualização existente.  
**Resultado obtido** | Atualização excluída e removida do painel com sucesso.  

**Caso de Teste** | **CT18 - Arquivar e desarquivar atualização**  
:--------------: | ------------  
**Procedimento** | 1) Escolher uma atualização;<br>2) Clicar em "Arquivar";<br>3) Verificar se a atualização sai da lista ativa;<br>4) Escolher atualização inativa;<br>5) Clicar em "Reativar" a atualização;<br>6) Verificar se ela retorna à lista ativa.  
**Requisitos associados** | RF19: Permitir arquivamento de atualizações.<br>RF20: Permitir desarquivamento de atualizações.  
**Resultado esperado** | A atualização deve ser movida corretamente para a lista de arquivadas e depois restaurada para a lista ativa.  
**Dados de entrada** | Atualização existente.  
**Resultado obtido** | Atualização arquivada e desarquivada com sucesso, com listas atualizadas corretamente.  

**Caso de Teste** | **CT19 - Marcar e desmarcar atualização como favorita**  
:--------------: | ------------  
**Procedimento** | 1) Escolher uma atualização;<br>2) Marcar como favorita;<br>3) Verificar se a atualização aparece na lista de favoritas;<br>4) Desmarcar como favorita;<br>5) Confirmar remoção da lista de favoritas.  
**Requisitos associados** | RF21: Permitir marcação de atualizações como favoritas.  
**Resultado esperado** | A atualização deve ser adicionada e removida corretamente da lista de favoritas.  
**Dados de entrada** | Atualização existente.  
**Resultado obtido** | Atualização marcada e desmarcada como favorita com sucesso.  

**Caso de Teste** | **CT20 - Pesquisar atualizações por palavra-chave**  
:--------------: | ------------  
**Procedimento** | 1) Acessar o painel de atualizações;<br>2) Digitar palavra-chave no campo de pesquisa;<br>3) Executar a pesquisa;<br>4) Verificar se as atualizações exibidas correspondem à palavra-chave.  
**Requisitos associados** | RF22: Permitir pesquisa de atualizações por palavras-chave.  
**Resultado esperado** | As atualizações exibidas devem conter a palavra-chave pesquisada.  
**Dados de entrada** | Palavra-chave válida.  
**Resultado obtido** | Pesquisa filtrou corretamente as atualizações pela palavra-chave.  

**Caso de Teste** | **CT21 - Filtrar atualizações por favoritos, status, etiquetas e data**  
:--------------: | ------------  
**Procedimento** | 1) Acessar o Painel de Atualizações;<br>2) Clicar em "Filtros";<br>3) Selecionar critérios: favoritos, status, etiquetas e/ou datas;<br>3) Aplicar filtros;<br>4) Verificar atualizações exibidas conforme os filtros.  
**Requisitos associados** | RF23: Permitir filtragem de atualizações por favoritos, status, etiquetas e data de criação.  
**Resultado esperado** | As atualizações exibidas devem respeitar todos os filtros aplicados.  
**Dados de entrada** | Critérios válidos para filtro.  
**Resultado obtido** | Atualizações filtradas corretamente conforme critérios selecionados.  

**Caso de Teste** | **CT22 - Exibir painel de controle com lista de procedimentos**  
:--------------: | ------------  
**Procedimento** | 1) Acessar o painel de controle;<br>2) Verificar se a lista de procedimentos é exibida corretamente.  
**Requisitos associados** | RF25: Exibir painel de controle com lista de procedimentos.  
**Resultado esperado** | O painel de controle deve exibir corretamente todos os procedimentos cadastrados.  
**Dados de entrada** | Nenhum.  
**Resultado obtido** | Lista de procedimentos exibida corretamente no painel de controle.  

**Caso de Teste** | **CT23 - Criar novo procedimento**  
:--------------: | ------------  
**Procedimento** | 1) Clicar em "Novo procedimento";<br>2) Preencher o formulário com título, tipo, descrição, etiquetas, status e anexar arquivo;<br>3) Salvar o procedimento;<br>4) Verificar se o procedimento aparece na lista.  
**Requisitos associados** | RF26: Permitir criação de novos procedimentos.<br>RF27: Permitir definição de título, tipo, descrição, etiquetas, status e anexo dos procedimentos.  
**Resultado esperado** | O procedimento deve ser salvo com todos os dados preenchidos e exibido na lista.  
**Dados de entrada** | Título, tipo, descrição, etiquetas, status e anexo válidos.  
**Resultado obtido** | Procedimento criado e exibido corretamente com todas as informações.  

**Caso de Teste** | **CT24 - Visualizar procedimento**  
:--------------: | ------------  
**Procedimento** | 1) Selecionar um procedimento na lista;<br>2) Clicar na opção de visualização;<br>3) Verificar se os dados completos do procedimento são exibidos.  
**Requisitos associados** | RF28: Permitir visualização de procedimentos.  
**Resultado esperado** | Os dados do procedimento devem ser apresentados corretamente na visualização.  
**Dados de entrada** | Procedimento existente.  
**Resultado obtido** | Procedimento visualizado corretamente com todas as informações.  

**Caso de Teste** | **CT25 - Editar procedimento existente**  
:--------------: | ------------  
**Procedimento** | 1) Selecionar um procedimento;<br>2) Editar campos como título, tipo ou descrição;<br>3) Salvar alterações;<br>4) Verificar se as mudanças foram aplicadas.  
**Requisitos associados** | RF29: Permitir edição de procedimentos.  
**Resultado esperado** | As alterações devem ser salvas e refletidas na lista de procedimentos.  
**Dados de entrada** | Dados alterados do procedimento.  
**Resultado obtido** | Procedimento atualizado corretamente com as alterações aplicadas.  

**Caso de Teste** | **CT26 - Excluir procedimento**  
:--------------: | ------------  
**Procedimento** | 1) Selecionar um procedimento na lista;<br>2) Acionar a opção de exclusão;<br>3) Confirmar exclusão;<br>4) Verificar se foi removido da lista.  
**Requisitos associados** | RF30: Permitir exclusão de procedimentos.  
**Resultado esperado** | O procedimento deve ser excluído da base e removido da lista.  
**Dados de entrada** | Procedimento existente.  
**Resultado obtido** | Procedimento excluído corretamente da lista.  

**Caso de Teste** | **CT27 - Copiar procedimento existente**  
:--------------: | ------------  
**Procedimento** | 1) Selecionar um procedimento existente;<br>2) Acionar a opção de duplicar;<br>3) Verificar se o sistema abre o formulário de criação com os dados preenchidos com base no procedimento original;<br>4) Editar os dados, se desejar;<br>5) Salvar o novo procedimento;<br>6) Confirmar que o novo procedimento foi criado e listado separadamente, sem afetar o procedimento original.
**Requisitos associados** | RF31: Permitir duplicar procedimento para reaproveitamento de dados.  
**Resultado esperado** | O sistema deve abrir o formulário preenchido com os dados do procedimento original para edição e criação de um novo procedimento distinto, sem criar nova versão do original.   
**Dados de entrada** | Procedimento existente.  
**Resultado obtido** | O formulário foi preenchido corretamente, o novo procedimento foi criado e listado, e o procedimento original permaneceu inalterado.  

**Caso de Teste** | **CT28 - Arquivar e desarquivar procedimento**  
:--------------: | ------------  
**Procedimento** | 1) Selecionar um procedimento;<br>2) Arquivar o procedimento;<br>3) Verificar se ele some da lista ativa;<br>4) Acessar os arquivados e desarquivar;<br>5) Confirmar que voltou para a lista ativa.  
**Requisitos associados** | RF32: Permitir arquivamento de procedimentos.<br>RF33: Permitir desarquivamento de procedimentos.  
**Resultado esperado** | O procedimento deve ser movido entre listas de acordo com a ação de arquivar ou desarquivar.  
**Dados de entrada** | Procedimento existente.  
**Resultado obtido** | Arquivamento e desarquivamento realizados corretamente.  

**Caso de Teste** | **CT29 - Marcar e desmarcar procedimento como favorito**  
:--------------: | ------------  
**Procedimento** | 1) Selecionar um procedimento;<br>2) Marcar como favorito;<br>3) Verificar se aparece na seção de favoritos;<br>4) Desmarcar e confirmar remoção da seção.  
**Requisitos associados** | RF34: Permitir marcação de procedimentos como favoritos.  
**Resultado esperado** | O procedimento deve ser adicionado e removido corretamente da lista de favoritos.  
**Dados de entrada** | Procedimento existente.  
**Resultado obtido** | Marcação como favorito e desmarcação funcionando corretamente.  

**Caso de Teste** | **CT30 - Pesquisar procedimentos por palavra-chave**  
:--------------: | ------------  
**Procedimento** | 1) Acessar campo de pesquisa de procedimentos;<br>2) Digitar palavra-chave;<br>3) Verificar se os resultados correspondem ao termo.  
**Requisitos associados** | RF35: Permitir pesquisa de procedimentos por palavras-chave.  
**Resultado esperado** | Devem ser exibidos apenas os procedimentos que contêm a palavra-chave.  
**Dados de entrada** | Palavra-chave válida.  
**Resultado obtido** | Pesquisa retornou corretamente os procedimentos correspondentes.  

**Caso de Teste** | **CT31 - Filtrar procedimentos por tipo, status, etiquetas, data e favoritos**  
:--------------: | ------------  
**Procedimento** | 1) Acessar filtros de procedimentos;<br>2) Selecionar critérios: tipo, status, etiquetas, intervalo de datas e favoritos;<br>3) Aplicar filtros;<br>4) Verificar os resultados exibidos.  
**Requisitos associados** | RF36: Permitir filtragem de procedimentos por tipo, status, etiquetas, data e favoritos.  
**Resultado esperado** | Devem ser exibidos apenas os procedimentos que atendem a todos os filtros selecionados.  
**Dados de entrada** | Filtros válidos.  
**Resultado obtido** | Procedimentos filtrados corretamente conforme os critérios definidos.  

**Caso de Teste** | **CT32 - Visualizar histórico de versões de um procedimento**  
:--------------: | ------------  
**Procedimento** | 1) Selecionar um procedimento;<br>2) Clicar na opção de histórico de versões;<br>3) Verificar se todas as versões anteriores são exibidas com data e alterações.  
**Requisitos associados** | RF37: Exibir histórico de versões dos procedimentos.  
**Resultado esperado** | Todas as versões do procedimento devem ser exibidas com data e detalhes das modificações.  
**Dados de entrada** | Procedimento com histórico.  
**Resultado obtido** | Histórico de versões exibido corretamente com as informações esperadas.  

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Casos de Teste*                                 |*CT 01 e 02: Tela de login*                                         |
|---|---|
|Requisito Associado | RF39:	Permitir login de usuário por e-mail e senha. |
|Link dos vídeos dos testes realizado: | Dados válidos: https://1drv.ms/v/c/4114749a91be6cd8/EZYI2v7AWKVFoaEJoSB-4QoB5onfIIchHL8bhhWw9-6UBA?e=e9M9hp<br>Dados inválidos: https://1drv.ms/v/c/4114749a91be6cd8/EUqlPYCm5L1FhD6o70MIOp4BQJyqp7mb_WwJVUyIH4K9Qg?e=XIKphz| 

|*Casos de Teste*                                 |*CT 04 e 07 a 13: Tarefas*                                        |
|---|---|
|Requisitos Associado | RF01: Exibir tela inicial com atualizações recentes, procedimentos favoritos e quadro Kanban de tarefas.<br>RF05: Exibir quadro Kanban com tarefas do usuário na tela inicial.<br>RF06: Permitir criação de novas tarefas.<br>RF07: Permitir definição de título, descrição, etiquetas, data de vencimento e status.<br>RF08: Permitir atualização do status da tarefa entre "a fazer", "fazendo" e "concluído".<br>RF09: Permitir edição de tarefas existentes.<br>RF10: Permitir exclusão de tarefas.<br>RF11: Permitir pesquisa de tarefas por palavras-chave.<br>RF12:	Permitir filtragem de tarefas por etiquetas, status e data de vencimento.<br>RF13	Exibir tarefas do dia e dos próximos sete dias no menu lateral.<br>RF41: Permitir a inserção, sugestão e gerenciamento visual de etiquetas (tags) em campos de formulário.<br>RF42: Permitir criação de filtros personalizados com chips interativos e popovers arrastáveis.<br>RF43: Gerenciar abertura, fechamento, título e conteúdo de janelas modais reutilizáveis em todo o sistema.<br>RNF-008: Aplicar cores consistentes para tags para melhor identificação visual.
Link dos vídeos dos testes realizado: | https://github.com/user-attachments/assets/3d827f56-3bbb-4536-b926-ff8049dfc142| 

|*Casos de Teste*                                 |*CT 04 e 07 a 13: Painel de Atualizações*                                        |
|---|---|
|Requisitos Associado | RF01: Exibir tela inicial com atualizações recentes, procedimentos favoritos e quadro Kanban de tarefas.<br>RF14:	Exibir painel de atualizações com lista cronológica.<br>RF15:	Permitir criação de novas atualizações.<br>RF16	Permitir definição de título, descrição, etiquetas e status das atualizações.<br>RF17	Permitir edição de atualizações existentes.<br>RF18	Permitir exclusão de atualizações.<br>RF19	Permitir arquivamento de atualizações.<br>RF20	Permitir desarquivamento de atualizações.<br>RF21	Permitir marcação de atualizações como favoritas.<br>RF22: Permitir pesquisa de atualizações por palavras-chave.<br>RF23: Permitir filtragem de atualizações por favoritos, status, etiquetas e data de criação.<br>RF24: Exibir atualizações recentes na tela inicial com links que redirecionam para o conteúdo correspondente no painel de atualizações.<br>RF41: Permitir a inserção, sugestão e gerenciamento visual de etiquetas (tags) em campos de formulário.<br>RF42: Permitir criação de filtros personalizados com chips interativos e popovers arrastáveis.<br>RF43: Gerenciar abertura, fechamento, título e conteúdo de janelas modais reutilizáveis em todo o sistema.<br>RNF-008: Aplicar cores consistentes para tags para melhor identificação visual. |
|Link do vídeo do teste realizado: | https://github.com/user-attachments/assets/fc9da0de-5ec1-4a14-b818-4dc54474d966 | 

|*Casos de Teste*                                 |*CT 06 e 22 a 32: Procedimentos*                                        |
|---|---|
|Requisitos Associado | RF01: Exibir tela inicial com atualizações recentes, procedimentos favoritos e quadro Kanban de tarefas.<br>RF25: Exibir painel de controle com lista de procedimentos.<br>RF26:	Permitir criação de novos procedimentos.<br>RF27:	Permitir definição de título, tipo, descrição, etiquetas, status e anexo dos procedimentos.<br>RF28	Permitir visualização de procedimentos.<br>RF29:	Permitir edição de procedimentos.<br>RF30:	Permitir exclusão de procedimentos.<br>RF31:	Permitir cópia de procedimentos.<br>RF32:	Permitir arquivamento de procedimentos.<br>RF33:	Permitir desarquivamento de procedimentos.<br>RF34:	Permitir marcação de procedimentos como favoritos.<br>RF35:	Permitir pesquisa de procedimentos por palavras-chave.<br>RF36:	Permitir filtragem de procedimentos por tipo, status, etiquetas, data e favoritos.<br.RF37: Exibir histórico de versões dos procedimentos.<br>RF38:Exibir procedimentos favoritos do usuário na tela inicial. 	 |
|Link do vídeo do teste realizado: | https://github.com/user-attachments/assets/aed74e68-8c83-4474-acc3-7b7c80a0b208 | 
## Avaliação dos Testes de Software

Durante a fase de testes, diversas funcionalidades da aplicação foram avaliadas com base em casos de uso realistas. Foram realizados testes relacionados ao login, exibição de menus, painel Kanban, painel de atualizações, procedimentos e filtros, contemplando entradas válidas e inválidas.

**Pontos positivos:**
A aplicação apresentou comportamento consistente e estável na maioria dos cenários. A interface é bem estruturada, com layout organizado e tipografia legível, facilitando a navegação. O login funcionou corretamente com dados válidos, redirecionando o usuário para a tela inicial, e respondeu adequadamente a entradas inválidas, exibindo mensagens de erro claras. As funcionalidades de criação, edição, exclusão, visualização e filtragem de tarefas, atualizações e procedimentos também se comportaram conforme o esperado, refletindo corretamente os dados informados. O quadro Kanban exibiu as tarefas corretamente agrupadas por status, e os filtros aplicados em diferentes seções retornaram os resultados esperados.

**Pontos a melhorar:**
Foi identificado um problema específico no botão de visualização de senha na tela de login: a cada clique, o ícone correspondente é duplicado, comprometendo a clareza visual. Além disso, ajustes pontuais no design de componentes visuais podem contribuir para melhorar a estética da interface e a experiência do usuário, especialmente em dispositivos móveis.

**Próximas ações:**

- Corrigir o comportamento do botão de visualização da senha, garantindo atualização correta do ícone.

- Implementar melhorias visuais pontuais, mantendo a usabilidade e a estrutura atual.

- Reexecutar os testes após as correções, seguindo a abordagem iterativa adotada pelo grupo para validação contínua da qualidade.

Os testes demonstraram a importância de atenção aos detalhes na construção da experiência do usuário. Ajustes aparentemente simples podem impactar significativamente na usabilidade e na percepção de qualidade da aplicação.

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é um gerente de equipe em uma instituição e precisa registrar um novo procedimento de trabalho para os seus funcionários. Acesse o painel de controle da plataforma, clique em "Novo procedimento", preencha os dados (título, tipo, descrição, etiquetas, status e anexo) e salve o novo procedimento. |
| 2             | Imagine que você é um funcionário da organização. Acesse a painel de controle da plataforma, localize um procedimento e adicione-o aos seus favoritos para facilitar o acompanhamento posterior. |
| 3             | Você é um analista responsável por acompanhar atualizações do setor. Acesse o painel de atualizações, utilize o campo de pesquisa ou filtros para localizar uma atualização específica e edite as informações de título ou descrição conforme orientação recebida. |
| 4             | Você é um colaborador novo e precisa verificar suas tarefas pendentes. Acesse a tela inicial da plataforma, visualize o quadro Kanban, filtre as tarefas por data de vencimento e status, identifique uma tarefa atrasada, edite a descrição e salve as alterações. |

## Registro de Testes de Usabilidade

### Cenário 1
**Descrição:** Você é um gerente de equipe em uma instituição e precisa registrar um novo procedimento de trabalho para um funcionário. Acesse o painel de controle da plataforma, preencha os dados do procedimento e salve o novo procedimento.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | **100%**           | **5**                | **28.02 segundos**                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |

    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.

### Cenário 2
**Descrição:** Imagine que você é um funcionário da organização. Acesse a painel de controle da plataforma, localize um procedimento e adicione-o aos seus favoritos para facilitar o acompanhamento posterior.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | **100%**           | **4.67**                | **30.05 segundos**                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |

    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam redirecionar automaticamente para outras. Senti a falta de mais opções de filtros, tanto na hora da pesquisa, quanto depois dela, nos resultados.

### Cenário 3
**Descrição:** Você é um analista responsável por acompanhar atualizações do setor. Acesse o painel de atualizações, utilize o campo de pesquisa ou filtros para localizar uma atualização específica e edite as informações de título ou descrição conforme orientação recebida.

| Usuário | Taxa de Sucesso | Satisfação Subjetiva (1–5) | Tempo para Conclusão do Cenário |
|---------|------------------|-----------------------------|----------------------------------|
| 1       | Sim              | 4                           | 25,32 segundos                   |
| 2       | Sim              | 5                           | 22,89 segundos                   |
| 3       | Sim              | 4                           | 31,75 segundos                   |
| 4       | Sim              | 5                           | 28,44 segundos                   |
| **Média** | **100%**       | **4,5**                     | **27,60 segundos**               |
| **Tempo para conclusão pelo especialista** | Sim | 5 | 10,55 segundos |

    Comentários dos usuários: Fácil de encontrar e editar os dados. A parte de salvar poderia ter mais destaque visual.

### Cenário 4  
**Descrição:** Você é um colaborador novo e precisa verificar suas tarefas pendentes. Acesse a tela inicial da plataforma, visualize o quadro Kanban, filtre as tarefas por data de vencimento e status, identifique uma tarefa atrasada, edite a descrição e salve as alterações..

| Usuário | Taxa de Sucesso | Satisfação Subjetiva (1–5) | Tempo para Conclusão do Cenário |
|---------|------------------|-----------------------------|----------------------------------|
| 1       | Sim              | 5                           | 12,87 segundos                   |
| 2       | Sim              | 4                           | 14,92 segundos                   |
| 3       | Sim              | 5                           | 16,01 segundos                   |
| 4       | Sim              | 5                           | 13,84 segundos                   |
| **Média** | **100%**       | **4,75**                    | **14,41 segundos**               |
| **Tempo para conclusão pelo especialista** | Sim | 5 | 6,03 segundos |

    Comentários dos usuários: Muito rápido e direto. Gostei do formato das tarefas, facilita muito a visualização.".

## Avaliação dos Testes de Usabilidade

Com base nos resultados obtidos a partir dos quatro cenários de testes de usabilidade aplicados, foi possível constatar que a aplicação apresenta um bom desempenho geral em termos de **eficácia**, **satisfação do usuário** e **eficiência**.

### 1. Taxa de Sucesso

Em todos os cenários propostos, a **taxa de sucesso foi de 100%**, o que indica que todos os usuários conseguiram realizar as tarefas solicitadas, mesmo com níveis distintos de familiaridade com a aplicação. Isso demonstra que a aplicação é funcional e que suas principais rotas de navegação são compreensíveis e acessíveis.

### 2. Satisfação Subjetiva

A média da **satisfação subjetiva** variou entre **4,5 e 5**, o que corresponde a uma avaliação entre “bom” e “ótimo” em todos os cenários. Os comentários dos participantes também reforçam essa percepção positiva, mencionando que o sistema é "intuitivo", "fácil de acessar" e "bem estruturado".

No entanto, alguns usuários sugeriram melhorias pontuais, como:
- Maior destaque visual no botão de “Salvar” (Cenário 3);
- Redirecionamentos automáticos entre páginas (Cenário 2);
- Mais opções de filtros nos resultados de pesquisa (Cenário 2).

Essas observações, embora não tenham impedido o sucesso das tarefas, sinalizam **oportunidades de aprimoramento da experiência do usuário**.

### 3. Tempo para Conclusão

Houve uma **diferença significativa entre o tempo médio dos usuários e o tempo do especialista** em todos os cenários. Por exemplo:
- No **Cenário 1**, os usuários levaram em média **28,02 segundos**, enquanto o especialista concluiu a mesma tarefa em **8,66 segundos**;
- No **Cenário 3**, a diferença foi ainda mais acentuada: **27,60 segundos (usuários)** versus **10,55 segundos (especialista)**.

Essas discrepâncias são esperadas, já que o especialista conhece previamente a estrutura e a lógica da aplicação. Ainda assim, elas indicam pontos que podem ser otimizados para reduzir o tempo de execução por novos usuários — especialmente em cenários que exigem navegação entre diferentes seções da aplicação ou uso de filtros e formulários.

### Conclusão

A aplicação demonstrou excelente desempenho em **eficácia** (100% de sucesso), **alta satisfação subjetiva** e **eficiência compatível com o nível de conhecimento dos usuários**. Entretanto, os testes também evidenciaram **pontos de melhoria na usabilidade**, que podem ser endereçados nas próximas iterações do projeto:

- Aperfeiçoar a visibilidade de botões e ações importantes (como “Salvar”);
- Adicionar opções avançadas de filtros e redirecionamentos automáticos entre seções;
- Avaliar a simplificação de fluxos para tarefas mais complexas.

A realização desses ajustes tende a melhorar ainda mais a experiência do usuário, promovendo um sistema mais intuitivo, acessível e eficiente.




