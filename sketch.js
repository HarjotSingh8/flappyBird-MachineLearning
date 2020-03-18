let dist;
let level;
let scoreCounter = 0;
let canvasW;
let canvasH;
let pipeImg;
let pipeImgRev;
let bg;
let flag = false;
let generationLimit = 10;
function setup() {
  canvasW = windowWidth;
  canvasH = windowHeight - 50;
  createCanvas(canvasW, canvasH);
  frameRate(60);
  setupImages();
  dist = 0;
  level = new Level();
  bg = new Background();
  tempml = new MachineLearning(4, 1, [8, 8, 4, 2]);
  strokeWeight(1);
  //level.draw();
  initBirds();
  document.getElementById("score").innerHTML = score;
  document.getElementById("generation").innerHTML = generation;
  //draw();
  //noLoop();
  //while (true) {
  //  draw();
  //}
}

function draw() {
  background(174, 106, 138);
  if (aliveBirds == 0 && birdsInitialised == true) {
    nextGenerationBirds();
  }
  if (score > generationLimit) {
    generationLimit += 10;
    nextGenerationBirds();
  }
  fill(255);
  bg.draw();
  level.draw();
  fill(100);
  if (birdsInitialised) {
    showBirds();
  }
  flag = false;
  document.getElementById("alive").innerHTML = aliveBirds;
  //image(pipeImgRev, 0, 0);
}
