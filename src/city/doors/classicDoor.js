import _Door from './_door';

class ClassicDoor extends _Door {

  draw(ctx) {
    super.draw(ctx);
    this._drawDoorknob(ctx);
  }
}

export default ClassicDoor;