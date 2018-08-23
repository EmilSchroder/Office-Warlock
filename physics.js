var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let startTime = new Date()

//define ball
let ballRad = 5;
let x = canvas.width/2;
let y = canvas.height/2;
let inity = y;
let ballVel = 0;
let vel;
let up = false;

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

function isReversed(grav){
    if (keymap["s"]){
        grav = -grav;
    }
}

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
    let grav = 5;
    let timeDelta = (endTime - startTime)/1000;
    isReversed(grav)
    if(up){
        vel = 0.99*vel;
        dy =  -vel + 0.5*grav*timeDelta*timeDelta;
        

        // vel = (Math.sqrt(2*grav*(y-inity)));
        // dy = -1//-vel*timeDelta + Math.sqrt(2*grav*(y-inity))
    } else {
        dy =  0.5*grav*timeDelta*timeDelta;
        vel = dy/timeDelta;
        // vel = (Math.sqrt(2*grav*(y-inity)));
    }
    

}

function bottomCollision(){
    if (y > canvas.height - (ballRad*2) - 100){
        up = true;
        startTime = new Date();
        
    }
}

function topCollision(){
    if (y < (ballRad*2) + 100){
        up = false;
        startTime = new Date();
        
    }
}

function bounceHeight(){
    if(y >= canvas.height){
        up = false;
        startTime = new Date();
    }
}

function moveBall(){

    isLeft()
    isRight()
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