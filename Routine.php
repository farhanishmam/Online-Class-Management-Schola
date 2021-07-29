<!DOCTYPE html>
<html lang="en">
<head>
	<title>Routine</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="node_modules/animate.css/animate.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="node_modules/select2/dist/css/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="node_modules/perfect-scrollbar/css/perfect-scrollbar.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assets/css_routine/util.css">
	<link rel="stylesheet" type="text/css" href="assets/css_routine/main.css">
<!--===============================================================================================-->
	<div class="topnav" id="mytopnav">
		<div id = "navContent">
			<!-- Navbar content will be dynamically loaded -->
			<a href = "UserProfile.html">Profile</a>
			<a class = "active">Routine</a>
            <a href = "Notice.html">Notice</a>
            <a href = "EvaluationSheet.html">Evaluation Sheet</a>
            <a href = "ToDo.html">To Do List</a>
		</div>
		<button id = "logoutButton"><a href="index.html">Log Out</a></button>  
	</div>
</head>
<body>
	<div class="limiter">
		<div class="container-table100">
			<div class="wrap-table100">
				<div id = "routine-table" class="table100 ver1 m-b-110">
					<!-- Routine Table will be dynamically loaded -->
				</div>
			</div>
		</div>
	</div>
	<script src = "Routine.js"></script>
</body>
</html>