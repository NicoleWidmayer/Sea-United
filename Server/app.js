// Import von den Modulen

const express = require("express"); 
const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
const path = require('path');
const { RSA_NO_PADDING } = require("constants");
const { json, response } = require("express");
const { request } = require("http");
const app = express();

//const datum = new Date();

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
app.get("/ausflug", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT t.id, b.kategorie, b.kapazität, t.datum, b.preis FROM boote AS b, termine AS t WHERE t.boot = b.kennung and t.gebucht = 0;");
    //  and datum > "+datum+" --- evtl in sql abfrage einbauen...
    res.json(rows);
    console.log(res.json(rows));
  } catch {
    res.status(500).send();
  }
});

//Ändern der Daten durch drücken des "BUCHEN" Button
app.put("/ausflugBuchen/:id", async (req, res) => {
  try {
    const [rows] = await connection.execute("UPDATE Termin SET gebucht = 1 WHERE id = ?;"); [req.params.id];
  } catch {
    res.status(500).send();
  }
});

//Datenbankkommunikation für die Termine-Seite
//Füllen der Tabelle mit allen Terminen
app.get("/termineAll", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT b.kennung, b.preis, b.kategorie, t.datum, t.gebucht, t.ID FROM boote AS b, termine AS t WHERE b.kennung = t.boot");
    res.json(rows);  
    console.log(rows);
  } catch {
    res.status(500).send();
  }
});

//Funktion Termin löschen
app.delete("/delete/:id", async (req, res) => {
  try {
    const [rows] = await connection.execute("DELETE FROM termine WHERE id = ?", [
      req.params.id,
    ]);
    if(rows.affectedRows === 1)
    {
      res.status(200).send();
    }
    else{
      res.status(404).send();
    }
    
  } catch {
    res.status(500).send();
  }
});

//Funktion Termin erstellen
app.post("/erstellen", async (req, res) => {
  try {
    const[rows] = await con.execute("INSERT INTO Termine VALUES(?, '?', false);", [req.body.datum, req.body.boot, req.body.gebucht] ); //DATUM, BOOT, GEBUCHT
  } catch {
    res.status(500).send();
  }
});

//Funktion Termin bearbeiten
app.put("/bearbeiten", async (req, res) => {
  try {
    const[rows] = await con.execute("UPDATE Termine SET boot = ?, datum = ? WHERE boot = ? AND datum = ?;",   [req.body.boot, req.body.datum, req.body.altBoot, req.body.altDatum]);
  
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

