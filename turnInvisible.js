var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let floor = canvas.height - 115;
let roof = canvas.height - 315;
let lineThickness = 3;
let curvature = 1;
// let startTime;

let ball = {
    rad: 10,
    x: 20,
    y: floor - 10,
    grav: 10,
    falling: false,
    invisible: false
}

var keymap ={
    "a": false,
    "d": false
};

//Listen for button pushes
document.addEventListener("keydown",keyHandler, false);
document.addEventListener("keyup", keyHandler, false);

//What happens when key pushed or released
function keyHandler(evt){
    keymap[evt.key] = (evt.type == 'keydown');
}

function isLeft(){
    if (keymap["a"] && ball.x - ball.rad > 0){
        ball.x -= 5;
    }
}

function isRight(){
    if (keymap["d"] && ball.x + ball.rad < canvas.width){
        ball.x += 5;
    }
}

function drawVisibleBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function moveBall(){
    isLeft()
    isRight()
}

function turnInvisible(){
    ball.invisible = true;
    timeLimit();
}

function timeLimit(){
    setTimeout(() => {
        ball.invisible = false;
    }, 2000)
}

function drawInvisibleBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    if (ball.invisible){
        drawInvisibleBall();
    } else {
        drawVisibleBall();
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    moveBall();
    drawBall();

    requestAnimationFrame(draw);
}

draw();