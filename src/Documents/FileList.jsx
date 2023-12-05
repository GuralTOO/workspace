import { useEffect, useState, useCallback } from 'react';
import FileItem from './FileItem';
import Folder from './Folder';
import Chatbox from './Chatbox';
import CreateFolder from './CreateFolder';
import { getFiles } from '../utils/utils';
import { getFileDetails } from '../utils/getFileDetails';
import './FileManager.css';
import { NavLink, useLoaderData, useLocation, useParams } from 'react-router-dom';
import Header from './Header';
import * as ScrollArea from '@radix-ui/react-scroll-area';


// adding Tabs on the right side
import * as Tabs from '@radix-ui/react-tabs';


const FileList = ({userID}) => {
  // const location = useLocation(); // add this line
  const params = useParams();
  const [path, setPath] = useState(params['*'] || '');
  const [fullPath, setFullPath] = useState(userID + '/' + path);
  const [files, setFiles] = useState([]);
  const [filesMetadata, setFilesMetadata] = useState([]); 

  const fetchFiles = useCallback(() => {
    getFiles(fullPath).then((files) => {
      setFiles([{}, ...files]);
      // iterate through files and get metadata for each file and catch errors
      // add file name to metadata
      const promises = files.map((file) => {
        // if file does not end with pdf, skip
        if (!file.name.includes(".pdf") && !file.name.includes(".PDF")) {
          return Promise.resolve({ name: file.name });
        }
        return getFileDetails(fullPath + '/' + file.name)
          .then((metadata) => {
            metadata.name = file.name;
            return metadata;
          })
          .catch((error) => {
            console.error('Error fetching file details: ', error);
            return { name: file.name };
          });
      });
      Promise.allSettled(promises).then((results) => {
        const filesMetadata = results.map((result) => result.value);
        setFilesMetadata(filesMetadata);
        console.log("filesMetadata: ", filesMetadata)
      });
      
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
      <div className="file-manager-header"></div>

      <div className="file-manager-layout">

        {/* left side */}
        <div div className="left-side" style={{width: `${split}%`}}>

          <ScrollArea.Root className="Manager-ScrollAreaRoot">
            <ScrollArea.Viewport className="Manager-ScrollAreaViewport">
              <div className= "file-list-container">
                {files.map((file, index) => (
                index === 0 ? <CreateFolder parentPath={fullPath} onCreate={fetchFiles  } />
                : file.name.includes(".pdf") || file.name.includes(".PDF") ? 
                    <FileItem key={`${file.id}-${index}`} file={file} filePath={fullPath+'/'+file.name} /> 
                    : <Folder key={`${file.id}-${index}`} folderName={file.name} folderPath = {fullPath+'/'+file.name}/>
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="Manager-ScrollAreaScrollbar" orientation="vertical">
              <ScrollArea.Thumb className="Manager-ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="Manager-ScrollAreaCorner" />
          </ScrollArea.Root>

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
        <Tabs.Root className="TabsRoot" defaultValue="tab1" >
          <Tabs.List className="TabsList" style={{
            
          }}>
            <Tabs.Trigger className="TabsTrigger" value="tab1">
              Info
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="tab2">
              Chat
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="tab1">
            {/* render a table with columns "Authors, Methods, Results" and rows for each file in filesMetadata  */}
            <ScrollArea.Root className="Manager-ScrollAreaRoot">
              <ScrollArea.Viewport style={{
                height: '100%', 
                border: '1px solid #e5e5e5', borderRadius: '5px'}} className="Manager-ScrollAreaViewport"
              >
                  <div style={{height: '200%', width: "100%"}}>

                                    <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Authors</th>
                      <th>Methods</th>
                      <th>Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filesMetadata.map((file, index) => (
                      (file.name.includes(".pdf") || file.name.includes(".PDF")) && 
                      <tr key={index}>
                        <td>{file.name}</td>
                        <td>{file.authors}</td>
                        <td>{file.methods}</td>
                        <td>{file.key_results}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                    <h1>Hello</h1>
                  </div>
                {/* <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Authors</th>
                      <th>Methods</th>
                      <th>Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filesMetadata.map((file, index) => (
                      (file.name.includes(".pdf") || file.name.includes(".PDF")) && 
                      <tr key={index}>
                        <td>{file.name}</td>
                        <td>{file.authors}</td>
                        <td>{file.methods}</td>
                        <td>{file.key_results}</td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical" className="Manager-ScrollAreaScrollbar">
                <ScrollArea.Thumb className="Manager-ScrollAreaThumb"/>
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="Manager-ScrollAreaCorner"/>
            </ScrollArea.Root>

          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <div className="chatbox-message-area">
              {chatBoxText}
            </div>
            <div className="chatbox-input-area">
              <Chatbox folderPath = {fullPath} outputMessage = {chatBoxText} setOutputMessage = {setChatBoxText}/>
            </div>
          </Tabs.Content>
        </Tabs.Root>
        </div>          
      </div>
    </div>

  );
}

export default FileList;
