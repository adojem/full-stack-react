import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GameForm from './GameForm';
import auth from '../auth/auth-helper';
import { create } from './api-game';

class NewGame extends Component {
   state = {
      redirect: false,
      error: '',
   };

   clickSubmit = game => () => {
      const jwt = auth.isAuthenticated();
      create(
         {
            userId: jwt.user._id,
         },
         {
            t: jwt.token,
         },
         game,
      ).then((data) => {
         if (data.error) {
            return this.setState({ error: data.error });
         }
         return this.setState({
            redirect: true,
            error: '',
         });
      });
   };

   render() {
      const { redirect, error } = this.state;

      if (redirect) {
         return <Redirect to={`/user/${auth.isAuthenticated().user._id}`} />;
      }

      return <GameForm onSubmit={this.clickSubmit} errorMsg={error} />;
   }
}

export default NewGame;
