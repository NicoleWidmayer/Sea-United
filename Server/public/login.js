/*
Author: Group Sea_United
Version: 1.3
Description: 
user login,
all information about the users is fetched from the database. 
This information is then compared to determine whether the user name exists and the password matches
*/

// Button Declaration
const fetchLoginButton = document.querySelector("#submitLogin");

// Event Listener for the button Login
fetchLoginButton.addEventListener('click', function(e){ 

  // fetch all information about the users from the database
  fetch("/benutzer")
  .then( async res =>{
   
    const json = await res.json();
    let length = json.length;
    let username = document.querySelector("#pwBenutzername").value;
    let passwort = document.querySelector("#pwPasswort").value;
    let blogin = false;
   
    // Comparison of the login data with the database data
    for(i = 0; i < length ; i++)
    {
      let usernameDB = json[i].benutzername;
      let passwortDB = json[i].passwort

      if(usernameDB === username && passwortDB === passwort)
       {
       blogin = true;
       }
    }//for

    // Output of the message if the data matches or not
    if(blogin == true )
    {
      document.location.href ="/termin.html";
      alert("Anmeldung erfolgreich");
    }
    else{
      alert("Anmeldung nicht erfolgreich");
    }
    
  })//End of fetch

})// End of Event Listener

