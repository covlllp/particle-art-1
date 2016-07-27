import Particle from 'js/modules/particle';

class StageContainer {
  constructor(renderer) {
    this.stage = new PIXI.Container();
    this.renderer = renderer;
    this.elements = [];
  }

  addToStage(element) {
    this.stage.addChild(element);
  }

  removeFromStage(element) {
    this.stage.removeChild(element);
  }

  addParticle(particle) {
    if (!particle.shouldBeDrawn) return;
    this.addToStage(particle.circle);
    this.elements.push(particle);
  }

  tick() {
    this.elements.filter((element) => {
      element.tick();
      if (!element.shouldBeDrawn) {
        this.removeFromStage(element.circle);
        return false;
      }
      return true;
    });

    this.addParticle(Particle.generateRandomParticle());

    this.renderStage();
  }

  renderStage() {
    this.renderer.render(this.stage);
  }
}

export default StageContainer;
