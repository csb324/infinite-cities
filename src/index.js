import { qs } from './helpers';
import City from './city';
import constants from './constants';

const canvas = qs('#app-canvas');
const button = qs('#do-something');

const city = new City(800, constants.CANVAS_HEIGHT, canvas);

city.run();

button.addEventListener('click', function(e) {
  e.preventDefault();
  console.log('clicked');

  city.reset();
  city.run();
});

console.log(button);
