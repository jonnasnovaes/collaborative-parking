<?php
/*
|--------------------------------------------------------------------------
| dbconnect - By Jhonnata Novaes
|--------------------------------------------------------------------------
|
| O dbconnect é um pacote php que tem o objetivo de facilitar a conexão 
| com os bancos de dados mais utilizados.
| 
| Este projeto se mantém sob licença MIT, sendo considerado uma contribuição
| à comunidade.
*/

/**
 * DEFINE A CONEXÃO COM O BANCO DE DADOS MYSQL
 */
const MYSQL_DB_HOST     = "localhost";
const MYSQL_DB_PORT     = "3306";
const MYSQL_DB_DATABASE = "nome_da_tabela";
const MYSQL_DB_USERNAME = "root";
const MYSQL_DB_PASSWORD = "";


/**
 * DEFINE A CONEXÃO COM O BANCO DE DADOS POSTGRE
 */
const PG_DB_HOST     = "localhost";
const PG_DB_PORT     = "5432";
const PG_DB_DATABASE = "postgis";
const PG_DB_USERNAME = "postgres";
const PG_DB_PASSWORD = "!P1th0n@";


/**
 * DEFINE A CONEXÃO COM O BANCO DE DADOS SQLSERVER
 */
const SQLS_DB_HOST     = null;
const SQLS_DB_PORT     = null;
const SQLS_DB_DATABASE = null;
const SQLS_DB_USERNAME = null;
const SQLS_DB_PASSWORD = null;

/**
 * DEFINE A CONEXÃO COM O BANCO DE DADOS ORACLE
 */
const OC_DB_HOST     = null;
const OC_DB_USERNAME = null;
const OC_DB_PASSWORD = null;

/**
 * DEFINE A CONEXÃO COM O BANCO DE DADOS FIREBIRD
 */
const FB_DB_HOST     = null;
const FB_DB_USERNAME = null;
const FB_DB_PASSWORD = null;

?>