import { randomBetween, coinFlip } from '../../helpers';
import _WindowBlueprint from './_windowBlueprint';

const CEILING_FLOOR_PADDING = 15;
const SMALLEST_WINDOW_PANE = 20;

class ShuttersBlueprint extends _WindowBlueprint {
  constructor(building) {
    super(building);
  }

  _initColors() {
    super._initColors();
    if (coinFlip(0.8)) {
      this.shutterColor = this.building.accentColor;
    } else {
      this.shutterColor = this.building.whiteColor;
      this.frameColor = this.building.accentColor;
    }
  }

  _initSizes() {
    super._initSizes();

    this._initHeights();
    this._initWidth();
    this._initGrilles();
  }

  _initGrilles() {
    const howManyGrillesVertical = Math.floor(this.height / SMALLEST_WINDOW_PANE);
    const grilleDistanceY = this.height / howManyGrillesVertical;

    this.grilleHeights = [];
    for (let index = 0; index < howManyGrillesVertical; index++) {
      this.grilleHeights.push((index + 1) * grilleDistanceY);
    }

    const howManyGrillesHorizontal = Math.floor(this.paneWidth / SMALLEST_WINDOW_PANE);
    const grilleDistanceX = this.paneWidth / howManyGrillesHorizontal;

    this.grilleWidths = [];
    for (let index = 0; index < howManyGrillesHorizontal - 1; index++) {
      this.grilleWidths.push((index + 1) * grilleDistanceX);
    }

  }

  _initHeights() {
    const storyHeight = this.building.storyHeight;
    this.height = storyHeight * randomBetween(0.4, 0.7)
    this.bufferTop = randomBetween(
      CEILING_FLOOR_PADDING,
      storyHeight - this.height - CEILING_FLOOR_PADDING);
  }
  _initWidth() {
    const unitWidth = this.building.blockWidth;
    this.shutterWidth = unitWidth * randomBetween(0.15, 0.23);;
    this.paneWidth = this.shutterWidth * 2;
    this.bufferX = (unitWidth - this.totalWidth()) / 2;
  }

  totalWidth() {
    return this.shutterWidth * 4;
  }

  drawGrilles(xPos, yPos, ctx) {
    ctx.fillStyle = this.frameColor;
    for (const h of this.grilleHeights) {
      ctx.fillRect(
        xPos + this.shutterWidth,
        yPos + h - (this.frameThickness / 2),
        this.paneWidth,
        this.frameThickness
      );
    }

    for (const x of this.grilleWidths) {
      const grilleX = xPos + this.shutterWidth + x - (this.frameThickness / 2);
      ctx.fillRect(
        grilleX,
        yPos,
        this.frameThickness,
        this.height
      );
    }
    return ctx;
  }

  _drawWindow(xOffset, yOffset, ctx) {
    const xPos = xOffset + this.bufferX;
    const yPos = yOffset + this.bufferTop;

    ctx.fillStyle = this.shutterColor;
    ctx.fillRect(xPos, yPos, this.totalWidth(), this.height);

    ctx.fillStyle = this.frameColor;
    ctx.fillRect(xPos + this.shutterWidth, yPos, this.paneWidth, this.height + 3);

    ctx.fillStyle = this.building.shadowColor().alpha(0.3);
    ctx.fillRect(xPos, yPos + this.height, this.totalWidth(), 3);

    ctx.fillStyle = this.glassColor;
    ctx.fillRect(xPos + this.shutterWidth + this.frameThickness, yPos + this.frameThickness, this.paneWidth - (this.frameThickness * 2), this.height - (this.frameThickness * 2));

    ctx = this.drawGrilles(xPos, yPos, ctx);
  }

}

export default ShuttersBlueprint;