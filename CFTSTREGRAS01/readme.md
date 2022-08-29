# Implantando uma solução utilizando AWS e Docker (Parte 2 de 3, business tier)

 Na [parte 1 (tier data)](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01) implantamos um serviço RDS com uma instância MySQL. Nesta 2a parte iremos implantar um serviço [AWS ECS](https://aws.amazon.com/pt/ecs/) contendo as regras de negócio da solução (business tier).

 ## Requisitos da solução

 Como requisito de segurança a solução necessita de uma funcionalidade de autenticação. Com esta finalidade utilizamos **MVC** (Model View Controller) , framework **.Net**  e como linguagem de programação **C#**. A tecnologia de container foi o **Docker**. Tudo foi exposto como API (Application Programming Interface). Os fontes desta implementação você encontra no [git](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTREGRAS01). 


 Entre outras tarefas do processo as regras consistem em validações que ocorrem antes de cada operação do CRUD:

 * **Incluir**: é obrigatória a informação dos atributos: email, nome e senha;

* **Alterar**: é obrigatória a informação dos atributos: email, nome e senha;

* **Consultar**: é obrigatória a informação de um código positivo  e MAIOR QUE 0 (zero);

* **Pesquisar**: é obrigatória a informação de ao menos um dos atributos a serem utilizados como critério de busca;

* **Excluir**:  é obrigatória a informação de um código positivo  e MAIOR QUE 0 (zero).

Agora precisamos subir os componentes responsáveis pelo CRUD das tabelas modeladas.
