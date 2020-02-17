let dist;
let level;
let scoreCounter = 0;
let canvasW;
let canvasH;
function setup() {
  canvasW = windowWidth;
  canvasH = windowHeight - 50;
  createCanvas(canvasW, canvasH);
  frameRate(30);
  dist = 0;
  level = new Level();
  tempml = new MachineLearning(2, 1, [16, 16, 16, 8, 4, 2]);
  strokeWeight(1);
  //level.draw();
  initBirds();
  document.getElementById("score").innerHTML = score;
}

function draw() {
  background(150, 150, 210);
  scoreCounter++;
  if (aliveBirds == 0 && birdsInitialised == true) {
    nextGenerationBirds();
    scoreCounter = 0;
  }
  fill(255);
  level.draw();
  fill(100);
  if (birdsInitialised) {
    showBirds();
  }
}
