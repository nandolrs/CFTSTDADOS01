# Implantando uma solução utilizando AWS e Docker (Parte 2 de 3, business tier)

 Na [parte 1 (tier data)](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01) implantamos um serviço RDS com uma instância MySQL. Nesta 2a parte iremos implantar um serviço [AWS ECS](https://aws.amazon.com/pt/ecs/) contendo as regras de negócio da solução (business tier).

 ## Requisitos da solução

 Como requisito de segurança a solução necessita de uma funcionalidade de autenticação. Durante a análise do sistema foi levantada a necessidade de uma entidade **Usuario** que terá o papel de guardar os atributos de usuário e expor operações necessárias ao processo. Foram elencadas alguma operações bem como as validações que devem ocorrer antes de cada operação do CRUD:

 * **Incluir**: é obrigatória a informação dos atributos: email, nome e senha;

* **Alterar**: é obrigatória a informação dos atributos: email, nome e senha;

* **Consultar**: é obrigatória a informação de um código positivo  e MAIOR QUE 0 (zero);

* **Pesquisar**: é obrigatória a informação de ao menos um dos atributos a serem utilizados como critério de busca;

* **Excluir**:  é obrigatória a informação de um código positivo  e MAIOR QUE 0 (zero).

Diante disto decidimos utilizar **MVC** (Model View Controller) , framework **.Net**  e como linguagem de programação **C#**. A tecnologia de container foi o **Docker**. 

## Abstraindo a camada de dados

Utilizamos uma pacote do [NuGet](https://www.nuget.org/packages/CFCOREDADOSBASE/1.0.3?_src=template) chamado [CFCOREDADOSBASE](https://www.nuget.org/packages/CFCOREDADOSBASE/1.0.3?_src=template) para abstrair a camada de dados. Ele implementa uma interface expondo os métodos que permitem a manutenção (Incluir, Alterar, Consultar, Pesquisar e Excluir) da entidade. 

## Implementando as regras de negócio

Tudo foi exposto como API (Application Programming Interface). Os fontes desta implementação você encontra no [git](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTREGRAS01). 


## Empacotando tudo utilizando container

Depois de implementado precisamos empacotar esta camada para ser distribuida. É aqui que entra o container. O projeto precisa de um arquivo Dockerfile com a imagem adequada. Aqui em baixo tem um fragmento do Dockerfile.

```
#------------------------------------------------------------------------------------------------------------
# .net 
#------------------------------------------------------------------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY CFTSTDADOS01/*.csproj      			./CFTSTDADOS01/      
COPY CFTSTREGRAS01/*.csproj			        ./CFTSTREGRAS01/        

RUN dotnet restore

# copy everything else and build app
COPY CFTSTDADOS01/.					       ./CFTSTDADOS01/        
COPY CFTSTREGRAS01/.      				   ./CFTSTREGRAS01/      

WORKDIR /app/CFTSTREGRAS01
RUN dotnet publish CFTSTREGRAS01.csproj -c Release -o out /restore

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

WORKDIR /app

COPY --from=build /app/CFTSTREGRAS01/out ./
ENTRYPOINT ["dotnet", "CFTSTREGRAS01.dll"]

```

 subir os componentes responsáveis pelo CRUD das tabelas modeladas.



