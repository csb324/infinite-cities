import chroma from 'chroma-js';
import constants from '../constants';
import { randomBetween, coinFlip, chooseBetween } from '../helpers';
import { roofColor, metalColor } from '../colorHelpers';

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

  get yPos() {
    return this.building.edges().top - this.height;
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

  _getChimneyProtrusion(chimneyTopperHeight, chimneyOverlapY) {
    const maxPossibleHeight = this.yPos;
    const buildingStory = this.building.storyHeight;
    const min = 2 * chimneyTopperHeight;
    let max = Math.min(maxPossibleHeight,buildingStory, this.height);
    if (chimneyOverlapY > 0) {
      max = Math.min(max, chimneyOverlapY)
    }
    return randomBetween(min, max);
  }

  _drawChimney(ctx) {
    const chimneyTopperHeight = randomBetween(5, 10); // this is relevant for total height
    let chimneyOverlapY = 0;
    if (coinFlip()) {
      chimneyOverlapY = this.height * randomBetween(0.3, 0.6);
    }

    const chimneyProtrusion = this._getChimneyProtrusion(chimneyTopperHeight, chimneyOverlapY);
    const chimneyHeight = chimneyOverlapY + chimneyProtrusion;
    const chimneyYStart = this.yPos - chimneyProtrusion;

    const chimneyXOffset = this.building.blockWidth * randomBetween(0.1, 0.2);
    const chimneyWidth = chooseBetween(10) + 15;

    let chimneyXStart = this.building.edges().left + chimneyXOffset;
    if (coinFlip()) {
      chimneyXStart = this.building.edges().right - chimneyWidth - chimneyXOffset;
    }

    ctx.fillStyle = this.building.accentColor;
    ctx.fillRect(chimneyXStart, chimneyYStart, chimneyWidth, chimneyHeight);

    this._drawChimneyTopper(ctx, chimneyTopperHeight, chimneyWidth, chimneyXStart, chimneyYStart)
  }

  _drawChimneyTopper(ctx, height, width, xStart, yStart) {
    const xOffset = randomBetween(1, 4);
    const topperWidth = width + (2 * xOffset);

    this.topperInfo = {
      xstart: xStart - xOffset,
      ystart: yStart - 1,
      topperWidth: topperWidth,
      xOffset: xOffset,
      chimneyWidth: width
    };

    ctx.fillStyle = metalColor();
    ctx.fillRect(xStart - xOffset, yStart - (height/2), topperWidth, height);

  }

  _drawShadow(ctx) {
    const edges = this.building.edges();
    ctx.fillStyle = this.building.shadowColor().alpha(0.5);
    ctx.fillRect(edges.left, edges.top, this.width, randomBetween(3, 12));
  }
  _drawSunlight(ctx) {
    const edges = this.building.edges();
    ctx.fillStyle = this.color.brighten(1.1).alpha(0.5);
    ctx.fillRect(edges.left, this.yPos, this.width, this.height * randomBetween(0.4, 0.2));
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    const edges = this.building.edges();
    ctx.fillRect(edges.left, this.yPos, this.width, this.height);

    if (coinFlip(0.3)) {
      this.hasPeak = true;
    } else {
      this._drawShadow(ctx);
      if (coinFlip()) {
        this._drawSunlight(ctx)
      }

      if(coinFlip()) {
        this._drawChimney(ctx);
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