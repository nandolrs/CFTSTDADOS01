using Microsoft.AspNetCore.Mvc;

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
        public Negritando.Web.Models.Usuario[] Listar()
        {
            Negritando.Web.Models.Usuario[] retorno = new Negritando.Web.Models.Usuario[0];

            try
            {
                // consulta
                //

                Negritando.Rule.Usuario regra = new Rule.Usuario();

                Negritando.Model.Usuario entidadeLista = regra.Listar();

                foreach (Negritando.Model.Usuario e in entidadeLista)
                {
                    System.Array.Resize(ref retorno, retorno.Length + 1);

                    retorno[retorno.Length - 1] = new Negritando.Web.Models.Usuario();
                    retorno[retorno.Length - 1].Codigo = e.codigo;
                    retorno[retorno.Length - 1].Email = e.Email;
                    retorno[retorno.Length - 1].Nome = e.Nome;
                }

                return retorno;

            }
            catch (cf.erros.Erro ee)
            {
                string x = "";
                return retorno;

            }



        }

        [HttpPost]
        [Route("api/usuario")]
        public void Incluir([FromBody] Negritando.Web.Models.Usuario entidadeWeb)
        {
            Negritando.Model.Usuario entidade = new Model.Usuario();
 
            entidade.Email = entidadeWeb.Email;
            entidade.Nome = entidadeWeb.Nome;
            entidade.Senha = entidadeWeb.Senha;
   
            Negritando.Rule.Usuario regra = new Rule.Usuario();
            regra.Incluir(entidade);
        }

        [HttpGet]
        [Route("api/usuario/{codigo}")]
        public Negritando.Web.Models.Usuario Consultar(long codigo)
        {
            Negritando.Model.Usuario entidade = new Model.Usuario() { codigo = codigo };
         
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
            Negritando.Model.Usuario entidade = new Model.Usuario() { codigo = codigo };

            Negritando.Rule.Usuario regra = new Rule.Usuario();
            regra.Excluir(entidade);

        }




    }
}
