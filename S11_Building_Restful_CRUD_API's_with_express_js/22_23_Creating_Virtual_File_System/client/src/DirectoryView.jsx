import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function DirectoryView() {
  const BASE_URL = 'http://localhost:4000';
  const [directoryItems, setDirectoryItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const [newFilename, setNewFilename] = useState('');
  const [fileToRename, setFileToRename] = useState(null);
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [uiTooltip, setUiTooltip] = useState('');
  const { '*': dirPath } = useParams();

  async function getDirectoryItems() {
    const response = await fetch(`${BASE_URL}/directory/${dirPath}`);
    const data = await response.json();
    setDirectoryItems(data);
  }
  useEffect(() => {
    getDirectoryItems();
  }, [dirPath]);

  async function uploadFile(e) {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${BASE_URL}/files/${dirPath}/${file.name}`, true);
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
    const response = await fetch(
      `${BASE_URL}/files${dirPath ? `/${dirPath}` : ''}/${filename}`,
      {
        method: 'DELETE',
      },
    );
    const data = await response.text();
    console.log(data);
    getDirectoryItems();
  }

  async function renameFile(oldFilename) {
    setFileToRename(oldFilename);
    setNewFilename(oldFilename);
  }

  async function saveFilename() {
    console.log(
      'Frontend: ',
      `${BASE_URL}/files${dirPath ? `/${dirPath}` : ''}/${fileToRename}`,
    );
    const response = await fetch(
      `${BASE_URL}/files${dirPath ? `/${dirPath}` : ''}/${fileToRename}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newFilename: `${dirPath}/${newFilename}` }),
      },
    );
    const data = await response.text();
    console.log(data);
    // setTooltip(data);
    setFileToRename(null);
    setNewFilename('');
    getDirectoryItems();
  }

  async function handleFolderCreation() {
    if (folderName === '') {
      setUiTooltip('Please enter a folder name');
      return;
    }
    const URL = `${BASE_URL}/directory${dirPath ? '/' + dirPath : ''}/${folderName}`;
    const response = await fetch(URL, {
      method: 'POST',
    });
    const data = await response.text();
    console.log(data);
    setCreateFolder(false);
    setFolderName('');
    setUiTooltip('');
    getDirectoryItems();
  }
  return (
    <>
      <h1>My Files</h1>
      <input type='file' onChange={uploadFile} />
      <p>Progress: {progress}%</p>
      {fileToRename && (
        <div style={{ padding: '20px 0' }}>
          <label htmlFor='renameInput'>Enter new name: </label>
          <input
            type='text'
            id='renameInput'
            value={newFilename}
            onChange={(e) => setNewFilename(e.target.value)}
          />
          <button onClick={saveFilename}>Save</button>
        </div>
      )}

      {directoryItems.map(({ name, isDirectory }, i) => (
        <div key={i}>
          {name} {isDirectory && <Link to={`./${name}`}>Open</Link>}
          {!isDirectory && (
            <a href={`${BASE_URL}/files/${dirPath}/${name}?action=open`}>
              Open
            </a>
          )}
          {!isDirectory && (
            <a href={`${BASE_URL}/files/${dirPath}/${name}?action=download`}>
              Download
            </a>
          )}
          <button onClick={() => renameFile(name)}>Rename</button>
          <button
            onClick={() => {
              handleDelete(name);
            }}
          >
            Delete
          </button>
          <br />
        </div>
      ))}

      <div style={{ paddingTop: '20px' }}>
        <button onClick={() => setCreateFolder(true)}>Create Folder</button>
        {uiTooltip && <p style={{ color: 'red' }}>{uiTooltip}</p>}

        {createFolder && (
          <>
            <br />
            <label htmlFor='createDir'>Enter folder name: </label>
            <input
              type='text'
              id='createDir'
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={handleFolderCreation}>Save</button>
          </>
        )}
      </div>
    </>
  );
}

export default DirectoryView;
