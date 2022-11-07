import React from 'react';
import axios from 'axios';

import UsuarioContaView from '../Usuario/UsuarioContaView';

class MenuView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={autenticado:this.props.autenticado, lista:null, listaAutorizacao:props.listaAutorizacao, usuarioBuscou:false};      
    }

    Sair()
    {
      window.NavegarLogin();
    }


    UsuarioConviteQtde()
    {
        let retorno = '';

        let qtde = window.getCookie('usuario.qtdeConvites');

        if(qtde != 0)
        {
          retorno = '(' + qtde +')';
        }

        return retorno;
    }

    PedidoItemQtde()
    {
      let retorno = '';

      let qtde = window.getCookie('usuario.qtdePedidoItem');

      if(qtde != 0)
      {
        retorno = '(' + qtde +')';
      }

      return retorno;
    }

render()
{
  return(
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#" onClick = {() => this.props.OnPainelPesquisar()}>
      <img src="./imagens/cmjoana.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy" />
      CMJ Wizard
    </a>


    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    {this.props.autenticado && this.props.listaAutorizacao != "" ?
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">

        {/* conta  */}

        <UsuarioContaView 
          OnSair={()=> this.Sair()}
        />

        {/* cadastros */}

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cadastros</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

          {/* classe */}

          {window.AutorizacaoConsultar("Classe.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item"   href="#" onClick={() => this.props.OnClassePesquisar()}>Classe</a>
          : ""
          }

          {/* conhecimento */}

          {window.AutorizacaoConsultar("Conhecimento.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnConhecimentoPesquisar()}>Conhecimento</a>
            : ""
          }

          {/* função */}

          {window.AutorizacaoConsultar("Funcao.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnFuncaoPesquisar()}>Função</a>
            : ""
          }

          {/* grupo */}

          {window.AutorizacaoConsultar("Grupo.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item"          href="#" onClick={() => this.props.OnGrupoPesquisar()}>Grupo</a>
          : ""
          }

          {/* lcal */}

          {window.AutorizacaoConsultar("Local.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item"          href="#" onClick={() => window.NavegarLocal() }>Local</a> 
          : ""
          }

          {/* organizaçào */}

          {window.AutorizacaoConsultar("Organizacao.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item"   href="#" onClick={() => this.props.OnOrganizacaoPesquisar()}>Organização</a>
          : ""
          }

          {/* pessoa */}

          {window.AutorizacaoConsultar("Pessoa.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item"          href="#" onClick={() => this.props.OnPessoaPesquisar()}>Pessoa</a>
          : ""
          }

          {/* usuário */}

          {window.AutorizacaoConsultar("Usuario.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => window.NavegarUsuario() }>Usuário</a> 
            : ""
          }

          {/* cadastros.produtos e materiais */}

          <span><hr/></span>

          {/* embalagem */}

          {window.AutorizacaoConsultar("Embalagem.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item"          href="#" onClick={() => this.props.OnEmbalagemPesquisar()}>Embalagem</a>
          : ""
          }

          {/* preço */}

          {window.AutorizacaoConsultar("Preco.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnPrecoPesquisar()}>Preço</a>
            : ""
          }

          {/* produto */}

          {window.AutorizacaoConsultar("Produto.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnProdutoPesquisar()}>Produto</a>
            : ""
          }


          {/* unidade de medida */}

          {window.AutorizacaoConsultar("UnidadeMedida.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item"          href="#" onClick={() => this.props.OnUnidadeMedidaPesquisar()}>Unidade de medida</a>
          : ""
          }


          </div>
        </li>


        {/* operações */}

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Operações</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

          {/* evento */}

          {window.AutorizacaoConsultar("Evento.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnEventoPesquisar()}>Evento</a>
            : ""
          }

          {/* ocorr6encia */}

          {window.AutorizacaoConsultar("Ocorrencia.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item"          href="#" onClick={() => window.NavegarOcorrencia() }>Ocorrencia</a> 
          : ""
          }

          {/* projeto */}

          {window.AutorizacaoConsultar("Projeto.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnProjetoPesquisar()}>Projeto</a>
            : ""
          }

          <span><hr/></span>

          {/* consultar eventos */}

          {window.AutorizacaoConsultar("EventoQuando.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnEventoQuandoPorPessoaPesquisar()}>Consultar Eventos por Pessoa</a>
            : ""
          }

        <span><hr/></span>

        {/* inscrição */}

        {window.AutorizacaoConsultar("Inscricao.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item" href="#" onClick={() => window.NavegarInscricao() }>Inscrições<span class="sr-only"></span></a> 
        : ""
        }

        {/* atividades */}

        {window.AutorizacaoConsultar("InscricaoAtividade.pesquisar", this.props.listaAutorizacao) ?
          <a class="dropdown-item" href="#" onClick={() => window.NavegarInscricaoAtividade() }>Atividades<span class="sr-only"></span></a> 
        : ""
        }                  


        {/* Avisos */}

        <a class="dropdown-item" href="#" onClick={() => window.NavegarPainel()}>Avisos

        <i class="bi bi-alarm-fill"></i>

        <span class="sr-only"></span></a>

        {/* certificados */}

        <a class="dropdown-item" href="#" onClick={() => window.NavegarUsuarioConhecimento() }>Certificados<span class="sr-only"></span></a> 

        {/* Convites pendentes */}

        <a class="dropdown-item" href="#" onClick={() => window.NavegarUsuarioConvite() }>Convites {this.UsuarioConviteQtde()}<span class="sr-only"></span></a>



          </div>

        </li>


        {/* marketplace */}


        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Marketplace</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

          {/* cesta */}

          {window.AutorizacaoConsultar("Pedido.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => window.NavegarPedido()}>Cesta {this.PedidoItemQtde()}</a>
            : ""
          }


          {/* cobrança */}

          {window.AutorizacaoConsultar("Cobranca.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnCobrancaPesquisar()}>Cobrança</a>
            : ""
          }


          {/* cobrança condição */}

          {window.AutorizacaoConsultar("CobrancaCondicao.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnCobrancaCondicaoPesquisar()}>Condições de cobrança</a>
            : ""
          }


          {/* frete */}

          {window.AutorizacaoConsultar("Frete.pesquisar", this.props.listaAutorizacao) ?
            <a class="dropdown-item"          href="#" onClick={() => this.props.OnFretePesquisar()}>Frete</a>
            : ""
          }

          </div>
        </li>

        
        </ul>
    </div>
    : ""
    }





  </nav>


    </div>


);
}

    
}

export default MenuView;