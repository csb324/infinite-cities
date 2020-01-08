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

export const coordinatesToUnique = (i, j) => {
  return 100 * i + j;
}
