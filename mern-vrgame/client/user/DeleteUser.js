import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { remove } from './api-user';
import auth from '../auth/auth-helper';

class DeleteUser extends Component {
   state = {
      open: false,
      redirect: false,
   };

   handleModal = () => this.setState(state => ({ open: !state.open }));

   deleteAccount = () => {
      const { userId } = this.props;
      const jwt = auth.isAuthenticated();
      remove({ userId }, { t: jwt.token }).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         auth.signout(() => console.log('deleted'));
         return this.setState({ redirect: true });
      });
   };

   render() {
      const { open, redirect } = this.state;

      if (redirect) {
         return <Redirect to="/" />;
      }

      return (
         <Fragment>
            <IconButton aria-label="Delete" color="secondary" onClick={this.handleModal}>
               <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={this.handleModal}>
               <DialogTitle>Delete Account</DialogTitle>
               <DialogContent>
                  <DialogContentText>Confirm to delete your account.</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="primary" onClick={this.handleModal}>
                     Cancel
                  </Button>
                  <Button color="secondary" autoFocus onClick={this.deleteAccount}>
                     Confirm
                  </Button>
               </DialogActions>
            </Dialog>
         </Fragment>
      );
   }
}

DeleteUser.propTypes = {
   userId: PropTypes.string.isRequired,
};

export default DeleteUser;
