// import { glassColor } from '../helpers';
import constants from '../constants';

class Window {
  constructor(row, column, blueprint, building) {
    this.blueprint = blueprint;
    this.width = blueprint.width;
    this.height = blueprint.height;

    this.xPos = building.unitXPosition(column) + this.blueprint.bufferX;
    this.yPos = building.ceilingYPosition(row) + this.blueprint.bufferTop;
    this.crossBarY = this.yPos + this.blueprint.crossBarOffset;
  }

  draw(ctx) {
    ctx.fillStyle = this.blueprint.frameColor;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    ctx.fillStyle = this.blueprint.glassColor;
    ctx.fillRect(this.xPos + 3, this.yPos + 3, this.width - 6, this.height - 6);

    ctx.fillStyle = this.blueprint.frameColor;
    ctx.fillRect(
      this.xPos,
      this.crossBarY,
      this.width,
      3
    )
  }
}

export default Window;