import React, { useEffect, useState, useCallback } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { getFiles } from '../../utils/utils';
import FolderNavigation from './FolderNavigation';
import './Sidebar.css'
import {Flex, Theme, Heading } from '@radix-ui/themes';
import {GiEgyptianProfile} from 'react-icons/gi';


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



  return (
    <Theme
      id="theme"
      accentColor="iris"
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
      >
        <NavLink to="/files">
          <Heading highContrast style = {{marginTop: '20px', marginBottom: '10px'}} className='heading'>
            RR
          </Heading>
        </NavLink>
        <FolderNavigation userID={userID}/>

        <div style={{ position: 'absolute', bottom: '4vh', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <NavLink to="/account">
            <GiEgyptianProfile fill='true' style={{height: '25px', width: '25px', marginBottom: '-5px', marginRight: '5px'}}/>
            <span className='account'>Account</span>
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