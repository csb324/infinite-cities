import Building from './building';
import { randomBetween, sampleFrom } from '../helpers';
import constants from '../constants';
import CanvasSkeleton from '../canvasSkeleton'

const STREET_LEVEL = 0.8;

class City extends CanvasSkeleton {
  constructor(width, height, canvas) {
    super(width, height, canvas)
    this.initBuildings();
  }

  initAll() {
    this.initCanvas();
    this.initBuildings();
  }

  initBuildings() {
    this.streetLevel = this.height * STREET_LEVEL;
    this.buildings = [];
    let buildingIndex = constants.PADDING_X;

    while (buildingIndex < this.width) {
      const blockWidth = randomBetween(constants.BLOCK_MIN_WIDTH, constants.BLOCK_MAX_WIDTH);
      const blockCount = sampleFrom([1, 1, 2, 2, 2, 2, 2, 3])
      const newWidth = blockCount * blockWidth;
      if (buildingIndex + newWidth < this.width) {
        this.buildings.push(new Building(buildingIndex, this.streetLevel, newWidth, blockWidth, this.ctx));
      }
      buildingIndex += newWidth;
    }
  }

  draw() {
    console.log(this.ctx);
    this.buildings.forEach((b) => {
      b.draw(this.ctx);
      window.building = b;
    })

    // WHERE THE THINGS GO!
  }

  run() {
    this.initAll();
    this.draw();
    return this.canvas;
  }
}

export default City;