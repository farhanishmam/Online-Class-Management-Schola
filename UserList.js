const containerTable = document.querySelector('#containerTable');
const form = document.querySelector('#typeForm');

form.addEventListener('submit', (e) => 
{
    e.preventDefault();
    type = form['userType'].value;
    if(type === 'Student')
    {
         listStudentCR(1);
    }
    else if(type === 'CR')
    {
        listStudentCR(2);
    }
    else if(type === 'Faculty')
    {
        listFaculty();
    }
    else if(type === 'Admin')
    {
        listAdmin();
    }
})



//Logout
const logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function()
{
    db.collection('Admin').doc("currentAdmin").delete().then(
        function()
        {
            auth.signOut();
            console.log("User signed out successfully");
        }
    )
}

function listStudentCR(type)
{
    db.collection('User').where("Type","==",type).get().then(snapshot =>
        {
            var html = ``;
            const snapData = snapshot.docs;
            html +=
            `
            <div class="wrap-table100">
                <div class="table100">
                    <table>
                        <thead>
                            <tr class="table100-head">
                                <th class="stdcolumn1">ID</th>
                                <th class="stdcolumn2">Name</th>
                                <th class="stdcolumn3">Email</th>
                                <th class="stdcolumn4">Phone No.</th>
                                <th class="stdcolumn5">Date of Birth</th>
                                <th class="stdcolumn6">Department</th>
                                <th class="stdcolumn7">Program</th>
                                <th class="stdcolumn8">Batch</th>
                                <th class="stdcolumn9">Section</th>
                                <th class="stdcolumn10" style="opacity:0">Delete</th>
                            </tr>
                        </thead>
                    <tbody id = "tableBody">
                    
            `
            snapData.forEach(doc =>
            {
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

                html +=
                `
                <tr>
                    <td class="stdcolumn1">${studentID}</td>
                    <td class="stdcolumn2">${nameStd}</td>
                    <td class="stdcolumn3">${email}</td>
                    <td class="stdcolumn4">${phoneNo}</td>
                    <td class="stdcolumn5">${dob}</td>
                    <td class="stdcolumn6">${dept}</td>
                    <td class="stdcolumn7">${program}</td>
                    <td class="stdcolumn8">${batch}</td>
                    <td class="stdcolumn8">${section}</td>
                    <td class="stdcolumn10">
                        <span value = "${email}" class = "delete"> X </span>
                    </td>
                </tr>`
            })
            html +=
            `
            </tbody>
                </table>
            </div></br></br>
            <div id = "deleteMessage">
            </div>
            `
            containerTable.innerHTML = html;

            //Delete User 
            const closeButtons = document.getElementsByClassName("delete");
            for(i = 0; i<closeButtons.length; i++)
            {
                closeButtons[i].addEventListener("click", function() 
                {
                    //remove in UI
                    this.parentElement.parentElement.style.display = 'none';
                    //delete in Database
                    deleteID = this.getAttribute("value")
                    db.collection("User").doc(deleteID).delete().then(function() 
                    {
                        const deleteMessage = document.querySelector('#deleteMessage');
                        deleteMessage.innerHTML = `<h6 style="color: rgb(180, 0, 0);
                                                            text-align: center;
                                                            font-size: 5;
                                                            ">
                                                    *User Deleted</h6>`
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                    
                })
            }
        })
}

function listFaculty()
{
    db.collection('User').where("Type","==",3).get().then(snapshot =>
    {
        var html = ``;
        const snapData = snapshot.docs;
        html +=
        `
        <div class="wrap-table100">
            <div class="table100">
                <table>
                    <thead>
                        <tr class="table100-head">
                            <th class="stdcolumn1">ID</th>
                            <th class="stdcolumn2">Name</th>
                            <th class="stdcolumn3">Email</th>
                            <th class="stdcolumn4">Phone No.</th>
                            <th class="stdcolumn5">Department</th>
                            <th class="stdcolumn6">Designation</th>
                            <th class="stdcolumn7" style="opacity:0">Delete</th>
                        </tr>
                    </thead>
                <tbody id = "tableBody">
                
        `
        snapData.forEach(doc =>
        {
            email = doc.id;
            data = doc.data();
            
            ID = data.ID;
            designation = data.Designation;
            dept = data.Department;
            nameFac = data.Name;
            phoneNo = data.PhoneNo;
            
            html +=
            `
            <tr>
                <td class="stdcolumn1">${ID}</td>
                <td class="stdcolumn2">${nameFac}</td>
                <td class="stdcolumn3">${email}</td>
                <td class="stdcolumn4">${phoneNo}</td>
                <td class="stdcolumn5">${dept}</td>
                <td class="stdcolumn6">${designation}</td>
                <td class="stdcolumn7">
                    <span value = "${email}" class = "delete"> X </span>
                </td>
            </tr>`
        })
        html +=
        `
        </tbody>
            </table>
        </div></br></br>
        <div id = "deleteMessage">
        </div>
        `
        containerTable.innerHTML = html;

        //Delete User 
        const closeButtons = document.getElementsByClassName("delete");
        for(i = 0; i<closeButtons.length; i++)
        {
            console.log(closeButtons.length);
            closeButtons[i].addEventListener("click", function() 
            {
                //remove in UI
                this.parentElement.parentElement.style.display = 'none';
                //delete in Database
                deleteID = this.getAttribute("value")
                db.collection("User").doc(deleteID).delete().then(function() 
                {
                    const deleteMessage = document.querySelector('#deleteMessage');
                    deleteMessage.innerHTML = `<h6 style="color: rgb(180, 0, 0);
                                                        text-align: center;
                                                        font-size: 5;
                                                        ">
                                                *User Deleted</h6>`
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
            })
        }
    })
}

function listAdmin()
{
    db.collection('User').where("Type","==",4).get().then(snapshot =>
    {
        var html = ``;
        const snapData = snapshot.docs;
        html +=
        `
        <div class="wrap-table100">
            <div class="table100">
                <table>
                    <thead>
                        <tr class="table100-head">
                            
                            <th class="admcolumn1">Name</th>
                            <th class="stdcolumn2">Email</th>
                            <th class="stdcolumn3">Phone No.</th>
                            <th class="stdcolumn4">Role</th>
                            <th class="stdcolumn5" style="opacity:0">Delete</th>
                        </tr>
                    </thead>
                <tbody id = "tableBody">
                
        `
        snapData.forEach(doc =>
        {
            email = doc.id;
            data = doc.data();
            
            role = data.Role;
            nameAdmin = data.Name;
            phoneNo = data.PhoneNo;
            
            html +=
            `
            <tr>
                <td class="admcolumn1">${nameAdmin}</td>
                <td class="stdcolumn2">${email}</td>
                <td class="stdcolumn3">${phoneNo}</td>
                <td class="stdcolumn4">${role}</td>
                <td class="stdcolumn5">
                    <span value = "${email}" class = "delete"> X </span>
                </td>
            </tr>`
        })
        html +=
        `
        </tbody>
            </table>
        </div></br></br>
        <div id = "deleteMessage">
        </div>
        `
        containerTable.innerHTML = html;

        //Delete User 
        const closeButtons = document.getElementsByClassName("delete");
        for(i = 0; i<closeButtons.length; i++)
        {
            console.log(closeButtons.length);
            closeButtons[i].addEventListener("click", function() 
            {
                //remove in UI
                this.parentElement.parentElement.style.display = 'none';
                //delete in Database
                deleteID = this.getAttribute("value")
                db.collection("User").doc(deleteID).delete().then(function() 
                {
                    const deleteMessage = document.querySelector('#deleteMessage');
                    deleteMessage.innerHTML = `<h6 style="color: rgb(180, 0, 0);
                                                        text-align: center;
                                                        font-size: 5;
                                                        ">
                                                *Admin Removed</h6>`
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                
            })
        }
    })
}