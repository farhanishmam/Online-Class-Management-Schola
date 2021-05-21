const containerTable = document.querySelector('#containerTable');

listBuilding();

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

function listBuilding()
{
    db.collection('Building').get().then(snapshot =>
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
                                
                                <th class="column1">No</th>
                                <th class="buildingcolumn2">Building Name</th>
                                <th class="column3">Floors</th>
                                <th class="column4">Rooms</th>
                                <th class="column5">Lift</th>
                                <th class="column6">Established Year</th>
                                <th class="column7" style="opacity:0">Delete</th>
                            </tr>
                        </thead>
                    <tbody id = "tableBody">
                    
            `
            snapData.forEach(doc =>
            {
                buildingNo = doc.id;
                data = doc.data();
                
                var lift;
                liftBool = data.Lift;
                if(liftBool) lift = "Yes";
                else lift = "No";
                rooms = data.Rooms;
                floors= data.Floors;
                nameBuilding = data.Name;
                estYear = data.EstYear;
                
                html +=
                `
                <tr>
                    <td class="column1">${buildingNo}</td>
                    <td class="buildingcolumn2">${nameBuilding}</td>
                    <td class="column3">${floors}</td>
                    <td class="column4">${rooms}</td>
                    <td class="column5">${lift}</td>
                    <td class="column6">${estYear}</td>
                    <td class="column7">
                        <span value = "${buildingNo}" class = "delete"> X </span>
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
                <button id = "addRoomButton" type="button" class="btn btn-success">Add Building</button>
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
                    db.collection("Building").doc(deleteID).delete().then(function() 
                    {
                        const deleteMessage = document.querySelector('#deleteMessage');
                        deleteMessage.innerHTML = `<h6 style="color: rgb(180, 0, 0);
                                                            text-align: center;
                                                            font-size: 5;
                                                            ">
                                                    *Building Removed</h6>`
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                    
                })
            }

            //Add Building
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
                                    Add Building
                                </span>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "buildingno" class="input100" type="number" name="buildingno" placeholder="Building No." required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "name" class="input100" type="text" name="BuildingName" placeholder="Building Name" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "floors" class="input100" type="number" name="floors" placeholder="No. of Floors" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "rooms" class="input100" type="number" name="rooms" placeholder="No. of Rooms" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <label>Lift:  </label>
                                    <select id = "lift" name="lift" style="background-color: 	#DCDCDC" required>
                                        <option value = "1">Yes</option>
                                        <option value = "0">No</option>
                                    </select>
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
                                <a class="txt2" href="BuildingList.html">
                                    Go Back
                                </a>
                            </div>
                            </form>
                        </div>
                `
            //Add Building to database on submit action
            const addForm = document.querySelector("#addForm");
            const errorMessage = document.querySelector('#errorMessage');

            addForm.addEventListener('submit',(e) =>
            {
                e.preventDefault();

                //Declare form variables
                buildingName = addForm['name'].value;
                buildingNo = addForm['buildingno'].value;
                floors = Number(addForm['floors'].value);
                rooms = Number(addForm['rooms'].value);
                lift = Number(addForm['lift'].value);
                estYear = addForm['estYear'].value;
                var liftBool;
                if(lift === 1) liftBool = true;
                else liftBool = false;

                db.collection('Building').doc(buildingNo).get().then((docSnapshot) => 
                {
                    if (docSnapshot.exists) 
                    {
                        errorMessage.innerHTML = `<p style="color: red;">*Building No. already exists</p>`;
                    }
                    else
                    {
                        db.collection("Building").doc(buildingNo).set(
                        {
                                Name: buildingName,
                                Rooms: rooms,
                                Floors: floors,
                                EstYear: estYear,
                                Lift: liftBool
                        })
                        .then(function() 
                        {
                            errorMessage.innerHTML = `<p style="color: green;">*Building Added Successfully</p>`;
                            addForm.reset();
                            window.setInterval("errorMessage.innerHTML = ``;", 3000);
                        })
                    }
                })    
            })
        }
    })
}


