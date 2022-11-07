import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'

class UsuarioContaForm extends React.Component
{
    constructor(props)
    {
        super(props);
        if(this.props.entidade.codigo==0)
        {
            this.state={
                 codigo:0
                ,lista:null
                ,usuarioBuscou:false
            };
        }
        else
        {
            this.state={
                     codigo:this.props.entidade.codigo
                    ,lista:null
            };
        }
    }
    
    Salvar()
    {
        this.props.OnSalvar(
                {
                 codigo:this.state.codigo
                ,nome:this.state.nome
                ,descricao:this.state.descricao
                ,classe:{codigo:this.state.classeCodigo}
                }
            );
    }

    Voltar(){this.props.OnVoltar()}

    Selecionado(codigo)
    {
        var retorno =  codigo == this.state.classeCodigo ? "true" : "false";
        return retorno;
    }

    UsuarioApresentar()
    {
      let retorno='';

      if(this.props.entidade.arquivos != null
        && this.props.entidade.arquivos[0] != null
        && this.props.entidade.arquivos[0].conteudoBase64 != null 
      )
      {
          retorno = <img src={this.props.entidade.arquivos[0].conteudoBase64} class="mr-3 foto-mini" alt="..." />;
  
      }

      return retorno;

    }


    render()
    {
        return (
            <div>
    
    <a class="nav-link" href="#"  data-toggle="modal" data-target="#exampleModal">Conta <span class="sr-only"></span></a>
    
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Conta</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              {this.UsuarioApresentar()}
            </p>
          {window.getCookie('usuario.nome') }
            <br/>
          {window.getCookie('usuario.email') }
          <br/>
          AMBIENTE:[{process.env.REACT_APP_TESTE}]
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick = {() => this.props.OnSair()}>Sair</button>
          </div>
        </div>
      </div>
    </div>
              
    </div>
    
          );
        
    }

}


export default UsuarioContaForm;

