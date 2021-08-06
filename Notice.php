<?php
	session_start();
	include 'sql-conn.php';
	$id = $_SESSION['ID'];
    if($_SESSION['Type'] != 3){
        $dps = $_SESSION['DPS_ID'];
        $sec = $_SESSION['SEC'];
        $g_lab = $_SESSION['GROUP_LAB'];
    }
    
    if($_SESSION['Type'] == 1){
        $result = $conn->query("SELECT DATE_FORMAT(N_DATE,'%d-%b-%Y') AS N_DATE, N_TEXT FROM NOTICES WHERE DPS_ID='$dps' AND (G_LAB='$g_lab' OR G_LAB IS NULL) 
        AND (SEC='$sec' OR SEC IS NULL) AND (COURSE_ID IS NULL OR COURSE_ID IN (SELECT COURSE_ID FROM ST_COURSES WHERE STUDENT_ID='$id'))");
    }
	elseif($_SESSION['Type'] == 2){
        $result = $conn->query("SELECT N_ID, DATE_FORMAT(N_DATE,'%d-%b-%Y') AS N_DATE, N_TEXT FROM NOTICES WHERE DPS_ID='$dps' ");
        $courseResult = $conn->query("SELECT C_CODE, C_NAME FROM COURSES WHERE DPS_ID='$dps' ");
    }
    elseif($_SESSION['Type'] == 3){
        $result = $conn->query("SELECT N_ID, DATE_FORMAT(N_DATE,'%d-%b-%Y') AS N_DATE, N_TEXT FROM NOTICES, COURSES WHERE C_CODE=COURSE_ID AND (FA1_ID='$id' OR FA2_ID='$id') ");
    }
	if(isset($_POST['addNoticeBtn'])){
        $getcourse=$_POST['Course'];
        $getsec=$_POST['Section'];
        $getglab=$_POST['Lab_group'];
        $gettext=$_POST['New_notice'];
        $getdate=$_POST['NoticeDate'];
        if($_SESSION['Type'] == 2){
            
        }
        try{
            $query="INSERT INTO NOTICES (N_DATE,DPS_ID,N_TEXT";
            if($getsec)
                $query.=",SEC";
            if($getglab)
                $query.=",G_LAB";
            if($getcourse)
                $query.=",COURSE_ID";
            $query.= ") VALUES ('".$getdate."', '".$dps."','".$gettext."'";
            if($getsec)
                $query.=", '".$getsec."'";
            if($getglab)
                $query.=", '".$getglab."'";
            if($getcourse)
                $query.=", '".$getcourse."'";
            $query.= ")";
            $conn->query($query);
            header("location:Notice.php");
        }
        catch (Exception $e){

        }
    }
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>Notices</title>
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
            <!-- NavBar will be loaded dynamically -->
            <a href="UserProfile.php">Profile</a>
            <?php if($_SESSION['Type'] == 3){ ?>
            <a class="active" href="Notice.php">Notice</a>
            <a href="EvaluationSheet.php">Evaluation Sheet</a>
            <?php } else { ?>
            <a href="Routine.php">Routine</a>
            <a class="active" href="Notice.php">Notice</a>
            <a href="EvaluationSheet.php">Evaluation Sheet</a>
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
            <table>
                <thead>
                    <tr class="table100-head">
                        <th style="width:20%" class="column1">Date</th>
                        <th style="width:75%" class="column2">Notice</th>
                        <?php if($_SESSION['Type'] != 1){ ?>
                        <th style="width:5%" class="column3"></th>
                        <?php }?>
                    </tr>
                </thead>
                <tbody>
                    <?php if($_SESSION['Type'] != 1){ ?>
                    <?php while ($row = $result->fetch_assoc()){ ?>
                    <tr>
                        <td class="column1"> <?php echo $row['N_DATE']; ?></td>
                        <td class="column2"> <?php echo $row['N_TEXT']; ?></td>
                        <td class="column3"><a href="NoticeDelete.php?id=
									<?php 
										echo $row['N_ID'];
									?>" class="delete">X</a></td>
                    </tr>
                    <?php } } else {  while ($row = $result->fetch_assoc()){ ?>
                    <tr>
                        <td class="column1"> <?php echo $row['N_DATE']; ?></td>
                        <td class="column2"> <?php echo $row['N_TEXT']; ?></td>
                    </tr>
                    <?php } }?>
                </tbody>
            </table>

            <?php if($_SESSION['Type'] != 1){ ?>
            <button style="width:16%; margin-left: 75%; margin-top:-15%" id="addNoticeBtn" type="button"
                class="btn btn-success">Add Notice</button>

            <div id="myModal" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-header">
                            <div class="wrap-login100">
                                <form style="margin-top: -35%;" id="login-form" class="login100-form validate-form"
                                    method="post">
                                    <span class="login100-form-title">
                                        Add Notice
                                    </span>
                                    <div class="wrap-input100 validate-input">
                                        <select style="border-width: 0px; border:0px; outline:0px;" id="Course"
                                            class="input100" type="text" name="Course">
                                            <option value="<?php echo NULL;?>" style="display: none;">Course</option>
                                        <?php while ($courses = $courseResult->fetch_assoc()){ ?>
                                            <option value="<?php echo $courses['C_CODE']?>">
                                            <?php echo $courses['C_NAME']?>
                                            </option>
                                        <?php }?>    
                                        </select>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-book" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div class="wrap-input100 validate-input">
                                        <select style="border-width: 0px; border:0px; outline:0px;" id="Section"
                                            class="input100" type="text" name="Section">
                                            <option value="<?php echo NULL;?>" style="display: none;">Section</option>
                                            <option value=1>1</option>
                                            <option value=2>2</option>
                                        </select>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-users" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div class="wrap-input100 validate-input">
                                        <select style="border-width: 0px; border:0px; outline:0px;" id="Lab_group"
                                            class="input100" type="text" name="Lab_group">
                                            <option value="<?php echo NULL;?>" style="display: none;">Lab Group</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                        </select>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-laptop" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div class="wrap-input100 validate-input">
                                        <input id="Date" class="input100" type="date" name="NoticeDate"
                                            placeholder="Date" value="2021-01-01">
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-calendar" aria-hidden="true"></i>
                                        </span>
                                    </div>

                                    <div class="wrap-input100 validate-input">
                                        <input id="New_notice" class="input100" type="text" name="New_notice"
                                            placeholder="Content of the notice" maxlength="160">
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-bell" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div id="failMessage">
                                    </div>
                                    <div class="container-login100-form-btn">
                                        <button name="addNoticeBtn" id="submitbtn" class="login100-form-btn"
                                            type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php } ?>
        </div>
    </div>
    <script src="Notice.js"></script>
</body>