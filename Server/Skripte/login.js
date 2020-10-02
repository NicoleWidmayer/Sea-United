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



exports.einloggen = async(req, res) => {
  
   console.log(req.body);
    try {
        // Abfrage E-mail und Password aus dem Formular
        const{benutzername, password} = req.body;
        const test= 'false';
        db.query('SELECT * From benutzer WHERE benutzername = ?', [benutzername], async(error, results) =>{
            console.log(results);
            
        });
        //if(!benutzername || !password)
        //{
          //  return res.status(400).render('login',{
              //  message:'Please provide an email an password'
            //})
       // }


    //db.query('SELECT * From benutzer WHERE email = ?', [benutzername], async(error, results) =>{
   // console.log(results);

    //});



    } catch (error) {
        console.log(error);
    }

};
