import { watch } from 'node:fs';
import { rename, copyFile, cp, unlink, rmdir, stat } from 'node:fs/promises';
//Rename
// rename('useImg.png', 'node.png');

//Copy
// copyFile('node.png', 'useImg.png');

//move
// rename(
//   'C:\\Users\\ADIL\\Desktop\\Backend with Node Js\\Fundamentals of Node Js\\21_fs_module_file_operation\\src\\node.png',
//   './node.png'
// );

//Delete a file
// unlink('temp.txt');

//Delete Empty Folder
// rmdir('./src');

//stats of a file
// const stats = await stat('app.js');
// console.log(stats);

//Watch a file for changes
watch('file.txt', (eventType, filename) => console.log(eventType, filename));
