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

    if(up){
        vel = 0.99*vel;
        dy =  -vel + 0.5*grav*timeDelta*timeDelta;
        

        // vel = (Math.sqrt(2*grav*(y-inity)));
        // dy = -1//-vel*timeDelta + Math.sqrt(2*grav*(y-inity))
    } else {
        dy =  0.5*grav*timeDelta*timeDelta;
        vel = dy/timeDelta;
        maxvel = vel;
        // vel = (Math.sqrt(2*grav*(y-inity)));
    }
    

}

function bottomCollision(){
    if (y > canvas.height - (ballRad*2) - 100){
        up = true;
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
    y = y + dy;
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    applyGravity();
    bottomCollision();
    moveBall();
    drawBall();
    

    requestAnimationFrame(draw);
}

draw();