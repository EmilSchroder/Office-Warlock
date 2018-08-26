var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


let startTime = new Date()

let floor = canvas.height - 115;
let NPCfirstFloor = floor-50;
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
    invisible: false,
    direction: true,
    speed: 5
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
    if (keymap["s"]){
        spellPosition = (spellPosition+1)%3
        document.getElementsByClassName('spell')[spellPosition].style.border = '3px solid green'
        document.getElementsByClassName('spell')[(spellPosition+2)%3].style.border = '1px solid black'
    }
}

function spellChangeDown(){
    if (keymap["w"]){
        spellPosition = (spellPosition+2)%3
        document.getElementsByClassName('spell')[spellPosition].style.border = '3px solid green'
        document.getElementsByClassName('spell')[(spellPosition+1)%3].style.border = '1px solid black'
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
        ball.direction = false;
        ball.x -= ball.speed;
    }
}

function isRight(){
    if (keymap["d"] && ball.x + ball.rad < canvas.width){
        ball.direction = true;
        ball.x += ball.speed;
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
/////////////////HANDLING NPC'S///////////////////////////
let greg = new NPC("greg", NPCfirstFloor, 200)
let sally = new NPC("sally", NPCfirstFloor, 500)
let steve = new NPC("steve", NPCfirstFloor, 300)
let mary = new NPC("mary", NPCfirstFloor, 400)
let npcArr = [greg, sally, steve, mary]


function NPC(name, y, x, maxX, minX){
    this.name = name;
    this.x = x;
    this.maxX = this.x + 50 + Math.random()*10;
    this.minX = this.x - 50
    this.y = y;
    this.height = 50;
    this.width = 10;
    this.speed = 2;
    this.direction = false;
}

function parambulate(npc, dir, x, v){

    isWithinBounds(npc, dir, x)
    return npcSpeed(npc, v)

}

function npcSpeed(npc, v){
        if (npc.direction){
        return v;
    } else {
        return -v
    }
}

function isWithinBounds(npc, dir, x){
    if(x > npc.maxX || x < npc.minX){
        npc.direction = (!dir)
    }
}

function moveNPC(arr){ 
    arr.forEach(npc => {
        npc.x += parambulate(npc, npc.direction, npc.x, npc.speed)
    })
}

function NPCplayerCollision(arr){
    arr.forEach(npc => {
            if(ball.x >= npc.x && ball.x < npc.x+npc.width && ball.y >= npc.y){
                if(ball.direction){
                    ball.x -= ball.speed
                } else {
                    ball.x += ball.speed
                }
    }
    })
}

function NPCboxCollision(arr){
    // arr.forEach(npc => {
    //     if(npc.x >= square.x && npc.x < square.x+square.sideLength){
    //         npc.maxX = square.x - square.sideLength
    //     } else {
    //         npc.maxX = npc.minX + 50 + Math.random()*10;
    //     }

            
    //     })
}


function drawNPC(){
   
    moveNPC(npcArr);
    npcArr.forEach(npc => {
        ctx.beginPath();    
        ctx.rect(npc.x,npc.y,npc.width,npc.height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    })

}



////////////////////////////////////////////////////////////


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
    setTimeout(()=>{
        ball.grav *= -1
    }, 1000)
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    gravity();
    floorCollision();
    roofCollision();
    NPCplayerCollision(npcArr);
    NPCboxCollision(npcArr);
    gravityActing();
    moveBall();


    drawNPC();
    drawSquare();
    drawBall();
    drawRoof();
    drawFloor();

    requestAnimationFrame(draw);
}

draw();