// Login Skript 


console.log("Skript wird erkannt");
//const ButtonLogin = document.querySelector("#submitLogin")

//ButtonLogin.addEventListener("Click",()=>{
 // console.log("Button submit wurde gedrückt");

  //fetch("/test?Benutzername=tobias")
  //.then((res)=>{
 //   console.log("Fetch Test erfolgreich");
 // })

//})

const Benuterdaten = () =>{
  console.log("Skript wird erkannt");

  fetch("/benutzer").then((res)=>{
    console.log(res);

  })}