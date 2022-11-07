import React from 'react';
import axios from 'axios';

import UsuarioSenhaResetarForm from './UsuarioSenhaResetarForm';
import UsuarioPesquisa from './UsuarioPesquisa';
import UsuarioLista from './UsuarioLista';
import UsuarioForm from './UsuarioForm';
//import UsuarioAnonimoForm from './UsuarioAnonimoForm';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';


class UsuarioSenhaResetarView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={visao:props.visao == null ? "usuario.senhaConfirmar" : props.visao 
            ,entidade:{codigo:0,nome:"",email:"",senhaAnterior:"", senhaNova:""}
            ,processando:false
            ,autenticado:props.autenticado
            ,url:{
                pesquisar:null
               ,salvar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/senhaResetar/"
               ,consultar:null
               ,excluir:null
           }
        };
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
        this.setState({visao:"incluir"
            ,entidade:
            {
             codigo:0
            ,nome:""
            ,email:""
            ,senha:""
            }
            ,processando:false
            ,mensagem:""
        });

    }

    Voltar(visao)
    {
        this.setState({visao:visao});       
    }

    render()
    {

        return(
<div class="card">
<div class="card-header">
    AUTENTICADOR
</div>
<div class="card-body">
          
        <div>  

            {this.state.visao=="usuario.senhaConfirmar" ?
                <UsuarioSenhaResetarForm 
                    autenticado={this.state.autenticado}
                    entidade={this.state.entidade}
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao="usuario.senhaConfirmar"
                    processando={this.state.processando}
                    visao={this.state.visao}
                    OnSalvar={(entidade) => this.setState({visao:"manter.salvar",entidade:entidade})}
                    OnVoltar={() => window.NavegarLogin() } // this.props.OnVoltar()
                /> 
                : ""
            }

            <SisMensagemView
                botoes="ok"
                autenticado={this.state.autenticado}
                mensagens={this.state.mensagens}
                visao={this.state.visao}
//                OnClicou={(v) => this.setState({visao:v})}
                OnClicou={(v) => this.props.OnVoltar()}
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

export default UsuarioSenhaResetarView;