const userTable = document.querySelector('#profile-table');
const topNav = document.querySelector('#navContent');
//getting Email of Logged in User
auth.onAuthStateChanged(user => 
{
    var email = user.email;
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
    {
        setupGuides(snapshot.docs, email);
    });
    
})

const setupGuides = (data, email) =>
{
    let html = ``;
    data.forEach(doc => 
    {
        var tableContent
        const data = doc.data();
        if(data.Type === 3)
        {
            tableContent = 
            `
        <table>
            <thead>
                <tr class="table100-head">
                    <th class="column1">User Profile</th>
                    <th class="column2"></th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td class="column1">ID</td>
                        <td class="column2">${data.ID}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Name</td>
                        <td class="column2">${data.Name}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Email</td>
                        <td class="column2">${email}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Phone Number</td>
                        <td class="column2">${data.PhoneNo}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Department</td>
                        <td class="column2">${data.Department}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Designation</td>
                        <td class="column2">${data.Designation}</td>
                        
                    </tr>
                    
            </tbody>
        </table>
        `
        }
        else if(data.Type === 4)
        {
            tableContent = 
            `
        <table>
            <thead>
                <tr class="table100-head">
                    <th class="column1">User Profile</th>
                    <th class="column2"></th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td class="column1">Name</td>
                        <td class="column2">${data.Name}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Email</td>
                        <td class="column2">${email}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Phone Number</td>
                        <td class="column2">${data.PhoneNo}</td>    
                    </tr>
                    <tr>
                    <td class="column1">Role</td>
                    <td class="column2">${data.Role}</td>    
                </tr>
            </tbody>
        </table>
        `
        }
        else
        {
        tableContent = 
        `
        <table>
            <thead>
                <tr class="table100-head">
                    <th class="column1">User Profile</th>
                    <th class="column2"></th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td class="column1">Student ID</td>
                        <td class="column2">${data.StudentID}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Name</td>
                        <td class="column2">${data.Name}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Email</td>
                        <td class="column2">${email}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Department</td>
                        <td class="column2">${data.Department}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Program</td>
                        <td class="column2">${data.Program}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Section</td>
                        <td class="column2">${data.Section}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Date Of Birth</td>
                        <td class="column2">${data.DateOfBirth}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Batch</td>
                        <td class="column2">${data.Batch}</td>
                        
                    </tr>
                    
            </tbody>
		</table>
        `
        }
        html += tableContent;
        if(data.Type === 1)
        {
            topNav.innerHTML = `
                <a class="active">Profile</a>
                <a href="Routine.html">View Routine</a>
                <a href="ChangePassword.html">Change Password</a> 
            `
        }
        else if(data.Type === 2)
        {
            topNav.innerHTML = `
                <a class="active">Profile</a>
                <a href="Routine.html">View Routine</a>
                <a href="BookRoom.html">Book Room</a>
                <a href="BookingRecords.html">Booking Records</a>
                <a href="ChangePassword.html">Change Password</a> 
            `
        }
        else if(data.Type === 3)
        {
            topNav.innerHTML = `
                <a class="active">Profile</a>
                <a href="BookRoom.html">Book Room</a>
                <a href="BookingRecords.html">Booking Records</a>
                <a href="ChangePassword.html">Change Password</a> 
              `
        }
        else if(data.Type === 4)
        {
            topNav.innerHTML = `
                <a class="active">Profile</a>
                <a href = "UserList.html">User</a>
                <a href = "BuildingList.html">Building</a>
                <a href = "RoomList.html">Room</a>
                <a href = "DepartmentList.html">Department</a>
                <a href = "ProgramList.html">Program</a>
                <a href = "RoutineList.html">Routine</a>
            `
        }
        
    });
    userTable.innerHTML = html;

}

//Logout
const logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function()
{
    db.collection('Admin').doc('currentAdmin').get().then((docSnapshot) => 
    {
        if (docSnapshot.exists) 
        {
            db.collection('Admin').doc("currentAdmin").delete().then(
                function()
                {
                    auth.signOut();
                    console.log("User signed out successfully");
                }
            )
        }
        else
        {
            auth.signOut();
            console.log("User signed out successfully");
        }
  });
}
