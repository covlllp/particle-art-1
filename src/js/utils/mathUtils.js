import Point from 'js/modules/point';

export const degToRad = (degree) => (degree * Math.PI / 180);

export function getNewPosition(startPoint, angle, distance) {
  const rads = degToRad(angle);
  const y = startPoint.y - Math.sin(rads) * distance;
  const x = Math.cos(rads) * distance + startPoint.x;
  return new Point(x, y);
}
