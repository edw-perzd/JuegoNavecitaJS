const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const vidasT = document.querySelector(".totalvidas");
const puntaje = document.querySelector(".points");
const pmax = document.querySelector(".pmax");

let contador = 0;
let vidas = 3;
let pointMax = leerPointMax();

puntaje.innerHTML = contador;
pmax.innerHTML = pointMax;
vidasT.innerHTML = crearVidas(vidas);

function leerPointMax(){
    const points = 0;
    if(localStorage.getItem("Puntaje")){
        points = localStorage.getItem("Puntaje");
    }
    return points;
}

function crearVidas(vidas){
    let spanVidas = '';
    for(let i = 1; i<=vidas; i++){
        spanVidas += '<span class="vida">UnaVida</span>';
    }
    return spanVidas;
}
