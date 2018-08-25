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
    falling: false
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

function revGrav(){
    ball.grav *= -1
}

function floorCollision(){
    if (ball.y >= floor - ball.rad){
        ball.y = floor - ball.rad; 
        ball.falling = false;   
    }
}

function roofCollision(){
    if (ball.y <= roof + ball.rad + lineThickness){
        ball.y = roof + ball.rad + lineThickness;
        ball.falling = false;   
    }
}

function falling(){
    if (ball.grav > 0 && ball.y < floor - ball.rad){
        ball.falling = true;
    } else if (ball.grav < 0 && ball.y > roof + ball.rad + lineThickness){
        ball.falling = true;
    } else {
        curvature = 1;
    }
    return ball.falling
}

function gravityActing(){
    if (falling()){
        applyGravity();
    }
}

function applyGravity(){
    curvature *= 1.1
    ball.y += 0.1*ball.grav*curvature
}

function drawFloor(){
    ctx.beginPath();
    ctx.rect(0,floor,canvas.width,lineThickness);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawRoof(){
    ctx.beginPath();
    ctx.rect(0,roof,canvas.width,lineThickness);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
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



function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    floorCollision();
    roofCollision();
    gravityActing();
    moveBall();
    drawFloor();
    drawRoof();
    drawBall();
    

    requestAnimationFrame(draw);
}

draw();