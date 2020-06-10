<?php

require_once("connection.php");

$id = $_POST['id'];
$parametro = $_POST['parametro'];

$conn = db_pg();

$sql  = "UPDATE public.";
$sql .= '"vagas-point"';
$sql .= " SET status = " . $parametro . " WHERE gid = " . $id . ";";

$response = pg_query($conn, $sql);

if(!$response)
{
    echo json_encode(0);
}
else
{
    echo json_encode(1);
}


?>