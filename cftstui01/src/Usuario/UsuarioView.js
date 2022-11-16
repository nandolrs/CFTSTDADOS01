import React from 'react';
import axios from 'axios';

import UsuarioPesquisa from './UsuarioPesquisa';
import UsuarioLista from './UsuarioLista';
import UsuarioForm from './UsuarioForm';
//import UsuarioAnonimoForm from './UsuarioAnonimoForm';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';
import Config from "../config.json";

const environment = Config.ENV;
const baseUrl = Config.BASE_URL;
class UsuarioView extends React.Component
{

    constructor(props)
    {     

        super(props);
        this.state={visao:'pesquisar', visao_:props.visao =="usuario.pesquisar" ? "pesquisar" : props.visao 
            ,entidade:{codigo:0,nome:"",email:"",senha:""}
            ,processando:false
            ,autenticado:props.autenticado
            ,url:{
                pesquisar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/pesquisar/"
               ,salvar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/"
               ,consultar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/"
               ,excluir:process.env.REACT_APP_SERVER_URL + "/api/usuarios/excluir/"
               ,pesquisar1:Config.BASE_URL + "/api/usuarios/pesquisar/"

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
    USUÁRIO
</div>
<div class="card-body">
          
        <div>  

        {this.state.visao=="pesquisar" ? 
                <UsuarioPesquisa 
                    entidade={this.state.entidade}
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao="Usuario"
                    visao={this.props.visao}
                    url={this.state.url}
                    environment={this.props.environment}
                    OnIncluir={() => this.Incluir() }
                    OnPesquisar={(entidade) => this.setState({visao:"manter.pesquisar",entidade:entidade})}
                /> : ""
            }

            {this.state.visao=="listar" && this.state.entidade != null ? 
                <UsuarioLista 
                    entidade={this.state.entidade}
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao="Usuario"
                    OnConsultar={(entidade) => this.setState({visao:"manter.consultar",entidade:entidade})}
                    OnExcluir={(entidade) => this.setState({visao:"manter.excluir",entidade:entidade})}
                    OnVoltar={() => this.Voltar("pesquisar") }
                /> : ""
            }
            {(this.state.visao=="incluir"  || this.state.visao=="consultar") && this.state.autenticado ?
                <UsuarioForm 
                    autenticado={this.state.autenticado}
                    entidade={this.state.entidade}
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao="Usuario"
                    processando={this.state.processando}
                    OnSalvar={(entidade) => this.setState({visao:"manter.salvar",entidade:entidade})}
                    OnVoltar={() => this.Voltar(this.state.autenticado ? "pesquisar" : "autenticar")}
                /> 
                : ""
            }

            <SisMensagemView
                autenticado={this.state.autenticado}
                mensagens={this.state.mensagens}
                visao={this.state.visao}
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

export default UsuarioView;