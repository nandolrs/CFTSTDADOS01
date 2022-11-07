import React from 'react';
import axios from 'axios';

import UsuarioConvitePesquisa from './UsuarioConvitePesquisa';
import UsuarioConviteLista from './UsuarioConviteLista';
import UsuarioConviteForm from './UsuarioConviteForm';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class UsuarioConviteView extends React.Component
{
    constructor(props)
    {
        
        var _entidade = {codigo:0, dataAceite:"", dataRecusa:"", rementente:{}, destinatario:{}}; 
        super(props);
        this.state={visao:props.visao == null ? "pesquisar" : props.visao
            ,entidade:_entidade
            ,entidadeInicio:_entidade
            ,processando:false
            ,url:{
                 pesquisar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/convites/pesquisar/"
                ,salvar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/convites/"
                ,consultar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/convites/"
                ,excluir:process.env.REACT_APP_SERVER_URL + "/api/usuarios/convites/excluir/"
                ,outros:null
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
            if(acao=='salvou')
            {
                resposta.visao = 'manter.pesquisar';
            }
        }
        this.setState(resposta);
    }

    Responder(entidade, acao)
    {

        this.setState({
            visao:'manter.outros'
            ,entidade:entidade
            ,url:{
                pesquisar:this.state.url.pesquisar
                ,salvar:this.state.url.salvar
                ,consultar:this.state.url.consultar
                ,excluir:this.state.url.excluir
                ,outros:process.env.REACT_APP_SERVER_URL + "/api/usuarios/convites/"+acao+"/"
            }
        });
    }

    render()
    {

        return(

<div class="card">
  <div class="card-header">
      CONVITES
  </div>
  <div class="card-body">

      <div>  

            {(this.state.visao=="pesquisar" || this.state.visao=="listar") && this.state.entidade != null ? 
                <UsuarioConviteLista 
                    entidade={this.state.entidade}
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao="UsuarioConvite"
                    OnConsultar={(entidade) => this.setState({visao:"manter.consultar",entidade:entidade})}
                    OnExcluir={(entidade) => this.setState({visao:"manter.excluir",entidade:entidade})}
                    OnVoltar={() => this.Voltar("pesquisar") }

                    OnAceitar={(entidade, acao) => this.Responder(entidade,'aceitar')}
                    OnRecusar={(entidade, acao) => this.Responder(entidade,'recusar')}
                    OnCancelar={(entidade, acao) => this.Responder(entidade,'cancelar')}

                /> : ""
            }

            {this.state.visao=="incluir" || this.state.visao=="consultar" ? 
                <UsuarioConviteForm 
                    entidade={this.state.entidade}
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao="UsuarioConvite"
                    processando={this.state.processando}
                    OnSalvar={(entidade) => this.setState({visao:"manter.salvar",entidade:entidade})}
                    OnVoltar={() => this.Voltar("pesquisar") }
                /> : ""
            }

            <SisMensagemView
                mensagens={this.state.mensagens}
                visao={this.state.visao}
                OnClicou={(v) => this.setState({visao:v})}
            />

            {this.state.visao=="manter.pesquisar" 
            || this.state.visao=="manter.salvar" 
            || this.state.visao=="manter.consultar" 
            || this.state.visao=="manter.excluir" 
            || this.state.visao=="manter.outros" 

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

export default UsuarioConviteView;