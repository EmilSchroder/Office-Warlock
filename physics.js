var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let startTime = new Date()

//define ball
let ballRad = 5;
let x = 20;
let y = canvas.height - (ballRad*2) - 100;
let inity = y;
let ballVel = 0;
let vel;
let up = false;
let grav = 5;

var keymap ={
    "a": false,
    "d": false,
    "s": false,
    "w": false
};

//Listen for button pushes
document.addEventListener("keydown",keyHandler, false);
document.addEventListener("keyup", keyHandler, false);

//What happens when key pushed or released
function keyHandler(evt){
    keymap[evt.key] = (evt.type == 'keydown');
}




//Movement parameters
function isLeft(){
    if (keymap["a"] && x - ballRad > 0){
        x -= 2;
    }
}

function isRight(){
    if (keymap["d"] && x + ballRad < canvas.width){
        x += 2;
    }
}


function revGrav(){
    grav = -grav;
    vel = -vel;
    if (grav<0 && dy < 1){
        dy += 10
    } else if (grav>0 && dy < 1){
        dy -= 10
    }
    // startTime = new Date();
}
// function isReversed(){
//     if (keymap["s"]){
//         grav = -grav;
//         startTime = new Date();
//     }
// }

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function applyGravity(){
    //time will have to be the differences of dates
    let endTime = new Date();
    let timeDelta = (endTime - startTime)/1000;
    
    if(!up && grav>0){        
        
        dy =  0.5*grav*timeDelta*timeDelta;
        vel = dy/timeDelta;

    } else if (up && grav>0) {

        dy =  -vel + 0.5*grav*timeDelta*timeDelta;
    
    } else if (up && grav < 0){

        dy =  0.5*grav*timeDelta*timeDelta;
        vel = dy/timeDelta;

    } else if (!up && grav < 0){

        dy =  -vel + 0.5*grav*timeDelta*timeDelta;

    }


}

function bottomCollision(){
    if (y > canvas.height - (ballRad*2) - 100){
        y = canvas.height - (ballRad*2) - 100;
        up = true;
        vel *= 0.8
        startTime = new Date();
        
    }
}

function topCollision(){
    if (y < (ballRad*2) + 100){
        y = (ballRad*2) + 100;
        up = false;
        vel *= 0.8
        startTime = new Date(); 
    }
}

// function bounceHeight(){
//     if(dy > 0 && up){
//         up = false;
//         startTime = new Date();
//     }
// }

function moveBall(){

    isLeft()
    isRight()
    // isReversed()
    y = y + dy;
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    applyGravity();
    bottomCollision();
    topCollision();
    moveBall();
    drawBall();
    

    requestAnimationFrame(draw);
}

draw();