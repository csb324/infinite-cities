import chroma from 'chroma-js';

export const qs = selector => document.querySelector(selector);

export const randomBetween = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2) * 1;
}

export const coinFlip = (chances = 0.5) => {
  return (Math.random() < chances);
}

export const chooseBetween = (howManyOptions) => {
    const max = Math.floor(howManyOptions);
    return Math.floor(Math.random() * (max)) + 1;
}

export const sampleFrom = (arr) => {
  let i = Math.floor(Math.random() * arr.length);
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


export const whiteColor = () => {
  return chroma.cubehelix()
    .start(340)
    .hue(randomBetween(1.0, 1.5))
    .rotations(0.25)
    .lightness(randomBetween(0.9, 1))
    .scale()(Math.random());
}

export const glassColor = () => {
  return chroma.cubehelix()
    .start(140)
    .hue(0.9)
    .rotations(0.25)
    .lightness(randomBetween(0.1, 0.4))
    .scale()(Math.random());
}

export const coordinatesToUnique = (i, j) => {
  return 100 * i + j;
}
