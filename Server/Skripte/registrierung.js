// Anmeldung Funktion

// SQL Modul
const mysql = require('mysql');
const express = require('express');

// Hier wird die verbindung zur db hergestellt
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.database
});





exports.reg = (req, res) => {
    console.log(req.body);
    res.send("Registrierung Funktion");
};