import _Door from './_door';
import { glassColor, metalColor } from '../../colorHelpers';
import { randomBetween, coinFlip } from '../../helpers';

class WindowDoor extends _Door {

  constructor(building, unit) {
    super(building, unit);
    const remainingSpace = (this.building.blockWidth - this.width) / 2;
    this.frameWidth = remainingSpace - randomBetween(3, 6);
    this.frameHeight = randomBetween(this.frameWidth/2, 4);

    this._initPositions(unit);

  }

  _initColors() {
    super._initColors();
    this.glassColor = glassColor();
    this.metalColor = metalColor();

    this.windowFrameColor = this.building.whiteColor;
    this.frameColor = this.frameColor.alpha(0.5);

    // if (this.doorColor == this.building.whiteColor) {
    // } else {
    //   this.windowFrameColor = this.building.accentColor;
    // }
  }

  _initPositions(unit) {
    super._initPositions(unit);
    this.windowHeight = this.height * randomBetween(0.4, 0.7);
    this.windowPadding = randomBetween(2, 4);
    this.windowWidth = this.frameWidth - (2 * this.windowPadding);
    if (this.windowWidth < 0) {
      this.windowWidth = 4;
      this.windowPadding = (this.frameWidth - this.windowWidth) / 2;
    }

    this.windowBottom = this.frameStartY() + this.frameHeight + this.windowHeight;
  }

  _drawFrame(ctx) {
    ctx.fillStyle = this.frameColor;
    ctx.fillRect(
      this.xPos,
      this.frameStartY(),
      this.width + (2*this.frameWidth),
      randomBetween(2, 4)
    );
  }

  _drawSideWindows(ctx) {

    // left window
    ctx.fillStyle = this.windowFrameColor;
    ctx.fillRect(
      this.xPos,
      this.frameStartY() + this.frameHeight,
      this.windowWidth,
      this.windowHeight);
    ctx.fillStyle = this.glassColor;
    ctx.fillRect(
      this.xPos + this.windowPadding,
      this.frameStartY() + this.frameHeight + this.windowPadding,
      this.windowWidth - (2 * this.windowPadding),
      this.windowHeight - (2 * this.windowPadding)
    );

    // right window
    ctx.fillStyle = this.windowFrameColor;
    ctx.fillRect(
      this.xPos + this.width + this.frameWidth + (this.windowPadding * 2),
      this.frameStartY() + this.frameHeight,
      this.windowWidth,
      this.windowHeight
    );
    ctx.fillStyle = this.glassColor;
    ctx.fillRect(
      this.xPos + this.width + this.frameWidth + (this.windowPadding * 3),
      this.frameStartY() + this.frameHeight + this.windowPadding,
      this.windowWidth - (2 * this.windowPadding),
      this.windowHeight - (2 * this.windowPadding)
    );
  }

  _drawWindowAccents(ctx) {
    // left accent, right accent
    const windowAccentHeight = this.height - this.windowHeight - (3 * this.windowPadding);
    ctx.fillStyle = this.frameColor.alpha(randomBetween(0, 1));
    ctx.fillRect(
      this.xPos,
      this.windowBottom + (2 * this.windowPadding),
      this.windowWidth,
      windowAccentHeight
    )
    ctx.fillRect(
      this.xPos + this.width + this.frameWidth + (this.windowPadding * 2),
      this.windowBottom + (2 * this.windowPadding),
      this.windowWidth,
      windowAccentHeight
    )
  }

  draw(ctx) {
    super.draw(ctx);
    this._drawSideWindows(ctx);
    this._drawDoorknob(ctx);
    if (coinFlip()) {
      this._drawWindowAccents(ctx);
    }
  }
}

export default WindowDoor;