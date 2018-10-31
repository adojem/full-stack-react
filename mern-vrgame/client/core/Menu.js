import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

const isActive = (history, path) => {
   if (history.location.pathname === path) {
      return { color: '#cddc39' };
   }
   return { color: '#fff' };
};

const Menu = withRouter(({ history }) => (
   <AppBar>
      <Toolbar>
         <Typography variant="h6" color="inherit">
            MERN VR Game
         </Typography>
         <div>
            <Link to="/">
               <IconButton aria-label="Home" style={isActive(history, '/')}>
                  <HomeIcon />
               </IconButton>
            </Link>
         </div>
         <div
            style={{
               position: 'absolute',
               right: '10px',
            }}
         >
            <Link to="/signup">
               <Button style={isActive(history, '/signup')}>Sign Up</Button>
            </Link>
            <Link to="/signin">
               <Button style={isActive(history, '/signin')}>Sign In</Button>
            </Link>
            <Link to="/user/">
               <Button style={isActive(history, '/user/')}>My Profile</Button>
            </Link>
            <Button color="inherit">Sign Out</Button>
         </div>
      </Toolbar>
   </AppBar>
));

export default Menu;
