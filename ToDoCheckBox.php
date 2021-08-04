<?php
    include "sql-conn.php"; // Using database connection file here

    $id = $_GET['id']; // get id through query string
    echo $id;

    $result=$conn->query("SELECT DONE_FLAG FROM TO_DO WHERE TD_ID = '$id' ");
    $row=$result->fetch_assoc();
    if($row['DONE_FLAG'])
        $flag=FALSE;
    else
        $flag=TRUE;

    $conn->query("UPDATE TO_DO SET DONE_FLAG='".$flag."' WHERE TD_ID = '$id'"); // delete query

    header("location:ToDo.php");
    exit;
?>