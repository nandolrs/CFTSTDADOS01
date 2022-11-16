import React from 'react';
import axios from 'axios';
import UsuarioView from './UsuarioView';
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'


class UsuarioPesquisa extends React.Component
{
    constructor(props)
    {
        

        super(props);
        this.state={
            codigo:0
            ,nome:""
            ,email:""
            ,visao:this.props.visao
            ,lista:null

        };
    }

    Pesquisar()
    {
        var entidade={codigo:0
            ,nome:this.state.nome
            ,classe:{codigo:this.state.classe}
        };

        this.props.OnPesquisar(entidade);
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
      P E S Q U I S A R 
      <p/> 1={this.props.url.pesquisar1} 
      <p/> 2={this.props.url.pesquisar}
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

                    <input type="text" class="form-control" id="inputEmail"  
                            aria-describedby="emailHelp" 
                            placeHolder="Informe o e-mail." 
                            onChange={(o)=>this.setState({email:o.target.value})}
                            value={this.state.email}
                    />

                </div>


                <PesquisaBotoes 
                    listaAutorizacao='<INICIO>Usuario.pesquisar<FIM>' //{this.props.listaAutorizacao}
                    objetoAutorizacao='Usuario'//{this.props.objetoAutorizacao}
                    OnIncluir={() => this.Incluir()}
                    OnPesquisar={() => this.Pesquisar()}
                />

            </fieldset>
                                    
        </div>

  </div>
</div>        
        
        );
    
    }

}


export default UsuarioPesquisa;

