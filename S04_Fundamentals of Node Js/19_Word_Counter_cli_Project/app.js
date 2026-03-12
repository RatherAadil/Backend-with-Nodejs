import { readFile } from 'node:fs/promises';
import { exit } from 'node:process';
const filePath = process.argv[2];
const userWord = process.argv[3];

if (!filePath) {
  console.log('FilePath was not provided');
  exit(1);
}
const content = await readFile(`${filePath}`, 'utf-8');

export function countWords(content, userWord) {
  let wordsCount = {};
  const wordsArray = content.split(/[\W]/).filter((w) => w);
  wordsArray.forEach((word) => {
    if (word in wordsCount) {
      wordsCount[word] += 1;
    } else {
      wordsCount[word] = 1;
    }
  });

  if (!userWord) {
    console.log(wordsCount);
    return;
  }
  let userWordObject = {};
  userWordObject[userWord] = wordsCount[userWord] || 0;
  console.log(wordsCount);
  console.log(userWordObject);
}
countWords(content, userWord);
