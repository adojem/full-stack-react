import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import auth from '../auth/auth-helper';
import { listByShop } from './api-order';
import ProductOrderEdit from './ProductOrderEdit';

const styles = theme => ({
   root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5,
   }),
   title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px ${theme.spacing.unit}px`,
      color: theme.palette.protectedTitle,
      fontSize: '1.1875rem',
   },
   subheading: {
      marginTop: theme.spacing.unit,
      color: '#424b4e',
      fontSize: '1.0625rem',
   },
   customerDetails: {
      paddingLeft: '2rem',
      paddingTop: '1rem',
      backgroundColor: '#f8f8f8',
   },
});

class ShopOrders extends Component {
   constructor({ match }) {
      super();
      this.state = {
         open: 0,
         orders: [],
      };
      this.match = match;
   }

   componentDidMount = () => {
      this.loadOrders();
   };

   loadOrders = () => {
      const jwt = auth.isAuthenticated();
      listByShop(
         {
            shopId: this.match.params.shopId,
         },
         {
            t: jwt.token,
         },
      ).then((data) => {
         if (data.error) {
            return console.log(data.error);
         }
         return this.setState({ orders: data });
      });
   };

   handleClick = index => () => this.setState({ open: index });

   updateOrders = (index, updatedOrder) => {
      const { orders } = this.state;
      orders[index] = updatedOrder;
      this.setState({ orders });
   };

   render() {
      const { open, orders } = this.state;
      const { classes } = this.props;

      return (
         <Paper className={classes.root}>
            <Typography variant="title" className={classes.title}>
               {`Orders in ${this.match.params.shop}`}
            </Typography>
            <List dense>
               {orders.map((order, index) => (
                  <span key={order._id}>
                     <ListItem button onClick={this.handleClick(index)}>
                        <ListItemText
                           primary={`Order # ${order._id}`}
                           secondary={new Date(order.created).toDateString()}
                        />
                        {open === index ? <ExpandLess /> : <ExpandMore />}
                     </ListItem>
                     <Divider />
                     <Collapse component="li" in={open === index} timeout="auto" unmountOnExit>
                        <ProductOrderEdit
                           shopId={this.match.params.shopId}
                           order={order}
                           orderIndex={index}
                           updateOrders={this.updateOrders}
                        />
                        <div className={classes.customerDetails}>
                           <Typography
                              variant="subheading"
                              component="h3"
                              className={classes.subheading}
                           >
                              Deliver to:
                           </Typography>
                           <Typography variant="subheading" component="h3" color="primary">
                              <strong>{order.customer_name}</strong>
                              {` (${order.customer_email})`}
                           </Typography>
                           <Typography variant="subheading" component="h3" color="primary">
                              {order.delivery_address.street}
                           </Typography>
                           <Typography variant="subheading" component="h3" color="primary">
                              {order.delivery_address.city}
                              {order.delivery_address.state}
                              {order.delivery_address.zipcode}
                           </Typography>
                           <Typography variant="subheading" component="h3" color="primary">
                              {order.delivery_address.country}
                           </Typography>
                           <br />
                        </div>
                     </Collapse>
                  </span>
               ))}
            </List>
         </Paper>
      );
   }
}

ShopOrders.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShopOrders);
