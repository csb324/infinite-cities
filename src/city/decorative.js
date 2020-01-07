import { sampleFrom } from '../helpers';

const BRICK_HEIGHT = 5;
const BRICK_WIDTH = BRICK_HEIGHT * 2;

class Decorative {
  constructor(building, level) {
    this.building = building;
    this.width = building.width;
    this.xPos = building.xPos;
    this.yPos = building.edges().bottom - (level * building.storyHeight);

    this.setUpBrickLine();
  }

  setUpBrickLine() {
    this.height = BRICK_HEIGHT;

    this.darkColor = this.building.shadowColor();
    this.lightColor = this.building.highlightColor();
  }

  drawBrickLine(ctx) {
    ctx.fillStyle = this.darkColor;
    ctx.fillRect(this.xPos, this.yPos - 1, this.width, this.height + 2);

    let xPos = this.xPos + 1;
    const xLimit = (this.xPos + this.width) - BRICK_WIDTH;
    while (xPos < xLimit) {
      ctx.fillStyle = sampleFrom([
        this.building.wallColor,
        this.building.wallColor,
        this.building.wallColor,
        this.building.wallColor,
        this.lightColor,
        this.lightColor,
        this.darkColor
      ]);
      ctx.fillRect(xPos, this.yPos, BRICK_WIDTH, this.height);
      xPos += BRICK_WIDTH;
      xPos += 2;
    }

  }

  draw(ctx) {
    this.drawBrickLine(ctx);
  }

}

export default Decorative;