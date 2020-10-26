// Wenn die Seite aufgerufen wird, wird die Datenbankabfrage gemacht
document.addEventListener('DOMContentLoaded', function (e) {
    datenbankabfrage();
});

function datenbankabfrage() {
  fetch('/ausflug')
  .then( async res =>{
      const data = await res.json();
      loadHTMLTable(data);
  }) 
}

// Die Tabelle wird befüllt
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    
    // Rückgabe, falls das ausgelesene Result leer ist
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }

    // Das hier passiert mit der Tabelle wenn das Result nicht leer ist
    let tableHtml = "";

    data.forEach(function ({id, kategorie, kapazität, datum, preis}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${kategorie}</td>`;
        tableHtml += `<td>${kapazität}</td>`;
        tableHtml += `<td>${new Date(datum).toLocaleString()}</td>`;
        tableHtml += `<td>${preis}</td>`;
        tableHtml += `<td><button class="edit-row-btn" onclick="confirmBuchen(${id})" data-id=${id}>Buchen</td>`;
        tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml;
}

// Meldung inspiriert durch: https://www.w3schools.com/js/js_popup.asp
// Hier wird eine bestätigung zum Buchen abgefragt
function confirmBuchen(id) {
  if (confirm("Wollen Sie diesen Termin wirklich buchen?")) {
   fetch('/ausflugBuchen/'+ id, {
      method: 'PATCH',
    }).then((res) =>{
      if(res.ok){
          console.log("Änderung vorgenommen");
      } else {
          console.log("Änderung konnte nicht vorgenommen werden");
      }   
    })
    datenbankabfrage();
  }
}
