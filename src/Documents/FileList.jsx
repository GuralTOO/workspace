import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import FileUpload from './FileUpload';
import FileItem from './FileItem';
import Folder from './Folder';
import Chatbox from './Chatbox';
import CreateFolder from './CreateFolder';
import { getFiles } from '../utils/utils';
import './FileManager.css';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';


const FileList = ({userID}) => {
  // const location = useLocation(); // add this line
  const params = useParams();
  const [path, setPath] = useState(params['*'] || '');
  const [files, setFiles] = useState([]);
  const [fullPath, setFullPath] = useState(userID + '/' + path);

  const fetchFiles = useCallback(() => {
    getFiles(fullPath).then((files) => {
      setFiles([{}, ...files]);
    });
  }, [fullPath]);

  useEffect(() => {
    setPath(params['*'] || '');
  }, [params]);

  useEffect(() => {
    setFullPath(path ? userID + '/' + path : userID);
  }, [userID, path]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const folderName = path ? path.substring(path.lastIndexOf("/")+1) : "My Files";

  return (
    <div className='file-manager-container'>
      <div style={{flex: 1}}>
        <h2>{folderName}</h2>
        <div className="file-list-container">
            {files.map((file, index) => (
              index === 0 ? <CreateFolder parentPath={path} onFolderCreate={fetchFiles  } />
              : file.name.includes(".pdf") ? 
                <FileItem key={`${file.id}-${index}`} file={file} filePath={fullPath+'/'+file.name} /> 
                : <Folder key={`${file.id}-${index}`} folderName={file.name} folderPath = {fullPath+'/'+file.name}/>
          ))}
        </div>
        <div>
          <FileUpload folderPath = {fullPath} onUpload = {fetchFiles}/>
        </div>
        <div>
          <Chatbox folderPath = {fullPath} />
        </div>
      </div>
    </div>

    );
}

export default FileList;
