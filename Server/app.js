// Import von den Modulen

const express = require("express"); 
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');

// Start des Servers
const app = express();



// Zum benutzen und zum Sichern der Datenbank Daten in einer Externen Datei, Quelle: https://telmoacademy.com/
dotenv.config({path:'./.env'});

// SQL Datenbank hinzufügen
// Hier wird die verbindung zur db hergestellt, falls diese nicht lokal ist einfach bei host die IP-adresse eintragen
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_Password,
    database: process.env.DATABASE
});



//verbindung zur Datenbank prüfen
db.connect((error)=>{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("MYSQL connected...");
    }
});


// Anzeigen der Frontend Seite
// Hier kommt das Frontend rein/ __dirname gibt dir zugriff auf die aktuelle Direktory bei uns dann eins hoch springen!
const publicDirectory = path.join(__dirname, './Client');

// hier wird die zuvor erzeuge Direktory benutzt, siehe oben const publicDirectory
app.use(express.static(publicDirectory));

// Starten der HTMl Engine
//app.set('test', 'html')


//Routen




// Auf diesen Port hört der express Server! Wichtig 
app.listen(5000,() =>{
    console.log("Server started on Port 5000")
}) ;