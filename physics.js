var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//define ball
let ballRad = 5;
let x = canvas.width/2;
let y = canvas.height/2;


function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBall();

    requestAnimationFrame(draw);
}

draw();