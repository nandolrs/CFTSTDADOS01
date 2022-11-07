import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import UsuarioArquivoView from './UsuarioArquivoView';

class UsuarioSenhaTrocarForm extends React.Component
{
    constructor(props)
    {
        super(props);
        if(this.props.entidade.codigo==0)
        {
            this.state={codigo:0,nome:"", email:"", fraseSecreta:""};
        }

    }

    Salvar()
    {
        this.props.OnSalvar(
                {codigo:this.state.codigo
                ,nome:this.state.nome
                ,email:this.state.email
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
  {"C O N F I R M A Ç Ã O"}
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
            
        <button id='inputSalvar'    type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Salvar() }> {this.props.processando ? "Processando" : "Salvar"} </button>
        <button id='inputVoltar'    type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Voltar() }>Voltar </button>

    </fieldset>
                            
</div>


  </div>
</div>        

        );
    
    }

}


export default UsuarioSenhaTrocarForm;

