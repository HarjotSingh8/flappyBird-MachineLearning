let birds = [];
let speed = 10;
let birdWidth = 10;
let birdHeight = 10;
let aliveBirds = numChildren;
let birdsInitialised = false;
let sensorLength = 15;
let birdPositionX = 100;
let gravity = 0.4;
let score = 0;
function initBirds() {
  for (let i = 0; i < numChildren; i++) {
    birds.push(new Bird());
  }
  birdsInitialised = true;
  aliveBirds = numChildren;
  frameCounter = 0;
}

function showBirds() {
  for (let i = 0; i < birds.length; i++) {
    if (birds[i].active) birds[i].updateBird();

    if (birds[i].active) birds[i].draw();
  }
}

function resetBirds() {
  birdsInitialised = false;
  for (let i = 0; i < birds.length; i++) {
    birds[i].reset();
  }
  birdsInitialised = true;
}
function nextGenerationBirds() {
  aliveBirds = numChildren;
  score = 0;
  document.getElementById("score").innerHTML = score;
  level = new Level();
  console.log("new generation");
  nextGeneration();
  resetBirds();
}

class Bird {
  constructor() {
    this.pos = canvasH / 2;
    this.speed = 0;
    this.sensors = [];
    this.active = true;
    this.ml = new MachineLearning(3, 1, [8, 8, 4, 2]);
    this.distance = 0;
    children.push(this.ml);
  }
  draw() {
    ellipse(birdPositionX, this.pos, birdWidth, birdHeight);
  }
  updateBird() {
    this.distance++;
    this.pos += this.speed;
    this.speed += gravity;
    let output = this.ml.process([
      //this.pos,
      //canvasH - this.pos,
      //this.speed,
      level.pipes[0].x - birdPositionX,
      //level.pipes[0].y - this.pos
      level.pipes[0].y - (this.pos - birdHeight / 2),
      pipeOpening + level.pipes[0].y - (this.pos + birdHeight / 2)
    ]);
    if (output[0] > 0) this.jump();
    this.checkColl();
  }
  updateSensors() {
    //implement this
  }
  jump() {
    this.speed = -10;
  }
  reset() {
    //implement this
    this.active = true;
    this.pos = canvasH / 2;
    this.speed = 0;
    this.distance = 0;
  }
  checkColl() {
    //implement this
    if (this.pos > canvasH - birdHeight / 2) {
      if (this.active) {
        this.active = false;
        aliveBirds--;
      }
      //dead
    } else if (this.pos < 0 + birdHeight / 2) {
      if (this.active) {
        this.active = false;
        aliveBirds--;
      }
    } else if (
      level.pipes[0].x < birdPositionX + birdWidth / 2 &&
      level.pipes[0].x + pipeWidth > birdPositionX - birdWidth / 2 &&
      (level.pipes[0].y > this.pos - birdHeight / 2 ||
        pipeOpening + level.pipes[0].y < this.pos + birdHeight / 2)
    ) {
      if (this.active) {
        this.active = false;
        aliveBirds--;
      }
    }
    if (this.active == false) {
      if (this.pos > level.pipes[0].y + pipeOpening)
        this.distance -= Math.sqrt(this.pos - level.pipes[0].y - pipeOpening);
      else {
        this.distance -= Math.sqrt(level.pipes[0].y + pipeOpening - this.pos);
      }
    }
  }
  resetFitness() {
    this.distance = 0;
  }
}

function showDinosaurs() {
  noStroke();
  fill(0, 0, (i * 255) / cars.length);
  for (var i = 0; i < dinosaurs.length; i++) {
    if (cars[i].active) {
      cars[i].updateCar();
      ellipse(cars[i].pos.x, cars[i].pos.y, 5, 5);
    }
  }
}

function checkIntersection(v1, v2, v3, v4) {
  let x1 = v1.x;
  let y1 = v1.y;
  let x2 = v2.x;
  let y2 = v2.y;
  let x3 = v3.x;
  let y3 = v3.y;
  let x4 = v4.x;
  let y4 = v4.y;

  var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denominator != 0) {
    //Parallel Lines if denominator=0
    var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      //the ray hit a line
      //var destX = x1+t*(x2-x1)
      //var destY = y1+t*(y2-y1)
      return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
    }
  }
  return false;
}

function distance(v1, v2) {
  let a = v1.x - v2.x;
  let b = v1.y - v2.y;
  return Math.sqrt(a * a + b * b);
}
