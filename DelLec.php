<?php

include "sql-conn.php"; // Using database connection file here

$id = $_GET['id']; // get id through query string
$i = $_GET['i'];

$query = sprintf("UPDATE COURSES SET LEC_%s=FALSE WHERE C_CODE='%s'",$i,$id);
$conn->query($query); // update query

header("location:EvaluationSheet.php");
exit;
?>