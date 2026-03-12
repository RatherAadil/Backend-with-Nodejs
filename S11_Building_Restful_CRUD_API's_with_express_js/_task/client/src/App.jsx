import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const URL = 'http://192.168.224.27:4000/';
  const [directoryItems, setDirectoryItems] = useState([]);
  const [trashBinFiles, setTrashBinFiles] = useState([]);
  const [tooltipMessage, setTooltipMessage] = useState('');

  const [progress, setProgress] = useState(0);
  const [newFilename, setNewFilename] = useState('');

  async function getDirectoryItems() {
    const response = await fetch(URL);
    const { files, trashFiles } = await response.json();
    setDirectoryItems(files);
    setTrashBinFiles(trashFiles);
  }

  useEffect(() => {
    getDirectoryItems();
  }, []);

  async function uploadFile(e) {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${URL}${file.name}`, true);
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      getDirectoryItems();
    });
    xhr.upload.addEventListener('progress', (e) => {
      const totalProgress = (e.loaded / e.total) * 100;
      setProgress(totalProgress.toFixed(2));
    });
    xhr.send(file);
  }

  async function handleDelete(filename) {
    const response = await fetch(`${URL}${filename}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    setTooltipMessage(data.message);
    getDirectoryItems();
  }

  async function renameFile(oldFilename) {
    setNewFilename(oldFilename);
  }

  async function saveFilename(oldFilename) {
    setNewFilename(oldFilename);
    const response = await fetch(`${URL}${oldFilename}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newFilename }),
    });
    const data = await response.text();
    console.log(data);
    setNewFilename('');
    getDirectoryItems();
  }
  async function handleRestore(filename) {
    const response = await fetch(`${URL}${filename}`, {
      method: 'PUT',
    });
    const data = await response.json();
    console.log(data);
    getDirectoryItems();
  }
  return (
    <>
      <h1>My Files</h1>
      <input type='file' onChange={uploadFile} />
      <input
        type='text'
        onChange={(e) => setNewFilename(e.target.value)}
        value={newFilename}
      />
      <p>Progress: {progress}%</p>
      {tooltipMessage && <p>Message:{tooltipMessage}</p>}
      {directoryItems.map((item, i) => (
        <div key={i}>
          {item} <a href={`${URL}${item}?action=open`}>Open</a>{' '}
          <a href={`${URL}${item}?action=download`}>Download</a>
          <button onClick={() => renameFile(item)}>Rename</button>
          <button onClick={() => saveFilename(item)}>Save</button>
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
      <h2>Trash Bin</h2>
      {trashBinFiles.map((item, i) => (
        <div key={i}>
          {item}{' '}
          <button
            onClick={() => {
              handleRestore(item);
            }}
          >
            {' '}
            Restore
          </button>
          <br />
        </div>
      ))}
    </>
  );
}

export default App;
