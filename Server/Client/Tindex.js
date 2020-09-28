

// anmdeldung.html
// Prüfen der Anmeldung, aktuell nur über Test Daten, DB muss noch hinterlegt werden

// Deklaration der Testdaten, muss durch Datenbank ersetzt werden
let  Benutzername = "Tobias";
let  PWPassword = "test123";


// Methode zum prüfen der Anmeldung
const PrüfepwBenutzername= () =>
new Promise((resolve, reject)=>{
    let pwBenutzername = document.querySelector("#pwBenutzername").value;
    if(pwBenutzername == Benutzername) // Hier fehlt die DB Abfrage
    {
        return resolve("Benutzername war richtig");
    }
    else
    {
        reject("Benutzername war falsch")
    }


});

// Methode zum Prüfen des Benutzer Passwortes
const PrüfepwPasswort= () =>
new Promise((resolve, reject)=>{

    let pwPasswort = document.querySelector("#pwPasswort").value;
    if(pwPasswort == PWPassword) // Hier fehlt die DB Abfrage
    {
        return resolve("Password war richtig");
    }
    else
    {
        reject("Password war falsch")
    }


});

// Ausgabe ob Anmeldung erfolgreich oder nicht, muss noch angepasst werden auf die Webseite aktuell nur als Alert und über console
const AusgabeAnmeldung = () =>{
    console.log('Anmeldung war erfolgreich');
    alert("Anmeldung war erfolgreich");
};
const ErrorAnmeldung = (error) =>{
    console.log(error);
    alert(error);
};

// Starten der Methoden Prüfe Benutzername und danach Prüfe Passwort + Ausgabe wenn etwas von beidem falsch ist
document.querySelector("#btSubmit").addEventListener("click",()=>{

    PrüfepwBenutzername()
 .then(PrüfepwPasswort)
 .then(AusgabeAnmeldung)
 .catch(error => ErrorAnmeldung(error));

});
