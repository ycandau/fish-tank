class BiteFish extends Fish {
  constructor(options) {
    super(options);
    this.imageUri = "/images/bite_fish.gif";
  }

  updateOneTick() {
    super.updateOneTick();
    const tank = this.tank;
    const { x: x1, y: y1 } = this.position;

    for (const id in tank.denizens) {
      const deniz = tank.denizens[id];
      const { x: x2, y: y2 } = deniz.position;
      const dist = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
      const isPrey =
        deniz instanceof Seed ||
        (deniz instanceof Fish && !(deniz instanceof BiteFish));
      if (isPrey && dist < this.width * 20) {
        deniz.kill();
        this.width *= 1.2;
        this.height *= 1.2;
      }
    }
  }
}
