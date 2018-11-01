import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';

const MainRouter = () => (
   <Fragment>
      <Menu />
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/signup" component={Signup} />
         <Route exact path="/signin" component={Signin} />
         <Route exact path="/user/:userId" component={Profile} />
      </Switch>
   </Fragment>
);

export default MainRouter;
