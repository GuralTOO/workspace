import React from "react";
import './Header.css';
import { NavLink, } from 'react-router-dom';


const PathElement = ({path, folder, index}) => {
  const calc_path = (index) => {
    let path_to_folder = '';
    for (let i = 0; i <= index; i++) {
      path_to_folder += path.split('/')[i];
      if (i !== index) {
        path_to_folder += '/';
      }
    }
    return path_to_folder;
  }
  // set short folder name to first 10 characters
  const new_folder = folder.length > 10 ? folder.substring(0, 7) + "..." : folder;
  return (
    <div style={{display: "flex", alignItems: 'center'}}>
      <p style={{color: "black"}}>{" > "}</p>
      <NavLink key={index} to={`/files/${calc_path(index)}`}>
      { 
        index === path.split('/').length - 1 ?
        // make the text bold if it is the last element in the path        
        <u style={{marginLeft: "12px", marginRight: "12px", color: "black"}} className="path-element">{new_folder}</u>
        :
        <p style={{marginLeft: "12px", marginRight: "12px", color: "black"}} className="path-element">{new_folder}</p>
      }
      </NavLink>
    </div>
  )
}

const Header = ({path}) => {

  
  return (
    // <AppBar position="static" className="app-bar">
      <div style={{
          height: '60px', paddingTop: "12px", background: 'transparent',
          display: 'flex', justifyContent: 'left', alignItems: 'center',
          flexDirection: 'row', position: 'relative', color: 'black'
        }} 
      > 
        { 
          <NavLink to={`/files`} style={{textDecoration: 'none'}}  className='path-element'>
            {/* if path is empty, underline Home */}
            {
              path === '' ?
              <u style={{marginLeft: "12px", marginRight: "12px", color: "black"}} >Home </u>
              :
              <p style={{marginLeft: "12px", marginRight: "12px", color: "black"}}>Home </p>
            }
          </NavLink>
        }
        {
          path && 
          path.split('/').map((folder, index) => (            
            <PathElement key = {index} path={path} folder={folder} index={index} className="path-element" />
          ))
        }
        
      </div>
    // </AppBar>
  );
};

export default Header;
