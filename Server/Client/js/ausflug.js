document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:5000/ausflug.html")
    .then (response => response.json())
    .then (data => loadHTMLTable(data['data']));
});

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    if(data.length === 0){
        table.innerHTML="<tr> <td class='no-data' colspan='3'> No Data</td> </tr>";

    }
}
