import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
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
               {!auth.isAuthenticated() && (
                  <Fragment>
                     <Link to="/signup">
                        <Button style={isActive(history, '/signup')}>Sign Up</Button>
                     </Link>
                     <Link to="/signin">
                        <Button style={isActive(history, '/signin')}>Sign In</Button>
                     </Link>
                  </Fragment>
               )}
               {auth.isAuthenticated() && (
                  <Fragment>
                     <Link to="/media/new">
                        <Button style={isActive(history, '/media/new')}>
                           <AddBoxIcon style={{ marginRight: '8px' }} />
                           Add Media
                        </Button>
                     </Link>
                     <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                        <Button
                           style={isActive(history, `/user/${auth.isAuthenticated().user._id}`)}
                        >
                           My Profile
                        </Button>
                     </Link>
                     <Button
                        color="inherit"
                        onClick={() => {
                           auth.signout(() => history.push('/'));
                        }}
                     >
                        Sign Out
                     </Button>
                  </Fragment>
               )}
            </span>
         </div>
      </Toolbar>
   </AppBar>
);

export default withRouter(Menu);
