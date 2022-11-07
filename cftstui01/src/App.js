import React from 'react';
import logo from './logo.svg';
import './App.css';
//import {Helmet} from "react-helmet";

//import { Link } from "react-router-dom";


//import MaestroView from './Maestro/MaestroView';
import MaestroRoutesView from './Maestro/MaestroRoutesView';
//import MaestroAnonimoRoutesView from './Maestro/MaestroAnonimoRoutesView';
import MaestroInicioView from './Maestro/MaestroInicioView';
import UsuarioView from './Usuario/UsuarioView';

export default function App()
{
    //return (<MaestroInicioView />);

    //return (<MaestroRoutesView   autorizacao=''/>); // {this.state.autorizacao}

    return (<UsuarioView />);



      

}
