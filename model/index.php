<?php

require_once("connection.php");

$id = $_POST['id'];

$conn = db_pg();

$sql = "UPDATE public." . '"' . 'vagas-point' . '"' . " SET status = true WHERE gid = " . $id; 

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

