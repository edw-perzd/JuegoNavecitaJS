const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const vidasT = document.querySelector(".totalvidas");
const puntaje = document.querySelector(".points");
const pmax = document.querySelector(".pmax");

let contador = 0;
let vidas = 3;
let pointMax = leerPointMax();

let CorX = 430;
let CorY = 440;

let position = 0;

puntaje.innerHTML = contador;
pmax.innerHTML = pointMax;
vidasT.innerHTML = crearVidas(vidas);

function nave(x, y){
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y - 40);
    ctx.lineTo(x + 40, y);
    ctx.stroke();
    
}

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

setInterval(() =>
{
    nave(CorX, CorY);
    if(position === 1){
        if(CorX > 5){
            ctx.clearRect(0, 0, 900, 450);
            CorX -=5;
            position = 0;
        }
    }
    else if(position === 2){
        if(CorX < 850){
            ctx.clearRect(0, 0, 900, 450);
            CorX +=5;
            position = 0;
        }
    }
    
},2)

document.querySelector('body').addEventListener('keydown', (e) => {
    e.preventDefault();
    switch(e.key){
        case 'ArrowLeft':
            position = 1;
            break;
        case 'ArrowRight':
            position = 2;
            break;
    }
});