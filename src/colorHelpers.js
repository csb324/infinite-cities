import chroma from 'chroma-js';
import { randomBetween } from './helpers';

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


export const accentColor = () => {
  return chroma.cubehelix()
    .start(150)
    .hue(randomBetween(1, 1.8))
    .rotations(2.25)
    .lightness(randomBetween(0.3, 0.7))
    .scale()(Math.random());
}
