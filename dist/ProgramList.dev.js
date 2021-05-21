"use strict";

var containerTable = document.querySelector('#containerTable');
listProg(); //Logout

var logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function () {
  auth.signOut();
  console.log("User signed out successfully");
};

function listProg() {
  db.collection('Program').get().then(function (snapshot) {
    var html = "";
    var snapData = snapshot.docs;
    html += "\n            <div class=\"wrap-table100\">\n                <div class=\"table100\">\n                    <table>\n                        <thead>\n                            <tr class=\"table100-head\">\n                                \n                                <th class=\"roomcolumn1\">Dept Code</th>\n                                <th class=\"roomcolumn2\">Program Code</th>\n                                <th class=\"roomcolumn3\">Short Form</th>\n                                <th class=\"roomcolumn4\">Full Name</th>\n                                <th class=\"roomcolumn5\">Offered From</th>\n                                <th class=\"roomcolumn6\" style=\"opacity:0\">Delete</th>\n                            </tr>\n                        </thead>\n                    <tbody id = \"tableBody\">\n                    \n            ";
    snapData.forEach(function (doc) {
      deptCode = doc.id[0];
      progCode = doc.id[2];
      data = doc.data();
      offeredFrom = doc.OfferedFrom;
      shortForm = data.Name;
      fullForm = data.FullForm;
      html += "\n                <tr>\n                    <td class=\"roomcolumn1\">".concat(deptCode, "</td>\n                    <td class=\"roomcolumn2\">").concat(progCode, "</td>\n                    <td class=\"roomcolumn3\">").concat(shortForm, "</td>\n                    <td class=\"roomcolumn4\">").concat(fullForm, "</td>\n                    <td class=\"roomcolumn5\">").concat(offeredFrom, "</td>\n                    <td class=\"roomcolumn6\">\n                        <span value = \"").concat(doc.id, "\" class = \"delete\"> X </span>\n                    </td>\n                </tr>");
    });
    html += "\n            </tbody>\n                </table>\n            </div></br></br>\n            <div id = \"deleteMessage\">\n            </div>\n            ";
    containerTable.innerHTML = html; //Delete Building

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