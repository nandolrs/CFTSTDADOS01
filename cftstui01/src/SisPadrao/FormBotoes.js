import React from 'react';

class FormBotoes extends React.Component
{
    constructor(props)
    {
        super(props);

    }
    
    GerarID(nome)
    {
        let retorno = nome + (this.props.objetoAutorizacao != null ? this.props.objetoAutorizacao : '');  
    
        return retorno;
    
    }
    render()
    {
        var _botoes = this.props.botoes;

        return(
            <div>

                {this.props.botoes == null && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".salvar").concat(this.props.codigo == 0 ? ".incluir" : ".alterar"), this.props.listaAutorizacao)
                    ||  (this.props.botoes != null && _botoes.indexOf("salvar.incluir") >= 0 && window.AutorizacaoConsultar(this.props.objetoAutorizacao+".salvar"+this.props.codigo == 0 ? ".incluir" : ".alterar", this.props.listaAutorizacao)) ?
                    <button id={this.GerarID('inputSalvar')}  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnSalvar() }>Salvar </button>
                : ""
                }

                <button id='inputVoltar'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnVoltar() }>Voltar </button>
            </div>
        );
    }
}
export default FormBotoes;