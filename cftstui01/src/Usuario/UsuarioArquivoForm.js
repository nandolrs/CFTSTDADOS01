import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'

import SisArquivoPlayerView from '../SisArquivo/SisArquivoPlayerView'



class UsuarioArquivoForm extends React.Component
{

  arquivoTratador = event => { this.setState({arquivoSelecionado:event.target.files[0]
    ,nome:event.target.files[0].name
    ,tamanho:event.target.files[0].size
    ,tipo:event.target.files[0].type

})
; this.Processar(event.target.files[0], this) 

}

  Processar(file, _this) {

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
    async function Main() {
       let resultado = await toBase64(file);
       _this.setState({arquivoBASE64: resultado});
        return resultado;
    }
    
    let resultado = Main();

    return resultado;

    
  }

    constructor(props)
    {
        super(props);
        if(this.props.entidade.codigo==0)
        {
            this.state={
                 codigo:0
                ,nome:""
                ,descricao:""
                ,logoFoto:0
                ,conteudoFormFile:null
                ,arquivoBASE64:null
            };
        }
        else
        {
            this.state={
                 codigo:this.props.entidade.codigo
                ,nome:this.props.entidade.nome
                ,descricao:this.props.entidade.descricao
                ,logoFoto:this.props.entidade.logoFoto
                ,conteudoFormFile:null
                ,arquivoBASE64:null
                ,sisArquivo:this.props.entidade.sisArquivo
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
                ,logoFoto: this.state.logoFoto
                ,usuario:this.props.entidade.usuario
                ,sisArquivo:{codigo:99, nome:this.state.nome, conteudoFormFile:this.state.arquivoBASE64, tamanho:this.state.tamanho, tipo:this.state.tipo}
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

  <fieldset>

        <div class="form-group">


            <input type="text" class="form-control" id="inputNome"  
                    aria-describedby="nomeHelp" 
                    placeHolder="Informe o nome." 
                    onChange={(o)=>this.setState({nome:o.target.value})}
                    value={this.state.nome}
            />
            <input type="text" class="form-control" id="inputDescricao"  
                    aria-describedby="descricaoHelp" 
                    placeHolder="Informe a descrição." 
                    onChange={(o)=>this.setState({descricao:o.target.value})}
                    value={this.state.descricao}
            />

            <select 
                class="form-control form-control-sm" 
                id="inputLogoFoto" 
                onChange={(o)=>this.setState({logoFoto:o.target.value})}
                defaultValue={this.state.logoFoto}
                value={this.state.logoFoto}
          >

                <option value='1' > SIM </option> 
                <option value='2' > NÃO </option> 
                <option value="0" >Trata-se de uma foto/logo</option>

            </select>

            <input type="file" class="form-control" id="inputArquivo"  
                    aria-describedby="arquivoHelp" 
                    placeHolder="Informe o arquivo." 
                    onChange={this.arquivoTratador}
            />

      <SisArquivoPlayerView 
          entidade={this.state.sisArquivo}
          inputPosicao='0'
      />

            {this.props.entidade.codigo !== 0 ? 
              <a href={ this.state.sisArquivo.conteudoBase64} 
                  class="btn btn-primary btn-lg active" role="button" aria-pressed="true"
                  download={this.state.sisArquivo.nome}>
                  Baixar/Download
              </a>
            :""
            }


        </div>

        <FormBotoes
            codigo={this.props.entidade.codigo} 
            listaAutorizacao={this.props.listaAutorizacao}
            objetoAutorizacao={this.props.objetoAutorizacao}
            processando={this.props.processando}
            OnSalvar={() => this.Salvar()}
            OnVoltar={() => this.Voltar()}
        />

    </fieldset>

  </div>
</div>
                            
        );
    
    }

}


export default UsuarioArquivoForm;

