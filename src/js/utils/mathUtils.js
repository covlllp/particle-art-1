import Point from 'js/modules/point';
import constants from 'js/constants';

export const degToRad = (degree) => (degree * Math.PI / 180);

export function getNewPosition(startPoint, angle, distance) {
  const rads = degToRad(angle);
  const y = startPoint.y - Math.sin(rads) * distance;
  const x = Math.cos(rads) * distance + startPoint.x;
  return new Point(x, y);
}

export function getDistance(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

export function getNoisyAngle(angle) {
  return angle + (Math.random() - 0.5) * constants.ANGLE_NOISE;
}

export function getRandomSpeed() {
  return Math.random() * constants.SPEED_MAX;
}
