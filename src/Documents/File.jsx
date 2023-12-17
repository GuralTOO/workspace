import React, { useEffect, useState } from 'react';
import {supabase} from '../supabaseClient';
import './File.css' 
import './accordion.css'
import { Box, Card, Separator, Text, Flex } from '@radix-ui/themes'
import FileDetails from './FileDetails';
import FileTop from './FileTop';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { deleteFile } from '../utils/utils';


const File = ({ fileName, onFileClick, filePath }) => {
  const [expanded, setExpanded] = useState(false);
  const [heightMini, setHeightMini] = useState(150);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setHeightMini(expanded ? 0 : 150);
  }, [expanded]);

  const handleLeftClick = (event) => {
    if (event.target.closest('.MuiMenuItem-root')) {
      event.stopPropagation();
      return;
    }
    if (event.button === 0) {
      onFileClick(fileName);
    }
  };

  const handleMenuClick = (event) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleDelete = () => {
    console.log('Delete action');
    deleteFile(filePath);

    handleMenuClose();
  };

  const handleRename = () => {
    console.log('Rename action');
    handleMenuClose();
  };

    return (
      <Box size="1" variant="surface" 
        className="like-a-card"       
        onContextMenu={handleMenuClick}
      >
        <div 
          className = "file-mini"
          style={{height: heightMini}}
          onClick={handleLeftClick} 
        >
          <FileTop filePath={filePath} render={!expanded}/>
        </div>
        <Separator size="4" mb="2" />
        <FileDetails fileName={fileName} setExpanded={setExpanded} filePath={filePath}/>
        
        <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              className="DropdownMenuContent"
              style={{ position: 'absolute', top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
            >
              <DropdownMenu.Item className="DropdownMenuItem" onSelect={handleDelete}>
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </Box>
    );
  };

  export default File;


