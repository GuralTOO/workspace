
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css'
import Sidebar from './SideBar';
const SidebarParent = ({userID}) => {

  return (
    <div className="grid lg:grid-cols-5">

        {userID && <Sidebar className="hidden lg:block" style = {{backgroundColor: "black"}}/>}
        <div className="border-l col-span-3 lg:col-span-4 lg:border-l">
            <Outlet />
        </div>
    </div>
  );
};

export default SidebarParent; 