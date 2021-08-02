// Get the modal
var dmodal = document.getElementById("DelModal");

// Get the button that opens the modal
var dbtn = document.getElementById("delLecBtn");

// Get the <span> element that closes the modal
var dspan = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
dbtn.onclick = function() {
  dmodal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
dspan.onclick = function() {
  dmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == dmodal) {
    dmodal.style.display = "none";
  }
}