import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import EditProfile from './user/EditProfile';
import Profile from './user/Profile';
import PrivateRoute from './auth/PrivateRoute';

class MainRouter extends Component {

   componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
         jssStyles.parentNode.removeChild(jssStyles);
      }
   }
   
   render() {
      return (
         <div>
            <Menu />
            <Switch>
               <Route exact path="/" component={Home} /> 
               <Route path="/users" component={Users} />
               <Route path="/signup" component={Signup} />
               <Route path="/signin" component={Signin} />
               <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
               <Route path="/user/:userId" component={Profile} />
            </Switch>
         </div>
      );
   }
}

export default MainRouter;
