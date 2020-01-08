import Building from './building';
import { randomBetween, sampleFrom } from '../helpers';
import constants from '../constants';
import CanvasSkeleton from '../canvasSkeleton'

const STREET_LEVEL = 0.8;

class City extends CanvasSkeleton {
  constructor(width, height, canvas) {
    super(width, height, canvas)
    this.ctx.translate(0, 15);

    this.buildingLogs = [];
    this.initBuildings();
    window.buildings = [];
    window.city = this;
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
      let newWidth = this.tryAddingBlockWidth(blockWidth, buildingIndex);

      buildingIndex += newWidth;
    }
  }

  tryAddingBlockWidth(blockWidth, buildingIndex) {
    let blockCountOptions = []
    let newWidth = blockWidth;
    const remainingSpace = (this.width - buildingIndex);

    if (remainingSpace > blockWidth) {
      blockCountOptions.push(1);
      if (remainingSpace > (blockWidth * 2)) {
        blockCountOptions = blockCountOptions.concat([2, 2, 2, 2, 2])
      }
      if (remainingSpace > (blockWidth * 3)) {
        blockCountOptions = blockCountOptions.concat([3, 3])
      }

      const blockCount = sampleFrom(blockCountOptions);
      newWidth = blockCount * blockWidth;

      const newBuilding = new Building(
        buildingIndex, // x position
        this.streetLevel, // y position (from the bottom)
        newWidth, // width of the building
        blockWidth, // width of a single block
        this.ctx
      )

      this.buildingLogs.push({
        blockCount,
        blockWidth,
        newWidth,
        blockCountOptions
      });

      if (isNaN(newWidth)) {
        window.stopRightNow = "because of line 69";
      }

      this.buildings.push(newBuilding);
      return newWidth;

    } else if (blockWidth > constants.BLOCK_MIN_WIDTH) {
      return this.tryAddingBlockWidth(constants.BLOCK_MIN_WIDTH, buildingIndex);
    }
  }

  reset() {
    window.buildings = [];
    this.buildingLogs = [];

    super.reset();
  }

  draw() {
    this.buildings.forEach((b) => {
      b.draw(this.ctx);
      window.buildings.push(b);
    })
    this.buildings.forEach((b) => {
      b.roof.drawLast(this.ctx);
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