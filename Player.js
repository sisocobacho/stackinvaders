class Player {
    constructor(shooterImage) {
        this.image = shooterImage;
        this.x = width / 2;
        this.y = height -30;
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

    }
    showNft() {
        this.nft = true;
        window.getData();
    }
    
    update() {
        if (this.isMovingRight && this.x < width -40) {
            this.x += 1;
        } else if (this.isMovingLeft && this.x > 0) {
            this.x -= 1;
        }
        
        if(this.isMovingUp && this.y > 0){
            this.y -= 1;
        } else if(this.isMovingDown && this.y < height - 30){
            this.y += 1;
        }
        this.updateBullets();
    }
    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update();
            if (this.hasHitAlien(this.bullets[i])) {
                this.bullets.splice(i, 1);
                this.score += 10;
                break;
            } else if (this.bullets[i].isOffScreen()) {
                // console.log("offscreen")
                this.bullets.splice(i, 1);
                break;
            }
        }
    }
    hasHitAlien(bullet) {
        return invaders.checkCollision(bullet.x, bullet.y);
    }

    draw() {
        image(this.image, this.x, this.y, this.r * 2, this.r*2);
        this.drawBullets();
        if(this.score > 500 && !this.nft){
            this.showNft()
        }

    }
    drawBullets() {
        for (let bullet of this.bullets) {
            bullet.draw();
        }
    }
    drawLives(t_width) {
        for (let i = 0; i < this.lives; i++) {
            image(this.image, width - (i + 1) * 30, 10, this.r * 2, this.r * 2);
        }
    }
    drawInfo() {
        fill(255)
        let bounty_text = window?.userProfile?.email + ": ";
        let bounty_text_w = textWidth(bounty_text);
        let score = text(bounty_text, 50, 25);
        push();
        fill(100, 255, 100);
        text(this.score, bounty_text_w + 50, 25);
        pop();
        this.drawLives(bounty_text_w + textWidth(this.score) + 100)
    }
    moveLeft() {
        this.isMovingRight = false;
        this.isMovingLeft = true;
    }
    moveRight() {
        this.isMovingLeft = false;
        this.isMovingRight = true;
    }
    moveUp(){
        this.isMovingUp = true;
        this.isMovingDown = false;
    }moveDown(){
        this.isMovingUp = false;
        this.isMovingDown = true;
    }

    shoot() {
        if (this.bullets.length < this.maxBullets){
            this.bullets.push(new PlayerBullet(this.x + 12, this.y, this.playerIsUp()));
        }
        
    }
    respawn() {
        this.x = width / 2;
        this.y = height -30;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.lives -= 1;
    }
    playerIsUp(){
        return this.y > invaders.aliens[0].y;
    }
    loseLive(){
        if(this.lives > 0){
            this.respawn();
        }
    }
}