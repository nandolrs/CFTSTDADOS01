import React from 'react';

class SisImagem extends React.Component
{
    constructor(props)
    {
        super(props);
        /*
        this.state={visao:this.props.visao
            ,mensagem:this.props.mensagem
            ,autenticado:this.props.autenticado == null ? true : this.props.autenticado 
            ,mensagens:null
        }
        */
    }


    render()
    {
        let source = "./imagens/cmjoana-imagem-nao-encontrada.png";

        if(this.props.conteudoBase64 != null)
        {
            source =  this.props.conteudoBase64;

        }

        let retorno =
        <img 
            src={source} 
            class1="mr-3 foto-mini" 
            class="card-img-top" 
            alt="..." />
            

        return(retorno);
    }
}
export default SisImagem;