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

let meteoros = [];

function nave(x, y){
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y - 40);
    ctx.lineTo(x + 40, y);
    ctx.stroke();
    ctx.closePath();
    
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
    if(meteoros.length <= 6){
        for(let i = meteoros.length; i <=6; i++){
            meteoros.push({
                x: Math.floor(Math.random() * 1000),
                y: Math.floor(Math.random() * -50),
                dir: Math.floor(Math.random() * 3),
                size: Math.floor((Math.random() * 51) + 10),
                pintar: function(){
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });
            meteoros[i].pintar();
        }
    }
    meteoros.forEach(meteoro =>{
        if(meteoro.dir === 1){
            meteoro.x++;
        }
        else if(meteoro.dir === 2){
            meteoro.x--;
        }
        meteoro.y++;
        meteoro.pintar();
        nave(CorX, CorY);
        /*if(meteoro.x === 100 && meteoro.y === 100){
            meteoros.splice(meteoros.findIndex(function(met){
                return meteoro === met;
            }), 1);
        }*/
    },
    ctx.clearRect(0, 0, 900, 450));

    if(position === 1){
        if(CorX > 5){
            ctx.clearRect(CorX - 2, CorY - 45, 45, 50);
            CorX -=15;
            position = 0;
        }
    }
    else if(position === 2){
        if(CorX < 850){
            ctx.clearRect(CorX - 2, CorY - 45, 50, 50);
            CorX +=15;
            position = 0;
        }
    }
    
},60);

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