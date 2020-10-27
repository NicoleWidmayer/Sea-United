/*
Author: Group Sea_United
Version: 1.0
Description: 
Registration, here new users are created in the database
*/


// Button Declaration
const fetchRegButton = document.querySelector("#submitReg");

// Event Listener for the button register
fetchRegButton.addEventListener("click", (reg) => {
   
    let usename = document.querySelector("#pwBenutzername1").value;
    let passwort = document.querySelector("#pwPasswort1").value;
    let passwortVerify = document.querySelector("#pwPasswort2").value;
    let email = document.querySelector("#Email").value;

    //Saving the website data in an object
    let userData = {
        benutzername: usename,
        passwort: passwort,
        email: email,
    }
   
    // Check if the password matches
    if (passwort == passwortVerify) {
        
        //Load data into database
        fetch("/register", {
            method: "Post",
            body: JSON.stringify(userData),
            headers: {
                "content-type": "application/json",
            },

        }).then((res) => {
           // Output of the message if the new user is created or there is a problem with the registration
            if(res.ok)
            {
              alert("Registrierung erfolgreich");
            }
            else {
                alert("Registrierung nicht erfolgreich");
            }
        })
    }
     // Output of the message If the passwords do not match
    else{
        alert("Passwörter stimmen nicht überein");

    }

})// Button clickt

