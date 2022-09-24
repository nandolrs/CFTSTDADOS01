# Implantando uma solução utilizando AWS e Docker (Parte 2 de 3, business tier)

 Na [parte 1 (tier data)](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01) implantamos um serviço RDS com uma instância MySQL. Nesta 2a parte iremos implantar um serviço [AWS ECS](https://aws.amazon.com/pt/ecs/) contendo as regras de negócio da solução (business tier).

 ## Requisitos da solução

 Como requisito de segurança a solução necessita de uma funcionalidade de autenticação. Durante a análise do sistema foi levantada a necessidade de uma entidade **Usuario** que terá o papel de guardar os atributos de usuário e expor operações necessárias ao processo. Foram elencadas alguma operações bem como as validações que devem ocorrer antes de cada operação do CRUD:

 * **Incluir**: é obrigatória a informação dos atributos: email, nome e senha;

* **Alterar**: é obrigatória a informação dos atributos: email, nome e senha;

* **Consultar**: é obrigatória a informação de um código positivo  e MAIOR QUE 0 (zero);

* **Pesquisar**: é obrigatória a informação de ao menos um dos atributos a serem utilizados como critério de busca;

 * **Autenticar**: é obrigatória a informação dos atributos: email e senha;

 * **Autorizar**: é obrigatória a informação do método desejado e token de segurança válido;

Diante disto decidimos utilizar **MVC** (Model View Controller) , framework **.Net**  e como linguagem de programação **C#**. A tecnologia de container foi o [Docker](https://www.docker.com/). 

## Abstraindo a camada de dados

Utilizamos uma pacote do [NuGet](https://www.nuget.org/) chamado [CFCOREDADOSBASE](https://www.nuget.org/packages/CFCOREDADOSBASE/1.0.3?_src=template) para abstrair a camada de dados. Ele implementa uma interface expondo os métodos que permitem a manutenção (Incluir, Alterar, Consultar, Pesquisar e Excluir) da entidade. Os fontes desta implementação você encontra no [github](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01); 

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

Agora que temos a imagem no Docker Hub podemos implantar o container na cloud utilizando o serviço AWS ECS + Fargate. Não vamos utilizar o console web mas sim novamente lançaremos mão do CloudFormation. Você encontra o template do CloudFormation no [github](https://github.com/nandolrs/CFTSTDADOS01/blob/master/CFTSTAPI01/aws/ecs-dotNet-negritando-treinamento.yaml).


## CloudFormation (o pulo-do-gato)
Não vou contar novamente aquela estória de uma pequena organização local que cresceu e precisou de uma nova estrutura e serviços. Já contei na publicação anterior que trata do data tier que você encontra [aqui](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01). 
Mas sempre vale lembrar que esta publicação é de alto nível (meio distante), justamente porque nesta publicação você encontra os templates do CloudFormation utilizados. A força do CloudFormation é justamente documentar os detalhes que realmente foram utilizados.
Mas podemos ir direto a uma breve explicação sobre as seções do CloudFormation.

### Seções do CloudFormation
Não vou voltar às definições de parâmetros e recursos, pois isto já foi abordado na publicação anterior. 

* Parâmetros: Aqui a baixo eu deixei alguns parâmetros que julgo interessante destacar. Se você ler  a documentação do serviço AWS ECS vai ver que existem, entre outros, 3 recursos que devem ser definidos: [task](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html) (tarefa), [service](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html) (serviço) e [target group](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-targetgroup.html) (grupo alvo).

 **ServiceName** e **ServiceImage**: para tornar o template reutilizável adicionei estes 2 parâmetros. Isto vai possibilitar que o nome do container e a imagem a ser utilizada sejam configuráveis em tempo de execução. No template o nome do container terá o mesmo nome do serviço. Eles serão utilizados para configurar os recursos **task** onde você utilizará para definir o nome do container e a imagem Docker a ser utilizada.

 **ContainerPort**: para tornar o template reutilizável adicionei este parâmetro. Isto vai possibilitar que a porta do container a ser utilizada seja configurável em tempo de execução. Ele será utilizado para configurar o recurso **service** onde você utilizará para definir a porta a ser utilizada pelo container.

 **ServiceHealth**:  para tornar o template reutilizável adicionei este parâmetro. Isto vai possibilitar que o caminho a ser utilizado para determinar a saúde do serviço seja configurável em tempo de execução. Ele será utilizado para configurar o recurso **target group** onde você utilizará para definir o caminho a ser utilizado para verificar a saúde do serviço. Isto é muito legal porque entramos no âmbito da disponibilidade, ou seja, uma solicitação não pode ser entregue a um serviço doente ou indisponível.

 Abaixo deixei um fragmento do arquivo Dockerfile utilizado com a definição de alguns parâmetros.
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

Abaixo deixei um fragmento do arquivo Dockerfile utilizado com a definição de alguns recursos.

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

Ao executar o template a ferramenta identifica os parâmetros (e seus valores padrão) e monta um formulário para que possamos informar os dados desejados.


