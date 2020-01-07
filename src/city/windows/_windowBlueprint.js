import { coordinatesToUnique, glassColor, randomBetween } from '../../helpers';

class _WindowBlueprint {
  constructor(building) {
    this.building = building;
    this._initSizes();
    this._initColors();
  }

  _initSizes() {
    this.width = 10;
    this.height = 10;
    this.frameThickness = randomBetween(1.5, 4);
  }

  _initColors() {
    this.frameColor = this.building.whiteColor;
    this.glassColor = glassColor();
  }

  _drawWindow(xOffset, yOffset, ctx) {
    const xPos = xOffset + this.bufferX;
    const yPos = yOffset + this.bufferTop;

    ctx.fillStyle = this.frameColor;
    ctx.fillRect(xPos, yPos, this.width, this.height);

    ctx.fillStyle = this.glassColor;
    ctx.fillRect(xPos + 3, yPos + 3, this.width - 6, this.height - 6);
  }

  draw(ctx) {
    for(let i = 0; i < this.building.stories; i++) {
      for (let j = 0; j < this.building.blocksWide; j++) {
        if (this.building.doorPosition != coordinatesToUnique(i, j)) {
          const yOffset = this.building.ceilingYPosition(i);
          const xOffset = this.building.unitXPosition(j);
          this._drawWindow(xOffset, yOffset, ctx);
        }
      }
    }

  }

}

export default _WindowBlueprint;