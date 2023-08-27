import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

const NavigationHeader = ({ path }) => {
  return (
    <Typography variant="h6" style={{}}>
      { 
        <NavLink to={`/files`} style={{color: 'white', textDecoration: 'none'}}>
          {/* underlined Home */}
          <u className='text-3xl font-bold'>Home</u>
        </NavLink>
      }
      {
        path && 
        path.split('/').map((folder, index) => (
          <NavLink key={index} to={`/files/${folder}`} style={{color: 'white', textDecoration: 'none'}}>
            {` > `}<u>{folder}</u>
          </NavLink>
        ))
      }
    </Typography>
  );
}

export default NavigationHeader;