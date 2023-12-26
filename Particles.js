class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.size = random(2, 6);
      this.alpha = 255;
      this.color = color;
    }
    
    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 6;
    }
    
    display() {
      this.color.setAlpha(this.alpha);
      fill(this.color);
      ellipse(this.x, this.y, this.size);
    }
    
    isFinished() {
      return this.alpha <= 0;
    }
  }