// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { CreateNewFolder } from "@mui/icons-material";
// import { addFolder, addFile } from '../utils/utils';
// import "./Folder.css";

// //UI
// import { Button, TextField, Box, CircularProgress } from '@mui/material';
// import { Add as AddIcon, Folder as FolderIcon, Upload as UploadIcon } from '@mui/icons-material';



// const CreateFolder = ({ parentPath, onFolderCreate }) => {
//   const [action, setAction] = useState("");
//   const [isCreating, setIsCreating] = useState(false);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [uploading, setUploading] = useState(false);
  

//   const boxRef = useRef(null);
//   const fileInputRef = useRef(null); // Add this ref for file input


//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (boxRef.current && !boxRef.current.contains(event.target)) {
//         console.log("clicked outside");
//         setIsCreating(false);
//         setAction(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleFileDialogClose = useCallback(() => {
//     // Check if any file was selected
//     if (fileInputRef.current && fileInputRef.current.files.length === 0) {
//       // If not, reset the action and isCreating states
//       setIsCreating(false);
//       setAction(null);
//     }
//     fileInputRef.current ? fileInputRef.current.value = '' : null;
//   }, []); 



//   const createFolder = async () => {
//     const folderPath = `${parentPath}/${newFolderName}`;
//     await addFolder(folderPath);

//     setIsCreating(false);
//     setAction(null);  // Reset action to null
//     setNewFolderName("");
//     onFolderCreate();
//   };

//   const uploadFile = async (event) => {
//     const file = event.target.files[0];
//     const fileName = file.name;
//     console.log(fileName)

//     // set const filePath equal to the user's id +'/' + the file name
//     const filePath = `${parentPath}/${fileName}`;
//     setUploading(true);
//     await addFile(filePath, file);

//     setUploading(false);
//     setIsCreating(false); // Reset isCreating to false
//     setAction(null);  // Reset action to null
//     onFolderCreate();
//     fileInputRef.current ? fileInputRef.current.value = '' : null;
//   }
  

//   if (isCreating) {
//     if (action === 'create-folder') {
//       return (
//         <div className="upload-folder-mini" ref={boxRef}>
//           <TextField 
//             variant="outlined"
//             // label="Enter Folder Name"
//             // InputLabelProps={{ style: { color: 'white' } }}
//             placeholder="Enter Name"
//             value={newFolderName}
//             onChange={(e) => setNewFolderName(e.target.value)}
//             inputProps={{ style: { color: 'white' } }}
//             InputProps={{
//               style: { borderColor: 'white' },
//               classes: {notchedOutline: 'notchedOutline'}
//             }}
//           />
//           <Button onClick={createFolder}>Create</Button>
//           <Button onClick={() => {setIsCreating(false); setAction(null);}}>Cancel</Button>
//         </div>
//       );
//     } else {
//       return (
//         <div className="upload-folder-mini" ref={boxRef} >
//           <Button 
//             onClick={() => setAction('create-folder')}
//             style={{borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: 'white'}}
//           >
//             <FolderIcon /> 
//             Create Folder
//           </Button>

//           {uploading ? (
//             <div style={{flex: 1, paddingTop: 10}}>
//             <CircularProgress />
//             </div>
//           ) : (
//             <React.Fragment>
//               <input
//                 ref={fileInputRef}
//                 accept='.pdf'
//                 id="contained-button-file"
//                 multiple = {false}
//                 type="file"
//                 onChange={(e) => {
//                   console.log(e); 
//                   uploadFile(e)
//                   window.addEventListener('focus', handleFileDialogClose, { once: true });
//                 }}
//                 onClick={(e) => e.target.value = null} // clear the previous value
//                 disabled={uploading}
//                 style={{display: 'none'}} // hide the actual file input
//               />
//               <label htmlFor="contained-button-file">
//                 <Button 
//                   component="span" 
//                   style={{borderTopStyle: 'solid', borderTopWidth: 1, borderTopColor: 'white'}}
//                 >
//                   <UploadIcon />
//                   Upload File
//                 </Button>
//               </label>
//             </React.Fragment>
//           )}

//         </div>
//       );
//     }
//   } else {
//     return (
//       <div 
//         className="upload-folder-mini" 
//         onClick={() => setIsCreating(true)}
//       >
//         <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//           {/*  Add Icon filled in with bright orange color */}
//           <AddIcon style={{fontSize: 70}} />
//           <div className='folder-info'>
//             <div className="folder-name">New</div>
//           </div>
//         </Box>
//       </div>
//     );
//   }

// };


// export default CreateFolder;


// TODO: change styling on the create folder dialog


import React, {useRef, forwardRef, useState} from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { addFile, addFolder } from '../utils/utils';
import './CreateFolder.css';
import { Plus, Loader} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const CreateFolder = ({ parentPath, onCreate, open, onOpenChange }) => {
  const [folderName, setFolderName] = useState('Folder X');

  const handleFolderCreate = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const folderPath = `${parentPath}/${folderName}`;
    console.log("creating folder: ", folderPath);
    await addFolder(folderPath); // Make sure this function creates the folder
    onOpenChange(false); // Manually close the dialog
    onCreate();
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Create Folder</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Give your folder a cool name. Click submit when you're done.
          </Dialog.Description>
          <form onSubmit={handleFolderCreate}>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="name">
                Name
              </label>
              <input
                className="Input"
                id="name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                autoFocus // Automatically focus the input
              />
            </fieldset>
            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
              {/* <Dialog.Close asChild> */}
                <button className="Button green" type="submit">
                  Submit
                </button>
              {/* </Dialog.Close> */}
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};




const UploadFile = forwardRef(({ parentPath, onUpload, uploading, setUploading }, ref) => {

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      await addFile(`${parentPath}/${file.name}`, file); // Use your addFile utility
      setUploading(false);
      if (ref.current) ref.current.value = ''; // Clear the input
      onUpload(); // Trigger the onUpload callback
    }
  };

  return (
    <input
      ref={ref}
      type="file"
      style={{ display: 'none' }}
      onChange={handleFileChange}
      disabled={uploading}
      accept='.pdf'
      multiple = {false}
    />
  );
});

const DropdownMenuDemo = ({parentPath, onCreate}) => {
  const [uploading, setUploading] = useState(false);
  const [createFolderVisible, setCreateFolderVisible] = useState(false); // State to manage folder creation dialog visibility
  const fileInputRef = useRef(null);

  // Trigger the hidden file input when the Upload menu item is selected
  const handleUploadClick = () => {
    // setUploading(true);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCreateClick = () => {
    setCreateFolderVisible(true);
  };

  return (
  <>
    <UploadFile
      ref={fileInputRef}
      parentPath={parentPath}
      uploading={uploading}
      setUploading={setUploading}
      onUpload={() => {
        // setUploading(false);
        onCreate();
      }}
    />

    {createFolderVisible && (
        <CreateFolder
          parentPath={parentPath}
          open={createFolderVisible}
          onOpenChange={setCreateFolderVisible}
          onCreate={() => {
            setCreateFolderVisible(false);
            onCreate();
          }}
        />
    )}

    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild disabled={uploading}>
        {
          uploading ? (
            <button className="IconicButton" aria-label="Customise options">
              <Loader className='SpinningIcon'
              color='#3e63dd' size={'32px'}/>
            </button>
          ) : (
            <button className="IconicButton" aria-label="Customise options">
              <Plus color='#3e63dd' /> New
            </button>
          )
        }
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" 
          side='right'
          sideOffset={5}
          align='start'
        >
          <DropdownMenu.Item className="DropdownMenuItem" onSelect={handleUploadClick}>
            Upload a General File
             {/* <div className="RightSlot">⌘+T</div> */}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" onSelect={handleUploadClick}>
            Upload a Research Paper
             {/* <div className="RightSlot">⌘+N</div> */}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item className="DropdownMenuItem"  onSelect={handleCreateClick}>
            Create a Folder 
            {/* <div className="RightSlot">⌘+N</div> */}
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  </>
  );
};

export default DropdownMenuDemo;
