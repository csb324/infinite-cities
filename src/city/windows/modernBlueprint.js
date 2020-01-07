import { randomBetween, coordinatesToUnique } from '../../helpers';
// import constants from '../constants';
import _WindowBlueprint from './_windowBlueprint';

class ModernBlueprint extends _WindowBlueprint {
  constructor(building) {
    super(building);
  }

  _initSizes() {
    super._initSizes();

    const storyHeight = this.building.storyHeight;
    this.bufferTop = randomBetween(10, storyHeight/3);
    this.bufferBottom = randomBetween(15, storyHeight/3);
    this.bufferX = randomBetween(10, (this.building.blockWidth/2) - 10);

    this.width = this.building.blockWidth - (2 * this.bufferX);
    this.height = storyHeight - this.bufferTop - this.bufferBottom;

    this.crossBarOffset = (this.height * Math.random() / 2);
  }

  _drawWindow(xOffset, yOffset, ctx) {
    const xPos = xOffset + this.bufferX;
    const yPos = yOffset + this.bufferTop;

    ctx.fillStyle = this.frameColor;
    ctx.fillRect(xPos, yPos, this.width, this.height);

    ctx.fillStyle = this.glassColor;
    ctx.fillRect(xPos + 3, yPos + 3, this.width - 6, this.height - 6);

    ctx.fillStyle = this.frameColor;
    ctx.fillRect(xPos, yPos + this.crossBarOffset, this.width, 3);
  }

}

export default ModernBlueprint;