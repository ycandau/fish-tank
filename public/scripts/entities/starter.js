class Starter extends Denizen {
  constructor(options) {
    super(options);
    this.imageUri = "/images/volcano.jpg";
    this.position.y += this.height;
    this.widthRef = this.width;
    this.heightRef = this.height;
  }

  update(t) {
    this.width = 0.003 * this.widthRef + 0.997 * this.width;
    this.height = 0.003 * this.heightRef + 0.997 * this.height;
  }

  onClick(event) {
    var xVel = randRangeInt(-300, 300);
    var yVel = 400 - Math.abs(xVel);
    var s = new Seed({
      tank: this.tank,
      position: this.position,
      velocity: new Vector(xVel, yVel),
      type: this.tank.getRandomSpecies(),
    });
    this.width *= 1.1;
    this.height *= 1.1;
  }
}
