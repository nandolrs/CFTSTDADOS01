import React from 'react';
import axios from 'axios';
import ListaCabecalho from '../SisPadrao/ListaCabecalho'
import ListaSelecao from '../SisPadrao/ListaSelecao'
import ListaBotoes from '../SisPadrao/ListaBotoes'

var matrizSelecionados = [];

class UsuarioConviteLista extends React.Component
{
    
    constructor(props)
    {
        super(props);
        this.state={entidade:this.props.entidade};
    }

    Selecionado(_selecionados, _matrizExcluir)
    {
      this.setState({selecionados:_selecionados});
      matrizSelecionados=_matrizExcluir;
    }  
    
    Voltar(){this.props.OnVoltar()}


    ApresentarAceitarCancelar(entidade)
    {

      let retorno = "";
      
      if(entidade.podeAceitar==1)
      {
        retorno = 
        <div>
          <button  type="button" class="btn btn-outline-primary" onClick={() => this.props.OnAceitar(entidade) }>Aceitar </button>
          <button  type="button" class="btn btn-outline-warning" onClick={() => this.props.OnRecusar(entidade) }>Recusar </button>
        </div>;

      }
      if(entidade.podeCancelar==1)
      {
        retorno = 
        <button  type="button" class="btn btn-outline-warning" onClick={() => this.props.OnCancelar(entidade) }>Cancelar </button>;
      }

      return retorno;

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
      <th scope="col">Remetente</th>
      <th scope="col">Ação</th>
      <ListaCabecalho 
        objetoAutorizacao={this.props.objetoAutorizacao}
        listaAutorizacao={this.props.listaAutorizacao}
      />    
    </tr>
  </thead>
  <tbody>

  {
    this.state.entidade.map( (entidade) =>  <tr  key={entidade.codigo} >
    <td onClick={(e) => this.props.OnConsultar(entidade.codigo)}>
      {entidade.remetente.nome}
    </td>

<td>
      {this.ApresentarAceitarCancelar(entidade)}
</td>
    <ListaSelecao 
        objetoAutorizacao={this.props.objetoAutorizacao}
        listaAutorizacao={this.props.listaAutorizacao}
        codigo={entidade.codigo}  
        OnClick={(sel) => this.setState({selecionados:sel})  }
    />
  </tr>


    )
               
}      
   

  </tbody>
</table>
        </div>                            

    </div>

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


export default UsuarioConviteLista;

