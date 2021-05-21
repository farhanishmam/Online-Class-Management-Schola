"use strict";

var userTable = document.querySelector('#profile-table');
var topNav = document.querySelector('#navContent'); //getting Email of Logged in User

auth.onAuthStateChanged(function (user) {
  var email = user.email;
  db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(function (snapshot) {
    setupGuides(snapshot.docs, email);
  });
});

var setupGuides = function setupGuides(data, email) {
  var html = "";
  data.forEach(function (doc) {
    var tableContent;
    var data = doc.data();

    if (data.Type === 3) {
      tableContent = "\n        <table>\n            <thead>\n                <tr class=\"table100-head\">\n                    <th class=\"column1\">User Profile</th>\n                    <th class=\"column2\"></th>\n                </tr>\n            </thead>\n            <tbody>\n                    <tr>\n                        <td class=\"column1\">ID</td>\n                        <td class=\"column2\">".concat(data.ID, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Name</td>\n                        <td class=\"column2\">").concat(data.Name, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Email</td>\n                        <td class=\"column2\">").concat(email, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Phone Number</td>\n                        <td class=\"column2\">").concat(data.PhoneNo, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Department</td>\n                        <td class=\"column2\">").concat(data.Department, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Designation</td>\n                        <td class=\"column2\">").concat(data.Designation, "</td>\n                        \n                    </tr>\n                    \n            </tbody>\n        </table>\n        ");
    } else if (data.Type === 4) {
      tableContent = "\n        <table>\n            <thead>\n                <tr class=\"table100-head\">\n                    <th class=\"column1\">User Profile</th>\n                    <th class=\"column2\"></th>\n                </tr>\n            </thead>\n            <tbody>\n                    <tr>\n                        <td class=\"column1\">Name</td>\n                        <td class=\"column2\">".concat(data.Name, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Email</td>\n                        <td class=\"column2\">").concat(email, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Phone Number</td>\n                        <td class=\"column2\">").concat(data.PhoneNo, "</td>    \n                    </tr>\n                    <tr>\n                    <td class=\"column1\">Role</td>\n                    <td class=\"column2\">").concat(data.Role, "</td>    \n                </tr>\n            </tbody>\n        </table>\n        ");
    } else {
      tableContent = "\n        <table>\n            <thead>\n                <tr class=\"table100-head\">\n                    <th class=\"column1\">User Profile</th>\n                    <th class=\"column2\"></th>\n                </tr>\n            </thead>\n            <tbody>\n                    <tr>\n                        <td class=\"column1\">Student ID</td>\n                        <td class=\"column2\">".concat(data.StudentID, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Name</td>\n                        <td class=\"column2\">").concat(data.Name, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Email</td>\n                        <td class=\"column2\">").concat(email, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Department</td>\n                        <td class=\"column2\">").concat(data.Department, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Program</td>\n                        <td class=\"column2\">").concat(data.Program, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Section</td>\n                        <td class=\"column2\">").concat(data.Section, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Date Of Birth</td>\n                        <td class=\"column2\">").concat(data.DateOfBirth, "</td>\n                        \n                    </tr>\n                    <tr>\n                        <td class=\"column1\">Batch</td>\n                        <td class=\"column2\">").concat(data.Batch, "</td>\n                        \n                    </tr>\n                    \n            </tbody>\n\t\t</table>\n        ");
    }

    html += tableContent;

    if (data.Type === 1) {
      topNav.innerHTML = "\n                <a class=\"active\">Profile</a>\n                <a href=\"Routine.html\">View Routine</a>\n                <a href=\"ChangePassword.html\">Change Password</a> \n            ";
    } else if (data.Type === 2) {
      topNav.innerHTML = "\n                <a class=\"active\">Profile</a>\n                <a href=\"Routine.html\">View Routine</a>\n                <a href=\"BookRoom.html\">Book Room</a>\n                <a href=\"BookingRecords.html\">Booking Records</a>\n                <a href=\"ChangePassword.html\">Change Password</a> \n            ";
    } else if (data.Type === 3) {
      topNav.innerHTML = "\n                <a class=\"active\">Profile</a>\n                <a href=\"BookRoom.html\">Book Room</a>\n                <a href=\"BookingRecords.html\">Booking Records</a>\n                <a href=\"ChangePassword.html\">Change Password</a> \n              ";
    } else if (data.Type === 4) {
      topNav.innerHTML = "\n                <a class=\"active\">Profile</a>\n                <a href = \"UserList.html\">User</a>\n                <a href = \"BuildingList.html\">Building</a>\n                <a href = \"RoomList.html\">Room</a>\n                <a href = \"DepartmentList.html\">Department</a>\n                <a href = \"ProgramList.html\">Program</a>\n                <a href = \"RoutineList.html\">Routine</a>\n            ";
    }
  });
  userTable.innerHTML = html;
}; //Logout


var logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function () {
  auth.signOut();
  console.log("User signed out successfully");
};