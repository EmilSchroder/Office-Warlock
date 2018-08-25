var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let startTime = new Date()

let grav = 50;
let square = {
    sideLength: 10,
    falling: true
};

canvas.addEventListener("click", (event) => {
    square.x = event.offsetX;
    square.y = event.offsetY;
    startTime = new Date();

    draw();
})

function gravity(){
    let endTime = new Date();
    let timeDelta = (endTime - startTime)/1000;

    square.y += 0.5*grav*timeDelta*timeDelta;



}

function bottomCollision(){
    if (square.y > canvas.height - (square.sideLength*2) - 100){
        square.y = canvas.height - (square.sideLength*2) - 100;        
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
    ctx.rect(0,canvas.height - 115,canvas.width,3);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    gravity();
    bottomCollision();
    drawFloor();
    drawSquare();
    

    requestAnimationFrame(draw);
}

drawFloor();