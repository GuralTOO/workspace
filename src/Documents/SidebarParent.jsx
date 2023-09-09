
import React, { useEffect, useState, useCallback } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Folder, Home } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getFiles } from '../utils/utils';
import '../App.css'
import { Button } from '@mui/material';
import Sidebar from './SideBar';
const SidebarParent = ({userID}) => {

  
  return (
    <div className="grid lg:grid-cols-5">
        <Sidebar className="hidden lg:block" style = {{backgroundColor: "black"}}/>        
        <div className="border-l col-span-3 lg:col-span-4 lg:border-l">
            <Outlet />
        </div>
    </div>
  );
};

export default SidebarParent; 