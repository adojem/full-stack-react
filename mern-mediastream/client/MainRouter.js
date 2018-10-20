import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';

const MainRooter = () => (
   <Fragment>
      <Switch>
         <Route exact path="/" component={Home} />
      </Switch>
   </Fragment>
);

export default MainRooter;
