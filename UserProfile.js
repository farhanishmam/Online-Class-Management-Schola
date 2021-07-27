const userTable = document.querySelector('#profile-table');
const topNav = document.querySelector('#navContent');
//getting Email of Logged in User

//needs to be updated with MySQL queries

setupGuides(snapshot.docs, email);

//loads the user profile for students, faculties and CRs
const setupGuides = (data, email) =>
{
    //var qs = new Querystring();
    var femail = sessionStorage.getItem("femail");
    let html = ``;
    data.forEach(doc => 
    {
        var tableContent
        const data = doc.data();
        if(data.Type === 3) //for faculties
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
        else //for student and CRs
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
                        <td class="column2">${femail}</td>
                        
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
        if(data.Type === 1) // 1 means student
        {
            topNav.innerHTML = `
                <a class = "active" href = "UserProfile.html">Profile</a>
                <a href = "Routine.html">View Routine</a>
                <a href = "Notice.html">Notice</a>
                <a href = "EvaluationSheet.html">Evaluation Sheet</a>
                <a href = "ToDo.html">To Do List</a>
                <a href = "ChangePassword.html">Change Password</a> 
            `
        }
        else if(data.Type === 2) //2 means CR
        {
            topNav.innerHTML = `
                <a class = "active" href = "UserProfile.html">Profile</a>
                <a href = "Routine.html">View Routine</a>
                <a href = "Notice.html">Notice</a>
                <a href = "EvaluationSheet.html">Evaluation Sheet</a>
                <a href = "ToDo.html">To Do List</a>
                <a href = "ChangePassword.html">Change Password</a> 
            `
        }
        else if(data.Type === 3) //3 means faculty
        {
            topNav.innerHTML = `
                <a class="active">Profile</a>
                <a href="ChangePassword.html">Change Password</a> 
              `
        }
    });
    userTable.innerHTML = html;

}

//Logout
const logoutButton = document.querySelector('#logoutButton');
logoutButton.onclick = function()
{
    sessionStorage.clear()
    auth.signOut();
    console.log("User signed out successfully");
}
