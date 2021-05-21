const message = document.querySelector('#message');

//Setup Navbar 
auth.onAuthStateChanged(user => 
    {
        var email = user.email;
        db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
        {
            setupNav(snapshot.docs);
        });

        //Change Password Function
        const submitForm = document.querySelector("#submitForm");
        submitForm.addEventListener('submit', (e) => 
        {
            e.preventDefault();
            oldPassword = submitForm['opassword'].value;
            newPassword = submitForm['npassword'].value;
            confirmPassword = submitForm['cpassword'].value;
            if(newPassword !== confirmPassword)
            {
                message.innerHTML = `<p style="text-align: center; color: red;">*Passwords do not match</p>`;
            }
            else if (oldPassword === newPassword)
            {
                message.innerHTML = `<p style="text-align: center; color: red;">*New Password can not be the same</p>`;
            }
            else
            {
                auth.signInWithEmailAndPassword(email, oldPassword).then((cred) => 
                {
                    user.updatePassword(newPassword);
                    message.innerHTML = `<p style="text-align: center; color: green;">*Password changed successfully</p>`;
                }).catch(()=>
                {
                    message.innerHTML = `<p style="text-align: center; color: red;">*Incorrect Password</p>`;
                }
                )
            }
        })
    }
)

const navContent = document.querySelector("#navContent");
const setupNav = (data) => 
{
    data.forEach(doc => 
    {
        const userType = doc.data().Type;
        if(userType === 1)
        {
            navContent.innerHTML = 
            `
                <a href="UserProfile.html" >Profile</a>
                <a href="Routine.html">View Routine</a>
                <a class="active">Change Password</a> 
            `
        }
        else if(userType === 2)
        {
            navContent.innerHTML = 
            `
                <a href = "UserProfile.html">Profile</a>
                <a href = "Routine.html">View Routine</a>
                <a href = "BookRoom.html">Book Room</a>
                <a href = "BookingRecords.html">Booking Records</a>
                <a class = "active">Change Password</a> 
            `
        }
        else if(userType === 3)
        {
            navContent.innerHTML = 
            `
                <a href = "UserProfile.html">Profile</a>
                <a href = "BookRoom.html">Book Room</a>
                <a href = "BookingRecords.html">Booking Records</a>
                <a class = "active">Change Password</a> 
            `
        }
    });
};

//Logout
const logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function()
{
    auth.signOut();
    console.log("User signed out successfully");
}