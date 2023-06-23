import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import FileUpload from './FileUpload';
import FileItem from './FileItem';
import Folder from './Folder';
import Sidebar from './SideBar';
import Chatbox from './Chatbox';
import { Button } from "@mui/material";
import './FileManager.css'


const FileList = (userID) => {
  const [files, setFiles] = useState([]);
  const [mainFolders, setMainFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(userID.userID);
  const mainPath = userID.userID;

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  // useEffect(() => {
  //   fetchMainFolders();
  // }, []);

  const handleFolderSelect = (folderName) => {
    console.log("folder selected", "new path: " + currentPath + '/' + folderName);
    setCurrentPath(currentPath + '/' + folderName);
  };
  
  const handleMainFolderSelect = (folderName) => {
    console.log("folder selected", "new path: " + mainPath + '/' + folderName);
    setCurrentPath(mainPath + '/' + folderName);
  };

  const fetchMainFolders = async () => {
    setLoading(true);
    console.log("fetching folders at " + mainPath + "...");
    const { data, error } = await supabase
      .storage
      .from('documents')
      .list(mainPath);

    setLoading(false);

    if (error) {
      alert('Error fetching files.');
      console.error('Error fetching files: ', error);
    } else {
      // iterate over the data and only add the folders to the mainFolders array
      const folders = data.filter((file) => file.name.includes(".") === false);
      setMainFolders(folders);
      console.log(data)
    }
  }

  const fetchFiles = async () => {
    setLoading(true);
    console.log("fetching files at " + currentPath + "...");
    const { data, error } = await supabase
      .storage
      .from('documents')
      .list(currentPath);

    setLoading(false);

    if (error) {
      alert('Error fetching files.');
      console.error('Error fetching files: ', error);
    } else {
      setFiles(data);
      console.log(data)
    }
  }

  return (
    <div className='file-manager-container'>
      {/* <div className="sidebar">
        <Sidebar folders={mainFolders} onFolderSelect={handleMainFolderSelect} />
      </div> */}
      <div style={{flex: 1}}>
        { currentPath === userID.userID ? <h1>My Files</h1> : 
          <h1> {currentPath.substring(currentPath.lastIndexOf("/")+1)}</h1>}
        { currentPath === userID.userID ? null :       <Button onClick={() => setCurrentPath(currentPath.substring(0, currentPath.lastIndexOf("/")))}>Back</Button>
        }
        <div className="file-list-container">
            {loading ? <p>Loading files...</p> : files.map((file, index) => (
            file.name.includes(".pdf") ? <FileItem key={`${file.id}-${index}`} file={file} filePath={currentPath+'/'+file.name} /> 
            : <Folder key={`${file.id}-${index}`} folderName={file.name} onFolderClick={handleFolderSelect}/>
          ))}
        </div>
        <div>
          <FileUpload folderPath = {currentPath} onUpload = {fetchFiles}/>
        </div>
        <div>
          <Chatbox folderPath = {currentPath} />
        </div>
      </div>
    </div>

    );
}

export default FileList;
