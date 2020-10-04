// Anmeldung Funktion

// SQL Modul
const mysql = require('mysql');

// Hier wird die verbindung zur db hergestellt
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.database
});

const path = require('path');
const { dirname } = require('path');
const publicDirectory = path.join(__dirname, '../Client');




exports.einloggen = async(req, res) => {
   
   
    console.log(req.body);

    try {

        // Abfrage E-mail und Password aus dem Formular
        const{pwBenutzername, pwPasswort} = req.body;
        console.log(pwBenutzername)
        db.query(('SELECT * FROM benutzer WHERE benutzername = ?'),[pwBenutzername] , async(error, results) =>{
         //Test zum schauenw was aus der Datenbank zurück kommt
         console.log(results);
         console.log(results[0].passwort);
         // Benutzer und passwort abfrage
         if( (pwBenutzername == results[0].benutzername)  && (pwPasswort == results[0].passwort) )
         {       
                // Weiterleitung zur buchen Seite
                 res.status(200).redirect("/termin.html");
         }
         else{     
            // Ausgabe der Fehler Meldung
            res.status(401).render(publicDirectory + '/login.hbs', {
                message:'Email or Password is incorrect'
            })
               
            
             }
        }); // Datenbankabfrage

        


    }// try 
    catch (error) {
        console.log(error);
    }// catch

}; // Methode Einloggen
