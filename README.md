# Implantando uma solução utilizando Cloud e Container ( AWS + Docker ) 

Esta é uma solução com 3 projetos onde descrevo, em alto nível, como implantar uma solução de 3 camadas (data tier, business tier e UI tier) utilizando MySQL, API em dot Net Core e React.

# [Implantando uma solução utilizando Cloud e Container ( AWS + Docker ) (Parte 1 de 3, data tier)](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTDADOS01)

<img width="52" alt="f23-mysql-logo" src="https://user-images.githubusercontent.com/34346597/186163068-95410b4e-46f8-4747-8da6-ceca793c3b75.png">

Vamos implantar uma base de dados **MySQL** utilizando o console do **AWS RDS** e ao final abordaremos **ClouFormation**.

# [Implantando uma solução utilizando Cloud e Container ( AWS + Docker ) (Parte 2 de 3, business tier)](https://github.com/nandolrs/CFTSTDADOS01/tree/master/CFTSTAPI01)

<img width="89" alt="f24-docker-logo" src="https://user-images.githubusercontent.com/34346597/186164024-946acca3-0736-4f47-b33d-686b455617fe.png">

<img width="105" alt="f24-dot-net-api-logo" src="https://user-images.githubusercontent.com/34346597/186165074-29446b50-3070-49ef-b7d0-2813608509bc.png">

Implantaremos uma **API Rest** implementada em **.Net Core** e empacotada em um contaiter Docker pronta pra navegar utilizando **AWS ECS + Fargate**.

# Implantando uma solução utilizando Cloud e Container ( AWS + Docker ) (Parte 3 de 3, user interface tier)

<img width="89" alt="f24-docker-logo" src="https://user-images.githubusercontent.com/34346597/186164024-946acca3-0736-4f47-b33d-686b455617fe.png">

<img width="80" alt="f26-react-logo" src="https://user-images.githubusercontent.com/34346597/186165558-426f1344-d8c2-4bf8-b1ea-3bd5c15d1dc9.png">

Implantaremos uma aplicação de apresentação implementada em **React** e empacotada em um container Docker pronta pra navegar utilizando **AWS ECS + Fargate**.
