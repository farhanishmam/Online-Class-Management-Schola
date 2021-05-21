const routineTable = document.querySelector('#routine-table');
const topNav = document.querySelector('#navContent');
//Fetch Routine ID and display routine
auth.onAuthStateChanged(user => 
{
    const email = user.email; 
    var docRefUser = db.collection("User").doc(email);
    docRefUser.get().then( function(docUser)
    {
        if (docUser.exists) 
        {
            docData = docUser.data();
            if(docData.Type === 1)
            {
                topNav.innerHTML = `
                    <a href="UserProfile.html" >Profile</a>
                    <a class="active">View Routine</a>
                    <a href="ChangePassword.html">Change Password</a> 
                `
            }
            else if(docData.Type === 2)
            {
                topNav.innerHTML = `
                <a href="UserProfile.html">Profile</a>
                <a class="active">View Routine</a>
                <a href="BookRoom.html">Book Room</a>
                <a href="BookingRecords.html">Booking Records</a>
                <a href="ChangePassword.html">Change Password</a> 
                `
            }
            const routineID = docData.Batch + '-' + docData.Section;
            displayRoutine(routineID);
        } 
        else 
        {
            console.log("User not found");
        }
    }).catch(function(error)
    {
        routineTable.innerHTML = `<h1>Error getting document: ${error}</h1>`;
    });  
})

function displayRoutine(routineID)
{
    var docRefRoutine = db.collection("Routine").doc(routineID);
    docRefRoutine.get().then( function(docRefRoutine)
    {
        const data = docRefRoutine.data();
        const tableContent = 
        `
        <table data-vertable="ver1">
            <thead>
                <tr class="row100 head">
                    <th class="column100 column1" data-column="column1"></th>
                    <th class="column100 column3" data-column="column2">9:00 - 9:50</th>
                    <th class="column100 column4" data-column="column3">10:00 - 10:50</th>
                    <th class="column100 column5" data-column="column4">11:00 - 11:50</th>
                    <th class="column100 column6" data-column="column5">12:00 - 12:50</th>
                    <th class="column100 column7" data-column="column6">2:10 - 3:00</th>
                    <th class="column100 column8" data-column="column7">3:10 - 4:00</th>
                    <th class="column100 column9" data-column="column8">4:15 - 5:05</th>
                    <th class="column100 column10" data-column="column9">5:15 - 6:05</th>
                </tr>
            </thead>
            <tbody>
                <tr class="row100">
                    <td class="column100 column1" data-column="column1">Monday</td>
                    <td class="column100 column2" data-column="column2">${data.Monday[1]}</td>
                    <td class="column100 column3" data-column="column3">${data.Monday[2]}</td>
                    <td class="column100 column4" data-column="column4">${data.Monday[3]}</td>
                    <td class="column100 column5" data-column="column5">${data.Monday[4]}</td>
                    <td class="column100 column6" data-column="column6">${data.Monday[5]}</td>
                    <td class="column100 column7" data-column="column7">${data.Monday[6]}</td>
                    <td class="column100 column8" data-column="column8">${data.Monday[7]}</td>
                    <td class="column100 column9" data-column="column9">${data.Monday[8]}</td>
                </tr>

                <tr class="row100">
                    <td class="column100 column1" data-column="column1">Tuesday</td>
                    <td class="column100 column2" data-column="column2">${data.Tuesday[1]}</td>
                    <td class="column100 column3" data-column="column3">${data.Tuesday[2]}</td>
                    <td class="column100 column4" data-column="column4">${data.Tuesday[3]}</td>
                    <td class="column100 column5" data-column="column5">${data.Tuesday[4]}</td>
                    <td class="column100 column6" data-column="column6">${data.Tuesday[5]}</td>
                    <td class="column100 column7" data-column="column7">${data.Tuesday[6]}</td>
                    <td class="column100 column8" data-column="column8">${data.Tuesday[7]}</td>
                    <td class="column100 column9" data-column="column9">${data.Tuesday[8]}</td>
          
                    
                </tr>

                <tr class="row100">
                <td class="column100 column1" data-column="column1">Wednesday</td>
                    <td class="column100 column2" data-column="column2">${data.Wednesday[1]}</td>
                    <td class="column100 column3" data-column="column3">${data.Wednesday[2]}</td>
                    <td class="column100 column4" data-column="column4">${data.Wednesday[3]}</td>
                    <td class="column100 column5" data-column="column5">${data.Wednesday[4]}</td>
                    <td class="column100 column6" data-column="column6">${data.Wednesday[5]}</td>
                    <td class="column100 column7" data-column="column7">${data.Wednesday[6]}</td>
                    <td class="column100 column8" data-column="column8">${data.Wednesday[7]}</td>
                    <td class="column100 column9" data-column="column9">${data.Wednesday[8]}</td>
                   
                    
                </tr>

                <tr class="row100">
                    <td class="column100 column1" data-column="column1">Thursday</td>
                    <td class="column100 column2" data-column="column2">${data.Thursday[1]}</td>
                    <td class="column100 column3" data-column="column3">${data.Thursday[2]}</td>
                    <td class="column100 column4" data-column="column4">${data.Thursday[3]}</td>
                    <td class="column100 column5" data-column="column5">${data.Thursday[4]}</td>
                    <td class="column100 column6" data-column="column6">${data.Thursday[5]}</td>
                    <td class="column100 column7" data-column="column7">${data.Thursday[6]}</td>
                    <td class="column100 column8" data-column="column8">${data.Thursday[7]}</td>
                    <td class="column100 column9" data-column="column9">${data.Thursday[8]}</td>
          
                    
                </tr>

                <tr class="row100">
                    <td class="column100 column1" data-column="column1">Friday</td>
                    <td class="column100 column2" data-column="column2">${data.Friday[1]}</td>
                    <td class="column100 column3" data-column="column3">${data.Friday[2]}</td>
                    <td class="column100 column4" data-column="column4">${data.Friday[3]}</td>
                    <td class="column100 column5" data-column="column5">${data.Friday[4]}</td>
                    <td class="column100 column6" data-column="column6">${data.Friday[5]}</td>
                    <td class="column100 column7" data-column="column7">${data.Friday[6]}</td>
                    <td class="column100 column8" data-column="column8">${data.Friday[7]}</td>
                    <td class="column100 column9" data-column="column9">${data.Friday[8]}</td>
                 
                    
                </tr>
            </tbody>
        </table>
        `
        routineTable.innerHTML = tableContent;
    });
}

//Logout
const logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function()
{
    auth.signOut();
    console.log("User signed out successfully");
}
