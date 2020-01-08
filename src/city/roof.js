import chroma from 'chroma-js';
import constants from '../constants';
import { randomBetween, coinFlip, chooseBetween } from '../helpers';
import { roofColor } from '../colorHelpers';

class Roof {
  constructor(building) {
    this.building = building;
    this.width = building.width;
    let maxHeight = Math.min(
      building.storyHeight,
      building.edges().top
    );
    this.height = randomBetween(10, maxHeight);
    this.color = roofColor();
  }

  drawPeak(ctx) {
    const whichUnit = chooseBetween(this.building.blocksWide) - 1

    const edges = this.building.edges();
    const blockOffset = (whichUnit * this.building.blockWidth);
    const offset = 5;
    ctx.fillStyle = this.building.wallColor;
    ctx.strokeStyle = this.color.darken(1.1);
    ctx.lineWidth = offset * 1.5;

    ctx.beginPath();

    const leftCorner = edges.left - offset + blockOffset;
    const rightCorner = edges.left + this.building.blockWidth + offset + blockOffset;
    const xCenter = (leftCorner + rightCorner) / 2;

    const maxHeight = Math.max(edges.top - (this.height * 1.5), offset * 1.5);
    const actualHeight = randomBetween(edges.top - (this.building.blockWidth / 4), maxHeight);

    ctx.moveTo(leftCorner, edges.top);
    ctx.lineTo(xCenter, actualHeight);
    ctx.lineTo(rightCorner, edges.top);
    ctx.fill();
    ctx.stroke();
  }

  drawShadow(ctx) {
    const edges = this.building.edges();
    ctx.fillStyle = this.building.shadowColor().alpha(0.5);
    ctx.fillRect(edges.left, edges.top, this.width, randomBetween(3, 12));
  }
  drawSunlight(ctx) {
    const edges = this.building.edges();
    ctx.fillStyle = this.color.brighten(1.1).alpha(0.5);
    ctx.fillRect(edges.left, edges.top - this.height, this.width, this.height * randomBetween(0.4, 0.2));
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    const edges = this.building.edges();
    ctx.fillRect(edges.left, edges.top - this.height, this.width, this.height);

    if (coinFlip(0.3)) {
      this.hasPeak = true;
    } else {
      this.drawShadow(ctx);
      if (coinFlip(0.5)) {
        this.drawSunlight(ctx)
      }
    }
  }

  drawLast(ctx) {
    if (this.hasPeak) {
      this.drawPeak(ctx);
    }
  }
}

window.chroma = chroma;
export default Roof;