class Player {
    constructor(shooterImage, imgNft1) {
        this.image = shooterImage;
        this.imgNft1 = imgNft1;
        this.x = width / 2;
        this.y = height - 30;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.bullets = [];
        this.lives = 3;
        this.maxBullets = 2;
        this.score = 0;
        this.r = 10;
        this.nft = false;
        this.gas = [];
        this.nftShown = { '1': false, '2': false };
        this.gamePaused = false;
        this.resumeCount = 0
        this.hitAlpha = 255;
        this.hitEffect = false;
        this.firstNftScore = 50;
        this.secondNftScore = 100;
    }

    showNft(tokenId) {
        if (!this.nftShown[tokenId]) {
            this.nft = true;
            this.nftShown[tokenId] = true;
            window.getData(tokenId);
        }
    }

    respawn() {
        // this.x = width / 2;
        // this.y = height - 30;
        // this.isMovingLeft = false;
        // this.isMovingRight = false;
        // this.isMovingUp = false;
        // this.isMovingDown = false;
        this.lives -= 1;
        this.hitEffect = true;
    }

    upgradeSpaceship() {
        this.image = loadImage('assets/redspaceship.png');
        this.maxBullets = 4;
    }

    // game state
    update() {
        if (this.gamePaused) return;
        if (this.isMovingRight && this.x < width - 40) {
            this.x += 1;
        } else if (this.isMovingLeft && this.x > 0) {
            this.x -= 1;
        }

        if (this.isMovingUp && this.y > 0) {
            this.y -= 1;
        } else if (this.isMovingDown && this.y < height - 30) {
            this.y += 1;
        }
        this.updateBullets();
    }
    explodeAliens(i){
        for (let p = 0; p < 10; p++) {
            particles.push(new Particle(this.bullets[i].x, this.bullets[i].y, color(0, 255, 0)))
        }
    }
    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update();
            if (this.hasHitAlien(this.bullets[i])) {
                this.explodeAliens(i);
                this.bullets.splice(i, 1);
                this.score += 10;
                break;
            } else if (this.bullets[i].isOffScreen()) {
                this.bullets.splice(i, 1);
                break;
            }
        }
    }

    pauseGame(tokenId) {
        this.gamePaused = true;
        this.showNft(tokenId);
    }

    resumeGame() {
        this.gamePaused = false;
        if (this.score >= this.secondNftScore) {
            this.upgradeSpaceship();
        }
    }

    // movement methods
    moveLeft() {
        this.isMovingRight = false;
        this.isMovingLeft = true;
    }

    moveRight() {
        this.isMovingLeft = false;
        this.isMovingRight = true;
    }

    moveUp() {
        this.isMovingUp = true;
        this.isMovingDown = false;
    }

    moveDown() {
        this.isMovingUp = false;
        this.isMovingDown = true;
    }

    shoot() {
        const bulletOffset = 5;
        if (this.bullets.length < this.maxBullets) {
            this.bullets.push(new PlayerBullet(this.x + this.r, this.y, this.playerIsUp()));

            if (this.maxBullets > 2) {
                this.bullets.push(new PlayerBullet(this.x - this.r + bulletOffset * 2, this.y, this.playerIsUp()))
            }
        }
    }

    // drawing methods
    draw() {
        image(this.image, this.x, this.y, this.r * 2, this.r * 2);
        this.drawBullets();
        this.drawGas();

        if (this.score == this.firstNftScore && !this.nftShown['1']) {
            this.gamePaused = true;
            this.pauseGame('1')
        }
        else if (this.score == 100 && !this.nftShown['2']) {
            this.gamePaused = true;
            this.pauseGame('2');
        }
        if (this.hitEffect == true) {
            console.log("hitting")
            this.drawHitEffect();
        } else {
            console.log("not hit")
        }
    }

    drawHitEffect() {
        blendMode(DIFFERENCE);
        // Set the fill color to red and adjust the alpha value
        fill(255, 0, 0, this.hitAlpha);
        // Draw a rectangle covering the entire canvas
        rect(0, 0, width, height);
        // Reset the blending mode to 'normal'
        blendMode(BLEND);
        // Reduce the alpha value over time
        this.hitAlpha -= 10;
        // Disable the hit effect when the alpha value reaches 0
        if (this.hitAlpha <= 0) {
            this.hitEffect = false;
            this.hitAlpha = 255;
        }
    }

    drawBullets() {
        for (let bullet of this.bullets) {
            bullet.draw();
        }
    }

    drawGas() {
        let blocks = 8;
        let blockW = this.r / 2;
        let blockH = this.r / 3;

        for (let i = 0; i < blocks; i++) {
            let currentW = blockW - i + 2;
            let px = this.x + blockW * 2 - currentW / 2;
            if (this.isMovingLeft === true) {
                px += 2 * i + 1;
            } else if (this.isMovingRight === true) {
                px -= 2 * i + 1;
            }

            fill(245, random(150, 220), 66);
            rect(px + random(-2, 2), this.y + this.r * 2 + i * blockH + 4 + random(-2, 2), currentW, blockH);
        }
    }

    drawLives() {
        for (let i = 0; i < this.lives; i++) {
            image(this.image, width - (i + 1) * 30, 10, this.r * 2, this.r * 2);
        }
    }

    drawNfts(){
        for (let i = 0; i < window.nfts.length; i++) {
            // console.log("NFTSSS", window.nfts[i]);
            if(window.nfts[i]?.name === "Level 1 Badge"){
                let nft_text = "NFTS: ";
                let nft_text_w = textWidth(nft_text);
                text(nft_text, width/2 - nft_text_w, 25);
                image(this.imgNft1, width/2  + (i + 1) * 30, 10, this.r * 2.5, this.r * 2.5);
            }
            
        }
    }

    drawInfo() {
        fill(255)
        let bounty_text = window?.userProfile?.email + ": ";
        let bounty_text_w = textWidth(bounty_text);
        // let score = text(bounty_text, 50, 25);
        push();
        fill(100, 255, 100);
        text(this.score, bounty_text_w + 50, 25);
        pop();
        this.drawLives();
        this.drawNfts();
    }

    // helper functions
    hasHitAlien(bullet) {
        return invaders.checkCollision(bullet.x, bullet.y);
    }

    test(){
        console.log("testing")
    }

    playerIsUp() {
        return this.y > invaders.aliens[0].y;
    }

    loseLife() {
        if (this.lives > 0) {
            this.respawn();
        }
    }
    resetPos(){
        this.x = width / 2;
        this.y = height - 30;
    }

}