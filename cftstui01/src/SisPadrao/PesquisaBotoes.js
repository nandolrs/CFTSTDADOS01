import React from 'react';

class PesquisaBotoes extends React.Component
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
                {this.props.botoes == null && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".pesquisar"), this.props.listaAutorizacao)
                    || (this.props.botoes != null && _botoes.indexOf("pesquisar") >= 0 && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".pesquisar"), this.props.listaAutorizacao)) ?
                    <button id={this.GerarID('inputPesquisar')}  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnPesquisar() }>Pesquisar </button>
                : ""
                }
                {this.props.botoes == null && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".salvar.incluir"), this.props.listaAutorizacao)
                    ||  (this.props.botoes != null && _botoes.indexOf("incluir") >= 0 && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".incluir"), this.props.listaAutorizacao)) ?
                    <button id={this.GerarID('inputIncluir')}   type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnIncluir() }>Incluir </button>
                : ""
                }
            </div>
        );
    }
}
export default PesquisaBotoes;