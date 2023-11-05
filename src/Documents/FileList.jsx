import { useEffect, useState, useCallback } from 'react';
import FileItem from './FileItem';
import Folder from './Folder';
import Chatbox from './Chatbox';
import CreateFolder from './CreateFolder';
import { getFiles } from '../utils/utils';
import './FileManager.css';
import { NavLink, useLoaderData, useLocation, useParams } from 'react-router-dom';
import Header from './Header';


const FileList = ({userID}) => {
  // const location = useLocation(); // add this line
  const params = useParams();
  const [path, setPath] = useState(params['*'] || '');
  const [fullPath, setFullPath] = useState(userID + '/' + path);
  const [files, setFiles] = useState([]);

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
  const [chatBoxText, setChatBoxText] = useState("");

  return (
    <div className='file-manager-container'>
      <Header path={path}/>

      <div className="file-manager-layout">

        {/* left side */}
        <div div className="left-side" style={{width: `${split}%`}}>
          <div className= "file-list-container">
            {files.map((file, index) => (
            index === 0 ? <CreateFolder parentPath={fullPath} onCreate={fetchFiles  } />
            : file.name.includes(".pdf") || file.name.includes(".PDF") ? 
                <FileItem key={`${file.id}-${index}`} file={file} filePath={fullPath+'/'+file.name} /> 
                : <Folder key={`${file.id}-${index}`} folderName={file.name} folderPath = {fullPath+'/'+file.name}/>
            ))}
          </div>
        </div> 

         {/* vertical straight line  */}
        <div 
          className={`draggable-line ${dragging ? 'dragging' : ''} ${highlightTimeoutId === "highlight" ? 'highlight' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="draggable-line-inner"></div>
        </div>

        {/* right side */}
        <div className="right-side" style={{width: `${100 - split}%`}}>
          <div className="chatbox-message-area">
            {chatBoxText}
          </div>
          <div className="chatbox-input-area">
            <Chatbox folderPath = {fullPath} outputMessage = {chatBoxText} setOutputMessage = {setChatBoxText}/>
          </div>
        </div>          
      </div>
    </div>

  );
}

export default FileList;
