import React from 'react';

class SisMensagemView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={visao:this.props.visao
            ,mensagem:this.props.mensagem
            ,autenticado:this.props.autenticado == null ? true : this.props.autenticado 
            ,mensagens:null
        }
    }

    MensagensListar(_class, mensagens)
    {
        let retorno =  
            <div>
                {
                mensagens.map( (m) => <div class = {_class} role="alert"> {m.mensagem}  </div>  )
                }
            </div>
 
        return retorno;
    
    }

    render()
    {
        var retorno = "";
        var _class = "";
        var _voltar = this.props.voltar == null ? "pesquisar" : this.props.voltar;

        var entrar = (this.props.visao.indexOf("mensagem.") >=0 );

        if(this.props.visao=="mensagem.erro")
        {
            _class="alert alert-danger";
            _voltar =  "incluir";
        }
        if(this.props.visao=="mensagem.sucesso")
        {
            _class="alert alert-success";
        }

        if(entrar)
        {
            retorno =
            <div> 
             {this.MensagensListar(_class, this.props.mensagens)}
            
            
            {this.props.autenticado == null || this.props.autenticado  ? 
            <button  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnClicou(_voltar) }>Voltar </button>
            : ""
            } 

            {this.props.botoes != null && this.props.botoes.indexOf("ok") >= 0 ?
                <button  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnClicou(null) }>Ok</button>
            : ""
            }

        </div>

        }

        return(retorno);
    }
}
export default SisMensagemView;