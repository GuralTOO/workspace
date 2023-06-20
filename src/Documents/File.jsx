import React, {useEffect, useState} from 'react';
import { Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import Foldericon from '@mui/icons-material/Folder';
import './File.css' 
import Folder from './Folder';

const File = ({ fileName, onFileClick }) => {


  const handleClick = () => {
    console.log('file selected: ', fileName);
    onFileClick(fileName);
  };

  const MAX_FILENAME_LENGTH = 10; // Adjust the calculations as needed

  const truncatedFileName = fileName.length > MAX_FILENAME_LENGTH
    ? fileName.substring(0, MAX_FILENAME_LENGTH) + "..."
    : fileName;

  const fileExtension = fileName.split('.').pop();


  return (
    <div className = "file-mini" onClick={handleClick}>
      <div className='file-info'>
        <div className="file-icon">
          {fileExtension === 'pdf' ? (
            <DescriptionIcon />          ) : (
            <Foldericon />
          )}
        </div>
        <div className="file-name">{truncatedFileName}</div>
      </div>
    </div>
  );
};

export default File;


/*
style={{border: '1px solid white', height: '100px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}
*/

{/* <Button onClick={handleClick} style={{justifyContent: 'center', color: 'pink'}}>
  {fileName}
</Button> */}
