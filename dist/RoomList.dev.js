"use strict";

var containerTable = document.querySelector('#containerTable');
listRoom(); //Logout

var logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function () {
  auth.signOut();
  console.log("User signed out successfully");
};

function listRoom() {
  db.collection('Room').get().then(function (snapshot) {
    var html = "";
    var snapData = snapshot.docs;
    html += "\n            <div class=\"wrap-table100\">\n                <div class=\"table100\">\n                    <table>\n                        <thead>\n                            <tr class=\"table100-head\">\n                                \n                                <th class=\"roomcolumn1\">Building No</th>\n                                <th class=\"roomcolumn2\">Room No</th>\n                                <th class=\"roomcolumn3\">AC</th>\n                                <th class=\"roomcolumn4\">Projector</th>\n                                <th class=\"roomcolumn5\">Boards</th>\n                                <th class=\"roomcolumn6\">Capacity</th>\n                                <th class=\"roomcolumn7\" style=\"opacity:0\">Delete</th>\n                            </tr>\n                        </thead>\n                    <tbody id = \"tableBody\">\n                    \n            ";
    snapData.forEach(function (doc) {
      buildingNo = doc.id[0];
      roomNo = doc.id[2] + doc.id[3] + doc.id[4];
      data = doc.data();
      boards = data.Board;
      capacity = data.Capacity;
      var AC, projector;
      if (data.AC) AC = "Yes";else AC = "No";
      if (data.Projector) projector = "Yes";else projector = "No";
      html += "\n                <tr>\n                    <td class=\"roomcolumn1\">".concat(buildingNo, "</td>\n                    <td class=\"roomcolumn2\">").concat(roomNo, "</td>\n                    <td class=\"roomcolumn3\">").concat(AC, "</td>\n                    <td class=\"roomcolumn4\">").concat(projector, "</td>\n                    <td class=\"roomcolumn5\">").concat(boards, "</td>\n                    <td class=\"roomcolumn6\">").concat(capacity, "</td>\n                    <td class=\"roomcolumn7\">\n                        <span value = \"").concat(doc.id, "\" class = \"delete\"> X </span>\n                    </td>\n                </tr>");
    });
    html += "\n            </tbody>\n                </table>\n            </div></br></br>\n            <div id = \"deleteMessage\">\n            </div>\n            ";
    containerTable.innerHTML = html; //Delete Room

    var closeButtons = document.getElementsByClassName("delete");

    for (i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener("click", function () {
        //remove in UI
        this.parentElement.parentElement.style.display = 'none'; //delete in Database

        deleteID = this.getAttribute("value");
        db.collection("Building").doc(deleteID)["delete"]().then(function () {
          var deleteMessage = document.querySelector('#deleteMessage');
          deleteMessage.innerHTML = "<h6 style=\"color: rgb(180, 0, 0);\n                                                            text-align: center;\n                                                            font-size: 5;\n                                                            \">\n                                                    *Building Removed</h6>";
        })["catch"](function (error) {
          console.error("Error removing document: ", error);
        });
      });
    }
  });
}