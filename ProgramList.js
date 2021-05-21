const containerTable = document.querySelector('#containerTable');

listProg();

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

function listProg()
{
    db.collection('Program').get().then(snapshot =>
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
                                
                                <th class="roomcolumn1">Dept Code</th>
                                <th class="roomcolumn2">Program Code</th>
                                <th class="roomcolumn3">Short Form</th>
                                <th class="roomcolumn4">Full Name</th>
                                <th class="roomcolumn5">Sections</th>
                                <th class="roomcolumn6">Offered From</th>
                                <th class="roomcolumn7" style="opacity:0">Delete</th>
                            </tr>
                        </thead>
                    <tbody id = "tableBody">
                    
            `
            snapData.forEach(doc =>
            {
                deptCode = doc.id[0];
                progCode = doc.id[2];
                data = doc.data();
                
                offeredFrom = data.OfferedFrom;
                shortForm = data.Name;
                fullForm = data.FullForm;
                sections = data.Sections;
                
                html +=
                `
                <tr>
                    <td class="roomcolumn1">${deptCode}</td>
                    <td class="roomcolumn2">${progCode}</td>
                    <td class="roomcolumn3">${shortForm}</td>
                    <td class="roomcolumn4">${fullForm}</td>
                    <td class="roomcolumn5">${sections}</td>
                    <td class="roomcolumn6">${offeredFrom}</td>
                    <td class="roomcolumn7">
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
                <button id = "addRoomButton" type="button" class="btn btn-success">Add Program</button>
			</div>
            `
            containerTable.innerHTML = html;

            //Delete Program
            const closeButtons = document.getElementsByClassName("delete");
            for(i = 0; i<closeButtons.length; i++)
            {
                closeButtons[i].addEventListener("click", function() 
                {
                    //remove in UI
                    this.parentElement.parentElement.style.display = 'none';
                    //delete in Database
                    deleteID = this.getAttribute("value")
                    db.collection("Program").doc(deleteID).delete().then(function() 
                    {
                        const deleteMessage = document.querySelector('#deleteMessage');
                        deleteMessage.innerHTML = `<h6 style="color: rgb(180, 0, 0);
                                                            text-align: center;
                                                            font-size: 5;
                                                            ">
                                                    *Program Removed</h6>`
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                    
                })
            }

             //Add Program
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
                                    Add Program
                                </span>
                                <div class="wrap-input100 validate-input" >
                                    <label> Select Department: </label>
                                    <select id = "deptCode" name="deptCode" style="background-color: 	#DCDCDC" required>
                                        <!-- Department List will be dynamically loaded-->
                                    </select>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "progCode" class="input100" type="number" name="progCode" placeholder="Program Code" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "shortName" class="input100" type="text" name="shortName" placeholder="Prog Name (Short Form)" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "fullName" class="input100" type="text" name="fullName" placeholder="Prog Name (Full Form)" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "sections" class="input100" type="number" name="sections" placeholder="No. of Sections" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "offeredFrom" class="input100" type="number" name="offeredFrom" placeholder="Offered From" required>
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
                                <a class="txt2" href="ProgramList.html">
                                    Go Back
                                </a>
                            </div>
                            </form>
                        </div>
                `
            //Fetch & Display Department List
            
            const deptList = document.querySelector('#deptCode');
            db.collection('Department').get().then(snapshot =>
            {
                const data = snapshot.docs;
                data.forEach(doc => 
                {
                    var content = `<option value = "${doc.id}">${doc.data().Name}</option>`;
                    html += content;
                })
                deptList.innerHTML = html;
            });

            //Add Program to database on submit action
            const addForm = document.querySelector("#addForm");
            const errorMessage = document.querySelector('#errorMessage');

            addForm.addEventListener('submit',(e) =>
            {
                e.preventDefault();

                //Declare form variables
                deptCode = addForm['deptCode'].value;
                progCode = addForm['progCode'].value;
                shortName = addForm['shortName'].value;
                fullName = addForm['fullName'].value;
                sections = Number(addForm['sections'].value);
                offeredFrom = addForm['offeredFrom'].value;

                progID = deptCode + '-' + progCode;
                
                db.collection('Program').doc(progID).get().then((docSnapshot) => 
                {
                    if (docSnapshot.exists) 
                    {
                        errorMessage.innerHTML = `<p style="color: red;">*Program already exists</p>`;
                    }
                    else
                    {
                        db.collection('Program').doc(progID).set(
                        {
                                Name: shortName,
                                FullForm: fullName,
                                Sections: sections,
                                OfferedFrom: offeredFrom
                        })
                        .then(function() 
                        {
                            errorMessage.innerHTML = `<p style="color: green;">*Program Added Successfully</p>`;
                            addForm.reset();
                            window.setInterval("errorMessage.innerHTML = ``;", 3000);
                        })
                    }
                })    
            })
        }
        })
}