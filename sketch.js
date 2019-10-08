function preload() {
}

var balls = [];
var cambiatesto = 0;

var cambiocolore = false;
var vinto = false;

var jerrywin = false;
var jerrygnam = 0;

function setup() {

  createCanvas(windowWidth, windowHeight);
  textFont('Futura');
  angleMode(DEGREES);

  var ballNumber = 8;


  for (var i = 0; i < ballNumber; i++) {


    var myBall = new Ball(random(400, width), random(300, height), 50);

    myBall.diameter = 80;
    myBall.speed = 4;
    myBall.color = color(255);
    balls.push(myBall);
  }
}

function mousePressed() {
  for (var j = 0; j < balls.length; j++){
    if(cambiocolore == false){
    balls[j].click();
  }
  else if(cambiocolore == true){
    balls[j].click();
  }
}
}

function testovinto(){
  if (vinto == false){
    textSize(40);
    fill(255);
    text('GET 4 BALLS BEFORE JERRY! (Jerry is the duck)', windowWidth/25, windowHeight/10);
  }
  else if (vinto == true){
    fill(color('lightgreen'));
    rect(0,0,windowWidth, windowHeight);

    textSize(80);
    fill(color(255));
    text('YOU WIN!', (windowWidth/3)+200, windowHeight/2);
    textSize(60);
    text('You suck Jerry!', (windowWidth/3)+225, (windowHeight/2)+75);

    translate(-300,-600);
    scale(2.5);
    rotate(20);
    jerry();
  }
}

function testoperso(){
  fill(color('red'));
  rect(0,0,windowWidth, windowHeight);

  textSize(80);
  fill(color(255));
  text('YOU LOSE!', (windowWidth/3), windowHeight/2);
  textSize(60);
  text('LEAVE ME ALONE JERRY!', (windowWidth/3), (windowHeight/2)+75);

  translate(-300,-600);
  scale(2.5);
  rotate(20);
  jerry();
}

function jerry(){
  fill(color('yellow'));
  ellipse(300, 400,140,100);
  ellipse(300, 335,95,80);
  ellipse(240, 400,30,40);
  ellipse(360, 400,30,40);
  fill(color(0));
  ellipse(275, 325,10,20);
  ellipse(325, 325,10,20);
  fill(color('orange'));
  ellipse(300, 335,30,10);
  fill(color(255));
  ellipse(272, 320,5,5);
  ellipse(328, 320,5,5);
}

function draw() {
  background(0);
  cambiatesto = 0;

  jerry();

  for (var j = 0; j < balls.length; j++) {

    balls[j].move();
    balls[j].display();
    balls[j].jerryball();



    if(balls[j].cambiocolore == true){cambiatesto++};
    if(balls[j].jerrywin == true){jerrygnam++}

    if(cambiatesto < 4 && jerrygnam < 1000){
    push();
    vinto = false;
    testovinto();
    pop();
    }
    else if(cambiatesto >= 4 && jerrygnam < 1000){
    push();
    vinto = true;
    jerrygnam = 0;
    testovinto();
    pop();
    }
    else if(jerrygnam > 1000){
    push();
    vinto = false;
    testoperso();
    pop();
    }
  }
}

function Ball(_x, _y, _diameter) {

  this.x = _x;
  this.y = _y;
  this.diameter = _diameter;
  this.speed = 4;


  var yDirezione = random(1, 1.5);
  var xDirezione = random(1, 1.5);

  this.display = function() {
    noStroke()
    fill(this.color);
    ellipse(this.x, this.y, this.diameter);
  }

  this.move = function() {
    this.x += this.speed * xDirezione;
    this.y += this.speed * yDirezione;

    if (this.y > height || this.y < 0) {
      yDirezione = yDirezione * -1;
    }

    if (this.x > width || this.x < 0) {
      xDirezione = xDirezione * -1;
    }

  this.click = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 40 && cambiocolore == false) {
      this.color = color('lightgreen');
      this.cambiocolore = true;
      }
  }

  this.jerryball = function(){
    if(this.x < 328 && this.x > 240 && this.y > 320 && this.y < 400 && jerrywin == false){
      this.diameter = 0;
      this.jerrywin = true;
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
}
