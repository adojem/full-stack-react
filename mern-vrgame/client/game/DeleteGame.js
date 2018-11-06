import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import auth from '../auth/auth-helper';
import { remove } from './api-game';

class DeleteGame extends Component {
   state = {
      open: false,
   };

   handleModal = () => this.setState(state => ({ open: !state.open }));

   deleteGame = () => {
      const { game, removeGame } = this.props;
      const jwt = auth.isAuthenticated();
      remove(
         {
            gameId: game._id,
         },
         {
            t: jwt.token,
         },
      ).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         removeGame(game);
         return this.setState({ open: false });
      });
   };

   render() {
      const { open } = this.state;
      const { game } = this.props;

      return (
         <Fragment>
            <Button
               variant="contained"
               style={{
                  width: '50%',
                  margin: 'auto',
               }}
               onClick={this.handleModal}
            >
               Delete
            </Button>
            <Dialog open={open}>
               <DialogTitle>{game.name}</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     {`Confirm to delete your game ${game.name}`}
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={this.handleModal}>Cancel</Button>
                  <Button color="secondary" autoFocus onClick={this.deleteGame}>
                     Confirm
                  </Button>
               </DialogActions>
            </Dialog>
         </Fragment>
      );
   }
}

DeleteGame.propTypes = {
   game: PropTypes.object.isRequired,
   removeGame: PropTypes.func.isRequired,
};

export default DeleteGame;
