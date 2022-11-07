import React from 'react';

//let matrizSelecionados = [];

class ListaSelecaoA extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={entidade:this.props.entidade};
        //let matrizSelecionados = props.matrizSelecionados;
    }

    render()
    {

        return(
            <div>
                <td>
                    <div class="form-check">
                    <input 
                        class="form-check-input position-static" 
                        type="checkbox" 
                        name="inputExcluir" 
                        id="inputExcluir"  
                        aria-label="..."
                        onClick1={(o) => this.props.OnClick(window.ExcluirObterCodigos().length > 0)} 
                        value={this.props.codigo} />
                    </div>
                </td>
            </div>
              );
    }
}
export default ListaSelecaoA;