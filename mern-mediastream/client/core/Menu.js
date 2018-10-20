import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import auth from '../auth/auth-helper';

const isActive = (history, path) => {
   if (history.location.pathname === path) {
      return { color: '#f99085' };
   }
   return { color: '#efdcd5' };
};

const Menu = ({ history }) => (
   <AppBar position="static">
      <Toolbar>
         <Typography variant="h6" color="inherit">
            MERN Mediastream
         </Typography>
         <div>
            <Link to="/">
               <IconButton aria-label="Home" style={isActive(history, '/')}>
                  <HomeIcon />
               </IconButton>
            </Link>
         </div>
         <div style={{ position: 'absolute', right: '10px' }}>
            <span style={{ float: 'right' }}>
               <Link to="/users">
                  <Button style={isActive(history, '/users')}>Users</Button>
               </Link>
               <Link to="/signup">
                  <Button style={isActive(history, '/signup')}>Sign Up</Button>
               </Link>
               <Link to="/signin">
                  <Button style={isActive(history, '/signin')}>Sign In</Button>
               </Link>
               <Button
                  color="inherit"
                  onClick={() => {
                     auth.signout(() => history.push('/'));
                  }}
               >
                  Sign Out
               </Button>
            </span>
         </div>
      </Toolbar>
   </AppBar>
);

export default withRouter(Menu);
