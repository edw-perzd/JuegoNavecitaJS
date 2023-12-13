const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const vidasT = document.querySelector(".totalvidas");
const puntaje = document.querySelector(".points");
const pmax = document.querySelector(".pmax");
const start = document.querySelector(".btn-start");

let contador = 0;
let vidas = 3;
let pointMax = leerPointMax();

let estado = 0;

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
        spanVidas += '<span class="vida">❤</span>';
    }
    return spanVidas;
}

setInterval(() => {
    if(estado === 1){
        start.innerHTML = "Pausa";
        crearVidas();
        if(vidas > 0){
            nave(CorX, CorY);
            if(meteoros.length <= 6){
                for(let i = meteoros.length; i <=25; i++){
                    meteoros.push({
                        x: Math.floor(Math.random() * 1000),
                        y: Math.floor(Math.random() * -50),
                        dir: Math.floor(Math.random() * 3),
                        radio: Math.floor((Math.random() * 51) + 10),
                        pintar: function(){
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.closePath();
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
            },
            ctx.clearRect(0, 0, 900, 450));
    
            for(let i = 0; i < meteoros.length; i++){
                // Condición que elimina los meteoros si salen de la pantalla
                if(meteoros[i].x > 1000 || meteoros[i].x < -50 || meteoros[i].y > 500){
                    eliminarMeteoro(i);
                    ganarPoints();
                }
    
                if((meteoros[i].y + meteoros[i].radio) === (CorY - 45) && meteoros[i].x >= CorX - 40 && meteoros[i].x < CorX + 40){
                    eliminarMeteoro(i);
                    bajarVida();
                }
            }
    
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

            
            
        }
        else{
            gameOver();
            start.innerHTML = "Reiniciar";
            if(contador > pointMax){
                localStorage.setItem("puntaje", contador);
            }

        }
        
    }
    else if(estado === 2){
        pausa();
        start.innerHTML = "Continuar";
    }
    else if(estado === 3){
        gameOver();
        start.innerHTML = "Reiniciar";
    }
    
}, 10);

function eliminarMeteoro(n){
    meteoros.splice(n, 1);
}

function ganarPoints(){
    if(vidas > 0){
        contador++;
        puntaje.innerHTML = contador;
    }
    else{
        estado = 3;
    }
}

function bajarVida(){
    if(vidas > 0){
        vidas--;
        vidasT.innerHTML = crearVidas(vidas);
    }
}

function gameOver(){
    ctx.clearRect(0, 0, 900, 450);
    ctx.font = '70px Consolas';
    ctx.lineWidth = '3';
    ctx.fillStyle = "white";
    ctx.fillText("Game Over", 300, 225);
    ctx.font = '25px Consolas';
    ctx.lineWidth = '3';
    ctx.fillStyle = "white";
    ctx.fillText("Puntaje: " + contador, 200, 300);
    ctx.fillText("Record anterior: " + pointMax, 500, 300);
}

function pausa(){
    ctx.clearRect(0, 0, 900, 450);
    ctx.font = '70px Consolas';
    ctx.lineWidth = '3';
    ctx.fillStyle = "white";
    ctx.fillText("Juego en pausa", 200, 225);
}

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

function leerPointMax(){
    return (!localStorage.getItem("puntaje")) ? 0 : localStorage.getItem("puntaje");
}

start.addEventListener('click', () => {
    if(vidas > 0){
        if(estado === 0){
            estado = 1;
        }
        else if(estado === 1){
            estado = 2;
        }
        else if(estado === 2){
            estado = 1;
        }
    }
    else{
        estado = 0;
        location.reload();
    }
});

