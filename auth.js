const loginForm = document.querySelector('#login-form');
var email, password, type;

//Login function

loginForm.addEventListener('submit', (e) => 
{
  e.preventDefault();
  // get user info
    email = loginForm['login-email'].value;
    password = loginForm['login-password'].value;
   
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    
    console.log("User logged in successfully using email and password");
    setupGuides(email);
    
  }).catch((e) =>
    {
        const failMessage = document.querySelector("#failMessage");
        failMessage.innerHTML = `<p style="color:red">*Invalid Login Credentials</p>`;
        loginForm.reset();
    });
});

const setupGuides = (email) =>
{
    sessionStorage.setItem("femail", email);
    window.location.href = "UserProfile.php";
}