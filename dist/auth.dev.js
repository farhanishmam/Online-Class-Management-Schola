"use strict";

var loginForm = document.querySelector('#login-form');
var email, password, type; //Login function

loginForm.addEventListener('submit', function (e) {
  e.preventDefault(); // get user info

  email = loginForm['login-email'].value;
  password = loginForm['login-password'].value;
  type = loginForm['UserType'].value; // log the user in

  auth.signInWithEmailAndPassword(email, password).then(function (cred) {
    console.log("User logged in successfully using email and password");
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(function (snapshot) {
      setupGuides(snapshot.docs, type);
    });
  })["catch"](function (e) {
    var failMessage = document.querySelector("#failMessage");
    failMessage.innerHTML = "<p style=\"color:red\">*Invalid Login Credentials</p>";
    loginForm.reset();
  });
});

var setupGuides = function setupGuides(data, inputType) {
  data.forEach(function (doc) {
    var userType = doc.data().Type;

    if (userType === 1 && inputType === 'Student') {
      console.log("User Logged In Successfully");
      window.location.href = "Routine.html";
    } else if (userType === 2 && inputType === 'CR') {
      console.log("User Logged In Successfully");
      window.location.href = "Routine.html";
    } else if (userType === 3 && inputType === 'Faculty') {
      console.log("User Logged In Successfully");
      window.location.href = "UserProfile.html";
    } else if (userType === 4 && inputType === 'Admin') {
      console.log("User Logged In Successfully");
      window.location.href = "UserProfile.html";
    } else {
      var failMessage = document.querySelector("#failMessage");
      failMessage.innerHTML = "<p style=\"color:red\"> *User is not a ".concat(inputType, "</p>");
      auth.signOut();
    }
  });
};