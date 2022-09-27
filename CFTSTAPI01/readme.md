# Implantando uma solução utilizando AWS e Docker (Parte 2 de 3, business tier)

 Na [parte 1 (tier data)](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01) implantamos um serviço RDS com uma instância MySQL. Nesta 2a parte iremos implantar um serviço [AWS ECS](https://aws.amazon.com/pt/ecs/) contendo as regras de negócio da solução (business tier).

 ## Requisitos da solução

 Como requisito de segurança a solução necessita de uma funcionalidade de autenticação. Durante a análise do sistema foi levantada a necessidade de uma entidade **Usuario** que terá o papel de guardar os atributos de usuário e expor operações necessárias ao processo. Foram elencadas alguma operações bem como as validações que devem ocorrer antes de cada operação do CRUD:

<ul> 
  <li>Atributos
      <ul>
        <li>email</li>
        <li>nome</li>
        <li>senha</li>
    </ul>
  </li>

  <li>Métodos
    <ul>
        <li>
          Incluir: é obrigatória a informação dos atributos: email, nome e senha;        
        </li>
        <li>
          Alterar: é obrigatória a informação dos atributos: email, nome e senha;
        </li>
        <li>
            Consultar: é obrigatória a informação de um código (ID) positivo  e MAIOR QUE 0 (zero);
        </li>
        <li>
            Pesquisar: é obrigatória a informação de ao menos um dos atributos a serem utilizados como critério de busca;        
        </li>
        <li>
            Autenticar: é obrigatória a informação dos atributos: email e senha;
        </li>     
        <li>
            Autorizar: é obrigatória a informação do método desejado e token de segurança válido;
        </li>                             
    </ul>
  </li>
  <ul>
</ul>








 
Diante disto decidimos utilizar **MVC** (Model View Controller) , framework **.Net**  e como linguagem de programação **C#**. A tecnologia de container foi o [Docker](https://www.docker.com/). 

## Abstraindo a camada de dados

Utilizamos um pacote do [NuGet](https://www.nuget.org/) chamado [CFCOREDADOSBASE](https://www.nuget.org/packages/CFCOREDADOSBASE/1.0.3?_src=template) para abstrair a camada de dados. Ele implementa uma interface expondo os métodos que permitem a manutenção (Incluir, Alterar, Consultar, Pesquisar e Excluir) da entidade. Os fontes desta implementação você encontra no [github](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01); 

## Implementando as regras de negócio

Implementamos um projeto CFTSTREGRAS01 e colocamos as regras levantadas em tempo de análise do sistema.
Os fontes desta implementação você encontra no [github](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTREGRAS01). 

## Implementando a API

Tudo foi exposto como API (Application Programming Interface) utilizando o MVC. Para a manutenção da entidade implementamos um serviço expondo os verbos:POST, UPDATE, GET,GET e DELETE; respectivamente para incluir, atualizar, consultar, pesquisar e excluir. Os fontes desta implementação você encontra no [github](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTAPI01). 


## Empacotando tudo utilizando container

Depois de implementar os projetos  precisamos empacotar tudo para serem distribuídos como uma solução única. Se montarmos uma árvore de dependência ela ficaria assim:

```
CFTSTAPI01 => CFTSTREGRAS01 => CFTSTDADOS01
```

Devemos ler da seguinte forma: CFTSTAPI01 {depende de} CFTSTREGRAS01  {depende de} CFTSTDADOS01.


Depois de implementado e testado é aqui que entra o container. Vamos gerar e subir a imagem desta camada utilizando o [Docker desktop](https://www.docker.com/). Eu to usando como IDE o Visual Studio 2022 que vem com ferramentas pra facilitar o uso de Docker. Mas vamos utilizar o _CLI_ (Command Line Interface) do _**Docker desktop**_ que você deve baixar e instalar.

O projeto precisa de um arquivo Dockerfile com a imagem adequada citando os projetos necessários. Em resumo no Dockerfile você encontra instruções que vão: copiar e compilar os fontes necessários. Aqui em baixo coloquei conteúdo do arquivo Dockerfile utilizado. O arquivo você encontra no [github](https://github.com/nandolrs/CFTSTDADOS01/blob/master/CFTSTAPI01/Dockerfile).


```
#------------------------------------------------------------------------------------------------------------
# .net 
#------------------------------------------------------------------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY CFTSTAPI01/*.csproj					       ./CFTSTAPI01/        
COPY CFTSTREGRAS01/*.csproj      			   ./CFTSTREGRAS01/      
COPY CFTSTDADOS01/*.csproj  				   ./CFTSTDADOS01/  

RUN dotnet restore

# copy everything else and build app
COPY CFTSTAPI01/.					       ./CFTSTAPI01/        
COPY CFTSTREGRAS01/.      			   ./CFTSTREGRAS01/      
COPY CFTSTDADOS01/.  				   ./CFTSTDADOS01/  

WORKDIR /app/CFTSTAPI01
RUN dotnet publish CFTSTAPI01.csproj -c Release -o out /restore

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

WORKDIR /app

COPY --from=build /app/CFTSTAPI01/out ./
ENTRYPOINT ["dotnet", "CFTSTAPI01.dll"]


```

Para gerar a imagem podemos utilizar o CLI do Docker executando o comando _build_ conforme abaixo:

```
docker build -f CFTSTAPI01\Dockerfile -t cftstapi-image .

```
<img width="913" alt="f22-docker-build" src="https://user-images.githubusercontent.com/34346597/188293490-79843bdc-c952-4e17-937d-40feb4f04922.png">

Para adicionar uma tag à imagem podemos utilizar o CLI do Docker executando o comando _tag_ conforme abaixo:

```
docker tag cftst-image nandolrs/cftstapi-image
```
<img width="631" alt="f24-docker-tag" src="https://user-images.githubusercontent.com/34346597/188293499-b9a21e12-4e6f-42ca-855a-83b1bcc8a4f1.png">

Para subir a imagem para o Docker Hub podemos utilizar o CLI do Docker executando o comando _push_ conforme abaixo (a imagem você encontra no [hub.docker](https://hub.docker.com/repository/docker/nandolrs/cftstapi-image)):

```
docker image push nandolrs/cftstapi-image
```
<img width="573" alt="f25-docker-push" src="https://user-images.githubusercontent.com/34346597/188293507-5d36839f-5d3c-42d8-aace-59b95dc343f7.png">

<img width="635" alt="f26-docker-hub-imagem" src="https://user-images.githubusercontent.com/34346597/188294574-54174e04-1e40-41df-b03d-592307b62bf5.png">

<img width="951" alt="f27-docker-hub-imagem" src="https://user-images.githubusercontent.com/34346597/188294772-71fed808-5e23-4fec-b3f3-e59d47e710f6.png">

## Implantando o container na Cloud AWS com CloudFormation

Agora que temos a imagem no **Docker Hub** podemos implantar o container na cloud da AWS utilizando o serviço AWS ECS + [Fargate](https://aws.amazon.com/pt/fargate/). Para isto precisamos criar um **cluster ECS** onde colocaremos as  **definições de tarefas**,  os **containers** e **serviços** criados a partir da imagem Docker. Iremos configurar o ECS para manter 2 tarefas vivas (instâncias de definição de tarefa). Isto significa que o ECS + Fargate irá criar um container e dentro dele criará 2 tarefas vivas. Isto significa que se por acaso uma das tarefas tiver problema, uma nova tarefa será instanciada para manter sempre 2 tarefas sendo executadas conforme desejado. Depois de tudo pronto a estrutura vai ficar parecida com isto:

<ul> 
  <li> CMJECSCluster  ::  cluster [nome=cmj]
    <ul>
      <li> CMJECSTaskDefinition  ::  definição de tarefa [nome=negritando-ecs-api]  </li>
      <li> CMJECSServiceHTTP  ::  serviço [nome=negritando-api] </li>
    </ul>
  </li>
</ul>

 Não vamos utilizar o console web mas sim novamente lançaremos mão do CloudFormation. Você encontra o template do CloudFormation no [github](https://github.com/nandolrs/CFTSTDADOS01/blob/master/CFTSTAPI01/aws/ecs-dotNet-negritando-treinamento.yaml).


## CloudFormation (o pulo-do-gato)
Não vou contar novamente aquela estória de uma pequena organização local que cresceu e precisou de uma nova estrutura e serviços. Já contei na publicação anterior que trata do data tier que você encontra [aqui](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01). 
Mas sempre vale lembrar que esta publicação é de alto nível (meio distante), justamente porque nesta publicação você encontra os templates do CloudFormation utilizados (baixo nível). A força do CloudFormation é justamente armazenar os detalhes da infraestrutura para que possa ser reulizada sempre que for necessária.
Mas podemos ir direto a uma breve explicação sobre as seções do CloudFormation.

### Seções do CloudFormation
Não vou voltar às definições de parâmetros e recursos, pois isto já foi abordado na publicação anterior. 

* Parâmetros: Aqui a baixo eu deixei alguns parâmetros que julgo interessante destacar. Se você ler  a documentação do serviço AWS ECS vai ver que existem, entre outros, 3 recursos que devem ser definidos: [task](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html) (tarefa), [service](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html) (serviço) e [target group](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-targetgroup.html) (grupo alvo).

 **ServiceName** e **ServiceImage**: para tornar o template reutilizável adicionei estes 2 parâmetros. Isto vai possibilitar que o nome do container e a imagem a ser utilizada sejam configuráveis em tempo de execução. No template o nome do container terá o mesmo nome do serviço. Eles serão utilizados para configurar os recursos **task** que você utilizará para definir o nome do container e a imagem Docker a ser utilizada.

 **ContainerPort**: para tornar o template reutilizável adicionei este parâmetro. Isto vai possibilitar que a porta do container a ser utilizada seja configurável em tempo de execução. Ele será utilizado para configurar o recurso **service** onde você utilizará para definir a porta a ser utilizada pelo container.

 **ServiceHealth**:  para tornar o template reutilizável adicionei este parâmetro. Isto vai possibilitar que o caminho a ser utilizado para determinar a saúde do serviço seja configurável em tempo de execução. Ele será utilizado para configurar o recurso **target group** onde você utilizará para definir o caminho a ser utilizado para verificar a saúde do serviço. Isto é muito legal porque entramos no âmbito da disponibilidade, ou seja, uma solicitação não pode ser entregue a um serviço doente ou indisponível.

 Abaixo deixei um fragmento do template CloudFormation com a definição de alguns parâmetros.

```
Parameters:
  ServiceName:
    Type: String
    Default: negritandoApi  
  ServiceImage:
    Type: String
    Default: nandolrs/cftstapi-image    
    # update with the name of the service
  ContainerPort:
    Type: Number
    Default: 80
  ServiceHealth:
    Type: String
    Default: /api
    # caminho do health do servico
```
* Resource: Aqui a baixo eu deixei alguns recursos que julgo interessante destacar. Se você ler  a documentação do serviço AWS ECS vai ver que existem, entre outros, 2 recursos que devem ser definidos: TaskDefinition (tarefa) e TargetGroup.

O [**TaskDefinition**](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html) você utilizará para definir vários atributos: memória, cpu,  definições de container, log, etc. Observe os parâmetros **ServiceName** e **ServiceImage** citados acima entre os atributos e utilizados a baixo no recurso.

O [**TargetGroup**](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-targetgroup.html) você utilizará para definir vários atributos: o nome do recurso, a porta do container, intervalos de verificação de saúde, o caminho a ser utilizado na verificação de saúde, a quantidade de verificações de saúde a serem realizadas antes de considerar o serviço doente ou indisponível, etc. Observe o parâmetro **ContainerPort** citado acima entre os atributos utilizados a baixo no recurso.

Abaixo deixei um fragmento do templace CloudFormation com alguns recursos.

```
  CMJECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      RequiresCompatibilities:
        - FARGATE
      NetworkMode: awsvpc
      Memory: 4096
      Cpu: 512
      ExecutionRoleArn: !Ref CMJECSIamRoleEcsTasksExecution
      TaskRoleArn : !Ref CMJECSIamRoleEcsTasks
      ContainerDefinitions:
        - Name:  !Ref ServiceName
          Image: !Ref ServiceImage
          PortMappings:
            - ContainerPort: !Ref ContainerPort
          # envia os logs ao CloudWatch 
          LogConfiguration:
            LogDriver: awslogs
            Options:
              awslogs-region: !Ref AWS::Region
              awslogs-group: !Ref LogGroup
              awslogs-stream-prefix: ecs
          Environment :
            - Name: CMJ_AMBIENTE
              Value : !Ref EnviromentName
            - Name: REACT_APP_SERVER_URL
              Value : !Ref EnviromentNameApi              


  TargetGroupHTTP:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      HealthCheckIntervalSeconds: 10
      # espera pelo codigo de status  200 por padrao, a menos que especifique outro
      HealthCheckPath: !Ref ServiceHealth
      HealthCheckTimeoutSeconds: 5
      UnhealthyThresholdCount: 2
      HealthyThresholdCount: 2
      Name: !Join ['', [!Ref ServiceName, TargetGroup]]
      Port: !Ref ContainerPort
      Protocol: HTTP
      TargetGroupAttributes:
        - Key: deregistration_delay.timeout_seconds
          Value: 60 # padrao e 300
      TargetType: ip
      VpcId: !Ref VPC

```

## Provisionando Container Docker (ECS)
Vou acessar o serviço de CloudFormation e utilizar um template que eu criei. Você encontra o template no [git](https://github.com/nandolrs/CFTSTDADOS01/blob/master/CFTSTAPI01/aws/ecs-dotNet-negritando-treinamento.yaml).

<img width="550" alt="f44-cloudformation-ecs-script" src="https://user-images.githubusercontent.com/34346597/192105228-44bad5c6-b48b-42af-b906-8fe78728876a.png">

Vamos acessar a ferramenta de CloudFormation e informar o arquivo de template (stack).

<img width="641" alt="f12-cloudformation-entrada" src="https://user-images.githubusercontent.com/34346597/185969959-0ad610e2-3310-4fb1-a16a-64f3960b0c7c.png">

<img width="573" alt="f45-cloudformation-entrada-ecs" src="https://user-images.githubusercontent.com/34346597/192105724-d646837f-d33c-4bf6-a579-074bb840d89f.png">

Depois de carregar o arquivo de template podemos visualizá-lo no designer do serviço. Podemos ver os objetos modelados e o relacionamento de  dependência entre eles.

<img width="951" alt="f46-cloudformation-designer-ecs" src="https://user-images.githubusercontent.com/34346597/192105953-f2c27e60-d0ee-42b1-9e4b-b2eb57445a5a.png">

Ao executar o template a ferramenta identifica os parâmetros (e seus valores padrão) e monta um formulário para que possamos informar os dados desejados. Observe os parâmetros que informei: 
* **ContainerPort**: vamos utilizar a porta 80 HTTPS para nos  comunicar com o container.

* **LoadBalancePort**: não falamos sobre LoadBalance, é um ótimo assunto para uma próxima publicação. Mas dá para contar uma estorinha pra entender: digamos que tu tem uma loja com 1 funcionário. Todos os clientes que chegarem na sua loja serão atendidos por este único funcionário. Ele consegue atender 3 pessoas de cada vez muito bem, só que entra uma 4a pessoa e esta fica esperando tempo demasiado. Para que esta pessoa não vá embora insatisfeita com a demora no atendimento, voce coloca uma 2a pessoa para atender por algum tempo e então você divide a fila de clientes pois agora existem 2 funcionários, passando a conduzir o próximo cliente sempre para o funcionário que estiver disponível. Em um cenário ideal com 10 clientes, cada funcionário atenderá 5 clientes, ou seja, existirá um equilíbrio (balanceamento) no atendimento.
Temos também o que chamamos de **AutoScaling.**. AutoScaling tem o papel de aumentar a quantidade de funcionários atendendo quando o movimento aumenta e reduzir a quantidade de funcionários quando o movimento diminui.  Quando você percebe que o movimento diminui torna a deixar apenas 1 pessoa atendendo retirando assim a 2a pessoa. AutoScaling é a funcionalidade que vai adicionar ou remover funcionários quando for necessário para que seus clientes se sintam satisfeitos com o atendimento da loja.

<img width="563" alt="f47-cloudformation-ecs-negritandoApi" src="https://user-images.githubusercontent.com/34346597/192106260-3f0de112-31c6-45e1-a38f-af1f8aeac740.png">
<img width="571" alt="f48-cloudformation-ecs-negritandoApi" src="https://user-images.githubusercontent.com/34346597/192106261-c2e8b0de-806f-452d-bffc-5477ae450aea.png">

Podemos dar uma última revisada nos dados informados antes mandar executar o template.

<img width="566" alt="f49-cloudformation-ecs-negritandoApi-revisao" src="https://user-images.githubusercontent.com/34346597/192107551-02943eed-9d06-4be8-93d5-f82c5c640a59.png">

**ChangeSet**: vou mostrar agora uma funcionalidade muito útil do CloudFormation que não mostrei na primeira parte desta publicação quando discutimos o data tier: as análises de impacto (ChangeSet). ChangeSet te dá uma visão atencipada de tudo que vai mudar  (inclusões, exclusões, alterações) na tua infraestrutura. Todos os recursos que irão sofrer algum tipo de impacto irão aparecer, basta você decidir se quer ou não continuar com a aplicação/execução do template CloudFormation.
Para isto basta selecionar o botão **Create change set**.

<img width="567" alt="f30-cloudformation-ecs-negritandoApi-changeSet" src="https://user-images.githubusercontent.com/34346597/192107934-e3e94a57-5a8b-4f73-8fae-bbb7fdc55eef.png">

Observe que na seção **Changes** são listados os Recursos (id, tipo, ...) e a ação que os mesmos irão sofrer. No nosso cenário, na primeira linha, vemos que um recurso do tipo AWS::ECS::Cluster, ID CMJECSCluster será adicionado.


<img width="885" alt="f33-cloudformation-ecs-negritandoApi-changeSet" src="https://user-images.githubusercontent.com/34346597/192108076-d20251d9-9ffb-4951-b38b-806d34ded31d.png">


<img width="892" alt="f34-cloudformation-ecs-negritandoApi-changeSet" src="https://user-images.githubusercontent.com/34346597/192108295-c98ef16c-223a-44b1-a034-1577de6a6a6f.png">

Olha só! AWS trabalhando pra criar o serviço desejado. Vamos esperar um pouco enquanto ela trabalha pra criar o cluster ECS e os serviços contendo o container tão desejado rodando.

<img width="921" alt="f37-cloudformation-ecs-negritandoApi-progress" src="https://user-images.githubusercontent.com/34346597/192108462-87eb8ecd-1da2-491e-9856-5ee2ce697d2f.png">

Lembrando que nem tudo são flores. Houve um erro no meio da execução da pilha (stack) e automaticamente o desfazer (rollback) é acionado para que tudo seja desfeito, ou seja, nada fica pela metade.

<img width="912" alt="f36-cloudformation-ecs-negritandoAPI-erro" src="https://user-images.githubusercontent.com/34346597/192108706-05756136-6394-4fc3-a1dc-f1c0d3ad51f6.png">



O problema foi resolvido e olha no que deu! COMPLETE!ASEYORI! SUCESSO! FOI PRA CONTA! FECHOU!É NOIZ!

Aqui temos a situação e informações  da pilha (Stack info). Entenda por pilha como lista de tarefas que a AWS constroi a partir da leitura e interpretação do template CloudFormation. Cada item da lista é a criação de um recurso.
 
<img width="913" alt="f38-cloudformation-ecs-negritandoApi-sucesso" src="https://user-images.githubusercontent.com/34346597/192109107-89b1468a-8c64-44e5-a90b-4b9a84bd9b54.png">

Aqui temos os eventos que a pilha disparou (Events).

<img width="915" alt="f39-cloudformation-ecs-negritandoApi-sucesso" src="https://user-images.githubusercontent.com/34346597/192109108-d76ea43e-e3ea-4870-828d-42a6f4884b4d.png">

Aqui temos os recursos que a pilha criou (Resources). Observe o recurso com o ID físico (o que existe de fato) com o nome **cmj** e o ID lógico (o que foi modelado no template CloudFormation) como o nome **CMJECSCluster**. Ele **cmj** é o nosso cluster ECS vivo. Vamos dar uma olhada nele mais pra frente. 

<img width="907" alt="f40-cloudformation-ecs-negritandoApi-sucesso" src="https://user-images.githubusercontent.com/34346597/192109100-c53a7b25-1835-4423-98d0-ce7686155d07.png">
<img width="912" alt="f41-cloudformation-ecs-negritandoApi-sucesso" src="https://user-images.githubusercontent.com/34346597/192109105-da9b5be6-217f-4276-b17f-1955e7ed638d.png">

Aqui temos o cluster ECS vivo. Temos 2 tarefas rodando. Entenda tarefa como uma instância da definição da tarefa, ou seja, o container já rodando. Observe que o provider é o Fargate que suporta Container Docker.

<img width="753" alt="f50-cloudformation-ecs-negritandoApi-cluster" src="https://user-images.githubusercontent.com/34346597/192111639-10f7fec8-a1c9-427c-b6db-1572fb211bf8.png">

Abrindo o cluster **cmj** podemos ver os serviços, tarefas, etc. O nome do serviço é **negritandoApi** como informamos no parâmetro lá atrás no formulário do Template.

<img width="729" alt="f51-cloudformation-ecs-negritandoApi-service" src="https://user-images.githubusercontent.com/34346597/192111863-631a2de1-8487-485e-b2b6-18d10dbf5594.png">

Temos 2 tarefas rodando (running) segundo a definição de tarefa. Na verdade consumimos as tarefas e as acessamos através do serviço. O serviço é apenas uma forma de se chegar na tarefa rodando. A tarefa vai estar dentro de um container e é nela (na tarefa) que teremos a API rodando.
<img width="724" alt="f52-cloudformation-ecs-negritandoApi-task" src="https://user-images.githubusercontent.com/34346597/192111976-8bbd5a12-3a4b-4086-9efd-a68bcaac8c76.png">

E por falar em tarefa, aqui vemos a definição da tarefa. Podemos ver a configuração de cpu, memória, imagem docker, etc.

<img width="748" alt="f53-cloudformation-ecs-negritandoApi-taskDefiniton" src="https://user-images.githubusercontent.com/34346597/192112231-fd1dd013-d745-4e8c-a6c9-60d3c0ff027c.png">

Mas voltemos ao serviço que é por onde conseguimos acessar a tarefa, ou seja, a API que tanto queremos. Observe que no serviço temos 2 tasks rodando (Tasks). Temos também um load balance (balanceador de carga) dizendo que tem 2 alvos (Total targets), ambos estão saudáveis (Healthy targets) e nenhum está doente (indisponível). Pelos gráficos podemos interpretar que tá sobrando CPU e a memória está sendo bem utilizada.

<img width="751" alt="f54-cloudformation-ecs-negritandoApi-serviceHealth" src="https://user-images.githubusercontent.com/34346597/192112402-0a35dff2-aa01-44a4-9c62-bd65bf033275.png">


Vamos dar uma olhada na rede, finalmente quero ver se a API vai responder. Lembre-se que implementamos um método (endpoint) para verificar se ele está saudável o qual nos devolverá a literal **'eu estou vivo'** em caso de sucesso (saúde). Em **DNS names** encontramos o endoint do balanceador de carga (load balance) que tem o papel de receber a requisição e fazer a ligação com o serviço (que faz a ligação com a task/container).

<img width="762" alt="f55-cloudformation-ecs-negritandoApi-serviceNet" src="https://user-images.githubusercontent.com/34346597/192113190-90e1793f-ce3b-4450-96d7-116a756033d6.png">

Daqui pra frente não tem mais novidade. O serviço tá de pé, ou seja, temos um cluster ECS com uma tarefa sendo acessível por um serviço disponível. Podemos abrir o client, no caso um navegador web qualquer, e conectar no endpoint do serviço e bla-bla-bla.

<img width="960" alt="f56-cloudformation-ecs-negritandoApi-vivo" src="https://user-images.githubusercontent.com/34346597/192113493-c73950a8-e992-4803-9744-d256b98e3132.png">

## Considerações finais
Espero que esta publicação tenha sido útil de alguma forma. Na próxima veremos como subir um container gerado com Docker onde teremos empacotado e pronto pra viagem a camada de interface do usuário (UI tier) da solução onde utilizamos [React](https://reactjs.org/).

Muito Axé pra todo mundo.


Voltar ao [artigo mãe](https://github.com/nandolrs/CFTSTDADOS01) 

<img width="599" alt="aws-certified-developer-architect" src="https://user-images.githubusercontent.com/34346597/186031305-723d7cde-d9b7-4652-b7b2-c0ba750d474b.png">

