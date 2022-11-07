import React from 'react';
import axios from 'axios';
import SisManterView from '../SisPadrao/SisManterView';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import ClasseSelecaoView from '../Classe/ClasseSelecaoView';
import MunicipioSelecionarView from '../Municipio/MunicipioSelecionarView';

class UsuarioAnonimoForm extends React.Component
{
    constructor(props)
    {
        super(props);
        var _mensagens = [{mensagem:"Registro Salvo com sucesso. Selecione MENU para acessar o login e informar o usuário e senha cadastrados."}];
        var _url = {
            pesquisar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/pesquisar/"
           ,salvar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/"
           ,consultar:process.env.REACT_APP_SERVER_URL + "/api/usuarios/"
           ,excluir:process.env.REACT_APP_SERVER_URL + "/api/usuarios/excluir/"
        };
        if(this.props.entidade.codigo==0)
        {
            this.state={
                 codigo:0
                ,nome:""
                ,email:""
                ,senha:""
                ,senha2:""
                ,organizacao:""
                ,descricao:""
                ,matrizSelecionados:[]
                ,municipioCodigo:0
                ,latitude:0
                ,longitude:0
                ,dataNascimento:''
                ,autenticado:props.autenticado
                ,url:_url
                ,mensagens:_mensagens
            };
        }
        else
        {

            this.state={
                 codigo:this.props.entidade.codigo
                ,nome:this.props.entidade.nome
                ,email:this.props.entidade.email
                ,senha:this.props.entidade.senha
                ,senha2:""
                ,organizacao:this.props.entidade.organizacao
                ,descricao:this.props.entidade.descricao
                ,matrizSelecionados:this.props.matrizSelecionados
                ,municipioCodigo:this.state.municipioCodigo
                ,latitude:this.state.latitude
                ,longitude:this.state.longitude
                ,dataNascimento:this.state.dataNascimento

                ,autenticado:props.autenticado
                ,url:_url
                ,mensagns:_mensagens

                ,visao:"informar"
            };
        }
    }

    Evento(estado, acao)
    {

        this.setState(estado);
    }

    Salvar()
    {     
        // coordenadas

        let _interesseCoordenadas = window.CoordenadasObterParaInteresseObter();

        // classe

        let classeCodigo;
        let classeCodigos =  window.ExcluirObterCodigos();
        let _interesseClasse = [];

        classeCodigos.map( (codigo) =>
            {
                classeCodigo = {valor:codigo};
                _interesseClasse.push(classeCodigo);

            }

        );



        // municipio

        let _interesseMunicipio = [];
        if(this.state.municipioCodigo != 0)
        {
            _interesseMunicipio = [{valor:this.state.municipioCodigo}];
        }

        let _token = window.location.pathname != '/' ? window.location.pathname.substr(1) : '';

        let _entidade =                 
            {codigo:this.state.codigo
            ,nome:this.state.nome
            ,email:this.state.email
            ,senha:this.state.senha
            ,interesseClasse:_interesseClasse
            ,interesseMunicipio:_interesseMunicipio // [{valor:_municipioCodigo}]
            ,interesseCoordenadas:_interesseCoordenadas
            ,dataNascimento: this.state.dataNascimento != '' ? this.state.dataNascimento : '0001-01-01T00:00:00' 
            ,token:_token
            ,organizacao:{nome:this.state.organizacao, descricao:this.state.descricao, tag:this.state.tag}
            ,pessoa:
                {
                nome:this.state.nome
                ,dataNascimento:'1964/12/22'
                ,organizacao:{nome:this.state.organizacao, descricao:this.state.descricao, tag:this.state.tag}
                }
            
            };


        this.setState({entidade:_entidade, visao:"salvar"});

    }

    Clicou(v)
    {
        this.props.OnIniciar();
    }

    Voltar(){this.props.OnVoltar()}


    Selecionado(_selecionado, _matrizSelecionados)
    {
        this.setState({selecionado:_selecionado, matrizSelecionados:_matrizSelecionados});
    }

    Selecionou(nome, codigo)
    {
        if(nome=='municipio')
        {
            this.setState({municipioCodigo: codigo});
        }

    }


    Localizar()
    {
        window.CoordenadasObterParaInteresse();

    }

    setStatee(o)
    {
        this.setState({latitude:o});
    }
    
    render()
    {
        return(

<div class="card">
  <div class="card-header">
  {this.state.codigo == 0 ? "I N C L U I R" : "A L T E R A R"}
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

            <input type="email"  class="form-control" id="inputEmail"  
                aria-describedby="emailHelp" 
                placeHolder="Informe o email." 
                onChange={(o)=>this.setState({email:o.target.value})}
                value={this.state.email}
                disabled={this.props.entidade.codigo==0 ?  false : true}
            />

            {this.state.codigo == 0 ?
                <div>
                    <input type="password" class="form-control" id="inputSenha" 
                        aria-describedby="senhaHelp" 
                        placeHolder="Informe a senha." 
                        onChange={(o)=>this.setState({senha:o.target.value})}
                        value={this.state.senha}
                        disabled={this.props.entidade.codigo==0 ?  false : true}
                    />
                    <input type="password" class="form-control" id="inputSenha2" 
                        aria-describedby="senha2Help" 
                        placeHolder="Informe a senha novamente." 
                        onChange={(o)=>this.setState({senha2:o.target.value})}
                        value={this.state.senha2}
                        disabled={this.props.entidade.codigo==0 ?  false : true}
                    />

                </div>

                : ""
            }

            <label for="inputDataNascimento">Data de nascimento</label>

            <input type="date" class="form-control" id="inputDataNascimento"  
                    aria-describedby="dataNascimentoHelp" 
                    placeHolder="Informe a data de nascimento." 
                    onChange={(o)=>this.setState({dataNascimento:o.target.value})}
                    value={this.state.dataNascimento}
            />



            {!this.state.autenticado ? 
                <div>
                    <input type="text" class="form-control" id="inputOrganizacao"  
                            aria-describedby="organizacaoHelp" 
                            placeHolder="Informe o nome da organização." 
                            onChange={(o)=>this.setState({organizacao:o.target.value})}
                            value={this.state.organizacao}
                            disabled={this.props.entidade.codigo==0 ?  false : true}

                    />

                    <textarea class="form-control" id="inputDescricao"  
                        aria-describedby="descricaoHelp" 
                        placeHolder="Informe a descrição da organizaçào." 
                        onChange={(o)=>this.setState({descricao:o.target.value})}
                        value={this.state.descricao}
                        rows="3"
                    />          

                    <input type="text" class="form-control" id="inputTag"  
                        aria-describedby="tagHelp" 
                        placeHolder="Informe a tag da organização." 
                        onChange={(o)=>this.setState({tag:o.target.value})}
                        value={this.state.tag}
                        disabled={this.props.entidade.codigo==0 ?  false : true}
                    />

                    <button id='inputQueroSerLocalizado'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Localizar() }> Quero ser localizado </button>

                    <input type="text" class="form-control" id="inputLatitude"  
                        aria-describedby="tagHelp" 
                        placeHolder="Informe a latitude." 
                        onChange={(o)=>this.setStatee({latitude:o.target.value})}
                        value={this.state.latitude}
                        disabled='true'
                    />


                    <input type="text" class="form-control" id="inputLongitude"  
                        aria-describedby="tagHelp" 
                        placeHolder="Informe a longitude." 
                        onChange={(o)=>this.setState({longitude:o.target.value})}
                        value={this.state.longitude}
                        disabled='true'
                    />

                    <MunicipioSelecionarView 
                        autenticado = {this.state.autenticado}
                        entidadePai={this.state.entidadePai}
                        listaAutorizacao={this.props.listaAutorizacao}
                        visao = {"manter.pesquisarParaListar"} 
                        OnSelecionou={(codigo) => this.Selecionou('municipio', codigo)}
                    />


                    <ClasseSelecaoView 
                        ObterMatriz={this.state.matrizSelecionados}
                        OnClick1={(_selecionados, _matrizSelecionados) => this.Selecionado(_selecionados, _matrizSelecionados)}
                        onClick={(o) => this.props.OnClick(window.ExcluirObterCodigos().length > 0)} 
                        />

                </div>

                : ""                
            }

        </div>

        {this.state.visao != "mensagem.sucesso"  ?
            <div>
                <button id='inputSalvar'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Salvar() }> {this.props.processando ? "Processando" : "Salvar"} </button>
                <button id='inputVoltar'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Voltar() }>Voltar </button>
            </div>
        : ""
        }

        {this.state.visao=="salvar"  ?
            <SisManterView 
                visao="manter.salvar"
                entidade={this.state.entidade}
                url={this.state.url}
                OnEvento={(estado, acao) => this.Evento(estado, acao) }
            />

            : ""
        }
<br/>
        {this.state.visao=="mensagem.sucesso"  ?
            <SisMensagemView
                botoes="ok"
                visao={this.state.visao}
                mensagens={[
                         {mensagem:"Registro salvo com sucesso."}
                        ,{mensagem:"Enviamos um e-mail de confirmação com a frase secreta."}
                        ,{mensagem:"Para confirmar o cadastro, selecione a opção 'Confirmar cadastro' e informe a frase secreta recebida."}

                    ]}
                autenticado={this.state.autenticado}
                OnClicou={(v) => this.Clicou(v)}
            />

            : ""
        }

        {this.state.visao=="mensagem.erro"  ?
            <SisMensagemView
                autenticado={this.state.autenticado}
                mensagens={this.state.mensagens}
                visao={this.state.visao}
                OnClicou={(v) => this.setState({visao:v})}
            />
            : ""

        }

    </fieldset>
                            
</div>


  </div>
</div>        

        );
    
    }

}

export default UsuarioAnonimoForm;