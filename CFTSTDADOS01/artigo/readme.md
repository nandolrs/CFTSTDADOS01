# Implantando uma solução utilizando AWS e Docker (Parte 1 de 3, data tier)


Alguns dizem que o mundo ideal é aquele em que não existem problemas. Eu acredito que o mundo ideal é aquele em que as palavras: problema e solução, estão na mesma frase e o tempo a favor dos atores. Não adianta resolver o problema da fome mundial depois que todos morreram desnutridos. Ter a solução no momento errado é o mesmo que nada ter. Não basta mover-se, mas é vital mover-se rapidamente e/ou no momento certo.

Vamos juntos dar uma olhada, alto nível ou seja meio de longe ignorando os detalhes, em como implantar uma solução baseada em multi-camadas (front, back e data) de uma forma rápida, altamente disponível e tolerante à falhas.

Mas primeiro, precisamos construir um vocabulário pra entender a coisa toda e vou colocar (termo) pra destacar. Os serviços ([services](https://aws.amazon.com/pt/products/?nc2=h_ql_prod_fs_f&aws-products-all.sort-by=item.additionalFields.productNameLowercase&aws-products-all.sort-order=asc&awsf.re%3AInvent=*all&awsf.Free%20Tier%20Type=*all&awsf.tech-category=*all)) baseados em nuvem ([cloud](https://silvio.meira.com/silvio/informtica-nas-nuvens-quando/)) estão disponíveis em praticamente todos continentes do globo terrestre. Distribuições baseadas em container ([Docker](https://www.docker.com/)) reduziram muito o tempo necessário para implementar, empacotar/guardar, testar e implantar soluções de forma segura e com qualidade.

## O mundo em suas mãos
A cloud da [AWS](https://aws.amazon.com/pt/) se organiza em regiões ([Regions](https://aws.amazon.com/pt/about-aws/global-infrastructure/regions_az/)) que são compostas por zonas de disponibilizade (AZ). Por exemplo: Brasil, Africa e Canadá possuem 1 região cada. América do norte possui 4 regiões. Europa possui 6 regiões. Asia possui 8 regiões. O nome da região do Brazil é **sa-east-1**. Alguns dos serviços disponibilizados são globais, ou seja, não estão limitados a uma região, como é o caso do **IAM** (Identity and Acess Management) utilizado para gerenciar acessos. Outros são limitados por região, como é o exemplo do **EC2**; isto significa que se você precisar de um servidor no Brasil deverá solicitá-lo na região sa-east-1 e assim sucessivamente. Outra palavrinha que precisamos é a VPC ([Virtual Private Cloud](https://docs.aws.amazon.com/pt_br/vpc/latest/userguide/what-is-amazon-vpc.html))  , ou seja,uma área segura onde os recursos são disponibilizados e as AZ se localizam, etc.

![Abstração de uma VPC, Regions e AZ](https://user-images.githubusercontent.com/34346597/185959999-5f177b2e-4752-4978-b6e9-7901b3d574bb.png)

## Arquitetura e serviços
A solução que vamos subir/implantar (deploy) utiliza basicamente 3 camadas: dados, regras de negócio e apresentação. Respectivamente uma base de dados relacional [MySQL](https://www.mysql.com/) (data tier), uma API [.Net Core](https://dotnet.microsoft.com/en-us/) (business tier) e [React](https://reactjs.org/) (presentation tier ou User Interface -UI). Levar isto para a nuvem da AWS significa utilizar 4 serviços e algumas ferramentas que são uma mão na roda:

* RDS: disponibiliza bases de dados relacionais utilizando produtos consagrados no mercado como: Oracle, MS SQL Server, MySQL, PostgreSQL, Amazon Aurora, etc;

* ECS: possibilita rodar containers na AWS utilizando artefatos como imagens, serviços, tarefas, etc;

* EC2: permite provisionar servidores virtuais, balanceadores de cargas, etc;

* Route 53: disponibiliza servidores DNS, registros de domínio, etc.

* CloudFormation: o pulo-do-gato, permite criar infraestrutura utilizando código através de modelos (templates).

Teremos visto todos estes serviços quando chegarmos na parte final (parte 3).

## Acessando o console AWS
Para começar precisamos ter uma conta na AWS. Se você não tiver, recomendo criar uma, pois a AWS permite utilizar alguns serviços sem custo algum por 12 meses. Depois de criar uma conta você receberá as credenciais de acesso (usuário, senha, …) e poderá acessar o console da AWS. O painel de controle (dashboard) do console é a primeira ferramenta que nos é apresentada. Nele você tem acesso a informações como: conta, usuário logado, movimentos de cobrança (billing), algumas dicas pra iniciar, últimos serviços utilizados, alertas sobre indisponibilidade, informações sobre saúde dos serviços, etc.

<img width="670" alt="Console AWS" src="https://user-images.githubusercontent.com/34346597/185965609-deb28a4b-5c7b-4f42-a2b3-7b2b0a4ad206.png">

## Provisionando MySQL (RDS)
Utilizando o console vamos acessar o serviço RDS onde basicamente iremos: dimensionar um servidor e indicar o MySQL como produto desejado. Depois de provisionado o serviço, poderemos nos conectar no banco de dados relacional usando um cliente SQL e rodar nossos scripts para criar a base de dados desejada.

## Baixando o nível
Calma, não se preocupe! Baixar o nível não significa que iremos dizer palavrões daqui pra frente, mas sim, iremos dar uma olhada um pouco mais de perto no problema. Para usar o RDS precisamos responder a algumas perguntas bem fundamentais no console RDS: qual região (Region), quais as zonas de disponibilidade (AZ),qual a versão do MySQL, o serviço será exposto na internet (público) ou privado, quais os atributos do banco de dados que desejamos [o nome da instância, as credenciais de acesso (usuário e senha) do administrador para nos conectar, quanto ao armazenamento (tamanho, tipo, velocidade,etc)], etc.

Minutos depois … de informar os dados da configuração desejada, finalmente selecionamos o botão Create database e a AWS trata de criar a infraestrutura desejada.

Você pode acompanhar a situação do serviço sendo criado pelo console do RDS. No nosso caso criamos uma instância de dados chamada **dbnegritando** e você pode observar a situação **Creating** indicando que a instância está sendo criada.

Após a criação do serviço podemos podemos dar uma olhada no endpoint de conexão.

Com o endpoint podemos nos conectar no serviço utilizando um cliente SQL. Utilizamos o [Workbench](https://dev.mysql.com/downloads/workbench/) e obtivemos sucesso na conexão.

Existe uma técnica que é a modelagem de dados. Nela construímos um modelo onde são documentados todos os objetos do banco de dados (tabelas, relacionamentos, domínios de colunas, etc). Com este modelo podemos gerar scripts para efetivamente criar a estrutura modelada. Em nosso modelo, entre outros objetos, desenhamos as tabelas: Usuario, UsuarioSenha e UsuarioToken. O script completo você encontra no [git](https://github.com/nandolrs/CFTSTDADOS01/blob/master/CFTSTDADOS01/sql/gerar_database.sql) para baixar. Com a conexão rodamos os scripts necessários na base de dados para criar os objetos desejados.

## CloudFormation (o pulo-do-gato)
Era uma vez, uma pequena organização (empresa, ONG, etc) local com atuação em seu bairro apenas e que precisava de uma pequena infraestrutura de banco de dados. Com o console RDS conseguiriamos em alguns minutos/horas criar uma infraestrutura que atenda a demanda com sucesso. Mas assim como a natureza, nada é para sempre, ou seja, com o passar do tempo e bom desempenho (qualidade, talento, trabalho, sorte, …) ,a pequena empresa cresce. Crescer significa mais funcionários, uma nova instalação física no nordeste quem sabe, novos parceiros, fornecedores, aquisições, novos mercados (talvez até fora do bairro ,cidade ,estado ,país ,continente) e uma nova infraestrutura. 

Replicar esta infraestrutura atende às mudanças? sim? Como replicar exatamente esta estrutura em outro local talvez? Quais os atributos utilizados nesta configuração? Alguém lembra/sabe? Onde estão as pessoas envolvidas? Já sairam ou continuam na organização?

Replicar não atende? Não vamos jogar tudo fora. Vamos pegar o que deu certo nesta estrutura e manter. Vamos identificar os novos serviços e incorporá-los. Vamos evoluir esta estrutura. Uma análise de impacto seria muito útil para identificar o que fica e o que muda.

E depois? Como disseminar isto na organização? Para que todos utilizem, repliquem quando for necessário, de uma forma rápida e intolerante à interpretações equivocadas?

Foi muito legal fazer isto pelo console do RDS, mas por favor, não faça isto. Existe uma forma muito melhor: [CloudFormaion](https://aws.amazon.com/pt/cloudformation/). Infraestrutura como código. A grosso modo significa codificar a infraestrutura (banco de dados, balanceadores de carga, etc), utilizar pilhas (stacks), métodos (pipelines) e aplicar quando e onde (Region, AZ, Organização, etc) for necessário. Você codifica sua infraestrutura utilizando templates em YAML e JSON. Pode utilizar parâmetros, aplicar condições, fazer relações, pode exportar objetos para serem reutilizados, etc.

## Provisionando MySQL (RDS)
Primeiro vamos desfazer tudo. Vou excluir a instância MySQL utilizando o console.

Depois vou acessar o serviço de CloudFormation e utilizar um template que eu criei. Você encontra o template no [git](https://github.com/nandolrs/CFTSTDADOS01/blob/master/CFTSTDADOS01/aws/rds-mysql-negritando-treinamento.yaml).

Vamos acessar a ferramenta de CloudFormation e informar o arquivo de template (stack).

Depois de carregar o arquivo de template podemos visualizá-lo no designer do serviço. Podemos ver 2 objetos modelados e o relacionamento de  dependência entre eles.

Ao executar o template a ferramenta identifica os parâmetros (e seus valores padrão) e monta um formulário para que possamos informar os dados desejados.

Podemos dar uma última revisada nos dados informados antes mandar executar o template.

Olha só! AWS trabalhando pra criar o serviço desejado. Vamos esperar um pouco enqanto ela trabalha pra criar a instâcia MySQL.

Nem tudo são flores. Houve um erro no meio da execução da pilha (stack) e automaticamente o desfazer (rollback) é acionado para que tudo seja desfeito, ou seja, nada fica pela metade.

O problema era a versão 8.0.16 não estar mais disponível. Ajustei para a versão 8.0.28 e olha no que deu! COMPLETE!ASEYORI! SUCESSO! FOI PRA CONTA! FECHOU!É NOIZ!

Daqui pra frente não tem mais novidade. O serviço tá de pé, ou seja, temos uma instância MySQL disponível. Podemos abrir o client SQL Workbench, conectar no endpoint do serviço MySQL e bla-bla-bla.

## Considerações finais
Espero que esta publicação tenha sido útil de alguma forma. Na próxima veremos como subir um container gerado com Docker onde teremos empacotado e pronto pra viagem a camada de negócio (business tier) da solução onde utilizamos .Net Core e C# exposta como API Web.
Muito Axé pra todo mundo.



