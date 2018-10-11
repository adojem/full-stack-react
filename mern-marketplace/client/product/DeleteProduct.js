import React, { Component } from 'react';
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
import { remove } from './api-product';

class DeleteProduct extends Component {
   state = {
      open: false,
   };

   handleModal = () => this.setState(state => ({ open: !state.open }));

   deleteProduct = () => {
      const jwt = auth.isAuthenticated();
      const { shopId, product, onRemove } = this.props;

      remove(
         {
            shopId,
            productId: product._id,
         },
         { t: jwt.token },
      ).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ open: false }, () => onRemove(product));
      });
   };

   render() {
      const { product } = this.props;
      const { open } = this.state;

      return (
         <span>
            <IconButton aria-label="Delete" color="secondary" onClick={this.handleModal}>
               <Delete />
            </IconButton>
            <Dialog open={open} onClose={this.handleModal}>
               <DialogTitle>{`Delete ${product.name}`}</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     {`Confirm to delete your product ${product.name}.`}
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button color="primary" onClick={this.handleModal}>
                     Cancel
                  </Button>
                  <Button color="secondary" autoFocus onClick={this.deleteProduct}>
                     Confirm
                  </Button>
               </DialogActions>
            </Dialog>
         </span>
      );
   }
}

DeleteProduct.propTypes = {
   shopId: PropTypes.string.isRequired,
   product: PropTypes.object.isRequired,
   onRemove: PropTypes.func.isRequired,
};

export default DeleteProduct;
