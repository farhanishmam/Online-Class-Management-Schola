const tableBody = document.querySelector("#tableBody");
const navBar = document.querySelector("#navContent");

loadRecords();

//User Record Function
auth.onAuthStateChanged(user => 
{
    var email = user.email;
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
    {
        setupNav(snapshot.docs);
    });
    db.collection('Record').where('UserEmail','==',email).get().then(snapshot =>
    {
        var html = ``;
        const data = snapshot.docs;
        data.forEach(doc =>
        {
            recordID = doc.id;
            courseID = doc.data().CourseID;
            notes = doc.data().Notes;
            if(notes === "") notes = "None";
            routineID = doc.data().RoutineID;

            timeSlot = Number(recordID.charAt(17));
            time = convertTimeSlot(timeSlot);
            roomNo = recordID.substring(2,5);
            date = recordID.substring(6,16);

            html +=
            `
            <tr>
                <td class="column1">${recordID.charAt(0)}</td>
                <td class="column2">${roomNo}</td>
                <td class="column3">${date}</td>
                <td class="column4">${time[0]}</td>
                <td class="column5">${time[1]}</td>
                <td class="column6">${courseID}</td>
                <td class="column7">${routineID}</td>
                <td class="column8">${notes}</td>
                <td class="column9">
                    <span value = "${recordID}" class = "delete"> X </span>
                </td>
            </tr>`
        })
        tableBody.innerHTML = html;

        //Delete User Record Function
        const closeButtons = document.getElementsByClassName("delete");
        for(i = 0; i<closeButtons.length; i++)
        {
            closeButtons[i].addEventListener("click", function() 
            {
                //remove in UI
                this.parentElement.parentElement.style.display = 'none';
                //delete in Database
                deleteID = this.getAttribute("value")
                db.collection("Record").doc(deleteID).delete().then(function() 
                {
                    const deleteMessage = document.querySelector('#deleteMessage');
                    deleteMessage.innerHTML = `<p style="color: rgb(180, 0, 0);
                                                        text-align: center;">
                                                *Record Deleted Successfully</p>`
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
            })
        }
    })
})

//convert Time slots to date strings 
function convertTimeSlot(slotNo)
{
    var out = [];
    if(slotNo === 1)
    {
        out[0] = "9:00 AM";
        out[1] = "9:50 AM";
    }
    else if(slotNo === 2)
    {
        out[0] = "10:00 AM";
        out[1] = "10:50 AM";
    }
    else if(slotNo === 3)
    {
        out[0] = "11:00 AM";
        out[1] = "11:50 AM";
    }
    else if(slotNo === 4)
    {
        out[0] = "12:00 PM";
        out[1] = "12:50 PM";
    }
    else if(slotNo === 5)
    {
        out[0] = "2:10 PM";
        out[1] = "3:00 PM";
    }
    else if(slotNo === 6)
    {
        out[0] = "3:10 PM";
        out[1] = "4:00 PM";
    }
    else if(slotNo === 7)
    {
        out[0] = "4:15 PM";
        out[1] = "5:05 PM";
    }
    else if(slotNo === 8)
    {
        out[0] = "5:15 PM";
        out[1] = "6:05 PM";
    }
    return out;
}

//Logout
const logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function()
{
    auth.signOut();
    console.log("User signed out successfully");
}

//Set up the NavBar
const navContent = document.querySelector("#navContent");
const setupNav = (data) => 
{
    data.forEach(doc => 
    {
        const userType = doc.data().Type;
        if(userType === 2)
        {
            navContent.innerHTML = `
            <a href="UserProfile.html">Profile</a>
            <a href="Routine.html">View Routine</a>
            <a href = "BookRoom.html">Book Room</a>
            <a class="active">Booking Records</a>
            <a href="ChangePassword.html">Change Password</a> 
            `
        }
        else if(userType === 3)
        {
            navContent.innerHTML = `
            <a href="UserProfile.html">Profile</a>
            <a href = "BookRoom.html">Book Room</a>
            <a class="active">Booking Records</a>
            <a href="ChangePassword.html">Change Password</a> 
            `
        }
    });
};

//Auto-delete records before today
function loadRecords()
{
    auth.onAuthStateChanged(user => 
    {
        var email = user.email;
        db.collection('Record').where('UserEmail','==',email).get().then(snapshot =>
        {
            const data = snapshot.docs;
            data.forEach(doc =>
            {
                date = doc.id.substring(6,16);
                dd = date[0] + date[1];
                mm = Number(date[3] + date[4])-1;
                yyyy = date[6] + date[7] + date[8] + date[9];
                var today = new Date();
                var recordDate = new Date(yyyy,mm,dd);
                if(today>recordDate)
                {
                    db.collection("Record").doc(doc.id).delete();
                }
            })
        })
    })
}