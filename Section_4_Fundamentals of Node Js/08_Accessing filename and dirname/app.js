import { meta } from './meta.js';
const { filename, dirname } = meta;
console.log(filename, '\n', dirname);
console.log(process.cwd());
