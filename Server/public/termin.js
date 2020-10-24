// Termin Skript
console.log("Skript funktioniert")


// Übertragen der Kennung der Botte in einen Array 
let subjectObject = [];
fetch("/termineDropDown").then((res) => {
    if (!res.ok) return Promise.reject(res.status);
  
    return res.json();
  }).then((objekte) => {
    objekte.forEach((objekte) => {
        subjectObject.push(objekte);
    })
  });



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

// DropDown Menü
/////////////////// Copyright-Vermerk /////////////////// 
// https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp

        // Test des arrays

        console.log(subjectObject[0]['kennung']);
         let Test = JSON.stringify(subjectObject)
        console.log(Test['kennung']);
        const subjectSel = document.getElementById("subject");

        
       for (const x in subjectObject[1]['kennung'] ) {
       subjectSel.options[subjectSel.options.length] = new Option(x,x);
             }



    }) 
});













// Event Listener wenn etwas innerhalb von tbody gedrückt wird

document.querySelector('table tbody').addEventListener('click', function(event) {
    // Falls delete gedrückt wird
    if (event.target.className === "delete-row") {
        console.log(event.target.dataset.id);
        
     // Meldung inspiriert durch: https://www.w3schools.com/js/js_popup.asp
     // Hier wird eine bestätigung zum Buchen abgefragt
  
    if (confirm("Wollen Sie diesen Termin wirklich löschen?")) {
      console.log("OK");
      console.log()
      deleteRowById(event.target.dataset.id);
    } else {
      console.log("Abbrechen")
    }
    } // Fall Edit gedrückt wird
    if (event.target.className === "edit-row") {
        handleEditRow(event.target.dataset.id);
    }
});






//









// Funktion Löschen

function deleteRowById(id) {
    fetch('/delete/'+ id, {
        method: 'DELETE',
    })
    .then((res) =>{
        
        if(res.ok){
            console.log("Termin wurde gelöscht");
            location.reload();
        }
        else{
            console.log("Termin Löschen war nicht erfolgreich");
        }
        
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

    data.forEach(function ({kennung, preis, kapazität, kategorie, datum, gebucht, ID}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${kennung}</td>`;
        tableHtml += `<td>${preis}</td>`;
        tableHtml += `<td>${kapazität}</td>`;
        tableHtml += `<td>${kategorie}</td>`;
        tableHtml += `<td>${new Date(datum).toLocaleString()}</td>`;
        tableHtml += `<td>${gebucht}</td>`;
        tableHtml += `<td><button class="delete-row" data-id=${ID}>Delete</td>`;
        tableHtml += `<td><button class="edit-row" data-id=${ID}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
