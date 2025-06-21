# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

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


**Caso de Teste** | **CT01 -Login com dados válidos**
 :--------------: | ------------
**Procedimento**  | 1) Acesse a tela de login 2) Insira um e-mail valido e uma senha correta 3) Clique no botão "Entrar".
**Requisitos associados** | RF-002
**Resultado esperado** | O usuário é direcionado para a página inicial após login com sucesso.
**Dados de entrada** | E-mail: teste@exemplo.com   senha:123456
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT01 -Login com dados válidos**
 :--------------: | ------------
**Procedimento**  | 1) Acesse a tela de login 2) Insira um e-mail e uma senha incorretos 3) Clique no botão "Entrar".
**Requisitos associados** | RF-002
**Resultado esperado** |O sistema deve exibir mensagem de erro: "Email ou senha incorretos."
**Dados de entrada** | E-mail:naoexiste@organizapro.com    senha:senhaerrada
**Resultado obtido** | Sucesso

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - Login com dados validos*                                         |
|---|---|
|Requisito Associado | RF-002 -  A aplicação deve permitir que os usuários façam login com e-mail e senha válidos|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/4114749a91be6cd8/EZYI2v7AWKVFoaEJoSB-4QoB5onfIIchHL8bhhWw9-6UBA?e=e9M9hp| 

|*Caso de Teste*                                 |*CT02 -Login com e-mail e senha incorretos*                                        |
|---|---|
|Requisito Associado | RF-001 -A aplicação não deve permitir que usuários acessem com e-mail e/ou senha inválidos|
|Link do vídeo do teste realizado: | https://1drv.ms/v/c/4114749a91be6cd8/EUqlPYCm5L1FhD6o70MIOp4BQJyqp7mb_WwJVUyIH4K9Qg?e=XIKphz | 


## Avaliação dos Testes de Software

Durante os testes, foi avaliada a funcionalidade de login com diferentes entradas, a fim de verificar o comportamento do sistema em situações comuns de uso. Foram incluídas tentativas com credenciais válidas e inválidas, permitindo identificar pontos fortes e aspectos a melhorar.\

*Pontos positivos:
A aplicação apresenta interface bem estruturada, com layout organizado e tipografia legível.

O login com dados corretos funcionou conforme esperado, redirecionando o usuário à página inicial.

O sistema respondeu adequadamente a entradas inválidas, exibindo mensagens de erro consistentes.

*Pontos a melhorar:
Identificamos um problema no botão de visualização da senha, cujo ícone é duplicado a cada clique, afetando a clareza visual.

Apesar da funcionalidade estar implementada, o grupo pretende aprimorar o design, ajustando elementos gráficos para tornar a interface mais atraente.

*Próximas ações:
Corrigir o comportamento do botão de visualização da senha para que o ícone seja atualizado corretamente.

Implementar melhorias visuais pontuais, mantendo a usabilidade e estrutura atual.

Realizar novos testes após as correções, seguindo a abordagem iterativa adotada pelo grupo.

Durante os testes, o grupo percebeu a importância de dar atenção especial aos pequenos detalhes que impactam diretamente a experiência do usuário. Cuidar desses aspectos é fundamental para garantir a qualidade e a coerência da aplicação como um todo.


]## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

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
| 1             | Você é um gerente de equipe em uma instituição e precisa registrar um novo procedimento de trabalho para um funcionário. Acesse o painel de controle da plataforma, preencha os dados do procedimento e salve o novo procedimento. |
| 2             | Imagine que você é um funcionário da organização. Acesse a página inicial da plataforma, localize um dos procedimentos atribuídos a você e altere o status para "A fazer", "Fazendo" ou "Concluído", ou adicione aos favoritos para facilitar o acompanhamento. |



## Registro de Testes de Usabilidade

Cenário 1: Você é um gerente de equipe em uma instituição e precisa registrar um novo procedimento de trabalho para um funcionário. Acesse o painel de controle da plataforma, preencha os dados do procedimento e salve o novo procedimento.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 28.02 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |


    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.


Cenário 2:Imagine que você é um funcionário da organização. Acesse a página inicial da plataforma, localize um dos procedimentos atribuídos a você e altere o status para "A fazer", "Fazendo" ou "Concluído", ou adicione aos favoritos para facilitar o acompanhamento.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante (por exemplo, 113 segundos — média usuários — contra 25 segundos — especialista — no cenário três), e ainda os comentários feitos por alguns usuários, entendemos haver oportunidades de melhoria na usabilidade da aplicação.



