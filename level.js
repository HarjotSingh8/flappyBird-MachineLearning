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
    rect(this.x, 0, pipeWidth, this.y);
    rect(
      this.x,
      this.y + pipeOpening,
      pipeWidth,
      canvasH - pipeOpening - this.y
    );
    this.x -= 4;
  }
}
