import React from 'react';
import axios from 'axios';

import UsuarioListar from  './UsuarioLista';
import UsuarioAutenticarForm from './UsuarioAutenticarForm';
import UsuarioForm from './UsuarioForm';
import MenuView from '../Menu/MenuView';
import UsuarioView from '../Usuario/UsuarioView';
import SisMensagemView from '../SisPadrao/SisMensagemView';

class UsuarioAutenticarView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={visao:"usuario.autenticar"
            ,email:""
            ,senha:""
            ,dados:null
            ,mensagem:""
            ,codigo:0
        };
        //window.clearCookie("token"); // <?>
    }

    Autenticar(entidade)
    {
        axios.post(process.env.REACT_APP_SERVER_URL + "/api/usuarios/autenticar/"
            ,entidade
            ,window.getCabeca())
            .then((resposta)=>this.Autenticou(resposta))
            .catch((resposta => this.Autenticou(resposta))
        );
    }

    Autenticou(resposta)
    {        
        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                this.setState({visao:"mensagem.erro",mensagem:msg, mensagens:erro.itens});
            }
            else
            {
                if(resposta.data.dados.token != null)
                {                    
                    window.setCookie("token", resposta.data.dados.token, 1);
                    window.setCookie("usuario.tipoAdmin", resposta.data.dados.tipoAdmin, 1);
                    window.setCookie("usuario.email", resposta.data.dados.usuarioEmail, 1);
                    window.setCookie("usuario.nome", resposta.data.dados.usuarioNome, 1);
                    window.setCookie("usuario.qtdeConvites", resposta.data.dados.qtdeConvites, 1);
                    window.setCookie("usuario.qtdePedidoItem", resposta.data.dados.qtdePedidoItem, 1);
                    this.setState({token:resposta.data.dados.token});
                    this.props.OnAutenticou({token:resposta.data.dados.token});
                }
            }
        }
        else
        {
            var msg = "Opa! Houve algum problema. Tente mais tarde.";
            var erros = [{mensagem:msg}];
            this.setState({visao:"mensagem.erro",mensagem:msg, mensagens:erros});
        }

    }

    Institucional()
    {
        this.props.OnInstitucional();
    }

    UsuarioIncluir()
    {
        this.props.OnUsuarioIncluir();
    }

    UsuarioConfirmar()
    {
        this.props.OnUsuarioConfirmar();
    }


    UsuarioSenhaResetar()
    {
        this.props.OnUsuarioSenhaResetar();
    }

    UsuarioSenhaResetarAlterar()
    {
        this.props.OnUsuarioSenhaResetarAlterar();
    }

    OnGeoLocalizar()
    {
        this.props.OnGeoLocalizar();

    }

    UsuarioSalvar(entidade)
    {
        if(entidade.codigo==0)
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/usuarios/",entidade).then((resposta)=>this.UsuarioSalvou(resposta));
        }
        else
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/usuarios/"+entidade.codigo,entidade).then((resposta)=>this.UsuarioSalvou(resposta));
        }
    }

    UsuarioSalvou(resposta)
    {
        if(resposta.request.status == 200)
        {
            this.setState({codigo:resposta.data.codigo ,mensagem:"Usuário salvo com sucesso."});
        }
        else
        {
            this.setState({codigo:resposta.data.codigo ,mensagem:"Opa! Houve algum problema."});
        }
    }

    render()
    {

        return(<div>  
            <UsuarioAutenticarForm 
                email={this.state.email}
                senha={this.state.senha}
                OnAutenticar={(entidade)=>this.Autenticar(entidade)} 
                OnInstitucional={()=>this.Institucional()} 
                OnUsuarioIncluir={()=>this.UsuarioIncluir()} 
                OnUsuarioConfirmar={()=>this.UsuarioConfirmar()} 
                OnGeoLocalizar={()=>this.OnGeoLocalizar()} 
                OnUsuarioSenhaResetar={()=>this.UsuarioSenhaResetar()} 
                OnUsuarioSenhaResetarAlterar={()=>this.UsuarioSenhaResetarAlterar()} 

            />

            <SisMensagemView
                visao={this.state.visao}
                mensagens={this.state.mensagens}
                mensagem={this.state.mensagem}
                autenticado={false}
                OnClicou={(v) => this.setState({visao:v})}
            />
        </div>
            );
    }
}

export default UsuarioAutenticarView;

