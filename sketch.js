let alienImage;  // 23 * 16
let invaders;
let shooterImage;
let debriImage;
let player;
let allDebris = [];
let gameOver = false;
let canvas;
let canvasEl;
let loading = 10;
let loadingPlus = true;
let alienImages = [];
let particles = [];

// how hard do you want to make it? :D
const NUM_DEBRIS = 25;

// const provider = passport.connectEvm();
// const accounts = await provider.request({ method: "eth_requestAccounts" });

function preload() {
  for (let i = 1; i < 3; i++) {
    // nf() formats the number to be 4 digits using zeros for padding:
    alienImages.push(loadImage(`assets/greenalien-${i}.png`));
  }
  // alienImage = loadImage("greenalien.png");
  shooterImage = loadImage('assets/redspaceship.png');
  debriImage = loadImage('assets/debri.png')
  // shooterImage = loadImage('stackship.svg');
}

function setup() {
  canvasEl = document.getElementById('sketch-holder')
  canvas = createCanvas(canvasEl.offsetWidth, 400);
  canvas.style('display', 'block');
  // noStroke();
  // rectMode(CENTER);
  canvas.parent('sketch-holder');
  // createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9);
  console.log(alienImages)
  invaders = new Invaders(alienImage, alienImages, 4);
  player = new Player(shooterImage);

  // create the debris objects
  for (let i = 0; i < NUM_DEBRIS; i++) {
    if (allDebris.length < NUM_DEBRIS) {
      allDebris.push(new Debris(debriImage));
    }
  }
}

function showGameOver() {
  background(0);
  gameOver = true;
  fill(255);
  let gameOverT = "GAME OVER! click to continue. Your score was " + player.score;
  textSize(16);
  text(gameOverT, width / 2 - textWidth(gameOverT) / 2, height / 2);
}

function connectToStart() {
  background(100);
  fill(255);
  textSize(16);
  let startText = "GAME will start after succesfully authenticating. Click on Connect passport"
  let textXpos = width / 2 - textWidth(startText) / 2

  if (window.siconnecting) {
    startText = "Connecting ..."
    textXpos = width / 2 - textWidth(startText) / 2
    if (loadingPlus === true && loading == 100) {
      loadingPlus = false
    } else if (loading == 10 && loadingPlus === false) {
      loadingPlus = true
    }
    if (loadingPlus) {
      loading++;
    } else {
      loading--;
    }
    fill(loading + 150)
  }
  text(startText, textXpos, height / 2);
}

function draw() {
  if (window?.userProfile?.email) {
    document.getElementById('btn-passport').hidden = true;
    document.getElementById('btn-logout').hidden = false;
    background(0);
    player.update();
    player.draw();
    player.drawInfo();
    // player.drawLives();
    updateDebrisAndCheckCollisions();
    invaders.update(player);
    invaders.draw();
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].display();
      
      // Remove particles that are off-screen
      if (particles[i].isFinished()) {
        particles.splice(i, 1);
      }
    }

    if (player.lives == 0) {
      showGameOver();
    }
  } else {
    connectToStart();
    document.getElementById('btn-passport').hidden = false;
    document.getElementById('btn-logout').hidden = true;

  }
}

function mousePressed() {
  if (gameOver === true) {
    gameOver = false;
    setup();
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

  if (keyCode === UP_ARROW) {
    player.moveUp()
  } else if (keyCode == DOWN_ARROW) {
    player.moveDown();
  }
}

function updateDebrisAndCheckCollisions() {
  for (let i = 0; i < allDebris.length; i++) {
    allDebris[i].update();
    allDebris[i].display();

    if (allDebris[i].hasHitPlayer(player)) {
      allDebris.splice(i, 1);
      player.loseLive();
      break;
    }
  }
}
function windowResized() {
  // centerCanvas();
  resizeCanvas(canvasEl.offsetWidth, 400)
  background(0)
}


