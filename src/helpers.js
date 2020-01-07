import chroma from 'chroma-js';

export const qs = selector => document.querySelector(selector);

export const randomBetween = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2) * 1;
}

export const sampleFrom = (arr) => {
  let i = Math.floor(randomBetween(0, arr.length));
  return arr[i];
}

export const wallColor = () => {
  return chroma.cubehelix()
    .start(randomBetween(0, 500))
    .hue(randomBetween(1, 2))
    .rotations(3)
    .lightness([0.5,0.85])
    .scale()(Math.random());
}

export const roofColor = () => {
  return chroma.cubehelix()
    .start(90)
    .hue(randomBetween(0.3, 0.6))
    .rotations(0.5)
    .lightness(randomBetween(0.1, 0.4))
    .scale()(Math.random());
}