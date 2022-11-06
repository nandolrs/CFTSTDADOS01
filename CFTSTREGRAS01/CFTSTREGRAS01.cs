using System;

namespace Negritando.Rule
{
    public class Usuario
    {
        public string BuscarVersao()
        {
            //cf.util.Biblioteca oBiblioteca = new cf.util.Biblioteca();
            //string sVersao = oBiblioteca.BuscarVersao();
            //return sVersao;

            return Environment.GetEnvironmentVariable("CMJ_VERSAO");


        }
        public void Incluir(Negritando.Model.Usuario entidade)
        {


            if (entidade.Email.Length == 0)
            {
                throw new Exception("informe o email.");
            }

            if (entidade.Nome.Length == 0)
            {
                throw new Exception("informe o nome.");
            }

            if (entidade.Senha.Length == 0)
            {
                throw new Exception("informe a senha.");
            }

            entidade.incluir();
        }

        public Negritando.Model.Usuario Listar()
        {
            Negritando.Model.Usuario entidade = new Model.Usuario();

            entidade.listar();

            return entidade;
        }
        public Negritando.Model.Usuario Consultar(Negritando.Model.Usuario entidade)
        {


            if (entidade.codigo <= 0)
            {
                throw new Exception("informe o código.");
            }

            entidade.consultar();

            return entidade;
        }


        public Negritando.Model.Usuario Pesquisar(Negritando.Model.Usuario entidade)
        {
            if (entidade.codigo == 0 && entidade.Nome.Length == 0)
            {
                throw new Exception("informe ao menos um dos atributos");
            }

            entidade.pesquisar();

            return entidade;
        }

        public void Excluir(Negritando.Model.Usuario entidade)
        {
            if (entidade.codigo == 0)
            {
                throw new Exception("informe o código.");
            }

            entidade.excluir();

        }

    }
}
