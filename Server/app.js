// Import von den Frameworks

const express = require("express"); 
const mysql = require("mysql");
const path = require('path');

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


// Routen

//app.use('/',require('./routes/pages.js'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/Client/index.html'));
});
	
//app.get('/', (req, res) => {
  //  res.render('/Client/index');
  //});

// Auf diesen Port hört der express Server! Wichtig 
app.listen(5000,() =>{
    console.log("Server started on Port 5000")
}) ;