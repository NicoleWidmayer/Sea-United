// Termin Skript
// FIXME: Beschreibung des Termin Skripts


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
        loadHTMLTable(data);


// Event Listener auf den Button Termin hinzufügen
const fetchRegButton = document.querySelector("#termin-btn");

fetchRegButton.addEventListener("click", (reg) => {

   // let kennung = document.querySelector("#kennung").value;
    let datum = document.querySelector("#gebdat").value;
    // FIXME: hier fehlt noch das auslesen der kennung aus dem Dropdown menü 
    let terminData = {
        kennung: "segelboot21",//kennung,
        datum: datum,
    }
    console.log(terminData);
   // Über Post in die Datenbank laden
   fetch("/erstellen", {
    method: "Post",
    body: JSON.stringify(terminData),
    headers: {
        "content-type": "application/json",
    },
}).then((res) => {
  // wird aktuell nicht ausgeführt
    if(res.status >=400 )
    {
      console.log("Status 200");
      alert("Termin erfolgreich angelegt");
    }
    else {
        alert("Termin konnte nicht angelegt werden");
    }
}) // fetch then
}) // Event Listener




// DropDown Menü
/////////////////// Copyright-Vermerk /////////////////// 
// https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp

        // Test des arrays
    
            console.log(subjectObject);
            console.log(subjectObject[0]);
            console.log(subjectObject[0]['kennung']);
            let Test = [];
            for(i=0; i> subjectObject.length; i++)
            {
                Test.push(subjectObject[0]['kennung']);
            }
        
             console.log(Test);
       
         const subjectSel = document.getElementById("kennung");
          for (const x in Object.values(subjectObject)) {
          subjectSel.options[subjectSel.options.length] = new Option(x,x);
                }// for

                
            
    }) // then Fetch Webseite geladen
    

        
}); // Webseite geladen zu ende













// Event Listener wenn etwas innerhalb von tbody gedrückt wird zum löschen und bearbeiten

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
    } // Falls Edit gedrückt wird
    if (event.target.className === "edit-row") {
        handleEditRow(event.target.dataset.id);
    }
});






// Funktion Bearbeiten der Termine









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



const fetchLogoutButton = document.querySelector("#logout");

fetchLogoutButton.addEventListener('click', function(e){
    document.location.href ="/index.html";
      alert("Abmeldung erfolgreich");
});