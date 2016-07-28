import Particle from 'js/modules/particle';

import constants from 'js/constants';

class StageContainer {
  constructor(renderer) {
    this.stage = new PIXI.Container();
    this.renderer = renderer;
    this.particles = [];
    this.currentColorStep = 0;

    this.currentColorParticles = [];
    this.newColorParticles = [];
  }

  get newColorStep() {
    return (this.currentColorStep + 2) % constants.COLOR_STEPS;
  }

  addToStage(particle) {
    this.stage.addChild(particle);
  }

  removeFromStage(particle) {
    this.stage.removeChild(particle);
  }

  addParticle(particle) {
    if (!particle.shouldBeDrawn) return;
    this.addToStage(particle.circle);
    this.particles.push(particle);

    if (particle.colorStep === this.newColorStep) {
      this.newColorParticles.push(particle);
    } else {
      this.currentColorParticles.push(particle);
    }
  }

  removeParticle(particle) {
    this.removeFromStage(particle.circle);
  }

  rebuildColorParticleGroups() {
    for (let i = 0; i < this.newColorParticles.length; i++) {
      const newColorParticle = this.newColorParticles[i];
      this.currentColorParticles = this.currentColorParticles.filter((currentColorParticle) => {
        if (newColorParticle.isOverlapping(currentColorParticle)) {
          currentColorParticle.updateColorStep(this.newColorStep);
          this.newColorParticles.push(currentColorParticle);
          return false;
        }
        return true;
      });
    }

    if (!this.currentColorParticles.length) {
      this.currentColorParticles = this.newColorParticles;
      this.newColorParticles = [];
      this.currentColorStep = this.newColorStep;
    }

    if (!this.newColorParticles.length) {
      this.addParticle(Particle.generateRandomParticle(this.newColorStep));
    }
  }

  updateParticleMovements() {
    this.removedParticles = [];
    this.particles = this.particles.filter((particle) => {
      particle.tick();
      if (!particle.shouldBeDrawn) {
        this.removeParticle(particle);
        this.removedParticles.push(particle);
        return false;
      }
      return true;
    });
  }

  addNewParticles() {
    for (let i = 0; i < Math.max(5, this.removedParticles.length); i++) {
      let colorStep;
      if (i < this.removedParticles.length) {
        colorStep = this.removedParticles[i].colorStep;
      } else {
        colorStep = this.currentColorStep;
      }
      if (this.particles.length < constants.PARTICLE_MAX) {
        this.addParticle(Particle.generateRandomParticle(colorStep));
      }
    }
  }

  tick() {
    this.updateParticleMovements();

    const filterRemovedParticles = (particle) => particle.shouldBeDrawn;
    this.currentColorParticles = this.currentColorParticles.filter(filterRemovedParticles);
    this.newColorParticles = this.newColorParticles.filter(filterRemovedParticles);
    this.rebuildColorParticleGroups();

    this.addNewParticles();

    this.renderStage();
  }

  renderStage() {
    this.renderer.render(this.stage);
  }
}

export default StageContainer;
