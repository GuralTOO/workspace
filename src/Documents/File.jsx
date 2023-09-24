import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import Foldericon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FileTextIcon } from '@radix-ui/react-icons';
import './File.css' 
import './accordion.css'
import classNames from 'classnames';
import { Box, Card, Separator, Text, Flex } from '@radix-ui/themes'
import { ChevronDownIcon } from '@radix-ui/react-icons';
// import * as Separator from '@radix-ui/react-separator';
import * as Accordion from '@radix-ui/react-accordion';
import FileDetails from './FileDetails';

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className={classNames('AccordionTrigger', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames('AccordionContent', className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));


const File = ({ fileName, onFileClick }) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    // Stop event propagation if the click is on a menu item
    if (event.target.closest('.MuiMenuItem-root')) {
      event.stopPropagation();
      return;
    }
    if(event.button === 0){
      console.log('file selected: ', fileName);
      onFileClick(fileName);
    }
  };
  /* adding a menu button to each file */
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log('Delete action');
    // Handle delete action
    handleMenuClose();
  };

  const handleRename = () => {
    console.log('Rename action');
    // Handle rename action
    handleMenuClose();
  };


  const MAX_FILENAME_LENGTH = 10; // Adjust the calculations as needed

  const truncatedFileName = fileName.length > MAX_FILENAME_LENGTH
    ? fileName.substring(0, MAX_FILENAME_LENGTH) + "..."
    : fileName;

  const fileExtension = fileName.split('.').pop();


  return (
    <Box size="1" variant="surface" className="like-a-card">
      <div 
        className = "file-mini"
        onClick={handleClick} 
      >
        <div className='file-icon'>
          <FileTextIcon style={{size: "large"}}/>
        </div>
      </div>
      <Separator size="4" mb="2" />
      <Flex gap="2" >
        <Text color="gray" highContrast>
          {fileName}
        </Text>
        <FileDetails filePath={fileName}/>
      </Flex>
      {/* <Accordion.Root className="AccordionRoot" type="single" collapsible >
        <Accordion.Item className="AccordionItem" value="item-1">
          <AccordionTrigger>{truncatedFileName}</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </Accordion.Item>
      </Accordion.Root> */}
      {/* <div className='file-info'>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    // make menu look black
          PaperProps={{
            style: {
              backgroundColor: '#000000',
              color: 'white',
            },
          }}
        >
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleRename}>Rename</MenuItem>
        </Menu>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          style={{color: 'white'}}
          
          // make button narrower
          sx={{ minWidth: '0px', padding: '0px' }}
          
        >
          <MoreVertIcon />
        </Button>
        <div className="file-name">{truncatedFileName}</div>
      </div> */}
    </Box>
  );
};

export default File;


