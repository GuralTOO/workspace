import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CreateNewFolder } from "@mui/icons-material";
import { addFolder, addFile } from '../utils/utils';
import "./Folder.css";

//UI
import { Button, TextField, Box, CircularProgress } from '@mui/material';
import { Add as AddIcon, Folder as FolderIcon, Upload as UploadIcon } from '@mui/icons-material';



const CreateFolder = ({ parentPath, onFolderCreate }) => {
  const [action, setAction] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [uploading, setUploading] = useState(false);
  

  const boxRef = useRef(null);
  const fileInputRef = useRef(null); // Add this ref for file input


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        console.log("clicked outside");
        setIsCreating(false);
        setAction(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileDialogClose = useCallback(() => {
    // Check if any file was selected
    if (fileInputRef.current && fileInputRef.current.files.length === 0) {
      // If not, reset the action and isCreating states
      setIsCreating(false);
      setAction(null);
    }
    fileInputRef.current ? fileInputRef.current.value = '' : null;
  }, []); 



  const createFolder = async () => {
    const folderPath = `${parentPath}/${newFolderName}`;
    await addFolder(folderPath);

    setIsCreating(false);
    setAction(null);  // Reset action to null
    setNewFolderName("");
    onFolderCreate();
  };

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    console.log(fileName)

    // set const filePath equal to the user's id +'/' + the file name
    const filePath = `${parentPath}/${fileName}`;
    setUploading(true);
    await addFile(filePath, file);

    setUploading(false);
    setIsCreating(false); // Reset isCreating to false
    setAction(null);  // Reset action to null
    onFolderCreate();
    fileInputRef.current ? fileInputRef.current.value = '' : null;
  }
  

  if (isCreating) {
    if (action === 'create-folder') {
      return (
        <div className="upload-folder-mini" ref={boxRef}>
          <TextField 
            variant="outlined"
            // label="Enter Folder Name"
            // InputLabelProps={{ style: { color: 'white' } }}
            placeholder="Enter Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            inputProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { borderColor: 'white' },
              classes: {notchedOutline: 'notchedOutline'}
            }}
          />
          <Button onClick={createFolder}>Create</Button>
          <Button onClick={() => {setIsCreating(false); setAction(null);}}>Cancel</Button>
        </div>
      );
    } else {
      return (
        <div className="upload-folder-mini" ref={boxRef} >
          <Button 
            onClick={() => setAction('create-folder')}
            style={{borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'white'}}
          >
            <FolderIcon /> 
            Create Folder
          </Button>

          {uploading ? (
            <div style={{flex: 1, paddingTop: 10}}>
            <CircularProgress />
            </div>
          ) : (
            <React.Fragment>
              <input
                ref={fileInputRef}
                accept='.pdf'
                id="contained-button-file"
                multiple = {false}
                type="file"
                onChange={(e) => {
                  console.log(e); 
                  uploadFile(e)
                  window.addEventListener('focus', handleFileDialogClose, { once: true });
                }}
                onClick={(e) => e.target.value = null} // clear the previous value
                disabled={uploading}
                style={{display: 'none'}} // hide the actual file input
              />
              <label htmlFor="contained-button-file">
                <Button 
                  component="span" 
                  style={{borderTopStyle: 'solid', borderTopWidth: 1, borderTopColor: 'white'}}
                >
                  <UploadIcon />
                  Upload File
                </Button>
              </label>
            </React.Fragment>
          )}

        </div>
      );
    }
  } else {
    return (
      <div 
        className="upload-folder-mini" 
        onClick={() => setIsCreating(true)}
      >
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <AddIcon style={{ fontSize: 70 }} />
          <div className='folder-info'>
            <div className="folder-name">New</div>
          </div>
        </Box>
      </div>
    );
  }

};


export default CreateFolder;
