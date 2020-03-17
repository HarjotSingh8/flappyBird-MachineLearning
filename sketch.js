let dist;
let level;
let scoreCounter = 0;
let canvasW;
let canvasH;
let pipeImg;
let pipeImgRev;
function setup() {
  canvasW = windowWidth;
  canvasH = windowHeight - 50;
  createCanvas(canvasW, canvasH);
  frameRate(60);
  setupImages();
  dist = 0;
  level = new Level();
  tempml = new MachineLearning(3, 1, [8, 8, 4, 2]);
  strokeWeight(1);
  //level.draw();
  initBirds();
  document.getElementById("score").innerHTML = score;
  //draw();
  //noLoop();
  //while (true) {
  //  draw();
  //}
}

function draw() {
  background(150, 150, 210);
  if (aliveBirds == 0 && birdsInitialised == true) {
    nextGenerationBirds();
  }
  fill(255);
  level.draw();
  fill(100);
  if (birdsInitialised) {
    showBirds();
  }
  //image(pipeImgRev, 0, 0);
}
