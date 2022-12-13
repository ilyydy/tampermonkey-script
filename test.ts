import { fileURLToPath } from 'node:url';

console.log(new URL('../a.js', import.meta.url));
// const p = fileURLToPath();
// console.log(p);

// console.log(import.meta.url);
