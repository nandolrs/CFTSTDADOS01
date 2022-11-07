import React from 'react';
import axios from 'axios';

class UsuarioConviteForm extends React.Component
{
    constructor(props)
    {
        super(props);
        if(this.props.entidade.codigo==0)
        {
            this.state={
                 codigo:0
                ,dataAceite:""
            };
        }
        else
        {
            this.state={
                     codigo:this.props.entidade.codigo
                    ,dataAceite:this.props.entidade.dataAceite

            };
        }

    }

    Salvar()
    {
        this.props.OnSalvar(
                {
                 codigo:this.state.codigo
                ,dataAceite:this.state.dataAceite
                }
            );
    }

    Voltar(){this.props.OnVoltar()}

    render()
    {
        return(

<div class="card">
  <div class="card-header">
    {this.state.codigo == 0 ? "I N C L U I R" : "A L T E R A R"}
  </div>
  <div class="card-body">

  <fieldset>

        <div class="form-group">

            <input type="text" class="form-control" id="inputDataAceite"  
                    aria-describedby="dataAceiteHelp" 
                    placeHolder="Informe a data do aceite." 
                    onChange={(o)=>this.setState({dataAceite:o.target.value})}
                    value={this.state.dataAceite}
            />
        
        </div>

        <button  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Salvar() }> {this.props.processando ? "Processando" : "Salvar"} </button>
        <button  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Voltar() }>Voltar </button>

    </fieldset>

  </div>
</div>
                            
        );
    
    }

}


export default UsuarioConviteForm;

