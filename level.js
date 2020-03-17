let pipeOpening = 200; //height of opening in between pipes
let pipeWidth = 50;
let horizontalPipeDistance = 400;
/*
 * obstacle type contains data about types of obstacles
 * this contains width of obstacle, height of obstacle
 * image of obstacle if any
 */
class Level {
  /*
   * This class contains grid data
   */
  constructor() {
    this.numPipes = canvasW / horizontalPipeDistance + 1;
    this.pipes = [];
    for (let i = 0; i < this.numPipes; i++) {
      this.pipes.push(
        new Pipe(Math.random(), canvasW + horizontalPipeDistance * i)
      );
    }
  }
  draw() {
    stroke(200);
    if (this.temp) {
      this.temp.draw();
      if (this.temp.x + pipeWidth < 0) {
        this.temp.x =
          this.pipes[this.pipes.length - 1].x + horizontalPipeDistance;
        this.pipes.push(
          new Pipe(
            Math.random(),
            this.pipes[this.pipes.length - 1].x + horizontalPipeDistance
          )
        );
        this.temp = false;
      }
    }
    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].draw();
    }
    if (this.pipes[0].x + pipeWidth + birdWidth / 2 < birdPositionX) {
      this.temp = this.pipes[0];
      console.log(aliveBirds);
      score++;
      document.getElementById("score").innerHTML = score;
      this.pipes.shift();
    }
    rect(20, 10, 20, 20);
  }
}

class Pipe {
  /*
   * This class is used for boxes in the grid
   */
  constructor(input, x) {
    this.x = x;
    this.y = canvasH / 10 + input * (canvasH - pipeOpening) * 0.8;
  }
  draw() {
    /*rect(this.x, 0, pipeWidth, this.y);
    rect(
      this.x,
      this.y + pipeOpening,
      pipeWidth,
      canvasH - pipeOpening - this.y
    );*/
    image(pipeImg, this.x - 5, this.y - windowHeight);
    image(pipeImg, this.x - 5, this.y + pipeOpening);
    this.x -= 4;
  }
}

function setupImages() {
  setupPipeImg();
}

function setupPipeImg() {
  pipeImg = createImage(pipeWidth + 10, windowHeight);
  pipeImg.loadPixels();
  let r = 129,
    g = 163,
    b = 90;
  let i = 5;
  let k = 0;
  //for (let i = 5; i < pipeWidth + 5; i++) {
  while (g + 4 * i < 255) {
    for (let j = 0; j < windowHeight; j++) {
      pipeImg.set(i, j, color(r + 3.8 * i, g + 4 * i, b + 2 * i));
    }
    i++;
  }
  r += 3.8 * i;
  g += 4 * i;
  b += 2 * i;
  while (i + k < pipeWidth + 5) {
    for (let j = 0; j < windowHeight; j++) {
      pipeImg.set(i + k, j, color(r - 3.8 * k, g - 4 * k, b - 2 * k));
    }
    k++;
  }
  for (i = 5; i < 8; i++) {
    for (j = 0; j < windowHeight; j++) {
      pipeImg.set(i, j, color(90, 55, 70));
    }
  }
  for (i = pipeWidth + 2; i < pipeWidth + 5; i++) {
    for (j = 0; j < windowHeight; j++) {
      pipeImg.set(i, j, color(90, 55, 70));
    }
  }

  r = 149;
  g = 183;
  b = 100;
  i = 0;
  while (g + 4 * i < 255) {
    for (j = 0; j < 30; j++) {
      pipeImg.set(i, j, color(r + 3.8 * i, g + 4 * i, b + 2 * i));
      pipeImg.set(
        i,
        windowHeight - j,
        color(r + 3.8 * i, g + 4 * i, b + 2 * i)
      );
    }
    i++;
  }
  r += 3.8 * i;
  g += 4 * i;
  b += 2 * i;
  k = 0;
  while (i + k < pipeWidth + 10) {
    for (let j = 0; j < 30; j++) {
      pipeImg.set(i + k, j, color(r - 3.8 * k, g - 4 * k, b - 2 * k));
      pipeImg.set(
        i + k,
        windowHeight - j,
        color(r - 3.8 * k, g - 4 * k, b - 2 * k)
      );
    }
    k++;
  }
  for (i = 0; i < pipeWidth + 10; i++) {
    for (j = 0; j < 3; j++) {
      pipeImg.set(i, j, color(90, 55, 70));
      pipeImg.set(i, windowHeight - j, color(90, 55, 70));
    }
  }
  for (i = 0; i < pipeWidth + 10; i++) {
    for (j = 27; j < 30; j++) {
      pipeImg.set(i, j, color(90, 55, 70));
      pipeImg.set(i, windowHeight - j, color(90, 55, 70));
    }
  }
  for (i = pipeWidth + 7; i < pipeWidth + 10; i++) {
    for (j = 0; j < 30; j++) {
      pipeImg.set(i, j, color(90, 55, 70));
      pipeImg.set(i, windowHeight - j, color(90, 55, 70));
    }
  }
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 30; j++) {
      pipeImg.set(i, j, color(90, 55, 70));
      pipeImg.set(i, windowHeight - j, color(90, 55, 70));
    }
  }
  pipeImg.updatePixels();
}
