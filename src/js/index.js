import StageContainer from 'js/modules/stageContainer';
import $ from 'jquery';

const renderer = PIXI.autoDetectRenderer($(window).width(), $(window).height());
const stageContainer = new StageContainer(renderer);
document.body.appendChild(renderer.view);

function animate() {
  requestAnimationFrame(animate);
  stageContainer.tick();
}

function resize() {
  const width = $(window).width() - 5;
  const height = $(window).height() - 5;
  renderer.resize(width, height);
}

resize();
$(window).resize(resize);
animate();
