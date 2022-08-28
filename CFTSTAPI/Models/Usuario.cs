namespace Negritando.Web.Models
{
    public class Entidade
    {
        long codigo;

        public long Codigo { get => codigo; set => codigo = value; }
    }
    public class Usuario : Entidade
    {
        string email;
        string nome;
        string senha;

        public string Email { get => email; set => email = value; }
        public string Nome { get => nome; set => nome = value; }
        public string Senha { get => senha; set => senha = value; }
    }
}
