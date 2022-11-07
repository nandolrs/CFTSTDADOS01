import React from 'react';

class ListaCabecalho extends React.Component
{
    render()
    {

        let retorno = '';
        if(window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".excluir"), this.props.listaAutorizacao) )
        {
            retorno = <th align='right'></th>
        }
        return(retorno);
    }
}


export default ListaCabecalho;
