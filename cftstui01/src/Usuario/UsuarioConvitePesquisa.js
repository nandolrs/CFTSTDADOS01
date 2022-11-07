import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import axios from 'axios';
import UsuarioConviteView from './UsuarioConviteView';
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'


class UsuarioConvitePesquisa extends React.Component
{
    constructor(props)
    {
        super(props);
        if(this.props.entidade.codigo==0)
        {
            this.state={
                 codigo:0
                ,dataCadastro:""
                ,visao:this.props.visao
            };
        }
        else
        {
            this.state={
                 codigo:this.props.entidade.codigo
                ,dataCadastro:this.props.entidade.dataCadastro
                ,visao:this.props.visao

                
            };
        }
    }

    Pesquisar()
    {

        var entidade={codigo:0
            ,dataCadastro:this.state.dataCadastro
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
  </div>
  <div class="card-body">

        <div>
            <fieldset>

                <div class="form-group">

                    <input type="datetime-local" class="form-control" id="inputDataCadastro"  
                            aria-describedby="dataCadastroHelp" 
                            placeHolder="Informe a data do cadastro." 
                            onChange={(o)=>this.setState({dataCadastro:o.target.value})}
                            value={this.state.dataCadastro}
                     />

                </div>

                <PesquisaBotoes 
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao={this.props.objetoAutorizacao}
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


export default UsuarioConvitePesquisa;

