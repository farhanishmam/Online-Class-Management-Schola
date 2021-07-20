const closeButtons = document.getElementsByClassName("delete");
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

