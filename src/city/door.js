import constants from '../constants';
import { randomBetween, whiteColor } from '../helpers';

class Door {
  constructor(building) {
    this.building = building;
    this.height = Math.min(building.storyHeight() * 0.75, constants.AVG_STORY_HEIGHT);
    this.width = constants.DOOR_WIDTH;

    this.setXPosition();
    this.setColorScheme();
  }

  setXPosition() {
    // This needs some rethinking
    const edges = this.building.edges();
    const xPosMin = edges.left + constants.BUILDING_PADDING;
    const xPosMax = edges.right - constants.BUILDING_PADDING - this.width;
    this.xPos = randomBetween(xPosMin, xPosMax)

  }
  setColorScheme() {
    if (Math.random() > 0.5){
      this.frameColor = whiteColor();
      this.doorColor = this.building.shadowColor();
    } else {
      this.frameColor = this.building.shadowColor();
      this.doorColor = whiteColor();
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.frameColor;
    const edges = this.building.edges();
    ctx.fillRect(this.xPos, edges.bottom, this.width, this.height * -1);

    ctx.fillStyle = this.doorColor;
    ctx.fillRect(this.xPos + 5, edges.bottom, this.width - 10, (constants.AVG_PERSON_HEIGHT) * -1);

  }
}

export default Door;