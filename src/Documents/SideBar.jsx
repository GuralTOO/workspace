import React, { useState } from 'react';
// import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const Sidebar = ({ folders, onFolderSelect }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    onFolderSelect(folder); // Notify parent component about the selected folder
  };


  return (
    <div>

    <Toolbar />
    <Divider />
    <List>
      {folders.map((folder) => (
        <ListItem key={folder.name} disablePadding>
        <ListItemButton onClick={() => handleFolderClick(folder.name)} style={{backgroundColor: 'transparent'}}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={folder.name} />
        </ListItemButton>       
        </ListItem> 
      ))}        
    </List>
    </div>

  )

  // return (
  //   <div style={{flex: 1, backgroundColor: 'red'}}> 
  //     {/* Render folders */}
  //     {folders.map((folder) => (
  //       <ListItem 
  //         button
  //         key={folder.id}
  //         selected={folder === selectedFolder}
  //         onClick={() => handleFolderClick(folder.name)}
  //       >
  //         <ListItemIcon>
  //           <FolderIcon />
  //         </ListItemIcon>
  //         <ListItemText primary={folder.name} />
  //       </ListItem>
  //     ))}
  //   </div>
  // );
};

export default Sidebar;
