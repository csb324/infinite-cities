import Building from './building';
import { randomBetween } from '../helpers';
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
      let newWidth = randomBetween(constants.BUILDING_MIN_WIDTH, constants.BUILDING_MAX_WIDTH);
      if (buildingIndex + newWidth < this.width) {
        this.buildings.push(new Building(buildingIndex, this.streetLevel, newWidth, this.ctx));        
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