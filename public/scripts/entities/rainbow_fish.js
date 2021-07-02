class RainbowFish extends Fish {
  constructor(options) {
    super(options);
    this.hueRotate = 120;
    this.hueRotationSpeed = 1;
  }

  updateOneTick() {
    super.updateOneTick();
    this.hueRotate = (this.hueRotate + this.hueRotationSpeed) % 360;
    this.hueRotationSpeed = 0.99 * this.hueRotationSpeed + 0.01;
  }

  onClick(event) {
    this.hueRotationSpeed = 20;
  }
}
