const o = {
  x: 1,
  y: 2,
  z: 3,
};

const x = o.x;
const y = o.y;
const z = o.z;

// Destructuring (objet)
const { x, y, z } = o;
const [a, b, c] = array;

// Rest operator
const { x, ...o2 } = o; // x = 1, o2 = {y: 2, z: 3}
const [a, ...tail] = array; // a = 1, tail = [2, 3]

const sum = (n, ...numbers) =>
  numbers.reduce((a, b) => a + b, n);

// Shorthand properties
const o = { x, y, z }; // { x: x, y: y, z: z };

// Spread operator
// x = 1
// o2 = {y: 2, z: 3}
const o = { x, ...o2 }; // o = {x: 1, y: 2, z: 3}
const a = [1, ...array1, ...array2, 3];

sum(1, 2, ...[3, 4]);
