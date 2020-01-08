import ClassicDoor from './classicDoor';
import WindowDoor from './windowDoor';
import { chooseBetween } from '../../helpers'

function doorFactory(building, unit) {
  // return new WindowDoor(building, unit);

  switch (chooseBetween(2)) {
    case 1:
      return new ClassicDoor(building, unit);
    case 2:
      return new WindowDoor(building, unit);

    default:
      console.log('UH OH NO DOORS')
      break;
  }
}

export default doorFactory;