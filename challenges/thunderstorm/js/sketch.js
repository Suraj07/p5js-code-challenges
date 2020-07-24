var drops = [];
var xoff = 0.01;
var xdir = 1;
var img;

function preload() {
  img = loadImage('background_image.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 700; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  background(35);

  image(img, 0, 0, windowWidth, windowHeight);

  if(xoff > 10 || xoff < -10) {
    xdir = xdir * -1;
  }

  xoff = xoff + (0.015 * xdir);
  var noiseVal = noise(xoff);
  var noiseOff = map(noiseVal, 0, 1, -0.5, 0.5);
  lightning();
  for (var i = 0; i < drops.length; i++) {
    drops[i].fall(noiseOff * 25);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function lightning() {
  if(random(0, 1) > 0.99) {
    background(255);
  }
}