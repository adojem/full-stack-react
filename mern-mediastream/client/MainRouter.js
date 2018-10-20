import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './core/Menu';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';

const MainRooter = () => (
   <Fragment>
      <Menu />
      <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/signup" component={Signup} />
         <Route path="/signin" component={Signin} />
         <Route path="/user/:userId" component={Profile} />
      </Switch>
   </Fragment>
);

export default MainRooter;
