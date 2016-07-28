import Point from 'js/modules/point';

import constants from 'js/constants';
import { getNewPosition, getDistance } from 'js/utils/mathUtils';
import { rainbow } from 'js/utils/colorUtils';

const texture = PIXI.Texture.fromImage('src/assets/circle.png');

class Particle {
  constructor(startPoint, angle, size, colorStep, speed) {
    this.position = startPoint;
    this.angle = angle;
    this.speed = speed;
    this.colorStep = colorStep;

    const circle = new PIXI.Sprite(texture);
    circle.width = circle.height = size;
    circle.blendMode = PIXI.BLEND_MODES.ADD;
    circle.anchor = {
      x: 0.5,
      y: 0.5,
    };
    this.circle = circle;

    this.locateCircle();
    this.updateColor();
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

  updateColor() {
    this.circle.tint = rainbow(this.colorStep);
  }

  updateColorStep(colorStep) {
    this.colorStep = colorStep;
    this.updateColor();
  }

  isOverlapping(particle) {
    const distance = getDistance(this.position, particle.position);
    return distance < constants.CIRCLE_DIAMETER;
  }

  locateCircle() {
    this.circle.position.x = this.position.x;
    this.circle.position.y = this.position.y;
  }

  updatePosition() {
    this.position = getNewPosition(this.position, this.angle, this.speed);
  }

  tick() {
    this.circle.alpha -= constants.ALPHA_DECAY;
    this.updatePosition();
    this.locateCircle();
  }

  static generateRandomParticle(colorStep) {
    const randomPoint = new Point(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );
    const randomAngle = Math.random() * 360;
    return new Particle(
      randomPoint,
      randomAngle,
      constants.CIRCLE_DIAMETER,
      colorStep,
      Math.random() * constants.SPEED_MAX
    );
  }
}

export default Particle;
