
# Implantando uma solução utilizando Cloud e Container ( AWS + Docker ) (Parte 3 de 3, user interface tier)

 Na [parte 2 (business tier)](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTAPI02) implantamos um serviço AWS ECS com as regras de negócio da solução através de uma API utilizando o formato JSON. Nesta 3a parte iremos implantar um serviço [AWS ECS](https://aws.amazon.com/pt/ecs/) contendo a interface do usuário (user interface tier).
 
  ## Requisitos da solução

 Como requisito de segurança a solução necessita de uma interface de usuário para autenticação e cadastro de usuários. 

  ## Especificação e implementação da solução

 Diante dos requisitos decidimos utilizar **React** para implementar uma interface de usuário, de página única, que será cliente da API que faz parte da camada de negócio. A tecnologia de container foi o [Docker](https://www.docker.com/). Para efeito didático apenas habilitamos as ações de  pesquisa e lista de usuários. A interface permite a pesquisa e lista.
 <ul> 
  <li>Campos do formulário
      <ul>
        <li>Nome</li>
        <li>Email</li>
      </ul>
  </li>

  <li>Métodos
    <ul>
        <li>
            Pesquisar: permite a pesquisa de usuários cadastrados;        
        </li>
    </ul>
  </li>

</ul>

## Implementando e testando a interface do usuário

Após clonar o projeto geramos a imagem Docker e implantamos a solução na cloud. Para clonar criei uma pasta vazia dentro de um diretório temporário, abri a IDE do Visual Studio Code e dentro da IDE abri a pasta vazia, abri um terminal apontando para a pasta e digitei o comando ***git clone*** do Git. 

![f27-clone](https://user-images.githubusercontent.com/34346597/204917414-8b2699f0-378f-4ba9-beef-8c3a14492b0c.png)


  Após a implantação recebi um endpoint e com a ajuda de um navegador web acessei o endpoint. A tela de pesquisa se apresentou conforme esperado. Os fontes desta implementação você encontra no [Git](https://github.com/nandolrs/CFTSTDADOS01/tree/master/cftstui01). 


![f29-lista](https://user-images.githubusercontent.com/34346597/204917410-1db54d1e-223e-4eb6-a57c-71de9d891690.png)

