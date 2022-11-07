import React from 'react';
import axios from 'axios';
import ListaBotoes from '../SisPadrao/ListaBotoes'

class UsuarioLista extends React.Component
{
    
    constructor(props)
    {
        super(props);
        this.state={entidade:this.props.entidade};
    }

    Voltar(){this.props.OnVoltar()}

    Consultar(codigo)
    {
        this.props.OnConsultar(codigo);
    }

    render()
    {
        return(
        
<div class="card">
  <div class="card-header">
      L I S T A R
  </div>
  <div class="card-body">

    <div>

        <div class="form-group">

<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th>E-mail</th>
      {this.state.podeExcluir ? <th ></th>  : "" }
    </tr>
  </thead>
  <tbody>

  {
    this.state.entidade.map( (entidade) =>  <tr  key={entidade.codigo} >
    <td scope="row" onClick={(e) => this.Consultar(entidade.codigo)}>{entidade.nome}</td>
    <td>{entidade.email}</td>
    {this.state.podeExcluir ? 
      <td>
      <div class="form-check">
      <input class="form-check-input position-static" type="checkbox" name="inputExcluir" id="inputExcluir"  aria-label="..."
      onClick={(o) => this.Selecionar(o.target)} value={entidade.codigo} />
      </div>
      </td>
    : ""
    }

  </tr>


    )
               
}      
   

  </tbody>
</table>
        </div>                            

    </div>

    {/* <button  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Voltar() }>Voltar </button> */}

    <ListaBotoes 
      selecionados={this.state.selecionados}
      listaAutorizacao={this.props.listaAutorizacao}
      objetoAutorizacao={this.props.objetoAutorizacao}
      OnExcluir={(codigos) => this.props.OnExcluir(codigos)}
      OnVoltar={() => this.Voltar()}
    />

  </div>                            
</div>                            
        
        );
    
    }

}


export default UsuarioLista;

