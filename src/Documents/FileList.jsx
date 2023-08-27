import { useEffect, useState, useCallback } from 'react';
import Chatbox from './Chatbox';
import { FileAndFolderList } from './FileAndFolderList';
import NavigationHeader from './NavigationHeader';
import { useFileList } from '../hooks/useFileList';
import useSplitView from '../hooks/useSplitView';
import './FileManager.css';
import { useParams } from 'react-router-dom';


const FileList = ({userID}) => {

  const params = useParams();
  const [path, setPath] = useState(params['*'] || '');
  const [fullPath, setFullPath] = useState(userID + '/' + path);

  // hooks to fetch files and folders and to split the screen
  const {files, fetchFiles} = useFileList(fullPath);
  const { split, handleMouseDown, handleMouseEnter, handleMouseLeave,
     dragging, highlightTimeoutId} = useSplitView();


  useEffect(() => {
    setPath(params['*'] || '');
  }, [params]);

  useEffect(() => {
    setFullPath(path ? userID + '/' + path : userID);
  }, [userID, path]);


  const folderName = path ? path.substring(path.lastIndexOf("/")+1) : "Home";
  const [chatBoxText, setChatBoxText] = useState("");

  return (
    <div className='file-manager-container'>

      <NavigationHeader path = {path} />

      <div style={{display: 'flex', flexDirection: 'row', height: '95%'}}>          

        {/* left side */}
        <div style={{width: `${split}%`,  paddingLeft: "2vw", marginTop: 15, overflowY: 'auto'}}>
          <FileAndFolderList files = {files} fullPath = {fullPath} fetchFiles = {fetchFiles}/>
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


/*

<div style={{height: '5%', background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', position: 'relative'}}> 
        <Typography variant="h6" style={{paddingLeft: '2vw'}}>
          { 
            <NavLink to={`/files`} style={{color: 'white', textDecoration: 'none'}}>
              {/* underlined Home }
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

      */