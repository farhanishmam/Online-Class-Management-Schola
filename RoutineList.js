const routineList = document.querySelector('#routineList');
const form = document.querySelector('#typeForm');
const containerTable = document.querySelector("#containerTable");
const progList = document.querySelector('#progList');
const batchList = document.querySelector('#batchList');
const addForm = document.querySelector('#addForm');

loadRoutineList();
loadProgramList();
loadBatchList();

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

//Fetch and Load Program List
function loadProgramList()
{
    db.collection('Program').get().then(snapshot =>
        {
            var progHTML = ``;
            const progData = snapshot.docs;
            progData.forEach(doc => 
            {
                var progContent = `<option value = "${doc.data().Name}">${doc.data().Name}</option>`;
                progHTML += progContent
            })
            progList.innerHTML = progHTML;
        })
}

//Fetch and Load Batch List
function loadBatchList()
{
    dt = Date();
    year = Number(dt.substring(13,15))-1;
    batchContent = ``;
    for(i=0;i<4;i++)
    {
        batchContent += `<option value = "${year - i}">${year - i}</option>`
    }
    batchList.innerHTML = batchContent;
}


form.addEventListener('submit', (e) => 
{
    e.preventDefault();
    containerTable.innerHTML = ``;
    routineID = form['routineList'].value;
    displayRoutine(routineID);
})

function displayRoutine(routineID)
{
    var docRefRoutine = db.collection("Routine").doc(routineID);
    tableContent =
    `<div class="wrap-table100">
        <div id = "routine-table" class="table100 ver1 m-b-110">
    `
    docRefRoutine.get().then( function(docRefRoutine)
    {
        const data = docRefRoutine.data();
        tableContent += 
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
        tableContent += `</div>
            <div class="d-flex justify-content-end">
                <button id = "deleteButton" type="button" class="btn btn-danger" value ="${routineID}">Delete Routine</button>
            </div>
        </div>
        `
        containerTable.innerHTML = tableContent;

        //Delete Routine 
        const delButton = document.querySelector("#deleteButton");
        delButton.onclick = function()
        {
            db.collection("Routine").doc(this.value).delete().then(function() 
            {
                window.location.href = "RoutineList.html";
            })
        }
    });
}

addForm.addEventListener('submit',(e) =>
{
    e.preventDefault();
    prog = addForm['progList'].value;
    batch = addForm['batchList'].value;
    section = addForm['sectionList'].value;
    newRoutineID = prog + batch + '-' + section;
    db.collection('Routine').doc(newRoutineID).get().then((docSnapshot) => 
    {
        if(docSnapshot.exists)
        {
            const errorMessage = document.querySelector('#routineError');
            errorMessage.innerHTML = `*Routine Already Exists`;
        }
        else
        {
            
            containerTable.innerHTML = 
            `
            <div class="wrap-table100">
            <form id = 'addRoutine'>
                <div id = "routine-table" class="table100 ver1 m-b-110" style="height: 160%;">
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
                                <td class="column100 column2" data-column="column2"><input style = "width: 90px" id="1-1" type = "text"></td>
                                <td class="column100 column3" data-column="column3"><input style = "width: 90px" id="1-2" type = "text"></td>
                                <td class="column100 column4" data-column="column4"><input style = "width: 90px" id="1-3" type = "text"></td>
                                <td class="column100 column5" data-column="column5"><input style = "width: 90px" id="1-4" type = "text"></td>
                                <td class="column100 column6" data-column="column6"><input style = "width: 90px" id="1-5" type = "text"></td>
                                <td class="column100 column7" data-column="column7"><input style = "width: 90px" id="1-6" type = "text"></td>
                                <td class="column100 column8" data-column="column8"><input style = "width: 90px" id="1-7" type = "text"></td>
                                <td class="column100 column9" data-column="column9"><input style = "width: 90px" id="1-8" type = "text"></td>
                            </tr>
        
                            <tr class="row100">
                                <td class="column100 column1" data-column="column1">Tuesday</td>
                                <td class="column100 column2" data-column="column2"><input style = "width: 90px" id="2-1" type = "text"></td>
                                <td class="column100 column3" data-column="column3"><input style = "width: 90px" id="2-2" type = "text"></td>
                                <td class="column100 column4" data-column="column4"><input style = "width: 90px" id="2-3" type = "text"></td>
                                <td class="column100 column5" data-column="column5"><input style = "width: 90px" id="2-4" type = "text"></td>
                                <td class="column100 column6" data-column="column6"><input style = "width: 90px" id="2-5" type = "text"></td>
                                <td class="column100 column7" data-column="column7"><input style = "width: 90px" id="2-6" type = "text"></td>
                                <td class="column100 column8" data-column="column8"><input style = "width: 90px" id="2-7" type = "text"></td>
                                <td class="column100 column9" data-column="column9"><input style = "width: 90px" id="2-8" type = "text"></td>
                    
                                
                            </tr>
        
                            <tr class="row100">
                            <td class="column100 column1" data-column="column1">Wednesday</td>
                                <td class="column100 column2" data-column="column2"><input style = "width: 90px" id="3-1" type = "text"></td>
                                <td class="column100 column3" data-column="column3"><input style = "width: 90px" id="3-2" type = "text"></td>
                                <td class="column100 column4" data-column="column4"><input style = "width: 90px" id="3-3" type = "text"></td>
                                <td class="column100 column5" data-column="column5"><input style = "width: 90px" id="3-4" type = "text"></td>
                                <td class="column100 column6" data-column="column6"><input style = "width: 90px" id="3-5" type = "text"></td>
                                <td class="column100 column7" data-column="column7"><input style = "width: 90px" id="3-6" type = "text"></td>
                                <td class="column100 column8" data-column="column8"><input style = "width: 90px" id="3-7" type = "text"></td>
                                <td class="column100 column9" data-column="column9"><input style = "width: 90px" id="3-8" type = "text"></td>
                            
                                
                            </tr>
        
                            <tr class="row100">
                                <td class="column100 column1" data-column="column1">Thursday</td>
                                <td class="column100 column2" data-column="column2"><input style = "width: 90px" id="4-1" type = "text"></td>
                                <td class="column100 column3" data-column="column3"><input style = "width: 90px" id="4-2" type = "text"></td>
                                <td class="column100 column4" data-column="column4"><input style = "width: 90px" id="4-3" type = "text"></td>
                                <td class="column100 column5" data-column="column5"><input style = "width: 90px" id="4-4" type = "text"></td>
                                <td class="column100 column6" data-column="column6"><input style = "width: 90px" id="4-5" type = "text"></td>
                                <td class="column100 column7" data-column="column7"><input style = "width: 90px" id="4-6" type = "text"></td>
                                <td class="column100 column8" data-column="column8"><input style = "width: 90px" id="4-7" type = "text"></td>
                                <td class="column100 column9" data-column="column9"><input style = "width: 90px" id="4-8" type = "text"></td>
                    
                                
                            </tr>
        
                            <tr class="row100">
                                <td class="column100 column1" data-column="column1">Friday</td>
                                <td class="column100 column2" data-column="column2"><input style = "width: 90px" id="5-1" type = "text"></td>
                                <td class="column100 column3" data-column="column3"><input style = "width: 90px" id="5-2" type = "text"></td>
                                <td class="column100 column4" data-column="column4"><input style = "width: 90px" id="5-3" type = "text"></td>
                                <td class="column100 column5" data-column="column5"><input style = "width: 90px" id="5-4" type = "text"></td>
                                <td class="column100 column6" data-column="column6"><input style = "width: 90px" id="5-5" type = "text"></td>
                                <td class="column100 column7" data-column="column7"><input style = "width: 90px" id="5-6" type = "text"></td>
                                <td class="column100 column8" data-column="column8"><input style = "width: 90px" id="5-7" type = "text"></td>
                                <td class="column100 column9" data-column="column9"><input style = "width: 90px" id="5-8" type = "text"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id = "routAdd" style ="text-align:center; color: red;">
								
				</div>
                <div class="d-flex justify-content-end">
                    <button id = "addButton" type="submit" class="btn btn-success" value ="">Add Routine</button>
                </div>
            </form>
            </div>
            `

            const routineForm = document.querySelector('#addRoutine');
            
            routineForm.addEventListener('submit',(f)=>
            {
                f.preventDefault();
                db.collection("Routine").doc(newRoutineID).set(
                    {
                            Monday: {
                                1: routineForm['1-1'].value,
                                2: routineForm['1-2'].value,
                                3: routineForm['1-3'].value,
                                4: routineForm['1-4'].value,
                                5: routineForm['1-5'].value,
                                6: routineForm['1-6'].value,
                                7: routineForm['1-7'].value,
                                8: routineForm['1-8'].value,
                            },
                            Tuesday: {
                                1: routineForm['2-1'].value,
                                2: routineForm['2-2'].value,
                                3: routineForm['2-3'].value,
                                4: routineForm['2-4'].value,
                                5: routineForm['2-5'].value,
                                6: routineForm['2-6'].value,
                                7: routineForm['2-7'].value,
                                8: routineForm['2-8'].value,
                            },
                            Wednesday: {
                                1: routineForm['3-1'].value,
                                2: routineForm['3-2'].value,
                                3: routineForm['3-3'].value,
                                4: routineForm['3-4'].value,
                                5: routineForm['3-5'].value,
                                6: routineForm['3-6'].value,
                                7: routineForm['3-7'].value,
                                8: routineForm['3-8'].value,
                            },
                            Thursday: {
                                1: routineForm['4-1'].value,
                                2: routineForm['4-2'].value,
                                3: routineForm['4-3'].value,
                                4: routineForm['4-4'].value,
                                5: routineForm['4-5'].value,
                                6: routineForm['4-6'].value,
                                7: routineForm['4-7'].value,
                                8: routineForm['4-8'].value,
                            },
                            Friday: {
                                1: routineForm['5-1'].value,
                                2: routineForm['5-2'].value,
                                3: routineForm['5-3'].value,
                                4: routineForm['5-4'].value,
                                5: routineForm['5-5'].value,
                                6: routineForm['5-6'].value,
                                7: routineForm['5-7'].value,
                                8: routineForm['5-8'].value,
                            }


                    }).then(function()
                    {
                        const successMessage = document.querySelector('#routAdd');
                        successMessage.innerHTML="*Routine Added Successfully";                        
                    })       
            }
            )
        }
    })

   
    
   
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