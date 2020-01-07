import constants from '../constants';
import { randomBetween, whiteColor } from '../helpers';

class Door {
  constructor(building, unit) {
    this.building = building;
    this.height = Math.min(building.storyHeight() * 0.75, constants.AVG_STORY_HEIGHT);
    this.width = constants.DOOR_WIDTH;

    this.setXPosition(unit);
    this.setColorScheme();
  }

  setXPosition(unit) {
    const unitStart = this.building.unitXPosition(unit);
    const unitEndMinusWidth = this.building.unitXPosition(unit + 1) - this.width;
    this.xPos = (unitStart + unitEndMinusWidth) / 2;
  }
  setColorScheme() {
    if (Math.random() > 0.5){
      this.frameColor = this.building.whiteColor;
      this.doorColor = this.building.shadowColor();
    } else {
      this.frameColor = this.building.shadowColor();
      this.doorColor = this.building.whiteColor;
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