import React from 'react';
import axios from 'axios';
//import ClasseView from './ClasseView';

class PadraoPesquisa extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    // Pesquisar()
    // {

    //     var entidade={codigo:0
    //         ,nome:this.state.nome
    //         ,classePai:{codigo:this.state.classePai}
    //     };

    //     this.props.OnPesquisar(entidade);
        
    // }

    Incluir()
    {
        this.props.OnIncluir();
    }


    render()
    {
        return(
<div class="card">
  <div class="card-header">
      P E S Q U I S A R
  </div>
  <div class="card-body">

        <div>
            <fieldset>

                <div class="form-group">

                    <input type="text" class="form-control" id="inputNome"  
                            aria-describedby="nomeHelp" 
                            placeHolder="Informe o nome." 
                            onChange={(o)=>this.setState({nome:o.target.value})}
                            value={this.state.nome}
                        />

                    <select 
                        class="form-control form-control-sm" 
                        id="InputClasse" 
                        onChange={(o)=>this.setState({classePaicodigo:o.target.value})}>
            
                        <option value="0">Informe a classe</option>

                        {this.state.lista != null ?

                        this.state.lista.map( (entidade) =>  <option value={entidade.codigo}>{entidade.nome}</option> )
                        : ""
                        }

                    </select>

                </div>


                    <button  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Pesquisar() }>Pesquisar </button>

                    <button  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Incluir() }>Incluir </button>

            </fieldset>
                                    
        </div>

  </div>
</div>        
        
        );
    }

}


export default PadraoPesquisa;

