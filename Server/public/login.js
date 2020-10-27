// Login Skript 

// Buttons
const fetchLoginButton = document.querySelector("#submitLogin");

fetchLoginButton.addEventListener('click', function(e){ 
  fetch("/benutzer")
  .then( async res =>{
   
    const json = await res.json();
    let length = json.length;
    let username = document.querySelector("#pwBenutzername").value;
    let passwort = document.querySelector("#pwPasswort").value;
    let blogin = false;
   
    // Prüfen auf User Namen und Passwort  
    for(i = 0; i < length ; i++)
    {
      let usernameDB = json[i].benutzername;
      let passwortDB = json[i].passwort

      if(usernameDB === username && passwortDB === passwort)
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
