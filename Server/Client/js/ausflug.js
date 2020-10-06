//Durch den folgenden Code wird die Tabelle "Termin" auf der Seite angezeigt

const mysql = require("mysql");
const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
let instance = null;

//Verbindung zur DB
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: proccess.env.DATABASE_USER,
    passwort: process.env.DATABASE_PASSWORT,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log("DB: " + connection.state);
});




document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:5000/ausflug.html")
    .then (response => response.json())
    .then (data => loadHTMLTable(data['data']));
});

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    if(data.length === 0){
        table.innerHTML="<tr> <td class='no-data' colspan='6'>Derzeit sind keine Termine verfügbar.</td> </tr>";
        return;
    }
    let tableHTML="";

    data.forEach(function({Boot, Kategorie, Kapazität, Datum, Preis, Buchen}){
        tableHTML += "<tr>";
        tableHTML += `<td>§{boot}<td>`;
        tableHTML += `<td>§{kategorie}<td>`;
        tableHTML += `<td>§{kapazität}<td>`;
        tableHTML += `<td>§{datum}<td>`;
        tableHTML += `<td>§{preis}<td>`;
        tableHTML += `<td><button class="dieseZeileBuchen" data-id=§{boot}>Buchen</button><td>`;
        tableHTML += "</tr>";
    });

    table.innerHTML = tableHTML;
}


// read
app.get('/getAusflugData', (request, response) => {
    const db = Services.getServicesInstance();

    const result = db.getAusflugData();

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
})

function insertLineIntoTable(data) {

}





class Services {
    static getServicesInstance (){
            return instance ? instance : new Services();
    }

    async getData() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query1 = "SELECT * FROM termine;"

                connection.query(query1, (err, results) => {
                    if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;

        }catch (err){
            console.log(err);
        }
    }

    async getAusflugData() {
        try{
            const response = await new Promise((resolve, reject) => {
                
                connection.query("SELECT boot, kategorie, kapazität, datum, preis from Boote, Termine where boot = kennung and gebucht = 0;", (err, results) => {
                    if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;

        }catch (err){
            console.log(err);
        }
    }
}