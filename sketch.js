let alienImage;  // 23 * 16
let invaders;
let shooterImage;
let player;
let allDebris = [];

// how hard do you want to make it? :D
const NUM_DEBRIS = 50;

function preload() {
  alienImage = loadImage("invader1.png");
  shooterImage = loadImage("invader1.png");
}

function setup() {
  createCanvas(720, 400);
  noStroke();
  rectMode(CENTER);
  // createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9);
  invaders = new Invaders(alienImage, 4);
  player = new Player(shooterImage);

  // create the debris objects
  for (let i = 0; i < NUM_DEBRIS; i++) {
    allDebris.push(new Debris());
  }
}

function draw() {
  background(0);
  updateDebrisAndCheckCollisions();
 
  invaders.update(player);
  invaders.draw();

  player.update();
  player.draw();
  player.drawScore();

  if (player.lives == 0) {
    setup();
  }
  

}

function mousePressed() {
  console.log(mouseX, mouseY);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW || keyCode == 88) {
    player.moveRight();
  } else if (keyCode === LEFT_ARROW || keyCode == 90) {
    player.moveLeft();
  } else if (keyCode === 32) {
    player.shoot();
  }

  if (keyCode === UP_ARROW){
    player.moveUp()
  } else if(keyCode == DOWN_ARROW){
    player.moveDown();
  }
}

function updateDebrisAndCheckCollisions() {
    for (let i = 0; i < allDebris.length; i++) {
      allDebris[i].update();
        allDebris[i].display();
      
      if (allDebris[i].hasHitShip(player)) {
          player.respawn();
      } 
    }
  }


