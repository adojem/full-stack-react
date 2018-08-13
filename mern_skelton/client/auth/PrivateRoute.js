import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoute = ({ component: Compoennt, ...rest }) => {
   <Route
      {...rest}
      render={props =>
         auth.isAuthentication() ? (
            <Component {...props} />
         ) : (
            <Redirect
               to={{
                  pathname: '/signin',
                  state: { from: props.lcoation }
               }}
            />
         )
      }
   />;
};

export default PrivateRoute;
