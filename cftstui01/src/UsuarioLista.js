import React from 'react';
import './App.css';
import axios from 'axios';

class UsuarioLista extends React.Component {

  constructor(props)
  {
    debugger;

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

  
  Listar()
  {
    debugger;

        axios.get(process.env.REACT_APP_SERVER_URL + '/api/usuarios'
            ,null //window.getCabeca()
        )
        .then((resposta) => this.Listou(resposta))
        .catch((resposta) => this.Listou(resposta));

  }

  Listou(resposta)
  {

        var retorno = null;

        if(resposta.status == 200)
        {   
            var erro = resposta.erro;
            if(resposta.status != 200 ) // erro != null
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            {

              this.setState({visao:"listar", entidadeLista: resposta.data}); // resposta


                //retorno = {visao:"listar"
                //    ,entidade:resposta.data //resposta.data.dadosLista
              //      ,mensagens:window.ToMensagens("Pesquisa retornou com sucesso.")
              //  };


            }
            
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao pesquisar registro, repita a operação.")
            };
      }
  }

  render() {
    return (
      <div>
                <form>
                    <button type="submit" class="btn btn-primary" onClick={() => this.props.OnClickCadastrar()} >Cadastrar</button>
                    {
                        this.state.entidadeLista.map( 
                            (entidade) => <div class="shadow-lg p-3 mb-5 bg-body rounded">entidade.Nome</div>            
                          )
                    }
                </form>

      </div>

    );
  }
}

export default UsuarioLista;
