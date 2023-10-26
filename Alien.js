class Alien {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.image = image;
    }
    draw() {
        image(this.image, this.x, this.y, this.image.width/30, this.image.height/30);
    }
    hasHitPlayer(player) {
          console.log("alien")
          if (dist(this.x, this.y, player.x, player.y) < this.r + 10) {
            return true;
        }
        return false
      }

}