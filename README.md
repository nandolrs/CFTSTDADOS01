# Implantando uma solução utilizando AWS e Docker (Parte 1 de 3, data tier)


Alguns dizem que o mundo ideal é aquele em que não existem problemas. Eu acredito que o mundo ideal é aquele em que as palavras: problema e solução, estão na mesma frase e o tempo a favor dos atores. Não adianta resolver o problema da fome mundial depois que todos morreram desnutridos. Ter a solução no momento errado é o mesmo que nada ter. Não basta mover-se, mas é vital mover-se rapidamente e/ou no momento certo.

Vamos juntos dar uma olhada, alto nível ou seja meio de longe ignorando os detalhes, em como implantar uma solução baseada em multi-camadas (front, back e data) de uma forma rápida, altamente disponível e tolerante à falhas.

Mas primeiro, precisamos construir um vocabulário pra entender a coisa toda e vou colocar (<termo>) pra destacar. Os serviços ([services](https://aws.amazon.com/pt/products/?nc2=h_ql_prod_fs_f&aws-products-all.sort-by=item.additionalFields.productNameLowercase&aws-products-all.sort-order=asc&awsf.re%3AInvent=*all&awsf.Free%20Tier%20Type=*all&awsf.tech-category=*all)) baseados em nuvem (cloud) estão disponíveis em praticamente todos continentes do globo terrestre. Distribuições baseadas em container (Docker) reduziram muito o tempo necessário para implementar, empacotar/guardar, testar e implantar soluções de forma segura e com qualidade.
