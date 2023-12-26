class Alien {
    constructor(x, y, images) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.images = images;
    }

    draw() {
        let rate = 64;
        let currentFrame = frameCount % rate;
        let ii = currentFrame > rate/2? 0: 1;
        image(this.images[ii], this.x, this.y, this.r * 2, this.r * 2);
    }
    
    hasHitPlayer(player) {
          if (dist(this.x, this.y, player.x, player.y) < this.r + player.r) {
            return true;
        }
        return false
      }
}