import { glassColor, randomBetween, coordinatesToUnique } from '../helpers';
// import constants from '../constants';

import Window from './window';

class WindowBlueprint {
  constructor(building) {
    this.building = building;
    this._initColors();
    this._initSizes();
    this._initWindows();
  }

  _initSizes() {
    const storyHeight = this.building.storyHeight();
    this.bufferTop = randomBetween(10, storyHeight/3);
    this.bufferBottom = randomBetween(15, storyHeight/3);
    this.bufferX = 10;

    this.width = this.building.blockWidth - (2 * this.bufferX);
    this.height = storyHeight - this.bufferTop - this.bufferBottom;

    this.crossBarOffset = (this.height * Math.random() / 2);
  }
  _initColors() {
    this.frameColor = this.building.whiteColor;
    this.glassColor = glassColor();
  }

  _initWindows() {
    this.windows = [];
    for(let i = 0; i < this.building.stories(); i++) {
      for (let j = 0; j < this.building.blocksWide; j++) {
        if (this.building.doorPosition != coordinatesToUnique(i, j)) {
          this.windows.push(this._createWindow(i, j));
        }
      }
    }
  }

  _createWindow(row, column) {
    return new Window(row, column, this, this.building);
  }

  draw(ctx) {
    this.windows.forEach((w) => { w.draw(ctx); });
  }

}

export default WindowBlueprint;