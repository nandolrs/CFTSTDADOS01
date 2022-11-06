import './App.css';
import React from 'react';
import axios from 'axios';
import UsuarioLista from './UsuarioLista';
import UsuarioForm from './UsuarioForm';


class UsuarioMaestro extends React.Component {

  constructor(props)
  {
    super();
    this.state={
      visao:'cadastrar'   // cadastrar/listar
      ,entidadeLista:null
    };
  }

  Listar()
  {
    debugger;
    this.setState({visao:"listar"});
  }


  Cadastrar()
  {
    this.setState({visao:"cadastrar"});
  }

  render() {
    return (
      <div class='row'>

          <div class='col'>


        <UsuarioLista 
          entidadeLista     = {this.state.entidadeLista}
          visao             = {this.state.visao} 
          OnClickCadastrar  = {() => this.Cadastrar()}
        />  


        <UsuarioForm 
          entidadeLista     = {this.state.entidadeLista}
          visao             = {this.state.visao} 
          OnClickListar     = {() => this.Listar()}
        />     



 
         
          </div> 

      </div> 
 
    ); // return
  } // render

}

export default UsuarioMaestro;
