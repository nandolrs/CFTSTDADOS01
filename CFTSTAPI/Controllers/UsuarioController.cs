﻿using Microsoft.AspNetCore.Mvc;

namespace Negritando.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Route("api/usuario/")]
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
            Negritando.Web.Models.Usuario entidadeWeb = new Web.Models.Usuario();

            return entidadeWeb;
        }
    }
}
