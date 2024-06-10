export class Animation {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = ctx.canvas.width / 2;
    this.y = ctx.canvas.height / 2;
    this.rMax = Math.min(this.x - 20, this.y - 20, 60);
    this.r = 40;
    this.grow = true;
    this.run = true;

    this.boundAnimate = this.animate.bind(this);
  }

  static fibonacci(num) {
    return num <= 1
      ? 1
      : Animation.fibonacci(num - 1) + Animation.fibonacci(num - 2);
  }

  drawCircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  animate() {
    if (!this.run) {
      return;
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (this.r === this.rMax || this.r === 0) {
      this.grow = !this.grow;
    }
    this.r = this.grow ? this.r + 1 : this.r - 1;
    this.drawCircle();
    requestAnimationFrame(this.boundAnimate);
  }

  stop() {
    this.run = false;
  }

  start() {
    this.run = true;
    this.animate();
  }
}
