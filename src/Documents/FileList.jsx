import { useEffect, useState, useCallback } from 'react';
import FileItem from './FileItem';
import Folder from './Folder';
import Chatbox from './Chatbox';
import CreateFolder from './CreateFolder';
import { getFiles } from '../utils/utils';
import './FileManager.css';
import { NavLink, useLoaderData, useLocation, useParams } from 'react-router-dom';
import { Typography, Paper} from '@mui/material';


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


  /*
  split view
  */
  const [split, setSplit] = useState(50);
  const [highlightTimeoutId, setHighlightTimeoutId] = useState(null);
  const [startX, setStartX] = useState(null);
  const [dragging, setDragging] = useState(false);



  const handleMouseMove = useCallback((event) => {
    // Calculate the new position of the draggable element
    const newSplit = ((event.clientX - startX) / window.innerWidth) * 100;
    
    // Constrain the split to be between 0% and 100%
    setSplit(Math.max(0, Math.min(100, newSplit)));
  }, [startX]);

  const handleMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    setDragging(false);

  }, [handleMouseMove]);

  const handleMouseDown = useCallback((event) => {
    // Capture the initial offset between the mouse position and the edge of the draggable element
    const initialOffset = event.clientX - event.currentTarget.getBoundingClientRect().right;
    setStartX(initialOffset);
    setDragging(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);
  
  const handleMouseEnter = useCallback(() => {
    // Set a timeout that will trigger the highlight after 1 second
    const timeoutId = setTimeout(() => setHighlightTimeoutId("highlight"), 100);
    setHighlightTimeoutId(timeoutId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Clear the timeout when the mouse leaves, to prevent the highlight from triggering
    clearTimeout(highlightTimeoutId);
    setHighlightTimeoutId(null);
  }, [highlightTimeoutId]);
  const folderName = path ? path.substring(path.lastIndexOf("/")+1) : "Home";
  const [chatBoxText, setChatBoxText] = useState("");

  return (
    <div className='file-manager-container'>
      <div style={{height: '5%', background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', position: 'relative'}}> 
        <Typography variant="h6" style={{paddingLeft: '2vw'}}>
          { 
            <NavLink to={`/files`} style={{color: 'white', textDecoration: 'none'}}>
              {/* underlined Home */}
              <u>Home</u>
            </NavLink>
          }
          {
            path && 
            path.split('/').map((folder, index) => (
              <NavLink key={index} to={`/files/${folder}`} style={{color: 'white', textDecoration: 'none'}}>
               {` > `}<u>{folder}</u>
              </NavLink>
            ))
          }
        </Typography> 
        <div style={{width: "100%", height: "2px", backgroundColor: "grey", position: 'absolute', bottom: 0}}></div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', height: '95%'}}>          
        {/* left side */}
        <div style={{width: `${split}%`,  paddingLeft: "2vw", marginTop: 15, overflowY: 'auto'}}>
          <div className="file-list-container">
              {files.map((file, index) => (
                index === 0 ? <CreateFolder parentPath={fullPath} onFolderCreate={fetchFiles  } />
                : file.name.includes(".pdf") ? 
                  <FileItem key={`${file.id}-${index}`} file={file} filePath={fullPath+'/'+file.name} /> 
                  : <Folder key={`${file.id}-${index}`} folderName={file.name} folderPath = {fullPath+'/'+file.name}/>
            ))}
          </div>
        </div>
        {/* vertical straight line */}
        <div 
        style={{
          width: "8px", 
          height: "100%", 
          display: 'flex', 
          justifyContent: 'center', 
          cursor: 'col-resize', 
          backgroundColor: dragging || highlightTimeoutId === "highlight" ? 'orange' : 'transparent' // Add the orange highlight
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
          <div style={{width: "2px", height: "100%", backgroundColor: "grey"}}></div>
        </div>
        {/* right side */}
        <div style={{width: `${100 - split}%`, color: 'biege', display: 'flex', justifyContent: 'center', position: 'relative'}}>
          <div style = {{padding: 20, marginTop: 15, color: 'beige'}}>
            {chatBoxText}
          </div>
          <div style={{padding: 20, bottom: 0, width: "85%", position: 'absolute'}}>
            <Chatbox folderPath = {fullPath} outputMessage = {chatBoxText} setOutputMessage = {setChatBoxText}/>
          </div>
        </div>          
      </div>
    </div>
  );
}

export default FileList;
