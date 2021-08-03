<?php
	session_start();
	include 'sql-conn.php';
	$email = $_SESSION['Email'];
	$result = $conn->query("SELECT COURSE_CODE, WEEKDAYS, SLOT, C_LINK FROM STUDENT_ROUTINE where ST_EMAIL = '$email' ");
	$j=1;
	function displayRoutine($j, $result) {
		$row = $result->fetch_assoc();
		for ( $i=1; $i<8; $i++){
			if($row==NULL)		
				break;				
			elseif($i<4) {
				if($j==$row['WEEKDAYS'] && $i==$row['SLOT'])
					echo '<td style="text-align:center" class="column100 column'.($i+1).'" data-column="'.($i+1).'">'.$row['COURSE_CODE'].'</td>';
				else {
					echo '<td style="text-align:center" class="column100 column'.($i+1).'" data-column="'.($i+1).'"> </td>';
					continue;
				}
			}
			elseif($i==4){
				echo '<td class="column100 column5" data-column="column5"> </td>';
				continue;
			}
			else{
				if($j==$row['WEEKDAYS'] && ($i-1)==$row['SLOT'])
					echo '<td style="text-align:center" class="column100 column'.($i+1).'" data-column="'.($i+1).'">'.$row['COURSE_CODE'].'</td>';
				else {
					echo '<td style="text-align:center" class="column100 column'.($i+1).'" data-column="'.($i+1).'"> </td>';
					continue;
				}
			}
			if($i<7)
				$row = $result->fetch_assoc();
		}
		return $result;
	}
?>

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
			<a href = "UserProfile.php">Profile</a>
			<a class = "active">Routine</a>
            <a href = "Notice.php">Notice</a>
            <a href = "EvaluationSheet.php">Evaluation Sheet</a>
            <a href = "ToDo.php">To Do List</a>
		</div>
		<button id = "logoutButton"><a href="index.php">Log Out</a></button>  
	</div>
</head>
<body>
	<div class="limiter">
		<div class="container-table100">
			<div class="wrap-table100">
				<div id = "routine-table" class="table100 ver1 m-b-110">
				<table data-vertable="ver1">
					<thead>
						<tr class="row100 head">
							<th style="text-align:center" class="column100 column1" data-column="column1"></th>
							<th style="text-align:center" class="column100 column3" data-column="column2">08:30 - 09:45</th>
							<th style="text-align:center" class="column100 column4" data-column="column3">10:00 - 11:15</th>
							<th style="text-align:center" class="column100 column5" data-column="column4">11:30 - 12:45</th>
							<th style="text-align:center" class="column100 column6" data-column="column5">12:45 - 02:15</th>
							<th style="text-align:center" class="column100 column7" data-column="column6">02:15 - 03:30</th>
							<th style="text-align:center" class="column100 column8" data-column="column7">03:45 - 05:00</th>
							<th style="text-align:center" class="column100 column9" data-column="column8">05:15 - 06:30</th>
						</tr>
					</thead>
						<?php
						echo '<tbody>
							<tr class="row100">
								<td style="text-align:center" class="column100 column1" data-column="column1">Monday</td>';
								$result=displayRoutine($j, $result);
								echo
							'</tr>
			
							<tr class="row100">
								<td style="text-align:center" class="column100 column1" data-column="column1">Tuesday</td>';
								$j++;
								$result=displayRoutine($j, $result);
								echo
							'</tr>
			
							<tr class="row100">
								<td style="text-align:center" class="column100 column1" data-column="column1">Wednesday</td>';
								$j++;
								$result=displayRoutine($j, $result);
								echo
							'</tr>
			
							<tr class="row100">
								<td style="text-align:center" class="column100 column1" data-column="column1">Thursday</td>';
								$j++;
								$result=displayRoutine($j, $result);
								echo
							'</tr>
			
							<tr class="row100">
								<td style="text-align:center" class="column100 column1" data-column="column1">Friday</td>';
								$j++;
								$result=displayRoutine($j, $result);
								echo
							'</tr>
						</tbody>';
						?>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>