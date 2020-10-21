//Durch den folgenden Code wird die Tabelle der zur Verfügung stehenden Termineauf der Seite angezeigt
//Der gesamte Code ist inspiriert durch https://www.youtube.com/watch?v=vrj9AohVhPA






document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:5000/ausflug.hbs")
    .then (response => response.json())
    .then (data => loadHTMLTable(data['data']));
});

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    //Wenn keine Daten vorliegen greift dies
    if(data.length === 0){
        table.innerHTML="<tr> <td class='no-data' colspan='6'>Derzeit sind keine Termine verfügbar.</td> </tr>";
        return;
    }
    let tableHTML="";

    //Hierdurch wird die Tabelle mit den Daten zeilenweise befüllt
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


// Auslesen des Sql-Statements, mit dem die Tabelle gefüllt werden soll
app.get('/getAusflugData', (request, response) => {
    const db = Services.getServicesInstance();

    const result = db.getAusflugData();

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
})

//Funktion des "Buchen"-Buttons





class Services {
    static getServicesInstance (){
            return instance ? instance : new Services();
    }

    //Diese Funktion übernimmt die SQL-Abfrage für die Tabelle
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