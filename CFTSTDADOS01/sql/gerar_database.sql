-- cria o banco de dados 

-- drop schema negritando;							-- negritando, dbcftreino
-- create schema negritando;						-- negritando, dbcftreino

/*

SELECT count(1) qtde FROM dbcftreino.Usuario;

SELECT * FROM dbcftreino.Usuario;


--  delete from  dbcftreino.Usuario;

*/
use dbcftreino; -- negritando, dbcftreino

/*
*****************************************************************************
Usuario
*****************************************************************************
*/

create table Usuario
(
	 codigo 		int				not null		auto_increment
	,nome 			varchar(60) 	not null
    ,senha			varchar(256) 	not null
    ,email  		varchar(256) 	not null
    ,dataAtivacao	datetime
    ,autenticacaoProvider	
					int							-- 1=cmj, 2=aws.cognito

    
    ,dataExclusao	datetime
    ,dataCadastro	datetime		default now()
    ,primary key (codigo)
);

-- email unico


alter table Usuario
add constraint 
	unique usuario_idx_email (email);


/*
*****************************************************************************
UsuarioSenha
*****************************************************************************
*/

create table UsuarioSenha
(
	 codigo 		int				not null		auto_increment
    ,senha			varchar(256) 	not null
    ,dataVencimento	datetime		
	,dataAtivacao	datetime		

    ,usuario_codigo	int
    
    ,dataExclusao	datetime
    ,dataCadastro	datetime		default now()
    ,primary key (codigo)
);

/*
*****************************************************************************
UsuarioToken
*****************************************************************************
*/

create table UsuarioToken
(
	 codigo 			int				not null		auto_increment
    ,token				varchar(30000) 	not null
    ,dataVencimento		datetime  		not null
	,ipCliente			varchar(256) 	not null
    ,usuario_codigo 	int

    ,dataExclusao	datetime
    ,dataCadastro	datetime		default now()
    ,primary key (codigo)
);



