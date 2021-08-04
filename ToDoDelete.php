<?php

include "sql-conn.php"; // Using database connection file here

$id = $_GET['id']; // get id through query string
echo $id;

$conn->query("DELETE FROM TO_DO WHERE TD_ID = '$id'"); // delete query

header("location:ToDo.php");
exit;
?>