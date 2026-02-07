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
  const [directoryName, setdirectoryName] = useState('');
  const [uiTooltip, setUiTooltip] = useState('');
  // Directories renmae
  const [dirRenameId, setDirRenameId] = useState('');
  const [newDirname, setnewDirname] = useState('');
  const { dirId } = useParams();

  async function getDirectoryItems() {
    const response = await fetch(`${BASE_URL}/directory/${dirId || ''}`);
    const data = await response.json();
    console.log(data);
    setDirectoriesList(data.directories);
    setFilesList(data.files);
  }
  useEffect(() => {
    getDirectoryItems();
  }, [dirId]);

  async function uploadFile(e) {
    const file = e.target.files[0];
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${BASE_URL}/file/${dirId || ''}`, true);
    xhr.setRequestHeader('filename', file.name);
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
  async function handleDirDelete(id) {
    const response = await fetch(`${BASE_URL}/directory/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    getDirectoryItems();
  }

  async function renameFile(name, fileId) {
    setFileRenameId(fileId);
    setNewFilename(name);
  }
  async function renameDir(name, dirId) {
    setDirRenameId(dirId);
    setNewFilename(name);
  }

  async function saveDirname() {
    const response = await fetch(`${BASE_URL}/directory/${dirRenameId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newDirname: newFilename }),
    });
    const data = await response.text();
    console.log(data);
    setDirRenameId('');
    setnewDirname('');
    getDirectoryItems();
  }

  async function saveFilename() {
    const response = await fetch(`${BASE_URL}/file/${fileRenameId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newFilename }),
    });
    const data = await response.text();
    setFileRenameId('');
    setNewFilename('');
    getDirectoryItems();
  }

  async function handleFolderCreation() {
    if (directoryName === '') {
      setUiTooltip('Please enter a folder name');
      return;
    }
    const URL = `${BASE_URL}/directory/${dirId || ''}`;
    const response = await fetch(URL, {
      method: 'POST',
      headers: { dirname: directoryName },
    });
    const data = await response.text();
    console.log(data);
    setCreateFolder(false);
    setdirectoryName('');
    setUiTooltip('');
    getDirectoryItems();
  }
  return (
    <>
      <h1>My Files</h1>
      <input type='file' onChange={uploadFile} />
      <p>Progress: {progress}%</p>
      {(fileRenameId || dirRenameId) && (
        <div style={{ padding: '20px 0' }}>
          <label htmlFor='renameInput'>Enter new name: </label>
          <input
            type='text'
            id='renameInput'
            value={newFilename}
            onChange={(e) => setNewFilename(e.target.value)}
          />
          {fileRenameId ? (
            <button onClick={saveFilename}>Save</button>
          ) : (
            <button onClick={saveDirname}>Save</button>
          )}
        </div>
      )}

      {directoriesList.map(({ name, id }) => (
        <div key={id}>
          {name} <Link to={`/directory/${id}`}>Open</Link>{' '}
          <button onClick={() => renameDir(name, id)}>Rename</button>
          <button
            onClick={() => {
              handleDirDelete(id);
            }}
          >
            Delete
          </button>
          <br />
        </div>
      ))}

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
              onChange={(e) => setdirectoryName(e.target.value)}
            />
            <button onClick={handleFolderCreation}>Save</button>
          </>
        )}
      </div>
    </>
  );
}

export default DirectoryView;
