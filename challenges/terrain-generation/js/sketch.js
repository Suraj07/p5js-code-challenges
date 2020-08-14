var cols, rows;
var scl = 5;
var w = 640;
var h = 360;

var flying = 0;
var river = 0;

var terrain = [];

function setup() {
  var canvas = createCanvas(w, h, WEBGL);

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);

  cols = (w + scl * 60) / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  frameRate(20);

  flying -= 0.05;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = noise(xoff, yoff);
      xoff += 0.2;
    }
    yoff += 0.15;
  }

  river += 0.01;
  var yoff = river;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = cols / 2 - 4; x < cols / 2 + 4; x++) {
      terrain[x][y] = noise(xoff, yoff);
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  background(140, 224, 255);
  translate(-135, 50);
  rotateX(PI / 3);

  noStroke();
  translate(-w / 2, -h / 2);

  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      if (x > cols / 2 - 5 && x < cols / 2 + 5) {
        fill(
          map(terrain[x][y], 0, 1, 0, 50),
          map(terrain[x][y], 0, 1, 0, 200),
          map(terrain[x][y], 0, 1, 0, 255)
        );
        vertex(x * scl, y * scl, map(terrain[x][y], 0, 1, 0, 20));
        vertex(x * scl, (y + 1) * scl, map(terrain[x][y + 1], 0, 1, 0, 20));
      } else {
        fill(
          map(terrain[x][y], 0, 1, 50, 150),
          map(terrain[x][y], 0, 1, 0, 255),
          map(terrain[x][y], 0, 1, 0, 100)
        );
        vertex(x * scl, y * scl, map(terrain[x][y], 0, 1, 0, 80));
        vertex(x * scl, (y + 1) * scl, map(terrain[x][y + 1], 0, 1, 0, 80));
      }
    }
    endShape();
  }

}
