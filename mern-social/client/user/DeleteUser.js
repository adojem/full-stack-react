import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import auth from '../auth/auth-helper';
import { remove } from './api-user';

class DeleteUser extends Component {
   state = { redirect: false, open: false };

   clickButton = () => {
      this.setState({ open: true });
   };

   handleRequestClose = () => {
      this.setState({ open: false });
   };

   deleteAccount = () => {
      const jwt = auth.isAuthenticated();
      remove({ userId: this.props.userId }, { t: jwt.token }).then((data) => {
         if (data.error) {
            console.log(data.errror);
         }
         else {
            auth.signout(() => console.log('deleted'));
            this.setState({ redirect: true });
         }
      });
   };

   render() {
      const { redirect } = this.state;
      if (redirect) {
         return <Redirect to="/" />;
      }
      return (
         <span>
            <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary">
               <DeleteIcon />
            </IconButton>
            <Dialog open={this.state.open} onClose={this.handleRequestClose}>
               <DialogTitle>Delete Account</DialogTitle>
               <DialogContent>
                  <DialogContentText>Confirm to delete your account.</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={this.handleRequestClose} color="primary">
                     Cancel
                  </Button>
                  <Button onClick={this.deleteAccount} color="secondary" autoFocus="autoFocus">
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
