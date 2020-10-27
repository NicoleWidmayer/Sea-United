/*
Author: Group Sea_United
Version: 1.7
Description: 
All trips that are not booked yet are displayed and can be booked
*/

// If this page is called, the database request runs
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

// functions to show the filled table
/////////////////// Copyright-Vermerk /////////////////// 
// https://www.youtube.com/watch?v=vrj9AohVhPA
function loadHTMLTable(data) {
  const table = document.querySelector('table tbody');
  
  // In case that the ResultSet is empty
  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
    return;
  }

  // It´s to not have doubble information in table
  let tableHtml = "";
  // Table will be filled
  data.forEach(function ({id, kategorie, kapazität, datum, preis}) {
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${kategorie}</td>`;
    tableHtml += `<td>${kapazität}</td>`;
    tableHtml += `<td>${new Date(datum).toLocaleDateString()}</td>`;
    tableHtml += `<td>${preis}</td>`;
    tableHtml += `<td><button class="edit-row-btn" onclick="confirmBuchen(${id})" data-id=${id}>Buchen</td>`;
    tableHtml += "</tr>";
  });
  table.innerHTML = tableHtml;
}

// Meldung inspiriert durch: https://www.w3schools.com/js/js_popup.asp
// Asks for a confirmation for "Buchen"
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