import Building from './building';
import { randomBetween, sampleFrom } from '../helpers';
import { concreteColor, roofColor } from '../colorHelpers';
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
    let newWidth = 0;

    while (buildingIndex < this.width) {
      const blockWidth = randomBetween(constants.BLOCK_MIN_WIDTH, constants.BLOCK_MAX_WIDTH);
      newWidth = this.tryAddingBlockWidth(blockWidth, buildingIndex);

      buildingIndex += newWidth;
    }
    const buildingEnd = buildingIndex - newWidth;
    return (this.width - buildingEnd) / 2;
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
    } else {
      return constants.BLOCK_MIN_WIDTH;
    }
  }

  reset() {
    window.buildings = [];
    this.buildingLogs = [];

    super.reset();
  }

  drawSidewalk(xOffset) {
    this.ctx.fillStyle = concreteColor();
    this.sidewalkHeight = randomBetween(8, 12);
    const sidewalkWidth = this.width - (2 * xOffset) + constants.PADDING_X;
    this.ctx.fillRect(0, this.streetLevel, sidewalkWidth, this.sidewalkHeight);
  }

  drawRoad() {
    this.ctx.fillStyle = roofColor();
    const roadHeight = randomBetween(30, 35);
    this.ctx.fillRect(-constants.BLOCK_MIN_WIDTH, this.streetLevel + this.sidewalkHeight, this.width + constants.BLOCK_MIN_WIDTH, roadHeight);
  }

  draw() {
    let xOffset = this.initBuildings();
    this.ctx.translate(xOffset, 0);

    this.buildings.forEach((b) => {
      b.draw(this.ctx);
      window.buildings.push(b);
    });
    this.buildings.forEach((b) => {
      b.roof.drawLast(this.ctx);
    });

    this.drawSidewalk(xOffset);
    this.drawRoad();

    this.ctx.translate(-xOffset, 0);
  }

  run() {
    this.initAll();
    this.draw();
    return this.canvas;
  }
}

export default City;