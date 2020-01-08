import chroma from 'chroma-js';
import { randomBetween, coordinatesToUnique, sampleFrom } from '../helpers';
import { wallColor, whiteColor, accentColor } from '../colorHelpers';
import constants from '../constants';

import Wall from './wall';
import Roof from './roof';
import Door from './door';
// import Window from './window';
import Decorative from './decorative';
import windowFactory from './windows/factory';


class Building {
  constructor(xPos, yPos, width, blockWidth, context) {
    this.xPos = xPos;
    this.yPos = yPos;

    this.ctx = context;

    this.initColors();
    this.initWidth(width, blockWidth);
    this.initHeight();
    this.initElements();
  }

  initColors() {
    this.wallColor = wallColor();
    this.whiteColor = whiteColor();

    this.accentColor = accentColor();

    if (chroma.contrast(this.accentColor, this.wallColor) < 1.2) {
      if (Math.random() > 0.5) {
        this.accentColor = this.accentColor.darken(2);
      } else {
        this.accentColor = this.accentColor.brighten(1);
      }
    }
  }

  initWidth(width, blockWidth) {
    this.width = width;
    this.blockWidth = blockWidth;
    this.blocksWide = Math.round(this.width / this.blockWidth);

    if (isNaN(this.width) || isNaN(this.blockWidth)) {
      window.stopRightNow = "because of building.js#33";
    }
  }

  initHeight() {
    this._storyHeight = (constants.AVG_STORY_HEIGHT * randomBetween(1, 1.5));
    this._stories = sampleFrom([1, 1, 2, 2, 2, 3]);
    this.height = this._stories * this._storyHeight;
  }

  get stories() {
    return this._stories;
  }
  get storyHeight() {
    return this._storyHeight;
  }

  unitXPosition(unitNumber) {
    return this.edges().left + (unitNumber * this.blockWidth);
  }

  ceilingYPosition(story) {
    return this.edges().bottom - ((story + 1) * this._storyHeight);
  }

  edges() {
    return {
      left: this.xPos,
      right: this.xPos + this.width,
      bottom: this.yPos,
      top: this.yPos - this.height
    };
  }

  initDoor() {
    const doorUnit = Math.floor(randomBetween(0, this.blocksWide - 0.1));
    this.door = new Door(this, doorUnit);
    this.doorPosition = coordinatesToUnique(0, doorUnit);
  }

  initElements() {
    this.wall = new Wall(this);
    this.roof = new Roof(this);
    this.initDoor();
    this.windowSet = windowFactory(this);

    this.decoratives = [];
    for(let i = 1; i <= this._stories; i++) {
      this.decoratives.push(new Decorative(this, i));
    }
  }


  shadowColor() {
    return this.wallColor.darken(1.05);
  }
  highlightColor() {
    return this.wallColor.brighten(1.05);
  }

  draw(ctx) {
    this.wall.draw(ctx);
    this.decoratives.forEach((d) => {
      d.draw(ctx);
    });
    this.windowSet.draw(ctx);
    this.door.draw(ctx);
    this.roof.draw(ctx);
  }
}

export default Building;
