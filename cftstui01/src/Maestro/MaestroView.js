import React from 'react';


import { isNumericLiteral } from '@babel/types';
import axios from 'axios';

//import ReactGA from 'react-ga';
import { Route, BrowserRouter } from "react-router-dom";
import { render } from 'react-dom';

import ClasseView from '../Classe/ClasseView';
import ConhecimentoView from '../Conhecimento/ConhecimentoView';
import CobrancaView from '../Cobranca/CobrancaView';
import CobrancaCondicaoView from '../Cobranca/CobrancaCondicaoView';
import ConhecimentoPorUsuarioView from '../Conhecimento/ConhecimentoPorUsuarioView';
import EmbalagemView from '../Embalagem/EmbalagemView';
import EventoView from '../Evento/EventoView';
import EventoAtividadeView from '../Evento/EventoAtividadeView';
import EventoInscricaoView from '../Evento/EventoInscricaoView';
import EventoQuandoPorPessoaView from '../Evento/EventoQuandoPorPessoaView';
import FreteView from '../Frete/FreteView';
import FuncaoView from '../Funcao/FuncaoView';
import GrupoView from '../Grupo/GrupoView';
import LocalView from '../Local/LocalView';
import LocalPesquisaGeoPosicaoView from '../Local/LocalPesquisaGeoPosicaoView';
import MenuView from '../Menu/MenuView';
import OcorrenciaView from '../Ocorrencia/OcorrenciaView';
import OrganizacaoView from '../Organizacao/OrganizacaoView';
import PainelView from '../Painel/PainelView';
import PainelProdutoEmbalagemView from '../Painel/PainelProdutoEmbalagemView';
import PedidoView from '../Pedido/PedidoView';
import PrecoView from '../Preco/PrecoView';
import PessoaView from '../Pessoa/PessoaView';
import ProdutoView from '../Produto/ProdutoView';
import ProjetoView from '../Projeto/ProjetoView';
import TradutorView from '../Tradutor/TradutorView';
import UnidadeMedidaView from '../UnidadeMedida/UnidadeMedidaView';
import UsuarioView from '../Usuario/UsuarioView';
import UsuarioAutenticarView from '../Usuario/UsuarioAutenticarView';
import UsuarioAutenticadorView from '../Usuario/UsuarioAutenticadorView';
import UsuarioSenhaResetarView from '../Usuario/UsuarioSenhaResetarView';
import UsuarioSenhaResetarAlterarView from '../Usuario/UsuarioSenhaResetarAlterarView';
import UsuarioConviteView from '../Usuario/UsuarioConviteView';
import Institucional from '../Institucional/Institucional';

class MaestroView extends React.Component
{
    constructor()
    {
        super();
        
        this.state={
            visao: null //  this.Iniciando()  _visao
           ,autenticado:false
           ,listaAutorizacao:null
           ,codigo:0
       };
       //ReactGA.initialize(process.env.REACT_APP_GA);
       //ReactGA.pageview('/Maestro');

       this.AutenticarVerificar();
       
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

    AutenticacaoVerificar()
    {

    }

    AutenticacaoVerificou()
    {

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


    IniciarEntrar()
    {
        window.location.pathname='/';
        this.Iniciar();
    }
    Autenticou(entidade)
    {
        this.AutorizacaoPorUsuarioListar();
    }
    UsuarioIncluir(autenticado)
    {
        this.setState({visao:"usuario.incluir", autenticado:autenticado})
    }

    UsuarioConfirmar(autenticado)
    {
        this.setState({visao:"usuario.confirmar", autenticado:autenticado})
    }

    UsuarioSenhaResetar(autenticado)
    {
        this.setState({visao:"usuario.senhaResetar", autenticado:autenticado})
    }

    UsuarioSenhaResetarAlterar(autenticado)
    {
        this.setState({visao:"usuario.senhaResetarAlterar", autenticado:autenticado})
    }

    GeoLocalizar()
    {
        this.setState({visao:"usuario.geoLocalizar"})
    }

    PainelPesquisar()
    {
        this.setState({visao:"painel.pesquisar"})
    }

    PainelProdutoEmbalagemPesquisar()
    {
        this.setState({visao:"painelProdutoEmbalagem.pesquisar"})
    }

    OrganizacaoPesquisar()
    {
        this.setState({visao:"organizacao.pesquisar"})
    }

    UsuarioPesquisar()
    {
        this.setState({visao:"usuario.pesquisar"})
    }

    CobrancaPesquisar()
    {
        this.setState({visao:"cobranca.pesquisar"});
    }


    CobrancaCondicaoPesquisar()
    {
        this.setState({visao:"cobrancaCondicao.pesquisar"});
    }

    ConhecimentoPesquisar()
    {
        this.setState({visao:"conhecimento.pesquisar"})
    }


    ClassePesquisar()
    {
        //this.setState({visao:"classe.pesquisar"});
        window.Navegar('/classe');

    }

    AtividadePesquisar()
    {
        this.setState({visao:"atividade.pesquisar"});
    }


    ProdutoPesquisar()
    {
        this.setState({visao:"produto.pesquisar"});
    }
    FretePesquisar()
    {
        this.setState({visao:"frete.pesquisar"});
    }
    FuncaoPesquisar()
    {
        this.setState({visao:"funcao.pesquisar"});
    }
    LocalPesquisar()
    {
        this.setState({visao:"local.pesquisar"});
    }
    EventoPesquisar()
    {
        this.setState({visao:"evento.pesquisar"});
    }
    ProjetoPesquisar()
    {
        this.setState({visao:"projeto.pesquisar"});
    }

    TradutorPesquisar()
    {
        this.setState({visao:"tradutor.pesquisar"});
    }



    EventoQuandoPorPessoaPesquisar()
    {
        this.setState({visao:"EventoQuandoPorPessoa.pesquisar"});
    }

    
    OcorrenciaPesquisar()
    {
        this.setState({visao:"ocorrencia.pesquisar"});
    }

    GrupoPesquisar()
    {
        this.setState({visao:"grupo.pesquisar"});
    }

    PessoaPesquisar()
    {
        this.setState({visao:"pessoa.pesquisar"});
    }

    PedidoPesquisar()
    {
        this.setState({visao:"pedido.pesquisar"});
    }

    UsuarioConvitePesquisar()
    {
        this.setState({visao:"usuario.convite.pesquisar"});
    }
    
    ConhecimentoPorUsuarioPesquisar()
    {
        this.setState({visao:"usuario.conhecimento.pesquisar"});
    }

    InscricaoAtividadePesquisar()
    {
        this.setState({visao:"InscricaoAtividade.pesquisar"});
    }

    InscricaoPesquisar()
    {
        this.setState({visao:"Inscricao.pesquisar"});
    }

    UnidadeMedidaPesquisar()
    {
        this.setState({visao:"UnidadeMedida.pesquisar"});
    }

    EmbalagemPesquisar()
    {
        this.setState({visao:"Embalagem.pesquisar"});
    }

    PrecoPesquisar()
    {
        this.setState({visao:"Preco.pesquisar"});
    }

    // autorização

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
      }      
    }

    Institucional(autenticado)
    {
        this.setState({visao:"institucional", autenticado:autenticado})
    }

    //

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
                        OnAtividadePesquisar={() => this.AtividadePesquisar()}                    
                        OnClassePesquisar={() => this.ClassePesquisar()}
                        OnCobrancaPesquisar={() => this.CobrancaPesquisar()}    
                        OnCobrancaCondicaoPesquisar={() => this.CobrancaCondicaoPesquisar()}    
                        OnConhecimentoPesquisar={() => this.ConhecimentoPesquisar()}
                        OnConhecimentoPorUsuarioPesquisar={() => this.ConhecimentoPorUsuarioPesquisar()}    
                        OnEmbalagemPesquisar={() => this.EmbalagemPesquisar()}                    
                        OnEventoPesquisar={() => this.EventoPesquisar()}
                        OnEventoQuandoPorPessoaPesquisar={() => this.EventoQuandoPorPessoaPesquisar()}    
                        OnFretePesquisar={() => this.FretePesquisar()}    
                        OnFuncaoPesquisar={() => this.FuncaoPesquisar()}
                        OnGrupoPesquisar={() => this.GrupoPesquisar()}    
                        OnInscricaoAtividadePesquisar={() => this.InscricaoAtividadePesquisar()}    
                        OnInscricaoPesquisar={() => this.InscricaoPesquisar()}    
                        OnLocalPesquisar={() => this.LocalPesquisar()}
                        OnOcorrenciaPesquisar={() => this.OcorrenciaPesquisar()}    
                        OnOrganizacaoPesquisar={() => this.OrganizacaoPesquisar()}
                        OnPainelPesquisar={() => this.PainelPesquisar()}
                        OnPainelProdutoEmbalagemPesquisar={() => this.PainelProdutoEmbalagemPesquisar()}
                        OnPedidoPesquisar={() => this.PedidoPesquisar()}    
                        OnPessoaPesquisar={() => this.PessoaPesquisar()}    
                        OnPrecoPesquisar={() => this.PrecoPesquisar()}
                        OnProdutoPesquisar={() => this.ProdutoPesquisar()}
                        OnProjetoPesquisar={() => this.ProjetoPesquisar()}    
                        OnTradutorPesquisar={() => this.TradutorPesquisar()}
                        OnUsuarioConvitePesquisar={() => this.UsuarioConvitePesquisar()}    
                        OnUnidadeMedidaPesquisar={() => this.UnidadeMedidaPesquisar()}    
                        OnUsuarioPesquisar={() => this.UsuarioPesquisar()}
                    />


                {this.state.visao=="painel.pesquisar"
                    || this.state.visao=="painelProdutoEmbalagem.pesquisar"
                    || this.state.visao == '' ?
                    <PainelView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnIniciar={()=>this.Iniciar()}
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 

                    />
                : "" 
                }

                {this.state.visao=="painelProdutoEmbalagem.pesquisar" 
                || this.state.visao=="painel.pesquisar"
                || this.state.visao == '' ?
                    <PainelProdutoEmbalagemView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnIniciar={()=>this.Iniciar()}
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 

                    />
                : "" 
                }

                {this.state.visao=="painel.visualizar" ?
                    <PainelView
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        qs={window.GetQueryString()['qs']} 
                        OnIniciar={()=>this.Iniciar()}
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnVoltar = {() => this.setState({visao:"painel.pesquisar"})} 

                    />
                : "" 
                }


                {this.state.visao=="painelProdutoEmbalagem.visualizar" ?
                    <PainelProdutoEmbalagemView
                        qs={window.GetQueryString()['qs']} 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        url='PainelProdutoEmbalagemVisualizar'
                        OnIniciar={()=>this.Iniciar()}
                        OnEvento={(estado, acao) => this.setState({visao:acao})} 
                        OnVoltar = {() => this.setState({visao:"painelProdutoEmbalagem.pesquisar"})} 

                    />
                : "" 
                }



                {this.state.visao=="usuario.senhaAtualizar" ?
                    <div> BOSTA</div>
                : ""
                }

                {this.state.visao=="usuario.autenticar" ?
                    <UsuarioAutenticarView
                        visao={this.state.visao} 
                        OnAutenticou={(usuarioAutenticarEntidade) => this.Autenticou(usuarioAutenticarEntidade)} 
                        OnUsuarioIncluir={() => this.UsuarioIncluir(false)} 
                        OnUsuarioConfirmar={() => this.UsuarioConfirmar(false)} 
                        OnGeoLocalizar={() => this.GeoLocalizar()} 
                        OnUsuarioSenhaResetar={() => this.UsuarioSenhaResetar(false)} 
                        OnUsuarioSenhaResetarAlterar={() => this.UsuarioSenhaResetarAlterar(false)} 
                        OnInstitucional={() => this.Institucional(false)} 
                    />
                : ""
                }


                {this.state.visao=="usuario.pesquisar" ?
                    <UsuarioView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 

                    />
                :  ""
                }



                {this.state.visao=="usuario.incluir" ?
                    <UsuarioView 
                        visao = "incluir" 
                        autenticado = {this.state.autenticado}
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 

                    />
                :  ""
                }

                
                {this.state.visao=="usuario.confirmar" ?
                    <UsuarioAutenticadorView 
                        visao = "usuario.senhaConfirmar" 
                        autenticado = {this.state.autenticado}
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 

                    />
                :  ""
                }           


                {this.state.visao=="usuario.senhaResetar" ?
                    <UsuarioSenhaResetarView 
                        visao = "usuario.senhaConfirmar"  // <ops> trocar senhaConfirmar por senhaResetar
                        autenticado = {this.state.autenticado}
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 

                    />
                :  ""
                }     


                {this.state.visao=="usuario.senhaResetarAlterar" ?
                    <UsuarioSenhaResetarAlterarView 
                        visao = "usuario.senhaConfirmar"  // <ops> trocar senhaConfirmar por senhaResetar
                        autenticado = {this.state.autenticado}
                        OnIniciar={()=>this.Iniciar()}
                        OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 

                    />
                :  ""
                }     


                {this.state.visao=="classe.pesquisar" ? 
                    <ClasseView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : ""
                }


                {this.state.visao=="cobranca.pesquisar" ?
                    <CobrancaView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }


                {this.state.visao=="cobrancaCondicao.pesquisar" ?
                    <CobrancaCondicaoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }

                {this.state.visao=="conhecimento.pesquisar" ?
                    <ConhecimentoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }

                {this.state.visao=="produto.pesquisar" ?
                    <ProdutoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }
                {this.state.visao=="frete.pesquisar" ?
                    <FreteView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }
                {this.state.visao=="funcao.pesquisar" ?
                    <FuncaoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }
                {this.state.visao=="local.pesquisar" ?
                    <LocalView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }
                {this.state.visao=="evento.pesquisar" ?
                    <EventoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }
                {this.state.visao=="tradutor.pesquisar" ?
                    <TradutorView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }
                {this.state.visao=="projeto.pesquisar" ?
                    <ProjetoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }
                {this.state.visao=="EventoQuandoPorPessoa.pesquisar" ?
                    <EventoQuandoPorPessoaView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }

                {this.state.visao=="ocorrencia.pesquisar" ?
                    <OcorrenciaView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }

                {this.state.visao=="grupo.pesquisar" ?
                    <GrupoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }

                {this.state.visao=="organizacao.pesquisar" ?
                    <OrganizacaoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }

                {this.state.visao=="usuario.geoLocalizar" ?
                    <LocalPesquisaGeoPosicaoView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                        OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 
                    />
                : "" 
                }

                {this.state.visao=="pessoa.pesquisar" ?
                    <PessoaView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {this.state.visao} 
                    />
                : "" 
                }


                <Route 
                    path="/pedido" 
                    element={ 
                        <PedidoView 
                            autenticado = {this.state.autenticado}
                            listaAutorizacao={this.state.listaAutorizacao}
                            visao = {this.state.visao} 
                        />
                    }>                    
                </Route>

                {this.state.visao=="usuario.convite.pesquisar" ?
                    <UsuarioConviteView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = 'manter.pesquisar'// {this.state.visao} 
                    />
                : "" 
                }


                {this.state.visao=="usuario.conhecimento.pesquisar" ?
                    <ConhecimentoPorUsuarioView 
                        autenticado = {this.state.autenticado}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = 'manter.pesquisar'// {this.state.visao} 
                    />
                : "" 
                }

                {this.state.visao=="InscricaoAtividade.pesquisar" ?
                    <EventoAtividadeView 
                        autenticado = {this.state.autenticado}
                        entidadePai={null}
                        evento={null}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {"manter.pesquisar"} 
                    />            
                    : "" 
                }

                {this.state.visao=="Inscricao.pesquisar" ?
                    <EventoInscricaoView 
                        autenticado = {this.state.autenticado}
                        entidadePai={null}
                        evento={null}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {"manter.pesquisar"} 
                    />

                    : "" 
                }


                {this.state.visao=="UnidadeMedida.pesquisar" ?
                    <UnidadeMedidaView 
                        autenticado = {this.state.autenticado}
                        entidadePai={null}
                        evento={null}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {"manter.pesquisar"} 
                    />

                    : "" 
                }

                {this.state.visao=="Embalagem.pesquisar" ?
                    <EmbalagemView 
                        autenticado = {this.state.autenticado}
                        entidadePai={null}
                        evento={null}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {"manter.pesquisar"} 
                    />

                    : "" 
                }



                {this.state.visao=="Preco.pesquisar" ?
                    <PrecoView 
                        autenticado = {this.state.autenticado}
                        entidadePai={null}
                        evento={null}
                        listaAutorizacao={this.state.listaAutorizacao}
                        visao = {"manter.pesquisar"} 
                    />

                    : "" 
                }

                {this.state.visao=="institucional" ?
                    <Institucional 
                        OnEntrar={( ) => this.IniciarEntrar() }
                    />
                : "" 
                }

                {this.state.visao=="atividade.pesquisar" ? 
                    <EventoAtividadeView 
                        autenticado = {this.state.autenticado}
                        entidadePai = {null } // entidade
                        evento= {null} // entidade
                        listaAutorizacao={this.props.listaAutorizacao}
                        visao = {"manter.pesquisar"} 
                    />
                : ""
                }


            </div>


        );

    }
    
}

export default MaestroView;



