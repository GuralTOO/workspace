import React, { useEffect, useState, useCallback } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Folder, Home } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getFiles } from '../../utils/utils';
import '../../App.css'
import { Button, Flex, Grid, Text, Strong, Theme, Heading } from '@radix-ui/themes';
// import { Button } from '@mui/material';
// import logo from '../../assets/icons/RapidReview.png'
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Switch from '@radix-ui/react-switch';
import './sidebar.css';
import FolderNavigation from './FolderNavigation';

const Sidebar = ({userID}) => {

  const [outerFolders, setOuterFolders] = useState([]);
  const fetchFiles = useCallback(() => {
    getFiles(userID).then((files) => {
      // if a file does not have an extension, add it to the outerFolders array
      setOuterFolders(files.filter((file) => !file.name.includes('.')));
    });
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);


  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  if (isSmallScreen) {
    // Render a different layout for small screens
    return (
      <div style = {{flex: 1, flexDirection: "column"}}>
        <div style={{marginBottom: '60px'}}>
          <Outlet />
        </div>
        <div style={{width: '100vw', height: '4vh', borderTop: '2px solid grey', position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'space-between'}}>
          <NavLink to="/files" style={{marginLeft: '15px'}}>
            <Home />
          </NavLink>
          <NavLink to="/account" style={{marginRight: '15px'}}>
            <AccountCircleIcon />
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <Theme
      id="theme"
      accentColor="mauve"
      appearance='light'
      grayColor="slate"
      panelBackground="translucent"
      scaling="100%"
      radius="small"
      scheme="light"
      tone = ""
      weight="normal"
    >
    <div style = {{flex: 1, flexDirection: "row", position: 'relative'}} >
      <Flex gap="3" direction="column"  
        style={{height: '100vh', width: '150px', borderRight: '1px solid grey', position: 'fixed'}}
        className='sidebar'
      >
        <Heading highContrast style = {{marginTop: '20px', marginBottom: '10px'}} className='heading'>
          RR
        </Heading>
        {/* <Grid columns="1" width="100%" justify="start" align="start">
          <NavLink to="/files">
            <Button variant="surface" size="3" color = "gray" highContrast style={{width: "100%", justifyContent: "flex-start"}} >
              <Text trim color="slate" highContrast>
                Home
              </Text>
            </Button>
          </NavLink>
          {outerFolders.map((folder, index) => (
            <NavLink key={index} to={`/files/${folder.name}`}  >
              <Button variant="surface" size="3" color= "gray" highContrast style={{width: "100%", justifyContent: "flex-start"}}>
                <Text trim color="slate" highContrast>
                  {folder.name}
                </Text>
              </Button>
            </NavLink>
          ))}
        </Grid> */}
        <FolderNavigation userID={userID}/>

        <div style={{ position: 'absolute', bottom: '4vh', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <NavLink to="/account">
            <AccountCircleIcon fontSize='large'/>
            <p style={{color: 'white', fontSize: '15px', marginTop: -5}}>Account</p>
          </NavLink>
        </div>

      </Flex>
      <div style={{ flexGrow: 1, marginLeft: '150px'}}>
        <Outlet />
      </div>
    </div>
    </Theme>
  );
};

export default Sidebar; 