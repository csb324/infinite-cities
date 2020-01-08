import constants from '../../constants';
import { chooseBetween, randomBetween, coinFlip } from '../../helpers';
import { metalColor } from '../../colorHelpers';

const DOORKNOB_RADIUS = 3.5;

class _Door {
  constructor(building, unit) {
    this.building = building;
    this.height = Math.min(building.storyHeight * 0.75, constants.AVG_STORY_HEIGHT);
    this.width = constants.DOOR_WIDTH;
    this.frameWidth = randomBetween(3, 6);
    this.frameHeight = this.frameWidth;
    this._initPositions(unit);
    this._initColors();
  }

  _initPositions(unit) {
    const unitStart = this.building.unitXPosition(unit);
    const unitEndMinusWidth = this.building.unitXPosition(unit + 1) - this.fullWidth();
    this.xPos = (unitStart + unitEndMinusWidth) / 2;
  }

  _initColors() {
    switch (chooseBetween(3)) {
      case 1:
        this.frameColor = this.building.whiteColor;
        this.doorColor = this.building.shadowColor();
        break;
      case 2:
        this.frameColor = this.building.shadowColor();
        this.doorColor = this.building.whiteColor;
        break;
      default:
        this.frameColor = this.building.whiteColor;
        this.doorColor = this.building.accentColor;
        break;
    }
    this.metalColor = metalColor();

  }

  fullWidth() {
    return this.width + (2*this.frameWidth);
  }

  frameStartY() {
    return this.building.edges().bottom - this.height - this.frameHeight;
  }

  _drawDoorknob(ctx, xPosition) {
    const doorKnobY = this.building.edges().bottom - this.width - DOORKNOB_RADIUS;
    ctx.fillStyle = this.metalColor;
    ctx.beginPath();
    ctx.ellipse(xPosition, doorKnobY, DOORKNOB_RADIUS, DOORKNOB_RADIUS, 0, 0, 2 * Math.PI);
    ctx.fill();
  }

  _doorknobPosition() {
    let doorKnobX = this.xPos + this.frameWidth;
    if(coinFlip()) {
      doorKnobX += this.width - (DOORKNOB_RADIUS * 2);
    } else {
      doorKnobX += (DOORKNOB_RADIUS * 2);
    }
    return doorKnobX;
  }

  _drawDoor(ctx) {
    ctx.fillStyle = this.doorColor;
    ctx.fillRect(
      this.xPos + this.frameWidth,
      this.frameStartY() + this.frameHeight,
      this.width,
      this.height
    );
  }

  _drawFrame(ctx) {
    ctx.fillStyle = this.frameColor;
    ctx.fillRect(
      this.xPos,
      this.frameStartY(),
      this.width + (2*this.frameWidth),
      this.height + this.frameHeight
    );
  }

  draw(ctx) {
    this._drawFrame(ctx);
    this._drawDoor(ctx);
  }
}

export default _Door;