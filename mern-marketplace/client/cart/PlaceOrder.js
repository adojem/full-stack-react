import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { CardElement, injectStripe } from 'react-stripe-elements';
import auth from '../auth/auth-helper';
import cart from './cart-helper';
import { create } from '../order/api-order';

const styles = theme => ({
   subheading: {
      marginTop: '1.25rem',
      color: 'rgba(88,114,128, 0.87)',
   },
   error: {
      display: 'inline',
      padding: '0 0.625rem',
   },
   errorIcon: {
      marginRight: '0.4rem',
      verticalAlign: 'middle',
   },
   btn: {
      marginTop: theme.spacing.unit * 2,
   },
   StripeElement: {
      display: 'block',
      maxWidth: '408px',
      margin: '1.25rem 0 0.625rem 0.625rem',
      padding: '0.625rem 0.875rem',
      boxShadow: 'rgba(50,50,93, 0.14902) 0px 1px 3px, rgba(0,0,0, 0.0196078) 0px 1px 0px',
      borderRadius: '4px',
      background: 'white',
   },
});

class PlaceOrder extends Component {
   state = {
      order: {},
      error: '',
      redirect: false,
   };

   componentDidMount = () => {
      if (localStorage.getItem('cart')) {
         const products = JSON.parse(localStorage.getItem('cart'));
         this.setState({
            order: {
               products,
            },
         });
      }
   };

   placeOrder = () => {
      const { stripe, checkoutDetails } = this.props;
      const { order } = this.state;
      stripe.createToken().then((payload) => {
         if (payload.error) {
            return this.setState({ error: payload.error.message });
         }
         const jwt = auth.isAuthenticated();
         return create(
            {
               userId: jwt.user._id,
            },
            {
               t: jwt.token,
            },
            {
               ...checkoutDetails,
               ...order,
            },
            payload.token.id,
         ).then((data) => {
            if (data.error) {
               return this.setState({ error: data.error });
            }
            return cart.emptyCart(() =>
               this.setState({
                  orderId: data._id,
                  redirect: true,
               }));
         });
      });
   };

   render() {
      const { error, redirect, orderId } = this.state;
      const { classes } = this.props;

      if (redirect) {
         return <Redirect to={`/order/${orderId}`} />;
      }

      return (
         <Fragment>
            <Typography variant="subheading" component="h3" className={classes.subheading}>
               Card details
            </Typography>
            <CardElement
               className={classes.StripeElement}
               {...{
                  style: {
                     base: {
                        color: '#424770',
                        letterSpacing: '0.025em',
                        fontFamily: 'Source Code Pro, Menlo, monospace',
                        '::placeholder': {
                           color: '#aab7c4',
                        },
                     },
                     invalid: {
                        color: '#9e2146',
                     },
                  },
               }}
            />
            <div>
               {error && (
                  <Typography component="span" color="error" className={classes.error}>
                     <Icon className={classes.errorIcon}>error</Icon>
                     {error}
                  </Typography>
               )}
            </div>
            <Button
               color="secondary"
               variant="raised"
               className={classes.btn}
               onClick={this.placeOrder}
            >
               Place Order
            </Button>
         </Fragment>
      );
   }
}

PlaceOrder.propTypes = {
   classes: PropTypes.object.isRequired,
   checkoutDetails: PropTypes.object.isRequired,
};

export default injectStripe(withStyles(styles)(PlaceOrder));
