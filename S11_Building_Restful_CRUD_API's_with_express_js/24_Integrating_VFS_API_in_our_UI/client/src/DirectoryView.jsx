import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function DirectoryView() {
  const BASE_URL = 'http://localhost:4000';
  const [directoriesList, setDirectoriesList] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [newFilename, setNewFilename] = useState('');
  const [fileRenameId, setFileRenameId] = useState('');
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [uiTooltip, setUiTooltip] = useState('');
  const { '*': dirPath } = useParams();

  async function getDirectoryItems() {
    const response = await fetch(`${BASE_URL}/directory/${dirPath}`);
    const data = await response.json();
    console.log(data);
    setDirectoriesList(data.directories);
    setFilesList(data.files);
  }
  useEffect(() => {
    getDirectoryItems();
  }, [dirPath]);

  async function uploadFile(e) {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${BASE_URL}/file/${file.name}`, true);
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

  async function handleDelete(fileId) {
    const response = await fetch(`${BASE_URL}/file/${fileId}`, {
      method: 'DELETE',
    });
    const data = await response.text();
    console.log(data);
    getDirectoryItems();
  }

  async function renameFile(name, fileId) {
    setFileRenameId(fileId);
    setNewFilename(name);
  }

  async function saveFilename() {
    const response = await fetch(`${BASE_URL}/file/${fileRenameId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newFilename }),
    });
    const data = await response.text();
    console.log(data);
    setFileRenameId('');
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
      {fileRenameId && (
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

      {filesList.map(({ filename: name, id }) => (
        <div key={id}>
          {name} <a href={`${BASE_URL}/file/${id}`}>Open</a>{' '}
          <a href={`${BASE_URL}/file/${id}?action=download`}>Download</a>
          <button onClick={() => renameFile(name, id)}>Rename</button>
          <button
            onClick={() => {
              handleDelete(id);
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
