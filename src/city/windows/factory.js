import ModernWindow from './modernBlueprint';
import ShuttersWindow from './shuttersBlueprint';

function windowFactory(building) {
  if (Math.random() > 0.5) {
    return new ShuttersWindow(building);
  } else {
    return new ModernWindow(building);
  }
}

export default windowFactory;