console.log("Skript funktioniert")


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
        tableHtml += `<td><button class="delete-row-btn" data-id=${kennung}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${kennung}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
