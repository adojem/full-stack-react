import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './core/Menu';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './auth/Signin';

const MainRooter = () => (
   <Fragment>
      <Menu />
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/signup" component={Signup} />
         <Route exact path="/signin" component={Signin} />
      </Switch>
   </Fragment>
);

export default MainRooter;
