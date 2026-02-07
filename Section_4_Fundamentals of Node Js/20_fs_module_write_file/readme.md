### Writing Data To file

1. writeFile(path,data)

   - If file does not exist it creates a new one and write the data
   - If file already exist then overwrite the data in the existing data means if there is
     some data in the existing file it remove eveything then write a new data.

2. appendFile(path,data)
   - If file does not exist it creates a new one and write the data
   - If file already exist then it add data in the existing content.
   - Means your existing file data is still there and new data is also added in the file

#### Use appendFile while doing error logging in the catch block use convention [.log] with the file ex: fileError.log

- `readFile and writeFile` are not limit to the txt file we can read and write any kind of
  files because it copys the binary data so we can write it in any file.
  If i read file.png then i should write it to the same extension file for their
  compatibility.But it is not compulsary you can change the extension manually

#### Always use try/catch block with await keyword

### Task 1: Read the contents of a file and write it to another file

```javascript
const contentBuffer = await readFile('./file.txt');
writeFile('file-1.txt', contentBuffer);
```

### Task 2: Read the image from local folder and write it to the Desktop

```javascript
try {
  const imageBuffer = await readFile('./imagess.png');
  writeFile('C:\\Users\\ADIL\\Desktop\\image.png', imageBuffer);
} catch (err) {
  appendFile(
    'error.log',
    `\\n${new Date().toLocaleTimeString()}\n${err.message}\n${err.stack}`
  );
}
```

- Actually the imageBuffer contains the data in the form of 0's and 1's so when we write back it becomes the image which is also in the form of 0's and 1's
