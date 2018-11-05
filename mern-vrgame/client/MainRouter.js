import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import NewGame from './game/NewGame';
import EditGame from './game/EditGame';

class MainRouter extends Component {
   componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
         jssStyles.parentNode.removeChild(jssStyles);
      }
   }

   render() {
      return (
         <Fragment>
            <Menu />
            <Switch>
               <Route exact path="/" component={Home} />
               <Route path="/signup" component={Signup} />
               <Route path="/signin" component={Signin} />
               <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
               <Route path="/user/:userId" component={Profile} />

               <PrivateRoute path="/game/new" component={NewGame} />
               <PrivateRoute path="/game/edit/:gameId" component={EditGame} />
            </Switch>
         </Fragment>
      );
   }
}

export default MainRouter;
