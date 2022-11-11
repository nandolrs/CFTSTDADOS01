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


    public class UsuarioResponse
    {
        Negritando.Web.Models.Usuario _dados;
        Negritando.Web.Models.Usuario[] _dadosLista;
        cf.erros.ErroBase _erro;

        public UsuarioResponse(Negritando.Web.Models.Usuario dados, cf.erros.ErroBase erro, Negritando.Web.Models.Usuario[] dadosLista)
        {
            _dados = dados;
            _dadosLista = dadosLista;
            _erro = erro;

        }
        public Negritando.Web.Models.Usuario dados
        {
            get { return _dados; }
        }
        public Negritando.Web.Models.Usuario[] dadosLista
        {
            get { return _dadosLista; }
        }

        public cf.erros.ErroBase erro
        {
            get { return _erro; }
        }
    }

}
