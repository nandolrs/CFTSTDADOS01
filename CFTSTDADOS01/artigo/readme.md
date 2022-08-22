# Implantando uma solução utilizando AWS e Docker (Parte 1 de 3, data tier)


Alguns dizem que o mundo ideal é aquele em que não existem problemas. Eu acredito que o mundo ideal é aquele em que as palavras: problema e solução, estão na mesma frase e o tempo a favor dos atores. Não adianta resolver o problema da fome mundial depois que todos morreram desnutridos. Ter a solução no momento errado é o mesmo que nada ter. Não basta mover-se, mas é vital mover-se rapidamente e/ou no momento certo.

Vamos juntos dar uma olhada, alto nível ou seja meio de longe ignorando os detalhes, em como implantar uma solução baseada em multi-camadas (front, back e data) de uma forma rápida, altamente disponível e tolerante à falhas.

Mas primeiro, precisamos construir um vocabulário pra entender a coisa toda e vou colocar (termo) pra destacar. Os serviços ([services](https://aws.amazon.com/pt/products/?nc2=h_ql_prod_fs_f&aws-products-all.sort-by=item.additionalFields.productNameLowercase&aws-products-all.sort-order=asc&awsf.re%3AInvent=*all&awsf.Free%20Tier%20Type=*all&awsf.tech-category=*all)) baseados em nuvem ([cloud](https://silvio.meira.com/silvio/informtica-nas-nuvens-quando/)) estão disponíveis em praticamente todos continentes do globo terrestre. Distribuições baseadas em container ([Docker](https://www.docker.com/)) reduziram muito o tempo necessário para implementar, empacotar/guardar, testar e implantar soluções de forma segura e com qualidade.

## O mundo em suas mãos

A cloud da [AWS](https://aws.amazon.com/pt/) se organiza em regiões ([Regions](https://aws.amazon.com/pt/about-aws/global-infrastructure/regions_az/)) que são compostas por zonas de disponibilizade (AZ). Por exemplo: Brasil, Africa e Canadá possuem 1 região cada. América do norte possui 4 regiões. Europa possui 6 regiões. Asia possui 8 regiões. O nome da região do Brazil é **sa-east-1**. Alguns dos serviços disponibilizados são globais, ou seja, não estão limitados a uma região, como é o caso do **IAM** (Identity and Acess Management) utilizado para gerenciar acessos. Outros são limitados por região, como é o exemplo do **EC2**; isto significa que se você precisar de um servidor no Brasil deverá solicitá-lo na região sa-east-1 e assim sucessivamente. Outra palavrinha que precisamos é a VPC ([Virtual Private Cloud](https://docs.aws.amazon.com/pt_br/vpc/latest/userguide/what-is-amazon-vpc.html))  , ou seja,uma área segura onde os recursos são disponibilizados e as AZ se localizam, etc.

![](../CFTSTDADOS01/CFTSTDADOS01/artigo/imagens/f00-vpc.png)
