import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import auth from '../auth/auth-helper';
import cart from '../cart/cart-helper';

const isActive = (history, path) => {
   if (history.location.pathname === path) {
      return { color: '#bef67a' };
   }
   return { color: '#fff' };
};

const Menu = withRouter(({ history }) => (
   <AppBar position="static">
      <Toolbar>
         <Typography variant="title" color="inherit">
            MERN Marketplace
         </Typography>
         <div>
            <Link to="/">
               <IconButton aria-label="Home" style={isActive(history, '/')}>
                  <HomeIcon />
               </IconButton>
            </Link>
            <Link to="/shops/all">
               <Button style={isActive(history, '/shops/all')}>All Shops</Button>
            </Link>
            <Link to="/cart">
               <Button style={isActive(history, '/cart')}>
                  Cart
                  <Badge
                     color="secondary"
                     style={{ marginLeft: '7px' }}
                     badgeContent={cart.itemTotal()}
                  >
                     <ShoppingCartIcon />
                  </Badge>
               </Button>
            </Link>
         </div>
         <div
            style={{
               position: 'absolute',
               right: '10px',
            }}
         >
            <span>
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
                     {auth.isAuthenticated().user.seller && (
                        <Fragment>
                           <Link to="/seller/shops">
                              <Button style={isActive(history, '/seller/shops/')}>My Shops</Button>
                           </Link>
                           <Link to="/seller/shop/new">
                              <Button style={isActive(history, '/seller/shop/new')}>
                                 New Shops
                              </Button>
                           </Link>
                        </Fragment>
                     )}
                     <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                        <Button
                           style={isActive(history, `/user/${auth.isAuthenticated().user._id}`)}
                        >
                           My Profile
                        </Button>
                     </Link>
                     <Button color="inherit" onClick={() => auth.signout(() => history.push('/'))}>
                        Sign Out
                     </Button>
                  </Fragment>
               )}
            </span>
         </div>
      </Toolbar>
   </AppBar>
));

export default Menu;
