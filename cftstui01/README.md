
# Implantando uma solução utilizando Cloud e Container ( AWS + Docker ) (Parte 3 de 3, user interface tier)

 Na [parte 2 (business tier)](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTAPI02) implantamos um serviço AWS ECS com as regras de negócio da solução através de uma API utilizando o formato JSON. Nesta 3a parte iremos implantar um serviço [AWS ECS](https://aws.amazon.com/pt/ecs/) contendo a interface do usuário (user interface tier).
 
  ## Requisitos da solução

 Como requisito de segurança a solução necessita de uma interface de autenticação e cadastro de usuários. A camada de negócio possui uma API que permite a manutenção (pesquisa, consulta, inclusão,alteração e exclusão) de usuários. 

  ## Especificação e implementação da solução

 Diante dos requisitos decidimos utilizar **React**. A tecnologia de container foi o [Docker](https://www.docker.com/). Para efeito didático apenas habilitamos as ações de  pesquisa e consulta de usuários.
 A interface permite a pesquisa, consulta
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

![f28-pesquisa](https://user-images.githubusercontent.com/34346597/204917405-942e69a5-9250-4e52-9230-22a8b1c17478.png)
![f29-lista](https://user-images.githubusercontent.com/34346597/204917410-1db54d1e-223e-4eb6-a57c-71de9d891690.png)
![f27-clone](https://user-images.githubusercontent.com/34346597/204917414-8b2699f0-378f-4ba9-beef-8c3a14492b0c.png)
