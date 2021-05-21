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
            if(snapshot.docs.length === 0)
            {
                const failMessage = document.querySelector("#failMessage");
                failMessage.innerHTML = `<p style="color:red">*Invalid Login Credentials</p>`;
                loginForm.reset();
                auth.signOut();
            }
            else
            {
                setupGuides(snapshot.docs, email, password);
            }

        });
  }).catch((e) =>
    {
        const failMessage = document.querySelector("#failMessage");
        failMessage.innerHTML = `<p style="color:red">*Invalid Login Credentials</p>`;
        loginForm.reset();
    });
});

const setupGuides = (data, email, password) => {
    data.forEach(doc => 
    {
        const userType = doc.data().Type;
        if(userType === 1 || userType === 2)
        {
            console.log("User Logged In Successfully");
            window.location.href = "Routine.html";
            
        }
        else if(userType === 3)
        {
            console.log("User Logged In Successfully");
            window.location.href = "UserProfile.html";
        }
        else if(userType === 4)
        {
            db.collection("Admin").doc("currentAdmin").set(
            {
                Email: email,
                Password: password
            }
            ).then( function()
            {
                 console.log("User Logged In Successfully");
                 window.location.href = "UserProfile.html";
            })
        }
    });
};