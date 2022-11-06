import React from 'react';
import './App.css';

import axios from 'axios';

class UsuarioForm extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
       visao:props.visao 
      ,email:''
      ,nome:''
      ,senha:''
      ,url: process.env.REACT_APP_SERVER_URL + '/api/usuario' // 'https://localhost:44301/'
      ,entidadeLista:props.entidadeLista
    };
  }


  SalvarClique()
  {
    this.props.OnClickCadastrar();
  }

  Salvar()
  {

    let entidade = {
         codigo:0
        ,email: this.state.email
        ,nome:this.state.nome
        ,senha:this.state.senha
    };
  
    if(entidade.codigo==0)
    {
        axios.post(this.state.url
            ,entidade
            ,null //window.getCabeca()
        )
        .then((resposta)=>this.Salvou(resposta))
        .catch((resposta) => this.Salvou(resposta));
    }
    else
    {
        axios.put(this.state.url
            ,entidade
            ,null //window.getCabeca()
        )
        .then((resposta)=>this.Salvou(resposta))
        .catch((resposta) => this.Salvou(resposta));
    }


  }

  Salvou(resposta)
  {

      var retorno = null;

      if(resposta.request.status == 200)
      {
          var erro = resposta.data.erro;
          if(erro != null)
          {
              var itens = erro.itens;
              var msg = itens[0].mensagem;
              retorno = {visao:"mensagem.erro"
                , mensagens:erro.itens
              };
          }
          else
          {
              retorno = {visao:"mensagem.sucesso"
                ,mensagens:window.ToMensagens("Registro salvo com sucesso.")
              };
          }
      }
      else
      {
          retorno = {visao:"mensagem.erro"
          ,mensagens:window.ToMensagens("Erro ao salvar registro, repita a operação.")
          };
      }

  }

  OnClickSalvar()
  {
  }

  render() {
      return (
          <div>
                  <form>
                      <button type="submit" class="btn btn-primary" onClick={() => this.props.OnClickListar()}>Listar</button>
                      <div class="mb-3">
                        <label for="exampleInputEmail" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail" 
                                onChange={(o)=>this.setState({email:o.target.value})}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputNome" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="exampleInputNome" 
                                onChange={(o)=>this.setState({nome:o.target.value})}
                        />
                      </div>

                      <div class="mb-3">
                        <label for="exampleInputPassword" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="exampleInputPassword"
                                onChange={(o)=>this.setState({senha:o.target.value})}
                        />
                      </div>

                      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                          <button type="submit" class="btn btn-warning" onClick={() => this.OnClickSalvar()}>Salvar</button>
                      </div>


                  </form>
            

          </div>
    ) // return
  } // render
} // class

export default UsuarioForm;
