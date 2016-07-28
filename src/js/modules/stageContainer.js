import Particle from 'js/modules/particle';

import constants from 'js/constants';

class StageContainer {
  constructor(renderer) {
    this.stage = new PIXI.Container();
    this.renderer = renderer;
    this.elements = [];
    this.currentColorStep = 0;

    this.currentColorElements = [];
    this.newColorElements = [];
  }

  get newColorStep() {
    return this.currentColorStep + 1;
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

    if (particle.colorStep === this.currentColorStep) {
      this.currentColorElements.push(particle);
    } else {
      this.newColorElements.push(particle);
    }
  }

  removeParticle(particle) {
    this.removeFromStage(particle.circle);
  }

  rebuildColorElements() {
    for (let i = 0; i < this.newColorElements.length; i++) {
      const newColorParticle = this.newColorElements[i];
      this.currentColorElements = this.currentColorElements.filter((currentColorParticle) => {
        if (newColorParticle.isOverlapping(currentColorParticle)) {
          currentColorParticle.updateColorStep(this.newColorStep);
          this.newColorElements.push(currentColorParticle);
          return false;
        }
        return true;
      });
    }

    if (!this.currentColorElements.length) {
      this.currentColorElements = this.newColorElements;
      this.newColorElements = [];
      this.currentColorStep++;
    }

    if (!this.newColorElements.length) {
      this.addParticle(Particle.generateRandomParticle(this.newColorStep));
    }
  }

  tick() {
    this.elements = this.elements.filter((element) => {
      element.tick();
      if (!element.shouldBeDrawn) {
        this.removeParticle(element);
        return false;
      }
      return true;
    });

    const filterRemovedParticles = (particle) => particle.shouldBeDrawn;
    this.currentColorElements = this.currentColorElements.filter(filterRemovedParticles);
    this.newColorElements = this.newColorElements.filter(filterRemovedParticles);
    this.rebuildColorElements();

    for (let i = 0; i < 5; i++) {
      if (this.elements.length < constants.PARTICLE_MAX) {
        this.addParticle(Particle.generateRandomParticle(this.currentColorStep));
      }
    }

    this.renderStage();
    console.log('color step: ', this.currentColorStep);
  }

  renderStage() {
    this.renderer.render(this.stage);
  }
}

export default StageContainer;
