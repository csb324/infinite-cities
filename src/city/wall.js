class Wall {
  constructor(building) {
    this.building = building;
    this.width = building.width;
    this.height = building.height;
    this.color = building.wallColor;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;

    const edges = this.building.edges();
    ctx.fillRect(edges.left, edges.top, this.width, this.height);

  }

  drawBayWindow(ctx) {
    // this.wall.drawBayWindow(ctx, this.doorPosition);

    const whichUnit = this.building.blocksWide;

    const edges = this.building.edges();
    ctx.fillRect(edges.left, edges.top, this.width, this.height);

  }
}

export default Wall;