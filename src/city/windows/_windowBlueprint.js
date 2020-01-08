import { coordinatesToUnique, randomBetween } from '../../helpers';
import { glassColor } from '../../colorHelpers';

const SMALLEST_WINDOW_PANE = 20;

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


  _initGrilles() {
    const howManyGrillesVertical = Math.floor(this.height / SMALLEST_WINDOW_PANE);
    const grilleDistanceY = this.height / howManyGrillesVertical;

    this.grilleHeights = [];
    for (let index = 0; index < howManyGrillesVertical - 1; index++) {
      this.grilleHeights.push((index + 1) * grilleDistanceY);
    }

    const howManyGrillesHorizontal = Math.floor(this.width / SMALLEST_WINDOW_PANE);
    const grilleDistanceX = this.width / howManyGrillesHorizontal;

    this.grilleWidths = [];
    for (let index = 0; index < howManyGrillesHorizontal - 1; index++) {
      this.grilleWidths.push((index + 1) * grilleDistanceX);
    }
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