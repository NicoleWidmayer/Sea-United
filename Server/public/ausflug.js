function RowAusflug(boot, kategorie, kapazität, datum, preis) {
    this.boot = boot;
    this.kategorie = kategorie;
    this.kapazität = kapazität;
    this.datum = datum;
    this.preis = preis;
  }










  function insertRow() {
      $ ("#ausflugTable tbody").append("<tr>" + 
      "<td>" + ausflug.boot + "</td>" +
      "<td>" + ausflug.kategorie + "</td>" +
      "<td>" + ausflug.kapazität + "</td>" +
      "<td>" + ausflug.datum + "</td>" +
      "<td>" + ausflug.preis + "</td>" +
      "<td><button>data-id=" + ausflug.boot + "</button></td>" +
      "</tr>")
  }
















const ladeAusfluege = () => {
    fetch("/ausflug").then((res) => {
        if (!res.ok) return Promise.reject(res.status);
    
        return res.json();
      }).then((benutzer) => {
        tbody.innerHTML = ''; //tabelle wird geleert
        ausflug.forEach((ausflug) => {
          let ausflugROW = new RowAusflug(ausflug.boot, ausflug.kategorie, ausflug.kapazität, ausflug.datum, ausflug.preis);
          insertRow(ausflugROW);
        })
      }).catch((e) => {
        alert(`Fehler ${e}`);
      });


ladeAusfluege();
}