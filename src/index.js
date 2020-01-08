import { qs } from './helpers';
import City from './city';
import constants from './constants';

const canvas = qs('#app-canvas');
const button = qs('#do-something');
const button2 = qs('#find-broken');

window.stopRightNow = false;

const city = new City(1000, constants.CANVAS_HEIGHT, canvas);
city.run();

button.addEventListener('click', function(e) {
  e.preventDefault();
  city.reset();
  city.run();
});

let iterations = 0;

function runCityOnTimer() {
  setTimeout(() => {
    city.reset();
    city.run();
    iterations += 1
    if ( window.stopRightNow == false && iterations < 10000) {
      runCityOnTimer();
    }
  }, 100);
}

button2.addEventListener('click', function(e) {
  e.preventDefault();
  iterations = 0;
  runCityOnTimer();
});
