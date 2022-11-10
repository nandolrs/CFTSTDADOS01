using Microsoft.AspNetCore.Mvc;
using System;

namespace Negritando.Controllers
{
    public class UsuarioController : Controller
    {

        [HttpGet]
        [Route("api/")]
        public string EuToVivo()
        {

            Negritando.Rule.Usuario regras = new Rule.Usuario();

            string v = regras.BuscarVersao();

            return "eu estou vivo - " + v;
        }

        [HttpPost]
        [Route("api/usuarios/pesquisar")]
        public Negritando.Web.Models.UsuarioResponse Pesquisar()
        {
            Negritando.Web.Models.Usuario[] retorno = new Negritando.Web.Models.Usuario[0];

            try
            {
                // consulta
                //

                Negritando.Dados.Usuario dados = new Dados.Usuario();

                Negritando.Rule.Usuario regra = new Rule.Usuario();

                Negritando.Dados.Usuario entidadeLista = regra.Pesquisar(dados);

                foreach (Negritando.Dados.Usuario _de in entidadeLista)
                {


                    Negritando.Web.Models.Usuario _para = new Negritando.Web.Models.Usuario();
                    _para.Codigo = _de.codigo;
                    _para.Email = _de.Email;
                    _para.Nome = _de.Nome;

                    System.Array.Resize(ref retorno, retorno.Length + 1);

                    retorno[retorno.Length - 1] = _para;

                }

                return new Negritando.Web.Models.UsuarioResponse(null, null, retorno);

            }
            catch (cf.erros.Erro ee)
            {
                cf.erros.ErroBase erroBase = new cf.erros.ErroBase(ee);
                Negritando.Web.Models.UsuarioResponse resposta = new Negritando.Web.Models.UsuarioResponse(null, erroBase, null);
                return resposta;

            }

            catch (Exception ee)
            {
                cf.erros.ErroBase erroBase = new cf.erros.ErroBase(ee);
                Negritando.Web.Models.UsuarioResponse resposta = new Negritando.Web.Models.UsuarioResponse(null, erroBase, null);
                return resposta;
            }



        }

        [HttpPost]
        [Route("api/usuario")]
        public Negritando.Web.Models.UsuarioResponse Incluir([FromBody] Negritando.Web.Models.Usuario webEntidade)
        {
            try
            {
                Negritando.Dados.Usuario entidade = new Negritando.Dados.Usuario();

                entidade.Email = webEntidade.Email;
                entidade.Nome = webEntidade.Nome;
                entidade.Senha = webEntidade.Senha;

                Negritando.Rule.Usuario regra = new Rule.Usuario();
                regra.Incluir(entidade);

                return new Negritando.Web.Models.UsuarioResponse(webEntidade, null, null);

            }


            catch (cf.erros.Erro ee)
            {
                cf.erros.ErroBase erroBase = new cf.erros.ErroBase(ee);
                Negritando.Web.Models.UsuarioResponse resposta = new Negritando.Web.Models.UsuarioResponse(null, erroBase, null);
                return resposta;

            }

            catch (Exception ee)
            {
                cf.erros.ErroBase erroBase = new cf.erros.ErroBase(ee);
                Negritando.Web.Models.UsuarioResponse resposta = new Negritando.Web.Models.UsuarioResponse(null, erroBase, null);
                return resposta;
            }
        }

        [HttpGet]
        [Route("api/usuario/{codigo}")]
        public Negritando.Web.Models.Usuario Consultar(long codigo)
        {
            Negritando.Dados.Usuario entidade = new Negritando.Dados.Usuario() { codigo = codigo };
         
            Negritando.Rule.Usuario regra = new Rule.Usuario();
            entidade = regra.Consultar(entidade);

            // retorno

            Negritando.Web.Models.Usuario entidadeWeb = new Web.Models.Usuario();

            entidadeWeb.Codigo = entidade.codigo;
            entidadeWeb.Nome = entidade.Nome;
           
            return entidadeWeb;
        }


        [HttpDelete]
        [Route("api/usuario/{codigo}")]
        public void Excluir(long codigo)
        {
            Negritando.Dados.Usuario entidade = new Negritando.Dados.Usuario() { codigo = codigo };

            Negritando.Rule.Usuario regra = new Rule.Usuario();
            regra.Excluir(entidade);

        }




    }


}
