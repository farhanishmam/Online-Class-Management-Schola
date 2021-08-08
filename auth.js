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
  
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
    {  
        createCookie("email", email, "10");
        window.location.href = "UserProfile.php";
    });
  }).catch((e) =>
    {
        const failMessage = document.querySelector("#failMessage");
        failMessage.innerHTML = `<p style="color:red">*Invalid Login Credentials</p>`;
    });
});

function createCookie(name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    else {
      expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
  }