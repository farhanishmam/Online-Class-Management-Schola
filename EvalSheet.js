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