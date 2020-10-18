// Import von den Modulen

const express = require("express"); 
const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
const path = require('path');
const app = express();


// SQL Datenbank hinzufügen
// Zum benutzen und zum Sichern der Datenbank Daten in einer Externen Datei, Quelle: https://telmoacademy.com/
dotenv.config({path:'./.env'});

// Hier wird die verbindung zur db hergestellt, falls diese nicht lokal ist einfach bei host die IP-adresse eintragen
mysql
  .createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_Password,
    database: process.env.DATABASE,
  })
  .then((con) => {
    connection = con;
    console.log("MYSQL Datenbank is connected...");
  })
  .catch((error) =>{
      console.log(error)
  });


//Parse URL-encoded bodies (as sent by html from), nimmt die von HTML gesendeten Sachen entgegen und zeigt sie in der url nicht an
app.use(express.urlencoded({extended:false}));
// Sorg dafür das die Daten die kommen im Format JSON übertragen werden // Parse JSON Bodies (as sent by API Clients)
app.use(express.json());

app.use(express.static("public"));




// Auf diesen Port hört der express Server! Wichtig 
app.listen(5000,() =>{
    console.log("Server started on Port 5000")
}) ;

