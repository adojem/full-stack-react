import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import cart from './cart-helper';

const styles = theme => ({
   iconButton: {
      width: '28px',
      height: '28px',
   },
   disabledIconButton: {
      color: '#7f7563',
      width: '28px',
      height: '28px',
   },
});

class AddToCart extends Component {
   state = { redirect: false };

   addToCart = () => {
      cart.addItem(this.props.item, () => this.setState({ redirect: true }));
   };

   render() {
      if (this.state.redirect) {
         return <Redirect to="/cart" />;
      }

      const { classes, cartStyle, item } = this.props;

      return (
         <Fragment>
            {item.quantity > 0 ? (
               <IconButton color="secondary" onClick={this.addToCart}>
                  <AddShoppingCart className={cartStyle || classes.iconButton} />
               </IconButton>
            ) : (
               <IconButton disabled color="secondary">
                  <RemoveShoppingCart className={cartStyle || classes.disabledIconButton} />
               </IconButton>
            )}
         </Fragment>
      );
   }
}

AddToCart.propTypes = {
   classes: PropTypes.object.isRequired,
   item: PropTypes.object.isRequired,
   cartStyle: PropTypes.string,
};

export default withStyles(styles)(AddToCart);
