import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import auth from '../auth/auth-helper';
import { remove } from './api-shop';

class DeleteShop extends Component {
   state = { open: false };

   handleModal = () => this.setState(({ open }) => ({ open: !open }));

   deleteShop = () => {
      const { shop, onRemove } = this.props;
      const jwt = auth.isAuthenticated();
      remove(
         {
            shopId: shop._id,
         },
         {
            t: jwt.token,
         },
      ).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ open: false }, () => onRemove(shop));
      });
   };

   render() {
      const { open } = this.state;
      const { shop } = this.props;

      return (
         <Fragment>
            <IconButton aria-label="Delete" color="secondary" onClick={this.handleModal}>
               <Delete />
            </IconButton>
            <Dialog open={open} onClose={this.handleModal}>
               <DialogTitle>{`Delete ${shop.name}`}</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     {`Confirm to delete your shop ${shop.name}`}
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="primary" onClick={this.handleModal}>
                     Cancel
                  </Button>
                  <Button color="secondary" autoFocus onClick={this.deleteShop}>
                     Confirm
                  </Button>
               </DialogActions>
            </Dialog>
         </Fragment>
      );
   }
}

DeleteShop.propTypes = {
   shop: PropTypes.object.isRequired,
   onRemove: PropTypes.func.isRequired,
};

export default DeleteShop;
