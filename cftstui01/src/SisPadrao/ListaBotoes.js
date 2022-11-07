import React from 'react';

class ListaBotoes extends React.Component
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

    Excluir()
    {
      let codigos = window.ExcluirObterCodigos();

      if(codigos.length > 0)
      {
        this.props.OnExcluir(codigos);
       }
    }

    render()
    {        
        var _botoes = this.props.botoes;

        return(
            <div>
                {this.props.selecionados 
                    && (
                    (this.props.botoes == null && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".excluir"), this.props.listaAutorizacao))
                    || (this.props.botoes != null && _botoes.indexOf("excluir") >= 0 && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".excluir"), this.props.listaAutorizacao)) 
                    )               
                ?
                <button id={this.GerarID('inputExcluir')}  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Excluir() }>Excluir </button>
                : ""
                }
                {this.props.botoes == null && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".incluir"), this.props.listaAutorizacao)
                    ||  (this.props.botoes != null && _botoes.indexOf("incluir") >= 0 && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".salvar.incluir"), this.props.listaAutorizacao)) ?
                    <button id={this.GerarID('inputIncluir')} type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnIncluir() }>Incluir </button>
                : ""
                }
                {(this.props.botoes == null ||  (this.props.botoes != null && _botoes.indexOf("voltar") >= 0)) ?
                    <button id={this.GerarID('inputVoltar')}  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnVoltar() }>Voltar </button>
                : ""
                }
            </div>
        );
    }
}
export default ListaBotoes;