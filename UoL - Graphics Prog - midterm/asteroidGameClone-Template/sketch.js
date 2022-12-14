var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200, 800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width / 2, height * 2.9);
  atmosphereSize = new createVector(width * 3, width * 3);
  earthLoc = new createVector(width / 2, height * 3.1);
  earthSize = new createVector(width * 3, width * 3);



}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();


  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth() {
  noStroke();
  //draw atmosphere
  fill(0, 0, 255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  //draw earth
  fill(100, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {

  if (!Array.isArray(asteroids)) {
    // The asteroids argument is not an array, so we can't iterate through it
    return;
  }
  //spaceship-2-asteroid collisions

  for (const asteroid of asteroids) {
    // Check if the spaceship is colliding with the asteroid
    if (isInside(spaceship.loc, spaceship.size, asteroid.loc, asteroid.size)) {
      gameOver();
    }
  }



}
//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {
  // Distance between the centers of the circles
  const dx = locA.x - locB.x;
  const dy = locA.y - locB.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const diameterSum = sizeA.x + sizeB.x; // Sum diameters of the circles

  if (distance < diameterSum) {
    return true; // The circles are colliding
  } else {
    return false; // The circles are not colliding
  }
}

//////////////////////////////////////////////////
function keyPressed() {
  if (keyIsPressed && keyCode === 32) { // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky() {
  push();
  while (starLocs.length < 300) {
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i = 0; i < starLocs.length; i++) {
    rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
  pop();
}