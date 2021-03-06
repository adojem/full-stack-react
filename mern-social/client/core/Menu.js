import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
   AppBar, Button, IconButton, Toolbar, Typography,
} from '@material-ui/core/';
import HomeIcon from '@material-ui/icons/Home';
import auth from '../auth/auth-helper';

const isActive = (history, path) => {
   if (history.location.pathname == path) return { color: '#ff4081' };
   return { color: '#fff' };
};

const Menu = withRouter(({ history }) => (
   <div>
      <AppBar position="static">
         <Toolbar>
            <Typography variant="title" color="inherit">
               MERN Skeleton
            </Typography>
            <Link to="/">
               <IconButton aria-label="Home" style={isActive(history, '/')}>
                  <HomeIcon />
               </IconButton>
            </Link>
            <Link to="/users">
               <Button style={isActive(history, '/users')}>Users</Button>
            </Link>
            {!auth.isAuthenticated() && (
               <span>
                  <Link to="/signup">
                     <Button style={isActive(history, '/signup')}>Sign up</Button>
                  </Link>
                  <Link to="/signin">
                     <Button style={isActive(history, '/signin')}>Sign In</Button>
                  </Link>
               </span>
            )}
            {auth.isAuthenticated() && (
               <span>
                  <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                     <Button style={isActive(history, `/user/${auth.isAuthenticated().user._id}`)}>
                        My Profile
                     </Button>
                  </Link>
                  <Button
                     color="inherit"
                     onClick={() => {
                        auth.signout(() => history.push('/'));
                     }}
                  >
                     Sign out
                  </Button>
               </span>
            )}
         </Toolbar>
      </AppBar>
   </div>
));

export default Menu;
