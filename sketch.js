let alienImage;  // 23 * 16
let invaders;
let shooterImage;
let player;
let allDebris = [];
let gameOver = false;
let canvas;

// how hard do you want to make it? :D
const NUM_DEBRIS = 30;

// const provider = passport.connectEvm();
// const accounts = await provider.request({ method: "eth_requestAccounts" });

function preload() {
  alienImage = loadImage("invader1.png");
  shooterImage = loadImage('player.png');
  // shooterImage = loadImage('stackship.svg');
}

function setup() {
  canvas = createCanvas(720,400);
  canvas.style('display', 'block');
  // noStroke();
  // rectMode(CENTER);
  canvas.parent('sketch-holder');
  // createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9);
  invaders = new Invaders(alienImage, 4);
  player = new Player(shooterImage);

  // create the debris objects
  for (let i = 0; i < NUM_DEBRIS; i++) {
    if(allDebris.length < NUM_DEBRIS){
      allDebris.push(new Debris());
    }
  }


}

function showGameOver(){
  // createCanvas(720, 400);
  background(0);
  // noStroke();
  // rectMode(CENTER);
  gameOver = true;
  fill(255);
  text("GAME OVER! click to continue.", width/2 - width/8, height/2);
  player.drawScore();
}

function draw() {
  background(0);
  player.update();
  player.draw();
  player.drawScore();
  player.drawLives();

  updateDebrisAndCheckCollisions();
  invaders.update(player);

  invaders.draw();

  

  if (player.lives == 0) {
    showGameOver();
  }
  

}

function mousePressed() {
  if(gameOver === true){
    setup();
    player.lives = 3;
    gameOver = false;
  }
 
  
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
      
      if (allDebris[i].hasHitPlayer(player)) {
          console.log("hit player")
          allDebris.splice(i, 0);
          player.loseLive();
          break;
      } 
    }
  }



