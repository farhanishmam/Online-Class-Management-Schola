const submitForm = document.querySelector('#submitForm');
const message = document.querySelector('#message');

submitForm.addEventListener('submit', (e) => 
{
    e.preventDefault();
    email = submitForm['email'].value;
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
    {
        auth.sendPasswordResetEmail(email);     
        message.innerHTML = `<p style = "color: green">*Password Reset Email Sent</p>`;   
        setTimeout("window.location.href = 'index.html';", 1.25 * 1000);
    }).catch
    (
        () =>
        {
            message.innerHTML = `<p style = "color: red">*User doesn't exist with this email</p>`;
        }
    )
})