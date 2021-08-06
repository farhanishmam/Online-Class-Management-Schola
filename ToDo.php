<?php
	session_start();
	include 'sql-conn.php';
	$id = $_SESSION['ID'];
	$result = $conn->query("SELECT DATE_FORMAT(TD_DATE,'%d-%b-%Y') AS TD_DATE, TD_TEXT, DONE_FLAG, TD_ID FROM TO_DO WHERE STUDENT_ID = '$id' ORDER BY TD_DATE ");
	if(isset($_POST['addtaskBtn'])){
        $text=$_POST['New_task'];
        $deadline=$_POST['Deadline'];
		$addTask = $conn->query("INSERT INTO TO_DO (STUDENT_ID,TD_DATE,DONE_FLAG,TD_TEXT) VALUES ('".$id."', '".$deadline."',FALSE,'".$text."')");
		header("location:ToDo.php");
    }
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>To Do List</title>
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
            <a href="Routine.php">Routine</a>
            <a href="Notice.php">Notice</a>
            <a href="EvaluationSheet.php">Evaluation Sheet</a>
            <a class="active" href="ToDo.php">To Do List</a>
        </div>
        <button style="float: right;" id="logoutButton"><a href="index.php">Log Out</a></button>
    </div>
</head>

<body>
    <div class="limiter">
        <div id="containerTable" class="container-table100">
            <!-- Contents of the table will be dynamically loaded -->
            <table id="ToDoTable" style="width:85%">
                <thead>
                    <tr class="table100-head">
                        <th style="width:10%" class="column1"></th>
                        <th style="width:60%" class="column2">Tasks</th>
                        <th style="width:15%" class="column3">Deadline</th>
                        <th style="width:7%" class="column4"></th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($row = $result->fetch_assoc()){ ?>
                    <tr>
                        <td class="column1">
                            <label class="container" style="margin-bottom: 20px; margin-left: -85px">
                                <a href="ToDoCheckBox.php?id=<?php echo $row['TD_ID']?>">
                                    <input type="checkbox" <?php echo ($row['DONE_FLAG'] ? 'checked' : ''); ?>>
                                    <span class="checkmark"></span></a>
                            </label>
                        </td>
                        <td class="column2"> <?php echo $row['TD_TEXT']; ?></td>
                        <td class="column3"> <?php echo $row['TD_DATE']; ?></td>
                        <td class="column4"><a href="ToDoDelete.php?id=
									<?php 
										echo $row['TD_ID'];
									?>" class="delete">X</a></td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
            <button style="width:16%; margin-left: 65%; margin-top:-15%" id="addTaskButton" type="button"
                class="btn btn-success">Add Task</button>

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
                                <form id="login-form" class="login100-form validate-form" method="post">
                                    <span class="login100-form-title">
                                        Add Task
                                    </span>

                                    <div class="wrap-input100 validate-input">
                                        <input id="New_Task" class="input100" type="text" name="New_task"
                                            placeholder="Task Description" maxlength="160">
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-tasks" aria-hidden="true"></i>
                                        </span>
                                    </div>

                                    <div class="wrap-input100 validate-input">
                                        <input id="Deadline" class="input100" type="date" name="Deadline"
                                            placeholder="Deadline Date" value="2021-01-01">
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-calendar" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div id="failMessage">
                                    </div>
                                    <div class="container-login100-form-btn">
                                        <button name="addtaskBtn" id="addbtn" class="login100-form-btn" type="submit">
                                            Add </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
    </div>
    <script src="ToDo.js"></script>
</body>