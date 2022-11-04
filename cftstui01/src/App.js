//import logo from './logo.svg';
import './App.css';
import React from 'react';


class Formulario extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
      mostrar:props.mostrar // formulario/lista
    };
  }

  render() {
    return (
<div class="container">
      <div class="row">
{this.state.mostrar==='formulario' ?
          <div class="col">

              <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"/>
                  </div>

                  <button type="submit" class="btn btn-primary" OnClick={() => this.props.OnClickLista()}>Cadastrar</button>
              </form>
          </div>

          : <div />


}

{this.state.mostrar==='lista' ?
      <div class="col">
          <button type="submit" class="btn btn-primary" OnClick={() => this.props.OnClickFormulario()} >Voltar</button>

          <div class="shadow-lg p-3 mb-5 bg-body rounded">Larger shadow</div>
          <div class="shadow-lg p-3 mb-5 bg-body rounded">Larger shadow</div>
          <div class="shadow-lg p-3 mb-5 bg-body rounded">Larger shadow</div>
          <div class="shadow-lg p-3 mb-5 bg-body rounded">Larger shadow</div>
      </div>
      : <div />
}

      </div>
</div>
    );
  }
}

function App(props) {

  let _mostrar = 'formulario';

  return (
    <div>
      <Formulario
          mostrar = {_mostrar}
          OnClickFormulario = {() => _mostrar = 'formulario'}
          OnClickLista = {() => _mostrar = 'lista'}
      />
    </div>
  );
}

export default App;
