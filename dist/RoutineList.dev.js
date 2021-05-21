"use strict";

var routineList = document.querySelector('#routineList');
var form = document.querySelector('#typeForm');
var containerTable = document.querySelector("#containerTable");
loadRoutineList(); //Fetch and Load Routine List

function loadRoutineList() {
  db.collection('Routine').get().then(function (snapshot) {
    var routineHTML = "";
    var routineData = snapshot.docs;
    routineData.forEach(function (doc) {
      var routineContent = "<option value = \"".concat(doc.id, "\">").concat(doc.id, "</option>");
      routineHTML += routineContent;
    });
    routineList.innerHTML = routineHTML;
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  containerTable.innerHTML = "";
  routineID = form['routineList'].value;
  displayRoutine(routineID);
});

function displayRoutine(routineID) {
  var docRefRoutine = db.collection("Routine").doc(routineID);
  tableContent = "<div class=\"wrap-table100\">\n        <div id = \"routine-table\" class=\"table100 ver1 m-b-110\">\n    ";
  docRefRoutine.get().then(function (docRefRoutine) {
    var data = docRefRoutine.data();
    tableContent += "\n        <table data-vertable=\"ver1\">\n            <thead>\n                <tr class=\"row100 head\">\n                    <th class=\"column100 column1\" data-column=\"column1\"></th>\n                    <th class=\"column100 column3\" data-column=\"column2\">9:00 - 9:50</th>\n                    <th class=\"column100 column4\" data-column=\"column3\">10:00 - 10:50</th>\n                    <th class=\"column100 column5\" data-column=\"column4\">11:00 - 11:50</th>\n                    <th class=\"column100 column6\" data-column=\"column5\">12:00 - 12:50</th>\n                    <th class=\"column100 column7\" data-column=\"column6\">2:10 - 3:00</th>\n                    <th class=\"column100 column8\" data-column=\"column7\">3:10 - 4:00</th>\n                    <th class=\"column100 column9\" data-column=\"column8\">4:15 - 5:05</th>\n                    <th class=\"column100 column10\" data-column=\"column9\">5:15 - 6:05</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr class=\"row100\">\n                    <td class=\"column100 column1\" data-column=\"column1\">Monday</td>\n                    <td class=\"column100 column2\" data-column=\"column2\">".concat(data.Monday[1], "</td>\n                    <td class=\"column100 column3\" data-column=\"column3\">").concat(data.Monday[2], "</td>\n                    <td class=\"column100 column4\" data-column=\"column4\">").concat(data.Monday[3], "</td>\n                    <td class=\"column100 column5\" data-column=\"column5\">").concat(data.Monday[4], "</td>\n                    <td class=\"column100 column6\" data-column=\"column6\">").concat(data.Monday[5], "</td>\n                    <td class=\"column100 column7\" data-column=\"column7\">").concat(data.Monday[6], "</td>\n                    <td class=\"column100 column8\" data-column=\"column8\">").concat(data.Monday[7], "</td>\n                    <td class=\"column100 column9\" data-column=\"column9\">").concat(data.Monday[8], "</td>\n                </tr>\n\n                <tr class=\"row100\">\n                    <td class=\"column100 column1\" data-column=\"column1\">Tuesday</td>\n                    <td class=\"column100 column2\" data-column=\"column2\">").concat(data.Tuesday[1], "</td>\n                    <td class=\"column100 column3\" data-column=\"column3\">").concat(data.Tuesday[2], "</td>\n                    <td class=\"column100 column4\" data-column=\"column4\">").concat(data.Tuesday[3], "</td>\n                    <td class=\"column100 column5\" data-column=\"column5\">").concat(data.Tuesday[4], "</td>\n                    <td class=\"column100 column6\" data-column=\"column6\">").concat(data.Tuesday[5], "</td>\n                    <td class=\"column100 column7\" data-column=\"column7\">").concat(data.Tuesday[6], "</td>\n                    <td class=\"column100 column8\" data-column=\"column8\">").concat(data.Tuesday[7], "</td>\n                    <td class=\"column100 column9\" data-column=\"column9\">").concat(data.Tuesday[8], "</td>\n          \n                    \n                </tr>\n\n                <tr class=\"row100\">\n                <td class=\"column100 column1\" data-column=\"column1\">Wednesday</td>\n                    <td class=\"column100 column2\" data-column=\"column2\">").concat(data.Wednesday[1], "</td>\n                    <td class=\"column100 column3\" data-column=\"column3\">").concat(data.Wednesday[2], "</td>\n                    <td class=\"column100 column4\" data-column=\"column4\">").concat(data.Wednesday[3], "</td>\n                    <td class=\"column100 column5\" data-column=\"column5\">").concat(data.Wednesday[4], "</td>\n                    <td class=\"column100 column6\" data-column=\"column6\">").concat(data.Wednesday[5], "</td>\n                    <td class=\"column100 column7\" data-column=\"column7\">").concat(data.Wednesday[6], "</td>\n                    <td class=\"column100 column8\" data-column=\"column8\">").concat(data.Wednesday[7], "</td>\n                    <td class=\"column100 column9\" data-column=\"column9\">").concat(data.Wednesday[8], "</td>\n                   \n                    \n                </tr>\n\n                <tr class=\"row100\">\n                    <td class=\"column100 column1\" data-column=\"column1\">Thursday</td>\n                    <td class=\"column100 column2\" data-column=\"column2\">").concat(data.Thursday[1], "</td>\n                    <td class=\"column100 column3\" data-column=\"column3\">").concat(data.Thursday[2], "</td>\n                    <td class=\"column100 column4\" data-column=\"column4\">").concat(data.Thursday[3], "</td>\n                    <td class=\"column100 column5\" data-column=\"column5\">").concat(data.Thursday[4], "</td>\n                    <td class=\"column100 column6\" data-column=\"column6\">").concat(data.Thursday[5], "</td>\n                    <td class=\"column100 column7\" data-column=\"column7\">").concat(data.Thursday[6], "</td>\n                    <td class=\"column100 column8\" data-column=\"column8\">").concat(data.Thursday[7], "</td>\n                    <td class=\"column100 column9\" data-column=\"column9\">").concat(data.Thursday[8], "</td>\n          \n                    \n                </tr>\n\n                <tr class=\"row100\">\n                    <td class=\"column100 column1\" data-column=\"column1\">Friday</td>\n                    <td class=\"column100 column2\" data-column=\"column2\">").concat(data.Friday[1], "</td>\n                    <td class=\"column100 column3\" data-column=\"column3\">").concat(data.Friday[2], "</td>\n                    <td class=\"column100 column4\" data-column=\"column4\">").concat(data.Friday[3], "</td>\n                    <td class=\"column100 column5\" data-column=\"column5\">").concat(data.Friday[4], "</td>\n                    <td class=\"column100 column6\" data-column=\"column6\">").concat(data.Friday[5], "</td>\n                    <td class=\"column100 column7\" data-column=\"column7\">").concat(data.Friday[6], "</td>\n                    <td class=\"column100 column8\" data-column=\"column8\">").concat(data.Friday[7], "</td>\n                    <td class=\"column100 column9\" data-column=\"column9\">").concat(data.Friday[8], "</td>\n                 \n                    \n                </tr>\n            </tbody>\n        </table>\n        ");
    tableContent += "</div>\n            <div class=\"d-flex justify-content-end\">\n                <button id = \"deleteButton\" type=\"button\" class=\"btn btn-danger\" value =\"".concat(routineID, "\">Delete Routine</button>\n            </div>\n        </div>\n        ");
    containerTable.innerHTML = tableContent; //Delete Routine 

    var delButton = document.querySelector("#deleteButton");

    delButton.onclick = function () {
      db.collection("Building").doc(this.value)["delete"]().then(function () {
        window.location.href = "RoutineList.html";
      });
    };
  });
}