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
    // Daten der Registrierung auslesen
    const{Email, Benutzername, IPasswort, IWPasswort} = req.body;
    // Prüfung ob die eingabe funktioniert
    console.log(Email,Benutzername,IWPasswort,IPasswort);
    try{

        //Testen ob das Passwort zwei mal richtig eingegeben wurde
        if(!(IPasswort == IWPasswort))
        {
            // Ausgabe der Fehler Meldung 
            res.status(401).render('login', {
                messageZwei: 'Passwort simmt die überein'
            })
        }
        else
        {
             
        }
        //Testen ob der User Name schon angelegt wurde
        db.query('SELECT * FROM benutzer WHERE benutzername = ?',[Benutzername], async(error,result) =>{
           // Abfrage aus: https://www.youtube.com/watch?v=AZOZVyLrMvc
            if(result.length >0 )
            {
                res.render('Login', {
                    messageDrei: 'Benutzer existiert bereits'
                })
                
            }
            if(error)
            {
                console.log(error);
            }

        })

        //Neuer Benutzer in der Datenbank anlegen

        db.query('INSERT INTO benutzer SET ?',{benutzername:Benutzername ,passwort:IPasswort, e_mail:Email}, async(error,results) =>{

            if(error)
            {
                console.log(error);
            }
            else
            {
                res.render('Login', {
                    message:'Benutzer angelegt'
                })
            }

        })
    }

    catch(error){
        console.log(error);

    }




};