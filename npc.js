
let floor = canvas.height - 115;
let roof = canvas.height - 315;
let lineThickness = 3;
let curvature = 1;

let npc = {
    rad: 10,
    x: 100,
    y: floor - 10,
    grav: 10,
    falling: false,
    invisible: false
}

function NPC(name, x, y, move){
    this.name = name;
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 10;
    this.move = move;
}

module.exports = {
    NPC: NPC
}