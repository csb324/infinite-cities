import { randomBetween, coinFlip } from '../../helpers';
import _WindowBlueprint from './_windowBlueprint';

const CEILING_FLOOR_PADDING = 15;

class ClassicBlueprint extends _WindowBlueprint {
  constructor(building) {
    super(building);
  }

  _initColors() {
    super._initColors();
    if (coinFlip(0.2)) {
      this.frameColor = this.building.accentColor;
    }
  }

  _initSizes() {
    super._initSizes();

    this._initHeights();
    this._initWidth();
    this._initGrilles();
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
    this.width = unitWidth * randomBetween(0.35, 0.75);
    this.bufferX = (unitWidth - this.width) / 2;
  }

  drawGrilles(xPos, yPos, ctx) {
    ctx.fillStyle = this.frameColor;
    for (const h of this.grilleHeights) {
      ctx.fillRect(
        xPos,
        yPos + h - (this.frameThickness / 2),
        this.width,
        this.frameThickness
      );
    }

    for (const x of this.grilleWidths) {
      const grilleX = xPos + x - (this.frameThickness / 2);
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

    ctx.fillStyle = this.frameColor;
    ctx.fillRect(
      xPos,
      yPos,
      this.width,
      this.height
    );

    ctx.fillStyle = this.building.shadowColor().alpha(0.7);
    ctx.fillRect(
      xPos - this.frameThickness,
      yPos - 3,
      this.width + (2*this.frameThickness),
      3
    );

    ctx.fillStyle = this.building.highlightColor().alpha(1);
    ctx.fillRect(
      xPos - this.frameThickness,
      yPos + this.height,
      this.width + (2*this.frameThickness),
      3
    );

    ctx.fillStyle = this.glassColor;
    ctx.fillRect(xPos + this.frameThickness, yPos + this.frameThickness, this.width - (this.frameThickness * 2), this.height - (this.frameThickness * 2));

    ctx = this.drawGrilles(xPos, yPos, ctx);
  }

}

export default ClassicBlueprint;