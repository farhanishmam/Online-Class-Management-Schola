<?php
	session_start();
	include 'sql-conn.php';
	$email = $_SESSION['Email'];
	$result = $conn->query("SELECT F_NAME,F_ID FROM FACULTY where F_EMAIL = '$email' ");
	$row = $result->fetch_assoc();
	if($row) 
		$_SESSION['Type'] = 3;
	else {
		$result = $conn->query("SELECT ST_NAME,ST_ID,CR FROM STUDENT where EMAIL = '$email' ");
		$row = $result->fetch_assoc();
		if($row['CR'])
			$_SESSION['Type'] = 2;
		else
			$_SESSION['Type'] = 1;
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>User Profile</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
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
	  	<div id = "navContent">
			<a class="active" href = "StudentProfile.php">Profile</a>
			<a href = "Routine.php">Routine</a>
            <a href = "Notice.php">Notice</a>
            <a href = "EvaluationSheet.php">Evaluation Sheet</a>
            <a href = "ToDo.php">To Do List</a>
		</div>
		<button style="float: right;"id = "logoutButton"><a href="index.php">Log Out</a></button>  
      </div>  
</head>
<body>
	<div class="limiter">
		<div id = "containerTable" class="container-table100">
             <!-- Contents of the table will be dynamically loaded -->
					<table id="UserProfile" style="width:85%">
						<thead>
							<tr class="table100-head">
								<th class="column1" style="width: 20%">User Information</th>
								<th class="column2"></th>
							</tr>
						</thead>
						<tbody>
							<?php
								if($_SESSION['Type'] == 3){
									echo '<tr>
									
										<td class="column1">Name:</td>
										<td class="column2"> '.$row['F_NAME'].'  </td>
									</tr>
									<tr>
										<td class="column1">Faculty ID:</td>
										<td class="column2"> '.$row['F_ID'].' </td>
									</tr>
									<tr>
										<td class="column1">Department:</td>
										<td class="column2"> CSE </td>
									</tr>';
								}
								else {
									echo '<tr>
									
										<td class="column1">Name:</td>
										<td class="column2"> '.$row['ST_NAME'].'  </td>
									</tr>
									<tr>
										<td class="column1">Student ID:</td>
										<td class="column2"> '.$row['ST_ID'].' </td>
									</tr>
									<tr>
										<td class="column1">Department:</td>
										<td class="column2"> CSE </td>
									</tr>';
								}
							?>
						</tbody>
					</table>
				 <button style="width:20%" onclick="document.location='ChangePassword.html'"id = "ChangePassBtn" type="button" class="btn btn-success">Change Password</button>
			</div>
		</div>
	</body>
</html>
							