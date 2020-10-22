
const fetchRegButton = document.querySelector("#submitReg");

fetchRegButton.addEventListener("click", (reg) => {
    console.log("Registrierung Skript wird aufgerufen");
    // Testn ob dies im Fehlerfall noch benötigt wird
  //  reg.preventDefault();

    let usename = document.querySelector("#pwBenutzername1").value;
    let passwort = document.querySelector("#pwPasswort1").value;
    let passwortVerify = document.querySelector("#pwPasswort2").value;
    let email = document.querySelector("#Email").value;

    console.log(usename);
    console.log(passwort);
    console.log(passwortVerify);
    console.log(email);

    // Daten für JSON aufbereiten

    let userData = {
        benutzername: usename,
        passwort: passwort,
        email: email,
    }
   
    // Prüfen ob passwort übereinstimmt
    if (passwort == passwortVerify) {
        
        // Über Post in die Datenbank laden
        fetch("/register", {
            method: "Post",
            body: JSON.stringify(userData),
            headers: {
                "content-type": "application/json",
            },


        }).then((res) => {
          // wird aktuell nicht ausgeführt
            if(response.status >=400 )
            {
              console.log("Status 200");
              alert("Registrierung erfolgreich");
            }
            else {
                alert("Registrierung nicht erfolgreich");
            }


        })

    }
    // Falls Passwort nicht überinstimmt
    else{
        alert("Passwörter stimmen nicht überein");

    }

})// Button clickt

