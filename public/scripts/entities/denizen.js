class Denizen {
  constructor(options) {
    // console.log("constructing:", this.constructor.name, options);
    this.lastTime = new Date();
    this.height = options.height || 60;
    this.width = options.width || 60;
    this.position = options.position.clone();
    if (options.velocity) {
      this.velocity = options.velocity.clone();
    }
    this.tank = options.tank;
    this.id = this.tank.registerDenizen(this);
    this.onClick = this.onClick.bind(this);
    this.hueRotate = 0;
    this.hueRotationSpeed = 0;
  }

  calcPhysicsTicks(newTime) {
    var deltaTime = (newTime - this.lastTime) / 1000.0; // convert to seconds
    var numTicks = Math.floor(deltaTime / PHYSICS_TICK_SIZE_S);
    var secondsConsumed = numTicks * PHYSICS_TICK_SIZE_S;
    //console.log(this.lastTime.getSeconds(), this.lastTime.getMilliseconds(), "...", newTime.getSeconds(), newTime.getMilliseconds(),
    //    "-->", numTicks, "ticks,   ", secondsConsumed, "time consumed");
    this.lastTime = new Date(this.lastTime.getTime() + secondsConsumed * 1000);
    return numTicks;
  }

  update(t) {
    // if you're out of bounds, despawn
    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
  }

  updateOneTick() {
    throw "not implemented";
  }

  renderRules() {
    return {
      imageUri: this.imageUri,
      css: {
        width: this.width,
        height: this.height,
      },
      x: this.position.x - Math.floor(this.width / 2),
      y: this.position.y - Math.floor(this.height / 2),
    };
  }

  onClick(event) {
    throw "not implemented";
  }

  kill(duration) {
    // duration can be undefined, no problem
    // console.log("like tears, in rain.  time to die.", this);
    this.tank.removeDenizen(this.id, duration);
  }

  outOfBounds(bounds) {
    // TODO: it'd be cool if Seeds could go above the top fo the tank, then fall back down
    return (
      this.position.x + 5 * this.width < bounds.minX ||
      this.position.x - 5 * this.width > bounds.maxX ||
      this.position.y + 5 * this.height < bounds.minY ||
      this.position.y - 5 * this.height > bounds.maxY
    );
  }
}
