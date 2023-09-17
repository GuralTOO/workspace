import React from 'react';
import FolderIcon from "@mui/icons-material/FolderOutlined";
import { useNavigate, Link } from 'react-router-dom';
import "./Folder.css";
import "./File.css"
import * as Separator from '@radix-ui/react-separator';

const Folder = ({ folderName, folderPath }) => {
  // set folderPath equal to the current path without the userID in front
  const shortFolderPath = folderPath.substring(folderPath.indexOf("/")+1);

  const handleFolderClick = () => {
    console.log("folder selected: ", folderName);
  };

  const MAX_FILENAME_LENGTH = 12; // Adjust the calculations as needed

  const truncatedFileName = folderName.length > MAX_FILENAME_LENGTH
    ? folderName.substring(0, MAX_FILENAME_LENGTH) + "..."
    : folderName;

  return (
    <div className='file-mini-outside'>
      <div 
        className = "file-mini"
        onClick={handleFolderClick} 
      > 
        <div className='folder-icon'>
          <FolderIcon fontSize="inherit" />
        </div>
      </div>   
      <Separator.Root className="SeparatorRoot" />
        <div className='folder-info'>
          <div className="folder-name">{truncatedFileName}</div>
        </div>
      </div>
  
  );
};

export default Folder;
