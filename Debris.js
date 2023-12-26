class Debris {
    constructor(image) {
        // this.r = 5;
        // this.resetDebris();

        this.r = 5;
        this.a = 0;
        this.rotationRate = random(-0.05, 0.05)
        this.resetDebris();
        this.image = image;

    }

    resetDebris() {
        this.y = random(height - 10);
        this.r = random(5, 10)

        let spawnLeftSide = random(1) < 0.5;

        if (spawnLeftSide) {
            this.x = random(-width, 0);
            this.isGoingLeft = false;
        } else {
            this.x = random(width, width * 2);
            this.isGoingLeft = true;
        }
    }

    update() {
        if (this.isGoingLeft) {
            this.x--;
        } else {
            this.x++;
        }

        if (this.isOffScreen()) {
            this.resetDebris();
        }
    }

    isOffScreen() {
        if (this.isGoingLeft && this.x < -5) {
            return true;
        } else if (!this.isGoingLeft && this.x > width + 5) {
            return true;
        }
        return false;
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.a);
        imageMode(CENTER);
        image(this.image, 0, 0, this.r * 2, this.r * 2);
        this.a = this.a + this.rotationRate;
        pop();
    }

    hasHitPlayer(player) {
        if (dist(this.x, this.y, player.x, player.y) < this.r + player.r) {
            return true;
        }
        return false
    }
}

