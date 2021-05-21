const containerTable = document.querySelector('#containerTable');

listDept();

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

function listDept()
{
    db.collection('Department').get().then(snapshot =>
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
                                
                                <th class="roomcolumn1">Code</th>
                                <th class="roomcolumn2">Short Form</th>
                                <th class="roomcolumn3">Full Name</th>
                                <th class="roomcolumn4">Faculty</th>
                                <th class="roomcolumn5">Established Year</th>
                                <th class="roomcolumn6" style="opacity:0">Delete</th>
                            </tr>
                        </thead>
                    <tbody id = "tableBody">
                    
            `
            snapData.forEach(doc =>
            {
                code = doc.id;
                
                data = doc.data();
                estYear = data.EstYear;
                faculty = data.Faculty;
                shortForm = data.Name;
                fullForm = data.FullForm;
                
                html +=
                `
                <tr>
                    <td class="roomcolumn1">${code}</td>
                    <td class="roomcolumn2">${shortForm}</td>
                    <td class="roomcolumn3">${fullForm}</td>
                    <td class="roomcolumn4">${faculty}</td>
                    <td class="roomcolumn5">${estYear}</td>
                    <td class="roomcolumn6">
                        <span value = "${doc.id}" class = "delete"> X </span>
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
            <div class="d-flex justify-content-end">
                <button id = "addRoomButton" type="button" class="btn btn-success">Add Department</button>
			</div>
            `
            containerTable.innerHTML = html;

            //Delete Building
            const closeButtons = document.getElementsByClassName("delete");
            for(i = 0; i<closeButtons.length; i++)
            {
                closeButtons[i].addEventListener("click", function() 
                {
                    //remove in UI
                    this.parentElement.parentElement.style.display = 'none';
                    //delete in Database
                    deleteID = this.getAttribute("value")
                    db.collection("Department").doc(deleteID).delete().then(function() 
                    {
                        const deleteMessage = document.querySelector('#deleteMessage');
                        deleteMessage.innerHTML = `<h6 style="color: rgb(180, 0, 0);
                                                            text-align: center;
                                                            font-size: 5;
                                                            ">
                                                    *Department Removed</h6>`
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                    
                })
            }

            //Add Department
            const addButton = document.querySelector('#addRoomButton');
            addButton.onclick = function()
            {
                addhtml = ``;
                containerTable.innerHTML =
                `
                <div class="wrap-login100">
                            <div class="login100-pic js-tilt" data-tilt>
                                <img src="images/img-01.png" alt="IMG">
                            </div>

                            <form id ="addForm" class="login100-form validate-form">
                                <span class="login100-form-title">
                                    Add Department
                                </span>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "deptCode" class="input100" type="number" name="deptCode" placeholder="Dept Code" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "shortName" class="input100" type="text" name="shortName" placeholder="Dept Name (Short Form)" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "fullName" class="input100" type="text" name="fullName" placeholder="Dept Name (Full Form)" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "faculty" class="input100" type="text" name="faculty" placeholder="Faculty" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "estYear" class="input100" type="number" name="estYear" placeholder="Establised Year" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div id = "errorMessage">
                                
                                </div>
                                <div class="container-login100-form-btn">
                                    <button type = 'submit' class="login100-form-btn">
                                        Submit
                                    </button>
                                </div>
                                <div class="text-center p-t-12">
                                <a class="txt2" href="DepartmentList.html">
                                    Go Back
                                </a>
                            </div>
                            </form>
                        </div>
                `
            //Add Department to database on submit action
            const addForm = document.querySelector("#addForm");
            const errorMessage = document.querySelector('#errorMessage');

            addForm.addEventListener('submit',(e) =>
            {
                e.preventDefault();

                //Declare form variables
                deptCode = addForm['deptCode'].value;
                shortName = addForm['shortName'].value;
                fullName = addForm['fullName'].value;
                faculty = addForm['faculty'].value;
                estYear = addForm['estYear'].value;
                
                db.collection('Department').doc(deptCode).get().then((docSnapshot) => 
                {
                    if (docSnapshot.exists) 
                    {
                        errorMessage.innerHTML = `<p style="color: red;">*Department No. already exists</p>`;
                    }
                    else
                    {
                        db.collection("Department").doc(deptCode).set(
                        {
                                Name: shortName,
                                FullForm: fullName,
                                Faculty: faculty,
                                EstYear: estYear
                        })
                        .then(function() 
                        {
                            errorMessage.innerHTML = `<p style="color: green;">*Department Added Successfully</p>`;
                            addForm.reset();
                            window.setInterval("errorMessage.innerHTML = ``;", 3000);
                        })
                    }
                })    
            })
        }
        })
}