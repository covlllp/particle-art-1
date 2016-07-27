import Point from 'js/modules/point';

import { getNewPosition } from 'js/utils/mathUtils';
import { getRandomColor } from 'js/utils/colorUtils';

class Particle {
  constructor(startPoint, angle, size, color, speed, decay) {
    this.position = startPoint;
    this.angle = angle;
    this.speed = speed;
    this.decay = decay;

    const texture = PIXI.Texture.fromImage('src/assets/circle.png');
    const circle = new PIXI.Sprite(texture);
    circle.width = circle.height = size;
    circle.tint = color;
    circle.blendMode = PIXI.BLEND_MODES.ADD;
    circle.anchor = {
      x: 0.5,
      y: 0.5,
    };
    this.circle = circle;

    this.locateCircle();
  }

  get shouldBeDrawn() {
    return this.isInWindow && this.circle.alpha > 0.1 && this.circle.width > 5;
  }

  get isInWindow() {
    const { position } = this;
    return (
      position.x > 0 &&
      position.y > 0 &&
      position.x < window.innerWidth &&
      position.y < window.innerHeight
    );
  }

  locateCircle() {
    this.circle.position.x = this.position.x;
    this.circle.position.y = this.position.y;
  }

  updatePosition() {
    this.position = getNewPosition(this.position, this.angle, this.speed);
  }

  tick() {
    console.log('next frame');
    this.percentage += this.speed;
    this.circle.alpha *= this.decay;
    this.speed *= this.decay;
    this.circle.scale.x *= this.decay;
    this.circle.scale.y *= this.decay;
    this.updatePosition();
    this.locateCircle();
  }

  static generateRandomParticle() {
    const randomPoint = new Point(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );
    const randomAngle = Math.random() * 360;
    return new Particle(
      new Point(400, 400),
      randomAngle,
      40,
      getRandomColor(),
      80,
      0.7
    );
  }
}

export default Particle;
