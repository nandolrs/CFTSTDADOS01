import React from 'react';
import SisProcessandoView from '../SisPadrao/SisProcessandoView';

class FormBotoesDetalhe extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    Clique()
    {
        this.props.OnCliqueBotoesDetalhe({titulo:this.props.titulo, acao:this.props.acao, entidade:this.props.entidade});
    }
    render()
    {
        var _botoes = this.props.botoes;

        let retorno = '';

        if(this.props.processando == null || this.props.processando == 0)
        {
            retorno =
            <button  
                type="button" 
                class_="btn btn-outline-secondary btn-lg estilo-botao" 
                class = 'btn btn-secondary btn-lg btn-block'
                onClick={() => this.Clique() }
                > {this.props.titulo} 
            </button>;

        }

        if(this.props.processando==1)
        {
            retorno = <SisProcessandoView />;
        }

        return(retorno);
    }
}
export default FormBotoesDetalhe;