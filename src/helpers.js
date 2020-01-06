import chroma from 'chroma-js';

export const qs = selector => document.querySelector(selector);

export const randomBetween = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2) * 1;
}

export const wallColor = () => {
  return chroma.cubehelix()
    .start(randomBetween(0, 500))
    .hue(randomBetween(1, 2))
    .rotations(3)
    .lightness([0.5,0.85])
    .scale()(Math.random());
}
