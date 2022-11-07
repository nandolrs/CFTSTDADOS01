import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import UsuarioArquivoView from './UsuarioArquivoView';

class UsuarioSenhaResetarAlterarForm extends React.Component
{
    constructor(props)
    {
        super(props);
        if(this.props.entidade.codigo==0)
        {
            this.state={codigo:0,nome:"", email:"",senha:'',senha2:'',fraseSecreta:''};
        }
    }

    Salvar()
    {
        this.props.OnSalvar(
                {codigo:this.state.codigo
                ,nome:this.state.nome
                ,email:this.state.email
                ,senha:this.state.senha
                ,senha2:this.state.senha2
                ,fraseSecreta:this.state.fraseSecreta
                }
            );
    }

    Voltar(){this.props.OnVoltar()}

    render()
    {
        return(
<div class="card">
  <div class="card-header">
  (ALTERAR SENHA ) ESQUECI MINHA SENHA
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
                disabled={this.props.entidade.codigo==0 ?  false : true}
            />

            <input type="password" class="form-control" id="inputSenha" 
                aria-describedby="senhaHelp" 
                placeHolder="Informe a senha." 
                onChange={(o)=>this.setState({senha:o.target.value})}
                value={this.state.senha}
                disabled={this.props.entidade.codigo==0 ?  false : true}
            />

            <input type="password" class="form-control" id="inputSenha2" 
                aria-describedby="senha2Help" 
                placeHolder="Informe a senha novamente." 
                onChange={(o)=>this.setState({senha2:o.target.value})}
                value={this.state.senha2}
                disabled={this.props.entidade.codigo==0 ?  false : true}
            />

            <div>
                <input type="fraseSecreta" class="form-control" id="inputFraseSecreta" 
                    aria-describedby="fraseSecretaHelp" 
                    placeHolder="Informe a frase secreta." 
                    onChange={(o)=>this.setState({fraseSecreta:o.target.value})}
                    value={this.state.fraseSecreta}
                    disabled={this.props.entidade.codigo==0 ?  false : true}
                />
            </div>

        </div>
            
        <button id='inputSalvar'    type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Salvar() }> {this.props.processando ? "Processando" : "Enviar"} </button>
        <button id='inputVoltar'    type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Voltar() }>Voltar </button>

    </fieldset>
                            
</div>


  </div>
</div>        

        );
    
    }

}


export default UsuarioSenhaResetarAlterarForm;

