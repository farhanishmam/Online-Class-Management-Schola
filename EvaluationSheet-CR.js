 var firstTable = document.getElementById("EvaShtTbl")
 var firstTableCells = firstTable.getElementsByTagName("td");
 var actionCell = null;

	for(var i = 0; i < firstTableCells.length; ++i){
		firstTableCells[i].addEventListener("click", function(evt){
			
			actionCell = evt.srcElement;
			if (evt.detail === 1) {
			    actionCell.style.background = '#c1fec1'; //green
			}			
            else if (evt.detail === 2) {
			    actionCell.style.background = '#f7da74'; //yellow
			}	    
			else if (evt.detail === 3) {
			    actionCell.style.background = '#f9909f'; //red
			}	
		}
	)
  }

// Get the modal
var modal = document.getElementById("MyModal");

// Get the button that opens the modal
var btn = document.getElementById("addLecBtn");

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
