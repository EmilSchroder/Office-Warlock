var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let startTime = new Date()

let floor = canvas.height - 115;
let roof = canvas.height - 315;
let lineThickness = 3;
let curvature = 1;

let spellSelect = {
    antigrav: true,
    create: false,
    invis: false
}

let spellPosition = 0;
let activeSpell = Object.keys(spellSelect)[spellPosition];


let square = {
    sideLength: 10,
    falling: true,
    grav: 50
};

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
    "d": false,
    "w": false,
    "s": false
}

//Listen for button pushes
document.addEventListener("keydown",keyHandler, false);
document.addEventListener("keyup", keyHandler, false);

//What happens when key pushed or released
function keyHandler(evt){
    keymap[evt.key] = (evt.type == 'keydown');
    spellChangeUp();
    spellChangeDown();
}

function spellChangeUp(){
    if (keymap["w"]){
        spellPosition = (spellPosition+1)%3
        console.log(spellPosition)
    }
}

function spellChangeDown(){
    if (keymap["s"]){
        spellPosition = (spellPosition+2)%3
        console.log(spellPosition)
    }
}

canvas.addEventListener("click", castSpell)

function castSpell(event){
    switch(spellPosition){

        case 0:
        turnInvisible()
        break;

        case 1:
        createBox(event)
        break;

        case 2:
        revGrav()
        break;

        default:
        console.log("switch statement failure");
    }
}

function turnInvisible(){
    ball.invisible = true;
    console.log('invis');
    timeLimit();
}

function createBox(event){
    square.x = event.offsetX;
    square.y = event.offsetY;
    startTime = new Date();
    console.log('box');

    // draw();
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
    ctx.fillStyle = "#db0ddb";
    ctx.fill();
    ctx.closePath();
}

function drawInvisibleBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI*2);
    ctx.fillStyle = "#d691d6";
    ctx.fill();
    ctx.closePath();
}

function moveBall(){
    isLeft()
    isRight()
}



function timeLimit(){
    setTimeout(() => {
        ball.invisible = false;
    }, 2000)
}

function drawBall(){
    if (ball.invisible){
        drawInvisibleBall();
    } else {
        drawVisibleBall();
    }
}



function gravity(){
    let endTimeSquare = new Date();
    let timeDelta = (endTimeSquare - startTime)/1000;

    square.y += 0.5*square.grav*timeDelta*timeDelta;



}

function floorCollision(){
    if (ball.y >= floor - ball.rad){
        ball.y = floor - ball.rad; 
        ball.falling = false;   
    }
    if (square.y > canvas.height - (square.sideLength*2) - 100){
        square.y = canvas.height - (square.sideLength*2) - 100;        
    }
}


function roofCollision(){
    if (ball.y <= roof + ball.rad + lineThickness){
        ball.y = roof + ball.rad + lineThickness;
        ball.falling = false;   
    }
}


function drawSquare(){
    ctx.beginPath();
    ctx.rect(square.x-5,square.y-5,square.sideLength,square.sideLength);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawFloor(){
    ctx.beginPath();
    ctx.rect(0,floor,canvas.width,lineThickness);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawRoof(){
    ctx.beginPath();
    ctx.rect(0,roof,canvas.width,lineThickness);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
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

function revGrav(){
    ball.grav *= -1
    console.log('grav');
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    gravity();
    floorCollision();
    roofCollision();
    gravityActing();
    moveBall();
    
    drawSquare();
    drawBall();
    drawRoof();
    drawFloor();

    requestAnimationFrame(draw);
}

draw();