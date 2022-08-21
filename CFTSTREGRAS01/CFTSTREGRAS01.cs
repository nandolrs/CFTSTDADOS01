using System;

namespace Negritando.Rule
{
    public class Usuario
    {
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
    }
}
