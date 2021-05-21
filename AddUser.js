form.addEventListener('reset', (e) => 
{
    e.preventDefault();
    type = form['userType'].value;
    if(type === 'Student' || type === 'CR')
        addStudentCR(type);
    else if(type === 'Faculty')
        addFaculty();
    else if(type === 'Admin')
        addAdmin();
})

function addStudentCR(type)
{
    containerTable.innerHTML =
    `
    <div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="images/img-01.png" alt="IMG">
				</div>

				<form id ="addForm" class="login100-form validate-form">
					<span class="login100-form-title">
						Add ${type}
					</span>
					<div class="wrap-input100 validate-input" >
						<input id = "name" class="input100" type="text" name="StdName" placeholder="Name" required>
						<span class="focus-input100"></span>
					</div>
					<div class="wrap-input100 validate-input" >
						<input id = "ID" class="input100" type="text" name="StdID" placeholder="StudentID" required>
						<span class="focus-input100"></span>
					</div>
					<div class="wrap-input100 validate-input" >
						<input id= "email" class="input100" type="email" name="Email" placeholder="Email" required>
						<span class="focus-input100"></span>
                    </div>
                    <div class="wrap-input100 validate-input" >
						<input id= "phoneNo" class="input100" type="text" name="phoneNo" minlength="11" maxlength="14" placeholder="PhoneNo" required>
						<span class="focus-input100"></span>
                    </div>
                    <div class="wrap-input100 validate-input" >
						<input id= "password" class="input100" type="password" name="password" minlength="8" maxlength="24" placeholder="Password" required>
						<span class="focus-input100"></span>
					</div>
					<div class="wrap-input100 validate-input" >
                        <label for="Department" class="input">Department:  </label>
                        <select id = "dept" name="Department" style="background-color: 	#DCDCDC" required>
                           <!-- Department List will be dynamically loaded -->
                        </select>
					</div>
					<div class="wrap-input100 validate-input" >
                        <label for= "Program" class="input">Program:  </label>
                        <select id = "prog" name="Program" style="background-color: 	#DCDCDC" required>
                           <!-- Program List will be dynamically loaded -->
                        </select>
					</div>
					<div class="wrap-input100 validate-input" >
                        <label for= "Section" class="input">Section:  </label>
                        <select id = "sec" name="Section" style="background-color: 	#DCDCDC" required>
                           <option value = "1">1</option>
                           <option value = "2">2</option>
                           <option value = "3">3</option>
                        </select>
					</div>
					<div class="wrap-input100 validate-input" >
						<label for="DateOfBirth" class="input">Date of Birth:</label>
                    		<input type="date" id = "dob" name="dob" style="background-color:#DCDCDC" required></br>
					</div>
					
					<div class="wrap-input100 validate-input" >
                        <label for= "batch" class="input">Batch:  </label>
                        <select id= "batch" name="batch" style="background-color: 	#DCDCDC" required>
                           <!-- Batch List will be dynamically loaded -->
                        </select>
                    </div>
                    
					<div id = "errorMessage">
                      
					</div>
					<div class="container-login100-form-btn">
						<button type = 'submit' class="login100-form-btn">
							Submit
						</button>
					</div>
                    <div class="text-center p-t-12">
                    <a class="txt2" href="UserList.html">
                        Go Back
                    </a>
                </div>
					

                </form>
               
			</div>
    `
    //Load Department List
    const deptList = document.querySelector('#dept');
    db.collection('Department').get().then(snapshot =>
    {
        var deptHTML = ``;
        const deptData = snapshot.docs;
        deptData.forEach(doc => 
        {
            var deptContent = `<option value = "${doc.data().Name}">${doc.data().Name}</option>`;
            deptHTML += deptContent
        })
        deptList.innerHTML = deptHTML;
    })

    //Load Program List
    const progList = document.querySelector('#prog');
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

    //Load Batch List 
    dt = Date();
    year = Number(dt.substring(13,15))-1;
    
    const batchList = document.querySelector('#batch')
    batchContent = ``;
    for(i=0;i<4;i++)
    {
        batchContent += `<option value = "${year - i}">${year - i}</option>`
    }
    batchList.innerHTML = batchContent;

    //Add users 
    const addForm = document.querySelector("#addForm");
    const errorMessage = document.querySelector('#errorMessage');

    addForm.addEventListener('submit',(e) =>
    {
        e.preventDefault();

        //Declare form variables
        stdname = addForm['name'].value;
        id = addForm['ID'].value;
        password = addForm['password'].value;
        email = addForm['email'].value;
        batch = addForm['batch'].value;
        dept = addForm['dept'].value;
        prog = addForm['prog'].value;
        birthdate = addForm['dob'].value;
        changedDob = changeDob(birthdate);
        sec = addForm['sec'].value;
        phoneNo = addForm['phoneNo'].value;
        var stdType;
        if(type === 'Student') stdType = 1;
        else stdType = 2;

        db.collection('User').doc(email).get().then((docSnapshot) => 
        {
            if (docSnapshot.exists) 
            {
                errorMessage.innerHTML = `<p style="color: red;">*Email already exists</p>`;
            }
            else 
            {
                db.collection("User").doc(email).set(
                    {
                            Name: stdname,
                            Department: dept,
                            Program: prog,
                            Type: stdType,
                            Section: sec,
                            Batch: prog + batch,
                            DateOfBirth: changedDob,
                            PhoneNo: phoneNo,
                            StudentID: id
                    })
                    .then(function() 
                    {
                        auth.createUserWithEmailAndPassword(email, password).then
                        (
                            function()
                            {
                                auth.currentUser.sendEmailVerification();
                                email = db.collection('Admin').get().then(
                                    snapshot =>
                                {
                                    const snapData = snapshot.docs;
                                    snapData.forEach(doc =>
                                    {
                                        data = doc.data();
                                        email = data.Email;
                                        password = data.Password;
                                        auth.signInWithEmailAndPassword(email, password).then(
                                            function()
                                            {
                                                errorMessage.innerHTML = `<p style="color: green;">*User Added Successfully</p>`;
                                                addForm.reset();
                                                window.setInterval("errorMessage.innerHTML = ``;", 3000);
                                            }
                                        )
                                    })
                                })
                            }
                        )
                    })
            }
        });
       
        
    })
}



function changeDob(dob)
{
    yyyy = dob.substring(0,4);
    mm = dob[5] + dob[6];
    dd = dob[8] + dob[9];
    newDate = dd + '-' + mm + '-' + yyyy;
    return newDate;
}

function addFaculty()
{
    containerTable.innerHTML =
    `
    <div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="images/img-01.png" alt="IMG">
				</div>

				<form id ="addForm" class="login100-form validate-form">
					<span class="login100-form-title">
						Add Faculty
					</span>
					<div class="wrap-input100 validate-input" >
						<input id = "name" class="input100" type="text" name="Name" placeholder="Name" required>
						<span class="focus-input100"></span>
					</div>
					<div class="wrap-input100 validate-input" >
						<input id = "ID" class="input100" type="text" name="FacID" placeholder="FacultyID" required>
						<span class="focus-input100"></span>
					</div>
					<div class="wrap-input100 validate-input" >
						<input id= "email" class="input100" type="email" name="Email" placeholder="Email" required>
						<span class="focus-input100"></span>
                    </div>
                    <div class="wrap-input100 validate-input" >
						<input id= "password" class="input100" type="password" name="password" minlength="8" maxlength="24" placeholder="Password" required>
						<span class="focus-input100"></span>
					</div>
					<div class="wrap-input100 validate-input" >
                        <label for="Department" class="input">Department:  </label>
                        <select id = "dept" name="Department" style="background-color: 	#DCDCDC" required>
                           <!-- Department List will be dynamically loaded -->
                        </select>
                    </div>
                    <div class="wrap-input100 validate-input" >
						<input id= "phoneNo" class="input100" type="text" name="phoneNo" minlength="11" maxlength="14" placeholder="Phone Number" required>
						<span class="focus-input100"></span>
                    </div>
                    <div class="wrap-input100 validate-input" >
						<input id= "designation" class="input100" type="text" name="designation" maxlength="20" placeholder="Designation" required>
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
                    <a class="txt2" href="UserList.html">
                        Go Back
                    </a>
                </div>
					

                </form>
               
			</div>
    `
    //Load Department List
    const deptList = document.querySelector('#dept');
    db.collection('Department').get().then(snapshot =>
    {
        var deptHTML = ``;
        const deptData = snapshot.docs;
        deptData.forEach(doc => 
        {
            var deptContent = `<option value = "${doc.data().Name}">${doc.data().Name}</option>`;
            deptHTML += deptContent
        })
        deptList.innerHTML = deptHTML;
    })

    //Add users action
    const addForm = document.querySelector("#addForm");
    const errorMessage = document.querySelector('#errorMessage');

    //On form submit
    addForm.addEventListener('submit',(e) =>
    {
        e.preventDefault();

        //Declare form variables
        facname = addForm['name'].value;
        id = addForm['ID'].value;
        password = addForm['password'].value;
        email = addForm['email'].value;
        
        dept = addForm['dept'].value;
        phoneNo = addForm['phoneNo'].value;
        designation = addForm['designation'].value;
       
        db.collection('User').doc(email).get().then((docSnapshot) => 
        {
            if (docSnapshot.exists) 
            {
                errorMessage.innerHTML = `<p style="color: red;">*Email already exists</p>`;
            }
            else
            {
                db.collection("User").doc(email).set(
                {
                        Name: facname,
                        Department: dept,
                        Type: 3,
                        ID: id,
                        PhoneNo: phoneNo,
                        Designation: designation
                })
                .then(function() 
                {
                    auth.createUserWithEmailAndPassword(email, password).then
                    (
                        function()
                        {
                            auth.currentUser.sendEmailVerification();
                            email = db.collection('Admin').get().then(
                                snapshot =>
                            {
                                const snapData = snapshot.docs;
                                snapData.forEach(doc =>
                                {
                                    data = doc.data();
                                    email = data.Email;
                                    password = data.Password;
                                    auth.signInWithEmailAndPassword(email, password).then(
                                        function()
                                        {
                                            errorMessage.innerHTML = `<p style="color: green;">*User Created Successfully</p>`;
                                            addForm.reset();
                                            window.setInterval("errorMessage.innerHTML = ``;", 3000);
                                        }
                                    )
                                })
                            })
                        }
                    )
                })
            }
        });
        
    })
}

function addAdmin()
{
    containerTable.innerHTML =
    `
    <div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="images/img-01.png" alt="IMG">
				</div>

				<form id ="addForm" class="login100-form validate-form">
					<span class="login100-form-title">
						Add Admin
					</span>
					<div class="wrap-input100 validate-input" >
						<input id = "name" class="input100" type="text" name="Name" placeholder="Name" required>
						<span class="focus-input100"></span>
					</div>
					<div class="wrap-input100 validate-input" >
						<input id= "email" class="input100" type="email" name="Email" placeholder="Email" required>
						<span class="focus-input100"></span>
                    </div>
                    <div class="wrap-input100 validate-input" >
						<input id= "password" class="input100" type="password" name="password" minlength="8" maxlength="24" placeholder="Password" required>
						<span class="focus-input100"></span>
					</div>
                    <div class="wrap-input100 validate-input" >
						<input id= "phoneNo" class="input100" type="text" name="phoneNo" minlength="11" maxlength="14" placeholder="Phone Number" required>
						<span class="focus-input100"></span>
                    </div>
                    <div class="wrap-input100 validate-input" >
						<input id= "role" class="input100" type="text" name="role" maxlength="20" placeholder="Role" required>
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
                    <a class="txt2" href="UserList.html">
                        Go Back
                    </a>
                </div>
					

                </form>
               
			</div>
    `
  
    //Add users action
    const addForm = document.querySelector("#addForm");
    const errorMessage = document.querySelector('#errorMessage');

    //On form submit
    addForm.addEventListener('submit',(e) =>
    {
        e.preventDefault();

        //Declare form variables
        adminName = addForm['name'].value;
        email = addForm['email'].value;
        password = addForm['password'].value;
        phoneNo = addForm['phoneNo'].value;
        role = addForm['role'].value;
       
        db.collection('User').doc(email).get().then((docSnapshot) => 
        {
            if (docSnapshot.exists) 
            {
                errorMessage.innerHTML = `<p style="color: red;">*Email already exists</p>`;
            }
            else
            {
                db.collection("User").doc(email).set(
                {
                        Name: adminName,
                        Type: 4,
                        PhoneNo: phoneNo,
                        Role: role
                })
                .then(function() 
                {
                    auth.createUserWithEmailAndPassword(email, password).then
                    (
                        function()
                        {
                            auth.currentUser.sendEmailVerification();
                            email = db.collection('Admin').get().then(
                                snapshot =>
                            {
                                const snapData = snapshot.docs;
                                snapData.forEach(doc =>
                                {
                                    data = doc.data();
                                    email = data.Email;
                                    password = data.Password;
                                    auth.signInWithEmailAndPassword(email, password).then(
                                        function()
                                        {
                                            errorMessage.innerHTML = `<p style="color: green;">*User Created Successfully</p>`;
                                            addForm.reset();
                                            window.setInterval("errorMessage.innerHTML = ``;", 3000);
                                        }
                                    )
                                })
                            })
                        }
                    )
                })
            }
        });
    })
}

function checkEmail()
{

}