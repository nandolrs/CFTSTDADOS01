/*

*****************************
>>> VARIAVIES DE AMBIENTE <<<
*****************************

let ambiente = {
  url:"http://localhost:8000"
}

let ambiente = {
  url:"http://cfcorewapicmj-service:80"
}

let ambiente = {
  url:"http://localhost:58233"
}

let ambiente = {
  url:"http://184.172.233.161:31010"
}

let ambiente = {
  url:"https://cmjwapi-hom.mybluemix.net"
}


let ambiente = {
  url:"https://cmjwapi.mybluemix.net"
}


let ambiente = {
  url:"https://cmjwapi-dev.mybluemix.net"
}

let ambiente = {
  url:"http://api.negritando.com.br"
}


let ambiente = {
  url:"http://localhost:44391"
}



*/


let ambiente = {
  url:"https://api-dev.negritando.com.br"
}




function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

  function clearCookie(cname)
  {    
    setCookie(cname, "", -1);
  }

  function getCabeca()
  {
    var t = window.getCookie("token");

    if(t==null){ return {}}

    var cabeca = {headers:{token:t, Authorization:'Bearer ' + t}}; 

    return cabeca;
  }

  function getCabecaToken(token)
  {
    var t = token;
    var cabeca = {headers:{token:t, Authorization:'Bearer ' + t}}; 
    return cabeca;
  }

  function MatrizManipula(matriz, el, op)
  {
    if(op=='+')
    {
      matriz.push(el);
    }
    if(op=='-')
    {
      for (i=0;i<matriz.length;i++)
      {
        if(matriz[i] == el)
        {
          matriz.splice(i,1);
        }

      }
    }
    return matriz;
  }

  function ToMensagens(_mensagem)
  {
      return  [{mensagem:_mensagem}];
  }

  function ExcluirObterCodigos()
  {
    let retorno = [];

    let inputExcluir = document.getElementsByTagName('input');
    let selecionados = "";

    for(let i = 0;i < inputExcluir.length; i++)
    {
      if(inputExcluir[i].checked)
      {
        selecionados += 'x' + inputExcluir[i].value;
      }
    }

    if(selecionados != '')
    {
      selecionados = selecionados.substr(1);
      retorno = selecionados.split('x');
    }

    return retorno;
  }

  function AutorizacaoConsultar(nome, lista)
  {
    var retorno = false;

//    if(nome != null && lista != null && nome != "" && lista != "")
    if(nome != undefined  && lista != undefined && nome != "" && lista != "")
    {
      var _nome = '<INICIO>' + nome + '<FIM>';
      retorno = (lista.indexOf(_nome) >= 0); 
    }
    return retorno ; // 

  }

  
  
  function DataFormatada(data)
  {

    if(data == '0001-01-01T00:00:00')
    {
      return "";
    }
    var dataAntes = new Date(data);
    var options={hour:"2-digit"};
    var dataFormatada = dataAntes.toLocaleDateString() + " " + dataAntes.toLocaleTimeString() ;

    return dataFormatada;

  }

  function UrlAbrir(url)
  {
    window.open(url);
  }


  function MensageiroEnviar(url, verbo,cabeca, mensagem, tratador)
  {
    let _verbo = 'GET';
    if(verbo=='p'){_verbo='POST';}
    let dom = new XMLHttpRequest();
    dom.open(_verbo, url, true);
  //	<!-- dom.responseType='text'; -->

    dom.onload=tratador;
    dom.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    if(cabeca != null)
    {
      let valor = cabeca.headers.token;
      dom.setRequestHeader("token", valor);
    }
    
    /*
    cabeca.headers.Map( (c) => 
      {
        dom.setRequestHeader(c[0], c[1])
      }
    );

    */
  
    if (_verbo=='GET') {dom.send();} else {dom.send(mensagem);}
  }

  /*
**********************************************************************************************
atividade
**********************************************************************************************
*/


class InscricaoAtividade
{
    static inscricao;
    static evento;
    static conhecimentoAtividade;
    static codigo;
    static posicao;
    static tamanho;

    constructor(inscricaoCodigo, eventoCodigo, conhecimentoAtividadeCodigo, codigo,  posicao, tamanho)
    {
        this.inscricao = {codigo:inscricaoCodigo};
        this.evento = {codigo:eventoCodigo};
        this.conhecimentoAtividade = {codigo:conhecimentoAtividadeCodigo};
        this.codigo = codigo;
        this.posicao = posicao;
        this.tamanho = tamanho;
      }

}

function AtividadesObter()
{
    const outVideo = window.document.getElementById("outVideo");
    const outVideoEmbutido = window.document.getElementById("outVideoEmbutido");
    const inputAtualizar = window.document.getElementById("inputAtualizar");

    
    const inputInscricao = window.document.getElementById("inputInscricao");
    const inputEvento = window.document.getElementById("inputEvento");
    const inputInscricaoAtividade = window.document.getElementById("inputInscricaoAtividade");
    const inputConhecimentoAtividade = window.document.getElementById("inputConhecimentoAtividade");
    
    if(outVideo != null || outVideoEmbutido != null)
    {
      let perc = 0; 
      if(outVideo != null)
      {
          perc = outVideo.currentTime / (outVideo.duration==null || outVideo.duration==0 ? 1 : outVideo.duration) ; 
      }
      if(outVideoEmbutido != null)
      {
          perc = 1; 
      }

      if(outVideoEmbutido != null
        || (
          !outVideo.paused || (outVideo.paused && perc==1)
        ))
         
        {

            if(outVideo != null && outVideo.currentTime == 0)
            {
              return;
            }

            let posicao = outVideo != null ? outVideo.currentTime : 1;
            let tamanho = outVideo != null ? outVideo.duration : 1;

            let inscricaoAtividade = new InscricaoAtividade(
                  inputInscricao.value
                 ,inputEvento.value
                 ,inputConhecimentoAtividade.value
                 ,inputInscricaoAtividade.value
                 ,posicao  // posicao
                 ,tamanho // tamanho
            );

            let _cabeca = window.getCabeca();

            MensageiroEnviar(
              ambiente.url
              +'/api/inscricoes/atividade/'
              ,'p'
              ,_cabeca
              , JSON.stringify(inscricaoAtividade)
              ,AtividadeEnviarTratar
            );
          
        }
    }

};

function AtividadeEnviarTratar(sucesso)
{
  let resposta = sucesso.target.responseText;

  let atividade =JSON.parse(resposta);

  atividade = atividade.dados;
}

/*
**********************************************************************************************
coordenadas
**********************************************************************************************
*/

var coordenadas = [];

class Coordenada
{
    static codigo=0;
    static dataHora=null;
    static dataLeitura=null;
    static latitude = 0;
    static longitude = 0;
    static tmDispositivo;

    constructor(dataHora, latitude, longitude)
    {
        this.codigo=0;
        this.dataHora = DataFormatada(dataHora);
        this.dataLeitura =dataHora;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getLatitude()
    {
        return this.latitude;
    }

    setLatitude(valor)
    {
        this.latitude=valor;
    }


    getLongitude()
    {
        return this.longitude;
    }
    setLongitude(valor)
    {
        this.longitude=valor;
    }

    setDataHora(valor)
    {
      this.dataHora = valor;
    }

    getDataHora()
    {
      return this.dataHora;
    }
}


class Dispositivo
{
  static codigo;
  static nome;

  constructor(codigo, nome)
  {
    this.codigo = codigo;
    this.nome = nome;
  }
}


function CoordenadasObter()
{
    if(navigator.geolocation)
    {
      let opcoes={timeout:60000};
      let geo =  navigator.geolocation.getCurrentPosition(
         CoordenadasObterSucesso
        ,CoordenadasObterFalha
        ,opcoes
      );
    }
}

function CoordenadasObterParaInteresse()
{
  if(navigator.geolocation)
  {
    let opcoes={timeout:60000};
    let geo =  navigator.geolocation.getCurrentPosition(
      CoordenadasObterParaInteresseSucesso // call back
      ,CoordenadasObterParaInteresseFalha   // call back
      ,opcoes
    );
  }

}


function DataAtual()
{
  return new Date(Date.now());
}



function TratarEndereco(endereco) // pais, estado, rua, numero
{
  let YOUR_API_KEY = 'AIzaSyCUmEAsqjnwGGuSb7Wp67RPpNYX6gZTq0U';

  let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + endereco
  1600+Amphitheatre+Parkway,+Mountain+View,+CA
  + '&key=' + YOUR_API_KEY;
  
}

function CoordenadasObterSucesso(posicao)
{
  let cordenadasXY = posicao.coords;

  let coordenada =  new Coordenada(
      DataAtual()
    , cordenadasXY.latitude
    , cordenadasXY.longitude
  );

  coordenada.codigo = coordenadas.length+1;
  coordenadas.unshift(coordenada);

  window.setCookie("coordenadas", JSON.stringify(coordenadas), 1);

  // envia coordenadas

  CoordenadasEnviar(coordenada);
}

function CoordenadasObterFalha(falha)
{
  let _falha=falha;
}

function CoordenadasObterParaInteresseObter()
{
  retorno = [];

  let _latitude = window.document.getElementById("inputLatitude").value;
  let _longitude = window.document.getElementById("inputLongitude").value;

  if(_latitude != 0 && _longitude != 0)
  {
    retorno = {latitude:_latitude, longitude:_longitude};
  }
  return retorno;  
}



function CoordenadasObterParaInteresseSucesso(posicao)
{

  let cordenadasXY = posicao.coords;

  let coordenada =  new Coordenada(
      DataAtual()
    , cordenadasXY.latitude
    , cordenadasXY.longitude
  );

  // sinaliza sucesso visualmente

  let botao = window.document.getElementById("inputQueroSerLocalizado");
  let latitude = window.document.getElementById("inputLatitude");
  let longitude = window.document.getElementById("inputLongitude");

  if(botao != null)
  {
    frase = 'Coodenadas encontradas <br/> (latitude), (longitude)' ;
    frase = frase.replace('latitude', coordenada.latitude).replace('longitude', coordenada.longitude);
    frase = 'Coodenadas encontradas' ;
    botao.innerHTML =  '<div>  ' +   frase +  '</div>';
  }


  if(latitude != null)
  {
    latitude.value =  coordenada.latitude;
  }

  if(longitude != null)
  {
    longitude.value =  coordenada.longitude;
  }
  
}

function CoordenadasObterParaInteresseFalha(falha)
{
  let _falha=falha;
}

function CoordenadasEnviar(coordenada)
{
  // obtem o dispositivo

  let dispositivo = new Dispositivo(0,'');

  dispositivo.codigo = DispositivoBuscar();
  if(dispositivo.codigo==0)
  {
    dispositivo.nome = 'inclusao';
  }
  coordenada.tmDispositivo = dispositivo;

  MensageiroEnviar(
    ambiente.url
    +'/api/dispositivo/leitura/'
    ,'p'
    , null
    , JSON.stringify(coordenada)
    ,CoordenadasEnviarTratar
  );
}

function CoordenadasEnviarTratar(sucesso)
{
  let resposta = sucesso.target.responseText;

  let coordenada =JSON.parse(resposta);

  coordenada = coordenada.dados;

  if(coordenada.tmDispositivo.codigo != DispositivoBuscar())
  {
    DispositivoSalvar(coordenada.tmDispositivo.codigo)
  }

  let _sucesso=0;
}

function DispositivoBuscar()
{
  let retorno = getCookie("dispositivo.codigo");
  if(retorno =="")
  {
    retorno = 0;
  }
  return retorno;
}

function DispositivoSalvar(codigo)
{
  setCookie("dispositivo")
  let retorno = setCookie("dispositivo.codigo", codigo,1); // expira em 1 dia <?> nao deve expirar
}

function IsMobile()
{
  if(navigator.userAgent.indexOf("Android") != -1)
  {
    return true;
  }
  return false;
}


function DuracaoFormatar( segundos)
{


  let retorno = "00:00";

  if(segundos==null)
  {
    return retorno;

  }


  if(segundos > 0)
  {
    let quociente = segundos/60;
    let minutos = Math.trunc(quociente);
    let segundos_ = ( quociente - Math.trunc(quociente)) * 60; segundos_ = Math.round(segundos_);
    retorno = minutos + ' minutos e ' + segundos_ + ' segundos';
  }

  return retorno;

}


function Copiar(id)
{

  let inputComponente = window.document.getElementById(id);
  inputComponente.select();
  document.execCommand('copy');

}

function MapaAbrir(entidade)
{
    let url = "https://www.google.com/maps/search/?api=1&query=" 
        + entidade.latitude 
        + ","
        + entidade.longitude;

/*
    if(this.state.estado==0)
    {
        this.setState({
            entidade:
                {
                 latitudeInicial:entidade.latitude
                ,longitudeInicial:entidade.longitude
                }
            ,estado:1
        });
    }
    else
    {
        let _distancia = 100 * 1851.85 * 
        Math.sqrt(
            Math.pow(
                (this.state.entidade.latitudeInicial - entidade.latitude)
            ,2)
            +
            Math.pow(
                (this.state.entidade.longitudeInicial - entidade.longitude)
            ,2)
        );

        // utilizando API do google

        var p1 = new window.google.maps.LatLng(this.state.entidade.latitudeInicial , this.state.entidade.longitudeInicial);
        var p2 = new window.google.maps.LatLng(entidade.latitude, entidade.longitude);

        let _distancia1 = window.google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000;

        this.setState({
            entidade:
                {

                latitudeInicial:this.state.entidade.latitudeInicial
                ,longitudeInicial:this.state.entidade.longitudeInicial

                ,latitudeFinal:entidade.latitude
                ,longitudeFinal:entidade.longitude

                ,distancia: _distancia
                ,distancia1: _distancia1
                }
            ,estado:1
        });


    }

    // registra a localizacao
*/
    // abre o mapa

    window.UrlAbrir(url);
}


function GetQueryString(a)
{
    a = a || window.location.search.substr(1).split('&').concat(window.location.hash.substr(1).split("&"));

    if (typeof a === "string")
        a = a.split("#").join("&").split("&");

    // se não há valores, retorna um objeto vazio
    if (!a) return {};

    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        // obtem array com chave/valor
        var p = a[i].split('=');

        // se não houver valor, ignora o parametro
        if (p.length != 2) continue;

        // adiciona a propriedade chave ao objeto de retorno
        // com o valor decodificado, substituindo `+` por ` `
        // para aceitar URLs codificadas com `+` ao invés de `%20`
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    // retorna o objeto criado
    return b;
}



function fc_setar(entidade)
{

    const _meta = window.document.getElementById(entidade.nome);
    _meta.content = entidade.valor;

}

function hospedeiro()
{
  let retorno = window.location.protocol + '//'
  + window.location.hostname 
  + (window.location.port != null && window.location.port.length >= 2 ? ':'+window.location.port : '');

  return retorno;

}

function GerarGrafico(título, dados)
{
  
    drawChart(título, dados);
}

function drawChart(x,y) {        
      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows(y);
      
      // Set chart options
      var options = {'title':x,
                    'width':400,
                    'height':300};
      
      // Instantiate and draw our chart, passing in some options.

      let chartDiv = document.getElementById('chart_div');
      if (chartDiv == null)
      {
        var chart = new google.visualization.PieChart(chartDiv);
        chart.draw(data, options);
      }


  }


  function NavegarRaiz()
  {
    window.location.assign("./")
  }

  function NavegarLogin()
  {
    window.location.assign("./login")
  }

  function NavegarBemVindo()
  {
    window.location.assign("./bemvindo")
  }

  function Navegar(url)
  {
    window.location.assign(url)
  }


  function NavegarLocal()
  {
    window.location.assign("./local")

  }

  function NavegarUsuario()
  {
    window.location.assign("./usuario")

  }

  function NavegarOcorrencia()
  {
    window.location.assign("./ocorrencia")

  }

  function NavegarAtividade()
  {
    window.location.assign("./atividade")
  }

  
  function NavegarInscricaoAtividade()
  {
    window.location.assign("./inscricaoAtividade")
  }

  function NavegarPainel()
  {
    window.location.assign("./painel")    
  }

  function NavegarUsuarioConhecimento()
  {
    window.location.assign("./conhecimentoPorUsuario")    
  }

  function NavegarUsuarioConvite()
  {
    window.location.assign("./usuarioConvite")    
  }

  

  function NavegarInscricao()
  {
    window.location.assign("./inscricao")    
  }

  function NavegarPedido()
  {
    window.location.assign("./pedido")    
  }

  

  