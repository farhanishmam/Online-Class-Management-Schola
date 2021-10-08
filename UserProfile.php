<?php
	session_start();
	include 'sql-conn.php';
	$email = $_SESSION['Email'];
	$result = $conn->query("SELECT F_NAME,F_ID, F_EMAIL, D_NAME FROM FACULTY_PROFILE where F_EMAIL = '$email' ");
	$row = $result->fetch_assoc();
	if($row) {
		$_SESSION['Type'] = 3;
		$_SESSION['ID'] = $row['F_ID'];
	}
	else {
		$result = $conn->query("SELECT * FROM STUDENT_PROFILE where EMAIL = '$email' ");
		$row = $result->fetch_assoc();
		if($row['CR'])
			$_SESSION['Type'] = 2;
		else
			$_SESSION['Type'] = 1;
		$_SESSION['ID'] = $row['ST_ID'];
        $_SESSION['SEC'] = $row['SEC'];
        $_SESSION['GROUP_LAB'] = $row['GROUP_LAB'];
        $_SESSION['DPS_ID'] = $row['ST_DPS_ID'];
	}
    $_SESSION['EvalRows']=0;
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>User Profile</title>
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
            <a class="active" href="UserProfile.php">Profile</a>
            <?php if($_SESSION['Type'] == 3){ ?>
            <a href="Notice.php">Notice</a>
            <a href="EvaluationSheet.php">Evaluation Sheet</a>
            <?php } else { ?>
            <a href="Routine.php">Routine</a>
            <a href="Notice.php">Notice</a>
            <a href="EvaluationSheet.php">Evaluation Sheet</a>
            <a href="ToDo.php">To Do List</a>
            <?php } ?>
        </div>
        <button style="float: right;" id="logoutButton"><a href="index.html">Log Out</a></button>
    </div>
</head>

<body>
    <div class="limiter">
        <div id="containerTable" class="container-table100">
            <!-- Contents of the table will be dynamically loaded -->
            <table id="UserProfile" style="width:85%">
                <thead>
                    <tr class="table100-head">
                        <th class="column1" style="width: 20%">User Information</th>
                        <th class="column2"></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if($_SESSION['Type'] == 3){ ?>
                    <tr>

                        <td class="column1">Name:</td>
                        <td class="column2"> <?php echo $row['F_NAME']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Faculty ID:</td>
                        <td class="column2"> <?php echo $row['F_ID']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Faculty Email:</td>
                        <td class="column2"> <?php echo $row['F_EMAIL']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Department:</td>
                        <td class="column2"> <?php echo $row['D_NAME']; ?> </td>
                    </tr>
                    <?php	} else { ?>
                    <tr>

                        <td class="column1">Name:</td>
                        <td class="column2"> <?php echo $row['ST_NAME']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Student ID:</td>
                        <td class="column2"> <?php echo $row['ST_ID']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Email:</td>
                        <td class="column2"> <?php echo $row['EMAIL']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Date of Birth:</td>
                        <td class="column2"> <?php echo $row['DoB']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Department:</td>
                        <td class="column2"> <?php echo $row['D_NAME']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Program:</td>
                        <td class="column2"> <?php echo $row['P_NAME']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Section:</td>
                        <td class="column2"> <?php echo $row['SEC']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Lab Group:</td>
                        <td class="column2"> <?php echo $row['GROUP_LAB']; ?> </td>
                    </tr>
                    <tr>
                        <td class="column1">Semester:</td>
                        <td class="column2"> <?php echo $row['SEMESTER']; ?> </td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
            <button style="width:20%" onclick="document.location='ChangePassword.php'" id="ChangePassBtn" type="button"
                class="btn btn-success">Change Password</button>
        </div>
    </div>
</body>

</html>