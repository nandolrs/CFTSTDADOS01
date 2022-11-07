import React from 'react';
import axios from 'axios';

import UsuarioArquivoLista from './UsuarioArquivoLista';
//import UsuarioArquivoForm from './UsuarioArquivoForm';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class UsuarioArquivoView extends React.Component
{
    constructor(props)
    {
        var _entidade = {codigo:0,nome:"",usuario:props.entidadePai};
        super(props);
        this.state={visao:  props.visao == null ? "listar" : props.visao
            ,entidade:_entidade
            ,entidadeInicio:_entidade
            ,processando:false
            ,url:{
                pesquisar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/arquivo/pesquisar/"
               ,salvar1:process.env.REACT_APP_SERVER_URL + "/api/usuarios/arquivo/"
               ,salvar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/arquivo/"
               ,consultar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/arquivo/1/"
               ,excluir:process.env.REACT_APP_SERVER_URL + "/api/usuarios/arquivo/excluir/"
           }
        };
    }

    Voltar(visao)
    {
        if(visao=="menu")
        {
            this.props.OnVoltar();

        }
        else
        {
            this.setState({visao:visao});
        }
    }

    Evento(resposta, acao)
    {
        if(acao=='pesquisou' 
            || acao=='consultou'
            || acao=='salvou'
            || acao=='excluiu'
            )
        {
        }
        this.setState(resposta);
    }

    Incluir()
    {
        var entidade = {
             codigo:0
            ,nome:""
        };
        this.setState( {visao:"incluir",entidade:entidade});
    }

    render()
    {

        return(

<div class="card">
  <div class="card-header">
      A R Q U I V O
  </div>
  <div class="card-body">

      <div>  
            {this.state.visao=="listar" && this.state.entidade != null ? 
                <UsuarioArquivoLista 
                    entidade={this.state.entidade}
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao={this.props.objetoAutorizacao}//"ConhecimentoArquivo"
                    OnConsultar={(entidade) => this.setState({visao:"manter.consultar",entidade:entidade})}
                    OnExcluir={(entidade) => this.setState({visao:"manter.excluir",entidade:entidade})}
                    OnIncluir={() => this.setState({visao:"incluir", entidade:this.state.entidadeInicio}) }
                    OnVoltar={() => this.Voltar("pesquisar") }
                /> : ""
            }



            <SisMensagemView
                mensagens={this.state.mensagens}
                visao={this.state.visao}
                voltar="manter.pesquisar"
                OnClicou={(v) => this.setState({visao:v})}
            />

            {this.state.visao=="manter.pesquisar" 
            || this.state.visao=="manter.salvar" 
            || this.state.visao=="manter.consultar" 
            || this.state.visao=="manter.excluir" 

            ? 
                <SisManterView 
                    entidade={this.state.entidade}
                    url={this.state.url}
                    visao={this.state.visao}
                    OnEvento={(estado, acao) => this.Evento(estado, acao) }
                />
            :""
            }

        </div>

  </div>
</div>

            );
    }
}

export default UsuarioArquivoView;