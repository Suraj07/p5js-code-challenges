function Drop() {
  this.x = random(-300, windowWidth + 300);
  this.y = random(-500, -50);
  this.z = random(0, 20);
  this.len = map(this.z, 0, 20, 10, 18);
  this.yspeed = map(this.z, 0, 20, 1, 20);

  this.fall = function(windSpeed) {
    var wind = map(this.z, 0, 20, windSpeed * 0.2, windSpeed);
    this.y = this.y + this.yspeed;
    this.x = this.x + wind;
    var grav = map(this.z, 0, 20, 0.15, 0.2);
    this.yspeed = this.yspeed + grav;

    if (this.y > height) {
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 20);
      this.x = random(-300, windowWidth + 300);
    }
    this.show(wind);
  };

  this.show = function(wind) {
    var thick = map(this.z, 0, 20, 1, 2);
    stroke(100);
    strokeWeight(thick);
    line(this.x - wind, this.y, this.x, this.y + this.len);
  };
}
