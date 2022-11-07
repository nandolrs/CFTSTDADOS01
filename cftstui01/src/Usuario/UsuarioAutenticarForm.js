import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import axios from 'axios';

//import ReactGA from 'react-ga';
import SisAcordeon from '../SisPadrao/SisAcordeon';

       
class UsuarioAutenticarForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={email:this.props.email, senha:this.props.senha};

        // ReactGA.initialize(process.env.REACT_APP_GA);

        // ReactGA.event({
        //     category: 'User',
        //     action: 'cmjw_login'
        //   });

        //   ReactGA.event({
        //     category: 'User',
        //     action: 'usuario_login'
        //   });

        // ReactGA.pageview('/UsuarioAutenticarForm');


    }

    Autenticar()
    {
        this.props.OnAutenticar({email:this.state.email, senha:this.state.senha, senhaRatificada:this.state.senha});
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

    

    GeoLocalizacao()
    {
        this.props.OnGeoLocalizar();
    }

    render()
    {
                
        let cadastrar =
            <div>

                <button id='inputCadastrar'     type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.UsuarioIncluir() }>Cadastrar-se </button>
                <button id='inputConfirmar'     type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.UsuarioConfirmar() }>Confirmar cadastro</button>
                <button id='inputEsqueciSenha'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.UsuarioSenhaResetar() }>Esqueci minha senha </button>
                <button id='inputEsqueciSenhaAlterar'  
                                                type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.UsuarioSenhaResetarAlterar() }> Alterar senha  (Esqueci minha senha)  </button>
                <button id='inputGeoLocal'      type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.GeoLocalizacao() }>Geo Localização </button>

            </div>;

        return(

<div class="card">
  <div class="card-header">
    E N T R A D A
  </div>
  <div class="card-body">

    <div>
            <fieldset>

                
                <div class="form-group">
                    <input type="email"  class="form-control" id="inputEmail"  
                        aria-describedby="emailHelp" 
                        placeHolder="Informe o email." 
                        onChange={(o)=>this.setState({email:o.target.value})}
                        value={this.state.email}
                    />
                </div>

                <div class="form-group">
                    <input type="password" class="form-control" id="inputSenha" 
                        aria-describedby="senhaHelp" 
                        placeHolder="Informe a senha." 
                        onChange={(o)=>this.setState({senha:o.target.value})}
                        value={this.state.senha}/>
                </div>

                <button id='inputEntrar'        type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Autenticar() }>Entrar </button>
                <button id='inputInstitucional' type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Institucional() }>Institucional </button>
                <p/>
                <SisAcordeon embutido={cadastrar} />

            </fieldset>
                    


                    
        </div>


  </div>
</div>        
                
        );
    
    }

}


export default UsuarioAutenticarForm;

