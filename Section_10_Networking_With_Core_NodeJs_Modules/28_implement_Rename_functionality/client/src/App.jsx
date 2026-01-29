import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [directoryItems, setDirectoryItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const [newFileName, setnewFileName] = useState('');

  const URL = 'http://[2409:40d5:103a:12c9:9007:f4d1:e60f:936f]/';

  async function getDirectoryItems() {
    const response = await fetch(URL);
    const data = await response.json();
    setDirectoryItems(data);
  }
  async function uploadFile(e) {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL, true);
    xhr.setRequestHeader('filename', file.name);
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      getDirectoryItems();
    });
    xhr.upload.addEventListener('progress', (e) => {
      const totalProgress = (e.loaded / e.total) * 100;
      setProgress(totalProgress.toFixed(2));
      // console.log(`${totalProgress.toFixed(2)}% Uploaded`);
    });
    xhr.send(file);
  }
  async function handleDelete(filename) {
    const response = await fetch(URL, {
      method: 'DELETE',
      body: filename,
    });
    const data = await response.text();
    console.log(data);
    getDirectoryItems();
  }
  async function handleRename(oldFilename) {
    setnewFileName(oldFilename);
    console.log(newFileName);
  }
  async function handleSave(oldFilename) {
    setnewFileName(oldFilename);
    const response = await fetch(URL, {
      method: 'PATCH',
      body: JSON.stringify({ oldFilename, newFileName }),
    });
    const data = await response.text();
    console.log(data);
    getDirectoryItems();
    setnewFileName('');
  }
  useEffect(() => {
    getDirectoryItems();
  }, []);
  return (
    <>
      <h1>My Files</h1>
      <input type='file' onChange={uploadFile} />
      <input
        type='text'
        onChange={(e) => setnewFileName(e.target.value)}
        value={newFileName}
      />
      <p>Progress: {progress}%</p>
      {directoryItems.map((item, i) => (
        <div key={i}>
          {item} <a href={`${URL}${item}?action=open`}>Open</a>{' '}
          <a href={`${URL}${item}?action=download`}>Download</a>
          <button
            onClick={() => {
              handleRename(item);
            }}
          >
            Rename
          </button>
          <button
            onClick={() => {
              handleSave(item);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              handleDelete(item);
            }}
          >
            Delete
          </button>
          <br />
        </div>
      ))}
    </>
  );
}

export default App;
