import React from 'react';

class SisProcessandoView extends React.Component
{
    constructor(props)
    {
        super(props);
    }


    render()
    {
        var retorno =
            <div class="text-center">
                <div class="spinner-border" role="status">
                </div>
            </div>
        return(retorno);
    }
}
export default SisProcessandoView;