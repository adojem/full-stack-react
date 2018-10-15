import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CartItems from './CartItems';
import config from '../../config/config';
import Checkout from './Checkout';

const styles = () => ({
   root: {
      flexGrow: 1,
      margin: 30,
   },
});

class Cart extends Component {
   state = {
      checkout: false,
      stripe: null,
   };

   componentDidMount = () => {
      if (window.Stripe) {
         return this.setState({ stripe: window.Stripe(config.stripe_test_api_key) });
      }
      return document.querySelector('#stripe-js').addEventListener('load', () => {
         this.setState({ stripe: window.Stripe(config.stripe_test_api_key) });
      });
   };

   setCheckout = val => this.setState({ checkout: val });

   render() {
      const { checkout, stripe } = this.state;
      const { classes } = this.props;

      return (
         <div className={classes.root}>
            <Grid container spacing={24}>
               <Grid item xs={6} sm={6}>
                  <CartItems checkout={checkout} setCheckout={this.setCheckout} />
               </Grid>
               <Grid item xs={6} sm={6}>
                  <StripeProvider stripe={stripe}>
                     <Checkout />
                  </StripeProvider>
               </Grid>
            </Grid>
         </div>
      );
   }
}

Cart.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);
