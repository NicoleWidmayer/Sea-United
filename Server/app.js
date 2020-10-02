// Import von den Modulen

const express = require("express"); 
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');
const app = express();

// SQL Datenbank hinzufügen
// Zum benutzen und zum Sichern der Datenbank Daten in einer Externen Datei, Quelle: https://telmoacademy.com/
dotenv.config({path:'./.env'});

// Hier wird die verbindung zur db hergestellt, falls diese nicht lokal ist einfach bei host die IP-adresse eintragen
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_Password,
    database: process.env.DATABASE
});

//verbindung zur Datenbank in der Console prüfen
db.connect((error)=>{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("MYSQL Datenbank is connected...");
    }
});

// test wegen Datenbank

//Parse URL-encoded bodies (as sent by html from), nimmt die von HTML gesendeten Sachen entgegen und zeigt sie in der url nicht an
app.use(express.urlencoded({extended:false}));
// Sorg dafür das die Daten die kommen im Format JSON übertragen werden // Parse JSON Bodies (as sent by API Clients)
app.use(express.json());



// Starten des Webservers und Routen zum Frontend
// / __dirname gibt dir zugriff auf die aktuelle Direktory bei uns dann eins hoch springen!
const publicDirectory = path.join(__dirname, './Client');

//Routen zu den Webseiten
app.get('/', function (req, res) {
    res.sendFile(publicDirectory+'/index.html');
  });

app.get('/Login.html', function (req, res) {
    res.sendFile(publicDirectory+'/Login.html')
  });

app.get('/kontakt.html', function (req, res) {
    res.sendFile(publicDirectory+'/kontakt.html');
  });

app.get('/ausflug.html', function(req,res) {
    res.sendFile(publicDirectory+ '/ausflug.html');
})

app.get('/boote.html', function(req,res) {
    res.sendFile(publicDirectory+ '/boote.html');
})

// Routen für Post (Login und Registrierung)
const loginController = require('../Server/Skripte/login.js');
app.post('/login/submit', loginController.einloggen);
  
const regController = require('../Server/Skripte/registrierung.js');
app.post('/registrierung/submit', regController.reg);


// Wird benötigt damit das css, bilder und die java Dateien bereit gestellt werden können Quelle: https://expressjs.com/de/starter/static-files.html
app.use(express.static(publicDirectory));

// Auf diesen Port hört der express Server! Wichtig 
app.listen(5000,() =>{
    console.log("Server started on Port 5000")
}) ;

// read
app.get('/ausflug.html', (request, response) => {
    const db = Services.getServicesInstance();

    const result = db.getData();

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
})