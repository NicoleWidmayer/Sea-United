// Termin Skript
console.log("Skript funktioniert")

// Event Listener auf die Webseite
document.addEventListener('DOMContentLoaded', function (e) {
    fetch('/termineAll')
    .then( async res =>{
        console.log("Fetch geht");
        const data = await res.json();
        console.log(data);
        let length = data.length;
        console.log(length);    
        loadHTMLTable(data);
    }) 
});

// Event Listener wenn etwas innerhalb von tbody gedrückt wird

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row") {
        handleEditRow(event.target.dataset.id);
    }
});




// Funktion Löschen

function deleteRowById(id) {
    fetch('/delete', {
        method: 'DELETE',
        body: JSON.stringify(id),
            headers: {
                "content-type": "application/json",
            },
    })
    .then((res) =>{
        console.log("Löschen geht");
    })
}

















// Funktion zum anzeigen der Tabelle
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    console.log(data);
    //let length = data.length;
    //console.log(length);
    // Rückgabe, falls das ausgelesene Result leer ist
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    // Das hier passiert mit der Tabelle wenn das Result nicht leer ist
    let tableHtml = "";

    data.forEach(function ({kennung, preis, kapazität, kategorie, datum, gebucht}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${kennung}</td>`;
        tableHtml += `<td>${preis}</td>`;
        tableHtml += `<td>${kapazität}</td>`;
        tableHtml += `<td>${kategorie}</td>`;
        tableHtml += `<td>${new Date(datum).toLocaleString()}</td>`;
        tableHtml += `<td>${gebucht}</td>`;
        tableHtml += `<td><button class="delete-row" data-id=${kennung}>Delete</td>`;
        tableHtml += `<td><button class="edit-row" data-id=${kennung}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
