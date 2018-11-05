import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import GameForm from './GameForm';
import auth from '../auth/auth-helper';
import { update } from './api-game';

class EditGame extends Component {
   constructor({ match }) {
      super();
      this.state = {
         error: '',
         redirect: false,
      };
      this.match = match;
   }

   clickSubmit = game => () => {
      const jwt = auth.isAuthenticated();
      update(
         {
            gameId: this.match.params.gameId,
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
            error: '',
            redirect: true,
         });
      });
   };

   render() {
      const { error, redirect } = this.state;

      if (redirect) {
         return <Redirect to={`/user/${auth.isAuthenticated().user._id}`} />;
      }

      return (
         <GameForm gameId={this.match.params.gameId} onSubmit={this.clickSubmit} errorMsg={error} />
      );
   }
}

export default EditGame;
