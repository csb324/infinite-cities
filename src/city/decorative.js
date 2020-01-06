import chroma from 'chroma-js';
import constants from '../constants';
import { randomBetween } from '../helpers';

class Decorative {
  constructor(building, level) {
    this.building = building;
    this.width = building.width;    
    this.xPos = building.xPos;
    this.yPos = building.edges().bottom - (level * building.storyHeight());
    
    this.setUpBrickLine();
  }
  
  setUpBrickLine() {
    this.height = 5;
    this.darkColor = this.building.shadowColor();
    this.lightColor = this.building.highlightColor();

  }
  
  drawBrickLine(ctx) {
    ctx.fillStyle = this.darkColor;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);    
  }
  
  draw(ctx) {
    this.drawBrickLine(ctx);
  }

}

export default Decorative;