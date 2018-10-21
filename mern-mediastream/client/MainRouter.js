import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './core/Menu';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';

const MainRooter = () => (
   <Fragment>
      <Menu />
      <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/signup" component={Signup} />
         <Route path="/signin" component={Signin} />
         <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
         <Route path="/user/:userId" component={Profile} />
      </Switch>
   </Fragment>
);

export default MainRooter;
