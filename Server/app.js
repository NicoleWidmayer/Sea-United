// Import von den Frameworks

const express = require("express"); 
const mysql = require("mysql");
const path = require('path');
const http =require('http');
// Start des Servers
const app = express();

// SQL Datenbank hinzufügen
// Hier wird die verbindung zur db hergestellt, falls diese nicht lokal ist einfach bei host die IP-adresse eintragen
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sea_united"
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
app.set('index', 'html')


//Routen

//app.use('/',require('./routes/pages.js'));

//app.get('/', function(req,res){
  //  res.sendFile(path.join(__dirname + '/Client/index.html'));
//});

//app.get('/', (req, res) => {
  //  res.render('/Client/index');
  //});



// Auf diesen Port hört der express Server! Wichtig 
app.listen(5000,() =>{
    console.log("Server started on Port 5000")
}) ;