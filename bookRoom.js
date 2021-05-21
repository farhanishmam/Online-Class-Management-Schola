const buildingList = document.querySelector("#BuildingNo");
const submitForm = document.querySelector("#searchForm");
const roomList = document.querySelector("#RoomNo");
const bookForm = document.querySelector("#bookForm");
const routineList = document.querySelector("#routineList");
const popMessage = document.querySelector("#successMessage");

loadBuildingList();
loadRoutineList();

//Fetch & Display Buildings List
function loadBuildingList()
{
    db.collection('Building').get().then(snapshot =>
    {
        var html = `<option value = "">Any</option>`;
        const data = snapshot.docs;
        data.forEach(doc => 
        {
            var content = `<option value = "${doc.id}">${doc.id}</option>`;
            html += content;
        })
        buildingList.innerHTML = html;
    });
}

//Fetch and Load Routine List
function loadRoutineList()
{
    db.collection('Routine').get().then(snapshot =>
    {
        var routineHTML = ``;
        const routineData = snapshot.docs;
        routineData.forEach(doc => 
        {
            var routineContent = `<option value = "${doc.id}">${doc.id}</option>`;
            routineHTML += routineContent;
        })
        routineList.innerHTML = routineHTML;
    });
}

//Search Rooms based on credentials
function searchRoom(building, AC, projector, board, capacity)
{
    date = submitForm['Date'].value;
    timeSlot = submitForm['timeSlot'].value;
    var convertedDate = convertDate(date);
    db.collection("Room").where("AC","==", AC).where("Projector","==",projector).where("Board","==",Number(board)).where("Capacity",">=",Number(capacity)).get().then
    ( 
        snapshot =>
        {
            var roomHTML = ``;
            var roomIDList = [];
            var updatedRoomList = [];
            const snapData = snapshot.docs;
            snapData.forEach(doc => 
            {
                if((building == "") || (building === doc.id.charAt(0)))
                { 
                    roomIDList.push(doc.id);
                }
            })
            //Checks booking conflicts and updates the room list 
            roomIDList.forEach( element =>
            {
                recordID = element + '-' + convertedDate + '-' + timeSlot;
                db.collection('Record').doc(recordID).get().then((docSnapshot) => 
                {
                    if (!docSnapshot.exists) 
                    {
                        updatedRoomList.push(element);
                        //displays roomlist 
                        roomHTML += `<option value = "${element}">${element}</option>`;
                        roomList.innerHTML = roomHTML;
                    }
                })
            })
        }
    )
}

//Book Selected Room
auth.onAuthStateChanged(user => 
{
    email = user.email;
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
    {
        setupNav(snapshot.docs);
    });
    bookForm.addEventListener('submit',(f) =>
    {
        f.preventDefault();
        
        bookRoom = bookForm['RoomNo'].value;
        courseID = bookForm['courseID'].value;
        routineID = bookForm['routineList'].value;
        notes = bookForm['notes'].value;
        bookingRecord = bookRoom + "-" + convertDate(date) + "-" + timeSlot;
        //console.log(bookingRecord + courseID + routineID);
        db.collection("Record").doc(bookingRecord).set({
            CourseID: courseID,
            RoutineID: routineID,
            UserEmail: email,
            Notes: notes
        })
        .then(function() 
        {
            popMessage.innerHTML = "*Room Booked Successfully";
            window.setInterval("location.reload();", 1500);
        })
        .catch(function(error) 
        {
            console.error("Error writing document: ", error);
        });
    })
})

//Set up the NavBar
const navContent = document.querySelector("#navContent");
const setupNav = (data) => {
    data.forEach(doc => 
    {
        const userType = doc.data().Type;
        if(userType === 2)
        {
            navContent.innerHTML = `
            <a href="UserProfile.html">Profile</a>
            <a href="Routine.html">View Routine</a>
            <a class="active">Book Room</a>
            <a href="BookingRecords.html">Booking Records</a>
            <a href="ChangePassword.html">Change Password</a> 
            `
        }
        else if(userType === 3)
        {
            navContent.innerHTML = `
            <a href="UserProfile.html">Profile</a>
            <a class="active">Book Room</a>
            <a href="BookingRecords.html">Booking Records</a>
            <a href="ChangePassword.html">Change Password</a> 
            `
        }
    });
};

//Make Room List based on Room credentials 
submitForm.addEventListener('submit', (e) => 
{
    e.preventDefault();
    roomList.innerHTML = ``;
    buildingNo = submitForm['BuildingNo'].value;
    capacity = submitForm['capacity'].value;
    AC = submitForm['AC'].checked;
    projector = submitForm['Projector'].checked;
    board = submitForm['Boards'].value;
    dateForm = submitForm['Date'].value;
    if(checkDate(dateForm))
        searchRoom(buildingNo, AC, projector, board, capacity);  
    else
    {
        popMessage.innerHTML = "*Invalid Date";
    } 
})

function checkDate(date)
{
    yyyy = date[0] + date[1] + date[2] + date[3];
    mm = Number(date[5] + date[6])-1;
    dd = date[8] + date[9];
    let today = new Date();
    let inputDate = new Date(yyyy,mm,dd);
    if(inputDate>=today) return true;
    else return false;
}


//Convert Date to proper format
function convertDate(dateIn)
{
    let dateYear = dateIn.charAt(0);
    dateYear += dateIn.charAt(1);
    dateYear += dateIn.charAt(2);
    dateYear += dateIn.charAt(3);

    let dateMonth = dateIn.charAt(5) + dateIn.charAt(6);
    let dateDay = dateIn.charAt(8) + dateIn.charAt(9);

    let dateOut = dateDay + '-' + dateMonth + '-' + dateYear;
    return dateOut;
}

//Logout
const logoutButton = document.querySelector('#logoutButton');
logoutButton.onclick = function()
{
    auth.signOut();
    console.log("User signed out successfully");
}