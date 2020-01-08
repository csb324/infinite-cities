// This isn't in "windows" bc it's more of an
// architectural element than a window per se.
// but that's what they're called
// don't fight me
// i didnt invent the bay window

import constants from '../constants';
import { sampleFrom, randomBetween } from '../helpers';
import { softLightShadow, softLightHighlight, concreteColor, metalColor, roofColor } from '../colorHelpers';


class BayWindow {
  constructor(building) {
    this.building = building;

    this.height = this.building.height;
    this.width = this.building.blockWidth;
    this.eachWidth = randomBetween(10, this.width / 4);

    this.unit = this._getBayWindowUnit(this.building.doorPosition);
    this.xPosition = this.building.unitXPosition(this.unit);
    this.xEnd = this.xPosition + this.width;
    this.yPosition = this.building.edges().top;
  }

  _getBayWindowUnit(doorPosition) {
    const possibleUnits = Array(this.building.blocksWide)
      .fill()
      .map((_x,i)=>i)
      .filter((i) => {
        return (i != doorPosition)
      });

    return sampleFrom(possibleUnits);
  }

  draw(ctx) {
    ctx.globalCompositeOperation = 'soft-light';

    ctx.fillStyle = softLightHighlight;
    ctx.fillRect(this.xPosition, this.yPosition, this.eachWidth, this.height);

    ctx.fillStyle = softLightShadow;
    ctx.fillRect(this.xEnd, this.yPosition, -this.eachWidth, this.height);

    ctx.globalCompositeOperation = 'source-over'; // reset
  }

  drawLast(ctx) {
    const topperColor = sampleFrom([concreteColor().darken(1.1), metalColor(), roofColor()]);
    const topperHeight = 10;
    const topperY = this.yPosition - topperHeight/2;


    ctx.fillStyle = topperColor;
    ctx.fillRect(this.building.xPos, topperY, this.building.width, topperHeight);
    ctx.globalCompositeOperation = 'soft-light';

    ctx.fillStyle = softLightHighlight;
    ctx.fillRect(this.xPosition, topperY, this.eachWidth, topperHeight);

    ctx.fillStyle = softLightShadow;
    ctx.fillRect(this.xEnd, topperY, -this.eachWidth, topperHeight);
    ctx.globalCompositeOperation = 'source-over'; // reset

  }
}

export default BayWindow;