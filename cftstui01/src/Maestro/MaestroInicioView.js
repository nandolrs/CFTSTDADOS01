import React from 'react';

import { isNumericLiteral } from '@babel/types';
import axios from 'axios';

//import ReactGA from 'react-ga';
//import { Route, BrowserRouter } from "react-router-dom";
import { render } from 'react-dom';

import MaestroRoutesView from '../Maestro/MaestroRoutesView';
//import MaestroAnonimoRoutesView from '../Maestro/MaestroAnonimoRoutesView';

class MaestroInicioView extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state={
             visao: '' // 'autenticacao-verificar'
            ,autorizacao:null 
       };
   }

    componentDidMount()
    {
        debugger;

        if(window.location.pathname !== '/autenticador-autenticado')
        {
            if(process.env.REACT_APP_AUTENTICADOR_PROVIDER == 'CMJ')
            {
                this.AutenticarVerificar();
            } 
            
            if(process.env.REACT_APP_AUTENTICADOR_PROVIDER == 'AWS')
            {
                this.AutenticarVerificar();
            }
        }
        else
        {
            this.UsuarioAutenticar();
        }

     }

    AutenticarVerificar()
    {
        /*
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/usuarios/autenticar/"
            ,window.getCabeca())
            .then((resposta)=>this.AutenticarVerificou(resposta))
            .catch((resposta => this.AutenticarVerificou(resposta))
        );
        */

        let resposta = null
        this.AutenticarVerificou(resposta)
    }

    AutenticarVerificou_(resposta)
    {
        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                this.setState({
                    visao: 'autenticacao-verificar'
               });       
            }
            else
            {
                this.Autenticou();
            }
        }
        else
        {
            this.setState({
                visao: 'autenticacao-verificar'
           });       
        }

    }

    AutenticarVerificou(resposta)
    {
        /*
        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                if(process.env.REACT_APP_AUTENTICADOR_PROVIDER == 'AWS')
                {
                    this.AutenticarVerificarAWS();
                }
                else
                {
                    this.setState({
                        visao: 'autenticacao-verificar'
                   });       
    
                }
            }
            else
            {
                this.Autenticou();
            }
        }
        else
        {
            if(process.env.REACT_APP_AUTENTICADOR_PROVIDER == 'AWS')
            {
                this.AutenticarVerificarAWS();
            }
            else
            {
                this.setState({
                    visao: 'autenticacao-verificar'
               });       

            }
        }
        */

        this.Autenticou();


    }

    Autenticou(entidade)
    {
        this.AutorizacaoPorUsuarioListar();
    }

    AutorizacaoPorUsuarioListar()
    {
      //axios.get(process.env.REACT_APP_SERVER_URL + "/api/autorizacoes/pesquisarPorUsuario/",window.getCabeca()).then((resposta)=>this.AutorizacaoPorUsuarioListou(resposta));

      let resposta = null;

      this.AutorizacaoPorUsuarioListou(resposta);
    }


    AutorizacaoPorUsuarioListou(resposta)
    {
        /*
        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                window.NavegarRaiz();
            }
            else
            {
                var _listaAutorizacao = resposta.data.dadosLista;
                var _autorizacao = "";
                _listaAutorizacao.map( (item) =>  _autorizacao = _autorizacao + ( '<INICIO>' + item.nome + '.' + item.permissao + '<FIM>'));            
    
                this.setState({visao:'autenticacao-autenticado', autorizacao:_autorizacao})          
                }
        }
        else
        {
            window.NavegarRaiz();
        }

        */

        let _autorizacao = null;
        this.setState({visao:'autenticacao-autenticado', autorizacao:_autorizacao});          


        
    }

    AutenticarVerificarAWS()
    {
        let urlAWS = process.env.REACT_APP_AUTENTICADOR_PROVIDER_AWS_URL;

        window.Navegar(urlAWS);
    }

    UsuarioAutenticar()
    {
        debugger;
        
        let codeWS = window.GetQueryString()['id_token'];

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/usuarios/autenticar/",window.getCabecaToken(codeWS)).then((resposta)=>this.UsuarioAutenticou(resposta));
    }

    UsuarioAutenticou(resposta)
    {
        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                this.setState({
                    visao: 'autenticacao-erro'
               });       
            }
            else
            {
                window.setCookie("token", resposta.data.dados.token, 1);
                window.setCookie("usuario.email", resposta.data.dados.usuarioEmail, 1);
                this.AutenticarVerificou(resposta);
            }
        }
        else
        {
            this.setState({
                visao: 'autenticacao-erro'
           });       
        }

    }

    render()
    {
        return(
            <div>
                
   
                <MaestroRoutesView   autorizacao={this.state.autorizacao}/>  
                    :""   

                {this.state.visao=="autenticacao-autenticado" ? 
                    <MaestroRoutesView   autorizacao={this.state.autorizacao}/>  
                    :""
                }

                {this.state.visao=="autenticacao-erro" ? 
                    <div> Erro na autenticação</div> 
                    :""
                }

            </div>
        );

    }
    
}

export default MaestroInicioView;