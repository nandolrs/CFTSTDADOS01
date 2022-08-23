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

* CloudFormation: o pulo-do-gato, permite criar infraestrutura utilizando código através de modelos (templates) e pilhas (stacks).

Teremos visto todos estes serviços quando chegarmos na parte final (parte 3).

## Acessando o console AWS
Para começar precisamos ter uma conta na AWS. Se você não tiver, recomendo criar uma, pois a AWS permite utilizar alguns serviços sem custo algum por 12 meses. Depois de criar uma conta você receberá as credenciais de acesso (usuário, senha, …) e poderá acessar o console da AWS. O painel de controle (dashboard) do console é a primeira ferramenta que nos é apresentada. Nele você tem acesso a informações como: conta, usuário logado, movimentos de cobrança (billing), algumas dicas pra iniciar, últimos serviços utilizados, alertas sobre indisponibilidade, informações sobre saúde dos serviços, etc.

<img width="670" alt="Console AWS" src="https://user-images.githubusercontent.com/34346597/185965609-deb28a4b-5c7b-4f42-a2b3-7b2b0a4ad206.png">

## Provisionando MySQL (RDS)
Utilizando o console vamos acessar o serviço RDS onde basicamente iremos: dimensionar um servidor e indicar o MySQL como produto desejado. Depois de provisionado o serviço, poderemos nos conectar no banco de dados relacional usando um cliente SQL e rodar nossos scripts para criar a base de dados desejada.

<img width="354" alt="f01-rds" src="https://user-images.githubusercontent.com/34346597/185968666-e046cc44-35af-4336-bd23-ee07e885c4be.png">


## Baixando o nível
Calma, não se preocupe! Baixar o nível não significa que iremos dizer palavrões daqui pra frente, mas sim, iremos dar uma olhada um pouco mais de perto no problema. Para usar o RDS precisamos responder a algumas perguntas bem fundamentais no console RDS: qual região (Region), quais as zonas de disponibilidade (AZ),qual a versão do MySQL, o serviço será exposto na internet (público) ou privado, quais os atributos do banco de dados que desejamos [o nome da instância, as credenciais de acesso (usuário e senha) do administrador para nos conectar, quanto ao armazenamento (tamanho, tipo, velocidade,etc)], etc.

<img width="464" alt="f05-rds-instance" src="https://user-images.githubusercontent.com/34346597/185968966-aa546ebb-f828-4257-8905-7606f3fe47e3.png">

Minutos depois … de informar os dados da configuração desejada, finalmente selecionamos o botão Create database e a AWS trata de criar a infraestrutura desejada.

<img width="460" alt="f05-rds-createDatabase" src="https://user-images.githubusercontent.com/34346597/185969161-8d79f470-6bbd-4875-9a03-02b6d4589d08.png">

Você pode acompanhar a situação do serviço sendo criado pelo console do RDS. No nosso caso criamos uma instância de dados chamada **dbnegritando** e você pode observar a situação **Creating** indicando que a instância está sendo criada.

<img width="753" alt="f08-rds-criandoDatabase" src="https://user-images.githubusercontent.com/34346597/185969313-1da983a2-a088-4ef5-84c9-2e9eb845f2b9.png">

Após a criação do serviço podemos podemos dar uma olhada no endpoint de conexão.

<img width="188" alt="f06-rds-conectivity-endpoint" src="https://user-images.githubusercontent.com/34346597/185969435-272da6d8-c316-4684-b7da-c6c444d29054.png">

Com o endpoint podemos nos conectar no serviço utilizando um cliente SQL. Utilizamos o [Workbench](https://dev.mysql.com/downloads/workbench/) e obtivemos sucesso na conexão.

<img width="594" alt="f09-rds-conectando" src="https://user-images.githubusercontent.com/34346597/185969505-2777d4ab-867d-401d-b090-7133745d75fa.png">

Existe uma técnica que é a modelagem de dados. Nela construímos um modelo onde são documentados todos os objetos do banco de dados (tabelas, relacionamentos, domínios de colunas, etc). Com este modelo podemos gerar scripts para efetivamente criar a estrutura modelada. Em nosso modelo, entre outros objetos, desenhamos as tabelas: Usuario, UsuarioSenha e UsuarioToken. O script completo você encontra no [git](https://github.com/nandolrs/CFTSTDADOS01/blob/master/CFTSTDADOS01/sql/gerar_database.sql) para baixar. Com a conexão rodamos os scripts necessários na base de dados para criar os objetos desejados.

<img width="724" alt="f10-rds-sqlScript" src="https://user-images.githubusercontent.com/34346597/185969579-2fa0d162-5c74-431e-92a5-18f9db0d2585.png">


## CloudFormation (o pulo-do-gato)
Era uma vez, uma pequena organização (empresa, ONG, etc) local com atuação em seu bairro apenas e que precisava de uma pequena infraestrutura de banco de dados. Com o console RDS conseguiriamos em alguns minutos/horas criar uma infraestrutura que atenda a demanda com sucesso. Mas assim como a natureza, nada é para sempre, ou seja, com o passar do tempo e bom desempenho (qualidade, talento, trabalho, sorte, …) ,a pequena empresa cresce. Crescer significa mais funcionários, uma nova instalação física no nordeste quem sabe, novos parceiros, fornecedores, aquisições, novos mercados (talvez até fora do bairro ,cidade ,estado ,país ,continente) e uma nova infraestrutura. 

Replicar esta infraestrutura atende às mudanças? sim? Como replicar exatamente esta estrutura em outro local talvez? Quais os atributos utilizados nesta configuração? Alguém lembra/sabe? Onde estão as pessoas envolvidas? Já sairam ou continuam na organização?

Replicar não atende? Não vamos jogar tudo fora. Vamos pegar o que deu certo nesta estrutura e manter. Vamos identificar os novos serviços e incorporá-los. Vamos evoluir esta estrutura. Uma análise de impacto seria muito útil para identificar o que fica e o que muda.

E depois? Como disseminar isto na organização? Para que todos utilizem, repliquem quando for necessário, de uma forma rápida e intolerante à interpretações equivocadas?

Foi muito legal fazer isto pelo console do RDS, mas por favor, não faça isto. Existe uma forma muito melhor: [CloudFormaion](https://aws.amazon.com/pt/cloudformation/). Infraestrutura como código. A grosso modo significa codificar a infraestrutura (banco de dados, balanceadores de carga, etc). Utilizando modelos (templates), pilhas (stacks) e análises de impacto (change sets). Podendo ser aplicado  quando e onde (Region, AZ, Organização, etc) for necessário. Você codifica sua infraestrutura utilizando templates (texto em YAML e JSON), cria pilhas (stacks) informando o template a ser executado. Recebe verdadeiras análises de impacto (change sets) pois quando precisar alterar a infraestrutura/pilha  (stack)  a ferramenta lhe proporcionará uma visão dos eventos (inclusão,exclusão, etc) que todos os objetos deverão passar. Pode utilizar parâmetros, aplicar condições, fazer relações,  exportar objetos para serem reutilizados, etc. 


### Seções do CloudFormation
Não quero (e nem me atrevo) dar um treinamento de CloudFormation em poucas linhas, só pra dar uma noção do tamanho do bicho existem cursos inteiros falando apenas de CloudFormation, mas vamos ver uma pequena visão da estrutura. No template que colocamos neste artigo você vai encontrar 2 seções: **[Parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html)** e **[Resources](https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/resources-section-structure.html)**. 
* Parameters: é uma seção que tem como objetivo a reutilização do template. Nela você encontra todos os parâmetros necessários à execução do template.  Podemos utilizar este mesmo template para criar vários recursos na cloud com atributos diferentes. Esta marcação acaba gerando um campo em um formulário para que possa ser informado. No fragmento de código abaixo temos a definição de um parâmetro (e seus atributos) que recebe a senha a ser utilizada na criação do recurso. Com isto podemos gerar recursos com senhas diferentes sempre utilizando o mesmo template.

```
  DBPassword:
    NoEcho: 'true'
    Description: Senha de acesso da base de dados MySQL.
    Type: String
    MinLength: '8'
    MaxLength: '41'
    AllowedPattern: '[a-zA-Z0-9]*'
    ConstraintDescription: Deve conter somente caracteres.
```
* Resource: é uma seção que tem como objetivo definir os recursos que serão criados durante a execução do template. Nela você encontra todos os recursos (e seus [tipos](https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)) que serão criados durante a execução do template.  No fragmento de código abaixo temos a definição de um recurso do tipo DBInstance, ou seja, uma instância DB do serviço RDS. Observe que no meio da definição você encontra o atributo **MasterUserPassword**  fazendo referência ao parâmetro **DBPassword** que citamos no tópico de parâmetros acima. 

```
  CMJRDSDBInstance:
    Type: 'AWS::RDS::DBInstance'
    Properties:
      MasterUserPassword: !Ref DBPassword
      DBInstanceIdentifier: !Ref DBInstanceID
      DBName: !Ref DBName
      DBInstanceClass: !Ref DBInstanceClass
      StorageType : 'gp2'
      AllocatedStorage: !Ref DBAllocatedStorage
      Engine: MySQL
      EngineVersion: "8.0.28" 
      MasterUsername: !Ref DBUsername
      MonitoringInterval: '0'
      PubliclyAccessible : 'true'
      VPCSecurityGroups : 
        - !Ref CMJRDSSecurityGroup
      BackupRetentionPeriod: '0'

```
## Provisionando MySQL (RDS)
Primeiro vamos desfazer tudo. Vou excluir a instância MySQL utilizando o console.

<img width="365" alt="f14-rds-delete" src="https://user-images.githubusercontent.com/34346597/185969696-03b089ed-83f9-4cea-8fed-88fbaec631c0.png">

Depois vou acessar o serviço de CloudFormation e utilizar um template que eu criei. Você encontra o template no [git](https://github.com/nandolrs/CFTSTDADOS01/blob/master/CFTSTDADOS01/aws/rds-mysql-negritando-treinamento.yaml).

<img width="626" alt="f11-cloudformation-rds-script" src="https://user-images.githubusercontent.com/34346597/185969797-9bb2d962-d9c8-448a-a8e3-9381e16f969c.png">

Vamos acessar a ferramenta de CloudFormation e informar o arquivo de template (stack).

<img width="641" alt="f12-cloudformation-entrada" src="https://user-images.githubusercontent.com/34346597/185969959-0ad610e2-3310-4fb1-a16a-64f3960b0c7c.png">
<img width="603" alt="f13-cloudformation-entrada" src="https://user-images.githubusercontent.com/34346597/185969987-eb3d22c9-d08d-4092-9fb5-d66cacb47daa.png">

Depois de carregar o arquivo de template podemos visualizá-lo no designer do serviço. Podemos ver 2 objetos modelados e o relacionamento de  dependência entre eles.

<img width="510" alt="f15-cloudformation-designer" src="https://user-images.githubusercontent.com/34346597/185970076-cbc76162-29f1-4356-b4b2-bc9e33ce47d6.png">

Ao executar o template a ferramenta identifica os parâmetros (e seus valores padrão) e monta um formulário para que possamos informar os dados desejados.

<img width="504" alt="f16-cloudformation-rds-dbnegritando" src="https://user-images.githubusercontent.com/34346597/185970272-b90c5290-4634-4d27-8815-ed237bedd311.png">

Podemos dar uma última revisada nos dados informados antes mandar executar o template.

<img width="499" alt="f17-cloudformation-rds-dbnegritando-revisao" src="https://user-images.githubusercontent.com/34346597/185970331-e73e1c38-353b-44e7-9d42-4f158bbc5595.png">

Olha só! AWS trabalhando pra criar o serviço desejado. Vamos esperar um pouco enqanto ela trabalha pra criar a instâcia MySQL.

<img width="534" alt="f18-cloudformation-rds-negritando-progress" src="https://user-images.githubusercontent.com/34346597/185970468-48420446-da0b-41f4-b57b-afa7505c5627.png">


Nem tudo são flores. Houve um erro no meio da execução da pilha (stack) e automaticamente o desfazer (rollback) é acionado para que tudo seja desfeito, ou seja, nada fica pela metade.

<img width="535" alt="f19-cloudformation-rds-negritando-erro" src="https://user-images.githubusercontent.com/34346597/185970703-86e15c4f-fef6-4bd1-a6f0-04b01eb2f263.png">

<img width="702" alt="f20-cloudformation-rds-negritando-erro-detalhe" src="https://user-images.githubusercontent.com/34346597/185970737-8925c6d4-4959-425c-a03a-deba15fc4d0f.png">

O problema era a versão 8.0.16 não estar mais disponível. Ajustei para a versão 8.0.28 e olha no que deu! COMPLETE!ASEYORI! SUCESSO! FOI PRA CONTA! FECHOU!É NOIZ!

<img width="636" alt="f21-cloudformation-rds-negritando-sucesso" src="https://user-images.githubusercontent.com/34346597/185970842-b8ca4cba-7341-4b13-af2d-9367b7e2268b.png">

Daqui pra frente não tem mais novidade. O serviço tá de pé, ou seja, temos uma instância MySQL disponível. Podemos abrir o client SQL Workbench, conectar no endpoint do serviço MySQL e bla-bla-bla.

## Considerações finais
Espero que esta publicação tenha sido útil de alguma forma. Na próxima veremos como subir um container gerado com Docker onde teremos empacotado e pronto pra viagem a camada de negócio (business tier) da solução onde utilizamos .Net Core e C# exposta como API Web.

Muito Axé pra todo mundo.


Voltar ao [artigo mãe](https://github.com/nandolrs/CFTSTDADOS01) 

<img width="599" alt="aws-certified-developer-architect" src="https://user-images.githubusercontent.com/34346597/186031305-723d7cde-d9b7-4652-b7b2-c0ba750d474b.png">

