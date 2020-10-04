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

const path = require('path');
const { RSA_NO_PADDING } = require('constants');
const publicDirectory = path.join(__dirname, '../Client');



exports.einloggen = async(req, res) => {
   
   
    console.log(req.body);

    try {

        // Abfrage E-mail und Password aus dem Formular
        const{benutzername, password} = req.body;
        
        db.query('SELECT * From benutzer WHERE benutzername = ?', [benutzername], async(error, results) =>{
         console.log(results);
            
         if(!results || (password === results[2]))
         {
             res.status(401).render('/Login.hbs',{
                 message:'Falsche Eingabe!'
             })
         }
        else{
            res.status(200).redirect("/termin.html");
        }
        }); // Datenbankabfrage

        


    }// try 
    catch (error) {
        console.log(error);
    }// catch

}; // Methode Einloggen
