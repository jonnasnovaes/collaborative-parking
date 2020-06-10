<?php

require_once("config.php");

/**
 * FUNÇÃO QUE RETORNA A CONEXÃO COM O BANCO DE DADOS MYSQL
 */

function db_mysql()
{
    $connection = mysqli_connect(
            MYSQL_DB_HOST,
            MYSQL_DB_USERNAME, 
            MYSQL_DB_PASSWORD
        ) or die(mysqli_error()
    );
    mysqli_select_db($connection, MYSQL_DB_DATABASE);
    return $connection;
}

/**
 * FUNÇÃO QUE RETORNA A CONEXÃO COM O BANCO DE DADOS POSTGRE
 */

function db_pg()
{
    $parameters  = "host="     . PG_DB_HOST      . " ";
    $parameters .= "port="     . PG_DB_PORT      . " ";
    $parameters .= "dbname="   . PG_DB_DATABASE  . " ";
    $parameters .= "user="     . PG_DB_USERNAME  . " ";
    $parameters .= "password=" . PG_DB_PASSWORD  . " ";
    $parameters .= "options='--client_encoding=UTF8'";

    $connection = pg_connect($parameters) or die(pg_error());
    //pg_query($connection, 'set client_encoding to "UTF-8"');

    return $connection;
}

/**
 * FUNÇÃO QUE RETORNA A CONEXÃO COM O BANCO DE DADOS SQLSERVER
 */

function db_sqls()
{
    $connection = mssql_connect(
            SQLS_DB_HOST,
            SQLS_DB_USERNAME, 
            SQLS_DB_PASSWORD
        ) or die(mssql_error()
    );
    mssql_select_db(SQLS_DB_DATABASE, $connection);
    return $connection;
}

/**
 * FUNÇÃO QUE RETORNA A CONEXÃO COM O BANCO DE DADOS ORACLE
 */

function db_oc()
{
    $connection = oci_connect(            
            OC_DB_USERNAME, 
            OC_DB_PASSWORD,
            OC_DB_HOST
        ) or die(oci_error()
    );
    return $connection;
}

/**
 * FUNÇÃO QUE RETORNA A CONEXÃO COM O BANCO DE DADOS FIREBIRD
 */

function db_fb()
{
    $connection = ibase_connect(            
            FB_DB_HOST,
            FB_DB_USERNAME, 
            FB_DB_PASSWORD
        ) or die(ibase_errmsg()
    );
    return $connection;
}

?>