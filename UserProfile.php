<?php
	include 'conn.php';
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
			<a class="active" href = "UserProfile.html">Profile</a>
			<a href = "Routine.html">Routine</a>
            <a href = "Notice.html">Notice</a>
            <a href = "EvaluationSheet.html">Evaluation Sheet</a>
            <a href = "ToDo.html">To Do List</a>
		</div>
		<button style="float: right;"id = "logoutButton"><a href="index.html">Log Out</a></button>  
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
							<tr>
								<td class="column1">Name:</td>
								<td class="column2">
									<?php
										$sql = "SELECT st_name FROM student";
										$result = $conn->query($sql);
										
										if ($result->num_rows > 0) {
											while($row = $result->fetch_assoc()) {
											echo $row["st_name"];
											}
										} else {
										  echo "0 results";
										}
									?>
								</td>
							</tr>
							<tr>
								<td class="column1">Student ID:</td>
								<td class="column2">180041118</td>
							</tr>
							<tr>
								<td class="column1">Department:</td>
								<td class="column2">CSE</td>
							</tr>
						</tbody>
					</table>
				 <button style="width:20%" onclick="document.location='ChangePassword.html'"id = "ChangePassBtn" type="button" class="btn btn-success">Change Password</button>
			</div>
		</div>
	</body>
</html>
							
