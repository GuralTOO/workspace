import { useEffect, useState, useCallback } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import './FolderNavigation.css';
import { getFiles } from '../../utils/utils';
import { NavLink } from 'react-router-dom';
import { FaRegFolder } from 'react-icons/fa';
import { IconContext } from "react-icons";

const SideNav = ({ userID}) => {
  
  const [folders, setFolders] = useState([]);
  const fetchFolders = useCallback(() => {
    console.log('fetching folders')
    console.log("path: ", userID)
    getFiles(userID)
      .then((folders) => {
      // if a file does not have an extension, add it to the folders array
      console.log("folders: ", folders.length)
      setFolders(folders.filter((file) => !file.name.includes('.')));
    });
  }, []);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);



  return (
    <ul>
      {folders.map((folder, index) => (      
        <NavLink style={{textDecoration: 'none'}} 
          key={index} to={`/files/${folder.name}`}  >
          <FolderItem key={index}>
            {folder.name}
          </FolderItem>
        </NavLink>
      ))}
    </ul>
  );
};

const FolderNavigation = ({userID}) => (
  
  <ScrollArea.Root className='ScrollAreaRoot'>
    <div className="Text">
      Folders
    </div>
   <ScrollArea.Viewport className="ScrollAreaViewport">
     <SideNav userID = {userID}/>
   </ScrollArea.Viewport>
   <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    {/* <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar> */}
    <ScrollArea.Corner className="ScrollAreaCorner" />
  </ScrollArea.Root>
);

const FolderItem = ({ onClick, children }) => (
  <div className="folder-item" onClick={onClick}>
    <IconContext.Provider value={{ color: 'blue', 
      className: 'folder-mini-icon'}}>
      <FaRegFolder fill='true' fillOpacity={"70%"} />
    </IconContext.Provider>
    {children}
  </div>
);

export default FolderNavigation;