import React from 'react';

let matrizSelecionados = [];

class ListaSelecao extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={entidade:this.props.entidade};
        let matrizSelecionados = props.matrizSelecionados;
    }

    Selecionar(o)
    {      
      this.props.OnClick(window.ExcluirObterCodigos().length > 0);
    }    

    render()
    {

        return(
            <td align='right'>
            {
            
            window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".excluir"), this.props.listaAutorizacao) 
            || this.props.objetoAutorizacao == "all"
            ? 
            <div class="form-check">
            <input 
                class="form-check-input position-static" 
                type="checkbox" 
                name="inputExcluir" 
                id="inputExcluir"  
                aria-label="..."
                onClick={(o) => this.Selecionar(o.target)} value={this.props.codigo} />
            </div>
            : ""
            }
            </td>
              );
    }
}
export default ListaSelecao;