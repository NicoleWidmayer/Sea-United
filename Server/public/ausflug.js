function RowAusflug(boot, kategorie, kapazität, datum, preis) {
    this.boot = boot;
    this.kategorie = kategorie;
    this.kapazität = kapazität;
    this.datum = datum;
    this.preis = preis;
  }










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
















const ladeAusfluege = () => {
    fetch("/ausflug").then((res) => {
        if (!res.ok) return Promise.reject(res.status);
    
        return res.json();
      }).then((benutzer) => {
        tbody.innerHTML = ''; //tabelle wird geleert
        ausflug.forEach((ausflug) => {
          let ausflugROW = new RowAusflug(ausflug.boot, ausflug.kategorie, ausflug.kapazität, ausflug.datum, ausflug.preis);
          loadHTMLTable(ausflugROW);
        })
      }).catch((e) => {
        alert(`Fehler ${e}`);
      });


ladeAusfluege();
}