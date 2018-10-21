import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import auth from '../auth/auth-helper';
import { remove } from './api-user';

class DeleteUser extends Component {
   state = {
      redirect: false,
      open: false,
   };

   handleDialog = () => this.setState(state => ({ open: !state.open }));

   deleteAccount = () => {
      const { userid } = this.props;
      const jwt = auth.isAuthenticated();
      remove({ userId: userid }, { t: jwt.token }).then((data) => {
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
            <IconButton aria-label="Delete" color="secondary" onClick={this.handleDialog}>
               <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={this.handleDialog}>
               <DialogTitle>Delete Account</DialogTitle>
               <DialogContent>
                  <DialogContentText>Confirm to delete your account.</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="primary" onClick={this.handleDialog}>
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
   userid: PropTypes.string.isRequired,
};

export default DeleteUser;
