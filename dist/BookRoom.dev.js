"use strict";

var buildingList = document.querySelector("#BuildingNo");
var submitForm = document.querySelector("#searchForm");
var roomList = document.querySelector("#RoomNo");
var bookForm = document.querySelector("#bookForm");
var routineList = document.querySelector("#routineList");
var popMessage = document.querySelector("#successMessage");
loadBuildingList();
loadRoutineList(); //Fetch & Display Buildings List

function loadBuildingList() {
  db.collection('Building').get().then(function (snapshot) {
    var html = "<option value = \"\">Any</option>";
    var data = snapshot.docs;
    data.forEach(function (doc) {
      var content = "<option value = \"".concat(doc.id, "\">").concat(doc.id, "</option>");
      html += content;
    });
    buildingList.innerHTML = html;
  });
} //Fetch and Load Routine List


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
} //Search Rooms based on credentials


function searchRoom(building, AC, projector, board, capacity) {
  date = submitForm['Date'].value;
  timeSlot = submitForm['timeSlot'].value;
  var convertedDate = convertDate(date);
  db.collection("Room").where("AC", "==", AC).where("Projector", "==", projector).where("Board", "==", Number(board)).where("Capacity", ">=", Number(capacity)).get().then(function (snapshot) {
    var roomHTML = "";
    var roomIDList = [];
    var updatedRoomList = [];
    var snapData = snapshot.docs;
    snapData.forEach(function (doc) {
      if (building == "" || building === doc.id.charAt(0)) {
        roomIDList.push(doc.id);
      }
    }); //Checks booking conflicts and updates the room list 

    roomIDList.forEach(function (element) {
      recordID = element + '-' + convertedDate + '-' + timeSlot;
      db.collection('Record').doc(recordID).get().then(function (docSnapshot) {
        if (!docSnapshot.exists) {
          updatedRoomList.push(element); //displays roomlist 

          roomHTML += "<option value = \"".concat(element, "\">").concat(element, "</option>");
          roomList.innerHTML = roomHTML;
        }
      });
    });
  });
} //Book Selected Room


auth.onAuthStateChanged(function (user) {
  email = user.email;
  db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(function (snapshot) {
    setupNav(snapshot.docs);
  });
  bookForm.addEventListener('submit', function (f) {
    f.preventDefault();
    bookRoom = bookForm['RoomNo'].value;
    courseID = bookForm['courseID'].value;
    routineID = bookForm['routineList'].value;
    notes = bookForm['notes'].value;
    bookingRecord = bookRoom + "-" + convertDate(date) + "-" + timeSlot; //console.log(bookingRecord + courseID + routineID);

    db.collection("Record").doc(bookingRecord).set({
      CourseID: courseID,
      RoutineID: routineID,
      UserEmail: email,
      Notes: notes
    }).then(function () {
      popMessage.innerHTML = "*Room Booked Successfully";
      window.setInterval("location.reload();", 1500);
    })["catch"](function (error) {
      console.error("Error writing document: ", error);
    });
  });
}); //Set up the NavBar

var navContent = document.querySelector("#navContent");

var setupNav = function setupNav(data) {
  data.forEach(function (doc) {
    var userType = doc.data().Type;

    if (userType === 2) {
      navContent.innerHTML = "\n            <a href=\"UserProfile.html\">Profile</a>\n            <a href=\"Routine.html\">View Routine</a>\n            <a class=\"active\">Book Room</a>\n            <a href=\"BookingRecords.html\">Booking Records</a>\n            <a href=\"ChangePassword.html\">Change Password</a> \n            ";
    } else if (userType === 3) {
      navContent.innerHTML = "\n            <a href=\"UserProfile.html\">Profile</a>\n            <a class=\"active\">Book Room</a>\n            <a href=\"BookingRecords.html\">Booking Records</a>\n            <a href=\"ChangePassword.html\">Change Password</a> \n            ";
    }
  });
}; //Make Room List based on Room credentials 


submitForm.addEventListener('submit', function (e) {
  e.preventDefault();
  roomList.innerHTML = "";
  buildingNo = submitForm['BuildingNo'].value;
  capacity = submitForm['capacity'].value;
  AC = submitForm['AC'].checked;
  projector = submitForm['Projector'].checked;
  board = submitForm['Boards'].value;
  dateForm = submitForm['Date'].value;
  if (checkDate(dateForm)) searchRoom(buildingNo, AC, projector, board, capacity);else {
    popMessage.innerHTML = "*Invalid Date";
  }
});

function checkDate(date) {
  yyyy = date[0] + date[1] + date[2] + date[3];
  mm = Number(date[5] + date[6]) - 1;
  dd = date[8] + date[9];
  var today = new Date();
  var inputDate = new Date(yyyy, mm, dd);
  if (inputDate >= today) return true;else return false;
} //Convert Date to proper format


function convertDate(dateIn) {
  var dateYear = dateIn.charAt(0);
  dateYear += dateIn.charAt(1);
  dateYear += dateIn.charAt(2);
  dateYear += dateIn.charAt(3);
  var dateMonth = dateIn.charAt(5) + dateIn.charAt(6);
  var dateDay = dateIn.charAt(8) + dateIn.charAt(9);
  var dateOut = dateDay + '-' + dateMonth + '-' + dateYear;
  return dateOut;
} //Logout


var logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function () {
  auth.signOut();
  console.log("User signed out successfully");
};