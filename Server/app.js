// Import von den Modulen

const express = require("express"); 
const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
const path = require('path');
const { RSA_NO_PADDING } = require("constants");
const { json } = require("express");
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

//Datenbankkommunikation für die Ausflug-Seite
//Füllen der Tabelle mit den noch freien Terminen
app.post("/ausflug", async (req, res) => {
  try {
    const[rows] = await con.execute("SELECT boot, kategorie, kapazität, datum, preis from Boote, Termine where boot = kennung and gebucht = 0;");
    
  } catch {
    res.status(500).send();
  }

  res.json({
    boot: req.body.boot,
    kategorie: req.body.kategorie,
    kapazität: req.body.kapazität,
    datum: req.body.datum,
    preis: req.body.preis,
  });
});

//Ändern der Daten durch drücken des "BUCHEN" Button

//Datenbankkommunikation für die Termine-Seite
//Füllen der Tabelle mit allen Terminen
app.post("/termine", async (req, res) => {
  try {
    const[rows] = await con.execute("SELECT boot, kategorie, kapazität, datum, preis, gebucht from Boote, Termine where boot = kennung;");
  } catch {
    res.status(500).send();
  }
});

//Funktion Termin löschen
app.delete("/delete", async (req, res) => {
  try {
    const[rows] = await con.execute("DELETE FROM Termine WHERE boot = ? AND datum = ?;");
    [req.body.boot, req.body.datum]
  } catch {
    res.status(500).send();
  }
});

//Funktion Termin erstellen
app.post("/erstellen", async (req, res) => {
  try {
    const[rows] = await con.execute("INSERT INTO Termine VALUES(?, '?', false);"); //DATUM, BOOT, GEBUCHT
    [req.body.datum, req.body.boot, req.body.gebucht]
  } catch {
    res.status(500).send();
  }
});

//Funktion Termin bearbeiten
app.put("/bearbeiten", async (req, res) => {
  try {
    const[rows] = await con.execute("UPDATE Termine SET boot = ?, datum = ? WHERE boot = ? AND datum = ?;");
    [req.body.boot, req.body.datum, req.body.altBoot, req.body.altDatum]
  } catch {
    res.status(500).send();
  }
});




//Datenbankkommunikation für die Login Seite
app.get("/benutzer", async (req, res) => {
  try{
    const [rows] = await connection.execute("SELECT * from benutzer");
    res.json(rows);  
  }catch{
    res.status(500).send();
  }
  });

// Datenbnakkomunikation für das Registrien von neuen Benutzern
// Neuen Benutzer in der Datenbank anlegen
app.post("/register", async (req, res) => {
  try{
  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO benutzer (benutzername, passwort, e_mail) VALUES (?, ?, ?)",
    [req.body.benutzername,req.body.passwort, req.body.email]
  );

      }catch{
        res.status(500).send();
      }
});


// Auf diesen Port hört der express Server! Wichtig 
app.listen(5000,() =>{
    console.log("Server started on Port 5000")
}) ;

