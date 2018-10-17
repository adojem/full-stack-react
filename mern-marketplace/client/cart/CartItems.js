import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import cart from './cart-helper';
import auth from '../auth/auth-helper';

const styles = theme => ({
   card: {
      margin: '1.5rem 0',
      padding: '1rem 2.5rem 3.75rem 2.5rem',
      backgroundColor: '#80808017',
   },
   title: {
      margin: theme.spacing.unit * 2,
      color: theme.palette.openTitle,
   },
   cart: {
      display: 'inline-block',
      width: '100%',
   },
   details: {
      display: 'inline-block',
      width: '100%',
      padding: '4px',
   },
   content: {
      flex: '1 0 auto',
      padding: '1rem .5rem 0',
   },
   cover: {
      width: 160,
      height: 125,
      margin: '0.5rem',
   },
   price: {
      display: 'inline',
      color: theme.palette.text.secondary,
   },
   itemTotal: {
      float: 'right',
      marginRight: '2.5rem',
      fontSize: '1.5rem',
   },
   itemShop: {
      display: 'block',
      fontSize: '0.875rem',
      color: '#78948f',
   },
   subheading: {
      display: 'inline-block',
      padding: '0.5rem 0.625rem 0',
      color: 'rgba(88,114,128, 0.67)',
      cursor: 'pointer',
   },
   textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginTop: 0,
      width: 50,
   },
   removeButton: {
      fontSize: '0.8125rem',
   },
   checkout: {
      float: 'right',
      margin: '1.5rem',
   },
   total: {
      marginRight: '1rem',
      color: 'rgb(53,97,85)',
      fontSize: '1.1875rem',
      fontWeight: 600,
      verticalAlign: 'bottom',
   },
});

class CartItems extends Component {
   state = {
      cartItems: [],
   };

   componentDidMount = () => this.setState({ cartItems: cart.getCart() });

   getTotal() {
      const { cartItems } = this.state;
      return cartItems.reduce((a, b) => a + b.quantity * b.product.price, 0);
   }

   removeItem = index => () => {
      const cartItems = cart.removeItem(index);
      if (cartItems.length === 0) {
         this.props.setCheckout(false);
      }
      this.setState({ cartItems });
   };

   openCheckout = () => this.props.setCheckout(true);

   handleChange = index => (event) => {
      const { cartItems } = this.state;
      if (event.target.value === 0) {
         cartItems[index].quantity = 1;
      }
      else {
         cartItems[index].quantity = event.target.value;
      }
      this.setState({ cartItems });
      cart.updateCart(index, event.target.value);
   };

   render() {
      const { cartItems } = this.state;
      const { classes, checkout } = this.props;

      return (
         <Card className={classes.card}>
            <Typography variant="title" className={classes.title}>
               Shopping Cart
            </Typography>
            {cartItems.length > 0 ? (
               <Fragment>
                  {cartItems.map((item, i) => (
                     <span key={item.product._id}>
                        <Card className={classes.cart}>
                           <CardMedia
                              className={classes.cover}
                              image={`/api/product/image/${item.product._id}`}
                              title={item.product.name}
                           />
                           <div className={classes.details}>
                              <CardContent className={classes.content}>
                                 <Link to={`/product/${item.product._id}`}>
                                    <Typography variant="title" component="h3" color="primary">
                                       {item.product.name}
                                    </Typography>
                                 </Link>
                                 <Typography
                                    className={classes.price}
                                    variant="subheading"
                                    component="h3"
                                    color="primary"
                                 >
                                    {`$ ${item.product.price}`}
                                 </Typography>
                                 <span className={classes.itemTotal}>
                                    {`$ ${item.product.price * item.quantity}`}
                                 </span>
                                 <span className={classes.itemShop}>
                                    {`Shop: ${item.product.shop.name}`}
                                 </span>
                              </CardContent>
                              <div className={classes.subheading}>
                                 Quantity:
                                 {' '}
                                 <TextField
                                    className={classes.textField}
                                    value={item.quantity}
                                    type="number"
                                    margin="normal"
                                    inputProps={{ min: 1 }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={this.handleChange(i)}
                                 />
                                 <Button
                                    className={classes.removeButton}
                                    color="primary"
                                    onClick={this.removeItem(i)}
                                 >
                                    x Remove
                                 </Button>
                              </div>
                           </div>
                        </Card>
                        <Divider />
                     </span>
                  ))}
                  <div className={classes.checkout}>
                     <span className={classes.total}>{`Total: $${this.getTotal()}`}</span>
                     {!checkout && auth.isAuthenticated() ? (
                        <Button color="secondary" variant="raised" onClick={this.openCheckout}>
                           Checkout
                        </Button>
                     ) : (
                        !checkout && (
                           <Button color="primary" variant="raised">
                              Sign in to checkout
                           </Button>
                        )
                     )}
                  </div>
               </Fragment>
            ) : (
               <Typography variant="subheading" component="h3" color="primary">
                  No items added to your cart.
               </Typography>
            )}
         </Card>
      );
   }
}

CartItems.propTypes = {
   classes: PropTypes.object.isRequired,
   checkout: PropTypes.bool.isRequired,
   setCheckout: PropTypes.func.isRequired,
};

export default withStyles(styles)(CartItems);
