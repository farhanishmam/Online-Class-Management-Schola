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
	if(isset($_POST['addNoticeBtn'])){
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
    <link rel="stylesheet" type="text/css" href="assets/css_routine/main.css">
    <link rel="stylesheet" type="text/css" href="assets/css_routine/util.css">
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
        <div class="container-table100">
            <div class="wrap-table100">
                <div id="containerTable" class="table100 ver1 m-b-110">
                    <!-- Contents of the table will be dynamically loaded -->
                    <table id="EvaShtTbl" data-vertable="ver1">
                        <thead>
                            <tr class="row100-head">
                                <?php $i=0; foreach ($courseElements as $item){ $i++;?>
                                <th style="text-align:center;" class="column100 column<?php echo $i ?>" data-column="column<?php echo $i ?>"><?php echo $item['C_CODE'] ?></th>
                                <?php } ?>
                            </tr>
                        </thead>
                        <tbody>
                        <?php for($i=1; $i<25; $i++){?>
                            <tr class="row100">
                                <?php foreach ($courseElements as $item){  if($item['LEC_'.$i.'']){ ?>
                                <td class="column100 column<?php echo $i?>">Lec <?php echo $i ?><a class="delete">x</a></td>

                                <?php } else { ?>
                                <td class="column100 column<?php echo $i?>"> <a class="add">+</a></td>
                                <?php } } ?>
                            </tr>
                        <?php } ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <button style="width:13%; margin-left: 65%; margin-top:-15%" id="addLecBtn" type="button"
                class="btn btn-success">Add Lecture</button>
            <div id="MyModal" class="modal" tabindex="-1" role="dialog">
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
                                <form id="login-form" class="login100-form validate-form"
                                    action="EvaluationSheet-CR.html">
                                    <span class="login100-form-title">
                                        Add Lecture
                                    </span>

                                    <div class="wrap-input100 validate-input">
                                        <select style="border-width: 0px; border:0px; outline:0px;" id="Course"
                                            class="input100" type="text" name="Course">
                                            <option value="volvo" style="display: none;">Course</option>
                                            <option value="saab">Mpal</option>
                                            <option value="opel">Os</option>
                                            <option value="audi">Math</option>
                                        </select>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-book" aria-hidden="true"></i>
                                        </span>
                                    </div>

                                    <div class="wrap-input100 validate-input">
                                        <input id="Drive_Link" class="input100" type="text" name="Drive_Link"
                                            placeholder="Drive Link">
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-link" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div id="failMessage">
                                    </div>
                                    <div class="container-login100-form-btn">
                                        <button id="submitbtn" class="login100-form-btn">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <button style="width:13%; margin-top:-15%;" id="delLecBtn" type="button" class="btn btn-danger">Delete
                Lecture</button>
            <div id="DelModal" class="modal" tabindex="-1" role="dialog">
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
                                <form id="login-form" class="login100-form validate-form"
                                    action="EvaluationSheet-CR.html">
                                    <span class="login100-form-title">
                                        Delete Lecture
                                    </span>

                                    <div class="wrap-input100 validate-input">
                                        <select style="border-width: 0px; border:0px; outline:0px;" id="Course"
                                            class="input100" type="text" name="Course">
                                            <option style="display: none;">Course</option>
                                            <option value="Mpal">Mpal</option>
                                            <option value="Os">Os</option>
                                            <option value="Math">Math</option>
                                        </select>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-book" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div class="wrap-input100 validate-input">
                                        <select style="border-width: 0px; border:0px; outline:0px;" id="LecNum"
                                            class="input100" type="text" name="LecNum">
                                            <option style="display: none;">Lecture Number</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-file" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div id="failMessage">
                                    </div>
                                    <div class="container-login100-form-btn">
                                        <button id="submitbtn" class="login100-form-btn">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="EvalSheet.js"></script>
    <script src="EvalALecM.js"></script>
    <script src="EvalDLecM.js"></script>
</body>