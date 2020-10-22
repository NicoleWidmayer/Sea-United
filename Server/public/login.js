// Login Skript 

// Buttons
const fetchLoginButton = document.querySelector("#submitLogin");

fetchLoginButton.addEventListener('click', function(e){
 
    let username = document.querySelector("#pwBenutzername").value;
    let passwort = document.querySelector("#pwPasswort").value;
    let blogin = false;
  
  fetch("/benutzer")
  .then( async res =>{
   
    const json = await res.json();
    let length = json.length;

    // Prüfen auf User Namen und Passwort  
    for(i = 0; i < length ; i++)
    {
      if((json[i].benutzername = username) && (json[i].passwort = passwort))
       {
       blogin = true;
       }
    }//for

    // Weiterleitung oder Fehlermdelung
    if(blogin == true )
    {
      document.location.href ="/termin.html";
      alert("Anmeldung erfolgreich");
    }
    else{
      alert("Anmeldung nicht erfolgreich");
    }
    
  })// fetch

})// Event Listener
