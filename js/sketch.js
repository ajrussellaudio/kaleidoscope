var numSpokes, circles = [];

function setup() {
  var canvasSize = min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  background(color("#3F362A"));
  strokeWeight(2);
  stroke(0);
  noStroke();
  var randomPosition = function() {
    return createVector(random(-width/2, width/2), random(-height/2, height/2));
  }
  var numCircles = 48;
  var colors = ["#E7450D", "#FA9D04", "#FBDE03", "#FEF596"]
  for (var i = 0; i < numCircles; i++) {
    circles.push(new Circle(randomPosition(), colors[i%colors.length]));
  }
}

function draw() {
  background(color("#3F362A"), 16);
  translate(width/2, height/2);
  var numSpokes = 6;
  for (var j = 0; j < numSpokes; j++) {
    rotate(TWO_PI / numSpokes);
    circles.forEach(function(circle) {
      circle.move();
      circle.draw();
    })  
  } 
}

var Circle = function(position, circleColor) {
  this.position = position;
  this.color = color(circleColor);
  this.speed = 0.5;
  this.moveNoise = random();
  this.setSize();
}

Circle.prototype.move = function() {
  this.moveNoise += 0.0001;
  var angle = noise(this.moveNoise) * 360;
  if(this.outOfBounds()) {
    this.speed *= -1;
  }
  this.position = this.position.add(createVector(cos(angle) * this.speed, sin(angle) * this.speed));
  this.setSize();
};

Circle.prototype.draw = function() {
  push();
  fill(this.color);
  translate(this.position.x, this.position.y);
  ellipse(0, 0, this.size.x, this.size.y);
  pop();
};

Circle.prototype.outOfBounds = function() {
  var beyondWindow = function(axis) {
    var windowBounds = { x: width, y: height };
    return abs(this.position[axis] * 2) > windowBounds[axis] + this.size[axis];
  }.bind(this);
  return ( beyondWindow("x") || beyondWindow("y") );
};

Circle.prototype.setSize = function() {
  var minAxis = min(width / height) / 2;
  var distanceFromCenter = this.position.mag() / minAxis;
  var size = lerp(minAxis/3, minAxis/2, distanceFromCenter);
  this.size = createVector(size, size);
};