import chroma from 'chroma-js';
import constants from '../constants';
import { randomBetween, roofColor } from '../helpers';

class Roof {
  constructor(building) {
    this.building = building;
    this.width = building.width;
    let maxHeight = building.storyHeight();
    if (building.stories() <= 1) {
      maxHeight = building.height - constants.AVG_STORY_HEIGHT;
    }
    this.height = randomBetween(10, maxHeight);
    this.color = roofColor();
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    const edges = this.building.edges();
    ctx.fillRect(edges.left, edges.top, this.width, this.height);

    ctx.fillStyle = this.building.shadowColor();
    ctx.fillRect(edges.left, (edges.top + this.height), this.width, randomBetween(3, 12));
  }
}

window.chroma = chroma;
export default Roof;