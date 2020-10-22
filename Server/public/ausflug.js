function RowAusflug(boot, kategorie, kapazität, datum, preis) {
    this.boot = boot;
    this.kategorie = kategorie;
    this.kapazität = kapazität;
    this.datum = datum;
    this.preis = preis;
  }




  let tbody = document.getElementById('hook');
  const insertRow = (rowausflug) => {
    const boothtml = `<tr><td>${rowausflug.boot}</td>`;
    const kategoriehtml = `<td>${rowausflug.kategorie}</td>`;
    const kapazitäthtml = `<td>${rowausflug.kapazität}</td>`;
    const datumhtml = `<td>${rowausflug.datum}</td>`;
    const preishtml = `<td>${rowausflug.preis}</td>`;
    const buchenhtml = `<td><button>BUCHEN</button></td></tr>`;
  
    
      tbody.insertAdjacentHTML(boothtml + kategoriehtml + kapazitäthtml + datumhtml + preishtml);

    
    }//ende von insertRow()






const ladeAusfluege = () => {
   fetch("/ausflug").then((res) => //res.json()).then(data => console.log(data)); 
   {
   if (!res.ok) return Promise.reject(res.status);
    
        return res.json();
      }).then((ausflug) => {
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