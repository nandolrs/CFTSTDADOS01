import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
//import UsuarioArquivoView from '../Usuario/UsuarioArquivoView';

class UsuarioForm extends React.Component
{
    constructor(props)
    {
        super(props);
        if(this.props.entidade.codigo==0)
        {
            this.state={
                codigo:0
                ,nome:""
                , email:""
                , senha:""
                , senha2:""
                , organizacao:""
                , autenticado:props.autenticado};
        }
        else
        {
            var _entidadePai = {codigo:this.props.entidade.codigo};

            this.state={
                    codigo:this.props.entidade.codigo
                    ,nome:this.props.entidade.nome
                    ,email:this.props.entidade.email
                    ,senha:this.props.entidade.senha
                    ,senha2:""
                    ,organizacao:this.props.entidade.organizaco
                    ,autenticado:props.autenticado
                    ,visao_detalhe:"UsuarioArquivo.manter.pesquisar"
                    ,entidadePai:_entidadePai

            };
        }
    }


    Salvar()
    {
        this.props.OnSalvar(
                {codigo:this.state.codigo
                ,nome:this.state.nome
                ,email:this.state.email
                ,senha:this.state.senha
                ,pessoa:
                    {
                    nome:this.state.nome
                    ,dataNascimento:'1964/12/22'
                    ,organizacao:{nome:this.state.organizacao, tag:this.state.tag}
                    }
                }
            );
    }

    Voltar(){this.props.OnVoltar()}

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

            {!this.state.autenticado ? 

                <input type="text" class="form-control" id="inputOrganizacao"  
                        aria-describedby="organizacaoHelp" 
                        placeHolder="Informe o nome da organização." 
                        onChange={(o)=>this.setState({organizacao:o.target.value})}
                        value={this.state.organizacao}
                        disabled={this.props.entidade.codigo==0 ?  false : true}

                />
                : ""                
            }

            {!this.state.autenticado ? 

                <input type="text" class="form-control" id="inputTag"  
                        aria-describedby="tagHelp" 
                        placeHolder="Informe a tag da organização." 
                        onChange={(o)=>this.setState({tag:o.target.value})}
                        value={this.state.tag}
                        disabled={this.props.entidade.codigo==0 ?  false : true}

                />
                : ""
                
            }

  

        </div>
            
        <button  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Salvar() }> {this.props.processando ? "Processando" : "Salvar"} </button>

        {this.state.autenticado  ?
            <button  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.Voltar() }>Voltar </button>

        : ""
        }

    </fieldset>
                            
</div>


  </div>
</div>        

        );
    
    }

}


export default UsuarioForm;

