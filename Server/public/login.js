
// Login Skript 
  console.log("Test Login Skript");

// Variabeln und Buttons
const fetchLoginButton = document.querySelector("#submitLogin");


fetchLoginButton.addEventListener('click', function(e){
  e.preventDefault();
 
//Benutzer werden vor den Aufgaben geladen, da diese Daten zum Einfügen der Tabellenzeilen nötig sind
let benutzerSammlung = [];

fetch("/benutzer").then((res) => {
  //return res.json();

  return res.json();
 
})

});


// Methode zum prüfen der Anmeldung
const PrüfeAnmeldung= () =>
new Promise((resolve, reject)=>{
   
   try {
        // Abfrage Email und Password aus login.html   
        let Benutzername = document.querySelector("#pwBenutzername").value;
        let Passwort = document.querySelector("#pwPasswort").value;
        console.log(Benutzername);
        console.log(Passwort);

        fetch ("/anmeldeDaten").then((res)=>{
        console.log("test fetch");
        console.log(res);


        })


   } catch (error) {
       console.log(error);
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
//document.querySelector("#submitLogin").addEventListener("click",()=>{
  //console.log("subbmit Button");
    //PrüfeAnmeldung()
    //.then(AusgabeAnmeldung)
    //.catch(error => ErrorAnmeldung(error));

//})
