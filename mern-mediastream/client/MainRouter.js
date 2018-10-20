import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

const MainRooter = () => (
   <Fragment>
      <Switch>
         <Route exact path="/" render={() => <h1>Hello World</h1>} />
      </Switch>
   </Fragment>
);

export default MainRooter;
