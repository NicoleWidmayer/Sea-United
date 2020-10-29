/*
Author: Group Sea_United
Version: 2.0
Description: 
This is where the web server is launched.
The database is connected, queried and modified.
Currently the Server started on Port 5000.
*/


// Import af all needed Modules
const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
const path = require('path');
const { RSA_NO_PADDING } = require("constants");
const { json, response } = require("express");
const { request } = require("http");
const { Console } = require("console");
const app = express();

const datum = new Date();

// add SQL Database
// Zum benutzen und zum Sichern der Datenbank Daten in einer Externen Datei, Quelle: https://www.npmjs.com/package/dotenv
dotenv.config({ path: './.env' });

// Connection to the Database, if not local: change host to IP-Adress
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
  .catch((error) => {
    console.log(error);
    console.log("MYSQL Datenbank is not connected...");
  });


//Parse URL-encoded bodies (as sent by html from),
app.use(express.urlencoded({ extended: false }));
//Parse JSON Bodies (as sent by API Clients)
app.use(express.json());

app.use(express.static("public"));

//Database communication for the trip page
//Filling the table with the remaining free dates
app.get("/ausflug", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT t.id, b.kategorie, b.kapazität, t.datum, b.preis FROM boote AS b, termine AS t WHERE t.boot = b.kennung and t.gebucht = 0 and datum > '" + datum + "';");
    res.json(rows);
  } catch (err) {
    res.status(500).send();
  }
});

//Change the data by pressing the "BOOK" butto
app.patch("/ausflugBuchen/:id", async (req, res) => {
  try {
    const [rows] = await connection.execute("UPDATE termine SET gebucht = 1 WHERE id = ?;",
      [req.params.id]);
    if (rows.affectedRows === 1) {
      res.status(200).send();
    }
    else {
      res.status(400).send();
    }

  } catch (err) {
    res.status(500).json();
  }
});

//Database communication for the events page
//Filling the table with all events
app.get("/termineAll", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT t.ID, b.kennung, b.preis, b.kategorie, t.datum, t.gebucht, t.ID, b.kapazität FROM boote AS b, termine AS t WHERE b.kennung = t.boot ORDER BY ID ");
    res.json(rows);
  } catch (err) {
    res.status(500).send();
  }
});

//Delete appointment function
app.delete("/delete/:id", async (req, res) => {
  try {
    const [rows] = await connection.execute("DELETE FROM termine WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.affectedRows === 1) {
      res.status(200).send();
    }
    else {
      res.status(400).send();
    }
  } catch (err) {
    res.status(500).send();
  }
});

//Create appointment function
app.post("/erstellen", async (req, res) => {
  try {
    const [rows] = await connection.execute("INSERT INTO Termine (datum, boot, gebucht) VALUES (?,?,0);",
      [req.body.datum, req.body.kennung]);

    if (rows.changedRows === 1) {
      res.status(201).send();
    }
    else {
      res.status(400).send();
    }

  } catch (err) {
    res.status(500).json();
  }
});

//Edit appointment function
app.patch("/UpdateTermin", async (req, res) => {
  try {
    const [rows] = await connection.execute("UPDATE termine SET boot = ?, datum = ?, gebucht = ? WHERE ID = ?;",
      [req.body.kennung, req.body.datum, req.body.gebucht, req.body.id]);
    console.log(rows);

    if (rows.changedRows === 1) {
      res.status(200).send();
    }
    else {
      res.status(400).send();
    }

  } catch (err) {
    res.status(500).json();
  }
});

// Function Appointment, Fill DropDown
app.get("/termineDropDown", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT kennung FROM boote;");
    res.json(rows);
  } catch (err) {
    res.status(500).send();
  }
});

//Database communication for the login page
//Get all users from database
app.get("/benutzer", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * from benutzer");
    res.json(rows);;
  } catch (err) {
    res.status(500).send();
  }
});

// Database communication for the registration of new users
// Create new user in the database
app.post("/register", async (req, res) => {
  try {
    const [rows,] = await connection.execute(
      "INSERT INTO benutzer (benutzername, passwort, e_mail) VALUES (?, ?, ?)",
      [req.body.benutzername, req.body.passwort, req.body.email]);
    console.log(rows);
    if (rows.affectedRows === 1) {
      res.status(201).send();
    }
    else {
      res.status(400).send();
    }

  } catch (err) {
    res.status(500).json();
  }
});


// The express server listens on this port (5000)! 
app.listen(5000, () => {
  console.log("Server started on Port 5000")
});

