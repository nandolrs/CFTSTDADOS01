
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

## Empacotando tudo utilizando container

Depois de implementar e testar o projeto  precisamos empacotar tudo para ser distribuído como uma solução. Isto já foi detalhado anteriormente. O que muda é basicamente são os arquivos fontes e o arquivo Dockerfile.

O projeto precisa de um arquivo Dockerfile com a imagem adequada citando os projetos necessários. Em resumo no Dockerfile você encontra instruções que vão: copiar e compilar os fontes necessários. Aqui em baixo coloquei conteúdo do arquivo Dockerfile utilizado. O arquivo você encontra no [github](https://github.com/nandolrs/CFTSTDADOS01/blob/master/cftstui01/Dockerfile).

```
# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Depois disto é usar os comandos docker build/tag/push e bla-bla-bla. Tudo já foi descrito no projeto anterior.