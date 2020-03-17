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

class Background {
  constructor() {
    this.displacement = 0;
    this.terrainLevels = 4;
    this.terrainDistance = windowHeight / this.terrainLevels;
    this.skyGradient = createImage(windowWidth, windowHeight);
    this.mountains = createImage(canvasW + 1, windowHeight);
    this.plains = createImage(windowWidth, windowHeight);
    let a = setTimeout(function() {
      bg.setupSkyGradient();
    }, 0);
    let b = setTimeout(function() {
      bg.setupMountains();
    }, 0);
    //this.setupPlains();

    //setTimeout(function() {
    //  bg.setupPlains();
    //}, 20);
  }
  draw() {
    //if (this.displacement > windowWidth) this.displacement = 0;
    this.displacement++;
    image(this.skyGradient, 0, 0, windowWidth, windowHeight);
    image(this.mountains, -this.displacement % canvasW, 0);
    image(this.mountains, (-this.displacement % canvasW) + canvasW, 0);
  }
  setupSkyGradient() {
    this.skyGradient.loadPixels();
    let n;
    for (let i = 0; i < windowWidth; i++) {
      for (let j = 0; j < windowHeight; j++) {
        n = noise(
          i / 100 +
            100 * sin((Math.PI * (j / windowHeight + i / windowWidth)) / 100),
          j / 100 +
            100 * cos((Math.PI * (j / windowHeight + i / windowWidth)) / 100)
        );

        if (n / 4 + random(j / windowHeight, 0.3 + j / windowHeight) > 0.8) {
          //if (n > 0.5) {
          this.skyGradient.set(i, j, color(138, 93, 128));
          /*this.skyGradient.set(2 * i + 1, 2 * j, color(163, 102, 135));
          this.skyGradient.set(2 * i, 2 * j + 1, color(163, 102, 135));
          this.skyGradient.set(2 * i + 1, 2 * j + 1, color(163, 102, 135));*/
        } else if (
          n / 4 + random(j / windowHeight, 0.3 + j / windowHeight) >
          0.5
        ) {
          //else if (n > 0.5) {
          //if (n < 0.5) {
          this.skyGradient.set(i, j, color(153, 98, 132));
          /*this.skyGradient.set(2 * i + 1, 2 * j, color(138, 93, 128));
          this.skyGradient.set(2 * i, 2 * j + 1, color(138, 93, 128));
          this.skyGradient.set(2 * i + 1, 2 * j + 1, color(138, 93, 128));*/
        } else {
          this.skyGradient.set(i, j, color(174, 106, 138));
          /*this.skyGradient.set(2 * i + 1, 2 * j, color(174, 106, 138));
          this.skyGradient.set(2 * i, 2 * j + 1, color(174, 106, 138));
          this.skyGradient.set(2 * i + 1, 2 * j + 1, color(174, 106, 138));*/
        }
      }
    }
    this.skyGradient.updatePixels();
    makeDithered(this.skyGradient, 4);
  }

  setupMountains() {
    this.mountains.loadPixels();
    let n = random(1, 3);
    //let n = 1;
    /*for (let i = 0; i < 10; i++) {
      for (j = 0; j < windowWidth; j++) {
        //if ((random() < 0, 1))
        n = noise(
          i / 10 + sin((2 * Math.PI * j) / windowWidth),
          i / 10 + cos((2 * Math.PI * j) / windowWidth)
        );

        n *= 200;
        for (let k = n + 200; k < windowHeight; k++) {
          this.mountains.set(j, k, color(245, 199, 174));
        }
      }
    }*/
    let range = [];
    for (let i = 0; i < n; i++) {
      range.push([
        random(
          (i * canvasW) / n + canvasW / (4 * n),
          ((i + 1) * canvasW) / n - canvasW / (4 * n)
        ),
        random(canvasH / 3, (2 * canvasH) / 3)
      ]);
    }
    for (let i = 0; i < range.length; i++) {
      let depth = random(-20, 20);
      for (let j = range[i][1]; j > 0; j--) {
        for (
          let k =
            j -
            (j *
              noise(
                10 * (1 + i) + sin((2 * Math.PI * j) / range[i][1]),
                10 * (1 + i) + cos((2 * Math.PI * j) / range[i][1])
              )) /
              5;
          k > 0;
          k--
        ) {
          this.mountains.set(
            range[i][0] - k,
            canvasH - range[i][1] + j,
            color(215 + depth, 120 + depth, 132 + depth)
          );
        }
      }

      for (let j = range[i][1]; j > 0; j--) {
        for (
          let k =
            j -
            j *
              (-j / 1000 +
                noise(
                  10 * (1 + i) + sin((2 * Math.PI * j) / range[i][1]),
                  10 * (1 + i) + cos((2 * Math.PI * j) / range[i][1])
                ));
          k > -1;
          k--
        ) {
          this.mountains.set(
            range[i][0] - k / 3,
            canvasH - range[i][1] + j,
            color(103 + depth, 54 + depth, 84 + depth)
          );
        }
      }
      for (let j = range[i][1]; j > 0; j--) {
        for (
          let k =
            j -
            (j *
              noise(
                10 * (1 + i) + sin((2 * Math.PI * j) / range[i][1]),
                10 * (1 + i) + cos((2 * Math.PI * j) / range[i][1])
              )) /
              5;
          k > 0;
          k--
        ) {
          this.mountains.set(
            range[i][0] + k,
            canvasH - range[i][1] + j,
            color(103 + depth, 54 + depth, 84 + depth)
          );
        }
      }
    }

    n = random(2, 4);
    //let n = 1;
    /*for (let i = 0; i < 10; i++) {
      for (j = 0; j < windowWidth; j++) {
        //if ((random() < 0, 1))
        n = noise(
          i / 10 + sin((2 * Math.PI * j) / windowWidth),
          i / 10 + cos((2 * Math.PI * j) / windowWidth)
        );

        n *= 200;
        for (let k = n + 200; k < windowHeight; k++) {
          this.mountains.set(j, k, color(245, 199, 174));
        }
      }
    }*/
    range = [];
    for (let i = 0; i < n; i++) {
      range.push([
        random(
          (i * canvasW) / n + canvasW / (4 * n),
          ((i + 1) * canvasW) / n - canvasW / (4 * n)
        ),
        random(canvasH / 6, canvasH / 3)
      ]);
    }
    for (let i = 0; i < range.length; i++) {
      let depth = random(-10, 10);
      for (let j = range[i][1]; j > 0; j--) {
        for (
          let k =
            j -
            (j *
              noise(
                10 * (1 + i) + sin((2 * Math.PI * j) / range[i][1]),
                10 * (1 + i) + cos((2 * Math.PI * j) / range[i][1])
              )) /
              5;
          k > 0;
          k--
        ) {
          this.mountains.set(
            range[i][0] - k,
            canvasH - range[i][1] + j,
            color(81 + depth, 46 + depth, 71 + depth)
          );
        }
      }

      for (let j = range[i][1]; j > 0; j--) {
        for (
          let k =
            j -
            j *
              (-j / 1000 +
                noise(
                  10 * (1 + i) + sin((2 * Math.PI * j) / range[i][1]),
                  10 * (1 + i) + cos((2 * Math.PI * j) / range[i][1])
                ));
          k > -1;
          k--
        ) {
          this.mountains.set(
            range[i][0] - k / 3,
            canvasH - range[i][1] + j,
            color(48 + depth, 33 + depth, 54 + depth)
          );
        }
      }
      for (let j = range[i][1]; j > 0; j--) {
        for (
          let k =
            j -
            (j *
              noise(
                10 * (1 + i) + sin((2 * Math.PI * j) / range[i][1]),
                10 * (1 + i) + cos((2 * Math.PI * j) / range[i][1])
              )) /
              5;
          k > 0;
          k--
        ) {
          this.mountains.set(
            range[i][0] + k,
            canvasH - range[i][1] + j,
            color(48 + depth, 33 + depth, 54 + depth)
          );
        }
      }
    }
    this.mountains.updatePixels();
    //makeDithered(this.mountains, 4);
  }
  setupPlains() {
    //here plains
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
