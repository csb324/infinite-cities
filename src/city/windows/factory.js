import ModernWindow from './modernBlueprint';
import ShuttersWindow from './shuttersBlueprint';
import ClassicWindow from './classicBlueprint';
import { chooseBetween } from '../../helpers'

function windowFactory(building) {

  switch (chooseBetween(3)) {
    case 1:
      return new ShuttersWindow(building);
    case 2:
      return new ModernWindow(building);
    case 3:
      return new ClassicWindow(building);
    default:
      console.log('UH OH NO WINDOWS')
      break;
  }
}

export default windowFactory;