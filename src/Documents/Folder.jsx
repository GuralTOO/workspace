import React from "react";
import { Button, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FolderIcon from "@mui/icons-material/FolderOutlined";
import "./Folder.css";

const Folder = ({ folderName, onFolderClick }) => {
  const handleFolderClick = () => {
    console.log("folder selected: ", folderName);
    onFolderClick(folderName);
  };


  const MAX_FILENAME_LENGTH = 12; // Adjust the calculations as needed

  const truncatedFileName = folderName.length > MAX_FILENAME_LENGTH
    ? folderName.substring(0, MAX_FILENAME_LENGTH) + "..."
    : folderName;



  return (
    <div className = "folder-mini" onClick={handleFolderClick}>
      <div className='folder-icon'>
        <FolderIcon fontSize="inherit" />
      </div>
      <div className='folder-info'>
        <div className="folder-name">{truncatedFileName}</div>
      </div>
    </div>
  );
};

export default Folder;
/*
    <div 
      className="file-mini" 
      style={{border: '1px solid white', height: '150px', width: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}
      onClick={handleFolderClick}
    >
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText 
        primary={folderName} 
        style={{fontSize: 'calc(7px + 1vmin)', textAlign: 'center'}}  // Dynamically scaled font size
      />
    </div>
    */