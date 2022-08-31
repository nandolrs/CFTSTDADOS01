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

Utilizamos uma pacote do [NuGet](https://www.nuget.org/packages/CFCOREDADOSBASE/1.0.3?_src=template) chamado [CFCOREDADOSBASE](https://www.nuget.org/packages/CFCOREDADOSBASE/1.0.3?_src=template) para abstrair a camada de dados. Ele implementa uma interface expondo os métodos que permitem a manutenção (Incluir, Alterar, Consultar, Pesquisar e Excluir) da entidade. Os fontes desta implementação você encontra no [github](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01); 

## Implementando as regras de negócio

Implementamos um projeto CFTSTREGRAS01 e colocamos as regras levantadas em tempo de análise do sistema.
Os fontes desta implementação você encontra no [github](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTREGRAS01). 

## Implementando a API

Tudo foi exposto como API (Application Programming Interface) utilizando o MVC. Para a manutenção da entidade implementamos um serviço expondo os verbos:POST, UPDATE, GET,GET e DELETE; respetivamente para incluir, atualizar, consultar, pesquisar e excluir. Os fontes desta implementação você encontra no [github](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTAPI). 


## Empacotando tudo utilizando container

Depois de implementar os projetos  precisamos empacotar tudo para serem distribuídos como uma solução única. Se montarmos uma árvore de dependência ela ficaria assim:

```
CFTSTAPI => CFTSTREGRAS01 => CFTSTDADOS01
```

Demos ler da seguinte forma: CFTSTAPI {depende de} CFTSTREGRAS01  {depende de} CFTSTDADOS01.


Despois de implementado e testado é aqui que entra o container. O projeto precisa de um arquivo Dockerfile com a imagem adequada citando os projetos necessários. Aqui em baixo tem um fragmento do Dockerfile.

```
#------------------------------------------------------------
# .net 
#------------------------------------------------------------

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY CFTSTDADOS01/*.csproj      			./CFTSTDADOS01/      
COPY CFTSTREGRAS01/*.csproj			        ./CFTSTREGRAS01/        
COPY CFTSTAPI/*.csproj			            ./CFTSTAPI/        

RUN dotnet restore

# copy everything else and build app
COPY CFTSTDADOS01/.      			        ./CFTSTDADOS01/        
COPY CFTSTREGRAS01/.      			        ./CFTSTREGRAS01/      
COPY CFTSTAPI/.      			            ./CFTSTAPI/      

WORKDIR /app/CFTSTAPI
RUN dotnet publish CFTSTAPI.csproj -c Release -o out /restore

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

WORKDIR /app

COPY --from=build /app/CFTSTAPI/out ./
ENTRYPOINT ["dotnet", "V.dll"]

```

 subir os componentes responsáveis pelo CRUD das tabelas modeladas.



