/*
Author: Group Sea_United
Version: 1.7
Description: 
Here all Termine events can be viewed, new events can be added and previous events can be edited
*/

// give "Kennung" into Array 
let kennungObject = [];
let allKennungObject = [];
let allDateObject = [];
let allBookedObject = [];
fetch("/termineDropDown").then((res) => {
    if (!res.ok) return Promise.reject(res.status);
  
    return res.json();
}).then((objekte) => {
        objekte.forEach((objekte) => {
        kennungObject.push(objekte);
    })
});

// Event Listener for Webseite
document.addEventListener('DOMContentLoaded', function (e) {
    fetch('/termineAll')
    .then( async res =>{
        const data = await res.json();
        length = data[Object.keys(data)[Object.keys(data).length - 1]].ID;
        
        for(i =0; i< length;i++)
        {
            for(k=0; k<data.length; k++) {
                allKennungObject[data[k].ID] = data[k].kennung;
                allDateObject[data[k].ID] = data[k].datum;
                allBookedObject[data[k].ID] = data[k].gebucht;
            }
        }

        loadHTMLTable(data);

        // Event Listener for button "Termin"
        const fetchRegButton = document.querySelector("#termin-btn");

        fetchRegButton.addEventListener("click", (reg) => {
            if (document.querySelector("#gebdat").value > new Date().toISOString().split('T')[0]) {
                let datum = document.querySelector("#gebdat").value;
                let kennung = document.querySelector("#kennung").value;

                let terminData = {
                    kennung: kennung,
                    datum: datum,
                }

                // load data into database with POST
                fetch("/erstellen", {
                    method: "Post",
                    body: JSON.stringify(terminData),
                    headers: {
                        "content-type": "application/json",
                    },
                }).then((res) => {
                    // wird aktuell nicht ausgeführt
                    if(res.status >=400) {
                        console.log("Status 200");
                        alert("Termin erfolgreich angelegt");
                    } else {
                        alert("Termin konnte nicht angelegt werden");
                    }

                    document.location.href ="/termin.html";
                }) // End of fetch then
            } else {
                alert("Datum muss in der Zukunft liegen!");
            }
        }) // End of Event Listener

        // DropDown Menü
        /////////////////// Copyright-Vermerk /////////////////// 
        // https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp
        const kenjectSel = document.getElementById("kennung");
        for(i=0; i< kennungObject.length; i++) {
            kenjectSel.options[kenjectSel.options.length] = new Option(kennungObject[i]['kennung']);   
        }     
    }) // then Fetch Website loaded    
}); // End of load Website

// Event Listener for the case that somethin within tbody was pused. To DELETE or to EDIT.
document.querySelector('table tbody').addEventListener('click', function(event) {
    // If DELETE is pushed...
    if (event.target.className === "delete-row") {
        console.log(event.target.dataset.id);
        
        // Meldung inspiriert durch: https://www.w3schools.com/js/js_popup.asp
        // Asks for a confirmation to delete
        if (confirm("Wollen Sie diesen Termin wirklich löschen?")) {
            deleteRowById(event.target.dataset.id);
        } else {
            console.log("Abbrechen")
        }
    } // If EDIT is pushed...
    if (event.target.className === "edit-row") {
        handleEditRow(event.target.dataset.id);
    }
});

// Function to show meetings, when edit is pushed
function handleEditRow(id) {
   
    // Set Fields visible
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;

    // Fill Fields to Update, also give default values
    const kenjectSel = document.getElementById("update-kennung");
    for(i=0; i< kennungObject.length; i++)
    {
    kenjectSel.options[kenjectSel.options.length] = new Option(kennungObject[i]['kennung']);   
    }
    // Default-display of "kennung"
    kenjectSel.value = allKennungObject[id];
    // The Date needs to be the yyyy-mm-tt format to be default-displayed
    date = new Date(allDateObject[id]);
    document.querySelector("#update-gebdat").value = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate().toString().padStart(2, "0");
    // Default-display of boolean value "gebucht"
    document.querySelector("#update-gebucht").value = allBookedObject[id];
  
    // Event Listener auf den Button Update
    const fetchUpdateButton = document.querySelector("#update-btn");

    fetchUpdateButton.addEventListener("click", (reg) => {
        if (document.querySelector("#update-gebdat").value > new Date().toISOString().split('T')[0]) {
            let datum = document.querySelector("#update-gebdat").value;
            let kennung = document.querySelector("#update-kennung").value;
            let gebucht = document.querySelector("#update-gebucht").value;

            let terminUpdateData = {
                kennung: kennung,
                datum: datum,
                gebucht: gebucht,
                id: id
            }
            
            // Bring data with PATCH into the database
            fetch("/UpdateTermin", {
                method: "PATCH",
                body: JSON.stringify(terminUpdateData),
                headers: {
                    "content-type": "application/json",
                },
            }).then((res) =>{
                if(res.ok){
                location.reload();
                }
                else{
                    alert("Termin konnte nicht bearbeitet werden");
                }
            })// End of Fetch Then
        } // End of If
        else {
            kenjectSel.value = allKennungObject[(id-1)];
            document.querySelector("#update-gebdat").value = new Date(allDateObject[id-1]).toISOString().split('T')[0];
            document.querySelector("#update-gebucht").value = allBookedObject[id-1];
            alert("Datum muss in der Zukunft liegen!");
        }
    }) // End of Event Listener
}// End of Edit Listener

// Delete function
function deleteRowById(id) {
    fetch('/delete/'+ id, {
        method: 'DELETE',
    })
    .then((res) =>{
        if(res.ok){
            location.reload();
        }
        else{
            console.log("Termin Löschen war nicht erfolgreich");
        }   
    })
}

// functions to show the filled table
/////////////////// Copyright-Vermerk /////////////////// 
// https://www.youtube.com/watch?v=vrj9AohVhPA
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    // In case that the ResultSet is empty
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='9'>No Data</td></tr>";
        return;
    }

    // It´s to not have doubble information in table
    let tableHtml = "";
    // Table will be filled
    data.forEach(function ({kennung, preis, kategorie, datum, gebucht, ID, kapazität}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${kennung}</td>`;
        tableHtml += `<td>${preis}</td>`;
        tableHtml += `<td>${kapazität}</td>`;
        tableHtml += `<td>${kategorie}</td>`;
        tableHtml += `<td>${new Date(datum).toLocaleDateString()}</td>`;
        tableHtml += `<td>${gebucht}</td>`;
        tableHtml += `<td><button class="delete-row" data-id=${ID}>Delete</td>`;
        tableHtml += `<td><button class="edit-row" data-id=${ID}>Edit</td>`;
        tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml;
}