using System;

namespace Negritando.Rule
{
    public class Usuario
    {
        public string BuscarVersao()
        {
            return Environment.GetEnvironmentVariable("CMJ_VERSAO");
        }
        public void Incluir(Negritando.Dados.Usuario entidade)
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

        public Negritando.Dados.Usuario Pesquisar(Negritando.Dados.Usuario entidade)
        {
            entidade.pesquisar();
            return entidade;
        }

        public Negritando.Dados.Usuario Consultar(Negritando.Dados.Usuario entidade)
        {


            if (entidade.codigo <= 0)
            {
                throw new Exception("informe o código.");
            }

            entidade.consultar();

            return entidade;
        }

        public void Excluir(Negritando.Dados.Usuario entidade)
        {
            if (entidade.codigo == 0)
            {
                throw new Exception("informe o código.");
            }

            entidade.excluir();

        }

    }
}
