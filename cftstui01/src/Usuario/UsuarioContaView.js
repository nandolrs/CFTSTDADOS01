import React from 'react';
import axios from 'axios';

import UsuarioContaForm from './UsuarioContaForm';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class UsuarioContaView extends React.Component
{
    constructor(props)
    {
        
        var _entidade = {codigo:0};
        super(props);
        this.state={visao:'manter.consultar' //"pesquisar"
            ,entidade:_entidade
            ,entidadeInicio:_entidade
            ,processando:false
            ,url:{
                pesquisar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/pesquisar/"
               ,salvar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/"
               ,consultar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/consultarAnonimo/"
               ,excluir:process.env.REACT_APP_SERVER_URL + "/api/usuarios/excluir/"
           }
        };
    }

    Localizar()
    {
        // lista usuario
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/usuarios/consultarAnonimo/",window.getCabeca()).then((resposta)=>this.Localizou('usuario',resposta));

    }

    Localizou(tipo, resposta)
    {
        if(tipo=='usuario')
        {
            if(resposta.request.status == 200)
            {
                this.setState({lista:resposta.data.dadosLista, usuarioBuscou:true});
            }
    
        }
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
        this.setState({visao:"incluir"});
        this.EntidadeSetar();
    }

    EntidadeSetar()
    {
        var entidade = {
            codigo:0
            ,nome:""
            ,classe:{}
            ,organizacao:{}
        };
        this.setState({entidade:entidade});
    }

    Sair()
    {
        window.clearCookie("token"); 
        this.props.OnSair();        
    }

    render()
    {

        return(

<div>

            {this.state.visao=="incluir" || this.state.visao=="consultar" ? 
                <UsuarioContaForm 
                    entidade={this.state.entidade}
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao="Conhecimento"
                    OnSalvar={(entidade) => this.setState({visao:"manter.salvar",entidade:entidade})}
                    OnVoltar={() => this.Voltar("pesquisar") }
                    OnSair={() => this.Sair() }
                    processando={this.state.processando}
            /> : ""
            }

            <SisMensagemView
                visao={this.state.visao}
                mensagens={this.state.mensagens}
                OnClicou={(v) => this.setState({visao:v})}
            />

            {this.state.visao=="manter.pesquisar" 
            || this.state.visao=="manter.salvar" 
            || this.state.visao=="manter.consultar" 
            || this.state.visao=="manter.excluir" 

            ? 
                <SisManterView 
                    visao={this.state.visao}
                    entidade={this.state.entidade}
                    url={this.state.url}
                    OnEvento={(estado, acao) => this.Evento(estado, acao) }
                />
            :""
            }

</div>

            );
    }
}

export default UsuarioContaView;