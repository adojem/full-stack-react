import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';

const MainRouter = () => (
   <Fragment>
      <Menu />
      <Switch>
         <Route exact path="/" component={Home} />
      </Switch>
   </Fragment>
);

export default MainRouter;
