import React from 'react';
import axios from 'axios';
import ListaCabecalho from '../SisPadrao/ListaCabecalho'
import ListaSelecao from '../SisPadrao/ListaSelecao'
import ListaBotoes from '../SisPadrao/ListaBotoes'
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'

var matrizSelecionados = [];

class UsuarioArquivoLista extends React.Component
{
    
    constructor(props)
    {
        super(props);
        this.state={entidade:this.props.entidade ,selecionados:false};
    }

    Voltar(){this.props.OnVoltar()}

    Consultar(codigo)
    {
        this.props.OnConsultar(codigo);
    }

    Incluir()
    {
        this.props.OnIncluir();
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
      <ListaCabecalho 
        objetoAutorizacao={this.props.objetoAutorizacao}
        listaAutorizacao={this.props.listaAutorizacao}
      />    
    </tr>
  </thead>
  <tbody>

{this.state.entidade != null ?


  this.state.entidade.map( (entidade) =>  <tr  key={entidade.codigo} >
  <td onClick={(e) => this.Consultar(entidade.codigo)} >{entidade.nome}</td>
  <td>{entidade.descricao}</td>

  <ListaSelecao 
      objetoAutorizacao={this.props.objetoAutorizacao}
      listaAutorizacao={this.props.listaAutorizacao}
      codigo={entidade.codigo}  
      OnClick={(sel) => this.setState({selecionados:sel})  }
      />
</tr>


  )
             
   

:""
}

   

  </tbody>
</table>
        </div>                            

    </div>

    <ListaBotoes 
      botoes="incluirXexcluir"
      selecionados={this.state.selecionados}
      objetoAutorizacao={this.props.objetoAutorizacao}
      listaAutorizacao={this.props.listaAutorizacao}
      OnExcluir={(codigos) => this.props.OnExcluir(codigos)}
      OnIncluir={() => this.Incluir()}
      OnVoltar={() => this.Voltar()}

      />

  </div>                            
</div>                            
        
        );
    
    }

}


export default UsuarioArquivoLista;