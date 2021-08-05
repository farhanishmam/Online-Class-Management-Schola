<?php
    require __DIR__.'/vendor/autoload.php';
    use Kreait\Firebase\Factory;
    $firebase = (new Factory)->withServiceAccount('classroom-management-sys-62bac-firebase-adminsdk-2pync-bbfca3476e.json');
    $auth = $firebase->createAuth();
    if(isset($_POST['forgotPassBtn'])){
        $email=$_POST['forgotemail'];
        try {
            $result=$auth->sendPasswordResetLink($email);
            header("Location:index.php");
        } catch (Exception $e) {
        }
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
	<title>Change User Info</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="node_modules/hamburgers/dist/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="node_modules/animate.css/animate.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="assets/css_otherform/main.css">
	<link rel="stylesheet" type="text/css" href="assets/css_otherform/util.css">
<!--===============================================================================================-->
</head>
<body>
	
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="images/img-01.png" alt="IMG">
				</div>

				<form id = 'submitForm' class="login100-form validate-form" method=post>
					<span class="login100-form-title">
						Forgot Password?
					</span>

					<div class="wrap-input100 validate-input">
						<input id = 'email' class="input100" type="email" name="forgotemail" placeholder="Email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
					<div id = "message"></div>
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" name="forgotPassBtn" type=submit>
							Submit
						</button>
					</div>
					<div class="text-center p-t-100">
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>