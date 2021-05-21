const containerTable = document.querySelector('#containerTable');

listRoom();

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

function listRoom()
{
    db.collection('Room').get().then(snapshot =>
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
                                
                                <th class="roomcolumn1">Building No</th>
                                <th class="roomcolumn2">Room No</th>
                                <th class="roomcolumn3">AC</th>
                                <th class="roomcolumn4">Projector</th>
                                <th class="roomcolumn5">Boards</th>
                                <th class="roomcolumn6">Capacity</th>
                                <th class="roomcolumn7" style="opacity:0">Delete</th>
                            </tr>
                        </thead>
                    <tbody id = "tableBody">
                    
            `
            snapData.forEach(doc =>
            {
                buildingNo = doc.id[0];
                roomNo = doc.id[2] + doc.id[3] + doc.id[4];
                data = doc.data();
                boards = data.Board;
                capacity = data.Capacity;
                
                var AC, projector;
                if(data.AC) AC = "Yes";
                else AC = "No";
                if(data.Projector) projector = "Yes";
                else projector = "No";
                
                html +=
                `
                <tr>
                    <td class="roomcolumn1">${buildingNo}</td>
                    <td class="roomcolumn2">${roomNo}</td>
                    <td class="roomcolumn3">${AC}</td>
                    <td class="roomcolumn4">${projector}</td>
                    <td class="roomcolumn5">${boards}</td>
                    <td class="roomcolumn6">${capacity}</td>
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
                <button id = "addRoomButton" type="button" class="btn btn-success">Add Room</button>
			</div>
            `
            containerTable.innerHTML = html;

            //Delete Room
            const closeButtons = document.getElementsByClassName("delete");
            for(i = 0; i<closeButtons.length; i++)
            {
                closeButtons[i].addEventListener("click", function() 
                {
                    //remove in UI
                    this.parentElement.parentElement.style.display = 'none';
                    //delete in Database
                    deleteID = this.getAttribute("value")
                    db.collection("Room").doc(deleteID).delete().then(function() 
                    {
                        const deleteMessage = document.querySelector('#deleteMessage');
                        deleteMessage.innerHTML = `<h6 style="color: rgb(180, 0, 0);
                                                            text-align: center;
                                                            font-size: 5;
                                                            ">
                                                    *Room Removed</h6>`
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                    
                })
            }
            //Add Room
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
                                    Add Room
                                </span>
                                <div class="wrap-input100 validate-input" >
                                    <label> Select Building No: </label>
                                    <select id = "buildingList" name="buildingList" style="background-color: 	#DCDCDC" required>
                                        <!-- Building List will be dynamically loaded-->
                                     </select>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input id = "roomNo" class="input100" type="number" name="roomNo" placeholder="Room Number" required>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <label> AC: </label>
                                    <select id = "AC" name="AC" style="background-color: 	#DCDCDC" required>
                                        <option value = "1">Yes</option>
                                        <option value = "0">No</option>
                                     </select>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <label> Projector: </label>
                                    <select id = "projector" name="Projector" style="background-color: 	#DCDCDC" required>
                                        <option value = "1">Yes</option>
                                        <option value = "0">No</option>
                                     </select>
                                    <span class="focus-input100"></span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <label> Boards: </label>
                                    <select id = "boards" name="boards" style="background-color: 	#DCDCDC" required>
                                        <option value = "1">Low (less than 4)</option>
                                        <option value = "2">Medium (4 to 7)</option>
                                        <option value = "3">High (more than 7)</option>
                                     </select>
                                    <span class="focus-input100"></span>
                                </div>
                                
                                <div class="wrap-input100 validate-input" >
                                    <input id = "capacity" class="input100" type="number" name="capacity" placeholder="Capacity" required>
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
                                <a class="txt2" href="RoomList.html">
                                    Go Back
                                </a>
                            </div>
                            </form>
                        </div>
                `

            //Fetch & Display Buildings List
            
            const buildingList = document.querySelector('#buildingList');
            db.collection('Building').get().then(snapshot =>
            {
                const data = snapshot.docs;
                data.forEach(doc => 
                {
                    var content = `<option value = "${doc.id}">${doc.id}</option>`;
                    html += content;
                })
                buildingList.innerHTML = html;
            });
            

            //Add Room to database on submit action
            const addForm = document.querySelector("#addForm");
            const errorMessage = document.querySelector('#errorMessage');

            addForm.addEventListener('submit',(e) =>
            {
                e.preventDefault();

                //Declare form variables
                buildingNo = addForm['buildingList'].value;
                roomNo = addForm['roomNo'].value;
                AC = Number(addForm['AC'].value);
                capacity = Number(addForm['capacity'].value);
                projector = Number(addForm['projector'].value);
                boards = Number(addForm['boards'].value);

                roomID = buildingNo + "-" + roomNo;

                var acBool
                if(AC === 1) acBool = true;
                else acBool = false;

                var projBool
                if(projector===1) projBool = true;
                else projBool = false;

                
                db.collection('Room').doc(roomID).get().then((docSnapshot) => 
                {
                    if (docSnapshot.exists) 
                    {
                        errorMessage.innerHTML = `<p style="color: red;">*Room No. already exists</p>`;
                    }
                    else
                    {
                        db.collection("Room").doc(roomID).set(
                        {
                               AC: acBool,
                               Board: boards,
                               Capacity: capacity,
                               Projector: projBool
                        })
                        .then(function() 
                        {
                            errorMessage.innerHTML = `<p style="color: green;">*Room Added Successfully</p>`;
                            addForm.reset();
                            window.setInterval("errorMessage.innerHTML = ``;", 3000);
                        })
                    }
                })    
            })
        }
        })
}