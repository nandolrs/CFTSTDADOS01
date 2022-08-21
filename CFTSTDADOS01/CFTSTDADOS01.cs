using System;
using cf.dados;

namespace Negritando.Model
{
    public class Basico : cf.dados.Entidade
    {
        //long     codigo;
        DateTime dataCadastro;
        DateTime dataExclusao;

        public long Codigo { get => codigo; set => codigo = value; }
        public DateTime DataCadastro { get => dataCadastro; set => dataCadastro = value; }
        public DateTime DataExclusao { get => dataExclusao; set => dataExclusao = value; }
    }

    [ATabela(nome = "Usuario", sequenciaIdentity = true)]
    public class Usuario : Basico
    {
        string email;
        string nome;
        string senha;

        [ATabelaColuna(nome = "email", tipo = "string")]
        public string Email { get => email; set => email = value; }

        [ATabelaColuna(nome = "nome", tipo = "string")]
        public string Nome { get => nome; set => nome = value; }

        [ATabelaColuna(nome = "senha", tipo = "string")]
        public string Senha { get => senha; set => senha = value; }
    }
    
    [ATabela(nome = "UsuarioSenha", sequenciaIdentity = true)]
    public class UsuarioSenha : Basico
    {
        Usuario usuario;
        string  senha;

        public Usuario Usuario { get => usuario; set => usuario = value; }
        public string Senha { get => senha; set => senha = value; }
    }
}
