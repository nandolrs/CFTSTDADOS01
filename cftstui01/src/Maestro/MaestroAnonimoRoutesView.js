import React from 'react';

import { isNumericLiteral } from '@babel/types';
import axios from 'axios';

//import ReactGA from 'react-ga';
import { render } from 'react-dom';

import {Routes, Route, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import AutenticadorView from '../Autenticador/AutenticadorView';

import Institucional from '../Institucional/Institucional';
import LocalPesquisaGeoPosicaoView from '../Local/LocalPesquisaGeoPosicaoView';
import UsuarioAutenticadorView from '../Usuario/UsuarioAutenticadorView';
import UsuarioAutenticarView from '../Usuario/UsuarioAutenticarView';
import UsuarioSenhaResetarAlterarView from '../Usuario/UsuarioSenhaResetarAlterarView';
import UsuarioSenhaResetarView from '../Usuario/UsuarioSenhaResetarView';
import UsuarioView from '../Usuario/UsuarioView';

class MaestroAnonimoRoutesView extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state={
            visao: 'login' //  this.Iniciando()  _visao
           ,autenticado:false
           ,listaAutorizacao:null
       };
       //window.NavegarLogin();
    }



    Iniciar()
    {
         this.setState({
            visao: this.Iniciando() // "usuario.autenticar"
           ,autenticado:false
           ,listaAutorizacao:null
       });       

       window.NavegarLogin();
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

          //this.setState({visao:"",autenticado:true, listaAutorizacao:_autorizacao});

          this.props.OnAutenticou(_autorizacao);
      }      
    }

    render()
    {
        return(
            <div>
                {this.state.visao=='login' && window.location.pathname=='/' ?
                        <UsuarioAutenticarView
                        visao={this.state.visao} 
                        OnAutenticou={(usuarioAutenticarEntidade) => this.Autenticou(usuarioAutenticarEntidade)} 
                        OnGeoLocalizar={() => {window.location.assign("./usuario-geoLocalizar")}} // this.GeoLocalizar() 
                        OnInstitucional={() => {window.location.assign("./institucional")} } // this.Institucional(false) 
                        OnUsuarioIncluir={() => {window.location.assign("./usuario-incluir")}} // this.UsuarioIncluir(false) 
                        OnUsuarioConfirmar={() => {window.location.assign("./usuario-senhaConfirmar")}} // this.UsuarioConfirmar(false)} 
                        OnUsuarioSenhaResetar={() => {window.location.assign("./usuario-senhaResetar")} } // this.UsuarioSenhaResetar(false) 
                        OnUsuarioSenhaResetarAlterar={() => {window.location.assign("./usuario-senhaResetarAlterar")}} //  this.UsuarioSenhaResetarAlterar(false) 
                    />        
                : ""
                }

                <Routes>
                     <Route 
                        path="/login" 
                        element={         
                            <UsuarioAutenticarView
                                visao={this.state.visao} 
                                OnAutenticou={(usuarioAutenticarEntidade) => this.Autenticou(usuarioAutenticarEntidade)} 
                                OnGeoLocalizar={() => {window.location.assign("./usuario-geoLocalizar")}} // this.GeoLocalizar() 
                                OnInstitucional={() => {window.location.assign("./institucional")} } // this.Institucional(false) 
                                OnUsuarioIncluir={() => {window.location.assign("./usuario-incluir")}} // this.UsuarioIncluir(false) 
                                OnUsuarioConfirmar={() => {window.location.assign("./usuario-senhaConfirmar")}} // this.UsuarioConfirmar(false)} 
                                OnUsuarioSenhaResetar={() => {window.location.assign("./usuario-senhaResetar")} } // this.UsuarioSenhaResetar(false) 
                                OnUsuarioSenhaResetarAlterar={() => {window.location.assign("./usuario-senhaResetarAlterar")}} //  this.UsuarioSenhaResetarAlterar(false) 
                            />        
                        }>                    
                    </Route> 

                    <Route 
                        path="/usuario-incluir" 
                        element={ 
                            <UsuarioView 
                            visao = "incluir" 
                            autenticado = {this.state.autenticado}
                            OnIniciar={()=>this.Iniciar()}
                            OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 
                            />
                        }>                    
                    </Route>


                    <Route 
                        path="/usuario-senhaConfirmar" 
                        element={ 
                            <UsuarioAutenticadorView 
                            visao = "usuario.senhaConfirmar" 
                            autenticado = {this.state.autenticado}
                            OnIniciar={()=>this.Iniciar()}
                            OnVoltar = {() => window.NavegarLogin()} //  this.setState({visao:"usuario.autenticar"}) 
                        />
                        }>                    
                    </Route>


                    <Route 
                        path="/usuario-geoLocalizar" 
                        element={ 
                            <LocalPesquisaGeoPosicaoView 
                                autenticado = {this.state.autenticado}
                                listaAutorizacao={this.state.listaAutorizacao}
                                visao = {this.state.visao} 
                                OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 
                            />
                        }>                    
                    </Route>


                    <Route 
                        path="/usuario-senhaResetar" 
                        element={ 
                            <UsuarioSenhaResetarView 
                                visao = "usuario.senhaConfirmar"  // <ops> trocar senhaConfirmar por senhaResetar
                                autenticado = {this.state.autenticado}
                                OnIniciar={()=>this.Iniciar()}
                                OnVoltar = {() => this.setState({visao:"usuario.autenticar"})} 
                            />
                        }>                    
                    </Route>



                    <Route 
                        path="/usuario-senhaResetarAlterar" 
                        element={ 
                            <UsuarioSenhaResetarAlterarView 
                                visao = "usuario.senhaConfirmar"  // <ops> trocar senhaConfirmar por senhaResetar
                                autenticado = {this.state.autenticado}
                                OnIniciar={()=>this.Iniciar()}
                                OnVoltar = {() => window.NavegarLogin() } // this.setState({visao:"usuario.autenticar"}) 
                            />
                        }>                    
                    </Route>



                    <Route 
                        path="/institucional" 
                        element={ 
                            <Institucional 
                                OnEntrar={( ) => this.IniciarEntrar() }
                            />
                        }>                    
                    </Route>


                    <Route 
                        path="/autenticador-autenticado" 
                        element={ 
                            <AutenticadorView codeWS={window.GetQueryString()['id_token']} />
                        }>                    
                    </Route>



                </Routes>
            </div>

        )
    }

}    

export default MaestroAnonimoRoutesView;