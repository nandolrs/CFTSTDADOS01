import React from 'react';

import { isNumericLiteral } from '@babel/types';
import axios from 'axios';

//import ReactGA from 'react-ga';
import { render } from 'react-dom';

import {Routes, Route, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//import ClasseView from '../Classe/ClasseView';
//import ConhecimentoView from '../Conhecimento/ConhecimentoView';
//import CobrancaView from '../Cobranca/CobrancaView';
//import CobrancaCondicaoView from '../Cobranca/CobrancaCondicaoView';
//import ConhecimentoPorUsuarioView from '../Conhecimento/ConhecimentoPorUsuarioView';
//import EmbalagemView from '../Embalagem/EmbalagemView';
//import EventoView from '../Evento/EventoView';
//import EventoAtividadeView from '../Evento/EventoAtividadeView';
//import EventoInscricaoView from '../Evento/EventoInscricaoView';
//import EventoQuandoPorPessoaView from '../Evento/EventoQuandoPorPessoaView';
//import FreteView from '../Frete/FreteView';
//import FuncaoView from '../Funcao/FuncaoView';
//import GrupoView from '../Grupo/GrupoView';
//import LocalView from '../Local/LocalView';
//import LocalPesquisaGeoPosicaoView from '../Local/LocalPesquisaGeoPosicaoView';
import MenuView from '../Menu/MenuView';
//import OcorrenciaView from '../Ocorrencia/OcorrenciaView';
//import OrganizacaoView from '../Organizacao/OrganizacaoView';
//import PainelView from '../Painel/PainelView';
//import PainelProdutoEmbalagemView from '../Painel/PainelProdutoEmbalagemView';
//import PedidoView from '../Pedido/PedidoView';
//import PrecoView from '../Preco/PrecoView';
//import PessoaView from '../Pessoa/PessoaView';
//import ProdutoView from '../Produto/ProdutoView';
//import ProjetoView from '../Projeto/ProjetoView';
//import TradutorView from '../Tradutor/TradutorView';
//import UnidadeMedidaView from '../UnidadeMedida/UnidadeMedidaView';
import UsuarioView from '../Usuario/UsuarioView';
import UsuarioAutenticarView from '../Usuario/UsuarioAutenticarView';
import UsuarioAutenticadorView from '../Usuario/UsuarioAutenticadorView';
import UsuarioSenhaResetarView from '../Usuario/UsuarioSenhaResetarView';
import UsuarioSenhaResetarAlterarView from '../Usuario/UsuarioSenhaResetarAlterarView';
import UsuarioConviteView from '../Usuario/UsuarioConviteView';
//import Institucional from '../Institucional/Institucional';
//import AutenticadorView from '../Autenticador/AutenticadorView';

class MaestroRoutesView extends React.Component
{
    constructor(props)
    {
        debugger;
        
        super(props);
        
        this.state={
            visao: null //  this.Iniciando()  _visao
           ,autenticado:true // <?>
           ,listaAutorizacao:null
           ,codigo:0
       };
    }

    componentDidMount_()
    {
        if(!this.state.autenticado)
        {
            this.AutenticarVerificar();
        }
    }
    componentDidMount()
    {
        debugger;

        this.AutorizacaoPorUsuarioListou1();
    }

    AutenticarVerificar()
    {
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/usuarios/autenticar/"
            ,window.getCabeca())
            .then((resposta)=>this.AutenticarVerificou(resposta))
            .catch((resposta => this.AutenticarVerificou(resposta))
        );
    }

    AutenticarVerificou(resposta)
    {
        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                /*
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                this.setState({visao:"mensagem.erro",mensagem:msg, mensagens:erro.itens});
                */

                this.Iniciar();
            }
            else
            {

                this.Autenticou();
            }
        }
        else
        {
            /*
            var msg = "Opa! Houve algum problema. Tente mais tarde.";
            var erros = [{mensagem:msg}];
            this.setState({visao:"mensagem.erro",mensagem:msg, mensagens:erros});
            */
        this.Iniciando();
        }

    }

    Iniciar()
    {
         this.setState({
            visao: this.Iniciando() // "usuario.autenticar"
           ,autenticado:false
           ,listaAutorizacao:null
       });       
    }

    Iniciando()
    {
        let _visao='usuario.autenticar';

        if(window.location.pathname=='/SenhaInicializar')
        {
            _visao = 'usuario.senhaAtualizar';
        }

        if(window.location.pathname==process.env.REACT_APP_EVENTO_URL)
        {
            _visao = 'painel.visualizar';
        }

        if(window.location.pathname==process.env.REACT_APP_PRODUTOEMBALAGEM_URL)
        {            
            _visao = 'painelProdutoEmbalagem.visualizar';
        }

        if(window.location.pathname==process.env.REACT_APP_INSTITUCIONAL_URL)
        {
            _visao = 'institucional';
        }

        return _visao;
    }    

    Autenticou(entidade)
    {
        this.AutorizacaoPorUsuarioListar();
    }

    AutorizacaoPorUsuarioListar()
    {
      axios.get(process.env.REACT_APP_SERVER_URL + "/api/autorizacoes/pesquisarPorUsuario/",window.getCabeca()).then((resposta)=>this.AutorizacaoPorUsuarioListou(resposta));
    }


    AutorizacaoPorUsuarioListou(resposta)
    {
      if(resposta.request.status == 200)
      {
          var _listaAutorizacao = resposta.data.dadosLista;
          var _autorizacao = "";
            _listaAutorizacao.map( (item) =>  _autorizacao = _autorizacao + ( '<INICIO>' + item.nome + '.' + item.permissao + '<FIM>')   
            );            

          this.setState({visao:"",autenticado:true, listaAutorizacao:_autorizacao});

          window.NavegarBemVindo();
      }      
    }

    AutorizacaoPorUsuarioListou1()
    {
        this.setState({visao:"",autenticado:true, listaAutorizacao:this.props.autorizacao}); // _autorizacao

        //window.NavegarBemVindo();
    }    

    // ****************************************************************
    // inicio : das entidades de menu
    // ****************************************************************

    AtividadePesquisar()
    {
        window.Navegar('/atividade');
    }      

    ClassePesquisar()
    {
        window.Navegar('/classe');
    }   

    CobrancaPesquisar()
    {
        window.Navegar('/cobranca');
    }    
      
    CobrancaCondicaoPesquisar()
    {
        window.Navegar('/cobranca/condicao');
    }         
            
    ConhecimentoPesquisar()
    {
        window.Navegar('/conhecimento');
    }    

    ConhecimentoPorUsuarioPesquisar()
    {
        window.Navegar('/conhecimento/usuario');
    }    

    EmbalagemPesquisar()
    {
        window.Navegar('/embalagem');
    }    

    EventoPesquisar()
    {
        window.Navegar('/evento');
    }    

    EventoQuandoPorPessoaPesquisar()
    {
        window.Navegar('/evento/pessoa');
    }    
        
    FretePesquisar()
    {
        window.Navegar('/frete');
    }    
            
    FuncaoPesquisar()
    {
        window.Navegar('/funcao');
    }    

    GrupoPesquisar()
    {
        window.Navegar('/grupo');
    }    

    InscricaoPesquisar()
    {
        window.Navegar('/inscricao');
    }           

    InscricaoAtividadePesquisar()
    {
        window.Navegar('/inscricao/atividade');
    }        

    LocalPesquisar()
    {
        window.Navegar('/local');
    }         

    OcorrenciaPesquisar()
    {
        window.Navegar('/ocorrencia');
    }     
    
    OrganizacaoPesquisar()
    {
        window.Navegar('/organizacao');
    }      

    PainelPesquisar()
    {
        window.Navegar('/painel');
    }          

    PainelProdutoEmbalagemPesquisar()
    {
        window.Navegar('/painel/produtoembalagem');
    }     
    

    PedidoPesquisar()
    {
        window.Navegar('/pedido/produtoembalagem');
    }      

    PessoaPesquisar()
    {
        window.Navegar('/pessoa');
    }      
    
    PrecoPesquisar()
    {
        window.Navegar('/pessoa');
    }        

    ProdutoPesquisar()
    {
        window.Navegar('/produto');
    }    
    ProjetoPesquisar()
    {
        window.Navegar('/projeto');
    }  

    TradutorPesquisar()
    {
        window.Navegar('/tradutor');
    }     
    
    UsuarioConvitePesquisar()
    {
        window.Navegar('/usuario/convite');
    }        

    UnidadeMedidaPesquisar()
    {
        window.Navegar('/unidademedida');
    }   
    
    UsuarioPesquisar()
    {
        window.Navegar('/usuario');
    }      
    
    // ****************************************************************
    // FIM :  das entidades de menu
    // ****************************************************************
    
    render()
    {

        return(
            <div>
                    <MenuView  
                        visao={this.state.visao} 
                        token={this.state.token}
                        autenticado={this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        OnClick={() => this.Iniciar()}     
                        //OnAtividadePesquisar={() => this.AtividadePesquisar()}                    
                        //OnClassePesquisar={() => this.ClassePesquisar()}
                        //OnCobrancaPesquisar={() => this.CobrancaPesquisar()}    
                        //OnCobrancaCondicaoPesquisar={() => this.CobrancaCondicaoPesquisar()}    
                        //OnConhecimentoPesquisar={() => this.ConhecimentoPesquisar()}
                        //OnConhecimentoPorUsuarioPesquisar={() => this.ConhecimentoPorUsuarioPesquisar()}    
                        //OnEmbalagemPesquisar={() => this.EmbalagemPesquisar()}                    
                        //OnEventoPesquisar={() => this.EventoPesquisar()}
                        //OnEventoQuandoPorPessoaPesquisar={() => this.EventoQuandoPorPessoaPesquisar()}    
                        //OnFretePesquisar={() => this.FretePesquisar()}    
                        //OnFuncaoPesquisar={() => this.FuncaoPesquisar()}
                        //OnGrupoPesquisar={() => this.GrupoPesquisar()}    
                        //OnInscricaoAtividadePesquisar={() => this.InscricaoAtividadePesquisar()}    
                        //OnInscricaoPesquisar={() => this.InscricaoPesquisar()}    
                        //OnLocalPesquisar={() => this.LocalPesquisar()}
                        //OnOcorrenciaPesquisar={() => this.OcorrenciaPesquisar()}    
                        //OnOrganizacaoPesquisar={() => this.OrganizacaoPesquisar()}
                        //OnPainelPesquisar={() => this.PainelPesquisar()}
                        //OnPainelProdutoEmbalagemPesquisar={() => this.PainelProdutoEmbalagemPesquisar()}
                        //OnPedidoPesquisar={() => this.PedidoPesquisar()}    
                        //OnPessoaPesquisar={() => this.PessoaPesquisar()}    
                        //OnPrecoPesquisar={() => this.PrecoPesquisar()}
                        //OnProdutoPesquisar={() => this.ProdutoPesquisar()}
                        //OnProjetoPesquisar={() => this.ProjetoPesquisar()}    
                        //OnTradutorPesquisar={() => this.TradutorPesquisar()}
                        //OnUsuarioConvitePesquisar={() => this.UsuarioConvitePesquisar()}    
                        //OnUnidadeMedidaPesquisar={() => this.UnidadeMedidaPesquisar()}    
                        OnUsuarioPesquisar={() => this.UsuarioPesquisar()}


                    />

            <Routes>





















                <Route 
                    path="/usuario" 
                    element={ 
                        <UsuarioView 
                            autenticado = {this.state.autenticado}
                            listaAutorizacao={this.state.listaAutorizacao}
                            visao = 'usuario.pesquisar' // {this.state.visao} 
                            OnIniciar={()=>this.Iniciar()}
                            OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 
                        />
                    }>                    
                </Route>

                {this.state.visao=="usuario.incluir" ?
                    <UsuarioView 
                        visao = "incluir" 
                        autenticado = {this.state.autenticado}
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 

                    />
                :  ""
                }

                
         


  


  







            </Routes>
            </div>
        )
        
    }


}    

export default MaestroRoutesView;