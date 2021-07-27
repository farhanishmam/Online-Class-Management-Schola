const closeButtons = document.getElementsByClassName("delete");
const navContent = document.querySelector("#navContent");

var favoritemovie = sessionStorage.getItem("userEmail");
console.log(favoritemovie);

auth.onAuthStateChanged(user => 
  {
      var email = user.email;
      //Change this to an sql query 
      db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
      {
          setupNav(snapshot.docs);
      });
    }
);
    


for(i = 0; i<closeButtons.length; i++)
{
    closeButtons[i].addEventListener("click", function() 
    {
        this.parentElement.parentElement.style.display = 'none';
        
    })
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addTaskButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var table = document.getElementById("ToDoTable");
const addButtons = document.getElementsByClassName("login100-form-btn");
for(i = 0; i<addButtons.length; i++)
{
    addButtons[i].addEventListener("click", function() 
    {
       var row = table.insertRow(0);
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);

       var task = document.getElementById("New_Task").value;
       var deadline = document.getElementById("Deadline").value;

       cell1.innerHTML = 'dscv';
       cell2.innerHTML = 'dcs';
        
    })
}


const setupNav = (data) => 
{
    data.forEach(doc => 
    {
        const userType = doc.data().Type;
        if(userType === 1)
        {
            navContent.innerHTML = 
            `
                <a class = "active">Profile</a>
                <a href = "Notice.html">Notice</a>
                <a href="Routine.html">Routine</a>
                <a href = "EvaluationSheet.html">Evaluation Sheet</a>
                <a href="ToDo.html">To-Do List</a> 
            `
        }
        else if(userType === 2)
        {
            navContent.innerHTML = 
            `
                <a href = "User.html">Profile</a>
                <a href="Routine.html">View Routine</a>
                <a href = "Notice.html">Notice</a>
                <a href = "EvaluationSheet.html">Evaluation Sheet</a>
                <a class="active" href="ChangePassword.html">Change Password</a> 
            `
        }
        else if(userType === 3)
        {
            navContent.innerHTML = 
            `
                <a href = "UserProfile.html">Profile</a>
                <a href = "BookRoom.html">Book Room</a>
                <a href = "BookingRecords.html">Booking Records</a>
                <a cl                          ass = "active">Change Password</a> 
            `
        }
    });
};