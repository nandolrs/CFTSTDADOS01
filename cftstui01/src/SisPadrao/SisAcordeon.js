import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import axios from 'axios';

//import ReactGA from 'react-ga';


class SisAcordeon extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div>
                <p>
                <button class="btn btn-secondary btn-lg btn-block" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Mais opções
                </button>
                </p>
                <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    {this.props.embutido}
                </div>
                </div>
            </div>
        );
    }
}
export default SisAcordeon;


