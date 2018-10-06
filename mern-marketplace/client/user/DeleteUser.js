import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Delete as DeleteIcon } from '@material-ui/icons';
import auth from '../auth/auth-helper';
import { remove } from './api-user';

class DeleteUser extends Component {
   state = {
      redirect: false,
      open: false,
   };

   clickButton = () => this.setState({ open: true });

   handleRequestClose = () => this.setState({ open: false });

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
         <span>
            <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary">
               <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={this.handleRequestClose}>
               <DialogTitle>Delete Account</DialogTitle>
               <DialogContent>
                  <DialogContentText>Confirm to delete your account</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={this.handleRequestClose} color="primary">
                     Cancel
                  </Button>
                  <Button onClick={this.deleteAccount} color="secondary" autoFocus>
                     Confirm
                  </Button>
               </DialogActions>
            </Dialog>
         </span>
      );
   }
}

DeleteUser.propTypes = {
   userId: PropTypes.string.isRequired,
};

export default DeleteUser;
