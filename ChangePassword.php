<?php
    require __DIR__.'/vendor/autoload.php';
	session_start();
    use Kreait\Firebase\Factory;
    $firebase = (new Factory)->withServiceAccount('classroom-management-sys-62bac-firebase-adminsdk-2pync-bbfca3476e.json');
    $auth = $firebase->createAuth();
    if(isset($_POST['changePassBtn'])){
        $PrePass=$_POST['PrePass'];
		$NewPass=$_POST['NewPass'];
		$ConfirmPass=$_POST['ConfirmPass'];
		$OriginalPass=$_SESSION['Password'];
		$uid=$_SESSION['UID'];
		if($NewPass==$ConfirmPass){
			if($OriginalPass==$PrePass){
				try {
					$result=$auth->changeUserPassword($uid, $NewPass);
					$_SESSION['Password']=$NewPass;
					header("Location:UserProfile.php");
				} catch (Exception $e) {
				}
			}
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
    <link rel="icon" type="image/png" href="images/icons/favicon.ico" />
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="node_modules/animate.css/animate.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="node_modules/hamburgers/dist/hamburgers.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="node_modules/select2/dist/css/select2.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="assets/css_otherform/main.css">
    <link rel="stylesheet" type="text/css" href="assets/css_otherform/util.css">
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
        <div class="container-login100">
            <div class="wrap-login100">
                <div class="login100-pic js-tilt" data-tilt>
                    <img src="images/img-01.png" alt="IMG">
                </div>

                <form id="submitForm" class="login100-form validate-form" method="post">
                    <span class="login100-form-title">
                        Change Password
                    </span>

                    <div class="wrap-input100 validate-input">
                        <input id="opassword" class="input100" type="password" name="PrePass"
                            placeholder="Previous Password" required>
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                        <input id="npassword" class="input100" type="password" name="NewPass" minlength="8"
                            maxlength="16" placeholder="New Password" required>
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input">
                        <input id="cpassword" class="input100" type="password" name="ConfirmPass"
                            placeholder="Confirm New Password" required>
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div id="message">
                    </div>

                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" name="changePassBtn" type="submit">
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