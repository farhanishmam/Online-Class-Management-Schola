"use strict";

var containerTable = document.querySelector('#containerTable');
var form = document.querySelector('#typeForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  type = form['userType'].value;

  if (type === 'Student') {
    listStudentCR(1);
  } else if (type === 'CR') {
    listStudentCR(2);
  } else if (type === 'Faculty') {
    listFaculty();
  } else if (type === 'Admin') {
    listAdmin();
  }
}); //Logout

var logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function () {
  auth.signOut();
  console.log("User signed out successfully");
};

function listStudentCR(type) {
  db.collection('User').where("Type", "==", type).get().then(function (snapshot) {
    var html = "";
    var snapData = snapshot.docs;
    html += "\n            <div class=\"wrap-table100\">\n                <div class=\"table100\">\n                    <table>\n                        <thead>\n                            <tr class=\"table100-head\">\n                                <th class=\"stdcolumn1\">ID</th>\n                                <th class=\"stdcolumn2\">Name</th>\n                                <th class=\"stdcolumn3\">Email</th>\n                                <th class=\"stdcolumn4\">Phone No.</th>\n                                <th class=\"stdcolumn5\">Date of Birth</th>\n                                <th class=\"stdcolumn6\">Department</th>\n                                <th class=\"stdcolumn7\">Program</th>\n                                <th class=\"stdcolumn8\">Batch</th>\n                                <th class=\"stdcolumn9\">Section</th>\n                                <th class=\"stdcolumn10\" style=\"opacity:0\">Delete</th>\n                            </tr>\n                        </thead>\n                    <tbody id = \"tableBody\">\n                    \n            ";
    snapData.forEach(function (doc) {
      email = doc.id;
      data = doc.data();
      batch = data.Batch;
      studentID = data.StudentID;
      dob = data.DateOfBirth;
      dept = data.Department;
      nameStd = data.Name;
      phoneNo = data.PhoneNo;
      program = data.Program;
      section = data.Section;
      html += "\n                <tr>\n                    <td class=\"stdcolumn1\">".concat(studentID, "</td>\n                    <td class=\"stdcolumn2\">").concat(nameStd, "</td>\n                    <td class=\"stdcolumn3\">").concat(email, "</td>\n                    <td class=\"stdcolumn4\">").concat(phoneNo, "</td>\n                    <td class=\"stdcolumn5\">").concat(dob, "</td>\n                    <td class=\"stdcolumn6\">").concat(dept, "</td>\n                    <td class=\"stdcolumn7\">").concat(program, "</td>\n                    <td class=\"stdcolumn8\">").concat(batch, "</td>\n                    <td class=\"stdcolumn8\">").concat(section, "</td>\n                    <td class=\"stdcolumn10\">\n                        <span value = \"").concat(email, "\" class = \"delete\"> X </span>\n                    </td>\n                </tr>");
    });
    html += "\n            </tbody>\n                </table>\n            </div></br></br>\n            <div id = \"deleteMessage\">\n            </div>\n            ";
    containerTable.innerHTML = html; //Delete User 

    var closeButtons = document.getElementsByClassName("delete");

    for (i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener("click", function () {
        //remove in UI
        this.parentElement.parentElement.style.display = 'none'; //delete in Database

        deleteID = this.getAttribute("value");
        db.collection("User").doc(deleteID)["delete"]().then(function () {
          var deleteMessage = document.querySelector('#deleteMessage');
          deleteMessage.innerHTML = "<h6 style=\"color: rgb(180, 0, 0);\n                                                            text-align: center;\n                                                            font-size: 5;\n                                                            \">\n                                                    *User Deleted</h6>";
        })["catch"](function (error) {
          console.error("Error removing document: ", error);
        });
      });
    }
  });
}

function listFaculty() {
  db.collection('User').where("Type", "==", 3).get().then(function (snapshot) {
    var html = "";
    var snapData = snapshot.docs;
    html += "\n            <div class=\"wrap-table100\">\n                <div class=\"table100\">\n                    <table>\n                        <thead>\n                            <tr class=\"table100-head\">\n                                <th class=\"stdcolumn1\">ID</th>\n                                <th class=\"stdcolumn2\">Name</th>\n                                <th class=\"stdcolumn3\">Email</th>\n                                <th class=\"stdcolumn4\">Phone No.</th>\n                                <th class=\"stdcolumn5\">Department</th>\n                                <th class=\"stdcolumn6\">Designation</th>\n                                <th class=\"stdcolumn7\" style=\"opacity:0\">Delete</th>\n                            </tr>\n                        </thead>\n                    <tbody id = \"tableBody\">\n                    \n            ";
    snapData.forEach(function (doc) {
      email = doc.id;
      data = doc.data();
      ID = data.ID;
      designation = data.Designation;
      dept = data.Department;
      nameFac = data.Name;
      phoneNo = data.PhoneNo;
      html += "\n                <tr>\n                    <td class=\"stdcolumn1\">".concat(ID, "</td>\n                    <td class=\"stdcolumn2\">").concat(nameFac, "</td>\n                    <td class=\"stdcolumn3\">").concat(email, "</td>\n                    <td class=\"stdcolumn4\">").concat(phoneNo, "</td>\n                    <td class=\"stdcolumn5\">").concat(dept, "</td>\n                    <td class=\"stdcolumn6\">").concat(designation, "</td>\n                    <td class=\"stdcolumn7\">\n                        <span value = \"").concat(email, "\" class = \"delete\"> X </span>\n                    </td>\n                </tr>");
    });
    html += "\n            </tbody>\n                </table>\n            </div></br></br>\n            <div id = \"deleteMessage\">\n            </div>\n            ";
    containerTable.innerHTML = html; //Delete User 

    var closeButtons = document.getElementsByClassName("delete");

    for (i = 0; i < closeButtons.length; i++) {
      console.log(closeButtons.length);
      closeButtons[i].addEventListener("click", function () {
        //remove in UI
        this.parentElement.parentElement.style.display = 'none'; //delete in Database

        deleteID = this.getAttribute("value");
        db.collection("User").doc(deleteID)["delete"]().then(function () {
          var deleteMessage = document.querySelector('#deleteMessage');
          deleteMessage.innerHTML = "<h6 style=\"color: rgb(180, 0, 0);\n                                                            text-align: center;\n                                                            font-size: 5;\n                                                            \">\n                                                    *User Deleted</h6>";
        })["catch"](function (error) {
          console.error("Error removing document: ", error);
        });
      });
    }
  });
}

function listAdmin() {
  db.collection('User').where("Type", "==", 4).get().then(function (snapshot) {
    var html = "";
    var snapData = snapshot.docs;
    html += "\n            <div class=\"wrap-table100\">\n                <div class=\"table100\">\n                    <table>\n                        <thead>\n                            <tr class=\"table100-head\">\n                                \n                                <th class=\"admcolumn1\">Name</th>\n                                <th class=\"stdcolumn2\">Email</th>\n                                <th class=\"stdcolumn3\">Phone No.</th>\n                                <th class=\"stdcolumn4\">Role</th>\n                                <th class=\"stdcolumn5\" style=\"opacity:0\">Delete</th>\n                            </tr>\n                        </thead>\n                    <tbody id = \"tableBody\">\n                    \n            ";
    snapData.forEach(function (doc) {
      email = doc.id;
      data = doc.data();
      role = data.Role;
      nameAdmin = data.Name;
      phoneNo = data.PhoneNo;
      html += "\n                <tr>\n                    <td class=\"admcolumn1\">".concat(nameAdmin, "</td>\n                    <td class=\"stdcolumn2\">").concat(email, "</td>\n                    <td class=\"stdcolumn3\">").concat(phoneNo, "</td>\n                    <td class=\"stdcolumn4\">").concat(role, "</td>\n                    <td class=\"stdcolumn5\">\n                        <span value = \"").concat(email, "\" class = \"delete\"> X </span>\n                    </td>\n                </tr>");
    });
    html += "\n            </tbody>\n                </table>\n            </div></br></br>\n            <div id = \"deleteMessage\">\n            </div>\n            ";
    containerTable.innerHTML = html; //Delete User 

    var closeButtons = document.getElementsByClassName("delete");

    for (i = 0; i < closeButtons.length; i++) {
      console.log(closeButtons.length);
      closeButtons[i].addEventListener("click", function () {
        //remove in UI
        this.parentElement.parentElement.style.display = 'none'; //delete in Database

        deleteID = this.getAttribute("value");
        db.collection("User").doc(deleteID)["delete"]().then(function () {
          var deleteMessage = document.querySelector('#deleteMessage');
          deleteMessage.innerHTML = "<h6 style=\"color: rgb(180, 0, 0);\n                                                            text-align: center;\n                                                            font-size: 5;\n                                                            \">\n                                                    *Admin Removed</h6>";
        })["catch"](function (error) {
          console.error("Error removing document: ", error);
        });
      });
    }
  });
}