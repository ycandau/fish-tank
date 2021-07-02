class SwitchFish extends Fish {
  constructor(options) {
    super(options);
    this.hueRotate = 60;
  }

  onClick(event) {
    this.makeNewVelocity(50);
  }
}
