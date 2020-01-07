import { randomBetween, wallColor } from '../helpers';
import constants from '../constants';

import Wall from './wall';
import Roof from './roof';
import Door from './door';
import Decorative from './decorative';

class Building {
  constructor(xPos, yPos, width, blockWidth, context) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.blockWidth = blockWidth;
    this.ctx = context;

    this.initHeight();
    this.initColors();
    this.initElements();
  }

  initHeight() {
    const smallest = constants.AVG_STORY_HEIGHT;
    const tallest = this.yPos - constants.PADDING_X; // for a buffer
    this.height = randomBetween(smallest, tallest);
  }

  stories() {
    return Math.floor(this.height / constants.AVG_STORY_HEIGHT);
  }
  storyHeight() {
    return this.height / this.stories();
  }

  edges() {
    return {
      left: this.xPos,
      right: this.xPos + this.width,
      bottom: this.yPos,
      top: this.yPos - this.height
    };
  }

  initElements() {
    this.wall = new Wall(this);
    this.roof = new Roof(this);
    this.door = new Door(this);
    this.decoratives = [];

    for(let i = 1; i <= this.stories(); i++) {
      this.decoratives.push(new Decorative(this, i));
    }
  }

  initColors() {
    this.wallColor = wallColor();
  }

  shadowColor() {
    return this.wallColor.darken(1.05);
  }
  highlightColor() {
    return this.wallColor.brighten(1.05);
  }


  draw(ctx) {
    this.wall.draw(ctx);
    this.door.draw(ctx);
    this.decoratives.forEach((d) => {
      d.draw(ctx);
    });
    this.roof.draw(ctx);
  }
}

export default Building;
