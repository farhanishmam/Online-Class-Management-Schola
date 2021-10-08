<?php
	session_start();
	include 'sql-conn.php';
	$id = $_SESSION['ID'];
    if($_SESSION['Type'] != 3){
        $result = $conn->query("SELECT * FROM ST_COURSES WHERE STUDENT_ID='$id' ORDER BY COURSE_ID");
        while($row=$result->fetch_assoc()){
            $arrayElements[]=$row;
        }
        $result = $conn->query("SELECT * FROM COURSES WHERE C_CODE IN (SELECT COURSE_ID FROM ST_COURSES WHERE STUDENT_ID='$id')  ORDER BY C_CODE");
        while($row=$result->fetch_assoc()){
            $courseElements[]=$row;
        }
    }
    else {
        $result = $conn->query("SELECT * FROM COURSES WHERE FA1_ID='$id' OR FA2_ID='$id'  ORDER BY C_CODE");
        while($row=$result->fetch_assoc()){
            $courseElements[]=$row;
        }
    }
    if($_SESSION['EvalRows']==0){
        $j=0;
        foreach ($courseElements as $item){ 
            for($i=1; $i<25; $i++){
                if($item['LEC_'.$i.''])
                    $j=($j<$i?$i:$j);
            }
        }
        $_SESSION['EvalRows']=$j;
    }
	if(isset($_POST['addRowBtn'])){
        if($_SESSION['EvalRows']<24)
            $_SESSION['EvalRows']++;
    }
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <title>Evaluation Sheet</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--===============================================================================================-->
    <link rel="icon" type="image/png" href="images/icons/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="node_modules/animate.css/animate.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="node_modules/select2/dist/css/select2.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="node_modules/perfect-scrollbar/css/perfect-scrollbar.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="assets/css_bookroom/main.css">
    <link rel="stylesheet" type="text/css" href="assets/css_otherform/main.css">
    <link rel="stylesheet" type="text/css" href="assets/css_bookroom/util.css">
    <!--===============================================================================================-->
    <div class="topnav" id="mytopnav">
        <div id="navContent">
            <a href="UserProfile.php">Profile</a>
            <?php if($_SESSION['Type'] == 3){ ?>
            <a href="Notice.php">Notice</a>
            <a class="active" href="EvaluationSheet.php">Evaluation Sheet</a>
            <?php } else { ?>
            <a href="Routine.php">Routine</a>
            <a href="Notice.php">Notice</a>
            <a class="active" href="EvaluationSheet.php">Evaluation Sheet</a>
            <a href="ToDo.php">To Do List</a>
            <?php } ?>
        </div>
        <button style="float: right;" id="logoutButton"><a href="index.php">Log Out</a></button>
    </div>
</head>

<body>
    <div class="limiter">
        <div id="containerTable" class="container-table100">
            <!-- Contents of the table will be dynamically loaded -->
            <table id="EvaShtTbl" style="margin-top:5%; margin-bottom:5%">
                <thead>
                    <tr class="table100-head">
                        <?php $i=0; foreach ($courseElements as $item){ $i++;?>
                        <th style="text-align:center;" class="column<?php echo $i ?>"><?php echo $item['C_CODE'] ?></th>
                        <?php } ?>
                    </tr>
                </thead>
                <tbody>
                    <?php for($i=1; $i<=$_SESSION['EvalRows']; $i++){ ?>
                    <tr>
                        <?php foreach ($courseElements as $item){ ?>
                        <?php if($item['LEC_'.$i.'']){  ?>
                                <td class="column<?php echo $i ?>">Lec <?php echo $i ?>
                        <?php if($_SESSION['Type'] != 1){ ?>
                                <a href="DelLec.php?id=<?php echo $item['C_CODE']; ?>&i=<?php echo $i ?>" class="delete">x</a></td>
                        <?php }} else {  ?>
                                <td class="column<?php echo $i ?>">
                        <?php if($_SESSION['Type'] != 1) {?>
                                <a href="AddLec.php?id=<?php echo $item['C_CODE']; ?>&i=<?php echo $i ?>" class="add">+</a></td>
                        <?php }}} ?>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
            <?php if($_SESSION['Type'] != 1){ ?>
            <form style="width:100%;" method="post">
                <button style="width:14%; margin-bottom:5%; margin-left: 43%;" name="addRowBtn" id="RowBtn" type="submit" class="btn btn-success">Add Row</button>
            </form>
            <?php } ?>
        </div>
    </div>
    <script src="EvalSheet.js"></script>
</body>