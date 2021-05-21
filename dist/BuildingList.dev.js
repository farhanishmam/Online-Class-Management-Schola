"use strict";

var containerTable = document.querySelector('#containerTable');
listBuilding(); //Logout

var logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function () {
  auth.signOut();
  console.log("User signed out successfully");
};

function listBuilding() {
  db.collection('Building').get().then(function (snapshot) {
    var html = "";
    var snapData = snapshot.docs;
    html += "\n            <div class=\"wrap-table100\">\n                <div class=\"table100\">\n                    <table>\n                        <thead>\n                            <tr class=\"table100-head\">\n                                \n                                <th class=\"column1\">No</th>\n                                <th class=\"buildingcolumn2\">Building Name</th>\n                                <th class=\"column3\">Floors</th>\n                                <th class=\"column4\">Rooms</th>\n                                <th class=\"column5\">Lift</th>\n                                <th class=\"column6\">Established Year</th>\n                                <th class=\"column7\" style=\"opacity:0\">Delete</th>\n                            </tr>\n                        </thead>\n                    <tbody id = \"tableBody\">\n                    \n            ";
    snapData.forEach(function (doc) {
      buildingNo = doc.id;
      data = doc.data();
      var lift;
      liftBool = data.Lift;
      if (liftBool) lift = "Yes";else lift = "No";
      rooms = data.Rooms;
      floors = data.Floors;
      nameBuilding = data.Name;
      estYear = data.EstYear;
      html += "\n                <tr>\n                    <td class=\"column1\">".concat(buildingNo, "</td>\n                    <td class=\"buildingcolumn2\">").concat(nameBuilding, "</td>\n                    <td class=\"column3\">").concat(floors, "</td>\n                    <td class=\"column4\">").concat(rooms, "</td>\n                    <td class=\"column5\">").concat(lift, "</td>\n                    <td class=\"column6\">").concat(estYear, "</td>\n                    <td class=\"column7\">\n                        <span value = \"").concat(buildingNo, "\" class = \"delete\"> X </span>\n                    </td>\n                </tr>");
    });
    html += "\n            </tbody>\n                </table>\n            </div></br></br>\n            <div id = \"deleteMessage\">\n            </div>\n            ";
    containerTable.innerHTML = html; //Delete Building

    var closeButtons = document.getElementsByClassName("delete");

    for (i = 0; i < closeButtons.length; i++) {
      console.log(closeButtons.length);
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