window.addEventListener("load", () => {
    const today= new Date();
    document.getElementById("load-date").min= today.toISOString().slice(0, 10);
});

const FlyForm= document.getElementById("fly-form");
const TicketCost= document.getElementById("ticket-cost");

FlyForm.addEventListener("submit",(event) => {
    event.preventDefault();

    const loadOrigin=document.getElementById("load-origin").value;
    const loadDestination=document.getElementById("load-destination").value;
    const loadDateString=document.getElementById("load-date").value;
    const loadDate= new Date(loadDateString + "T00: 00: 00. 000-04:00");
    loadDate.setMinutes(loadDate.getMinutes()- loadDate.getTimezoneOffset()- 360);

const loadTime=document.getElementById("load-time").value;

//Establecemos el costo base
let ticketPrice= 200;
 //Sumamos $50 si la ciudad de origen y destino son diferentes
if (loadOrigin != loadDestination) ticketPrice +=50;

 //Sumamos $100 si parte en fin de semana
const weekend= [5, 6, 0];
if (weekend.includes(loadDate.getDay())){
    ticketPrice +=100;
}
//Sumamos $75 si parte en horas pico
const loadHour= Number.parseInt(loadTime.split(":")[0]);

if(
    (loadHour >=7 && loadHour <9) ||
    (loadHour >16 && loadHour <18)
)
    ticketPrice +=75;
    TicketCost.innerHTML= `✈️ La información de tu vuelo es: Ciudad de Origen: ${loadOrigin}
    Ciudad de Destino: ${loadDestination}
    Hora de Partida: ${loadTime}
    Fecha de Partida: ${loadDateString}
    COSTO TOTAL DEL BOLETO: $${ticketPrice}`;
});