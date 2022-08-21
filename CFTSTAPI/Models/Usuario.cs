namespace Negritando.Web.Models
{
    public class Usuario
    {
        string email;
        string nome;
        string senha;

        public string Email { get => email; set => email = value; }
        public string Nome { get => nome; set => nome = value; }
        public string Senha { get => senha; set => senha = value; }
    }
}
