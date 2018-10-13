import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import cart from './cart-helper';

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
});

class CartItems extends Component {
   state = {
      cartItems: [],
   };

   componentDidMount = () => this.setState({ cartItems: cart.getCart() });

   render() {
      const { cartItems } = this.state;
      const { classes } = this.props;

      return (
         <Card className={classes.card}>
            <Typography variant="title" className={classes.title}>
               Shopping Cart
            </Typography>
            {cartItems.length > 0 ? (
               <Fragment>
                  {cartItems.map(item => (
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
                           </div>
                        </Card>
                     </span>
                  ))}
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

export default withStyles(styles)(CartItems);
